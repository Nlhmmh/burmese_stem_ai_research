# Conceptual literature evaluation

Detailed sections: [Recorded findings](#recorded-findings) · [Evidence Base](#evidence-base) · [Evaluation of the Seven Framework Stages](#evaluation-of-the-seven-framework-stages) · [Evaluation of GenAI-Identified Risks](#evaluation-of-genai-identified-risks) · [References](#references).

## Method and scope

The existing 17-study literature corpus was used to examine the original seven-stage framework and the GenAI concerns. No new search or screening exercise was performed. Nineteen findings linked support, transfer limits and unresolved assumptions to the framework. Exact source mappings remain in [literature_matrix.csv](literature_matrix.csv).

## Recorded findings

| Finding / Theme | Literature Result |
|---|---|
| PIRQOA/RQ1–RQ3 coverage | Strongly supported |
| Terminology identification | Strongly supported |
| Technical-context interpretation | Strongly supported |
| Terminology ↔ context iteration concern | Limited support / unresolved |
| Selective Burmese/English support | Strongly supported in principle |
| Language-selection criteria concern | Moderately supported |
| Conceptual explanation beyond translation | Strongly supported |
| Structured scaffolding | Strongly supported |
| Stage 4/Stage 5 merge | Not supported |
| Stage 4/Stage 5 clarification | Supported |
| Learner interaction/response | Moderately supported |
| Self-report as non-objective learning evidence | Not directly evaluated by Assignment 2 |
| Adaptive support | Strongly supported in principle |
| Exact adaptation decision logic | Moderately supported concern |
| Feedback-loop re-entry to earlier stages | Limited-to-moderate support |
| Context interpretation error risk | Moderate-to-strong support |
| Generated-content reliability risk | Strongly supported |
| Seven-stage major redesign | Not supported by literature |
| Seven-stage clarification/refinement | Supported |

## Interpretation and limits

Native-language technical assistance, selective term retention and structured support have a literature-grounded rationale. Findings from Sinhala programming, scientific-paper translation or teacher-led multilingual work do not directly establish Burmese beginner outcomes. The corpus does not validate exactly seven stages, the implementation route table, self-report calibration or a two-adaptation optimum.

Some comparisons relied on existing review summaries rather than independent full-text inspection. Retain those access limits. The later informed argument adds scholarly warrants but is not a new SLR or independent replication of the corpus. Evidence E051–E052 records the original matrix and interpretation.

### Evidence Base

### Source Scope

This evaluation deliberately uses the literature base already established in Assignment 2 rather than conducting a new systematic review.

Assignment 2 retained **17 studies** after full-text screening and organized the evidence into four themes:

1. **Low-resource and multilingual language barriers**
2. **LLM-based translation and terminology support**
3. **Educational scaffolding and personalized learning**
4. **System design and prompt engineering**

The SLR also derived twelve sub-themes, including:

- context-aware translation;
- technical terminology;
- terminology identification;
- conceptual explanation;
- personalized/adaptive support;
- multilingual interaction;
- structured learning support;
- prompt engineering;
- integrated educational systems.

The Assignment 2 synthesis found that these capabilities were fragmented across separate research streams and that no reviewed study strongly covered all twelve sub-themes.

This makes the Assignment 2 literature suitable for evaluating whether the proposed conceptual framework integrates previously fragmented but literature-supported capabilities.

---

### Main Literature Used in This Evaluation

The most directly relevant sources are:

- **Tran et al. (2026)** — terminology identification / Automatic Term Extraction;
- **He et al. (2025)** — context-sensitive translation and preservation of instructional meaning;
- **Kleidermacher and Zou (2026)** — scientific translation and selective preservation of technical terminology;
- **Candé and Martinho (2026)** — low-resource language challenges, LLM-supported translation/education, and limitations;
- **Athukorala and De Silva (2025)** — native-language technical learning support;
- **Kuzu (2026)** — multilingual interaction, structured learning activities, learner evaluation/refinement of LLM responses;
- **Nair et al. (2026)** — bilingual and adaptive support;
- **Rakhimova et al. (2024)** — structured educational language resources;
- **Zhang and Pang (2025)** — structured LLM-supported learning functions;
- **Sakunkoo et al. (2025)** — contextual multilingual interaction;
- **Vatsal et al. (2026)** — multilingual prompting and variation by language, task, and resource availability;
- **Bal and Mandal (2026)** — adaptive bilingual prompting;
- **Khoboko et al. (2025)** — prompt engineering for low-resource translation.

No additional web literature was introduced in this evaluation.

---

### Evaluation Method

Each framework element and major GenAI concern was compared against the Assignment 2 literature.

The literature judgment uses four levels:

| Judgment | Meaning |
|---|---|
| **Strong support** | Multiple or directly relevant sources support the element or concern. |
| **Moderate support** | Relevant literature supports the principle, but not the exact mechanism or target context. |
| **Limited support** | Literature is indirectly relevant but does not clearly evaluate the specific framework claim. |
| **Not directly supported** | Assignment 2 does not provide evidence capable of resolving the specific claim or concern. |

A literature judgment does **not** mean the framework is empirically proven effective for Burmese-speaking learners. It only indicates whether the design element is consistent with the evidence base reviewed in Assignment 2.

---

### Evaluation of the Seven Framework Stages

### Stage 1 — Identify STEM Terminology

### Literature evidence

Tran et al. (2026) define Automatic Term Extraction as identifying specialized domain terminology rather than ordinary vocabulary. Assignment 2 explicitly argued that terminology must be identified before it can be appropriately translated or explained.

### Evaluation

**Literature judgment: Strong support**

The literature directly supports having a distinct conceptual responsibility for identifying specialized STEM terminology.

This supports:

- RQ1;
- the terminology-support requirement;
- GenAI finding G02.

### Important limitation

The literature supports terminology identification as a capability, but it does not require the exact implementation used by the current PoC and does not establish that terminology will always be correctly identified.

---

### Stage 2 — Interpret Technical Context

### Literature evidence

He et al. (2025) emphasize preserving instructional meaning and context in cross-cultural educational translation.

Kleidermacher and Zou (2026) show that scientific translation involves domain-sensitive terminology decisions rather than simple literal substitution.

Assignment 2 also concluded that multilingual support must account for both linguistic meaning and subject knowledge.

### Evaluation

**Literature judgment: Strong support**

A separate context-interpretation responsibility is well supported because technical meaning cannot safely be handled as isolated vocabulary.

This supports:

- RQ1;
- RQ2;
- GenAI findings G23 and G27.

### Relation to the GenAI concern about Stage 1 ↔ Stage 2

The literature supports identifying terminology and interpreting context, but Assignment 2 does **not** establish that the relationship must be strictly one-directional.

Tran et al. support identifying terms before suitable support is generated, while context-sensitive translation research shows that meaning depends on context.

Therefore:

> **The GenAI concern that terminology identification and context interpretation may sometimes be mutually informing is not contradicted by the literature, but the Assignment 2 evidence does not explicitly require an iterative loop.**

**Judgment on GenAI concern G07: Limited support / unresolved**

---

### Stage 3 — Select Language Support

### Literature evidence

Kleidermacher and Zou (2026) found that some scientific terms may be better retained in English when direct translation produces unfamiliar or misleading terminology.

He et al. (2025) support context-aware rather than literal translation.

Athukorala and De Silva (2025) demonstrate the value of native-language technical support.

Nair et al. (2026) demonstrate bilingual interaction in an underrepresented-language educational context.

Vatsal et al. (2026) show that multilingual prompting effectiveness varies according to language, task, and resource availability.

### Evaluation

**Literature judgment: Strong support for selective/context-sensitive language support**

The evidence supports the framework's decision not to automatically translate every technical term.

The literature supports a conceptual choice among:

- Burmese support;
- English-term preservation;
- bilingual presentation;
- combinations of these.

This strongly supports:

- RQ1;
- GenAI findings G17, G19, G28, and G34.

### Does the literature resolve the GenAI concern about selection criteria?

Only partially.

Assignment 2 supports **factors that should matter**, including:

- technical context;
- familiarity/usefulness of English technical terminology;
- language/task/resource conditions;
- instructional meaning.

However, it does not specify a precise rule for deciding which strategy to use for a particular learner.

Therefore:

> **The GenAI concern that Stage 3 is conceptually underspecified is moderately supported.**

The literature supports the need for contextual selection criteria but does not supply a complete decision algorithm.

**Judgment on G17/G21/G28: Moderate support**

---

### Stage 4 — Explain STEM Concept

### Literature evidence

Athukorala and De Silva (2025) found that native-language programming assistance can facilitate access to technical concepts rather than merely translate text.

Kuzu (2026) demonstrates multilingual LLM interaction within structured mathematics learning activities.

Assignment 2 explicitly identified **Conceptual Explanation** as a separate SLR sub-theme defined as explanation that supports understanding rather than merely translating words or sentences.

### Evaluation

**Literature judgment: Strong support**

The literature strongly supports an explicit stage that goes beyond lexical translation and provides conceptual meaning.

This supports:

- RQ2;
- GenAI finding G03;
- the distinction between a translation interface and an educational scaffolding system.

---

### Stage 5 — Provide Scaffolding

### Literature evidence

Assignment 2 identified **Structured Learning Support** as a separate SLR sub-theme involving guided activities, feedback, question answering, and other mechanisms that structure learning.

Kuzu (2026) supports structured learning activities and learner evaluation/refinement of LLM responses.

Rakhimova et al. (2024), Zhang and Pang (2025), Nair et al. (2026), and Sakunkoo et al. (2025) provide examples of structured, contextual, bilingual, interactive, or adaptive educational support.

### Evaluation

**Literature judgment: Strong support**

The literature supports treating learner-facing structure as more than a single generated explanation.

This supports:

- RQ2;
- RQ3;
- GenAI findings G04 and G12.

### Testing the GenAI Stage 4 / Stage 5 overlap concern

The GenAI repeatedly argued that `Explain STEM Concept` and `Provide Scaffolding` partially overlap.

The Assignment 2 literature provides an important counterpoint:

- **Conceptual Explanation** and
- **Structured Learning Support**

were coded as **separate SLR sub-themes**.

This indicates that they are conceptually distinguishable in the literature.

A defensible distinction is:

> **Stage 4 defines or produces the STEM meaning to be communicated, whereas Stage 5 structures how the learner is supported in accessing, elaborating, reflecting on, or revisiting that meaning.**

However, the GenAI concern is still useful because the current wording of Stage 5 includes "simple explanation" and "technical explanation," which can blur the boundary.

Therefore:

> **The literature does not support merging Stage 4 and Stage 5, but it supports clarifying their conceptual responsibilities.**

**Judgment on G08/G31: Partially supported concern; clarification supported, removal/merging not supported**

---

### Stage 6 — Collect Learner Response

### Literature evidence

Kuzu (2026) describes learners evaluating and refining LLM responses in multilingual mathematics activities.

Nair et al. (2026) provide personalized feedback and structured learning activities.

The Assignment 2 synthesis supports interactive and learner-oriented educational systems rather than one-directional translation.

### Evaluation

**Literature judgment: Moderate support**

The literature supports collecting learner input/feedback as part of interactive scaffolding.

However, Assignment 2 does **not** provide direct evidence validating the framework's specific learner self-report categories as measures of actual understanding.

### Testing the GenAI self-report concern

The GenAI's strongest limitation was that self-reported understanding is not objective evidence of competence or learning.

Assignment 2 does not directly study the validity of this particular self-report mechanism.

Therefore:

> **The Assignment 2 literature does not directly confirm or refute the self-report limitation.**

The concern remains methodologically important, but it should not be presented as an SLR finding unless additional literature is introduced.

**Judgment on G05/G24/G30/G33: Not directly supported by Assignment 2; remains a GenAI/methodological limitation to triangulate separately**

---

### Stage 7 — Adapt Support

### Literature evidence

Candé and Martinho (2026) identify adaptive assistance as part of LLM-supported education.

Nair et al. (2026) demonstrate personalized feedback and adaptive support.

Kuzu (2026) describes learners evaluating LLM responses and refining explanations.

Bal and Mandal (2026) provide evidence that adaptive bilingual prompting can alter multilingual system behaviour.

Assignment 2 also identifies **Personalized/Adaptive Support** as a distinct SLR sub-theme.

### Evaluation

**Literature judgment: Strong support for adaptation as a capability; limited-to-moderate support for the exact decision logic**

The literature supports the principle that assistance can be adjusted rather than remaining static.

This supports:

- RQ3;
- contingency-oriented design;
- GenAI findings G20 and G29 at a general level.

### Does the literature specify how learner response should map to adaptation?

No.

Assignment 2 does not provide a rule such as:

- partial understanding → simpler explanation;
- need support → different analogy;
- high understanding → fade.

Therefore:

> **The GenAI concern that Stage 7's decision logic is underspecified is not contradicted by the literature and is moderately supported by the absence of a literature-derived mapping rule.**

However, absence of such a rule in the SLR does not itself prove the current framework is defective.

**Judgment on G16/G21/G25/G29/G32: Moderate support for clarification; no literature basis for a specific mapping algorithm**

---

### Evaluation of the Feedback Loop

The framework states:

> **Learner Response → Adapt Support → Updated Scaffolding**

The literature supports:

- interactive learning;
- feedback;
- refinement;
- personalized/adaptive support;
- structured learning activities.

Therefore, the existence of a feedback loop is consistent with the literature.

### GenAI concern: Where should the loop return?

The GenAI argued that adaptation may need to revisit:

- Stage 3 — Select Language Support;
- Stage 4 — Explain STEM Concept;
- Stage 5 — Provide Scaffolding.

Assignment 2 provides indirect support for this possibility because:

- language support is context-sensitive;
- conceptual explanations can be refined;
- adaptive bilingual prompting exists;
- learner-oriented systems combine several support functions.

However, the literature does not define the current framework's re-entry paths.

### Evaluation

**Literature judgment: Limited-to-moderate support**

The evidence supports adaptive revision of support, but not a specific feedback topology.

Therefore:

> **The GenAI suggestion that adaptation may revisit relevant earlier support decisions is plausible and literature-consistent, but not directly established by the Assignment 2 evidence.**

**Judgment on G10/G35: Limited-to-moderate support**

---

### Evaluation of GenAI-Identified Risks

### Risk — Incorrect Technical-Context Interpretation

### GenAI finding

A wrong interpretation at Stage 2 could propagate to Stages 3–5.

### Literature evidence

He et al. (2025) emphasize instructional/contextual meaning.

Kleidermacher and Zou (2026) demonstrate the importance of domain-sensitive scientific terminology handling.

Candé and Martinho (2026) highlight uneven model performance in specialized and low-resource contexts.

### Evaluation

**Support level: Moderate-to-strong**

The literature strongly supports the importance of correct context interpretation.

The specific "cascading propagation" description is an analytical inference rather than a directly reported SLR result.

### Conclusion

The risk is **literature-consistent and well founded**, but the exact cascade is a framework-level inference.

---

### Risk — Generated Explanations May Be Inaccurate or Pedagogically Inappropriate

### GenAI finding

Structured output does not guarantee correctness or educational quality.

### Literature evidence

Assignment 2 explicitly states that LLM performance remains uneven in specialized contexts and that generated outputs require critical evaluation and appropriate human supervision (Candé & Martinho, 2026).

Vatsal et al. (2026) show that multilingual prompting effectiveness varies by language, task, and resource availability.

Assignment 2 further argues that prompting should be treated as a design mechanism requiring empirical evaluation rather than as an assumed solution.

### Evaluation

**Support level: Strong**

This is one of the GenAI concerns most clearly supported by Assignment 2.

### Conclusion

The framework may structure generation, but the literature does not justify treating generated STEM explanations as inherently correct or educationally effective.

**GenAI finding G14/G38 is strongly supported.**

---

### Risk — Language-Support Selection Is Inappropriate

### GenAI finding

The wrong Burmese/English balance could make terminology less useful or less familiar.

### Literature evidence

Kleidermacher and Zou (2026) directly support selective English-term preservation.

He et al. (2025) support contextual rather than literal translation.

Vatsal et al. (2026) show variation by language and task.

### Evaluation

**Support level: Strong for the risk; moderate for exact decision criteria**

The literature strongly supports the need to avoid automatic translation.

It does not specify a complete learner-specific selection rule.

**GenAI finding G28 is strongly supported as a risk; G34 is moderately supported as a proposed refinement.**

---

### Risk — Self-Report Does Not Equal Learning

### GenAI finding

Self-reported understanding is insufficient to establish mastery.

### Literature evidence

The Assignment 2 SLR contains evidence for interaction, feedback, personalization, and learner-oriented support.

It does **not** directly evaluate whether the current self-report mechanism is a valid measure of learning.

### Evaluation

**Support level: Not directly supported by Assignment 2**

This remains an important methodological limitation already recognized in the research design, but it cannot honestly be attributed to the Assignment 2 SLR.

---

### Risk — Adaptation/Fading Is Insufficiently Constrained

### GenAI finding

The framework lists possible adaptive actions but does not clearly define the conditions for choosing among them.

### Literature evidence

Nair et al. (2026), Kuzu (2026), and Candé and Martinho (2026) support adaptive/personalized educational assistance.

Bal and Mandal (2026) support adaptive bilingual prompting.

However, Assignment 2 does not derive a specific response-to-adaptation decision model.

### Evaluation

**Support level: Moderate**

The literature supports adaptive support but does not resolve the framework's exact decision logic.

The GenAI concern is therefore plausible and not contradicted by the SLR.

---

### Testing the Main GenAI Findings Against the Literature

| GenAI Finding | Literature Evaluation | Result |
|---|---|---|
| RQ1–RQ3 have identifiable framework coverage | Assignment 2 derives terminology, conceptual explanation, personalization, structured support, and integrated-system requirements from the SLR/SSR | **Supported** |
| Terminology identification is necessary | Tran et al. directly support specialized term identification | **Strongly supported** |
| Technical context is necessary | He et al.; Kleidermacher & Zou; Assignment 2 synthesis support contextual meaning | **Strongly supported** |
| Selective Burmese/English support is justified | Scientific translation, multilingual interaction, and native-language support studies support contextual/selective language strategies | **Strongly supported in principle** |
| Stage 3 selection criteria are underspecified | Literature identifies relevant factors but gives no complete learner-specific decision rule | **Moderately supported concern** |
| Concept explanation beyond translation is necessary | Athukorala & De Silva; Kuzu; SLR sub-theme Conceptual Explanation | **Strongly supported** |
| Structured scaffolding is necessary | Kuzu; Nair; Zhang & Pang; Rakhimova; SLR Structured Learning Support | **Strongly supported** |
| Stage 4 and Stage 5 should be merged | Assignment 2 treats Conceptual Explanation and Structured Learning Support as distinct sub-themes | **Not supported** |
| Stage 4 and Stage 5 need clearer boundaries | Their sub-themes are distinct, but current wording overlaps | **Supported as clarification** |
| Learner interaction/response is useful | Kuzu and Nair support interactive/personalized support | **Moderately supported** |
| Self-report is not objective learning evidence | Not directly studied in Assignment 2 | **Unresolved by SLR** |
| Adaptive support is justified | Candé & Martinho; Nair; Kuzu; adaptive/personalized sub-theme | **Strongly supported in principle** |
| Exact adaptation logic is underspecified | No reviewed source supplies the framework's specific response-to-action mapping | **Moderately supported concern** |
| Adaptation should revisit earlier stages | Literature supports adaptive revision generally but not this exact topology | **Limited-to-moderate support** |
| Generated explanations may be unreliable | Candé & Martinho; Vatsal; Assignment 2 prompt-engineering synthesis | **Strongly supported concern** |
| Seven-stage architecture needs major redesign | SLR supports the major capabilities and their integration; no evidence requires structural redesign | **Not supported by literature** |

---

## References

Athukorala, K. S. N., & De Silva, D. I. (2025). Bridging language barriers in programming education: Java programming assistance tool for Sinhala native speakers. *International Journal of Computer Theory and Engineering, 17*(3), 151–169. https://doi.org/10.7763/IJCTE.2025.V17.1378

Bal, S., & Mandal, L. (2026). A prompt-based interactive dialogue framework for low-resource Indian languages. *Procedia Computer Science, 282*, 220–229. https://doi.org/10.1016/j.procs.2026.05.070

Candé, A., & Martinho, D. (2026). Artificial intelligence in translation and interpreting in education: A systematic review of trends, applications and challenges. *Information, 17*(6), 543. https://doi.org/10.3390/info17060543

He, J., Wang, F., Li, S., Lei, Y., Zhu, J., & Lv, L. (2025). A comparative study on the translation capabilities of multimodal large language models with independent intellectual property rights—Taking cross-cultural online education scenarios as an example. *Proceedings of the 2025 2nd International Conference on Big Data and Digital Management*, 834–839. https://doi.org/10.1145/3768801.3768938

Khoboko, P. W., Marivate, V., & Sefara, J. (2025). Optimizing translation for low-resource languages: Efficient fine-tuning with custom prompt engineering in large language models. *Machine Learning with Applications, 20*, 100649. https://doi.org/10.1016/j.mlwa.2025.100649

Kleidermacher, H. C., & Zou, J. (2026). Science across languages: Assessing LLM multilingual translation of scientific papers. In V. Demberg, K. Inui, & L. Marquez (Eds.), *Findings of the Association for Computational Linguistics: EACL 2026* (pp. 3932–3947). Association for Computational Linguistics. https://doi.org/10.18653/v1/2026.findings-eacl.204

Kuzu, T. E. (2026). AI-supported translanguaging processes in primary school: Empirical insights into ChatGPT's role in multilingual interactions. *Technology, Knowledge and Learning*. Advance online publication. https://doi.org/10.1007/s10758-026-09974-7

Nair, P. C., Reddy, A. C., & Hemasri, M. (2026). Vidyālaya: AI-powered Telugu language learning platform. *Procedia Computer Science, 283*, 1386–1395. https://doi.org/10.1016/j.procs.2026.06.216

Rakhimova, D., Karibayeva, A., Karyukin, V., Turarbek, A., Duisenbekkyzy, Z., & Aliyev, R. (2024). Development of a children's educational dictionary for a low-resource language using AI tools. *Computers, 13*(10), 253. https://doi.org/10.3390/computers13100253

Sakunkoo, J., Sakunkoo, A., & Sakunkoo, P. (2025). SingLing: Learning languages by singing code-switched lyrics. *Adjunct Proceedings of the 38th Annual ACM Symposium on User Interface Software and Technology*, 1–3. https://doi.org/10.1145/3746058.3758393

Tran, H. T. H., Martinc, M., Caporusso, J., Delaunay, J., Doucet, A., & Pollak, S. (2026). Recent advances in automatic term extraction: A comprehensive survey. *ACM Computing Surveys, 58*(9), Article 226. https://doi.org/10.1145/3787584

Vatsal, S., Dubey, H., & Singh, A. (2026). Multilingual prompt engineering in large language models: A survey across NLP tasks. *IEEE Access, 14*, 99057–99093. https://doi.org/10.1109/ACCESS.2026.3702852

Zhang, C., & Pang, G. (2025). An interactive video learning framework enhanced by large language models. *Proceedings of the 2025 International Conference on Educational Technology and Artificial Intelligence*, 458–463. https://doi.org/10.1145/3766557.3766635

## Preservation and review scope

Detailed records above were recovered from the pre-consolidation archive, not newly executed or re-scored. Repeated planning, sign-off and summary text is omitted. The [shared protocol](../../00_protocol/evaluation_protocol.md) records preparation, execution and subsequent human verification. Original capture-time statements and complete documents remain in the [archive](../../archive/pre_consolidation_markdown_20261008.zip).
