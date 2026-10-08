# Step 8 — Framework Refinement Decisions

> **Human-verification update, 8 October 2026.** The author has confirmed personally checking every scientific and English–Burmese assessment against the original outputs and relevant references. AI assistance with preparation, execution and drafting remains acknowledged. Final interpretations and decisions are accepted by the author. This is not an independent second assessment or a claim of manual execution throughout. See the [confirmation and scope](../00_protocol/human_verification_confirmation.md). Earlier capture-time statements retain their historical meaning.

## 1. Purpose

This document records the **framework refinement decisions** made after completing the four required conceptual artefact evaluation methods for INFOSYS 720 Assignment 5:

1. GenAI Interview
2. SLR / Academic Literature
3. Informed Argument
4. Scenario Evaluation

The purpose is to determine which proposed changes to the **Context-Aware Adaptive STEM Scaffolding Framework** should be:

- accepted;
- accepted with qualification;
- rejected;
- deferred for later system evaluation.

The refinement decisions are based on the completed triangulation rather than on any single evaluation method.

The core principle is:

> **Refine the framework where multiple evaluation methods identify the same conceptual weakness, but avoid unnecessary redesign or scope expansion when the evidence does not justify it.**

---

# 2. Current Framework

The current seven-stage framework is:

```text
Learner STEM Inquiry
→ 1. Identify STEM Terminology
→ 2. Interpret Technical Context
→ 3. Select Language Support
→ 4. Explain STEM Concept
→ 5. Provide Scaffolding
→ 6. Collect Learner Response
→ 7. Adapt Support
→ Updated Scaffolding
```

The framework addresses:

- **RQ1:** terminology and language support;
- **RQ2:** conceptual explanation beyond translation;
- **RQ3:** structured and adaptive scaffolding.

The triangulation found that the seven-stage structure is strongly supported overall and should be retained.

---

# 3. Refinement Decision Principles

Each proposed change is evaluated against the following questions.

## R1 — Evidence Convergence

Is the proposed refinement supported by more than one evaluation method?

## R2 — PIRQOA Relevance

Does the refinement improve traceability to RQ1–RQ3 or the underlying requirements?

## R3 — Conceptual Necessity

Does the refinement clarify an actual conceptual weakness rather than merely add complexity?

## R4 — Scope Discipline

Does the refinement remain within the intended research scope?

## R5 — Claim Discipline

Does the refinement reduce the risk of overclaiming what the framework demonstrates?

## R6 — Structural Proportionality

Can the issue be resolved by clarifying an existing stage rather than adding a new stage or redesigning the framework?

---

# 4. Refinement Decision Matrix

| ID | Proposed Refinement | GenAI | Literature | Informed Argument | Scenario | Decision |
|---|---|---|---|---|---|---|
| R01 | Clarify Stage 4 vs Stage 5 responsibilities | Supports | Supports distinction | Supports clarification | Supports clarification | **Accept** |
| R02 | Merge Stage 4 and Stage 5 | Concern implied but not required | Not supported | Not supported | Not supported | **Reject** |
| R03 | Clarify Stage 3 language-support selection principles | Supports | Moderately/strongly supports relevant factors | Supports | Need remains visible | **Accept** |
| R04 | Add a deterministic language-selection algorithm | Not required | No evidence for exact rule | Not required | Not observable | **Reject** |
| R05 | Explicitly define Stage 6 as learner-reported support signal | Strongly supports | Not directly evaluated | Strongly supports | Supports | **Accept** |
| R06 | Treat Stage 6 as objective understanding measurement | Rejected | Not supported | Rejected | Not supported | **Reject** |
| R07 | Make learner-response interpretation explicit within Stage 7 | Supports | Consistent | Strongly supports | Need remains unresolved | **Accept** |
| R08 | Add a new eighth “Evaluate Learner Response” stage | Not necessary | No support | Not justified | No missing stage exposed | **Reject** |
| R09 | Allow bounded Stage 7 feedback to Stage 3–5 | Supports | Limited-to-moderate support | Supports | Stage 7 → Stage 5 demonstrated | **Accept with qualification** |
| R10 | Add permanent Stage 2 → Stage 1 reverse loop | Possible but not required | Unresolved | Not necessary | No need observed | **Reject as normal path** |
| R11 | Allow ambiguity correction between Stages 1–2 | Consistent | Consistent | Supports | Not required in current scenario | **Accept as exception** |
| R12 | Clarify that Stage 5 scaffolding forms are selectable rather than always cumulative | Supports | Consistent | Supports | Scenario shows several forms | **Accept** |
| R13 | Add objective mastery/quiz functionality | Not required | Not required | Outside conceptual scope | Not required | **Reject** |
| R14 | Add full learner-proficiency profiling | Not required | Limited relevance | Scope expansion | Not evaluated | **Reject** |
| R15 | State that generated STEM content is not automatically correct/effective | Strongly supports | Strongly supports | Supports | Not independently validated | **Accept as limitation** |
| R16 | Add a separate “content verification” core stage | Not required | Not established | Not necessary for current conceptual scope | Not tested | **Reject for current framework** |
| R17 | Retain seven-stage structure | Supports | Supports core functions | Strongly supports | Strongly supports | **Accept** |
| R18 | Major structural redesign | GenAI final wording suggested important revision but retained structure | Not supported | Not supported | Not supported | **Reject** |

---

# 5. Accepted Refinement 1 — Clarify Stage 4 and Stage 5

## 5.1 Problem Identified

The GenAI interview repeatedly identified overlap between:

- Stage 4 — Explain STEM Concept
- Stage 5 — Provide Scaffolding

The Photosynthesis scenario also showed that:

- `Simple Explanation`
- `Technical Explanation`

could appear to belong to both stages.

The SLR and informed argument, however, support keeping:

- conceptual explanation;
- structured learning support

as separate responsibilities.

## 5.2 Decision

> **Accept clarification; reject merging.**

## 5.3 Refined Stage 4 Definition

### Stage 4 — Explain STEM Concept

> Establish and communicate the core STEM meaning that the learner needs to understand, moving beyond direct translation.

This stage focuses on:

- conceptual meaning;
- technically relevant explanation;
- the relationship among the important STEM ideas.

## 5.4 Refined Stage 5 Definition

### Stage 5 — Provide Scaffolding

> Structure learner support around the explained concept using appropriate scaffold forms such as examples, analogies, reflective prompts, hints, and changes in explanatory depth.

This stage focuses on:

- how assistance is structured;
- how the learner accesses the concept;
- how support can be presented in different forms.

## 5.5 Rationale

The distinction can be summarized as:

```text
Stage 4:
What STEM meaning should be communicated?

Stage 5:
How should support around that meaning be structured?
```

## 5.6 Final Decision

> **Accepted**

---

# 6. Accepted Refinement 2 — Clarify Stage 3 Language-Support Selection

## 6.1 Problem Identified

The current Stage 3 identifies possible support forms:

- Burmese explanation;
- English-term preservation;
- bilingual presentation;
- combined support.

However, the evaluation found that the conditions governing this selection were not sufficiently explicit.

## 6.2 Decision

> **Clarify the conceptual factors governing language-support selection without adding a deterministic algorithm.**

## 6.3 Refined Stage 3 Definition

### Stage 3 — Select Language Support

> Select a context-sensitive Burmese/English support strategy based on the identified STEM terminology, its technical context, the usefulness of preserving established English disciplinary terminology, and the learner’s expressed language-related need where available.

## 6.4 Conceptual Selection Factors

The stage should consider:

1. **Identified terminology**
   - Which STEM term or concept requires support?

2. **Technical context**
   - What does the term mean in this domain?

3. **Usefulness of English terminology**
   - Is the English technical term commonly used or more recognizable than a translated equivalent?

4. **Need for Burmese explanation**
   - Would Burmese explanation improve accessibility?

5. **Learner-expressed preference or difficulty**
   - Where available, has the learner indicated a language preference or difficulty?

## 6.5 What Is Not Added

The refinement does **not** introduce:

- a deterministic scoring model;
- language-proficiency testing;
- a separate translation engine requirement;
- a full learner-language profile.

## 6.6 Final Decision

> **Accepted**

---

# 7. Accepted Refinement 3 — Explicitly Define Stage 6 as Self-Reported Support Need

## 7.1 Problem Identified

The evaluation consistently found that learner-reported understanding should not be treated as:

- objective competence;
- mastery;
- actual learning achievement.

The current framework needs stronger claim discipline.

## 7.2 Decision

> **Explicitly define Stage 6 as collecting a learner-reported support signal.**

## 7.3 Refined Stage 6 Definition

### Stage 6 — Collect Learner Response

> Collect a learner-reported support signal indicating perceived understanding, uncertainty, or need for additional assistance.

## 7.4 Important Interpretation

The signal may be used to guide adaptation.

It does **not** establish:

- measured understanding;
- verified mastery;
- learning achievement;
- misconception detection.

## 7.5 Example

```text
I understand
I partially understand
I need more explanation
```

should be interpreted as:

```text
learner-reported support need
```

not:

```text
objective measurement of learning
```

## 7.6 Final Decision

> **Accepted**

---

# 8. Accepted Refinement 4 — Clarify Stage 7 Decision Responsibility

## 8.1 Problem Identified

The framework contains:

```text
Collect Learner Response
→ Adapt Support
```

but the evaluation found that the interpretation step between these concepts was not explicit enough.

## 8.2 Decision

> **Retain Stage 7 but clarify that it includes interpretation of the learner-reported signal before adaptation is selected.**

## 8.3 Refined Stage 7 Definition

### Stage 7 — Adapt Support

> Interpret the learner-reported support signal and select a bounded adaptive response that remains aligned with the active STEM concept.

## 8.4 Refined Internal Logic

```text
Stage 7 — Adapt Support

1. Interpret learner-reported support need
2. Determine what aspect of support may need to change
3. Select a bounded adaptive direction
4. Update subsequent support
```

## 8.5 Example Adaptive Directions

Possible adaptations may include:

- simplify explanation;
- clarify terminology;
- provide another example;
- provide another analogy;
- change explanatory depth;
- modify language presentation;
- provide a hint;
- reduce support;
- conclude support.

## 8.6 What Is Not Claimed

The framework does not claim:

- that one learner response maps to one uniquely correct adaptation;
- that the selected adaptation is pedagogically optimal;
- that the learner response objectively diagnoses the learner's difficulty.

## 8.7 Final Decision

> **Accepted**

---

# 9. Accepted Refinement 5 — Clarify Feedback-Loop Routing

## 9.1 Existing Relationship

The existing feedback relation is:

```text
Learner Response
→ Adapt Support
→ Updated Scaffolding
```

## 9.2 Problem Identified

The GenAI and informed-argument evaluations noted that a learner may need:

- different scaffolding;
- a different conceptual explanation;
- a different Burmese/English presentation.

Therefore, always returning only to Stage 5 may be too restrictive.

## 9.3 Decision

> **Allow bounded re-entry to the relevant support stage while keeping Stage 5 as the normal return point.**

## 9.4 Refined Feedback Interpretation

### Normal path

```text
Stage 7
→ Stage 5
```

Use when the learner needs:

- another example;
- another analogy;
- additional hint;
- more/less detail;
- another scaffold form.

### Language-related difficulty

```text
Stage 7
→ Stage 3
→ Stage 4
→ Stage 5
```

Use when the learner reports difficulty with:

- Burmese/English balance;
- technical-term presentation;
- language form.

### Conceptual difficulty

```text
Stage 7
→ Stage 4
→ Stage 5
```

Use when the learner needs:

- clearer concept explanation;
- different explanatory depth;
- rephrasing of the core STEM meaning.

## 9.5 Stages 1–2

Stages 1–2 should normally remain stable within an active concept.

They may be reconsidered only when:

- terminology was ambiguous;
- the learner clarifies a different intended concept;
- technical context was interpreted incorrectly.

## 9.6 Final Decision

> **Accepted with qualification**

---

# 10. Accepted Refinement 6 — Allow Ambiguity Correction Between Stages 1 and 2

## 10.1 Problem Identified

The GenAI raised the possibility that:

```text
Identify STEM Terminology
→ Interpret Technical Context
```

may sometimes require refinement.

## 10.2 Triangulated Result

The current sequence remains defensible.

The Photosynthesis scenario did not reveal any sequencing problem.

However, ambiguous concepts may require Stage 2 to refine Stage 1.

## 10.3 Decision

Retain the normal sequence:

```text
Stage 1
→ Stage 2
```

but conceptually allow:

```text
Stage 2
→ refine Stage 1 interpretation
```

where ambiguity materially affects the concept.

## 10.4 Important Boundary

This is an **exception mechanism**, not a permanent loop.

## 10.5 Final Decision

> **Accepted as an ambiguity-handling exception**

---

# 11. Accepted Refinement 7 — Make Stage 5 Scaffold Forms Selectable

## 11.1 Problem Identified

The current implementation presents:

- Simple Explanation;
- Real-World Example;
- Technical Explanation;
- Reflective Prompt;
- Hint.

The conceptual framework should not imply that every one of these components is always required.

## 11.2 Decision

> **Define scaffold forms as selectable support mechanisms rather than mandatory cumulative components.**

## 11.3 Refined Interpretation

Stage 5 may provide one or more of:

- simplified explanation;
- example;
- analogy;
- reflective prompt;
- hint;
- additional technical detail;
- alternative explanatory form.

Selection should depend on:

- current learner-reported support need;
- concept complexity;
- prior assistance;
- active learning context.

## 11.4 Final Decision

> **Accepted**

---

# 12. Accepted Refinement 8 — Add Explicit Generated-Content Claim Boundary

## 12.1 Problem Identified

The evaluation strongly supported the concern that:

> structured LLM output does not automatically guarantee technical correctness or pedagogical effectiveness.

## 12.2 Decision

> **Add an explicit limitation rather than a new framework stage.**

## 12.3 Refined Claim Boundary

The framework may state:

> Generated explanations and scaffolds should remain aligned with the interpreted STEM concept and technical context.

The framework should also explicitly acknowledge:

> Generation of a structured explanation does not itself establish that the explanation is factually correct, pedagogically optimal, or educationally effective.

## 12.4 Why No New Stage Is Added

Adding a dedicated:

> Validate STEM Content

stage would expand the current conceptual artefact beyond the evidence and PIRQOA requirements.

Output correctness can instead be evaluated in the design artefact evaluation.

## 12.5 Final Decision

> **Accepted as an explicit limitation, not a structural stage**

---

# 13. Rejected Refinement — Merge Stage 4 and Stage 5

## Decision

> **Rejected**

## Rationale

The SLR, informed argument, and scenario evaluation all support separate responsibilities for:

- conceptual explanation;
- structured learning support.

The correct response to the overlap concern is:

> clarify the boundary

not:

> remove one stage.

---

# 14. Rejected Refinement — Add an Eighth Stage

## Proposed Stage

Possible suggestions included:

- Evaluate Learner Response;
- Diagnose Learner Need.

## Decision

> **Rejected**

## Rationale

The decision responsibility can be handled within Stage 7.

Adding another stage would:

- increase complexity;
- duplicate existing responsibilities;
- have no strong support from the four evaluation methods.

---

# 15. Rejected Refinement — Add Objective Assessment or Quiz Engine

## Decision

> **Rejected**

## Rationale

The current research examines:

- terminology support;
- conceptual explanation;
- structured and adaptive scaffolding.

Objective testing, knowledge tracing, or formal mastery measurement would materially expand the project scope.

The correct response to the self-report limitation is:

> limit claims

not:

> add an entire assessment subsystem.

---

# 16. Rejected Refinement — Add a Deterministic Language Algorithm

## Decision

> **Rejected**

## Rationale

The literature and evaluation support conceptual language-selection factors but do not establish one deterministic decision algorithm.

The framework should remain:

- conceptual;
- theory-informed;
- implementation-independent.

---

# 17. Rejected Refinement — Permanent Stage 2 → Stage 1 Loop

## Decision

> **Rejected as the normal process**

## Rationale

The standard conceptual sequence remains coherent:

```text
Identify terminology
→ Interpret context
```

A reverse relationship is only needed where context exposes ambiguity.

Therefore, ambiguity correction is sufficient.

---

# 18. Rejected Refinement — Major Structural Redesign

## Decision

> **Rejected**

## Rationale

The triangulated evidence shows that:

- all RQs are covered;
- every stage has a defensible purpose;
- no missing core stage was identified;
- the Photosynthesis scenario instantiates all seven stages;
- the literature supports all major capabilities;
- informed argument supports the overall sequence.

The issues found concern:

- clarity;
- decision boundaries;
- claim discipline.

They do not justify replacing the architecture.

---

# 19. Deferred Issues

Some issues should be evaluated during the **design artefact evaluation** rather than solved conceptually.

## D1 — Technical Accuracy of Generated Explanations

Conceptual framework decision:

> acknowledge limitation.

Design evaluation task:

> test generated output behaviour using simulation / black-box evaluation.

---

## D2 — Correctness of Language Selection

Conceptual framework decision:

> state conceptual selection factors.

Design evaluation task:

> test bilingual terminology behaviour across multiple STEM examples.

---

## D3 — Adaptation Consistency

Conceptual framework decision:

> clarify Stage 7 decision principles.

Design evaluation task:

> test High / Medium / Needs Support paths and first/second adaptation rounds.

---

## D4 — Fading Behaviour

Conceptual framework decision:

> retain fading theoretically.

Design evaluation task:

> test whether the implemented system reduces/concludes support appropriately under specified conditions.

---

## D5 — Cross-Domain Generalization

Conceptual framework decision:

> no structural change.

Design evaluation task:

> use simulation cases across Biology, Physics, Chemistry, Computer Science, and Engineering.

---

# 20. Final Refined Framework

The refined conceptual framework is:

```text
Learner STEM Inquiry
↓
1. Identify STEM Terminology
↓
2. Interpret Technical Context
↓
3. Select Language Support
↓
4. Explain STEM Concept
↓
5. Provide Scaffolding
↓
6. Collect Learner Response
↓
7. Adapt Support
↓
Updated Support
```

with the following clarified responsibilities.

---

## Stage 1 — Identify STEM Terminology

> Identify the principal specialized STEM concept or terminology requiring support.

If terminology is ambiguous, later context interpretation may refine the initial interpretation.

---

## Stage 2 — Interpret Technical Context

> Determine the relevant STEM/domain meaning of the identified terminology and recognize ambiguity where it materially affects support.

---

## Stage 3 — Select Language Support

> Select a context-sensitive Burmese/English support strategy based on the identified terminology, technical context, usefulness of established English technical terms, and learner-expressed language need where available.

Possible support forms include:

- Burmese explanation;
- English-term preservation;
- bilingual presentation;
- contextual combination.

---

## Stage 4 — Explain STEM Concept

> Establish and communicate the core STEM meaning that the learner needs to understand, moving beyond direct translation.

---

## Stage 5 — Provide Scaffolding

> Structure learner support around the explained concept using selectable scaffold forms such as examples, analogies, reflective prompts, hints, and changes in explanatory depth.

---

## Stage 6 — Collect Learner Response

> Collect a learner-reported support signal indicating perceived understanding, uncertainty, or need for further assistance.

This signal is not objective evidence of mastery or learning.

---

## Stage 7 — Adapt Support

> Interpret the learner-reported support signal and select a bounded adaptive response aligned with the active STEM concept.

Possible adaptation includes:

- simplifying;
- clarifying;
- changing examples;
- modifying explanatory depth;
- adjusting language presentation;
- reducing support;
- concluding support.

---

# 21. Refined Feedback Structure

## Normal Feedback

```text
Stage 7
→ Stage 5
```

## Language-Related Difficulty

```text
Stage 7
→ Stage 3
→ Stage 4
→ Stage 5
```

## Conceptual Difficulty

```text
Stage 7
→ Stage 4
→ Stage 5
```

## Ambiguity / Misinterpretation

Exception only:

```text
Stage 7
→ Stage 2
→ refine Stage 1 if required
```

This keeps adaptation bounded while allowing the framework to respond to different kinds of learner-reported need.

---

# 22. Refined Theoretical Interpretation

## Task–Technology Fit

### Language-Support Fit

Operationalized through:

- Stage 1;
- Stage 2;
- Stage 3.

### Conceptual-Support Fit

Operationalized through:

- Stage 2;
- Stage 4;
- Stage 5.

### Adaptive-Interaction Fit

Operationalized through:

- Stage 5;
- Stage 6;
- Stage 7.

Important:

> These are design alignments, not empirical proof that actual Task–Technology Fit has occurred.

---

## Scaffolding Theory

### Structured Assistance

Primarily:

> Stage 5

### Contingency

Primarily:

```text
Stage 6
→ Stage 7
```

### Fading

Represented when Stage 7:

- reduces support;
- concludes additional support;
- makes assistance less directive.

Important:

> Fading occurs in response to learner-reported need and should not be interpreted as proof of mastery.

---

# 23. Final Claim Boundaries

After refinement, the framework can support the following claims.

## Supported Claims

- The framework is traceable to RQ1–RQ3.
- The framework integrates terminology, context, language, conceptual explanation, scaffolding, learner response, and adaptation.
- The framework is theory-informed.
- The framework contains an explicit adaptive feedback structure.
- The framework can support context-sensitive bilingual assistance.
- The framework can structure learner-responsive support.

## Unsupported Claims

Do not claim that:

- the framework proves learning;
- self-report measures objective understanding;
- the selected language strategy is always optimal;
- adaptation is pedagogically optimal;
- fading proves mastery;
- generated explanations are always correct;
- the framework is universally effective across all STEM domains.

---

# 24. Final Refinement Summary

## Accepted

- [x] Clarify Stage 3 language-selection principles
- [x] Clarify Stage 4 / Stage 5 boundary
- [x] Define Stage 6 as learner-reported support signal
- [x] Make learner-response interpretation explicit within Stage 7
- [x] Allow bounded feedback to Stages 3–5
- [x] Allow ambiguity correction for Stages 1–2
- [x] Treat Stage 5 scaffold forms as selectable
- [x] Add explicit generated-content claim limitation
- [x] Retain seven-stage structure

## Rejected

- [x] Merge Stage 4 and Stage 5
- [x] Add an eighth stage
- [x] Add objective mastery / quiz functionality
- [x] Add deterministic language-selection algorithm
- [x] Add permanent Stage 2 → Stage 1 loop
- [x] Major structural redesign

## Deferred to Design Evaluation

- [ ] Generated-content accuracy testing
- [ ] Cross-domain terminology behaviour
- [ ] Adaptation consistency
- [ ] Fading behaviour
- [ ] Language-support behaviour across cases
- [ ] Multi-domain simulation

---

# 25. Final Framework Decision

The evidence supports the following overall decision:

> **Retain the seven-stage Context-Aware Adaptive STEM Scaffolding Framework and apply targeted conceptual clarifications rather than structural redesign.**

The refinements improve:

- conceptual precision;
- PIRQOA traceability;
- theoretical clarity;
- adaptation boundaries;
- claim discipline.

The framework remains focused on:

- terminology support;
- contextual language support;
- conceptual explanation;
- structured scaffolding;
- learner-responsive adaptation.

It does not expand into:

- a full Learning Management System;
- teacher dashboards;
- formal assessment engines;
- social learning;
- unrestricted general-purpose chat.

---

# 26. Frozen Refined Framework for Assignment 5

For subsequent Assignment 5 writing, use the following refined interpretation as the **final conceptual framework version**:

```text
Learner STEM Inquiry

1. Identify STEM Terminology
   Identify the principal specialized STEM concept or terminology requiring support.

2. Interpret Technical Context
   Determine the relevant STEM/domain meaning and recognize ambiguity where necessary.

3. Select Language Support
   Select a context-sensitive Burmese/English support strategy using terminology, context,
   useful English disciplinary terms, and learner-expressed language need where available.

4. Explain STEM Concept
   Establish and communicate the core STEM meaning beyond direct translation.

5. Provide Scaffolding
   Structure support using selectable examples, analogies, reflective prompts, hints,
   and appropriate explanatory depth.

6. Collect Learner Response
   Collect a learner-reported support signal indicating perceived understanding or need
   for additional assistance.

7. Adapt Support
   Interpret the learner-reported signal and select a bounded adaptive response.
   Normally update Stage 5; reconsider Stage 3 or Stage 4 when the difficulty concerns
   language or explanation. Revisit Stages 1–2 only when ambiguity or interpretation
   requires correction.
```

Important:

> Learner-reported understanding remains a self-report signal, not objective evidence of learning.

> Generated explanations remain subject to technical and pedagogical limitations.

---

# 27. Status

## Conceptual Artefact Work

- [x] GenAI Interview
- [x] GenAI Analysis
- [x] SLR / Academic Literature Evaluation
- [x] Literature Matrix
- [x] Informed Argument
- [x] Scenario Evaluation
- [x] Triangulation
- [x] Refinement Decisions
- [x] Final Refined Framework Frozen
- [ ] Human Expert Interview — not conducted; optional

---

# 28. Next Step

The conceptual artefact evaluation is now complete.

The next major Assignment 5 activity is:

> **Design Artefact Evaluation — define FURPS Functionality and Usability criteria before running system tests.**

The design evaluation should then proceed through:

```text
FURPS
→ Functionality
→ Usability

Analytical
→ Static
→ Dynamic
→ Optimisation / Bounds

Experimental
→ Simulation

Testing
→ Black Box
→ White Box

Descriptive
→ Informed Argument
→ Scenario

SLR
→ Academic Literature

Then:
→ Design Evaluation Synthesis
→ PIRQOA Mapping
```

Do not write positive design-evaluation results until the relevant system evidence has actually been collected.
