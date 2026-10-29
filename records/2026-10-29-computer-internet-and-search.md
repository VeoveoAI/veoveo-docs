# A long-idle watch, and Computers that search and reach the internet

2026-10-29 (UTC). Coordinator: Opus. No model calls. Plan section 5, approved 2026-10-29.

## D12: a push after a long idle

Method:
- **Repository and branch:** g1-rerun (`af254079…`), `main`, whose instance served revision 4
  (`30e10e0a…`). Hub started at 2026-10-28 16:58:41 and served no push after that, so
  the watch had been idle for 13 h 37 min.
- **Push:** from the owner's Computer, in a clone under `/tmp`: one line appended to
  `README.md`, then `lore stage --scan .`, `lore commit` and `lore push`. The clone was
  removed afterwards.

| Time | Event |
|---|---|
| 06:35:44.608 | The Computer's supervisor allows `BranchPush`; revision 5 `ee80cc2c…` |
| 06:36:04.9 | The instance's sandbox, restarted onto the revision, loads its policy |
| 06:36:05.113 | The instance synchronizes from revision 4 to revision 5 |
| 06:36:06.311 | `cargo build` finishes in 1.13 s |
| 06:36:06.841 | The server is `listening` |

From push to `listening`: 22.2 s. `console__status` at 06:38:57 reported revision 5 as
both applied and serving, with phase `ready` and 0 restarts.

## Search and internet in Computers

### What failed

- **Search:** OpenCode runs ripgrep for its file search and for its `grep` and `glob`
  tools. It looks for `rg` on its PATH, and otherwise downloads ripgrep from GitHub.
  - The Computer image had no `rg`, and the policy refused github.com.
  - At 2026-10-28 21:55:22, Larios's Computer logged `opencode → github.com:443`
    refused. In the same second Hub returned the first of 21 500s on `/api/fs/find`.
  - Those 21 were the only 500s Hub returned in 30 hours.
  - The plan item that blamed OpenCode itself for these 500s was wrong.
- **Internet:** a Computer's policy admitted Hub, the model and Artifact's objects only.
  Larios's agent tried `curl` to github.com and crates.io; both were refused.
- **Cargo:** found while probing the fix. The toolchain's `CARGO_HOME`,
  `/usr/local/cargo`, is read-only in a Computer. With it, `cargo check` exited with 101:
  "failed to create directory `/usr/local/cargo/registry/cache/…`: Permission denied".
  This had gone unnoticed only because Computers had no internet.

### Changes

| Repository | Commit | Change |
|---|---|---|
| Installation template | `055eae0` | The factory base installs `ripgrep`. The Computer policy has the factory's internet rule. Design first, in the same commit |
| Installation template | `dff6904` | The Computer image sets `CARGO_HOME=/sandbox/.cargo`, cargo's default under a home |
| Installation template | `8b63233` | The design and the policy comment say what the probes measured (below) |
| Bioma's installation | `e17ccf1`, `6d7093e`, `651adb9`, `6f4129c` | The same, with the lock and the release note |

- **The internet rule:** the factory's rule exactly:
  - every name of three or more labels on ports 80 and 443;
  - github.com and crates.io, the two-label names in use;
  - for any program.
- **`*.*` is refused:** OpenShell's policy lint takes it for a TLD wildcard. That is
  why two-label names are listed one by one.

### Images and deploy

| Image | Digest | Smoke |
|---|---|---|
| Factory | `ac05fb30…` | ripgrep 14.1.1; uid 10001; `/sandbox` empty. Built in 12 s |
| Computer | `c0743934…` | First build: `rg` at `/usr/bin/rg`, OpenCode byte-identical to the deployed image's (`882a27da…`), `opencode.json` equal to the source. Replaced by the next |
| Computer | `c0ad1766…` | The same, and `CARGO_HOME=/sandbox/.cargo`. Built in 3 s |

Deploy:
- **Steps:** `templates`, `hub-claim` and `hub-control-plane`. The Computer policy reaches
  Hub as a content-addressed claim file that the control plane names, so Hub did not
  restart.
- **Control plane:** revisions `gcp-01a1866c…`, then `gcp-01a18673…` for the final
  policy file, `computer-policy-23cb79e12163.yaml`. That file differs from the probed
  one only in comments.
- **Plan:** 3 of 3 steps match.
- **Release note:** the installer refused the second Computer image with the first
  image's release note: "a new version needs its own note". It got one.
- **Computer versions:** `0de8536be11e` before; the probes ran on `602d31dd057f` and
  `7e27dc4bf18d`.

Rollout:
- **The owner's Computer:** restarted onto each version with `POST /computer/restart`.
  It was back in 18 s and 10 s.
- **Larios's and Josue's Computers:** they take the new version at their next start.

### Deployed probes

In the owner's Computer, through `openshell sandbox exec`. The probes wrote only under
`/tmp` and removed it.

| Probe | Result |
|---|---|
| `rg` | `/usr/bin/rg`, ripgrep 14.1.1 |
| OpenCode `GET /api/fs/find` for a file under `/tmp` | 200 in 57 ms, then in 402 ms after the restart; the file found |
| `git clone --depth 1 https://github.com/octocat/Hello-World` | Exit 0 in 495 and 628 ms |
| `cargo new`, `cargo add serde --features derive`, `cargo check`, with a writable `CARGO_HOME` under `/tmp` | Exit 0 in 5.2 and 5.4 s, through `index.crates.io` and `static.crates.io` (rule `internet`) |
| The same with `CARGO_HOME=/usr/local/cargo` | `cargo check` exit 101, Permission denied, before `CARGO_HOME` moved |
| `veoveo-hub-sdk-cli tools` | Exit 0, 58 tool lines, 445 and 484 ms |
| `lore repository list` | Exit 0, 210 lines, 271 and 259 ms |
| `curl -X POST` to Hub's `/mcp/computer` | 403: curl's rule for Hub's host, `artifact_bytes`, applies |
| `curl -X POST` to DeepInfra's chat completions | Admitted by `internet`; DeepInfra answered 401, since no credential was bound |
| `curl https://www.httpbin.org/headers` with no `Authorization` header, with a plain bearer, and with `COMPUTER_HUB_REFERENCE` | 200, 200, and 403 from the proxy: `credential_endpoint_mismatch`, "Credential is not authorized for this request endpoint" |

What the probes established about the rule:
- **Exact-host rules:** a rule for an exact host binds the programs it names.
  `hub_computer` names every program on Hub's host, so no program reaches Hub through the
  wildcard. Other programs reach the model's host through the wildcard, without the
  model's credential.
- **Placeholders:** the proxy refuses any request that carries a placeholder to an
  endpoint not bound to it.

## Boundaries

- **The `grep` and `glob` tools:** shown to run ripgrep only by OpenCode's source. They are
  left to the model-driven acceptance.
- **Cargo in OpenCode's own environment:** `CARGO_HOME` was checked in the image. The probe
  set its own home under `/tmp`, since probes do not write `/sandbox`. Left to the
  model-driven acceptance.
- **Two-label hosts:** hosts such as `docs.rs` and `pypi.org` stay refused until they are
  listed.
- **Not measured:** what Josue's OpenCode kept calling at `opencode.ai`, which is also
  two-label and still refused.
