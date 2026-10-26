# Generalising Adaptive LLM Scaffolding for Burmese-Speaking STEM Learners

**Nay Lin Htet**

¹ Master of Information Technology Student, Faculty of Science, University of Auckland

## Abstract

A bilingual STEM assistant using a large language model (LLM) was developed to combine terminology support, conceptual explanation and assistance based on learner responses. This paper interprets the evaluation findings, reflects on the research process and develops transferable design principles. Tests supported application-controlled responses and saved session data under tested conditions. Content quality remained mixed: 18 of 91 outputs passed review, 71 were partial and two failed. Five principles address contextual language support, explicit help requests, separate checks of scientific and bilingual meaning, clear session records and defined interaction limits. The contribution aligns with Task–Technology Fit and Scaffolding Theory and offers a provisional enhancement through their integration. Scientific and language errors show that successful execution does not ensure suitable educational content. Transfer to other settings and learner benefits remain untested. Independent review, learner studies and comparative evaluation are needed to test the principles.

## Keywords

- Adaptive STEM Scaffolding
- STEM Terminology Support
- Burmese-Speaking Learners
- Large Language Models
- Bilingual Learning
- Educational Information Systems

## 1. Introduction

Burmese-speaking learners may need help with specialised English terms in science, technology, engineering and mathematics (STEM). Translating a term alone may not explain the concept or provide enough guidance when a learner still needs help ([Athukorala & De Silva, 2025](https://doi.org/10.7763/IJCTE.2025.V17.1378)). This study developed a bilingual educational Information System that combines terminology support, conceptual explanation and assistance based on learner responses. A context-aware adaptive framework guides the support process. A large language model generates explanations, while application rules control the response selected and the support limits.

Task–Technology Fit (TTF) guides the matching of system capabilities to learner tasks ([Goodhue & Thompson, 1995](https://doi.org/10.2307/249689)). Scaffolding Theory guides assistance that responds to learner needs and can be reduced as learners become more independent ([van de Pol et al., 2010](https://doi.org/10.1007/s10648-010-9127-6)). Conceptual evaluation, technical tests, content review and usability inspection examined the framework and application. These methods supported parts of the design while revealing scientific, language and interaction problems.

This paper interprets the findings against the research questions and objectives. It then reflects on the research process, problem and solution, and develops design principles for similar systems. The paper also positions the contribution within existing knowledge, explains the limitations and proposes future work. The principles remain conditional because learner benefits and successful transfer to other settings have not been demonstrated.

## 2. Interpretation against Research Questions and Objectives

The objectives are to develop multilingual STEM terminology support, conceptual STEM explanation and adaptive scaffolding approaches. TTF and Scaffolding Theory guide the concepts, task-aligned relationship model and context-aware framework implemented in the application. Table 1 links each question and objective to the findings.

**Table 1. Research Questions, Objectives and Evaluation Findings**

| Research question | Corresponding objective | Evidence-based answer | Remaining gap |
| --- | --- | --- | --- |
| RQ1 — How can specialized English STEM terminology be supported for Burmese-speaking learners? | Develop an approach for multilingual STEM terminology support. | The system explains English STEM terms in Burmese using their technical context and keeps useful English terms. Two correction attempts were rejected because the model kept the same concept and subject area. In eight other cases, the system could not identify the intended STEM meaning, so no learning session was created. | Burmese errors remained, and some inquiries were misunderstood. The study did not show whether the system reduced learners' language difficulties. |
| RQ2 — How can LLM-based support help learners understand STEM concepts beyond translation? | Develop an approach for conceptual STEM explanation. | The system explains concepts using examples, technical details, reflection questions and hints. Of 91 generated outputs, 18 passed the content review, 71 were rated partial because some parts needed improvement, and two failed. | Some explanations contained scientific errors or repeated earlier examples. No learner study measured whether students understood concepts better or remembered them longer. |
| RQ3 — How can LLM-based scaffolding provide structured and adaptive support for Burmese-speaking STEM learners? | Develop an adaptive scaffolding approach. | Learners report how much help they need and can choose its type. Rules select the response. The system saves responses and allows up to two saved support revisions. Seventeen technical tests of adaptation limits, response saving and session completion passed. | Learners' self-reports did not prove mastery. Whether revised help met their needs, when to reduce help and whether two revisions were enough remained untested. |

The three approaches were developed and implemented, but evidence of their suitability remains limited. Conceptual evaluation supported coverage of the required responsibilities, but support for stage relationships, theoretical consistency and applicability was partial. All thirteen functionality criteria were rated partial. Six usability criteria passed inspection and three were partial. The relationship model proposes that scaffolding can reduce language barriers and support STEM understanding; these effects were not measured. The evaluation supports integrated operation under tested conditions, while educational effectiveness remains unestablished.

## 3. Reflect and Learn

### 3.1 Learning about the Research Process: Match Evidence to Claims

Design quality, technical operation and educational effectiveness require different evidence. Conceptual evaluation examined coverage of required responsibilities, connections between stages and consistency with theory. Technical tests, author-verified content review and interface inspection examined the application. They identified failures and supported design claims, but did not measure learners' understanding, language difficulties or experience.

White-box testing recorded 518 passing deterministic tests with controlled inputs. Twelve database tests passed earlier, and their results were retained. The two content failures show that successful control tests cannot establish tutoring quality. Reviewing 32 saved outputs again added bilingual detail without independent evidence. Each reported total should clearly state what was counted. Tests, generated outputs, reviewed passages and participants represent different types of evidence and should be reported separately. Future research should define learning measures and independent review before making educational claims. Failed attempts and tested versions should remain in the evidence record.

### 3.2 Learning about the Research Problem: Separate Language and Conceptual Difficulty

The review of 17 studies and five systems identified separate capabilities for terminology, language and educational assistance. The research problem is how to combine these capabilities into multilingual terminology support, conceptual explanation and adaptive scaffolding. This gap applies to the reviewed sample; it does not show that no similar system exists. TTF and Scaffolding Theory replaced the earlier emphasis on multimedia learning. This change placed task–capability alignment and responsive assistance at the centre of the design.

Evaluation showed that the problem has more than one source. Burmese wording could change the meaning of otherwise correct English content, while some scientific weaknesses appeared in both languages. Changing the language alone therefore cannot resolve every conceptual error. Additional examples also cannot correct a wrongly translated definition. This finding supports separate options for language help, conceptual clarification and correction of the intended meaning. These categories guide the design, but their frequency among Burmese learners remains unknown. Studies with learners are needed to understand their actual difficulties.

### 3.3 Learning about the Research Solution: Make Adaptation Explicit and Revisable

The original seven-stage framework included feedback but did not clearly explain how to select the next response. Conceptual critique, literature-based reasoning and the photosynthesis scenario identified overlap between explanation and additional support. The application then separated core meaning from scaffolding and combined overall reported need with an optional help choice. Adaptation could address language, explanation or intended context, as well as provide another example.

These changes made the design clearer without demonstrating better learning. High indicates reported strong understanding and stops generation for that response; it does not establish mastery or complete the session. Simultaneous requests respected the limit on saved adaptations but produced duplicate provider calls. Earlier gravity and ion errors also remained in history after later support. The lesson is that response selection, resource use, content quality and session continuity need separate controls and evaluation. Future revisions should address these observed weaknesses, because generating more support does not by itself establish better assistance.

## 4. Generalisation to Design Knowledge

### 4.1 From the Instance to a Class of Problems

The wider problem class is **difficulty understanding English STEM terms and concepts when local-language technical resources are limited**. Support must address language, technical meaning and uncertain learner feedback. The solution class combines task-aligned scaffolding, explicit response rules and recoverable session records. The language, model, interface and support limits may vary.

[Sein et al. (2011)](https://doi.org/10.2307/23043488) guide the formalisation of instance-level learning into generalised outcomes. [Mullarkey and Hevner (2019)](https://doi.org/10.1080/0960085X.2018.1451811) distinguish diagnosis, design, implementation and evolution cycles in action design research (ADR). Table 2 traces learning across iterations. ADR guides this analysis; no organisational intervention was conducted.

**Table 2. Generalised Learning across the Research Iterations**

| Project iteration | Finding or change | Generalised learning |
| --- | --- | --- |
| Problem formulation and review | The reviews identified separate terminology, language and educational capabilities. | Connect these capabilities around the learning task. |
| Theorising and design | TTF and Scaffolding Theory guided support responsibilities and system development. | Define responsibilities before selecting software components. |
| Conceptual evaluation and refinement | Unclear feedback decisions led to optional help choices and revisiting earlier stages. | Make feedback actionable without treating it as proof of competence. |
| Application evaluation and bilingual review | Working controls coexisted with content errors and duplicate provider calls. | Evaluate meaning, saved state and resource use separately. |

### 4.2 Transferable Design Principles

Each principle links its design action to rationale, evidence and limits. Expected benefits require testing.

**DP1 — Establish meaning before selecting language support.** When a term has several meanings or no familiar translation, examine its context and request clarification where needed. Pair useful English terms with local-language explanations. This should preserve technical meaning. Unclear inquiries and rejected corrections support this responsibility; transfer requires local terminology review.

**DP2 — Use learners' requests to select support without assuming mastery.** Ask how much help learners need and optionally what kind, such as language clarification, a simpler explanation or another example. Keep overall need separate from requested help. Explicit application rules should make response selection explainable. Tests supported these rules, but self-reports did not establish understanding. Learner-performance evidence is needed to assess suitable assistance and when support can be reduced ([van de Pol et al., 2010](https://doi.org/10.1007/s10648-010-9127-6)).

**DP3 — Check scientific and bilingual meaning separately from output structure.** Assess scientific accuracy, consistency between languages and explanation quality alongside format checks. This should identify errors missed by technical tests. Gravity/ion failures and bilingual review support the principle. Independent review and assessment after model or language changes remain necessary.

**DP4 — Keep clear records of learning support and session progress.** Save responses, revised explanations and both earlier and updated interpretations of the concept. Record reported need, unclear meaning and the decision to finish separately. This should let learners resume sessions and understand changes. Tests supported restoration, but a correction label appeared while meaning remained unclear, and earlier errors stayed in history. Other systems should label unclear meanings and explain how saved errors will be corrected. Reliable storage does not ensure accurate content.

**DP5 — Explain what each support limit controls.** Distinguish saved revisions, model-provider requests and spending. Here, the two-revision limit controlled saved adaptations. Two simultaneous provider calls produced one saved adaptation, so this limit did not guarantee a spending limit. State whether clarification counts as a revision when meaning remains unclear; it did here. Clear rules should show when support stops. Learner evaluation must assess whether the allowance is sufficient, while spending requires separate controls.

### 4.3 Transfer and Theory Status

As a **proposed transfer example**, a Sinhala engineering assistant could interpret the term “stress” within its engineering context and review local terminology (DP1). Separate help choices would guide responses (DP2), while bilingual scientific review would assess meaning (DP3). Session records would distinguish requested help, unresolved meaning and completion (DP4), and revision and spending limits would be assessed separately (DP5). Sinhala wording, examples and support allowances would require local review rather than copying Burmese choices or the two-revision limit. This application has not been evaluated.

The principles provide a basis for nascent design theory: early recommendations needing further testing ([Gregor & Hevner, 2013](https://doi.org/10.25300/MISQ/2013/37.2.01)). They propose that explicit help requests, response rules and separate content/state checks can make assistance easier to explain and evaluate. Tests in other settings must assess this proposition alongside content quality and learner outcomes.

## 5. Knowledge-Contribution Positioning

The contribution is **alignment with established theory and a provisional enhancement of design knowledge**. The enhancement specifies how terminology, explanation and adaptive assistance can be coordinated through explicit rules, separate quality checks and clear session records. Evaluation identifies both working controls and their failure conditions. Table 3 distinguishes this contribution from untested claims of novelty or educational improvement.

**Table 3. Contribution Relative to Prior Knowledge**

| Position | Prior knowledge and project evidence | Supported contribution |
| --- | --- | --- |
| Alignment | TTF connects technology use and task fit with performance. Language, explanation and interaction capabilities address corresponding learner tasks. | Task-aligned design responsibilities, without measured fit or performance effects. |
| Alignment | Scaffolding involves support matched to ability, gradual reduction of help and increasing learner responsibility. The system collects feedback and revises support. | A request-based response mechanism, with competence diagnosis and increasing independence still untested. |
| Enhancement | Prior studies demonstrate native-language programming assistance and preference-sensitive scientific translation. Tested routes, content review, session records and bounds analysis examine their coordination here. | Five conditional principles defining help selection, separate content/state assessment, session continuity and the scope of limits. |
| Contradiction of design assumptions | Format-valid outputs contained scientific/Burmese errors; two simultaneous calls produced one saved adaptation. | Counterexamples to local assumptions that format guarantees meaning or that saved-round limits guarantee spending limits. These do not contradict the cited theories. |
| Totally new/novel/original | The review used one database and a limited corpus, without a comprehensive novelty or comparative study. | No evidence establishes that this system is the first of its kind, a new learning theory or superior tutoring. |

TTF supplies the rationale for matching capabilities to learner tasks ([Goodhue & Thompson, 1995](https://doi.org/10.2307/249689)). Scaffolding requires contingency, or support matched to ability; fading, or gradual reduction of help; and transfer of responsibility to the learner ([van de Pol et al., 2010](https://doi.org/10.1007/s10648-010-9127-6)). The design follows these ideas, but a reported need only identifies a request. It does not measure competence or establish appropriate fading.

[Athukorala and De Silva (2025)](https://doi.org/10.7763/IJCTE.2025.V17.1378) demonstrate native-language queries and generated assistance for Sinhala Java learning. [Kleidermacher and Zou (2026)](https://doi.org/10.18653/v1/2026.findings-eacl.204) examine scientific translation and preferences for retaining selected technical terms. These studies support native-language access and context-sensitive terminology choices. This study adds a connected set of design prescriptions and evidence about three distinctions: requested help versus demonstrated ability; acceptable output structure versus scientific/bilingual accuracy; and saved revisions versus provider requests and spending.

The evidence makes these distinctions concrete. Rule-based routes responded to stated need, but learner suitability remained unmeasured. Content failures occurred despite successful technical checks. Session history supported continuity but retained earlier errors. Concurrent requests preserved the saved-adaptation limit while duplicating provider work. The enhancement therefore concerns making support decisions and their limits explicit and testable. It does not assert that prior systems lacked all these features or that this application outperformed them.

Under [Gregor and Hevner's (2013)](https://doi.org/10.25300/MISQ/2013/37.2.01) framework, the intended contribution is Improvement: an established problem is addressed through a refined integration of existing capabilities. Comparative improvement remains untested. Following [Baskerville et al. (2018)](https://doi.org/10.17705/1jais.00495), the artefact contribution is the evaluated framework/application; the theoretical contribution is the five conditional prescriptions and their evidence-based boundaries. Their transferable value concerns how to design and assess coordinated assistance, while their effect on learning remains a research question.

## 6. Limitations and Their Effect on the Findings

Table 4 links the evaluation's validity threats to their effects on the findings and principles. Following [Venable et al. (2016)](https://doi.org/10.1057/ejis.2014.36), controlled tests are distinguished from use by actual learners.

**Table 4. Evaluation Limitations and Their Effects on Generalisation**

| Validity threat | Specific evaluation limitation | Effect on the findings and design principles |
| --- | --- | --- |
| Construct validity | Self-report records perceived need. Inspection examines visible usability, not student satisfaction. Learning and TTF were not measured. | Learner benefits remain unknown. DP2 describes how requests guide responses, not whether support matches actual ability. |
| Internal validity | No comparison assessed learner benefits or separate component effects. Tests and content reviews measured different outcomes. | Improved accuracy, usability or learning cannot be attributed to particular components or help choices. |
| Assessment validity | The author checked scientific/Burmese judgements without a second assessor or confirmed expertise in every STEM domain. | Reviewer agreement is unknown. The content concerns are supported, but DP3 needs independent assessment. |
| External validity | Tests used artificial inquiries, one local application/model configuration and simulated mobile layouts. No learners participated. | DP1–DP5 require testing in other languages, subjects, physical devices and deployments. |
| Sampling and evidence dependence | The bilingual review examined 104 passage pairs from 32 deliberately selected outputs. Methods shared artefacts, test inputs or literature. | Error counts do not show how common errors are overall. Agreement across methods is not independent replication. |
| Technical validity | Simultaneous provider calls exceeded saved adaptations. Cancellation took 52.825 seconds despite a configured 20-second timeout. Preference-save failure recovery was not assessed. | DP5 does not establish cost or response-time guarantees. Storage tests do not show readiness for deployment. |

The literature review used Scopus and an open-access filter; some later comparisons used abstracts or secondary summaries. Relevant studies may have been missed or partly examined. The contribution is limited to the reviewed sample; similar systems may exist.

The system was not evaluated in an actual educational setting or tested in another context. Action design research (ADR) concepts helped develop the design principles, but learners and other stakeholders did not participate in a real-use intervention. The principles need evaluation in practice. The observed failures limit the conclusions. Better explanations generated later did not replace incorrect explanations already saved in the session history. Rejecting a correction that kept the same concept prevented acceptance of an unsuccessful change, but did not resolve the learner's intended meaning. These findings support specific system controls; consistent content accuracy and improved learning remain unestablished.

## 7. Implications and Future Work

### 7.1 Implications for Practice

Practitioners can apply the tested design controls: define terminology and context responsibilities, separate reported need from session completion, use application rules to select limited support, and save responses and revisions. Scientific meaning and consistency between languages should be checked alongside technical requirements. The observed issues also support clearer labels for unresolved meaning, translated error messages and reliable keyboard focus in the preferences dialog. Provider spending needs a separate control because a saved-adaptation limit does not limit all calls. Content accuracy still requires independent review.

### 7.2 Research Agenda

Future research should address the observed weaknesses and test the proposed principles in stages.

1. **Correct and independently review content.** Record new versions addressing gravity/ion errors, unclear meaning and the three usability issues. Repeat affected technical tests. Ask independent bilingual subject reviewers to assess a representative output sample selected in advance. Report scientific accuracy, translation accuracy, error severity and reviewer agreement separately. Examine how corrections are shown alongside earlier saved content.
2. **Study learner experience and outcomes.** After ethics approval and recruitment, study Burmese-speaking STEM learners completing realistic tasks. Compare the assistant with a suitable translation/explanation baseline. Account for task difficulty and prior knowledge. Define the main outcome and justify participant numbers before the study. Measure task completion, usability, perceived support, immediate understanding and later retention separately. Knowledge questions before and after use can be research instruments without becoming a permanent quiz feature.
3. **Test adaptation and interaction limits.** Compare support selected from overall need alone with support selected using optional difficulty choices. Examine whether requests match independently assessed difficulties. Vary the adaptation limit and measure unresolved needs, meaningful changes in explanations, provider calls, response time and cost. This tests DP2 and DP5 without assuming two revisions are sufficient.
4. **Test transfer to other settings.** Apply the principles in another STEM discipline and low-resource language, with local terminology review and learner evaluation. Record which principles are retained, changed or rejected. This would help distinguish transferable mechanisms from decisions specific to Burmese.

The proposed relationship is that explicit difficulty information and separate content/state checks may improve the suitability and accountability of assistance. This remains a proposition for testing. Stronger claims about educational improvement or a mature design theory require that evidence.

## 8. Conclusion

This study developed and evaluated a system that combines multilingual STEM terminology support, conceptual explanation and adaptive scaffolding for Burmese-speaking learners. Technical tests supported the rules for selecting assistance, saving responses and restoring learning sessions under tested conditions. However, scientific errors, Burmese-language errors and repeated examples showed that successful operation did not ensure accurate or useful explanations. The three research questions are therefore partially supported: the proposed approaches were implemented, but improved understanding, longer-term retention and reduced language difficulties were not measured.

Reflection on the design and evaluation produced five design principles: clarify the intended meaning before selecting language support; use explicit help requests without assuming mastery; assess scientific and bilingual accuracy separately from output structure; preserve clear session records; and explain what each support limit controls. These principles align with Task–Technology Fit and Scaffolding Theory. Their contribution is a provisional enhancement of design knowledge through the evaluated combination of established capabilities and clear application controls.

The principles may inform similar educational systems, but their usefulness has not been established across languages or learning contexts. Independent content review, learner studies and evaluation in other disciplines and languages are needed to assess their effects and limits. This work provides an evidence-based starting point for further design and research, while educational effectiveness remains to be demonstrated.

## References

Athukorala, K. S. N., & De Silva, D. I. (2025). Bridging language barriers in programming education: Java programming assistance tool for Sinhala native speakers. *International Journal of Computer Theory and Engineering, 17*(3), 151–169. [https://doi.org/10.7763/IJCTE.2025.V17.1378](https://doi.org/10.7763/IJCTE.2025.V17.1378)

Baskerville, R., Baiyere, A., Gregor, S., Hevner, A., & Rossi, M. (2018). Design science research contributions: Finding a balance between artifact and theory. *Journal of the Association for Information Systems, 19*(5), 358–376. [https://doi.org/10.17705/1jais.00495](https://doi.org/10.17705/1jais.00495)

Goodhue, D. L., & Thompson, R. L. (1995). Task-technology fit and individual performance. *MIS Quarterly, 19*(2), 213–236. [https://doi.org/10.2307/249689](https://doi.org/10.2307/249689)

Gregor, S., & Hevner, A. R. (2013). Positioning and presenting design science research for maximum impact. *MIS Quarterly, 37*(2), 337–355. [https://doi.org/10.25300/MISQ/2013/37.2.01](https://doi.org/10.25300/MISQ/2013/37.2.01)

Kleidermacher, H. C., & Zou, J. (2026). Science across languages: Assessing LLM multilingual translation of scientific papers. In V. Demberg, K. Inui, & L. Marquez (Eds.), *Findings of the Association for Computational Linguistics: EACL 2026* (pp. 3932–3947). Association for Computational Linguistics. [https://doi.org/10.18653/v1/2026.findings-eacl.204](https://doi.org/10.18653/v1/2026.findings-eacl.204)

Mullarkey, M. T., & Hevner, A. R. (2019). An elaborated action design research process model. *European Journal of Information Systems, 28*(1), 6–20. [https://doi.org/10.1080/0960085X.2018.1451811](https://doi.org/10.1080/0960085X.2018.1451811)

Sein, M. K., Henfridsson, O., Purao, S., Rossi, M., & Lindgren, R. (2011). Action design research. *MIS Quarterly, 35*(1), 37–56. [https://doi.org/10.2307/23043488](https://doi.org/10.2307/23043488)

van de Pol, J., Volman, M., & Beishuizen, J. (2010). Scaffolding in teacher–student interaction: A decade of research. *Educational Psychology Review, 22*(3), 271–296. [https://doi.org/10.1007/s10648-010-9127-6](https://doi.org/10.1007/s10648-010-9127-6)

Venable, J., Pries-Heje, J., & Baskerville, R. (2016). FEDS: A framework for evaluation in design science research. *European Journal of Information Systems, 25*(1), 77–89. [https://doi.org/10.1057/ejis.2014.36](https://doi.org/10.1057/ejis.2014.36)
