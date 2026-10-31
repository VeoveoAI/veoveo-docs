# Cache operations receive lazy observations

Hub `688b91a` gives the private synchronous cache operations unique names for extraction.
`start` accepts `FnOnce` clock and UUID functions, and `complete` accepts a clock
function. Their existing locked async wrappers pass `Instant::now` and
`Uuid::now_v7` as function items. Passing them performs no observation. All calls
remain in their original branches, with the same guards and mutation order.
There is no new provider service, field, policy, rejection or external interface.

This addresses two observed tool limitations without modifying the translator:
owner-qualified inherent method selection is unavailable in pinned Charon, and a
fixed no-argument Lean axiom cannot represent fresh values on repeated calls.
Generic operation inputs allow different observations to be represented per call.
Correspondence between native observations, lock serialization and the modeled
history still needs an explicit boundary. This checkpoint has no extraction result
or new formal theorem.

GPT-6.1 Sol changed the owning design first, implemented the two-file change and
compared operation bodies; GPT-6 Luna formatted and checked a frozen source copy;
GPT-6 Astra reviewed the diff, correspondence, source and log hashes, actual test
counts and executed binary. The source base is Hub
`f81159fbb9f049422682df41e7c1eff420d80968`; the frozen overlay and unchanged prior
fingerprint fix/regressions are recorded in the receipt. Normalized method bodies
differ only at the two clock calls and one UUID call, which invoke their supplied
functions instead of the native function directly.

Native macOS aarch64 checks used Rust/Cargo 1.99.0, SQLX offline mode and the warm
target. The 1,083-file source map stayed unchanged:

- Formatting: 0.601 s.
- Authorization: 8/8 tests, 33.012 s including compilation.
- Discovery: 13/13 tests, 2.819 s.
- Exact existing fingerprint test: 1/1, 0.349 s.
- Strict library Clippy: 9.366 s.

These are command timings. Before Cargo started, a copied runner's stale evidence
path caused one assertion failure. The path was corrected, then the checks above
ran once. That initial traceback was observed in tool output; no separate failure
artifact or timing was retained. It is not a failing Rust test.

The [native receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/discovery_cache/evidence/native-lazy-inputs-20261031.json)
contains exact commands, five log hashes, four frozen source hashes, source-map
identity and body correspondence. The executed test binary was 168,121,992 bytes,
SHA-256 `ea7b84f25ee51bcb3830222089cc1ec2d03f5f4800af2c6c20e4da63466ee030`.
The raw native summary also hashed unrelated old target objects; the compact
receipt records only the binary named by the actual test logs.

A bounded cache-only extraction is the next step. Its six roots must remain
transparent, including the actual predicates and derived key operations. Exact
normal-return transitions, full payload preservation, invalidation and generation
histories are still unproved. Callback failure/divergence does not establish a
post-panic state guarantee. Native clock, finite-history UUID uniqueness, map and
payload laws, and mutex correspondence remain explicit obligations. No broad
Docker gate, deployment, paid model call or push ran in this checkpoint.
