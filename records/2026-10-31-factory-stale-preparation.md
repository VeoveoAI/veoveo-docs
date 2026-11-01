# Factory: stale linked preparation undoes a completed retarget

A deterministic component regression on Hub
`d7225ca929c9b5efb1a06d5a639611e1460d3ee8` reproduces a new concurrency defect.
A parent follower finishes moving a same-name runner from repository A to B. An
older linked-A update, prepared before the existing runner mutex, then restores
the complete stored target and native command to A. Credential lookup and later
push routing also follow A again. No production code has been changed or deployed
in this checkpoint; correction remains pending.

This is distinct from the earlier omitted-target-column defect fixed in `48d7e25`.
The current sequential retarget implementation updates those columns consistently.
Here, an obsolete operation consistently restores an obsolete target. The manual
proof's sequential/current-input boundary does not establish freshness of source
prepared by independent followers before their shared lock.

## Deterministic scenario and observation

GPT-6 Astra reviewed the source path and test; GPT-6.1 Sol added the test fixture
and regression; GPT-6 Luna ran the exact frozen component test. The fixture uses
actual Hub Factory/watch code and private PostgreSQL, with synthetic Lore,
OpenShell and image-builder endpoints. It does not run a deployed sandbox or a
real Lore checkout.

1. Finish initial parent revision 1 and linked-A follower setup: the runner serves
   A, tracked branch ID 1 and linked revision c.
2. Enqueue A's revision e as Carol. Pause its next parent-revision-1 read after
   `linked_pushed` has captured the existing Runner. The fixture's state mutex is
   released while the read waits.
3. On the independent parent follower, apply parent revision 2, retargeting the
   same link to B, tracked ID 2 (`release`), linked revision d as Dave. Wait for the
   complete event handler, including failure-status publication, and capture the
   runner, full native command and actual client lookup.
4. Release the old A read, wait for that complete handler and capture the same
   outputs. Then apply a future B/f push, followed by an A/a push, observing the
   complete outputs after each.

| Observation | Actual target / parent / linked revision | Actual linked client |
| --- | --- | --- |
| B completed, before releasing old A | B / 2 / d | B, Dave |
| Old A continuation completed | A / 1 / e | A, Carol |
| Later B/f push completed | A / 1 / e | A, Carol |
| Later A/a push completed | A / 1 / a | A, Carol |

The native command's repository URL and tracked branch ID match each observed
target above. The deployment identity stays unchanged. The expected final three
snapshots retain B and parent revision 2, then advance B to f and preserve it
across the later A push. All observations are taken before the aggregate assertion,
so an early stored-row mismatch cannot hide command/client/routing behavior.

The test-local stream's drain marker acknowledges the next poll after a complete
handler. It emits no Lore event and performs no recheck that could repair the
state being measured. Gate and drain waits have 60-second bounds; ordering does
not depend on sleeps.

## Execution and identities

The private source is `git archive` of the exact base plus one overlaid file:
`crates/veoveo-hub/src/bin/hub/contributions/lore/factory/tests.rs`. Production,
SQL, dependency pins and proof sources are unchanged. Rust/Cargo
`1.99.0-aarch64-apple-darwin`, PostgreSQL 18.6 and `SQLX_OFFLINE=true` were used.
The existing bounded runner reused the warm Mac target; test-owned PostgreSQL
handled fixture setup and cleanup.

```sh
cargo test --locked -p veoveo-hub --bin veoveo-hub \
  contributions::lore::factory::tests::a_stale_linked_preparation_cannot_undo_a_completed_parent_retarget \
  -- --exact --nocapture
```

Exactly one test ran: zero passed, one failed, 63 filtered out. Its body took
1.71 seconds; the complete Cargo command took 37.732 seconds and exited 101.
The intended final output assertion failed, after the valid before-release B
snapshot. No timeout, compiler failure or setup error is classified as a finding.
All 1,177 source files and 847 build-input files retain their pre-run identities.

Temporary evidence root:
`/tmp/hub-factory-concurrent-preparation-20261031/test-only1/`.

- Input receipt SHA-256:
  `3ff849918930c2124f8abc8126e5cb7e2a2fab85cdf4c40ca3bc9c6087a56729`.
- Overlaid test file: 97,169 bytes, SHA-256
  `c02ab6bbf7090b4da42f498d5726be3dda4cdc4d1ebc1796b253a33bcf23901c`.
- Test patch SHA-256:
  `e31a01fac946dd20ccf9038da847313adf760d0e6d815ba684dc9cbb52567a4c`.
- `evidence-run1/summary.json` SHA-256:
  `213614ceeeffc585ee8eae181705d3c6ed4cf5103da4aa264171632c2d2d04c2`.
- Full log: 16,620 bytes, SHA-256
  `c8cadc08158d55fc51db4d58028946a7acbf864b805ab14bb5e32a69cb23ed20`.
- Actual test executable: 97,792,184 bytes, SHA-256
  `9077c933987968043299a05c23494caed660f742201e4fe648d27c763d2e445a`.

## Cause and next work

`linked_pushed` reads a Runner before `reapply` prepares its old parent revision
and link. Only `change_runner` takes the per-runner mutex. A parent follower can
complete a retarget between that read and lock acquisition. Cancellation of a
replaced watcher does not address this: both independent watchers are still valid.

The correction under review moves freshness-sensitive work into the existing
serialization. It must preserve legitimate linked updates against a changed
parent program and account for the reverse interleaving, where a parent resolves
linked content before another follower advances it. Stale failure publication,
removal/resurrection and retries of earlier parent revisions also need explicit
scope and evidence. No new authorization rule or generation framework is proposed.
These locks are process-local; multi-replica reconciliation remains a separate
obligation. This record does not claim a fix, a new Lean theorem or deployed recovery.
