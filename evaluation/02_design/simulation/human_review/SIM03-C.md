# SIM03-C — Qualified human review

> **AI-assisted assessment reviewed and endorsed by Nathan on 2 October 2026.** Nathan confirmed reviewing and accepting all the draft files and authorised Codex to record a typed sign-off. Original drafting/source checks were performed by Codex; generated content and technical results are unchanged. Proposed Burmese replacements are not a certified terminology glossary. See [approval record](../review_completion/approval_record.md).

Run: RUN-B01-20261001-SIMULATION-02. Baseline: B01. Artificial input: **What is osmosis?**

Profile: beginner / bilingual / guided. Session: f2f3137f-cbd0-4481-a89c-80ff949101d0.

Technical outcome: Pass; path: Pass. **Assessment reviewed and endorsed by Nathan, 2 October 2026; AI-assisted drafting disclosed.**

References: [SIM03 in frozen notes](../content_reference_notes.md). Raw record: [JSONL](../raw/SIM-RUN-01-results.jsonl) (case ID SIM03-C); provider output: [provider capture](../raw/SIM-RUN-01-provider.jsonl).

## Observed steps

| Step | HTTP | Provider calls | Route | Round | Status |
| --- | --- | --- | --- | --- | --- |
| initial | 201 | 1 | — | 0 | in_progress |
| simpler | 200 | 1 | stage_5_scaffold | 1 | in_progress |
| conceptual | 200 | 1 | concept_clarification | 2 | review_recommended |
| cap | 200 | 0 | stage_5_scaffold | 2 | review_recommended |
| retrieve | 200 | 0 | — | 2 | review_recommended |

## Exact initial generated content

Concept: osmosis; domain: cell biology and membrane transport.

### simple

English:

Osmosis is the movement of water through a selectively permeable membrane from an area with less dissolved solute to an area with more dissolved solute.

Burmese:

Osmosis ဆိုတာ ရေက selective permeable membrane တစ်ခုကို ဖြတ်ပြီး solute နည်းတဲ့ဘက်ကနေ solute များတဲ့ဘက်ကို ရွေ့သွားတာပါ။ ရေဟာ concentration difference ကိုညှိပေးဖို့ ဒီလိုသွားပါတယ်။

### realWorldExample

English:

If you put a raisin in water, water moves into the raisin by osmosis, so the raisin swells up.

Burmese:

ပျဉ်သီးခြောက်ကို ရေထဲထည့်ရင် ရေက osmosis ကြောင့် အထဲဝင်သွားပါတယ်။ ဒါကြောင့် ပျဉ်သီးခြောက်က ဖောင်းလာတတ်ပါတယ်။

### technical

English:

In biology, osmosis is a passive process in which water diffuses across a selectively permeable membrane down its water potential gradient, from lower solute concentration to higher solute concentration, until equilibrium is reached.

Burmese:

ဇီဝဗေဒမှာ osmosis ဆိုတာ passive process တစ်ခုပါ။ ရေက selectively permeable membrane ကို ဖြတ်ပြီး water potential ပိုမြင့်တဲ့နေရာကနေ ပိုနိမ့်တဲ့နေရာကို diffusion လုပ်သွားတာပါ။ လက်တွေ့အားဖြင့် solute concentration နည်းတဲ့ဘက်ကနေ solute concentration များတဲ့ဘက်ကို ရေရွေ့သွားပြီး equilibrium ရောက်တဲ့အထိ ဆက်ဖြစ်ပါတယ်။

### Reflective prompt

English:

Can you think of one cell or tissue where osmosis is important for keeping water balance?

Burmese:

ရေညီမျှမှုကို ထိန်းဖို့ osmosis အရေးကြီးတဲ့ cell သို့မဟုတ် tissue တစ်ခုကို သင်စဉ်းစားနိုင်ပါသလား။

### Hint

English:

Remember that only water moves in osmosis, not the solute itself.

Burmese:

Osmosis မှာ ရေကပဲ ရွေ့ပါတယ်။ solute ကိုယ်တိုင် မရွေ့တာကို သတိရပါ။

### Qualified human judgement — initial

Assessor: Nathan. Review/endorsement date: 2 October 2026. Original drafting and source checks: Codex; Nathan confirmed review and acceptance.

Relevant STEM / English / Burmese competence: User-provided background for Nathan: postgraduate-level knowledge with a strong STEM background; native Burmese speaker with advanced English proficiency. This describes the human reviewer, not the AI drafter; qualifications are user-provided.

References consulted (use the frozen reference set, record additions separately): AI-source check: R03 — [OpenStax Biology 2e §5.2](https://openstax.org/books/biology-2e/pages/5-2-passive-transport), accessed 2 October 2026; checked against SIM03 in the unchanged frozen reference set. Source consultation was performed by Codex; Nathan reviewed and endorsed the assessment. Direct source consultation by Nathan is not asserted.

| Dimension | Score (2 / 1 / 0 / NA) | Evidence and rationale |
| --- | --- | --- |
| Technical correctness | 2 | The membrane and water-potential direction are stated correctly; the simplified concentration rule needs its ordinary-condition qualification. |
| Contextual relevance | 2 | The sections address the explicit question within its STEM domain. This is relevance within the recorded context, not evidence of learner understanding. |
| Language adequacy (English and Burmese) | 1 | ပျဉ်သီးခြောက် is an unclear rendering of raisin; စပျစ်သီးခြောက် is a clearer proposed replacement. Retained membrane/solute terms need glosses. |
| Explanation beyond translation | 2 | The swelling-raisin example illustrates the result, rather than just translating osmosis. |
| Adaptation appropriateness (adaptation only) — use NA for initial output | NA | NA — initial generation, not an adaptation. Fade and cap do not create additional content. |

Material errors / analogy limitations / terminology concerns: Language adequacy (English and Burmese): ပျဉ်သီးခြောက် is an unclear rendering of raisin; စပျစ်သီးခြောက် is a clearer proposed replacement. Retained membrane/solute terms need glosses.

Overall content conclusion (Pass / Partial / Fail / Not assessed): Partial

Limitations: these endorsed text-level judgements are not certified textbook terminology, participant-comprehension evidence or learning-benefit evidence. No independent second reviewer is recorded.

## Exact adaptation — simpler

Route: stage_5_scaffold; type: simpler_explanation; round: 1. Presentation override: none.

### Generated support

English:

Think of osmosis as water moving to balance the two sides of a membrane. Water goes from the side with less solute to the side with more solute, because that side has less water available. The membrane lets water pass, but not everything else.

Burmese:

Osmosis ကို membrane ရဲ့ နှစ်ဘက်ကို ရေက မျှတအောင် ရွေ့သွားတာလို့ ထင်နိုင်ပါတယ်။ solute နည်းတဲ့ဘက်ကနေ solute များတဲ့ဘက်ကို ရေသွားပါတယ်။ အဲဒီဘက်မှာ ရေပမာဏ နည်းလို့ပါ။ membrane က ရေကို ဖြတ်သန်းခွင့်ပေးပေမယ့် အရာအားလုံးကိုတော့ မပေးပါဘူး။

### Qualified human judgement — simpler

Assessor: Nathan. Review/endorsement date: 2 October 2026. Original drafting and source checks: Codex; Nathan confirmed review and acceptance.

Relevant STEM / English / Burmese competence: User-provided background for Nathan: postgraduate-level knowledge with a strong STEM background; native Burmese speaker with advanced English proficiency. This describes the human reviewer, not the AI drafter; qualifications are user-provided.

References consulted (use the frozen reference set, record additions separately): AI-source check: R03 — [OpenStax Biology 2e §5.2](https://openstax.org/books/biology-2e/pages/5-2-passive-transport), accessed 2 October 2026; checked against SIM03 in the unchanged frozen reference set. Source consultation was performed by Codex; Nathan reviewed and endorsed the assessment. Direct source consultation by Nathan is not asserted.

| Dimension | Score (2 / 1 / 0 / NA) | Evidence and rationale |
| --- | --- | --- |
| Technical correctness | 1 | Less water available should mean water potential/free-water concentration, not absolute water volume. |
| Contextual relevance | 2 | The adaptation remains focused on the stored active concept. This is relevance within the recorded context, not evidence of learner understanding. |
| Language adequacy (English and Burmese) | 1 | ရေပမာဏ နည်းလို့ repeats the volume ambiguity; clarify ရေ၏ water potential ပိုနိမ့်သောကြောင့်. |
| Explanation beyond translation | 2 | The retained bilingual output supplies explanatory statements rather than just a translated term. Mostly restates the original solute-direction rule rather than supplying a distinctly simpler concrete scaffold. |
| Adaptation appropriateness (adaptation only) | 1 | Mostly restates the original solute-direction rule rather than supplying a distinctly simpler concrete scaffold. |

Material errors / analogy limitations / terminology concerns: Technical correctness: Less water available should mean water potential/free-water concentration, not absolute water volume. Language adequacy (English and Burmese): ရေပမာဏ နည်းလို့ repeats the volume ambiguity; clarify ရေ၏ water potential ပိုနိမ့်သောကြောင့်. Adaptation appropriateness (adaptation only): Mostly restates the original solute-direction rule rather than supplying a distinctly simpler concrete scaffold.

Overall content conclusion (Pass / Partial / Fail / Not assessed): Partial

Limitations: these endorsed text-level judgements are not certified textbook terminology, participant-comprehension evidence or learning-benefit evidence. No independent second reviewer is recorded.

## Exact adaptation — conceptual

Route: concept_clarification; type: concept_clarification; round: 2. Presentation override: none.

### Generated support

English:

Osmosis is the net movement of water across a selectively permeable membrane because the two sides do not have the same water concentration. Water moves from the side with more free water and less solute to the side with less free water and more solute until the concentrations become more balanced.

A helpful way to picture it is to imagine water as moving toward the side that is “more crowded” with dissolved particles, while the membrane still blocks most solute particles.

Burmese:

Osmosis ဆိုတာ selectively permeable membrane ကို ဖြတ်ပြီး ရေက net movement လုပ်တာပါ။ နှစ်ဘက်မှာ water concentration တူမနေတဲ့အတွက် ရေက free water ပိုများပြီး solute နည်းတဲ့ဘက်ကနေ free water ပိုနည်းပြီး solute များတဲ့ဘက်ကို ရွေ့သွားပါတယ်။ နောက်ဆုံးမှာ concentration တွေ ပိုမိုညီလာအောင် ဖြစ်သွားပါတယ်。

မှတ်မိလွယ်အောင် ပြောရရင် ရေက dissolved particles တွေ ပိုများပြီး “crowded” ဖြစ်နေတဲ့ဘက်ကို ဦးတည်ရွေ့သွားတယ်လို့ မြင်နိုင်ပါတယ်၊ ဒါပေမယ့် membrane ကတော့ solute particles အများစုကို ဆက်ပြီး တားထားပါတယ်။

### Qualified human judgement — conceptual

Assessor: Nathan. Review/endorsement date: 2 October 2026. Original drafting and source checks: Codex; Nathan confirmed review and acceptance.

Relevant STEM / English / Burmese competence: User-provided background for Nathan: postgraduate-level knowledge with a strong STEM background; native Burmese speaker with advanced English proficiency. This describes the human reviewer, not the AI drafter; qualifications are user-provided.

References consulted (use the frozen reference set, record additions separately): AI-source check: R03 — [OpenStax Biology 2e §5.2](https://openstax.org/books/biology-2e/pages/5-2-passive-transport), accessed 2 October 2026; checked against SIM03 in the unchanged frozen reference set. Source consultation was performed by Codex; Nathan reviewed and endorsed the assessment. Direct source consultation by Nathan is not asserted.

| Dimension | Score (2 / 1 / 0 / NA) | Evidence and rationale |
| --- | --- | --- |
| Technical correctness | 1 | Net movement is an improvement, but balancing concentrations omits pressure effects at equilibrium. |
| Contextual relevance | 2 | The adaptation remains focused on the stored active concept. This is relevance within the recorded context, not evidence of learner understanding. |
| Language adequacy (English and Burmese) | 1 | free water is unglossed; crowded is a metaphor. Chinese-style punctuation 。 is a minor editing issue, not a scientific mistranslation. |
| Explanation beyond translation | 2 | The retained bilingual output supplies explanatory statements rather than just a translated term. Crowded-particle visualisation introduces a new way to picture net transfer; explain that particles do not actively attract water. |
| Adaptation appropriateness (adaptation only) | 2 | Crowded-particle visualisation introduces a new way to picture net transfer; explain that particles do not actively attract water. |

Material errors / analogy limitations / terminology concerns: Technical correctness: Net movement is an improvement, but balancing concentrations omits pressure effects at equilibrium. Language adequacy (English and Burmese): free water is unglossed; crowded is a metaphor. Chinese-style punctuation 。 is a minor editing issue, not a scientific mistranslation.

Overall content conclusion (Pass / Partial / Fail / Not assessed): Partial

Limitations: these endorsed text-level judgements are not certified textbook terminology, participant-comprehension evidence or learning-benefit evidence. No independent second reviewer is recorded.

## Session-level judgement

Did support meaningfully change and stay concept-scoped? Partially: content stays on the active concept, but at least one adaptation repeats an earlier perspective or lacks a distinct scaffold. See output-specific rationale.

For ambiguous input: was the initial interpretation explicitly qualified? NA — the original inquiry already gives an explicit or sufficiently identifiable STEM context.

Language-help usefulness / translation fidelity: See each language-adequacy row for exact defects and proposed replacements. Retaining useful English terminology is acceptable; foreign-script intrusions, wrong quantity terms and contradictory wording are not.

Overall session content conclusion: Partial. Recorded concerns: Language adequacy (English and Burmese): ပျဉ်သီးခြောက် is an unclear rendering of raisin; စပျစ်သီးခြောက် is a clearer proposed replacement. Retained membrane/solute terms need glosses. Technical correctness: Less water available should mean water potential/free-water concentration, not absolute water volume. Language adequacy (English and Burmese): ရေပမာဏ နည်းလို့ repeats the volume ambiguity; clarify ရေ၏ water potential ပိုနိမ့်သောကြောင့်. Adaptation appropriateness (adaptation only): Mostly restates the original solute-direction rule rather than supplying a distinctly simpler concrete scaffold. Technical correctness: Net movement is an improvement, but balancing concentrations omits pressure effects at equilibrium. Language adequacy (English and Burmese): free water is unglossed; crowded is a metaphor. Chinese-style punctuation 。 is a minor editing issue, not a scientific mistranslation.

Reviewer signature and review date: **Nathan — authorised typed sign-off recorded by Codex, 2 October 2026.**
