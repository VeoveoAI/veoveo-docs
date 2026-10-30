# Refresh transaction native baseline

The four new PostgreSQL tests and five existing `hub_state` tests passed. Hub
commit `f6e679e` records this native-test milestone. This is neither a formal
transaction proof nor deployed qualification; mutation controls remain pending.

GPT-6.1 Sol implemented the fixtures, GPT-6 Luna ran the unattended checks, and
GPT-6 Astra reviewed the source correspondence, results and recorded log hashes.
No model-provider calls were made.

The new tests use two HubState clients, the actual refresh store, delivery cipher
and Core audit append against private PostgreSQL 18.6. Fixtures use a four-second
delivery window and microsecond-aligned stored timestamps. Their scenarios are:

- Hold a real rotation transaction after its actual audit append. Observe the
  second request blocked through PostgreSQL, then release the first. The second
  request receives the same plaintext successor through native authenticated
  decryption and digest validation. Compare the full stored family/token fields
  and the exact winning rotation and duplicate audit records.
- Fail after a real duplicate audit append. Compare the complete before/after
  snapshot after rollback releases the lock; a later retry succeeds with the
  original successor.
- Accept one nanosecond before the stored delivery deadline and detect replay at
  equality. Check the committed replay/revocation effects and unchanged successor.
- Exercise logout followed by replay and replay followed by logout. Preserve the
  first revocation reason and timestamp in both orders.

The existing five tests cover successor-envelope clearing, concurrent audit writes,
rotation rollback on audit failure, shared single-use state, and bound/idempotent
family revocation. All assertions passed; token plaintext and ciphertext stay out
of this report.

Execution used macOS ARM64, Rust `1.99.0-aarch64-apple-darwin`, SDK `239622d`, and
Core `120306e`. SQLx metadata was prepared from Core and Hub migrations: four new
records, with all 255 prior records unchanged. The accepted snapshot's source bytes
match the committed fixture files and metadata.

The logged command sequence was PostgreSQL version check (0.023 s),
`cargo fmt --all -- --check` (0.577 s), targeted Hub clean (0.529 s),
`cargo test --locked -p veoveo-hub --lib state::refresh_tokens::transaction_tests:: -- --nocapture`
(37.443 s including compile; 4 passed),
`cargo test --locked -p veoveo-hub --test hub_state -- --nocapture`
(35.213 s including compile; 5 passed), and
`cargo clippy --locked -p veoveo-hub --lib -- -D warnings` (12.705 s).
The test binaries reported 1.53 s and 1.24 s for execution respectively.

The first runner invocation used Mac paths on Linux and stopped before any baseline
stage. The successful run executed locally on the Mac. There was no production
failure or behavior change. Test access is through an ordinary private Rust child
module; no production hooks or visibility changes were added.

The [compact receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/current_roles/evidence/refresh-native-baseline.json)
contains exact source hashes, commands, log hashes and binary identities. Its raw
summary is `/tmp/hub-refresh-concurrency-20261030/native-refresh-baseline1-run1/summary.json`,
SHA-256 `488c4f146304ef189676875506e3a7ae91cbeb42b195a603e28c3731edca63c7`.
These native component results cover controlled schedules. They do not establish
all concurrent schedules, SQL refinement, HTTP/IdP behavior, cryptographic security,
or live Linux deployment behavior.
