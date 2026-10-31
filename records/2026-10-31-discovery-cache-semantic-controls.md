# Discovery cache actual-source semantic controls

Two deliberate source-fault control classes are qualified: retaining old in-flight
work across a generation advance, and admitting a wrong ticket when its key is
present. Each compiles natively and fails an unchanged cache assertion; its freshly
extracted model compiles and an unchanged exact-operation theorem rejects the wrong
state. Same-tree source/raw restoration and fresh baseline proofs pass afterward.
Hub `2f5feef` commits these controls and their evidence. They demonstrate sensitivity
of the supported cache contracts, not new production defects.
**HUB-CATALOG remains partial.**

GPT-6.1 Sol prepared patches/runners and these artifacts. GPT-6 Luna executed the
unattended native/extraction/Lean commands; GPT-6 Astra reviewed complete native
logs, raw deltas, intended proof residuals, restored logs and identities. Runtime,
generated/model/proof sources and dependency pins remain unchanged. The preceding
finite-history proof checkpoint is Hub `5aa01ef`.

## Inputs and execution boundary

The native source is qualified Hub `688b91a`, represented by the accepted `f81159f`
archive plus its lazy-input/name overlay: **1083 files**, full-map SHA-256
`54570dc18dfce26e2c34be201fe02a386f465c88df7fca2c4fd75a1a25f731ee`.
Original `discovery.rs` is
`4413008d7edfc56559857cb184351464f707ceb7dd21972cfa501e4bd01c77f0`.
Each fault changes only that file in a new private tree; the other 1082 files stay
identical. SDK is `154a473`, Core `120306e`.

The [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/discovery_cache/evidence/semantic-controls-20261031.json)
records exact source/tool/packet identities, all commands, logs, executed native
binary hashes, raw files, fresh own OLeans and input maps. It distinguishes two
required qualified controls from the superseded interface-pruning candidate.
No bulky runner framework, full LLBC, build products or synthetic model witness is
committed in place of the actual implementation.

Native checks use Rust `1.99.0-aarch64-apple-darwin`, the recorded warm Cargo target
and `SQLX_OFFLINE=true`, with database/compiler override variables removed. Exact
tests run as:

```sh
cargo test --locked -p veoveo-hub --manifest-path <private-source>/Cargo.toml --lib <exact-test> -- --exact --nocapture
```

Extraction retains the accepted five synchronous roots, eighteen includes and zero
explicit opaques, Rust nightly `2026-09-17`, and the exact Charon/Aeneas binaries.
All five own roots, required FnOnce callbacks, four key derives and actual SDK TTL
initializer remain transparent and error-free. Generated Types/Funs are never
hand-edited. Lean is 4.35.0 with the previously qualified private Aeneas dependency
and existing discriminant instance-name patch; no new tool change is introduced.
Clean unpatched upstream reproduction remains unmeasured.

## Native faults and exact assertions

Native times below are whole Cargo command durations, including compilation.
The selected test bodies take approximately 0.00–0.01s; these are not cache-operation
latency measurements.

| Fault / exact test | Mutant | Same-patch restored source |
|---|---|---|
| [Generation clear](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/discovery_cache/mutations/generation-clear.patch) / `mcp::discovery::tests::discovery_is_coalesced_and_catalog_generation_is_monotonic` | Exit 101, 0 passed / 1 failed, **33.092 s** | Exit 0, 1 passed / 0 failed, **10.829 s** |
| [Original ticket presence](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/discovery_cache/mutations/ticket-presence.patch) / `mcp::discovery::tests::invalidated_in_flight_response_cannot_replace_new_contents_or_finish_new_request` | Exit 101, 0 passed / 1 failed, **31.525 s** | Exit 0, 1 passed / 0 failed, **12.078 s** |
| [Equality-retaining ticket fault](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/discovery_cache/mutations/ticket-equality-retained.patch) / same ticket test | Exit 101, 0 passed / 1 failed, **31.325 s** | Exit 0, 1 passed / 0 failed, **9.995 s** |

All three variants compile and execute their selected test. Generation fails at
`discovery.rs:866`, original ticket presence at `:912`, and its alternate at `:914`:
old `key(1, "one")` cached items must be absent, but late work repopulates the old
cache. These are intended semantic assertions, not Cargo, fixture or interface
failures. Each mutant aborts at the first assertion; later replacement-completion
assertions are not claimed as measured mutant outcomes. The original ticket fault
also emits an expected nonfatal warning that `request` is unread.

Each exact patch is reversed in its own private tree, the original full map is
verified, and the selected test passes. The actual executed binary is hashed after
each command, before a later rebuild can overwrite it. No endpoint, HTTP, deployed
or model-inference result is inferred from these native tests.

## Formal semantic rejection and the interface diagnostic

Every model/proof phase creates a fresh own source/build package from committed
`5aa01ef` proof sources. It starts with **no own build artifacts**. Only qualified
external dependency packages are reused; no old model/proof OLean or companion is
imported against changed Funs. All inputs are gated around each command. The model
must compile before an unchanged proof rejection counts.

| Required control | Fresh model and prerequisites | Intended unchanged theorem failure |
|---|---|---|
| Generation clear | Model **9.791 s**, KeyFrame **2.827 s**, StartSpecification **2.582 s** | StartProof **2.926 s**: `start_exact` retains old `state.in_flight`/inserts into that map instead of the required newer-generation reset/singleton |
| Equality-retaining ticket | Model **8.841 s**, KeyFrame **2.676 s**, StartSpecification **2.630 s**, StartProof **2.981 s**, CompleteSpecification **2.629 s** | CompleteProof **2.984 s**: `complete_exact` stale case requires a whole-state no-op, but the key-present branch consumes the ticket and can write cached/failed state |

Neither failure is a missing name or type mismatch. The alternate's
`ticket_guard_exact` still elaborates with only standard logical axioms. Executable
audits reject cascading `sorryAx` from each failed target; neither failed target
emits an OLean. No failed theorem is accepted as a qualification artifact.

**Unplanned control adjustment.** The first ticket-presence extraction is an
unqualified formal candidate. It removes generated Option/UUID equality dictionaries named by
unchanged `CacheCompleteProof.ticket_guard_exact`. Root rejected it at source
review before Lean: a missing-name failure would not test semantics. Its native
wrong behavior and exact source/raw restoration remain valid separate observations.
No Lean command or theorem rejection is claimed for it, and no generated/proof
adapter is changed to conceal the missing interface.

The alternate retains the ticket comparison and conjoins key absence. A wrong
present ticket is still admitted, but the equality dependency survives. Its raw
change preserves both dictionaries and external templates; Types differences are
source-span comments. This is a test-fault revision, not a production behavior or
proof-contract change.

## Exact restoration and fresh baseline qualification

Both required patches are reversed **in the same extraction source trees**.
The original 1083-file map and all four accepted raw files restore byte-for-byte,
including templates and metadata. The earlier unsuitable ticket candidate also
restores its map/raw4 exactly; its formal run is deliberately skipped. A new LLBC
hash is recorded per extraction; equality to an older LLBC is not asserted.

| Restored required control | Fresh extraction | Fresh model | Nine unchanged proof leaves |
|---|---|---|---|
| Generation clear | Charon **28.617 s**, Aeneas **1.117 s** | **9.448 s** | **2.528–3.082 s** each, all pass |
| Equality-retaining ticket | Charon **28.723 s**, Aeneas **1.069 s** | **8.990 s** | **2.586–3.130 s** each, all pass |

Each restored package returns 0 for all **10 stages**, rebuilding four model modules
and nine proof leaves. All nine proof OLean hashes match the earlier accepted
artifacts. The alternate's nine proof logs are byte-identical to the generation
baseline; accepted completion/state/history logs are unchanged. Root inspected
all restored logs: no errors or `sorryAx`, and all executable guards retain only
their previous standard logical/exact native `Instant.add` boundaries.

The four model OLeans are freshly built and their actual hashes/byte sizes are
recorded. Their differences do not establish a cause, and this record does not
claim binary identity of all thirteen modules. Source/raw restoration and measured
successful proof checks are the qualified claims.

## Scope retained

The native ticket fixture invalidates by server. The checked finite-history fence
uses actual key invalidation. Server-wide `discard_server` and mutable retain
callbacks remain outside the supported five-root graph because of the measured
FnOnce/FnMut interface limitation; these controls do not close that obligation.

Native representation, map/order, allocation/destructor, descriptor clone/equality,
time and async mutex/observation refinements remain explicit. There is no universal
UUID freshness, structural payload equality, impossible global hash injectivity,
post-panic state, liveness or native scheduling claim. Hash-based authority identity
requires collision freedom only for relevant finite observed contexts. The existing
native `Instant.add` Result boundary remains visible.

The next coverage work remains server-wide invalidation's translation boundary and
production-linked catalog-cursor/listener isolation and freshness. Supported cache
histories and these source controls do not establish reconnect delivery, actual
client caching or cross-replica notification reliability. The full
[HUB-CATALOG-01 ledger](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/README.md#hub-catalog-01--requestcatalogcachelisten-isolation)
therefore stays partial.
