# Registration metadata UPDATE and its audit record

The new audited UPDATE model passes Lean. It connects the existing mixed
registration/update data execution to private audit appends and the combined
commit. This is a checked handwritten model of one admitted deployment, with
explicit native interpretation assumptions. Populated executions and a deliberate
omission control are the next checkpoint; no whole-Hub or SQL refinement claim
follows from this foundation.

GPT-6.1 Sol authored the model and proofs, GPT-6 Luna ran the bounded Linux
compilations, and GPT-6 Astra reviewed the source correspondence, repair diffs,
logs, axiom closures and actual compiled bytes. The initial proof basis is Hub
`ba812e6625a1c0706bd1b8815f5b752254693aa9`. Native Rust/SQL remains byte-identical
to the qualified `3d1b0b969ca8f35a757b74ebc9b959d62bf5ae33`. No runtime,
dependency, security rule, deployment, CI or persistent proof service was added.
Hub commit `2ca71cafdab78c9bc9953d9c392291d61bc67a97`, pushed to `origin/main`,
records this checked foundation and its coverage update.

## Source and checked properties

The native changed-metadata path authenticates and validates the request, writes
deployment metadata under its row lock, then updates the current registration by
client ID. No matching row causes explicit rollback and a successful no-op.
A match appends Update for the requested metadata's server and commits both
changes. Identical metadata bypasses this store path and is outside this adapter.

The wrapper uses the existing actual mixed register/update transition relation;
audit-only steps erase to no data change. Cursor progress and immutable request
binding derive exactly one Update intent for the original requested server.
For a reached committing transaction with an exhausted cursor and fresh record
identity, the proof constructs its actual commit and establishes an independently
specified sequential data result, full audit-record extension, and preservation
of prior complete records. The current row's stable fields, other replicas,
roles and current unrelated state are retained by the inherited data specification.

Every reached no-op outcome has no audit cursor. The current missing-row condition
is derived before its rollback. Confirmed own no-op and failure rollback preserve
committed data, audit and commit history. These are per-transition preservation
claims; other transactions may change state before or afterward. The cursor
theorem directly states absence at reached no-op states, rather than a separate
temporal-history assertion. Aborted cursors are not active identity reservations.

Interleaved registrations use actual old data steps plus an explicit finite batch
of CoreAppend-valid full records committed with them. Their Register, Replace and
ClaimNamespace vocabulary is not certified by this adapter. External contributions
preserve previous full records and disjoint active-private IDs. This makes the
composition boundary visible instead of silently omitting foreign audit effects.

## Manual checks and authoring failures

All commands were `LAKE_NO_UPDATE=1 lake build <target>` with the pinned Lean
4.35.0 packages, default heartbeat budget and an external 180-second limit:

1. `RegistrationAuditedUpdateModel`: **PASS**, 30.465 s.
2. `RegistrationAuditedUpdateSpecification`: **PASS**, 7.778 s.
3. Final `RegistrationAuditedUpdateProof`: **PASS**, 45.943 s.

These accepted commands total **84.186 s**, excluding authoring, staging and
review. All 27 declaration guards and ten printed closures pass, using only
`propext`, `Classical.choice` and `Quot.sound`. Declaration counts are not scenario
counts. Actual copied outputs are 529,880 bytes (Model), 27,728 bytes
(Specification) and 982,064 bytes (Proof). The Proof SHA-256 is
`2fb52c451c3d79f12de8e95dbe4782c48e1dd12b213290af0ac4a2c4cec4f717`.

Three earlier commands failed during proof authoring: Model syntax (29.970 s),
case-bound names and an already-simplified list equality (19.948 s), then missing
implicit helper parameters (46.091 s). Failed proofs produced no accepted output;
the axiom guard rejected their dependent `sorryAx`. Narrow syntax/proof-body
repairs resolved them without changing the specification or weakening a guard.
These were authoring errors, not newly discovered production defects or semantic
fault controls. All six command logs are retained.

A logger directory-exists error and a transient SSH banner timeout happened before
compilation and are recorded separately. The established SSH route recovered;
there was no duplicate compile. Final source, import and tool maps were unchanged.
Lake managed local module builds using the pinned package cache. Compiled-byte
reproducibility across rebuilds is not claimed.

## Evidence and limits

The [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/evidence/audited-update-foundation.json)
contains the forty-file input map, native eight-file review, tool identities,
commands, prior failure headings, full log hashes, artifact identities and exact
scope. The [source note](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/AUDITED_UPDATE_SOURCE.md)
links each native operation to its model boundary and manual commands. Private
logs and artifacts remain under
`/tmp/hub-registration-audit-20261101/audited-update-foundation-checkpoint4-mirror/`.
The final summary SHA-256 is
`11f9bd4640eed2e7ac209e32d154c965373fc74d6c00db31f30192df1e6242ed`.

PostgreSQL atomicity and locks, native Core append/serialization, admitted metadata
projections, and the external registration contribution remain assumptions about
the implementation. No Aeneas extraction or formal SQL correspondence is claimed.
Prior native qualification is reused because the implementation is unchanged;
there are no new component tests, deployed probes or model-driven acceptance calls.

Next are populated matched-update success, explicit audit refusal followed by
confirmed abort and fresh retry, and actual replacement followed by stale no-op.
The latter must supply a source-faithful external audit contribution. Then a
private omitted-Update control must prove a legal wrong result, cause unchanged
acceptance to reject it, and pass after exact restoration. Complete service
responses, namespace auditing, expiry and other cleanup paths remain separate work.
