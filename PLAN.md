# Plan

What is next and what is open. The design is in [ARCHITECTURE.md](ARCHITECTURE.md)
and the `DESIGN.md` files it maps; what is proven is in the
[qualification checklist](QUALIFICATION_CHECKLIST.md); evidence is in
[records](records/README.md). Approved 2026-10-24.

## 1. Documentation structure

Design, status and records each have one place:

- **Design** is in `DESIGN.md` files: how each part works now, without dates or
  evidence. Each decision has one owner; other documents link to it. A design change
  is written there first and implemented in the same branch.
- **Status** is this plan and the qualification checklist.
- **Records** are dated evidence and history, cited by reports.

Steps:

- [x] Move the five dated plans into `records/` unchanged.
- [x] Write `ARCHITECTURE.md`: what no repository owns, and the map of which
      `DESIGN.md` owns each topic.
- [x] Move each current decision from the records to its owner's `DESIGN.md`. Where
      a record and the code disagreed, the code was right and the design now says so.
- [x] Point the workspace and every Veoveo repository's `AGENTS.md` at its design.
- [x] Fix every link to a moved document; links across repositories are GitHub URLs.
- [x] Bioma's `DESIGN.md` reads as the template's would (BiomaAI/veoveo-installation `cd04d4c`).
- [x] The visual guide shows the current design, checked in Chrome (2026-10-25).

Done when every current decision has exactly one owning `DESIGN.md`, every repository
points to its design, and all links resolve.

## 2. Platform tools at run time

The Lore and SDK CLIs reach the workloads that use them from their own images, as
read-only image volumes, instead of being copied into other images. Upgrading Lore
builds one image and changes one value. The design is in the installation's
`DESIGN.md`.

- [x] OpenShell: an `image` volume kind for the Kubernetes driver, admitted only when
      pinned by digest from a repository the installation lists (`491b3503d`).
- [x] Installation: the mounts in the Computer, factory and Hub templates; policy
      rules name the mounted path; the lock names each image once and fills the files
      that use it (`518934b`).
- [x] Hub: no Lore image setting or build context; factory instances take their size
      and mounts from the factory template (`9e00c77`).
- [x] Time, console and the MCP template: images carry only their toolchain.
- [x] Build and deploy; a new Computer version. All merged to `main`.
- [x] Probes: the mounted CLIs in a Computer, Hub reading `openshell/`, an instance
      cloning and serving (Time, D2), a source-only push restarting the same sandbox (D4).
- [x] The upgrade drill: one image built, one value changed, every workload on the new
      Lore at its next start ([record](records/2026-10-25-platform-tools-and-time-flow.md)).
- [x] Bioma's installation updated as template output (`cd04d4c`), and the records.

## 3. Then

1. Done: core cuts charge periods to whole microseconds; the SDK, Artifact and
   Embedding took the new core, and Embedding is redeployed
   ([record](records/2026-10-25-charge-periods.md)).
2. Done: the installation template's corrections (identity example, names, pins, role
   claims, tunnel keys, lock, Linux and Mac paths, Embedding and Media wiring; the stale
   `computer/LORE_HUB.md` and the `factory_branch` hook that guarded nothing removed)
   and Time's README ([record](records/2026-10-25-batch3-and-g1.md)); Bioma's installation
   matches (`cd04d4c`).
3. Done: Hub's `source_artifact` rules (`artifact__create_download` on `/mcp/computer`, and
   `/mcp/local` on the box) are dead: they served environment source activation,
   which Hub removed in `0ee1dd0`. They went with part 2's policy.
4. Done: `embedding-runtime` and `media-provider` run the current OpenShell runtime
   ([record](records/2026-10-25-charge-periods.md#runtime-restarts)).
5. Done: the Time factory flow, C1, D1–D11 and B7, as a person, with no model
   ([record](records/2026-10-25-platform-tools-and-time-flow.md), [record](records/2026-10-25-batch3-and-g1.md)); left: the node
   reboot of D11, which needs the box's sudo password.
6. Done: G1, the final MiMo acceptance ([record](records/2026-10-25-batch3-and-g1.md)).
7. Done: the installation template's Python tools (`identity/configure-hub`,
   `identity/configure-openshell`, `identity/provision`) moved into `veoveo-installer`
   and are deleted, in Bioma's installation too.
8. Approved 2026-10-25:
   - Done: the person's Hub CLI works inside their Computer, as them.
   - Done: planned replacements log below ERROR in Hub (Computer proxy; rmcp fork).
   - Done: Hub's check caches compiled crates (256 s cold, 168 s after a one-line change).
   - Done: `veoveo-installer` `plan` and `apply`, on both installations' `main`; the first
     full apply published only Hub's differences, and a second changed nothing
     ([record](records/2026-10-25-installer-first-apply.md)).
9. Done: housekeeping: the coordinator's admin grant is revoked; workspace deletion is
   5.5 s normally; merged branches and worktrees are removed.
10. Decided 2026-10-25: a push that does not compile stops its branch until a fixing
    push, as Hub's design says (checklist D7); a collected Computer's open tab keeps
    OpenCode's own 503 page, whose Reload starts the Computer; the Mac's Docker Desktop
    keeps its default build-cache limit, so cached checks are fast on the box.
11. Done 2026-10-26: the flaky Hub test (the fixture holds its socket), blank log lines
    stored empty, the release note declared with its template, and the remaining
    Computer checks ([record](records/2026-10-26-closeout.md)).
    Done: What's new lists only a changed note (Hub `d40d067`,
    [record](records/2026-10-26-hub-whats-new.md)). Decided: `console__computer` stays
    offered to every profile and answers 401 outside a Computer, as console's design says.
    Done: Lore lists each person's repositories through Hub (`repository_catalog =
    "auth_service"`), and authorization stays in the token; a Computer's Lore token no
    longer repeats each repository as a scope, so about 130 to 135 fit Lore's 16 KiB header
    list ([record](records/2026-10-26-lore-listing.md)).
    Done: checklist A3 and C2 with a second account, and the listing and clone isolation
    between two people ([record](records/2026-10-26-second-person.md)).
    Done: G1 again on the current stack, with MiMo-V2.6-Pro: three pushes with the
    scope-free Lore token, served, broken, diagnosed and fixed in 730 s
    ([record](records/2026-10-26-g1-rerun.md)).
12. Done 2026-10-27: sandboxes share the node. Each size is a limit with zero requests in its
    driver configuration, so nothing is set aside: 30.5 of 32 CPUs had been, for 0.6 in use,
    and Computers could not start. Every existing sandbox was recreated; Computer version
    `a566f49873f9` ([record](records/2026-10-27-shared-capacity.md)).
    Done 2026-10-27, Hub `0ca6bb5`: Lore connections are kept alive, so a watch no longer
    goes silent after 2 h 13 min idle (Cilium forgot the connection and Lore's events were
    dropped); an instance whose sandbox OpenShell removed says so; a Computer that did not
    start names the sandbox's unmet conditions; the previous version is offered only when
    there is one (checklist D12, D13).
    Done 2026-10-27, Hub `5a1b926`: signing in again joins a Computer's live custody instead
    of handing it off, which had cut a running Computer off from Hub and Lore; a handoff to a
    running sandbox restarts it onto its credentials; a slug belongs to one repository, and
    another repository's server of it is refused. Computers offer only DeepInfra's models:
    OpenCode's own free models, which the policy refuses, had left sessions retrying
    `ECONNREFUSED` ([record](records/2026-10-27-early-adopter-failures.md); checklist B16, D14).
    Done 2026-10-28, Hub `651390d`: Hub's forwards ride gateway connections of their own,
    at most 32 on each. All of them had shared one connection, which the supervisor caps
    at 32 streams, so a 33rd waited silently: on 2026-10-27, calls to every server timed
    out for two minutes. A second sign-in was proven deployed
    ([record](records/2026-10-28-forwarding-and-second-sign-in.md); checklist B16, B17).

## 4. Sharing with people and groups

Approved 2026-10-26. A repository's owner shares it with a person or a group; groups and
their owners live in Hub's control plane beside assignments; Lore receives one token per
repository, so nothing bounds how many repositories a person reaches. Entra and Lore do
not change. The design is in Hub's, console's and the installation's `DESIGN.md`.

Done 2026-10-26 ([record](records/2026-10-26-sharing.md)): OpenShell `main` takes upstream (`d0a163a42`)
and adds request-scoped refresh (`ab37a698c`); Hub `704cbe9` and console `b96a5a2` share with
people and groups; the installation's `vv-lore` asks for a token per repository. Checklist B4,
B5, B8, C4 to C8 and G2. On the way: three installer defects fixed (OpenShell crates pinned at
the gateway's revision, lint only before an import, groups carried like assignments), and
an upstream OpenShell refresh-timing defect that let Lore credentials expire before their
refresh (fixed in `ebd6a1c`). OpenCode moved to upstream 2.0 (fork `ca091c8`, Computer version
`e4c07f404dc8`, [record](records/2026-10-26-opencode-2.md)); G2 qualifies it with a model.

Done 2026-10-27 ([record](records/2026-10-27-lore-create.md)): `lore repository create` makes
its creator the owner, as `console__create_repository` does, and only an owner deletes with
`lore repository delete`. Lore (`4ee9f338`) tells its catalog's endpoint, Hub, of each
repository it creates and deletes through `RebacApi`; Hub (`623427d`) records it. Checklist
C9 and C10; Computer version `5b397a7e0ab0`.

## 5. Daily use

Approved 2026-10-29. What daily work with OpenCode, a Computer and Lore runs into, from
the logs of 2026-10-28.

- [x] A push to a repository whose watch has been idle more than 2 h 13 min is served
      (checklist D12): after 13 h 37 min, `listening` 22.2 s after the push
      ([record](records/2026-10-29-computer-internet-and-search.md)).
- [x] Search in Computers: ripgrep in the factory base, which Computers build on. Without
      it OpenCode downloads ripgrep from GitHub, which the policy refuses, so its file
      search (`/api/fs/find` answers 500) and its `grep` and `glob` tools fail.
- [x] Computers reach the internet: the factory's internet rule in the Computer policy, so
      `cargo`, `git` and web fetches work in a Computer. Credential placeholders stay
      behind the proxy. Design first. On the way: cargo's home moved to
      `/sandbox/.cargo`, since the toolchain's is read-only.
- [x] One Computer version for both, in the template (`8b63233`) and Bioma's installation
      (`6f4129c`). Probes in a Computer: file search, a clone from GitHub, `cargo check`,
      Hub and Lore, and a placeholder refused outside Hub (checklist B18, B19).
- [x] Hub's inbound bound: with about 60 long-lived requests into Hub open, the gateway's
      relay into Hub's sandbox times out claiming the next ("relay claim timed out") and
      answers 502 after 10 s. Find the bound and fix it in OpenShell. The bound: connections
      into a sandbox shared the boundary's 128 streams with no budget of their own. OpenShell
      `1ab0e2386` gives them 896 of 1024. 120 of 120 streams open, the most the Computer
      path can show (checklist B21,
      [record](records/2026-10-29-openshell-streams-and-refresh.md)).
- [ ] A credential refresh keeps connections: a provider refresh that fails during
      preparation revokes static credentials until the next poll and closes open tunnels
      ("policy generation is stale"), 8 times in 3 Computers and 12 in the factory in 30 h.
      Fix in OpenShell's supervisor. Probe: none in a day of logs. `1ab0e2386` ordered
      the revisions, which are opaque digests, and still failed closed at 09:32 on
      g1-rerun's instance. `0e795fc` accepts any revision of the polled attachment and
      policy, and is deployed on Hub, the services and the owner's Computer
      ([record](records/2026-10-29-refresh-revisions-are-opaque.md)). On `0e795fc`, 2 of 2,735
      refreshes still failed closed in a day, both when the fetch itself failed during a
      gateway blip. `49761d1` keeps the installed credentials when a fetch fails, each until
      its expiry, and fetches again on the next poll; deployed on Hub and the services
      ([record](records/2026-10-30-refresh-fetch-failures.md)). The owner's Computers took it at
      19:29; other Computers and the factory instances take it at their next start. The day
      of logs runs from 19:29 (checklist B22).
- [x] Qualification with MiMo-V2.6-Pro: an agent in a Computer uses `grep` and `glob`,
      adds a crate, runs `cargo check`, pushes, and the change is served. The first run
      found the toolchain a Computer lacked. Template `430b7ab` adds clang, cmake,
      pkg-config, clippy and rustfmt. The second run needed no workaround (checklist B20,
      G3, [record](records/2026-10-29-daily-use-qualification.md)).

Done when each is deployed and proven, with records, and the checklist says so. Open:
B22's day of logs.

## 6. Manual Task continuity verification

Historical checkpoint: the Work Context-dependent Task proof package was retired
in the [2026-11-02 bulk cleanup](records/2026-11-02-work-context-proof-retirement.md).
The results below apply to their recorded revisions, not the current Task binding
or the newer configured-group revocation path.

Approved 2026-10-29. Verify the Task identity, retained routing and authority that
Hub assembles for dispatch, with the SDK's recipient-deployment binding. The owning
contract is [Hub Task routes](https://github.com/VeoveoAI/veoveo-hub/blob/main/crates/veoveo-hub/src/state/task_routes/DESIGN.md);
the [proof map](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/README.md)
tracks the formal boundary. Verification remains manually requested, outside CI.

- [x] State the complete successful-dispatch and refusal properties in the owning
      designs, including original capture/expiry on retry and current authority.
- [x] Share the actual production Rust decision and output assembly with the
      extraction package; preserve existing behavior and SQL atomic operations.
- [x] Prove continuity, authority preservation and correct acceptance, with explicit
      assumptions about stored snapshots, comparison, time, policy and signatures.
- [x] Check source/model correspondence, semantic mutants and restoration; run the
      focused Task/routing and SDK recipient-binding regressions.
- [x] Record exact results and limits in a dated record and update proof coverage.

Completed within the extracted-decision boundary; the full system property remains
partial. [Qualification record](records/2026-10-29-task-continuity-proof.md): total
proofs, four semantic mutants caught, fresh restored pass, 18 focused component
tests and five standalone witnesses. Hub `ee0bdf3` and SDK `8489a58` are published
on `origin/main` after both repositories' full Mac and Linux checks passed;
see the [publication record](records/2026-10-29-task-proof-publication.md).
Deployment is a separate handoff; no dependency repin was performed.

This slice does not claim PostgreSQL transaction/trigger correctness, durable worker
settlement/recovery, cryptography or deployed qualification. It adds no runtime
authorization rules, automatic proof gate or separate service.

## 7. Comprehensive manual Hub verification

Approved 2026-10-29; paused 2026-11-01 for a coverage and value review. The
[pause report](records/2026-11-01-hub-formal-verification-status.md) records the
completed contracts, ten production correction groups, source applicability and
remaining obligations. The [2026-11-01 closeout](records/2026-11-01-hub-proof-closeout.md)
retained the then-current membership baseline and deferred its unfinished controls.
After production removed Work Context, the user requested one bulk removal instead
of porting the obsolete models. The
[2026-11-02 cleanup](records/2026-11-02-work-context-proof-retirement.md) retires five
Hub packages (`current_roles`, `control_publication`, `refresh_transactions`,
`request_composition`, `task_continuity`) and SDK `internal_auth`; eight independent
packages remain. Removed proofs and their receipts are available in Git history;
dated records are unchanged. The membership controls are retired, not pending work.
The checked items below are historical evidence, not renewed current-source coverage.
Further verification remains paused pending better Rust/Aeneas support. This cleanup
does not resume the roadmap or add a proof gate.
The intended future scope remains
coverage of Hub's complete operations: admitted caller, destination, committed state
and recovery under concurrent updates, retries and failures. The authoritative
[proof coverage map](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/README.md#approved-implementation-roadmap)
records the invariants, source boundaries, assumptions and remaining obligations.
Proofs cover legitimate success and preserved output as well as required refusal.

The ten areas are authorization/delegation, login/refresh continuity, registration,
routing/Tasks, live configuration, discovery/subscriptions, factories, Computers,
native Lore grants/contributed issuance, and cleanup/transactional audit.
Their shared foundation is the platform's typed MCP extension contracts, especially
`ai.veoveo/authorization` and `ai.veoveo/registration`. The SDK owns their definition,
generation and wire representations; Hub consumes them. Track the full route-policy
to declaration to registration/advertisement to Hub admission to SDK dispatch chain
as `HUB-CONTRACT-01`, with semantic proofs distinct from wire/schema tests.

Execution order:

- [x] Expand the coverage map with registration, native issuance, cleanup and
      explicit evidence classes; retain the existing invariant IDs and measured scope.
- [x] First delegated-authority assembly slice: exact exchange-stage outcomes,
      grant/context preservation and downstream narrowing; four semantic mutants
      caught and fresh restoration passed. This is partial `HUB-AUTH-01`, with
      current roles and asynchronous/token boundaries still open. See the
      [qualification record](records/2026-10-29-authority-proof.md).
- [ ] Shared SDK–Hub extension-contract semantics: next, prioritize
      authorization/registration declaration correctness,
      representation correspondence and resource/route resolution, then connect
      the producer and consumer guarantees. The SDK resource matcher/resolution
      boundary is qualified: composed acceptance/refusal proofs, five semantic
      controls and fresh restored success; see the
      [record](records/2026-10-29-sdk-authorization-proof.md). SDK `239622d` is now
      published after exact-source full Mac and Linux checks (283 passed, 3 skipped
      on each); [publication record](records/2026-10-30-sdk-authorization-publication.md).
      SDK access is now connected to Hub policy and delegation within the qualified
      boundary below. Native parsing, declaration generation/validation and typed
      dispatch remain.
      No new extension or runtime gate.
      Adoption probes exposed a translator limitation in native URI iterator
      signatures and a distinct local-versus-foreign MIR lowering difference in
      the resolver. An isolated Rust 2024 extraction now produces the exact same
      qualified SDK model. The approved connection reuses that generated resolver
      through typed adapters, with compilation/linkage and native-template trace
      boundaries explicit; [extraction checkpoint](records/2026-10-30-sdk-hub-extraction-boundaries.md).
      Combined wrapper extraction now succeeds with that resolver interface;
      [wrapper record](records/2026-10-30-sdk-hub-wrapper-extraction.md). Ordinary
      resolver delegation, typed adapters and the actual NativeMatcher trace now
      pass the full proof package and audits;
      [model checkpoint](records/2026-10-30-sdk-hub-adapter-models.md). The old
      whole-access axiom is removed. Actual SDK access now derives the server-policy
      premise for all four target kinds from raw declaration semantics, connected
      to current grants and downstream narrowing. Exact resource precedence,
      conflicts, full output and zero-grant Authenticated acceptance pass the
      combined package and audits;
      [composition checkpoint](records/2026-10-30-sdk-hub-policy-composition.md).
      Six native tests now pass, including 23 whole-output scenarios and eight direct
      SDK observations, with formatting and strict library Clippy;
      [native baseline](records/2026-10-30-sdk-hub-native-baseline.md).
      Three SDK wrapper faults are now caught by unchanged proofs and native
      assertions after valid compilation/extraction/model builds; fresh restoration
      passes all six native tests, formatting/Clippy, extraction, the full Lean
      package, four direct proofs and three audits. Restored definitions/types agree
      after only exact SDK source-root comment normalization; raw outputs retained.
      [Qualification](records/2026-10-30-sdk-hub-authorization-qualification.md).
      Compiler/linkage, native parser/collection laws, declaration generation/
      validation, serialization and asynchronous caller correspondence remain explicit
      boundaries; this qualifies the connection, not the whole extension-contract chain.
- [ ] Production-linked delegation/current-policy decisions and session-family
      admission, with output/deadline preservation and valid acceptance. Assembly
      and the unchanged current-role evaluator are qualified within their stated
      boundaries. Total exact role/risk/grant equivalences, seven semantic controls
      and clean dedicated-target restoration passed; see the
      [record](records/2026-10-29-current-role-proof.md). Native collections remain
      modeled. The actual CurrentPermissions registration traversal, requested
      filtering and concrete authority connection are now qualified: exact-result
      proofs, seven focused native tests, two semantic controls and fresh restored
      success with identical generated model hashes. The earlier coarse
      current-permission premise is discharged within the stated model boundary;
      see the [qualification record](records/2026-10-29-current-permissions-qualification.md).
      The unchanged decide_server/route-lookup/decision closure now extracts with
      the prior Held closure retained; [extraction checkpoint](records/2026-10-30-registered-server-policy-extraction.md).
      The extended models build and existing proofs rerun, with the clock and SDK
      access retained as two explicit native operation assumptions; [model checkpoint](records/2026-10-30-registered-server-policy-model.md).
      Target projection, the exact native route-lookup trace and decision metadata
      construction now have checked proofs; [projection/metadata checkpoint](records/2026-10-30-registered-server-policy-projection.md).
      The actual server evaluator now has a checked exact admission/output theorem
      using the proved grant calculation, conditional on explicit native operation
      premises; [decision checkpoint](records/2026-10-30-registered-server-policy-decision.md).
      Declarative actual admission, coherent route arguments and permission
      consistency are also checked; [admission checkpoint](records/2026-10-30-registered-server-policy-admission.md).
      The actual server decision and extracted delegation kernel are now connected:
      exact admission, complete grant intersection, required-permission survival
      and metadata preservation passed; [downstream checkpoint](records/2026-10-30-registered-server-policy-downstream.md).
      Native qualification is now complete within that boundary: six focused tests
      (including twelve downstream scenarios), five semantic faults caught by both
      unchanged proofs and native assertions, and fresh restored extraction with
      identical generated models, full proof/audit checks, formatting and strict
      library Clippy; [qualification record](records/2026-10-30-registered-server-policy-qualification.md).
      That receipt covers unchanged production policy and the prior dependency
      pin. The newer qualified SDK adoption/composition above derives its access
      premise and now has paired native controls and restored success. Session/
      issuer semantics, async caller binding and principal/catalog freshness remain open.
      The unchanged session-family predicate now extracts transparently; the
      extended package and four audits pass with no new native-operation axioms.
      Full timestamp order and identity/scope primitives have ordinary models with
      native correspondence explicit; see the
      [model checkpoint](records/2026-10-30-session-family-extraction-model.md).
      The exact independent admission theorem, observed-field invariance and
      legitimate rotation/issuer/nanosecond success now pass the full package and
      audits. Four Linux native method tests and the real PostgreSQL session test
      on macOS also pass; [admission baseline](records/2026-10-30-session-family-admission.md).
      Session admission is now qualified within its stated boundary: four compiled
      and extracted predicate faults fail both the unchanged proof and the intended
      native assertion; fresh original-source extraction, all four native tests,
      formatting/Clippy, the full Lean package/direct proof and four audits pass.
      The first control's assertion-log detector false negative is retained and
      separately reviewed. See the
      [qualification record](records/2026-10-30-session-family-qualification.md).
      Exact family lookup, verified claims, caller freshness and the wider concurrent
      refresh lifecycle remain separate obligations; no session rule was added.
- [ ] SQL-backed configuration publication, then refresh concurrency and
      registration/replacement, including their actual audit/transaction boundaries.
      Configuration publication is qualified within its design-model boundary:
      the full Lean package proves complete reachable commits, one committed
      successor per retained predecessor, committed-state replay excluding aborted
      attempts, valid initial/replacement success and reachable uncertain outcomes.
      PostgreSQL primitives remain separate from Hub's instruction sequence.
      Four actual PostgreSQL tests, formatting and strict library Clippy passed;
      both deliberate Rust transaction faults failed their intended assertions,
      and fresh original-source validation passed again. Final native source is
      unchanged by the later proof additions. See the
      [qualification record](records/2026-10-30-control-publication-qualification.md).
      This is not formal SQL refinement or replica-adoption verification, and no
      publication runtime behavior changed. Refresh-family concurrency is the next
      transaction slice, followed by registration/replacement. Trace their actual
      Rust/SQL and existing retry/replay semantics before specifying the models.
      Refresh source review is complete and implementation has started: extract
      the actual binding/redelivery predicates and model the separate rotation,
      duplicate-delivery and revocation transaction paths. Retention, sampled time,
      first-revocation semantics and post-commit delivery errors remain explicit;
      [source review and scope](records/2026-10-30-refresh-transaction-source-review.md).
      The actual binding/redelivery predicates and delivery closure now extract
      transparently with the previous roots preserved;
      [extraction checkpoint](records/2026-10-30-refresh-predicate-extraction.md).
      This checkpoint has no new refresh proof or native qualification result.
      The subsequent native baseline passed four new PostgreSQL transaction tests
      and all five existing `hub_state` tests, formatting and strict library Clippy;
      [baseline record](records/2026-10-30-refresh-native-baseline.md). Commit
      `f6e679e` preserves the tests. This is component evidence, not deployed qualification.
      Commit `c00037d` adds checked exact binding/delivery predicates, positive
      delivery, strict deadline refusal, checked generation arithmetic and a
      mathematical connection to session admission. The full package and theorem
      axiom audits pass; [proof checkpoint](records/2026-10-30-refresh-predicate-proofs.md).
      Commit `17f1f74` establishes the transaction model and proves that reachable
      commits stage the complete chosen program, plus family/session and first-revocation
      preservation; [model checkpoint](records/2026-10-30-refresh-program-prefix.md).
      Paired extracted/native controls now catch an inclusive delivery deadline
      and a bypassed client binding; a native-only premature commit catches the
      lost audit rollback. Fresh extraction, the full proof package, five audits
      and all nine native tests pass after restoration;
      [controls qualification](records/2026-10-30-refresh-controls-qualification.md).
      The pure refresh predicates are qualified within their stated models.
      Commit `6f2a85b` connects reachable rotation programs, family-lock snapshots
      and strictly increasing committed generations for one retained family
      incarnation; [history checkpoint](records/2026-10-30-refresh-generation-history.md).
      Commit `f9ac023` qualifies completeness against a compilable premature-ready
      model fault, then restores the original passing proof;
      [fault record](records/2026-10-30-refresh-completeness-control.md).
      Commit `dd3cf17` proves committed-state replay tied to actual model steps
      and excludes aborted attempts from every such contribution trace;
      [replay checkpoint](records/2026-10-30-refresh-transaction-replay.md).
      Commit `752fd8c` constructs valid initial data and a complete overlapping
      rotation/retry execution, with the same successor and exact output maps;
      [concurrent success](records/2026-10-30-refresh-concurrent-success.md).
      Commit `3c0d3bf` adds reached commit/error witnesses with explicit committed
      and aborted outcomes and closes the refresh concurrency slice. The final
      nine-module Lean build, nine native tests and semantic controls pass within
      their separate evidence boundaries; see the
      [qualification record](records/2026-10-30-refresh-concurrency-qualification.md).
      No SQL refinement or complete OAuth lifecycle is claimed. Registration and
      replacement concurrency are the next transaction slice.
      Their source review is recorded and the first deterministic native overlap
      probe was implemented before choosing the model.
      See [registration transaction scope](records/2026-10-30-registration-transaction-source-review.md).
      The probe reproduced a replica/replacement race. Commit `05737d6` locks the
      ordinary deployment read before comparison/admission; the unchanged regression,
      six existing registration tests, formatting and strict library Clippy pass.
      See [native race and fix](records/2026-10-30-registration-replica-replacement-race.md).
      Commit `d3885bf` adds the transaction model, independent sequential
      specification and checked complete-program theorem for every reachable
      committing attempt; [proof checkpoint](records/2026-10-30-registration-program-completeness.md).
      Commit `2231825` derives exclusive active lock ownership, stable current
      observations and exact replica/replacement write effects against the independent
      specification; [checked milestone](records/2026-10-30-registration-locked-observations-effects.md).
      Commit `f43441c` proves independent sequential effects in actual server-commit
      order for every finite modeled execution, with aborted-event exclusion;
      [serial-history milestone](records/2026-10-30-registration-serial-history.md).
      Commit `bec2309` constructs valid initial state, replica admission and
      completed same-metadata overlap with exact rows/logins, both successful
      responses and actual commit IDs;
      [valid-replica milestone](records/2026-10-30-registration-valid-replicas.md).
      Commit `8174914` adds exact ordinary/instance replacement and a reachable
      partial-write abort, with valid initial constraints and full output maps;
      [replacement/abort milestone](records/2026-10-30-registration-replacement-abort.md).
      Commit `82be7bd` constructs the original protocol's reached midpoint: the
      replica has succeeded while replacement still owns its lock and has captured
      only the seed; [checked midpoint](records/2026-10-30-registration-original-midpoint.md).
      Commit `a81726a` completes that counterexample with both successful responses,
      exact mixed output maps and a refutation of the independent actual-commit-order
      contract. The final eight-module build and all seventeen theorem audits pass;
      [first register/replace slice qualified](records/2026-10-30-registration-concurrency-qualification.md).
      The native race-fix inputs remain unchanged. Registration coverage is partial:
      per-client update, removal and broader authority composition remain.
      The next native probe confirmed the stale-update hypothesis: an absent old
      registration could still overwrite replacement deployment metadata. Commit
      `22cdabb` takes the deployment lock first and rolls back on a zero-row
      registration update, retaining no-op success without new authorization rules.
      The identical regression, both concurrency tests and six existing integration
      tests pass; [native update qualification](records/2026-10-30-registration-stale-update.md).
      Commit `cddf599` derives complete update staging over finite mixed executions,
      exact captured-row field effects and the no-op's staged/rollback effects;
      the twelve-module proof package passes with unchanged runtime source
      ([update proof checkpoint](records/2026-10-30-registration-update-program-effects.md)).
      Commit `9518418` derives shared-lock ownership and current observations,
      connects update commits to the current independent operation, and proves
      pending no-op absence; the fourteen-module package passes
      ([stability checkpoint](records/2026-10-30-registration-update-stability.md)).
      Commit `e93260b` composes independent register/replace/update effects in actual
      tagged commit order and excludes confirmed aborted contributions, including
      no-op successes; the fifteen-module package passes
      ([mixed histories](records/2026-10-30-registration-update-serial-history.md)).
      Commit `a336620` constructs a well-formed two-replica seed and a complete
      successful update with exact state and event preservation; the sixteen-module
      package passes ([valid update](records/2026-10-30-registration-update-valid-success.md)).
      Commit `c214d49` constructs the actual old-client preflight, complete ordinary
      replacement and stale update's rollback/success, preserving the entire
      replacement state and sole registration commit event; the sixteen-module
      package passes ([replacement/no-op](records/2026-10-30-registration-update-replacement-noop.md)).
      Commit `eb099bb` completes the paired old-update counterexample from the same
      reached replacement state and refutes the same independent mixed-history
      contract. The final sixteen-module build passes; register/replace/update
      concurrency is qualified within its stated model/native boundaries
      ([qualification](records/2026-10-30-registration-update-qualification.md)).
      Physical SQL refinement, removal and broader lifecycle composition remain
      open. The next implementation slice connects registration identity with
      fresh/retained routing, current authority and SDK recipient checks.
      The later lifecycle probe now reproduces first instance registration
      committing after completed removal, leaving its login and catalog entry.
      A fresh Linux compilation qualifies the corrected regression; instance-row
      serialization and the corresponding lifecycle proof are in progress
      ([native reproduction](records/2026-11-01-registration-instance-removal-race.md)).
      Hub `12a132d` now implements that shared instance-row serialization. Both
      native acquisition orders pass, including actual registration acceptance;
      neighboring integration/cleanup checks and full Mac/Linux Docker checks
      pass (471 tests and two external-fixture skips on each host).
      [Native fix qualification](records/2026-11-01-registration-instance-removal-fix.md)
      is complete. The separate manual lifetime foundation now derives shared
      ownership, ordered staging, current DELETE snapshots and the exact full
      removal effect at reached commits; thirty axiom guards pass
      ([proof checkpoint](records/2026-11-01-registration-lifetime-foundation.md)).
      The history extension now proves exact registration effects, independent
      actual-commit-order histories with explicit frame interference, initial
      no-orphan preservation and confirmed-abort exclusion; twenty new guards pass
      ([history checkpoint](records/2026-11-01-registration-lifetime-history.md)).
      Six constructive executions now establish independent complete stored outputs,
      valid acceptance/cleanup, removal-first, abort/retry, lost commit reply and
      existing-deployment replacement. The original orphan refutes the same history
      contract the fixed execution satisfies; thirty-six new guards pass
      ([witness checkpoint](records/2026-11-01-registration-lifetime-witnesses.md)).
      Two deliberate model faults now fail the unchanged login-cleanup and valid
      response assertions after independent wrong-output diagnostics pass. Both
      exact restorations and fresh positive graphs pass
      ([semantic controls](records/2026-11-01-registration-lifetime-controls.md)).
      The scoped store-model slice is qualified. The unchanged native response
      graph passes Charon/strict inventory, but Aeneas fails on unsupported
      nested-loop, dynamic/arrow and lifetime/string constructs and emits no Lean
      model ([extraction boundary](records/2026-11-01-registration-information-extraction.md)).
      Next, review native response/postcommit and expected audit guarantees before
      extending the store proof or proposing source fixes. Complete response
      payloads and those service effects remain unproved.
      Two native probes now reproduce actual audit gaps: intentional removal
      clears registrations/logins without an audit, and a served-marker error
      returns after admission commits without a Register audit. Both reach their
      intended final assertions after fresh compilation and real PostgreSQL
      fixture checks ([native evidence](records/2026-11-01-registration-audit-gaps.md)).
      Existing registration audit activities now append in their owning
      transactions, including intentional removal. Real audit-insert failures
      roll back owned state and earlier private audits; retries and missing/no-op
      behavior pass. Full Mac/Linux Docker checks each pass 475 tests with two
      existing external-fixture skips; test SQL packaging and a premature factory
      test observation were corrected during qualification
      ([native fix evidence](records/2026-11-01-registration-audit-fix.md)).
      The separate audited-store foundation now passes Lean: actual append
      progression and source binding establish independent activity/server
      multiplicities, complete modeled data effects and full-record extension at
      the combined commit; confirmed abort preserves both committed stores.
      Thirty declaration guards pass. This is a handwritten model with explicit
      PostgreSQL/Core interpretation assumptions; populated executions,
      postcommit service paths and semantic controls remain pending
      ([foundation evidence](records/2026-11-01-registration-audited-store-foundation.md)).
      A separate populated replacement now constructs eighteen actual modeled
      steps and proves independent complete data/audit outputs, two old-server
      Replace records, the new-server Register record, cleanup and preservation.
      Fourteen declaration guards pass. The two-row seed is explicitly a valid
      model input, not a claimed native creation history. Removal/rollback,
      postcommit and fault/restoration cases remain pending
      ([replacement witness](records/2026-11-01-registration-audited-replacement.md)).
      The missing-final-Register model control now passes: its legal actual
      execution and complete wrong ledger are proved, the unchanged acceptance
      assertions reject the missing full record/cursor, and exact restoration
      with a fresh affected compilation graph passes. This is model sensitivity
      evidence, not a new native bug
      ([control and restoration](records/2026-11-01-registration-audit-control.md)).
      Removal recovery now constructs partial private append, explicit refusal,
      confirmed rollback and a fresh successful attempt, proving independent
      complete data/audit outputs. A lost-reply suffix also proves that an error
      can accompany committed removal and audit. Nineteen declaration guards and
      seven printed closures pass; this is a two-row handwritten-model schedule,
      distinct from the previous one-row native refusal fixture
      ([recovery evidence](records/2026-11-01-registration-audit-recovery.md)).
      The source-shaped service continuation now preserves first errors, exact
      call prefixes, typed response errors and opaque successful output. A closed
      composition starts from the checked two-row store execution and reaches
      confirmed no-write marker refusal with complete admitted data/audit still
      known, inner store success and outer Internal. Nineteen guards and eight
      printed closures pass. This does not prove native callbacks, response
      construction or arbitrary concurrent persistence
      ([continuation evidence](records/2026-11-01-registration-postcommit-continuation.md)).
      The ignored-marker control now proves the independent wrong ten-call success,
      observes the unchanged acceptance proof reject that result, and restores all
      sources with fresh positive compilation, retaining an explicit boundary
      for other registrations' audit programs
      ([control evidence](records/2026-11-01-registration-postcommit-control.md)).
      The Update audit foundation now passes 27 declaration guards and ten
      printed closures. It reuses actual mixed data transitions, derives the
      singleton Update intent and complete commit under stated freshness
      premises, and proves reached no-op cursor absence and own rollback
      preservation. The scope is one admitted deployment; other registration
      audit programs and native SQL/Core correspondence remain explicit
      boundaries. The populated checkpoints and omitted-Update control follow below
      ([foundation evidence](records/2026-11-01-registration-audited-update-foundation.md)).
      The populated matched-update path now qualifies nine actual model steps,
      independent complete database/audit outputs, retained fields and unrelated
      state, private precommit writes, lock release and successful store reply.
      Fifteen declaration guards and nine printed closures pass; execution stays
      separately importable for the omission control
      ([success evidence](records/2026-11-01-registration-audited-update-success.md)).
      Audit-refusal recovery now qualifies sixteen composed actual model steps:
      failure preserves committed data/audit, explicit abort releases the lock,
      and a fresh retry produces the independently specified complete result.
      Both attempts remain in the final maps. Twenty guards and nine closures pass;
      this is a possible recovery schedule, not a liveness or native-SQL proof.
      The replacement checkpoint follows below
      ([recovery evidence](records/2026-11-01-registration-audited-update-recovery.md)).
      Actual replacement/stale no-op now qualifies twenty composed model steps
      with an explicit source-faithful three-record replacement audit batch.
      Independent full data/audit/transaction outputs retain the replacement
      through stale rollback, with both store success responses and no Update
      record. Twenty-four guards and eleven closures pass. Generic external
      registration audit vocabulary and SQL correspondence remain explicit
      boundaries
      ([replacement evidence](records/2026-11-01-registration-audited-update-replacement.md)).
      The omitted-Update control now proves legal full data success with the
      required audit record absent. The unchanged acceptance proof rejects that
      exact false slot assertion; all 88 original source files are restored, then
      the original positive target passes after ordinary Lake rebuilding. Seven
      diagnostic guards and four closures pass. This is deliberate model fault
      detection, not a new production bug. Generic audit adapters and broader
      Computer/Lore coverage remain open
      ([control evidence](records/2026-11-01-registration-audited-update-control.md)).
- [ ] Connect fresh and retained routing, registration identity, current authority,
      SDK recipient checks and discovery/listener freshness; include replica adoption.
      Hub `cda9372` qualifies real routing/retained-Task identities and current grant
      narrowing/revocation, with a deliberate policy-bypass control and clean
      restoration ([native record](records/2026-10-30-request-routing-native-qualification.md)).
      Hub `f85e8ac` adds checked extracted-code proofs of exact direct/delegated
      request context and complete HTTP-client field preservation, plus conditional
      snapshot-map preservation. Model compilation, direct proof, default package
      build and executable axiom audits pass
      ([proof checkpoint](records/2026-10-30-request-assembly-proof.md)).
      Hub `9d064b6` proves the actual slug getter returns the sole matching complete
      registration and refuses zero or multiple matches. All five axiom audits and
      the direct/nondefault target checks pass
      ([lookup checkpoint](records/2026-10-30-registration-lookup-proof.md)).
      Hub `e06d209` qualifies that getter against an actual-Rust ambiguity bypass:
      the unchanged proof rejects it, an independent witness proves the wrong
      result, and restored source reproduces the canonical generated bytes and
      passes fresh proof checks
      ([semantic control](records/2026-10-30-registration-lookup-control.md)).
      Hub `f758ae6` proves the actual selection-entry closure's exact acceptance
      and refusal, including preservation of the complete matching registration
      and snapshot state. All ten module audits and direct/target checks pass
      ([entry checkpoint](records/2026-10-30-selected-entry-proof.md)).
      Hub `9b367d3` qualifies it against an actual-Rust slug-check bypass, with an
      independent wrong-route witness and exact canonical restoration followed by
      fresh passing proof checks
      ([entry control](records/2026-10-30-selected-entry-control.md)).
      Hub `282acdc` proves finite cursor steps in the explicit iterator model
      using the qualified extracted entry predicate, exact eligible reference
      emissions and equal-key whole-row consistency. Direct and nondefault target
      checks pass with five standard-only audits
      ([finite scan](records/2026-10-30-finite-selection-scan-proof.md)).
      Hub `ef07e8d` adds total ordered map insertion, derived unique keys and exact
      whole-row union, with compatibility derived from those emissions. Both manual
      checks and four audits pass
      ([insertion](records/2026-10-30-ordered-selection-insertion-proof.md)).
      Hub `dac4cf7` closes total modeled collection with exact eligible whole-row
      contents and connects it to every successful result of the extracted
      `selected` method. Both manual checks and four scoped audits pass
      ([complete collection](records/2026-10-30-complete-selection-collection-proof.md)).
      Hub `a9b0cad` records an unchanged-helper probe: Charon extracts the namespace
      algorithm, but pinned Aeneas fails on nested borrows and an indexed projection.
      Partial outputs were not adopted; no runtime change or proof coverage is
      claimed ([translation limit](records/2026-10-30-namespace-helper-translation-limit.md)).
      Hub `dd20465` extracts the actual snapshot constructor unchanged and checks
      it with all six existing request-composition targets after adding the missing
      model map-method adapter and allocation-erased Arc creation. This qualifies
      the supporting model, not the pending constructor/route correctness claims
      ([constructor extraction](records/2026-10-30-snapshot-constructor-extraction.md)).
      Hub `3cf2feb` derives actual constructor key/row coherence through arbitrary
      overwriting insertion, then connects exact selected per-slug lookup to the
      actual HTTP destination and direct/delegated request context. Both new
      nondefault targets pass nine scoped audits with an unchanged 66-path source
      map ([connected route](records/2026-10-30-constructed-route-context-proof.md)).
      Hub `1057bcb` qualifies the HTTP permission-preservation edge with an actual
      Rust mutation, independent accepted-input witness, exact raw restoration and
      passing connected targets ([source control](records/2026-10-30-http-permission-preservation-control.md)).
      Hub `9aa3988` removes the duplicate generated graph and proves actual direct-call
      policy grants reach the complete client, with exact independent membership and
      no desired-grant premise. All 25 policy defaults, model audit, request defaults,
      six routing targets and the direct theorem pass
      ([shared graph and policy composition](records/2026-10-30-shared-policy-request-proof.md)).
      Hub `7d3f6c6` derives the row from the computed retained
      route and policy from the same catalog, including exact absent-route behavior
      and the complete direct client ([selected policy/client proof](records/2026-10-30-selected-policy-client-proof.md)).
      Hub `e66bb34` connects actual native set intersection and SubjectDelegation
      narrowing to the computed selected route, same-generation policy and complete
      direct/delegated client. Seven scoped audits, existing model defaults/audit,
      connected request targets and one native set regression pass
      ([native narrowing and selected client](records/2026-10-30-delegated-policy-client-proof.md)).
      Hub `c6feadb` qualifies that edge with actual Rust excess-permission and
      valid-grant-loss faults: both frozen-proof failures have independent successful
      counterexamples, all eight witness audits pass, restored generated bytes match,
      and fresh connected targets plus model audit pass
      ([narrowing controls](records/2026-10-30-delegation-narrowing-controls.md)).
      SDK `19a1e65` preserves dynamic issuer/client text in actual extraction by
      replacing one existing formatting expression with equivalent ordered appends.
      Fresh extraction and 35 existing token tests, formatting and strict Clippy
      pass, including a separate native run against current SDK main. This is proof
      preparation; the operational model and issuer correctness remain unfinished
      ([extraction milestone](records/2026-10-30-sdk-delegated-id-extraction.md)).
      SDK `5d37105` then qualifies the actual issuer/context/claims/recipient model
      and nine-entry dependency audit. Seven functions have only standard axioms;
      identity creation and signing retain explicit native observations. A private
      parameter rename resolves a generated namespace collision, with fresh
      extraction and 35 passing native token tests. Exact issuer correctness and
      direct/delegated constructions remain next
      ([checked model](records/2026-10-30-sdk-internal-auth-model.md)).
      Source synchronization remains explicit: local Hub `c6feadb` pins SDK
      `239622d`; observed origin `cd363a2` pins `154a473` and adds App-origin
      policy/routing plus registration surfaces. Those additions are not covered
      by the older extracted graph. SDK origin `24bd67b` changes design prose only.
      Requalify the relevant source changes when composing with latest Hub;
      no deployed revision is inferred from these Git references
      ([source applicability audit](records/2026-10-30-proof-source-applicability.md)).
      SDK `de98b25` proves complete context-omitted bootstrap identity outcomes,
      signing continuation and exact recipient binding; the three named manual
      targets and ten theorem audits pass. This does not yet establish independent
      complete signer claims or context-bearing issuance
      ([initial identity/recipient contracts](records/2026-10-31-sdk-identity-recipient-proof.md)).
      SDK `f72f91f` now proves the actual context validator's exact acceptance and
      refusal for Direct, Automated and Delegated provenance, under explicit text
      representation bounds. Direct and named manual checks pass with standard-only
      axioms; admitted constructions, semantic controls and full issuance remain open
      ([context admission](records/2026-10-31-sdk-context-admission-proof.md)).
      SDK `b645f07` supplies populated independent contexts and proves actual
      acceptance in every mode, including a closed no-premise witness. The final
      manual targets and all eight axiom audits pass. Complete issuance and Hub
      composition remain next; newer Hub App-origin
      changes through observed origin `c39d4b6` are not covered by this result
      ([valid contexts and source applicability](records/2026-10-31-sdk-context-valid-witnesses.md)).
      SDK `4fb723e` qualifies actual-source wrong-acceptance and wrong-refusal
      controls: unchanged contracts reject both faults, independent witnesses
      prove the wrong results, exact source/generated restoration and fresh
      baseline proofs pass. These are intentional faults, not new production
      defects ([context semantic controls](records/2026-10-31-sdk-context-semantic-controls.md)).
      SDK `95ecd75` proves generic complete identity construction and delegation
      refusal priority, preserving all fields, native errors/effects and the
      conditional source-expiry cap. Populated Direct and inherited-chain acting
      examples and the final manual targets pass all nine audits. Constructor
      deadline controls and complete public issuance/claims remain open
      ([complete identity construction](records/2026-10-31-sdk-full-identity-construction.md)).
      SDK `4655e9d` qualifies an overlong Direct identity and
      an incorrectly refused acting call. Independent witnesses establish both
      wrong results; exact same-tree source/model restoration and fresh nine-audit
      identity builds pass ([deadline controls](records/2026-10-31-sdk-identity-deadline-controls.md)).
      SDK `ed21505` proves complete actual claims assembly against the independent
      specification, including scope text, actor-chain order, every invocation
      field and empty/nonempty permission details. Populated delegated and empty
      Direct constructions pass; the three manual targets pass all fourteen new
      standard-only audits ([claims assembly](records/2026-10-31-sdk-claims-assembly.md)).
      SDK `859990c` qualifies the actual-source permission-detail inversion:
      the unchanged theorem rejects both wrong branches, independent witnesses
      derive both complete wrong outputs, and exact source/raw restoration plus
      a fresh fourteen-audit baseline passes
      ([claims permission control](records/2026-10-31-sdk-claims-permission-control.md)).
      SDK `6665e9c` proves generic public-issuer composition: exact first-foreign refusal,
      complete identity and claims construction, exact signer arguments and
      preserved signing errors/results. The final two manual targets pass all
      four audits ([public composition](records/2026-10-31-sdk-public-issuer-composition.md)).
      SDK `e9e6d41` adds passing populated public-issuer examples: a complete two-permission Direct
      result with source-capped expiry and exact signer claims, plus first-foreign
      refusal before an independently invalid client context. The two manual
      targets pass all seven new audits
      ([issuer examples](records/2026-10-31-sdk-public-issuer-examples.md)).
      SDK `6afa18a` qualifies the public issuer's actual-source guard inversion:
      the unchanged proof rejects it, an independent witness proves the wrong
      refusal, and exact same-tree source/raw restoration plus a fresh four-target
      baseline passes all eleven public audits
      ([issuer guard control](records/2026-10-31-sdk-public-issuer-guard-control.md)).
      Hub `e9d9c8a` establishes identifier/payload, ordered-set and bounded-timestamp
      correspondence between the two extracted type graphs. Direct and named
      checks pass fourteen standard-only guards in a shared tool context
      ([value bridge](records/2026-10-31-hub-sdk-issuer-value-bridge.md)).
      Hub `e4da328` proves complete request/identity field correspondence from
      independent physical bounds, SDK-to-Hub token/error preservation and modeled
      result/effect preservation. Twenty-three guards pass; a bidirectional role
      swap preserves inverse laws but fails the independent field contract, and
      exact restoration passes the named targets
      ([complete record bridge](records/2026-10-31-hub-sdk-complete-record-bridge.md)).
      Hub `a1cf258` replaces the Hub model's opaque issuer operation with the
      checked SDK implementation. Independent Hub bounds derive the converted
      request/domain and complete outcome, including ordered refusals, exact
      signing claims and preserved errors/effects. Eight manual targets and the
      explicit global definition/axiom audit pass
      ([operational connection](records/2026-10-31-hub-sdk-operational-issuer-connection.md)).
      Hub `24c2795` proves the actual extracted caller's complete request assembly,
      optional inherited-deadline minimum and exact SDK outcome/bearer/error
      projection. Direct and named manual checks pass all ten guards
      ([actual caller theorem](records/2026-10-31-hub-sdk-actual-caller-proof.md)).
      Hub `0e3bb23` proves populated delegated caller acceptance with complete
      signer claims and exact expiry refusal at a cap equal to the sampled clock.
      Independent fixture conditions, actual outcomes and the final three manual
      targets pass with nine new guarded declarations
      ([populated outcomes](records/2026-10-31-hub-sdk-populated-caller-outcomes.md)).
      Hub `f8faea5` records a compiled actual-source deadline fault rejected by
      the unchanged caller contract, exact same-tree source/raw restoration and
      a fresh passing three-target baseline. The independent wrong-output witness
      failed elaboration and remains an explicitly unqualified draft after the
      coding worker was interrupted; this control is not yet complete
      ([partial control checkpoint](records/2026-10-31-hub-caller-deadline-control.md)).
      Source-version applicability and supplied-input boundaries remain explicit.
      Hub `e68d33a` refreshes that applicability audit against fetched Hub
      `0ff0819` and SDK `7459481`: five relevant function regions are unchanged,
      but the remote's non-MCP forwarder, AppOrigin policy cases, registration
      surfaces and newer Core dependency are outside the existing graph's claims
      ([source audit](records/2026-10-31-hub-proof-source-applicability.md)).
      This is source review only; it introduces no runtime/pin change or new proof.
      SDK merge `dbfd2a0` now reconciles the SDK source lines; `e82ceb8` records
      35 passing native issuer tests and fresh merged-context extraction with
      Core `4ebcf89`. All four generated outputs retain exactly the same code,
      types and interfaces, differing only in 95 source-location comment lines.
      Existing proof scope and assumptions are retained; Hub pin/source adoption
      and the incomplete caller control remain separate
      ([merged SDK qualification](records/2026-10-31-sdk-issuer-merged-source.md)).
      Hub merge `1ccb868` also reconciles upstream runtime source with the local
      proof work. Thirteen focused registration, App-origin, policy and HTTP tests,
      formatting and strict library Clippy pass; the old models remain unchanged.
      Added AppOrigin, registration-surface and administrative-revocation domains
      require fresh extraction and formal adaptation
      ([merged Hub native checkpoint](records/2026-10-31-hub-merged-source-native.md)).
      Hub `6d69258` records fresh extraction and passing formal adaptation on that
      exact stack:
      AppOrigin's complete valid/refused decisions, whole constructor-input row
      provenance through selection with ordered surface fields, and administrative
      revocation are included. Existing current-policy, caller and request targets
      pass; the two new proof targets remain manual and nondefault
      ([current-domain qualification](records/2026-10-31-hub-current-domain-proofs.md)).
      The subsequent composition derives the complete selected input row, current
      grants, optional carried ceiling, client, SDK request and issuer outcome.
      It includes missing-route and context-refusal outcomes without assuming a
      prepared client, desired grants or context success
      ([composition qualification](records/2026-10-31-hub-policy-issuer-composition.md)).
      Native SDK equivalence, recipient continuity and async/SQL boundaries remain.
      TTL/clock wrappers and HTTP transport remain separate.
      Native signing/verifier and Hub integration retain the distinction between
      the prepared extraction revision and Hub's pinned dependency.
      A bounded unchanged-helper probe passes Charon but fails pinned
      Aeneas string-pattern signature translation; native namespace refinement
      remains explicit ([probe](records/2026-10-31-permission-namespace-extraction-boundary.md)).
      The [composition-boundary review](records/2026-10-31-issuer-composition-boundaries.md)
      identifies the required exact identifier, set/traversal, timestamp and complete
      context correspondence, plus the separate caller TTL and verifier-wrapper
      obligations. These are proof obligations, not new runtime adapters or checks.
      Native collection correspondence, unconditional selected completion,
      full constructor-input presence/latest-row refinement, qualification of the
      remaining composed edges,
      namespace-helper completion/order, async provenance of current permissions,
      recipient composition, native SDK equivalence and the separate
      assembly contracts' semantic controls remain open. SDK `e268032` makes the actual
      issuer/context/claims path translatable; 35 native token tests, format and
      strict Clippy pass, but Hub still pins SDK `239622d`
      ([translation and native checks](records/2026-10-30-request-composition-translation.md)).
      Hub `ed1c42d` fixes a pinned Aeneas instance-name collision that prevented
      combining the existing proof modules. The stock failure, patched regression
      and both unchanged proof packages pass their expected checks; this adds no
      Hub contract coverage ([tooling checkpoint](records/2026-10-30-request-composition-tool-imports.md)).
      Hub `8543cc5` fixes a discovery-cache collision found in the next source
      review: current principal groups and exchanged permission ceilings were
      absent from cache identity. Both broad-first extra visibility and narrow-first
      omission fail the unchanged regressions before a four-line correction and
      pass afterward. Twenty-two focused native tests, formatting and strict
      library Clippy pass; timestamp/audit-only reuse remains
      ([native cache qualification](records/2026-10-31-discovery-cache-authority-isolation.md)).
      This adds no authorization rule or formal cache theorem. Cache transitions,
      invalidation/publication histories and listener freshness remain to prove.
      The six cache critical sections are now factored behind their existing mutex;
      body comparison and the same 22 focused native tests, formatting and strict
      Clippy pass ([preparation record](records/2026-10-31-discovery-cache-state-preparation.md)).
      No cache extraction or Lean theorem is claimed: native UUID/clock observation
      modeling and pinned inherent-method selection still need a supported approach.
      The next native-qualified change gives state methods unique names and lazy
      per-operation clock/UUID inputs; sampling remains in the original branches.
      The same 22 focused tests, formatting and strict Clippy pass; extraction and
      formal contracts remain pending
      ([observation preparation](records/2026-10-31-discovery-cache-lazy-observations.md)).
      All six operations now extract with transparent predicates and key methods,
      but Lean confirms six type mismatches in generated server-invalidation
      callback dictionaries. No qualified cache model follows from translation
      success. Proceed with the five supported operations while retaining
      server-wide invalidation as an explicit open obligation; native code and
      generated output are not rewritten to conceal the limitation
      ([compiler evidence](records/2026-10-31-discovery-cache-extraction-boundary.md)).
      Hub `4500e6d` records the five supported operations compiling from unchanged generated source.
      Their independent primitive model and first read/key-invalidation contracts
      pass: actual key comparison, exact payload/denied-count reads, cached-only
      removal, full key invalidation and unrelated-key preservation. Ten axiom
      guards pass with standard Lean logical axioms only
      ([read/invalidation checkpoint](records/2026-10-31-discovery-cache-read-invalidation-proof.md)).
      Hub `5dcf9d5` adds a checked complete-state contract for actual fetch start:
      generation changes, cooldown/pending/capacity priority, valid coalesced and
      non-coalesced acceptance, exact returned fields and unrelated-ticket
      preservation. Sixteen executable axiom guards pass; the final leaf took
      7.398 s ([start checkpoint](records/2026-10-31-discovery-cache-start-proof.md)).
      Hub `9e6228c` adds a checked full-state completion contract and
      a composed key-invalidation fence: invalidating a key then completing an
      old response preserves exactly the invalidated state. Current success/failure
      updates retain whole payloads and exact comparison/time Results. The first
      proof check passed in 4.474 s with thirteen explicit axiom guards
      ([completion checkpoint](records/2026-10-31-discovery-cache-completion-proof.md)).
      Hub `6cfcb69` adds the checked full-key order and concrete map-model
      preservation contracts: ordered/unique keys, exact insertion replacement
      and size, unrelated-value preservation, capacity and minimum eviction.
      The accepted leaves pass in 12.449 s and 2.533 s with 32 standard-only axiom
      guards ([key/map checkpoint](records/2026-10-31-discovery-cache-key-map-invariants.md)).
      Hub `a34bab3` adds the checked state invariant: empty represented maps are
      ordered, unique, bounded and generation-coherent; actual normal-return
      mutations preserve those properties and never decrease generation. An
      older-generation completion is a whole-state no-op without ticket freshness.
      The leaf passed in 2.776 s with seventeen axiom guards, retaining only the
      existing native time-addition boundary where needed
      ([state checkpoint](records/2026-10-31-discovery-cache-state-invariants.md)).
      Hub `5aa01ef` adds finite histories defined by actual method equations,
      deriving invariants from empty and preserving generation fences through
      arbitrary supported suffixes. Full key invalidation also fences old work
      across accepted replacements under scoped same-key ticket nonreuse; final
      ticket exclusion is derived. Constructive accepted/advancing histories and
      twelve axiom guards pass in 2.847 s
      ([history checkpoint](records/2026-10-31-discovery-cache-finite-histories.md)).
      Two actual-source semantic control classes are qualified: omitting the
      generation in-flight clear and admitting wrong present tickets. Fresh mutant
      models compile; unchanged `start_exact` and `complete_exact` reject the wrong
      state in 2.926/2.984 s, alongside intended native assertion failures. Both
      original full source maps/raw4 restore exactly, selected native tests pass,
      and separate fresh baselines compile all thirteen own modules and guards.
      A first ticket candidate that pruned required dictionaries is retained as an
      interface diagnostic with no Lean rejection claimed
      ([control record](records/2026-10-31-discovery-cache-semantic-controls.md)).
      Source review and three native regressions now expose and correct discovery
      watches listening to an immutable selected catalog instead of live publication.
      The old code kept stale streams/cache and let old admission remove a newer
      watch. Live epoch checks, including after the existing mutex wait, and the
      live publication receiver fix all three unchanged regressions. All 23 focused
      native tests, formatting and strict library Clippy pass
      ([watch record](records/2026-10-31-discovery-watch-publication.md)).
      No new Lean theorem or deployment is claimed by this native checkpoint.
      An unmodified full-pager extraction includes all ten entry functions and
      258 own-component bodies, but Aeneas cannot translate the current identifier,
      URI and serde dependency graph. No Lean modules or pagination proof were
      produced; native pagination stays unchanged
      ([translation record](records/2026-10-31-catalog-pagination-translation-boundary.md)).
      Hub `81c933f` integrates the linked-runner source with the committed proof
      work; `3104ee9` also retains the newer Computer Apps lifecycle. Integrated
      runtime qualification passed at `c23d9ae` on both Mac Docker Desktop and Linux.
      Extended cache keys, registrations, repository-grant
      forwarding and dependency pins require renewed formal applicability review;
      existing frozen proofs do not automatically cover that new domain.
      [Source integration record](records/2026-10-31-linked-runtime-proof-integration.md).
      Native integration review reproduces and corrects a second watch defect:
      one deployment's effective unchanging capability suppressed another's watch
      under the same server name. Memoizing by actual deployment and generation
      fixes both linked and cross-selection cases; unchanged regressions, the three
      earlier watch tests and the subscription regression pass (six tests total).
      Final formatting and full integrated Mac/Linux checks pass: 454 tests passed,
      two skipped on each host, including all six regressions
      ([deployment isolation record](records/2026-10-31-discovery-watch-deployment-isolation.md)).
      The [integrated qualification record](records/2026-10-31-hub-integrated-native-checks.md)
      records exact source, timings and component-only scope. Fresh extraction for
      the current optional-link cache key succeeds, including actual principal/server
      identifier derives: all 37 own-component bodies are transparent
      ([extraction record](records/2026-10-31-current-cache-key-extraction.md)).
      The new graph's four model modules, all nine proof modules and 103 axiom guards
      now pass. Actual full-key invalidation preserves another link's complete cached
      value, ticket and retry state, including absent versus present links. Existing
      operation/state/history contracts also pass on the extended domain
      ([proof record](records/2026-10-31-current-linked-cache-proofs.md)). The actual
      link-comparison fault control in Hub `d008f66` now passes: native full-payload/ticket regression
      catches the collision, an independent generated-function witness establishes
      it, and the unchanged comparison theorem rejects the wrong result. Reversal
      restores the exact source/generated files; a fresh model and all nine proof
      modules pass in 60.747 s
      ([control record](records/2026-10-31-linked-cache-comparison-control.md)).
      HUB-CATALOG remains partial: server-wide invalidation/retain translation,
      native wrapper/refinement and cursor/listener freshness remain open.
      SDK `4e84876` publishes the 15 previously local proof commits while preserving
      the newer upstream runtime exactly. Both full Docker checks pass: 328 tests
      passed and three skipped on each host. Historical proof scope remains tied
      to the recorded source; current repository-grant issuance and verifier
      reconstruction are the next formal integration slice, not already qualified
      by that publication
      ([SDK history and checks](records/2026-10-31-sdk-proof-history-publication.md)).
      SDK `ce85c3d` records the unmodified current four-root issuance/recipient/
      verifier extraction. Its final own-graph inventory passes, but Aeneas cannot
      translate the verifier's early loop exits and identifier-profile function
      pointers; no Lean output or new theorem is produced
      ([translation boundary](records/2026-10-31-linked-identity-translation-boundary.md)).
      Production code is unchanged. Current verifier continuity remains open;
      the [repository-grant extraction](records/2026-10-31-repository-grant-translation-boundary.md)
      reaches all producer functions and fields, but the pinned Aeneas backend
      rejects a required associated-type equality in `Iterator::cloned`. No
      producer Lean model or theorem is emitted. The separate SDK detail
      construction/projection now has checked full-value preservation and roundtrip
      proofs, including valid empty-action read grants. An actual Rust fault that
      drops actions is caught by the unchanged proof and existing native test;
      an independent witness proves its wrong output. Exact source/raw-model
      restoration and fresh proof checks pass
      ([detail proof and control](records/2026-10-31-repository-grant-detail-proof.md)).
      Standard-library correspondence remains explicit. Producer and full
      issuer/verifier coverage remain open, without runtime or backend rewrites.
- [ ] Factory and Computer recovery, interrupted operations and reference-preserving
      cleanup, with explicit progress assumptions and native/browser evidence.
      The initial Factory review reproduced a same-name link-retarget defect:
      the sandbox command moves to the new repository while stored identity,
      credential lookup and later push routing retain the old target. A focused
      native regression captures the complete mismatch
      ([reproduction](records/2026-10-31-factory-retarget-identity.md)). Hub
      `48d7e25` corrects the complete target and live registration propagation;
      all three focused regressions and the integrated Mac/Linux Docker checks
      pass, 460 tests passed and two skipped on each host
      ([fix qualification](records/2026-10-31-factory-retarget-fix.md)). The fix
      is pushed; deployment is separate. The manual Factory model now has checked
      complete successful-row, client/selection, error-state and preservation
      contracts, with 24 executable axiom audits
      ([proof checkpoint](records/2026-10-31-factory-retarget-row-proof.md)).
      This is handwritten source correspondence, not extracted async Rust or
      formal SQL refinement. The next checked extension derives capacity acceptance,
      proves independent modeled provider/native-observation/request outputs and a
      populated constructive retarget, with 14 new axiom guards
      ([output checkpoint](records/2026-10-31-factory-native-output-proof.md)).
      Exact failure prefixes, row/runner survival, pre-target preservation and
      conditional two-call retry now pass, including native absence and uncertain
      commits, with 21 new axiom guards
      ([recovery checkpoint](records/2026-10-31-factory-recovery-proof.md)).
      Independent necessary-and-sufficient lifecycle-choice contracts now pass,
      including keep precedence across rebuilt-image changes, provider multiplicity
      and ignored configuration fields, with 15 new axiom guards
      ([choice checkpoint](records/2026-10-31-factory-choice-proof.md)).
      Standalone complete-output assertions now reject two deliberate manual-model
      faults: omitted target assignments and refusal at the exact capacity limit.
      Independent wrong-result/refusal witnesses pass first; both exact source
      restorations and fresh baseline checks pass
      ([semantic controls](records/2026-10-31-factory-semantic-controls.md)).
      A deterministic native component test now reproduces a stale linked
      preparation undoing a completed parent retarget: runner, native command,
      client lookup and subsequent push routing revert to the old repository
      ([concurrency reproduction](records/2026-10-31-factory-stale-preparation.md)).
      Hub `c340a2d` corrects current-runner preparation and failure publication
      under the existing mutex. With test-only lint fix `a69e3cb`, all five new
      regressions and both full Mac/Linux checks pass: 465 tests passed and two
      skipped on each host
      ([fix qualification](records/2026-10-31-factory-preparation-serialization.md)).
      This is native component evidence; deployment is separate. A new manual
      watcher foundation now passes 14 lemmas and 18 axiom guards, connecting
      current-row selection, captured-metadata independence, complete obsolete/
      absent no-op and valid acceptance to the existing full Factory outputs
      ([watcher foundation](records/2026-10-31-factory-watcher-foundation.md)).
      Actual parent/queued-update histories now pass: completed repository or
      tracked-ID retargets survive obsolete notifications, and relevant queued
      updates use the current parent program with complete modeled outputs.
      Intermediate row/key uniqueness is derived from the first operation;
      23 axiom guards pass in 5.773 s
      ([history checkpoint](records/2026-10-31-factory-watcher-histories.md)).
      Failure/fallback/status ordering and scoped completed-deletion composition
      now pass ten axiom guards in 5.473 s, preserving full status payloads and
      committed-versus-acknowledged outcomes
      ([status checkpoint](records/2026-10-31-factory-watcher-status.md)).
      Six populated complete-output histories now pass, including both retarget
      cases, current-parent acceptance, native-error construction, failure
      clearing and successful recorded fallback retaining the requested-target
      error; ten guards pass with a 92.718 s proof check
      ([fixture checkpoint](records/2026-10-31-factory-watcher-fixtures.md)).
      Two watcher model controls now prove the intended wrong outputs/refusal and
      fail the unchanged valid-acceptance assertion. Exact patch reversals restore
      the complete source maps; fresh positive checks and the final six-history
      proof pass with original artifact hashes (92.624 s for the final proof)
      ([watcher controls](records/2026-10-31-factory-watcher-controls.md)).
      This closes the scoped watcher-control checkpoint, not native/distributed
      Factory verification. Remaining work includes saved-parent retry freshness,
      cross-replica reconciliation and concurrent registration publication ordering.
      A native component regression now reproduces a saved parent retry undoing
      a completed newer retarget: program, target, client lookup and later push
      routing revert to the older revision. The one test fails its expected-output
      assertion in 1.69 s against unchanged production
      ([saved retry reproduction](records/2026-10-31-factory-saved-parent-retry.md)).
      That correction is now pushed as Hub `77b258a`: the existing parent guard
      serializes publication and membership, and native Lore identity/live/head
      checks discard obsolete retry successes and errors. Five focused native
      tests pass, including failed best-effort clear, name reuse and valid first
      provisioning; full Mac/Linux checks each pass 469 tests with two skipped
      ([correction qualification](records/2026-10-31-factory-saved-parent-retry-fix.md)).
      No deployment or new formal theorem is claimed. The next proof checkpoint
      composes this saved-parent boundary with the checked full Factory outputs;
      first allocation and complete membership retirement remain formal obligations.
      The new two-phase manual model now elaborates in 18.699 s, with arbitrary-
      state discard and conditional existing-row application
      ([model checkpoint](records/2026-10-31-factory-saved-parent-model.md)).
      Its foundation now passes 28 axiom guards in 5.426 s: arbitrary-state
      stale/error/cancellation outcomes, exact preparation publication and complete
      current-head existing-runner outputs are checked
      ([foundation checkpoint](records/2026-10-31-factory-saved-parent-foundation.md)).
      Composed histories now pass seven guards and closure audits in 4.873 s:
      actual newer-parent application survives an old prepared retry, a newer
      source-error publication survives obsolete work, and a valid duplicate
      after both diagnostic clears derives its state/domain from the first
      operation and still succeeds
      ([history checkpoint](records/2026-10-31-factory-saved-parent-histories.md)).
      Five independent populated sequences now pass against the models without
      importing those correctness theorems: stale success/error, failed clear,
      newer error protection, actual replacement at a reused name and valid
      duplicate after both clears. Eight guards pass; the assertion proof takes
      60.328 s ([populated checkpoint](records/2026-10-31-factory-saved-parent-fixtures.md)).
      Both selected semantic controls now detect their intended wrong outcomes:
      old-head replay and refusal of a valid retry after diagnostics clear. Exact
      patch reversals restore the complete source maps; fresh positive checks and
      the final five-history proof pass with original artifact hashes (57.075 s
      for the final proof)
      ([saved-parent controls](records/2026-11-01-factory-saved-parent-controls.md)).
      Initial allocation, general membership effects and the stated wider lifecycle
      and native/distributed correspondence obligations remain open.
      The Computer store regression now covers old finish/failure during a newer
      operation and after its completion. All four return false and preserve the
      complete exposed Computer projection. Focused real-PostgreSQL execution passes
      in 1.41 s; full Mac/Linux checks each pass 475 tests with two existing skips.
      Hub `8b7303d` records this test-only checkpoint
      ([Computer native evidence](records/2026-11-01-computer-stale-completion-native.md)).
      Hub `a751c9b` adds the checked manual replacement model: exact scoped row
      effects, acknowledged launch/reread, returned-stage ordering and populated
      success, failure/retry and stale-completion histories. The final Lean target
      passes in 3.620 s, with 27 guarded declarations and eleven permitted axiom
      closures ([Computer proof evidence](records/2026-11-01-computer-replacement-proof.md)).
      Two semantic controls now pass: removing the current-operation comparison
      prematurely publishes a newer operation's target; removing the listener
      attempt commits success with an incomplete trace. Independent diagnostics
      prove each full wrong outcome, unchanged assertions reject both faults, and
      exact restoration passes in 11.274 s and 10.477 s
      ([Computer controls](records/2026-11-01-computer-lifecycle-controls.md)).
      The unchanged-source browser-membership graph passes Charon (87 own
      functions, 204 own types), but Aeneas fails on dynamic authority and the
      required borrowed group iterator; partial output is not adopted
      ([translation boundary](records/2026-11-01-browser-membership-translation.md)).
      The independent rule-selection calculation now has an adopted additive
      extraction and checked actual-function proof: exact highest matching level,
      valid grants, absence, termination and order/duplicate invariance. The focused
      check passes in 5.583 s with 48 standard-only axiom guards
      ([membership proof checkpoint](records/2026-11-01-work-context-membership-proof.md)).
      Four shared-package regression commands now pass within their original
      source scopes, and their exact tested dependency manifest is adopted.
      Both additional membership fault controls are deferred and unqualified:
      the first diagnostic still failed Lean authoring; neither an original
      negative acceptance check nor the second case was run. Exact source
      restoration passes the original audit in 16.96 s with 48 guards and twelve
      standard-only axiom closures ([closeout](records/2026-11-01-hub-proof-closeout.md)).
      Full browser composition remains open. The Computer store/lifecycle model
      is not extracted Rust/SQL refinement;
      the outer timeout scheduler, browser/custody composition and actual native
      cancellation/readiness/storage guarantees remain open.
- [ ] Compose the established contracts into broader request and lifecycle guarantees;
      record exact applicability and outstanding external obligations.

Done when each area has useful, checked contracts tied to its actual implementation,
with remaining boundaries explicit and connected guarantees established. A model-only
proof is labeled as such until correspondence is justified; tests and code review do
not become formal SQL refinement by being recorded together. Assume PostgreSQL's
actual isolation/locking/atomicity semantics, not a stronger database or distributed
transaction guarantee. Do not attempt to verify PostgreSQL, cryptographic primitives,
Lore or OpenShell as part of Hub's proof coverage.

Each slice preserves efficient production code and existing component responsibilities,
uses meaningful semantic mutants and a restored baseline, and adds a dated evidence
record. Existing proof packages remain manual: no CI hook, proof service, runtime
authorization rule, extra denial layer or new execution framework. Other agents'
source/documentation and deployment work remain independent and are preserved.

## 8. One group system, and members share artifacts

Approved 2026-10-29 and active. A Lore group is a person's group for every decision the
Hub makes and every server it forwards to, and members share their own artifacts. The
design is in Hub's, Artifact's and console's `DESIGN.md`.

Today only repository access reads Lore's groups. Artifact's group grants, role grants,
policy rules and Work Context memberships read the identity provider's groups, and Entra
sends none (all 15 sign-in families hold `groups: []`), so a grant to `early-adopters`
reaches no one. Members cannot grant at all: `artifact.grants.write` declares
`sensitive`, which the member role does not select and no override can remove. Everyone
in `reference-work` is a contributor, so each already reads and writes every artifact
there; a grant adds admin, or reaches people outside the Work Context.

- [x] Hub `3de9654`: each request's subject adds the person's groups by ID, `member` as
      `write` and `owner` as `admin`, read through `CatalogSection::group_memberships`;
      group answers show the ID. The existing contracts carry them: role grants, policy
      rules, Work Context memberships, the forwarded token's `groups` and the invocation
      claim's `group_roles`.
- [x] Console `51dff0d`: `groups`, `create_group` and `set_group_member` return the ID.
- [x] Artifact `91e62be`: `artifact.grants.write` declares no risk, so the member role
      selects it and Artifact's admin level decides; share links keep `sensitive`.
- [x] Deployed with installation `a5c7731` at 22:31.
- [x] Probe: a member granted their artifact `admin` to a group; the group's owner then
      granted it on; as a member of the group, writing through the Work Context, the same
      person was refused that; a member's share link was refused (checklist C11, C12,
      [record](records/2026-10-29-groups-everywhere.md)).
- [x] `billed` granted to a group: not a path. The installation never names a Lore group,
      and a person's role decides billed tools (section 9).
- [x] Hub's upstream discovery failed for about three minutes after a membership change,
      and in bursts at restarts ([record](records/2026-10-29-groups-everywhere.md)): idle
      keep-alive connections held all 64 of Hub's forwards to servers, and the next
      connection was dropped unlogged. Hub `549b0bb` keeps no idle forward and lets one
      beyond the 64 wait for another; `9e920f2` names a transport error's causes
      (checklist E5, [record](records/2026-10-30-handbook-and-upstream-forwards.md)).

Done when deployed and proven, with a record and the checklist. Done.

## 9. Owners delete groups, and the installation names no Lore group

Approved 2026-10-30 and active. Nothing could delete a group: an owner never removes
themselves, so every group keeps one. And a role, rule or Work Context membership could
reach a Lore group only by naming in the installation an ID that exists once someone
creates the group. The design is in Hub's and console's `DESIGN.md`.

- [x] Hub `6902627`: `DELETE /lore/{profile}/groups/{name}`, for an owner of the group,
      takes the group and every assignment naming it and answers the caller's groups;
      409 `group-owns-repository` while the group is a repository's one owner. A grant
      outside Lore naming its ID holds nothing afterwards, since no group is given that
      ID again.
- [x] Hub's design, same commit: the installation names only people and its identity
      provider's groups, which exist before it is published, never a Lore group;
      whether a person may call a billed or other risky tool is their role's to decide.
- [x] Console `8f94e5a`: `delete_group(group)`; console's sandbox policy allows the route
      (template installation `0a34b1c`).
- [x] Deployed with installation `6845224` at 03:08; no Computer version change.
- [x] Probe: a member who is no owner is refused; a group that is a repository's one
      owner is refused; an owner deletes it, its repository assignment goes, and an
      artifact grant naming its ID no longer reaches its former member (checklist C13,
      [record](records/2026-10-30-owners-delete-groups.md)).
- [x] The Computer handbook names `console__delete_group` (template installation
      `4fec1eb`, Bioma `21285b2`), published through the live control plane at 17:33;
      the handbook is not part of the Computer version, so no Computer restarts
      ([record](records/2026-10-30-handbook-and-upstream-forwards.md)).

Done when deployed and probed, with a record and the checklist. Done.

## 10. A supervisor change reaches every Computer, and quoted placeholders stay text

Approved and done 2026-10-30. A supervisor fix did not change the Computer version, so no
one was offered an update and no one restarted to take it. And a chat whose history quoted
a credential placeholder had every later message refused by the Computer's proxy.

- [x] OpenShell `c80bda2`: the compute driver reports its supervisor and sandbox runtime
      images, and `GetGatewayInfo` carries them; the Kubernetes driver reports its own.
- [x] Hub `2b14e65`: the Computer version names those images; what's new names a changed
      supervisor or runtime, and the status page says "The platform that runs your
      Computer was updated". Design in Hub's `DESIGN.md`. Console `8384a5b` carries them.
- [x] Installations `713515f` and `ef1aef9`: the model endpoint allows uninspected request
      bodies; its key stays bound to the header.
- [x] Deployed and proven (checklist B23, B24,
      [record](records/2026-10-30-supervisor-in-computer-version.md)).

Done.

## 11. AI security controls (NIST AI RMF)

Approved 2026-10-30. A company configures what its agents reach, which credentials
they use and which tools they call at which risk, and keeps a signed record of all of
it. Most of this is native: OpenShell's policy, middleware, interceptors and prover,
and Hub's risk-bearing permissions and audit. This section qualifies those controls in
a Veoveo installation and closes the gaps configuration cannot. The assessment against
the NIST AI RMF is in the [record](records/2026-10-30-ai-security-nist-ai-rmf.md);
checklist section H proves each item. A design change goes to its owner's `DESIGN.md`
first.

OpenShell's native controls, configured by the installation:

- [ ] Supervisor middleware: a content guard on the Computer's model endpoint (H1).
- [ ] Gateway interceptors: an approved policy on every new sandbox, and provider or
      policy changes that break the installation's rules refused (H2).
- [ ] Policy prover: a boundary policy in the installation, with the Computer and
      factory policies checked against it (H3).
- [ ] Sandbox OCSF export into the destination of Hub's audit export (H4).

Veoveo's own controls:

- [ ] Audit sealing and export qualified on the deployment: core and Hub (H5, H6).
- [ ] Audit records written in a branch's data environment are sealed and read with
      Hub's audit: core and Hub (H7).
- [ ] A role removed in Entra reaches a live Hub session: Hub (H8). Today a refresh keeps
      the sign-in's roles for the session's seven days, because Hub holds no Entra
      refresh token; logout and revocation end the session at once
      ([record](records/2026-10-26-second-person.md)).
      An administrator now ends a person's sessions and stops their Computer at once
      (section 12); the identity provider's change itself still waits for that call.
- [ ] Authentication on the local registry: the installation (H9). Network policies
      keep factory build steps away from it; any other workload the cluster admits to it
      can push.
- [ ] A crosswalk to the subcategories of NIST AI RMF 1.0, NIST AI 600-1 and NIST
      SP 800-53 Rev. 5, each row citing its checklist item and evidence: a record.

OpenShell upstream, as the fork's smallest coherent patches:

- [ ] MCP rules that match a tool's arguments (H10).
- [ ] Response middleware on a model's streamed response, once measured whether it
      counts as partial (H11).

Done when H1 to H11 are proven and the crosswalk cites them. Open: the decisions
listed under Open.

## 12. An administrator ends a person's sessions

Approved and done 2026-10-31. When a person's access changes in the identity provider,
nothing ended their Hub sessions, which keep the sign-in's roles for seven days, and their
Computer kept minting Lore tokens through its own client whatever their session.

- [x] Hub `ce3cada`: `DELETE /admin/{profile}/people/{email}/sessions`, for `admin_write`,
      revokes the person's live families (`administrator_revocation`, migration `0030`),
      clears their Computer's Lore client and stops their Computer, keeping its home.
- [x] Hub refuses a server acting for its caller on every admin route, so the call is the
      administrator's own, on the profile the admin rule names (`local`). A Console tool
      for it was built, found refused by that rule, and removed (console `acc4ba2`).
- [x] Deployed and proven (checklist A6,
      [record](records/2026-10-31-end-a-persons-sessions.md)).

Done.

## 13. MCP Apps, server surfaces and n8n

Approved 2026-10-30. Hub becomes the installation's MCP Apps host, following MCP Apps
`2026-01-26` without additions where the specification already provides a mechanism.
A server declares the HTTP it serves besides MCP, and Hub routes it, for factory
instances too. Time ships the first app; n8n then runs as a contained server, its editor
an app. Each step is a platform capability that any server uses; nothing is particular to
n8n. A design change goes to its owner's `DESIGN.md` first, in the same branch as the
code. Evidence so far: the
[n8n containment spike](records/2026-10-30-n8n-containment-spike.md). Checklist section I
proves each item.

Decisions:
- One public host for Hub, `veoveo.bioma.ai`, plus one wildcard,
  `*.apps.veoveo.bioma.ai`: `sandbox.apps.…` is Hub's sandbox proxy for every
  self-contained app, and `{slug}.apps.…` is the own origin of a server whose app is a
  full web application. `sandbox` is a reserved slug.
- An app's direct URL is `https://veoveo.bioma.ai/apps/{slug}/{page}` for `ui://{slug}/{page}`,
  a Hub convention. Card or full page is the specification's display mode; no Veoveo
  metadata is added.
- n8n comes from the `VeoveoAI/n8n` fork, whose changes stay in the fork.
- Hub tells app origins apart by `X-Forwarded-Host`, which `cloudflared` sets on the
  wildcard route from the name the browser asked for, replacing a client's value, and
  which OpenShell's ingress passes on. Hub reads it on its `apps` listener alone. No
  tunnel route or Hub service per server, and no OpenShell change.

Contracts, in the SDK:
- [x] The Apps contract follows the specification for a web host: Hub hosts apps; each app
      runs in an opaque inner frame inside Hub's sandbox proxy on `sandbox.apps.{host}`;
      an app's `csp.frameDomains` may name only its own server's app origin. The old
      Console host and monorepo paths leave the contract (I1 to I4).
- [x] A registration declares the server's HTTP surfaces: its public route prefixes, with
      size and rate limits, and its app origin, with the permission it requires as a new
      requirement kind (I5, I6).
- [x] The registration response names the instance's public base, which names its branch,
      and the server's app origin; `PublicDeployment` accepts a base with a path (I5, I6).

Hub:
- [ ] The Apps host: `/apps/{slug}/{page}` for the person's selected branch, with
      `?branch=`; the sandbox proxy; the bridge, with linked tools only, reads of the
      app's own server, Tasks and reactive wakes (I1 to I4).
- [x] App origins: `{slug}.apps.{host}` forwarded to the selected instance's
      authenticated routes with a forwarded token, behind a sign-in held in a host-only
      cookie of that origin (I6).
- [x] Public routes of factory instances on the public host, under a base that names the
      instance, through OpenShell's service exposure (I5).
- [x] Requested providers: an instance gets the provider profiles its branch requests and
      the installation grants, including model access (I8, I9).
- [ ] Connecting a service: consent in the browser, the refresh material in OpenShell's
      custody, the provider attached to the instance (I10).

Installation:
- [ ] `*.apps.{host}`: one wildcard DNS name, its certificate and the tunnel route to Hub.
      Bioma's needs Cloudflare's Advanced Certificate Manager for the two-level name
      (I7). Checklist F2's single host becomes the host plus this wildcard.
- [x] The factory's provider grants and a model provider profile for instances (I8, I9).

OpenShell fork:
- [x] Strict credential binding: a credential-bound endpoint admits a request only when its
      credential carries the bound placeholder (I11).

Time:
- [x] Time's app: a self-contained view that supports `inline` and `fullscreen` and calls
      Time's linked tools; the first proof of the host (I1 to I4). Only `fullscreen` has a
      host so far: Hub's direct URL.

n8n:
- [x] `VeoveoAI/n8n`: the schema check before `CREATE SCHEMA` (branch `veoveo` over
      `n8n@2.46.0`), and a build of the fork into an image in the installation's registry
      that factory images start from (I12).
- [x] `veoveo-mcp-n8n` as its [design](https://github.com/VeoveoAI/veoveo-mcp-n8n/blob/main/crates/veoveo-mcp-n8n/DESIGN.md)
      states: runs as Tasks with status checks, workflows applied from Lore, executions,
      the bridge and the hooks (I12 to I15). Its editor app, where every person acted as
      n8n's one owner account, is withdrawn by [section 14](#14-n8n-private-editing-in-the-computer-team-workflows-through-lore-links).

Order: the contracts, then the Apps host with Time's app, tested locally on
`veoveo.localhost` and `sandbox.apps.veoveo.localhost`; the wildcard name, then the deploy
and qualification of Time's app; then app origins, public routes, providers and strict
binding; then n8n.

Done when section I is proven, with a record for each step and Time's app reached through
its direct URL. n8n's app is section 14's.

## 14. n8n: private editing in the Computer, team workflows through Lore links

Approved 2026-10-31. Section 13's editor signed every person in to n8n as its one owner
account, so n8n could not tell people apart and `n8n.editor` meant owner of the instance.
Now each person edits in an n8n in their own Computer, as with OpenCode. Team workflows
live in team repositories linked into the one n8n repository. The factory runs one n8n,
a runner, for each environment and linked repository, all the time. The Hub understands
links, so a person's grant on a linked repository decides their access to that path
everywhere. Everything uses free n8n. A design change goes to its owner's `DESIGN.md`
first, in the same branch as the code. Checklist section J proves each item; I16 is
withdrawn, and its record stays as evidence of what was built.

Decisions:
- Veoveo follows Lore: the fork carries Epic's `main` with Veoveo's changes on top, and
  Lore's model of permissions decides how the Hub grants repositories. Lore is brought up
  to Epic's `main` before work that depends on it, starting with this section.
- Editing is private, in the person's Computer: an n8n they own, with their drafts,
  their own automations and the Assistant. No runner serves an editor; on a runner only
  the server uses n8n's owner account.
- Workflows change only through Lore. No MCP tool changes a workflow.
- The n8n repository, the parent, holds the program, its policy, the node types any team
  may use, and one link per team repository at `{team}/`. Its owners change it to add or
  remove a team. It is the Hub's directory of teams: people clone the team repositories
  they hold a grant on, never the parent, since a clone of the parent fails at a link its
  person may not read ([record](records/2026-10-31-lore-link-access.md)).
- A team repository holds its workflows, its credentials file and the providers it
  requests. Its grants, to people and to groups, decide who sees, runs and changes them.
- Environments are the parent's branches; the base branch is production. An
  environment's runner for a link runs the head of the team repository's matching
  branch, applied as its pusher, not the parent's pinned revision, and the Hub records
  the revision each runner applied. A team releases by merging in its own repository.
  Other branches get a preview runner only on request.
- A Lore pin resolves once (`resolve_pin` in `lore-revision/src/link.rs`), so a link
  never moves by itself.
- One n8n MCP server. The Hub routes by link and names per link, `n8n.{team}__{tool}`
  and `n8n://{team}/…`, and a person sees only the links they hold a grant on.
- The token the Hub forwards to a runner carries the caller's grant on its repository,
  in the same `resources` form as a Lore token.
- Each runner gets only the providers granted to its team's repository, in its own
  sandbox, so one team's credentials never sit in another team's n8n.
- Execution data follows the authority it was fetched with: an MCP run's data goes only
  to the person who started it; a webhook or schedule run's data goes to everyone with a
  grant on the repository; everyone else with access sees status, timing and the failing
  node. A workflow file may tell n8n to keep no data.
- Public webhooks reach runners only, never a Computer. A Computer stays on until its
  owner turns it off, so personal schedules run there.
- The Apps page `ui://n8n/overview` summarises every linked team the person holds a
  grant on and opens the person's own Computer with `ui/open-link` to edit.

Lore update, the first slice:
- [x] The fork takes Epic's `main` (`b8fc623d`, 70 commits since 2026-10-18), keeping
      Veoveo's 19 commits: the security fixes (the distrusted eMudhra roots, dependency
      advisories, endpoints that must authenticate the server), storage and client fixes,
      and an explicit action on every partition operation (`483c96ff`): writing needs
      `write`, a protected push `push-protected`, deleting a repository `owner` or `admin`,
      while any token for a repository still reads it (C14).
- [x] Hub: Lore tokens carry explicit actions, `write` for members and owners and `owner`
      for owners, and a `reader` access clones and cannot push; Console's share tool offers
      it (C14).
- [x] Installation: Lore's per-repository authorizer grants what a token's permission names,
      plus read; `implicit_actions` belongs to the global authorizer and stays unset (C14).
- [x] Lore and the Hub deployed together; sharing, pushes, deletion, Computers' clones and
      pushes, factory fetches and J1 again (C4, C8 to C10, C14, J1,
      [record](records/2026-10-31-lore-explicit-actions.md)).

Lore:
- [x] Access stops at a link on the installation's Lore: an ungranted linked repository is
      refused, directly and through the link; with every grant, one tree (J1,
      [record](records/2026-10-31-lore-link-access.md)).

Hub:
- [x] Links are first-class: read from the parent's revision; a grant on a linked
      repository decides access to its path; the forwarded token carries the caller's grant
      on the runner's repository (J2, J3,
      [record](records/2026-10-31-n8n-runners-phase-1.md)).
- [x] Runners: one for each environment branch and link, running the team branch's head
      as its pusher and recording the applied revision; added, updated and removed as links
      and team branches change, leaving the other runners untouched (J4, J5,
      [record](records/2026-11-01-n8n-runners-phase-2.md)). Preview runners on request stay
      planned.
- [x] Routing and names per link, with Tasks and token exchange per runner (J3).
- [x] Providers granted to a team's repository attach to its runners, read from the live
      control plane at each push (J6, [record](records/2026-11-01-n8n-team-credentials.md)).
- [x] Computers: the Computer's programs served to its owner (`computers.apps`),
      `ui/open-link` to the person's own Computer, keep-on and stop (J8, J9,
      [record](records/2026-11-01-n8n-in-the-computer.md)); J11, a kept-on Computer's schedule
      ([record](records/2026-11-01-n8n-keep-on-schedule.md)).

Installation:
- [x] n8n and the Veoveo nodes in the Computer image; `veoveo-n8n-computer` the one n8n
      program in the Computer policy's `hub` and `model` rules; OpenShell's `npm_registry`
      rule; 6 GiB (J8, J12, [record](records/2026-11-01-n8n-assistant.md)).

n8n server:
- [x] The runner: it applies one link's workflows, in a database per runner, with the
      team's credentials file (J4, J6).
- [x] Execution data by who started the run and by the forwarded grant (J7).
- [x] The overview App (J9).
- [x] The team editor, its app origin, `editor_changes`, `n8n://editor` and the editor
      launcher removed (J10).

Computer:
- [x] The Computer clones each team repository the person holds a grant on; n8n opens their
      workflows and saves them back as files; "Edit in my Computer" opens a team and
      workflow, cloning as the person when needed (J8, J9).
- [x] The Assistant: the Computer's model, and a local sandbox service speaking n8n's
      sandbox protocol (J12).
- [x] The Assistant uses the person's Hub tools through the program's MCP endpoint, and the
      Veoveo Tool lists the tools; the fork's MCP client negotiates 2026-07-28 first (J13,
      J14, [record](records/2026-11-01-n8n-assistant-hub-tools.md)).

Docs:
- [x] `ARCHITECTURE.md`, the owning `DESIGN.md` files and the platform diagram, including
      section 13's state. The diagram shows J1 to J14 proven.

Order: the Lore check (J1) first, since everything rests on it; then the Lore update; then
the designs and the diagram; then the Hub's links, runners and routing with the n8n server as runner; then
the overview App; then n8n in the Computer with the Assistant; then qualification. The
deployed n8n instance keeps serving until runners replace it.

Done when section J is proven, with a record for each step.

## 15. MCP Skills: one home for agent guidance

Approved 2026-11-02, with the decisions below as settled. Guidance for agents is spread over places that do not
reach each other, and most of it reaches no agent. The MCP Skills extension
(`io.modelcontextprotocol/skills`, SEP-2640, base protocol `2026-07-28`, spec in
[ext-skills](https://github.com/modelcontextprotocol/ext-skills/blob/main/specification/beta/skills.mdx))
lets the component that owns a piece of knowledge serve it as skills: `skills/list` and
`skills/get` answer each skill's verbatim frontmatter and a complete manifest of its files
with SHA-256 digests, the files are resources read with `resources/read`, and a host loads
a skill only when a task needs it. The goal is one channel: each server serves the skills
for using it, the installation's guidance becomes skills the Hub serves, the server
`instructions` shrink to a few lines that point at skills, and OpenCode and n8n's
Assistant load them the same way.

Where guidance lives today (survey of 2026-11-02, by reading code):
- The Hub's instructions: one fixed line, the installation's Computer handbook
  (`computer/instructions.md`, 5.9 KB, Computers' client only) and the person's section
  (Hub `5c72d75`). OpenCode reads them once per connection.
- Each server's own `instructions`: console 276 B, Time 342 B, Artifact 489 B, Media
  387 B, Embedding 499 B, n8n 350 B, the template 151 B. The Hub reads only an upstream's
  capabilities from `server/discover`, so none of this reaches any agent. Embedding's text
  lacks spaces ("default to768"); n8n's names `n8n://workflows`, which callers see as
  `n8n://{link}/workflows`.
- Prompts: Time 3, Artifact 2, Media 4, which OpenCode shows as slash commands.
- Each server's AGENTS.md and DESIGN.md, served as `{scheme}://docs/…`: manuals for the
  server's maintainers, not guidance for its users.
- The Hub CLI's `ask` has its own system prompt and ignores the Hub's instructions.
- n8n's Assistant reads no server `instructions`; it has 9 bundled skills and n8n's own
  remote skills. OpenCode has filesystem skills, a URL skill index and two built-in skills
  (`opencode`, `report`); the Computer bakes in no AGENTS.md or skills.

Decisions:
1. Server skills are published under `skill://{slug}/{name}/SKILL.md`, which registration
   enforces as it enforces `ui://{slug}/`. The Hub then passes entries and bytes through
   unchanged, digests hold, and the path keeps the originating server visible behind the
   one MCP server a host sees. The alternative, the Hub rewriting skill URIs, is not
   recommended.
2. A linked server's skills are one set per server, as its Apps are, not one per link.
3. The Hub's own skills live under a reserved `skill://veoveo/…` that no slug can take,
   sourced from the installation as the handbook is today (`computers.skills` replacing
   `computers.handbook`), with digests computed when the catalog loads.
4. Approval on a Computer. The installation pre-approves, by name, the Hub's own skills and
   the skills of the platform's native servers (console, Artifact, Media, Embedding); that
   is the explicit per-skill approval the spec asks for, given by the installation for its
   people. A skill of a factory-served branch, which is code a person pushed, needs the
   person's approval before its first load and again when its files change, and while it
   is active the host asks before shell, Code Mode `execute` and subagents. The acting
   window ends when the session compacts the skill out of context.
5. Upstream `instructions` stop being a channel: each server's guidance moves into its
   skills, and its `instructions` say only what it is and which skills it serves. The Hub
   keeps one line, the person's section and pointers to its own skills.
6. Prompts stay user-invoked templates, and the guidance they repeat moves into the
   server's skills, so a prompt states its task and names the skill.
7. Skill text names tools as callers see them (`{slug}__{tool}`, `n8n__<team>__run`), which
   the SDK's authoring guide states, since the Hub cannot rewrite bytes without breaking
   digests.
8. rmcp follows upstream `main` from a pinned revision of our fork's `veoveo/main`, which
   carries the Skills support merged in #1392 (after 3.8.0), #1412 until it merges, and
   our four patches (task status subscriptions, typed HTTP rejections, two log levels).
   Our forks stay ours: nothing is offered upstream for now. `"dynamic"` skills are not served and hosts refuse them. AGENTS.md and
   DESIGN.md stay maintainer documents, not skills. `resources/directory/read` is not
   declared at first, since manifests are complete.

Inventory, in order (S, M, L by size):
1. rmcp (M). Move Hub, the SDK and every server from the fork at 3.5.0 (`faa4e9d`, and
   `917e791` on console, Artifact, Media, Embedding and the template) to the pinned
   upstream revision. Upstream's typed API (`model/skill.rs`: `SkillsCapability`,
   `SkillResource::from_bytes`, `ListSkillsResult`, `ServerHandler::list_skills` and
   `get_skill`, `Peer::list_skills`) replaces any types of our own.
2. veoveo-core (M). Directory embedding at build time with `build.rs` change tracking
   (`embedded_document!` embeds one file), reusing `Sha256Digest`, which already has the
   spec's `sha256:{hex}` form. A YAML parser for frontmatter (core and the SDK have none;
   the Hub has `serde_yaml` 0.9, upstream uses `yaml_serde` 0.10), run at build time so
   every host sees the same JSON.
3. veoveo-hub-sdk (M). `server_skills!` and `ServerSkills` beside `server_docs!`, a
   `SkillUri` like `AppUri`, the extension declared when the bundle is non-empty, the
   bundle validated (name equals directory, at most 512 files and 16 MiB), `skills/list` and
   `skills/get` answered from it, `skill://{slug}/…` reads served before domain code,
   registration ownership of `skill://{slug}/`, requirements and policy for skill reads,
   `HubClient::skills` and `skill`, CLI `skills` and `skill <uri>`, a fixture with a
   `skills/` directory, and the SDK's DESIGN.md, conventions and authoring guide.
4. Each server (S each). A `skills/` directory for console (watch, select, status, logs,
   sharing), Time, Artifact (upload, download, share), Media (model, schema, run, Artifact),
   Embedding, n8n (a workflow-authoring skill: the Veoveo Trigger, Tool and Result contract,
   `CUSTOM.*` types, tool names, admitted nodes, credentials as placeholders, drafts, with
   the team template's workflows as examples) and the template (a reference skill and a
   manifest test). Each `instructions` shrinks to a pointer.
5. Hub (L). Declare the extension per admitted client; `skills/list` aggregated per caller
   with authorization per skill (an entry is dropped whole if any file is denied), a skills
   discovery cache and watch invalidation, private entries; `skills/get` and
   `resources/read` routed for `skill://{slug}/` (shared across a server's runners, as
   `ui://` is) and `skill://veoveo/`; the Hub's own skills from the control plane; new
   `HubAction`s and audit records for skill discovery and gets; the instructions reduced to
   the line, the person's section and pointers; DESIGN.md (routing and catalog, the
   Computers section).
6. Installation (S-M). The handbook becomes `computer/skills/` (the home, the Lore
   workflow, served branches, Computer versions, Artifact transfers); the installer
   publishes it as `computers.skills`; the template and Bioma's copy.
7. OpenCode, a carried item in the fork (L). Bump `@modelcontextprotocol/client`, `core`
   and `server` from 2.3.1 to 2.4.0 and rebuild our client patch; enable skills on modern
   connections only; reuse the SDK's `SkillsClient`, which verifies size, digest,
   frontmatter and unlisted files. OpenCode adds the rest: an MCP skill registry plugin
   keyed by server and path, never by URI alone, that never shadows filesystem skills; a
   lazy, verified load with an origin tag and the manifest's file list; load by URI; a
   supporting-file tool bound to the originating server; approval bound to the skill's file
   set, asked even under the Computer's allow-all default; the code-execution gate while a
   skill is active, subagents included; origin in the skill list and the UI; tests with a
   2.4.0 fixture server.
8. n8n, a carried item in the fork (M-L). `McpConnection` adds a `SkillsClient` and reads
   server `instructions`; an MCP skill source for `@n8n/agents` with an origin field, the
   server's configured name as its label, the 512-file and 16 MiB limits, no `"dynamic"`
   skills and no `allowed-tools`, `dependencies` or `policy` taken from MCP frontmatter;
   approval before the first `load_skill`, revoked when the file set changes; active-skill
   IDs encoding server and URI; MCP skills kept out of the trusted `<active_skills>` block;
   the code-execution gate on `workspace_execute_command`; MCP skills as a third source in
   the Assistant's skill assembly; `@modelcontextprotocol/server` 2.4.0 for test fixtures.
   veoveo-n8n-computer's forwarder already passes every method byte for byte; it gains a
   test.
9. Qualification. New checklist rows: a server's skill is listed with its origin and loaded
   on demand in OpenCode and in n8n's Assistant; nothing is fetched before load; a changed
   file forces re-approval; a skill cannot drive a read on another server or run code
   without approval; the Hub's own skills replace the handbook.

Order: rmcp and core first, then the SDK with one server (console) end to end through the
Hub, then the Hub's own skills and the handbook, then OpenCode, then n8n, then the rest of
the servers.

Delivered 2026-11-02 ([record](records/2026-11-02-skills-and-work-context-sweep.md)): rmcp fork
`d45f7f5` (1), core `05b6c47` (2), SDK `aff0022` (3), the servers (4: console `4c8a185`, Time
`565502c`, Artifact `044a75b`, Media `e54cbb0`, Embedding `488594e`, n8n `5d82515`, template
`fdb7df8`), Hub `496988c` (5), installation `8055532` and Bioma (6), OpenCode `e3dd1a1` (7),
n8n fork `fa3e680` (8). Deployed and proven: checklist K1, K7 and K8 (a pushed server's skill
asks first in OpenCode and in n8n's Assistant, 2026-11-03).

## 16. Remove Work Context: a project is a group

Approved 2026-11-01; started 2026-11-02 in one sweep with section 15 and the rmcp move, so every server is rebuilt once. A Work Context is a configured project: each token
binds one, a caller who is not a member is refused everything, and Hub signs the caller's
membership level into every forwarded token. Today it separates nothing. Every Computer
works in the one Work Context the installation's `computers` section names, so nobody
switches, and since `create_upload` needs contributor, everyone who creates artifacts
also writes everyone else's. Only Artifact decides with it (its membership rule and its
output labels), and Hub binds Tasks to it; Time and Embedding store it; Media, n8n,
console, Lore and the factory ignore it. The output policy's `owner` and
`initial_grants` are signed into every token, and no server reads them.

Projects must be separable by classification, and a person keeps one Computer across
their projects, as they keep one laptop. Lore's groups already give that.

Decisions:
- A project is a group. Lore repository assignments and Artifact grants stay separate
  mechanisms that name the same group. Joining the group gives what is already shared
  with it; leaving removes that, in Lore and in Artifact, and a person's own assignments
  and grants stay.
- An artifact belongs to its creator and is private until shared. Sharing is a separate
  `grant_artifact` call, so a failed share leaves it private. `create_upload` takes no
  grants: Hub decides permissions per tool, and uploading must not carry
  `artifact.grants.write`.
- A Task belongs to the person who started it. Ownership is attribution, not authority:
  a Task reaches nothing its person's repository assignments, artifact grants and data
  labels do not.
- An output that a Task or another server produces is owned by its person, never by a
  server's identity; the acting server and Task stay in its provenance. Check how
  Artifact names the owner of a call another server makes for a caller today.
- Data labels stay, per person, for classification beyond who is on a project.
- One Computer per person, across projects. A project is an access grouping, not an
  execution boundary; revoking access does not take back what a Computer holds or a
  person downloaded. `ARCHITECTURE.md` says so.
- No replacement project context.

Work, each design change written in its owner's `DESIGN.md` first, in the same branch
as the code:
- [x] Core (05b6c47): remove `WorkContextId`, `WorkContextMembershipLevel`,
      `WorkContextOutputPolicy`, `WorkContextGrant` and `InvocationAuthority`'s Work
      Context fields, the `identity` schema's Work Contexts, and the Work Context of
      audit and usage records (`platform/types/DESIGN.md`, `docs/DATABASE.md`).
- [x] SDK (aff0022): forwarded identity, request context, Task ownership, usage and the test Hub
      without a Work Context.
- [x] Hub (496988c): no Work Context definitions or memberships in the control plane, no
      `work-context` claim, `work_context` parameter or client `defaultWorkContext`, no
      membership check at sign-in or per request, no Work Context column or binding on
      Task routes, and no Work Context in the `computers` section (Hub's, its token and
      session authority's and its Task routes' `DESIGN.md`).
- [x] Artifact (044a75b): no Work Context column, listing filter or membership rule; a caller's
      level is the highest of ownership, principal grants and group grants capped by
      the group role; labels are the requested ones, within the caller's data labels.
- [x] Time (565502c) and Embedding (488594e): no Work Context columns or fields.
- [x] Installation template (8055532) and Bioma (0a0255a): seeds without `workContexts` or client defaults;
      `veoveo-installer plan` no longer leaves out memberships.
- [x] Each owning design names where each remaining decision is made: repository access
      by Lore from Hub's tokens, artifact access by Artifact from the forwarded groups
      and its grants, Task access by Hub's route and then the server, tool permissions
      by Hub's roles.
- [x] Docs: `ARCHITECTURE.md`'s trust boundaries (4ed3dd1), the checklist (section K) and
      the platform diagram (d8fc9d8).
- [x] Cutover (2026-11-02): reset application state; end every session and refresh family so no token
      of the old shape remains; every server takes the new core and SDK in one rollout;
      Computers restart onto it.
- [x] Qualification (2026-11-02, [record](records/2026-11-02-skills-and-work-context-sweep.md);
      a Task answering only its person proven 2026-11-03 as checklist K6): a group member reads and writes an artifact granted to the group and
      loses it when removed, while a personal grant survives; a removed member loses the
      group's repository access, within the token reuse in Later; an artifact a Media
      Task produces is owned by the person who started it; a Task answers only its
      person; no token, table or record names a Work Context.
- [x] Hub (92ad0be): a Task exchange is refused once the installation removes its
      caller from a configured group they held when the Task started.

Known limits, accepted for now:
- Groups the identity provider alone gives are kept from the sign-in that created the
  session; a refresh does not read them again, so a removal there takes effect at the
  next sign-in. Re-reading them at refresh is the fix when it matters.
- The ID-JAG grant's delegated mode makes the OAuth client the actor and owner of
  outputs. No installation configures it; it is not for a person's work until outputs
  are owned by the initiating person.

Order: core, then the SDK, Hub, the servers and the installation, then cutover and
qualification. Done when deployed and proven, with a record and the checklist.

## 17. Knowledge: one contract every server expresses, and each searches its own records

Approved 2026-11-03. Done 2026-11-04 ([record](records/2026-11-04-knowledge-deployed.md)). The monorepo's Knowledge was never ported: the split deleted its
extension and contracts from core, and Embedding was ported as generation only
([survey](records/2026-11-03-knowledge-port-survey.md)). That Knowledge read every
approved collection as its own machine client, cached it in one SurrealDB index, and
repeated each record's access rule at search time, with approvals, index generations,
leases, listeners and windowed audit to keep the copy honest. Most of that rested on
Work Context, which section 16 removed, and on a standing service authority that the
architecture does not have.

Here knowledge is one MCP contract that any server expresses in the same way, and a
server that expresses it searches its own records: they carry their own text and vector
columns, and search is filtered by the server's own read rule. Nothing leaves its owner,
nothing reads on everyone's behalf, and there is nothing to approve, refresh or
reconcile. Embeddings are multimodal: text, image, audio and video share one space.

Decisions:
1. **One contract.** The SDK defines the extension `ai.veoveo/knowledge` completely, so
   every server expresses it alike and every client uses it alike:
   - A server declares `ai.veoveo/knowledge` in its `server/discover` capabilities, and
     marks each resource template whose records are knowledge with
     `_meta["ai.veoveo/knowledge"] = {"collection": "{slug}.{name}"}`. The template's own
     name, title and description say what the records are. The templates are the catalog:
     listing resource templates through the Hub shows every collection a person can reach.
   - It serves one tool, `search_knowledge` (`{slug}__search_knowledge` to callers), with the
     SDK's schemas. The query is ordered text and media parts, each media part the SDK's
     signed media `{url, headers, mediaType, size}`, which Embedding's contract takes as it
     is (decision 8). It may name collections of that server, and takes a limit of at most
     20. Hits come in rank order, each with the record's URI, its collection, title, a text
     snippet of at most 320 characters and `modifiedAt`, and one `resource_link` each. A
     caller reads a hit through its owner for its content.
   - The searcher chooses the modality, never the server. Every collection lives in one
     multimodal space, so an image searches records that hold only text as readily as words
     search images; a server accepts every modality Embedding takes, and declares none.
   - The tool requires the server's own read permission for those records, declared
     through `ai.veoveo/authorization` like any other.
   - Checks, without a runtime inspector (the SDK has none): the SDK refuses at startup a
     declaration that does not hold together, and checks every result before it leaves
     the server; a `testing` helper gives each server one test in which a query of each
     modality is answered rather than refused and every hit reads back for the same
     caller; the deployed probes check the same through the Hub.
2. **Each server searches the records it already has.** There is no index table: a
   knowledge record carries two more columns in its own table, a generated `tsvector` of
   its text, which PostgreSQL keeps current with the row, and a pgvector `vector(768)`
   with the model that made it. Search is the server's own readable-records query, the
   one its listings use, ranked by full text when the query holds text and by cosine
   distance through an HNSW index, the two fused by reciprocal rank (k = 60). The read
   rule therefore applies before ranking and limit, so a record the caller may not read
   never appears, title and snippet included, and pgvector's iterative index scan keeps
   a filtered page full.
3. **Multimodal indexing.** A record's vector is one Embedding item of its text and its
   media together (prompt `Document`, 768 dimensions), so a description finds an image
   and an image finds a description. The query is embedded with `SearchQuery` as the
   caller. No chunker until a source holds long text (Later): an artifact's name and
   metadata and Time's records each fit one item.
4. **Writes.** PostgreSQL keeps the `tsvector` column current with the row, so word search
   finds a record as soon as it is written. The write does not wait for its vector: it
   starts a durable Task for its caller, and its answer names that Task. The Task runs
   `index`, which reads the record's text and media, sends them to Embedding as the
   person who wrote it (so the usage and the result are theirs) and stores the vector; it
   survives restarts, and the person sees it among their Tasks, with its failure if
   Embedding fails. Until it finishes the record is found by words. For the Task to act as
   the person, the Hub records it as that person's Task when the call's answer names it,
   as it already records a Task a Task tool creates; it carries the same limits, the
   server's declared uses narrowed to what the person holds. Search compares only
   vectors made by the query's model. A model change resets the vectors; development
   data is disposable.
5. **The SDK gives three layers; only the first is required.** It lives in a `knowledge`
   module beside `skills`.
   - **The contract** (`contract` feature): the template marker, the query and hit types,
     the signed media part and the tool's schemas. A server in another language, or one
     that keeps its records elsewhere, implements the contract by hand against the same
     schemas.
   - **The wiring** (`server` feature): a Rust server implements one trait,
     `KnowledgeSearch`, with one method, `search(ctx, query) -> hits`, and registers it
     with its routes, where it also marks its templates. The SDK declares the extension,
     marks the templates, publishes `search_knowledge` with the contract's schemas,
     checks the limit, trims snippets, confirms each hit belongs to a declared
     collection and adds the links. Inside `search` a server may do anything.
   - **The ready-made PostgreSQL search** (`server` feature): `PgKnowledge`, an
     implementation of `KnowledgeSearch`. A server adds the two columns and their GIN
     and HNSW indexes with SQL the SDK documents, and implements `PgKnowledgeSource`: its
     collection, its table, its existing read rule as a SQL condition (Artifact's is
     `artifact.effective_level`), how a row becomes a hit, and what to embed for a
     record. `PgKnowledge` writes the search query, writes the vectors in `index` and binds
     the caller's identity into the read rule. Its pieces (embedding a query, fusing two
     rankings) are public, so a server that writes its own `search` can reuse them.
   - **Embedding** is reached through an `Embedder` trait in the SDK, because the SDK
     names no server. Servers do not implement it: Embedding's `client` feature does, so
     a server passes `EmbeddingClient`; tests pass a fake.
   - The SDK's SQL confinement check admits `_extensions`, where the installation keeps
     pgvector 0.8.7.

   A server on the ready-made path writes one migration, one `PgKnowledgeSource`, the
   start of the `index` Task in its writes and a paragraph of its skill.
6. **Across servers, the client fans out.** OpenCode and n8n's Assistant call the
   `{slug}__search_knowledge` tools they need and read the hits. The Hub's own skill
   `skill://veoveo/knowledge`, from the installation, teaches the contract once; each
   server's skill says what its collections hold. One fused search behind a single tool
   is in Later: calls between servers name each provider's typed contract and declared
   use, so no server can call servers it learns of at run time.
7. **Not ported:** the Knowledge server with its catalog, approvals and `embed` tool (Embedding
   has one); entity kinds, enumeration, freshness lifetimes, change signals, conditional reads,
   observations, access descriptors and read policies; the indexing client, its
   `indexing-read` intent and audit windows; index generations, leases and
   reconciliation; DCAT shapes; provenance lines in an agent's context. Server documents
   are not indexed: skills carry guidance, and `{scheme}://docs` stays maintainer manuals.
   No Knowledge repository is created, so the split plan's D29 does not apply to it.
8. **Embedding takes media by signed URL, not by artifact ID.** Artifact, the first source,
   must call Embedding, and Embedding's `contract` used Artifact's types because it
   resolved artifact IDs through Artifact as the caller. A scratch build of two crates
   shaped that way fails with `E0308`, two different `ArtifactId` types in one graph.
   Instead a media part is `{url, headers, mediaType, size}`, and Embedding depends on no
   Artifact crate. Artifact decides access when it signs, and records
   `artifact.download_issued` with the caller and the acting server; Embedding's runtime
   already fetches only from the installation's storage origin, with no redirects. A
   URL is accepted as input and never echoed in results, errors or logs. A signed GET
   lives 5 minutes, so a caller signs right before each call. Artifact signs its own
   downloads for its Task; a source whose records hold artifacts signs through
   `artifact__create_download` as the writer; an agent that embeds an artifact makes
   that call first.

Work, each design change written in its owner's `DESIGN.md` first, in the same branch
as the code:
- [x] Docs: a topic-map row in `ARCHITECTURE.md` for the knowledge contract (SDK and the
      installation's skill), the component rows, and the platform diagram's Embedding and
      Artifact notes.
- [x] SDK, the contract and the wiring: the `knowledge` module's `contract` feature, the
      `KnowledgeSearch` trait and its registration, the `Embedder` trait, the startup and
      result checks, the `testing` helper, a fixture server with one collection, its
      `DESIGN.md` section, conventions and authoring guide (SDK `cc16cfe`, tree
      `416cd46`; Docker check on the Mac and three times on Linux x86_64, each 362
      passed and 3 skipped; all fixtures synthetic).
- [x] Embedding: media parts by signed URL (decision 8), the SDK's signed media type, with
      no Artifact dependency, its Artifact resolution and declared Artifact use removed;
      a `client` feature implementing the SDK's `Embedder`; its `DESIGN.md` and skill
      (Embedding `0ee0e23`, runtime `eb0f5f7`; Docker checks on the Mac and Linux, 41 and
      25 tests, synthetic). Its deployed qualification is in Qualification below, with a
      tampered and an expired signature refused.
- [x] SDK, the ready-made search: `PgKnowledge`, `PgKnowledgeSource`, the documented
      migration SQL, `index`, SQL confinement admitting `_extensions`, and
      tests against PostgreSQL with pgvector (SDK `22ff657`, with core `97e85e0`'s
      `TestDb::create_extensions`; then core `a8dafe9`'s `Conformance::extensions`, SDK
      `b820f05`). The SDK's rule that it owns no queries is
      relaxed for this search and its vector writes over a server's own table (2026-11-03,
      SDK `f6f0578`); it still owns no schema and no query on core's tables.
- [x] SDK and Hub, a Task a call starts (SDK `22ff657`, Hub `e86466e`; the CLI's `call` prints
      the result's `_meta`, SDK `ed8d2f8`): a tool handler starts a durable Task for its caller
      and its result names it in `_meta["io.modelcontextprotocol/related-task"]`; the Hub
      records a Task so named as the caller's, with the same route, delegation limits and
      visibility as a Task a Task tool creates, so its worker can call Embedding as the
      person. Each `DESIGN.md` first; tests on both sides.
- [x] Installation: remove Embedding's Artifact call rules from `openshell/embedding.yaml`
      and `kubernetes/policies/embedding.yaml` (and its `/oauth/token` rule if nothing else
      uses it), and update `openshell/EMBEDDING.md` and `kubernetes/EMBEDDING.md`; the
      template and Bioma's copy (template `24e28e0`, Bioma `6049e3c`; Artifact's token
      exchange and Embedding call rules, template `9a79799`, Bioma `16955fc`).
- [x] Artifact, the first source (Artifact `d570e06`; Media `6a85dce` takes its contract): the collection `artifact.artifacts` (an available
      artifact's name, metadata and media), with the two columns on its `artifact` table
      and a `PgKnowledgeSource` whose read rule is `artifact.effective_level` and the
      caller's data labels; `index` in the call that makes an artifact available, as its
      uploader, with Artifact signing its own download; its skill.
- [x] Time, the second source (Time `15775e1`), to show the contract is common: the collection `time.events`
      (an event's name, readable only by its owner), text-keyed records without media under
      another read rule; `create_event` indexes through the SDK; its skill. Calendar and
      epoch versions, addressed by key and version, come later.
- [x] Installation: `computer/skills/knowledge`, pre-approved with the Hub's own skills, in
      the template and Bioma's copy (template `217759a`, Bioma `91a3e7d`).
- [x] Hub: `_meta` on resource templates reaches callers unchanged, proven deployed
      ([record](records/2026-11-04-knowledge-deployed.md)).
- [x] Qualification (deployed 2026-11-04 ([record](records/2026-11-04-knowledge-deployed.md))). It proves the contract
      works; the quality of the embeddings is not part of this effort:
      - [x] Component tests against PostgreSQL with pgvector: the read rule applies before the
        limit, so a restricted caller still gets a full page; vectors from another model are
        never compared; the Task embeds as the writer.
      - [x] Deployed probes: a person finds their image by a description and by another image;
        a new artifact is found by text at once and by meaning once its Task completes; a
        group member finds an artifact shared with the group and loses it when removed; every
        hit reads back through its owner; the same calls work on Time, where an image
        query is answered from records that hold only text.
      - [x] Last, model-driven acceptance in OpenCode (MiMo-V2.6-Pro, checklist G4).

Order: the SDK's contract and wiring, then Embedding, then the SDK's ready-made search
and the Hub's recording of a Task a call starts, then the installation's Embedding rules,
then Artifact end to end through the Hub, then Time, then the installation's skill, then
qualification. Done when Artifact and Time express the contract, an agent finds a
person's media by meaning across both through the one skill, and that is proven
deployed, with a record and checklist rows.

## 18. USD: a viewer and agent tools from `bevy_openusd`

This section also covers previews for every other file, on Lore and Artifact.

Approved 2026-11-04, and being built in the order below. This section holds what the owner has decided and the design that
follows, and changes as they do. Evidence is in the [investigation](records/2026-11-04-usd-investigation.md),
[loading](records/2026-11-04-usd-app-loading.md), [Lore files](records/2026-11-04-usd-lore-files.md),
[Lore access](records/2026-11-04-usd-lore-access.md), [file types](records/2026-11-04-usd-file-types.md),
[previews](records/2026-11-04-usd-previews.md), [PDF viewer](records/2026-11-04-usd-pdf-viewer.md),
[file-viewer](records/2026-11-04-usd-file-viewer.md) and [content domain](records/2026-11-04-usd-content-domain.md) records.
When something is built, its design change goes to the owner's `DESIGN.md` first, as always.

People open USD scenes and any other file in the Hub, and agents inspect and render the same scenes, from one Rust codebase
that runs as WASM in the browser and natively on the GPU.

Decided by the owner:

- **This is a media platform.** People preview, run, test and interact with media. Safety comes from where a file runs, not
  from taking the experience away.
- **Library.** `usd_bevy` from `bevy_openusd`, on the pure Rust `openusd` crate. `usd-wg-webview` is not good enough.
- **Copied source, not a fork,** with the upstream commit recorded beside it.
- **Latest Bevy,** 0.20.1 today.
- **Scenes live in Lore,** read directly, with no runner, checkout or disk.
- **Lore's rules decide every read.**
- **The Hub supports WASM,** and streams files generically, with no special case for USD.
- **The MCP Apps specification decides how Apps load,** at the version we pin, `2026-01-26`.
- **Content has its own domain,** on Bioma `veoveo-bioma.space`. `*.apps.{host}` stays.
- **The USD viewer runs on the content domain,** like every other viewer.
- **`file-viewer`, the full package,** with its DWG and DWF engine, for everything but USD and HTML.
- **Artifact files and share links preview.** Download-only is not acceptable.
- **The RTX 4090 renders, from the start.** No software rendering and no time-slicing or quotas now.
- **Any factory can use the GPU,** off by default and never forced, with a simple opt-in.
- **Nothing goes upstream by default.** Our forks and copies keep up with their upstreams and carry our changes. Contributing a
  patch is a specific decision the owner makes.
- **Straightforward.** A new component, format or special case needs a reason.

### What the platform already gives us

| Need | What we use |
|---|---|
| Build, deploy and serve the server | The factory: a push to Lore, BuildKit, a sandbox and its registration; Console's `watch`, `status`, `logs` and `select` |
| Tools, resources, permissions and a small App | The MCP template and the SDK's `Routes` and `AppBuilder` |
| The person in a server, including in a Task | The SDK's `.calls_hub()` and `hub_bearer`, as Console calls the Hub today |
| A person's access to a repository | Lore's grants, and the Hub's `person::issue` for their Lore token |
| Create and share scene repositories | Console's `create_repository` and `share_repository` |
| Find a file without a checkout | Lore's `RevisionTree` |
| File bytes | Lore's HTTP content route |
| An agent changes a scene | The Lore command line in the person's Computer, then a push |
| Long renders | Core's Tasks, through the SDK |
| Render results | Artifact's `ArtifactClient`, bound to the Task, as Media stores outputs |
| Find renders by meaning | Artifact's knowledge search, which already indexes images through Embedding |
| Tell agents how to use it | The server's own skills |
| The GPU | The NVIDIA toolkit, and OpenShell's admission of its devices |

### Origins

| Origin | What runs there | What it holds |
|---|---|---|
| `veoveo.bioma.ai` | The Hub, and its `/view/` page | The Hub's session |
| `sandbox.apps.veoveo.bioma.ai` | Small Apps, in opaque frames, as today | Nothing |
| `{slug}.apps.veoveo.bioma.ai` | A server's own full web application, as the Hub already allows | That server's session |
| `{token}.veoveo-bioma.space` | Untrusted content and every viewer | Nothing: no cookies |

The content domain is the installation's setting, on another registrable domain from the Hub's, so a browser never sends the
Hub's or an App's cookies there. Measured on stand-in names, a hostile file's requests to the Hub and to an App arrived without
their cookies, and everything rich still ran.

### Previews

A person opens `/view/{owner}/{item}/{path}` on the Hub, where the owner is `lore` or a server, and the item a repository's
branch or, say, an artifact. The Hub mints a token for that person and item and frames the content domain:

```text
{token}.veoveo-bioma.space/{path}                 the item's file, with its real Content-Type and nosniff
{token}.veoveo-bioma.space/_veoveo/view/{path}    the viewer for that file
{token}.veoveo-bioma.space/_veoveo/viewer/...     file-viewer's files, from its image
{token}.veoveo-bioma.space/_veoveo/viewers/{slug}/...   a server's viewer's files
```

- **The token is the credential.** A request reaches the Hub through the tunnel; the Hub maps the token to its person and item,
  checks that person's access on every request, and answers through its Lore contribution or the server that owns the item. A new
  kind of content needs no Hub change.
- **It behaves like a signed link.** Anyone holding the URL can open that one item until it expires, so it is short-lived,
  renewed while the Hub's page is open, and stays the same for a browser and item while valid, so that the browser's cache holds. It
  lives one hour, renewed up to 24 hours. An expired token in a new tab sends the person to `/view/`, which signs them in if needed
  and mints a new one, so a stale tab recovers on reload.
- **One frame rule.** Inside the platform every file loads in a frame with
  `sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"` and `allow="webgpu; autoplay"`, so a file
  cannot navigate the Hub's page away. In a new tab it opens as itself, and the browser shows it with its own viewer.
- **Not an App.** The MCP Apps specification governs Views, not these. An App opens a file through `/view/` with `ui/open-link`,
  which the Hub admits as it admits `/computer/apps/`.

The Hub chooses the viewer by the file's type:

| Type | Viewer |
|---|---|
| A type a server declares a viewer for, such as USD | That server's viewer |
| HTML | Runs as itself |
| Everything else | `file-viewer` |

A server declares a viewer in its registration, with the extensions it takes and a public route for its files. So the Hub names
no server, and another viewer needs no Hub change.

### Preview capabilities

Measured in the owner's Chrome, in the frame above, with real files:

| File | What it does |
|---|---|
| HTML | Runs with its scripts and sibling files, WASM, WebGL2, WebGPU and storage |
| Word `.docx` | Renders with tables, search and zoom |
| Excel `.xlsx` | Renders as a grid with sheet tabs and search |
| PowerPoint `.pptx` | Renders, with a slideshow button |
| PDF | Renders with page thumbnails, search, zoom, print and download |
| 3D `.glb`, CAD `.step` | Render in 3D with fit, rotate, wireframe, grid and axes |
| Photoshop `.psd` | Renders with its layers and their visibility |
| Video `.mp4` | Plays with controls |
| Markdown | Renders with tables and highlighted code |
| Images | Display |

Some controls were seen in screenshots and not exercised. `file-viewer` 3.3.3 (Apache-2.0, with an AGPL DWG and DWF engine) also lists,
untested by us: legacy Office, OpenDocument, Numbers and Keynote, CSV, DWG, DXF and DWF, IFC, IGES, STL, OBJ, PLY and 3DM, EPUB,
email, archives, code, notebooks, SQLite and Parquet, GeoJSON, KML and Shapefile, EDA files and other Adobe formats. DICOM is its
explicit opt-in. In all, 275 extensions.

The USD viewer, not yet built, from what `usd_bevy` offers: composition, variants, payloads, animation and skeletons, cameras,
instancing, UDIM textures and lights. MaterialX is mapped to PBR.

Limits:

- **`file-viewer` views and does not edit,** and fidelity varies with fonts and vendor features.
- **`file-viewer` downloads a video whole** before playing it, so a long one waits. Opened as itself, it seeks with ranges.
- **IFC, LAS, COPC, 3D Tiles and the XML profile are not in the prebuilt `web-full`,** despite its format list: they are opt-in entries.
- **A file reaches nothing else:** no tools, no session and no other item. Anything that needs those is an App.
- **The USD viewer needs WebGPU,** because large point instancers use a compute pass, and it loads each file whole into browser
  memory before parsing, within WASM's limits.
- **Viewer code downloads once per origin.** A repository's files share one origin; each artifact has its own.
- **A new domain may be blocked** by some corporate filters until it is categorized.
- **Measured in Chrome only.**

`file-viewer` is used as published: an image holds `@file-viewer/web-full` with the assets that `file-viewer-copy-assets` and its
`assets-*` packs provide, 226 MB. The Hub mounts that image read-only, as factory sandboxes mount Lore's. Its DWG, DWF and DWFx engine
is AGPL-3.0-only and its LibreDWG bindings GPL-3.0-only. We serve them unmodified and keep their notices and the source link
each release carries.

### Files from Lore

A file in a Lore repository is a URL, for any server and any preview. Nothing is checked out, synced or stored on the way, so a push
is live on the next request. The handler sits beside the Hub's `/lore/{profile}/repositories/{id}/...` routes, in the same Lore
contribution:

```text
GET /lore/{profile}/repositories/{id}/files/{branch}/{path}

Hub   the caller, from their bearer, or the person a token names
      person::issue: their Lore token for that repository, which checks their grant
      RevisionTree: that path on that branch's tip is this address
      GET lore:41339/v1/repository/{id}/content/{address}, streamed back
```

A server reaches it for its caller or its Task with `.calls_hub()` and `hub_bearer`. A preview reaches the same handler on the content
domain, so bytes go from Lore through the Hub to the browser, one pass.

- **Caching.** The address is the `ETag`, so an unchanged file answers 304 and a changed one is new.
- **Seeking.** Lore's content route ignores `Range` today, though the read beneath it takes a range. Our Lore fork adds it beside TLS, so
  video in a repository can seek.
- **Folders.** The same handler on a folder lists it from `RevisionTree`, so viewers can browse. `GET /lore/{profile}/repositories` lists
  the repositories the person may read, from the grants the Hub already answers Lore's own listing with.
- **Paths.** The Hub takes the path as Lore names it: percent-decoded, one segment at a time. `..` never matches a tree entry. Tests cover
  spaces, unicode, `#`, `?`, `%`, `[ ]` and `..`. USD's own paths, such as `<UDIM>` tiles and files inside a USDZ, are resolved by `usd_bevy`
  to real files or stay inside the downloaded archive. The USD viewer encodes each segment through Bevy's `request_mapper`.

`ARCHITECTURE.md`'s rule that bulk bytes never pass through the Hub gains this exception. Downloads still go straight to storage.

### The USD server

One repository and one binary, made from the template and served by the factory. It opts in to the GPU, and it needs no app origin:

```text
veoveo-mcp-usd/
  crates/veoveo-mcp-usd/  tools, skills, the small App, its viewer declaration, render subcommand (from gif_frames)
  crates/usd-viewer/      the WASM viewer, from examples/web, with egui panels
  crates/usd_bevy/        copied
  crates/usd_macro/       copied
  assets/                 upstream's 0.1 MB test fixtures, which usd_bevy's tests read
  UPSTREAM.md             source commit and what we changed
  openshell/              the factory layout, and the GPU opt-in
```

- **The viewer** declares `usd`, `usda`, `usdc` and `usdz`, and serves its built files from a public route, since they hold nothing private.
  It reads scenes from its own origin by relative path, and browses the item's folders.
- **A small App,** `ui://usd/scenes`, in an ordinary frame, lists scenes through the bridge and opens each with `ui/open-link`.
- **`usd__inspect_stage`** reads with `openusd` in the server, through the Hub's handler, as the person who called.
- **`usd__render_stage`** is a Task taking repository, branch, path, time, camera and variants. It runs the binary's render subcommand as a
  child process on the GPU and stores a PNG in Artifact, with metadata naming the repository, revision and path. Because Artifact indexes
  images, renders can be found by meaning with `artifact__search_knowledge`, and this server needs no knowledge contract of its own.

**The copy.** From `openusd-rs/bevy_openusd`, `develop` at `5b3ebbc7`, which already uses upstream `openusd`, about 3 MB of its 558 MB:

| From | To |
|---|---|
| `crates/usd_bevy/`, 2.66 MB | `crates/usd_bevy/` |
| `crates/usd_macro/` | `crates/usd_macro/` |
| The top-level files of `assets/`, 0.1 MB | `assets/`, where the crate's tests read them |
| `examples/gif_frames.rs` | The start of the render subcommand |
| `examples/web/` | The start of `crates/usd-viewer/` |
| `LICENSE` | Kept beside the copied crates |

Left out: `assets/external`, `media`, `usdview` and `mara`, `benchmarks`, `scripts` and `vendor/bevy_asset`, the last unless the tests show we
need it: its patch keeps reloads in order, and nothing here reloads a source while it loads. A test that needs a left-out asset goes, and
`UPSTREAM.md` lists it. The first commit is the copy unchanged, so later commits show what we changed.

**The update.** The copy moves to Bevy 0.20.1 starting from upstream's draft PR #4, `dave-gray101/bevy_openusd` `feat-bevy-0.20` at `5cbdee3f`. We
take its 39 files under `crates/` (+893 -524, including WGSL to WESL) and leave its `usdview` changes, which are what wait on `mara`. It targets
Bevy 0.20.0 on `main`, so it needs reconciling with `develop`'s three commits and a bump to 0.20.1. `bevy_egui` 0.43 already targets Bevy 0.20. The
viewer builds for WebGPU. Done when the copied tests pass in `docker build --target check .` on the Mac and on Linux.

**GPU in a factory.** The factory template's driver configuration names the `nvidia` runtime class, which exposes no GPU by itself. A repository that
wants the GPU asks in its own `openshell/image/Dockerfile`, and installs the driver's libraries there:

```dockerfile
ENV NVIDIA_VISIBLE_DEVICES=all
ENV NVIDIA_DRIVER_CAPABILITIES=all
```

That needs no Hub change and no Kubernetes GPU claim, so it shares the 4090 with Embedding, which keeps its own. OpenShell adds the device nodes itself only
for a sandbox with a GPU claim, so the factory's base policy names them, and they exist only when an image asks. A render on the 4090 in a real factory
sandbox is [measured](records/2026-11-05-usd-server-and-viewer.md).

### Scenes

One ordinary Lore repository, `usd-demo`, about 146 MB, not linked to anything. Lore's grants decide who sees it, and a push is live on the next request.
Another repository of scenes needs nothing else.

```text
usd-demo/
  kitchen_set/kitchen_set.usdz      5.1 MB
  med_city/med_city.usdz            1.7 MB
  human_female/human_female.usdz   45.8 MB
  hummingbird/hummingbird.usdz     20.8 MB
  chameleon/chameleon.usdz         15.6 MB
  cow/cow.usdz                      6.6 MB
  tractor/
    tractor.usd                     references ./tractor.usdc
    tractor.usdc                    7.8 MB
  ur10_pick/
    ur10_pick.usda                  references ur10.usdc
    ur10.usdc                       3.3 MB
  franka/                          38.9 MB
    franka.usd
    DetailedProps/  Materials/  Props/  configuration/
    franka-LICENSE.txt
```

A scene is a top-level folder whose root is `{folder}/{folder}.usd*`, so there is no manifest. Files are copied once from upstream and pushed with Lore, with
no tooling. The rest of upstream's `cows` folder (about 550 MB), `.thumbs` folders and the other robots (35 MB) stay out for now. Franka's folder moves up one
level as a whole; its references are binary and are confirmed when it first loads.

### Artifact

`create_download` always answers `attachment`, and for a reason that stays true: its signed URLs are on the Hub's own host
(`https://veoveo.bioma.ai/artifacts/...`), so a file served inline there would run on the Hub's origin with the person's session. Those URLs stay for downloads
and agents.

Previews are new. Artifact's server owns its items on the content domain, checks the person's read level as `create_download` does, and streams the object from
storage with its media type, passing ranges through so video can seek. There is no signed URL to expire mid-video. A visit records the same audit as a download,
once and not per range. The library App, Artifact's pending item M8, lists artifacts and opens each one through `/view/`, and a media run's outputs open the same way.

**Share links.** A browser opening a live share link goes to a preview, top-level on the content domain with the right viewer, since its recipient has no Hub page.
Its token names the link rather than a person, and every request checks the link again, so revoking it, or its expiry, ends the preview at once. A visit counts as
one redemption, and the rules for which artifacts may be shared do not change. Any other caller still gets the signed GET it gets today, so downloads and scripts keep
working. The viewer offers a download.

### Changes to what exists

| Where | Change |
|---|---|
| Hub | `'wasm-unsafe-eval'` for an App that declares `ui.csp`. The specification fixes the policy only when `ui.csp` is omitted, and forbids undeclared domains, which this is not. Upstream's issue #605 and PR #667 are open, so we follow them if a field is added |
| Hub | The files handler and repository listing |
| Hub | The content domain: its setting, tokens, the viewers' routes and the `/view/` page, admitted by `ui/open-link` |
| SDK | A server's viewer declaration, and owning items on the content domain |
| Lore fork | TLS and ranges on the HTTP listener, with the certificate its gRPC listener has |
| Artifact | Its preview route, share links and library App |
| Installation | Port 41339 on Lore's Service, NetworkPolicy and the Hub's sandbox policy, for the Hub alone. The Hub's content-domain setting. The `file-viewer` image. The `nvidia` runtime class in the factory template |
| Cloudflare | Done for `veoveo-bioma.space`: its zone and certificate, a proxied wildcard CNAME and tunnel route to the Hub's `apps` service, a cache rule bypassing the edge cache, since a cached file would skip the check on every request, and content rewriting off ([record](records/2026-11-04-usd-cloudflare-setup.md)). The Hub also answers `Cache-Control: private, no-transform` |
| Docs | The owning designs, and `ARCHITECTURE.md`'s rule on bulk bytes |

What existing behavior changes: a browser opening a share link previews instead of downloading at once; previews stream through the Hub; a repository that opts in shares the
GPU with Embedding. Apps, n8n, downloads, Lore's command line and `*.apps.{host}` do not change.

### Security

Nothing here adds a way around an existing control:

- **Lore's rules decide every read.** Each read uses the person's own Lore token, which the Hub issues against their current grant, and Lore refuses a token that cannot reach
  the repository, on `RevisionTree` and on the content route alike. The first thing tested is a real token for one repository being refused on another.
- **Untrusted content runs only on the content domain,** another site with no session. That isolation is the protection, so nothing is stripped from a file. A hostile file
  reaches only its own item, read-only.
- **The App rule stays.** A view reads only its own server, and browser code holds no token. Apps keep their frames.
- **TLS to Lore,** so a person's token never crosses the cluster in the clear.
- **The GPU opt-in skips Kubernetes' GPU allocation.** That is scheduling, not access to anyone's data.

### Order

1. The copy and the update, with the copied tests passing.
2. On the box, render `kitchen_set` on the 4090 in Docker. Build the WASM for WebGPU, measure it and load the scene in the owner's Chrome.
3. Lore's TLS and ranges. The Hub's files handler and WASM keyword, with tests of paths and of a token refused on another repository. Deployed to Bioma
   ([record](records/2026-11-05-usd-lore-tls-and-files-deployed.md)); a real Lore token sent directly on `RevisionTree` is not yet measured.
4. The content domain: tokens, `/view/`, the `file-viewer` image and viewer declarations, including a real DWG. Deployed to Bioma
   ([record](records/2026-11-05-usd-content-domain-deployed.md)); run in Chrome's Default profile only, and an App's cookie at a real app origin is not measured.
5. The `nvidia` runtime class, `usd-demo`, the USD server, its viewer, tools and small App. Deployed to Bioma
   ([record](records/2026-11-05-usd-server-and-viewer.md)), with the first render on the 4090 from a real factory sandbox; run in Chrome's Default profile only.
6. The USD viewer's panels: scene list, prims, variants, payloads, time and cameras. Deployed, with a new time on the hummingbird down from about 9 s to about 115 ms
   ([record](records/2026-11-05-usd-server-and-viewer.md)), and a live variant switch now matches a fresh stage and reads what it names ([record](records/2026-11-05-usd-viewer-variants.md)); `Camo`'s camouflage, skinned scrubbing past 10 frames a second, and 1.7 GB of WASM memory remain.
7. Artifact: its preview route, share links, then its library App. Deployed to Bioma
   ([record](records/2026-11-05-usd-artifact-previews-deployed.md)); run in Chrome's Default profile only, a link's expiry is a component test, and the gateway's log holding a
   share link's path is the owner's to decide.
8. Qualification, with OpenCode last, then the record and checklist rows.

## Later

- Chunking for a knowledge source with long text (section 17): a vector per chunk in a table
  beside the records, with the monorepo's `structure-v1` chunker in the SDK.
- One fused knowledge search across servers (section 17): registration lets a server declare
  use of an extension instead of each provider's permissions, and the Hub's exchange grants a
  call to any server's `search_knowledge` whose permission the caller holds. Until a client
  that is not an agent needs one fused answer, clients fan out themselves.
- n8n's Assistant asks "Opening skill: keep-items" without naming the skill's server, where
  OpenCode names both (`hub:template/keep-items`); show the origin in the fork's confirmation
  ([record](records/2026-11-03-skills-acceptance.md)).
- rmcp's streamable HTTP request handler takes about 670 KB of stack per inbound request in a
  debug build, the largest single frame; boxing its inner future in the fork gives every
  request path headroom. Hub `349fffa` moved discovery-watch opening off the request's stack,
  which had overflowed the 2 MiB worker stack in the Linux test build.
- Logout revokes a session family but does not delete it, so a running Task keeps acting
  until it ends or the family expires (7 days); decide whether logout should stop Tasks.
- Keycloak in the cluster, an installation's own identity provider instead of Entra
  (template `9c8959a`,
  [guide](https://github.com/VeoveoAI/veoveo-template-installation/blob/main/identity/README.md#keycloak-in-the-cluster)):
  inputs exist and the installer's tests check them, not yet installed. The first
  installation with it (planned on AWS) proves the realm import, sign-in A1–A3, the gateway's
  acceptance of Hub's native-control token, the operator's command-line sign-in, a Computer
  and a factory push, and is also the first fresh install from the template (checklist F6).
  The diagram's identity node gains Keycloak once that passes.

- Faster removal: a removal reaches a Computer within 240 s, the reuse of a repository's token
  (checklist B5), accepted for now; shorten the reuse or Lore's token lifetime.
- Lore's client reports the server's `PERMISSION_DENIED` as "Repository not found".
- Lore refusals reach the client as an HTTP/2 stream reset: a reader's push reports "Failed
  to store fragments" ([record](records/2026-10-31-lore-explicit-actions.md)), and a refused
  link "Repository not found". Trace where the reset starts and report a denial as one.
- A Lore clone through a link its person may not read fails as a whole, leaves a partial
  tree that `lore status` and `lore sync` report as in sync, and reports an HTTP/2 stream
  reset; Lore's design says the link stays unopened and the clone goes on
  ([record](records/2026-10-31-lore-link-access.md)).
- The box's port-forward to the gateway (`pf.sh`) ends with every gateway pod change, and the
  box scripts that use the `openshell` CLI fail until it is restarted.
- Factory `uses`: the service instances an instance calls, pushed in the caller's
  branch and resolved per instance through OpenShell's named-service routing.
- Factory GPU placement, mounts and repository-owned sandbox sizes.
- Provider callbacks that name the instance, so Hub routes each callback to the branch
  instance that owns the operation.
- Core `4ebcf89` fixes a parked Task left waiting on a settled operation. Media (core
  `d473011`) and every server on an SDK before `7459481` take it with their next core or
  SDK bump.
- The factory base policy's open internet, every binary to any host on ports 80 and 443,
  narrowed to the branch's toolchain.
- The Hub and the OpenShell crates move off `serde_yaml` 0.9, whose `unsafe-libyaml` RustSec
  lists as unmaintained (RUSTSEC-2024-0449). The Hub reads `providers.yaml` with it, and
  `openshell-crypto` brings it through `kube` 0.99; Hub `02e6810` holds a reviewed
  exception until then.
- OpenShell answers a strict-binding refusal over HTTP/2 with a stream reset, without its
  403 or denial event.
- The n8n fork's image is built with n8n's development release channel: its pages read
  "n8n[DEV]".
- The Veoveo Result node shows n8n's missing-icon mark on the canvas
  ([record](records/2026-11-01-n8n-in-the-computer.md)).
- Node's `fetch` of a scoped npm path (`%2F`) over HTTP/2 fails in a Computer, where npm
  itself works over HTTP/1.1 ([record](records/2026-11-01-n8n-assistant.md)).
- `n8n.apps.{host}` asks for sign-in before answering "No app here", because a registration of
  the slug still declares an app origin; and every other name under `*.apps` answers with the
  sandbox proxy's page. Serve the proxy on `sandbox.apps` alone and trace the registration.
- Lock down the n8n node and credential types the parent admits: today it admits all but the
  always-excluded nodes, as the owner chose while proving it works
  ([record](records/2026-11-01-n8n-open-admission.md)).
- Lock down `n8n.workflows.run`: it declares no risk while the platform is in early access,
  so any role that grants it runs the workflows of every team its holder reaches
  ([record](records/2026-11-01-n8n-run-for-members.md)).
- n8n's `mcp-registry` module makes MCP client node types that `NODES_EXCLUDE` cannot name,
  on the 2025 client; decide them with the lock-down
  ([record](records/2026-11-01-n8n-assistant-hub-tools.md)).
- The Veoveo Tool's list shows no `n8n__…` tools, and the editor once showed "Offline"
  after a restart; not investigated ([record](records/2026-11-01-n8n-assistant-hub-tools.md)).
- n8n's loopback listener answers any process in its sandbox; isolate it from n8n's own
  nodes.
- `veoveo-hub-sdk-cli` polls a Task again after a transport error, such as an instance
  restarting.
- A runner or instance replaced without a gap: create the new sandbox under a per-generation
  name, move the Hub's routing to it, then delete the old one. OpenShell has no update or
  rename, and the Hub names a sandbox by its deployment, so a replacement serves nothing
  between delete and create ([record](records/2026-10-31-n8n-runners-phase-1.md)).
- Sleep and wake of factory instances through native stop and start, never with
  unfinished Tasks except those parked on provider webhooks.
- Hard per-person caps (`caps.enforce`).
- Console tools to clean up instances.
- Lore's QUIC storage transport, only for a measured benefit over gRPC with the same
  credential custody.
- A shared record of browser activity on the Computer row before several Hub replicas
  serve browsers, so collection sees every replica's requests.
- Dial-in, so a server without inbound networking joins a Hub.
- Embedding's multimodal deployed acceptance: real media and options at the service
  bounds, a real Artifact ACL refusal, a composed call, restart recovery.
- Remove the installation template's historical Linux Compose launch paths, keeping
  the Mac fixtures.
- `veoveo-installer build`: build a component at its locked revision and record its
  digest in the lock, replacing the box's build scripts.
- A first installation through apply's one path. Today `workspace-storage` needs the
  workspace namespaces, which exist only once providers exist, after the later
  `profiles` step, and images must be built and in the lock before `postgres`; the
  installer's README gives the order. Qualified with checklist F6 at the next fresh
  install.
- The seed Jobs other than Hub's claim through the installer; today they are run by
  hand, and `plan` does not compare them.
- OpenShell's supervisor waiting out its full grace period on delete: in 2 of 14 timed
  deletions the supervisor pod stayed until its 30 s `terminationGracePeriodSeconds`
  ("sandbox did not acknowledge terminal state: boundary unavailable") after its agent
  had exited, so the workspace took 42 s instead of 5.5 s. A shutdown race, to fix in
  OpenShell.
- Build caches in the other repositories' checks, as in Hub's.
- D11's node reboot (the box serving again by itself after a power cycle), which needs
  the box's sudo.
- Unexplained during the G1 re-run, with no effect on the result
  ([record](records/2026-10-26-g1-rerun.md)):
  - one `console__logs` call failed with "the log store could not be reached", and its
    retry 5 s later succeeded;
  - OpenShell's supervisor in Hub's sandbox warns "sandbox network notification denied
    (… os error 2)" at each factory action;
  - each restart of an instance logs "workload frozen pending authenticated recovery" and
    "SIGTERM before supervisor confirmation".

## Open

- Checklist B22: a day of supervisor logs from sandboxes on OpenShell `0e795fc`, with no
  `FAIL_CLOSED` and no connection closed as stale (section 5).
- Section 8: the upstream discovery failures after a membership change.
- Section 11, decisions for the coordinator:
  - Per-action human approval, which would change the architecture's principle of no
    approval layer beside Lore's grants and OpenShell's sandbox model.
  - OpenShell's policy advisor, an operator's approval of network rules an agent
    proposes.
  - A model evaluation or red-teaming server, as a new server repository.
  - A restricted-egress profile in the installation template, for a company's
    installation.
- Section 13: the Cloudflare Advanced Certificate Manager subscription and the wildcard
  name for Bioma's installation, which only the account's owner can add; and whether a
  factory image may start from an image in the installation's registry, which the n8n
  build needs.
