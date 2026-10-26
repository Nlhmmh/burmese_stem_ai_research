"""Check the v2 evaluation's evidence identities and document integrity.

This checks record consistency, not the truth of qualitative judgements.
Run from any directory: python3 evaluation/05_conceptual_v2/raw/verify_evaluation.py
"""
from collections import Counter
import csv
import hashlib
import json
from pathlib import Path
import re
from urllib.parse import unquote

BASE = Path(__file__).resolve().parents[1]
ROOT = BASE.parents[1]
verification_path = BASE / "raw/verification.json"
errors = []
checks = {}


def require(condition, message):
    if not condition:
        errors.append(message)


def read_csv(relative):
    with (BASE / relative).open(encoding="utf-8-sig", newline="") as stream:
        return list(csv.DictReader(stream))


def table(relative, prefix):
    lines = (BASE / relative).read_text().splitlines()
    index = next(i for i, line in enumerate(lines) if line.startswith(prefix))
    header = [cell.strip() for cell in lines[index].strip("|").split("|")]
    rows = []
    for line in lines[index + 2:]:
        if not line.startswith("|"):
            break
        cells = [cell.strip() for cell in line.strip("|").split("|")]
        require(len(cells) == len(header), f"Malformed table: {relative}")
        rows.append(dict(zip(header, cells)))
    return rows


manifest = json.loads((BASE / "baseline/manifest.json").read_text())
require(manifest["baseline_id"] == "CA-V2-20261023", "Unexpected baseline")
require(len(manifest["inputs"]) == 18, "Expected 18 recorded inputs")
snapshots = 0
for entry in manifest["inputs"]:
    source = ROOT / entry["path"]
    require(source.exists(), f"Missing input: {source}")
    if source.exists():
        require(hashlib.sha256(source.read_bytes()).hexdigest() == entry["sha256"],
                f"Input changed: {entry['path']}")
    if "snapshot" in entry:
        snapshot = ROOT / entry["snapshot"]
        snapshots += 1
        require(snapshot.exists(), f"Missing snapshot: {snapshot}")
        if snapshot.exists():
            require(hashlib.sha256(snapshot.read_bytes()).hexdigest() == entry["sha256"],
                    f"Snapshot differs: {snapshot}")
require(snapshots == 3, "Expected three frozen v2 images")
checks["baseline_inputs_unchanged"] = len(manifest["inputs"])
checks["frozen_v2_images"] = snapshots

specs = [
    ("findings.csv", "Finding", [f"V2-F{i:02}" for i in range(1, 16)],
     "conceptual_triangulation.md", "| Finding |"),
    ("pirqoa_traceability.csv", "Requirement and question", None,
     "conceptual_triangulation.md", "| Problem and issue |"),
    ("refinement_review.csv", "ID", [f"R{i:02}" for i in range(1, 19)],
     "refinement_review.md", "| ID | Earlier decision |"),
    ("literature/literature_matrix.csv", "ID", [f"LV{i:02}" for i in range(1, 15)],
     "literature/literature_synthesis.md", "| ID | V2 target"),
    ("scenario/scenario_matrix.csv", "ID", [f"S{i:02}" for i in range(1, 11)],
     "scenario/photosynthesis_scenario.md", "| ID | Constructed input"),
    ("genai/interview_findings.csv", "ID", [f"GI{i:02}" for i in range(1, 17)],
     "genai/interview_analysis.md", "| ID | Source |"),
]
counts = {}
for path, key, expected_ids, report, prefix in specs:
    records = read_csv(path)
    counts[path] = len(records)
    prose_records = table(report, prefix)
    require(len(records) == len(prose_records), f"CSV/report count differs: {path}")
    for record, prose_record in zip(records, prose_records):
        require(all(record.get(k) == v for k, v in prose_record.items()),
                f"CSV/report content differs: {path}, {record.get(key)}")
    if expected_ids:
        require([r[key] for r in records] == expected_ids,
                f"Missing, reordered or duplicate IDs: {path}")
require(counts["pirqoa_traceability.csv"] == 3, "Expected three PIRQOA rows")
require(all(row["RQ_Mapping"] and row["Criterion_Mapping"]
            for row in read_csv("findings.csv")), "Unmapped finding")
for i, row in enumerate(read_csv("pirqoa_traceability.csv"), start=1):
    require(f"REQ-0{i}" in row["Requirement and question"]
            and f"RQ{i}:" in row["Requirement and question"],
            f"Missing full requirement/question in PIRQOA row {i}")
checks["record_counts"] = counts

questions = re.findall(r"^## Q([1-9]) — ", (BASE / "structured_interview/interview_analysis.md").read_text(), re.M)
arguments = re.findall(r"^## IA(\d{2}) — ", (BASE / "informed_argument/traceability.md").read_text(), re.M)
cases = re.findall(r"^## S(\d{2}) — ", (BASE / "scenario/photosynthesis_scenario.md").read_text(), re.M)
require(questions == list("123456789"), "Expected all nine interview questions")
require(arguments == [f"{i:02}" for i in range(1, 11)], "Expected ten detailed informed arguments")
require(cases == [f"{i:02}" for i in range(1, 11)], "Expected ten detailed scenarios")
checks["supplementary_desk_critique_questions"] = len(questions)
checks["informed_arguments"] = len(arguments)
checks["detailed_scenarios"] = len(cases)

interview_status = json.loads((BASE / "genai/status.json").read_text())
fixed_questions = json.loads((BASE / "genai/raw/questions.json").read_text())
require(len(fixed_questions) == 9, "Expected nine fixed interview questions")
manual_guide = (BASE / "genai/manual_interview_guide.md").read_text()
require(re.findall(r"^### Q([1-9])$", manual_guide, re.M) == list("123456789"),
        "Manual guide lacks the nine fixed question sections")
checks["separate_interview_questions_prepared"] = len(fixed_questions)
checks["separate_interview_answers_received"] = interview_status["received_answers"]
interview_complete = (interview_status["status"] == "completed"
                      and interview_status["received_answers"] == 9)

if interview_complete:
    transcript = json.loads((BASE / "genai/raw/manual_transcript.json").read_text())
    messages = transcript["messages"]
    expected_messages = ["CONTEXT", "ACK"] + [item for i in range(1, 10)
                                              for item in (f"Q{i}", f"A{i}")]
    require([m["id"] for m in messages] == expected_messages,
            "Missing or reordered interview messages")
    for message in messages:
        source = (BASE / f"genai/raw/manual_transcript_part_0{message['source_part']}.txt").read_text()
        locator = message["source_locator"]
        require(source[locator["character_start"]:locator["character_end"]] == message["text"],
                f"Interview text differs from source: {message['id']}")
    for i, question in enumerate(fixed_questions, 1):
        require(next(m["text"] for m in messages if m["id"] == f"Q{i}") == question,
                f"Interview prompt differs from fixed Q{i}")
    evidence_manifest = json.loads((BASE / "genai/raw/manual_evidence_manifest.json").read_text())
    for entry in evidence_manifest["entries"]:
        path = BASE / entry["path"]
        require(path.exists(), f"Missing interview evidence: {entry['path']}")
        if path.exists():
            require(hashlib.sha256(path.read_bytes()).hexdigest() == entry["sha256"],
                    f"Interview evidence changed: {entry['path']}")
    analysis_ratings = table("genai/interview_analysis.md", "| Criterion | Interview judgement |")
    native = json.loads((BASE / "genai/raw/native_ratings.json").read_text())["ratings"]
    answer9 = next(m["text"] for m in messages if m["id"] == "A9")
    require(len(native) == 5 and len(analysis_ratings) == 5, "Expected five native criterion ratings")
    for original, analysis in zip(native, analysis_ratings):
        require(all(value in answer9 for value in original.values()), "Native rating differs from Q9")
        require(original["judgement"] == analysis["Interview judgement"]
                and original["confidence"] == analysis["Confidence as returned"],
                "Analysis changes native judgement or confidence")
    require(transcript["start_local"] == "12:34" and transcript["end_local"] == "12:39",
            "Interview timing differs from supplied confirmation")
    checks["verbatim_interview_messages_verified"] = len(messages)
    checks["fixed_interview_prompts_matched"] = len(fixed_questions)
    checks["interview_evidence_hashes_verified"] = len(evidence_manifest["entries"])
    checks["native_criterion_ratings_preserved"] = len(native)

scenario_outcomes = Counter(r["Judgement"] for r in read_csv("scenario/scenario_matrix.csv"))
require(dict(scenario_outcomes) == {"Representable": 4, "Partly specified": 4, "Not resolved": 2},
        "Scenario counts differ from synthesis")
decisions = Counter(r["Iteration 2 status"] for r in read_csv("refinement_review.csv"))
require(dict(decisions) == {"Addressed": 4, "Scope retained": 9, "Partly addressed": 4, "Boundary retained": 1},
        "Refinement status counts differ from synthesis")
checks["scenario_outcomes"] = dict(scenario_outcomes)
checks["refinement_statuses"] = dict(decisions)

corpus = table("literature/literature_synthesis.md", "| Existing study |")
require(len(corpus) == 17, "Expected 17 existing corpus entries")
checks["existing_corpus_entries"] = len(corpus)

# Check local links and local heading anchors in the new reports and index.
markdown_files = sorted(p for p in BASE.rglob("*.md")
                        if "pre_interview_desk_review" not in p.parts) + [ROOT / "evaluation/README.md"]
local_links = 0


def heading_slugs(path):
    slugs = set()
    for heading in re.findall(r"^#{1,6}\s+(.+)$", path.read_text(), re.M):
        slug = re.sub(r"[^\w\s-]", "", heading.lower()).replace(" ", "-")
        slugs.add(slug)
    return slugs


for document in markdown_files:
    text = document.read_text()
    if BASE in document.parents:
        if document.name != "manual_transcript.md":
            require(all(line == line.rstrip() for line in text.splitlines()),
                    f"Trailing whitespace: {document}")
        require(not re.search(r"\bCodex\b", text, re.I),
                f"Unrequested activity attribution: {document}")
        require(not re.search(r"\bTODO\b|\bTBD\b|\[INSERT", text),
                f"Unfinished placeholder: {document}")
    for link in re.findall(r"!?\[[^\]]*\]\(([^)]+)\)", text):
        if re.match(r"^[a-zA-Z][a-zA-Z0-9+.-]*:", link):
            continue
        relative, _, anchor = unquote(link.strip("<>")).partition("#")
        target = (document.parent / relative).resolve() if relative else document
        # Historical top-level index may contain old anchors outside this task.
        if document.name == "README.md" and document.parent == ROOT / "evaluation":
            if "05_conceptual_v2" not in relative:
                continue
        local_links += 1
        require(target.exists() or target == verification_path,
                f"Broken link: {document.relative_to(ROOT)} -> {link}")
        if target.exists() and anchor and target.suffix == ".md":
            require(anchor in heading_slugs(target), f"Missing anchor: {link}")
checks["local_links_checked"] = local_links

# Every explicit evidence identifier in the reports must refer to a current record.
all_text = "\n".join(p.read_text() for p in BASE.rglob("*.md"))
for pattern, valid, label in [
    (r"\bV2-F\d{2}\b", {f"V2-F{i:02}" for i in range(1, 16)}, "finding"),
    (r"\bLV\d{2}\b", {f"LV{i:02}" for i in range(1, 15)}, "literature"),
    (r"\bIA\d{2}\b", {f"IA{i:02}" for i in range(1, 11)}, "argument"),
    (r"\bS\d{2}\b", {f"S{i:02}" for i in range(1, 11)}, "scenario"),
    (r"\bGI\d{2}\b", {f"GI{i:02}" for i in range(1, 17)}, "interview finding"),
]:
    require(set(re.findall(pattern, all_text)) <= valid, f"Unknown {label} identifier")

summary = {
    "baseline_id": manifest["baseline_id"],
    "evaluation_date": manifest["evaluation_date"],
    "status": ("failed" if errors else "passed" if interview_complete
               else "documentation_checks_passed_interview_pending"),
    "separate_interview_complete": interview_complete,
    "scope": "Input identity, record consistency, document completeness and local links only",
    "checks": checks,
    "errors": errors,
}
verification_path.write_text(json.dumps(summary, indent=2, ensure_ascii=False) + "\n")
print(json.dumps(summary, indent=2, ensure_ascii=False))
if errors:
    raise SystemExit(1)

