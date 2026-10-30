# Replica admission racing deployment replacement

Hub commit `05737d6` fixes a reproduced registration race. Ordinary replica
admission now locks the deployment row before comparing metadata and retains
that lock until commit. Instance replacement already obtains that lock through
its upsert. The runtime change is the added `FOR UPDATE`; no authorization rule,
retry layer, Core change or new infrastructure was introduced.

This is native component qualification, not a new Lean proof, formal SQL
refinement or deployment result. It follows the
[source review](2026-10-30-registration-transaction-source-review.md).

## Inputs and observed schedule

GPT-6.1 Sol implemented the fixture and fix, GPT-6 Luna ran frozen-source checks,
and GPT-6 Astra reviewed the actual trace, operation semantics and final source.
The test uses macOS aarch64, Rust 1.99.0 and private PostgreSQL 18.6, with Hub's
pinned Core `120306eb969c6134dadd422dca701a2ce63e9492` and SDK
`239622d12c08b771cc5e813fe3e846385d8d04ad`.

The exact test is
`registration::store::concurrency_tests::ordinary_replica_and_replacement_have_a_serial_registration_outcome`.
It calls the actual private registration store with two connections, not HTTP
handlers or simulated transaction effects. Its synthetic namespace is
`registration-probe`; all candidates use one generated key and deployment.
Client `…01` seeds v0.1.0, replica `…02` has identical metadata, and replacement
`…03` has v0.2.0 and a different endpoint. Timestamps are distinct, fixed relative
to the seed, and truncated to PostgreSQL microsecond representation.

1. The fixture seeds the first registration and records its full state.
2. A test-only `BEFORE INSERT` trigger pauses the replica on an advisory lock.
   `pg_blocking_pids` proves it reached the actual registration insert, after the
   earlier production statements and locks.
3. Replacement runs concurrently. Before the fix it is observed waiting on the
   replica at `kernel.create_server_login`, with an `object` lock event. Its
   deletion statement has already run. The visible pre-release state is still
   only the original seed.
4. Releasing the fixture gate lets both calls return `Pin::Held`. The deployment
   holds v0.2.0, but both `…02`/v0.1.0 and `…03`/v0.2.0 survive, with both LOGIN
   roles. The test fails at two surviving rows versus one; subsequent winner
   assertions were not reached on this failing run.
5. With the fix, the byte-identical test observes replacement waiting on the
   deployment `SELECT … FOR UPDATE`, with a `transactionid` lock event, before
   comparison and deletion. After release, replacement reports both the seed and
   replica as ended. Only `…03`, its complete metadata and its login remain.

The original outcome matches neither serial register order: replica followed by
replacement removes the replica; replacement followed by an old-version ordinary
registration treats that old metadata as a replacement itself. Waiting on catalog
DDL was too late to establish the required ordering. This does not imply a rule
that all replicas must always share metadata: RFC 7592 per-client updates have
different semantics and were not part of this concurrent schedule.

## Checks and evidence

The original test compiled and failed its intended assertion, exit 101: 36.237
seconds for the Cargo command, 0.91 seconds reported by the test harness. The
fixed source passed the unchanged test: 35.215 seconds for Cargo, 0.94 seconds for
the test. The existing `instance_registration` suite passed all six tests: 57.470
seconds for Cargo, 24.98 seconds for the tests. Formatting passed in 0.601 seconds
and strict library Clippy in 12.062 seconds. Cargo timings include compilation;
test-harness timings are rounded values printed by Rust.

The passing regression checks every survivor field, exact ended registration
identities, deployment metadata and preserved fields, the unchanged namespace
claim, and the sole remaining login's privilege flags and group membership.
The snapshot hashes signed fixture statements before logging them. Passwords and
raw bearer or signed-statement values are not included in the evidence.

SQLx preparation preserved the existing 259 records and added four fixture-query
records. For the runtime fix, it replaced only the deployment-query record,
leaving the other 262 records unchanged. Source and log hashes were checked;
the unchanged regression SHA-256 is
`a7f8d6e68ba21816f394806d9900ddad26327393c9a0d5f154898e639dc481f2`.
The [committed native receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/evidence/native-replica-replacement.json)
contains exact commands, source identities, binary identities, measured stages,
summary/log hashes and local evidence locations. Warm build-target binaries may
be overwritten later; their hashes identify the bytes observed during these runs.

Preparation encountered command/path guard corrections before the native test;
those setup failures provide no concurrency evidence. The actual failing test
and passing fixed test are retained separately. No broad Docker gates, deployment
or OpenCode/provider calls ran during this slice. The commit is local and has not
been pushed or deployed.

The next milestone is a transaction model and Lean proof of committed
register/replace histories, including valid replica addition, exact replacement
effects, abort exclusion and the original unlocked-read counterexample. Namespace
key changes, RFC 7592 update/removal concurrency, housekeeping, cross-database
preparation and post-commit audit/catalog adoption remain separate obligations.
