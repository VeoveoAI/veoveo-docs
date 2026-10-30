# Registration update programs and exact field effects

Hub commit `cddf599` adds the first checked update-operation proof checkpoint on
top of native fix `22cdabb`. For every finite execution of the modeled fixed
register/replace and update steps, an update reaching its commit request has the
complete deployment-then-registration write program. Applying it gives the exact
independent field transformation of the row captured by the UPDATE statement.
The missing-row path retains only the private deployment metadata write, and its
rollback transition preserves the committed database and event lists.

This does not yet prove that the captured row remains current until commit or
that arbitrary mixed histories have independent sequential effects. Those require
the next shared-lock and observation invariants. No runtime source changed here.

## Model and source correspondence

The four new modules are `RegistrationUpdateModel`,
`RegistrationUpdateSpecification`, `RegistrationUpdateEffects` and
`RegistrationUpdateProof` in the
[registration proof package](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/README.md).
They retain the earlier real registration transition relation and its guards;
they do not substitute an assumed atomic correct registration operation.

The input domain is admitted changed-metadata store updates on one retained
deployment, with arbitrary typed metadata, keys, signatures, digests, timestamps,
role payloads and remaining row data. Preflight captures the existing registration
and digest comparison before the SQL transaction. Native signature, deployment,
slug and authority admission remain correspondence boundaries. The service's
equal-metadata short circuit, later audit/reload and response construction are
outside this store model.

The source ordering is the existing `update_deployment.sql` followed by
`update_registration.sql`. The first changes only deployment metadata. The second
matches the request's client ID and changes only metadata, software statement and
update time, preserving fields from the currently matched row rather than copying
them from the earlier authentication snapshot. Its exact transformation preserves
client identity, login, token digest, issue time, stable remaining fields, all other
replicas and login roles, and disjoint application state.

Storage binding belongs to the deployment, which the update preserves. The shared
register model's comparison payload is specialized to metadata plus binding; a
binding carried with its abstract row is proof-level admission context, not a new
native registration column. Full captured rows, method classifications and commit
events are also proof data, with no runtime helper or authorization rule.

Primitive commit publishes staged deltas without checking their desired correctness.
The staging invariant is derived from the actual mixed steps. A no-op's staged
program theorem is distinct from general event exclusion: this checkpoint proves
the exact effect of its rollback transition, not the absence of every possible
later contribution. Another writer can commit before the no-op acknowledgement,
so the whole database is not claimed to remain unchanged until that reply.

## Execution and evidence

GPT-6.1 Sol implemented the proof modules; GPT-6 Luna ran bounded logged checks on
the existing Linux x86_64 package/cache; GPT-6 Astra reviewed the source mapping,
claims, logs and current file identities. Lean is 4.35.0; the existing pinned
proof-toolkit dependency is unchanged. No Aeneas extraction occurred in this
handwritten transaction-model checkpoint.

- Model declarations typechecked in 3.16 seconds.
- Specification compilation passed in 2.768 seconds; corrected field/effect proofs
  compiled in 3.169 seconds.
- The final direct program proof passed in 4.13 seconds.
- One actual composed `LAKE_NO_UPDATE=1 lake build` passed in 11.382 seconds:
  twelve default modules, with 3160 reported Lake jobs including dependencies.
- All nine new printed theorem closures contain only the recorded standard axiom
  subsets; the three program results use `propext` and `Quot.sound`. No `sorryAx`
  appears in the successful build. Unused section-variable warnings remain.

The [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/evidence/update-program-effects.json)
records exact commands, theorem claims, all fifteen source/config hashes, log
identities, timings and assumptions. Its source manifest was generated from actual
file bytes and matched before/after the build and the committed local files. The
prior eight proof modules and dependency/tool pins are unchanged.

Development failures were proof-code feedback, not semantic negative controls:
an untyped dotted identifier, an unintroduced inequality contradiction, phase
specialization and an explicit abort-branch argument. Review also corrected the
proof-only action labeling and transaction method partition before validation.
Three launch preflights stopped before compiling because of hash transcription or
nested shell quoting; final manifests were derived from bytes instead. None was a
runtime defect or a successful proof run.

Current runtime/test hashes still match the
[native stale-update qualification](2026-10-30-registration-stale-update.md), whose
two-test concurrency module covers both native registration defects and whose six
instance-registration tests include normal updates. No native test, full Docker
gate, deployment or paid model call was repeated for these proof-only files.

## Remaining work

The next checkpoint derives shared ownership and observation stability, then
independent mixed serial histories, general abort-event exclusion, valid complete
update/no-op executions and the old-update counterexample. The old control uses
the earlier missing-row update order against the fixed registration protocol; it
does not reintroduce the previously fixed unlocked-registration bug.

Removal/housekeeping, broader authority and identity-reuse composition, physical
SQL/Core refinement, cross-database preparation, service postcommit behavior and
liveness/deployed recovery remain open. PostgreSQL's transaction, statement and
locking semantics are assumptions. This milestone is a checked design model;
source review and native tests do not turn it into formal Rust/SQL refinement.
The commit is local, not pushed or deployed. The comprehensive goal remains active.
