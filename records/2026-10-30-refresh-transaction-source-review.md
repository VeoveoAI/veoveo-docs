# Refresh transaction source review

Configuration publication is qualified within its design-model boundary; see its
[record](2026-10-30-control-publication-qualification.md). The next slice is refresh
rotation, duplicate delivery and revocation under concurrent calls. This record
captures source review and implementation scope, not a passing refresh proof or
new native test result. No production bug was established by this review.

Astra `/root` and Sol `/root/coder` independently traced the current Rust/SQL and
existing tests. Luna `/root/builder` recorded the source and available tool/cache
inputs without running builds, tests or extraction. The read-only preparation is
`/tmp/hub-refresh-concurrency-20261030/preparation-summary.json`, SHA-256
`b484c0bf51ab55ddc70a45253bed975eb6c08df479fe794546a674ab532f6d8c`;
its log is `preparation.log`, SHA-256
`56199cd99a39680181a58bfed349b0cbce6f174551fdbbbe1b8b9b0ace79f319`.

The source is Hub `bb2e97f5c984a53eaa218109e4c01a70e952e365` with the existing
working-tree SDK adoption: SDK `239622d12c08b771cc5e813fe3e846385d8d04ad`,
Core `120306eb969c6134dadd422dca701a2ce63e9492`. The inspected refresh paths were
unchanged from that Hub revision at this cutoff. Key SHA-256 identities:

- `src/store/refresh.rs`:
  `463feec6bf99036f12549a0d9efe3684add2c2531f78ffbbd1f0df8038e0240b`;
- `src/state/refresh_tokens.rs`:
  `45fe491b0af895a39025c50e128187fe115769ebc577777e371cc76d9b915f04`;
- `src/bin/hub/oauth_grants/refresh.rs`:
  `f00131bd43d3f7d50e22b3ff37b779b990814e17394757c2b73d58525f5ba5ad`.

Paths are under `veoveo-hub/crates/veoveo-hub`. The owning
[token/session design](https://github.com/VeoveoAI/veoveo-hub/blob/main/crates/veoveo-hub/src/auth/DESIGN.md)
defines the existing behavior; this slice adds no authorization or delivery policy.

## Actual operation boundaries

The state caller reads the grant and checks authorization-server/resource/client
binding and lifetime before entering the store transaction. The store locks the
family selected by the token digest, reads the token again, and validates the
replacement's next-generation/lifetime/envelope shape. The store method does not
receive or recheck the caller's client/resource binding. Immutable family-binding
fields and correct caller/lookup correspondence must therefore remain explicit.

The consumed/replayed-token branch precedes the unconsumed token's expiry,
revocation and current-generation checks. Its `deliverable` predicate requires the
stored immediate successor to be the family's live current unconsumed generation,
with a live envelope and no relevant replay/revocation marks. It does not directly
inspect the predecessor's expiry; the state caller and maintained family lifetimes
are separate boundaries. The supplied `now` was sampled before lock waiting.

Rotation stages successor insertion, predecessor consumption and envelope clearing,
family-generation advancement and the actual success audit, then commits. Duplicate
delivery stages its distinct audit and commits before the state caller decrypts the
stored successor and checks its digest. A decryption/digest error may therefore
follow a committed duplicate audit. The original request's newly generated candidate
is not the successor returned by the duplicate path.

Replay stages family revocation and the token replay mark in one transaction.
Its HTTP denial audit is later, outside that transaction. Explicit client revocation
also locks the family. SQL `coalesce` preserves the first revocation timestamp and
reason: logout followed by replay differs from replay followed by logout. That
distinction feeds the existing Task-compromise check; it must not be replaced with
a stronger new policy. An access token is signed before rotation in the HTTP path;
neither signing nor network delivery is part of the database transaction.

## Database and maintenance limits

The schema separately enforces token-ID primary keys, unique token digests and
`UNIQUE(family, generation)`. Stored generations are nonnegative `bigint`, while
the pure predicate uses checked `u64` addition. A successful construction needs
representable, nonconflicting stored keys and generation; replacement shape alone
does not establish that insertion succeeds.

Rotation and explicit revocation serialize on the family lock. Retention clears or
deletes token rows in its own row-lock batches; family pruning skips locked families.
The broad source comment that every token change holds the family lock is inaccurate
for these maintenance paths. Ordinary token reads do not acquire a token row lock.
The model must not silently exclude maintenance or pretend `UPDATE ... WHERE id`
recreates an absent row. A later retention timestamp racing a request's older sampled
time is a source-derived possible schedule requiring further modeling/native evidence,
not a confirmed defect or justification for adding a runtime check.

Positive duplicate-delivery claims must state their compatible lifetime/maintenance
conditions. A claim about revocation before the lock/decision cannot be silently
strengthened to revocation before the eventual HTTP response. PostgreSQL isolation,
row/constraint locking, SQLx rollback/commit behavior, cryptography, entropy and
clock correspondence remain external assumptions. Physical crash durability is
outside the private PostgreSQL fixture's configuration.

## Approved implementation and qualification scope

Extract the actual unchanged `RefreshFamily::bound_to` and `deliverable` functions
using the existing Aeneas/Lean package. Prove their exact accepted/refused outcomes,
strict delivery deadline and legitimate retry success. Preserve the already qualified
functions in the expanded extraction; reuse existing primitive models where applicable.

A separate handwritten transaction model will import those predicate results and
cover arbitrary finite interleavings, staged writes, commit/abort, same-successor
redelivery, first-revocation preservation and uncertain response outcomes. Model
database commit independently from the application's required write sequence. This
remains design-model verification until refinement of the async Rust/SQL is justified;
source review and native tests are separate evidence.

Existing `tests/hub_state.rs` already exercises concurrent refresh, audit-failure
rollback, eager envelope clearing and logout. New fixtures should add deterministic
observed lock overlap and complete state/audit observations, duplicate-append failure,
deadline equality and revocation-order cases. Use the real audit composition and
private databases; introduce no production synchronization hooks. Deliberate compiled
faults and fresh restoration will test the sensitivity of the proofs/tests. No
deployment, paid-model call, CI hook or additional runtime security rule is planned.
