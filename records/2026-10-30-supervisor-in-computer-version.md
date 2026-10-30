# A supervisor change reaches every Computer, and quoted placeholders stay text

2026-10-30 (UTC). K3s box `rozgo-sim-pc`, public host `https://veoveo.bioma.ai`.

Two problems in everyday use:
- **Supervisor fixes went unoffered.** A fix in OpenShell's supervisor did not change
  the Computer version. No one's start page or `console__computer` offered an update, so
  no one restarted to take it.
- **A teammate's chat broke.** It failed with `ECONNRESET: The socket connection was
  closed unexpectedly` on every message, through retries and two restarts, while a new
  chat worked.

## The chat that failed

The Computer `c2sfyi6e…`'s supervisor logged each of its four messages at 19:51
(19:51:12, :24, :35, :44) the same way:
- the model call `ALLOWED POST https://api.deepinfra.com/v1/openai/chat/completions`;
- 100 ms later, `NET:TRAFFIC [HIGH] DENIED api.deepinfra.com:443 [reason:POST request
  body credential traffic denied for api.deepinfra.com:443]`;
- a finding "Credential-bearing traffic cannot be inspected"
  (`openshell.credentials.traffic_uninspectable`).

**Cause.** The model endpoint carries a provider credential, and it allowed no
uninspected credentials. So the proxy scans each request body for credential
placeholders it will not rewrite (`relay_request_body_with_marker_guard` in
`openshell-supervisor-network/src/l7/rest.rs`) and refuses the request when one appears.
- A chat sends its whole history with each message.
- **Inferred:** once the history held a placeholder string, as from printing the
  environment, every later message was refused. A new chat did not hold it.
- A restart kept the chat, so it changed nothing.
- The chat's content was not read.

The same Computer's OpenCode log holds two earlier refusals of this kind, on 10-27:
"A credential placeholder in the request body cannot be forwarded".

**Fix:**
- **Installations:** template `713515f`, Bioma `ef1aef9`. The model endpoint in
  `computer-v1.yaml` sets `allow_uninspected_credentials: true`.
- **What stays:** inspection of the method and path, and the key's binding to the
  header for that host and path.
- **What changes:** a placeholder quoted in a chat reaches DeepInfra as text that
  resolves to nothing.
- **Design:** the installation's `DESIGN.md`, Computers section.
- **Deploy:** `hub-claim` and `hub-control-plane` at 19:57:40. The new policy file was
  published in 4.0 s, as control revision `gcp-01a18e63…`, and Hub did not restart.
  The current version moved from `80fd73c9f7fd` to `9d9796e57dbd`.
- **The owner's two Computers:** restarted at 19:58 in 11 and 9 s. Each sandbox's
  model rule reads `allow_uninspected_credentials: true`.
- **The teammate's Computer:** restarted itself at 20:01:44. Its next model calls,
  through 20:08:19, were served and none was refused (checklist B23).

## The Computer version names the supervisor and runtime

OpenShell lets only the gateway's configuration set the supervisor and sandbox runtime
images: the Kubernetes driver refuses them in a template
(`sandbox_driver_config_rejects_trusted_supervisor_overrides`). Hub already reads the
driver's capabilities from `GetGatewayInfo` to build the version, for its backend, so
the gateway now reports the images there.

| Repository | Commit | Change |
|---|---|---|
| OpenShell | `c80bda2` (sign-off) | `GetCapabilitiesResponse` and the public `ComputeDriverCapabilities` gain `supervisor_image` and `sandbox_runtime_image`. The Kubernetes driver reports its configured images; the other drivers report none. The gateway snapshot carries them into `GetGatewayInfo`. Go bindings regenerated. The public schema fingerprint is updated; the durable one is unchanged |
| Hub | `2b14e65` | The provision spec gains `runtime`, the two images from the driver. The version's canonical document includes them when the driver reports any, so a driver that reports none leaves versions as they were. What's new gains `supervisor` and `sandboxRuntime` changes, from none for a version recorded earlier. The status page says "The platform that runs your Computer was updated". The OpenShell pin moves from `c28524bd` to `c80bda2` (91 commits). Design: Computer versions |
| Console | `8384a5b` | `WhatsNew` carries `supervisor` and `sandboxRuntime` |
| Installations | template `7520f3e`, Bioma `0d41e8a` | Lock and guides: gateway from `c80bda2`, supervisor from its parent `49761d1`. The template's guide had named `b7635c28…`, a commit amended before push; corrected |

## Checks

| Repository | Result |
|---|---|
| OpenShell, first gate | `public_and_durable_schema_inventories_are_complete` failed: the public schema fingerprint changed. Updated, with a note in the schema comments |
| OpenShell, on `c80bda2` | Format, proto lint and the Go bindings check passed. Clippy on the server and the Kubernetes, Docker and Podman drivers passed (119 s). Kubernetes driver 338 of 338 (with `capabilities_report_the_trusted_images_every_sandbox_runs`). Gateway library 2,413 of 2,413 |
| Hub, against local OpenShell before push | `cargo check --tests` passed in 47 s |
| Hub `2b14e65` | Linux 209 s and Mac 212 s: `cargo deny` advisories, bans, licenses and sources ok; 363 of 363, with `the_gateways_supervisor_and_runtime_images_name_a_version` and the page test |
| Console `8384a5b` | Linux 28 s and Mac 86 s, 28 of 28. The round-trip test carries `supervisor` |

**Images:**
- `gateway@sha256:e65cee6c…`, `0.1.5-dev.202+gc80bda201`, built in 368 s; the staged
  binary's SHA-256 matches;
- `hub@sha256:0ef1a65d…`, 87 s;
- `console@sha256:83e08b2d…`, 20 s.

## Deploy

| Step | Result |
|---|---|
| `openshell`, 20:14:18 | Helm upgrade in 9.9 s, rolled out |
| `hub` and `platform-servers`, 20:14:35 | Refused before changing anything: the plan could not read the gateway, as the box's port-forward was up before the new gateway pod served (`tls handshake eof`, then `Connection refused`). After `pf.sh`, the gateway answered |
| `hub`, 20:15:11 | 15.3 s, Ready 20:15:22, 0 restarts |
| `platform-servers`, 20:15:27 | Console replaced in 20.7 s |
| Plan | 18 of 18 |
| Current version | `811f82122b7f`, from `9d9796e57dbd` |

**Hub's log.** 121 WARN lines in 20:15 and none after. All were for Console while it was
replaced: 60 gateway refusals (`Cancelled` while it stopped, `FailedPrecondition`
while it started), each with the gateway's text as `detail`, and discovery retries. The
one other line was a factory watch of repository `d4125ae2…`, which "is not registered".
It also appeared at the 19:16 start and has not repeated; not investigated.

## Probe

**Before restarting**, `console__computer` in the owner's Computer, which ran
`9d9796e57dbd`, read:
- `updateAvailable: true` and current `811f82122b7f`;
- `whatsNew.supervisor` from none to `…@sha256:d3d5278f`;
- `whatsNew.sandboxRuntime` from none to `…@sha256:6308651a`.

**After a restart** (9 s each), both of the owner's Computers read version `811f82122b7f`
with `updateAvailable: false`. `lore repository list` exited 0 (258 and 251 ms) and
OpenCode's health answered 200.

## Boundaries

- **Every Computer** created before 20:15 is offered this update once, though it
  already runs the same supervisor: the versions recorded before lacked the images.
- **A policy-only change** has no words in what's new unless it changes endpoints, and
  the template's note stays the same. The update to `9d9796e57dbd` showed no line.
- **Factory instances** are not told of a supervisor change.
- **The status page's new sentence** is proven by the unit test; the page itself was
  not loaded in a browser.
