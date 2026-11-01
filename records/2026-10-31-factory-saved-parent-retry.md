# A saved parent retry can undo a completed retarget

A deterministic native component test against unchanged Hub `d1215c2` reproduces
a stale saved-parent retry. A newer parent revision finishes applying repository
B, but an older retry then restores parent1/Alice, repository A, its older image
and command entries, and A's credential identity. Later B pushes are ignored and
A pushes advance the wrong runner. A correction is not yet qualified at this
checkpoint.

This is separate from the already corrected captured-linked-update race. The
[watcher model boundary](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/factory_retarget/WATCHER_SOURCE.md)
explicitly excludes saved-parent retry freshness and membership. Its checked
current-runner contracts do not claim to prevent this path.

## Reachable event sequence

GPT-6.1 Sol added one test using the existing fake Lore read gate and stream drain
acknowledgments. There are no direct calls to retry/reapply, fabricated failure
rows, corrective rechecks or sleeps used to impose ordering:

1. Watch B, then the parent at revision1/Alice with one following link to A.
   A is unwatched. Production preparation records a real missing-watch failure
   for revision1 and creates no runner.
2. Start watching A normally. Its subscription recheck finds no runner whose
   linked update could clear the failure, so `retry_waiting` reads the saved
   parent/branch/revision. The saved revision's branch and committer resolve
   while parent1 is still the head; pause its subsequent source read.
3. Through the independent parent follower, push revision2/Frank. It changes
   the own tree, adds the `web` entry and retargets the same link name to B's
   pinned branch. Drain the handler completely and capture its successful
   output and cleared failure.
4. Release the older retry and drain A's follower. Its next-poll acknowledgment
   observes completion without triggering another recheck.
5. Deliver a real B push to linked revision `f`, then an A push to `a`, draining
   each. Assert that the completed B retarget remains and only B advances it.

The test checks complete typed `Runner` values, submitted argv, actual configured
`InstanceClient` lookup, synthetic image identity and status. This is not every
physical SQL column. Expected argv independently specifies every variable
repository, branch, tracked ID and own entry; its fixed shell/script prefix is
retained from the first observation. The earlier script-byte audit is separate.

## Observed failure

The initial genuine failure/absence and retry identity observations matched the
expected inputs. Before release, the runner was B/branch2, parent2/Frank, linked
revision `d`/Dave, with `web` in argv and the expected parent2 image. Its client
lookup named Frank and B/Dave, and its failure was cleared.

After the retry, the same deployment instead recorded A/branch1, parent1/Alice
and linked revision `c`/Carol. The command lost `web`, the image changed back,
and the configured client lookup named Alice and A/Carol. B's later `f` push
left this wrong output unchanged; A's `a` push advanced it. The final failure
record was still absent, so status did not explain the regression.

The production path is
[retry_waiting/retry/prepare/run_links](https://github.com/VeoveoAI/veoveo-hub/blob/main/crates/veoveo-hub/src/bin/hub/contributions/lore/factory/watch.rs).
The retry prepares a saved parent revision and membership on the linked
repository's follower. Its later per-runner lookup sees the current row, but
applies the already prepared old parent program and link. It can therefore
overwrite a completed parent update despite per-runner serialization.

## Execution and identities

GPT-6 Astra reviewed the test schedule, source and complete assertion output.
GPT-6 Luna ran exactly one test on the Mac using Rust
`1.99.0-aarch64-apple-darwin`, the existing private PostgreSQL 18 fixture,
`SQLX_OFFLINE=true` and the existing warm Cargo target. The command had a
600-second process-group deadline:

```sh
cargo test --locked -p veoveo-hub --bin veoveo-hub contributions::lore::factory::tests::a_saved_parent_retry_cannot_undo_a_completed_parent_retarget -- --exact --nocapture
```

Compilation succeeded. The test failed its final aggregate assertion at line
2362: **0 passed, 1 failed**, test body **1.69 s**, complete command **35.286 s**,
Cargo exit **101**, no timeout. The private runner first needed its inherited
source-count expectation updated from 1,177 to the verified 1,191 files; that
setup attempt stopped before Cargo and is not semantic evidence.

The sole source change is the 213-line regression in
`crates/veoveo-hub/src/bin/hub/contributions/lore/factory/tests.rs`. Production,
SQL, metadata, configuration and dependencies are unchanged. The complete source
and build-input maps matched before and after the run.

- Runtime/source base: `d1215c28d17656eba759ca90b420c593fb324118`.
- Test file SHA-256:
  `d886800c3891cdd991c441b060532b53b8102a0a7478fcc95cdffbfe78cd54f8`.
- Regression patch SHA-256:
  `7373d459c4d8f925f34de0262fc73174b5e1e07985df649c8f0a283410cfc6c7`.
- Effective source map, 1,191 files, SHA-256:
  `832c39eb6f9dbf11ab5af2237c5218cf4f805a4098e9922043a200409eca101c`.
- Build-input map, 849 files, SHA-256:
  `6d4a966d157560fa6a0b93832f12b2b7dbd7690fc5f359e28f289f88f8f4ac03`.
- Test binary: 98,312,552 bytes, SHA-256
  `a3bf0b44ab222060f39871684a6223164f6dea615438d514e37f84d1948ec7f1`.
- Full log: 16,983 bytes, SHA-256
  `ea7efce8576341ab356990c69453d6c534e7905e70fc155410d5dedf40b27947`.
- Summary SHA-256:
  `086b6f55a1f98c46aa2d562d09194a2215de69ae01162e970c14989749dcfd33`.

Frozen test/source packet:
`/tmp/hub-factory-saved-parent-retry-20261031/test-only1/`.
Full log, summary and before/after maps:
`/tmp/hub-factory-saved-parent-retry-20261031/native-baseline1/evidence-run1/`.

This is production Rust with real disposable PostgreSQL and synthetic Lore,
gateway, provider and image-builder responses. It is neither a live Linux
deployment probe nor a Lean theorem or proof of SQL refinement. No paid model
call or deployment ran. The next step is a scoped correction, qualification of
valid retry and supersession behavior, and an explicit update to the formal
source boundary.
