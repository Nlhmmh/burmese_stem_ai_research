# Step 18 — Design artefact literature evaluation

> **Human-verification update, 8 October 2026.** The author has confirmed personally checking every scientific and English–Burmese assessment against the original outputs and relevant references. AI assistance with preparation, execution and drafting remains acknowledged. Final interpretations and decisions are accepted by the author. This is not an independent second assessment or a claim of manual execution throughout. See the [confirmation and scope](../../00_protocol/human_verification_confirmation.md). Earlier capture-time statements retain their historical meaning.

| Document control | Value |
| --- | --- |
| Method / analysis ID | DA-LIT / `ANALYSIS-B01-20261003-DESIGN-LITERATURE-01` |
| Date / evaluator | 3 October 2026, Pacific/Auckland; Codex literature/evidence synthesis under user direction |
| Artefact | Actual root `burmese_stem_ai` PoC; B01 production; ROOTTESTS-02 test/config profile |
| Status | Completed with qualifications: 13 capability comparisons, all five Assignment 2 SSR systems included |
| Outputs / evidence | E045 [matrix](literature_matrix.csv); E046 this synthesis; E047 [source verification and references](reference_verification.md); E048 [integrity manifest](raw/LIT-RUN-01-manifest.sha256) |
| Scope | Recorded implementation evidence plus focused literature verification; no application run, provider call, source snapshot, new human review or participant study |

## 1. Overall finding

The PoC **partially instantiates an integrated, literature-grounded design**:
concept/domain interpretation, Burmese/English support, structured explanation,
optional learner-response routing and persistent interaction history work
together in the recorded coverage. This addresses the integration opportunity
reported in Assignment 2's reviewed corpus, while leaving substantive language,
content and interpretation limitations visible. It does **not** demonstrate
superiority over the five SSR systems, validated ATE, educational effectiveness,
or complete resolution of the research gap.

The most defensible contribution is a **bounded implementation demonstration**,
not a claim that an implemented feature guarantees learner benefit. The exact
two-generated-adaptation limit, Stage 6 categories and High-to-fade mapping
remain local application policies without evidence of pedagogical optimality.

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
inaccessible original. See [E047](reference_verification.md) for all identities,
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

## 7. Consolidation-ready conclusions

| Requirement / RQ | Literature/implementation conclusion | What remains outside evidence |
| --- | --- | --- |
| REQ-01 / RQ1 | Partially supported: context/language responsibilities implemented; retained terminology and correction need careful qualification | Validated ATE, uniformly accurate intended meanings or dependable Burmese terminology |
| REQ-02 / RQ2 | Partially supported: core meaning, varied structured support and scoped follow-up delivered in recorded cases | Consistently accurate/pedagogically sufficient explanations or improved understanding/retention |
| REQ-03 / RQ3 | Bounded collection/routing/persistence supported; adaptive-support quality remains partially supported | Competence diagnosis, learner task-fit measurement, transfer of responsibility or optimal two-round policy |

These are DA-LIT interpretations for later Steps 20–22, **not final RQ answers**
or revised FURPS outcomes. Existing DYN-05/06 provider-count qualifications,
BB07/08 novelty Partials, BB22 oracle failure and U5/U8/U9 Partials remain.
No acceptance rule, score, prompt, database, production source or earlier
human approval has been changed.

## 8. Verification and hand-off

The reproducible documentation-only checker is
[`raw/verify_literature.mjs`](raw/verify_literature.mjs), with captured
[verification](raw/LIT-RUN-01-verification.json) and E048 manifest. It checks
13 rectangular CSV records, required fields/ratings, source/evidence ID
resolution, all five SSR comparators, local links, prior evidence hashes and
the 66 production identities recorded for B01. It adds no application test,
LLM call or human review. Register append integrity is checked separately with
`--check-register` after E045–E048 exist.

The plain CSV has no formulas or spreadsheet-native formatting; direct parsing
and field/identity checks are appropriate here. The spreadsheet skill guided
the flat source/evidence columns, visible access limits and preservation of
existing register rows; its unavailable workbook engine was not used to claim
visual or native-Excel verification. The PDF skill guided visual verification
of the supplied heatmap and SSR locators.

**Next: Step 20 — audit/finalise the master evidence register**, then Step 21's
results table and Step 22's PIRQOA mapping. The register already gains this
step's four evidence IDs; conceptual-evidence reconciliation and final
cross-method consolidation are still Step 20 work. Do not silently fix the
remaining B01 failures during consolidation. A changed production artefact
requires a new baseline and affected reruns.
