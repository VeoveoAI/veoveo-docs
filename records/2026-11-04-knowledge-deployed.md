# 2026-11-04: Knowledge deployed: Artifact and Time search their own records by meaning and words

Plan section 17 ([plan](../PLAN.md)), from the survey
([record](2026-11-03-knowledge-port-survey.md)). Deployed on the K3s box `rozgo-sim-pc`, public
host `https://veoveo.bioma.ai`. Probes ran from the owner's two Computers: A = `rozgo@bioma.ai`
(workspace `c4itoit73lpkaheav7u`), M = `alex.rozgo@vrx.group` (workspace `cdjdlsct62djm3cnhv5`).
Scripts and logs: `~/k3s-builds/knowledge-20261104/` (`probe.sh`, `probe.log`, `probe-run1.log`,
`k8.sh`, `ka.sh`, `ka-run.sh`, `ka-verify.py`, `acceptance.log`, `acceptance-verify.log`,
`acceptance/messages.json`, `build-summary.log`, `digests.tsv`, `apply.out`, `lore-time.log`).

## Deployed

| Component | Revision | Image |
|---|---|---|
| Core | `a8dafe9` | |
| SDK and Hub CLI | `b820f05` | `hub-sdk-cli@sha256:6cdbd7ed…` |
| Hub | `e86466e` (SDK `22ff657`, core `97e85e0`) | `hub@sha256:441db722…` |
| Artifact | `d570e06` | `artifact@sha256:4d70f989…` |
| Media and its fake provider | `6a85dce` | `media@sha256:a91bb112…`, `media-provider@sha256:f7bcaa75…` |
| Embedding | `e2d2b07` | `embedding@sha256:9b712675…` |
| Embedding runtime | `eb0f5f7` | `runtime-embedding@sha256:3a60c982…` |
| Time | `15775e1`, Lore `time` revision 13 `d332b880…`, served by the factory | |
| Template installation | `217759a` | |
| Bioma installation | `b9f4250` (lock `e86d162`), control plane `gcp-01a1a6e6-99ef-7c13-b115-3e922e77cd4d` | |
| Computer version | `ee1c6a537991`; both owner Computers restarted on it at 14:22:54 UTC | |

The stored vectors name the model `google/embeddinggemma-2@914f7f89142e33e77833254d9c9b90c3cef7303b`
(`knowledge_model`), 768 dimensions.

## Component checks

Each repository's `docker build --target check .` on the Mac and on the box (Linux x86_64), from a
`git archive` of the pushed commit; every repository was pushed to `main` only after both passed.

| Repository | Commit | Tests | Mac | Linux |
|---|---|---|---|---|
| veoveo-core | `a8dafe9` | 373 passed, 2 skipped | 224 s | 189 s |
| veoveo-hub-sdk | `b820f05` | 380 passed, 3 skipped | 266 s | 255 s |
| veoveo-mcp-embedding | `e2d2b07` | 41 passed, 5 skipped | 145 s | 143 s |
| veoveo-hub | `e86466e` | 484 passed, 2 skipped | 253 s | 289 s |
| veoveo-mcp-artifact | `d570e06` | 117 passed, 9 skipped | 173 s | 191 s |
| veoveo-mcp-media | `6a85dce` | 74 passed, 11 skipped | 132 s | 169 s |
| veoveo-mcp-time | `15775e1` | 170 passed, 10 skipped | 174 s | 213 s |
| BiomaAI/veoveo-installation (installer) | `b9f4250` | pass | 92 s | 95 s |

The SDK's `pg_knowledge` tests and the servers' knowledge tests use synthetic embeddings (word and
byte hashes from a fake `Embedder`), so they prove indexing, the read rule before the limit, the
stale-vector guard and ranking mechanics, not retrieval quality.

## Rollout

- Images: the sweep's `build-all.sh`, `ONLY="hub artifact embedding media media-provider hub-sdk-cli"`,
  441 s, each smoke-tested and its registry digest verified; the runtime image `eb0f5f7` was built
  earlier (smoke as uid 10001, 6 473 328 537 bytes).
- `veoveo-installer plan`, then `apply` (all steps), rc 0 in 131 s: the Computer template, Hub,
  Artifact (with its new `hub_token_exchange` and `embedding_calls` rules), Media, media-provider,
  Embedding (its Artifact rules removed), the Embedding runtime, and the control plane (the
  Hub's `knowledge` skill). No reset: Artifact and Time added their migration `0002_knowledge` at
  start (both `success = t`); all 16 existing artifacts got their generated word column.
- Time: pushed into Lore from A's Computer at 14:12:12 UTC; the factory served `d332b880…` with its
  sandbox ready.
- Computers: `console__computer {"restart": true}` as each owner; both answered version
  `ee1c6a537991`, no update pending.

## Deployed probes (`probe.sh`, second run 14:36:39 to 14:37:24 UTC: 29 PASS, 0 FAIL)

The images are two red discs the script draws, a 96x96 and a 128x128 PNG: synthetic pixels in
valid PNGs, embedded by the deployed model on the GPU. Ranks are over A's own embedded records,
1 to 3 hits, so they show the mechanics, not retrieval quality at scale.

| # | Measured |
|---|---|
| K0 | `artifact__search_knowledge` and `time__search_knowledge` listed; the templates name `artifact.artifacts` and `time.events` in `_meta["ai.veoveo/knowledge"]` |
| K1 | A text artifact named `kite-… red kite gliding over desert dunes.txt`: `complete_upload` 472 ms; found by words 818 ms later at rank 0, before its Task was followed |
| K2 | `complete_upload`'s `_meta["io.modelcontextprotocol/related-task"]` names the Hub Task `gtr_8fuMyj…`; `tasks get` saw it completed 1 260 ms after the call returned; then "a bird of prey soaring above sand hills" (no shared word) found it at rank 0 |
| K3 | The disc's index Task completed in 2 892 ms; a query with the same image ranked it first; "a red circle" ranked it first of 2; a different disc (another size, place and red) as the query ranked the first disc first of 3, itself second |
| K4 | M did not find A's private artifact; M found it 792 ms after A granted a group M belongs to read; lost it 1 186 ms after A removed M from the group; found it by meaning 765 ms after a personal read grant |
| K5 | Every hit read back with `resources/read` for the same caller, M's through the group grant |
| K6 | An event `moon-… harvest moon picnic by the lake`: created 481 ms, found by words 799 ms, its index Task completed 1 238 ms after `create_event` returned, found by "an evening meal outdoors under the full moon"; M never found it |
| K7 | Time answered an image query (the disc) with 2 hits from records that hold only text |
| K8 | `embedding__embed` with one hex digit of `X-Amz-Signature` changed: refused in 614 ms, `runtime rejected input before inference (source_refused); zero actual usage recorded`, as JSON-RPC error -32603; no URL or signature in the answer |
| K9 | M's `tasks get` on A's index Task: `-32602 unknown task id` |
| K10 | `media__run` (fake provider, synthetic bytes) succeeded on Artifact's new contract in 10 021 ms and its output `output-0.png` was found by words; it has no vector: Embedding's runtime answered `preprocessing_failed`, zero usage, because the fixture's 64 KiB `image/png` is not a decodable image. The call reached the runtime as Media → Artifact → Embedding for A, so the delegated exchange was admitted |

The first run (14:33:29, `probe-run1.log`) had 26 PASS and 2 FAIL, both the probe's own checks:
K8 looked for `source_refused` in the result while Embedding answers it as a JSON-RPC error (its
log shows `source_refused` at 14:34:00), and K10 expected a vector where the fixture bytes cannot
be decoded. K9's text match missed the pretty-printed refusal. The checks were corrected and the
whole suite run again.

## Model-driven acceptance (OpenCode, 14:39:18 to 14:45:12 UTC)

`ka.sh` made two records as A first: `IMG_4821.png` (the 96x96 disc, a name that says nothing of
it; index Task completed in 2 836 ms) and the event "Family picnic by the lake under the harvest
moon" (index Task 2 863 ms). OpenCode in A's Computer, session `ses_e58fffd43ffeJkVRkEAB7IBeju`,
model explicitly `deepinfra/XiaomiMiMo/MiMo-V2.6-Pro` (every assistant turn), got one prompt: find,
by what they show or mean and not by name, the picture of a red circle in Artifact and the event
about an outdoor meal under the full moon in Time, read each through its URI, and give names and
URIs. Session outcome `succeeded`, 354.3 s, 40 167 input, 4 428 output and 4 852 reasoning tokens,
USD 0.0273.

Recorded tool sequence (`acceptance-verify.log`, 20 calls, all completed):
1. `skill` `hub:veoveo/knowledge`.
2. Code mode `search` for `search_knowledge`.
3. One `execute` calling `tools.hub.artifact__search_knowledge` ("a picture showing a red
   circle") and `tools.hub.time__search_knowledge` together: Artifact's only hit was
   `IMG_4821.png`; Time's first hit was the new event, then the two probe events.
4. `read_mcp_resource` on all four URIs.
5. Calls 5 to 20: the agent confirmed the picture by its pixels, unasked. It loaded
   `artifact-transfers`, signed a download, and tried `fetch` from code mode three times: two
   failed on the sandbox's fetch API, and the third was refused by the Computer's policy
   (`policy_denied`). It then downloaded through `veoveo-hub-sdk-cli` (337 bytes, SHA-256
   `dbec2fe4…`) and read the PNG.

The answer named `IMG_4821.png` with `artifact://artifacts/01a1a6ff-e5bf-7c80-b818-2d292a95b555`
and the event with `time://events/event-01a1a6ff-f6bb-7b82-9a3e-a8faa3020b02`, and pointed out the
two `moon-…` probe events as near-duplicates. All seven checks passed: model, skill, both
searches holding the expected record, both reads, the answer naming both URIs.

## Unplanned fixes

- **Core** `a8dafe9`: `Conformance::extensions(names)`. Core's database conformance check
  builds its own test database, so Artifact's migration using `_extensions.vector` could not
  pass it.
- **SDK** `ed8d2f8`: the CLI's `call` prints the result's `_meta`. It printed only content and
  structured content, so a CLI user could not see the Task a write names. The deployed probes
  read the Task this way.
- **Media** `6a85dce`: `complete_upload`'s result gained `indexed` (how another server's upload
  was indexed). The deployed Media decodes that result with `deny_unknown_fields`, so it would
  have failed against the new Artifact. Media moved to Artifact `d570e06`, core `a8dafe9` and
  SDK `b820f05`, with pgvector in its test image and one regenerated query file.
- **Installation** `b9f4250`: the new Computer version needed its own release note, which the
  plan refused without.

## Boundaries and open items

- **Retrieval quality:** not measured. The plan's evaluation (judged text and media queries,
  recall at 10 on Mac MPS and Linux CUDA) is still to do. Audio and video queries were not
  probed on the deployment.
- **Failures nobody sees:**
  - A record whose media Embedding cannot decode is stored without a vector and is found by
    words. For a person's own upload this is the Task's failure.
  - For another server's write (K10), Artifact returns it in `indexed`. Artifact does not log
    it, and Media's `ArtifactClient` returns only the record, so it shows only in Embedding's
    log.
  - Time logs a delegated failure but does not return it.
  - A failed Embedding batch is not retried.
- **No backfill:** the 16 artifacts that existed before the deploy have no vectors. They are
  found by words until they are written again.
- **Error shape:** Embedding answers a runtime refusal as a JSON-RPC error (-32603), not as a
  tool error result.
- **Other people's Computers** keep running version `0e9996d5296e` until they restart. They
  see the update and its note. Search works for them, because the skill and the tools come from
  the Hub; only their CLI lacks `_meta`.
- **Code mode:** in the acceptance, OpenCode's code-mode `fetch` of a signed Artifact GET was
  refused by the Computer's policy. The agent fell back to the CLI, as the `artifact-transfers`
  skill says.
