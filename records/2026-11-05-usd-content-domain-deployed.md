# The content domain, tokens, `/view/` and `file-viewer`, deployed to Bioma

2026-11-05 UTC (2026-11-04 and 05 local). Worker: Claude Code (Opus 5.5), with no OpenCode or other model call. Evidence for
step 4 of [plan section 18](../PLAN.md#18-usd-a-viewer-and-agent-tools-from-bevy_openusd). Scripts, logs and probe output are in
`~/k3s-builds/usd-20261104/step4/` on the box, with the probes under `probes/` and screenshots under `shots/`. No token or
signed URL appears here. Tokens are named by their last characters at most.

**Outcome.** Deployed and working in the owner's Chrome. Every format in the directive rendered through `/view/lore/...`,
including a real Autodesk DWG. The access probes all refused what they should, at once. Two faults of this work took Hub down
for about 50 seconds and needed a fix each, and a third was found by the probes: see [what went wrong](#what-went-wrong).
Not proved: see [the boundaries](#what-this-does-not-prove).

**Browsers.** Every browser result here is from the owner's Chrome through the Claude in Chrome extension, its Default profile,
signed in as `rozgo@bioma.ai` (Computer A). `list_connected_browsers` showed that one browser before the final pass at 07:26 and at 06:38 before it;
the `bioma.ai` and `vrx.group` profiles had no extension connected. So the cross-account cases ran with Default's
person in the browser and `alex.rozgo@vrx.group` acting from Computer M's own command line.

## What changed

| Repository | Commits | Change |
|---|---|---|
| `lore` | `fbab1a14` | Step 3's test that a real token for one repository is refused on another, through the server's layers. Lore is 0 behind upstream `b8fc623d`. No redeploy |
| `veoveo-hub-sdk` | `886cb6a` | `surfaces.viewer`: extensions and one of the server's public routes, in both spellings, `Routes::viewer` |
| `veoveo-hub` | `90eb179`, `b3455ac` | `src/content/`, `hub.content_token`, `/view/`, the token origin on the Apps listener, `lore/content.rs`, `viewPages` in `ui/open-link`, its [design](https://github.com/VeoveoAI/veoveo-hub/blob/main/crates/veoveo-hub/DESIGN.md#content-domain) |
| `veoveo-template-installation` | `61364b1`, `9595d49`, `c453e20`, `fe599d6` | `VEOVEO_CONTENT_ORIGIN`, the tunnel route, `factory/FileViewer.Dockerfile`, the mount and policy path, the gateway's admission list |
| `veoveo-installation` | `83816fc`, `8ef5c04`, `cc1f202`, `fd681f3`, `a52b26f` | The same with `veoveo-bioma.space`, and the lock. The README's stale Media-callback row is gone: Cloudflare holds that route ([`f99d502`](https://github.com/BiomaAI/veoveo-installation/commit/f99d502)) |

The Hub's SDK pin moved from `22ff657` to `886cb6a`, and that pulled its core pin from `97e85e0` to `a8dafe9`, whose only change is
a test fixture (`git diff --stat`: 4 files under `testing/fixtures`).

| Image | Lock key | Digest | Built from |
|---|---|---|---|
| Hub | `hub` | `sha256:4433f0dc969b1ddd515eaeeb9a3f6d94a8017fb82ab4d30808c4545c2c74927c` | Hub `b3455ac` |
| `file-viewer` | `file-viewer` (new) | `sha256:cacc2cf8e021aaa2ce1a88a0908832148a584ed0c80aa4ba9cfdc614e58401cf` | `@file-viewer/web-full` 3.3.3 and its assets, `factory/FileViewer.Dockerfile`, 228,672,307 bytes |

Read back: the Hub pod runs `4433f0dc` and mounts `cacc2cf8` at `/opt/veoveo/file-viewer`, 226 MB, where `touch` answers "Read-only
file system". Computers A and M and another person's Computer kept running, 7 h and 3 h old, not restarted.

## Checks

| Check | Mac | Linux |
|---|---|---|
| SDK `886cb6a`, `docker build --target check` | rc=0 | rc=0, 383 tests, 3 skipped, 106 s |
| Hub `b3455ac`, the same | rc=0, 512 tests, 2 skipped | rc=0, 512 tests, 2 skipped, 183 s |
| Installer `docker build -f installer/Dockerfile --target check`, template at each commit, Bioma at each commit | rc=0 | rc=0 |
| Lore: `under_the_servers_layers`, clippy for `lore-server`, `cargo fmt --check` | not run: Lore has no Docker check, and step 3's Mac clippy has 2 findings it did not add | test ok, clippy rc=0, fmt rc=0 after formatting the test |

The Hub's `src/content/tests.rs` runs a real browser session of a ready Computer through the page and the Apps listener, over a
fixture owner and a fixture server that declares a viewer of `.usda`. These are component tests. They cover what could not be
waited for on Bioma: the 24-hour limit, a token's row past its retention, a declared viewer's redirect and forward.

## Plan and apply

Each `plan` left other people's Computers and the Computer version unchanged. Steps touched: `hub`, once `openshell`.

| Time (UTC) | Step | Result |
|---|---|---|
| 06:14:46 | `hub`, Bioma `83816fc` | Failed after deleting the sandbox: the gateway's admission list did not hold the new image's repository |
| 06:15:30 | `hub`, the mirror back at `1a6b4aa` | Restored the previous Hub in 4.4 s. Hub was down about 50 s |
| 06:16:58 | `openshell`, Bioma `8ef5c04` | The list gains `veoveo/file-viewer`, 8.9 s |
| 06:17:23 | `hub` | 21.8 s, but the driver configuration had the volume and no mount |
| 06:19:00 | `hub`, Bioma `cc1f202` | 20.5 s, with the mount |
| 06:36:49 | `hub`, Bioma `fd681f3` | 24.1 s, the Hub at `b3455ac` |

The last `plan` reports 17 of 18 steps match. The one difference, `hub-control-plane`, is `lore.deployments[id=primary].httpEndpoint`:
declared without a trailing `/`, active with one. Hub writes the active document's URL normalized whenever someone creates a
repository, and this step's probes did that. Same address; nothing was applied for it.

## What went wrong

**The admission list.** `resourceAdmission.imageRepositories` named Lore and the SDK CLI only, and the plan's table did not know
it. `plan` cannot see this, so `apply` deleted the sandbox before the gateway refused the new one. Restored through the installer,
fixed in `openshell.values.yaml`.

**The missing mount.** My edit of `hub-driver-config.json` added the volume, and the matching mount silently did not apply. `plan`
showed only the volume; `ls` in the sandbox found no path. Fixed in `c453e20`. No test caught it, since the installer's tests read
the file as it is and the Hub's point at a temporary folder.

**Cloudflare's analytics beacon.** The `no request leaves the origin` probe found `https://static.cloudflareinsights.com/beacon.min.js/...`
in the viewer page's document, and in its network list. The zone injects it into HTML on navigations (a `fetch` of the same page got
none). Files were clean, because they answer `no-transform`. The viewer page answered `private, no-store`. Measured: the tag was in the
document, with a status of 503 in the extension's list, and that status is the list's mark for a cancelled request, as a
later `video.mp4` entry with 503 that never reached the Hub shows. Inference: the viewer's CSP refused it. Whatever it did, it should not be
there, so `b3455ac` adds `no-transform` to all HTML on the origin and to the Hub's `/view/` page. After it: no tag, no request.
The zone's setting was not changed.

## Probes

### 1. Formats, through `/view/lore/{repository}/main/{path}`

Repository `step4-preview` (`01a1aa54a1157763af760e550dead5e4`), a throwaway of Computer A, pushed from `samples/`. The owner's Chrome,
the Hub's real frame. Frame attributes read from the page: `sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"`,
`allow="webgpu; autoplay"`.

| File | Bytes, source | Result, from the screenshot |
|---|---|---|
| `docs/report.docx` | 83,054, the project's sample | Headings, a table, search, zoom, print |
| `docs/finance.xlsx` | 83,418, the project's sample | A grid, "701 rows, 16 columns", sheet tab |
| `docs/deck.pptx` | 1,947,635, the project's sample | Full-bleed title slide, slideshow button |
| `docs/paper.pdf` | 1,016,315, pdf.js's real paper | 14 pages, thumbnails, outline, search, zoom |
| `media/fox.glb` | 162,852, the project's sample | 3D with fit, rotate, wireframe, grid, axes |
| `media/model.step` | 8,064, the project's sample | A cube, through the OCCT worker |
| `media/sample.dwg` | 227,008, Autodesk's `blocks_and_tables_-_imperial.dwg`, `file`: AutoCAD 2007/2008/2009 | A floor plan, 18 layers, 805 entities, 100 blocks, through the DWG worker and LibreDWG WASM |
| `media/design.psd` | 116,440, the project's sample | 420 x 280, four layers with visibility |
| `media/video.mp4` | 21,674,930, synthetic from `ffmpeg testsrc2`, 60 s | Player with controls |
| `docs/markdown.md` | 1,173, the project's sample | Tables and highlighted code |
| `media/pic.png` | 98,976, the project's sample | Displays, 1374 x 872, with zoom and rotate |
| `site/index.html` | 335, with siblings | Runs as itself: see below |

`site/index.html` reported on its own page: its stylesheet applied, `../media/pic.png` loaded, relative `fetch`es of
`scene/root.usda` (146 bytes) and `scene/parts/part.usda` (51 bytes) answered 200 with the repository's SHA-256, WASM ran, `new Function`
ran, WebGL2 and a WebGPU adapter present, IndexedDB opened. These two small USD files are written for this probe. Real scenes are
step 5's.

### 2. Seeking and relative paths

Relative paths: above.

A real click at three quarters of the timeline, in the Hub's frame: the player read 0:45 of 1:00, and the frame's own burned-in timer read
`00:00:45.133`, frame 1354. **That seek does not use ranges.** `file-viewer` fetches the whole file first (the Hub logged one 200 for
it, and `buffered` was 0 to 60 s), then seeks locally. A larger video would take as long as its whole download. Opened as itself, Chrome's
own player seeks with ranges: `currentTime = 50` left `buffered` at 0 to 20 and 50 to 55 s, with a 206 in the network list. A
`Range: bytes=1000000-1000999` answered 206 with `Content-Range: bytes 1000000-1000999/21674930`, whose 1,000 bytes match `dd` of the
file by SHA-256 (`44b007ad133ce63a`). `file-viewer`'s PDF does use ranges: two 206s for `paper.pdf`.

### 3. Access

**A hostile file,** `hostile.html`, in the Hub's frame. On its page: `document.cookie` empty before and after setting its own (Chrome
refuses a cross-site frame's cookie; IndexedDB still opens), reading the parent's document or location `SecurityError`, navigating the
Hub's page away `SecurityError` and the page stayed, reading the Hub's page, a file through the Hub, the sandbox proxy and an app origin all
`TypeError`. Writing to its own item 405, traversing out of it 404, a sibling 200.

At the server, by the Hub's own request log, each carrying `?probe=`:

| Request | From | Hub's answer |
|---|---|---|
| `GET /view/lore/{repository}/main/docs/markdown.md` | The hostile file, `credentials: include`, `no-cors` | 401, no session |
| The same | The Hub's own page, `credentials: include` (control) | 200 |
| The same | The Hub's own page, `credentials: omit` (control) | 401 |
| `POST` the same | The hostile file | 403, Origin refused |
| `GET /lore/local/repositories/{repository}/files/...` | The hostile file | 401 |
| `GET https://n8n.apps.../` | The hostile file, twice | 401 |
| `PUT /hostile.html` | The hostile file | 405 |

So the Hub's cookie did not arrive: the same request with it answers 200. The logs hold no headers, so this is the status and not the
header itself. **The App half is weaker.** No app origin session exists on Bioma to send: `hub.app_origin_session` is empty and n8n's
selected instances serve no app origin ("No app here", with the owner's selection on `team-a` tried and cleared again). The 401 there is what
a browser with no session gets anyway. The stand-in measurement in the
[content domain record](2026-11-04-usd-content-domain.md) remains the evidence for an App's cookie.

**A token on another item.** With `step4-preview`'s token, `step4-second`'s file `/only-in-second.txt` answered 404, also
`/%2e%2e/only-in-second.txt`, and with an encoded slash 400 from the edge. Reading across origins is `TypeError`. Framing another item's
origin from this one shows the browser's error page; framing its own works. A name that is no token answered 404. The other item's own token
reads that file. Framing the Hub's `/computer` from there showed the Hub's own `computer-unavailable` problem in JSON, which holds nothing of a person: a
Hub error answer without `frame-ancestors`, from before this work.

**Removing a grant.** `alex.rozgo@vrx.group` owns `step4-shared` and shared it through Console's `share_repository` from Computer M. In
Chrome the page opened and the token read `secret.txt`, 200. M removed the grant at 06:30:19. The next requests, at 06:30:27, the first after
it, answered 403 for the file, a page held in the browser's cache, `file-viewer`'s file and the viewer page. Reopening `/view/` said "You cannot open this
file". The 8 seconds are the tool's turnaround; nothing was tried earlier.

**Another person's repository.** `/view/lore/{step4-other}/main/secret.txt` said "You cannot open this file", 403; `POST` the same; no row with
that item in `hub.content_token` (read-only query). An unknown repository: 404.

**An expired token.** `step4-second`'s token was minted at 06:25:25 and no Hub page held it for over an hour, in real time, with no write to the database.
From the box at 07:26:00: a page load 303 to `/view/lore/{step4-second}/main/page.html`, in a frame 401 with a page that says so, a sub-resource 401, a load
of the viewer page 303 to that file's `/view/`, a load of a viewer file 303 to the item's top. In Chrome at 07:26:14 the old URL landed on the Hub's page,
framing a token of another value, with the file. The old one stayed refused afterwards.

**Renewal.** `step4-preview`'s page was left open in a tab at 06:45:16, its token's expiry then 07:45:16. The page's own script posted at 07:00:18 (200, 18 ms)
and the expiry read back 08:00:18, within a hard limit of 06:22:04 the next day. The token stayed the same across every reopening and across the Hub's restart at 06:36:49.

**A deleted repository.** After the cleanup below, `step4-preview`'s token answered 404.

The final pass of these, on the deployed Hub at 07:28: the same answers from the hostile file, and 200 and 401 from the controls (`probes/hostile-server-final.txt`). Of 116 lines of the
Hub's log in that window, none held the content domain's name; of 2,055 over 30 minutes earlier, none held a token, nor did the gateway's.

### 4. Bytes and the edge

Each of the 17 files, fetched with `cache: no-store` on its origin in Chrome: SHA-256 equal to the Computer's copy, `cf-cache-status: DYNAMIC`, on a second request too, and
the same status through `curl` from the box. An `If-None-Match` of the `ETag` answers 304, a `Range` 206. Files keep their `Content-Length`, and no
`Content-Encoding`, so the edge transforms nothing. `file-viewer`'s files do take `content-encoding: br` from the edge, as they have no
`no-transform`, by design.

Headers of a file: `content-type: application/vnd.openxmlformats-officedocument.wordprocessingml.document`,
`cache-control: private, no-transform`, `x-content-type-options: nosniff`, `referrer-policy: no-referrer`,
`content-security-policy: frame-ancestors https://veoveo.bioma.ai 'self'`, `accept-ranges: bytes`. Types seen: `model/gltf-binary`,
`application/step`, `application/acad`, `video/mp4`, `text/markdown`, `text/javascript`, `application/wasm`. Unknown, as `.psd` and `.usda` are to
`mime_guess`, is `application/octet-stream`.

`file-viewer`'s own files on the origin match the mounted image: `flyfish-file-viewer-web-full.iife.js` `39df27e2cf199ba4`, `wasm/cad/libredwg-web.wasm` `d8b78f6d5e63e6e1`, read decompressed.

**No request leaves the origin.** Opening all eleven viewer files at the deployed Hub, top-level on the origin, the extension's list held
85 requests: all to the token's own origin, `data:` or `blob:`. `document.scripts` held none from elsewhere. Workers seen, all on the origin:
`wasm/cad/0.8.3/dwg-worker.js`, `vendor/docx/docx.worker.js`, `vendor/pptx/pptx.worker.js`, `vendor/pdf/pdf.worker.mjs`, `wasm/model/occt-worker.js`. Only `file-viewer`
is bound by this: an HTML file is its own and may call anywhere.

### 5. What exists still works, on the deployed Hub

| What | Result |
|---|---|
| The Time App, `/apps/time/now`, in Chrome | Renders with live values |
| The n8n App, `/apps/n8n/overview`, in Chrome | Renders both teams' workflows and executions |
| `lore`, Computer A | Clone 334 ms, push 118 ms |
| `lore`, Computer M | Clone 239 ms, push 122 ms |
| Embedding through the Hub | 768 dimensions on `cuda`, 417 ms |
| `https://sandbox.apps.veoveo.bioma.ai/` | 200, as before |

## Cleanup

`step4-preview` and `step4-second` in Computer A and `step4-other` and `step4-shared` in Computer M were deleted with `lore repository delete --force`, each rc=0, and none is listed. Their folders
are gone from the Computers. The selection tried on n8n was cleared. The extension's tabs are closed. The token rows stay until pruned, as designed, and authorize nothing.

## Token design as built

- Value: 40 lowercase hex characters, 160 bits, one DNS label.
- Derived, not drawn: HMAC-SHA-256, truncated, under the value of the browser's `__Host-computer` cookie (256 random bits), of a random 128-bit nonce, the owner and the item, length-prefixed.
- Stored: `hub.content_token` holds the token's digest, the nonce, the cookie's digest, owner, item, Computer, family, `expires_at`, `hard_expires_at`. Read back: `sha256:` digests and 16-byte nonces. Foreign keys cascade.
- Why derived: "stored hashed" and "the same token while valid" conflict for a random value, since a hash cannot be read back. This gives both with no new secret: only the browser holding the cookie can recompute it, and the database alone cannot.
- Lifetime: 1 hour, extended by each mint and by the page's script every 15 minutes and whenever it shows again, to at most 24 hours from its first mint. An expired token is never extended: the next mint draws a new nonce, so an old link does not come back.
- Scope: one browser session and one item. A second browser of the same person has its own tokens, and that is the one place this is narrower than "the same token for a person and item".
- Every request on the origin: digest, row, expiry, the family's admission (Computer ready, no handoff, family current and not revoked), the owner's `admit`, then the path.
- Rows stay seven days past expiry so that a stale tab finds its way back, and are pruned in batches when a new token is drawn.
- Measured across a Hub restart: the token stayed valid and the same, as nothing of it is in the Hub's memory.

## `file-viewer`'s asset set

The complete set is `web-full`'s `dist/` (500 files, the only holder of the `renderers/` chunks) with `file-viewer-copy-assets` over it
(2,919 files). The two agree on all 460 files they share but `flyfish-viewer-assets.json`. The `assets-cad`, `assets-design` and `assets-drawing`
packs add nothing new: every file of theirs is in that set with the same SHA-256 but their license lists and manifests, which the image keeps under
their own names. Their installers refuse to merge ("Refusing to overwrite an unowned asset"), so the Dockerfile copies them. A build step
fails if any of the 201 assets the manifests declare is absent. Result: 2,965 files, 226 MB, not the plan's "at least 100 MB". Notices kept and read back
in the mounted image: `LICENSE`, `THIRD_PARTY_LICENSES*`, `wasm/cad/0.8.3/{LICENSE,GPL-3.0.txt,NOTICE,CORRESPONDING_SOURCE_NOTICE.txt}`, the last with
its immutable source links.

Two static references have no file: `wasm/dwg-worker.js` in `cad.iife.js`, and `vendor/railroad-diagrams.js` in `model.iife.js`. The DWG loaded
from `wasm/cad/0.8.3/dwg-worker.js` and never asked for the first. The second was not requested either, but was not hunted further.

**Not in this set,** and the plan's list named some of them: IFC, LAS, COPC, 3D Tiles and the XML profile are opt-in specialist entries of the renderers, with
`file-viewer-ifc-assets`, `file-viewer-geo3d-assets` and `file-viewer-xml-assets` for hosts that install their packages. The prebuilt `web-full` does not include them,
and nothing was tried with them.

## Differences from the plan and the directive

- The token is derived from a random nonce and the session cookie, not itself random, and per browser session.
- `frame-ancestors` names the issuer and `'self'`: without `'self'` an HTML file could not frame its own sibling.
- A folder's page is its JSON listing, as itself. There is no browsing page.
- The gateway's admission list needed the image's repository, so the `openshell` step ran.
- `file-viewer` is 226 MB, downloads a video whole before playing it, and has no IFC here.
- All HTML on the origin takes `no-transform`, which the design did not foresee.

## What this does not prove

- **Other profiles:** only Default was connected, so nothing ran in a browser signed in as `alex.rozgo@vrx.group` or in `bioma.ai`'s profile.
- **An App's cookie at a real app origin,** as above.
- **`ui/open-link` from a real App.** The host's `viewPages` is deployed and the code is tested for shape, but no App called it.
- **A declared viewer on Bioma.** No server declares one yet: only the fixture server in the component tests.
- **Sign-in returning to `/view/` through a real login.** `curl` measured the 303 to `/computer` with `__Host-computer-return` holding the canonical path, and the callback's parsing is a component test. Logging the owner out was not tried.
- **The 24-hour limit and the seven-day retention on Bioma,** only in component tests.
- **Large files.** The largest was 21.7 MB.
- **A browser other than Chrome.**
