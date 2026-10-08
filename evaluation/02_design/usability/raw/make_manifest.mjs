// Hash artefacts and actual root source; do not create a source checkout.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const raw = path.dirname(fileURLToPath(import.meta.url)), root = path.resolve(raw, '../../../..');
const run = path.join(raw, 'RUN-B01-20261002-USABILITY-01');
const metadata = JSON.parse(fs.readFileSync(path.join(run, 'metadata.json')));
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const originalProtocol = execFileSync('git', ['show', metadata.head + ':evaluation/00_protocol/evaluation_protocol.md'], { cwd: root });
assert.equal(hash(originalProtocol), metadata.protocolHash, 'Pre-execution oracle must match recorded hash');
fs.writeFileSync(path.join(run, 'protocol_at_execution.md'), originalProtocol, { flag: 'wx' });
const quote = value => '"' + String(value ?? '').replaceAll('"', '""') + '"';
const mainCSV = fs.readFileSync(path.join(run, 'observations.csv'), 'utf8');
const extra = fs.readFileSync(path.join(run, 'navigation_addendum.jsonl'), 'utf8').trim().split('\n').map(JSON.parse);
const extraRows = extra.map(row => [row.id,row.criteria.join('|'),'Learning Session',row.state,row.locale,'bilingual',row.theme,`${row.width}x${row.height}`,
  row.id === 'US-A01' ? 'Select simpler; Enter activates Back' : 'Space selects another example; Enter activates Back', row.note,0,'No task obstruction; zero stored changes/provider requests','No corrective action identified',row.screenshot,row.dom,row.at,'Codex technical evaluator under user direction','AI-assisted technical observation; no qualified human language credential claimed']);
fs.writeFileSync(path.join(run, 'navigation_addendum.csv'), mainCSV.split('\n')[0] + '\n' + extraRows.map(row => row.map(quote).join(',')).join('\n') + '\n', { flag: 'wx' });
for (const [file, expected] of Object.entries(metadata.productionHashes)) assert.equal(hash(fs.readFileSync(path.join(root, file))), expected, file);
const files = new Set(Object.keys(metadata.productionHashes));
const walk = directory => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (entry.isFile() && !['manifest.sha256','manifest_verification.json'].includes(entry.name)) files.add(path.relative(root, file));
  }
};
walk(path.dirname(raw));
files.add('evaluation/02_design/black_box/raw/provider-hook.cjs');
files.add('evaluation/02_design/simulation/raw/SIM-RUN-01-results.jsonl');
files.add('burmese_stem_ai/.next/BUILD_ID');
const entries = [...files].sort().map(file => `${hash(fs.readFileSync(path.join(root, file)))}  ${file}`);
fs.writeFileSync(path.join(run, 'manifest.sha256'), entries.join('\n') + '\n', { flag: 'wx' });
console.log(JSON.stringify({ entries: entries.length, productionFilesUnchanged: Object.keys(metadata.productionHashes).length, originalProtocolPreserved: true, observations: 133, sourceCopiesCreated: 0 }));
