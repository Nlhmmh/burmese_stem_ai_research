// Evaluation-only provider seam. No application/service/DAO code is replaced.
// Never delegates the OpenAI URL: this run uses a dummy credential and fixtures.
const fs = require('node:fs');
const path = require('node:path');
const dir = process.env.BB_RUN_DIRECTORY;
const simulation = JSON.parse(fs.readFileSync(path.join(dir, '../../../simulation/raw/SIM-RUN-01-results.jsonl'), 'utf8').split('\n').find(line => JSON.parse(line).id === 'SIM01-B'));
const initial = simulation.steps[0].response.session;
const fixture = { outcome: 'ready', message: '', concept: initial.concept, explanations: initial.explanations, reflectivePrompt: initial.reflectivePrompt, hint: initial.hint };
const nativeFetch = globalThis.fetch;
const empty = () => ({ en: '', my: '' });
const response = text => new Response(JSON.stringify({ output: [{ content: [{ type: 'output_text', text }] }] }), { headers: { 'content-type': 'application/json' } });
globalThis.fetch = async function (url, options = {}) {
  const address = typeof url === 'string' ? url : url instanceof URL ? url.href : url.url;
  if (address !== 'https://api.openai.com/v1/responses') return nativeFetch(url, options);
  const control = JSON.parse(fs.readFileSync(path.join(dir, 'control.json'), 'utf8'));
  const body = JSON.parse(options.body);
  const input = JSON.parse(body.input);
  const name = body.text.format.name;
  fs.appendFileSync(path.join(dir, 'provider.jsonl'), JSON.stringify({ at: new Date().toISOString(), mode: control.mode, label: control.label, schema: name, model: body.model, input, instructions: body.instructions }) + '\n');
  if (control.mode === 'timeout') return new Promise((resolve, reject) => {
    if (options.signal.aborted) return reject(new DOMException('Fixture request aborted', 'AbortError'));
    options.signal.addEventListener('abort', () => reject(new DOMException('Fixture request aborted', 'AbortError')), { once: true });
  });
  if (control.mode === 'non2xx') return new Response('FAKE_PROVIDER_SECRET_DO_NOT_EXPOSE', { status: 503 });
  if (control.mode === 'no_output') return new Response(JSON.stringify({ output: [] }), { headers: { 'content-type': 'application/json' } });
  if (control.mode === 'invalid_json') return response('{bad-json');
  let output;
  if (name === 'initial_learning_session') {
    output = structuredClone(fixture);
    if (/^What is current\?$/.test(input.learnerQuestion)) {
      output = { outcome: 'ambiguous', message: 'Current may mean electric or fluid current. Please specify the STEM context.', concept: { name: '', domain: '' }, explanations: { simple: empty(), realWorldExample: empty(), technical: empty() }, reflectivePrompt: empty(), hint: empty() };
    } else if (/current.*circuit|electric current/i.test(input.learnerQuestion)) {
      const currentRecord = fs.readFileSync(path.join(dir, '../../../simulation/raw/SIM-RUN-01-results.jsonl'), 'utf8').trim().split('\n').map(JSON.parse).find(row => row.id === 'SIM05-B').steps[0].response.session;
      output = { outcome: 'ready', message: '', concept: currentRecord.concept, explanations: currentRecord.explanations, reflectivePrompt: currentRecord.reflectivePrompt, hint: currentRecord.hint };
    } else if (/cell/i.test(input.learnerQuestion)) {
      output.concept = { name: 'cell', domain: 'biology' }; // schema fixture, not scientific-content evidence
    }
    if (control.mode === 'domain_invalid') output.message = 'Ready with a forbidden nonempty message';
  } else if (name === 'learning_adaptation') {
    const index = input.previousAdaptations.length;
    const source = index === 0 ? initial.explanations.realWorldExample : initial.explanations.technical;
    output = { content: { en: `${input.supportType} fixture ${index + 1}: ${source.en}`, my: `${input.supportType} fixture ${index + 1}: ${source.my}` } };
    if (control.mode === 'domain_invalid') output.content = structuredClone(input.initialExplanations.simple);
  } else if (name === 'concept_reinterpretation') {
    const unclear = control.mode === 'ambiguous_correction';
    output = { outcome: unclear ? 'ambiguous' : 'corrected', message: unclear ? { en: 'Do you mean a battery cell or a biological cell?', my: 'battery cell ကို ဆိုလိုပါသလား၊ သက်ရှိ cell ကို ဆိုလိုပါသလား။' } : empty(), concept: unclear ? input.previousConcept : { name: 'electrochemical cell', domain: 'electrochemistry' }, content: unclear ? empty() : { en: 'An electrochemical cell converts chemical energy into electrical energy; a battery cell is an example.', my: 'Electrochemical cell သည် ဓာတုစွမ်းအင်ကို လျှပ်စစ်စွမ်းအင်အဖြစ် ပြောင်းလဲပေးသည်။ battery cell သည် ဥပမာတစ်ခုဖြစ်သည်။' } };
    if (control.mode === 'domain_invalid') output.concept = input.previousConcept;
  } else {
    const related = !/gravity/i.test(input.question);
    output = { relatedToCurrentConcept: related, message: related ? '' : 'This is a different STEM concept. Start a new session.', answer: related ? structuredClone(initial.explanations.simple) : empty() };
    if (control.mode === 'domain_invalid') output.answer.en = '';
  }
  if (control.mode === 'wrong_type') output = { content: 42, outcome: 7, relatedToCurrentConcept: 'true' };
  if (control.mode === 'missing_field') { if (name === 'initial_learning_session') delete output.hint; else if (name === 'scoped_learning_follow_up') delete output.answer; else delete output.content; }
  if (control.mode === 'blank_required') {
    if (name === 'initial_learning_session') output.explanations.simple.en = ' ';
    else if (name === 'scoped_learning_follow_up') output.answer.en = ' ';
    else output.content.en = ' ';
  }
  fs.appendFileSync(path.join(dir, 'fixture_outputs.jsonl'), JSON.stringify({ at: new Date().toISOString(), label: control.label, mode: control.mode, schema: name, output }) + '\n');
  return response(JSON.stringify(output));
};
