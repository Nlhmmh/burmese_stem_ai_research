# Startup attempt 1 — not an application scenario attempt

3 October 2026: `node evaluation/02_design/scenario/raw/start_scenario.mjs`
failed at the first temporary-port allocation with
`listen EPERM: operation not permitted 127.0.0.1` under the sandbox.
No application/MongoDB server, browser scenario, model call, or stored session
was created. The empty output directory is retained here. The same runner will
be started with the local-server permission required by this evaluation.
