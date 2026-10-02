// Evaluation-only observation seam. Forwards real provider requests unchanged.
// No source copies, fixtures, retries, response substitution, or credential logs.
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { createRequire } = require('node:module');
const { performance } = require('node:perf_hooks');
const run = process.env.SCENARIO_RUN_DIRECTORY;
const requireApp = createRequire(path.join(process.cwd(), 'package.json'));
const mongoose = requireApp('mongoose');
let calls = 0, requests = 0, queue = Promise.resolve();
const clean = value => JSON.parse(JSON.stringify(value, (key, item) =>
  key === 'learnerId' ? 'SCENARIO-LEARNER-01' : item));
const append = (name, value) => fs.appendFileSync(path.join(run, name), JSON.stringify(clean(value)) + '\n');
const actualFetch = globalThis.fetch;
globalThis.fetch = async (url, options) => {
  const address = typeof url === 'string' ? url : url instanceof URL ? url.href : url.url;
  if (address !== 'https://api.openai.com/v1/responses') return actualFetch(url, options);
  const record = { call: ++calls, startedAt: new Date().toISOString(), request: JSON.parse(options.body) };
  const start = performance.now();
  try {
    const response = await actualFetch(url, options);
    record.httpStatus = response.status;
    const data = await response.clone().json();
    record.response = response.ok ? data : { error: { type: data.error?.type, code: data.error?.code } };
    return response;
  } catch (error) { record.transportError = error.name; throw error; }
  finally { record.elapsedMs = performance.now() - start; append('provider.jsonl', record); }
};
const originalEmit = http.Server.prototype.emit;
http.Server.prototype.emit = function (event, ...args) {
  if (event === 'request' && args[0].url.startsWith('/api/')) {
    const [request, response] = args;
    const id = ++requests, startedAt = new Date().toISOString(), start = performance.now(), beforeCalls = calls;
    const input = [], output = [];
    // Observe data emission without attaching a listener: a data listener would
    // switch the stream into flowing mode before Next is ready to read its body.
    const emit = request.emit;
    request.emit = function (name, ...values) {
      if (name === 'data') input.push(Buffer.from(values[0]));
      return emit.call(this, name, ...values);
    };
    const write = response.write, end = response.end;
    response.write = function (chunk, ...rest) { if (chunk) output.push(Buffer.from(chunk)); return write.call(this, chunk, ...rest); };
    response.end = function (chunk, ...rest) { if (chunk) output.push(Buffer.from(chunk)); return end.call(this, chunk, ...rest); };
    response.on('finish', () => {
      const parse = chunks => { const text = Buffer.concat(chunks).toString(); try { return JSON.parse(text); } catch { return text || null; } };
      const record = { id, startedAt, finishedAt: new Date().toISOString(), method: request.method, path: request.url,
        request: parse(input), httpStatus: response.statusCode, response: parse(output),
        elapsedMs: performance.now() - start, providerCalls: calls - beforeCalls };
      append('http.jsonl', record);
      queue = queue.then(async () => {
        if (!mongoose.connection.readyState) await mongoose.connect(process.env.DB_URL);
        const db = mongoose.connection.db;
        append('state.jsonl', { requestId: id, capturedAt: new Date().toISOString(),
          sessions: await db.collection('sessions').find({}).toArray(), profiles: await db.collection('profiles').find({}).toArray() });
      }).catch(error => append('capture_errors.jsonl', { requestId: id, error: error.name, message: 'State capture failed' }));
    });
  }
  return originalEmit.call(this, event, ...args);
};
