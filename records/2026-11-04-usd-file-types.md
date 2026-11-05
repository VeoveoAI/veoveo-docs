# USD viewer: what a repository file can do under each header choice

2026-11-04. Coordinator: Claude Code (Opus 5.5). The owner asked what serving every file as
`application/octet-stream` would cost people. Evidence for
[plan section 18](../PLAN.md#18-usd-a-viewer-and-agent-tools-from-bevy_openusd). No product code
changed and nothing was deployed.

`types.mjs`, in `~/k3s-builds/usd-20261104/` on the box, served synthetic files from a local origin
holding a `SameSite=Lax` session cookie, and the owner's Chrome 156 loaded them through the Claude in
Chrome extension. The site's data was cleared afterwards. Nothing navigated to an `octet-stream`
response, which would have started a download.

## Results

"Guarded" means `X-Content-Type-Options: nosniff` and `Content-Security-Policy` with `sandbox`. Lore's
`apply_security_headers` sends `default-src 'none'; sandbox`.

| File | How it was opened | Headers | Result |
|---|---|---|---|
| USD text | `fetch` | `octet-stream`, `nosniff` | Read normally |
| PNG | `fetch` | `octet-stream`, `nosniff` | Read normally |
| PNG | `<img>` | `octet-stream`, `nosniff` | Displays |
| PNG | `<img>` | real type, `nosniff` | Displays |
| PNG | `<img>` inside a sandboxed App frame | real type, guarded | Displays |
| SVG | `<img>` | real type, guarded | Displays |
| HTML | Opened in the tab | real type, `nosniff` only | **Its script ran and read the session**: the title became "SCRIPT RAN, session: person" |
| HTML | Opened in the tab | real type, guarded | Its text displays and its script did not run: the server saw exactly one session request, from the unguarded case |
| PDF | Opened in the tab | real type, `nosniff` only | Chrome's PDF viewer opens and reports one page |
| PDF | Opened in the tab | real type, guarded | The same |
| PDF | `<iframe>` inside a sandboxed App frame | real type, `nosniff` only | Chrome shows its broken-content icon |

## Boundaries

- The PDF page itself is dark in every screenshot, with or without the guard, while the toolbar and
  its page count show. It may be how the extension captures the viewer, or the synthetic PDF. A real
  PDF has to confirm it.
- Not tested: `text/plain` and video opened in a tab, SVG opened in a tab, and an `octet-stream`
  navigation. That a browser downloads the last of these is standard behavior, not a measurement here.
- These ran on a local origin, not behind the Hub.
