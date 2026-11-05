# Linux Embedding health check

2026-10-29. Investigation of whether Embedding still works after the current
OpenShell rollout. Coordinator: GPT-6 Astra; probe runner: GPT-6 Luna (`builder`).
No source, configuration, credentials or services were changed or restarted.

## Observations

The actual Linux x86_64 host `rozgo-sim-pc` was reachable through the existing SSH
tunnel. K3s reported the node Ready and one allocatable NVIDIA GPU. Both `embedding`
and `embedding-runtime` pods were Running/Ready with zero container restarts.
OpenShell's authenticated inventory also reported both sandboxes Ready.

Running image digests, as observed in Kubernetes:

- Embedding MCP: `sha256:7cc1de5d1b3a7a561266913cd835e3a2b8b04ed7790d8520787dfa1dbe8a98ff`.
- Runtime: `sha256:c4afbc57478aaacc59aa9c0cd9a223323d8a5b152e76ed0cf1cdf4bf98b34fda`.

The authenticated runtime `/readyz` returned HTTP 200 and `ready`.
The owner's existing Computer discovered `embedding__embed` through the mounted
Hub SDK CLI. One real call then used that same ordinary Hub route, without retry:

```json
{"items":[{"content":[{"type":"text","text":"Veoveo Linux embedding health check 2026-10-29."}]}],"dimensions":128}
```

The executable was `/opt/veoveo/hub-sdk-cli/usr/local/bin/veoveo-hub-sdk-cli`, invoked
through native `openshell sandbox exec` with the existing `k3s-user` gateway/profile.
The command shape was `veoveo-hub-sdk-cli --json call embedding__embed <JSON>
--timeout-seconds 60`; the native exec deadline was 70 seconds.

| Measurement | Result |
| --- | --- |
| Request ID | `01a187ef-7e79-7032-8d53-310ddb0131c0` |
| Model | `google/embeddinggemma-2` |
| Model revision | `914f7f89142e33e77833254d9c9b90c3cef7303b` |
| Reported device | CUDA, on the host's RTX 4090 |
| Result | One 128-dimensional vector; all values finite |
| L2 norm | `0.999999981` |
| Input tokens | 21 |
| Call wall time | 2.581 seconds, around the SSH/OpenShell/SDK CLI subprocess |
| Captured JSON stdout | 7,792 bytes; not an HTTP wire-byte measurement |
| Completion time bound | Before the clock read at 13:53:08 UTC; exact start/end were not recorded |

The wall time includes CLI setup, transport, Hub routing, inference and response
transfer; it is not model-only latency. The vector stayed in memory and was not
saved or hashed. A subsequent GPU snapshot, before 13:53:34 UTC, showed 4,345 of
24,564 MiB used, 35°C and 0% utilization after the call.

## Probe issues and evidence limits

The first operator commands selected the retired default CLI profile: port 17670
refused connections, and overriding its endpoint to 18443 produced a TLS
`BadSignature`. The installation's existing private configuration instead names
`k3s-user` and its own CLI config home. Selecting those for the probe succeeded
with normal TLS verification, without changing configuration or trust. These
initial errors did not demonstrate an Embedding outage. An initial CLI invocation
through PATH was unavailable; its existing mounted absolute path worked. A later
shell-glob error affected only a post-call Kubernetes display.

Private inventory logs and `success-summary.json` are under
`veoveo-template-installation/state/embedding-health-20261029/`. The success summary
was transcribed from the worker's tool trace after the probe; it is not an automatic
run log. Its SHA-256 is
`a62da9a90f3764563b44f35a508a949f51c4a349450b067605f702ddcf433127`.
No standalone script or full successful response was retained, and source commit
identity was not independently established beyond the running image digests.

This proves current readiness, discovery and one real text embedding through
Computer → Hub → Embedding MCP → CUDA runtime. It does not requalify media/Artifact
inputs, capacity, ACL denial, restart behavior or sustained availability. No OpenCode
agent, external generation provider or full acceptance suite was run.
