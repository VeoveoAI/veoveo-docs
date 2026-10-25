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
   - Hub's check caches compiled crates (256 s cold, 168 s after a one-line change);
     the other repositories next.
   - Done: `veoveo-installer` `plan` and `apply`, on both installations' `main`; the first
     full apply published only Hub's differences, and a second changed nothing
     ([record](records/2026-10-25-installer-first-apply.md)).
9. Housekeeping: done: the coordinator's admin grant is revoked; workspace deletion is
   5.5 s normally, the slow cases are the supervisor race under Open. Left: rotate the
   box's sudo password.

## Later

- Factory `uses`: the service instances an instance calls, pushed in the caller's
  branch and resolved per instance through OpenShell's named-service routing.
- Factory GPU placement, mounts and repository-owned sandbox sizes.
- Provider callbacks that name the instance, so Hub routes each callback to the branch
  instance that owns the operation.
- Sleep and wake of factory instances through native stop and start, never with
  unfinished Tasks except those parked on provider webhooks.
- Hard per-person caps (`caps.enforce`).
- Console tools to share repositories and to clean up instances.
- Per-person repository listing in Lore: Hub answers `UrcAuthApi.LookupUserPermissions`
  and Lore uses `repository_catalog = "auth_service"` through Hub's gRPC service route.
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

## Open

- **A first installation does not yet take apply's one path.** `workspace-storage`
  needs the workspace namespaces, which exist only once providers exist, after the
  later `profiles` step; and images must be built and in the lock before `postgres`.
  The installer's README gives the order (some steps with `--step`, then providers and
  images, then `apply`). The design says first installation and upgrade take the
  same path.
- **Seed Jobs other than Hub's claim are run by hand.** `plan` does not compare them
  and `apply` does not run them; only Hub's claim files are written by the installer.
- **OpenShell's supervisor can wait out its full grace period on delete.** In 2 of 14
  timed deletions the supervisor pod stayed until its 30 s `terminationGracePeriodSeconds`
  ("sandbox did not acknowledge terminal state: boundary unavailable") after its agent had
  already exited, so the workspace took 42 s instead of 5.5 s. A shutdown race in the
  supervisor, to fix in OpenShell.
- **A flaky Hub test.** `database_reconnect::the_hub_keeps_serving_and_its_registrations_after_its_database_sessions_end`
  failed once on Linux with "Address already in use": a free-port race in the test support.

- **A broken push takes its branch down.** The build runs at start inside the branch's
  sandbox, so a push that does not compile, or a server that exits, stops the branch
  until a fixing push; `console__status` shows the exit code and restart count but no
  `failed` stage, and `console__logs` shows the cause. Keeping the previous
  revision serving would need building a new revision beside the running one. Undecided.
- **The log store adds `missing _msg field` lines** for records without a message.
- **The local registry has no authentication.** Network policies keep factory build
  steps away from it; any other workload the cluster admits to it can push.
- **OpenCode answers 500 on `/api/fs/find?query=$f`** while text is typed: OpenCode's
  own bug, for upstream.
- **A Lore-only upgrade keeps the old release note**, so the status page shows a stale
  'What's new'; republishing a template should take a note.


- **A sleeping Computer's open tab.** When a Computer is collected, its open OpenCode
  tab shows OpenCode's own "Server request failed" 503 page; its Reload starts the
  Computer again. Whether Hub should say more is undecided.
