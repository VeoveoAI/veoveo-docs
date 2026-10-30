# Request routing and current Task authority: native qualification

Hub commit `cda9372` strengthens the real binary/SDK routing regression and qualifies
it with a deliberate fault and clean restoration. This is **native component evidence,
not a new Lean theorem**. The larger request-composition proof remains in progress.
GPT-6 Astra reviewed and coordinated; GPT-6.1 Sol implemented the test changes;
GPT-6 Luna ran the bounded, logged checks. There were no model-driven acceptance calls,
deployment changes or full repository Docker gates.

## Source and scenario

The implementation base is Hub `eb099bb885c2d8e55b001dbf2c75bdd3dcc10753`, with SDK
`239622d12c08b771cc5e813fe3e846385d8d04ad` and Core
`120306eb969c6134dadd422dca701a2ce63e9492`. Runtime code, dependencies and Lean models
are unchanged. The current Task decision and pinned SDK recipient source hashes match
their earlier qualified proof inputs; the old Task-package warning about SDK pin
`a41c9cc` is historical, not a current dependency mismatch.

The [test](https://github.com/VeoveoAI/veoveo-hub/blob/cda9372/crates/veoveo-hub/tests/routing.rs)
runs the real Hub executable on private PostgreSQL 18.6, with SDK loopback fixtures:
a base deployment, two later revisions of the same synthetic ledger server, and a
relay. The caller is `acceptance-member` under profile `local`. Existing fresh,
delegated, retained-Task and restart assertions now use the SDK verifier with the
receiving server's actual registration keys. They check signature, complete
server/deployment/resource association, client/profile and typed invocation context.

After the Hub restart, the same caller and bearer read the same retained completed
Task. Publishing read-only access changes the forwarded permission set from
`ledger.entries.read` plus `ledger.entries.write` to exactly `ledger.entries.read`,
while preserving deployment and composition. The actor, authority and original token
metadata remain equal except the principal's per-request `authenticated_at`, which
the production verifier stamps anew. The test normalizes only that timestamp and
observes it not decreasing; this is not a general monotonic-clock guarantee.

Removing the member grant then yields MCP error `-32600` with the existing roles-denial
message. No new SDK-verified audit request ID appears at any of the four endpoints.
These are single subsequent calls, without policy polling: this fixture has one Hub,
and its administrative update replaces the local catalog before replying. Other
replicas' asynchronous adoption is outside this result. Distinct audit IDs separate
new forwarded calls from any delayed cleanup using an earlier request's context.

## Execution and evidence

Checks used Rust `1.99.0-aarch64-apple-darwin` on the Mac and PostgreSQL 18.6. The exact
test was `cargo test --locked -p veoveo-hub --test routing
the_newest_registered_deployment_serves_and_captures_keep_their_routing -- --exact
--nocapture`. The final source SHA-256 values are:

- `tests/routing.rs`: `32acdd0fc31be72c98cb7c569664f5fde56d0e80ca22c7b441de5c111f8a134f`.
- `tests/support/servers.rs`: `dc6a015a4e024409a716fab760a4e1c5e0cbc49f7a6020b520552a13920626fc`.
- Unchanged `src/mcp/authorization.rs`: `9c417b771fe4e232e652ad9bfda666370ceff66ed704975bf1dd8846f734fa00`.

The accepted sequence was:

1. Clean original baseline: one test passed, **53.873 s** command / **12.73 s** test
   body. Hub executable SHA-256 `6729be6924bdc95016802c519431860d0d7b0923c9c4270ef88aa5ad40be17bc`.
2. Isolated fault: bypass only the final current-policy call in
   `authorize_task_route`. Keep owner/capture/exposure checks, current grant
   computation, token issuance and SDK checks intact. After revocation, `get_task`
   succeeded and the base received a new verified request ID,
   `01a18f21-2a0d-7da0-b3e5-8379fd7d4c90`; frames increased from 147 to 149.
   The other endpoints stayed unchanged. The **unchanged assertion failed directly**
   on the new forwarded context: **51.289 s** command / **12.95 s** test body.
   Mutant Hub SHA-256 `fd0ebcda78e9e301e8ca2e764243576dcbd856b65328a7b6ca111f7d0aff877b`.
3. Exact original restoration: one test passed, **50.962 s** command / **12.53 s**
   test body. The refusal added no request IDs; raw frame counts remained
   `[145, 7, 8, 14]`. Hub SHA-256
   `b918c6097d302b21804f329e0b624f332e0b04e30ecab90743bc8085756b73ec`;
   routing-test executable SHA-256
   `4806251259501561c34aee4d3478877b275f3d7379b71d696b9048cc834e9d3e`.
4. Formatting passed in **0.703 s**; strict routing-test Clippy passed in **10.840 s**.
   The tested source hashes remained unchanged.

The [compact receipt](https://github.com/VeoveoAI/veoveo-hub/blob/cda9372/proofs/task_continuity/evidence/request-routing-native-receipt.json)
contains exact commands, both executable identities for each accepted run, log hashes,
source applicability and the [isolated mutation](https://github.com/VeoveoAI/veoveo-hub/blob/cda9372/proofs/task_continuity/mutations/current-task-policy-bypass.patch).
The control runner's generic `complete=false` flag reflects the expected nonzero test
exit; the actual compiled control, one test and intended assertion were independently
reviewed. Private logs are under `/tmp/hub-request-composition-20261030/`; raw bearers
and signed URLs are not part of this record.

## Development failures and limits

An initial test import did not compile. A subsequent assertion incorrectly required
identical authentication timestamps across different HTTP requests; source inspection
corrected that assertion. An earlier control detected nonrefusal only through a
10-second wait; the final control catches a concrete new forwarded context immediately.

Two apparent original-runtime failures were invalid: the scratch control had
overwritten the shared `target/debug/veoveo-hub`, while Cargo rebuilt the test
executable without replacing that named Hub binary. Its timestamp and hash identified
the stale control artifact. Source identity and the test binary alone were therefore
insufficient. Accepted source-root switches package-cleaned only Hub, retained its
dependency cache, rebuilt the actual spawned executable and recorded both hashes.
One intermediate control was unnecessarily interrupted after rebuilding; it provides
no completed test result. **No production authorization defect was established or
patched in this slice.**

This test does not formally establish routing/claims/SQL/cryptographic refinement,
replica convergence, or network delivery semantics. A retained capture pins the
deployment, not an immutable endpoint; an endpoint update within that deployment was
not exercised. Full issuer assembly, all delegation/deadline paths and catalog/listener
composition remain separate obligations.

The concurrent Linux extraction investigation is also unfinished. Earlier selectors
were rejected or triggered a constructor metadata panic. A corrected probe emitted
error-free LLBC for 17 roots, but its SDK issuer remained opaque, so it was not accepted
as the connected model. The next include-corrected probe ended with SIGKILL after
263.622 seconds, with no LLBC; available kernel logs did not identify the cause.
Aeneas did not run and no new Lean theorem was checked. The next step is to partition
the production-source extraction without replacing our own assembly with an assumed
result or changing efficient runtime code.
