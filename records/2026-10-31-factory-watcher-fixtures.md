# Factory watcher: six populated complete-output histories

Hub `980bef6` publishes six concrete watcher histories whose full expected
outputs are independently specified. The proof imports only the fixture and the
two executable models, not the earlier generic correctness proofs. All ten axiom
guards pass: four fixture facts and six execution assertions. This is the checked
baseline for the next deliberate model faults; those controls are still pending.

Source: [fixture](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/factory_retarget/FactoryWatcherFixture.lean),
[execution assertions](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/factory_retarget/FactoryWatcherFixtureProof.lean),
[source mapping and receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/factory_retarget/WATCHER_SOURCE.md#checked-populated-watcher-histories).
The [generic histories](2026-10-31-factory-watcher-histories.md) and
[status contracts](2026-10-31-factory-watcher-status.md) remain separate checks.

## Scenarios and output evidence

- Parent retarget A→B, then the old A event: complete B row, client, native
  observation, provider material and issued request remain; no second Factory call.
- Same repository A, tracked branchA→branchB: the captured branchA event likewise
  leaves the complete branchB outputs intact.
- Parent2/Frank replaces parent1/Alice while still targeting A. The captured old
  candidate accepts the new linked event using current source entries and image
  observations. Both complete issued requests, argv, client and row are checked.
- A selected native delete error constructs the exact failed row and event
  prefix. Logical preparation still succeeds; the native error remains in its
  separate result channel and watcher status clearing is attempted and committed.
- A preparation error publishes the complete timestamped failure despite a lost
  status reply. An actual later parent call clears that key; another watched
  deployment's complete failure for the same runner remains unchanged.
- Requested B cannot resolve, recorded A applies successfully, and B's complete
  timestamped resolution failure stays recorded despite a lost publication reply.

Every continuation takes its backing row and current SQL projection from the
actual first operation. Expected output values are not intermediate-state
premises. The source oracle indexes both parent revision and pusher; old/current
coordinates return different own trees, entries, images and native observations,
and crossed coordinates refuse. The initial projection, runner representation
and singleton SQL-key uniqueness are checked explicitly.

Review caught an inconsistent fixture before validation: following links named
tracked branch IDs different from the parent branch ID. The frozen examples use
coherent pinned links instead. This was fixture repair, not a production defect.
Separate observed provisioning and ready states do not prove native readiness.
Schema/identity, external preparation/resolution, URL/protobuf, SQL and process-local
serialization assumptions remain those of the manual model. These are synthetic
modeled executions, not deployment or native sandbox evidence.

The coordinator independently checked all four public synthetic token/digest
pairs and exact runner-script bytes against current Rust. The script is 696 bytes,
SHA-256 `dd5d553375a987f734834cacf6dd72c8eddb7f15c9b41c29bf05f284b952b9d1`.
Its branch@LATEST argv proves neither an executed checkout nor source bytes at
the recorded revision.

## Execution

GPT-6.1 Sol authored the sources; GPT-6 Astra reviewed scenarios, independent
expected values, byte correspondence and complete compiler output. GPT-6 Luna
ran two sequential bounded checks on Ubuntu x86_64, using Lean **4.35.0** and
Mathlib **56a005855ea17e0b0958f73ec801ae140b0a1679**:

```sh
LAKE_NO_UPDATE=1 lake env lean FactoryWatcherFixture.lean -o .lake/build/lib/lean/FactoryWatcherFixture.olean
LAKE_NO_UPDATE=1 lake env lean FactoryWatcherFixtureProof.lean -o .lake/build/lib/lean/FactoryWatcherFixtureProof.olean
```

Both passed on the first attempt: fixture **5.474 s**, proof **92.718 s**, combined
**98.193 s**. Each command had a 180-second bound. The fixture log is empty; the
proof log contains six closure prints using only `propext`, `Classical.choice`
and `Quot.sound`. All ten guards pass. Local maxRecDepth 4096 scopes only the six
execution assertions; no global checker or runtime change was made.

All seven source files and the two accepted model source/artifact pairs were
unchanged; both new artifacts were absent before compilation. No generic proof
artifact was used to establish these executions. Production source, previous
models/proofs and pins remain unchanged. No application/native test, deployment,
deployed probe or paid model call ran for this proof-only checkpoint.

## Evidence identities

Runtime basis: `a69e3cba3f9865e06e1db5ff77d1562ac468338a`; proof main basis:
`abfb89b`. Temporary mirror:
`/tmp/hub-factory-concurrent-preparation-20261031/watcher-fixture-check1-mirror/evidence-run1/`.
The package retains source, manual targets and the compact receipt; artifacts/logs
stay temporary.

- Fixture source: 24,962 bytes, SHA-256
  `95d51027444224916177170887fc645466f5cfaf72cefc647b88f4258d7077ca`.
- Proof source: 4,925 bytes, SHA-256
  `e66abae0f8ba792c3dee725648fc2fa69ecd17fc8a81878cc2750be488bd3a6f`.
- Fixture artifact: 929,656 bytes, SHA-256
  `a95c2fd70cad74f7dc156ef8786796691259b8fef0479420be6b43236070e553`.
- Proof artifact: 240,368 bytes, SHA-256
  `c3c7f44334e16a525c61aa92214ecb0d3c5047635f27c70b6f959f7addf3bab5`.
- Input receipt SHA-256:
  `b75d802924c4b67cee11ddfb94c723c8cdcc8f16b96e3b2bd2878289627c63fc`.
- Unchanged source-map digest:
  `38792a044940d74ff78a5dc0879d91ade28ca7ceb01730c080e2a6d5a82bae7c`.
- Proof log: 778 bytes, SHA-256
  `0e5dfbe1beadb535f0b1985eb784ec7b84c9f1778a50ae207d9c4127fdd1f820`.
- Summary SHA-256:
  `27ace507de8ba6859b7adf863a43174ad621dd9d792d293b9647acfcc476d97c`.

Next: the independent wrong-output witness for lost current metadata, the
wrong-refusal witness for an overstrict captured-parent equality guard, rejection
by the unchanged positive assertion, and exact restoration with fresh checks.
The broader native/distributed/liveness gaps remain unchanged.
