# file-viewer in the platform's preview frame

2026-11-04. Coordinator: Claude Code (Opus 5.5). The owner asked whether to use
[`flyfish-dev/file-viewer`](https://github.com/flyfish-dev/file-viewer). Evidence for
[plan section 18](../PLAN.md#18-usd-a-viewer-and-agent-tools-from-bevy_openusd). No product code changed and
nothing was deployed.

## The project

Read on this date. Created 2026-05-18, 2,733 stars, 286 forks, one main contributor (794 commits), active, latest
release v3.3.3 on 2026-10-31. Its own source is Apache-2.0. Its README says the DWG, DWF and DWFx runtime is
AGPL-3.0-only. It describes itself as a viewer, not an editor. Its format list has no USD.

`@file-viewer/web-full` 3.3.3 from npm is 39.6 MB packed and 100 MB unpacked: 46 MB WASM, 27 MB renderers, 22 MB
vendor, 2.2 MB entry script. Its dependencies include the CAD packages, so the plan uses the light package with
presets instead. The presets were not tried.

## The test

`fv.mjs`, in `~/k3s-builds/usd-20261104/` on the box, served its prebuilt `dist/` and the project's own sample files
from a local stand-in for a repository's origin. The owner's Chrome loaded them through the Claude in Chrome extension.
Each opened in a Hub-like page whose frame had
`sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"`, after a sign-in redirect inside
the frame. Two early blank runs were faults in the test: the page declared no charset, and the asset URL was relative.

| File | Result, from screenshots |
|---|---|
| `.docx` report | Rendered with its table, search and zoom |
| `.xlsx` sheet | Rendered as a grid with row and column headers |
| `.pptx` deck | Rendered with a full-bleed image and a slideshow button |
| `.pdf`, a real 14-page paper | Rendered with page thumbnails and search |
| `.glb` model | Rendered in 3D with fit, rotate, wireframe, grid and axes controls |
| `.step` model | Rendered through its OpenCascade WASM worker |
| `.psd` file | Rendered with its layer list and per-layer visibility |
| `.mp4` video | Player with controls |
| `.md` file | Rendered with tables and highlighted code |

The nine loads sent 42 MB of viewer files in total.

## Requests leaving the origin

Six of those files were then opened in a tab under a policy with no outside sources:
`default-src 'self' blob: data:; script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' blob:; connect-src 'self' blob:
data:; ...`, with no `'unsafe-eval'`. All six rendered. `read_network_requests` listed 59 requests, all to its own
origin, `data:` or `blob:`. The console showed no policy violation. A static search of `dist/` found no analytics or
beacon calls. Its README says that only the CDN build of the IIFE fetches asset packs from a CDN.

## Not tested

Behind the real Hub, with Lore or Artifact as the source, large files, the light package, and interaction beyond what the
screenshots show. Search, slideshow, layer toggles and 3D controls were seen and not exercised.
