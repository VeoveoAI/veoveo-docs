# Galleries, thumbnails and the servers behind them

2026-11-05 and 06 UTC. Worker: Claude Code (Opus 5.5). OpenCode ran last, with `deepinfra/XiaomiMiMo/MiMo-V2.6-Pro` selected explicitly. Evidence for
[plan section 19](../PLAN.md#19-galleries-seeing-what-is-there) and [M19 to M24](../QUALIFICATION_CHECKLIST.md). Scripts and output are in
`~/k3s-builds/thumbs-20261105/` on the box. No token, share link secret or signed URL appears here.

**Outcome.** `/` is a home page, and the Lore, Artifact and USD Apps are galleries with a picture of each file and a closer look before opening one, in all three browsers.
Thumbnails follow the file's access: refused without a grant, granted with one, refused again on the next request after it goes, whatever is kept. A renderer in the real
factory sandbox reaches neither the server's key nor the network. See [what this does not prove](#what-this-does-not-prove).

## What runs

| Piece | Revision | Note |
|---|---|---|
| `veoveo-hub-ui` | `0da3a4b` | New. The look and one files and media browser, plain CSS and JavaScript, no build step, no deployment |
| `veoveo-mcp-thumb` | `5599c04`, Lore `cbeecb0f` | New factory server. Slug `thumb`. A file in, a small picture out. It knows nothing of galleries |
| `veoveo-mcp-lore` | `b4cda2b`, Lore `f3f5667a` | New factory server. Slug `lore-api`. Lists what repositories hold and shows them as a gallery. Where Lore's API grows |
| `veoveo-mcp-usd` | `bfd6567`, Lore `afefe0f5` | A `thumbnail` tool, and the gallery |
| `veoveo-mcp-artifact` | `bbe5a9c`, image `sha256:8d25fca2f0a4…` | A `thumbnail` tool, and the gallery |
| `veoveo-hub` | `2633d4a`, image `sha256:f76f091696c8…` | `GET /` |
| `veoveo-hub-sdk` | `8ed1d5e` | `AppHtml::new`, added and not used: moving servers to it would drag in Embedding and the rest, so servers stay on `14a649f` |
| Template, Bioma | `18650e9`, `4ce2303` | Factory base policy gains GET of `/artifacts/**`; Artifact's policy gains `thumb__thumbnail`. `plan` 18 of 18 |

## The trial, before anything was built

The 12 samples in throwaway containers, no network, read-only samples. Each picture was looked at, because the sizes alone misled: most of the first run's answers were placeholders.

| Candidate | Result |
|---|---|
| Thumbrella 2.3.1, as published and with F3D and Poppler | Placeholder cards for `docx`, `xlsx`, `pptx`, `md`, `html`, since it only reads a picture a file already holds. PDF, PNG and video real. 3D fails on F3D 3.x: it passes `--dry-run` and `--quiet` |
| Thumbelina | Real pictures of Office (1.2 to 3.4 s), PDF, Markdown and HTML through Calibre, video, PNG, GLB through Blender (3.9 s). Icons for STEP, DWG, USD. It ran not root, no capabilities, read-only root; only its firewall complained. Its server has a fixed port, a fixed `/tmp`, 14 synchronous `execSync` calls and no time limit, and buffers each file in memory |
| Debian's F3D 3.1.0 | `egl: unavailable`: its VTK has none |
| F3D 4.0.1's own release | GLB 375 ms, STEP 305 ms on the 4090. Its USD plugin crashes on the hummingbird, and is not used |

So Thumbelina's commands, as a recipe, each with its own limits, and F3D's release. Reading a 21.7 MB MP4 from its first 8 MiB and last 4 MiB drew a frame in 137 ms.

## Measured, deployed

All through the Hub, as the two people, with `veoveo-hub-sdk-cli`, whose start-up costs about 600 ms of every time here.

| File | First call | Then |
|---|---|---|
| `report.docx` | 2,886 ms | 680 ms |
| `finance.xlsx` | 2,484 ms | 676 ms |
| `deck.pptx` | 3,784 ms | 698 ms |
| `markdown.md` | 2,325 ms | 634 ms |
| `index.html` | 2,277 ms | 650 ms |
| `paper.pdf` | 1,349 ms | 681 ms |
| `design.psd` | 843 ms | 656 ms |
| `video.mp4`, 21.7 MB | 5,005 ms | 697 ms |
| `pic.png` | 996 ms | 682 ms |
| `fox.glb` | 1,489 ms | 646 ms |
| `model.step` | 1,244 ms | 651 ms |
| A 297 MB MP4, an artifact, read from its two ends | 13,491 ms | 1,232 ms |
| `hummingbird.usdz` | 13,600 ms | 1,182 ms |
| `sample.dwg` | No picture, as designed | |

206 kept files, both sizes and the marks of failures, took 5.6 MB. The hummingbird's small picture is 8,933 bytes. The picture of the hostile page shows its static text, since LibreOffice runs no script.

## Access

| As M | Result |
|---|---|
| No grant: Lore through Thumb, USD through Thumb, USD, Lore through `lore-api`, all already kept | `403`, whatever is kept |
| No grant: an artifact through Thumb, through Artifact | `no such artifact`; Artifact's App shows no picture |
| Reader on `preview-samples` | A picture, and the top folders |
| Grant removed | `403` on the next request |
| Read on an artifact | A picture |
| Grant removed | No picture on the next request |
| In the browser, a grant on `usd-demo` | All nine scenes on reloading |
| In the browser, the grant removed with the page open | The closer look reports the Hub's `403`. A reload shows no scenes. A thumbnail already on the page stays until then |

M reads through `lore-api` with no grant on `veoveo-mcp-lore`, the repository the server is deployed from.

## Confinement, in the real sandbox

`insb.sh` and `insb2.sh`, inside Thumb's sandbox.

| | Unconfined | Confined | `--tmp`, LibreOffice's |
|---|---|---|---|
| Read the server's key | **allowed** | refused | refused |
| The internet with `curl` | **200** | refused | refused |
| Loopback, the proxy | | refused | refused |
| Read or write a kept thumbnail | | refused | refused |
| Read the source | | refused | refused |
| The server's environment, memory | | refused | refused |
| Write `/tmp` | | refused | allowed |
| Its job, system files, run a program | | allowed | allowed |

Confined, `f3d` reports `egl: available`, on the RTX 4090. `/tmp` held nothing when read.

## Browsers

Real clicks through the Claude in Chrome extension. A is `rozgo@bioma.ai` in Default and in the `bioma.ai` profile, M is `alex.rozgo@vrx.group`.

| Check | Default, A | `bioma.ai`, A | `vrx.group`, M |
|---|---|---|---|
| The home page, by the catalog | | Yes | Yes |
| The Lore gallery: repositories, folder mosaics, every kind | Yes | Yes | Only M's repositories |
| The Artifact gallery: filters, closer look, Open | Yes | Yes | "No artifacts here." |
| The USD gallery: nine scenes, closer look, arrow keys, list view, Open in the viewer | Yes | | "No repository you can read holds a scene."; with a grant, yes |

The home page gained **Repositories** on its own when `lore-api` registered, and each card's text is what its server declares.

## OpenCode

Session `ses_e51bbba0fffe2fdId6FiAIyruo`, 42.8 s, 4 calls, USD 0.0090, **0 asks**: "What is in the Lore repository called preview-samples?…" It loaded `hub:lore-api/browse-repositories`, called `lore-api__list_files` and answered with each file's size.

## What testing found

| Found by | What | Fix |
|---|---|---|
| The deployed probes | Every LibreOffice file failed under confinement. `strace` showed `bind` on `/tmp/OSL_PIPE_…` refused, and LibreOffice has no setting to move it | `--tmp` for that step, and one LibreOffice at a time |
| The deployed probes | `artifact__thumbnail` empty: Artifact's policy admitted only `embedding__embed` | `thumb__thumbnail` added; the rule renamed `server_calls` |
| Registration | The slug `lore` answered 500: `must be able to SET ROLE "server_lore"`. `server_lore` and schema `lore` hold Lore's own tables. The database refused, and they are as they were | The slug is `lore-api` |
| A browser | Six folder cards stopped every picture: a cover held its turn while waiting for pictures that need one | A cover lists in its turn, and each picture takes its own |
| A browser | Covers of code repositories were small print and white squares, and ran LibreOffice for each | Covers show what looks like something |
| A browser | A tall page was cropped in the closer look | The picture fits its frame |
| Reading the plan again | Moving to a new SDK revision drags in Embedding and everything it calls, for a five-line convenience | Not moved; a server loads its page from a temporary file |

## Mistakes

- A tool call renaming the repository to `gallery` was reported as rejected, and I told the owner it had not run. It had run. It was found on the next read, said so, and renamed again.
- `Files`, then `gallery`, were wrong names, and the server first also held the Lore gallery. The owner put each piece in its lane: `veoveo-mcp-thumb` and `veoveo-mcp-lore`.
- I checked the slug `lore` against reserved names and routes, not the database, and said it was free.
- A commit of Thumb that did not compile reached a local check, and a shell loop in zsh made no bundles. Neither was pushed.

## What this does not prove

- Rendering a file built to exploit LibreOffice, FFmpeg or ImageMagick. The limits were tested with a shell in their place.
- DWG, a `gltf` with separate buffers, and an artifact that is a USD stage have no thumbnail. The DWG sample was opened by its viewer earlier, not again here.
- A gallery with thousands of files, and a first view of many Office files, which draw one at a time.
- Audio and SVG: no sample of either was drawn.
- Coming back from `/view/` starts a gallery over.
- n8n's Assistant, other people's Computers, and browsers other than Chrome.

## Left open

- A is the latest pusher of 16 factory instances, above the cap of 4, which warns and when enforced refuses. Most are old test repositories.
- `.worktrees/factory-hub`, branch `factory-state`, holds another agent's uncommitted work on audit and admin code, and was left alone.
