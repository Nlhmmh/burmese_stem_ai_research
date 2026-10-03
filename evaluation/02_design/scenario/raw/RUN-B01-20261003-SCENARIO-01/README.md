# Preflight attempt 1 — excluded from application conclusions

The request-observation seam initially attached a `data` listener to the
incoming request. This put the body stream into flowing mode before Next's
handler was ready and the Preferences save returned 400 / invalid JSON.
This is an evaluation-instrumentation defect, not evidence of an application
defect. The request and state records are retained, with zero model calls and
no learning session created. The seam was corrected to observe `emit('data')`
without adding a consuming listener; the unchanged scenario will begin afresh
under `RUN-B01-20261003-SCENARIO-02`. No production source was changed.
