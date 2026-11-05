# The USD server, its viewer and `usd-demo`, deployed to Bioma

2026-11-05 UTC (2026-11-04 and 05 local). Worker: Claude Code (Opus 5.5), with no OpenCode or other model call. Evidence for
steps 5 and 6 of [plan section 18](../PLAN.md#18-usd-a-viewer-and-agent-tools-from-bevy_openusd). Scripts, logs and probe
output are in `~/k3s-builds/usd-20261104/step5/` on the box, with the tool probes under `probes/` and the profiles under
`prof/`. No token or signed URL appears in them or here.

These are deterministic and deployed probes. No model drove them: that is step 8.

**Outcome.** The server runs from a factory sandbox on Bioma. Both tools work through the Hub, a render drew on the RTX 4090
from inside a real factory sandbox with Embedding answering during it, and its PNG is in Artifact and found by meaning. The
viewer opens through `/view/` in Chrome with its panels. A new time on the hummingbird went from 8.7 to 13.7 s to about 150 ms
natively and about 115 ms in the browser. Open findings are in [what is left](#what-is-left).

**Browsers.** Every browser result is from the owner's Chrome through the Claude in Chrome extension. `list_connected_browsers`
showed one browser, the Default profile, signed in as `rozgo@bioma.ai` (Computer A). The `bioma.ai` and `vrx.group` profiles had
no extension connected, so the other account's refusals ran from Computer M's own command line.

## What changed

| Repository | Commits | Change |
|---|---|---|
| `veoveo-mcp-usd` | `c66f340`, `28cecf6`, `d91ec3f`, `b8ea920`, `f3e6dca`, `801ed6d` | The server's domain in place of the template's items, the viewer's panels, the scrubbing fix in the copied `usd_bevy` |
| `veoveo-mcp-embedding` | `3497ce5` | The SDK at `886cb6a`, only so that Artifact can take it |
| `veoveo-mcp-artifact` | `ad23b05` | The same with Embedding `3497ce5`, so that this server and `ArtifactClient` share one SDK. Neither is redeployed |
| `veoveo-hub` | `02090aa`, `61083f8` | `Lore-Revision` on the files route, and a viewer chosen among the servers a person's selection routes to |
| `veoveo-template-installation` | `81201f1`, `5d28c3e` | The factory template's `nvidia` runtime class, and the base policy's Lore files, Artifact uploads and GPU device nodes |
| `veoveo-installation` | `ffa334e`, `06a450e`, `3a8f5b7` | The same with Bioma's values, and the lock |

| Image | Lock key | Digest | Built from |
|---|---|---|---|
| Hub | `hub` | `sha256:339cb0cfaf05b4b7efd9dbef6a5ac07d71355f9f2dde2663b50f69e20288293c` | Hub `61083f8`, which holds step 7's `ba4da62` |

`61083f8` sits on step 7's `ba4da62`, which was on `main`, so this deploy carried it to Bioma.

`veoveo-mcp-usd` is the Lore repository `5957ff7618758c2e5c69e4ce068ca0cd`. `usd-demo` is `e58a50cef0a9e248353ae4b8f102883b`,
revision `e52596d9`, 47 files, 139 MB, downloaded in Computer A from upstream at `5b3ebbc7` in 28 s and pushed in 3 s, with no
tooling left behind and `.thumbs` left out. The plan's 146 MB was an estimate.

## Differs from the plan

- **GPU admission.** The plan said OpenShell admits the device nodes when `/dev/nvidiactl` exists. It also requires a GPU
  resource claim (`boundary_server.rs:140`), which a factory sandbox does not have. In the first sandbox the nodes were there,
  `crw-rw-rw-`, and `nvidia-smi` answered `Insufficient Permissions`. The installation's base policy now admits them. A path
  that does not exist is skipped, so a sandbox whose image does not ask for the GPU gains nothing.
- **The base policy.** It stated Hub's paths exactly, so a factory server could not reach `/lore/` or Artifact's upload URLs. A
  repository's policy may not add to Hub's host in a way a public repository could name, so both are in the base, for any
  factory server, as any factory server may read a file as its caller.
- **A viewer on a factory server.** Step 4 found viewers through `namespaces()`, which leaves out instances, so the Hub never
  chose this server's viewer: the frame opened `file-viewer`, which reads USDZ as a mesh viewer. It now looks among the servers the
  person's selection routes to, as their tools reach them.
- **No tables.** The server keeps nothing but its Tasks, so its schema is empty and the template's store, migrations and `.sqlx`
  are gone.
- **`bevy_egui`'s shader.** It opens with `enable wgpu_binding_array`, which a browser refuses, and the bad pipeline ended the
  app. The viewer replaces it with a copy without its bindless parts.
- **A third tool.** `list_scenes`, since an App may only call its own server's linked tools.
- **A temporary folder.** A render writes the stage's files to a folder for the length of its step, because the child loads them
  through Bevy's asset reader. `inspect_stage` touches no disk.

## The `openusd` dependency

`d10fa4c` is 217 commits past `v0.8.0`, the last release, and the copy uses them, so crates.io does not serve. Cargo fetches a Git
dependency's submodules, and `submodule.*.update=none` in the global Git configuration did not stop it. Measured on the box, cold:
`cargo fetch` of the workspace took 25 s with or without that setting, and left 528 MB, 480 MB of it upstream's test assets. In the
sandbox `/sandbox/.cargo` held 993 MB. So this is recorded, not fixed: it is a small part of a cold build.

## Scrubbing

Profiled with `perf` at 199 Hz on the box, in the factory image, on the 4090, over five frames of the hummingbird.

Before: 64% of all samples were under `spawn_usd_scenes`, and 63% under `route::material::resolve_material`: `texture_pack`'s planes,
`packed_pixels_match` and `blake3`. The material route ran on every animated prim at each new time, and its memo's key held the
time, so each new time packed the same textures again. Nothing about the time was wrong: the repeated-time figure of 83 ms in step 2
was the same time not sampled at all.

The change: a material none of whose inputs vary keeps one result across times, in a memo the root keeps and any change to the stage
empties, and a finished projection hands its memo over. Mip chains of 8-bit textures are built in place through tables of light,
where they had copied each level into `f32`, which was also 68% of the load's CPU after the first fix.

| Native, hummingbird, `render` on the 4090 | Before | Memo only | Final |
|---|---|---|---|
| Stage ready | 6.9 s | 6.2 s | **2.1 s** |
| First frame | 8.9 s | 8.6 s | **4.3 s** |
| First new time | 13.75 s | 3.5 s | **151 ms** |
| Later new times | 8.7 to 9.7 s | 144 to 160 ms | **147 to 155 ms** |
| 60 new times | | | 148 ms each, with its settle frames and capture |

| Browser on the Mac, hummingbird | Step 2 | Local stand-in | Through `/view/` |
|---|---|---|---|
| Ready | 9.2 s | 4.3 to 5.1 s | 9.0 s, with 20.8 MB through the tunnel |
| WASM memory | 2.05 GB | 1.68 GB when ready, 1.76 GB after scrubbing | 1.68 GB when ready |
| Frames a second at rest | 120 | 119 | 119 |
| A new time, panel to drawn | not measured | 112 ms | 107 to 130 ms over five |
| Playing | not measured | 10 frames a second | 9 frames a second |

What is left of a new time is per mesh: 42% of the run is under `route::skel::project`, of which `gpu_skin::attach` is 30%, because
each of the 41 meshes reads its skin, re-skins its normals and tangents for that time on the CPU (`cpu_skin_sample` 15%) and interns a
new mesh. Skipping that while dragging and only moving the joints would be faster, and would change the normals until the drag ends.
That is a design decision, so it is left. `usd_bevy`'s tests hold: 646 pass.

## Memory

Measured in the browser, on the hummingbird: 1.68 GB of WASM memory when ready and 1.76 GB after scrubbing, down from 2.05 GB by the mip change. `Assets<Image>` holds 987 MB
of it in 20 images: six 4096 sources and the textures packed or transformed from them, each with its mips, kept in the main world
because packing and deduplication read them, and cloned once more to upload. WASM memory never shrinks, so what counts is the peak. Moving the
generated images to `RenderAssetUsages::RENDER_WORLD` should cut several hundred megabytes, but `reuse_if` and `intern` compare
pixels, and need another key first. Not done. Kitchen uses 150 MB and the city 61 MB.

## A hidden tab

Not reproduced. Under the extension every tab reports `visibilityState: visible` and keeps drawing, including one opened by
`window.open` from another: a load behind another tab reached `ready` in 5.1 s and measured 118.6 frames a second. So nothing here
measures a really hidden tab. Step 2's stall stands as observed, and its cause, that the browser stops the animation frames Bevy's
runner waits on, stays an inference. Not fixed.

## Checks

| Check | Mac | Linux |
|---|---|---|
| `veoveo-mcp-usd` final tree, `docker build --target check` | rc=0, 682 tests, 20 skipped | rc=0, 682 tests, 20 skipped |
| `veoveo-hub` `61083f8` | rc=0, 517 tests, 2 skipped | rc=0, 517 tests, 2 skipped |
| `veoveo-mcp-artifact` `ad23b05` | rc=0, 117 tests, 9 skipped | rc=0, 117 tests, 9 skipped |
| `veoveo-mcp-embedding` `3497ce5` | rc=0, 41 tests, 5 skipped | rc=0, 41 tests, 5 skipped |
| Installer's check, the template and Bioma at each commit | rc=0 | rc=0 |

## The deploy

`plan` before each `apply`, on the installation's `main`, and each `apply` under `flock ~/k3s-builds/usd-20261104/apply.lock`, since step
7's work deploys too.

| UTC | Action | Result |
|---|---|---|
| 07:43:46 | `plan` at `ffa334e` | rc 2: 14 of 18 match. `templates` (`factory-v1`), `hub-claim`, `hub` and `hub-control-plane` differ. No Computer template or version |
| 07:44 | `apply` | rc 0 in 43 s |
| 07:45:13 | First push of `veoveo-mcp-usd` | Sandbox in about 90 s. It had no GPU access: see [above](#differs-from-the-plan) |
| 07:49 | `plan`, `apply` at `06a450e`, the base policy | rc 0 in 32 s, 18 of 18 after |
| 07:50:29 | Second push, a new sandbox | `nvidia-smi -L` in the sandbox names the RTX 4090. Serving at 08:08:47: **18 min 18 s** cold, the viewer's WASM 5 min 41 s of it |
| 08:32 | `apply` of Hub `61083f8` | Step 7's `apply`, run under the same lock from the same `main`, had already taken it; mine answered "Nothing to change". The pod runs `339cb0cf` |
| 08:32 and 08:49 | Later pushes | Serving about 3 min after each, incrementally |

The cold build ran one job for each of the node's 32 cores, because cargo cannot read the cgroup through the sandbox's policy, and reached
7.75 of the sandbox's 8 GiB. `openshell/run` now sets `CARGO_BUILD_JOBS=4`. That cold build has not run again.

At the end `plan` answered 18 of 18. Computers A and M show 0 restarts and 9 h of age, so no Computer restarted, and neither `computer-v1` nor
the Computer version changed. `embedding-runtime` shows 0 restarts. Status warns that the owner is the latest pusher of 14 instances, above the
soft cap of 4, which was already so.

## Probes on the deployed stack

Through the Hub with the SDK's CLI in the Computers, no model. Output is in `probes/`.

| Call | As | Result |
|---|---|---|
| `tools` | A, M | Both list `usd__inspect_stage`, `usd__list_scenes` and `usd__render_stage` |
| `usd__list_scenes {}` | A | 647 ms, the repositories A holds, by name |
| `usd__list_scenes {repository}` | A | 842 ms, nine scenes |
| `usd__list_scenes`, `usd__inspect_stage` on `usd-demo` | M | **403** "No access to the repository", from the Hub, in about 1 s |
| `usd__render_stage` on `usd-demo` | M | The Task ends "reading the stage: the Hub answered 403" |
| `usd__inspect_stage` of a missing path, a missing branch | A | 404 "No such file" |
| `usd__inspect_stage` of `../x.usd` | A | Refused before any read: "invalid typed tool arguments" |
| A render through a camera the stage lacks | A | The Task fails: "the stage holds no camera at /No/Such" |

| `usd__inspect_stage`, as A | ms | Layers | Bytes | Prims | Time codes | Cameras | Variant sets | Payloads | Missing |
|---|---|---|---|---|---|---|---|---|---|
| `hummingbird` | 4109 | 1 | 20762735 | 84 | 0 to 264 at 60 | 0 | 0 | 0 | 0 |
| `franka` | 2259 | 14 | 10076551 | 43 | -1 to 0 at 60 | 0 | 2 | 0 | `Materials/OmniPBR.mdl` |
| `kitchen_set` | 1778 | 1 | 5128790 | 2742 | 0 at 24 | 0 | 392 | 425 | 0 |
| `tractor` | 1770 | 2 | 7787492 | 88 | 0 at 24 | 0 | 0 | 0 | `textures/color_0C0C0C.exr` |
| `ur10_pick` | 1243 | 2 | 3339970 | 138 | 0 to 360 at 30 | 0 | 0 | 0 | 0 |
| `med_city` | 960 | 1 | 1724223 | 21 | 184 at 24 | 1 | 0 | 0 | 0 |
| `human_female` | 8034 | 1 | 45754253 | 224 | 101 to 129 at 24 | 0 | 8 | 0 | 0 |
| `chameleon` | 3599 | 1 | 15622506 | 203 | 0 to 607 at 30 | 0 | 1 | 0 | 0 |
| `cow` | 2673 | 1 | 6610718 | 14 | 0 at 24 | 0 | 0 | 0 | 0 |

**Franka loads.** Its binary references resolve: 14 layers from Lore through the Hub, and it draws through `/view/` and in a render. It names
`Materials/OmniPBR.mdl`, which the Hub answers 404 for, and its surfaces draw white. That the one causes the other is an inference.

## Renders in a real factory sandbox

This had never been proven. `usd__render_stage` as A, a Task; the child in the sandbox `b099-804e391506fc`, runtime class `nvidia`, 4 CPUs and 8 GiB, no
Kubernetes GPU claim. Embedding was called in a loop during each, through the Hub with real inference. A call cut off when the loop stopped is not counted.

| Render | Task | Child | PNG | sha256 | Embedding during it |
|---|---|---|---|---|---|
| `hummingbird` at 120, first | 13670 ms | 7112 ms | 478607 bytes | `7a3179ac` | 7 of 7, mean 747 ms, max 1749 ms |
| `med_city` through `/Cameras/main_cam` | 3716 ms | 1240 ms | 988317 bytes | `ed99f35b` | 2 of 2, 306 ms |
| `franka`, `Gripper=AlternateFinger`, an eye and a focus | 5800 ms | 1140 ms | 57905 bytes | `4ae38f09` | 4 of 4, 473 ms |
| `chameleon`, `Material=Camo` | 5884 ms | 1590 ms | 152124 bytes | `27b08f76` | 4 of 4, mean 451 ms, max 471 ms |
| `hummingbird` at 120, after the mip change was built | 9066 ms | 3929 ms | 287740 bytes | `11f962a1` | 6 of 6, mean 455 ms, max 470 ms |

Each answers `adapter: NVIDIA GeForce RTX 4090`. The GPU's memory peaked at 8809 MiB with Embedding's 4.6 GB on it, and its use at 27%.

The PNGs were downloaded from Artifact and opened: the hummingbird in flight and the city from its own camera are right. Each is 1280x720 RGBA. The Artifact
`hummingbird-t120.png` holds in its metadata `repository`, `branch`, `path`, `revision` `e52596d9…`, which is `usd-demo`'s pushed revision, `address`, `taskId`, `time`, `camera` and `variants`.

`artifact__search_knowledge` for "a hummingbird with a red throat, hovering" answers that render first of four, by meaning, with no knowledge contract on this server.

The first variant render failed honestly: it had gathered the default selections' files only, and the child answered "unresolved Reference layer". It then gathered the variant's only, and
the loader, which composes the default first, failed the other way. It now gathers both.

## The viewer through `/view/`

Chrome's Default profile, through the extension, on `f3e6dca`. Screenshots were read as each step ran.

| Step | Result |
|---|---|
| `https://veoveo.bioma.ai/apps/usd/scenes` | The App lists repositories by name through the bridge; `usd-demo` lists nine scenes with sizes |
| Choosing `hummingbird` | `ui/open-link` opens `/view/lore/{id}/main/hummingbird/hummingbird.usdz`, framed on `{token}.veoveo-bioma.space` with the platform's sandbox, and the Hub redirects to the viewer |
| The viewer's files | Through the Hub at `/_veoveo/viewers/usd/`: 8769612 bytes of gzip for 33402448 of WASM, `application/wasm`, `no-cache`. Directly, `/instances/{deployment}/usd/viewer/` answers 200 and a path outside the route 404 |
| Scenes | Lists the item's nine from the origin's listings; choosing one reloads the frame on it |
| Prims | The tree opens lazily, `SkelRoot` to `Xform`, with types |
| Variants | Franka's `Gripper`, and `Material` on the chameleon, change the stage live |
| Payloads | Kitchen: unloading `/Kitchen_set/Arch_grp/Kitchen_1` removes the room, prims 2742 to 2240; loading it brings it back |
| Time | Scrubbed on the hummingbird, `human_female` and `ur10_pick`. Play runs |
| Cameras | The city's `/Cameras/main_cam` shows the same view as its render; dragging returns to free orbit with its own projection |
| Orbit, zoom | Drag and scroll move the camera; scrolling over a panel scrolls the panel and leaves the stage (after a fix found here) |

| Through `/view/` | Ready | WASM memory | Frames a second | A new time |
|---|---|---|---|---|
| `hummingbird` | 9.0 s, with 20.8 MB through the tunnel | 1679 MB | 119 | 107, 111, 114, 122, 130 ms |
| `kitchen_set` | 5.8 s | 135 MB | 91 | |
| `human_female` | 11.8 s | 796 MB | 112 | 384, 387, 417 ms |
| `ur10_pick` | 2.1 s | 71 MB | 118 | |
| `tractor` | 3.1 s | 82 MB | | |
| `cow` | 2.4 s | 227 MB | | |
| `franka` | 5.4 s | 92 MB | 119 | |
| `med_city` | 1.6 s | 61 MB | | |
| `chameleon` | 5.1 s | 431 MB | | |

A kitchen at 91 frames a second is slower than step 2's 118. With the panels' lists open it was 71, so long lists now start closed.

**Cross-account.** Only one browser is connected, so M's refusals are the command-line ones above, not a second browser opening `/view/`.

## What is left

- **A live variant switch on Franka.** Switching `Gripper` to `None` or `AlternateFinger` in the viewer shows a large white block, which a fresh load does not (`render --variant /panda Gripper None`, and the Task above).
  I did not find why. For `AlternateFinger` its layers are also not loaded, as the design says; `None` names none, so that is not the whole cause.
- **`Material=Camo`** draws the chameleon white, live and fresh alike, so that is the material, not the switch. Not investigated.
- **Scrubbing beyond 10 frames a second** on a skinned stage needs the decision above. `human_female` at about 400 ms a new time is not fluid.
- **Memory:** as above.
- **A hidden tab:** not reproducible through the extension.
- **An `egui` slider** ignores a click whose press and release arrive in one frame, as the extension's do. A drag works. Not checked with a real mouse.
- **Other profiles:** `bioma.ai` and `vrx.group` have no extension, so this ran in one profile, and a second person's browser was not exercised.
- **Not proved:** the cold build with `CARGO_BUILD_JOBS=4`; a stage with a dependency outside its folder; a share link's origin taking this viewer, which is step 7's; any browser but Chrome; a run under OpenCode, which is step 8.
