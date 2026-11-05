# The content domain in Cloudflare

2026-11-04 (local; 2026-11-05 UTC). Coordinator: Claude Code (Opus 5.5). Evidence for
[plan section 18](../PLAN.md#18-usd-a-viewer-and-agent-tools-from-bevy_openusd). The owner registered
`veoveo-bioma.space` at Namecheap and asked for the tunnel to be set up from the Linux box. Scripts and backups of the
live tunnel configuration are in `~/k3s-builds/usd-20261104/cf/` on the box. No Hub or cluster change was made.

## What was done, and by whom

| Item | By | Result |
|---|---|---|
| Zone on the Free plan, nameservers | The owner, with a dashboard session | Active; `lia` and `merlin.ns.cloudflare.com` |
| Universal certificate | Cloudflare | Served as `*.veoveo-bioma.space, veoveo-bioma.space`, issued by Let's Encrypt |
| Cache rule "Bypass cache - veoveo-bioma.space" | Dashboard session | Deployed. The box's token was refused for rulesets |
| Email obfuscation, Rocket Loader and Automatic HTTPS Rewrites off | Both | Reported by the dashboard session, set again through the API |
| Server-side excludes and Mirage off, browser cache TTL 0 (respect the origin), Always Use HTTPS on, SSL strict | The box, through the API | Each returned success |
| Polish | The box | Refused: "Not allowed to edit zone setting polish" |
| Proxied wildcard CNAME to the tunnel | The box, through the API | Created |
| Route `*.veoveo-bioma.space`, its `originRequest` copied from the `*.apps` route | The box, through the API | Tunnel `veoveo-bioma-ai`, version 11 to 12 |

The script checked, before sending, that every existing route was unchanged and the catch-all stayed last. It would have
restored the prior configuration had an existing host changed its answer.

## Measured afterwards

| Request | Answer |
|---|---|
| `https://veoveo.bioma.ai/`, before and after | 404, unchanged |
| `https://sandbox.apps.veoveo.bioma.ai/`, before and after | 200, unchanged |
| `https://x1.veoveo-bioma.space/` | 200, the Hub's sandbox proxy page, since the Hub does not know this domain yet |
| `https://x1.veoveo-bioma.space/anything` | 404 |
| `https://x1.veoveo-bioma.space/a.png`, twice | 404, `cf-cache-status: DYNAMIC` both times |
| `https://sandbox.apps.veoveo.bioma.ai/a.png`, the control | 404, `cf-cache-status: MISS` |

The control shows that Cloudflare treats that path as cacheable on the zone with no rule, and the content domain does not.

## Left as they were

The zone imported an apex A record, a `www` CNAME and MX records from the registrar. They are unused here and do not
conflict with the wildcard.

## Not tested

A token-named request through the Hub, which does not exist yet.
