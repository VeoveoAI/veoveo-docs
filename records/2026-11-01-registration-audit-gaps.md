# Native registration audit gaps

Two focused PostgreSQL probes reproduce missing audit evidence in Hub's actual
registration lifecycle. This is a native component checkpoint, not a Lean theorem,
SQL refinement proof or deployment result. Production code was unchanged in both
probes. The corrective implementation and composed proof are pending at this
checkpoint.

## Source and execution

Hub `78d813239dab25d22ccf288fb340b0705b15dbea` contains native runtime
`12a132dcbdddcd7fad1defcd007432385d237a76`, with Core
`422dcf268d690fcbc3fee435cf9b81e7f36ffeac` and SDK
`7360c0f96cb616c519d27256df214ff4f2e6e831` unchanged. GPT-6.1 Sol authored the
temporary test-only patch and reviewed the call paths; GPT-6 Luna compiled and ran
the probes on Linux; GPT-6 Astra reviewed the complete test log, source delta,
contract and evidence. No OpenCode qualification, provider inference or deployment
was performed.

The private overlay adds two tests and two SQL files to the existing registration
fixture. It uses real signed service requests, an instance's actual initial token,
the existing migrated PostgreSQL fixture and the public instance-removal function.
The served-failure probe installs a trigger only in its disposable database,
rejecting `UPDATE OF served_at`; registration admission does not write that column.
There are no production test hooks, sleeps or simulated database outcomes.

The first preparation attempt stopped on formatting in the new test file. Pinned
rustfmt normalized only that file. Real SQLx preparation then passed in 23.2 seconds
of BuildKit stage time and produced exactly two metadata records; all 293 existing
records were unchanged. The effective source has 1,234 files and map digest
`c7e3cdc1ef07d8b526aa69192c175ad66ccc1cc5d126fbe3055da34d857a87a0`, unchanged
before/after the tests. All six runtime guards matched the frozen baseline.

A fresh `cargo test --locked -p veoveo-hub --lib --no-run` passed in 53.36 seconds
of Cargo time (59.2-second BuildKit stage), using Rust 1.99.0 and PostgreSQL 18.6.
Both tests used the resulting executable `veoveo_hub-b339354d3c2cf9a6`, SHA-256
`c8fb163f804edf1ca255dba609060e0cbf710ca6f6d9637254353a54c2ecb004`.
Executable byte size was not captured.

## Intentional removal

Exact command:

```sh
cargo test --locked -p veoveo-hub --lib registration::store::concurrency_tests::intentional_instance_removal_records_the_ended_registration -- --exact --nocapture
```

The service accepted the signed request for deployment
`01a19695-edcd-7083-806e-ed846d6f954b`. The fixture checked every typed response
field against supplied or stored values: client identity, metadata, statement,
issued time, configuration URI, access-token trust, optional surfaces, database
binding, login and issued credential shapes/digests. The issued login connected to
the fixture database. This does not by itself establish password enforcement.
The timestamp assertion uses PostgreSQL microsecond precision, not wire NumericDate
equivalence.

The acknowledged Register audit was
`01a19695-eddb-74e2-bf47-3f9e382a88dd`. Public instance removal then succeeded:
instance and registration authority were absent, registration/login maps were empty,
the deployment identity remained, and explicit catalog refresh found no route.
The complete before/after audit arrays were identical: the original Register
record remained and no removal record was added. All those assertions ran before
the intended final failure, `documented intentional removal has no audit of its
ended registration`. One test ran, Cargo exited 101, and test-body time was
1.86 seconds.

## Error after admission commit

Exact command:

```sh
cargo test --locked -p veoveo-hub --lib registration::store::concurrency_tests::a_served_marker_error_cannot_leave_an_unaudited_registration -- --exact --nocapture
```

Deployment `01a19695-f4d7-7402-8976-1f344ce705a4` reached the exact injected
served-marker failure and returned `internal_error`, without ClientInformation.
The instance and its authority remained unchanged, including null `served_at`.
The committed deployment, one registration and its login remained. The stored
metadata/statement digest matched the request, and explicit catalog refresh loaded
that persisted registration. Audit arrays were empty both before and after.

The final assertion permits either rollback or a committed Register audit; it does
not encode the defective persistence as desired behavior. It failed with `a real
served error returned after admission committed without the required registration
audit`. One test ran, Cargo exited 101, and test-body time was 0.93 seconds.

The Docker stage exited zero only to collect both test outcomes. It is not a test
pass: the recorded Cargo exits are `101,101`. Neither test timed out or stopped at
a signature, fixture, response-field or setup assertion.

## Cause and next correction

At this native revision, `RegistrationStore::register_instance` commits before the
service writes `served_at`, records Register audit, reloads and assembles its
response. A served failure therefore skips audit after admission has persisted.
The public instance-removal wrapper and its Factory caller contain no registration
audit producer. Hub's design requires audits for registration/removal, and Core's
existing `AuditTransactionWrite` appends inside the caller's transaction without
starting or committing another transaction.

The intended correction uses that existing API in the owning registration
transactions, with the existing activities, including Deregister for registrations
ended by intentional instance removal. It preserves missing/no-op behavior and
does not impose Core's per-batch limit on the number of registrations removed.
Served updates, catalog reload and response delivery remain distinct postcommit
effects. External environment preparation remains a separate database operation.

Next qualification must cover audit-insert failure, domain rollback and successful
retry, and then compose the audit/postcommit contract with the existing lifetime
proof. The current proof covers the scoped registration store model; it does not
establish these audit effects or complete response payloads.

## Evidence and limits

The committed [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/evidence/native-audit-gaps.json)
contains source/tool identities, measured timings, exact commands and observation
identities. The full temporary packet is
`/tmp/hub-registration-audit-20261101/probe1`; its evidence mirror is
`/tmp/hub-registration-audit-20261101/probe1-mirror`.

- Test log: 19,153 bytes, SHA-256 `c2d878d98897853d267d14151109f0d97a484f4f90d6324dad8ee20586cc5f31`.
- Qualification summary: SHA-256 `65b956bc39f26765dfa404bde215cc2b7146d4d0f48ee960979cbf475e3ff0e5`.
- Authored test-only patch: SHA-256 `e54174a19cf69d74eb22794d116c499f2be5e24cf1601b0713f716689634929c`.
- Formatter-only diff: 13,427 bytes, SHA-256 `7015f62d6e16730c73995b7423683452b90387f4e9dcc4d18de123d7b8162e2e`.

Snapshots contain public values and credential/statement digests; raw credentials
and signed statements are absent. Explicit catalog refresh establishes persisted
projection only, not listener delivery or replica convergence. The response checks
cover one accepted fixture, not all valid response shapes. PostgreSQL transaction,
locking and role semantics remain platform assumptions supported here by native
observations, not formally verified database internals.
