# Design literature comparison

Detailed sections: [Method and decision rules](#2-method-and-decision-rules) · [Five SSR comparisons](#3-five-ssr-comparisons) · [Source identities, access and versions](#source-identities-access-and-versions).

## Method and scope

ANALYSIS-B01-20261003-DESIGN-LITERATURE-01 compared the refined application with the existing 17-study corpus and five prior-system examples. Thirteen capability comparisons considered literature support, observed implementation and transfer limits separately. Evidence E045–E048. No application test, new SLR screening or learner-effect comparison was performed.

## Comparison results

| Case | Capability | Literature relationship | Principal limit |
| --- | --- | --- | --- |
| DL01 | Native-language technical help | Moderate | Sinhala Java support is not Burmese multi-domain effectiveness |
| DL02 | Structured educational content | Moderate | Layout completeness does not validate the 91 mixed content ratings |
| DL03 | Multiple representations / scoped interaction | Moderate | No audiovisual implementation or general scope-accuracy estimate |
| DL04 | Contextual multilingual interaction | Moderate | Readable glyphs do not establish fidelity; Burmese errors remain English |
| DL05 | Personalized/adaptive help | Moderate | Most content Partial; novelty and High-to-mastery inference unvalidated |
| DL06 | Selective English-term retention | Moderate | No validated Burmese glossary or optimal retention policy |
| DL07 | Specialized terminology identification | Limited | Inquiry interpretation is not validated corpus-level extraction |
| DL08 | Context-aware explanation / repair | Moderate | Failed live corrections and historical initial content remain |
| DL09 | Structured multilingual prompting | Moderate | Timeout, provider and content-quality failures remain |
| DL10 | Controlled response / state continuity | Limited | Identity-oracle mismatch and navigation/localization issues remain |
| DL11 | Integrated workflow | Moderate | No superiority or general learner-utility comparison |
| DL12 | Critical low-resource content assessment | Strong | Supports evaluating output critically, not uniformly strong PoC content |
| DL13 | Exactly two rounds and High fade | Contradictory/uncertain | Literature does not validate the exact engineering bound or calibrated fading |

Totals are one Strong, nine Moderate, two Limited and one Contradictory/uncertain. These are comparative literature relationships, not software-test Pass/Fail ratings. [literature_matrix.csv](literature_matrix.csv) retains all source identities, locators, implementation evidence and objections. Its capture-time human-review wording is superseded by the protocol's later confirmation, not by changed scores.

## Sources and access limits

Five system examples were Sinhala Java assistance (Athukorala & De Silva), a Kazakh dictionary (Rakhimova et al.), interactive video support (Zhang & Pang), code-switched song learning (Sakunkoo et al.) and Telugu learning (Nair et al.). Original languages, learners and instructional tasks differ. Kuzu concerns teacher-mediated multilingual interaction; Kleidermacher and Zou concern scientific-paper translation. Neither validates unattended Burmese beginner support.

The archived reference_verification.md preserves consulted primary locators and failures/abstract-only access. Existing corpus summaries were not relabelled as new full-text inspections. Exact bibliographic identities for all comparisons remain in the matrix and [conceptual literature report](../../01_conceptual/literature/literature_synthesis.md#references).

## Interpretation

The integration has a literature-grounded rationale but no measured advantage over prior systems. Thirteen comparisons do not establish reliable terminology correction, ideal support dose, competence-calibrated fading or learner outcomes. Author-verified scenario content remains Partial because scope, retained-English and novelty concerns remain.

## 2. Method and decision rules

This is the separate **design** literature evaluation specified in master-plan
§27 and protocol DA-LIT, not a duplicate of the completed conceptual CA-LIT
assessment or Step 16's informed argument. The unit of comparison is an
implemented capability, not every conceptual stage. Historical conceptual
ratings and Assignment 2's heatmap remain unchanged.

The [supplied Assignment 2](../../../docs/INFOSYS_720_Assignment_2.pdf)
provides four themes/twelve sub-themes (pp. 6–7), the 17-study heatmap (p. 7)
and five-system SSR (p. 11). The six suggested capabilities are covered by
DL01/DL02/DL04/DL05/DL07/DL10, with separate rows for video interaction,
selective retention, context repair, prompting, integration, quality safeguards
and exact bounds. Each CSV row supplies a source identity and A2 locator,
evidence summary, direct/transfer relationship, primary-access limit,
counterevidence, PoC implementation, existing evidence IDs, support rating,
outcome, remaining limitation and REQ/RQ mapping.

Ratings follow protocol §6, not A2's numeric coverage heatmap:

- **Strong:** directly relevant, convergent literature support without a
  material contradiction to the narrowly stated rationale.
- **Moderate:** relevant support with indirectness or limited transfer.
- **Limited:** weak/narrow support for the implementation-level proposition.
- **Contradictory/uncertain:** conflicting evidence or unclear applicability.

A literature rating is **not** FURPS Pass/Partial/Fail, a content score, or an
effectiveness measurement. DL12's Strong rating concerns the need for critical
evaluation; it does not certify the evaluated outputs. DL13's uncertainty
concerns the exact pedagogical policy, not failure of the observed server cap.
No numeric average or feature-count superiority score is calculated.

Original papers were checked at the named locators where accessible. Seven
sources remain explicitly Assignment-mediated; Nair is limited to the
publisher-index abstract. No beyond-summary empirical claim is made for an
inaccessible original. See [E047](literature_synthesis.md) for all identities,
APA-style references, access attempts and version distinctions. No publication
was silently added to the historical corpus.

## 3. Five SSR comparisons

| A2 SSR system | Literature-supported capability and source | Observed PoC relationship | Qualification / matrix row |
| --- | --- | --- | --- |
| Sinhala Java assistant | Native-language technical assistance integrated with APIs/code/diagrams; Athukorala & De Silva (2025), original §IV.B, pp. 156–157 | Bilingual concept support and stateful explanation observed in DYN-01/02 and the fresh scenario (E004–E006, E042–E043) | Different language, domain and representation; no transferred learning effect. DL01 |
| Children's Kazakh dictionary | Structured textual/visual/audio resources; Rakhimova et al. (2024), **as summarised in A2 p. 11** | Organised explanation sections and revealable hint observed (E005, E026, E033, E037, E042) | Text PoC does not reproduce audio/images, dictionary resources or child-vocabulary learning. DL02 |
| Interactive video framework | Summaries, multilingual subtitles, mind maps and QA; Zhang & Pang (2025), **as summarised in A2 p. 11** | Structured output and scoped follow-up are analogous integration capabilities (E005, E026, E033, E042–E043) | No video/subtitle/mind-map implementation or equivalent learning study. DL03 |
| SingLing | Code-switched lyrics/contextual vocabulary interaction; Sakunkoo et al. (2025), **as summarised in A2 p. 11** | Bilingual presentation and language-help override observed (E005–E006, E026, E033, E037) | No singing/lyric substitution/music synchronisation; visual rendering does not validate vocabulary learning. DL04 |
| Vidyālaya | Bilingual personalised Telugu assistance; Nair et al. (2026), A2 p. 11 and publisher abstract | Preferences and learner-requested routing produce revised support (E019, E026, E033, E037, E042–E043) | Language acquisition/speech feedback is not independent STEM competence diagnosis; support novelty remains qualified. DL05 |

These are comparisons of **reported affordances**, not fresh executions of
the five systems. Their absent or weak features are A2's reported limitations,
not independently proven absences. Multi-domain prompts do not establish that
B01 reliably supports all STEM domains. It also lacks important affordances
present in several comparators; listing more integrated responsibilities does
not make it superior.

Primary literature links: [Sinhala assistant](https://www.ijcte.org/vol17/IJCTE-V17N3-1378.pdf),
[Kazakh dictionary](https://doi.org/10.3390/computers13100253),
[video framework](https://doi.org/10.1145/3766557.3766635),
[SingLing](https://doi.org/10.1145/3746058.3758393),
[Vidyālaya publisher record](https://www.sciencedirect.com/science/article/pii/S187705092601848X).
Access and attribution limitations are part of the comparison above, not omitted
because a DOI exists.

## 4. Terminology and language strategy

DL06 supports selective term treatment, not indiscriminate English retention.
The primary scientific-translation study reports divergent retention
preferences and terminology inconsistencies. Its researchers are not a
validated proxy for novice Burmese learners. [Kleidermacher & Zou (2026,
§§4–5 and Limitations, pp. 3937–3939)](https://aclanthology.org/2026.findings-eacl.204.pdf).

B01's language strategy and bilingual override are visible (DYN-07, BB07,
WB06 and U6), but language adequacy remains incomplete. E022–E023 retains
the SIM04-B language failure. The fresh Photosynthesis observation SCN-CQ04
also identifies retained nontechnical English and unexplained *chemical energy*;
USI-02 retains English-only errors in Burmese UI. These findings constrain
REQ-01/RQ1 despite structural presentation support.

DL07 distinguishes **terminology/context interpretation** from ATE. The A2
Tran summary warrants identifying specialised terminology; it does not turn
one LLM's interpretation of a supplied term into a benchmarked extraction
algorithm. There is no corpus-based extraction precision/recall evidence.
The inaccessible 2026 journal article is not replaced with Step 16's differently
authored 2023 preprint. [Tran et al. (2026), as summarised in A2 p. 5](https://doi.org/10.1145/3787584).

Context repair is defensible but incomplete (DL08): recorded correction can
persist/reconstruct; SIM-CM-13/16 rejected unchanged interpretations, while
eight initially ambiguous simulation attempts never created a session.
Controlled rejection protects state but does not count as a delivered corrected
explanation. The generic correction badge's meaning remains USI-03 Partial.

## 5. Explanation, adaptation and controlled interaction

Structured explanations move the design beyond lexical translation, but
structural completeness cannot guarantee scientific or pedagogical adequacy.
The earlier endorsed simulation contains **91 delivered-output ratings: 18
Pass, 71 Partial, two Fail** (E022–E023). The fresh Photosynthesis content
remains Partial after author verification: limited first-example novelty, extensive English
retention and possible chloroplast scope confusion (E042, SCN-CQ02–04).
Neither literature nor author verification upgrades those outputs to Pass.

Kuzu's primary abstract and introduction locate productive interaction within
guided, teacher-mediated activities. That condition is a transfer limitation
for this independently used PoC, not evidence that its optional support menu
provides equivalent mediation. [Kuzu (2026, abstract and §1)](https://link.springer.com/article/10.1007/s10758-026-09974-7).

DL05/DL10 therefore support a bounded response-collection/routing mechanism,
not validated diagnosis. Stage 6A is self-reported support need; Stage 6B is
optional and bounded. Follow-up stays separate and concept-scoped, without
consuming adaptation rounds. History, Resume and Review preserve the recorded
trace; no unrestricted conversation or eighth stage is added.

The exact two-round/fade claim is separated in DL13. BND-15 recorded two
concurrent provider calls but one accepted adaptation write; the state cap is
not a global provider-cost cap. The new scenario's round-2 High/fade check was
API-only because High was unavailable in that UI state. Withholding further
generation after High is implementation-level fading, not measured transfer of
responsibility or mastery. Optimal adaptation count is **Not assessed**.

## 6. Integration and scope of the contribution

A2's heatmap/SSR reports dispersed coverage of language, specialised
terminology, explanation, adaptive support and integrated systems (pp. 7–12).
DL11 compares that corpus-bounded opportunity with B01's recorded integration.
The one-call initial contract is followed by application-selected routes and
durable event/support state. The fresh scenario corroborates that these
responsibilities can operate together in one session: two adaptations, four
response events, one stored follow-up and explicit completion (E042–E043).
Earlier root tests cover wider branch/persistence cases but remain structural,
not fresh language-quality evidence (E033–E035).

Three limits prevent a stronger claim:

1. **Corpus limit:** A2 used one database, English records and an open-access
   filter; its literature boundary is not all existing research/systems. Its
   item-level screening decisions cannot be independently reconstructed from
   the PDF alone (E047). The historic gap is not reclassified as universal
   novelty.
2. **Implementation limit:** interpretation is model-mediated; terminology and
   content quality are mixed; B01 lacks several comparator modalities. A
   coherent integration can still deliver weak support or fail a route.
3. **Evaluation limit:** artificial cases, mocks, one live scenario and technical
   inspection do not establish authentic learner task fit or learning gains.
   Reused outputs and multiple reports of one run are not independent studies.

TTF and Scaffolding remain the A3/A4 conceptual foundation discussed in
[Step 16](../informed_argument/traceability.md); this comparison does not replace
them with A2's historical CTML. The optional expert study remains **Skipped**.

## Source identities, access and versions

## 1. Frozen Assignment 2 foundation

The supplied [Assignment 2 PDF](../../../docs/INFOSYS_720_Assignment_2.pdf)
is the historical source of the SLR/SSR comparison. Page numbers throughout
this analysis are **1-based PDF pages**, not inferred journal page numbers.
The PDF has 17 pages. Text was extracted with `pdftotext -layout`; pages 7,
8 and 11 were rendered and visually inspected to verify the heatmap, its
qualified gap wording and the five SSR rows. Temporary extraction/rendering
files are not evidence of a fresh literature search or added publications.

| Locator | Material inspected |
| --- | --- |
| pp. 1–3, §1 | Scopus-only search, English restriction, open-access filter, 188 initial records, 67 screened, 21 full texts, four exclusions, 17 included studies |
| pp. 4–6, §§2.1–2.4 | Language barriers, terminology/context, scaffolding and multilingual prompting |
| pp. 6–8, §§2.5–2.6, Tables 1–2 | Four themes, twelve sub-themes, historical coverage ratings and corpus-bounded fragmentation |
| pp. 8–10, §§3–3.1 | Research-gap synthesis qualified to the reviewed sample |
| pp. 10–12, §4, Table 3 | Five-system SSR and reported affordances/limitations |
| pp. 12–14, §5, Table 4 | Original rationale/PIRQOA; not the refined B01 state oracle |
| pp. 14–17, References | Bibliographic identities used below |

The 17 heatmap identities are He; Bal/Mandal; Kuzu; Zhang/Pang;
Candé/Martinho; Athukorala/De Silva; Yu; Rakhimova; Ataman; Vatsal;
Khoboko; Tran; Kleidermacher/Zou; Sakunkoo; Bo; Yüksel; Nair. This is a
transcription of the supplied table, not a claim that all 17 original texts
were re-read. The general references list also contains method/theory sources;
it is not itself a list of 17 included studies.

**Historical method limitation:** §1 reports exclusions for benchmark datasets
or automated assessment, while Table 2 includes Yüksel et al.'s TurkishMMLU.
The PDF does not provide the item-level screening decisions needed to resolve
how that inclusion met the transferability rule. This is a clarity/replication
gap, not proof of an incorrect screening decision. Neither that table nor the
completed conceptual matrix has been retrospectively rescored here.

## 2. Source access and permitted use

All attempts below occurred on 3 October 2026. A failed fetch establishes an
access limitation, **not** that a paper or capability does not exist. Publisher
search-index text is weaker than a retrieved full text. Third-party aggregators
and unrelated search results were not used as research warrants.

| ID | Source and primary link | Inspected locator / actual access | Permitted claim and transfer limit |
| --- | --- | --- | --- |
| LIT-A2 | Htet (2026), supplied Assignment 2 | PDF locators above | Historical SLR/SSR and PIRQOA; not independent replication or universal novelty |
| LIT-R01 | [Athukorala & De Silva (2025), publisher PDF](https://www.ijcte.org/vol17/IJCTE-V17N3-1378.pdf) | Retrieved primary PDF. p. 151 abstract; pp. 156–157, §IV and §IV.B | Sinhala query/translation/API/Java assistance precedent. No quantitative benefit transferred to Burmese learners |
| LIT-R02 | [Rakhimova et al. (2024)](https://doi.org/10.3390/computers13100253) | MDPI article returned 429; article PDF/CDN and publisher-book fetch unavailable | Only A2 p. 5/11 summary used. No new original-results or participant claim |
| LIT-R03 | [Zhang & Pang (2025)](https://doi.org/10.1145/3766557.3766635) | DOI unavailable; ACM article 403; no original full text inspected | A2 video-affordance summary only; no new effectiveness or absence claim |
| LIT-R04 | [Sakunkoo et al. (2025)](https://doi.org/10.1145/3746058.3758393) | DOI/ACM article and abstract endpoint unavailable/403 | A2 code-switched lyric/contextual interaction summary only; no added study statistics |
| LIT-R05 | [Nair et al. (2026), ScienceDirect](https://www.sciencedirect.com/science/article/pii/S187705092601848X) | Publisher search-index abstract retrieved; direct page 403; DOI fetch unavailable | Abstract confirms bilingual feedback/LLM/speech platform. No full-text methods or effect-size inference |
| LIT-R06 | [Kleidermacher & Zou (2026), original ACL PDF](https://aclanthology.org/2026.findings-eacl.204.pdf) | Retrieved. pp. 3937–3939, §§4–5 and Limitations; title/author/DOI confirmed on ACL record | Selective retention and differing preferences; terminology consistency concerns. Researchers' preferences are not a Burmese beginner policy |
| LIT-R07 | [Tran et al. (2026)](https://doi.org/10.1145/3787584) | DOI unavailable; ACM article 403 | A2 identification responsibility only; no claim of implementing/evaluating ATE |
| LIT-R08 | [Kuzu (2026), Springer](https://link.springer.com/article/10.1007/s10758-026-09974-7) | Primary abstract and §1 Introduction retrieved/inspected; no new full-study reanalysis | Guided multilingual interaction is context-dependent; teacher facilitation cannot be assumed present in this PoC |
| LIT-R09 | [He et al. (2025)](https://doi.org/10.1145/3768801.3768938) | DOI fetch unavailable | A2 context-sensitive educational translation summary only |
| LIT-R10 | [Vatsal et al. (2026)](https://doi.org/10.1109/ACCESS.2026.3702852) | DOI fetch unavailable | A2 multilingual-prompt variation/empirical-evaluation rationale only |
| LIT-R11 | [Candé & Martinho (2026)](https://doi.org/10.3390/info17060543) | MDPI original page fetch unavailable | A2 low-resource/output-supervision risk summary only |

Primary access is deliberately partial: R01/R06/R08 were inspected at named
locators, R05 at its publisher-index abstract, and seven sources remain
Assignment-mediated. An inaccessible primary text does not block an explicitly
labelled comparison confined to the supplied assignment summary.

## 3. Version and additional-source register

**No new publication is added to Assignment 2's frozen 17-study corpus.**
Reopening an original publication already in that corpus is verification,
not an expansion of its original search coverage.

Step 16's [reference record](../informed_argument/traceability.md)
separately records Tran et al.'s **2023 five-author preprint** and Venable et
al.'s FEDS method. The A2 **2026 six-author journal version** of Tran includes
Delaunay and is not treated as the same inspected text. Those additional
version/method sources are not inserted into this Step 18 matrix to manufacture
independent support. TTF/Scaffolding remain the current A3/A4 theoretical
foundation; A2's historical CTML rationale is not rewritten.

## 4. References used in the design comparison

Entries whose primary text was inaccessible preserve the supplied A2 identity;
their bibliographic completeness does not imply original-text verification.

- Htet, N. L. (2026). *Scaffolding low-resource STEM education with large language models* [INFOSYS 720 Assignment 2, University of Auckland]. Supplied PDF, §§1–5 and Tables 1–4.
- Athukorala, K. S. N., & De Silva, D. I. (2025). Bridging language barriers in programming education: Java programming assistance tool for Sinhala native speakers. *International Journal of Computer Theory and Engineering, 17*(3), 151–169. https://doi.org/10.7763/IJCTE.2025.V17.1378
- Rakhimova, D., Karibayeva, A., Karyukin, V., Turarbek, A., Duisenbekkyzy, Z., & Aliyev, R. (2024). Development of a children's educational dictionary for a low-resource language using AI tools. *Computers, 13*(10), 253. https://doi.org/10.3390/computers13100253
- Zhang, C., & Pang, G. (2025). An interactive video learning framework enhanced by large language models. *Proceedings of the 2025 International Conference on Educational Technology and Artificial Intelligence*, 458–463. https://doi.org/10.1145/3766557.3766635
- Sakunkoo, J., Sakunkoo, A., & Sakunkoo, P. (2025). SingLing: Learning languages by singing code-switched lyrics. *Adjunct Proceedings of the 38th Annual ACM Symposium on User Interface Software and Technology*, 1–3. https://doi.org/10.1145/3746058.3758393
- Nair, P. C., Reddy, A. C., & Hemasri, M. (2026). Vidyālaya: AI-powered Telugu language learning platform. *Procedia Computer Science, 283*, 1386–1395. https://doi.org/10.1016/j.procs.2026.06.216
- Kleidermacher, H. C., & Zou, J. (2026). Science across languages: Assessing LLM multilingual translation of scientific papers. *Findings of the Association for Computational Linguistics: EACL 2026*, 3932–3947. https://doi.org/10.18653/v1/2026.findings-eacl.204
- Tran, H. T. H., Martinc, M., Caporusso, J., Delaunay, J., Doucet, A., & Pollak, S. (2026). Recent advances in automatic term extraction: A comprehensive survey. *ACM Computing Surveys, 58*(9), Article 226. https://doi.org/10.1145/3787584
- Kuzu, T. E. (2026). AI-supported translanguaging processes in primary school: Empirical insights into ChatGPT's role in multilingual interactions. *Technology, Knowledge and Learning*. https://doi.org/10.1007/s10758-026-09974-7
- He, J., Wang, F., Li, S., Lei, Y., Zhu, J., & Lv, L. (2025). A comparative study on the translation capabilities of multimodal large language models with independent intellectual property rights—Taking cross-cultural online education scenarios as an example. *Proceedings of the 2025 2nd International Conference on Big Data and Digital Management*, 834–839. https://doi.org/10.1145/3768801.3768938
- Vatsal, S., Dubey, H., & Singh, A. (2026). Multilingual prompt engineering in large language models: A survey across NLP tasks. *IEEE Access, 14*, 99057–99093. https://doi.org/10.1109/ACCESS.2026.3702852
- Candé, A., & Martinho, D. (2026). Artificial intelligence in translation and interpreting in education: A systematic review of trends, applications and challenges. *Information, 17*(6), 543. https://doi.org/10.3390/info17060543

## Preservation and review scope

Detailed records above were recovered from the pre-consolidation archive, not newly executed or re-scored. Repeated planning, sign-off and summary text is omitted. The [shared protocol](../../00_protocol/evaluation_protocol.md) records preparation, execution and subsequent human verification. Original capture-time statements and complete documents remain in the [archive](../../archive/pre_consolidation_markdown_20261008.zip).
