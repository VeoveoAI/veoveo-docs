# OpenShell qualification, revived

The owner kept `veoveo-qualify-openshell`, archived on 2026-10-19 with no recorded reason,
as the gate for every OpenShell revision an installation adopts. Its last results were for
upstream 0.1.3 (2026-10-12); Bioma has run the fork at `5f630f42c` (upstream v0.1.9 with the
fork's changes) since 2026-11-19, accepted on deployed probes alone. The repository was
unarchived on 2026-11-21, ported, and run against that revision on the Mac and the box.

## Sources

| Repository | Commit | Change |
|---|---|---|
| veoveo-qualify-openshell | `4f47cc2` | Rust 1.100.0; PostgreSQL 19.0 for the `postgres.*` scenarios; the three `redap.*` scenarios, the Rerun SDK and the gRPC-Web probe removed, as no component runs Rerun; `outbound.docker_hub_token`; the README runs the suite against the fork's standalone gateway |
| veoveo-qualify-openshell | `edc0c3d` (main) | `results/0.1.10-dev.76+g5f630f42c/{macos-aarch64,linux-x86_64}.json` |
| veoveo-template-installation | `9b9969c` | DESIGN.md, Images: an installation adopts an OpenShell revision only after the suite reports no failure for it on macOS and on a Linux host with a GPU |
| VeoveoAI/OpenShell | `5f630f42c` | The revision qualified, reported as `0.1.10-dev.76+g5f630f42c` |

`outbound.docker_hub_token` runs a static Go client, the TLS stack `buildctl` fetches a pull
token with, against the Hub's `docker_hub_token` endpoint: `auth.docker.io:443`, REST, only
`GET /token`, for that binary alone ([the Docker Hub token record](2026-11-21-factory-docker-hub-token.md)).

## Gateway

Each host ran upstream's `tasks/scripts/gateway-docker.sh` from a checkout of `5f630f42c`: a
plaintext, unauthenticated gateway named `vv-qualify` on `127.0.0.1:18080`, sandbox label
`vv-qualify`, telemetry off. The Mac's own gateway (`openshell`, 0.1.5-dev, OIDC) stayed the
active one and its sandboxes were not touched; the box's cluster OpenShell was not touched.

| Host | CLI and gateway | Supervisor and sandbox images |
|---|---|---|
| Mac, Docker 29.8.2, kernel 7.0.14-linuxkit | Built in 133 s (debug) in the worktree `.cache/openshell-5f630f42` | Built with `mise run build:docker:{supervisor,sandbox}` in 186 s and 79 s: `openshell/supervisor:fork-5f630f42` `96528fd12aa1`, `openshell/sandbox:fork-5f630f42` `caae410e7e0c` |
| Box, Ubuntu 24.04.5, Docker 29.2.1, kernel 6.8.0-147 | Built in 107 s (debug) in the rollout's source export `sync-20261118/openshell/src-5f630f42c` | The rollout's `localhost:5003/veoveo/openshell/supervisor:5f630f42c` `207544d95542` and `sandbox:5f630f42c` `97861f4a6325` |

## Results

Both runs used suite `4f47cc2`, 15-second streams and 512 MiB transfers, with the GitHub push
scenario's provider created from the existing token file on the qualification gateway only.

| Host | Started (UTC) | Duration | Pass | Limit | Limit lifted | Skip | Fail |
|---|---|---|---|---|---|---|---|
| macos-aarch64 | 17:04:43 | 267 s | 25 | 2 | 2 | `gpu.device`, `lifecycle.fast_failure` | 0 |
| linux-x86_64 | 17:07:54 | 317 s | 26 | 2 | 2 | `lifecycle.fast_failure` | 0 |

- **Limits lifted since 0.1.3:** `exposure.grpc_native` (native gRPC through exposure now
  streams: six round trips, p99 9 ms on the Mac) and `sandbox.loopback_close` (a closed loopback
  listener now refuses, as one that never listened does). Designs that worked around either can
  be revisited.
- **Limits kept:** `outbound.mcp_upgrade` (endpoints inspected as MCP refuse WebSocket upgrades)
  and `peer.exposure` (a sandbox cannot reach another sandbox's exposure).
- **`outbound.docker_hub_token`:** the token in 320 ms (Mac) and 231 ms (Linux), status 200 with
  a token; `POST /token` and `GET /v2/` 403 in 0 to 1 ms. Outside any sandbox the same client
  received 200, 400 and 404 from Docker Hub, so both 403s are OpenShell's refusals.
- **PostgreSQL 19.0:** both `postgres.*` scenarios kept the advisory lock through the stream and
  delivered every notification in order (`serverVersion` 19.0, Debian 19.0-1.pgdg13+1).
- **`gpu.device`** on the box: NVIDIA GeForce RTX 4090, driver 615.71.09, 24,564 MiB.
- **`git.provider_push`** pushed and deleted `qualify-435f` (Mac) and `qualify-2d14` (Linux) on
  this repository and was refused on `veoveo-core`; no branch but `main` remains on its origin.

An earlier Mac run at the uncommitted tree (16:52, 603 s with the probe image's first build) gave
the same verdicts; its token probe reported 0 ms for every request, a bug in the probe's timing,
fixed before `4f47cc2`. Its report was discarded.

## Cleanup

The `vv-github` provider was deleted on both qualification gateways and both gateways were
stopped; no `vv-qual-` sandbox from these runs remains. Their state directories are kept
(`.cache/qualify-20261121/gateway` on the Mac, `~/k3s-builds/qualify-20261121/gateway` on the box),
as are the scripts and logs beside them.

## Not covered

- Upstream v0.1.9 alone: the suite ran only the fork, so a result cannot be attributed to the
  fork's changes rather than upstream's.
- `lifecycle.fast_failure`, which runs only with `--lifecycle`.
- The `first-path` actions (Lore direct, service ingress, forward isolation): they compile on
  Rust 1.100.0 and were not run; they need the operator identities their README describes.
- OpenShell's Kubernetes driver, which Bioma runs: this suite drives the Docker driver, and the
  deployed probes remain the Kubernetes evidence.
