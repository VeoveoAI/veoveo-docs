# The USD viewer's variants, Camo and its time readout, deployed to Bioma

2026-11-05 UTC. Worker: Claude Code (Opus 5.5), with no OpenCode or other model call. Follows
[what was left](2026-11-05-usd-server-and-viewer.md#what-is-left) of steps 5 and 6 of
[plan section 18](../PLAN.md#18-usd-a-viewer-and-agent-tools-from-bevy_openusd). Scripts, logs and renders are in
`~/k3s-builds/usd-20261104/viewer-fixes/` on the box. No token or signed URL appears in them or here.

These are component tests and deployed probes. No model drove them: that is step 8.

**Outcome.** A live variant switch on Franka now ends as a fresh stage does, in the browser too, where it reads the files a selection
names first. `Camo` draws its texture, without the camouflage itself, which only RealityKit can draw. The time and readout stay readable.
Fixes went in `usd_bevy` and `usd-viewer`, so only `veoveo-mcp-usd` was redeployed.

**Browsers.** Chrome's Default profile through the Claude in Chrome extension, signed in as `rozgo@bioma.ai`. `list_connected_browsers` showed that one browser, so no other profile was tried.

## Causes

### The large white block

Dumped by a throwaway test: every prim's path, transform, mesh and material after a live switch, against a stage opened with the selection.

| `/panda Gripper=None`, before | Prims |
|---|---|
| Default | 418 |
| Opened with the selection | 322 |
| Live switch | **418** |

Franka's variants author `over "panda_hand" { over "geometry" (prepend references = @Props/panda_hand.usd@) }`. `collect_variant_specs` patched an
`over` alone, so that a switch leaves the rest of a stage alone. But what a reference brings is named nowhere in the variant, so the old prims
stayed and the new ones never came. The stale `panda_leftfinger` mesh had a world scale of 1 where its neighbours had 0.01. It is authored in
centimetres, about 5.4 units tall at that scale, in a stage 1.1 tall: that is the block. Why that one lost its scale was not traced, as the entity no longer exists.

An `over` holding `references`, `payload`, `inheritPaths`, `specializes`, `variantSetNames`, `variantSelection` or `active` now scopes its whole subtree.
After it, the same dump shows no difference between live and fresh for `Gripper=None`, `AlternateFinger`, `Default` and `Mesh=Quality`, in prims, transforms, meshes and materials.

The despawn that fix brings logged "Could not despawn entity" for each child already gone with its parent. It now checks first, and the console holds none.

### Layers a selection names

In the browser the loader composes the default selections only, and composing cannot wait for a read. The panel now hands a choice to `reads.rs`, which
composes the source under it with `missing_dependencies_under`, reads what is missing from the origin through Bevy's asset reader, the path the loader uses, and repeats until
nothing it can read is missing. The stage then takes the files and the selection in the same frame. A stage in a `.usdz` skips this, since a package holds all it may name, and asking would compose the kitchen again.

`Mesh=Quality` also failed a **render**: "cannot read texture .../Logo_Textures_Albedo.png". `decode_missing_textures` read only what the snapshot held, and the
default selections do not name that file. It now asks the source's fetcher. This was found by rendering each variant, and no earlier probe had tried it.

### `Camo`

Read with `pxr`, from the `usd-core` package, on the asset:

```text
outputs:surface connects to [/Root/chameleon_mtl/Looks/chameleon_camo_mat/UsdPreviewSurface.outputs:surface]
that prim is valid: False
mtlx: [/Root/chameleon_mtl/Looks/chameleon_camo_mat/UnlitSurface.outputs:out]
```

So the asset is partly at fault: its `outputs:surface` connects to a shader that is not there. `resolve_surface_shader` took the first connection as the surface, found no
inputs, and the default material is white. The material's real surface is `ND_realitykit_unlit_surfaceshader`, a graph for RealityKit:

```text
color = mix(bg: dot(mix(bg: bc.jpg, fg: power(saturate(bc.jpg)), mask)), fg: background_blur * dot(..) * mask, mask)
        + (environment_radiance.diffuse + .specular) * ao.jpg
```

A connection to nothing is now skipped, the unlit surface reads `color` as a lit surface's base color, and `ND_dot_*`, MaterialX's pass-through, reads `in`. Existing fallbacks take
`bg` of a mix and `in1` of an unresolved sum, so `color` arrives at `chameleon_bc.jpg`. **So `Camo` now looks like the texture, and the camouflage does not show:** the chameleon does not take
on what is behind it, because that needs RealityKit's blurred background, which nothing here samples. The chameleon is also a little flatter than `Green`, as this graph's normal map feeds only `environment_radiance`.

### The readout

`egui`'s slider chooses its decimals from its range, and an empty range gave `0.000000000000000`, which pushed the readout past the panel. It now shows at most two decimals, and the slider's width leaves the readout's measured width.

The panel also re-read its facts on the frame after a choice, which could run before the switch landed. It now reads when `UsdSceneInstance` changes.

## What changed

| Repository | Commit | Change |
|---|---|---|
| `veoveo-mcp-usd` | `7654f80` | `usd_bevy`: the scope, the despawn, the variant's texture, the surface output, RealityKit's surface, `UsdSource::add_file` |
| `veoveo-mcp-usd` | `9491e17` | `usd-viewer`: `reads.rs`, a `selected` message, the time and readout. The design, and `UPSTREAM.md` in the commit above |

## Checks

| Check | Mac | Linux |
|---|---|---|
| `docker build --target check`, final tree | rc=0, 687 tests, 20 skipped | rc=0, 687 tests, 20 skipped |

The first Linux run failed one test, `nested_package_dependency_reload_preserves_two_live_instances`, which timed out with the stage held in `Failed` while a later reload was good. Alone it passed 12 of 12, and the next full run passed.
Nothing here touches reload, and that matches what [`UPSTREAM.md`](https://github.com/VeoveoAI/veoveo-mcp-usd/blob/main/UPSTREAM.md) says of leaving out the patched `bevy_asset`: hot reload is unordered. That is an inference. Under load this test can still fail a gate.

New tests: `a_switch_of_reference_matches_a_fresh_stage`, `a_selection_with_its_files_matches_a_fresh_stage`, `a_selection_gathers_its_files_by_their_asset_paths`, `a_fetching_source_reads_a_file_nothing_composed_asked_for` and `a_realitykit_surface_reads_its_color_through_the_graph`. The readout has no test, since it needs a browser.

## The deploy

Pushed to the Lore repository `veoveo-mcp-usd` from Computer A at 09:46:47, as revision `bf7295ab`. Applied by 09:47:16 and serving at 09:49:52, **3 min 5 s**. The sandbox `b099-804e391506fc` stayed, with 0 restarts, so **this was not a cold build, and the cold build with `CARGO_BUILD_JOBS=4` is still not proved.**
No installer `apply` ran, and `component-lock.json` does not name this server.

## In Chrome, through `/view/`

The real frame, `sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"` and `allow="webgpu; autoplay"`, on the token origin. `ms` is the new `selected` message: from the choice until the stage has the selection, over the tunnel.

| Choice | ms | Result, from the screenshot |
|---|---|---|
| Franka, `Gripper=None` | 39 | No hand and no block |
| `AlternateFinger` | 1105 | The flex fingers, read as two layers |
| Back to `Default` | 32 | The first fingers |
| `Mesh=Quality` | 6160 | Detailed meshes with cables and decals |
| Chameleon, `Material=Camo` | 9 | Its texture, not white |

Each was set beside `usd__render_stage` of the same selection in the factory sandbox, on the 4090: `None` 5399 ms, `AlternateFinger` 5761 ms, `Mesh=Quality` 9885 ms, `Camo` 6591 ms, `adapter: NVIDIA GeForce RTX 4090`, with Embedding answering all 19 calls that finished during them. They show the same stage from another camera, and were compared by eye. Those four artifacts are deleted.
`pxr` agrees that the cables are in the asset: `panda_link0/geometry` under `Quality` reaches z = -0.9 where the arm's base is at 0. A viewer does not frame the stage again, so they run off the screen.

A local run of the same viewer, `AlternateFinger` and then `Mesh=Quality`, read 18 files under `DetailedProps/`, five of them textures, and `DetailedProps/OmniPBR.mdl` answered 404, which the stage shows without, as a fresh load does.

| Scene | Ready | WASM memory | Notes |
|---|---|---|---|
| `kitchen_set` | 1.1 s, from the browser's cache | 137 MB | 111.7 frames a second, the readout `0.00 time 101 fps, 137 MB`. Unloading `/Kitchen_set/Arch_grp/Kitchen_1` removes the room, loading brings it back |
| `hummingbird` | 8.2 s | 1683 MB | New times 107, 99, 106 and 104 ms, as before |
| `human_female` | | 800 MB | Draws, ready at 10.9 s after the page's start |
| `franka` | 3.3 s | 93 MB | 119.8 frames a second |
| `chameleon` | 3.6 s | 448 MB | 120.3 frames a second |
| `cow`, `med_city`, `tractor`, `ur10_pick` | | 231, 61, 84, 72 MB | Draw, ready within 3.6 s of the page's start |

## What is left

- **`Camo`'s camouflage,** as above. Drawing it would mean sampling the background behind a surface, and this work did not try.
- **The cold build** with 4 jobs.
- **Skinned scrubbing** and **memory,** left as the [earlier record](2026-11-05-usd-server-and-viewer.md#what-is-left) has them.
- **`Robotiq_2F_85`:** this selection authors no children in the root layer, as `None` does. `configuration/franka_Gripper_Robotiq_2F_85.usd` exists, and this work did not open that selection.
- **Not proved:** any browser but Chrome, another profile, a selection whose file the Hub refuses rather than lacks, and a run under OpenCode, which is step 8.
