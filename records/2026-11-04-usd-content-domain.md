# Content on its own registrable domain

2026-11-04. Coordinator: Claude Code (Opus 5.5). The owner proposed a separate domain for content, such as
`veoveo-bioma.space`. This compares it with the same-site test in the
[previews record](2026-11-04-usd-previews.md). Evidence for
[plan section 18](../PLAN.md#18-usd-a-viewer-and-agent-tools-from-bevy_openusd). No product code changed, nothing was
deployed and no domain was registered.

## The test

`cross.mjs`, in `~/k3s-builds/usd-20261104/` on the box, is the previews test with one change. The content origin is on
another site, `t-3f9a1c7e.veoveo-bioma.localhost`, against `veoveo.localhost` for the Hub and
`usd.apps.veoveo.localhost` for an App. Its name stands in for an unguessable credential: it has no cookie and no sign-in.
The owner's Chrome loaded it through the Claude in Chrome extension, in the normal sandboxed frame, signed in to the Hub
and App stand-ins with `SameSite=Lax` cookies. Their data was cleared afterwards.

| What the file tried | Under the same site, earlier | On another site, now |
|---|---|---|
| Sibling script, WASM, `new Function`, WebGL2, WebGPU, IndexedDB, image, video, reading a sibling file | All work | All work |
| Read the Hub's `/secret` | Blocked, but arrived **with** the cookie | Blocked, arrived **without** it |
| Read the App origin's route | Blocked, but arrived **with** the cookie | Blocked, arrived **without** it |
| `no-cors` POST to the Hub | Arrived **with** the cookie; only an Origin check refused it | Arrived **without** it |
| Read `document.cookie`, or the Hub's page | Nothing, blocked | Nothing, blocked |

The server's counts of requests that carried a session were 0 for the Hub, 0 for the App and `false` for the POST.

## Names

On this date `veoveo-bioma.space` and `veoveo-content.space` had no NS or A records, and `whois` gave no answer for
either. `whois` answered "No match" for `veoveo-usercontent.com`. A registrar has to confirm any of them.

## `.space`

A web search found no current, `.space`-specific abuse rate or blocking statistic, and no source saying that corporate
filters block `.space` as a category. A 2018 analysis of Spamhaus numbers placed `.space` among TLDs with higher botnet
abuse rates than `.ru`. Reports say that some corporate filters block new, uncategorized domains by default, whatever
their TLD. No vendor's category lookup was tried.

## Not tested

The real domain, Cloudflare, the tunnel, TLS, the Hub minting or checking such a name, its expiry, and any browser but
Chrome.
