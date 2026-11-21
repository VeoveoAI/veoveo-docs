# Fork rollout reconciliation and the actual Apps in Mac Chrome

2026-11-20. The operator connected to `rozgo-sim-pc` through the owner's RustDesk tunnel,
`127.0.0.1:2222` to the box's SSH port, then checked the audited installation against the running
cluster. The [November 18–19 rollout](https://github.com/VeoveoAI/veoveo-docs/blob/main/records/2026-11-19-fork-sync.md)
was already applied: after renewing the operator's sign-in, a fresh installer plan returned
**18 of 18 steps matching**, exit 0, in **6.421 s**, with no stderr. This run required no build,
`apply`, image replacement or Computer restart.

The exercised Apps rendered and their recorded navigation, preview and conversion paths worked
in Mac Chrome. OpenCode completed its read-only status smoke on the explicitly verified MiMo
model. The n8n Assistant completed tool discovery and conversion but **failed the requested
authoritative-current-time criterion** by resolving a model-supplied session timestamp; its
runtime model identity was not exposed. The Result node also showed a `?` icon despite being
registered. The detailed outcomes and coverage limits follow.

The coordinator was Codex's primary agent; deployment and browser checks were assigned to
`builder`, GPT-6 Luna, and this record to `coder`, GPT-6.1 Sol. The work used the actual signed-in
owner's Mac Chrome. No token, signed URL, credential, callback state or browser cookie is recorded here.

## Source and deployment reconciliation

The target was the previously audited fork set, rather than another upstream update:

| Fork | Branch and revision | Adopted upstream release |
|---|---|---|
| rmcp | `veoveo/main` `1e7caf018db7eb3bed2e81023e10fc0ce58af8a5` | `rmcp-v3.11.0`, `165f8fd` |
| OpenShell | `main` `5f630f42ccf26336419a90ce01cccba40dfbf6c1` | `v0.1.9`, `ce58cf8e9` |
| Lore | `main` `782e00ffa60468ef779cb818a87f56cdc75cb16a` | `v0.14.0`, `317f48b9` |
| OpenCode | `main` `7d839dc296d287c42291674867076600a02b695f` | `v2.3.2`, `c0ad18b402` |
| n8n | `veoveo` `f98c09da89bea21e5aca2761481cef6f6fc1d53b` | `n8n@2.48.5`, `71592af7d2` |

The preceding read-only audit compared these branch heads with the live VeoveoAI remotes:
all five matched exactly, and each adopted upstream release commit was an ancestor of its
fork head. The 12 Rust consumers' `Cargo.toml` and `Cargo.lock` files all pinned rmcp
`=3.11.0` at `1e7caf018db7eb3bed2e81023e10fc0ce58af8a5`; Core has no direct rmcp pin.
Those audit scripts took 23.30 s and 20.04 s. Their local outputs were
`/tmp/veoveo-fork-audit-2026-11-20.log` (383,573 bytes, SHA-256
`d7f534dafd9899e5fe660dc15301cd8b6f277c611bbd7c256ebb7b74c8d2635b`) and
`/tmp/veoveo-fork-targets-2026-11-20.log` (7,233 bytes, SHA-256
`8c6268d46fc92e50a9f6bf4bc25862f9b7ba7e5825c7a88973d375bf880b7c11`).

The general `/home/rozgo/VeoveoAI` checkout was old and incomplete. The installer instead used the
existing clean, detached Bioma source at
`/home/rozgo/k3s-builds/lore-actions-20261031/inst`, revision
`e0c02a8eb0ea2fccaf138be471638d8213ce8858`. Its executable was
`/home/rozgo/k3s-builds/installer-20261025/target/release/veoveo-installer`; the retained build log,
`~/k3s-builds/sync-20261118/installer-build.log`, identifies the OpenShell `5f630f42` and rmcp
`1e7caf0` Cargo Git revisions.

| Fresh operation | Result | Time |
|---|---|---|
| SSH over the existing RustDesk tunnel, with existing host trust | Connected as `rozgo` to `rozgo-sim-pc` | Not separately instrumented |
| Installer plan before sign-in renewal | Exit 2; 17 of 18 steps matched; Hub control-plane unreadable because the stored operator grant expired on 2026-11-09 | 5.992 s |
| Operator login through the actual signed-in Chrome | A later authenticated plan could read and compare the control plane | No separate callback timing recorded |
| Installer plan after sign-in renewal | Exit 0; 18 of 18 steps matched; stderr empty | 6.421 s |

Both fresh plans used the existing wrapper:

```sh
~/k3s-builds/sync-20261118/inst.sh plan
```

The wrapper selected the clean installation source above and the operator's existing private
configuration. The last plan is `/tmp/sync20261120-plan-after-login.log` on `rozgo-sim-pc`.
It measures agreement with this installation's declared state; it is not a new execution of
the component test suites.

## Mac Chrome

The actual browser checks used the owner's regular Chrome through the Chrome DevTools/CDP tools,
with a dedicated test tab created for `https://veoveo.bioma.ai`. It was already authenticated: the
home page rendered eight App links without a sign-in. The tab identifier was 77, an execution-local
identity, not an application identifier. The browser's user agent reported Chrome `157.0.0.0`;
the viewport was 1728 × 997 CSS pixels at device-pixel ratio 2. Its `macOS 10_15_7` user-agent
substring is a compatibility value, not a measurement of the installed macOS version.

The initial direct-WebSocket attempt against the documented port 9222 timed out. A separate Chrome
debug profile on 9223 was not the owner's signed-in profile and was excluded from acceptance. The
Chrome DevTools tools reached the intended regular browser. No result below is attributed to the
other profile or its reported browser version.

The primary agent visually reviewed the home, Factory, Repo preview, file viewer and personal
n8n screenshots as the worker supplied them. Tool-call durations below are the CDP tool's
elapsed times; a later wait or snapshot is identified separately and is not treated as a measured
end-to-end page-load latency.

| Scenario and input | Observed result | Timing |
|---|---|---|
| Open the authenticated home page in the new tab | Eight App links rendered | No separate page-ready timing recorded |
| Home → Factory | Seven servers, two links and five data environments; expected running revisions visible | Click tool 1.272 s |
| Home → Repo → Activity | Loaded the n8n `9c93992` change with two files, the n8n 2.48.5 base and Node 26.13.0 | Click tool 1.242 s; the intermediate `Reading…` state completed before the later snapshot |
| Repo → Repositories → `preview-samples` → media → Images → `pic.png` | Actual diagram image and metadata rendered in the gallery's preview; branch `main`, 98,976 bytes | No separate timing recorded |
| Repo preview → Open → image viewer | The same PNG visibly rendered; Zoom changed 100% to 115%, and Reset returned to 100%; no download | Zoom click tool 249 ms |
| Home → n8n overview | Two teams: team-a with six workflows, team-b with two; active, zero failures over 24 h, no recent executions | Click tool 1.289 s; initial `Finding your teams` resolved after a 2 s wait |
| n8n overview → View `hello-run` | Read-only node panel showed Veoveo Trigger, Greeting (`n8n-nodes-base.set`) and Veoveo Result, and a file digest | No separate timing recorded |
| n8n overview → Edit in my Computer | Personal n8n editor opened Hello Run, with Editor, Executions and Evaluations tabs and the three-node graph | Click tool 3.181 s; editor observed after another 2 s wait |
| Artifact Library → Images → existing `sample picture.png` → Open | Gallery showed an available, private `image/png`, 98,976 bytes; the actual file viewer rendered it | About 1.5 s in the viewer's `Parsing` state; no download |
| Time → resolve `2026-11-20T12:00:00Z` | Europe/Helsinki 14:00, UTC 12:00, DTG `201200ZNOV26`, Unix `1795176000`, and TAI/GPS outputs | No separate timing recorded |
| Computer → OpenCode → existing session | Session and composer loaded with DeepInfra/MiMo selected | No new model call in this UI scenario |
| USD → `usdcraft-10k` → compact microwave → Open | The existing 1,704,242-byte `model.usdc` rendered as a 3D microwave, with 144 prims; viewer page, JS, WASM and stage requests returned 200 | No separate page-ready timing recorded |

Factory showed n8n program revision `5c33b7a0`, linked team-a `607d2292`, linked team-b `5aec4bb1`,
Repo `45a20a2f`, Template `59fd0f31`, Thumb `db6d6239`, Time `c030f582` and USD `10b97c1e`.
The program revision and linked repository revisions name different source inputs. Factory's
five recorded network requests all returned 200: three GETs and two POSTs. The visible
`Over soft cap rozgo 10+ / 4`, `No grant` and `Watched idle` indicators were retained as observations;
they do not by themselves establish a serving failure.

The n8n flow opened the editor without deliberately changing, running or publishing a workflow.
Its native **Edit in my Computer** action may clone a team checkout and apply workflow drafts to
the person's Computer, as its design specifies. The Result node's graph icon displayed `?`;
the DOM identified its type as `CUSTOM.veoveoResult`. All 88 listed personal-editor network
requests returned 200 and no console message was recorded. Loading the graph is not proof of
workflow execution. A same-origin read of `types/nodes.json` returned HTTP 200 and 18,128,178
bytes. It included `CUSTOM.veoveoResult` v1, display name **Veoveo Result**, icon
`fa:flag-checkered`, its output description, a `run` JSON property defaulting to
`={{ $("Veoveo Trigger").first().json.veoveo }}`, and main input/output. The custom node was
registered; the `?` was an observed icon-rendering defect. Source inspection suggests an
unsupported icon mapping, but no regression comparison proved that cause. Its parameter panel
and execution were not tested, and no code fix was made.

Time's UI reported unbounded uncertainty, stratum 16, zero sources and not synchronized.
The [Time design](https://github.com/VeoveoAI/veoveo-mcp-time/blob/main/crates/veoveo-mcp-time/DESIGN.md)
and `ClockSource::System` implementation report those values in `system_clock_unmeasured` mode,
without a bounded observation. The deployed observation-socket configuration was not independently read; absence
of that observation is an inference, and the UI is not evidence that the host's clock was wrong.
The deterministic time conversion above passed independently of the clock-quality display.

The USD screenshot's HUD displayed 60 fps and 66 MB at capture; this is not a benchmark. The
static sample had no variants or payloads. Sending ArrowRight to the focused canvas produced no
visible camera change; that action establishes no orbit or zoom coverage.

| Screenshot | Bytes | SHA-256 |
|---|---:|---|
| [home.png](../../.tmp/qualification-2026-11-20/home.png) | 351,905 | `f498c96c85c1203b5337a3657662bd3b6c1d3defe1b4d3cdaa46f85b9916ea36` |
| [factory.png](../../.tmp/qualification-2026-11-20/factory.png) | 360,055 | `ea9a48b5d048bd07d340a78208984e4cf92bf0d872623eb47241cd914a98f4fd` |
| [repo.png](../../.tmp/qualification-2026-11-20/repo.png) (intermediate loading state) | 436,072 | `04c3f50ef0513b6041ff19b705f68b8faab21fdd54eabbe3ceab5369a99125fa` |
| [repo-preview.png](../../.tmp/qualification-2026-11-20/repo-preview.png) | 783,157 | `a2c8233bc5bfe5ad22814587655ae8eea347a9acd80ec10b8494ff1eef26a776` |
| [preview-open.png](../../.tmp/qualification-2026-11-20/preview-open.png) | 418,057 | `7dea412dedbaf06428ff69f4ae20afc550639d455be7cc46878e39f77730b728` |
| [n8n-editor.png](../../.tmp/qualification-2026-11-20/n8n-editor.png) | 205,290 | `28bf578c973108134409d9f114b1697357f894d6d407c52b97b6eb29fa86bb2c` |
| [usd-microwave.png](../../.tmp/qualification-2026-11-20/usd-microwave.png) | 2,936,162 | `bc697353b8e5696426f52d38bfe9ca2074662d16833b0e4fc42188af844ef94f` |

The local browser evidence directory is
`/Users/rozgo/VeoveoAI/.tmp/qualification-2026-11-20/`. Screenshots captured the running Mac
Chrome. The Repo and Artifact flows used existing sample PNGs; they do not establish new media
generation. The action sequence was recorded through the worker's tool results and summaries;
there is no single durable raw browser action trace or complete action-timing manifest.

## Boundaries

- The earlier rollout's component tests and model-driven acceptance are historical evidence in the
  linked November 19 record. They were not re-executed by the fresh installer plan.
- A matching installer plan proves declared installation state was read successfully and matched.
  It does not independently prove every application operation, every person's Computer, or the
  state of every already-running factory supervisor.
- The older record labels OpenShell `18f029a52` as the release's revision. That is the Veoveo merge
  commit; upstream `v0.1.9` is `ce58cf8e9`, a parent of that merge. The fork contains the intended
  release.
- The target n8n release remains 2.48.5. The audit found 2.48.7 had since been released; this task
  did not adopt it.
- The home page's eight cards were catalog evidence. The Turno App was not exercised, so this
  run does not qualify every App in that catalog.

## Final model-driven acceptance

### OpenCode

After the deterministic plan and browser checks, a new OpenCode read-only status smoke ran in
the owner's Computer, session `ses_e06148cafffe8VMTfKJN7Rh4On`. The UI showed
**Deep Infra / MiMo-V2.6-Pro** selected. A read-only `GET /api/session/{id}` then verified
`providerID: deepinfra`, `model.id: XiaomiMiMo/MiMo-V2.6-Pro`, variant `default`.
The UI displayed **5 min 05 s**, **26.5 tokens/s** and
**$0.02**; the cost is a rounded UI value. These are the new session's observations, rather
than the November 19 session's historical result.

The session record reported cost **$0.0219746212**, input **34,594**, output **3,990**,
reasoning **3,527**, cache-read **155,392** and cache-write **0** tokens. Its millisecond
timestamps were created `1795194319962`, busy `1795194320461`, idle `1795194625508` and
updated `1795194625500`; the busy-to-idle interval is **305.047 s**, calculated from those
recorded timestamps.

The exact prompt was:

> Read-only qualification only. Using Hub tools, report (1) current Computer version and updateAvailable status, (2) factory server health and revisions, and (3) current authoritative time in Europe/Helsinki with its UTC form. Make only read-only calls. Do not change data, run workflows, create files, or create media. Include each tool call and its returned result.

The recorded tool sequence called `console__computer {}`, `console__factory {}`,
`list_mcp_resources` for Hub, read `time://authorities/current`, `time://clock/quality` and
`time://clock/current`, then called `resolve_time` and `convert_time`. Two initial calls to
the latter tools had malformed or empty arguments and returned validation errors; corrected
calls subsequently completed.

- Computer: `c27160d40cde`, running and current, with `updateAvailable: false`.
- Factory: 16 serving routes, with the known pusher-cap and team-b provider warnings.
- Time: UTC `2026-11-20T17:07:04.860246365Z`, Europe/Helsinki
  `2026-11-20T19:07:04.860246365+02:00` (EET). The tool's quality result explicitly carried
  `system_clock_unmeasured` and unbounded uncertainty.

The model's final prose described the host clock as unsynchronized more strongly than that
evidence supports. The recorded tool result establishes unmeasured clock quality; no bounded
measurement or independent host synchronization check was made.

### n8n Assistant

The exact prompt was:

> Read-only smoke: identify the available Veoveo tool sources and report the current authoritative time in Europe/Helsinki and UTC. Do not edit or execute this workflow, create files, or create media.

The Assistant reached its terminal answer after **8 min 24 s** in the UI, without a Stop
action. It discovered the Veoveo Hub's tool families, including Time, Console, Thumb, Artifact,
Media, Embedding and Knowledge, and called `veoveo_time__assess_clock`, `resolve_time` and
`convert_time`. It reported no user-configured MCP connections, while separately listing the
available Veoveo Hub tools. It stated that it made no workflow edit or run, file creation or
media creation.

The actual tool outcomes were:

| Call | Observed result |
|---|---|
| `veoveo_time__assess_clock({})`, 17:16:10.834Z to 17:16:11.855Z | 1.021 s; `observedAt: 17:16:11.764707549Z`, `acceptable: false`, traceability `system_clock_unmeasured`, stratum 16, source diversity 0, unbounded error. The assessment policy required at most 100 ms, stratum 4 and diversity 2. |
| `resolve_time({expression:"now"})` | Schema validation refused the expression's shape. |
| `resolve_time({expression:{format:"now"}})` | Schema validation refused the missing `value` and the unsupported format. |
| At 17:21:29Z, `resolve_time({expression:{format:"rfc3339",value:"2026-11-20T17:13:00Z"},additionalUncertainty:{kind:"unbounded"}})` | Converted the model-supplied timestamp to TAI `1795194817.000000000`, UTC 17:13 and Helsinki 19:13+02. |
| `convert_time({instant:<the returned TimeInstant>,scales:["utc"],zoneIds:["Europe/Helsinki"]})` | Returned the same deterministic conversion. |

The model's reasoning explicitly selected **19:13 Europe/Helsinki from the session clock**.
That reference was about eight minutes old when it submitted the literal for resolution.
Its final answer gave Helsinki `2026-11-20T19:13:00+02:00`, UTC
`2026-11-20T17:13:00Z`, Unix `1795194780`, DTG `201713ZNOV26`, GPS week 2445/493998 and
Julian TAI `2461365.217789352`, and called it the current authoritative time.

**The requested authoritative-current-time criterion failed.** Tool inventory, schema
validation and deterministic conversion worked, and the clock assessment correctly returned
its unacceptable quality, but the answer resolved a model-supplied session timestamp rather
than retrieving the current authoritative time. No current-clock resource read occurred in
the recorded trace. The model reported that no resource-read or current-time tool was exposed;
that reported limitation is a candidate explanation for its choice, rather than a proven
exhaustive capability inventory or proof that the Hub's time resource failed. OpenCode read the
time resources successfully in the preceding run.

The n8n chat UI and its run response did not expose the actual provider/model. Its settings
response said `modelEnvConfigured: true`, with `modelName: null`, as the environment-managed
settings API is designed to do. The pinned Computer source expects
`XiaomiMiMo/MiMo-V2.6-Pro`; that source setting is not verification of the model used by this
run. No runtime model identity, token totals, exact cost or bounded clock assessment is claimed
for the n8n smoke.

## Saved evidence and cleanup

The [sanitized browser summary](../../.tmp/qualification-2026-11-20/browser-summary.json)
contains the scenario inputs, session accounting, exact n8n tool calls and screenshot inventory:
**12,535 bytes**, SHA-256
`8f934b9260238d75525602798d162221709846a81d83b58dd057eac30852c7aa`.
The [installer plan summary](../../.tmp/qualification-2026-11-20/installer-plan-summary.log)
is **116 bytes**, SHA-256
`bcf94a5e7f092911d26e4b95779cccf3bed839c99467063721ec0ef8a37d7be0`, matching the
remote plan log's hash. These are operator-local evidence links outside the docs repository;
their hashes identify the files, and the links require this workspace's retained scratch directory.

The worker closed its test tabs 77 and 81. The unused separate-profile target was already gone.
It terminated only its own SSH callback forward, PID 54324 on port 3211, and verified the port
had no listener; it deleted its private login scratch on the Mac and box. The test download
directory was empty. The owner's other tabs, processes and RustDesk tunnel were preserved.
No component-test rerun, build, deployment apply, source fix or Computer restart was performed.
