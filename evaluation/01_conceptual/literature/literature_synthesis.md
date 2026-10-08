# Literature Synthesis — Context-Aware Adaptive STEM Scaffolding Framework

> **Human-verification update, 8 October 2026.** The author has confirmed personally checking every scientific and English–Burmese assessment against the original outputs and relevant references. AI assistance with preparation, execution and drafting remains acknowledged. Final interpretations and decisions are accepted by the author. This is not an independent second assessment or a claim of manual execution throughout. See the [confirmation and scope](../../00_protocol/human_verification_confirmation.md). Earlier capture-time statements retain their historical meaning.

## 1. Purpose

This document evaluates the **Context-Aware Adaptive STEM Scaffolding Framework** using the academic literature already established in **INFOSYS 720 Assignment 2**.

This is the required **SLR / Academic Literature** component of the Assignment 5 conceptual artefact evaluation.

The purpose is **not to repeat the Assignment 2 literature review**. Instead, the existing literature is used as evaluation evidence to test whether:

- the seven framework stages are supported by the reviewed literature;
- the framework's main conceptual relationships are defensible;
- concerns raised in the GenAI interview are supported, contradicted, or left unresolved by the literature;
- the conceptual artefact remains traceable to RQ1–RQ3 and the PIRQOA requirements.

This synthesis should later be triangulated with:

1. the completed GenAI interview;
2. descriptive informed argument;
3. independent scenario evaluation;
4. optional human expert interview.

---

# 2. Evidence Base

## 2.1 Source Scope

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

## 2.2 Main Literature Used in This Evaluation

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

# 3. Evaluation Method

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

# 4. Evaluation of the Seven Framework Stages

## 4.1 Stage 1 — Identify STEM Terminology

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

## 4.2 Stage 2 — Interpret Technical Context

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

## 4.3 Stage 3 — Select Language Support

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

## 4.4 Stage 4 — Explain STEM Concept

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

## 4.5 Stage 5 — Provide Scaffolding

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

## 4.6 Stage 6 — Collect Learner Response

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

## 4.7 Stage 7 — Adapt Support

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

# 5. Evaluation of the Feedback Loop

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

# 6. Evaluation of GenAI-Identified Risks

## 6.1 Risk — Incorrect Technical-Context Interpretation

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

## 6.2 Risk — Generated Explanations May Be Inaccurate or Pedagogically Inappropriate

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

## 6.3 Risk — Language-Support Selection Is Inappropriate

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

## 6.4 Risk — Self-Report Does Not Equal Learning

### GenAI finding

Self-reported understanding is insufficient to establish mastery.

### Literature evidence

The Assignment 2 SLR contains evidence for interaction, feedback, personalization, and learner-oriented support.

It does **not** directly evaluate whether the current self-report mechanism is a valid measure of learning.

### Evaluation

**Support level: Not directly supported by Assignment 2**

This remains an important methodological limitation already recognized in the research design, but it cannot honestly be attributed to the Assignment 2 SLR.

---

## 6.5 Risk — Adaptation/Fading Is Insufficiently Constrained

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

# 7. Testing the Main GenAI Findings Against the Literature

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

# 8. Criterion-Level Literature Evaluation

## 8.1 C1 — PIRQOA Coverage

### Literature judgment

> **Strongly supported**

The Assignment 2 SLR/SSR directly established needs for:

- terminology identification;
- context-sensitive terminology/language support;
- conceptual explanation beyond translation;
- structured educational support;
- personalized/adaptive support;
- integrated LLM-based educational system design.

The seven-stage framework therefore has strong literature traceability to RQ1–RQ3.

### Limitation

Literature support for a capability does not demonstrate effectiveness in the Burmese target context.

---

## 8.2 C2 — Logical Coherence

### Literature judgment

> **Moderately supported**

The broad progression is literature-consistent:

> terminology → context-sensitive support → conceptual explanation → structured interaction → learner-responsive adaptation.

However, the Assignment 2 SLR was not designed to validate the exact seven-stage sequence.

In particular, it does not resolve:

- whether terminology/context should be iterative;
- the exact re-entry path of adaptation;
- the exact Stage 4/5 boundary.

### Conclusion

The literature supports the **logic of the main responsibilities**, but only partially evaluates their exact ordering.

---

## 8.3 C3 — Theoretical / Educational Consistency

### Literature judgment

> **Moderate support from SLR evidence**

The SLR supports:

- structured educational support;
- conceptual explanation;
- personalization;
- adaptive assistance;
- multilingual interaction.

However, TTF itself was developed in later project stages and is not evaluated through the Assignment 2 SLR.

The literature evaluation should therefore not be used to claim that actual Task–Technology Fit has been demonstrated.

### Conclusion

The SLR is consistent with the educational mechanisms in the framework but is not a direct empirical test of the current theoretical model.

---

## 8.4 C4 — Completeness and Boundary Clarity

### Literature judgment

> **Mostly supported, with clarification needs**

Assignment 2 independently identified sub-themes corresponding closely to the major framework functions.

No obvious major literature-derived capability required by RQ1–RQ3 is absent.

The literature particularly supports keeping:

- conceptual explanation; and
- structured learning support

as distinguishable concepts.

However, the literature also indicates that multilingual/adaptive behaviour depends on context and task, supporting the GenAI concern that some decision criteria require clearer conceptual boundaries.

---

## 8.5 C5 — Scenario Applicability

### Literature judgment

> **Indirect support only**

The Assignment 2 literature demonstrates that similar functions have been used in:

- programming education;
- mathematics learning;
- bilingual language-learning platforms;
- educational dictionaries;
- video-learning systems.

This makes the framework's Photosynthesis scenario plausible.

However, the SLR does not directly test:

- this scenario;
- Burmese learners;
- this exact seven-stage interaction.

### Conclusion

Scenario applicability should be determined primarily through the separate descriptive scenario evaluation, not through the SLR.

---

# 9. Higher-Level Literature Findings

## LTheme 1 — The Core Framework Functions Are Strongly Literature-Grounded

The Assignment 2 evidence strongly supports the inclusion of:

- terminology identification;
- technical context;
- selective multilingual terminology handling;
- conceptual explanation;
- structured learning support;
- adaptive/personalized assistance.

This supports the central architecture of the conceptual artefact.

---

## LTheme 2 — Integration Is Better Supported Than Any Single Isolated Capability

The Assignment 2 research gap was defined by fragmentation.

Translation-oriented studies emphasized:

- language;
- terminology;
- prompting.

Educational systems emphasized:

- conceptual explanation;
- interaction;
- personalization;
- structured support.

The framework integrates these responsibilities.

Therefore, the literature supports the **need for integration**, even though no individual reviewed paper validates the exact seven-stage design.

---

## LTheme 3 — Context-Sensitive Language Choice Is Supported, but Exact Selection Rules Are Not

The literature clearly rejects the assumption that every technical term should automatically be translated.

It supports:

- selective preservation;
- contextual explanation;
- bilingual support;
- task/language sensitivity.

However, it does not provide a deterministic learner-specific rule.

This partially supports the GenAI concern about Stage 3's decision criteria.

---

## LTheme 4 — Conceptual Explanation and Structured Scaffolding Are Related but Distinguishable

Assignment 2 coded these as separate sub-themes.

This supports retaining both Stage 4 and Stage 5.

The GenAI concern is best interpreted as a **definition/boundary problem**, not evidence that one stage should be removed.

---

## LTheme 5 — Adaptation Is Supported More Strongly Than the Current Adaptation Decision Logic

The literature supports:

- personalized support;
- adaptive assistance;
- response refinement;
- interactive learning.

It does not specify the current framework's exact learner-response-to-adaptive-action mapping.

Therefore, the framework is literature-grounded at the **principle level**, while its decision logic remains a design choice requiring further justification/evaluation.

---

## LTheme 6 — Generated-Content Reliability Is a Literature-Supported Limitation

The Assignment 2 evidence directly warns against assuming consistent LLM performance across:

- languages;
- tasks;
- domains;
- specialized contexts.

Prompting also requires empirical evaluation.

Therefore, the GenAI concern that structured LLM output does not guarantee correctness is strongly supported by the literature.

---

# 10. SLR Evaluation of GenAI Themes

| GenAI Theme | Assignment 2 Literature Result |
|---|---|
| T1 — Strong PIRQOA and requirement traceability | **Supported** — SLR/SSR themes map closely to RQ1–RQ3 capabilities |
| T2 — Generally coherent and theory-aligned seven-stage structure | **Partially supported** — main responsibilities are literature-grounded, but exact seven-stage sequencing is not evaluated |
| T3 — Decision logic and stage boundaries need refinement | **Partially supported** — language/adaptation criteria are not fully specified by literature; Stage 4/5 remain conceptually distinguishable |
| T4 — Self-reported understanding limits adaptation claims | **Not directly evaluated by Assignment 2** — retain as a methodological/GenAI limitation, not an SLR finding |
| T5 — Context and generated-content reliability remain conceptual risks | **Strongly supported**, especially by low-resource and multilingual LLM limitations |

---

# 11. Overall Literature Evaluation

The Assignment 2 literature provides **strong support for the core conceptual architecture** of the Context-Aware Adaptive STEM Scaffolding Framework.

In particular, the literature strongly supports:

- specialized terminology identification;
- context-sensitive technical interpretation;
- selective multilingual terminology support;
- conceptual explanation beyond direct translation;
- structured learner support;
- adaptive/personalized educational assistance.

The literature also supports the broader integration rationale: Assignment 2 found that these capabilities were fragmented across existing research and systems rather than combined consistently.

The SLR does **not**, however, validate every detail of the current framework.

It does not directly establish:

- the exact seven-stage sequence;
- a deterministic language-selection rule;
- a specific learner-response-to-adaptation mapping;
- the exact feedback-loop re-entry path;
- the validity of learner self-report as evidence of understanding;
- educational effectiveness for Burmese-speaking learners.

The GenAI interview therefore identified several concerns that the literature treats differently:

1. **Stage 4 / Stage 5 overlap**  
   The literature actually supports treating conceptual explanation and structured learning support as separate concepts. The issue is therefore better understood as a need for clearer definitions rather than a need to merge the stages.

2. **Language-selection criteria**  
   The literature supports the GenAI concern that context, terminology, language, and task characteristics should constrain selection, but does not prescribe a complete decision rule.

3. **Adaptation logic**  
   The literature strongly supports adaptive assistance but provides limited evidence for the exact decision logic used in the framework.

4. **Self-report limitation**  
   Assignment 2 does not directly evaluate this issue, so it should remain a GenAI/methodological limitation rather than be represented as an SLR conclusion.

5. **Generated-content reliability**  
   The literature strongly supports this concern. Structured LLM generation should not be treated as proof of technical correctness or educational effectiveness.

### Literature-based overall judgment

> **The framework's core responsibilities are strongly supported by the Assignment 2 literature, while several decision rules and conceptual boundaries remain underdetermined by the SLR. The literature supports clarification and further evaluation, but it does not provide evidence that the seven-stage framework requires major structural redesign.**

This judgment is limited to the SLR / academic-literature evaluation method and is **not yet the final conceptual artefact conclusion**.

---

# 12. Inputs for Later Triangulation

Use the following entries in the final triangulation matrix.

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

---

# 13. Limitations of This Literature Evaluation

This evaluation has several boundaries.

1. It uses the Assignment 2 SLR/SSR corpus rather than conducting a new systematic search.
2. Much of the evidence comes from languages and educational domains other than Burmese STEM learning.
3. Literature that supports a capability does not automatically validate the current framework's exact implementation.
4. No reviewed study in Assignment 2 directly evaluates this seven-stage framework.
5. The literature does not validate self-reported understanding as a measure of learning.
6. The literature does not determine the pedagogically optimal adaptation strategy or number of adaptation rounds.
7. Scenario applicability must be evaluated separately.
8. This literature evaluation should not be interpreted as evidence of educational effectiveness.

---

# 14. Status

## Completed

- [x] Assignment 2 evidence base identified
- [x] Seven framework stages evaluated against literature
- [x] GenAI concerns tested against literature
- [x] Literature support levels assigned
- [x] Criterion-level synthesis created
- [x] Higher-level literature themes identified
- [x] Inputs prepared for triangulation

## Still Required

- [ ] Descriptive informed-argument evaluation
- [ ] Independent descriptive scenario evaluation
- [ ] Optional human expert interview
- [ ] Full triangulation
- [ ] Final conceptual artefact conclusion
- [ ] Decision on any framework revisions

---

# 15. References Used from Assignment 2

Athukorala, K. S. N., & De Silva, D. I. (2025). Bridging language barriers in programming education: Java programming assistance tool for Sinhala native speakers. *International Journal of Computer Theory and Engineering, 17*(3), 151–169. https://doi.org/10.7763/IJCTE.2025.V17.1378

Bal, S., & Mandal, L. (2026). A prompt-based interactive dialogue framework for low-resource Indian languages. *Procedia Computer Science, 282*, 220–229. https://doi.org/10.1016/j.procs.2026.05.070

Candé, A., & Martinho, D. (2026). Artificial intelligence in translation and interpreting in education: A systematic review of trends, applications and challenges. *Information, 17*(6), 543. https://doi.org/10.3390/info17060543

He, J., Wang, F., Li, S., Lei, Y., Zhu, J., & Lv, L. (2025). A comparative study on the translation capabilities of multimodal large language models with independent intellectual property rights—Taking cross-cultural online education scenarios as an example. *Proceedings of the 2025 2nd International Conference on Big Data and Digital Management*, 834–839. https://doi.org/10.1145/3768801.3768938

Khoboko, P. W., Marivate, V., & Sefara, J. (2025). Optimizing translation for low-resource languages: Efficient fine-tuning with custom prompt engineering in large language models. *Machine Learning with Applications, 20*, 100649. https://doi.org/10.1016/j.mlwa.2025.100649

Kleidermacher, H. C., & Zou, J. (2026). Science across languages: Assessing LLM multilingual translation of scientific papers. In V. Demberg, K. Inui, & L. Marquez (Eds.), *Findings of the Association for Computational Linguistics: EACL 2026* (pp. 3932–3947). Association for Computational Linguistics. https://doi.org/10.18653/v1/2026.findings-eacl.204

Kuzu, T. E. (2026). AI-supported translanguaging processes in primary school: Empirical insights into ChatGPT's role in multilingual interactions. *Technology, Knowledge and Learning*. https://doi.org/10.1007/s10758-026-09974-7

Nair, P. C., Reddy, A. C., & Hemasri, M. (2026). Vidyālaya: AI-powered Telugu language learning platform. *Procedia Computer Science, 283*, 1386–1395. https://doi.org/10.1016/j.procs.2026.06.216

Rakhimova, D., Karibayeva, A., Karyukin, V., Turarbek, A., Duisenbekkyzy, Z., & Aliyev, R. (2024). Development of a children's educational dictionary for a low-resource language using AI tools. *Computers, 13*(10), 253. https://doi.org/10.3390/computers13100253

Sakunkoo, J., Sakunkoo, A., & Sakunkoo, P. (2025). SingLing: Learning languages by singing code-switched lyrics. *Adjunct Proceedings of the 38th Annual ACM Symposium on User Interface Software and Technology*, 1–3. https://doi.org/10.1145/3746058.3758393

Tran, H. T. H., Martinc, M., Caporusso, J., Delaunay, J., Doucet, A., & Pollak, S. (2026). Recent advances in automatic term extraction: A comprehensive survey. *ACM Computing Surveys, 58*(9), 226:1–226:35. https://doi.org/10.1145/3787584

Vatsal, S., Dubey, H., & Singh, A. (2026). Multilingual prompt engineering in large language models: A survey across NLP tasks. *IEEE Access, 14*, 99057–99093. https://doi.org/10.1109/ACCESS.2026.3702852

Zhang, C., & Pang, G. (2025). An interactive video learning framework enhanced by large language models. *Proceedings of the 2025 International Conference on Educational Technology and Artificial Intelligence*, 458–463. https://doi.org/10.1145/3766557.3766635
