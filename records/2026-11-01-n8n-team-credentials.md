# n8n runners: a team's credentials stay in its runner (J6)

2026-11-01 (UTC), 00:45 to 01:20. Coordinator: Claude Code (Opus 5.5). Probes: a build agent
(Claude Code, Sonnet). Plan section 14; checklist J6. Hub `bfd390d`, n8n parent at
veoveo-mcp-n8n `6fd6f57` with the links `team-a` and `team-b`.

## The grant

`vv-factory-model` was granted to team-a's repository (`01a194415d3c…`) alone:
- BiomaAI installation `f515754` declares it in `kubernetes/hub.example.json`'s
  `factory.providers`.
- The live control plane carries the same grant (`gcp-01a19489…`).

The Hub reads `factory.providers` only when it starts, so the build agent restarted the Hub
by hand (`openshell sandbox stop hub`, then `start`, ready at 00:52:04). A fix to read the
grants at each prepare is queued.

Afterwards:
- team-a's status shows `ungrantedProviders: null`, and its sandbox holds `vv-factory-model`;
- team-b's status still shows `ungrantedProviders: ["vv-factory-model"]`, and its sandbox
  holds only its Lore and registration providers.

## What the placeholders are

The provider (`vv-factory-model`, resource version 1, credential key `DEEPINFRA_API_KEY`)
was healthy. From team-a's sandbox, a fresh process (`os sandbox exec`, uid 10001) called
DeepInfra's chat completions with `curl` and `Bearer $DEEPINFRA_API_KEY`, and got 200 with a
`chat.completion` from `XiaomiMiMo/MiMo-V2.6-Pro`.

In that sandbox the variable holds a placeholder of 61 characters,
`openshell:resolve:env:v<20 digits>_DEEPINFRA_API_KEY`, not the bare form
`openshell:resolve:env:DEEPINFRA_API_KEY` of OpenShell's tests. The same placeholder, copied
into a workflow and sent by n8n's process, was refused with
`[engine:credential-binding] [reason:credential_unavailable]`. A placeholder is therefore
bound to the process tree it was given to, and one copied from another process does not
resolve. n8n also refuses `$env` in expressions (`access to env vars denied`), as the runner
configures it.

## The designed path: a credential the runner imports

The runner's server holds its own placeholder and, at each start, imports the credentials
the team's `n8n/instance.toml` maps, with the placeholder in place of each secret field. The
probe used probe commits, reverted afterwards:
- the parent admitted `n8n-nodes-base.httpRequest` and the credential type `httpBearerAuth`
  (field `token`, as in the fork's `HttpBearerAuth.credentials.ts`);
- each team mapped
  `[[credentials]] id = "deepinfra0001", type = "httpBearerAuth", secrets = { token = "DEEPINFRA_API_KEY" }`.

| Team | Result |
|---|---|
| team-a | n8n imported it ("Successfully imported 1 credential"). Its `leak-probe` workflow, whose HTTP Request node uses `deepinfra0001`, ran as execution 10 in 2883 ms: `"statusCode":200`, `"model":"XiaomiMiMo/MiMo-V2.6-Pro"`, `"object":"chat.completion"`, 9 tokens in total. The gateway logged `ALLOWED /usr/local/bin/node(0) -> api.deepinfra.com:443 [policy:_provider_vv_factory_model]` and `ALLOWED POST …/chat/completions`, with no credential-binding denial |
| team-b | Its start refused: "credential deepinfra0001 needs DEEPINFRA_API_KEY, which no attached provider sets" (restart count 1) |

The probe commits were reverted, team-b first. Both runners were ready again by 01:19:38,
with their usual workflows.

## What it proves

- A team's runner holds the providers granted to its repository and no others.
- A team cannot import a credential for a provider its repository is not granted: its runner
  refuses to start.
- A credential reaches n8n only through the runner's import, from the runner's own
  placeholder. A placeholder from another process or sandbox does not resolve.
- A model call from a team's workflow works through that path, the first real inference from
  a runner. It also corrects an earlier inference of the coordinator's, made from OpenShell's
  tests, that a placeholder is its variable's name and so open to anything in a sandbox.

## Boundaries

- The manual Hub restart stands in for the queued fix.
- Admitting `httpRequest` and `httpBearerAuth` was probe-only. Which node and credential types
  the parent admits by default is a decision still open.
