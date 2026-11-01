# Obsolete Computer completions preserve newer durable state

The existing real-PostgreSQL Computer operation test now covers late completion
of an obsolete operation, both during its successor and after that successor
finishes. All four obsolete writes return false and preserve the complete exposed
Computer projection. This confirms the existing SQL guard; no production fix was
needed. This checkpoint is native component evidence, not a Lean theorem.

Hub commit `8b7303d8351ebf356577666c981fbbe9747c79f0`, pushed to `origin/main`,
contains the test and receipt. GPT-6.1 Sol authored the test-only extension, GPT-6
Luna ran the focused and required repository checks, and GPT-6 Astra reviewed the
source, logs and immutable snapshot identities. The base is
`ef3c25dc79efa8fab080a62c804a6ad410edb6fc`.

## Scenario and observations

The existing fixture creates and authenticates a Computer, checks exclusive
replacement, failure preservation and a fresh retry. In its stale-operation phase,
operation A starts before the stale cutoff; a distinct operation B takes over.
The new assertions then execute:

1. A's late finish while B is active.
2. A's late failure while B is active.
3. A's late finish after B has successfully finished.
4. A's late failure after B has successfully finished.

After each call, the returned bool must be false and a fresh store read must equal
the prior snapshot across all seventeen exposed Computer fields. That includes
the full provision and operation snapshots, owner identifiers, custody request
identifiers and family, readiness, failure, notice, collection and keep-on state.
The existing B-success, notice-once and shown-notice-suppression assertions remain.
Storage-only columns, such as `created_at`, are not exposed by this query and are
not claimed as native observations.

The source change is 35 lines inside the existing test, with no new SQL or metadata
and no production derive change. All production bytes preceding the test module
are unchanged, SHA-256
`a3f056aa0f94ca2db750596e6e7dc800a09b78f32ee5870827400cf04342cd63`.
The resulting `store/computers.rs` SHA-256 is
`38c658e0984fdb0c44edaae6b8bbb57850bf2eccf121b0665cf993f1ade34cd7`.

## Qualification

The exact focused Linux command inside the existing test image was:

```sh
cargo test --locked -p veoveo-hub --lib store::computers::tests::one_replacement_runs_at_a_time_and_its_notice_is_told_once -- --exact --nocapture
```

It ran against the existing disposable PostgreSQL/Core/Hub fixture: **1 passed**,
0 failed, 337 filtered, **1.41 s** test time. Hub compilation took **20.84 s**;
the outer Docker build took **25.406 s**, exit 0. The test retains its existing
90-second internal bound. Rustfmt and diff checks passed without a formatting change.

Both required `docker build --target check .` runs used the same frozen source:

- Mac Docker Desktop: **exit 0**, **155.107 s** total; nextest **41.204 s**,
  **475 passed, 2 skipped**. The changed test passed in **0.526 s**.
- Ubuntu Linux x86_64: **exit 0**, **165.814 s** total; nextest **44.488 s**,
  **475 passed, 2 skipped**. The changed test passed in **3.452 s**.

The skipped cases are the existing ignored BuildKit/registry image test and native
upstream private-fixture test. They were not run. No OpenShell deployment or paid
model call was involved.

The 1,286-file source map SHA-256 is
`258e3c9a38a4d2936f08f92909e753334b3b92befc69e9b109a738d3acc7bd61`;
the 879-file nonproof build-input map is
`a0c0387662f9348bfbbf00b857aeed17dd295e1048cb5d1a67211c960c18c1d8`.
All snapshots and Docker context maps remained unchanged. Root independently
compared the 1,286 files with canonical before the coverage edit, and verified
actual byte lengths and hashes for the three logs:

- Focused: 5,201 bytes,
  `b7569cb6751db836037c0271dba88d873eda60f93c61fdc4d996df7c223c3600`.
- Mac: 490,279 bytes,
  `585f98015f0bb9a5b36f367f24487f799f9a592eace6b2a51351961284ad91e0`.
- Linux: 490,111 bytes,
  `51d95ec2e2049a1b5dc0945a482fc81a3cb5a82db588a55fef459c6a1c70ab6c`.

The focused image measured test-binary SHA-256
`86f8f6aeda9170fd65207dd9452e6965a1c1413760b6da4ed3983375399d3a93`,
recorded in its log. A binary byte count and independent binary copy were not
recorded. The image identity is
`sha256:68fe89568408bc0f9996b416edc81133e19c56a49a6eed805b961eb2860e45a8`.
The [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/computer_lifecycle/evidence/native-stale-completion.json)
records command, source and evidence details. Full local evidence is at
`/tmp/hub-computer-lifecycle-20261101/native-stale-completion1/`.

Two instrumentation issues are retained without reclassifying them as test failures.
The initial BSD tar added AppleDouble files and failed the source-map gate before
compilation; portable repackaging restored the exact map. The focused summary's
parser missed markers prefixed by Docker's `#20`; the original summary remains,
and the actual log supplies `cargo_test_exit=0` and the binary hash.

## Boundary

This verifies durable SQL completion behavior through native store methods. It
does not establish formal SQL refinement, real OpenShell ordering, persistent-home
survival, browser recovery or cancellation of accepted native mutations. An old
operation can be unable to publish its result while its already accepted native
request still has side effects. The source-mapped Lean replacement model is being
authored separately; it has not yet compiled at this checkpoint.
