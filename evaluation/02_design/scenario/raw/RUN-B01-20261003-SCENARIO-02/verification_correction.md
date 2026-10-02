# Read-only verifier correction

The first verification pass returned 14 Pass / 1 Fail because SCN-V06
incorrectly expected a `limitReached` field in the API response. B01's response
contract does not return that field. Its recorded capped response contains
`stage_5_scaffold`, `adaptation: null`, round 2, `review_recommended`, and a
2 → 2 event. Zero provider calls and unchanged adaptations are directly
recorded. The verifier now checks those actual documented contract fields.

`verification_attempt_01.json` retains the original failure. The corrected
verifier reanalyses the same immutable HTTP, provider and database evidence.
There was no rerun, changed learner input, new model call, application fix,
or removal of an application failure. The UI limit message is independently
checked in SCN-E04.
