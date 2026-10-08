# Literature-grounded informed argument — conceptual framework

> **Human-verification update, 8 October 2026.** The author has confirmed personally checking every scientific and English–Burmese assessment against the original outputs and relevant references. AI assistance with preparation, execution and drafting remains acknowledged. Final interpretations and decisions are accepted by the author. This is not an independent second assessment or a claim of manual execution throughout. See the [confirmation and scope](../../00_protocol/human_verification_confirmation.md). Earlier capture-time statements retain their historical meaning.

| Document control | Record |
|---|---|
| Version / date | 2.0; 3 October 2026, Pacific/Auckland |
| Method / analysis | CA-ARG / ANALYSIS-20261003-CONCEPTUAL-ARGUMENT-02 |
| Preparation / final decisions | Codex-assisted literature and conceptual synthesis under user direction; final interpretations accepted by the author. See the current human-verification confirmation |
| Artefact | Context-Aware Adaptive STEM Scaffolding Framework; final conceptual interpretation in framework_refinements.md §26 |
| Evidence | E058 revised argument; E059 source-verification record; E060 revision manifest |
| Earlier version | [traceability.md](traceability.md), E053, retained unchanged as the original argument |
| Conclusion | A defensible, literature-informed seven-responsibility design; actual learner fit, calibrated scaffolding and educational effectiveness remain unestablished |

## 1. Evaluation method and scope

An informed argument in Information Systems design-science research must draw
on relevant research in the knowledge base. Internal consistency and a
developer's explanation of choices are insufficient by themselves. Hevner et
al. (2004, p. 86, Table 2) locate informed argument within descriptive
evaluation. Here the method connects cited research to an explicit requirement,
then examines the proposed mechanism and its limitations. It complements
literature evaluation and scenario/testing methods rather than substituting
for them. [Hevner et al. (2004)](https://doi.org/10.2307/25148625).

The conceptual literature evaluation asks how prior findings support or
challenge framework elements. This informed argument uses those findings and
additional explicitly identified sources to reason about **why the elements
should address the stated tasks**, under what assumptions, and where that
reasoning can fail. The two methods share sources and are not independent
replications merely because they have different filenames.

For each argument the chain is:

> Problem/issue → requirement/RQ → cited research warrant → proposed conceptual
> mechanism → removal test → counterargument/transfer limit → bounded conclusion.

The object evaluated is the final conceptual framework in
[E056, §26](../framework_refinements.md#26-frozen-refined-framework-for-assignment-5).
E053 evaluated an earlier interpretation and informed subsequent refinement.
This revision strengthens the scholarly justification after those refinements;
it does not claim its additional citations were present in the original
interview, argument or Assignment 2 corpus.

No new application tests, model outputs, learner observations or expert
interviews were collected. Venable et al. (2016) distinguish artificial and
naturalistic evaluation settings. Conceptual reasoning and the project's
controlled technical records cannot establish utility in actual learner
practice. [Venable et al. (2016)](https://doi.org/10.1057/ejis.2014.36).

### Evidence and decision rules

The local REQ/RQ mapping follows
[protocol §3](../../00_protocol/evaluation_protocol.md#3-pirqoa-and-artefact-traceability).
The project problem statements are requirements supplied by the research,
not a newly verified estimate of Burmese learners' prevalence of difficulty.
Literature findings, project facts and the evaluator's design inferences are
distinguished below. A citation supporting a general mechanism does not
validate its Burmese-specific application.

- **Conceptually justified:** a relevant research warrant and requirement
  support the stated responsibility, with a plausible mechanism and explicit limits.
- **Justified with qualification:** the responsibility is defensible, but its
  proposed operationalisation or transfer has a material unresolved limitation.
- **Not established:** the sources or project evidence do not substantiate the
  particular claim. This is not automatically evidence that the claim is false.

These are reasoned conceptual judgements, not empirical FURPS Pass/Fail scores.
All seven responsibilities are evaluated; their labels and exact number are
design decisions, not stages prescribed by the cited literature.

## 2. Theoretical foundation and critical benchmark

Task–Technology Fit (TTF) is the primary IS lens retained from Assignment 3.
Goodhue and Thompson (1995) connect technology's performance contribution to
its use and fit with the tasks supported. The project's language-support,
conceptual-support and adaptive-interaction fit dimensions are **local design
interpretations**, not their original validated scales. Their organisational
study does not establish fit for Burmese STEM learners. Mapping a feature to a
task supplies an evaluation hypothesis, not a measured performance effect.
[Goodhue and Thompson (1995)](https://doi.org/10.2307/249689).

Scaffolding Theory is the complementary educational lens. Van de Pol et al.
(2010) identify contingency, fading and transfer of responsibility as key
characteristics and distinguish instructional intentions from means. This
provides a demanding benchmark: a collection of examples and hints alone is
not sufficient to demonstrate scaffolding. Their teacher–student review also
emphasises competence diagnosis and the need to examine learner responses.
The framework has only a self-reported need signal, so it offers a limited
proxy for responsive support, not established performance-calibrated tutoring.
[van de Pol et al. (2010, “Characterizations of scaffolding”)](https://doi.org/10.1007/s10648-010-9127-6).

Sweller (1988) is used as supplementary instructional research, not a
replacement for TTF/Scaffolding Theory or a retrospective reinstatement of
CTML as the project's principal theory. His account distinguishes demanding
problem-solving activity from schema acquisition. It motivates questioning
whether extra information or an activity actually helps understanding; it
does not prove that this framework reduces cognitive load.
[Sweller (1988)](https://doi.org/10.1207/s15516709cog1202_4).

## 3. Stage-by-stage informed arguments

### IA-C01 — Identify STEM Terminology

**Problem and requirement.** REQ-01/RQ1 concerns specialised English terminology
requiring context-sensitive Burmese support. The support process must first
establish what disciplinary concept is being discussed.

**Research warrant.** Tran et al. (2023, abstract and §1) describe automatic term
extraction as identifying candidate terms from domain-specific corpora and
explain their role in downstream language-processing tasks. This supports
giving terminology identification an explicit responsibility. It does not
equate identification in a learner inquiry with a benchmarked ATE pipeline.
The cited five-author preprint is distinct from Assignment 2's later journal
version. [Tran et al. (2023)](https://arxiv.org/abs/2301.06767v1).

**Mechanism and removal test — design inference.** Establishing a target term
gives later interpretation and explanation a common object. Without it, an
otherwise fluent response might address a different term. This responsibility
can be fulfilled jointly with context interpretation; a separate software
module or LLM call is not conceptually required.

**Counterargument and limit.** Terminology and context are interdependent, so
a rigid one-pass extraction followed by irreversible commitment is unsafe.
The framework must allow an uncertain target to be qualified or reconsidered.
No source establishes that the PoC performs deterministic ATE or identifies
all English/Burmese technical terms accurately.

**Conclusion: Conceptually justified.** Retain explicit target identification
as a responsibility, not as a claim of validated extraction accuracy.

### IA-C02 — Interpret Technical Context

**Problem and requirement.** REQ-01/RQ1 and REQ-02/RQ2 require the intended
disciplinary meaning, not simply recognition of a word. `Cell`, `current`,
`network` and `inheritance` illustrate why a shared spelling can be insufficient.
These are analytical examples, not new test executions.

**Research warrant.** The domain-specific nature of terms in Tran et al.
(2023) and TTF's task-alignment principle in Goodhue and Thompson (1995) supply
the general warrant. The following application is an inference: support must
be relevant to the learner's intended STEM task before its language or
explanatory depth can reasonably be judged appropriate.
[Tran et al. (2023)](https://arxiv.org/abs/2301.06767v1);
[Goodhue and Thompson (1995)](https://doi.org/10.2307/249689).

**Mechanism and removal test.** Stage 2 relates the identified term to an
intended domain and concept, and acknowledges insufficient context. Removing
this responsibility allows a correct explanation of the wrong sense to pass
as appropriate support. A bounded clarification or later intended-term
correction is therefore coherent with the requirement.

**Counterargument and limit.** Interpretation can be wrong even when expressed
confidently. Allowing correction does not establish reliable disambiguation.
The literature does not prescribe the framework's exact clarification fields,
route or seven-stage ordering. No unrestricted conversation or permanent
Stage 1↔2 loop is necessary to express the bounded conceptual responsibility.

**Conclusion: Justified with qualification.** Interpretation and a correction
boundary are warranted; universally correct intended-meaning recovery is not
established.

### IA-C03 — Select Language Support

**Problem and requirement.** REQ-01/RQ1 requires useful Burmese access while
preserving recognisable English technical vocabulary where appropriate.
Neither translating everything nor retaining everything in English fulfils
that requirement by definition.

**Research warrant.** Kleidermacher and Zou (2026, abstract) report that some
scientific-paper readers preferred familiar technical terms not to be
translated. Their study supplies a concrete reason to consider selective
retention rather than assume translation is always beneficial. Its researchers,
paper-reading tasks and multilingual setting are not direct evidence about
novice Burmese STEM learning.
[Kleidermacher and Zou (2026)](https://aclanthology.org/2026.findings-eacl.204/).

**Mechanism and removal test — design inference.** Stage 3 combines intended
meaning, term familiarity where known, disciplinary recognisability and
learner-expressed language need. A technical term may remain in English while
its meaning is explained in Burmese. Removing the responsibility would make
language treatment incidental to generation instead of accountable to RQ1.

**Counterargument and limit.** Familiarity cannot be inferred reliably from
nationality or the mere presence of an English inquiry. Selective retention
can itself exclude a learner who does not recognise the term. The framework
therefore needs explainable selection factors and an explicit language-help
path, not a claim of a universally optimal bilingual ratio. These sources do
not supply validated Burmese equivalents or certify generated Burmese wording.

**Conclusion: Justified with qualification.** Retain context-sensitive language
selection; validate the resulting terminology and comprehensibility separately.

### IA-C04 — Explain STEM Concept

**Problem and requirement.** REQ-02/RQ2 seeks conceptual support beyond lexical
translation. A target-language label alone does not specify a process,
relationship or explanatory meaning.

**Research warrant.** Sweller's (1988) distinction between schema acquisition
and demanding problem-solving activity makes the organisation of conceptual
knowledge relevant to instructional design. TTF supplies the complementary
IS question of whether the technology serves the task actually required.
Neither source experimentally compares translation with this PoC.
[Sweller (1988)](https://doi.org/10.1207/s15516709cog1202_4);
[Goodhue and Thompson (1995)](https://doi.org/10.2307/249689).

**Mechanism and removal test — design inference.** Stage 4 establishes the core
meaning and necessary relationships for the interpreted concept. Removing it
could leave engaging examples without an explicit account of what those
examples illustrate. Establishing this responsibility makes completeness and
technical correctness assessable even if a single response performs Stages 4–5.

**Counterargument and limit.** A simple definition may be enough for a narrow
task; more explanation is not inherently better. Coherent LLM text can also be
incorrect. Ji et al.'s survey of hallucination in natural-language generation
supports treating factual reliability as a separate concern, not inferring it
from fluent presentation or structure. The cited version is a revised
author-posted preprint, not a new PoC accuracy study.
[Ji et al. (2024)](https://arxiv.org/abs/2202.03629v7).

**Conclusion: Conceptually justified.** Require a concept-focused core meaning
appropriate to the task; correctness and learning gains remain unestablished.

### IA-C05 — Provide Scaffolding

**Problem and requirement.** REQ-02/RQ2 and REQ-03/RQ3 require structured
assistance, not merely a longer explanation.

**Research warrant.** Van de Pol et al.'s (2010) distinction between intentions
and means provides a basis for separating the meaning being taught from the
assistance used to make it accessible. This does not prescribe separate
Stage 4/5 headings, a five-section payload or mandatory analogies.
[van de Pol et al. (2010, analysis framework)](https://doi.org/10.1007/s10648-010-9127-6).

**Mechanism and removal test — design inference.** Stage 4 answers what the
concept means; Stage 5 selects a useful example, hint, reflective prompt,
analogy or explanatory depth for engaging with it. Keeping the responsibilities
distinct makes a change in support form possible without changing the intended
concept. Removing Stage 5 would leave no explicit responsibility for choosing
how the learner is assisted.

**Counterargument and limit.** Explanation can itself be a scaffolding means,
so these are analytically distinguishable responsibilities with overlapping
content, not empirically proven non-overlapping mechanisms. An analogy can
mislead, a hint can disclose too much, and redundant bilingual sections can
add effort. More support is not automatically useful support; Sweller (1988)
provides a reason to examine that assumption rather than assert reduced load.
[Sweller (1988)](https://doi.org/10.1207/s15516709cog1202_4).

**Conclusion: Justified with qualification.** Retain purposeful scaffold
selection and the Stage 4/5 distinction. Actual scaffolding quality and uptake
are not established by section labels or the mere presence of examples.

### IA-C06 — Collect Learner Response

**Problem and requirement.** REQ-03/RQ3 requires a feedback signal for adjusting
subsequent assistance. The refined framework uses learner-reported support
need, with an optional bounded description of what would help.

**Research warrant.** Contingency requires information about the learner rather
than an unchanged one-way presentation (van de Pol et al., 2010). Dunlosky and
Rawson (2012) report that inaccurate self-evaluations can undermine study
regulation and retention in key-term learning. This is a reason to distinguish
self-report from demonstrated performance, not proof that every self-report
is wrong or that the PoC's three-choice interface is invalid.
[van de Pol et al. (2010)](https://doi.org/10.1007/s10648-010-9127-6);
[Dunlosky and Rawson (2012)](https://doi.org/10.1016/j.learninstruc.2011.08.003).

**Mechanism and removal test — design inference.** A response makes the
learner's expressed need available to Stage 7. Without that responsibility,
adaptation would rely on defaults or assumed need. Optional difficulty choices
can distinguish language, concept and intended-meaning concerns while allowing
the learner to continue without selecting a category.

**Counterargument and limit.** A category can reflect confidence, preference,
fatigue or uncertainty as well as difficulty. Neither the signal's calibration
nor the exact three-value/five-choice interface is validated by these papers.
A conceptual-difficulty report is not a diagnosed misconception.

**Conclusion: Justified with qualification.** Collect a low-burden, self-reported
support signal. Do not describe it as an objective understanding assessment.

### IA-C07 — Adapt Support

**Problem and requirement.** REQ-03/RQ3 requires feedback to change assistance;
a stored response alone is not adaptation. Language or interpretation problems
also affect REQ-01/RQ1, while core-meaning problems affect REQ-02/RQ2.

**Research warrant.** Contingency and fading provide the general educational
benchmark (van de Pol et al., 2010). TTF supplies a reason for the adjustment
to address the task difficulty rather than an arbitrary available capability.
Applying these ideas to a bounded LLM workflow is the project's inference.
[van de Pol et al. (2010)](https://doi.org/10.1007/s10648-010-9127-6);
[Goodhue and Thompson (1995)](https://doi.org/10.2307/249689).

**Mechanism and removal test.** Stage 7 interprets the signal and directs a
bounded revision: normally a different Stage 5 scaffold, Stage 3 reconsideration
for language need, Stage 4 reconsideration for core meaning, or Stages 1–2
when the intended concept was mistaken. Removing it separates learner feedback
from any change in assistance. These re-entry destinations follow the scope of
the reported problem; the cited papers do not contain this project's route table.

**Counterargument and limit.** A different string or example may not address
the difficulty. A High response permits no additional generated support as a
user-requested reduction, but cannot establish performance-calibrated fading
or transfer of responsibility. It is not evidence of mastery. Explicit Finish
is a lifecycle decision, not a pedagogical outcome. Likewise, two generated
adaptations are a scope/engineering bound, not a literature-derived optimum.

**Conclusion: Justified with qualification.** Retain bounded signal-responsive
adaptation and a reduction-in-support option. Pedagogically adequate adaptation,
competence diagnosis and independent learner performance remain unestablished.

## 4. Cross-stage traceability and alternative designs

| Argument / stage | REQ / RQ | Main cited warrant | Bounded judgement |
|---|---|---|---|
| IA-C01 / terminology | REQ-01 / RQ1 | Tran et al. (2023) | Conceptually justified; not validated ATE |
| IA-C02 / context | REQ-01–02 / RQ1–2 | Tran et al. (2023); Goodhue & Thompson (1995) | Justified with qualification; interpretation can be wrong |
| IA-C03 / language | REQ-01 / RQ1 | Kleidermacher & Zou (2026) | Justified with qualification; Burmese-specific transfer unverified |
| IA-C04 / core meaning | REQ-02 / RQ2 | Sweller (1988); Goodhue & Thompson (1995); Ji et al. (2024) | Conceptually justified; correctness/learning unestablished |
| IA-C05 / scaffold selection | REQ-02–03 / RQ2–3 | van de Pol et al. (2010); Sweller (1988) | Justified with qualification; labels do not establish scaffolding |
| IA-C06 / response | REQ-03 / RQ3 | van de Pol et al. (2010); Dunlosky & Rawson (2012) | Justified with qualification; self-report only |
| IA-C07 / adaptation | REQ-01–03 / RQ1–3, depending on route | van de Pol et al. (2010); Goodhue & Thompson (1995) | Justified with qualification; no calibrated fading or optimal cap claim |

This gives every responsibility a problem/requirement and scholarly rationale.
It does **not** prove that exactly seven separately named stages are uniquely
necessary. A glossary-plus-tutor, a teacher-mediated tool, or a combined
explanation/scaffold interface could address the same requirements. The
framework's reason for retaining seven responsibilities is traceable separation
of concerns and bounded feedback, not evidence that these alternatives are worse.

The normal ordering is dependency-based: establish an intended target before
selecting its language treatment and support; obtain a signal before responding
to it. This is a design argument, not a universally established cognitive
sequence. Coupled processing and bounded reinterpretation remain compatible
with it. No extra eighth stage, deterministic language-selection algorithm,
unrestricted chat or separate LLM call for every stage is justified merely by
adding citations.

## 5. Protocol-level conceptual judgement

| Protocol criterion | Contribution of this revised informed argument | Boundary |
|---|---|---|
| C1 — PIRQOA coverage | All seven responsibilities map to stated REQ/RQs and research warrants | Traceability is supported; empirical requirement satisfaction is not inferred |
| C2 — Logical coherence | Dependency order, Stage 4/5 distinction and scoped re-entry are defensible | One coherent design, not proof of a uniquely correct sequence |
| C3 — Theoretical consistency | Task alignment is plausible; responsive support is partially consistent with scaffolding | TTF not measured; competence diagnosis, calibrated fading and transfer of responsibility not demonstrated |
| C4 — Literature consistency | Explicit sources and counterarguments support and constrain the rationale | Focused source selection complements E051–E052; not a new SLR, whole-corpus consistency rating or automatic Pass |
| C5 — Scenario applicability | The responsibilities identify what a scenario must instantiate | Direct judgement stays with CA-SCN; this reasoning is not a new walkthrough |

These use protocol §5.2 definitions. E053's historical C4 meant completeness
and boundary clarity. That older judgement is preserved, not relabelled as
literature consistency. See the [Step 20 crosswalk](../../03_results/evidence_register_audit.md#3-method-and-criterion-crosswalk).

## 6. Critical synthesis and implications for research claims

The framework has a defensible knowledge-base rationale for integrating
terminology/context, selective language treatment, conceptual meaning,
structured assistance and learner-responsive adjustment. Its strength is
accountable coordination of these responsibilities, not a demonstrated
learning effect. The strongest qualification is that learner-expressed need
is an incomplete basis for the competence-sensitive contingency, fading and
transfer implied by a strong educational scaffolding claim.

Accordingly, RQ1 receives a rationale for context-sensitive terminology and
language support, not certified Burmese equivalents. RQ2 receives a rationale
for distinguishing meaning from lexical substitution and choosing relevant
assistance, not demonstrated concept acquisition. RQ3 receives a rationale for
bounded feedback-driven changes, not validated diagnosis or optimal adaptation.
These are conceptual answers about the design's potential mechanism. Results
from real learners are needed for claims about achieved benefit.

The later design argument (E039–E041), scenario (E042–E044) and literature
comparison (E045–E048) remain separate. Their mixed content/implementation
findings must be considered at consolidation; adding references does not erase
them. The original conceptual triangulation (E055) and refinement decisions
(E056) also remain unchanged. This is an additional dated analytical revision,
not a new independent method or retrospective regrading of those records.

**Overall judgement:** retain the seven conceptual responsibilities as a
literature-informed, task-aligned design with explicit qualifications. Replace
unqualified claims of theoretical validation or complete scaffolding with
claims of conceptual justification and limited self-report-responsive support.
Superiority, Burmese-wide generalisation, learning gains, objective mastery and
a universally optimal two-round bound are not established.

## 7. References

Dunlosky, J., & Rawson, K. A. (2012). Overconfidence produces underachievement: Inaccurate self evaluations undermine students' learning and retention. *Learning and Instruction, 22*(4), 271–280. [https://doi.org/10.1016/j.learninstruc.2011.08.003](https://doi.org/10.1016/j.learninstruc.2011.08.003)

Goodhue, D. L., & Thompson, R. L. (1995). Task-technology fit and individual performance. *MIS Quarterly, 19*(2), 213–236. [https://doi.org/10.2307/249689](https://doi.org/10.2307/249689)

Hevner, A. R., March, S. T., Park, J., & Ram, S. (2004). Design science in information systems research. *MIS Quarterly, 28*(1), 75–105. [https://doi.org/10.2307/25148625](https://doi.org/10.2307/25148625)

Ji, Z., Lee, N., Frieske, R., Yu, T., Su, D., Xu, Y., Ishii, E., Bang, Y., Chen, D., Dai, W., Chan, H. S., Madotto, A., & Fung, P. (2024). *Survey of hallucination in natural language generation* (Version 7) [Preprint]. arXiv. [https://arxiv.org/abs/2202.03629v7](https://arxiv.org/abs/2202.03629v7)

Kleidermacher, H. C., & Zou, J. (2026). Science across languages: Assessing LLM multilingual translation of scientific papers. In V. Demberg, K. Inui, & L. Marquez (Eds.), *Findings of the Association for Computational Linguistics: EACL 2026* (pp. 3932–3947). Association for Computational Linguistics. [https://doi.org/10.18653/v1/2026.findings-eacl.204](https://doi.org/10.18653/v1/2026.findings-eacl.204)

Sweller, J. (1988). Cognitive load during problem solving: Effects on learning. *Cognitive Science, 12*(2), 257–285. [https://doi.org/10.1207/s15516709cog1202_4](https://doi.org/10.1207/s15516709cog1202_4)

Tran, H. T. H., Martinc, M., Caporusso, J., Doucet, A., & Pollak, S. (2023). *The recent advances in automatic term extraction: A survey* (Version 1) [Preprint]. arXiv. [https://arxiv.org/abs/2301.06767v1](https://arxiv.org/abs/2301.06767v1)

van de Pol, J., Volman, M., & Beishuizen, J. (2010). Scaffolding in teacher–student interaction: A decade of research. *Educational Psychology Review, 22*(3), 271–296. [https://doi.org/10.1007/s10648-010-9127-6](https://doi.org/10.1007/s10648-010-9127-6)

Venable, J., Pries-Heje, J., & Baskerville, R. (2016). FEDS: A framework for evaluation in design science research. *European Journal of Information Systems, 25*(1), 77–89. [https://doi.org/10.1057/ejis.2014.36](https://doi.org/10.1057/ejis.2014.36)

Access/version limits and source-to-claim locators are recorded in
[reference_verification_v2.md](reference_verification_v2.md). This is a focused
scholarly strengthening, not an update to Assignment 2's screened corpus.
