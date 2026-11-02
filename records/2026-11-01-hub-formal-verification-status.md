# Hub formal verification: coverage and pause report

## Decision and snapshot

Pause the broad formal-verification campaign. Preserve the completed proofs and
production fixes, and return to product work until a specific verification target
justifies another bounded effort. This is a recommendation to change how we spend
effort, not a finding that the checked proofs are worthless.

The goal is paused. Both workers stopped implementation; the builder confirmed no
compiler or control test remains active. This report is a read-only audit of prior
results, with a documentation status update. It runs no new proof, application
test, deployment or model-driven acceptance.

The authoritative Hub coverage map contains **12 system properties: 11 partial,
one unproved, none complete end to end**. These are broad, unequal obligations;
this is not a percentage of code or a claim that only trivial work is finished.
Many complete decision contracts exist inside the partial areas. The ten-area
goal becomes twelve rows because routing and Tasks are tracked separately and
the shared MCP extension contract is an additional foundation.

At the audit snapshot:

- Hub main and origin/main: `6c0a1e1f7f9089b879a22ab6c81048bf7527b0c7`, clean.
- SDK main and origin/main: `e9105ca`, clean.
- Docs main and origin/main before this report: `e5b7165`.
- An unrelated untracked `records/2026-10-29-embedding-health.md` is preserved.
- There is no registered `hub-lean-pilot` worktree. Other agents' worktrees are
  outside this report and were not changed.

GPT-6 Astra coordinated and reviewed; GPT-6.1 Sol wrote proofs and source fixes;
GPT-6 Luna ran compilation, tests and evidence scripts. The pause audit used the
same roles for coordination, defect/source review and process/result inspection.

## What the evidence means

There are three different kinds of achievement:

1. **Proofs of extracted Rust decisions.** Aeneas translates selected production
   functions into Lean; theorems establish exact outcomes, accepted cases,
   preserved output and required refusals. Compiler/translator correctness and
   explicitly modeled library interfaces remain trusted boundaries. Extracting a
   helper does not prove its asynchronous callers supplied current, correct inputs.
2. **Proofs of transaction and lifecycle models.** Handwritten Lean models describe
   SQL programs, failure prefixes and concurrent histories. They establish the
   modeled protocols. Source mappings and real PostgreSQL regressions support
   their relevance, but do not formally prove that every Rust/SQL execution
   implements the model.
3. **Native regression evidence.** Tests reproduce actual bugs and demonstrate
   corrected behavior in concrete executions. They are useful independently of
   Lean and are not proofs of every possible execution or deployment.

We assume PostgreSQL's applicable atomicity, locking, isolation and constraints;
we are not proving PostgreSQL. Cryptography, external services, clocks and
scheduler/recovery assumptions also remain explicit. Proofs are manual: no CI
gate, runtime proof service or new authorization policy was introduced.

Some packages concern older source graphs. Rebuilding those packages confirms
their theorems still check; it does not automatically make them proofs of newer
issuance, repository-grant or asynchronous paths. Each receipt's source scope
matters more than the current Git branch name.

## Covered contracts and remaining work

The [Hub proof map](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/README.md)
contains the detailed invariant definitions, source mappings and receipt links.
The following is the operational interpretation at this pause.

### 1. Shared MCP extension contracts — partial

Checked SDK resource resolution preserves exact-entry precedence, requires
agreement among matching templates and reports conflicts. The matching models
cover paths, query names and valid empty tails. The extracted Hub wrapper connects
these access requirements to current policy and delegated narrowing, including
the fifth target kind, AppOrigin, and legitimate `Authenticated` access with no
permission grant. Deliberate source faults were rejected by unchanged proofs and
native assertions, followed by restored passes.

Still missing: the complete route declaration → generation/validation → wire
advertisement/registration → Hub admission → SDK dispatch contract. Native
parsing and representation correspondence remain boundaries. We have not proved
every Veoveo extension; Task retention, usage, discovery degradation and App
dependencies are not covered merely because authorization is partly covered.

Evidence: [SDK–Hub qualification](2026-10-30-sdk-hub-authorization-qualification.md),
[current-domain extension](2026-10-31-hub-current-domain-proofs.md).

### 2. Task routing and retry continuity — partial

Extracted decisions preserve the original deployment/composition and expiry on
retry; reject wrong ownership or binding; and retain the caller payload except
for the intended execution capture. Four semantic faults, native caller tests and
restoration qualified that decision boundary.

Still missing: authoritative SQL lookup and concurrent insertion, expiry/pruning,
Core's claim/cancel/recovery transactions, and composition with current session
liveness and actual asynchronous dispatch. This does not prove every retained
Task survives every configuration or session change.

Evidence: [Task qualification](2026-10-29-task-continuity-proof.md).

### 3. Current authorization and delegation — partial

Checked contracts cover ordered exchange outcomes, current roles and risk rules,
deny precedence, complete registration/grant traversal, requested-permission
filtering and downstream narrowing. The composition preserves the actual caller
and legitimate common permissions as well as preventing amplification. This is
more than a standalone set-intersection lemma.

Still missing: the entire asynchronous endpoint, input freshness, current token
producer/recipient continuity, serialization and the full extension declaration
chain. Historical issuer proofs do not cover the newer repository-grant flow.

Evidence: [authority](2026-10-29-authority-proof.md),
[current roles](2026-10-29-current-role-proof.md),
[policy/issuer composition](2026-10-31-hub-policy-issuer-composition.md).

### 4. OAuth sessions and refresh families — partial

Extracted admission predicates check the exact owner, tenant, issuer, resource,
client, context, scope, family binding, revocation and expiry. Rotation does not
incorrectly change family authority. Transaction models cover concurrent refresh,
duplicate/replayed requests, the stable family lock, monotonic committed
generation, original successor, aborts and ambiguous commit acknowledgements.

Still missing: initial session creation, lookup/decoding, complete caller and SQL
refinement, upstream IdP delivery/encryption, pruning, and composition with live
Tasks and browser recovery.

Evidence: [refresh qualification](2026-10-30-refresh-concurrency-qualification.md),
[semantic controls](2026-10-30-refresh-controls-qualification.md).

### 5. Live configuration publication — partial

The source-mapped transaction model establishes one successor per locked
predecessor, coherent objects/context/pointer/audit writes, replayable committed
histories and exclusion of aborted writes. It includes legitimate publication
and lost-acknowledgement cases. Real PostgreSQL tests and actual-source faults
exercise the corresponding behavior.

Still missing: formal SQL/SQLx/Core-audit correspondence, replica adoption,
catalog-handle coherence, reconnect notifications, convergence and broader crash
recovery. Atomic publication in the database is not proof that every Hub replica
serves the new configuration promptly.

Evidence: [publication qualification](2026-10-30-control-publication-qualification.md).

### 6. Request selection, routing and issuance — partial

Extracted selection, collection and map contracts preserve the selected row,
refuse ambiguity and avoid unintended fallback. Snapshot and client construction
proofs connect route identity, current policy and a modeled issuer outcome while
preserving identifiers, records, ordering and caller deadline.

Still missing: actual asynchronous snapshot acquisition/freshness, TTL wrapper
logic, HTTP attachment/transport and recipient verification. New linked-runner
and repository-grant issuance is outside the older composition's domain. One
caller-deadline control lacks a completed independent wrong-output witness;
its proof rejection/restoration is not full control qualification.

Evidence: [request assembly](2026-10-30-request-assembly-proof.md),
[issuer composition](2026-10-31-hub-policy-issuer-composition.md),
[current issuance boundary](2026-10-31-issuer-composition-boundaries.md).

### 7. Discovery, cache and subscriptions — partial

Checked cache operations include reads, removal, key invalidation, start and
completion, with complete key/state preservation, pending-ticket and generation
fences, and invariants over supported finite histories. Current linked identity
is included in the key model. Native review also produced three real cache/watch
fixes listed below.

Still missing: server-wide invalidation through the unsupported callback path,
pagination/cursor semantics, asynchronous watch/reconnect behavior, cross-replica
freshness, and correspondence of native fingerprints, mutexes and collections.
Full pager extraction failed; no partial generated output was adopted as proof.

Evidence: [finite histories](2026-10-31-discovery-cache-finite-histories.md),
[current linked keys](2026-10-31-current-linked-cache-proofs.md),
[source controls](2026-10-31-discovery-cache-semantic-controls.md).

### 8. Factory reconciliation and recovery — partial manual model

Models preserve the complete retarget row and associated client, credential,
command and push-routing identity. They cover keep/start/restart/replace choices,
failure prefixes, retries, obsolete watchers and saved-parent histories. Delayed
old success or error cannot overwrite a newer modeled target. Constructive
success cases and deliberate faults accompany the proofs. Three actual factory
bug groups were fixed.

Still missing: allocation, full branch membership, retirement, cross-replica
reconciliation and actual OpenShell effect correspondence. A state-machine proof
does not establish native readiness, credential custody or eventual recovery.

Evidence: [retarget row](2026-10-31-factory-retarget-row-proof.md),
[recovery](2026-10-31-factory-recovery-proof.md),
[saved-parent controls](2026-11-01-factory-saved-parent-controls.md).

### 9. Computers and browser recovery — partial

Replacement models cover scoped claim/finalize/fail/show operations, stale
completion fencing, preservation of unrelated fields and ordered retry histories.
Two semantic controls and four real PostgreSQL stale-completion cases support
this model; the native cases passed existing production behavior and needed no
runtime repair.

The latest extracted decision proof establishes the exact highest matching Work
Context membership, absence exactly when no rule matches, termination and valid
client-only grants. Its extra semantic controls are unfinished.

Still missing: complete browser admission and recovery, current catalog/group
enrichment, credential issuance/renewal/custody and actual operation cancellation.
SQL fencing cannot undo an OpenShell request already accepted remotely. The
broader browser extraction failed in unsupported translation constructs.

Evidence: [replacement](2026-11-01-computer-replacement-proof.md),
[controls](2026-11-01-computer-lifecycle-controls.md),
[membership checkpoint](2026-11-01-work-context-membership-proof.md).

### 10. Registration, replacement and transactional audit — partial

This is among the strongest substantive parts of the effort. Models cover
replica/replacement and stale-update commit order, complete transaction programs,
login cleanup, locked observations, removal races, abort/retry and lost replies.
Audit models include Register/Replace/Update/Deregister, rollback and no-ops,
plus a service continuation where a later error follows an already audited commit.
Actual concurrent PostgreSQL regressions exposed and verified production fixes.

Still missing: formal refinement to the Rust/SQL/Core-audit implementation, full
service response construction, remaining namespace/expiry/deregistration adapters,
complete snapshot inputs, newer linked-runner persistence and external postcommit
effects. A caller error still does not necessarily mean rollback.

Evidence: [concurrency qualification](2026-10-30-registration-concurrency-qualification.md),
[update qualification](2026-10-30-registration-update-qualification.md),
[audit recovery](2026-11-01-registration-audit-recovery.md),
[audited update recovery](2026-11-01-registration-audited-update-recovery.md).

### 11. Native Lore grant production and token continuity — unproved

The Hub producer and current issuer/verifier chain are not proved. Required
iterator associated types, borrowed traversal, function pointers and loop exits
blocked translation. This is a material gap, not covered by older issuer proofs.

A narrower SDK contract is complete: constructing/projecting repository details
preserves the repository and every action, including valid empty-action read
grants. A real Rust action-dropping mutant failed unchanged proof and native test,
with an independent wrong-output witness and restored pass.

Still missing: exact direct/group assignment union, tenant/repository choice,
current token assembly, decoded-claim verification and the complete native Lore
authorization flow. The SDK detail helper does not discharge those obligations.

Evidence: [producer boundary](2026-10-31-repository-grant-translation-boundary.md),
[SDK detail proof](2026-10-31-repository-grant-detail-proof.md).

### 12. Cleanup, references and audit consistency — partial

Scoped registration cleanup/audit now has transaction, rollback and recovery
models plus native evidence. This is the only substantial part of the broader
cleanup property currently covered.

Still missing: protected references across environments, buckets, logins,
templates and sandboxes; create/delete races; session-family pruning versus
retained Task lifetime; and external deletion recovery. SQL atomicity cannot make
all those remote deletions atomic. A possible pruning/Task-lifetime interaction
was identified for investigation, not established as a bug or fixed.

Evidence: [audit correction](2026-11-01-registration-audit-fix.md),
[lifetime controls](2026-11-01-registration-lifetime-controls.md).

## Actual production value: ten correction groups

These are real source fixes on Hub main, verified against commit history and the
linked native evidence. They were found through source review and executable
counterexamples while developing verification; it would be inaccurate to say
Lean automatically found all of them.

1. **Replica/replacement race — `05737d6`.** A replacement could miss an unfinished
   replica and retain both old and new registrations/logins. Deployment locking
   now precedes the metadata comparison.
   [Evidence](2026-10-30-registration-replica-replacement-race.md).
2. **Stale registration update — `22cdabb`.** A removed client's update could
   overwrite replacement deployment metadata. Lock order and rollback now preserve
   the replacement while retaining the intended no-op response.
   [Evidence](2026-10-30-registration-stale-update.md).
3. **Discovery authority cache isolation — `8543cc5`.** Different delegated
   ceilings/current groups could reuse admitted descriptors, producing excess
   visibility or omissions. The cache key now includes the relevant authority.
   Tool execution separately reauthorized; no execution bypass was demonstrated.
   [Evidence](2026-10-31-discovery-cache-authority-isolation.md).
4. **Watch publication — `305aeb2`.** Watches observed an immutable selected
   catalog; live publication could leave stale streams/cache, and old admission
   could remove newer watches. Live signals and generation checks fix those races.
   [Evidence](2026-10-31-discovery-watch-publication.md).
5. **Deployment capability memo — `c23d9ae`.** One static deployment could
   suppress another deployment's discovery/subscription. Memo identity now includes
   generation and deployment.
   [Evidence](2026-10-31-discovery-watch-deployment-isolation.md).
6. **Factory retarget identity — `48d7e25`.** A command could target B while stored
   client/routing identity still named A, so B's pushes were ignored. Retarget now
   updates the coherent identity and joined registration fields.
   [Evidence](2026-10-31-factory-retarget-fix.md).
7. **Concurrent factory preparation — `c340a2d`.** Captured preparation could
   overwrite newer program/routing state or resurrect removed work. The existing
   runner guard now covers current selection, preparation, effects and publication.
   [Evidence](2026-10-31-factory-preparation-serialization.md).
8. **Saved-parent factory retry — `77b258a`.** A delayed retry could restore old
   target A after B succeeded. The shared parent guard and authoritative native
   branch identity/head check prevent obsolete success and error publication.
   [Evidence](2026-10-31-factory-saved-parent-retry-fix.md).
9. **Registration after instance removal — `12a132d`.** An already-authorized
   registration could commit after deletion, leaving an orphan login/catalog route.
   Both transactions now lock the instance before their relevant effects.
   [Evidence](2026-11-01-registration-instance-removal-fix.md).
10. **Registration audit atomicity — `3d1b0b9`.** Intentional removal omitted
    Deregister; admission could commit and then fail before recording Register.
    Six store paths now append existing activities inside the owning transaction.
    A later error can still follow an audited commit.
    [Evidence](2026-11-01-registration-audit-fix.md).

Qualification is not uniform. Early registration fixes have focused real-database,
neighboring integration, formatting and Clippy evidence. Discovery fixes have
focused native catalog/watch tests and loopback MCP fixtures. Factory fixes then
passed full Mac/Linux checks with 460, 465 and 469 passing tests respectively,
plus two skips each. Instance-removal and audit fixes reached 471 and 475 passing
tests respectively, again with two skips. These are successive suite snapshots,
not counts to add together.

For the latest production fix, full Docker checks took 129.017 seconds on the Mac
host and 261.231 seconds on Ubuntu. Both ran 475 passing tests; the two ignored
tests require private upstream configuration and image-reproducibility
infrastructure. Focused native Mac checks were separate. The audit-fix record
contains exact source maps, log sizes/hashes, test scenarios and failed setup
attempts. These checks do not claim deployment or browser acceptance.

Deliberately broken code used to test a theorem, authoring/parser failures,
unsupported extraction, stale binaries, fixture errors and test observation races
are excluded from the ten groups. Upstream changes made by other agents are also
excluded. Synthetic fixtures are not real model inference.

## Last checkpoint and unfinished local work

The last committed Hub increment, `6c0a1e1`, adds membership proofs, not runtime
logic. On Ubuntu the manual `lake build WorkContextMembershipAudit` completed in
5.583 seconds with warm dependencies. Its 48 guarded declarations and 12 printed
axiom closures passed. The 23,964-byte log has SHA-256
`045052b5cd49456db1e3725bce6d08e82d0f8065e71db2437a7fabcba1f6c053`;
the 479,760-byte proof OLean has SHA-256
`377ef7d7c74a8318cc587f4f00b3574654b2193c9088abd4116ee3645a8f982f`.
Source/output identities and the trusted library boundary are recorded in the
[committed checkpoint](2026-11-01-work-context-membership-proof.md).

After that checkpoint, four shared-model build commands passed in private copies:
current-role defaults and explicit leaves (20.60 and 21.40 seconds), and request
composition defaults and explicit leaves (3.48 and 32.82 seconds). The source
payloads were checked against canonical files; historical extraction boundaries
remain. A missing transitive SDK proof dependency required a private Lake manifest
refresh. That manifest correction and the new regression receipt have **not** been
adopted into the repository. These results therefore do not establish a fresh
clean-checkout build of every committed package as it stands.

The following membership fault-control attempt failed after 22.94 seconds because
its independent witness had recursion, constructor and audit-syntax authoring
errors. This was **not a successful semantic counterexample test**. The original
proof-negative check, second fault and restored-baseline check were not run. The
interrupted repair wrote no files. Only the isolated temporary validation tree
remains faulted; canonical Hub source is clean.

Temporary evidence is under
`/tmp/hub-computer-lifecycle-20261101/shared-regressions/mirror/` and
`/tmp/hub-computer-lifecycle-20261101/membership-controls1/`. These are scratch
experiments, not published qualification. The report preserves their status so a
future agent does not mistake a failed diagnostic for completed evidence.

## How much is left, and why pause

Completing the original goal is **substantial further work**, not a final proof or
two. The largest remaining obligations are:

- Current repository-grant producer → issuer → verifier → native Lore continuity.
- Formal connection from transaction models to actual SQL/Rust callers.
- Complete browser/Computer admission, custody and recovery.
- Cross-replica publication, subscriptions and asynchronous freshness.
- Factory allocation/retirement and correspondence to native lifecycle effects.
- Cleanup across resources and composition of Task/session lifetimes.
- Full MCP declaration/wire/dispatch correspondence and connected end-to-end
  operations using the established component contracts.

There is no defensible completion percentage or remaining-hour estimate. We have
not measured a stable throughput for these obligations, and translation support
is a determining uncertainty. Counting theorems, guards, files or lines would
overstate coverage. No reliable accounting separates time spent on proofs,
translation, source integration, builds and native bug fixing.

The work was valuable: ten production correction groups and reusable checked
contracts are concrete outcomes. The recent marginal return is weaker. More time
has gone into unsupported extraction, modeled library behavior, dependency
integration and proof-control authoring, while complete operational boundaries
remain open. Whole-Hub formal verification became too broad for an open-ended
development session. Coordination should have stopped to review that tradeoff
earlier rather than repeatedly treating another local proof as completion nearby.

Retain the existing manual proof assets and native regression tests. Resume only
for one stable, high-impact contract with an explicit source boundary, a useful
failure scenario and a completion criterion. Prefer a contract whose production
code the tools can already translate, or an explicitly design-level concurrency
question. If unsupported translation prevents the intended guarantee, record that
boundary and stop the slice instead of indefinitely expanding scaffolding. This
is a recommendation for later; it starts no new work while the goal is paused.
