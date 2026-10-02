# Step 18 — Literature source verification

Analysis: `ANALYSIS-B01-20261003-DESIGN-LITERATURE-01`, DA-LIT, 3 October
2026 (Pacific/Auckland). Evaluator: Codex literature/evidence analysis under
user direction. This records source access, not a new PoC experiment or human
review. Source IDs below are local reference IDs, not evidence IDs.

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

Step 16's [reference record](../informed_argument/reference_verification.md)
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
