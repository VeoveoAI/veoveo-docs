# A PDF viewer inside the platform, and why Artifact's downloads are attachments

2026-11-04. Coordinator: Claude Code (Opus 5.5). The owner decided that a PDF inside the platform uses a
proper viewer rather than the browser's, and that Artifact files must preview. Evidence for
[plan section 18](../PLAN.md#18-usd-a-viewer-and-agent-tools-from-bevy_openusd). No product code changed
and nothing was deployed.

## PDF.js in the normal frame

`pdfview.mjs`, in `~/k3s-builds/usd-20261104/` on the box, served PDF.js v6.5.438's prebuilt viewer
(`pdfjs-6.5.438-dist.zip`, 6.5 MB zipped, 22 MB unzipped, Apache-2.0) from a local stand-in for a
repository's origin, with the file on the same origin. The owner's Chrome loaded it through the Claude in
Chrome extension, in a Hub-like page whose frame had
`sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"`. The file was PDF.js's
own sample, a real 14-page paper. The first load went through a sign-in redirect inside the frame.

- The first page rendered, and the viewer reported 14 pages.
- Scrolling moved to page 2, where text and a vector figure rendered.
- The toolbar showed search, zoom, page navigation, annotation, print and save.
- The server saw one request for the PDF.

This replaces Chrome's built-in viewer inside the platform, which refused the sandboxed frame in the
[file types](2026-11-04-usd-file-types.md) and [previews](2026-11-04-usd-previews.md) tests. Search, print,
save and annotation were seen in the toolbar and not exercised.

## Existing viewers in the stack

`n8n/packages/nodes-base` depends on `pdfjs-dist`, to parse PDFs on the server. OpenCode's app handles
`application/pdf` as a prompt attachment. Neither has a viewer to reuse.

## Artifact

`veoveo-mcp-artifact/crates/veoveo-mcp-artifact/src/storage/sign.rs` signs every GetObject with an attachment
disposition. `kubernetes/WORKLOADS.md` in the Bioma installation names
`VEOVEO_STORAGE_SIGNING_ENDPOINT=https://veoveo.bioma.ai`, and its tunnel routes `/artifacts/` on that host to
object storage. So a signed URL is on the Hub's own origin, where a file served inline could run with the
person's session. That is why a preview needs another origin rather than a changed disposition. Artifact's
design lists its library App as pending, item M8.

## Not tested

Nothing ran behind the real Hub or against Artifact. Video, audio and text viewers on the `/view/` page do not
exist yet.
