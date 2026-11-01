# Registration can outlive removal of its instance

A deterministic native PostgreSQL test reproduced an instance registration
committing after removal of that instance had completed. The final database has
no instance or registration-token authority, but has the new registration and
its login; an explicit catalog refresh still publishes that registration. The
fix and lifecycle proof are pending at this checkpoint.

The source basis is Hub `a8fa0bcd27d76fac78216e496b6351cddfd77945`, with
test-only changes and no production changes. GPT-6.1 Sol wrote the fixture,
GPT-6 Luna ran it on Ubuntu Linux x86_64, and GPT-6 Astra reviewed the actual
service/store paths, assertion output, fixture corrections and fresh compilation.
This extends the investigation beyond the removal exclusion in the earlier
[register/replace/update qualification](2026-10-30-registration-update-qualification.md).

## Actual operation sequence

The test is
`registration::store::concurrency_tests::an_authorized_first_registration_cannot_survive_instance_removal`.
It uses Core's private PostgreSQL fixture, Hub's actual registration service,
a real instance token, and SDK-generated signed metadata for a unique fixture
slug. The metadata declares the same URI scheme as that slug. It runs in the
installation database and creates no namespace claim.

1. Registration reads the instance authority and passes metadata/signature
   verification. Its transaction privately creates the deployment and login.
2. A fixture-only `BEFORE INSERT` trigger holds its registration INSERT on an
   advisory gate. The test observes the blocked PostgreSQL backend, rather than
   using a delay to assume the ordering.
3. The public instance-removal function runs through a second pool. It sees no
   committed registration, deletes the instance, and commits while the INSERT
   remains held. The observed pre-release state has no instance, authority,
   deployment, registration or registration login.
4. Releasing the gate lets registration commit and return accepted. Its later
   instance `served` UPDATE affects zero rows without failing. Both calls finish.
5. The test reads complete persisted registration/deployment fields and selected
   role properties, enumerates the fixture's registration logins, refreshes the
   catalog explicitly, and finds the surviving route.

The retained deployment is permitted state. The violation is the registration,
its login and the published entry left by an instance-authorized registration
after removal. A successful registration followed by successful removal is also
valid; the regression does not require every overlapping registration to fail.

## Why the source permits it

`RegistrationService::registration_authority` reads the instance outside the
registration transaction. `RegistrationStore::register_instance` and
`remove_instance` hold no common instance-row lock. Removal's registration DELETE
therefore cannot see the pending INSERT. The registration foreign key names the
retained deployment, not the instance, so deleting the instance does not prevent
the pending registration from committing. Catalog loading also permits a
registration whose instance join is absent.

The proposed correction acquires the same instance row with `SELECT ... FOR
UPDATE` in both transactions, before registration effects and before removal's
registration DELETE. The guard lasts through commit. A registration finding no
instance returns the existing invalid-token result. This implements the existing
instance lifetime; it adds no repository permission, approval or namespace rule.
External-environment schema preparation remains a separate database operation,
even when the installation transaction holds that guard.

## Execution and fixture corrections

The accepted reproduction is **baseline4**: PostgreSQL 18.6, Rust 1.99.0,
the repository's existing Docker development/source stages and dependency cache,
and a temporary focused check stage. Its command is `cargo test --locked -p
veoveo-hub --lib` with the exact test name above and `-- --exact --nocapture`.
SQLx compiled online against a private database migrated with pinned Core and
Hub migrations. The outer command bound was 600 seconds; the Rust test bound
was 120 seconds. One test ran, failed its intended final-state assertion, and
returned Cargo 101 (Docker 1), without a timeout. Compilation took 40.44 seconds,
the test body 1.79 seconds, and the Docker command 59.933 seconds.

Earlier attempts are retained, with distinct meanings:

- Baseline1 failed metadata admission because the fixture changed its slug but
  not its URI scheme. It never reached the race. Correcting the scheme and
  checking metadata before signing repaired only the fixture.
- Baseline2 reproduced the actual orphan. Its role assertion also counted the
  fixture owner's legitimate bootstrap membership, which must survive cleanup.
  The query was corrected to exclude `current_user` and deduplicate memberships.
- Baseline3 ran a cached test executable: Cargo finished in 0.28 seconds with no
  Hub compilation, and the result still contained duplicate owner memberships
  despite the corrected `DISTINCT` query. Its source map was correct, but that
  did not establish execution of the new embedded SQL. It was rejected as
  qualification of the corrected regression.
- Baseline4 performed `cargo clean -p veoveo-hub` in the existing target cache,
  preserving dependency artifacts. The log confirms fresh Hub compilation and
  records the resulting executable. The final login list contains only the
  generated registration login. The same row/catalog violation remains.

The accepted run's deployment is `01a19613-57b2-7212-996e-0cbc23b088be`;
its registration client is
`removal-01a1961357b27212996e0cbc23b088be-01a1961358007502bdb0e029a4f1fa62`.
The row's `orphaned_at` is null, the registration login is present, and the
refreshed catalog names that client and deployment. Secrets are omitted.

## Reproduction identities

The temporary source packet is
`/tmp/hub-registration-instance-removal-20261101/test-only3/`. The local evidence
mirror is `test-only3-mirror/` beside it; the accepted log and source maps are in
`evidence-baseline4/`, with receipt `summary-baseline4.json` in the mirror root.
These are diagnostic artifacts, not installed components or committed build outputs.

| Input or result | SHA-256 |
| --- | --- |
| Rust test source | `963284e3caf4163cc698740043c5c4b48aa017e2b97b43f00a65b2f7c40a253f` |
| INSERT gate SQL | `f10fddf3c2891481642cc62ec340000bfd7a5603eeae364a728fa74d4affe836` |
| Corrected role-query SQL | `c0edbcf4994ba215476301a41db9b42ca1176a759f35bcda8d6c7080a7aad5e6` |
| Full source-map file | `fe6e9772024b1ec444bcb72ebf8886a182365241c0730cda7c0a09b28d9bbfae` |
| Temporary focused Dockerfile | `ad00a2a0899dfd86dd76ec93cc302d2cdf4b45a2316dc1e02d012ef227ca5671` |
| Test executable, 838,157,648 bytes | `275a57c68377d1d0132c14044f0b9504030650bf8151ff12bd67c5974320c7fb` |
| Full log | `92251f33ea9faa5543eaea499a1538a5a28bd30ddfb2fec29d8441e0025784d8` |
| Machine receipt | `f31828fb3cbea194b3a1715078b48d917e32b209933810e604f4f7a18942d834` |

All 1,206 source-map entries match before and after execution; all 289 existing
SQLx metadata files are unchanged. This source-only baseline uses online SQLx;
new queries still require generated offline metadata before normal qualification.

## Boundary and next work

This is actual service/store and PostgreSQL component evidence. It does not run
the HTTP handler, an OpenShell sandbox, a separate environment database removal,
or a deployed installation. Catalog state is measured after an explicit refresh;
asynchronous listener convergence and replica ordering are not measured.

The source reasoning assumes PostgreSQL READ COMMITTED statement visibility,
transactional writes and native row-lock behavior. The native fixture observes
one concrete schedule, not all schedules or crash outcomes. Existing Lean models
retain their earlier boundaries and do not yet cover this instance lifecycle.
No new Lean theorem, formal SQL refinement, deployment or paid model call is
claimed. Next: fix the transaction ordering, check both acquisition orders and
normal neighboring behavior, then connect the corrected lifecycle to a model
with explicit commit, abort and response boundaries.
