# DYN-RUN-01 assertion adjudication

## DYN-10

The first automated summary marked `new_session_recommended` as failed because
the evaluation driver looked for `error.newSessionRecommended`. The captured
raw HTTP response contains `newSessionRecommended: true` at the response root,
alongside the expected HTTP 422 and `FOLLOW_UP_OUT_OF_SCOPE` error envelope.

This is an evaluation-driver assertion-path defect, not an application defect.
The driver was corrected after preserving the original raw response and
summary. DYN-10 is therefore adjudicated **Pass**, with the original failed
assertion retained in `DYN-RUN-01-summary.json` for traceability.
