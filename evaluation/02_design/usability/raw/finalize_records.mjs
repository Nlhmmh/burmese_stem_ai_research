// Mechanical evidence export; never controls the browser or changes application code.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
const raw = path.dirname(fileURLToPath(import.meta.url));
const run = path.join(raw, 'RUN-B01-20261002-USABILITY-01');
const output = path.join(run, 'observations.csv');
assert.ok(!fs.existsSync(output), 'Refusing to overwrite derived records');
const read = name => JSON.parse(fs.readFileSync(path.join(run, name)));
const lines = name => fs.readFileSync(path.join(run, name), 'utf8').trim().split('\n').map(JSON.parse);
const rows = lines('observations.jsonl');
for (const correction of lines('observation_corrections.jsonl')) {
  const row = rows.find(value => value.id === correction.id);
  assert.ok(row, correction.id); row[correction.field] = correction.corrected;
  if (correction.severity !== undefined) row.severity = correction.severity;
}
const snapshot = read('database_snapshot.json');
const seeds = read('ui_seeds.json');
const sessions = new Map(snapshot.sessions.map(session => [session.sessionId, session]));
const owner = sessions.get(seeds.browserCreated).learnerId;
const identities = [...new Set(snapshot.sessions.map(session => session.learnerId))];
const aliases = new Map(identities.map(id => [id, id === owner ? 'SYNTHETIC-LEARNER-PRIMARY' : 'SYNTHETIC-LEARNER-FOREIGN']));
const metadata = read('metadata.json');
const originals = path.join(metadata.dbDir, 'restricted-export-originals');
fs.mkdirSync(originals, { mode: 0o700 });
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const redactions = [];
for (const entry of fs.readdirSync(run, { withFileTypes: true })) {
  if (!entry.isFile() || !/\.(json|jsonl|txt|log)$/.test(entry.name)) continue;
  const file = path.join(run, entry.name), original = fs.readFileSync(file, 'utf8');
  let amended = original, count = 0;
  for (const [id, alias] of aliases) {
    count += amended.split(id).length - 1; amended = amended.replaceAll(id, alias);
  }
  if (!count) continue;
  fs.writeFileSync(path.join(originals, entry.name), original, { flag: 'wx', mode: 0o600 });
  fs.writeFileSync(file, amended);
  redactions.push({ file: entry.name, replacements: count, originalSha256: hash(original), shareableSha256: hash(amended) });
}
fs.writeFileSync(path.join(run, 'redaction_record.json'), JSON.stringify({
  at: new Date().toISOString(), purpose: 'Anonymous identity-cookie values replaced by synthetic learner aliases in shareable text exports',
  originalsStorage: originals, originalDirectoryMode: '0700', originalFileMode: '0600',
  sessionIds: 'Artificial session UUIDs retained for UI/state traceability; not identity-cookie values', files: redactions,
}, null, 2) + '\n', { flag: 'wx' });
const keyboard = {
  'US-D04': 'Open modal, native Tab once', 'US-D05': 'Native Escape after modal Tab',
  'US-D06': 'Space select English/Advanced; Enter Save; reload/reopen',
  'US-D08': 'Focus inquiry then native Tab to preferences', 'US-D09': 'Enter submits inquiry',
  'US-D11': 'Enter reveals hint', 'US-D13': 'Space selects radio; ArrowDown selects next option',
  'US-D42': 'Native Tab with Burmese modal open', 'US-M02': 'Keyboard activates History Review link',
  'US-M04': 'Keyboard activates hint reveal', 'US-M06': 'Space selects radio; ArrowDown selects next option',
  'US-M26-L': 'Enter submits inquiry', 'US-M33': 'Native Tab with modal open',
  'US-M34': 'Space selects Intermediate; Enter Save; reload/reopen',
  'US-M35': '16 successive native Tabs; see keyboard_modal_trace.json',
  'US-H03': 'Keyboard activation of History Review link',
};
const quote = value => '"' + String(value ?? '').replaceAll('"', '""') + '"';
const header = ['evidence_id','criterion','screen','state','locale','support_language','theme','viewport','keyboard_steps','actual_observation','severity','task_effect','recovery_recommendation','screenshot','dom','observed_at_utc','evaluator','language_competence'];
const records = rows.map(row => {
  const session = sessions.get(row.url.match(/\/learn\/([^/?]+)/)?.[1]);
  const support = session ? (session.preferencesSnapshot?.supportLanguage ?? 'Legacy: missing preference snapshot; renderer fallback') : 'Not applicable to Home/History; preferences modal displays selectable support languages';
  const language = row.state.includes('language') && session ? support + '; adaptation bilingual override inspected' : support;
  const issue = row.severity === 2 ? (row.state.includes('preferences') ? 'USI-01' : 'USI-02') : row.severity === 1 ? 'USI-03' : '';
  const screen = row.url.includes('/history') ? 'History' : row.state.includes('preferences') ? 'Preferences modal / Home' : row.url.includes('/learn/') ? 'Learning Session / Review or Resume' : 'Home';
  const keys = keyboard[row.id] ?? (row.id.startsWith('US-M29-') ? 'Space selects bounded Burmese option' : 'Not individually keyboard-tested in this capture; see named keyboard cases in report');
  return [row.id,row.criteria.join('|'),screen,row.state,row.locale,language,row.theme,`${row.width}x${row.height}`,keys,row.note,row.severity,
    issue ? `${issue}; see issues.csv for task effect` : 'No task obstruction observed in this capture',
    issue ? `${issue}; see issues.csv for recovery and recommendation` : 'No corrective action identified in this capture',
    row.screenshot,row.dom,row.at,'Codex technical evaluator under user direction',
    'AI-assisted visual/interaction inspection; no human native-language credential or independent Burmese quality judgement claimed'];
});
fs.writeFileSync(output, [header,...records].map(row => row.map(quote).join(',')).join('\n') + '\n', { flag: 'wx' });
console.log(JSON.stringify({ observations: records.length, redactedFiles: redactions.length, replacements: redactions.reduce((n, row) => n + row.replacements, 0), originalsStorage: originals }));
