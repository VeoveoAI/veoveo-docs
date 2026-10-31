# n8n containment spike

2026-10-30 (Pacific; runs at 2026-10-31 01:31 to 02:28 UTC). Coordinator: Claude Code
(Opus 5.5). No model calls. Design under test:
[veoveo-mcp-n8n DESIGN.md](https://github.com/VeoveoAI/veoveo-mcp-n8n/blob/main/crates/veoveo-mcp-n8n/DESIGN.md),
uncommitted at the time of the runs.

What n8n does when configured the way the design says, before any OpenShell or Hub work.
This is a component spike in Docker; it proves n8n's side only.

Method:
- **Host:** Docker Desktop 29.8.2 on macOS, aarch64.
- **Images:** `n8nio/n8n:2.46.0` and `postgres:18` (server 18.6), by tag.
- **One sandbox, emulated:** a placeholder container owns a network namespace; n8n, a fake
  outside API and the test client join it with `--network container:`, so they reach each
  other only on loopback. PostgreSQL runs beside it on a Docker network.
- **Roles as core's database design makes them:** a group role `server_n8n` without login
  owns schema `n8n`; the login `n8n_srv` is a member of it.
- **n8n's environment:** loopback listener, `N8N_PATH=/n8n/editor/`, PostgreSQL schema
  `n8n` with `DB_TABLE_PREFIX=n8n_`, owner from `N8N_INSTANCE_OWNER_*`, diagnostics,
  version notifications, templates, community packages and n8n's MCP server off,
  environment and file access blocked, `NODES_EXCLUDE` naming the command and SSH nodes,
  and a credential overwrite for `httpHeaderAuth`.
- **Credentials:** one `oAuth2Api` credential with placeholder client ID, secret, access
  token and refresh token and no expiry, and one `httpHeaderAuth` credential with a stored
  value, imported with `n8n import:credentials` from plaintext JSON. The placeholders are
  fixed test strings, not OpenShell placeholders.
- **Workflow:** a webhook trigger, then three HTTP Request nodes against the fake API:
  OAuth2 to an endpoint answering 200, OAuth2 to one answering 401, and header auth. The
  fake API logs every request's `Authorization` header and answers its token endpoint 400.
- Scripts and logs stayed in the session's scratch directory; nothing was committed.

## Runs

| Run | Outcome |
|---|---|
| 1 | n8n never started. PostgreSQL logged `permission denied for database veoveo` on `CREATE SCHEMA IF NOT EXISTS "n8n"` at 01:31:54 and again at 01:35:55; n8n stayed at "Initializing n8n process" for 52 minutes, and `import:credentials` waited with it |
| 2 | `GRANT CREATE ON DATABASE veoveo TO server_n8n` added as a workaround to get past run 1. n8n started; the client logged in before n8n finished migrating, because `/healthz` answers before readiness |
| 3 | The client waited on `/healthz/readiness` (ready 2.0 s after start). It took the editor's HTML fallback for the public API |
| 4 | Every step completed; results below |
| 5 | The [VeoveoAI fork](https://github.com/VeoveoAI/n8n)'s change (branch `veoveo` over `n8n@2.46.0`, uncommitted), compiled by hand into the image's one changed file, `@n8n/typeorm/dist/driver/postgres/PostgresDriver.js`, and mounted over it. No database grant; `PGOPTIONS='-c role=server_n8n'`. Every step of run 4 passed again; see [option A](#option-a-run-5) |

## Results (run 4 unless noted)

| Check | Result |
|---|---|
| n8n reachable only inside the namespace | From outside it, `ECONNREFUSED` |
| `N8N_PATH` | Moves only the editor's pages: the editor answers 200 at `/n8n/editor/`. Login is at `/rest/login`, the public API at `/api/v1` and production webhooks at `/webhook/{path}`, all at the root; under the prefix they answer 404 |
| Owner from the environment | Login as the owner answered 200 with an `HttpOnly`, `Secure`, `SameSite` session cookie; no setup step |
| API key | `POST /rest/api-keys` with the owner's session and explicit scopes returned `rawApiKey`; `/api/v1/workflows` answered with it |
| Frontend settings | `urlBaseWebhook` `https://veoveo.example/n8n/hooks/` and `urlBaseEditor` `https://veoveo.example/n8n/editor` from `WEBHOOK_URL` and `N8N_EDITOR_BASE_URL`; templates, community nodes and telemetry off |
| `import:credentials` with plaintext data | Exit 0; the stored row holds none of the placeholder text |
| Workflow through the public API | Created (200), activated (200), webhook call answered 200, execution 1 `success`, mode `webhook` |
| OAuth2 placeholder | The 200 endpoint received `Authorization: Bearer <placeholder access token>` |
| OAuth2 refresh | The 401 answer was followed within 6 ms by `POST /oauth/token` with `grant_type=refresh_token`, the placeholder refresh token and HTTP Basic of the placeholder client ID and secret; the token endpoint's 400 failed the node |
| Credential overwrite | Not applied: the header endpoint received the stored value. n8n applies an overwrite only to an empty field (`credentials-overwrites.ts`: "Overwrite only if there is currently no data set") |
| Excluded node | A workflow with `executeCommand` could be stored, but activation answered 400 `Unrecognized node type: n8n-nodes-base.executeCommand` |
| Schema and prefix | 173 tables, all `n8n_*`, all in schema `n8n`, none in `public` |
| Table ownership | Every table owned by the login `n8n_srv`, not the group role `server_n8n` |

## Option A (run 5)

The fork's driver checks `pg_catalog.pg_namespace` before `CREATE SCHEMA`, and n8n's
PostgreSQL client (`pg` 8.21.0) reads `PGOPTIONS`.

| Check | Result |
|---|---|
| Start without CREATE on the database | Ready at `/healthz/readiness` 2.1 s after start; migrations ran; no `permission denied` |
| Table ownership | All 173 tables in schema `n8n` owned by the group role `server_n8n` |
| Everything else in run 4 | Owner login, API key, credential import (stored encrypted), workflow created and activated, webhook execution `success`, excluded node refused at activation, n8n refused from outside the namespace |

## What this means for the design

- **Unmodified n8n does not fit core's server roles.** n8n's TypeORM fork (`@n8n/typeorm`,
  `PostgresDriver.ts`) runs `CREATE SCHEMA IF NOT EXISTS` on connect for any schema but
  `public`, which PostgreSQL refuses without `CREATE` on the database, and n8n creates its
  tables as the login rather than the group role (runs 1 to 4). The VeoveoAI fork's
  schema check and `PGOPTIONS` close both (run 5).
- **The editor needs an origin of its own,** since n8n's REST, API and webhook routes stay
  at the root of its listener.
- **Credentials:** import every credential with placeholders; overwrites enforce nothing.
- **OAuth2:** n8n sends the placeholder access token as is and refreshes only on 401; under
  OpenShell the token endpoint has no rule for n8n, so that refresh would be refused.

## Boundaries

- Docker, not OpenShell: no proxy, no placeholder substitution, no network policy, no
  Landlock or seccomp. Loopback between processes in one OpenShell sandbox is documented
  by OpenShell (`docs/how-it-works/policies/network-rules.mdx`), not measured here.
- PostgreSQL ran without TLS; n8n's TLS settings against the platform roots are not tested.
- The workaround grant in runs 2 to 4 is not a decision.
- Run 5 proves the fork's change as hand-compiled into one file of the 2.46.0 image, not a
  build of the fork; the fork's own build and its test suite have not run.
- The Veoveo server, the bridge, the custom nodes, the Hub and the editor through a
  browser were not exercised.
