# Platform tools at run time, the upgrade drill, and the Time factory flow

2026-10-25 (UTC). Coordinator: Opus; coder: Opus; builder: Sonnet. No model calls in
OpenCode: every Computer step ran in OpenCode's shell mode, driven in Chrome as the
person, and every Hub call as the person through `veoveo-hub-sdk-cli` on the Mac.

## Source deployed (all on `main`)

| Repository | Commit |
|---|---|
| OpenShell | `491b3503d`: `image` volumes in the Kubernetes driver; admission admits them only pinned by digest from listed repositories |
| veoveo-core | `04560dc`: the component lock names images |
| veoveo-hub-sdk | `3980af8`: the CLI as an image of its own |
| veoveo-hub | `9e00c77`: factory size and mounts from the factory template; Lore from the mount |
| veoveo-template-installation | `518934b`: the mounts, policies, lock and fill step |
| Time, console, MCP template | `2ae5f13`, `e855cac`, `decaa62`: images carry only their toolchain |

Gates (`docker build --target check .`, macOS and Linux, all exit 0): Hub 335, core
359, SDK 275, Time 143, console 26, MCP template 16 tests. OpenShell: every task;
`test:rust` 6116 + 2393 + 16 passed with the two known box-specific failures.

## Deploy and probes

- OpenShell Helm revision 18 (`491b3503d`): a disposable sandbox ran
  `/opt/veoveo/lore/usr/local/bin/lore --version` from the mounted Lore image; an
  unlisted repository and a tag-only reference were refused with admission's
  message; every existing sandbox kept its pod.
- Hub reseeded from a new control-plane document (`factory.template`, v2 policy
  files, no `factory.cpu`, `factory.memory` or `imageBuilder.lore`); 18 native-control
  rules; the dead `source_artifact` rules gone.
- The person's Computer restarted into the new version in under 10 s with the same
  home volume; `lore` and `veoveo-hub-sdk-cli` ran from `/opt/veoveo/...`;
  `/usr/local/bin` holds no Lore; `lore repository list` worked through the new
  credential path.

## Upgrade drill

Lore rebuilt at the same revision with one label: one image built (4 s), new digest
`c9257c34…`. The lock's `lore` entry changed; the fill step changed exactly that digest
in `lore.yaml` and three driver configurations. Applying took about 70 s: the Lore
server rolled out in 7 s, Hub was recreated (no ERROR or WARN), both templates were
republished, `/computer/version` changed. Then: the person's Computer restarted onto
`c9257c34…`; the Time instance adopted it at its next push, which recreated its
sandbox because the factory template changed. No other image was built.

## Time factory flow (checklist C1, D1–D11, B7)

| Step | Result |
|---|---|
| B7 download | From inside the Computer, `curl` fetched Time's source Artifact through `veoveo.bioma.ai/artifacts/`: 200, 1,935,360 bytes, 0.45 s, SHA-256 matches. Upload from inside a Computer not yet run (needs the person's CLI in the Computer) |
| C1 | `console__create_repository {name: time}` as the person: 1.2 s, owner; the next plain `lore push` from the Computer worked |
| D1 | `console__watch` as the person |
| D2 | First push failed at BuildKit: `dial tcp 198.18.0.6:443: connect: permission denied` resolving `docker.io/docker/dockerfile`; not reproduced (a direct probe and the retry passed). The retry served `main` in 4 min 36 s; 21 `time__*` tools appeared |
| D3 | `time__list_sources` against the instance's database: 0.48 s |
| D4 | Source-only push: same sandbox `5d27c1a3`, serving in 48 s |
| D5 | `openshell/policy.yaml` push: new sandbox (`8223685d` → `0afc0fc5`) through delete and create, no `UpdateConfig`; serving in 269 s |
| D6 | `dev/rozgo/x`: own sandbox, database `dev_rozgo_x_01400bde`; `console__select` routed the person's calls there (a source created there was listed only while selected; database rows 1 and 0); `select null` returned to `main` |
| D7 | A compile error restarted the same sandbox; the server exits and OpenShell backs off; `console__logs` shows `lib.rs:50:14: unclosed delimiter`. Differs from the checklist: `failed` stays empty and the previous revision does not keep serving |
| D8 | A server exiting at startup: status shows the restart count, logs show its message; the exit code appears nowhere. A fixing push served within seconds |
| D9 | Archiving three branches removed their instances, sandboxes and providers |
| D10 | The fifth instance carried "is the latest pusher of 5 instances, above the cap of 4"; nothing refused |
| D11 | Hub restarted (answering in 13 s), Lore restarted (11 s): both instances kept serving; the next push applied at once and served in 48 s. Node reboot not run (it needs the box's sudo password) |

## Findings

- A build step on the factory's shared BuildKit reached the log store (`RUN wget
  …victorialogs…:9428/health` → 200) and the registry; BuildKit cache mounts are shared
  across repositories by name. The fix (per-branch cache namespace, the official
  frontend only, cache mounts pruned after each build, network policies) is in
  progress.
- The person's `veoveo-hub-sdk-cli` cannot reach Hub from inside a Computer (the policy
  names only OpenCode); approved fix in progress.
- Planned replacements log ERROR in Hub (503s while a Computer restarts; `Transport
  channel closed` when a server is replaced); approved fix in progress.
- The log store adds `missing _msg field` lines for records without a message.
- A Lore-only upgrade republishes the Computer template with the previous release note,
  so the status page shows a stale "What's new".
