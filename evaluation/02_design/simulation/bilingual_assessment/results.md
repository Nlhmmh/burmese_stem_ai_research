# Supplementary bilingual error assessment

## Method and scope

BIL-20261005-01 retrospectively examined saved simulation outputs. Thirty-two outputs were deliberately selected using earlier concerns, including every delivered main concept, all three language-help cases and selected adaptations. All 104 paired passages were read in context. English was a comparison text, not assumed scientifically correct. Selection was not random or blind. No new generation, database operation or application test occurred.

Local categories were meaning/terminology, omission/addition, fluency/script, accessibility/retention and concerns shared by both languages. Major meant substantive meaning was wrong, reversed or seriously obscured. Minor meant meaning remained recoverable but clarity was reduced. Shared-content advisories were not counted as translation errors. The approach was informed by Freitag et al. (2021) and the MQM Core Typology, without claiming a standard MQM score.

Preliminary annotation was AI-assisted; the author confirmed personally checking all scientific and bilingual judgements against saved outputs and relevant references. No independent second assessor, professional translation certification or approved Burmese glossary was available.

## Findings

| Measure | Recorded result |
| --- | --- |
| Saved outputs / paired passages | 32 / 104 |
| All annotations | 41 |
| Major / minor / shared-content advisory | 4 / 27 / 10 |
| Outputs / passages with major or minor annotations | 21 / 29 |
| Outputs with no specific issue identified | 6, not new Pass ratings |
| Outputs with shared-content advisories only | 5 |
| Missing English/Burmese partners | 0 in selected fields |

| Example and domain | Recorded issue | Severity / interpretation |
| --- | --- | --- |
| Gravity, physics, two initial passages | Mass/weight confusion and mass translated as a group | Two Major annotations in one already failed output |
| Ion, chemistry, initial definition | Negation denies nonzero net charge | Major, existing output Fail retained |
| pH, chemistry, initial explanation | Neutrality wording conflicts with the correct hint | Major passage concern; original whole-output Partial retained |
| Current, physics, language help | Speed-like wording instead of charge quantity per time | Shared-content concern, not solely a Burmese mistranslation |
| OOP inheritance, computing | A qualifier changes from several to most | Minor meaning difference |
| Catalyst, chemistry | Wording weakens the regeneration/overall nonconsumption qualification | Minor wording concern |
| Photosynthesis/current passages | Unrelated third-language word fragments interrupt Burmese | Minor script/fluency findings |
| Beginner language help | Dense unexplained English remains | Minor accessibility limits; useful STEM identifiers are not automatically errors |

All 41 exact-span annotations, proposed revisions and rationales remain in [annotations.json](annotations.json). No proposed wording was substituted into saved text.

## Interpretation

All three language-help adaptations still had terminology, retained-vocabulary or shared scientific-precision limitations. A correct route and bilingual payload did not prove successful language remediation. Better later ion support did not repair the saved initial definition. No delivered correction adaptation entered this sample because those attempts failed or were unreached.

Original whole-output totals remain 18 Pass, 71 Partial and two Fail. Four Major annotations are not four failed outputs or a new three-Fail corpus total. Deliberate selection prevents corpus-wide error-frequency or overall translation-quality claims. Reused outputs make this additional detail, not independent replication or evidence of learner comprehension.

## Evidence and references

[Input identities](input.json), [sample extractor](read_outputs.mjs), [annotation ledger](annotations.json) and [capture-time verification](verification.json) preserve selection, spans and stored-text matching. Scientific-source consultations remain in the archived references.md. The original local method and literature-transfer limits are also archived. The design argument and combined synthesis retain Partial conclusions after considering these findings.

Freitag, M., Foster, G., Grangier, D., Ratnakar, V., Tan, Q., & Macherey, W. (2021). Experts, errors, and context: A large-scale study of human evaluation for machine translation. *Transactions of the Association for Computational Linguistics, 9*, 1460–1474. [https://doi.org/10.1162/tacl_a_00437](https://doi.org/10.1162/tacl_a_00437)

MQM Council. (n.d.). *The MQM core typology*. Retrieved October 6, 2026, from [https://www.themqm.org/mqm-pillars/the-mqm-core-typology/](https://www.themqm.org/mqm-pillars/the-mqm-core-typology/)

## Record detail

[Shared protocol and human verification](../../../00_protocol/evaluation_protocol.md) · [Complete original documents](../../../archive/pre_consolidation_markdown_20261008.zip) · [Archive guide](../../../README.md#archive-and-recovery).
