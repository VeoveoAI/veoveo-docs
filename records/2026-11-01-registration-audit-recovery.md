# Registration audit recovery: abort, retry and lost commit reply

The registration model now has checked executions for a partial audit append
followed by confirmed rollback, a fresh successful removal attempt, and an
alternative commit whose reply is lost. The last case proves why an error response
alone cannot establish rollback. This is source-shaped handwritten Lean coverage,
not extracted Rust or formal PostgreSQL refinement.

GPT-6.1 Sol authored the two modules, GPT-6 Luna compiled them on Linux, and
GPT-6 Astra reviewed the definitions, source correspondence, full diagnostics and
actual artifact hashes. The Hub baseline is
`04dc3bd37310fd921d2712ba78af4cdc324e9492`; native code remains the qualified audit
correction `3d1b0b969ca8f35a757b74ebc9b959d62bf5ae33`. No runtime, dependency,
deployment, CI or paid-model changes occurred. Hub commit `1e0a44d` records this
proof checkpoint and is pushed to `origin/main`.

## Scenario and checked outputs

The fixture imports the prior valid synthetic seed: a complete instance and
deployment, two registrations 30/31 at server A, logins 40/41, unrelated role 99
and application state, and complete prior audit record 900. It does not claim
that a native test created this exact seed.

Actor 1 stages deletion of both registrations, both logins and the instance,
then begins the source-derived two-Deregister audit program. The first append
creates private record 100. The next candidate is the required second
Deregister-A instruction but reuses committed ID 900 with a different complete
draft and stored timestamp. The proof establishes CoreAppend's refusal. An
explicit observed-failure step and a confirmed server abort then preserve the
entire committed database and prior ledger, publish no record 100, release both
locks, and retain the exact synthetic error. Staged writes and the cursor remain
only as the aborted transaction's modeled history; they are not committed effects.

Actor 2 starts from that reached aborted state, captures the rows again, performs
the removal, appends records 200/201 and commits. The independent expected whole
database has no instance, registrations or logins 40/41, while retaining the
complete deployment, role 99 and unrelated state. The independent whole ledger
contains prior record 900 and exactly two full Deregister-A records 200/201.
There is no leaked 100. The sole commit event contains actor 2's complete removal
writes; its response is `removed`, the first actor stays aborted, and actor 0 is
unchanged.

An alternative suffix starts from the same commit-pending state, observes a lost
reply, then performs the server commit. It proves the same complete database and
ledger with the exact error response, and explicitly proves that neither store
equals its pre-removal value. This models neither an automatic retry after an
uncertain outcome nor a postcommit `served_at` operation.

Each full successful or lost-reply path has 24 modeled transitions. This is a
static constructor count, not native SQL round trips or measured latency. The
fixture imports no correctness proof; its proof leaf imports the earlier
constructive execution module, not the generic audited correctness leaf.

## Manual qualification

The existing pinned Lean 4.35.0 package was used. Commands were manually invoked
as `LAKE_NO_UPDATE=1 lake build <target>`, each with a 180-second process limit.
All source, package and tool maps stayed unchanged during each run.

1. Checkpoint 1: RecoveryWitnesses failed in 16.496 seconds because `partial`
   was a reserved identifier. RecoveryProof was not invoked. The identifier was
   renamed to `partialRemoval` in the two new modules.
2. Checkpoint 2: RecoveryWitnesses passed in 16.544 seconds. RecoveryProof failed
   in 19.044 seconds: four phase inequalities retained irrelevant free variables,
   and five reductions exceeded the default 200000-heartbeat limit.
3. Checkpoint 3: RecoveryProof failed in 31.975 seconds. Explicit phase projections
   and small response-update lemmas resolved the free-variable issue; remaining
   `if True` reductions and four heartbeat timeouts still prevented qualification.
4. Checkpoint 4: RecoveryProof failed in 68.287 seconds. Explicit conditional
   rewriting and a local 800000-heartbeat limit on three declarations resolved
   the earlier failures, but two lost-reply cursor/audit projections still timed
   out. No failed Proof command produced a valid OLean; axiom guards also rejected
   the cascading unfinished declarations.
5. Checkpoint 5: restricted unfolding of those unchanged fields resolved the
   remaining reductions. RecoveryProof passed in **21.754 seconds**. Its nineteen
   declaration guards and seven printed closures passed with no unfinished-proof
   axiom. Only `propext` and `Quot.sound` occur; the append-refusal theorem is
   axiom-free. All nineteen public theorem statements and the exact guard/print
   tail were unchanged throughout the proof-body repairs.

The six command durations sum to 174.100 seconds; this excludes editing,
review, staging and waiting. The three local heartbeat limits apply only to
`retry_execution`, `lost_reply_execution` and `lost_reply_output`; other
declarations retain 200000. The final repair did not raise them again.
Non-failing deprecation and unused-tactic warnings remain documented in the log.
These four failed commands were authoring failures, not semantic fault controls.

The successful Fixture OLean is 286,888 bytes, SHA-256
`be17c46691d30c0acf21dddd97f6bb5f8f6369475513e5dbd8dc37d27c128273`.
The final Proof OLean is 475,080 bytes, SHA-256
`44a646fd6d021366b01df1977ff31ab13bc40138b53d1741c6426322e437367b`.
The final log is 3,919 bytes, SHA-256
`d23ecc76cd4d71ee3b775d5d23da174be0971d2dbd078cd76fb4f15ff9d01f30`.
Root independently matched all six command logs and both successful artifacts
to their recorded hashes and byte counts. Lake rebuilt named prerequisites;
their reported post-build OLean hashes matched the accepted inputs.

The [committed receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/evidence/audited-store-recovery.json)
contains exact source/tool identities, commands, failures, timings and output
identities. Raw logs, compiled files and the reused manual logging script stay
temporary. Only the two Lean modules, nondefault Lake targets, compact evidence
receipt and documentation are added to the repositories.

## Native connection and limits

Native `store.rs` lines 405–448 stages removal before `audit_ended`, whose loop
at lines 703–730 propagates each append failure before the same transaction's
commit. Core revision `422dcf268d690fcbc3fee435cf9b81e7f36ffeac`,
`0500_audit.sql` lines 407–430, accepts duplicate identity only with equal complete
draft and stored timestamp, otherwise reporting VV501. Interpreting an observed
native failure as the model's failure/confirmed-abort steps remains an explicit
Core/SQLx assumption; absence of a successful append does not create those steps.

The [earlier native qualification](2026-11-01-registration-audit-fix.md) uses a
one-registration removal refusal fixture. This new two-row partial-append
schedule is additional model coverage. It adds no native test or deployment
claim. PostgreSQL atomicity/locking, source encoding, full native response
construction, parsers, cryptography, arbitrary concurrent external writers and
liveness remain outside these witnesses. No new removal-specific mutation
control is claimed; the earlier missing-Register control retains its own scope.

Next is the explicit postcommit service-refusal boundary, followed by the other
registration operation adapters. The comprehensive Hub verification goal remains
open.
