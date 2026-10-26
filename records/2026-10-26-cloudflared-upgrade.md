# cloudflared upgrade to 2026.10.3 — 2026-10-26

Cause: Cloudflare's notice that releases before 2026.10.2 trust eight eMudhra (emSign)
intermediate certificates with weak private keys. Fixed in 2026.10.2; a non-Homebrew
macOS install needs 2026.10.3. Target: 2026.10.3 everywhere.

## Instances found

| Instance | Before | After | Status |
|---|---|---|---|
| K3s pod `veoveo-system/public-tunnel` (tunnel for `veoveo.bioma.ai`) | 2026.10.1, `sha256:3c0502d2...` (linux/amd64 manifest) | 2026.10.3, index `sha256:faa8e0a1475f137c910be6025f43c8e4092fdd35461b31e19fd1390657a1ff39` | upgraded |
| Mac `/opt/homebrew/bin/cloudflared` (Homebrew, not running) | 2026.3.0 | 2026.10.3 (`brew upgrade cloudflared`) | upgraded |
| Box host `/usr/local/bin/cloudflared` -> `/usr/bin/cloudflared`, root-owned, systemd `cloudflared-tunnel.service` ("agent.veoveo.ai", user rozgo, a second tunnel, config `~/.cloudflared/config.yml`) | 2026.2.0 | 2026.2.0 | **not upgraded** |

The host tunnel was not in the task's inventory. Replacing the root-owned binary and
restarting a systemd unit needs `sudo`, which asks for a password; no sudo was used. It
is still running a vulnerable release and needs the owner's decision. Its ingress is
plain HTTP to `localhost` ports 42617/42618 (hostnames `agent.bioma.ai`,
`agent.veoveo.ai`, `*.agent.veoveo.ai`), so it has no origin certificate to check. The
only cloudflared pods in the cluster (all namespaces) are the `public-tunnel` pods.
A leftover `Completed` pod (`public-tunnel-74b9fc9f7f-stdg6`, 7 restarts, from the old
ReplicaSet) predates this work and was left alone.

## Origin certificate check

The cluster's tunnel routes (`tunnel-routes.yaml`) name HTTPS origins verified against
two CA pools in ConfigMap `public-tunnel-ca`, read from the cluster:

- `gateway.crt`: subject = issuer = `CN=openshell-ca, O=openshell` (self-signed).
- `storage.crt`: subject = issuer = `CN=Veoveo Linux Lore installation CA` (self-signed).

Neither is eMudhra/emSign. This is the CA pool each route trusts, not a handshake
against each live origin; the origin leaf certificates were not fetched. The routes held
in Cloudflare's dashboard were not re-read; the template file is the record of them.
No TLS verification was disabled.

## Digest and release

`docker buildx imagetools inspect cloudflare/cloudflared:2026.10.3`: index
`sha256:faa8e0a1...1ff39`, with linux/amd64 `sha256:c3f24df7...8672` and linux/arm64
`sha256:e2fa661d...2182`. GitHub release `2026.10.3` exists (not a prerelease, published
2026-10-21T13:17:53Z). The previous pin was a single-platform manifest digest; the new
one is the index, as asked. The node is amd64 and pulled the amd64 manifest.

## Change

`kubernetes/tunnel.yaml` in both installations: image pin, and
`strategy.rollingUpdate` `maxUnavailable: 0`, `maxSurge: 1` (the Deployment had the
default 25%/25%). `kubernetes/WORKLOADS.md` names the new version. `component-lock.json`
does not list cloudflared. Commits: template (`VeoveoAI/veoveo-template-installation`)
`55cb00d`; Bioma (`BiomaAI/veoveo-installation`) `3f79720`.

Applied with `veoveo-installer` on the box (mirror `~/k3s-builds/installer-20261025/bioma`,
`tunnel.yaml` copied from the Bioma commit; the rest of the mirror is at `ec0ebee`).
`plan --step tunnel` showed exactly three differences (maxSurge, maxUnavailable,
image); `apply --step tunnel` returned 0 in 9.0 s.

## Rollout (box clock UTC, 1 s sampling)

| Time | Event |
|---|---|
| 20:26:35 | New pod `public-tunnel-7fc4f649f5-7krtl` ContainerCreating (apply started) |
| 20:26:38 | New pod Running 0/1; logs: version 2026.10.3, 4 connections registered by 20:26:40 |
| 20:26:43 | New pod Ready (kubelet condition 20:26:43Z); old pod `dgxt2` Terminating |
| 20:26:55 | Old pod 0/1 Terminating |
| by ~20:27:50 | Old pod absent from the pod list (the 1 s sampler stopped at 20:27:06 with it still Terminating; exact disappearance not measured) |

New pod Ready about 8 s after apply began; the old pod was kept until it was Ready, as
the surge intends.

Public probe, from the Mac, once a second:
`GET https://veoveo.bioma.ai/.well-known/oauth-authorization-server`, 31 probes from
20:26:26 to 20:27:04, all 200, 0 failures (including one pre-rollout baseline).
A 1 s probe can miss a shorter blip, and it exercises new connections, not long-lived
streams; in-flight requests on the old pod at termination were not tested.

## After

- Running pod image ID `docker.io/cloudflare/cloudflared@sha256:faa8e0a1...1ff39`
  (the digest of the index, as the pin).
- Pod logs: `Version 2026.10.3`, `GoVersion go1.27.3`; the 2026.10.1 pod's log had warned
  "outdated; recommend 2026.10.3".
- Four `Registered tunnel connection` events (quic, mia01/mia04/mia08/mia10).
  `/ready` through the pod's metrics port: `{"status":200,"readyConnections":4}`.
- The new pod's log has one start-up warning, "No ingress rules were defined", the
  normal remotely managed start before the dashboard config arrives; public probes were
  200 afterwards. Only the start of the log was inspected.
- Mac: `cloudflared version 2026.10.3 (built 2026-10-21T10:51:09Z)`; `brew` reports
  `cloudflared 2026.10.3`. It is not running as a service and was not started.

## Not proved or not done

- Box host cloudflared 2026.2.0 (`agent.veoveo.ai`): not upgraded, needs sudo.
- No test that the upgraded cloudflared still reaches the S3 `/artifacts/` and Media
  callback routes; only the Hub route was probed.
- The fix itself (rejection of the eMudhra intermediates) was taken from the notice,
  not tested.
