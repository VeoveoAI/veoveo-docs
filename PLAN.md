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
      ([record](records/2026-10-29-refresh-revisions-are-opaque.md)); other sandboxes take
      it at their next start. The day of logs is pending (checklist B22).
- [x] Qualification with MiMo-V2.6-Pro: an agent in a Computer uses `grep` and `glob`,
      adds a crate, runs `cargo check`, pushes, and the change is served. The first run
      found the toolchain a Computer lacked. Template `430b7ab` adds clang, cmake,
      pkg-config, clippy and rustfmt. The second run needed no workaround (checklist B20,
      G3, [record](records/2026-10-29-daily-use-qualification.md)).

Done when each is deployed and proven, with records, and the checklist says so. Open:
B22's day of logs.

## 6. Manual Task continuity verification

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

Approved 2026-10-29 and active. Extend the completed Task-decision slice into
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
      Registration coverage is partial. Serial-history composition, abort-event
      exclusion and reachable positive/fault executions remain next, followed by
      broader operation composition; these ingredients do not yet prove serialization.
- [ ] Connect fresh and retained routing, registration identity, current authority,
      SDK recipient checks and discovery/listener freshness; include replica adoption.
- [ ] Factory and Computer recovery, interrupted operations and reference-preserving
      cleanup, with explicit progress assumptions and native/browser evidence.
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
- [ ] `billed` granted to a group, used by a member: component test only, since no route
      grants a role but publishing the whole control plane.
- [ ] Hub's upstream discovery failed for about three minutes after a membership change,
      and in a burst at 22:37 without one: find why new forwards fail (Hub logs no
      error source) ([record](records/2026-10-29-groups-everywhere.md)).

Done when deployed and proven, with a record and the checklist. Open: the two above.

## Later

- Faster removal: a removal reaches a Computer within 240 s, the reuse of a repository's token
  (checklist B5), accepted for now; shorten the reuse or Lore's token lifetime.
- Lore's client reports the server's `PERMISSION_DENIED` as "Repository not found".
- The box's port-forward to the gateway (`pf.sh`) ends with every gateway pod change, and the
  box scripts that use the `openshell` CLI fail until it is restarted.
- Factory `uses`: the service instances an instance calls, pushed in the caller's
  branch and resolved per instance through OpenShell's named-service routing.
- Factory GPU placement, mounts and repository-owned sandbox sizes.
- Provider callbacks that name the instance, so Hub routes each callback to the branch
  instance that owns the operation.
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
- Authentication on the local registry. Network policies keep factory build steps away
  from it; any other workload the cluster admits to it can push.
- Build caches in the other repositories' checks, as in Hub's.
- Offer the rmcp fork's fix (`faa4e9d`) upstream; Hub pins it by commit.
- D11's node reboot (the box serving again by itself after a power cycle), which needs
  the box's sudo.
- A role removed in Entra reaches a Hub session only at its next sign-in. A refresh keeps
  the sign-in's roles for the session's seven days, because Hub holds no Entra refresh
  token. Logout and revocation end the session at once
  ([record](records/2026-10-26-second-person.md)).
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
- Section 8: `billed` through a group live; the upstream discovery failures after a
  membership change.
