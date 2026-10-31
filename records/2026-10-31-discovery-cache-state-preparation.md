# Discovery cache transition preparation

Six existing synchronous critical sections were moved from `SurfaceCache<T>` onto
its private `SurfaceState<T>`: read, begin, finish, cached-only invalidation, full
key invalidation and server invalidation, in Hub `f81159f`. Each async wrapper still acquires the
same mutex and calls the corresponding operation. Sampling of time and request
IDs remains at the original branch positions. No policy, capacity, retry interval,
external interface or dependency changed. This checkpoint prepares production
code for extraction; it establishes no Lean cache theorem or formal equivalence.

GPT-6.1 Sol implemented the factoring and compared the six normalized bodies;
GPT-6 Luna ran native checks on a frozen private source copy; GPT-6 Astra reviewed
the diff and qualification evidence. Removing only the lock binding and renaming
the local state receiver makes all six before/after body token sequences equal.
This is mechanical source correspondence plus review, not a compiler proof.

## Native qualification

The base is Hub `8543cc5bfca04320f86d5eda80962a1dfb208d07`, with the two-file
design/source overlay. The previous fingerprint fix and its regression file are
unchanged. Checks used macOS aarch64, Rust/Cargo 1.99.0, SQLX offline mode and the
existing warm target. The 1,083-file source map stayed unchanged during validation.

- Formatting passed in 0.651 s.
- Authorization: 8/8 tests passed in 30.776 s, including compilation and both
  authority-isolation regressions.
- Discovery: 13/13 tests passed in 2.929 s, including invalidation/replacement races,
  coalescing, retry, settlement and notification recovery fixtures.
- Exact existing actor/authority fingerprint test: 1/1 passed in 1.280 s.
- Strict library Clippy passed in 10.837 s.

These are command durations. The first fingerprint invocation omitted Cargo's
`--` separator and was rejected before running a test. That setup failure was
retained; only the corrected fingerprint command and remaining Clippy stage ran
afterward. Previously passing stages were not repeated.

The [committed receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/discovery_cache/evidence/native-state-factoring-20261031.json)
contains the exact commands, source identities, log hashes, test binary identity
and body correspondence. The receipt SHA-256 is
`10388f615b5f336f034d24116982efaed9e967a3ef935190a5b2c441322b43ac`;
the coordinator verified all six stage logs and the four frozen file hashes. The
test binary is 168,122,904 bytes, SHA-256
`aa434c08a5e3bbbbfaebbaf14683408e2715de46bc43af83545f7f8de273418d`.
No Linux build, deployment, broad Docker gate, model call
or new Lean proof ran. Changes are committed locally, not pushed in this slice.

## Remaining formal boundary

Two pinned-tool limitations were confirmed from source before attempting
extraction:

- Charon does not support selecting an inherent method by its impl owner. The
  identical method names on state and async wrapper cannot be separated by the
  proposed owner-qualified selectors.
- Aeneas's generated Rust `Result` effect has failure only; its WP state is unit.
  The pinned CLI provides no state-passing mode. A pure no-argument clock or UUID
  axiom has one fixed interpretation, so assuming it produces fresh observations
  over repeated calls would not justify an arbitrary native history.

No translator/backend patch or hidden state model was introduced. Extraction and
the observation/refinement approach remain pending. The intended contract remains
exact state transitions and their composition: stale completion changes nothing;
invalidation and generation changes fence earlier work; accepted completion keeps
the full payload and denied count, with explicit capacity eviction. Mutex
serialization, native collections, time and ticket freshness must be stated at
their actual boundary. `HUB-CATALOG-01` remains formally unproved.
