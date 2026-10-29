# One MCP extension per concept

2026-10-29 (UTC). Coordinator: Opus; the SDK, Hub and Time changes by a delegated Opus
agent, reviewed before each push. No model calls.

## Why

Four extension names named a feature, not a concept:
`ai.veoveo/task-retention-pin`, `ai.veoveo/hub-discovery-degradation`,
`ai.veoveo/app-resource-dependencies` and `ai.veoveo/app-tool-dependencies`. A name is one
concept; its features are typed members of its payload, and a separate name is only for a
feature that cannot be a member.

| Extension | Produced by | Read by | Before |
|---|---|---|---|
| `ai.veoveo/registration` | Every server | Hub | Unchanged |
| `ai.veoveo/authorization` | Every server | Hub's roles and listings; the SDK's admission | Unchanged |
| `ai.veoveo/usage` | Media's generation Task | Clients | Unchanged |
| `ai.veoveo/task` | Nobody sends it today | The SDK's Task dispatch; Time | `ai.veoveo/task-retention-pin`, a bare string |
| `ai.veoveo/hub` | Hub, on tool, resource, template and prompt listings | The SDK's catalog client and CLI | `ai.veoveo/hub-discovery-degradation` |
| App dependencies | Nobody | Nobody: no server ships an App, and Hub never attached them | Removed; `ai.veoveo/app` is left for the App design |

## Change

| Repository | Commit | What |
|---|---|---|
| SDK | `05273d1` | `_meta["ai.veoveo/task"]` is `TaskMeta` `{"retentionPin"}`; `_meta["ai.veoveo/hub"]` is `HubMeta` `{"discovery": {"failures"}}`, and `HubDiscoveryDegradation` is `HubDiscovery`; the App dependency types and their design are removed; the conventions state the rule |
| Hub | `fe59868` | Pins the SDK at `05273d1`; `HubDiscovery` in discovery, resources, templates, tools and prompts |
| Time | `2e0d4a1` | Pins core `120306e`, the SDK at `05273d1` and the SDK's rmcp `faa4e9d`, so one rmcp is in the graph; no source change |
| Installation | Bioma `c6c9a3b` | Hub and Hub CLI images, and the Computer template's release note |

## Checks

| Source | Mac | Linux |
|---|---|---|
| SDK `05273d1` | exit 0, 119 s, 280 passed, 3 skipped | exit 0, 75 s, 280 passed, 3 skipped |
| Hub `fe59868` | exit 0, 1007 s (a cold rebuild for the new pin), 360 passed, 2 skipped | exit 0, 170 s, 360 passed, 2 skipped |
| Time `2e0d4a1` | exit 0, 128 s, 143 passed, 10 skipped | exit 0, 166 s, 143 passed, 10 skipped |

The SDK's first run failed on its `client`-only feature, whose client used a server-only
trait; the client parses `HubMeta` itself in the commit above. The SDK count is 280: one
App alias test removed, a bare-pin refusal and a view without another server's tool added.

## Images and deploy

The first build stopped at the box's disk guard, 80%. `docker builder prune --filter
until=72h` reclaimed 7.2 GB and `until=24h` 9.6 GB, leaving 79%.

| Image | Digest | Build | Smoke |
|---|---|---|---|
| `hub` | `sha256:0721f028…` | 69 s | buildkit v0.34.1, uid 10001, no Lore binary, `validate` ok |
| `hub-sdk-cli` | `sha256:a364ff85…` | 69 s | the binary, 22,496,344 bytes, runs `--version` in Debian |

The full plan showed two steps. `apply templates`: `computer-v1` with the new CLI volume and
note, at 23:19:27. `apply hub`: 15.2 s, done at 23:19:42. The plan then matched 18 of 18.
Hub's warnings since: 4 slow connection acquisitions at its start and one watch of a
repository that no longer exists, seen 4 times since 10-28.

## Deployed probe

- **The owner's Computer:** `console__computer {restart}` at 23:21:03 moved it from
  `31282b4461fe` to `80fd73c9f7fd`, Ready by 23:21:25, with `hub-sdk-cli@sha256:a364ff85…`
  mounted. Its `veoveo-hub-sdk-cli tools` listed 65 tools and no failure.
- **A server stopped:** the owner's `time` instance on `main` was stopped from 23:22:38
  to 23:22:58. The CLI still listed its 21 tools from Hub's discovery cache, so no failure
  was shown; the `ai.veoveo/hub` failure path is proven by the SDK and Hub tests only.

## Boundaries

- **Other Computers** keep the previous CLI until they restart; it reads the old key, so
  it names no unavailable server until then.
- **Not repinned:** console, Artifact, Media, Embedding and the template use none of the
  renamed APIs. The installer pins the SDK at `a41c9cc` for its sign-in and uses none.
- **`veoveo-hub/proofs/README.md`** names the old keys on lines 192, 195 and 198; that file
  is another agent's, with uncommitted changes.
