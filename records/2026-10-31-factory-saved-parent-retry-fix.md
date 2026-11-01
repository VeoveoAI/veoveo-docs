# Saved Factory retries preserve completed parent updates

Hub correction `77b258ae10837a01ca7c7464e7c4245c94cd4105` is committed and
pushed to main. The original deterministic counterexample now passes, as do
three additional supersession cases and the existing legitimate first-provision
case. Full Mac and Linux checks pass. This checkpoint qualifies production Rust
with component fixtures; it does not claim a new Lean theorem or a deployment.

The [preceding reproduction](2026-10-31-factory-saved-parent-retry.md) remains
the evidence that unchanged production could restore an obsolete parent program,
repository and credential identity after a newer retarget completed. Its schedule
and assertions are retained; the original test received only a formatter change.

## Correction and review

The owning [Factory design](https://github.com/VeoveoAI/veoveo-hub/blob/main/crates/veoveo-hub/DESIGN.md)
was updated before implementation. Immutable source preparation remains outside
the existing parent mutex. Once it acquires that mutex, a saved retry reads the
native Lore branch by ID and compares its ID, name, live state and current head
with the saved revision. Obsolete successful reads and obsolete read errors both
return before publication or membership changes. Parent publication, application
and removal share the parent guard; individual runners retain their existing
guards, acquired after the parent guard.

A failure row is a diagnostic trigger, not freshness authority. Clearing it is
best effort and may fail after a newer runner succeeds. Valid current-head retries
still use normal reconciliation, even if the diagnostic was already cleared.
Deleted branches cannot remove or overwrite a live replacement by an old name.

GPT-6.1 Sol implemented the correction and deterministic tests. GPT-6 Astra reviewed
the source, all changed callers and lock order, the complete focused output and
the full-check summaries. GPT-6 Luna generated metadata and ran the checks. No
production SQL, schema, credentials, authorization rule, configuration, dependency,
CI hook or new runtime mechanism was added. The sole SQL addition is a test-only
trigger that makes a real failure-clear DELETE fail in a disposable database.

## Focused execution

Luna used Rust `1.99.0-aarch64-apple-darwin`, private PostgreSQL 18, the existing
warm Cargo target and `SQLX_OFFLINE=true`. Each command had a 600-second bound:

```sh
cargo test --locked -p veoveo-hub --bin veoveo-hub <exact-filter> -- --exact --nocapture
```

All filters are prefixed `contributions::lore::factory::tests::`. Each command
ran exactly one test, exited 0 and did not time out:

- `a_saved_parent_retry_cannot_undo_a_completed_parent_retarget`: old preparation
  resumes after the newer B target fully applies; later B/A pushes exercise actual
  routing. Body 1.99 s; command including initial compilation 41.756 s.
- `an_obsolete_saved_parent_read_error_preserves_the_newer_preparation_failure`:
  stale revision1 read error preserves the actual newer revision3 failure and
  already serving B2 output. Body 1.31 s; command 1.966 s.
- `an_uncleared_saved_parent_failure_cannot_authorize_an_obsolete_retry`: the
  actual best-effort clear fails and leaves a genuinely produced A1 failure;
  resuming A1 still preserves B2. Body 1.27 s; command 1.599 s.
- `a_saved_retry_of_a_deleted_branch_cannot_replace_a_live_reused_name`: old ID1
  retains its old name/head but is deleted; live ID9 with that name remains
  serving after the retry. Body 1.25 s; command 1.581 s.
- `a_link_runs_once_its_linked_repository_is_watched_and_goes_with_the_link`:
  a legitimate current-head retry creates its runner when the linked watch
  becomes available. Body 1.81 s; command 2.155 s.

The tests inspect complete typed Runner projections, variable submitted argv,
actual configured InstanceClient lookup and status; the original case also checks
synthetic image identity. They do not establish every physical SQL column or live
checkout bytes. Lore, OpenShell, image-builder and provider responses are synthetic
fixtures; PostgreSQL is real and disposable. No model inference is involved.

SQLx preparation used the existing private PostgreSQL/Core422/Hub migration
workflow. It completed in 22.366 s and added exactly one generated test metadata
record, taking the count from 288 to 289; none changed or were removed. Wrapper
setup attempts first needed packet-key/hash-gate and fresh-output-directory
adjustments; those stopped before PostgreSQL/SQLx execution. No compiler or test
failure occurred in the correction checks.

## Required full checks

The unchanged repository check ran on each actual host with independent caches:

```sh
docker build --target check .
```

It checks SQLx metadata, formatting, Clippy with warnings denied, dependency policy,
feature combinations and Nextest. Both runs exited 0 within their 7,200-second
bounds. Mac completed in **126.597 s**, with **469 passed, 2 skipped** across
31 binaries (Nextest 35.529 s). Linux completed in **167.034 s**, with
**469 passed, 2 skipped** (Nextest 45.196 s). Skipped tests are not counted as
qualified. All 1,193 source/context files and 851 nonproof build inputs matched
before and after. These produced check-target images only; nothing was deployed.

## Reproducible identities and evidence

- Source basis: `d1215c28d17656eba759ca90b420c593fb324118` plus the five-file fix,
  now committed as `77b258ae10837a01ca7c7464e7c4245c94cd4105`.
- Prepared source map SHA-256:
  `98a8447101d42ac6e1d59f6b91ec1327cc9d5a2ce8c42f973294bc18dcbe1482`.
- Source archive SHA-256:
  `d9c1a8c9e0f61cf33783771727284c8389d9e79d3dbb0e9ddb344bc8cb454015`.
- Nonproof build-input map SHA-256:
  `200f9fbaee22aa96976053d261f04f2635d9560f8b56c74b0e57944b1182d876`.
- Focused test binary: 98,410,424 bytes, SHA-256
  `f6a5aa3b53114de68229667aa32dc2534ec314f26c1fd69200f1a04214832f1c`.
- Focused summary: 9,967 bytes, SHA-256
  `9eb05e30a8484887724a4709b44b671752ccef5f5bb6072e3edfb5e36639a5d6`.
- SQLx record: `query-db5ffa20cfe2efb4975ec4d82b423df1c1de118d9f81c408f6381ea77e894062.json`,
  972 bytes, SHA-256 `724e7fb70af1e44856602d987718a2929bb642b4232c08a7c8a78b4a26349c1f`.
- Mac full log: 489,303 bytes, SHA-256
  `4dd6e3723d709b55c410cc681f86833bd2a9bf1da7457d4475bc641c88b65a1d`.
- Linux full log: 489,350 bytes, SHA-256
  `1786467146ff4c318f9e834053b909082332c9bdca6e4a66f8b3034abf3478d5`.
- Full-check consolidated summary: 3,320 bytes, SHA-256
  `07eae8ff4ba3998ffeed17b8c40caf93e08de2c8407ae6e7b457609e96a27e27`.

Temporary source/metadata and focused logs are under
`/tmp/hub-factory-saved-parent-retry-20261031/fix1/` (`sqlx-prepare-run2/` and
`native-tests-run2/`). Full-check summaries, maps and logs are under
`/tmp/hub-factory-saved-parent-retry-20261031/full-check1/` (`mac-run1/` and
`linux-run1-mirror/`). The Linux originals remain in the corresponding
`/home/rozgo/.cache/lean-pilot/hub-factory-saved-parent-retry-20261031/full-check1/`.
Generated binaries, caches and logs remain temporary; source, tests, generated
SQLx metadata and this receipt are committed.

## Formal boundary and next work

Native Lore can change again after the lookup. This correction establishes a
process-local observation and serialized effects; it is not a distributed CAS,
cross-replica ordering proof or guarantee of eventual catch-up. Ordinary follower
and subscription/reconnect behavior still supplies recovery.

The accepted watcher proofs remain unchanged and continue to cover their existing
runner boundary. Saved-parent preparation/publication is not yet formally covered.
The next manual model must compose actual newer parent application with resumed
old success/error results, preserving full Factory and failure state. Successful
first allocation and complete membership retirement also remain formal obligations;
the passing native first-provision test is separate evidence, not their proof.
