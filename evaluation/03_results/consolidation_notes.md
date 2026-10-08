# Step 21 — Consolidated results

> **Human-verification update, 8 October 2026.** The author has confirmed personally checking every scientific and English–Burmese assessment against the original outputs and relevant references. AI assistance with preparation, execution and drafting remains acknowledged. Final interpretations and decisions are accepted by the author. This is not an independent second assessment or a claim of manual execution throughout. See the [confirmation and scope](../00_protocol/human_verification_confirmation.md). Earlier capture-time statements retain their historical meaning.

Run: `RESULTS-20261003-MASTER-01`, 3 October 2026, Pacific/Auckland.
Status: **Complete with mixed findings and explicit gaps.**

[Master results](master_results.csv), E061, contains **225 immutable result IDs
R001–R225**, using the master plan's prescribed 14 columns. It consolidates the
55 retained evidence entries present at intake, E001–E027/E033–E060. E062 is
this decision/coverage record; E063 is the
[consolidation manifest](raw/MASTER-RUN-01-manifest.sha256). The register now
contains 58 entries. E028–E032 remain retired and are not reused.

This is recorded-evidence synthesis, not a new application, provider, database,
test, participant, expert or human-content-review execution. No production
source, prompt, schema, reference oracle or earlier result was changed. The
66 recorded production files still match B01 commit
`37faefa236829aa3d79e023faa1fb72a086b5c2a`; root-project test evidence retains
its separately identified `ROOTTESTS-02` profile. No source-copy checkout was
created.

## 1. How to read the CSV

Columns, in order:

```csv
result_id,baseline_id,artefact,method_ids,criteria,requirements,research_questions,execution_status,outcome,evidence_ids,interpretation,limitations,conflicting_evidence,follow_up
```

- One row is one bounded finding, criterion synthesis, case assessment, decision
  or explicit gap. It is **not necessarily one executed test**. Several levels
  reuse the same evidence and must not be counted as independent confirmations.
- Pipe-separated cells contain multiple method, criterion, REQ, RQ or evidence
  IDs. Resolve E IDs through [the evidence register](evidence_register.csv)
  to the exact path/hash/run. Case and argument IDs are in `artefact` or the
  interpretation; they are not replacement evidence IDs.
- `criteria` identifies the responsibility a finding informs, not a claim that
  it proves the entire criterion. REQ/RQ mappings are traceability contributions,
  not declarations that a research question is empirically answered.
- `baseline_id` distinguishes historical original-A3 records, E056 §26's refined
  conceptual framework, the current conceptual argument revision, and B01
  executable evidence. Historical unknown commit/model/date fields remain
  unknown. A 3 October indexing date is not a historical execution date.
- R001–R005 are **new bounded analyst syntheses** of recorded conceptual
  evidence, not regraded GENAI-01 or historical triangulation outcomes. C1's
  Fully supported means explicit conceptual responsibility coverage only.
  C2–C5 remain Partially supported for the recorded coherence, theory,
  literature-transfer and scenario limits. The final refined framework was
  not retrospectively presented to the original GenAI evaluator.
- R080–R092 retain all thirteen protocol Functionality outcomes as **Partial**.
  Mechanical subclaims elsewhere can pass without promoting those aggregates.
  R093–R101 retain Usability's **six Pass / three Partial** within technical
  inspection scope. Functionality is now accounted for in consolidation, not
  declared an all-pass implementation or an educational-effectiveness finding.
- Nonempty limitations/conflict/follow-up fields are deliberate. “None recorded
  within this row's stated scope” is not evidence that no counterexample exists.

### Execution status and native outcome scales

`Executed` includes a completed analytic method, not only a running program.
`Recorded` labels derived historical triangulation, refinement or administrative
provenance. `Blocked` preserves an unsuccessful environment-dependent attempt;
`Not run` means the specified assessment was not performed; `Skipped` labels
the intentional optional expert-study omission; `Not applicable` identifies a
genuinely unreachable or no-session path, not a substitute for a passed test.

Outcomes retain their method's meaning:

| Row family | Outcome meaning |
| --- | --- |
| Current C1–C5 | Protocol conceptual support judgement; rationale only, not learner-effect validation |
| CA-ARG v2 | Conceptually justified / Justified with qualification; research warrant plus mechanism/removal test/counterargument |
| Historical GenAI/literature/triangulation | Original recorded labels, including unsupported proposals and mixed/unresolved positions; not converted to FURPS scores |
| Refinement decisions | Accept, qualified/exception acceptance, Reject; design/scope decisions, not behavioural pass/fail |
| FURPS and case records | Pass, Partial, Fail and original scoped qualifications; Fail is not silently converted to Partial |
| DA-ARG | Supported or Partially supported for the specified feature argument, not educational effectiveness |
| DA-LIT | Strong, Moderate, Limited, Contradictory/uncertain; literature relationship, not application success |
| Simulation | Mixed aggregate, individual Fail or Controlled ambiguity; delivered content assessed separately |
| Coverage/timing | Descriptive only; no invented coverage threshold, latency SLA or statistical population inference |
| Gaps/issues | Not assessed, Not applicable, Blocked or Concern identified, with a reason and any recorded severity |

No global Pass percentage or average of heterogeneous scales is calculated.
No rate treats result rows, screenshots, assertions, provider calls and outputs
as interchangeable observations. If a later paper reports a pass rate, state
the case family, `Pass / executed assessable cases`, denominator and exclusions.
The following are separate recorded counts, not a pooled success score:

- Black-box assessed cases: 24 = 21 Pass, two Partial, one Fail. First API
  outcomes and supplemental/recheck records are retained separately.
- Simulation attempts: 55 = 44 technical Pass, eight controlled initial
  ambiguities without sessions, three technical Fail. The aborted predecessor
  runner is excluded from this full-run denominator.
- Endorsed delivered-output assessments: 91 = 18 Pass, 71 Partial, two Fail.
  Rejected/not-delivered responses, fade and cap do not manufacture additional
  delivered-output ratings. These ratings are not 91 independent learners.
- White-box: 361 deterministic + 12 isolated MongoDB tests, all passing in the
  recorded root-project run; repeated suite commands are not extra unique tests.
- Bounds: 17 recorded cases pass within deterministic-provider/real-DB scope.
- Usability: nine criteria = six Pass, three Partial; 133 captures are not 133
  independent participants or criterion scores.
- Design literature: 13 comparisons = one Strong, nine Moderate, two Limited,
  one Contradictory/uncertain; these are not thirteen application test scores.

## 2. Coverage index

| Result IDs | Substantive coverage |
| --- | --- |
| R001–R005 | Current C1–C5 bounded conceptual synthesis |
| R006–R012 | Seven current literature-grounded stage arguments IA-C01–IA-C07 |
| R013–R017 | Original GenAI criterion judgements and historical C4 crosswalk |
| R018–R036 | Nineteen conceptual literature findings |
| R037–R061 | Twenty-five historical triangulation findings, including risk, scope and topology disagreements |
| R062–R079 | E056's eighteen refinement decisions; source R01–R18 are distinct from master R001–R225 |
| R080–R092 | All F1–F13 aggregate outcomes, Partial retained |
| R093–R101 | All U1–U9 aggregate outcomes, six Pass / three Partial retained |
| R102–R115 | Formal static cases STA-01–STA-14, including original narrow coverage scope |
| R116–R128 | DYN-01–DYN-13, including indirect-count Partial Pass and driver-path adjudication |
| R129–R145 | All seventeen bounds cases, including atomic-write/provider-cost distinction |
| R146–R152 | WB01–WB06 and 42-file V8 coverage; underlying 373-test register remains the detailed assertion index |
| R153–R176 | All BB01–BB24 assessed outcomes, original first outcomes and public-boundary qualifications |
| R177–R184 | Eight design informed arguments IA-D01–IA-D08 |
| R185–R197 | All thirteen design literature comparisons DL01–DL13, source/transfer limits retained |
| R198–R205 | Full simulation accounting, three technical failures, eight no-session ambiguities, endorsed mixed output ratings and two content failures |
| R206–R211 | Fresh B01 Photosynthesis walkthrough plus five provisional content observations; API-only checks distinguished |
| R212–R214 | Three retained usability issues with severity/workaround/follow-up |
| R215–R224 | First Blocked attempt, original supplemental oracle failure, semantic-review gaps, NA UI path, unexecuted fault, optional expert omission and claim/release boundaries |
| R225 | Fifteen descriptive live initial-generation timing attempts |

All fourteen performed conceptual/design method IDs appear. Historical
`DE-SIM`, `DE-BB`, `DE-WB` map to protocol `DA-SIM`, `DA-BB`, `DA-WB` without
changing their evidence-register rows. `CA-SYN` and `CA-REF` identify derived
source documents, not fifth/sixth independent conceptual methods.
`EX-C|EX-D` appears only for the skipped optional studies, not as performed
methods. `Not applicable` in `method_ids` is an explicitly explained
administrative-provenance sentinel, not a newly executed evaluation method.

## 3. Conflicts and boundaries retained

### Scholarly rationale is not empirical learner evidence

The current [conceptual argument v2](../01_conceptual/informed_argument/traceability_v2.md),
E058, with [source verification](../01_conceptual/informed_argument/reference_verification_v2.md),
E059, is the current CA-ARG rationale. E053's original argument and E055's
historical triangulation remain intact. The two argument versions share
evidence and are not independent replications. The design argument similarly
retains [its cited research warrants and access limits](../02_design/informed_argument/traceability.md),
E039–E040. Step 21 introduces no new literature search or uncited empirical
proposition.

Goodhue and Thompson's TTF warrant motivates task alignment, not a validated
Burmese-STEM fit scale. Van de Pol et al.'s contingency/fading/transfer benchmark
qualifies structural responsiveness: self-reported need does not establish
performance-calibrated scaffolding. Those literature-based interpretations,
and the exact cited editions/locators, remain traceable through E058/E059 and
E039/E040. They do not establish learning gains, mastery after High, optimal
two-round support, or universal necessity of exactly seven stages.

Historical conceptual C4 means completeness/boundary clarity, whereas protocol
C4 means literature consistency. The old label is not counted as direct
literature evaluation. R004 uses E051/E052 and the focused current revision;
R016 records the original GenAI boundary judgement under supplementary C2.

### Mechanical correctness versus delivered content

Bounds/WB/HTTP evidence supports tested routes, zero-generation fade/cap,
atomic persistence and ownership. It does not erase:

- R199–R201: SIM05-C abort and SIM-CM-13/16 rejected unchanged corrections;
  safe error/no state mutation does not make intended delivery successful.
- R204–R205: endorsed gravity mass/weight terminology and ion net-charge
  definition failures. Better later adaptations do not repair earlier text.
- R159–R160/R217: BB07/BB08 fixture novelty unassessed and assessed Partial.
  Prefix changes are not meaningful novelty.
- R207–R211: fresh scenario content was initially analysed with Codex assistance
  and has since been personally checked by the author. Chloroplast-scope wording, extensive nontechnical
  English retention and limited first-example novelty remain qualified.
- R212–R214: modal focus, English errors in Burmese UI and generic ambiguity
  badge remain open at severities 2, 2 and 1 respectively.

The stored two-round bound is not a provider-cost ceiling: BND-15 admitted
only one write but both contenders made a provider call. A 20-second configured
abort is not a hard elapsed-time guarantee: SIM05-C observed 52.825 seconds.

### Original failures, corrections and historical gaps

BB22's frozen missing-identity 400 expectation remains Fail (R174); the public
proxy provisions a scoped anonymous cookie and returns empty History.
Foreign-access rejection passed and no leakage was observed. Handler-level
missing-identity tests do not overturn the public-boundary result.

The extra BB08 zero-round ambiguity assertion remains a separate Fail (R216),
with its post-observation addendum labelled. DYN-10's driver-property-path
failure and four false browser predicates retain recorded adjudications/rechecks;
they are not asserted as application defects. STA-04's first Blocked attempt
(R215) remains separate from its permitted unchanged passing retry (R105).

The supplied historical Photosynthesis scenario did not capture cap/fade or a
full lifecycle. The fresh B01 scenario does not retroactively supply those
historical observations. Historical simulation files may still say review was
pending at capture: E022/E023 provide the later dated endorsement. The
[current confirmation](../00_protocol/human_verification_confirmation.md)
additionally records personal scientific and bilingual checking, including
separate scenario observations, without rewriting the original execution evidence.

### Privacy and not-assessed work

Original synthetic cookie-bearing black-box records remain restricted under
E057; the consolidation does not clear them for public release. No identity
cookie/token is copied into the new result table. Published derivatives need
labelled redaction and separate provenance.

R218–R223 explicitly retain unreachable invalid-preference UI, unexecuted
preference-save infrastructure faults, skipped optional experts, absent
participant/learning/WCAG work, unvalidated optimality/fit and unmeasured
superiority. These are not fabricated failures or assumed passes.

## 4. Verification and next action

[Intake metadata](raw/MASTER-RUN-01-input.json) records the exact pre-extension
register bytes/hash, all 55 evidence paths/hashes, current documentation HEAD,
66 production identities and immutable result-ID/artefact keys.
[Final verification](raw/MASTER-RUN-01-verification.json) checks:

- the exact 14-field CSV schema, 225 unique IDs, nonempty fields and engine
  import round-trip;
- E-ID resolution, canonical method coverage and REQ/RQ/criterion syntax;
- all 27 aggregate rows, thirteen F Partials, six U Pass/three U Partials and
  21/2/1 assessed black-box outcomes;
- unchanged original 55 register bytes, registered source hashes and all
  66 production hashes;
- the consolidation manifest and local handover links.

The manifest excludes the living evidence register, living master/protocol
and its own final verification to avoid circular or obsolete checkpoint hashes.
The final verification records the extended register hash as captured, not as
a constraint on authorised future append-only indexing. Original run manifests
and Step 20's as-captured 52-entry checkpoint retain their historical meaning.

**Next: Step 22 — Final PIRQOA Evaluation Matrix.** Use these result IDs and
their evidence/limitations to create `pirqoa_traceability.csv` with the master
plan's §31 schema. Do not declare RQ1–RQ3 fully answered merely from passing
mechanical subclaims. Do not write the final paper or implement/retest fixes
as part of this Step 21 consolidation.

Final traceability review before handover narrowed DL04 to bilingual display/
language-help, DL05 to personalised response/adaptation/preferences, and DL06
to term retention/language routing, using their recorded capability and PoC
fields. Only the derived table's criterion mappings and its consolidation hashes
were corrected. Result IDs, outcomes, source evidence, intake bytes and B01
were unchanged; final verification reflects these corrected mappings. This is
not a retest, oracle amendment or new empirical result.
