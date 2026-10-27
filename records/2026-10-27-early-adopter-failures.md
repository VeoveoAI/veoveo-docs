# Early adopters' failures

2026-10-27 (UTC; Slack times are MST, UTC−7). Coordinator: Opus. No model calls.

## What was reported

| Person | When | What they saw |
|---|---|---|
| Jonathan Larios | 21:38 | His agent, asked to create `veoveo-toolbox` from the MCP template, probed Hub with `curl` and `env`. Then every model call failed: "A credential placeholder in the request body cannot be forwarded". |
| Jonathan Flores | 20:04 | `ECONNREFUSED: Unable to connect`, retried by OpenCode ("El intento 4 se repetirá…"). |
| Jonathan Flores | before 23:01 | A call to his server failed because "several instances of `main`" were registered under the slug `template`. His agent renamed the server to `hello` and pushed revision 4, which served. |

A log survey of all four Computers found three platform defects behind these reports.

## 1. Signing in again broke a running Computer

Measured, Larios's Computer (`c2sfyi6eerlbr5p4uei`, started 18:21:08):
- 18:27:03–06: he signed in again in the browser (`/computer` → `/oauth/authorize` → `/computer/callback`).
- 18:27:06: Hub's handoff sent `ConfigureProviderRefresh` for the Hub and Lore providers.
- 18:27:15: the supervisor saw a provider environment change and published policy generation 2.
- 18:27:16 to 21:27:04: all 70 of OpenCode's Hub calls were refused (`[policy:hub engine:credential-binding] [reason:credential_unavailable]`). The gateway reported the same credential as `refreshed` throughout.

Cause:
- Each `ConfigureProviderRefresh` starts a new authorization epoch (`openshell-server/src/provider_refresh.rs`, `new_refresh_state`).
- The workload credential handle is derived from that epoch (`grpc/provider.rs`, `static_credential_binding`).
- So the placeholders in OpenCode's environment, issued when it started, stopped resolving.
- Hub's design assumed a running sandbox keeps receiving rotated credentials behind its placeholders. That is no longer how OpenShell behaves.

Consequences, measured:
- Without Hub's tools, his agent read `~/.config/opencode`, sent MCP requests to `$COMPUTER_HUB_URL` with `curl`, and printed the environment.
- The printed environment put a credential placeholder into the conversation.
- From then on the proxy refused that session's model calls ("POST request body credential traffic denied", 21:27:18 and 21:38:08).
- The `curl` probes were refused by the `artifact_bytes` policy, as designed.

Fix, Hub `5a1b926` (the design changed in the same commits):
- A sign-in to a ready Computer whose family is still admitted hands nothing off. Under the row lock custody uses, the browser joins that family, and the sign-in's own grant is dropped unused.
- Custody is handed off only at a Computer's first sign-in, or after its family was revoked or expired. That handoff now restarts a sandbox that exists, keeping its home, before the browser enters.

Recovery: his Computer's pod was restarted at 22:59:21, keeping its home volume. At 22:59:29 OpenCode's `server/discover`, `tools/list` and `resources/list` to Hub were allowed. His old chat session still holds the placeholder, so he must start a new one.

## 2. OpenCode offered models a Computer cannot reach

Measured:
- **Flores:** from 20:00:05 to 20:56:59 there were 33 refusals of `opencode → opencode.ai:443` (`transparent_tcp_policy_denied`), about every 10 s, and no DeepInfra call in that window.
- **Josue:** refusals of the same kind at 18:11–18:13 and 21:44–21:46. His DeepInfra calls start at 21:47.

Cause: without a key, OpenCode's `opencode.provider.opencode` plugin turns on its own provider with the key `public` and offers its free models. The policy admits only DeepInfra, so a session on one of those models only retried `ECONNREFUSED`.

Inferred: that they picked such a model. The destination shows it; I did not read their sessions.

Fix:
- Template installation `38490c5` and Bioma `a99bfea` disable the plugin and say so in the design and the Computer README.
- Image `computer@sha256:2ca7e6ae…`, built from installation `38490c5`. The smoke check found `opencode.json` equal to the source, and the `opencode` binary byte-identical to the deployed image's (sha256 `882a27da…`).
- `apply templates` at 23:08 published it with a release note. Each Computer takes it at its next start.

## 3. Two repositories served one slug

Measured:
- At 18:26:40 Hub listed `template` four times among the registered servers.
- At 20:57:30, 21:00:32 and 21:03:33 tool calls answered `-32602 server 'template' is unavailable: several instances of branch 'main' are registered`.
- Two of the owner's qualification repositories, g1-server (`98e6c55…`) and g1-rerun (`af25407…`), both served `template` on `main`.
- Both also used the schema `template` in the installation database. Flores's server served `template` too until his agent renamed it.
- The template's README says to replace the slug when starting a component. The handbook said nothing, and agents skip the README step.

Fix:
- Hub `5a1b926` refuses an instance whose slug a registered instance of another repository serves, with `invalid_client_metadata`: "the slug template is served by another repository's server; give this repository's server a slug of its own". The server already serving the slug keeps serving.
- The handbook (template installation `6101473`, Bioma `8b071d3`) tells agents that a repository started from a template gives its server a slug of its own before its first push.
- g1-server's `main` instance was retired by a push without `openshell/run`. Hub removed it within 8 s, leaving g1-rerun's two branches as the only server of `template`.

## Checks and deploy

| Step | Result |
|---|---|
| Hub gate at `3ddce5d` (sign-in join and restart) | 355 passed, 2 skipped, in 126 s |
| `.sqlx` regenerated for the slug query, the way the gate checks it | 1 new query file, in 16 s |
| Hub gate at `5a1b926` | 355 passed, 2 skipped, in 120 s; format, lint, `.sqlx` and deny clean |
| Hub image | `hub@sha256:18bf40fb…`, built and smoke-tested in 60 s |
| `apply hub hub-control-plane` (Bioma `8b071d3`) | Image and handbook applied; the next plan of `hub`, `hub-control-plane` and `templates`: 3 of 3 match |

Tests added:
- The handoff test now expects a second handoff to replace the running sandbox, keeping its home, with request IDs of the handoff.
- A session test has a second browser join the family of a ready Computer with no gateway call, and has a Computer whose custody is changing refuse a join.
- The instance registration test has another repository's instance of a served slug refused while the slug's instances stay routed.

## Deployed probes

| Probe | Result |
|---|---|
| Slug refusal | Repository `slug-probe` was created from the owner's Computer with g1-rerun's tree, which keeps the slug `template`, pushed at 23:15:39 and watched. It compiled, and at 23:20:05 its registration was refused with the message above, readable through `console__logs`. g1-rerun's `main` and `p2-s5` stayed registered. The probe's instance was then removed and the repository deleted. |
| Sign-in join | Not run: it needs a person's sign-in in a second browser. Covered by the gate. |

## Found on the way

- **Hub could not reach console for about 90 s after its restart.** From 23:15:42 Hub's requests to `console.internal:8805` never reached console's supervisor, and tool calls answered "upstream discovery exceeded ten seconds" (18 at 23:15, 5 at 23:16, none after). It recovered by itself. Cause unknown.
- **Larios's and Josue's homes were recreated** (volumes from 18:21:07 and 18:06:58). Their starts during the capacity shortage never became ready, and OpenShell rolled back each first create, deleting its new claim. Those Computers had never run, so nothing was lost. A rollback keeps a home restored from kept state (`openshell-driver-kubernetes/src/driver.rs`, `reap_stale_sandbox_runtime_bootstrap`).
- **Plan could not read the Helm releases** ("unknown flag: --all"). The login shell's `~/.local/bin/helm` is Helm 4.3.0 and shadows the system's 3.22.1. Plan read them earlier the same day.
- **A deleted repository's watch stays recorded** (`slug-probe`'s).

## Boundaries

- The sign-in join and the restart after a handoff are proven by the gate only.
- Flores's and Josue's Computers still run the earlier OpenCode configuration until their next start; What's new tells them. Larios's restart at 22:59 also preceded the template, so his is on the earlier configuration too.
- The cause of the 90 s console gap is not known.
