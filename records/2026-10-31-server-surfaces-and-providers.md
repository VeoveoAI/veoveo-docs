# Server surfaces, app origins and requested providers

2026-10-31 (UTC; Friday night Pacific). Coordinator: Claude Code (Opus 5.5). Plan section
13, steps 1 and 2 of the night's list; checklist I5, I6, I8 and I9. One model call was
made, for I9, recorded below.

## What was deployed

| Component | Revision | Image | When (UTC) |
|---|---|---|---|
| SDK | `154a473` (surfaces, already on `main`), `24bd67b` (contract text only) | | |
| Hub | `586338c`: the SDK's surfaces, registration answers, public routes | `hub@sha256:a7ce5271…` | applied 06:01:03 |
| Hub | `9401175`: servers' app origins | `hub@sha256:5b4450ba…` | applied 06:23:31 |
| Hub | `cd363a2`: requested providers | `hub@sha256:6c6a7eaa…` | applied 06:35:02 |
| Console | `37ad230`: `status` names ungranted providers | `console@sha256:ce347f3a…` | applied 06:48:30 |
| Bioma's installation | `65da1b0`, … `30a26ec`, the digest fix, the `vv-factory-model` profile, the grant, the Console pin | | |

Each Hub image was built on the box from the pushed revision (59 to 73 s, smoke: BuildKit
v0.34.1, uid 10001, no Lore binary, `validate` ok) and applied with `veoveo-installer
apply hub` after `plan` showed only the Hub image; each sandbox swap took 19 to 21 s.

## What the Hub does now

- **Registration answers.** A registration that declares surfaces gets
  `veoveo_public_base`, `{issuer origin}/instances/{deployment}/{slug}`, for a public
  route, and `veoveo_app_origin`, `{slug}.{apps domain}`, for an app origin, which is
  refused when the installation hosts no Apps or the slug is not a DNS label.
- **Public routes.** `/instances/{deployment}/{slug}/…` reaches the deployment within a
  declared prefix: plain paths only, a token bucket per prefix at its rate, its body
  limit, no `Cookie` in and no `Set-Cookie` out, `Host` set to the public base's host.
- **App origins.** The Apps listener tells `{slug}.{apps domain}` apart by
  `X-Forwarded-Host`, for a server that declares an app origin. A page load without a
  session goes to the issuer's `/app-origins/{slug}` with new state in a host-only
  cookie; the person's Computer session and the server's `app_origin` requirement admit
  them there, and a single-use code bound to that state is redeemed once at the origin's
  `/_veoveo/session` for the session cookie `__Host-veoveo-app`. Each request admits the
  family again, passes a bearer of it through the Hub's own profile authentication in
  process, routes to the selected instance and forwards with the origin's `Host` and the
  person's forwarded token.
- **Requested providers.** A branch's `openshell/providers.yaml` names providers;
  `factory.providers` grants each to repositories; an instance attaches the granted ones,
  a different set recreates its sandbox, and its status names the others.

The designs are in Hub's `DESIGN.md` (Server Registration, Public Routes, Server App
Origins, Factory Sandboxes) and the SDK's Apps and registration contracts.

## Component tests

| Test | Result |
|---|---|
| Hub's whole suite after each change | 424 passed in 29 binaries; the two failures are environmental and predate the changes: `browser_session` needs a Keycloak distribution at `/opt/keycloak`, and `database_conformance` reports 17 violations in test SQL files no change touched. The new tables and queries add none (155 queries and 34 tables, 17 violations, before and after) |
| `tests/public_routes.rs` | The base, forwarding (method, path, query, signature header, body; no cookie; `Host` the issuer's), 413 over the body limit, 404 outside a prefix, for a dot segment, an encoded one and an unknown deployment, and 429 with `Retry-After: 30` at two requests a minute |
| `tests/registration.rs`, `tests/apps.rs` | The public base for a public route; the app origin refused without Apps and named with them |
| `apps::tests::an_app_origin_signs_the_person_in_through_the_issuer_and_forwards_as_them` | The whole sign-in against the Hub's real profile authentication: 303 to the issuer with state, 401 for a fetch, 404 for the sandbox host and an undeclared slug; the entry's code; a signed-out entry signs in first; another browser's state cannot redeem; a code is redeemed once; the forwarded request carries the origin's host, the application's own cookie only and a forwarded JWT whose audience is the server's endpoint, living at most 60 s; the application's `Set-Cookie` of the Hub's cookie is dropped; with an ungranted permission requirement both the entry and requests answer 403 and nothing reaches the server |
| `tests/factory.rs`, `an_instance_gets_only_the_requested_providers_granted_to_its_repository` | Granted attached, ungranted named; the same request restarts, a changed one recreates; an invalid file fails at `create` |

## Deployed probes

| Check | Result |
|---|---|
| Public routes | `/instances/{unknown deployment}/…` and `/instances/nope/…` answer 404. No deployed server declares a public route yet: I5's own probe waits for n8n's hooks |
| App origins | `elsewhere.apps.veoveo.bioma.ai` (no server declares it) stays the proxy's: `/` 200, `/editor` 404; the entry signed out answers 303 to `/computer` for a page load and 401 for a fetch; signed in, the entry for Time, which declares no app origin, answers 404; Time's bridge still answers. No deployed server declares an app origin yet: I6's full probe waits for n8n's editor |
| I8 requested providers | Probe repository `provider-probe` (`b2fd9e7fb1eb508979d7bdd70fa8e4c8`), created and watched as the owner through Console's tools, revision 1 pushed 06:39:49 with `providers: [vv-factory-model, vv-factory-mail]`; the control plane grants `vv-factory-model` to it (revision `gcp-01a190ae-6ada-7263-a51e-6e7b75f6ca9f`, published by `veoveo-installer apply hub-control-plane`, which restarted Hub). Hub logged at 06:39:56 that `vv-factory-mail` is not granted; the sandbox `b68a-ee2aa0751e8a` is ready and its effective policy holds `_provider_vv_factory_model` (DeepInfra's chat completions, POST only) and the instance's own two providers, and no mail provider; Console's `status` answers `ungrantedProviders: ["vv-factory-mail"]` |
| I9 a model call | Not proven. Inside the probe sandbox `DEEPINFRA_API_KEY` holds an OpenShell placeholder (59 characters), not the key. A chat completion with it failed: OpenShell logged `NET:OPEN ALLOWED /usr/bin/curl -> api.deepinfra.com:443 [policy:_provider_vv_factory_model]` and 90 ms later `NET:FAIL api.deepinfra.com:443` and `NET:FAIL 198.18.0.3:443`, with a new DNS mapping each request; curl saw a TLS EOF. The same call from the owner's Computer, whose policy declares the equivalent rule, answered 200 in 841 ms, so the key and DeepInfra work. In the same sandbox a request to `api.openai.com` under the base policy's wildcard `**.*.*` rule completed inspected (401). The factory's base wildcard rule and the provider's exact rule both name the host; the cause in OpenShell's proxy is not yet known and goes to the OpenShell work |

The I9 attempt and the comparison from the Computer are the night's only model calls:
two chat completions to `XiaomiMiMo/MiMo-V2.6-Pro` with `max_tokens` 8, one answered.

## Unplanned fixes

- **Console dropped the new status field.** Console's `status` mirrors Hub's answer field
  by field, so `ungrantedProviders` did not reach a caller until Console `37ad230` added
  it, with its test.
- **A pin with an empty digest.** A deploy command read the image digest from the wrong
  place and committed Bioma's lock with `hub@` and no digest. The deploy script refused
  it, because the plan named more than the Hub image; the next commit set the digest and
  the script now also refuses a mirror that pins no full Hub digest.
- **Factory images must be glibc.** Every factory sandbox runs the installation's Lore
  CLI, built on Debian trixie, in its start command, so the Alpine image of the n8n fork
  cannot be a factory base; a Debian build of the same revision was started.

## Boundaries

- The app origin's whole flow is proven in a component test, not yet in production: no
  deployed server declares an app origin. The same holds for public routes.
- Requests on an app origin forward no protocol upgrade (WebSocket); they answer 501.
- The rate of a public route is counted per Hub replica.
- The Linux `docker build --target check .` of Hub was not run; the box's runtime build
  was.
