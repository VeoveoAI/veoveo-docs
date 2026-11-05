# USD viewer: loading by the specification, and GPU opt-in

2026-11-04. Coordinator: Claude Code (Opus 5.5). This follows
[the investigation](2026-11-04-usd-investigation.md), whose direct frame the owner set
aside: the Hub does what the MCP Apps specification requires. Evidence for
[plan section 18](../PLAN.md#18-usd-a-viewer-and-agent-tools-from-bevy_openusd). No product
code changed and nothing was deployed.

Scripts and logs are on the box in `~/k3s-builds/usd-20261104/`: `spec.mjs`, `gpu-optin.sh`
and `gpu-optin.log`.

## What the specification says

MCP Apps `2026-01-26`, the version the Hub pins:

- All View content must render in sandboxed iframes.
- A web host must wrap the View through a Sandbox proxy, on a different origin from the host,
  with `allow-scripts` and `allow-same-origin`. The direct frame skipped this proxy.
- `_meta.ui.domain` is an optional dedicated origin for the view's sandbox, with a format each
  host defines. The spec names CORS policies among its uses.
- `ui/notifications/sandbox-resource-ready` has an optional `sandbox` field, an override for
  the inner frame's attribute.
- The policy is exact only when `ui.csp` is omitted. Its construction example has
  `connect-src 'self'`. A host must not allow undeclared domains.

Upstream's reference host (`examples/basic-host/src/sandbox.ts:46`) defaults its inner frame
to `allow-scripts allow-same-origin allow-forms` and honors the override. The Hub's rule of
never adding `allow-same-origin` is our own, and it fits one origin shared by every App.

The draft specification also describes a single sandboxed frame, whose document a server the
host controls must serve. It is not the pinned version.

## The route in the owner's Chrome

`spec.mjs`, local servers, through the Claude in Chrome extension. Chrome 156, the owner's
own profile. Hostnames were `veoveo.localhost` and `usd.apps.veoveo.localhost`, same-site like
the real ones. The host page frames the proxy on the App's origin, sends the view's HTML in
`sandbox-resource-ready` with `sandbox: "allow-scripts allow-same-origin"`, and the proxy
forwards messages. The proxy's policy was the Hub's with `'wasm-unsafe-eval'` and
`connect-src 'self'`. Neither frame had an `allow` attribute.

| Check | Result |
|---|---|
| The view's origin | `http://usd.apps.veoveo.localhost:8714` |
| `compileStreaming` of a 20 MB module from its own origin | works |
| Module script from its own origin | works |
| `new Function` | blocked, `EvalError` |
| WebGL2 clear, pixel read back | works |
| WebGPU render pass, pixel read back | works |
| Session cookie with a request | sent |
| IndexedDB, Cache API | work |
| Reading the host page | blocked, `SecurityError` |
| JSON-RPC to the host page through the proxy, answered | works |
| Sign-in redirect chain through the issuer inside the frame | worked once, then the session held |
| Downloads the server saw in three page loads of the immutable module | 1 |

The site's cookies, storage and cache were cleared afterwards with `Clear-Site-Data`.

## GPU opt-in in Docker

`gpu-optin.sh`, on the box, with `--runtime=nvidia` and no `--gpus`:

| Image | `/dev/nvidia*` | `nvidia-smi -L` |
|---|---|---|
| `debian:trixie-slim` | 0 | not present |
| The same, with `ENV NVIDIA_VISIBLE_DEVICES=all` and `ENV NVIDIA_DRIVER_CAPABILITIES=all` in its Dockerfile | 5 | NVIDIA GeForce RTX 4090 |

`embedding-runtime` held its claim throughout. The toolkit's
`accept-nvidia-visible-devices-envvar-when-unprivileged` is at its default.

## The bridge's limits

`veoveo-hub/crates/veoveo-hub/src/apps/bridge.rs:29` takes at most 256 KiB in a request, and
`veoveo-hub-sdk/crates/veoveo-hub-sdk/src/transport.rs:16` caps an answer at 8 MiB. It carries
JSON, which would need base64 for binary content, and answers a `POST`, which the browser does
not cache.

## Boundaries

- The Hub was not involved: nothing here ran against its proxy, its sign-in or its bridge. The
  sign-in chain imitates it.
- The content was synthetic: a padded module and a cleared pixel. No USD scene or Bevy build
  was loaded.
- The opt-in ran under Docker's runtime, not a factory sandbox under Kubernetes and OpenShell.
- A rendered frame on the GPU has not been produced; Vulkan listing the device is the last
  thing measured.
