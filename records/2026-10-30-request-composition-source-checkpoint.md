# Request-composition source checkpoint

Hub `91ab4cc0b63f7cc1950627df59f5ae3f1cb633e7` and SDK
`7e28d5ed469607081a68d7342b8cfe37112470f9` commit the next source-preparation
milestones. **No new Lean theorem is established by these commits.** The intended
contract connects the selected registration and current caller authority to the
actual forwarded claims and recipient check. Native tests, successful translation
and checked proofs are separate evidence.

## Changes and preserved contract

Hub moves the existing borrowed namespace grouping and ordering into a private
`build_namespaces` helper. Snapshot assembly keeps the original deployment map.
Deployment lookup, acting-Task lookup and token-issuer result mapping use explicit
matches in place of higher-order expressions rejected by the pinned translator.
Registration ordering, forwarded fields, deadlines, error variants and authorization
rules are unchanged by source review and the native regressions below. There is no
formal Rust-equivalence theorem for these rewrites.

SDK introduces a concrete private `sign_forwarded(&AccessTokenClaims)` boundary that
calls the existing generic signer. The actual issuer still constructs the actual
claims before signing. Scope serialization uses one ordered string-building loop,
with the same absent/one/many-scope results; this changes allocation details and has
no performance claim. Three optional-identifier comparisons in request-context
validation use explicit matches at their original short-circuit positions. A new
test independently checks literal scope expectations on real signed and decoded
claims, including the empty case, and checks acceptance by the real verifier.

Hub still pins SDK `239622d12c08b771cc5e813fe3e846385d8d04ad`.
The newer SDK changes are not integrated into that dependency or deployed.
No new authorization check or rejection was added.

## Native component evidence

GPT-6.1 Sol prepared the changes, GPT-6 Astra reviewed the boundaries and committed
the milestones, and GPT-6 Luna ran unattended checks on macOS ARM64 using Rust
`1.99.0-aarch64-apple-darwin`. There were no model-driven or deployed probes.

Hub commands, in order, used `cargo` through that toolchain:

- `test --locked -p veoveo-hub --lib registration::snapshot::tests -- --nocapture`:
  2 passed, Cargo elapsed **33.599 s**.
- `test --locked -p veoveo-hub --lib mcp::upstream_authorized_http::tests -- --nocapture`:
  3 passed, **0.690 s**.
- `test --locked -p veoveo-hub --test routing the_newest_registered_deployment_serves_and_captures_keep_their_routing -- --exact --nocapture`:
  1 passed, **13.215 s** Cargo / **12.54 s** test body.
- `test --locked -p veoveo-hub --test calls servers_call_each_other_for_their_caller_through_the_hub -- --exact --nocapture`:
  1 passed, **18.678 s** Cargo / **12.25 s** test body.
- `fmt --all -- --check`: passed, **0.586 s**.
- `clippy --locked -p veoveo-hub --lib -- -D warnings`: passed, **8.560 s**.

The integration tests used their private PostgreSQL fixtures, PostgreSQL 18 from
`/opt/homebrew/opt/postgresql@18/bin`, and `SQLX_OFFLINE`. A scoped Hub clean preceded
the tests to avoid reusing the named binary from an earlier mutation run. Two
temporary runner mistakes preceded the successful integration stages: missing `--`
before `--exact`, then missing PostgreSQL's executable directory. These were setup
failures, not failed routing assertions; the passing unit tests were not repeated.

The native continuation summary retained an older packet's HEAD/test-file metadata.
A separate source supplement records the actual checkout `33b1e7d` plus the runtime
edits now committed as `91ab4cc`. Its hashes were collected after validation; this is
not an independently captured before/after runtime manifest. The worker reported no
runtime-source edits during validation. Original logs and summaries are preserved.

SDK `internal_auth::` unit tests passed **35 tests**, 126 filtered, **7.892 s** Cargo /
**0.35 s** test body. Format passed in **0.277 s** and strict library Clippy in
**1.902 s**. The two changed SDK source hashes were captured before and after and
matched. These are focused checks, not the complete Mac/Linux Docker gate.

## Translation evidence and remaining proof work

Linux Charon extracted Hub `33b1e7d` plus the reviewed helper/match patch and the
existing extraction-only catalog-name annotation. All 15 roots and 15 expected
helper bodies were uniquely located and transparent; LLBC reported no errors.
Charon passed in **25.757 s**; Aeneas generated four files in **2.072 s**. The input
was the scratch patch before final formatting, not an exact extraction of committed
`91ab4cc`. Final-source correspondence and module naming must be resolved before
adopting generated files.

This translation keeps two explicit unresolved boundaries: namespace-helper
completion/contents and the SDK issuer. An opaque desired issuer result cannot
establish the contract. The separate actual SDK issuer extraction, its bridge to
Hub's types, handwritten external models, Lean compilation and composition theorem
remain pending at this checkpoint. Namespace-map preservation must cover arbitrary
helper results, without assuming convenient successful output. Ordinary namespace
ordering and helper termination are not proved here.

Tools: Charon `de8736f7c995ac54dc490345cef9ea5143c06c62` (0.1.293),
Aeneas `fdebf20d78e8007bb92fc17068f17fc2e6cfbbbf`, Rust nightly 2026-09-17
on Linux x86_64. Cryptography/serialization, external primitives, asynchronous
wiring and SQL refinement remain explicit boundaries.

## Evidence identities

Temporary logs are under `/tmp/hub-request-composition-20261030/`; the hashes below
preserve the checkpoint's identities even when temporary artifacts are removed.
All values are SHA-256.

- Hub `snapshot.rs`: `aff6a2c0793c73219e1ed27f4664d6141ccc876f4407e459c8ac531bd6e2519c`.
- Hub `audit.rs`: `a07a791c9d9e8ce61013faed5f4c52579feb30cdb29e1ffb204135817f6b54e9`.
- Hub `upstream_authorized_http.rs`: `544405597c2ad7dc30783f64b037c25bf887f0015fbcc730dac6f7d51f72832d`.
- Actual Hub executable: `ba6c0ec13c32ce6dde100fd9ec6ad5fe5ba3779c2f072e1661461844082e50b6`.
- Routing executable: `224df6f91f580274b29dbb2669aa8cd09c045ad64d49b3ada7d647282c0a0632`.
- Calls executable: `ded0a8e1d31933357629ca6e4819e5988a3da1a0be0aba3b0a1d33a9e74cba3c`.
- `evidence-hub-partition-a-native/continuation2-summary.json`:
  `1909075e8128e9180063045c371beffaf6f3c3f9b21e98e39ebf6b2459992a4b`.
- SDK `internal_auth.rs`: `d64ca496d0ee40c333fc94d72bc559342f84802d095ff3fb2b677c26e460a314`.
- SDK `internal_auth/request.rs`: `3a1b366462260d62ce7418603269c7a395ba74222c52692e96a5f44b7724ef2b`.
- SDK test executable: `cc7ec3a8d90f79e21c59dc637b270da72a375e041ca6970f469254e78f9b741e`.
- `evidence-sdk-packet3-checks/summary.json`:
  `e1b126d48a2217a5178f6de1cbce8845ee23520fd62e16b201deccef08c5dd48`.
- `evidence-hub-partition-a/hub-partition-a-probe1/summary.json`:
  `3cff12f109c05afbe5b8740119ec7cd0430ca1039f61d28815cadb948d6304ee`.
- Hub LLBC, 6,106,867 bytes:
  `315c5e3695f8eeb247849c80f9e88f524f071c17b43c4a4cd232807257db413d`.

The earlier [native routing qualification](2026-10-30-request-routing-native-qualification.md)
and [issuer expression checkpoint](2026-10-30-sdk-issuer-expression-refactor.md)
remain separate evidence. This checkpoint does not increase completed Lean coverage.
