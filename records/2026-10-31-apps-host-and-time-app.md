# Hub's Apps host and Time's App, deployed and probed

2026-10-31 (UTC; Friday evening Pacific). Coordinator: Claude Code (Opus 5.5). No model
calls. Plan section 13; checklist I1 to I4 and I7.

## What was deployed

| Component | Revision | Image or path | When (UTC) |
|---|---|---|---|
| Hub | `c4ab821`, then `57d07ae` | `hub@sha256:ad07151d…`, then `hub@sha256:d54d198c…` | applied 04:11, then 04:41; each sandbox swap about 21 s |
| SDK | `e7d5621` (App routes); `d6306ef` (surfaces) on `main` | | |
| Time | `4cc2bc5` | Lore `time` revision 9 `bd4f977d…`, pushed from the owner's Computer at 04:27:00; the factory recreated the instance, which served by 04:32:25 | |
| Bioma's installation | `cf5d28f`, `137c59f`, `b33fb6f` | Hub's `apps` service on 8081, `VEOVEO_APPS_SANDBOX_ORIGIN=https://sandbox.apps.veoveo.bioma.ai` in Hub's sandbox environment, the Hub digests | |
| Installation template, MCP template, docs | `f6bb3e0`, `5d5eb1d`, `b393e3c` | | |

Method: the box was reached through a RustDesk tunnel to its SSH, since this Mac and the box
were on different networks. Hub's image was built with the box's existing build script
(clone of the pushed revision, runtime target, smoke: BuildKit v0.34.1, uid 10001, no Lore
binary, `validate` ok), pushed to the in-cluster registry and applied with
`veoveo-installer apply hub` from the mirror of Bioma's installation at the pushed revision.
`plan` showed exactly the intended changes before each apply.

The Cloudflare side was done in another session: Advanced Certificate Manager, the
`*.apps.veoveo.bioma.ai` route to `vv-control--hub--apps.openshell.localhost` set through
the API (the dashboard refuses wildcards), its proxied CNAME and the certificate (Bioma
`f99d502`).

## Unplanned fixes

- **`hub.env` is a reviewed rotation.** Adding the sandbox origin to Hub's private
  `hub.env` made the `hub-claim` step refuse ("replacing it is a reviewed rotation"). The
  edit was reverted (the file back to 1063 bytes) and the origin, a public value, moved to
  Hub's sandbox environment in `installation.toml`.
- **The bridge's in-process request lacked the request correlation.** The first App load
  answered 503 "Apps unavailable"; Hub logged `resources/list failed: {"code":-32600,
  "message":"HTTP request correlation missing"}`. The bridge sends its request to Hub's
  MCP router in process, past the observation middleware that attaches the correlation
  Hub's MCP endpoint requires. Hub `57d07ae` carries the browser request's
  `RequestObservation` into the in-process request, so its records name the browser
  request as the design states. The component tests had used a fake MCP endpoint without
  that middleware; they now run through it, and the fake endpoint requires the
  correlation. 70 of 70 Apps and Computer tests pass.

## Probes, in the owner's Chrome, signed in

| Check | Result |
|---|---|
| I7 wildcard | `sandbox.apps.veoveo.bioma.ai` resolves through the tunnel; the certificate `CN=*.apps.veoveo.bioma.ai` (Google Trust Services WE1) verifies; before Hub served `apps` the gateway answered 404 "Service endpoint not found", after it the sandbox proxy page with its policy (`default-src 'none'`, inline script, `connect-src 'none'`, `frame-ancestors https://veoveo.bioma.ai`) |
| I1 direct URL | `https://veoveo.bioma.ai/apps/time/now` renders Time's App full page: the current time in America/Los_Angeles with its UTC, military, TAI, Unix, GPS and Julian projections, the clock quality against policy (uncertainty `unbounded`, the new explicit state), the caller's events and the tenant's calendars (none) and the resolver. Without a browser session, the bridge answers 401 `apps-sign-in-required`; the signed-out browser redirect was not exercised |
| I2 origins | The host page's frame is the proxy at `https://sandbox.apps.veoveo.bioma.ai/`; reaching into it from the host page throws `SecurityError`. A sandboxed `srcdoc` frame under the proxy's policy runs inline script with `window.origin` `"null"` and posts to its parent; `frame-src 'none'` does not block the `srcdoc` frame (measured in Chrome) |
| I3 bridge admission | From the signed-in page: `resources/read time://clock/current` answered; `resources/read artifact://artifacts` refused, "belongs to another server than the App `ui://time/now`"; `tools/call create_event` (Time's, unlinked) and `artifact__list_artifacts` refused, "not linked to the App"; `tasks/get` of a Task the App did not start: "unknown task id". Through the App's own interface, `resolve_time` resolved `2026-11-01T09:00` to Sunday 09:00 UTC−08:00, `17:00:00Z`, on the standard-time side of that morning's change |
| I4 Tasks and wakes | Not proven. The App's Task tool (`expand_schedule`) was not exercised, and `subscriptions/listen` is not served by the host yet: the App reports "Live updates are off" |

## Boundaries

- Exercised in one browser (Chrome on macOS) as one person (the installation's owner).
- Linux `docker build --target check .` was not run for Hub, the SDK or Time; the Mac
  Docker gates passed (SDK 323 of 323, Time 159 passed and 10 skipped), and Hub's targeted
  suites passed locally. Hub's full Docker check was not run after the fix.
- Time's contract change (I-JSON numbers) is breaking: clients sending the old fields are
  refused. Time's stored state was not reset; the App read it without errors.
- Not done: the reactive adapter, `?branch=`, `ui/open-link`, per-server app origins
  (the ingress does not pass the original hostname to Hub), and the remaining plan
  section 13 items.
