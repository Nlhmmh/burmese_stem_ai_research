# Step 13 — Artificial Simulation Test Cases

| Document control | Value |
| --- | --- |
| Specification ID | `A5-STEP13-SIMULATION-CASES-01` |
| Baseline | `B01-A5-EVALUATION` |
| Protocol | `A5-PROTOCOL-01`, version `2.1` |
| Status | All 55 attempts executed/accounted for; 44 technical Pass, 8 controlled ambiguity, 3 Fail; qualified content review pending |
| Evaluator / run ID | Codex technical execution under user direction / `RUN-B01-20261001-SIMULATION-02`; human assessor blank |
| Core planned sessions | 48 fresh sessions, excluding retries |

## Purpose and boundaries

Test a fixed, purposive artificial corpus across STEM domains, ambiguity, and
three response paths. These are artificial cases, not learner data. Sessions
created from the same question are not independent learner observations.

Generated content must be assessed separately from structural route/state
correctness. The generating model cannot be the sole content assessor.

## Preconditions

- [x] Verify B01 application identity and protocol 2.1 acceptance rules.
- [x] Record live model identifier/settings and technical operator in `00_run_metadata.md`; qualified human competence is intentionally blank.
- [x] Use fresh artificial learner/session aliases for every row.
- [x] Fix `beginner` + `bilingual` + `guided` preferences; en is the snapshot, not an observed browser locale.
- [x] Complete `content_reference_notes.md` before execution with expected
  concept/domain, key facts, unacceptable misconceptions, and source basis for
  every SIM01–SIM16 input.
- [x] Prepare output/state capture; isolated server stopped, temporary synthetic data retained and exported.
- [x] Preserve exact generated text, not screenshots alone.

## Executed run and remaining human work

See [simulation_analysis.md](simulation_analysis.md), [failure_analysis.md](failure_analysis.md), [simulation_results.csv](simulation_results.csv), and [run metadata](00_run_metadata.md). E018–E021 retain the full execution and the aborted evaluation-runner attempt. Application source is unchanged from B01. The green Vitest accounting test means all cases were recorded, not that every route passed.

The three failed response steps returned safe HTTP 502 envelopes and left stored state unchanged. SIM05-C had an aborted provider request (configured timer 20 s; measured 52.825 s); SIM-CM-13/16 rejected unchanged concepts labelled corrected. No failure was retried or repaired in the frozen application.

| Separate case | Initial / response outcome | Technical result | Content |
| --- | --- | --- | --- |
| SIM-LANG-01 | Bilingual payload/override, profile unchanged | Pass | Not assessed |
| SIM-LANG-02 | English profile retained, bilingual override payload | Pass; no browser rendering claim | Not assessed |
| SIM-LANG-03 | Burmese profile retained, bilingual override payload | Pass; no browser rendering claim | Not assessed |
| SIM-CM-13 | Created initial session; unchanged correction rejected, HTTP 502 | Fail | Not assessed |
| SIM-CM-14 | HTTP 422 initial ambiguity, no session | Controlled ambiguity; correction Not applicable | Not assessed |
| SIM-CM-15 | HTTP 422 initial ambiguity, no session | Controlled ambiguity; correction Not applicable | Not assessed |
| SIM-CM-16 | Created initial session; unchanged correction rejected, HTTP 502 | Fail | Not assessed |

**Qualified human judgement remains blank:** complete [qualified_human_judgement.md](qualified_human_judgement.md) and the 55 linked case worksheets (91 generated-output score tables). Step 13 is not fully complete until this content review is recorded. Do not infer an F2 pass from HTTP 201 on SIM13/SIM16 without assessing explicit interpretation qualification.

## Fixed input corpus

| Base ID | Domain | Exact input |
| --- | --- | --- |
| SIM01 | Biology | What is photosynthesis, and how do plants make food? |
| SIM02 | Biology | What is DNA? |
| SIM03 | Biology | What is osmosis? |
| SIM04 | Physics | What is gravity? |
| SIM05 | Physics | What is electric current? |
| SIM06 | Physics | What is momentum? |
| SIM07 | Chemistry | What is pH? |
| SIM08 | Chemistry | What is an ion? |
| SIM09 | Chemistry | What is a catalyst? |
| SIM10 | Computing | What is inheritance in object-oriented programming? |
| SIM11 | Computing | What is an algorithm? |
| SIM12 | Engineering | What is carbon fibre? |
| SIM13 | Ambiguous | What is a cell? |
| SIM14 | Ambiguous | What is current? |
| SIM15 | Ambiguous | What is a network? |
| SIM16 | Ambiguous | What is inheritance? |

For SIM13–SIM16, preserve whether initial generation returns a qualified
interpretation or HTTP 422 `AMBIGUOUS_STEM_CONTEXT`. Do not rewrite an ambiguous
input to manufacture a pass.

## Common path assertions

### Path A — Fade and explicit completion

1. Create the initial session.
2. Send High.
3. Verify `fade`, event 0→0, no adaptation/provider call/increment, and
   `in_progress`.
4. Finish explicitly and verify `completed`.

### Path B — Default Medium route then fade

1. Create the initial session.
2. Send Medium with no Stage 6B choice.
3. Verify `stage_5_scaffold` + `another_example`, event 0→1, one meaningful
   generated adaptation, and `in_progress`.
4. Send High; verify `fade`, event 1→1, no further generation/increment.
5. Finish explicitly.

### Path C — Two adaptations and cap

1. Create the initial session.
2. Send Needs Support + `simpler_explanation`; verify event 0→1.
3. Send Needs Support + `concept_unclear`; verify event 1→2 and
   `review_recommended`.
4. Send Needs Support with no Stage 6B choice; verify event 2→2, no provider
   call/third adaptation/round 3, and retained `review_recommended`.

If initial generation returns a controlled ambiguous outcome and therefore no
session exists, record that path as Executed with its actual outcome against
F2; do not perform impossible response steps or call them passed.

## Forty-eight core cases

| Case ID | Base input | Path | Fresh alias/session | Execution status | Outcome | Evidence IDs |
| --- | --- | --- | --- | --- | --- | --- |
| SIM01-A | SIM01 | A | `f2eb153e-a0b9-4990-9e11-6dbbcea30100` / `4e2be976-6df1-46d7-bb2a-5bdd2d67a7dd` | Executed | Pass; content Not assessed | E018–E021 |
| SIM01-B | SIM01 | B | `2928a0de-8667-4b88-bc9a-0d95bf0e7612` / `85cf70b4-b883-4900-87c5-b9619ebe732c` | Executed | Pass; content Not assessed | E018–E021 |
| SIM01-C | SIM01 | C | `91f113ec-fe32-4ffa-b64f-92686ec25b7b` / `358a8a9d-e765-4aa8-a263-3b2444d6ecae` | Executed | Pass; content Not assessed | E018–E021 |
| SIM02-A | SIM02 | A | `bbea71b4-eeac-4752-9d75-30d015552647` / `ae1485c8-9d83-4eac-ac89-245fada41bcc` | Executed | Pass; content Not assessed | E018–E021 |
| SIM02-B | SIM02 | B | `1b3395c1-82fa-4e51-b111-482d218cd65c` / `faa3a418-524b-4498-92e8-51e66c7d9ed1` | Executed | Pass; content Not assessed | E018–E021 |
| SIM02-C | SIM02 | C | `c3037933-03db-4ed9-bd59-c257f8449616` / `e676b0af-380b-46fd-b8ec-80a395774ce9` | Executed | Pass; content Not assessed | E018–E021 |
| SIM03-A | SIM03 | A | `cc3a3659-80ff-4776-ac6f-7b95b41c7455` / `6c6e64c7-03eb-483f-b998-4d3c47e2d625` | Executed | Pass; content Not assessed | E018–E021 |
| SIM03-B | SIM03 | B | `bd14f132-a097-47bf-a2c4-7e6c9ed1730a` / `153d34f8-5d78-454e-a268-f7b4c091379c` | Executed | Pass; content Not assessed | E018–E021 |
| SIM03-C | SIM03 | C | `001fb18d-353e-40b9-9e78-d6b1d607737d` / `f2f3137f-cbd0-4481-a89c-80ff949101d0` | Executed | Pass; content Not assessed | E018–E021 |
| SIM04-A | SIM04 | A | `2551fb27-b7fc-4b03-87d0-47b20f8b6272` / `39852b4c-ff6c-48a9-a642-46f686b85c03` | Executed | Pass; content Not assessed | E018–E021 |
| SIM04-B | SIM04 | B | `5f14bdd8-42f5-44c2-aa8a-78efc10c4c7a` / `4490674f-4456-4707-b6ab-75a0d3360200` | Executed | Pass; content Not assessed | E018–E021 |
| SIM04-C | SIM04 | C | `806be300-b26d-44a4-b452-96266fb12736` / `c94cea00-6097-4885-83ea-1abc89a96d5d` | Executed | Pass; content Not assessed | E018–E021 |
| SIM05-A | SIM05 | A | `4abe5c38-37fb-4b43-b552-533adf1cc04d` / `6ca2224f-99ad-472e-a278-3e804f00226b` | Executed | Pass; content Not assessed | E018–E021 |
| SIM05-B | SIM05 | B | `14dc3ef6-3def-4319-a67d-f513e563115d` / `34c9ac53-1344-434f-9696-b31a53bab2c3` | Executed | Pass; content Not assessed | E018–E021 |
| SIM05-C | SIM05 | C | `76ad29cf-7a8d-4d6b-a9ff-e4a259eab4d2` / `7a59e036-f066-4dda-a36b-9699dba9d8d5` | Executed | Fail; content Not assessed | E018–E021 |
| SIM06-A | SIM06 | A | `8924b599-f6f0-4e29-9613-ae988ff8d0af` / `c2ff8d41-594f-41a4-a69a-179000dab862` | Executed | Pass; content Not assessed | E018–E021 |
| SIM06-B | SIM06 | B | `b8a859b3-75ba-4eba-83a9-1fdf77958a38` / `858498a6-352f-4b33-b963-5fce18858c32` | Executed | Pass; content Not assessed | E018–E021 |
| SIM06-C | SIM06 | C | `00f5f139-4135-4347-9b5f-6b8e71328948` / `343e709b-f1d6-4310-bff2-eadd6fe17111` | Executed | Pass; content Not assessed | E018–E021 |
| SIM07-A | SIM07 | A | `36868422-559d-4c38-a458-e15d19d27c2f` / `19caa71a-3ed4-4d1e-bd35-a1fc69f77215` | Executed | Pass; content Not assessed | E018–E021 |
| SIM07-B | SIM07 | B | `1b3daf94-1db3-43d4-9b24-833c21950ab8` / `425e7d0e-1240-4d92-ade9-ddd52e74735b` | Executed | Pass; content Not assessed | E018–E021 |
| SIM07-C | SIM07 | C | `b4b23936-b2c8-434b-a66c-7d68a52ce949` / `9b7bf0d2-cf0d-4da3-aca0-b721abbd2447` | Executed | Pass; content Not assessed | E018–E021 |
| SIM08-A | SIM08 | A | `4030da5b-6703-4a68-b28d-85a1ab2682ca` / `2edf532e-e8b0-49f1-b4fc-be47ba2d9619` | Executed | Pass; content Not assessed | E018–E021 |
| SIM08-B | SIM08 | B | `1ab31c81-1a3a-4d99-8101-1c57d7cea07f` / `51ea45d7-31d1-432c-83e4-0957c765fc4a` | Executed | Pass; content Not assessed | E018–E021 |
| SIM08-C | SIM08 | C | `294d5d29-2a58-45dd-8fa1-81afa2c56cea` / `755ce6f0-28ea-4c4b-b59a-d39f638796ec` | Executed | Pass; content Not assessed | E018–E021 |
| SIM09-A | SIM09 | A | `666a6241-1686-460a-b1b1-6ffdb16e7f47` / `1963c1f5-e57e-4192-b2e1-e807f925857c` | Executed | Pass; content Not assessed | E018–E021 |
| SIM09-B | SIM09 | B | `5176f0b5-5231-4cf7-9563-145340748b64` / `fa16f282-8a28-4350-b4d6-bec9b3f855db` | Executed | Pass; content Not assessed | E018–E021 |
| SIM09-C | SIM09 | C | `3972e9b5-2440-4b97-8993-c7711ecc991e` / `6c8015ff-18ad-48b4-a9bb-5db1722a5de7` | Executed | Pass; content Not assessed | E018–E021 |
| SIM10-A | SIM10 | A | `d8c8a0cf-a108-4596-9b08-0f66d5bd898d` / `c5d9e369-aa3a-4321-bad4-c32435b0aabc` | Executed | Pass; content Not assessed | E018–E021 |
| SIM10-B | SIM10 | B | `fe3d0d1f-79ab-4c04-b397-767c96dc2c88` / `c42bee4d-c417-4616-a8a7-fe3b32531bdc` | Executed | Pass; content Not assessed | E018–E021 |
| SIM10-C | SIM10 | C | `73618b7f-9fad-43b8-b6bd-88e805485083` / `27982f02-a292-4b9e-abc3-03040d1dc732` | Executed | Pass; content Not assessed | E018–E021 |
| SIM11-A | SIM11 | A | `95f9c3c9-e4a2-45f2-9ce7-bc1a1cb19e6b` / `160ccd91-1245-4780-97e4-bd2791e08cb1` | Executed | Pass; content Not assessed | E018–E021 |
| SIM11-B | SIM11 | B | `f8e04bf0-c494-4c3b-a9e3-dbf882f8c78d` / `ab5adb88-41d7-4945-b59e-16032c17878a` | Executed | Pass; content Not assessed | E018–E021 |
| SIM11-C | SIM11 | C | `25344e71-c100-496d-8202-3352f4f57b9d` / `23d8bf83-d4a4-47bf-b37b-ad17a411ca90` | Executed | Pass; content Not assessed | E018–E021 |
| SIM12-A | SIM12 | A | `eb699d5a-9684-4900-a1f8-52ae875ea72c` / `f796eb83-5195-4247-aab1-e43254346d8c` | Executed | Pass; content Not assessed | E018–E021 |
| SIM12-B | SIM12 | B | `1e01f4c1-96a3-4663-997c-0fb29abdd153` / `b2f97ac4-1a0b-4d48-b75c-e7c790207f59` | Executed | Pass; content Not assessed | E018–E021 |
| SIM12-C | SIM12 | C | `c96a4ac2-9be8-42b5-aa15-4674a45c0281` / `567f1e0a-e65f-47d1-b4b1-35568c9bd73a` | Executed | Pass; content Not assessed | E018–E021 |
| SIM13-A | SIM13 | A | `405d1743-3567-4f0f-852d-8f1923424486` / `bc5fd4ac-ff4a-43e5-a44e-fd3b2966ef57` | Executed | Pass; content Not assessed | E018–E021 |
| SIM13-B | SIM13 | B | `34ee591d-5179-4b40-a314-6c29e04a813b` / `d0580aa0-9a6a-4604-9852-59efc30bae4d` | Executed | Pass; content Not assessed | E018–E021 |
| SIM13-C | SIM13 | C | `eead593a-b3f9-4dae-8106-3fd419fa5036` / `559657cd-fb74-4e76-aeb7-b74dfcc0f7ac` | Executed | Pass; content Not assessed | E018–E021 |
| SIM14-A | SIM14 | A | `42eb95cf-ac49-4f07-bf6c-0865360b0131` / `no session` | Executed | Controlled ambiguity; content Not assessed | E018–E021 |
| SIM14-B | SIM14 | B | `0d5b338d-31df-4416-841d-3bea7f837d18` / `no session` | Executed | Controlled ambiguity; content Not assessed | E018–E021 |
| SIM14-C | SIM14 | C | `ed003573-9fdb-416e-8150-e6303e28402b` / `no session` | Executed | Controlled ambiguity; content Not assessed | E018–E021 |
| SIM15-A | SIM15 | A | `2a42bad3-a954-4505-bf0a-e37d9da1acf0` / `no session` | Executed | Controlled ambiguity; content Not assessed | E018–E021 |
| SIM15-B | SIM15 | B | `5272ee11-8570-4476-aa87-dab4dc10741f` / `no session` | Executed | Controlled ambiguity; content Not assessed | E018–E021 |
| SIM15-C | SIM15 | C | `072e1449-2678-4ab9-a8c1-dda206c153a2` / `no session` | Executed | Controlled ambiguity; content Not assessed | E018–E021 |
| SIM16-A | SIM16 | A | `c82f5039-bfd4-4caa-ab9b-8cbf3cc65cdd` / `41bb7efc-ed85-4d72-905a-259c36046fe0` | Executed | Pass; content Not assessed | E018–E021 |
| SIM16-B | SIM16 | B | `4bdf52ec-8d3d-4d7d-aefa-1c1bb9f0d5e7` / `fe298260-f38c-419d-a3b9-ef59930bdec9` | Executed | Pass; content Not assessed | E018–E021 |
| SIM16-C | SIM16 | C | `139d5561-149f-45cf-86a0-946d8f2b4064` / `64f99850-c979-4b65-a05e-d9903650cbd9` | Executed | Pass; content Not assessed | E018–E021 |

## Separate explicit-route cases

These are additional to the 48 core sessions.

### SIM-LANG-01 — Language support from bilingual profile

Create a valid technical-term session; send Medium + `language_terms`.

**Expected:** `language_support`, `clarification`, bilingual override, meaningful
term-focused revision, unchanged learner profile.

### SIM-LANG-02 — Override from English-only profile

Repeat with profile support language English.

**Expected:** adaptation itself displays both languages because of the bounded
override; profile remains English.

### SIM-LANG-03 — Override from Burmese-only profile

Repeat with profile support language Burmese.

**Expected:** adaptation itself displays both languages; profile remains
Burmese.

### SIM-CM-13 — Biological cell correction

For a created SIM13 session, send concept mismatch with
`I mean a biological cell`.

### SIM-CM-14 — Electric current correction

For a created SIM14 session, send concept mismatch with
`I mean electric current`.

### SIM-CM-15 — Computer network correction

For a created SIM15 session, send concept mismatch with
`I mean a computer network`.

### SIM-CM-16 — OOP inheritance correction

For a created SIM16 session, send concept mismatch with
`I mean inheritance in object-oriented programming`.

For SIM-CM-13–16, expected behaviour is a bounded explicit `corrected`,
`ambiguous`, or `limit_reached` outcome with a persisted previous/current trace.
A corrected outcome must change the active concept/domain and downstream
support. An ambiguous outcome must keep the concept unchanged and request one
controlled clarification. Do not force a corrected result.

## Content assessment

For initial and adapted content, score each required dimension:

| Score | Meaning |
| --- | --- |
| 2 | Adequate within the frozen reference scope |
| 1 | Limited or minor issue |
| 0 | Material error or absent required content |
| NA | Not assessable with available evidence/competence |

Dimensions: technical correctness, contextual relevance, language adequacy,
explanation beyond translation, and adaptation appropriateness when relevant.
A required 0 fails the content case; 1 permits only Partial content adequacy; a
required NA prevents a full content judgement.

## Per-session record

Record case/attempt, base/path, exact input, preference snapshot, UI locale,
session alias, model/configuration, output evidence, overall need, difficulty,
route, round/status before/after, provider-call observation, stored state,
content scores/assessor/reference, execution status, outcome, evidence IDs,
retry, and limitation.

## Completion criteria

- All 48 core rows are accounted for without silent substitution.
- SIM-LANG-01–03 and SIM-CM-13–16 are accounted for.
- Reference notes were frozen before content judgement.
- Exact text and persisted state accompany screenshots.
- Structural and content outcomes remain separate.
- Ambiguous cases are not rewritten to manufacture a pass.
- F2–F7/F9/F13 and the evidence register are updated as applicable.
