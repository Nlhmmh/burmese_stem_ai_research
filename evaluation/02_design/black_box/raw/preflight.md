# Black-box preflight

2 October 2026, Pacific/Auckland. Application diff against B01 commit `37faefa236829aa3d79e023faa1fb72a086b5c2a` was empty. Both evaluation scripts passed `node --check`.

The sandboxed loopback-binding diagnostic (`node` net server listening on ephemeral 127.0.0.1 port) returned `EPERM`, exit 1. No application test or provider call ran in this diagnostic. The isolated-server run therefore requires the normal approved unsandboxed execution path. This environmental attempt is retained; it is not an application failure or a black-box Pass.
