# Photosynthesis design walkthrough

## Run and scope

RUN-B01-20261003-SCENARIO-02 used the root B01 production build, live provider, isolated synthetic MongoDB and Chrome 154.0.8037.97 at 1654 × 992, English/light. Preferences were beginner, guided and bilingual. All five provider responses reported gpt-5.4-mini-2026-03-17. This is separate from the conceptual scenario. Evidence E042–E044; [metadata](raw/RUN-B01-20261003-SCENARIO-02/metadata.json).

## Workflow and results

| Action | Recorded result | Observation boundary |
| --- | --- | --- |
| Inquiry and hint | Photosynthesis/plant biology, five bilingual support fields, hint revealed | Browser and storage |
| Medium, optional choice skipped | Another example stored at round one | Browser; novelty limited |
| Needs Support, concept unclear | Revised core meaning and factory analogy stored at round two | Browser; limit/Finish displayed |
| Further response at cap | Event only, no round three or provider call | Separate API check, not a learner click |
| High at cap | Fade event, no generation; no automatic completion | Separate API check because round-two UI did not offer High |
| Sunlight / gravity follow-up | Related answer stored; unrelated question rejected without state change | Concept-scoped follow-up |
| History, Resume, Finish, Review | Stored interaction restored and explicitly completed | Browser plus separate post-completion API rejection |

Fifteen technical checks passed in one session. Two adaptations, four response events, one stored follow-up and completion were recorded. These are not fifteen independent scenarios. Before/after production identities were unchanged.

## Content assessment

The author confirmed checking the scientific and English–Burmese observations against saved outputs and relevant sources. Content remains Partial, not an independent expert or learner-comprehension result.

| Observation | Qualification |
| --- | --- |
| Light energy, water/carbon dioxide and food production distinguished | Chloroplast wording may wrongly include photosynthetic bacteria |
| Factory analogy distinguishes making food from taking food from soil | First additional example largely repeats the earlier explanation |
| Useful STEM terms retained | Root, leaf and raw materials also remain English; chemical energy needs explicit Burmese explanation |
| Sunlight follow-up addresses energy for sugar production | One answer does not establish general scope-classification accuracy |

## Reference basis

Frozen R01 was OpenStax Biology 2e §8.1. Supplemental SCN-R02 was §4.2 on prokaryotic cells, recorded after generation rather than silently added to the frozen oracle. Exact locators and original analysis remain archived. Later review does not repair stored text or change the 91-output simulation scores.

## Evidence

[HTTP/provider/browser/state records](raw/RUN-B01-20261003-SCENARIO-02/) preserve the executed flow, separately labelled API-only actions, snapshots, screenshots and first verification failures/rechecks. Aborted starts and run 01 remain separate. Timing is observation, not a performance target, and this walkthrough does not establish mobile usability, calibrated support or improved learning.

## Record detail

[Shared protocol and human verification](../../00_protocol/evaluation_protocol.md) · [Complete original documents](../../archive/pre_consolidation_markdown_20261008.zip) · [Archive guide](../../README.md#archive-and-recovery).
