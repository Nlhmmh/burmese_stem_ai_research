# Conceptual informed argument

Detailed sections: [Arguments](#arguments) · [Source-to-claim verification](#source-to-claim-verification) · [References for the restored warrants](#references-for-the-restored-warrants).

## Method and scope

The original Context-Aware Adaptive STEM Scaffolding Framework before refinement was assessed. Each responsibility was examined for problem/requirement relevance, a scholarly warrant, consequences of removal and a counterargument. Descriptive informed argument follows Hevner et al. (2004, p. 86, Table 2). Later Stage 6B routes and the two-round implementation limit are not treated as features demonstrated by the original diagram.

## Arguments

| Stage | Requirement | Reason for retaining the responsibility | Qualification | Judgement |
| --- | --- | --- | --- | --- |
| 1. Terminology | REQ-01 | Establish the technical target before support is selected | Does not establish validated automatic term extraction | conceptually justified |
| 2. Context | REQ-01/02 | Avoid explaining an unintended disciplinary meaning | Context can also help identify the term, so a one-way relationship may be insufficient | justified with qualification |
| 3. Language | REQ-01 | Provide Burmese access while retaining useful English technical terms | Selection principles and Burmese-specific learner benefit remain unvalidated | justified with qualification |
| 4. Core meaning | REQ-02 | Explain the concept instead of supplying isolated translations or examples | Fluent wording does not establish scientific correctness or learning | conceptually justified |
| 5. Scaffolding | REQ-02/03 | Select purposeful examples, reflection, hints or other assistance | Explanations can themselves scaffold. Labels do not prove instructional quality | justified with qualification |
| 6. Response | REQ-03 | Obtain information before adjusting assistance | Self-report is not an objective competence measure | justified with qualification |
| 7. Adaptation | REQ-01–03 | Connect feedback to a change in support | Original diagram does not specify adequate selection, calibrated fading or transfer | justified with qualification |

Removing target/context interpretation risks explaining the wrong concept. Removing core meaning can leave examples without a clear explanation. Removing response collection or adaptation breaks the feedback relationship. These are reasoned removal tests, not experimental ablation results. Exactly seven separately named stages have not been shown to be uniquely necessary.

## Scholarly warrants

Task–Technology Fit motivates alignment with the terminology and explanation task (Goodhue & Thompson, 1995), not measured learner fit. Scaffolding theory supplies contingency, fading and transfer as a benchmark (van de Pol et al., 2010), not proof that generated examples meet it. Cognitive-load theory challenges the assumption that more support is always better (Sweller, 1988). Self-evaluation can be inaccurate (Dunlosky & Rawson, 2012), and fluent generated language can be unreliable (Ji et al., 2023). Selective retention has support in scientific translation, with transfer limits (Kleidermacher & Zou, 2026).

## References and access limits

Primary-source consultation, inspected locators and access failures are reproduced in the source-to-claim table below. The earlier argument consulted Tran et al.'s 2023 preprint rather than the later journal full text, and an earlier Ji citation used a different version. Those original identities are not silently rewritten. The current paper's published references are listed below. No new source retrieval was performed during consolidation.

Dunlosky, J., & Rawson, K. A. (2012). Overconfidence produces underachievement: Inaccurate self evaluations undermine students' learning and retention. *Learning and Instruction, 22*(4), 271–280. [https://doi.org/10.1016/j.learninstruc.2011.08.003](https://doi.org/10.1016/j.learninstruc.2011.08.003)

Goodhue, D. L., & Thompson, R. L. (1995). Task-technology fit and individual performance. *MIS Quarterly, 19*(2), 213–236. [https://doi.org/10.2307/249689](https://doi.org/10.2307/249689)

Hevner, A. R., March, S. T., Park, J., & Ram, S. (2004). Design science in information systems research. *MIS Quarterly, 28*(1), 75–105. [https://doi.org/10.2307/25148625](https://doi.org/10.2307/25148625)

Ji, Z., Lee, N., Frieske, R., Yu, T., Su, D., Xu, Y., Ishii, E., Bang, Y. J., Madotto, A., & Fung, P. (2023). Survey of hallucination in natural language generation. *ACM Computing Surveys, 55*(12), Article 248. [https://doi.org/10.1145/3571730](https://doi.org/10.1145/3571730)

Kleidermacher, H. C., & Zou, J. (2026). Science across languages: Assessing LLM multilingual translation of scientific papers. In V. Demberg, K. Inui, & L. Marquez (Eds.), *Findings of the Association for Computational Linguistics: EACL 2026* (pp. 3932–3947). Association for Computational Linguistics. [https://doi.org/10.18653/v1/2026.findings-eacl.204](https://doi.org/10.18653/v1/2026.findings-eacl.204)

Sweller, J. (1988). Cognitive load during problem solving: Effects on learning. *Cognitive Science, 12*(2), 257–285. [https://doi.org/10.1207/s15516709cog1202_4](https://doi.org/10.1207/s15516709cog1202_4)

Tran, H. T. H., Martinc, M., Caporusso, J., Delaunay, J., Doucet, A., & Pollak, S. (2026). Recent advances in automatic term extraction: A comprehensive survey. *ACM Computing Surveys, 58*(9), Article 226. [https://doi.org/10.1145/3787584](https://doi.org/10.1145/3787584)

van de Pol, J., Volman, M., & Beishuizen, J. (2010). Scaffolding in teacher–student interaction: A decade of research. *Educational Psychology Review, 22*(3), 271–296. [https://doi.org/10.1007/s10648-010-9127-6](https://doi.org/10.1007/s10648-010-9127-6)

## Conclusion

Two responsibilities were conceptually justified and five justified with qualification. The framework has a reasoned basis, but language selection, Stage 4/5 boundaries and adaptation decisions required clarification. The [conceptual synthesis](../conceptual_triangulation.md) records later design decisions separately. E053 and E058–E060 identify historical argument versions and verification; both full versions remain archived.

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

**Conclusion: conceptually justified.** Retain explicit target identification
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
as appropriate support. The need to clarify or reconsider meaning follows from the requirement. The original diagram does not explicitly implement a correction route.

**Counterargument and limit.** Interpretation can be wrong even when expressed
confidently. Allowing correction does not establish reliable disambiguation.
The literature does not prescribe the framework's exact clarification fields,
route or seven-stage ordering. No unrestricted conversation or permanent
Stage 1↔2 loop is necessary to express the bounded conceptual responsibility.

**Conclusion: justified with qualification.** Interpretation and a correction
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
can itself exclude a learner who does not recognise the term. The original framework therefore needs clearer selection factors. An explicit language-help path is a possible later refinement, not an observed feature of the original diagram. These sources do
not supply validated Burmese equivalents or certify generated Burmese wording.

**Conclusion: justified with qualification.** Retain context-sensitive language
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

**Conclusion: conceptually justified.** Require a concept-focused core meaning
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

**Conclusion: justified with qualification.** Retain purposeful scaffold
selection and the Stage 4/5 distinction. Actual scaffolding quality and uptake
are not established by section labels or the mere presence of examples.

### IA-C06 — Collect Learner Response

**Problem and requirement.** REQ-03/RQ3 requires a feedback signal for adjusting
subsequent assistance. The original framework contains Collect Learner Response. Its understanding check is treated as self-report rather than an objective measure of competence.

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
adaptation would rely on defaults or assumed need. The original diagram does not specify optional difficulty choices. Such choices are a later proposal for distinguishing reported needs.

**Counterargument and limit.** A category can reflect confidence, preference,
fatigue or uncertainty as well as difficulty. Neither the signal's calibration nor a particular choice interface is validated by these papers.
A conceptual-difficulty report is not a diagnosed misconception.

**Conclusion: justified with qualification.** Collect a low-burden, self-reported
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

**Mechanism and removal test.** The original Stage 7 connects learner response to updated scaffolding. It does not specify routes for reconsidering language, core meaning or intended context. Those routes are later refinements motivated by this gap. Removing it separates learner feedback
from any change in assistance. The cited papers do not prescribe the original feedback destination or the later route table.

**Counterargument and limit.** A different string or example may not address
the difficulty. The original diagram does not define operational fading or a two-round maximum. A learner reporting understanding would not by itself establish mastery, performance-calibrated fading or transfer of responsibility. Later High/fade, Finish and round-cap behaviour must be evaluated separately.

**Conclusion: justified with qualification.** Retain bounded signal-responsive
adaptation and a reduction-in-support option. Pedagogically adequate adaptation,
competence diagnosis and independent learner performance remain unestablished.

## Why retain seven responsibilities?

Terminology and context identify the intended object. Language treatment makes it accessible. Core meaning and scaffolding distinguish what is explained from how assistance is offered. Response and adaptation connect feedback to a change in assistance. These dependency and removal arguments justify explicit responsibilities, not exactly seven independent modules or provider calls. A glossary-plus-tutor, teacher-mediated tool or combined explanation/scaffold interface remains a plausible alternative. No comparative ablation was performed.

## Source-to-claim verification

The following is the recorded 3 October source-access check. Its consultation limits are preserved. The additional sources strengthen the rationale but were not part of the earlier screened SLR corpus. Later refined-route arguments in the historical v2 document are not treated here as properties of the original diagram.

| ID / citation | Primary source and inspected locator | Access in this revision | Permitted use and limit |
|---|---|---|---|
| CAARG-L01 / Hevner et al. (2004) | [AIS journal record](https://aisel.aisnet.org/misq/vol28/iss1/6/); [author-posted original PDF](https://www.researchgate.net/profile/Alan-Hevner/publication/201168946_Design_Science_in_Information_Systems_Research/links/5405d4670cf23d9765a75fc2/Design-Science-in-Information-Systems-Research.pdf), printed p. 86 / PDF page 12, Table 2 and surrounding evaluation discussion | Journal identity and original Table 2 text inspected through browser source retrieval. An author-posted original article is used, not a ResearchGate-generated summary | Knowledge-base-grounded informed argument and complementary evaluation; does not validate this artefact's utility |
| CAARG-L02 / Goodhue & Thompson (1995) | [AIS journal record](https://aisel.aisnet.org/misq/vol19/iss2/5/); [DOI](https://doi.org/10.2307/249689); original abstract previously checked in [E040](../../02_design/informed_argument/traceability.md), ARG-L02 | Fresh AIS metadata and JSTOR issue bibliography confirm author/title/19(2)/213–236 identity. DOI/AIS download failed; publisher PDF returned 403; no new full-text access. The limited utilisation/fit warrant reuses E040's recorded primary-abstract check, not a new instrument appraisal | TTF/task alignment; organisational origin. Local three-fit dimensions and educational application are inferences, not original validated scales |
| CAARG-L03 / van de Pol et al. (2010) | [Publisher full text](https://link.springer.com/article/10.1007/s10648-010-9127-6), “Characterizations of scaffolding,” analysis framework, “Conclusions and Discussion” | Relevant full-text passages and bibliography/identity inspected; no new replication | Contingency/fading/transfer benchmark and means/intentions distinction; teacher–student findings do not directly validate LLM support or self-report calibration |
| CAARG-L04 / Tran et al. (2023) | [Author-posted arXiv v1 record](https://arxiv.org/abs/2301.06767v1), abstract/history; [original PDF](https://arxiv.org/pdf/2301.06767), first page and §1 | Original author list, abstract and introduction inspected; arXiv upload 17 January 2023; PDF internally uses a 2022 manuscript template | Specialised-term/domain responsibility, not PoC extraction accuracy. Cite 2023 deposited version, not the later six-author journal text |
| CAARG-L05 / Kleidermacher & Zou (2026) | [ACL publisher record](https://aclanthology.org/2026.findings-eacl.204/), abstract and bibliographic export | Publisher abstract, authors, venue, pages and DOI inspected; no fresh whole-paper appraisal claimed | Selective term-retention rationale. Research-paper authors/readers are not novice Burmese learners; no transfer of their reported accuracy rate |
| CAARG-L06 / Sweller (1988) | [Publisher article record](https://onlinelibrary.wiley.com/doi/10.1207/s15516709cog1202_4), abstract and citation metadata | Publisher abstract inspected; year 1988, 12(2), 257–285, DOI confirmed; not a new full experimental-method appraisal | Schema acquisition versus demanding problem solving; supplementary warrant. Does not prove this layout reduces load or change the project's principal theories |
| CAARG-L07 / Dunlosky & Rawson (2012) | [Publisher original article/preview](https://www.sciencedirect.com/science/article/pii/S0959475211000685), abstract/introduction; DOI 10.1016/j.learninstruc.2011.08.003 | Publisher-indexed original abstract/introduction returned in focused search; direct article and abstract URL fetches failed. Cite as publisher-indexed excerpt access, not a successful full-text read | Self-evaluation accuracy and key-term study regulation/retention boundary. Not an evaluation of this interface, Burmese learners or every self-report |
| CAARG-L08 / Ji et al. (2024) | [Author-posted arXiv version 7](https://arxiv.org/abs/2202.03629v7), abstract, author list and history | Original abstract and version identity inspected; first submission 2022, version 7 revised 14 July 2024 | General hallucination risk, not this model's observed error rate. The cited 13-author 2024 preprint version is not silently treated as the 2023 journal edition |
| CAARG-L09 / Venable et al. (2016) | [Publisher full text](https://link.springer.com/article/10.1057/ejis.2014.36), evaluation framework and “Dimension 2: paradigm of the evaluation study” | Relevant framework sections and bibliographic identity inspected; 2016 issue year retained despite 2014 online-publication date | Artificial/naturalistic evaluation boundary; methodological support, not a replacement kernel theory or new empirical result |

Search-result summaries from secondary services were used only to locate
original records. They are not cited as empirical warrants. Goodhue's substantive
abstract warrant is explicitly inherited from the retained primary-source
verification in E040. Dunlosky/Rawson's warrant is limited to the retrieved
publisher-indexed excerpt; unavailable full methods are not appraised.

## References for the restored warrants

The consulted Tran (2023) and Ji (2024) preprints below identify the versions used in these detailed warrants. They are distinct from the published editions listed above.

Ji, Z., Lee, N., Frieske, R., Yu, T., Su, D., Xu, Y., Ishii, E., Bang, Y., Chen, D., Dai, W., Chan, H. S., Madotto, A., & Fung, P. (2024). *Survey of hallucination in natural language generation* (Version 7) [Preprint]. arXiv. [https://arxiv.org/abs/2202.03629v7](https://arxiv.org/abs/2202.03629v7)

Tran, H. T. H., Martinc, M., Caporusso, J., Doucet, A., & Pollak, S. (2023). *The recent advances in automatic term extraction: A survey* (Version 1) [Preprint]. arXiv. [https://arxiv.org/abs/2301.06767v1](https://arxiv.org/abs/2301.06767v1)

Venable, J., Pries-Heje, J., & Baskerville, R. (2016). FEDS: A framework for evaluation in design science research. *European Journal of Information Systems, 25*(1), 77–89. [https://doi.org/10.1057/ejis.2014.36](https://doi.org/10.1057/ejis.2014.36)

## Preservation and review scope

Detailed records above were recovered from the pre-consolidation archive, not newly executed or re-scored. Repeated planning, sign-off and summary text is omitted. The [shared protocol](../../00_protocol/evaluation_protocol.md) records preparation, execution and subsequent human verification. Original capture-time statements and complete documents remain in the [archive](../../archive/pre_consolidation_markdown_20261008.zip).
