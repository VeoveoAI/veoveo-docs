# USD viewer: files running on their repository's own origin

2026-11-04. Coordinator: Claude Code (Opus 5.5). The owner rejected stripping files: this is a media
platform, and people preview, run, test and interact with media. This tests isolating a file instead,
in a frame on an origin that holds nothing else. Evidence for
[plan section 18](../PLAN.md#18-usd-a-viewer-and-agent-tools-from-bevy_openusd). It supersedes the
conclusion of the [file types record](2026-11-04-usd-file-types.md). No product code changed and
nothing was deployed.

`content.mjs`, in `~/k3s-builds/usd-20261104/` on the box, with local servers standing in for the Hub
(`veoveo.localhost`), an App's origin (`usd.apps.veoveo.localhost`) and two repository origins
(`r-aaa` and `r-bbb.apps.veoveo.localhost`), all same-site, each with its own `HttpOnly`,
`SameSite=Lax` session. The owner's Chrome loaded them through the Claude in Chrome extension. A plain
Hub page framed the file, which arrived with its real type, `nosniff` and `frame-ancestors`. The sites'
data was cleared afterwards.

## What ran

An HTML file from `r-aaa`, in a frame with and without
`sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"`, the same both ways:

| Check | Result |
|---|---|
| Its origin | `http://r-aaa.apps.veoveo.localhost:8715` |
| Sibling script by relative path | works |
| WASM compile, `new Function` | work |
| WebGL2 context, WebGPU adapter | work |
| IndexedDB | works |
| PNG by relative path | displays |
| 2 s H.264 MP4 by relative path | plays, seen in the screenshot |
| Reading a sibling file | works |

A PDF in a frame with no `sandbox` attribute **rendered, its text visible in the screenshot** with
Chrome's viewer toolbar. With the `sandbox` attribute above, Chrome shows its broken-content icon. This
settles the earlier record's open question about the dark PDF page for the framed case.

## What a hostile file reached

The same file tried each of these as the viewing person, once per frame kind:

| Attempt | What the file saw | What the server saw |
|---|---|---|
| Read `document.cookie` | nothing | |
| Read the Hub's `/secret` | blocked, `TypeError` | **The request arrived with the Hub's cookie** |
| Read the App origin's route | blocked, `TypeError` | **It arrived with the App's cookie** |
| Read the other repository's origin | blocked, `TypeError` | **It arrived with that origin's cookie** |
| Read the Hub's page | blocked, `SecurityError` | |
| `no-cors` POST to the Hub | sent, opaque | **It arrived with the cookie and `Origin: r-aaa...`; refused only by the test's Origin check** |

So the browser protects what a file can read, because of CORS and the same-origin policy. It does not
stop same-site requests from carrying cookies: Lax cookies flow between these names.

## The Hub's position, from its code

- Its cookies are `__Host-computer`, `__Host-veoveo-app` and the like, which a sibling name cannot set.
- `apps/bridge.rs:300`, `computers/proxy.rs:380`, `computers/api.rs` and `oauth/device.rs` require the
  exact `Origin` on unsafe requests.
- `apps/server_origin.rs`'s forward to an app origin has no such check, so a same-site POST would
  reach a server's authenticated routes with the session. The plan adds the check.

## Not tested

- Behind the real Hub, its sign-in chain on a repository origin, and a real Lore token.
- A separate registrable domain, which would stop those cookies being sent at all. It would make the
  origin's own cookie third-party in the frame, so it would need another way to carry the session.
- `allow-top-navigation` behavior without the `sandbox` attribute.
