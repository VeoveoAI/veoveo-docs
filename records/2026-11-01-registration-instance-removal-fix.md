# Instance registration and removal share their lifetime lock

Hub `12a132dcbdddcd7fad1defcd007432385d237a76` fixes the
[reproduced first-registration/removal race](2026-11-01-registration-instance-removal-race.md).
Both real PostgreSQL operation orders now pass. Full repository Docker checks
pass on Mac and Ubuntu, each with **471 tests passed and two skipped**. The new
Lean lifecycle model is still being authored; this record qualifies the native
correction, not that model or a deployed installation.

GPT-6.1 Sol implemented the DESIGN change, store/service correction and regression
fixtures. GPT-6 Luna generated real SQLx metadata and ran the logged checks.
GPT-6 Astra reviewed the source, both complete observed schedules, final row/login
and catalog state, full-check results and source applicability. No model-driven
acceptance or paid inference call ran.

## Change and observed behavior

The new `lock_instance.sql` selects the existing instance row `FOR UPDATE`.
Registration acquires it inside its installation transaction before external
schema preparation, deployment upsert, replacement and admission. Removal
acquires the same row before taking its registration DELETE snapshot. Both hold
the lock until transaction completion. A registration finding the instance gone
returns `None` from the store and the service's existing
`Unauthorized { token_sent: true }` outcome.

This serializes the existing lifetime rule; it adds no namespace, repository,
token-format or approval policy, and requires no migration. Registration takes
instance then deployment then registration locks; removal takes instance then
registration locks. Ordinary registration and per-client updates keep their
deployment-first order. External-environment preparation still uses a separate
connection and is not rolled back atomically with the installation transaction.

The two deterministic fixtures call the actual registration service and public
removal function, with SDK-signed metadata and native PostgreSQL transactions:

- **Registration first:** registration reaches its held INSERT; removal is
  observed waiting on that backend at the shared instance-row query. Releasing
  the gate produces an accepted registration and completed removal. The instance,
  token authority, registration, client login and explicitly refreshed catalog
  entry are absent. The deployment remains, as intended.
- **Removal first:** removal reaches its held instance DELETE while owning the
  instance row. A plain authority read still sees the earlier committed row;
  the actual service then waits at `SELECT ... FOR UPDATE`. Releasing removal
  yields the existing invalid-token result. No deployment, registration, login
  or refreshed catalog entry is created.

The forward test retains the baseline's gate, ordering observations and cleanup
assertions, and strengthens its aggregate to require actual acceptance. The
reverse fixture is new. This is therefore not a byte-identical regression claim;
the added acceptance assertion prevents indiscriminate refusal from passing.

PostgreSQL's documented [READ COMMITTED behavior](https://www.postgresql.org/docs/18/transaction-iso.html#XACT-READ-COMMITTED)
explains the waiting selector's missing-row result after committed deletion;
[native lock lifetime](https://www.postgresql.org/docs/18/explicit-locking.html#LOCKING-ROWS)
is an assumed platform contract. The tests observe these concrete schedules;
they do not prove PostgreSQL.

## Qualification

All checks use the same frozen source: 1,212 files, source-map SHA-256
`cd33fd36fe3c4de11f76375eeb65d46cff813f9f1afdfd54545099fa9f7d7901`.
The non-proof build inputs are 859 files with map SHA-256
`7384abd51d675dea860023cf15dc90050e9dcf1e30e213f9e054920ac55e6db3`.
Source maps remain unchanged before and after every check. Rust is 1.99.0;
native fixtures use PostgreSQL 18.6. Mac native checks use aarch64 Darwin, while
the full Mac check runs in Docker Desktop; Linux checks use the Ubuntu x86_64 host.

| Check | Command time | Test body | Result |
| --- | --- | --- | --- |
| Linux registration concurrency namespace | 46.554 s including Docker build | 2.11 s | 5 passed |
| Mac instance-registration integration | 70.652 s | 25.42 s | 7 passed |
| Mac exact factory cleanup test | 12.214 s | 4.45 s | 1 passed |
| Formatting | 0.724 s | — | Passed |
| Strict library Clippy | 15.597 s | — | Passed |
| Full Mac `docker build --target check .` | 155.629 s | 35.802 s nextest | 471 passed, 2 skipped |
| Full Linux same command | 338.489 s | 59.748 s nextest | 471 passed, 2 skipped |

Both new lifecycle tests appear individually as passing in both full logs. The
skipped tests require an external BuildKit daemon/registry and an approved native
upstream fixture/private operator configuration. These skips do not qualify those
external systems. Factory cleanup here uses its component fixtures; it is not a
live OpenShell deletion measurement.

The [committed machine receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/evidence/native-instance-removal.json)
contains exact commands, source/query hashes, baseline and fixed outcomes,
binary identities, log hashes, timings and all recorded limitations. The Linux
focused executable has SHA-256
`bfef9989c2f1c89ba0741c3e8d2ade9ab54d7204fe505cf300ab9b4a7e4c4bd7`;
its byte size was not captured. Mac integration binaries were measured at
44,576,360 and 120,599,544 bytes, with their hashes in the receipt. No executable,
full build log or private database is committed.

## SQLx and execution exceptions

SQLx 0.9.0 prepared the four new queries against a private PostgreSQL database
migrated with Core `422dcf268d690fcbc3fee435cf9b81e7f36ffeac` and Hub migrations.
Exactly four metadata files were added; none of the previous 289 changed or
disappeared. Preparation took 23.261 seconds. Only the test Rust file changed
under the authorized formatting pass; its exact diff is retained in the evidence.

The temporary preparation script raised a reporting `NameError` after successful
generation and database shutdown. The generated metadata was reconciled with the
four SQL files from those completed artifacts, without repeating generation.
Focused log parsers missed binary/status markers; the raw logs supplied the
markers and named Mac binaries were measured directly. A full-build preflight
also rejected an archive hash sampled before archive creation had finished;
the completed archive and remote copy matched, and only the expected hash was
corrected before either full build ran. Original diagnostic logs are retained;
none of these reporting/setup failures is counted as a test pass.

Temporary evidence lives under
`/tmp/hub-registration-instance-removal-20261101/fix1/`; its final consolidated
supplement has SHA-256
`dfcd2e64ea1359fdac3dda903ec032e85ac6e666e1e96b7578c3e4a9d2fca98c`.
The earlier reproduction record preserves the rejected stale-binary baseline
and the corrected fresh reproduction separately.

## Remaining formal boundary

The existing register/replace/update models assume a retained deployment and
explicitly exclude this lifetime race. The new model must represent absence
before first registration, derive shared-lock ownership and current DELETE
snapshots, account for every staged login removal and instance deletion, and
separate actual commit/abort decisions from response delivery. It must admit
valid registration-first behavior as well as missing-instance refusal, and
construct the original orphan with its real late DELETE lock intact.

No arbitrary-interleaving theorem, formal Rust/SQL refinement, token-reissue
composition, asynchronous listener convergence, external-database atomicity or
deployed recovery is established by this checkpoint. The comprehensive Hub
verification goal remains active. Deployment remains another agent's work.
