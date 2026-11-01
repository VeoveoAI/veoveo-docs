# Transactional registration audit correction

The registration store now writes its existing audit activities in the same
PostgreSQL transaction as its registration changes. This corrects the two native
failures recorded in [the earlier probes](2026-11-01-registration-audit-gaps.md):
intentional removal omitted its audit, and a served-marker error could occur after
admission committed but before its Register audit.

This is native component evidence. The composed audit/lifetime Lean proof is a
separate, unfinished checkpoint; no deployment or OpenCode run occurred.

## Implementation and source

GPT-6.1 Sol implemented the correction, GPT-6 Luna ran builds and checks, and GPT-6
Astra reviewed source, test outputs and evidence. The base is Hub
`e060b328ac79ad5e1870de37af30a0ec627e9d64`, with Core
`422dcf268d690fcbc3fee435cf9b81e7f36ffeac` and SDK
`7360c0f96cb616c519d27256df214ff4f2e6e831` unchanged.

Six store paths append their existing `hub.registration` activities before commit:
ordinary registration, instance registration, update, deregistration, expiry and
intentional instance removal. Each append uses Core's existing
`AuditTransactionWrite` on the caller's connection. Ended registrations each get
their own append in that transaction; Core's per-append size limit therefore adds
no cap on the number of registrations an operation may remove. Service/watch
audit producers were removed to avoid duplicates. Their tracing remains.

The source retains existing admission and lock order, and unchanged or missing
operations append no change record. It also retains postcommit served updates,
catalog reload and response assembly. Those steps can fail after an audited
commit; an error reply does not establish rollback or continued registration
liveness. External data-environment preparation remains a separate transaction.

## Native fault and retry observations

The real signed-service fixture accepted a registration, checked every typed
response field against input or stored values, and connected using its issued
login. Removal then deleted its instance, authority, registration and login while
preserving the existing deployment identity. Its earlier Register record survived
and Deregister record `01a196ac-d366-79c2-b4da-b0278ee350c4` was added for
deployment `01a196ac-d325-7850-a7e6-4814af2c5fa5`.

A disposable trigger refused only the later `served_at` update for deployment
`01a196ac-d3aa-71d0-b44e-5024261c1bee`. The service returned the expected internal
error; the full instance, including null `served_at`, was unchanged. Admission and
its login remained, now accompanied by Register record
`01a196ac-d3bc-7982-8385-f83fa5b86368`. Both original failure assertions now pass.

Two additional tests refuse actual audit inserts and then clear the fault for a
real retry. They exercise first admission, replacement, changed update,
deregistration, expiry and intentional removal, including refusal of a later
Register append after an earlier ClaimNamespace or Replace append. Snapshots show
the owned domain changes and earlier private audits roll back together. The
unchanged/missing operations append nothing. The sequential namespace scenario
finishes with `claim_namespace, register, replace, register, update, deregister,
register, expire`; the instance scenario finishes with `register, replace,
register, deregister`. These are observations of sequential fixtures, not a claim
that audit sequence numbers order concurrent commits.

The expiry test explicitly preserves the separate orphan-marker update. It checks
that timestamp before comparing the rest of the state with the pre-expiry state;
it does not claim marking rolls back with removal.

## Checks and corrections during qualification

The focused Linux run freshly compiled three test executables, then passed nine
store tests (2.04 seconds of test-body time), three service tests (0.03 seconds),
the registration integration test (26.37 seconds) and seven instance-registration
tests (22.74 seconds): 20 passed, none failed. Strict library Clippy passed.
BuildKit reported 112.6 seconds for compilation, 54.0 seconds for the test stage
and 18.8 seconds for Clippy. Executable sizes and hashes are in the receipt.

Real SQLx preparation added exactly two records to the 295-record metadata set;
no existing record changed. Its initial temporary preparation installed the
test-only audit fault table explicitly. The first standard Mac check then exposed
that the repository Dockerfile lacked that setup: online SQLx validation stopped
before Clippy or tests because the selector table did not exist. Adding that setup to the Docker check allowed SQLx validation through, but the
full suite exposed the same dependency in the database-conformance fixture. The
final correction instead uses seven fixed test-only utility DO statements to
select the refusal activity after each test creates its own table. Each statement
checks that exactly one selector row changed. The ordinary migrated compile and
conformance databases need no fixture table; the temporary Docker change is
removed. Production migrations, Core and the conformance checker are unchanged.

The first Linux full-check staging attempt was rejected before Docker because
macOS tar included AppleDouble files. A portable archive built from the exact
source manifest removes that packaging error. The failed attempts remain in the
receipt; neither is counted as a successful check.

The formatter evidence initially contained an incomplete diff excerpt. Replaying
pinned rustfmt on all three original Rust files reproduced the final formatted
files byte for byte. The complete diff and original excerpt are retained. A later
comment-only correction removes stale descriptions of the pre-fix failure.

The intermediate full runs reached 475 tests: Mac passed 474 with the conformance
failure; Linux passed 473 with that failure and a race in an existing factory
test. That test waited for the linked revision before asserting the parent
revision. Factory writes the linked revision, own-tree digest and parent revision
in separate awaited statements, so the earlier wait could finish too soon. Its
bounded predicate now includes the expected parent revision; all final assertions
remain unchanged, and no sleep or production behavior is added.

After those repairs, native Mac checks passed database conformance (one test,
1.01 seconds of test-body time), registration concurrency (nine, 1.98 seconds)
and the linked-runner test (one, 1.53 seconds). Command times including compilation
were 45.910, 34.415 and 12.778 seconds. Normal SQLx preparation took 22.264 seconds,
removed the direct-UPDATE metadata, added seven utility-statement records and
preserved the other 296 entries. The final metadata count is 303.

The frozen final native-check source contains 1,251 files with map digest
`ee81b223cec4229cd7efc8041c3572fbeda3eb5463b5e9766c98e3cb8500301e`.
All those bytes match the adopted working tree. Independent unfinished Lean files
are not part of that native-check snapshot.

Final `docker build --target check .` passed on both hosts. Each ran 475 tests,
all passing, with two existing ignored tests: native upstream transport requiring
private operator configuration, and image reproducibility requiring BuildKit and
its registry. Mac Docker completed in 129.017 seconds (40.818-second Nextest
phase); Ubuntu Docker completed in 261.231 seconds (55.282-second Nextest phase).
These are Linux-container checks on both host architectures, separate from the
native Mac focused commands above. SQL metadata, formatting, strict Clippy,
dependency policy and feature checks passed in the same normal check pipeline.

Final full-check logs: Mac 490,277 bytes, SHA-256
`357e1780913a71bf7850331073fc5fbeda8340f94c299d694dd24ef1c0f5c7f7`;
Linux 490,167 bytes, SHA-256
`10c42c4ee08176f8d6ada0ae7abb6d3388beee90523821670f20f0dcbd86093c`.
Both full source/context maps and the 879-file nonproof build-input map remained
unchanged. Two later Linux staging attempts stopped before Docker (archive reader
error and an already-existing empty evidence directory); final extraction and
source equality passed before the successful build. These are tooling failures,
not application failures or extra test runs.

## Evidence and limits

The [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/evidence/native-audit-fix.json)
records exact commands, source maps, byte identities, timings and the failed
preparation attempts. Temporary evidence is under
`/tmp/hub-registration-audit-20261101/` on the Mac and the corresponding
`/home/rozgo/.cache/lean-pilot/hub-registration-audit-20261101/` on Linux.

The focused log is 42,514 bytes, SHA-256
`9efb5fe355a9fd7f7edf823936086cca007a586340a01b3f33bd26ea66bde2e3`.
It contains synthetic fixture data and public identities/digests, not raw
credentials. Explicit catalog refresh proves persisted projection only, not
listener delivery or replica convergence. Accepted login connection is observed;
independent wrong-password rejection and runtime `pg_hba` inspection are not.
Bootstrap group/schema rollback is not separately observed. PostgreSQL
transaction/locking/role semantics remain platform assumptions, not formally
verified database internals. The unchanged earlier lifetime proofs retain their
recorded source scope; this native correction alone does not extend them to audit
or complete service responses.
