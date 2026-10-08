# Supplementary bilingual error assessment

Detailed sections: [Sampling and annotation procedure](#sampling-and-annotation-procedure) · [Complete selected-output coverage and annotations](#complete-selected-output-coverage-and-annotations) · [Methodological and scientific references](#methodological-and-scientific-references).

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

## Sampling and annotation procedure


Assessment ID `BIL-20261005-01`. Prepared 5 October 2026, Pacific/Auckland.

## Scope and method

Saved outputs from `RUN-B01-20261001-SIMULATION-02` are examined. No new
generation, database operation, application change or technical test is planned.
The original 55 simulation attempts and 91 delivered-output content ratings
remain unchanged. This is a supplementary retrospective assessment, not part
of the original pre-execution protocol.

The evaluation method is Experimental / Simulation in the application of
[Hevner et al. (2004, p. 86, Table 2)](https://doi.org/10.2307/25148625).
Bilingual error annotation is the assessment technique applied to those saved
simulation outputs, not a separate named Hevner category or a controlled
learner experiment.

Explicit error analysis is informed by
[Freitag et al. (2021)](https://doi.org/10.1162/tacl_a_00437) and the
[MQM Core Typology](https://www.themqm.org/mqm-pillars/the-mqm-core-typology/).
The local categories and severity rules below are adapted for bilingual STEM
support. No complete MQM implementation, professional translator study or
standard MQM score is claimed.

## Selection fixed before detailed annotation

The purposeful sample contains 32 saved outputs.

- Initial output from every delivered main B-path case, SIM01–SIM13 and SIM16.
  SIM14 and SIM15 have no delivered explanation and cannot be scored here.
- Initial and language-help outputs from SIM-LANG-01, SIM-LANG-02 and
  SIM-LANG-03. All three delivered language-help cases are included.
- Conceptual adaptations from SIM01-C, SIM04-C, SIM08-C, SIM13-C and SIM16-C.
- Simpler adaptations from SIM04-C, SIM08-C and SIM12-C.
- Default example adaptations from SIM04-B, SIM08-B and SIM13-B.
- SIM01-A initial, to inspect the previously recorded foreign-script wording.

Selection covers all delivered main concepts and every language-help case.
Adaptations are selected for scientific terminology, ambiguity, language and
previously reported risk. Prior results were known. This is not random or
blind selection. Frequencies describe only this sample and cannot estimate
population or whole-corpus error prevalence. The other 59 delivered outputs
are outside this supplementary assessment, not new Pass outcomes.

## Annotation unit and procedure

Each matching English/Burmese text field is a paired passage. Initial fields
are simple explanation, real-world example, technical explanation, reflective
prompt and hint. Adaptation fields are support content and revised core
explanation where present. Missing partners must be recorded, not silently
excluded. Titles, state metadata and failed provider outputs are not paired
learner content. All selected passages are read in their output context.

English is a comparison text, not an authoritative reference. Scientific
meaning is checked against the preserved `SIM-REFERENCES-01` expectations.
Additional reference consultations are recorded separately. No independently
validated Burmese reference translation or approved glossary is available.

Each identified issue receives a stable ID, exact case/output/field location,
short source and target spans, a rationale and a proposed correction. Proposed
wording is editorial guidance only. It is not substituted into saved outputs
or treated as a standardised Burmese translation. Intentional English STEM
terms, valid paraphrases and harmless simplification are not automatically
errors. Uncertain wording is explicitly qualified rather than forced into a
confirmed defect.

| Category | Annotation rule |
| --- | --- |
| Meaning / accuracy | The Burmese changes a substantive proposition, relationship, polarity or quantity |
| Terminology | A technical term is given the wrong meaning or is inconsistently rendered |
| Omission / addition | Required meaning is lost or unsupported meaning is introduced between paired passages |
| Fluency / script | Grammar, spelling or an unexplained third-language fragment impedes reading |
| Accessibility / retention | Unexplained English or awkward wording limits beginner accessibility despite broadly preserved meaning |
| Shared content limitation | The same concern exists in both languages. It is not counted as a translation error |

| Severity | Local rule |
| --- | --- |
| Major | A definition or substantive scientific meaning is wrong, reversed or seriously obscured |
| Minor | Meaning remains recoverable but wording, script or unexplained retention limits clarity |
| Advisory | A shared source-content limitation or uncertain wording deserves attention but is not a confirmed bilingual error |

One issue may cover repeated occurrences within one output. Findings are not
summed into a weighted quality score. Distinguish finding counts, affected
passages and affected outputs. A passage with no identified issue means only
that no issue was identified under these rules. It does not certify correctness.

## Assessment provenance and limits

Codex assisted with preliminary annotation and source checks from saved
English/Burmese text. The author subsequently confirmed personally checking
every scientific and English–Burmese assessment against the original outputs
and relevant references, including this supplementary analysis. Final
interpretations and acceptance were not left to AI alone. See the
[human-verification confirmation](../../../00_protocol/evaluation_protocol.md).
This is author verification, not an independent second assessor or a new
signature. No professional translation certification or specialist competence
in every STEM domain is claimed. Proposed wording is not a certified glossary.

Saved simulation outputs, earlier content ratings and new annotations share
the same underlying texts. Agreement between them is deeper inspection of
shared evidence, not independent replication. Literature supports the method
and scientific expectations, not certification of every Burmese phrase.
Learning gains, calibrated scaffolding, an optimal dose and general translation
quality remain outside this assessment. No BLEU, chrF or COMET score is planned.


## Complete selected-output coverage and annotations

## Output and passage coverage

**Table BIL1. Coverage register**

| Output | Case / output | Paired passages | Original rating | Supplementary status | Assessment note |
| --- | --- | --- | --- | --- | --- |
| BIL-O01 | SIM01-B/initial | 5 | Pass | No specific issue identified | Light energy, material inputs and sugar production correspond across all five fields. Selective English STEM retention is not automatically annotated as an error. |
| BIL-O02 | SIM02-B/initial | 5 | Partial | Minor findings only | The basic genetic-information explanation and example correspond. The technical vocabulary chain is an accessibility limitation, not a changed DNA definition. |
| BIL-O03 | SIM03-B/initial | 5 | Partial | Minor findings only | Membrane and water-movement direction are preserved. Cell-standing phrasing and unexplained water-potential vocabulary limit clarity. |
| BIL-O04 | SIM04-B/initial | 5 | Fail | Major findings | Two definition passages misuse mass. Other fields preserve the falling/orbit setting. This remains one original failed content output. |
| BIL-O05 | SIM05-B/initial | 5 | Pass | No specific issue identified | Charge amount per second and the ampere relation are preserved. No specific bilingual defect was identified in the five fields under the focused rules. |
| BIL-O06 | SIM06-B/initial | 5 | Partial | Minor findings only | The p = mv vector definition corresponds. A colloquial weight expression weakens mass terminology consistency. |
| BIL-O07 | SIM07-B/initial | 5 | Partial | Major findings | Acid/base ordering is preserved. Neutrality wording conflicts with the target hint. Temperature and activity/concentration limits occur in both languages. |
| BIL-O08 | SIM08-B/initial | 5 | Fail | Major findings | Electron gain/loss and proton-count statements correspond. The target technical net-charge negation is materially inconsistent. |
| BIL-O09 | SIM09-B/initial | 5 | Partial | Minor findings only | Overall nonconsumption and reaction acceleration are preserved. Comparative-harm and regeneration wording need local revision. |
| BIL-O10 | SIM10-B/initial | 5 | Pass | Minor findings only | Programming context, code identifiers and reuse are preserved. The reflection quantifier changes from several to most. |
| BIL-O11 | SIM11-B/initial | 5 | Partial | Minor findings only | The stepwise procedure and tea example correspond. The executable-by-person-or-computer condition becomes both. Deterministic-result wording is a shared limitation. |
| BIL-O12 | SIM12-B/initial | 5 | Partial | Minor findings only | Fibre/resin/composite distinction is present. A weight qualifier is lost, a Hangul word intrudes and engineering-property terms need explanation. |
| BIL-O13 | SIM13-B/initial | 5 | Partial | Minor findings only | Biological-cell meaning corresponds. A redundant living expression limits fluency. Whether biology was the learner's intended sense is outside bilingual comparison. |
| BIL-O14 | SIM16-B/initial | 5 | Partial | Minor findings only | OOP and accessible-member qualifications are preserved. A Hangul suffix intrudes. The ambiguous inquiry's intended sense is not proven by bilingual agreement. |
| BIL-O15 | SIM-LANG-01/initial | 5 | Partial | Minor findings only | The technical ampere relation is preserved. The simple target shifts quantity per second toward movement speed. The hint is imprecise in both languages. |
| BIL-O16 | SIM-LANG-01/language | 1 | Partial | Minor findings only | Charge per second appears explicitly. Retained terms still receive little Burmese pairing despite the language-help route. |
| BIL-O17 | SIM-LANG-02/initial | 5 | Partial | Minor findings only | Later coulomb-per-second wording is correct. Charging-activity and movement-speed terminology obscure the earlier definitions. |
| BIL-O18 | SIM-LANG-02/language | 1 | Partial | Minor findings only | The second sentence correctly gives charge per second, but the first uses speed terminology. The route does not remove the conflicting phrasing. |
| BIL-O19 | SIM-LANG-03/initial | 5 | Partial | Minor findings only | The rate/unit relation corresponds. Charging-activity terminology and an Arabic-script lighting-up word limit the initial support. |
| BIL-O20 | SIM-LANG-03/language | 1 | Partial | Minor findings only | Both languages distinguish current from charge itself but remain speed-like and retain terms without Burmese pairing. Scientific imprecision is shared. |
| BIL-O21 | SIM01-C/conceptual | 1 | Partial | Minor findings only | Energy conversion, raw materials and factory analogy correspond. Dense English explanatory wording and the absorbing-light verb limit clarity. |
| BIL-O22 | SIM04-C/conceptual | 1 | Partial | Shared-content advisories only | Mutual attraction and mass/distance dependence correspond. The mutual-force versus acceleration distinction remains an advisory clarification in both languages. |
| BIL-O23 | SIM08-C/conceptual | 1 | Partial | No specific issue identified | Net charge, unchanged nucleus and electron gain/loss polarity correspond. No specific bilingual error was identified. The analogy is not validated learner support. |
| BIL-O24 | SIM13-C/conceptual | 1 | Partial | Shared-content advisories only | The core unit and module analogy correspond. Autonomous function/reproduction is overgeneralised in both languages, not lost only in Burmese. |
| BIL-O25 | SIM16-C/conceptual | 1 | Partial | Shared-content advisories only | Subclass/superclass and extension/overriding correspond. Accessible-member scope is omitted in both versions of this adaptation. |
| BIL-O26 | SIM04-C/simpler | 1 | Partial | No specific issue identified | Mass-based attraction and the near-Earth falling example correspond. Retaining mass alone is not automatically counted as an error. |
| BIL-O27 | SIM08-C/simpler | 1 | Partial | No specific issue identified | Neutrality and electron/proton imbalance correspond. Technical term retention is compatible with this concise scaffold and is not automatically an error. |
| BIL-O28 | SIM12-C/simpler | 1 | Partial | Shared-content advisories only | Lightweight reinforcement meaning corresponds. Individual-fibre versus composite stiffness is a shared scope caution. |
| BIL-O29 | SIM04-B/medium_skip | 1 | Partial | Minor findings only | The ball example and motion change correspond. Near-Earth spatial wording is awkward. |
| BIL-O30 | SIM08-B/medium_skip | 1 | Pass | No specific issue identified | Chloride formation, Cl⁻ and the excess-electron explanation correspond. No specific bilingual error was identified under the focused rules. |
| BIL-O31 | SIM13-B/medium_skip | 1 | Partial | Shared-content advisories only | Leaf-cell function corresponds. Light-energy/input-material roles are oversimplified in both versions. |
| BIL-O32 | SIM01-A/initial | 5 | Partial | Minor findings only | The main photosynthesis mechanism corresponds. A pigment description is omitted, a Hangul fragment intrudes and technical terms need more explanation. |

## Annotated findings

**Table BIL2. Findings**

| Finding | Case / output / field | Category | Severity | English span | Burmese span | Rationale and proposed revision |
| --- | --- | --- | --- | --- | --- | --- |
| BIL-F01 | SIM02-B/initial/explanations.technical | Accessibility / retention | Minor | double-stranded polymer | double-stranded polymer | A chain of structural and genetic-process terms is retained without Burmese explanations. The basic DNA meaning survives, but the technical passage provides limited beginner language support. Proposed revision — Keep DNA and the English terms, then explain two strands, nucleotide building units and the information sequence in Burmese. |
| BIL-F02 | SIM03-B/initial/explanations.realWorldExample | Fluency / script | Minor | stay firm and upright | ဆဲလ်တွေကို တင်းရင်းပြီး မတ်တပ်ရပ်နေအောင် | The standing-up expression is awkward when applied to cells. Firm cells support the plant, rather than literally standing upright. The English is also compressed, but the Burmese wording makes the anthropomorphic reading more explicit. Proposed revision — ရေဝင်လာခြင်းကြောင့် ဆဲလ်များ တင်းရင်းနေပြီး အပင် မညှိုးစေရန် ကူညီပေးသည်။ |
| BIL-F03 | SIM03-B/initial/explanations.technical | Accessibility / retention | Minor | water potential gradient | water potential ပိုမြင့်တဲ့ဘက်ကနေ ပိုနိမ့်တဲ့ဘက်ကို | Direction is preserved, but water potential, passive diffusion and equilibrium are not explained in Burmese. The retained vocabulary makes the technical support dependent on knowing those terms already. Proposed revision — Retain water potential, then explain that the difference drives net water movement across the membrane. Explain equilibrium as no net movement, not cessation of all molecular motion. |
| BIL-F04 | SIM04-B/initial/explanations.simple | Terminology | Major | objects with mass | အလေးချိန်ရှိတဲ့ အရာဝတ္ထုတွေ | Mass is rendered as weight in the definition of gravitational attraction. The concepts are distinct. This is the already recorded gravity failure examined at a more precise location. Proposed revision — ဒြပ်ထု (mass) ရှိသော အရာဝတ္ထုများ အချင်းချင်း ဆွဲငင်သော အား |
| BIL-F05 | SIM04-B/initial/explanations.technical | Terminology | Major | interaction between masses | အစုလိုက်အပြုံလိုက်ရှိတဲ့ အရာဝတ္ထုတွေ | The Burmese expression means collectively or in groups, not physical mass. It removes the defining physical quantity. This is a second affected passage in the same previously failed output, not another simulation failure. Proposed revision — ဒြပ်ထုရှိသော အရာဝတ္ထုများအကြား ဆွဲငင်မှု |
| BIL-F06 | SIM06-B/initial/explanations.simple | Terminology | Minor | the object’s mass | အလေးချိန်ပိုများတာ | The first sentence retains mass, but the comparative explanation switches to weight. The correct p = mv technical passage limits the scope of the concern. This is terminology consistency, not a claim that the entire momentum definition is reversed. Proposed revision — ဒြပ်ထုပိုများသော သို့မဟုတ် အလျင်ပိုမြင့်သော အရာဝတ္ထု |
| BIL-F07 | SIM07-B/initial/explanations.simple | Meaning / accuracy | Major | pH 7 is neutral | pH 7 ဆိုရင် မကြားနေတဲ့ အခြေအနေပါ။ | The negative form does not state chemical neutrality and can be read as denying the intended neutral condition. The target hint correctly retains neutral, so the output is internally inconsistent. The earlier review already flagged this as unclear and rated the output Partial. Major is the local supplementary passage-level severity, not an alteration of that rating. Proposed revision — ၂၅ °C တွင် pH 7 သည် အက်စစ်ဓာတ်နှင့် ဘေ့စ်ဓာတ် ကြားနေသော အခြေအနေဖြစ်သည်။ |
| BIL-F08 | SIM07-B/initial/explanations.simple | Shared content limitation | Advisory | pH 7 is neutral | pH 7 ဆိုရင် | Both languages omit the temperature condition for the neutral pH value. This is a shared scope limitation, not a target-language omission from an otherwise qualified English sentence. Proposed revision — State the 25 °C condition and avoid presenting pH 7 as universal at every temperature. |
| BIL-F09 | SIM07-B/initial/explanations.technical | Shared content limitation | Advisory | hydrogen ion activity | hydrogen ion activity | Both versions name activity but display concentration notation without the dilute-solution approximation. The bilingual correspondence does not establish scientific precision. Proposed revision — Distinguish the activity definition from the introductory concentration approximation. |
| BIL-F10 | SIM08-B/initial/explanations.technical | Meaning / accuracy | Major | acquires a nonzero net charge | net charge မရှိတော့ဘဲ | The Burmese denies net charge, then says a positive or negative charge forms. The English correctly specifies nonzero net charge. This is the already recorded ion polarity failure, not a new failed run. Proposed revision — အီလက်ထရွန် ဆုံးရှုံးခြင်း သို့မဟုတ် ရရှိခြင်းကြောင့် စုစုပေါင်းလျှပ်စစ်ဓာတ် (net charge) သုညမဟုတ်တော့သော အမှုန် |
| BIL-F11 | SIM09-B/initial/explanations.realWorldExample | Meaning / accuracy | Minor | less harmful gases | ပိုမဆိုးတဲ့ gases | Not worse does not clearly preserve the comparative reduction in harm. The catalytic-converter example remains recognisable, but the change in harmfulness is weakened. Proposed revision — အန္တရာယ်ပိုနည်းသော ဓာတ်ငွေ့များ |
| BIL-F12 | SIM09-B/initial/explanations.technical | Meaning / accuracy | Minor | it is regenerated during the reaction | Reaction အပြီးမှာ catalyst က ပြန်ဖန်တီးနိုင်တဲ့အတွက် | The target changes actual regeneration during the process into a possibility of being recreated after it. The final statement about not being consumed overall remains correct, so the concern is local rather than a reversed overall definition. Proposed revision — ဓာတ်ပြုမှုအတွင်း catalyst ကို ပြန်လည်ရရှိသဖြင့် စုစုပေါင်းအနေနှင့် မကုန်ဆုံးပါ။ |
| BIL-F13 | SIM10-B/initial/reflectivePrompt | Meaning / accuracy | Minor | several classes | Class အများစုမှာ | Several classes changes to most classes. The sharing question remains recoverable, but its quantifier is not preserved. Proposed revision — Class အချို့တွင် တူညီသော လုပ်ဆောင်ပုံများကို မျှဝေလိုပါက |
| BIL-F14 | SIM11-B/initial/explanations.technical | Meaning / accuracy | Minor | a computer or a person | လူနဲ့ computer နှစ်မျိုးလုံး | The disjunction becomes a requirement for both. The general procedure meaning is preserved, but the target makes the executability condition stronger. Proposed revision — လူတစ်ဦး သို့မဟုတ် ကွန်ပျူတာတစ်လုံးက လိုက်နာဆောင်ရွက်နိုင်လောက်အောင် |
| BIL-F15 | SIM11-B/initial/explanations.technical | Shared content limitation | Advisory | get the same intended result | ရည်ရွယ်ထားတဲ့ ရလဒ်ကို တစ်ပုံစံတည်း | Both versions can suggest that all algorithms always return the same result. This is an introductory simplification, not a Burmese-only error. Randomised procedures require a more qualified account. Proposed revision — Describe clearly defined rules for a task without asserting universal identical outputs across all algorithms. |
| BIL-F16 | SIM12-B/initial/explanations.simple | Meaning / accuracy | Minor | without adding much weight | အလေးချိန်မတိုးစေဘဲ | The degree qualifier much is lost, producing an absolute no-weight-increase expression. The surrounding lightweight-material context limits the concern. Proposed revision — အလေးချိန်အများကြီးမတိုးစေဘဲ |
| BIL-F17 | SIM12-B/initial/explanations.technical | Fluency / script | Minor | made of | carbon filaments တွေနဲ့ 만든 | An unexplained Hangul word occurs inside the Burmese sentence. Meaning can be recovered from context, but it is not Burmese/English technical-term retention. Proposed revision — carbon filaments များဖြင့် ပြုလုပ်ထားသော |
| BIL-F18 | SIM12-B/initial/explanations.technical | Accessibility / retention | Minor | good stiffness, and useful fatigue resistance | stiffness ကောင်းတယ်၊ fatigue resistance လည်း ကောင်းတယ်။ | Important engineering properties are retained without explanation. The target does not distinguish stiffness from strength or explain fatigue resistance for a beginner. Proposed revision — Retain stiffness and fatigue resistance with short Burmese explanations of resistance to deformation and repeated-loading damage. |
| BIL-F19 | SIM13-B/initial/explanations.technical | Fluency / script | Minor | unit of life | အသက်ရှိသက်ရှိစနစ်ရဲ့ | The doubled living expression is awkward and redundant. The basic structural/functional meaning is still recoverable. Proposed revision — သက်ရှိများ၏ အခြေခံ ဖွဲ့စည်းတည်ဆောက်မှုနှင့် လုပ်ဆောင်မှု ယူနစ် |
| BIL-F20 | SIM16-B/initial/explanations.technical | Fluency / script | Minor | is derived from | တည်ဆောက်되는 relationship | Hangul is joined to a Burmese verb. It is an unexplained third-language fragment rather than an intentionally retained programming identifier. Proposed revision — superclass ကို အခြေခံ၍ တည်ဆောက်ထားသော subclass နှင့် ဆက်နွယ်မှု |
| BIL-F21 | SIM-LANG-01/initial/explanations.simple | Meaning / accuracy | Minor | how much charge is moving each second | charge ဘယ်လောက်မြန်မြန် ရွေ့နေသလဲ | The amount per second becomes movement speed. The correct coulomb-per-second technical passage limits the finding, but the simple explanation risks confusing current with carrier velocity. Proposed revision — တစ်စက္ကန့်အတွင်း အမှတ်တစ်ခုကို ဖြတ်သန်းသော လျှပ်စစ်ဓာတ်ပမာဏ |
| BIL-F22 | SIM-LANG-01/initial/hint | Shared content limitation | Advisory | how fast charge is moving | charge ဘယ်လောက်မြန်မြန် စီးနေသလဲ | Both hints use speed-like wording instead of explicitly stating charge amount per time. This is shared imprecision, not solely a translation defect. Proposed revision — Explain current as charge quantity passing a point per unit time. |
| BIL-F23 | SIM-LANG-01/language/content | Accessibility / retention | Minor | charge moves through a circuit | charge တွေ ဘယ်လောက်မြန်မြန် ရွေ့သွားသလဲဆိုတဲ့ rate | The second sentence correctly describes charge per second, but the language-help response retains charge, circuit, point, rate and unit without useful Burmese pairings. Limited explicit terminology help is provided despite that route request. Proposed revision — Retain electric current and ampere. Pair charge with လျှပ်စစ်ဓာတ်ပမာဏ and circuit with လျှပ်စစ်ပတ်လမ်း, then describe quantity per second. |
| BIL-F24 | SIM-LANG-02/initial/explanations.simple | Terminology | Minor | electric charge | လျှပ်စစ်အားသွင်းမှုတွေ | The target names charging activity rather than the physical charge quantity. Later charge and coulomb wording clarifies the meaning, so this is a local terminology concern rather than a wholly reversed definition. Proposed revision — လျှပ်စစ်ဓာတ် (electric charge) |
| BIL-F25 | SIM-LANG-02/initial/explanations.technical | Meaning / accuracy | Minor | rate at which electric charge passes a point | electric charge ဘယ်လောက်မြန်မြန် စီးသွားသလဲဆိုတဲ့ rate | Speed-like wording obscures the charge-quantity rate. The following one-coulomb-per-second statement is correct and limits severity. Proposed revision — တစ်နေရာကို တစ်စက္ကန့်အတွင်း ဖြတ်သန်းသော လျှပ်စစ်ဓာတ်ပမာဏ၏ နှုန်း |
| BIL-F26 | SIM-LANG-02/language/content | Terminology | Minor | flow of electric charge | electric charge စီးဆင်းတဲ့ အရှိန် | The target labels current as speed. The next sentence restores charge amount per second, but the language-help route leaves two competing descriptions in the same passage. Proposed revision — လျှပ်စစ်ဓာတ်ပမာဏ၏ စီးဆင်းနှုန်း, followed by an explicit quantity-per-time explanation |
| BIL-F27 | SIM-LANG-03/initial/explanations.simple | Terminology | Minor | electric charge | လျှပ်စစ်အားသွင်းမှုတွေ | Charging activity is used for electric charge, as in SIM-LANG-02 initial. The subsequent quantity-per-second sentence preserves the central relation. Proposed revision — လျှပ်စစ်ဓာတ် (electric charge) |
| BIL-F28 | SIM-LANG-03/initial/explanations.realWorldExample | Fluency / script | Minor | bulb lights up | မီးလုံး روشن ဖြစ်လာတာပါ။ | An unexplained Arabic-script word appears where Burmese lighting-up wording is expected. The surrounding sentence makes the example recoverable. Proposed revision — မီးလုံး လင်းလာသည်။ |
| BIL-F29 | SIM-LANG-03/language/content | Shared content limitation | Advisory | how fast charge is passing a point | charge ဘယ်လောက်မြန်မြန် ဖြတ်သန်းနေသလဲ | Both languages use speed-like wording and this adaptation has no explicit charge-amount-per-second statement. Correspondence does not certify a sufficiently precise current explanation. Proposed revision — State I = ΔQ/Δt in words, distinguishing charge quantity per second from carrier speed. |
| BIL-F30 | SIM-LANG-03/language/content | Accessibility / retention | Minor | electric charge moves | electric charge ဘယ်လောက်မြန်မြန် စီးသွားနေသလဲ | The language-help response still leaves charge, circuit, point and unit unpaired with Burmese explanations. It revises the statement but provides limited explicit help with the selected terms. Proposed revision — Keep current/ampere and add Burmese explanations of charge quantity and the circuit. Use a quantity-per-second formulation. |
| BIL-F31 | SIM01-C/conceptual/content | Accessibility / retention | Minor | stored chemical energy | သိမ်းဆည်းထားနိုင်တဲ့ chemical energy | Chemical energy and several explanatory phrases, including raw materials and solar-powered factory, are retained without Burmese glosses. The main mechanism is preserved but revised beginner support still depends on English vocabulary. Proposed revision — ဓာတုစွမ်းအင် (chemical energy). Explain raw materials and the sunlight-powered factory analogy in Burmese while retaining useful STEM names. |
| BIL-F32 | SIM01-C/conceptual/content | Fluency / script | Minor | not just absorbing light | အလင်းကို တင်ယူထားတာမဟုတ်ဘဲ | The verb used for taking in light is awkward here. The surrounding conversion explanation remains recoverable. Proposed revision — အလင်းကို စုပ်ယူရုံသာမက |
| BIL-F33 | SIM04-C/conceptual/content | Shared content limitation | Advisory | Earth’s much larger mass makes its effect much more noticeable | Earth ရဲ့ mass အရမ်းကြီးလို့ အဲဒီအကျိုးသက်ရောက်မှုက ပိုရှင်းရှင်းလင်းလင်း | Both versions leave effect unspecified. This could be misread as unequal mutual force rather than different accelerations. It is an ambiguity warning, not a confirmed claim that the output explicitly asserts unequal forces. Proposed revision — State that the mutual forces have equal magnitude, while the larger Earth has far smaller acceleration. |
| BIL-F34 | SIM13-C/conceptual/content | Shared content limitation | Advisory | carry out life on its own | တစ်ကိုယ်တည်း လုပ်ဆောင်နိုင်တဲ့ | Both passages can overgeneralise autonomous function and reproduction to every specialised cell. The machine-module analogy partly contextualises dependence but does not clearly qualify the first claim. Proposed revision — Describe cells as basic functional units. Distinguish independently living single-celled organisms from specialised cells that depend on an organism. |
| BIL-F35 | SIM16-C/conceptual/content | Shared content limitation | Advisory | automatically includes the superclass’s attributes and methods | attributes နဲ့ methods တွေကို အလိုအလျောက် ရယူထားတယ် | Both versions omit the accessible-member qualification present in the selected initial explanation. The restriction depends on the programming language and access rules, so it is not a Burmese-only loss. Proposed revision — Explain reuse of accessible members and qualify language-specific access and overriding rules. |
| BIL-F36 | SIM12-C/simpler/content | Shared content limitation | Advisory | tiny threads that are very light but hard to stretch or bend | ဆွဲရခက်ပြီး ကွေးရခက်တဲ့ သေးသေးလေး အမျှင်ကြိုးတွေ | Both languages blur individual fibre behaviour and structural composite stiffness. Geometry, matrix and loading matter. This is a scope/analogy caution rather than a confirmed translation error or a claim about every fibre's bending response. Proposed revision — Distinguish reinforcing fibres from the resin composite and state the loading/geometry limits of the analogy. |
| BIL-F37 | SIM04-B/medium_skip/content | Fluency / script | Minor | near Earth | ကမ္ဘာနီးပါးမှာ | The Burmese expression is awkward for a spatial near-Earth condition and can read as almost Earth. The falling-ball example preserves the intended setting. Proposed revision — ကမ္ဘာမျက်နှာပြင်အနီးတွင် |
| BIL-F38 | SIM13-B/medium_skip/content | Shared content limitation | Advisory | turning sunlight into food | နေရောင်ခြည်ကို အစာအဖြစ် ပြောင်းလဲပေးတယ် | Both sentences compress the role of light energy and omit water/carbon-dioxide inputs. This can suggest that sunlight itself becomes matter. It is a shared explanatory limitation, not a Burmese-only addition. Proposed revision — Explain use of light energy to make carbohydrates from water and carbon dioxide. |
| BIL-F39 | SIM01-A/initial/explanations.simple | Omission / addition | Minor | a green pigment called chlorophyll | အရွက်ထဲက chlorophyll က အလင်းစွမ်းအင်ကို ဖမ်းယူပြီး | The target preserves chlorophyll's role but omits the description identifying it as a green pigment. The missing explanation reduces the usefulness of retaining the English term. Proposed revision — chlorophyll ဟုခေါ်သော အစိမ်းရောင်ရောင်ခြယ်ပစ္စည်း |
| BIL-F40 | SIM01-A/initial/reflectivePrompt | Fluency / script | Minor | to make food | အစားအစာ 만들ဖို့ | Hangul appears inside the Burmese reflective question. The intended making-food action is recoverable but the fragment is not a useful English STEM term. Proposed revision — အစားအစာ ပြုလုပ်ရန် |
| BIL-F41 | SIM01-A/initial/explanations.technical | Accessibility / retention | Minor | chemical energy | chemical energy အဖြစ် ပြောင်းလဲတဲ့ biochemical process | Chemical energy, biochemical process and metabolism are retained without Burmese explanation. The mechanism is broadly preserved, but this technical passage provides limited bilingual assistance for a beginner. Proposed revision — Pair chemical energy with ဓာတုစွမ်းအင် and briefly explain the biological chemical process and metabolism in Burmese. |

## Methodological and scientific references


BIL-20261005-01. Consulted 5 October 2026, Pacific/Auckland.

These consultations do not modify `SIM-REFERENCES-01` or the earlier review's
reference notes. No validated Burmese glossary, independent reference
translation or professional translator judgement was obtained.

## Methodological additions

- BIL-S01. Freitag, M., Foster, G., Grangier, D., Ratnakar, V., Tan, Q., &
  Macherey, W. (2021). Experts, errors, and context. A large-scale study of
  human evaluation for machine translation. *Transactions of the Association
  for Computational Linguistics, 9*, 1460–1474.
  [Publisher record and abstract](https://doi.org/10.1162/tacl_a_00437).
  Supports explicit contextual error analysis. The study's professional
  annotation and language-pair findings are not attributed to this assessment.
- BIL-S02. MQM Council. (n.d.).
  [The MQM Core Typology](https://www.themqm.org/mqm-pillars/the-mqm-core-typology/).
  Accuracy, terminology and linguistic-convention definitions informed local
  categories. Accessibility and shared-content categories are local additions.
  Local Major/Minor/Advisory decisions are not a standard weighted MQM score.
- Hevner et al. (2004),
  [Table 2, p. 86](https://damien.house/sites/default/files/Hevner-et-al-MISQ-2004.pdf#page=12),
  was revisited for Simulation and Functional Testing classification.

## Scientific and technical checks

The frozen expectations were read in full. The following original references
were revisited for comparison, not used as certified Burmese translations.

| Original identifier | Source and location | Use in this assessment |
| --- | --- | --- |
| R01 | [OpenStax Biology 2e §8.1](https://openstax.org/books/biology-2e/pages/8-1-overview-of-photosynthesis) | Light energy, material inputs, carbohydrates and chlorophyll |
| R02 | [OpenStax Biology 2e §14.2](https://openstax.org/books/biology-2e/pages/14-2-dna-structure-and-sequencing) | DNA structure and information vocabulary |
| R03 | [OpenStax Biology 2e §5.2](https://openstax.org/books/biology-2e/pages/5-2-passive-transport) | Membrane transport and plant-cell firmness |
| R04 | [OpenStax College Physics 2e §6.5](https://openstax.org/books/college-physics-2e/pages/6-5-newtons-universal-law-of-gravitation) | Mass, weight and equal mutual gravitational force |
| R05 | [OpenStax College Physics 2e §20.1](https://openstax.org/books/college-physics-2e/pages/20-1-current) | Current as charge quantity per time |
| R06 | [OpenStax College Physics 2e §8.1](https://openstax.org/books/college-physics-2e/pages/8-1-linear-momentum-and-force) | Momentum as mass times velocity |
| R07 | [OpenStax Chemistry 2e §14.2](https://openstax.org/books/chemistry-2e/pages/14-2-ph-and-poh) | Neutrality, 25 °C and introductory concentration notation |
| R08 | [OpenStax Chemistry 2e §2.6](https://openstax.org/books/chemistry-2e/pages/2-6-ionic-and-molecular-compounds) | Charge imbalance and electron gain/loss |
| R09 | [OpenStax Chemistry 2e §12.7](https://openstax.org/books/chemistry-2e/pages/12-7-catalysis) | Catalyst regeneration and reaction pathway |
| R10 | [Oracle Java Tutorial, Inheritance](https://docs.oracle.com/javase/tutorial/java/IandI/subclasses.html) | Accessible inherited members and language-specific scope |
| R11 | [NIST Dictionary, algorithm](https://xlinux.nist.gov/dads/HTML/algorithm.html) | Defined procedures. General wording does not certify all algorithm claims |
| R12 | [DOE lightweight materials page](https://www.energy.gov/cmei/vehicles/long-term-lightweight-materials-research-magnesium-and-carbon-fiber) | The retrieved page was limited. Material-scope cautions rely on preserved expectations and S01 below, not a claim of full new DOE text access |
| R13 | [OpenStax Biology 2e §4.1](https://openstax.org/books/biology-2e/pages/4-1-studying-cells) | Cells as structural/functional units and organism context |
| Earlier S01 | [ORNL carbon-fibre geometry study, abstract](https://www.ornl.gov/publication/initial-assessment-alternative-carbon-fiber-geometries-design-cost-effective) | Fibre/resin interface, alignment and geometry influence composite performance. This does not prove every individual fibre's bending behaviour |

Paired-text judgements use the saved English and Burmese spans themselves.
Proposed Burmese wording is an editorial interpretation. It must not be
reported as an approved textbook equivalent or an independently verified
reference translation.


## Preservation and review scope

Detailed records above were recovered from the pre-consolidation archive, not newly executed or re-scored. Repeated planning, sign-off and summary text is omitted. The [shared protocol](../../../00_protocol/evaluation_protocol.md) records preparation, execution and subsequent human verification. Original capture-time statements and complete documents remain in the [archive](../../../archive/pre_consolidation_markdown_20261008.zip).
