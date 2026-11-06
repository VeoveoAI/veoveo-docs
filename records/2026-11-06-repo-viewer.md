# Repo: seeing what people and their agents did

The server that was `lore-api` went live as Repo on Bioma on 2026-11-05 (local time), with its viewer at
`/apps/repo/activity`. It only views: agents do the editing.

## What shipped

| Repository | Revision | What |
|---|---|---|
| veoveo-hub | `faec2a3`, `cdc64fe` | `.../branches`, `.../history/{branch}`, `.../changes/{revision}`; a branch of `@{signature}` reads one revision; an App opens another App's page, and the host hands the page's query as `ui/notifications/tool-input` |
| veoveo-mcp-repo, renamed from veoveo-mcp-lore | `1048b44`, `ed4ce48`, `528e4e8` | Slug `repo`; tools `activity`, `changes`, `file_diff`, `summaries`, `link_pushes`; App `ui://repo/activity`; text diffs with `diffy` |
| veoveo-hub-ui | `632e0fb` | A gallery's adapter can move it, `ui.go` |
| veoveo-mcp-console | `c5fb82a` | An instance's panel links to what was pushed; the page opens at an instance |
| veoveo-template-installation, BiomaAI/veoveo-installation | policy and lock commits | `factory-base`: GET of the three routes and of `/factory/*/instances`; Hub and console locked |

Deployed images: Hub `sha256:a62184bc...`, console `sha256:7e121286...`. Repo serves Lore revision `4f677b9a` from
repository `c7c5e155fc4d9a5db739a60d51b2ac5a`. `veoveo-installer plan` afterward: 18 of 18 steps match.

## Evidence

Component tests, deployed probes and the model run are separate layers.

| Layer | Input | Result |
|---|---|---|
| Hub gate, macOS and box | `docker build --target check .` | 543 passed, 2 skipped |
| Repo gate, macOS and box | The same | 34 of 34 |
| Console gate, macOS and box | The same | 36 of 36 |
| Hub routes, deployed, as `rozgo@bioma.ai` | `n8n`, `preview-samples`, `team-a-2317` | 200 in about 0.2 s each; a real diff and a read at `@{signature}` answer 206 with `Lore-Revision` naming that revision |
| Refusals, deployed | An unknown branch or revision, an impossible signature, no token, an unknown repository | 404, 404, 404, 401, 404 |
| `repo__activity`, deployed, 8 rows | `rozgo@bioma.ai`, 32 repositories | 3161 ms the first time, 2465 ms the second, through the CLI |
| `repo__activity`, deployed, 8 rows | `alex.rozgo@vrx.group`, 17 repositories | 1454 ms, 981 ms; only their repositories; `yours` false on another's push |
| No grant, deployed | `alex.rozgo@vrx.group` on `veoveo-mcp-usd` | `activity` and `link_pushes` "you hold no grant", `changes` and `file_diff` the Hub's 403, `summaries` `unknown` |
| A link without a grant, deployed | `alex.rozgo@vrx.group` given `reader` on `rp-parent-top-2155`, whose links it cannot read, then `none` | `{"action":"added","link":{"reached":false,"tracking":false},"path":"team1","type":"link"}`, with no address, repository, title or revision; the next call after `none` was refused |
| Viewer in Chrome, real clicks | Live Hub | Activity, a push, both diff layouts, a filter, Repositories, Files, Branches, a branch |
| Pictures at a revision, deployed | `viewer-sample`, real files drawn by the deployed USD and Thumb servers | Before and after differ as the commits do: the box pink then green then yellow; the close-up flips with the arrow keys |
| A stage at an old revision, deployed | `/view/lore/{repository}/@ed888b7e.../scene/scene.usda` | The WebGPU viewer opens that version; no USD or Thumb change was needed |
| Factory and viewer, deployed | "See what was pushed" on `n8n / team-a`, then "Serving" | The viewer opened on `team-a-2317`, its tracked branch, at `607d2292`; the factory opened on that instance's panel |

### Model-driven acceptance

`deepinfra/XiaomiMiMo/MiMo-V2.6-Pro`, explicitly selected, in `rozgo@bioma.ai`'s Computer: session
`ses_e50862a65ffenRjyVR20aGs69x`, 77 s, 39,425 tokens in and 1,569 out. The prompt asked what happened in `viewer-sample`, who made the
newest push, what it changed, how `scene/scene.usda` changed, whether it runs, and where a person looks.

10 tool calls, all completed: the skills `hub:repo/browse-repositories`, `hub:console/see-the-factory` and `hub:veoveo/computer`, a tool
search, `repo__list_files`, `repo__activity`, `repo__changes` with `repo__file_diff`, `console__factory` and two shell commands. The recorded
outcomes say what the answer says: `try-yellow`, `rozgo@bioma.ai`, "Try a yellow box on a blue floor", `notes.md`, `scene/scene.usda` and
`textures/wood.png`, the diff's two changed lines, nothing running, and `/apps/repo/activity`.

## Retired

Lore repository `veoveo-mcp-lore` got a revision without `openshell/run`, which ended its instance, and was then deleted by its owner. The
schema `lore_api`, with no tables, and the role `server_lore_api` were dropped by hand, since nothing removes them. The address
`/apps/lore-api/repositories` no longer exists.

## Unplanned changes

- **`@{signature}` replaced a `revision` field on Thumb and USD.** The plan changed three repositories to read an old file. Naming a revision
  where a branch goes changes one line of the Hub and gives the file page, the USD viewer and both servers old versions unchanged.
- **`ContentDiff` is unimplemented in Lore,** upstream too, which an earlier read of its API missed, so Repo makes the diffs.
- **Added files take one side, and a large push opens as a list.** Seen in the first real look, not in the mockup.

## What this does not prove

- **`Build failed` and a link's `Moved`, with the pushes it brought in, were not seen live.** No instance has failed now, and the links on Bioma
  track a branch, so their pins do not move. Both pass unit tests and the viewer against sample data only.
- **`alex.rozgo@vrx.group` was probed through tools,** not in a browser.
- **Times are measured through the CLI** with the Hub's other traffic, on a small deployment, and are no load test.

## Sample

`viewer-sample` (`bc212bf2f806670e2458b58d439e801b`) holds a stage, an image and a note, changed once on `main` and once on `try-yellow`. It stays
for showing the viewer. Its files and messages are synthetic, and the pictures are real renders of them.
