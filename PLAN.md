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
- [ ] Write `ARCHITECTURE.md`: what no repository owns, and the map of which
      `DESIGN.md` owns each topic.
- [ ] Move each current decision from the records to its owner's `DESIGN.md`;
      contradictions go to the user.
- [ ] Point the workspace and every Veoveo repository's `AGENTS.md` at its design.
- [ ] Fix every link to a moved document; links across repositories are GitHub URLs.

Done when every current decision has exactly one owning `DESIGN.md`, every repository
points to its design, and all links resolve.

## 2. Platform tools at run time

The Lore and SDK CLIs reach the workloads that use them from their own images, as
read-only image volumes, instead of being copied into other images. Upgrading Lore
builds one image and changes one value. The design is in the installation's
`DESIGN.md`.

- [ ] OpenShell: an `image` volume kind for the Kubernetes driver; factory instances
      from an installation template with a per-instance image.
- [ ] Installation: the mounts in the Computer, factory and Hub templates; policy
      rules name the mounted path; the lock names each image once and fills the files
      that use it.
- [ ] Hub: no Lore image setting or build context; the start command uses the mount.
- [ ] Time, console and the MCP template: images carry only their toolchain.
- [ ] Build, deploy and update Bioma's installation; a new Computer version.
- [ ] Probes: the mounted CLIs in a Computer, Hub reading `openshell/`, an instance
      cloning, and an upgrade drill in which only Lore is built.

## 3. Then

1. Core cuts charge periods to whole microseconds, which PostgreSQL stores; Embedding
   updates its core pin and redeploys. About 1 in 2,000 Embedding requests is refused
   until then.
2. The installation template's remaining corrections; Bioma's installation follows.
3. Hub's extra `/mcp/local` rule for `artifact__create_download`: its origin, then
   one answer in the installation's design for the template and the box.
4. Restart `embedding-runtime` and `media-provider` onto the current OpenShell runtime.
5. The Time factory flow (checklist C1, D1–D11 and B7), as a person, with no model.
6. G1: the final MiMo acceptance.
7. Housekeeping: revoke the coordinator's admin grant; rotate the box's sudo password;
   investigate slow workspace deletion (148–230 s).

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

- **A sleeping Computer's open tab.** When a Computer is collected, its open OpenCode
  tab shows OpenCode's own "Server request failed" 503 page; its Reload starts the
  Computer again. Whether Hub should say more is undecided.
