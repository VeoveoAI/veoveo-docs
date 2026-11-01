# Factory watcher controls: stale metadata and wrongful refusal

Hub `d1215c2` publishes the two qualified watcher controls. Each deliberately faulty manual
model first produces an independently proved wrong outcome, then fails the
unchanged populated acceptance assertion. Both exact source restorations pass
fresh checks. The final six-history proof passes again with its original artifact
hash. This closes the scoped watcher-control checkpoint; Factory lifecycle
verification remains partial.

Sources: [positive assertion](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/factory_retarget/FactoryWatcherAdvanceControl.lean),
[stale-metadata witness](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/factory_retarget/mutations/FactoryWatcherLostMetadataWitness.lean),
[wrongful-refusal witness](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/factory_retarget/mutations/FactoryWatcherFalseRefusalWitness.lean),
and [source correspondence and receipts](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/factory_retarget/WATCHER_SOURCE.md).
The [six-history baseline](2026-10-31-factory-watcher-fixtures.md) and
[native concurrency correction](2026-10-31-factory-preparation-serialization.md)
are separate evidence.

## What the controls establish

Both start with the same actual modeled parent application: parent revision 2,
Frank's identity and the new program replace revision 1/Alice while still
targeting repository A. A queued linked update retains its old captured parent
metadata. Its current backing row and SQL projection come from that first
application; the source oracle distinguishes both parent revision and pusher.

1. **Lost current metadata.** The sole mutation chooses the captured candidate
   after the unchanged current-target relevance check. The independent witness
   proves that the true current row/query still names parent2/Frank, yet the
   continuation prepares parent1/Alice and produces the complete wrong row,
   client identity, provider material, native observation and request list,
   including the old program entries in argv.
2. **Wrongful refusal.** The sole mutation adds an equality requirement between
   captured and current parent revision/pusher. The independent witness proves
   that the target matches and current source is usable, yet the update is
   skipped with no Factory call. It checks the exact query/lock trace and proves
   whole-state equality with the first application's result. The required new
   linked output never appears.

For each mutation, the witness compiles with standard axioms only. The same
unchanged `ProgramAdvanceHistory` acceptance assertion then fails because
kernel-checked `decide` proves its expected-result conjunction false. The axiom
audit also rejects the resulting `sorryAx`; no failed positive-control artifact
is emitted. These are semantic failures, not parser, import, timeout or resource
failures. The two positive-failure logs are identical because they print the same
false proposition; the independent witnesses establish their different causes.

The controls mutate the handwritten executable model only. They add no
production check or refusal, and are not two newly discovered runtime bugs.
Generic History/Status proof artifacts are not reused or tested under these
mutations. The earlier native race and its fix retain their separate evidence.

## Execution and restoration

GPT-6.1 Sol authored and packaged the sources. GPT-6 Astra reviewed the exact
patches, independent expected outcomes, complete compiler logs and restoration
maps. GPT-6 Luna ran the bounded manual scripts on Ubuntu x86_64. Lean **4.35.0**
and Mathlib **56a005855ea17e0b0958f73ec801ae140b0a1679** were pinned;
`LAKE_NO_UPDATE=1` was set. Every Lean process had a 180-second bound.

| Phase | Sequential stage times, seconds | Total, seconds | Result |
| --- | --- | --- | --- |
| Positive baseline | Model 10.547; Fixture 4.677; assertion 20.666 | 35.894 | pass |
| Metadata fault | Model 8.429; Fixture 4.822; witness 22.912; assertion 9.933 | 46.100 | witness passes; assertion rejects |
| Metadata restoration | Model 5.523; Fixture 3.770; assertion 22.504 | 31.801 | pass |
| Refusal fault | Model 6.976; Fixture 3.771; witness 36.687; assertion 10.840 | 58.278 | witness passes; assertion rejects |
| Refusal restoration | Model 6.778; Fixture 4.573; assertion 25.919; six-history proof 92.624 | 129.899 | pass |

Each private fault graph reused only the qualified unchanged RetargetModel
artifact and pinned dependency graph. WatcherModel, Fixture, witness and
assertion artifacts were compiled fresh. Each restoration reversed the exact
one-file patch on that same private tree, verified all ten source files against
the original map, and removed the derived build graph before rebuilding. Only
the unchanged RetargetModel artifact was retained. Canonical model/fixture
sources never changed.

The final restored chain passes eleven guards and seven printed closures:
one guard/closure for the standalone assertion, plus ten guards/six closures for
the fixture proof. Successful closures contain only `propext`, `Classical.choice`
and `Quot.sound`. No new axioms or `native_decide` are used. Model, Fixture and
positive-control artifacts match the original baseline after both restorations;
the final six-history artifact also matches its earlier baseline.

The package commits the positive assertion, two isolated witnesses, two patches,
a nondefault manual Lake target and receipts. Scripts, logs and compiled
artifacts remain temporary. No CI hook, runtime change, dependency change,
application/native test, deployment or paid model call was added or run here.

## Evidence identities and limits

Proof main basis: `980bef64e9550ef68ef27e8272a572b7e46a50d3`.
Runtime source basis: `a69e3cba3f9865e06e1db5ff77d1562ac468338a`.
Complete source/tool/input/output identities are in the package receipt.

- Ten-file restored source-map SHA-256:
  `31667665f3e29b9003f189bfcbc9d659763f3bb1926f2fd7e2a006d2c4f3515c`.
- Positive assertion artifact: 35,112 bytes, SHA-256
  `d14b1106f7d84738cc49c700f4fdd30830dcebc2c6975ccd0ac01d1fae937e3d`.
- Final six-history artifact: 240,368 bytes, SHA-256
  `c3c7f44334e16a525c61aa92214ecb0d3c5047635f27c70b6f959f7addf3bab5`.
- Final restoration summary SHA-256:
  `06cfa18115840306fae4296177a4897bd411bcc702bc6b843880af3e2639d5ef`.

Temporary baseline evidence is at
`/tmp/hub-factory-concurrent-preparation-20261031/watcher-controls-baseline1-mirror/evidence-run1/`.
The four fault/restoration mirrors are under
`/tmp/hub-factory-concurrent-preparation-20261031/watcher-controls1/{case}/{phase}-mirror/evidence-run1/`.

This is model-level proof with explicit source correspondence, not extraction of
async Rust or formal SQL refinement. SQL observation/commit semantics,
process-local lock correspondence, external source/native operations, identity
and byte-format correspondence remain as documented. Issued `branch@LATEST`
commands do not establish actual checkout bytes. Saved-parent retry freshness,
membership removal, cross-replica ordering and eventual recovery remain open.
