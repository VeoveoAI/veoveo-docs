# Replacement survives a stale UPDATE, including its complete audit

Lean checked twenty actual model transitions from an old request's preflight,
through ordinary registration replacement, to the old request's explicit rollback
and successful no-op return. Independent complete outputs retain replacement data,
credentials and audit records. This is a handwritten store-model proof, not formal
SQL refinement or a new native execution.

GPT-6.1 Sol authored the fixture, execution and acceptance modules; GPT-6 Luna ran
the Linux checks; GPT-6 Astra reviewed the source correspondence, actual transition
constructors, independent output maps, logs and copied artifact bytes. The starting
Hub commit is `d6b5cc4bd3205356ca018baea0ea26828f0795c2`. Native Rust/SQL remains
byte-identical to qualified `3d1b0b969ca8f35a757b74ebc9b959d62bf5ae33`.
Hub commit `d24d6ae7a6842da54f40e2b35e945c482c5849cd`, pushed to `origin/main`,
records this checked milestone and coverage update.

## Exact scenario

The [fixture](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/RegistrationAuditedUpdateReplacementWitnesses.lean)
starts with clients 30/31, logins 40/41, unrelated login 99, complete credential and
stable payloads, retained binding/frame and prior complete audit record 900.
Actor 0 authenticates client 30 and requests version-2 metadata before replacement.
Actor 1 then replaces the same admitted deployment and namespace with version-3
metadata, client 50, login 60 and new credentials. The namespace is already held;
pin/signature admission is an explicit interpretation boundary, not a modeled table.

The replacement uses fourteen actual old mixed-register transitions: begin,
acquire/read, choose replacement, upsert, capture both old registrations, drop both
old logins, finish dropping, create login 60, insert client 50, request commit,
combined commit, acknowledge. The chosen complete Listing order is valid; it is
not a guarantee about PostgreSQL's returned row order.

Its explicit external audit contribution is a finite sequence of valid Core
appends: record 200 Replace names the first captured row's server, record 201 Replace
names the second's, and record 202 Register names the candidate's server. All three
server values are `fixture-service`. Their draft/stored timestamp pairs are
223456789 ns/223456 µs, 223457789/223457 and 223458789/223458. Their complete payloads
and locally fresh IDs are retained, alongside prior record 900. The concrete source
intent and multiplicity are proved. No ClaimNamespace is appropriate for this
already-held namespace. The generic vocabulary of all possible external
registration contributions remains unproved.

After replacement returns success, actor 0 executes five more steps: begin the
update transaction, privately write version 2 and take the deployment lock, find
client 30 missing, explicitly roll back, then acknowledge no-op success. No Update
audit program starts. The pending deployment write never replaces committed
version 3.

Independent literal maps specify the complete final database and ledger, every
transaction and cursor, and the sole register commit/event. They retain client 50's
metadata, login, digest, statement, stable remainder and issuance/update times
501/501; remove old clients/logins; preserve unrelated login 99 and the full frame;
and contain exactly records 200/201/202/900. The lock is released and both store
responses are successful. The top-level theorem composes all twenty steps, rather
than assuming a correct replacement endpoint. Store success is not a proof of the
native ClientInformation response or of the replacement's continued liveness.

## Review and measured qualification

Source review corrected the newly admitted candidate's initial 501/502 timestamps
to 501/501 in both input and independent expected output before compilation:
`create_registration.sql` uses the same `$8` value for both columns. That SQL file
is 196 bytes, SHA-256
`a79ee4f4e98171712e81308a4c76cb26e0c91dd8fcdf669066e2e2687905d3cb`,
unchanged from the native-qualified revision. This was a fixture correction, not
a runtime defect.

Both attempts ran one `LAKE_NO_UPDATE=1 lake build
RegistrationAuditedUpdateReplacementProof`, with an external 180-second bound and
default Lean heartbeat limits:

- First attempt: **FAIL**, 37.977 s. Witnesses compiled. A freshness proof retained
  an impossible empty-list membership alternative; `subst` could not eliminate the
  record, and the guard rejected dependent `sorryAx`.
- Final attempt: **PASS**, 40.282 s. Only that proof-body case split changed. All
  definitions, assertions and guards remained. Twenty-four declaration guards and
  eleven printed closures passed. Three closures require no axioms; the rest use
  only `propext` and `Quot.sound`.

These counts are declarations, not twenty-four scenarios. The old imported success
execution's closure prints are separate. The three new build lines report roughly
1.0, 2.4 and 2.0 seconds within the total; Lake's 3,157 graph jobs are not all fresh
compilations. Style/deprecation warnings remain without any guard relaxation.

Copied artifacts verified independently:

- Witnesses: 393,712 bytes, SHA-256
  `02edb1b4b9124bedf35f989b4c79c85ddb92bfb1eb0ba6e4f7a21d4f223271ab`.
- Execution: 198,080 bytes, SHA-256
  `bbcac3ba7a298d2b107b933aab24596f594bbaff466937c19dedd3e061c3b926`.
- Proof: 191,008 bytes, SHA-256
  `55080ce3e106e114d2e3d415e201e00fcb979ed2eb0fdcdeb3324bbb1729aee5`.

The final log is 15,439 bytes, SHA-256
`047effa1c8ae3a18f7689328f4b840dd4493460a1a112e84192646075f262d6f`.
The summary SHA-256 is
`1c89fabb47c34f6cda7d8e61b0dbc6fddfda77e1fd0ff31fe76388682c191765`.
All 48 frozen files matched canonical before documentation changes, and source,
import and pinned tool maps were unchanged through compilation. The
[receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/evidence/audited-update-replacement.json)
records full maps, tool identities, repairs and both run outcomes. Full logs and
outputs remain under
`/tmp/hub-registration-audit-20261101/audited-update-replacement-checkpoint2-mirror/`.

A wrong scp option and a truncated uncompressed source transfer interrupted initial
staging. No compiler started before the extracted source map matched. The second
checkpoint used a verified compressed archive. These were transport/setup failures,
not proof results; no duplicate compiler was launched on an observation timeout.

## Remaining boundary

PostgreSQL atomicity/locking, Core append, serialization and native source projection
remain explicit contracts. This concrete audit contribution does not discharge
generic namespace/Register/Replace adaptation. No runtime or authorization behavior
changed, and no native suite, deployment or model call was run. The omitted-Update
semantic control and exact restoration remain next. Full Hub verification remains
partial.
