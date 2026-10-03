# Step 22 — Final PIRQOA evaluation matrix

Run: `TRACE-20261003-PIRQOA-01`, 3 October 2026, Pacific/Auckland.
Status: **Complete with qualified answers and explicit gaps.**

[pirqoa_traceability.csv](pirqoa_traceability.csv), E064, contains 24 rows with
the prescribed 13-column schema. Every row traces the stated problem and issue
through a requirement, RQ, objective, artefact, stage responsibilities,
criteria, existing result IDs and retained evidence to a supported claim and
an unsupported claim or remaining gap.

The matrix selects **140 existing immutable results** from
[master_results.csv](master_results.csv), E061, and links **53 original evidence
IDs** through those results. E065 is this mapping/coverage record; E066 indexes
the [traceability manifest](raw/PIRQOA-RUN-01-manifest.sha256). The evidence
register now contains 61 entries, E001–E027/E033–E066; E028–E032 remain retired.
The 58 intake register rows, all 225 master results and their IDs, and the
66 recorded B01 production files are unchanged.

This is a derived traceability analysis, not another evaluation method or a new
app, test, provider, database, participant, expert or human-content-review run.
No source-copy checkout, production change, new endorsement, oracle amendment
or public-release clearance is implied.

## 1. PIRQOA identities and coverage

The requirement IDs are local evidence-tracking IDs from
[protocol §3](../00_protocol/evaluation_protocol.md#3-pirqoa-and-artefact-traceability),
not original assignment labels. Problem statements are the supplied project
motivation, not a new prevalence estimate or measured learner barrier. The
matrix uses the protocol's requirement/objective wording as separate fields.

Research questions retained from the protocol and Assignment 2:

1. **RQ1:** How can specialized English STEM terminology be supported for
   Burmese-speaking learners?
2. **RQ2:** How can LLM-based support help learners understand STEM concepts
   beyond translation?
3. **RQ3:** How can LLM-based scaffolding provide structured and adaptive support
   for Burmese-speaking STEM learners?

| Requirement / RQ | CSV data rows / physical lines including header | Coverage |
| --- | --- | --- |
| REQ-01 / RQ1 | 1–7 / lines 2–8 | Overall assessment; target terminology; technical context; bilingual presentation; selective English retention; bounded correction; enabling inquiry/errors |
| REQ-02 / RQ2 | 8–13 / lines 9–14 | Overall assessment; core meaning versus scaffold; all five initial support forms; concept-focused revision/example novelty; scientific/Burmese adequacy; readable presentation |
| REQ-03 / RQ3 | 14–24 / lines 15–25 | Overall assessment; optional Stage 6A/6B; deterministic routing; contingency limits; fade; two-round/atomic bounds; scoped follow-up; History/Review/Resume; preferences; errors/ownership; usability limits |

Each RQ's first row gives a **Partially supported overall** answer. Subsequent
rows distinguish the narrower propositions supporting it. This is not a new
FURPS outcome scale: all thirteen F Partials and the six U Pass/three U Partials
in the master results remain unchanged. Addressing a question with evidence and
limits does not mean fully satisfying every requirement or demonstrating an
educational effect.

### Qualified answers available from this evaluation

- **RQ1:** A defensible design combines target/context interpretation with
  selective Burmese/English support and bounded repair. Recorded implementation
  cases instantiate those responsibilities. Dependable intended-meaning
  interpretation and terminology fidelity remain incomplete.
- **RQ2:** Layered core explanation and supporting examples, reflection and
  hints instantiate support beyond isolated translation. Recorded content can
  be explanatory, but mixed adequacy and material definition/terminology errors
  prevent a claim of consistently correct support or improved understanding.
- **RQ3:** Optional stated-need input can drive application-controlled routes,
  bounded generation, scoped follow-up and persistent continuity. Tested state
  mechanics are corroborated; calibrated educational contingency, fading,
  transfer of responsibility and an optimal support dose are not established.

These are bounded traceability conclusions, not final-paper prose or a new
participant-effectiveness claim. Step 23 will classify and interpret the
already recorded claims.

## 2. Reading and verifying the chain

```text
problem → issue → requirement_id/requirement → rq → objective
→ artefact/framework_stages → criteria → result_ids → evidence_ids
→ supported_claim + unsupported_claim_or_gap
```

The actual CSV header is:

```csv
problem,issue,requirement_id,requirement,rq,objective,artefact,framework_stages,criteria,result_ids,evidence_ids,supported_claim,unsupported_claim_or_gap
```

Pipe-separated lists identify criteria, result and evidence IDs. For each row:

1. Find every R ID in E061's master results. Its `baseline_id`, method, status,
   outcome, interpretation and limitations define the claim's scope.
2. Find every E ID in [the evidence register](evidence_register.csv) for the
   exact retained path, hash and run. The row's evidence list is the deduplicated
   union of its selected results' evidence IDs, not invented new corroboration.
3. Read the source case/argument locator and remaining gap before borrowing a
   sentence for the paper. A result may contribute to a criterion without
   proving the whole criterion.

The matrix is selective, not an export of all 225 rows. Detailed case/decision
coverage remains in E061/E062. Reuse of a result or evidence ID across multiple
REQ/RQs does not create independent observations. No pass rate, pooled score
or ranking is computed.

`framework_stages` lists conceptual responsibilities or permitted re-entry;
6A/6B are subdivisions of Stage 6, not separate additional stages. Interface,
provider, DAO and continuity controls are labelled enabling boundaries, not an
eighth stage. Follow-up remains concept-scoped assistance and leaves Stage 7
state unchanged. These labels do not imply one LLM call per stage.

## 3. Evidence distinctions retained

### Conceptual warrant versus observed behaviour

The current scholarly argument is E058/E059; E053 remains historical. The
[current conceptual argument and verified references](../01_conceptual/informed_argument/traceability_v2.md)
and [design informed argument](../02_design/informed_argument/traceability.md)
contain the cited literature warrants, access/version limits and design
inferences used here. The matrix introduces no new literature search.

TTF motivates accountable task alignment without providing a measured
Burmese-STEM fit scale. Scaffolding's contingency/fading/transfer benchmark
qualifies self-report responsiveness; reducing generation is not established
performance-calibrated fading. The cited sources and their exact versions are
traceable through E058/E059 and E039/E040. Their rationale is not counted as
another successful runtime execution.

Historical conceptual records are not assigned a B01 execution identity. E057's
historical C4/method crosswalk applies: boundary-completeness C4 is distinct
from protocol literature-consistency C4; derived triangulation/refinement and
the two argument versions are not independent replications.

### Direct task support versus enabling technical evidence

Term/context/language, explanation content and response-specific support can
address the three substantive tasks. Ownership, safe envelopes, snapshots,
History/Review/Resume, UI feedback and persistence enable those tasks. Their
correct operation does not itself demonstrate language fidelity, conceptual
learning or adaptive pedagogy. Browser locale/theme are display preferences,
not a claim of synchronised proficiency/profile diagnosis.

### Failures and incomplete coverage remain explicit

- SIM05-C and SIM-CM-13/16 remain intended-route delivery Fail. Safe errors and
  unchanged state support mechanics only; unreached dependent steps are not
  successful adaptations or cap observations.
- The eight controlled initial ambiguities have no session and therefore no
  downstream correction loop. They are not failed delivered-content ratings
  or successful corrected-session workflows.
- The endorsed simulation has 91 delivered-output ratings: 18 Pass, 71 Partial
  and two Fail. Gravity mass/weight and ion net-charge errors remain; later
  better adaptations do not repair initial text. Nathan's endorsement applies
  to those AI-assisted worksheets, not an independent second assessment or
  new scenario endorsement.
- BB07/08 remain Partial because fixture semantic novelty was not assessed.
  BB22's missing-identity oracle remains Fail despite observed foreign-access
  isolation. The supplemental zero-round ambiguity assertion is not rewritten.
- The fresh Photosynthesis scenario's High/cap and post-completion observations
  include labelled API-only checks. Its content remains provisional; limited
  example novelty, English retention and bacterial/chloroplast scope concerns
  are not given an unconditional Pass.
- BND-15 protects one atomic write but allows two provider calls. Two rounds is
  not a global provider-cost ceiling or a pedagogically optimal dose. The
  measured 52.825-second simulation abort is not a hard 20-second latency bound.
- U5/U8/U9 remain Partial. Modal focus and English-only errors have severity 2;
  the remaining-ambiguity badge has severity 1. No fixes are implied.
- Invalid preference choices are UI-unreachable (Not applicable); infrastructure-
  fault save recovery was Not assessed. Optional experts were skipped, and
  participant learning/usability, full WCAG certification and universal
  novelty/superiority were not evaluated.

Restricted original synthetic cookie-bearing evidence retains E057's release
boundary. The matrix copies no identity-cookie values and does not grant
permission to publish the original captures.

## 4. Verification and handover

[Intake metadata](raw/PIRQOA-RUN-01-input.json) records the exact 58-entry
register bytes/hash, master result hash, source identities and row coverage.
The [final verification](raw/PIRQOA-RUN-01-verification.json) checks the exact
13-column schema, 24 nonempty chains, three correct REQ/RQ identities, all
selected R/E IDs, criterion provenance and the engine CSV round-trip. It also
checks all 58 original evidence hashes/rows, the unchanged 225-row master, all
66 B01 production identities, the traceability manifest and local handover
links. The independent retained-register audit checks registered child manifests.

Living master/protocol/register files, this manifest's own final verification,
and the manifest itself are excluded from its child list to avoid circular or
obsolete living-index checks. E061's master-results CSV is an immutable input
and is included. The final verification captures the extended register hash;
future authorised append-only indexing does not invalidate historical captures.

**Next: Step 23 — Interpretation Rules.** Distinguish strong bounded mechanical
support, partial evidence, conceptual rationale and unsupported claims using
these result/evidence links. No RQ should be upgraded merely because it now
has a complete traceability chain. Final paper drafting and any production
fix/retest are outside this Step 22 execution.
