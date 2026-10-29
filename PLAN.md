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
