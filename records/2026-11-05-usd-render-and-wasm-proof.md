# USD: a native render on the RTX 4090 and the viewer on WebGPU

2026-11-04 (local; 2026-11-05 UTC). Agent: Claude Code (Opus 5.5), a worker under the coordinator. Evidence for step 2 of
[plan section 18](../PLAN.md#18-usd-a-viewer-and-agent-tools-from-bevy_openusd), which tests the biggest open risk: no WESL
shader from the Bevy 0.20 port had compiled or rendered before. These are component tests and a local browser test. No
model drove them, and nothing here involves a deployed server, the Hub, Lore or the cluster.

## Source

`veoveo-mcp-usd` at `8e98c1e`, on Bevy 0.20.1, wgpu and naga 30.0.1, wesl 0.6.0 and wasm-bindgen 0.2.129. Every number below
comes from that exact revision, except where it says otherwise.

| Commit | What |
|---|---|
| `99158ad` | Register `usd_bevy`'s shaders before anything loads them |
| `fe5fbd9` | Add the `render` subcommand, and `StageBounds` |
| `9d75b74` | Add the WASM viewer |
| `c068dc3` | Give the factory image the GPU and the viewer's toolchain |
| `8e98c1e` | Load `flat_functions` only where shaders are assets |

Gate, `docker build --target check .` at `8e98c1e`: exit 0 on the Mac in 132 s and on the Linux box in 84 s, with cached
crates. 664 tests passed and 20 were skipped on each. The same gate at `c068dc3` failed on both, with 2 tests failing. See
[failures](#failures-and-their-causes).

## Scenes

From `bevy_openusd`'s `develop` branch, `assets/external/`, fetched into scratch directories and not committed.

| Scene | Bytes | SHA-256 starts |
|---|---|---|
| `Kitchen_set.usdz` | 5,128,790 | `534717d266161dd3` |
| `hummingbird.usdz` | 20,762,735 | `5136ad4dd26e351d` |
| `PointInstancedMedCity.usdz` | 1,724,223 | `da1a4b62338cae53` |

## Native render

The image `usd-factory:step2` (3.01 GB) is built from the repository's own `openshell/image/Dockerfile`, whose `ENV` sets
`NVIDIA_VISIBLE_DEVICES=all` and `NVIDIA_DRIVER_CAPABILITIES=all` and which installs `libvulkan1 libglvnd0 libgl1 libegl1
libglx0 libx11-6 libxext6`. Everything ran as `docker run --runtime=nvidia`, with no `--gpus`. In the container there are 5
`/dev/nvidia*` nodes, and `nvidia-smi -L` lists `NVIDIA GeForce RTX 4090`.

The binary's own line, for every scene:

```text
ADAPTER NVIDIA GeForce RTX 4090 backend=Vulkan type=DiscreteGpu driver=615.71.09
```

Frames are 1280×720, with MSAA 4 and a depth prepass. Peak GPU is the whole device's memory, sampled every 0.5 s, and
includes Embedding's 4571 MiB. Times are from the render's start, and wall includes the container's.

| Scene | Draws | GPU instances | READY | Last frame | Wall | Peak GPU | Above baseline |
|---|---|---|---|---|---|---|---|
| Kitchen_set | 1788 | 0 | 630 ms | 1973 ms | 3.3 s | 5084 MiB | 513 MiB |
| hummingbird, 3 frames | 43 | 0 | 5966 ms | 25396 ms | 26.5 s | 6174 MiB | 1603 MiB |
| PointInstancedMedCity | 16 | 40000 | 25 ms | 1498 ms | 2.5 s | 5076 MiB | 505 MiB |

The first build of the binary in the image took 149 s up to a failure caused by my own sync (below). The later rebuilds were
incremental.

What the images show, each opened and looked at:

| File | Bytes | SHA-256 starts | Shows |
|---|---|---|---|
| `kitchen.png` | 818,979 | `7255a57a667a3880` | The whole kitchen, upright and framed: walls, ceiling grid, blue refrigerator, green stove, sink, table and chairs, with shadows. 46.1% of its pixels are not background |
| `hummingbird-t0.png` | 315,793 | `e2bc0809345a3a61` | The textured bird, wings raised |
| `hummingbird-t12.png` | 278,683 | `15a358b1d0462f1a` | The bird, wing extended flat behind it |
| `hummingbird-t40.png` | 309,474 | `37e60632d0531d6d` | The bird, tilted, wing angled up |
| `medcity.png` | 738,851 | `27d1d1924cbd1f3e` | A hilly field of thousands of small pale buildings |

The hummingbird's frames differ: 15.2% of pixels change by more than 8/255 from t=0 to t=12, 14.5% from t=12 to t=40 and 17.3%
from t=0 to t=40.

Paths, on the box: `~/k3s-builds/usd-20261104/step2/out/`, with `render.summary` and each scene's log, `render.sh` and
`diag.sh` beside it. On the Mac:
`/private/tmp/claude-501/-Users-rozgo-VeoveoAI/6381b145-dbb9-4520-8fb7-ae00dc0801cf/scratchpad/usd/step2/out/`.

### Embedding

Measured before and after the final run: `embedding-runtime` ready, 0 restarts, 4571 MiB on the GPU. The GPU showed 19%
utilization straight after the last render and 0% a minute later. Its log has no error, panic or out-of-memory line in the last
90 minutes. No inference call was made, so this shows that it was not disturbed, not that it served requests during a render.

## WASM viewer

Built in the `dev` Docker image on the Mac: `cargo build --locked --profile wasm-release --target wasm32-unknown-unknown -p
usd-viewer` (53.75 s incremental, 1 min 48 s the first time), then `wasm-bindgen` 0.2.129 with `--target web
--remove-name-section --remove-producers-section`. The WebGL2 backend is not compiled in, because the only backend feature is
`webgpu`.

| File | Raw | gzip -9 | Brotli 11 | SHA-256 starts |
|---|---|---|---|---|
| `usd_viewer_bg.wasm` | 27,955,759 | 6,830,260 | 4,338,574 | `f0b05660ded8cac2` |
| `usd_viewer.js` | 112,413 | 17,749 | 14,980 | `22886ca58465de89` |

Before the name section was removed the `.wasm` was 64.6 MB: 36.7 MB of names, 23.8 MB of code and 3.8 MB of data. `wasm-opt`
was not run. Compression at Brotli 11 took 42 s on the Mac. The stand-in server used quality 5, sending 5,201,861 bytes, and
quality 11 is the better figure only for a precompressed file.

### How it was served

`~/k3s-builds/usd-20261104/step2/serve.mjs`, modelled on `frame-probe/fv.mjs`. A stand-in Hub at `veoveo.localhost:8711` frames a content origin on another
site, `t-3f9a1c7e.veoveo-bioma.localhost:8715`, which serves both the viewer at `/_veoveo/viewers/usd/` and the scene at
`/main/`, with `?scene=main/...`. The frame, read back from the page:

```text
sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"
allow="webgpu; autoplay"
```

The content origin sent `default-src 'self' blob: data:`, `script-src` with `'wasm-unsafe-eval'`, `frame-ancestors` for the
Hub, and `nosniff`. The server's log, read during the last pass: 13 requests, none carrying a cookie, none answered 404, no sidecar
file asked for. In the pass before it, `index.html` arrived as `Sec-Fetch-Site: cross-site` and the viewer's other files and the
scenes as `same-origin`.

### In the owner's Chrome

Only the Claude in Chrome extension's tools were used, with no raw debugging connection and no other profile. No download or
dialog was triggered.

**It uses WebGPU.** The viewer's own `RenderAdapterInfo`, reported from inside the frame, says `backend=BrowserWebGpu`. Its
adapter name is empty. `navigator.gpu`, read from the Hub page, gives vendor `apple` and architecture `metal-3`.

`atMs` is `performance.now()` inside the frame, over loopback with no CDN. Memory is the WASM linear memory. The viewport was
1456×840. Frames per second is Bevy's frame count over 5 s after the stage is ready.

| Scene | Started | Ready | WASM memory at ready, then after 5 s | Frames per second | Draws, instances |
|---|---|---|---|---|---|
| Kitchen_set | 345 ms | 1250 ms | 137.0 MB, 140.3 MB | 118.1 | 1788, 0 |
| hummingbird | 329 ms | 9222 ms | 2050.9 MB, 2050.9 MB | 120.2 | 43, 0 |
| PointInstancedMedCity | 546 ms | 1281 ms | 59.2 MB, 60.8 MB | 76.3 | 16, 40000 |

Other passes on a near-identical build: hummingbird ready at 8429 ms and 10616 ms. GPU memory in the browser was not measured,
since a page cannot read it.

**WESL, the GPU instancer's compute culling and indirect draws, and skinning all work on WebGPU,** as the screenshots show.
Kitchen_set appears framed. A drag made with real mouse events orbited it to the other side of the room, and scrolling zoomed
in on the stove and refrigerator. Hummingbird at t=0 shows the textured bird, and MedCity the same field as the native render.

Screenshots: `kitchen-framed.jpg`, `kitchen-orbited.jpg`, `kitchen-zoomed.jpg`, `hummingbird.jpg` and `medcity.jpg`, in
`~/k3s-builds/usd-20261104/step2/browser/` on the box and in
`/private/tmp/claude-501/-Users-rozgo-VeoveoAI/6381b145-dbb9-4520-8fb7-ae00dc0801cf/scratchpad/usd/step2/browser/` on the Mac.

Afterwards both origins were cleared with `Clear-Site-Data` and read back empty: no cookies, local storage, caches or IndexedDB.
The tab was closed and the server stopped.

## Failures and their causes

| Failure | Evidence | Cause | Fix |
|---|---|---|---|
| The first box build failed: `error parsing migration filename "._0001_usd.sql"` | `build.log` | My own sync copied macOS AppleDouble files into the tree. Not a code defect | The sync excludes them. Final trees come from `git archive` |
| MedCity hung: `gpu_instancing.wesl has an unresolved import`, `module not found: usd_bevy::route::gpu_instancing_types` | `medcity.log`, then reading `bevy_shader` | `embedded_asset!` stores bytes only, and Bevy's loader follows asset-path imports and not package imports. Any WESL module imported only by name is never registered | `load_shader_library!` for 4 modules. A porting bug |
| `Path not found: usd_bevy/route/flat_material.wesl`, and 4 others, on one of the runs with one binary | Log, absent from a run of the same binary before it | Inferred from the order of the code: the material's plugin loads the shader on another thread before `embedded_asset!` stores it | The bytes come first. Absent from the final logs, though a race's absence proves little |
| MedCity still hung, with no `BOUNDS` line | `timeout` exit 124 | Framing measured meshes, and all 16 of MedCity's draws are GPU-instanced, with no mesh | `StageBounds` measures instanced draws too. A stage that shows nothing now exits with an error after 120 frames, which no test has exercised |
| The first frame of the hummingbird was blank, at any time, until the first time change | See below | `RenderAssetBytesPerFrame` at 256 MiB, copied from `gif_frames` | The render has no cap, Bevy's default |
| 2 `usd_bevy` tests panicked at `c068dc3`: `Cannot allocate an Asset Handle of type Shader` | The gate, on both machines | My `load_shader_library!`, in an app with no renderer, which `UsdGpuSkinningPlugin` allows | `8e98c1e` |
| WASM viewer: `readyMs` always 0 | The viewer's first message | My system order | Removed. `ready`'s own `atMs` is that time |

### The blank first frame

This took several experiments, since two explanations were wrong:

| Frames asked for | Result | What it rules out |
|---|---|---|
| t=0, 12, 40 | First blank, others fine | |
| t=12, 0, 12, 12 | First blank, at t=12. t=0 fine. Repeated t=12 byte-identical | Time 0 being special |
| t=0, 0, 0, 1, 2 | Three identical blanks, then fine | Screenshot state |
| t=0 after 1500 warmup frames (26 s), then t=1 | Still the same blank, then fine | Too little waiting |
| All 43 meshes, at the blank capture | `ViewVisibility` true, 3 of them unskinned | Culling |
| Render phases at the blank capture | Empty, with 43 material instances, 45 meshes and no waiting pipelines | Pipelines not compiled |
| The same scene in the browser | Drawn at t=0 | A library defect independent of settings |

Then each setting that differs from the viewer's was toggled alone. Asynchronous pipelines and no depth prepass stayed blank
(`136cc19485fa18bf`). An 8 ms projection budget gave a partial frame. Removing the upload cap gave `e2bc0809345a3a61`, which is
byte-identical to t=0 drawn later. Upstream's example carries a comment saying this cap can starve materials. Why starved
materials stay empty until a time change was not traced inside Bevy.

## Measured and not fixed

- **A time change on the hummingbird costs about 9 s.** t=0 to 12 took 8725 ms and t=12 to 40 took 8776 ms. A repeated time took
  83 ms. One t=0 to 12 step took 32 s under the old cap, with the box also building for step 3; that outlier was not explained.
  Inferred from `instance.rs`: every time change runs `patch_prim` for every animated prim, and skinning reassembles meshes
  there. It was not profiled: my one `perf` attempt picked a dead process, and `perf_event_paranoid` is 4 with no `sudo` here.
  Kitchen and MedCity have no time steps here.
- **The hummingbird needs 2.05 GB of WASM memory** for a 20.8 MB file, 48% of wasm32's 4 GiB limit. Inferred, not measured: the
  decoded textures, five JPEGs and a PNG, stay in the linear memory. Scenes with larger textures may hit that limit.
- **A hidden tab does not load.** A new tab that was not yet in front had sent no `started` message after 10 s, and it drew once
  a mouse action brought it forward. Inferred cause: Bevy's loop runs on `requestAnimationFrame`, which stops in a hidden tab.
- **`kitchen.png` is not byte-stable.** Three runs gave `7255…` (twice) and `ae01…`. MedCity's and the hummingbird's bytes were
  the same across runs. Not investigated, so a test cannot compare Kitchen by hash.
- **The GPU instancer casts no shadows,** because `UsdGpuInstancing::shadows` defaults to false. MedCity has none.

## Not proved

- The real content domain, Cloudflare, TLS, a token-named origin, the Hub minting one, or the viewer served through Lore or the
  Hub. Here it is a local stand-in, over HTTP on `*.localhost`.
- A render in a real factory sandbox under OpenShell, or as a child of the server. Docker's nvidia runtime is the only path run.
  `openshell/run` still builds the server alone.
- The render while Embedding serves inference, or two renders at once.
- Any browser but this one Chrome, any machine but this Mac, or a browser without WebGPU.
- Playing an animation in the viewer, which shows t=0 only and has no time control yet.
- Materials other than those these three scenes use. The strand and medium shaders never ran, so `strand_material.wesl`,
  `strand_prepass.wesl` and `medium_material.wesl` are not known to compile. Whether sheen and the flat material ran is not
  recorded either: only that nothing failed.
- Framing, clip planes and shadows on scenes of other scales.

Left in place on the box, as scratch: the image `usd-factory:step2` and the volumes `usd-step2-cargo` and `usd-step2-target`.
