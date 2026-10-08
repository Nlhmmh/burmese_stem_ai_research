// Inspection-only seam: root production app and real isolated MongoDB remain intact.
const fs = require('node:fs');
const path = require('node:path');
require('../../black_box/raw/provider-hook.cjs');
const controlledFetch = globalThis.fetch;
globalThis.fetch = async (url, options) => {
  const address = typeof url === 'string' ? url : url instanceof URL ? url.href : url.url;
  if (address === 'https://api.openai.com/v1/responses') {
    const control = JSON.parse(fs.readFileSync(path.join(process.env.BB_RUN_DIRECTORY, 'control.json')));
    if (control.delayMs) await new Promise(resolve => setTimeout(resolve, control.delayMs));
  }
  return controlledFetch(url, options);
};
