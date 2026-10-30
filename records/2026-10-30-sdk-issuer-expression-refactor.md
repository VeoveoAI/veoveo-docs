# Issuer expression refactor for extraction

SDK commit `b6912ce` changes two private expression spellings after the pinned Aeneas
backend rejected their iterator and function-item interfaces. It preserves the
authorization contract:

- `prior_actors` uses an `if let` and `for` loop instead of
  `Option::into_iter().flat_map(...).fold(...)`. Both walk the inherited actors in the
  same order, clone the same client IDs, allocate one nested box per inherited actor
  and put the immediate actor outermost.
- `fresh_jwt_id` uses an explicit `Result` match instead of passing the
  `InternalTokenError::Identifier` constructor to `map_err`. Both return the parsed
  identifier or the same wrapped identifier error.

The allocation and ordering comparison is source review, not a benchmark or a formal
equivalence theorem. There is no new check, permission rule, helper service or public
API. The owning design's behavior is unchanged. Hub still pins SDK `239622d`; this
new SDK source has not been integrated into that Hub pin or deployed.

This also corrects an attribution in the preceding
[extraction record](2026-10-30-request-composition-extraction.md): the unsupported
slice iterator `find` is reached through the standard iterator path of `prior_actors`
at `exchange.rs:74–82`, not through `validate_delegation`. The issuer's permission
set guard is unchanged.

GPT-6 Astra reviewed and committed the change, GPT-6.1 Sol implemented the two source
edits, and GPT-6 Luna ran the bounded native checks. On macOS ARM64, all commands used
`rustup run 1.99.0-aarch64-apple-darwin`:

- `cargo fmt --all -- --check`: passed in **0.282 s**.
- `cargo test --locked -p veoveo-hub-sdk --lib internal_auth:: -- --nocapture`:
  **34 passed, 126 filtered**, **0.36 s** test body, **6.591 s** Cargo elapsed time.
  This includes existing actor-chain checks and the new direct/delegated expiry case.
- `cargo clippy --locked -p veoveo-hub-sdk --lib -- -D warnings`: passed in **53.197 s**.

The tested input was SDK base `201f8150dcc6fe294deaf8501e3142f853faa7f8` plus the two
edits now committed in `b6912ce`. Source hashes were unchanged across all checks:

- `internal_auth.rs`: `3b5d5135a8c8d4d736dc9e2c01645adb77ea13e7e93ee450ef064d79849acb7d`.
- `internal_auth/exchange.rs`: `cffc732039670d37dee2e4b60da90cbc712ec2bfcd257d5ec22d7ebb8680c2e9`.
- `internal_auth/request_tests.rs`: `1cb770ec102e49fc2cb10ca976e0674edfb1a6aa7e9b803274c5796471a9f4c0`.

The actual unit-test executable named in Cargo's log has SHA-256
`5b4daa002f70744a2caf0643b1df4ce739fc954737da56a135834b72c65e7e03`.
The test log is `2caa26b31dafdcfcf8b7b839b3d10d0eb7fdbec4b664df8162fff5ea5d8aded1`;
the Clippy log is `f35ee0a3a517e417cdba1610fde092a1ff9a16b0a384b56acb0eb1f4abd0f376`;
the complete summary is
`35d1ef7fdf176a47d78c8ebb46ea2783a33205ddf7e4748fae03cf5acb85cff0`.
Inputs and logs are under
`/tmp/hub-request-composition-20261030/evidence-sdk-internal-auth-checks/`.

These checks qualify the small source change at the native component level. They are
not a new Lean proof, a semantic mutation check, a full Docker gate or deployed
acceptance. The next extraction packet retains actual issuer, permission, context,
deadline, claims and actor-chain bodies. It makes identifier parsing explicitly
fallible and uses a separate first-dot string adapter model; their correspondence is
an explicit boundary, not an assumed successful identity or ownership decision.
