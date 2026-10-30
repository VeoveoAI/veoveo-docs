# Exact replacement success and reachable staged-write abort

Hub commit `8174914` extends the
[valid replica witnesses](2026-10-30-registration-valid-replicas.md) with ordinary
replacement, unconditional instance replacement and abort after private writes.
All are constructed executions of the same transaction model, with proved initial
validity and actual transition steps. The original-race counterexample remains
pending.

## What passed

`ordinary_replacement_succeeds` starts with a seed registration and a first
replica that succeeds while a second attempt waits. With changed metadata, that
second attempt captures both current rows, drops both associated logins, creates
its own login and inserts its complete candidate row. The final database equals
the independent replacement specification, with both successful responses,
actual commit identities `[0, 1]` and a released lock.

`instance_replacement_succeeds` establishes the same complete output without a
metadata-inequality premise. Equal-metadata instance replacement is included,
matching the existing unconditional instance behavior. The seed and first replica
are removed, unrelated login 99 and application state are preserved, and the new
candidate row and role payload are exact. The first success response remains
valid even though replacement has subsequently removed its registration.

`staged_abort_is_reachable` constructs an actual failure/abort path after a
nonempty private login-creation stage. Committed state stays exactly equal to the
valid seed database, the response is an error, the phase is aborted, the lock is
released and the commit list is empty. This is a modeled server-abort decision,
not an inference that any client transport error means rollback.

Metadata, row payloads, role payloads and disjoint application state remain
parametric. The two-row DELETE listing is derived from the already proved first
result. All selected create/insert constraints are discharged, and the final
replacement map reuses the checked independent `replacement_exact` theorem.

## Execution and limits

GPT-6.1 Sol implemented the extensions, GPT-6 Luna checked the frozen module on
Linux, and GPT-6 Astra reviewed and committed it. The final direct command was
`lake env lean /tmp/RegistrationWitnesses-packet10.lean`; it passed in 35.41
seconds. Both replacement theorem closures contain `propext`, `Classical.choice`
and `Quot.sound`. The abort theorem uses only `propext`. Prior replica theorem
closures remain unchanged; no audited theorem contains `sorryAx` or an
unreviewed axiom.

The [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/evidence/replacement-abort.json)
records eleven source/configuration hashes, the direct command, log and timing
identities, and the previous composed-package evidence. Only the Witnesses
module changed: imports, target layout and ten other frozen files match the prior
package check. That complete updated module was checked directly; the composed
package will run again for final counterexample qualification. Native tests,
Rust extraction, deployment and OpenCode acceptance were not repeated.

One intermediate failure was a redundant `rfl` after rewriting had already
solved an insertion constraint. Removing it changed no model behavior or theorem
statement. This elaboration failure is not a semantic fault control.

Captured full rows are proof-level witnesses of a statement snapshot. Native
`DELETE RETURNING` yields client, server and login fields; only those key/login
projections drive removal. No extra native copy or query is proposed. PostgreSQL
atomicity, locking and constraints, native payload projection, Core internals and
asynchronous Rust/SQL correspondence remain explicit boundaries.

These constructed schedules prove reachability, not unconditional liveness.
Per-client updates, removal, housekeeping, authority changes, external-database
preparation and post-commit audit/catalog adoption remain outside this model.
The commit is local, not pushed; runtime code is unchanged.
