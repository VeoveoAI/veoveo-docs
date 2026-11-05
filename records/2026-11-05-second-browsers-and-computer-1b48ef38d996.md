# A second person's browser, and Computer version `1b48ef38d996`

2026-11-05 UTC. Worker: Claude Code (Opus 5.5). OpenCode ran last, with `deepinfra/XiaomiMiMo/MiMo-V2.6-Pro` selected explicitly. Evidence for
[M17](../QUALIFICATION_CHECKLIST.md) and the changed [K8](../QUALIFICATION_CHECKLIST.md#k-skills-and-groups). Scripts and output are in
`~/k3s-builds/usd-20261104/m17/` on the box. No token, share link secret or signed URL appears here.

**Outcome.** Previews, the viewer, the Apps and every refusal behave the same in the `vrx.group` and `bioma.ai` browsers. Removing a grant or a link stopped an open page on its next
request. The owner then decided three changes, now deployed: no skill asks, in OpenCode or n8n's Assistant; `uv` comes installed; Computers and factories reach 20 listed bare names, up from 2. In
OpenCode, on the new version, two runs asked nothing. n8n's Assistant was not run. See [the boundaries](#what-this-does-not-prove) and [what the owner still has to decide](#open).

## Browsers

Each is the owner's Chrome through the Claude in Chrome extension, told apart by the Computer `/computer` goes to.

| Extension device | Person | Computer | Role here |
|---|---|---|---|
| `f190c5e3…` | `rozgo@bioma.ai` | A, `01a16a8c…` | The Default profile used so far; the token comparison |
| `b0214925…` | `rozgo@bioma.ai` | A, `01a16a8c…` | New. The same person in a second browser session |
| `3020a74a…` | `alex.rozgo@vrx.group` | M, `01a176b7…` | New. The second person |

## The second person's browser

Throwaways: `m17-a` of A and `m17-m` of M, from step 4's samples, and artifacts of each.

### Refused, with no grant, in M's browser

| Request | Answer |
|---|---|
| `/view/lore/{usd-demo}/main/kitchen_set/kitchen_set.usdz` | 403, "You cannot open this file", no frame |
| `/view/lore/{m17-a}/main/secret.txt` | 403, the same |
| `/view/artifact/{A's private}/a%20private.pdf` | 404, "No such file", no frame |
| `/view/lore/{unknown}/main/x.txt` | 404 |
| `/lore/local/repositories/{m17-a}/files/main/secret.txt`, a page load | 401, missing authorization |

`hub.content_token` afterwards, read-only: M's Computer held a row for `m17-m` alone. The rows of A's private artifact seen there belong to A's Computer, from the owner opening it.

The USD App listed M's repositories, and the library M's artifacts alone. The same refusals in `bioma.ai`'s browser, of M's items: 404 for the artifact, 403 for the repository.

### Previews

From the screenshots, through `/view/`, in the Hub's frame, whose attributes M's page read back as `sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"` and `allow="webgpu; autoplay"`.

| Browser | Files | Result |
|---|---|---|
| M, its own `m17-m` | `report.docx`, `finance.xlsx`, `deck.pptx`, `paper.pdf`, `sample.dwg`, `fox.glb`, `model.step`, `design.psd`, `video.mp4`, `markdown.md`, `pic.png`, `site/index.html` | All 12 render. `site/index.html` reports its siblings 200, WASM, WebGL2, a WebGPU adapter and IndexedDB |
| `bioma.ai`, `preview-samples` | `report.docx`, `finance.xlsx`, `deck.pptx`, `paper.pdf`, `sample.dwg`, `fox.glb`, `site/index.html` | All render |

One `a granted.pdf` was still blank in the frame at 5 s, with its bytes right when read directly. It did not recur: `m own.pdf` drew by 3 s. Not traced; a first load of a new origin's viewer is the inference.

### A person with a grant

A shared `usd-demo` (`reader`), `m17-a` (`reader`) and an artifact (`read`) with M at 16:39:40 to 16:40:53.

| What, in M's browser | Result |
|---|---|
| The link an agent gives, `kitchen_set.usdz` | Draws through the USD viewer, 112 fps, 137 MB |
| `hummingbird.usdz` | Draws, 111 fps, 1679 MB |
| `a granted.pdf`, read on its origin | `application/pdf`, `nosniff`, `private, no-transform`, 1,016,315 bytes, SHA-256 `3662ff519e485810`, equal to the file's |
| `usd__render_stage` as M, from M's Computer | 9.8 s, 4.0 s of it rendering, RTX 4090, 255,838 bytes, in M's Artifact, `from usd` |
| A real click on that render in M's library | Opens through `ui/open-link`, draws |

### Removing access from an open page

M's page polled the file on its own origin every 500 ms with `cache: no-store`; A removed the access from the box.

| Removed | Last success | First refusal | Every later poll | Reopening `/view/` |
|---|---|---|---|---|
| `m17-a`'s grant | 16:41:51.754, 200 | 16:41:52.753, 403 | 403 | 403 |
| The artifact's grant | 16:50:37.692, 206 | 16:50:38.754, 404 | 404 | 404 |
| `usd-demo`'s grant, with its viewer open | 16:52:31.109, 206 | 16:52:31.618, 403 | 403 | 403 |
| The share link | 16:53:00.877, 206 | 16:53:01.378, 404 | 404 | |

So the next request after each removal was refused, within the 500 ms the poll can resolve. Times are each poll's start, in the browser's clock.

`usd-demo`'s access reads back the same as before the test: its owner alone.

### A hostile file

`hostile.html` in the Hub's frame, in M's browser on M's repository and on A's with a grant, and in `bioma.ai`'s on A's. On its page, each time: `document.cookie` empty before and after setting its own; reading the parent's document or location and navigating it away `SecurityError`; reading the Hub's page, a file through the Hub, the sandbox proxy and an app origin `TypeError`; writing to its item 405, a sibling 200, traversing out 404.

By the Hub's own log. Its container's log began at 16:39:50, so M's first run, on its own repository at 16:38, is not in it.

| Request | M, A's file, 16:40 | `bioma.ai`, 16:54 |
|---|---|---|
| `GET /computer` | 303 | 303 |
| `GET /lore/local/repositories/…/files/…` | 401 | 401 |
| `GET /view/lore/…`, `no-cors` | 401 | 401 |
| `POST /view/lore/…`, `no-cors` | 403 | 403 |
| `GET` an app origin, `no-cors` | 401 | 401 |

The control, in M's browser on the Hub's own page at 16:55:24, the same route: `credentials: include` 200, `omit` 401. So M's Hub cookie did not reach the file. Of the Hub's 3,250 lines from 16:39:50 to 16:55:06, none held the content domain's name or a share secret's shape.

**An App's cookie is still unproved:** no app origin session exists to send, as [step 4](2026-11-05-usd-content-domain-deployed.md) says.

### Tokens across browsers

- The same person in two browsers, `m17-a`: two origins, whose SHA-256 begin `46a7a783c106` and `8c02dc666c60`. As designed, each browser session has its own.
- A's token URL opened in M's browser, where M holds no grant: the page 200 and a sibling 200. As designed, ["anyone holding the URL can read that item until it expires, as that person"](https://github.com/VeoveoAI/veoveo-hub/blob/main/crates/veoveo-hub/DESIGN.md#tokens). `/view/` itself still refused M. This is the origin's URL, which only the frame's source shows, and not the link agents give.

### A share link

A's link on a released `a linked.png`, opened in M's browser: top-level on `artifact-{40 hex}.veoveo-bioma.space`, `image/png`, no `Content-Disposition`, `DYNAMIC`, 98,976 bytes, SHA-256 `7d105e975f5105d6`, equal to the file's, with an empty `referrer`. Revoking it is in the table above.

## What the owner decided, and what changed

The owner read the qualification's open questions and decided, in their words: approving commands "its the worst UX a user can have", and access should open first and lock down later, without "prematurely locking users out". They also said this does not mean opening everything: "I jsut wanted to add things users/dev need".

| Change | Where |
|---|---|
| Every skill is approved: `"approved": ["skill://"]` in OpenCode and `veoveo=skill://` for n8n's Assistant, so no skill asks when it loads and no command asks while one is loaded | Template `computer/opencode.json`, n8n `src/computer/mod.rs` and its design |
| 20 bare names in the `internet` rule of both `computer-v1` and `factory-base`, up from `github.com` and `crates.io`: `pypi.org`, `astral.sh`, `nodejs.org`, `bun.sh`, `deno.land`, `jsr.io`, `unpkg.com`, `go.dev`, `golang.org`, `gopkg.in`, `rubygems.org`, `getcomposer.org`, `pub.dev`, `gitlab.com`, `bitbucket.org`, `codeberg.org`, `huggingface.co`, `hf.co` | Template and Bioma |
| `uv` 0.13.7 and `uvx` from `ghcr.io/astral-sh/uv`, `sha256:96f40d39…`, the latest release, at `/usr/local/bin` | `computer/Dockerfile` |

| Repository | Commits |
|---|---|
| `veoveo-template-installation` | `875b807`, `239126a`, `2ea327b` |
| `veoveo-installation` | `65adaa6`, `58ac180`, `99f972b`, `2d9a4ca`, `4fa6cbf` |
| `veoveo-mcp-n8n` | `80b8897`. The server's own code did not change, so its Lore copy and instance were left |

| Image | Digest | Built from |
|---|---|---|
| `computer` | `sha256:a823a94361f59a20e45ba10ce484906de7f66789d9ac2700efe04b3a3c89b594` | Bioma `2d9a4ca` |
| `n8n-computer` | `sha256:c88a6fb287fbdd5bf67a489352c241a6922947b8f08976dea16ea3f47c36dd3b` | n8n `80b8897` |

Against the image that ran, of 146,497 files only these differ: `/etc/computer/opencode.json`, `/usr/local/bin/uv`, `uvx`, `veoveo-n8n-computer`, and `/etc/hostname`, which each container writes.

| Check | Mac | Linux |
|---|---|---|
| Installer, template `2ea327b` | rc=0 | rc=0 |
| Installer, Bioma `4fa6cbf` | rc=0 | rc=0, `--no-cache` |
| n8n `80b8897`, `docker build --target check` | **Not run**: the Mac cannot reach the cluster's registry that holds its n8n image. `cargo test --lib computer`, 10 passed, and `cargo fmt --check` | rc=0, 87 tests |

### Deployment

| Time (UTC) | What | Result |
|---|---|---|
| 16:32 | `templates`, `hub-claim`, `hub-control-plane`, `pypi.org` and USD's skills alone | Version `09e01dfaaddf`; `plan` 18 of 18 |
| 16:33 | A and M restarted from their status pages, in their own browsers, by a real click | Both on it |
| 17:07:35 to 17:08:04 | The same three steps | Control plane `gcp-01a1acae-3797-7ab0-8523-6a1ef3680315`. The Hub restarted, as a change of `factory` needs, 19.3 s. `plan` 18 of 18 |
| About 17:10 | A and M restarted the same way | Both on `1b48ef38d996` |

The status page said what the update brings, in plain words, naming each new host. Other people's Computers keep running and are offered the update.

### Measured on both Computers, version `1b48ef38d996`

| Probe | Result |
|---|---|
| The 20 names, `https://{name}/` | All answered: 200, 301 or 307, but `crates.io`, whose own answer to `curl` is 403 as before |
| `example.com`, `reddit.com`, `youtube.com` | Refused, status 000 |
| `www.example.com` | 200: three labels stay open, as before |
| `uv --version`, `uv venv`, `uv pip install six` from `pypi.org` | Works, imports |
| `https://astral.sh/uv/install.sh` | 200 |

Before the image had `uv`, on Computer A, through `pip.pyz` from `bootstrap.pypa.io`: `usd-core` installed cold in 1.18 s by `uv` and 2.89 s by `pip`, 0.06 s cached by `uv`, `pxr` importing USD 0.26.11 each way; `uv python install 3.12` 1.45 s. One run each, not a benchmark.

### OpenCode, model-driven, recorded by `q8.sh`

| Scenario | Session | Time, cost | Tool sequence | Asks |
|---|---|---|---|---|
| Load the USD skill, list `usd-demo`'s scenes | `ses_e534ce4d0ffe…` | 30.3 s, USD 0.0076 | `skill` `hub:usd/view-stages`, `execute` ×3, of which `usd__list_scenes` ×2 | **0** |
| Load `keep-items`, run `echo done` | `ses_e534c6d11ffe…` | 26.3 s, USD 0.0039 | `skill` `hub:template/keep-items`, `shell` | **0** |

`q8.sh` answers and logs any ask; its log has no line for either. The first USD run of the [qualification](2026-11-05-usd-qualification.md) had 11 asks.

## What went wrong

**The approvals were first too narrow.** Asked about USD's approvals, the owner objected to approving commands as such. This work said the point went beyond USD, and then approved `skill://usd/` alone, deployed as `09e01dfaaddf`. The owner caught it from its release note. `skill://` replaced it.

**A host list and a suggestion that went too far.** Asked to add what people need, this work drafted 77 names, among them everyday sites, and suggested patching the fork's validator so that every bare name would pass. The owner had asked for neither. The suggestion was withdrawn, nothing in OpenShell changed (`8bd83351d`, clean), and the list came down to 20 before anything of it was deployed or pushed. The commits were amended locally.

**The release note named `pip` and `uv`.** The first note implied they were there, and neither was in the image. A correction went out as an annotation, which kept the version's name. `uv` is installed now, and `pip` is not.

**A setup script overwrote a log.** `step7/art.sh` sets `B`, `D` and `P`, and the first `m17/setup.sh` used those names, so it ran in `step7/probes/`, truncated `ids.tsv` and made empty throwaway repositories. `ids.tsv` was restored from the transcript of the work that wrote it, its four lines, and the throwaways were deleted before the corrected run.

**A stale test binary, three times.** Bioma's check failed on the box with the template's tests: its `tests/repository.rs` panicked in Bioma's tree on names only the template's file has. Both installers share the BuildKit cache mount `veoveo-installer-target`, and a tree from `git archive` has its commit's times, older than the template's binary, so Cargo did not rebuild. Touching the files did not help, as BuildKit's `COPY` cached by content kept the old times. `--no-cache` did. An ordinary clone, as earlier checks use, does not meet this. No code was at fault.

**Formatting.** n8n's Linux check refused the edit by `cargo fmt`. Fixed in the same commit, which had not been pushed.

**M cannot delete its own artifacts.** `artifact__delete_artifact`: "Your roles don't grant the permission this requires." As in step 7, M granted A admin and A deleted them. Existing behaviour, left.

## Cleanup

`m17-a`, `m17-m` and their folders, A's four test artifacts and M's three are gone; M's artifact list reads empty. The share link was revoked, and the file on the box holding its URL removed. The folder `preview-samples` was removed from A's home.

Kept on purpose, for the owner to look at: the Lore repository `preview-samples` (`01a1ac8cafd476b5bda6aa0772d5e5c5`), A's alone, and A's artifacts `sample paper.pdf` and `sample picture.png`.

## What this does not prove

- **n8n's Assistant:** its setting is covered by a component test, and the program holding it is in the image. The process's environment could not be read from the shell, and no Assistant run was made.
- **A factory sandbox with the new rule:** the base policy reaches an instance when it next deploys. None was deployed, and none probed.
- **Other people's Computers,** which were not restarted.
- **A's or M's token expiring in these browsers:** the expiry and renewal cases of M4 were not repeated. They are the server's, and [step 4](2026-11-05-usd-content-domain-deployed.md) ran them.
- **An App's cookie at a real app origin,** the part of M3 that stays pending.
- **Sign-in through a real login, a person answering any remaining prompt, other browsers, real media and files over 21.7 MB,** as before.
- **Why the bare names are listed at all:** OpenShell's validator refuses a wildcard of two labels or fewer, so a bare name not on the list stays refused until someone adds it.

## Open

No page leads a person to any of this: `https://veoveo.bioma.ai/` and `/apps` answer 404, and OpenCode links to no App. The owner asked where to see the work, and had only paths from reports. Proposed, for the owner to decide:

- A home page at `/` that links the Apps.
- A file browser App for Lore, since no page lists a repository's files.
- The USD App listing only repositories that hold scenes: it now lists all of them, and its scenes sit below the list.
- An optional `folder` on an artifact, shown as a tree in the library. Artifact is flat today, its names refuse `/`, and its one bucket is the installation's.

Also still the owner's: moving a share link's secret to the query so that the gateway's log does not hold it, and skinned scrubbing.
