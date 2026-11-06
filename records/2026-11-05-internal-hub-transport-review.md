# Internal Hub transport: source review for planning

Date: 2026-11-05. Status: read-only source/configuration review, followed by a proposed
plan in [PLAN section 20](../PLAN.md#20-keep-cluster-local-hub-traffic-inside-the-cluster).
No implementation, live probes, model-driven acceptance or deployment was performed.

## Review inputs and agents

The coordinator owns the architecture recommendation. The configured `coder` worker,
GPT-6.1 Sol, inspected SDK/client coverage; the configured `builder` worker, GPT-6 Luna,
inspected OpenShell native routing, provider renewal and installation configuration.
Both were assigned read-only studies and ran no builds or checks. No OpenCode model
calls were made. Tools were local `rg`, `sed`, `cat` and Git reads, plus primary upstream
documentation lookup. This review did not collect per-command performance instrumentation.

| Repository | Reviewed HEAD |
|---|---|
| veoveo-docs, before plan edits | `8cb413139b8d303890752a21dfc19a42f4170c4e` |
| veoveo-hub-sdk | `8ed1d5ee29d04a49a5e6c05592d1843debf67045` |
| veoveo-hub | `2e01394bfdbb701674c097cfac9c620b40f65b99` |
| veoveo-installation | `329f5e2f8e36297561d3a9d077c75a24b56b7592` |
| veoveo-template-installation | `34c95d495c2107a24bb7593aeb6bbcc6cedea2e5` |
| OpenShell | `8bd83351d776127fcd619fb9329ecc9e41873016` |

HEADs describe checked-out source, not a fresh verification of deployed image contents.
The Mac has no `/Users/rozgo/k3s-builds` directory. Prior records name scripts under
`~/k3s-builds/` on the Linux box; those remote scripts were not inventoried in this review.
Some exploratory reads used nonexistent/globbed paths; corrected paths were then read.
These were inspection errors, not observed application failures.

## Established by source/configuration

- The installation already configures Lore's catalog to call Hub at
  `https://vv-control--hub--http.openshell.localhost:8080`, with a host alias,
  gateway CA and network-policy allowance. See the
  [installation design](https://github.com/BiomaAI/veoveo-installation/blob/main/DESIGN.md#identity)
  and [Lore deployment](https://github.com/BiomaAI/veoveo-installation/blob/main/kubernetes/lore.yaml).
- OpenShell native service routing uses its reserved hostname and gateway port; no
  arbitrary public-host-to-native-service mapping was found in reviewed configuration.
  See [native_service.rs](https://github.com/VeoveoAI/OpenShell/blob/main/crates/openshell-supervisor-network/src/native_service.rs).
- The SDK injects ordinary HTTP clients into registration, server calls and forwarded
  key refresh. A native-origin delivery mapping is a new SDK boundary, not an existing
  switch. The CLI's existing address override preserves URL/Host/TLS identity and does
  not satisfy the gateway's native Host requirement.
- Registration, exchanged-token resources and assertion audiences derive from canonical
  URLs. Key refresh verifies the discovered issuer and rejects redirected responses.
  See [registration client](https://github.com/VeoveoAI/veoveo-hub-sdk/blob/main/crates/veoveo-hub-sdk/src/registration/client.rs),
  [server calls](https://github.com/VeoveoAI/veoveo-hub-sdk/blob/main/crates/veoveo-hub-sdk/src/hosting/calls.rs),
  and [forwarded identity](https://github.com/VeoveoAI/veoveo-hub-sdk/blob/main/crates/veoveo-hub-sdk/src/internal_auth/forwarded.rs).
- Console has direct Hub REST requests outside SDK MCP; Computer n8n constructs its own
  client, and OpenCode consumes its configured MCP URL. SDK changes alone do not cover
  every client. See [Console](https://github.com/VeoveoAI/veoveo-mcp-console/blob/main/crates/veoveo-mcp-console/src/mcp/hub.rs),
  [n8n Computer](https://github.com/VeoveoAI/veoveo-mcp-n8n/blob/main/crates/veoveo-mcp-n8n/src/computer/mod.rs),
  and [OpenCode configuration](https://github.com/VeoveoAI/veoveo-template-installation/blob/main/computer/opencode.json).
- Hub validates a Computer's refresh profiles against the public token URL. Changing
  only their `token_url` would be rejected. See
  [Computer provisioning](https://github.com/VeoveoAI/veoveo-hub/blob/main/crates/veoveo-hub/src/computers/provisioning.rs).
- Gateway-managed refresh builds its own HTTP client, outside sandbox supervisor DNS
  and trust handling. Native-name resolution, gateway CA trust and renewal through the
  gateway's own service listener need separate qualification. No lock cycle was identified
  by inspection; absence of a runtime cycle was not proved. See
  [provider_refresh.rs](https://github.com/VeoveoAI/OpenShell/blob/main/crates/openshell-server/src/provider_refresh.rs).
- Exact declared hostnames may resolve to private addresses under OpenShell policy,
  while always-blocked destinations remain rejected. This supports the DNS approach's
  policy hypothesis, but does not prove deployed coverage or Kubernetes reachability.
- A public-host DNS override affects more than Hub: `/artifacts/` is signed S3 traffic,
  Media has a narrow callback route, and `/docs` is a Cloudflare Worker route. See
  [tunnel routes](https://github.com/BiomaAI/veoveo-installation/blob/main/kubernetes/tunnel-routes.yaml)
  and [edge routes](https://github.com/BiomaAI/veoveo-installation/blob/main/kubernetes/edge-routes.yaml).

## Upstream interfaces checked

- [reqwest 0.13.5 ClientBuilder](https://docs.rs/reqwest/0.13.5/reqwest/struct.ClientBuilder.html):
  destination resolution and TLS/client configuration; it does not make a native gateway
  Host equivalent to the canonical public authority.
- [RMCP 3.8.0 StreamableHttpClient](https://docs.rs/rmcp/3.8.0/rmcp/transport/streamable_http_client/trait.StreamableHttpClient.html):
  supported POST/GET/DELETE adapter surface for a proposed SDK transport.
- [k3s CoreDNS imports](https://github.com/k3s-io/k3s/blob/main/manifests/coredns.yaml):
  `coredns-custom` is the existing configuration extension.
- [Let's Encrypt DNS-01](https://letsencrypt.org/docs/challenge-types/#dns-01-challenge):
  issuance for a publicly named private server is possible; no certificate was requested.

## Measurements and limits

The user's reused-connection measurements were public-path fastest/median/slowest
501/711/2,319 ms and in-cluster 1/1/2 ms. They are user-reported evidence, not measurements
made during this review; raw samples, sample count and full instrumentation were not
provided here. Earlier independently recorded node/browser observations are in
[gallery speed](2026-11-05-gallery-speed.md). They do not measure the proposed route
through a sandbox supervisor or explain all of a gallery's elapsed time.

The engineering conclusion is that the native-endpoint option is a cross-repository
client/configuration rollout, whereas a canonical-URL/private-ingress option concentrates
change in the installation but adds ingress and certificate lifecycle responsibilities.
The proposed next step is a bounded installation pilot, with a deliberate choice between
those implementations before a broad rollout. No latency gain, certificate acceptance,
renewal behavior or full caller coverage is qualified by this review.
