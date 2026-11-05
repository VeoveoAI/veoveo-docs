# Artifact on the content domain, share link previews and the library App, deployed to Bioma

2026-11-05 UTC. Worker: Claude Code (Opus 5.5), with no OpenCode or other model call. Evidence for step 7 of
[plan section 18](../PLAN.md#18-usd-a-viewer-and-agent-tools-from-bevy_openusd). Scripts and probe output are in
`~/k3s-builds/usd-20261104/step7/` on the box. No token, share link secret or signed URL appears here.

**Outcome.** Deployed and working in the owner's Chrome. An artifact opens through `/view/` with the usual viewer choice, a read level
decides every request, a browser opening a share link gets a preview on its own origin while programs still get the signed GET, and
the library App lists artifacts and opens them, a media run's output among them. Four faults of this work had to be fixed on the way, one of
which took Artifact down for about 8 minutes: see [what went wrong](#what-went-wrong). Not proved: see [the boundaries](#what-this-does-not-prove).
One thing is left for the owner: [the gateway's log holds a share link's path](#open).

**Browsers.** Every browser result is from the owner's Chrome through the Claude in Chrome extension, its Default profile, signed in as
`rozgo@bioma.ai` (Computer A). `list_connected_browsers` showed that one browser before the browser pass and again at its end. The other
account, `alex.rozgo@vrx.group` (Computer M), acted from its Computer's command line and not from a browser.

## What changed

| Repository | Commits | Change |
|---|---|---|
| `veoveo-hub-sdk` | `14a649f` | `surfaces.content`, with its route and its `links` public route; `ContentLinkLabel`; `veoveo_content_origin` in the registration response; [design](https://github.com/VeoveoAI/veoveo-hub-sdk/blob/main/crates/veoveo-hub-sdk/src/registration/DESIGN.md#surfaces) |
| `veoveo-hub` | `ba4da62`, `518566f` | A server that declares content is an owner, read as the person; a link's origin; `/instances/` refuses `links`; a request's log stops at a public route's first segment; [design](https://github.com/VeoveoAI/veoveo-hub/blob/main/crates/veoveo-hub/DESIGN.md#owners) |
| `veoveo-mcp-embedding` | `c8ddb6d` | The SDK pin only, so that Artifact has one SDK. Not redeployed: the lock keeps the revision that runs |
| `veoveo-mcp-artifact` | `8f3a27d`, `3e0b48f`, `29fe2e9`, `aca28cf`, `0dabcb7` | The content routes, the object read, the share route's preview, migration `0003`, the library App, the skills, the deny entry, the gate's retry; [design](https://github.com/VeoveoAI/veoveo-mcp-artifact/blob/main/crates/veoveo-mcp-artifact/DESIGN.md#previews) |
| `veoveo-installation` | `f6a1ef3`, `5097542`, `d0625e4` | The lock. No other file: neither a new image repository nor a new setting |

| Image | Lock key | Digest | Built from |
|---|---|---|---|
| Hub | `hub` | `sha256:50f746b8f7a6e5015ef6beffd966358d84cb7bf779c673cb3fd54dff5ffd7c87` | Hub `518566f` |
| Artifact | `artifact` | `sha256:0c96099e9a708334a6a2a0c2964a2a2b05a2babffec8a1eafd1c73745f1ad115` | Artifact `0dabcb7` |

The step 5 and 6 work moved the Hub between these commits (`61083f8`), and `518566f` lies on top of it.

## Checks

| Check | Mac | Linux |
|---|---|---|
| SDK `14a649f`, `docker build --target check` | rc=0, 387 tests, 3 skipped | rc=0, the same |
| Hub `ba4da62` | rc=0, 516 tests, 2 skipped | rc=0, the same |
| Hub `518566f` | rc=0, 518 tests, 2 skipped | rc=0, the same |
| Embedding `c8ddb6d` | rc=0, 41 tests, 5 skipped | rc=0, the same |
| Artifact `0dabcb7` | rc=0, 126 tests, 9 skipped | rc=0, the same |
| Installer `docker build -f installer/Dockerfile --target check`, Bioma at each lock commit | rc=0 | rc=0 |

`tests/content_route.rs` runs the hosted router over a private SeaweedFS with tokens as the Hub forwards them, and the Hub's
`src/content/tests.rs` a real browser session through the page and the Apps listener, over a fixture server. These are component tests.
They cover what could not be waited for on Bioma: a link's expiry, which is at least a day away.

## Plan and apply

Each `plan` left the Computers and everything but the steps below unchanged. No Computer was restarted.

| Time (UTC) | Step | Result |
|---|---|---|
| 08:31 | `hub`, `platform-servers` | rc=0, but on another mirror: see below. The Hub at `61083f8` (`339cb0cf`), nothing of Artifact |
| 08:31:56 | `platform-servers`, Bioma `f6a1ef3` | Failed after 180 s: "Hub reports artifact deployment ... as not registered". The server exited: see below |
| 08:40:12 | `platform-servers`, Bioma `5097542` | 9.2 s, Artifact at `3e0b48f` serving |
| 09:09:57 | `hub`, `platform-servers`, Bioma `d0625e4` | 21.8 s and 13.9 s. `plan` afterwards: 18 of 18 steps match |

Artifact's changed declaration registered again under the same deployment, as `resume_or_register` allows, and `veoveo_public_base` and
`veoveo_content_origin` came back in its response.

## What went wrong

**A shared mirror between plan and apply.** `plan` and `apply` read the box's one mirror of the installation, and the other fork moved it between mine.
My first `apply` so took its Hub, which holds my code too, and left Artifact. The lock's digests were right for what ran, since its commit said so, and nothing was
lost. `step7/deploy.sh` now moves the mirror inside the lock on both.

**The App's document.** `COPY` keeps a file's mode, and the sweep's build extracted its tree under a umask that left `library.html` as `-rw-------`, unreadable by uid 10001. The
server registered, applied migration `0003`, read the file and exited. Artifact was down from about 08:32 to 08:40:31. Going back was not on offer: an older binary refuses a database holding a
newer migration. The first fix, `COPY --chmod=0644`, made BuildKit create the directory without its search bit, and the check in the image's own shell caught that before anything ran. `3e0b48f`
creates the directory first. The image was built from the bundle on the box and its checks ran beside it, with the push after them. `plan` cannot see any of this, and no test runs the image.

**The App read a listing wrongly.** A listing's item is `{artifact, level}`, and the first version read it as the artifact, so its rows were blank. The screenshot showed it. `29fe2e9` fixes it and a test reads
both sides.

**A share link's secret in the Hub's log.** A link's URL now goes through the Hub, and its request span recorded every URI whole. The check for this found 57 lines naming the route. `518566f` stops the span at
`/instances/{deployment}/{slug}/{route}/…`. After it, none of the Hub's or Artifact's 6,502 lines holds a secret's shape or a preview's token. The earlier lines name only this step's throwaway links, all since revoked and their artifacts
deleted.

**Two things in the gate, neither of this work's making.** `cargo deny` began refusing `pin-utils`, RUSTSEC-2026-0441, unmaintained since 2026-10-01 and reached only through the AWS SDK with no safe upgrade: `aca28cf` names it in `deny.toml` with why.
A test's private SeaweedFS sometimes lost a port on a busy host, answering `CreateBucket: dispatch failure` after 30 s, a different test each time, and this work's five more tests of it made that common: it failed
four of nine runs. `0dabcb7` gives a test one more try in the gate's profile, on other ports, where nextest calls it flaky. The last run on each platform had no retries.

## Probes

Throwaway artifacts of A: `pic.png`, `my paper.pdf`, `video.mp4` and `hostile.html`, and of M: `other person.txt` and `shared.html`.

### 1. Previews through `/view/artifact/{artifact_id}/{name}`

The frame's attributes, read from the page: `sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"`, `allow="webgpu; autoplay"`.

| File | Bytes | Result, from the screenshot | Fetched on its origin |
|---|---|---|---|
| `pic.png` | 98,976 | Displays with zoom, rotate and Download | Through its link: `image/png`, SHA-256 equal to the file's |
| `my paper.pdf` | 1,016,315 | 14 pages, thumbnails, search, Download | `application/pdf`, SHA-256 `3662ff519e485810` equal |
| `video.mp4` | 21,674,930 | Player with controls, Download | `video/mp4`, SHA-256 `bb26665f1c7354cd` equal |
| `hostile.html` | 3,893 | Runs as itself | `text/html`, SHA-256 `602e2ab7bf5b42d2` equal |

Each answered `cf-cache-status: DYNAMIC`, `x-content-type-options: nosniff`, `cache-control: private, no-transform`, `referrer-policy: no-referrer`,
`content-security-policy: frame-ancestors https://veoveo.bioma.ai 'self'`, `accept-ranges: bytes` and no `Content-Disposition`. A `Range: bytes=1000-1999` answered 206 with its `Content-Range`, and its 1,000 bytes match the file's by SHA-256.
The `ETag` as `If-None-Match` answered 304, and a range past the end 416 with `bytes */{size}`.

`/view/artifact/{artifact_id}` with no name goes to the same viewer through the top of the item.

### 2. Seeking

`video.mp4` opened as itself, `currentTime = 50` in the owner's Chrome: `buffered` was 0 to 17.4 s before and 0 to 17.4 s with 49.9 to 60 s after, with a 206 in the network list, through Artifact. `file-viewer` still downloads a video whole, as [step 4's record](2026-11-05-usd-content-domain-deployed.md) says.

### 3. Access

| Case | Result |
|---|---|
| M's private artifact, in A's browser | The page says "No such file", no frame, and `hub.content_token` holds no row of that item |
| A's artifact, M's `create_download` | "no such artifact" |
| M's artifact granted to A, read | Opens. At 08:47:20 the file and a viewer file answered 200, and the viewer page and the top their redirects |
| M removes the grant, at 08:47:22 | At 08:47:32, the next requests, the same four answered 404, as they would an unknown artifact. Reopening says "No such file". The 10 s is the tool's turnaround |
| A deleted artifact's token, no cookie, from the box | 206 before, 404 after |

### 4. `create_download` is unchanged

`create_download` on `pic.png`: a signed GET of `veoveo.bioma.ai/artifacts/...`, whose answer has `content-disposition: attachment; filename="pic.png"`, the file's SHA-256, and 206 for a range.

### 5. Audit

Read back from a read-only session, by target: `video.mp4`, opened once and then read whole twice, by range many times and seeked, holds one `artifact.download_issued`. A visit is one record, whatever the reads. The other artifacts' counts match their visits and downloads.

### 6. Share links

A's links on `pic.png`, `hostile.html`. The URL is `https://veoveo.bioma.ai/instances/{deployment}/artifact/shares/{secret}`.

| Case | Result |
|---|---|
| `curl` | 303, `no-store`, `no-referrer`, to the 5-minute signed GET, whose answer is the attachment with the file's SHA-256. `HEAD` 405 |
| The browser | Goes to `https://artifact-{40 hex}.veoveo-bioma.space/_veoveo/view/pic.png`, top-level, with the image and Download. `document.cookie` and `referrer` empty. The same headers as above, `DYNAMIC`, SHA-256 equal, 206 by range, 405 to a `PUT` |
| Redemptions | Two `curl`s and one browser visit counted 3, after many reads of the preview. A later link with one visit and its reads counted 1. `HEAD` counted none |
| Revoke, at 08:48:39 | At 08:48:49, the next requests, the file, viewer file, viewer page and top all answered 404. Reloading shows the 404 and the link says "no such share link" |
| A limit of one | The first visit opens the preview. The second says "no such share link", and the preview it opened still answers 200 |
| `set_release_state` to private, at 09:14:17 | Every live link is revoked in that transaction, and a preview that had answered 200 answered 404 at 09:14:32 |
| An unreleased artifact | "a share link reaches an artifact only while it is released" |
| A label | A's `create_upload` with a label it does not hold is refused, so no labelled artifact exists to try. The refusal to link one is a component test |

### 7. A hostile artifact

`hostile.html` in the Hub's frame, as a person's token, and top-level through its link, on the first and the final deployment. On its own page: `document.cookie` empty before and after in the frame (a top-level origin keeps its own host-only cookie, which the Hub removes on the way in); reading the parent's document or navigating it away `SecurityError`; reading the Hub's page, the App's page and the sandbox proxy `TypeError`; writing to itself 405; reading itself 200; another name 404; `/%2e%2e/%2e%2e/mcp` 404 and `/..%2f..%2fmcp` 400.

At the server, by the Hub's own request log. The last two rows are from the deployment before: the final log no longer names them, by design, and `curl` from the box to the same addresses answered 404 on the final one, also in another spelling.

| Request | From | Hub's answer |
|---|---|---|
| `GET /computer` | The hostile file, `credentials: include` | 303 to sign in, no session |
| `GET /apps/artifact/library` | The same | 401 |
| `GET /view/artifact/{another}/x.txt` | The same, `no-cors` | 401 |
| The same | The Hub's own page, `credentials: include` (control) | 200 |
| The same | The Hub's own page, `credentials: omit` (control) | 401 |
| `POST` the same | The hostile file | 403, Origin refused |
| `/instances/{deployment}/artifact/shares/{its own token}` | The same, through its link | 404: a preview's token redeems nothing |
| `/instances/{deployment}/artifact/content-links/{its own token}/hostile.html` | The same, and the owner's Chrome navigating there | 404, a problem document, and nothing ran on the Hub's origin |

### 8. The library App

`/apps/artifact/library` in Chrome lists the person's artifacts, newest first, with size, type, level, date, released, and the server that made them: `output-0.png` "from media", and the step 5 work's renders "from usd". The filter narrowed it by a typed prefix. A real click on `my paper.pdf` went through the host's `ui/open-link`, which [step 4](2026-11-05-usd-content-domain-deployed.md) had not seen from a real App, to `/view/artifact/.../my%20paper.pdf`, with the PDF in the frame.

### 9. A media run's output

`media__run` of `fake/text-to-image` by A, a real Task on the synthetic fake provider: `output-0.png`, 65,536 bytes of synthetic fixture data, whose provenance names `media` and its Task. A click in the library opens it. `file-viewer` says "Preview failed" with Download, because these bytes are not an image. The file's bytes on the origin match a signed download's by SHA-256 (`c6ee57f09dbd4b0e`). This proves the path, and nothing about real media.

### 10. What exists still works, on the deployed Hub

| What | Result |
|---|---|
| A Lore preview, `usd-demo`'s `franka/franka-LICENSE.txt`, in Chrome | Renders |
| The Time App and the n8n App, in Chrome | Render with live values and both teams' workflows |
| `lore`, Computer A | Push 124 ms, clone 81 ms |
| `lore`, Computer M | Push 127 ms, clone 79 ms |
| Embedding through the Hub | 768 dimensions on `cuda` |

## Cleanup

Every throwaway artifact is deleted, M's through a grant of admin to A because M's role holds no delete, the stray uploads aborted, the two Lore repositories deleted, and the tabs closed. The step 5 work's artifacts were left alone.

## Design as built

- **A person's item.** The Hub's existing app origin path, a bearer of the session's family through its own authentication and the forwarded token, reaches `{route}{item}` on the instance the person selected. No policy of the Hub's stands between them, and Artifact decides by `artifact.effective_level`.
- **The owner's read checks itself.** `admit` now runs only before what the Hub answers itself on the origin, because a read refuses as `admit` would, for Lore and a server alike. That saves a call per range.
- **A link holds nothing at the Hub.** Its origin is `artifact-{token}`, one DNS label, 40 hex, whose name says which server, and the Hub asks that server on every request. The token is a SHA-256, under its own purpose, of the link's secret, so a file on the origin cannot redeem the link and one link keeps one origin and its cache. Artifact stores the token's digest when a browser first opens the link. A database reader learns neither the secret nor the token.
- **The route is public, and never on the Hub's origin.** `content-links/` is a declared public route, so its reads take that route's rate, 6,000 a minute across all links, and `/instances/` alone refuses it.

## Differences from the plan

- The plan said a token names the link. It does, and the Hub has no row of it, rather than a row with no person.
- **A share link's URL moved.** It is now `{veoveo_public_base}/shares/{secret}`. Before this, on Bioma, `create_share_link` answered `http://artifact.internal:8801/artifact/shares/...`, which no browser could reach, because Artifact has no public origin here and the tunnel no route. Share links had not worked on Bioma from outside.
- A preview's visit reuses `artifact.download_issued`, whose time is the most an origin lives, 24 hours.
- A limit counts visits, so a preview already opened outlives it until the link ends. Holding its origin is as good as holding the bytes it already gave.
- "The viewer offers a download" holds for `file-viewer`. An HTML artifact runs as itself and has none. The button was seen and not pressed.
- A file's path is the artifact's name, so an artifact without an extension goes to `file-viewer` whatever its type. Not tried.
- The library reads and opens. Uploading, sharing and deleting stay with the tools.

## Open

**The gateway's log holds a share link's path.** OpenShell's gateway logs each request's path, without its query, and the lines at 08:48 to 08:49 hold `/instances/{deployment}/artifact/shares/{secret}`. Media's provider callbacks, `/media/operations/{id}/{token}`, go the same way. These lines age out of the pod's log, and this work did not read where else they go. Anyone who can read them can open a live link. Changing the gateway, or moving the secret to the query, is the owner's decision: this work did neither.

## What this does not prove

- **Other profiles:** nothing ran in a browser signed in as `alex.rozgo@vrx.group`, or in the `bioma.ai` profile.
- **A link's expiry on Bioma.** A link lives at least a day. Only `tests/content_route.rs`, which waited out a real one that was nearly over.
- **A labelled artifact,** as above: component tests only.
- **An artifact with a declared viewer,** such as a USD file in Artifact. The choice is the same code as Lore's, and it was not tried.
- **Large files and long reads.** The largest was 21.7 MB, and no read outlived a forwarded token's minute.
- **Sign-in returning to `/view/artifact/...` through a real login.**
- **A browser that sends no Fetch Metadata** would get the signed GET, by the code. Not tried.
- **A browser other than Chrome.**
- **Real media.** Media's provider is the synthetic fake.
