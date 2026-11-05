# USD viewer and tools: what was read and measured

2026-11-04. Coordinator: Claude Code (Opus 5.5). This is the evidence behind
[plan section 18](../PLAN.md#18-usd-a-viewer-and-agent-tools-from-bevy_openusd). No
product code changed and nothing was deployed.

Scripts and logs are on the box in `~/k3s-builds/usd-20261104/`: `probe.mjs` and
`direct.mjs` (the frame tests), `gpu-docker.sh`, `gpu-docker2.sh` and their logs.

## The two candidates

Read from their repositories on this date. Neither was built or run.

| | `usd-wg/usd-wg-webview` at `9aab7485` | `openusd-rs/bevy_openusd`, `main` v0.3.0 and `develop` `5b3ebbc7` |
|---|---|---|
| USD core | Pixar's OpenUSD 26.08 in WASM | Pure Rust `openusd`; its README reports AOUSD core tests passing, value resolution partial |
| Rendering | Three.js in the browser | Bevy 0.19.1, native or WASM |
| Headless | Through Chromium and a test hook | Native: `examples/gif_frames.rs` has no window and writes PNGs |
| Agent reads | The test hook has no scene graph reads | Direct Rust API |
| Web UI | Full inspector | `examples/web`, 147 lines, an orbit camera and no panels; `usdview` is built on `mara` |
| Large scenes | Benchmarks pending, by its own README | README shows Caldera, Moana and ALab natively; nothing shows browser scale |
| MaterialX | Runs through Three.js's loader | Reads inputs into a PBR material |
| Gaussian splats | Yes | None found |
| Project | One contributor, no releases | One main contributor (713 commits), created April 2026, three releases; `mxpv/openusd` beneath it is older and has 1,116 commits by its author |

`bevy_openusd`'s own `benchmarks/acceptance-checkpoint.md` says one test asset's coat,
glass and decals still differ from native USD rendering. Its CI builds and tests natively
only: no WASM target and no render comparison.

Bevy's latest release is v0.20.1 (2026-10-28). `bevy_openusd`'s draft PR #4 ports to 0.20
in 84 files, moving shaders from WGSL to WESL. It waits on a draft PR in `mara`, which only
`usdview` uses.

Of the 558 MB repository, the code to copy is about 3 MB: `crates/usd_bevy` 2.66 MB,
`crates/usd_macro`, and 0.1 MB of top-level `assets/` that its tests read. `assets/` as a
whole is 763 MB, of which the `cows` folder is 560 MB. Only Franka has a license file among
the external assets.

## Why the Hub blocks WASM

Nobody decided it. `csp.rs` came in with `8b40f44` (2026-10-30) following the MCP Apps
specification's restrictive default, `script-src 'self' 'unsafe-inline'`. No design or
record mentions WASM. The deployed sandbox origin answers that policy, read with `curl`
from `https://sandbox.apps.veoveo.bioma.ai/`.

Upstream: `modelcontextprotocol/ext-apps` issue #605 asks for `'wasm-unsafe-eval'`, with a
host developer arguing for it as the default, and PR #667 offers an opt-in field instead.
Neither is merged. The reference host's `examples/basic-host/serve.ts` allows
`'unsafe-eval'`.

## Frame tests

Local servers with the Hub's frame structure, not the deployed Hub.

**Keyword alone**, `probe.mjs`, Chrome 156.0.8078.74: under the deployed policy string,
`WebAssembly.compile` fails with `CompileError`. With `'wasm-unsafe-eval'` added it works.
`new Function` stays blocked with `EvalError` either way.

**Ways of loading the App**, `direct.mjs`, Chrome 156.0.8078.80 in a separate profile.
Hostnames were same-site, like the real ones (`hub.veoveo.test`, `usd.apps.veoveo.test`),
over HTTP marked secure by a flag. The App compiled a 20 MB module with
`WebAssembly.compileStreaming`, and each mode was loaded three times. The frames carried
`allow="webgpu"`.

| Check | Hub's proxy and opaque frame, with the keyword | Own origin framed directly, `sandbox="allow-scripts allow-same-origin"` | Own origin framed directly, no `sandbox` |
|---|---|---|---|
| The App's origin | `null` | its own | its own |
| 20 MB `compileStreaming` | works | works | works |
| `new Function` | blocked | blocked | blocked |
| WebGL2 clear, pixel read back | works | works | works |
| WebGPU render pass, pixel read back | works | works | works |
| Session cookie with a request | not sent | sent | sent |
| IndexedDB, Cache API | `SecurityError` | work | work |
| Messages with the host page, both ways | work | work | work |
| Downloads the server saw in three page loads of an immutable file | 3 | 1 | 1 |

The first direct load went through a sign-in redirect chain inside the frame, from the app
origin to the issuer and back, setting a `SameSite=Lax` cookie, under a host page whose
`frame-src` named both origins. It worked. This imitates the Hub's chain and does not run it.

Inference, not measured: the opaque frame's re-downloads come from Chrome not reusing its
HTTP cache for an opaque origin.

## GPU in Docker on the box

`docker run --runtime=nvidia --gpus all -e NVIDIA_DRIVER_CAPABILITIES=all debian:trixie-slim`,
while `embedding-runtime` held its Kubernetes claim, `nvidia.com/gpu: 1`.

| Packages | Result |
|---|---|
| `vulkan-tools` | `nvidia-smi` sees the RTX 4090, 4571 of 24564 MiB in use; `nvidia_icd.json` is present; `vulkaninfo` lists only `llvmpipe` |
| `vulkan-tools libvulkan1 libglvnd0 libgl1 libegl1 libglx0 libx11-6 libxext6`, no recommends | `vulkaninfo` lists NVIDIA GeForce RTX 4090, discrete, driver 615.71.09, API 1.4.351 |

Which of those libraries was the missing one was not narrowed down. No frame was rendered.
A Kubernetes pod without a claim was not tried.

## Read from our own code

- `veoveo-hub/crates/veoveo-hub/src/apps/server_origin.rs` forwards any method, path, query
  and headers, with the body streamed both ways, and names no file type. The Hub's `reqwest`
  has no decompression features, so encoded answers pass unchanged. Its tests have no case
  for unusual paths, ranges or conditional requests.
- A linked server's app origin is one for the server, served by the first runner the caller
  reaches (`veoveo-hub/crates/veoveo-hub/DESIGN.md:786`). The code carries the caller's
  grant to a runner's app origin. The
  [10-31 record](2026-10-31-linked-repositories-hub.md) lists that as untested for runners.
- The factory template refuses an image, environment or a GPU, and passes its driver
  configuration unchanged.
- OpenShell admits `/dev/nvidia*` whenever `/dev/nvidiactl` exists in the sandbox
  (`openshell/crates/openshell-sandbox/src/boundary_server.rs:143`), with no GPU claim needed
  for that.
- Bevy v0.20.1's WASM asset reader fetches a path as written and has a `request_mapper`
  hook. A `#`, `?` or `%` in a filename would break the URL unless the mapper encodes it.

## Boundaries

- `bevy_openusd` has not been built, on Bevy 0.19 or 0.20, native or WASM. Its WASM size and
  frame rates are unknown.
- The frame tests used small synthetic content: a padded 20 MB module and a cleared pixel. They
  prove what the browser allows, not that a USD scene renders.
- The cache result is a count on local HTTP. It was not repeated over the tunnel.
