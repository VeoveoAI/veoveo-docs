# Direct and delegated assertion expiry

SDK commit `201f815` corrects documentation and adds a focused native regression for
an existing behavior: a direct assertion is bounded by the original source token's
expiry, while an admitted delegated continuation is bounded by its delegated
authority. It may preserve source context whose original token has expired.
**No production code, authorization rule or dependency pin changed. No new Lean
theorem is claimed.**

GPT-6 Astra reviewed the source and corrected the owning design, GPT-6.1 Sol wrote
the test, and GPT-6 Luna formatted and ran it. This was part of defining the exact
contract for the [request-composition proof](2026-10-30-request-composition-extraction.md).
The SDK issuer implements the exception in `internal_auth.rs::create_identity`; its
verifier mirrors the direct-only source-expiry check. The previous documentation
incorrectly described that check as universal.

The new test is
`internal_auth::request_tests::admitted_task_delegation_outlives_source_expiry_without_renewing_its_deadline`:

1. Set the preserved source token's expiry five minutes in the past. Issuing a direct
   request returns `ExpiredDelegation`.
2. Add an immediate acting server and an inherited originating Task context with a
   delegation deadline five minutes in the future. Request a later expiry. The issuer
   caps it to the delegation deadline and produces a bearer the actual SDK verifier
   accepts. Profile, server, deployment, resource audience, OAuth client, actor,
   authority, permissions, original context and Task/actor chain are preserved.
3. Move the delegation's own deadline two minutes into the past. Issuance again
   returns `ExpiredDelegation`.

The Task context is a **synthetic representation of Hub admission**. This test does
not read a native Task, establish its liveness, or establish the Hub's exchange checks.
It uses empty granted permissions, which are valid for authenticated-only requests.
It verifies this SDK boundary, not broad authorization acceptance or deployed recovery.

On macOS ARM64, Rust/Cargo 1.99.0, from SDK base
`130b79961109021592ac48c87db9f4b3ea8a2a48`, the exact command was:

```text
rustup run 1.99.0-aarch64-apple-darwin cargo test --locked -p veoveo-hub-sdk --lib internal_auth::request_tests::admitted_task_delegation_outlives_source_expiry_without_renewing_its_deadline -- --exact --nocapture
```

It exited 0: **1 passed, 159 filtered**, **0.01 s** test body and **101.039 s** Cargo
elapsed time. The existing shared Cargo target needed dependency compilation; this
was not a 101-second test body. No broader test group, semantic mutant, full Docker
gate, deployment or model-driven acceptance run was performed for this test-only change.

SHA-256 evidence:

- Formatted test source: `1cb770ec102e49fc2cb10ca976e0674edfb1a6aa7e9b803274c5796471a9f4c0`.
- Test executable, 92,775,088 bytes: `fc8fce79c2935fefa4efdf48a4b1f61a691c5356a60eecc3b5de4462803823bd`.
- Cargo log: `9915493e34782192c9a43cae34a14a426d6a200d51faaebde11aa8d8f3dae567`.
- Run summary: `d62f8645b46321bcf7357465e8ca99b666ca78d15e6b787b5cc4b57c7e6f1b94`.
- Executable-identity continuation: `4064c973f6399f36ed19dddd44946c3bc59956986581348da189c70b27369d5f`.

Logs and exact inputs are in
`/tmp/hub-request-composition-20261030/evidence-sdk-delegation-deadline-test/`.
The runner initially missed Cargo's `Running unittests` line when collecting executable
identity; the separate continuation hashes the actual logged executable. The test
was not repeated merely to correct that evidence parser.
