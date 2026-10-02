# Step 16 — Design informed argument

| Document control | Value |
| --- | --- |
| Method / analysis | DA-ARG / ANALYSIS-B01-20261003-INFORMED-ARGUMENT-01 |
| Date / evaluator | 3 October 2026, Pacific/Auckland; Codex evidence synthesis under user direction |
| Artefact | Root Burmese STEM AI PoC, B01 production; ROOTTESTS-02 test/config profile |
| Status | Completed with qualifications: eight feature arguments; two Supported, six Partially supported within the stated scope |
| Evidence | E039 argument; E040 reference verification; E041 integrity manifest; existing E001–E027 and E033–E038 |
| Changes | Documentation only; no new application execution, model calls, production fixes or participant/human-review claims |

## 1. Method and knowledge-base foundation

An informed argument is not simply a plausible explanation of the developer's
choices. [Hevner et al. (2004, p. 86, Table 2)](https://doi.org/10.2307/25148625)
identify it as descriptive evaluation grounded in the research knowledge base.
Their accompanying discussion also cautions against relying on descriptive
evaluation where other methods are feasible. Here it **complements**, rather
than replaces, the already recorded static, dynamic, bounds, simulation,
black-box, white-box and usability evidence. It contributes a reasoned
interpretation of those records, not another independent dataset.

For every feature, the chain is:

> Problem/issue → requirement/RQ → conceptual responsibility → cited research
> warrant → B01 feature → recorded observation → counterargument → conclusion.

The primary IS lens remains **Task–Technology Fit (TTF)**. Goodhue and
Thompson's model links performance impact to both utilisation and fit between
technology and supported tasks, not to feature availability alone.
Applying that organisational model to learner tasks is this project's design
inference, not an already validated educational measurement.
[Goodhue & Thompson (1995)](https://doi.org/10.2307/249689).

The complementary educational lens remains **Scaffolding Theory**. The review
by van de Pol et al. distinguishes contingency, fading and transfer of
responsibility and stresses diagnosis of current competence. These distinctions
provide a critical benchmark: reacting to a self-report is not equivalent to
diagnosing competence, and withholding another explanation does not establish
independent performance.
[van de Pol et al. (2010, “Characterizations of scaffolding”)](https://doi.org/10.1007/s10648-010-9127-6).

Venable et al.'s FEDS distinguishes artificial from naturalistic evaluation.
This analysis draws on controlled tests, artificial cases and technical
inspection; it cannot establish utility in real learner practice. The literature
verification performed for this document adds bibliographic knowledge, **not
new PoC empirical evidence**.
[Venable et al. (2016, “Dimension 2: paradigm of the evaluation study”)](https://doi.org/10.1057/ejis.2014.36).

### Source continuity

The requirements are the protocol's REQ-01–03/RQ1–3 (§3). Conceptual
responsibilities follow Assignment 3 and the refined seven-stage contract.
Assignment 4, §4, Table 2 and pp. 15–17 supplies the original feature rationale;
it is a design input, not proof of final refined behaviour. Assignment 2,
§§2.1–2.3, pp. 4–5 supplies the language/concept/scaffolding literature context.
See the [reference verification record](reference_verification.md) for source
locators, access limits and explicitly additional sources/versions. The
completed conceptual evaluation and historical Assignment 4 evidence are not
rewritten. CTML is not substituted for the later TTF/scaffolding foundation.

### Decision rule

- **Supported:** a cited warrant and relevant recorded evidence substantiate
  the explicitly bounded claim; no unresolved contradiction to that claim.
- **Partially supported:** rationale is defensible and some behaviour is
  evidenced, but a relevant failure, quality gap or transfer limit prevents the
  fuller requirement claim.
- **Not supported:** relevant recorded evidence contradicts the stated claim.
- **Not assessed:** the evidence needed for the claim is absent.

These are analytical argument conclusions, not replacements for FURPS Pass/
Partial/Fail or content scores. Technical and educational claims are separated.

## 2. Recorded design evidence used

| Evidence | Recorded finding used here | Boundary |
| --- | --- | --- |
| E001–E003: [static record](../static/static_analysis_test_cases.md) | Buildability, architectural separation, validation/ownership/persistence inspection and historical service/DAO coverage | Source/compilation is not observed learning or current application-wide coverage |
| E004–E013: [dynamic register](../dynamic/dynamic_analysis_test_cases.md#workflow-execution-register) | Live creation, routes, corrected context, scoped follow-up, persistence and desktop observation; DYN-05/06 retain indirect provider-count qualification | Later direct counts corroborate the bound, but do not erase those original Partial Pass labels |
| E014–E017: [bounds analysis](../optimisation/bounds_analysis.md) | BND-01–17 passed; real MongoDB; no round 3; event-only fade/cap; explicit completion; atomic contention | BND-15 made two provider calls but only one accepted write; no pedagogical/cost optimality proof |
| E018–E021: [simulation capture](../simulation/simulation_analysis.md), [failure analysis](../simulation/failure_analysis.md) | 55 attempts: 44 technical Pass, eight initial controlled ambiguities, three technical Fail | Handler/service/DB with live provider, not deployed public HTTP/browser; initial ambiguity has no downstream session |
| E022–E023: [endorsed review](../simulation/review_completion/approval_record.md), [scores](../simulation/human_content_scores.csv) | 91 delivered-output ratings: 18 Pass, 71 Partial, two Fail; Nathan's reported review/endorsement of AI-assisted worksheets | No independent second assessor, learner experiment or new endorsement; failed/not-delivered steps not scored as delivered content |
| E024–E027: [black-box analysis](../black_box/black_box_analysis.md) | Assessed BB01–24: 21 Pass, two Partial, one Fail; controlled public HTTP/browser, ownership and state evidence | BB07/08 fixture text does not establish novelty; BB22 remains an oracle/boundary failure, not observed leakage |
| E033–E035: [root white-box analysis](../white_box/white_box_evaluation.md) | 361 deterministic + 12 real MongoDB tests; WB01–06 structural Pass; 39 route/round combinations | 42-file V8: 72.54% statements / 76.37% branches; untested paths remain; mocks do not establish live quality |
| E036–E038: [usability inspection](../usability/usability_inspection.md), [issues](../usability/issues.csv) | 133 captures, eight basic configurations; six U Pass, three Partial; USI-01/02 severity 2, USI-03 severity 1 | Technical evaluator inspection; no participant/WCAG certification; synthetic route content not a semantic oracle |

The simulation capture's historical “review pending” wording is superseded for
current review status by E022–E023, not silently edited. Multiple reports of the
same test or reused fixture are not independent corroborating experiments.

## 3. Feature-level informed arguments

### IA-D01 — Terminology, context and bounded correction

**Problem → requirement → concept.** Ambiguous English STEM terms can lead to
support for the wrong disciplinary meaning. REQ-01/RQ1 requires terminology
and context identification; REQ-02/RQ2 depends on that interpretation. This
maps to Stages 1–2 and the Stage 7 reinterpretation route.

**Literature warrant.** Tran et al.'s author-posted survey describes ATE as
identifying candidate terms from domain-specific corpora. It justifies
recognising a specialised target, not calling the PoC an evaluated ATE system.
The accessible 2023 preprint is cited separately from the Assignment 2
2026 journal version; the two are not treated as identical texts.
[Tran et al. (2023, abstract)](https://arxiv.org/abs/2301.06767).

**Feature and evidence.** The initial service returns a bounded concept/domain
and structured support in one generation request; application validators
control accepted output. WB04 and BB03 test the structured/ambiguity boundary.
DYN-08 records a persisted correction; BB08's dated addendum and WB01/WB05
corroborate previous/current interpretation and atomic persistence. Usability
D21/M11 shows the corrected heading and trace (E005–E006, E024–E027,
E033–E038). These show a correction mechanism, not universally correct meaning.

**Necessity / counterargument.** Removing active context would leave later
support without a stable subject. However, identification/context are coupled
within an LLM call, not separately benchmarked deterministic extraction stages.
SIM-CM-13/16 rejected outputs that labelled an unchanged interpretation
“corrected”; both failed intended paths and left state unchanged. SIM14/15 and
SIM-CM-14/15 returned initial ambiguity with no session, so no later correction
could execute. Controlled cell fixtures reuse photosynthesis initial text;
they cannot validate the scientific correctness of corrected explanations.
Historical initial sections also remain historical after a correction rather
than being newly regenerated (E019–E023, E026).

**Conclusion: Partially supported.** Concept-scoped identification/correction is
defensible and implemented, but reliable intended-meaning recovery is not
established. Universal interpretation accuracy is **Not assessed**.

### IA-D02 — Selective Burmese/English language support

**Problem → requirement → concept.** Literal translation can make familiar
technical terminology less recognisable. REQ-01/RQ1 maps to Stage 3 and the
Stage 7 language-support route.

**Literature warrant.** Kleidermacher and Zou report scientific-paper readers
preferring some familiar technical terms to remain untranslated and investigate
prompt-based mitigation of overtranslation. This supports selective retention,
not blanket English retention or validated Burmese STEM terminology.
[Kleidermacher & Zou (2026, p. 3932)](https://aclanthology.org/2026.findings-eacl.204/).

**Feature and evidence.** Session preference snapshots select English, Burmese
or bilingual presentation; explicit language help can override an adaptation
to bilingual without changing the profile. DYN-07, BB04/07, WB06 and inspection
D24/M09 establish payload, immutable preference and visible bilingual override
(E005–E006, E010–E013, E024–E027, E033–E038).

**Necessity / counterargument.** Without selective language treatment, the
artefact would reproduce a translation-only interface. Yet a preference or
prompt instruction is not a reliable glossary, and researcher-paper preferences
do not necessarily transfer to novice Burmese learners. E022–E023 retains
material language failures, including SIM04-B initial. USI-02 exposes English-
only learner errors in Burmese UI; U6 visual Pass cannot cancel U8/U9 Partial.
Myanmar-script constraints are not uniformly enforced by runtime validators
(E033–E037).

**Conclusion: Partially supported.** Selective presentation and overrides work
under tested conditions; consistently adequate Burmese language support does not.

### IA-D03 — Core explanation plus structured scaffolding

**Problem → requirement → concept.** A translated term alone does not provide
conceptual explanation. REQ-02/RQ2 maps to Stage 4 core meaning and Stage 5
structured access through explanations, examples, reflection and a hint.

**Literature warrant.** Athukorala and De Silva describe a Sinhala Java learning
tool combining native-language queries with code/diagram assistance. It is a
relevant precedent for domain support beyond lexical substitution, not a result
for Burmese STEM or this implementation.
[Athukorala & De Silva (2025, p. 151)](https://doi.org/10.7763/IJCTE.2025.V17.1378).
The educational benchmark in §1 adds a reason to make support accessible and
responsive, without prescribing this exact five-section layout.

**Feature and evidence.** The one-call initial contract includes simple,
real-world/example and technical explanations, a reflective prompt and hint.
WB04 accepts/rejects bounded structured output before save; BB05, dynamic
DYN-02 and U2 show distinguishable sections and revealable hints on screen
(E004–E006, E010–E013, E024–E027, E033–E038).

**Necessity / counterargument.** Removing conceptual content returns the system
to terminology translation; removing structure leaves an undifferentiated answer.
Nevertheless, compulsory initial sections may be redundant for some tasks, and
the recorded evidence does not compare layouts. Structural completeness is not
truth: E022–E023 preserves SIM04-B and SIM08-B initial content Fail, and most
delivered outputs remain Partial. The five forms are design choices, not a
theoretically mandatory sequence.

**Conclusion: Partially supported.** Explanation/scaffold structure is justified
and visible; dependable scientific/pedagogical adequacy is incomplete. Improved
conceptual understanding or retention is **Not assessed**.

### IA-D04 — Stage 6A/6B as optional learner-response input

**Problem → requirement → concept.** Static support cannot reflect a learner's
stated request. REQ-03/RQ3 maps to Stage 6: retain three overall responses and
offer five bounded support choices, with skip/back and short clarification only
for a concept mismatch.

**Literature-informed inference.** Applying the contingency benchmark in §1
supports obtaining a learner signal before changing assistance. TTF also
supports making available actions correspond to the stated task. Neither
theory validates these exact self-report categories as competence measures
([van de Pol et al., 2010](https://doi.org/10.1007/s10648-010-9127-6);
[Goodhue & Thompson, 1995](https://doi.org/10.2307/249689)).

**Feature and evidence.** WB01 covers input guards and all 39 route/round
combinations; BB23 rejects invalid/conflicting response combinations. U3
records all five options, optional skips, bounded clarification and native
Space/ArrowDown selection. A01/A02 explicitly exercise Back after selection
on both widths: Stage 6A restores, provider count does not increase and all
30 stored sessions remain unchanged (E024–E027, E033–E038).

**Necessity / counterargument.** Removing response collection would make
adaptation unrelated to the learner's stated preference. Forcing a difficulty
choice would add unsupported diagnostic precision. Conversely, learners can
misjudge their need, and no recorded questionnaire/learning task calibrates the
signals. The legacy field `understanding` is a storage name, not measured mastery.

**Conclusion: Supported for bounded, optional collection of stated support need.**
Valid diagnosis of competence and actual task fit are **Not assessed**. This
conclusion does not validate the subsequent generated adaptation's quality.

### IA-D05 — Deterministic adaptation, fade and stopping bounds

**Problem → requirement → concept.** A response is useful only if subsequent
assistance or the next action changes coherently. REQ-03/RQ3 maps to Stage 7,
with language help also serving REQ-01 and concept clarification REQ-02.

**Literature-informed inference.** The distinction between changing assistance,
reducing it and independent performance in the scaffolding benchmark supports
different actions for reported needs. It does **not** prescribe these routes or
the two-round maximum ([van de Pol et al., 2010](https://doi.org/10.1007/s10648-010-9127-6)).

**Feature and evidence.** The application, not the model, selects Stage 5,
language-support, conceptual-clarification, reinterpretation or fade routes.
High records an event without generation/increment; Finish remains explicit.
At round 2 a further response is recorded without round 3. BND-04–14 and WB01
directly count calls/writes; WB05 corroborates real atomic contention. U4/U7
shows fade, round/limit, response history and completion (E014–E017, E033–E038).

**Necessity / counterargument.** Without controlled routing and stopping, state
permission would depend on generated text and interaction could become general
chat. But reacting to self-report is only a limited proxy for educational
contingency; High is a PoC fade action, not evidence of measured mastery or
gradual withdrawal/transfer. BB07/08 cannot establish meaningful novelty from
prefixed fixtures. Live SIM05-C failed with a 52.825-second observed abort;
SIM-CM-13/16 correction failures remain. USI-03 retains an ambiguity/correction
badge mismatch. BND-15 protects the stored bound but permits duplicate provider
work in a race, so it is not globally cost-optimal (E016, E019–E027, E037).

**Conclusion: Partially supported overall; deterministic routing and stored
bounds are supported within tested conditions.** Adaptive pedagogical quality
is mixed; optimal round count and mastery-based fading are **Not assessed**.

### IA-D06 — Concept-scoped follow-up, separate from adaptation

**Problem → requirement → concept.** A learner may need a supporting question
without restarting the concept or selecting a Stage 6 difficulty. REQ-03/RQ3
maps this to structured support around the active concept, not an eighth stage.

**Literature-informed inference.** Maintaining the current task while allowing
a bounded clarification is a TTF-derived design choice; it is not a published
prescription for two questions or this exact UI
([Goodhue & Thompson, 1995](https://doi.org/10.2307/249689)).

**Feature and evidence.** Follow-up receives current corrected/legacy concept,
latest relevant support, route and preferences. WB03 covers related/supporting-
subconcept, unrelated, length/count/failure boundaries; real persistence checks
leave Stage 7 state unchanged. DYN-09/10 and BB12/13/addendum corroborate these
paths. Inspection F01–F06 records unrelated-topic guidance, retained answers,
the two-question cap and retry (E004–E006, E024–E027, E033–E038).

**Necessity / counterargument.** Removing follow-up forces a new inquiry for
small clarification; unrestricted chat undermines a stable subject and bounded
workflow. Scope classification still depends on LLM output, and controlled
fixture answers do not establish universal relevance/scientific adequacy.
USI-02's follow-up error localisation remains unresolved; it is separately
assessed under the error boundary in IA-D08.

**Conclusion: Supported for the tested concept-scoped, state-isolated mechanism.**
Universal topic classification and learning benefit are **Not assessed**.

### IA-D07 — Persisted continuity, History and preferences

**Problem → requirement → concept.** A reload or revisit should not erase the
interaction, and presentation choices should remain predictable. REQ-03/RQ3
maps to the Task-Aligned LLM Scaffolding Model and continuity across Stages 3–7;
language preferences also enable REQ-01/RQ1.

**Literature-informed inference.** Under TTF, retrieval/presentation capabilities
are justifiable when they support the same task across visits; the original
model does not independently mandate UUIDs, anonymous cookies, snapshots or
History ordering ([Goodhue & Thompson, 1995](https://doi.org/10.2307/249689)).

**Feature and evidence.** WB02/WB05/WB06 establish scoped retrieval, legacy
normalisation, persisted event/adaptation/correction history and unchanged old
preference snapshots. BB14–17 and U5/U7 show Review/Resume and self-reported
history labels. Final usability History exactly matches its 29 owned documents
newest-first and excludes the foreign owner. Locale/theme are browser settings,
separate from saved support-language/explanation preferences (E024–E027,
E033–E038; [B01 terminology cross-reference](../../00_protocol/refined_contract_cross_reference.md)).

**Necessity / counterargument.** Removing durable state makes continuity and
route traceability unreliable. Yet stored state is not cognitive progress, and
browser identity/preferences do not establish cross-device recovery. Raw
clarification is persisted but not individually displayed in event history;
original initial content remains historical after correction. USI-01 shows
modal focus entry/containment/restoration failures despite working save/reload.
No participant task-success evidence resolves those barriers.

**Conclusion: Partially supported overall; scoped persistence/reconstruction is
supported, but accessible interaction continuity and actual learner fit are
incomplete/unmeasured.** History is not evidence of learning progression.

### IA-D08 — Controlled provider/API errors and ownership

**Problem → requirement → concept.** Malformed content, provider failure or
foreign-session operations should not corrupt support or expose another
learner's state. These are enabling controls for REQ-01–03/RQ1–3, not additional
pedagogical stages.

**Literature-informed inference.** Hevner et al.'s evaluation guidance makes
artefact quality a matter for explicit examination, while FEDS helps delimit
what controlled technical evaluation can establish. Applying those principles
justifies these controls without attributing this specific architecture to either
paper ([Hevner et al., 2004](https://doi.org/10.2307/25148625);
[Venable et al., 2016](https://doi.org/10.1057/ejis.2014.36)).

**Feature and evidence.** Service validators and application-controlled lifecycle
precede durable writes; the provider helper centralises timeout/output/error
handling. WB04, BB18/19 and simulation failures show invalid/rejected outputs
fail without corrupting state. BB14/22 public ownership and U5 direct foreign-
session checks show no observed cross-owner access (E019, E024–E027, E033–E038).

**Necessity / counterargument.** Removing guards would turn uncertain generation
into accepted state or make scoped history unreliable. Nevertheless, schema
validity is not semantic correctness; prompt-only script/meaning constraints
remain. BB22's cookie-less 400 oracle failed because the public proxy provisions
a scoped identity; handler tests do not erase that boundary mismatch. Live
SIM05-C does not establish a hard 20-second wall-time bound. USI-02 confirms
safe but untranslated Burmese errors. U8 excludes preference-save infrastructure
faults; test coverage is not exhaustive security/reliability certification.

**Conclusion: Partially supported overall.** Tested fail-before-write and
ownership controls are supported; complete localised recovery, hard elapsed-
time guarantees and comprehensive security/reliability remain unsupported or
**Not assessed**, according to the specific claim above.

## 4. Cross-feature traceability and decision

| Argument | Requirement / RQ | Stages / conceptual basis | Literature warrant | Key recorded cases | Conclusion |
| --- | --- | --- | --- | --- | --- |
| IA-D01 | REQ-01/RQ1; REQ-02/RQ2 | 1–2; reinterpretation in 7; terminology/context | Tran et al. (2023); TTF | DYN-08; BB03/08; WB01/04/05; SIM-CM-13/16; D21/M11 | Partially supported |
| IA-D02 | REQ-01/RQ1 | 3; language route in 7 | Kleidermacher & Zou (2026); TTF | DYN-07; BB04/07; WB06; SIM04-B initial; USI-02 | Partially supported |
| IA-D03 | REQ-02/RQ2; enabling REQ-03/RQ3 | 4–5; explanation/scaffolding | Athukorala & De Silva (2025); scaffolding benchmark | DYN-02; BB05; WB04; U2; SIM04-B/SIM08-B initial | Partially supported |
| IA-D04 | REQ-03/RQ3 | 6A/6B; learner-response signal | van de Pol et al. (2010); TTF | WB01; BB23; U3; A01/A02 | Supported: bounded stated-need collection only |
| IA-D05 | REQ-03/RQ3; route-dependent REQ-01/02 | 7 → 3/4/5; contingency/fade proxy | van de Pol et al. (2010) | BND-04–17; WB01/05; BB07/08; SIM05-C; USI-03 | Partially supported; state bound supported |
| IA-D06 | REQ-03/RQ3 | Concept-scoped Stage 5 support; no Stage 7 mutation | Goodhue & Thompson (1995), applied inference | DYN-09/10; BB12/13; WB03; F01–F06 | Supported: tested scoped mechanism only |
| IA-D07 | REQ-03/RQ3; enabling REQ-01/RQ1 | Task-aligned continuity across 3–7 | Goodhue & Thompson (1995), applied inference | BB14–17; WB02/05/06; U5/U7; USI-01 | Partially supported; persistence supported |
| IA-D08 | Enabling REQ-01–03/RQ1–3 | System-control boundary, not extra stage | Hevner et al. (2004); Venable et al. (2016) | BB18/19/22; WB04; SIM05-C; USI-02 | Partially supported |

**Overall argument:** the PoC has a defensible task-aligned, literature-informed
reason for each major feature and recorded evidence of an integrated bounded
mechanism. It does not establish a consistently correct, linguistically adequate
or effective learning intervention. RQ1 receives partial support from context/
language mechanics plus mixed content findings; RQ2 from observable explanation
structure but unresolved scientific/language quality; RQ3 from bounded response,
route and persistence mechanisms, not calibrated contingency or learner gains.

No claim that this design is uniquely necessary follows from the argument:
other implementations could serve the same requirements. Its integration is
plausible within the supplied corpus; novelty beyond that corpus and superiority
over existing tools are **Not assessed**. The seven stages are conceptual
responsibilities, not seven compulsory LLM calls. Two adaptations/two follow-ups
are engineering scope decisions, not literature-derived optimum values.

## 5. Completion, limitations and next step

All eight major capabilities now have a problem/requirement/RQ chain, a proper
research warrant, named recorded evidence, removal test, counterargument and
bounded conclusion. Reference metadata/access/version differences are explicit.
This satisfies Step 16's completion criterion **with qualifications**, not an
all-FURPS Pass. The [integrity manifest](raw/ARG-RUN-01-manifest.sha256) hashes
the analysis, reference record, selected existing evidence/assignment inputs
and actual B01 source identities without creating a source checkout.

No existing run, score, oracle, approval or conceptual conclusion was changed;
no tests, live generation or participant work ran for this step. Bibliographic
checking is not a new systematic review, nor does an accessible abstract imply
full-paper appraisal. Nathan's prior endorsement is accurately attributed to
the existing simulation records, not this new analysis. Technical evidence,
theory-informed expectations and unmeasured educational effects stay separate.

Next: **Step 17 — Design Photosynthesis Scenario**, as a separately recorded
application scenario under protocol §9. Existing photosynthesis fixtures/tests
are not silently relabelled as that new execution. **Step 18 — Design Literature
Evaluation** remains separate; this focused reference verification does not
complete its full matrix/synthesis or the final results/PIRQOA consolidation.

## References

Athukorala, K. S. N., & De Silva, D. I. (2025). Bridging language barriers in programming education: Java programming assistance tool for Sinhala native speakers. *International Journal of Computer Theory and Engineering, 17*(3), 151–169. https://doi.org/10.7763/IJCTE.2025.V17.1378

Goodhue, D. L., & Thompson, R. L. (1995). Task-technology fit and individual performance. *MIS Quarterly, 19*(2), 213–236. https://doi.org/10.2307/249689

Hevner, A. R., March, S. T., Park, J., & Ram, S. (2004). Design science in information systems research. *MIS Quarterly, 28*(1), 75–105. https://doi.org/10.2307/25148625

Kleidermacher, H. C., & Zou, J. (2026). Science across languages: Assessing LLM multilingual translation of scientific papers. In V. Demberg, K. Inui, & L. Marquez (Eds.), *Findings of the Association for Computational Linguistics: EACL 2026* (pp. 3932–3947). Association for Computational Linguistics. https://doi.org/10.18653/v1/2026.findings-eacl.204

Tran, H. T. H., Martinc, M., Caporusso, J., Doucet, A., & Pollak, S. (2023). *The recent advances in automatic term extraction: A survey* [Preprint]. arXiv. https://doi.org/10.48550/arXiv.2301.06767

van de Pol, J., Volman, M., & Beishuizen, J. (2010). Scaffolding in teacher–student interaction: A decade of research. *Educational Psychology Review, 22*(3), 271–296. https://doi.org/10.1007/s10648-010-9127-6

Venable, J., Pries-Heje, J., & Baskerville, R. (2016). FEDS: A framework for evaluation in design science research. *European Journal of Information Systems, 25*(1), 77–89. https://doi.org/10.1057/ejis.2014.36
