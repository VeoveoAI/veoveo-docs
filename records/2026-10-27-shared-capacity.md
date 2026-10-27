# Sandboxes share the node

2026-10-27 (UTC). Coordinator: Opus. No model calls.

## Why

Two early adopters' Computers could not start version `5b397a7e0ab0` (16:26 and 16:33,
then again at 17:54): "the sandbox was not ready after 120 s". A third early adopter's first
push of `hello-jonathan` (16:41) was never served.

Measured at 17:57 on `rozgo-sim-pc` (32 CPUs, 64 GiB):

| | CPU | Memory |
|---|---|---|
| Set aside (pod requests) | 30.5 (95%) | 58.6 GiB (93%) |
| Used (`kubectl top node`) | 0.59 | 34.5 GiB |

Every sandbox the installation declares set its size as OpenShell's portable CPU and
memory, which OpenShell's Kubernetes driver applies as both limit and request. Each
size was set aside for as long as its sandbox existed:
- five idle factory instances held 4 CPUs and 8 GiB each, and used 3 millicores and 19–40 MiB;
- each Computer held 2 CPUs and 4 GiB;
- Embedding held 5 CPUs and 9 GiB.

The next Computer (`cpavrxpmag3c3xtme6a`) stayed `Pending` until Hub's 120 s deadline.
The `hello-jonathan` instance's sandbox could not be placed either. OpenShell removed it at
16:46:59 ("rolled back stale fail-closed sandbox-runtime bootstrap"). Hub recorded neither
a failure nor the removal.

## What changed

| Repository | Commit | Change |
|---|---|---|
| veoveo-template-installation | `efbc953` | The design states that sandboxes share the node and none reserves any of it. The Computer, factory, `embedding-runtime` and `embedding` driver configurations set the agent container's limits to the old size and its requests to zero. `installation.toml` declares no portable CPU or memory. The README, WORKLOADS and EMBEDDING passages that named sizes say so. |
| BiomaAI/veoveo-installation | `5fd79c1` | The same changes, and a `computer-v1` release note |

OpenShell needed no change. Its Kubernetes driver applies the driver configuration's
`containers.agent.resources` after the portable resources. It fills only keys that are not
set yet, so a zero request takes effect only when no portable size exists. Hub's factory
already accepted a template without a portable size.

## Deploy

- `plan templates platform-servers` showed exactly four changes: the two templates (driver configuration, portable size, and the Computer's release note) and the two Embedding sandboxes.
- `apply`: 4 changes. The templates took 0.0 s each; `embedding-runtime` was ready in 7.2 s and `embedding` in 23.1 s.
- The next full `plan`: 18 of 18 steps match.
- New Computer version: `a566f49873f9`.

## Probes

| Probe | Result |
|---|---|
| A sandbox from `computer-v1` (`share-probe`, workspace `installation`) | Ready in 7.4 s; requests `cpu: 0, memory: 0`, limits `cpu: 2, memory: 4Gi`; deleted |
| Embedding after apply | Both Ready; `embedding-runtime` requests `cpu: 0, memory: 0, nvidia.com/gpu: 1` |
| A new factory instance (g1-server branch `dev/rozgo/share`, pushed 18:12:53) | Not created until the repository was watched again (see below); then its sandbox was Ready with requests `0`/`0` and limits `4`/`8Gi`. The branch was archived, and Hub removed the instance. |

## Every existing sandbox recreated

Sandboxes made before the change kept their requests, and those would win any contention.
So each one was recreated:
- **Factory instances.** One commit was pushed to each instance's branch from the owner's Computer: `time` `main` and `dev/rozgo/x`, `g1-server` `main`, `g1-rerun` `main` and `p2-s5`. Each sandbox came back with zero requests.
- **Computers.** The owner's and one early adopter's Computers were restarted from inside each one (`console__computer {restart: true}`) onto `a566f49873f9`, and were ready within 12 s. The other two early adopters' Computers started on the new version themselves.

At 18:28:34:

| | CPU | Memory |
|---|---|---|
| Set aside | 1.5 (4%) | 1.7 GiB (2%) |
| Pending pods | none | |

All four Computers and all six factory sandboxes had zero requests.

## Found on the way

- **Hub's followers had stopped** (fixed below). The followers of the owner's three watched repositories (`time`, `g1-server`, `g1-rerun`) applied no push. Hub logged nothing and recorded no failure. `console__watch` on each repository resubscribed it, and the pending pushes were then applied within seconds. The watches dated from 04:24, before Hub's and Lore's restarts at about 05:00.
- **An instance that cannot be placed waits silently.** When OpenShell removes such an instance's sandbox, Hub keeps the revision as applied with no sandbox and no failure. The instance stays like that until the branch's next push.
- **The failure page offers the same version.** When a Computer's first start fails, the page offers "Start the previous version" naming the version that failed.

## The three defects fixed

Why the watches went silent:
- Hub and Lore both started at 04:24, and the three watches subscribed at 04:24:32. None subscribed again, and no failure was recorded.
- Each subscription is one gRPC stream that is idle between pushes. Cilium forgets a connection idle for 8000 s (2 h 13 min; `CTMapEntriesTimeoutTCP`).
- After that, Lore's event toward Hub's supervisor arrives as a new inbound packet and is dropped, so neither end notices.
- A watch made later (16:41) still received its push. The repositories watched again at 18:2x received theirs within seconds.
- Hub's connection to Lore had no keepalive. OpenShell's SDK, which Hub uses for the gateway, pings every 10 s.

Hub `0ca6bb5` (on `main`; branch `idle-lore` deleted) fixes all three. Its design is changed in the same commit.

| Defect | Change |
|---|---|
| Watches went silent | Every connection to Lore sends HTTP/2 keepalive pings every 30 s, and ends when one goes unanswered for 20 s. A dead subscription then ends, and its follower subscribes again and re-checks every branch. |
| A removed instance sandbox waited silently | An instance with an applied revision and no sandbox reports `failed{stage: create}` saying OpenShell no longer has it and the next push creates it again. Hub doesn't report this while it is applying a push or a removal to that instance. |
| A failed start named only the deadline | A Computer not ready within 120 s names the sandbox's unmet conditions, such as `PodScheduled: Unschedulable: 0/1 nodes are available: 1 Insufficient cpu.` |
| The failure page offered the same version | Start the previous version is offered only when the recorded version differs from the one that failed. |

Checks and deploy:
- Gate `docker build --target check`: 354 passed and 2 skipped, in 152 s. The factory status test now covers the unmet conditions, a removed sandbox, and the next push. The pages test covers a failed first start.
- Image `hub@sha256:c85ce8cc…`, built in 189 s, with a smoke test. Bioma's lock is at `a9876bb`.
- `apply hub`: the sandbox was ready in 21.1 s. The next plan: 18 of 18 steps match.

Deployed probes:

| Probe | Result |
|---|---|
| Watches after Hub's start | All four subscribed at 18:44:13 with no failure, including the early adopter's |
| Keepalive on the wire | Cilium's entries for the four Hub→Lore connections, read 35 s apart, had their last send, last receipt and expiry all advanced by 30 s |
| A removed sandbox | g1-server `main`'s sandbox was deleted with the OpenShell CLI (18:45:42). The status at once read `failed{stage: create}`: "OpenShell no longer has the instance's sandbox: it removes one that never becomes ready. The branch's next push creates it again." The push at 18:45:58 created it, and it served at 18:50:10. |

## Boundaries

- One node. With nothing set aside, the node can be overcommitted: under memory pressure, Kubernetes evicts the sandboxes that use the most above their request (zero), before the platform's own pods, which keep their small requests.
- The `hello-jonathan` instance has no sandbox until its next push. Its status now says so.
- The five recreated instances served again between 18:29:52 and 18:33:20. Their sandboxes compile on start.
- A push after more than 2 h 13 min of idle has not been re-run since the fix. The keepalive is proven on the wire, not by that push.
- A Computer start failure naming unmet conditions is covered by the code and the gate, not by a deployed probe: with nothing reserved, there is no unschedulable start to reproduce.
