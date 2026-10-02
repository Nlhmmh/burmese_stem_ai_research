import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const raw = path.join(root, 'evaluation/02_design/white_box/raw');
const run = path.join(raw, 'RUN-B01-20261002-ROOTTESTS-02');
const afterCleanup = process.argv.includes('--after-cleanup');
const manifest = path.join(run, afterCleanup ? 'manifest_after_cleanup.sha256' : 'manifest.sha256');
if (fs.existsSync(manifest)) throw new Error('Refusing to overwrite manifest');
function walk(dir) { return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => { const file = path.join(dir, entry.name); return entry.isDirectory() ? walk(file) : [file]; }); }
const metadata = JSON.parse(fs.readFileSync(path.join(run, 'metadata.json')));
const design = path.dirname(raw);
const records = afterCleanup ? fs.readdirSync(design).filter(file => /\.(md|csv)$/.test(file)).map(file => path.join(design, file)) : [path.join(design, 'root_project_test_run.md')];
const files = [...walk(run), path.join(raw, 'run_root_project_tests.mjs'), fileURLToPath(import.meta.url), ...records, ...Object.keys(metadata.productionHashes).map(file => path.join(root, file)), ...Object.keys(metadata.testHashes).map(file => path.join(root, file))];
const unique = [...new Set(files)].sort();
fs.writeFileSync(manifest, unique.map(file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex') + '  ' + path.relative(root, file)).join('\n') + '\n', { flag: 'wx' });
console.log(JSON.stringify({ manifest: path.relative(root, manifest), entries: unique.length, sourceCopiesCreated: 0 }));
