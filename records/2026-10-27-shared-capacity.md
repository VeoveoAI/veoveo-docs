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

- **Hub's followers had stopped.** The followers of the owner's three watched repositories (`time`, `g1-server`, `g1-rerun`) applied no push. Hub logged nothing and recorded no failure. `console__watch` on each repository resubscribed it, and the pending pushes were then applied within seconds. The watches dated from 04:24, before Hub's and Lore's restarts at about 05:00.
- **An instance that cannot be placed waits silently.** When OpenShell removes such an instance's sandbox, Hub keeps the revision as applied with no sandbox and no failure. The instance stays like that until the branch's next push.
- **The failure page offers the same version.** When a Computer's first start fails, the page offers "Start the previous version" naming the version that failed.

## Boundaries

- One node. With nothing set aside, the node can be overcommitted: under memory pressure, Kubernetes evicts the sandboxes that use the most above their request (zero), before the platform's own pods, which keep their small requests.
- The `hello-jonathan` instance has no sandbox until its next push. Its repository's follower, watched at 16:41, was not checked.
- Serving of the recreated instances was recorded separately. Their sandboxes compile on start.
