# Qualification Checklist

Every feature of the factory-sandbox installation that must work, how to check it, and
where it stands. People and agents use the same list. The design is in
[ARCHITECTURE.md](ARCHITECTURE.md) and the `DESIGN.md` files it maps; what is next is
in [PLAN.md](PLAN.md); dated evidence is in [records](records/README.md).

Rules:
- **Status:** `proven` (with evidence), `pending`, or `component` (proven by repository
  tests only, not on the deployment).
- **Order:** component tests, then deployed probes, then one model-driven acceptance.
- **Model calls:** none during iteration. The final acceptance uses
  `deepinfra/XiaomiMiMo/MiMo-V2.6-Pro` and nothing else.
- **Evidence:** facts, not "done". Name the command or tool, the identities (digests,
  revisions, sandbox IDs) and the timings.
- **Fake providers** (the Media fixture) produce synthetic data. They prove routing and
  storage, not real inference or valid media.
- **Secrets:** never in evidence. Keep signed URLs, tokens and passwords out.

Installation under test: K3s box `rozgo-sim-pc`, public host `https://veoveo.bioma.ai`
(single host), deployed: Hub `5d3f43f` (#3), Lore `4b7b7e23`, OpenShell `c28524bdd` (gateway; runtime and
supervisor `d1d4da399`), installation `22fdc5a`, OpenCode `35659fe` (content of `ea6f7c1`; Computer image `22fdc5a-ea6f7c1`), console `a8f5d29`, Artifact `a0566b8`, Media
`6bd5843`, Embedding `95216bd`, SDK `581fdcb`.

## A. Identity and administration

| # | Check | How | Expect | Status |
|---|---|---|---|---|
| A1 | A person signs in to Hub | Browser PKCE login with Entra | Access token and refresh token issued; refresh rotates | proven 2026-10-23 (admin principal, client `opencode`) |
| A2 | An administrator uses the admin routes | `GET /admin/local/control-plane` with an Entra `administrator` app-role token | 200, through rule `installation-administration` (`roles: [administrator]`), with no per-person rule | proven 2026-10-23 (revision `gcp-01a166f0…`) |
| A3 | A member without the role is refused | Same route as a member | 403 | pending |
| A4 | A server acting for its caller is refused on admin routes | Hub test `calls.rs` | 403 | component |
| A5 | Admin publication round trip | GET, edit, PUT `/admin/local/control-plane` | `applied`, new revision, change visible | proven 2026-10-23 (enrollment, Time assignment) |

## B. Computer

| # | Check | How | Expect | Status |
|---|---|---|---|---|
| B1 | First entry creates the Computer from the current template | Open `https://veoveo.bioma.ai/computer` | Computer Ready on the template's image; no device login | proven 2026-10-23 in Chrome: `/computer` → sign-in → start page with what's new → OpenCode, after Hub's policy gained `DeleteSandboxTemplate` (the first two attempts failed without it) |
| B2 | A stale Computer link repairs itself | Reload an old `/computer/c/…` URL after its sandbox is gone | 303 to `/computer`, then setup, then the Computer; background requests stay 503 | component (Hub `4b4678c`); pending live |
| B3 | Lore works with the one Hub login | In the Computer shell: `lore repository list "$VEOVEO_LORE_REMOTE"` with no flags | exit 0 and no login prompt; OpenShell logs show no `credential_endpoint_mismatch` | proven 2026-10-23: plain `lore repository list "$VEOVEO_LORE_REMOTE"` in OpenCode's shell exited 0 with no login prompt |
| B4 | A new assignment works at once | An admin assigns a repository, then the person clones it | Clone succeeds within seconds, without waiting for the 300 s token lifetime | component; pending live |
| B5 | A removed assignment stops at once | An admin removes it, then the person clones again | Refused | component; pending live |
| B6 | Lore access survives a restart | Restart the Computer, then `lore repository list` | exit 0 | pending |
| B7 | Artifact objects through the single host | From the Computer: Artifact upload and download via `veoveo.bioma.ai/artifacts/…` | Byte counts and SHA-256 match; no other hostname used | proven from outside a Computer 2026-10-23 (administrator via `veoveo-hub-sdk-cli`: 1 MiB, PUT 200 in 0.93 s and GET 200 in 0.41 s, both on `veoveo.bioma.ai/artifacts/`, SHA-256 equal, artifact `01a16960-cd6e…`); pending from a Computer |
| B8 | Many repositories in one token | An owner with many assignments | Clone works; find the 16 KiB header limit (about 120 repositories estimated) | pending |
| B9 | Large push through the proxy | Push one file over 16 MiB, and about 500 files | Push succeeds; time it | pending |
| B10 | The platform puts nothing in the home | A fresh Computer: `echo ~` and `ls -A ~` | `~` is `/sandbox`; only OpenShell's `.openshell-initialized` and what programs created themselves | proven 2026-10-23 through Hub: `~` = `/sandbox`, `10001:10001 2770`, holding `.cache`, `.config`, `.local` (OpenCode's own) and `.openshell-initialized` |
| B11 | Restart keeps the home | Create a file, an unpushed Lore change and an OpenCode session; restart | All three present; same URL; only running programs and `/tmp` gone; time it | proven 2026-10-23/24 through Hub on the new runtime; the race that lost a home is fixed and proven at the OpenShell level with a SIGTERM-ignoring workload (claim kept and re-adopted with the same file); not run through Hub with a slow-stopping Computer |
| B12 | Any client learns of a new version | Publish a template with a release note | `console__computer`'s description changes mid-session; the call reports running, current and what's new; the same status over HTTP from a shell in the Computer; the start page lists it | partly proven 2026-10-23: `/computer/version` returns version and summary only; `console__computer` lists the current version; status from OpenCode's shell (`updateAvailable: false`) and the start page proven 2026-10-23; a new version noticed by a running Computer on `/computer/status` with its note, proven 2026-10-23; the listen stream survived two credential refreshes and OpenCode re-listened after a Hub publish (2026-10-23/24); pending: the `console__computer` description change observed in OpenCode, which needs a model-free way to read its tool list |
| B13 | An idle Computer is collected | Leave it idle past `computers.collectAfter`, then enter | Sandbox gone, home kept; entry creates the current version; what's new shown once | proven 2026-10-24 with `collectAfterSeconds` 600: collected at 00:05:35 (browser idle 701 s, sandbox 733 s), claim kept; entry recreated it in 3.56 s with `~/keep.txt` (content, mode, inode) and the OpenCode session |
| B14 | A failed new version is diagnosable | Publish a template whose image cannot start, then restart | The cause is shown; the previous version stays recorded; the home is intact | pending (#13) |
| B15 | Restart is quick | Measure stop, create and first page | Seconds, not the 101–160 s stops measured 2026-10-23 | proven 2026-10-23 on the new runtime: the gateway's delete took 0.77 s (was 38.6 s); replacement 5.1 s |

## C. Repositories

| # | Check | How | Expect | Status |
|---|---|---|---|---|
| C1 | Whoever creates a repository owns it | In OpenCode: `console__create_repository {name}` | Returns `{id, name, remote}`; the next plain `lore` push works with no admin step | component (Hub `c05f50f`, console `56257e8`); pending live |
| C2 | Nobody claims another person's repository | Second person calls with the first person's `id` | 409 `repository-claimed` | component |
| C3 | An interrupted create completes | Repeat the call with the returned `id` after a failure | Registered once; no duplicate | component |

## D. Factory serving (Stage 1)

Time is the reference server. Record per push: stop, start, fetch, build and server
startup times, from `console__logs` timestamps.

| # | Check | How | Expect | Status |
|---|---|---|---|---|
| D1 | Watch as the person | `console__watch {repository}` | Hub subscribes as the caller; the watch survives Lore `ABORTED` | pending |
| D2 | First push serves `main` | Push `main`, then poll `console__status` | BuildKit builds `openshell/image/`; the image comes from the local registry; the sandbox is Ready; `servingRevision` = the pushed revision; `time__*` tools appear | pending |
| D3 | Factory instance reaches PostgreSQL | One `time__*` call that uses the database | Works, verified against the platform trust bundle with no `sslrootcert` (decision D1) | pending |
| D4 | Same image and policy push restarts | Push a source change | Same sandbox ID; restarted, not recreated; incremental build | pending |
| D5 | Policy change recreates | Push a change to `openshell/policy.yaml` | New sandbox, empty disk; no `UpdateConfig` call | component (Hub `bf5dbcf`); pending live |
| D6 | Second branch, second data environment | Push `dev/<user>/x`; `console__select` it for `time` | Separate database `dev_<user>_x_<8 hex>`; every chat of that person follows; `select null` returns to `main` | pending |
| D7 | A broken build is diagnosable | Push code that fails to compile | `failed{stage: build}`; `console__logs` shows the error; the previous sandbox keeps serving | pending |
| D8 | A crash at startup is diagnosable | Push a server that exits at startup | Status shows the exit code and restart count; logs explain it; a fixing push recovers | pending |
| D9 | Branch deletion removes its instance | Delete the branch in Lore | The instance, sandbox and providers are removed | pending |
| D10 | Soft caps warn | Exceed `instancesPerUser` (4) | A warning in status; nothing refused (`enforce: false`) | pending |
| D11 | Recovery | Restart Hub; restart Lore; reboot the node | Watches resume; instances serve again with no manual step | pending |

## E. Platform services

| # | Check | How | Expect | Status |
|---|---|---|---|---|
| E1 | Services registered and routed | `veoveo-hub-sdk-cli tools` as the administrator | `artifact__*`, `media__*`, `embedding__*`, `console__*` listed | proven 2026-10-23 (15 + 3 + 1 + 5 tools after Artifact `b7bbde9`, Media `d7ae458`, Embedding `1323732`) |
| E2 | A service registers again after its registration is abandoned | Keep the service down past Hub's 60 s registration grace while Hub runs, then let it start (a Hub outage alone abandons nothing) | It registers again by itself with a new client; its tools route; no manual file moves | proven 2026-10-23: Artifact (`artifact-01a1668e…` → `artifact-01a1674370…`); Media `d7ae458` and Embedding `1323732` stopped 100 s and 104 s, registered again 3.3 s after start with new clients; all their tools listed |
| E3 | Embedding runtime on the GPU | Embedding `/readyz` | `ready` through the runtime | proven 2026-10-23 |
| E4 | Media through its fixture provider | One Media call | Routed and stored; the output is synthetic fixture data | pending |

## F. Installation and operations

| # | Check | How | Expect | Status |
|---|---|---|---|---|
| F1 | Our images come only from the local registry | Pod image references and kubelet events | `registry.veoveo-system.svc.cluster.local:5000/veoveo/…`; public images pinned by digest | proven 2026-10-23 |
| F2 | A single public host | DNS, and the routes of tunnel `veoveo-bioma-ai` | Only `veoveo.bioma.ai`; S3 under `/artifacts/`; `veoveo-objects` does not resolve | proven 2026-10-23 |
| F3 | Script clients are not blocked | Python default User-Agent to `/oauth/token` | Hub answers (JSON 400), not Cloudflare 403 1010 | proven 2026-10-23 |
| F4 | A config change needs no sandbox recreation | Rerun Hub's config seed on the same claim, then restart Hub | Files replaced; the claim and sandbox are kept | component (installation `0311a69`); pending live |
| F5 | Hub's Lore CLI trusts Lore's TLS | A factory watch reads `openshell/` | Read succeeds (Hub `4d639af`) | pending (with D1) |
| F6 | Fresh install order | Follow the installation docs from empty | Lore is Ready after Hub serves its issuer; Hub needs no Computer template at start (read at entry since #13 part B; deleting `computer-v1` gave 503 with the cause and recreating it served again in 2.4 s with no Hub restart, 2026-10-23) | pending (next fresh install) |

## G. Model-driven acceptance (last)

Only after every deployed check above passes. Use `deepinfra/XiaomiMiMo/MiMo-V2.6-Pro` in
the person's Computer, with no other model. Record the scenario input, the tool sequence
with timings, output identities and bytes, errors and their causes, and what was not
proved.

| # | Scenario | Expect | Status |
|---|---|---|---|
| G1 | The agent creates a server repository, pushes it, watches it serve, breaks it with a push, diagnoses it from `console__status` and `console__logs` alone, and fixes it with a push | Served again with no human help; every step uses only Hub's tools and plain `lore` | pending |
