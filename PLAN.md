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
- [ ] Bioma's `DESIGN.md` reads as the template's would, after part 2 changes it.
- [ ] The visual guide shows the current design (it still shows CloudNativePG and
      environment overrides), checked in a browser.

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
- [ ] Bioma's installation updated as template output, and the record.

## 3. Then

1. Done: core cuts charge periods to whole microseconds; the SDK, Artifact and
   Embedding took the new core, and Embedding is redeployed
   ([record](records/2026-10-25-charge-periods.md)).
2. Done: the installation template's corrections (identity example, names, pins, role
   claims, tunnel keys, lock, Linux and Mac paths, Embedding and Media wiring; the stale
   `computer/LORE_HUB.md` and the `factory_branch` hook that guarded nothing removed)
   and Time's README ([record](records/2026-10-25-batch3-and-g1.md)). Bioma's installation follows.
3. Done: Hub's `source_artifact` rules (`artifact__create_download` on `/mcp/computer`, and
   `/mcp/local` on the box) are dead: they served environment source activation,
   which Hub removed in `0ee1dd0`. They went with part 2's policy.
4. Done: `embedding-runtime` and `media-provider` run the current OpenShell runtime
   ([record](records/2026-10-25-charge-periods.md#runtime-restarts)).
5. Done: the Time factory flow, C1, D1–D11 and B7, as a person, with no model
   ([record](records/2026-10-25-platform-tools-and-time-flow.md), [record](records/2026-10-25-batch3-and-g1.md)); left: the node
   reboot of D11, which needs the box's sudo password.
6. Done: G1, the final MiMo acceptance ([record](records/2026-10-25-batch3-and-g1.md)).
7. The installation template's Python tools (`identity/configure-hub`,
   `identity/configure-openshell`, `identity/provision`) break the no-Python principle;
   they move into Rust installation tooling and are deleted, in Bioma's installation
   too.
8. Approved 2026-10-25:
   - Done: the person's Hub CLI works inside their Computer, as them.
   - Done: planned replacements log below ERROR in Hub (Computer proxy; rmcp fork).
   - Hub's check caches compiled crates (256 s cold, 168 s after a one-line change);
     the other repositories next.
   - `veoveo-installer` (`apply`): the design is on the installation template's
     `installer` branch for review; it absorbs item 7, and publishes changes to Hub's
     live control plane instead of resetting it.
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

## Open

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
- **A Lore-only upgrade keeps the old release note**, so the status page shows a stale
  'What's new'; republishing a template should take a note.

- **BuildKit cache mounts cross repositories.** Every repository's
  `openshell/image/Dockerfile` builds on one BuildKit daemon, whose cache mounts
  (`RUN --mount=type=cache,id=…`) are directories shared by name across all builds. A
  repository can leave content there that another repository's build reads, against
  the installation's rule that factory builds share no writable cache. No repository
  uses one today. The options for closing it are to be investigated and brought to the
  user; Hub reads nothing in a repository except `openshell/policy.yaml`.
- **The Hub CLI in a Computer cannot reach Hub.** The Computer policy admits Hub's MCP
  endpoint for `/usr/local/bin/opencode` only, so `veoveo-hub-sdk-cli`, which every
  Computer carries, cannot call Hub from inside one. Whether a person's own CLI should
  act as them from their Computer is undecided.

- **Hub logs ERROR when a server is replaced.** Recreating Embedding produced 8
  `worker quit with fatal: Transport channel closed` ERROR lines in two seconds as the
  old pod went away. A planned replacement is not an error; the level, and whether
  Hub should say which registration ended, are undecided.

- **A sleeping Computer's open tab.** When a Computer is collected, its open OpenCode
  tab shows OpenCode's own "Server request failed" 503 page; its Reload starts the
  Computer again. Whether Hub should say more is undecided.
