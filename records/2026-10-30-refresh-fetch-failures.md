# A failed refresh fetch keeps the installed credentials

2026-10-30 (UTC). K3s box `rozgo-sim-pc`, public host `https://veoveo.bioma.ai`.

Checklist B22 expects a day of supervisor logs on OpenShell `0e795fc` with no
`FAIL_CLOSED` and no connection closed as stale. That day had passed, so the logs were
read at 18:48.

## What the logs showed

The scan covered every sandbox supervisor running `supervisor@sha256:ca61ac07…`
(`0e795fc`): 2,735 provider refreshes, 8 of which logged "refreshed again during
preparation". The four Computers (`c2sfyi6e…`, A's `c4itoit7…`, `caj3bmvq…`, M's
`cdjdlsct…`) had none:

| Sandbox | Refreshes | `FAIL_CLOSED` | Closed as stale |
|---|---|---|---|
| A's Computer | 401 | 0 | 0 |
| M's Computer | 316 | 0 | 0 |
| Factory instance `8177-61a7fc5543b1` | 292 | 1, at 05:49:40 | 1, to Postgres |
| Factory instance `ba23-5d2b1088326e` | 308 | 1, at 09:47:39 | 1, to Postgres |
| Six other sandboxes with provider refreshes | 1,418 | 0 | 0 |

Hub and the services have no provider environment, so they refresh nothing.
Supervisors still on earlier images (`b5aa93da…`, `16b3f168…`) logged the failure fixed by
`0e795fc`; they are not this check's evidence.

Both failures read the same, here at 09:47 on `ba23-5d2b1088326e`:

| Time | Event |
|---|---|
| 09:43:39.514 | A refresh installs in place, as every 4 minutes |
| 09:47:39.648 | The poll: the provider environment changed, the policy did not |
| 09:47:39.704 | `FAIL_CLOSED`: "Provider environment refresh failed; static credentials were revoked" `[reason:PROVIDER_READINESS_REASON_CREDENTIAL_INSTALL_FAILED]` |
| 09:47:39.712 to 09:47:46.738 | Four "Endpoint status report failed transiently" |
| 09:47:49.722 | The next poll reinstalls the environment under a new policy generation |
| 09:47:49.730 | `DENIED` Postgres: "L7 tunnel closed before inspection because policy changed: policy generation is stale [captured_generation:1 current_generation:2]" |
| 09:47:53.257 | The workload's new Postgres connection is allowed |

## Cause

The reason names the branch:
- `fetch_provider_environment` in `crates/openshell-supervisor/src/config_runtime.rs`
  maps `Err(_)`, a failed fetch RPC, to `CredentialInstallFailed`.
- It then called `revoke_provider_environment`.
- The endpoint-status calls failing in the same seconds show that the gateway was briefly
  unreachable from that sandbox.

**Inferred:** the fetch failed for the same reason. The fetch's own error was not logged.

A failed fetch says nothing about the environment, and the installed credentials were
still valid. Revoking them made the next install a first install after a revocation,
which publishes a new generation and closes every relay pinned to the old one.

OpenShell's own documentation already bounds a credential by its recorded expiry. The
current token "remains available only until its recorded expiry, after which credential
resolution fails closed" (`docs/how-it-works/providers/profiles.mdx`). Keeping it after a
failed fetch therefore adds no reach. A supervisor that cannot reach the gateway at all
already keeps its credentials, since its polls fail too.

## Fix, OpenShell `49761d1`

`fix(supervisor): keep installed credentials when a refresh fetch fails`, with sign-off:
- **A failed fetch:** logs WARN "Provider environment fetch failed; the installed
  credentials remain until the next poll fetches again". It revokes nothing and is
  rejected as `provider_environment_fetch_failed`, so the next poll fetches the same
  revision again. The refresh then installs in place and open relays stay open.
- **Unchanged:** an environment the gateway hands over still revokes static credentials:
  - one of another attachment or policy;
  - one not ready for installation;
  - one whose bindings fail validation.
- **Docs:** the supervisor's README and `docs/how-it-works/providers/profiles.mdx`.
- **Tests:**
  - New: `a_failed_fetch_keeps_the_installed_credentials_and_open_relays`. A failed fetch
    leaves the first value resolving and the pinned relay open; the next fetch installs
    the second value under the same generation.
  - `provider_poll_preserves_static_references_across_rotation_failure_and_detach` and its
    stable-placeholder twin asserted that a failed fetch revokes. They now assert, after the
    retry's fetch is requested, that revision 2 still resolves. The stable twin also asserts
    that the retry carries the support requirement.
  - `provider_readiness_poll_waits_for_installation_and_retries_same_fingerprint` no longer
    waits for `CredentialInstallFailed`.

## Checks, image and deploy

| Step | Result |
|---|---|
| First gate, 18:56 | Format and clippy passed. Tests 196 of 198: the two rotation tests still asserted revocation. Corrected in the amended commit |
| Gate on `49761d1`, 19:01 | Format check 26 s; clippy of the supervisor (`-D warnings`) 50 s; `cargo test -p openshell-supervisor` 198 of 198 in 59 s |
| Supervisor image | `supervisor@sha256:d3d5278f…`, `0.1.5-dev.201+g49761d1eb`, built in 121 s, pushed in 3 s. The sandbox runtime stays `1ab0e2386`; the gateway stays `ebd6a1c` |
| Installation | Template `a6c55ea` (guide), Bioma `6c17fe2` (lock and guide) |
| `apply openshell`, 19:06:22 | Helm upgrade in 8.6 s. The plan then read 11 of 18: the box's port-forward to the gateway had ended with its pod (`pf.sh`, plan "Later"). After `pf.sh`, 18 of 18 |
| Stop and start, 19:07:44 to 19:09:12 | Hub, Console, Artifact, Media, Media's provider, Embedding and its runtime, each Ready in 9 to 19 s. Each supervisor pod runs `d3d5278f…`, Ready, 0 restarts. Hub's metadata 200 in 0.21 s |
| A's and M's Computers, after | Lore list exit 0 (319 ms, 40 ms); OpenCode health 200. Hub tools answered in about 460 ms; the count was not read, since the Computers have no `jq` |
| `FAIL_CLOSED`, 19:06 to 19:12 | None in any supervisor, the gateway restart included |

### Hub's log during the restart

Hub logged 277 WARN lines between 19:07:56 and 19:08:57 and none after:
- discovery retries and isolated failures for each server while it was replaced;
- 138 "the gateway refused a native upstream forward": `Cancelled` while a server
  stopped, `FailedPrecondition` "sandbox is not ready" while it started.

That WARN, added in Hub `549b0bb`, fired live for the first time. It named the gateway's
text as a field called `message`, which collides with the event's own message: the JSON
line carried two `message` keys, and readers that keep the last one showed the gateway's
text in place of the event's.

- **Fixed in Hub `1fff39d`:** the field is `detail`.
- **Checks:** Linux 107 s and Mac 211 s, 362 of 362 each.
- **Image:** `hub@sha256:741d29f5…`, locked in Bioma `c4b6cf2`.
- **Deploy:** `apply hub` 19:16:16, 20.8 s, Ready 19:16:33, 0 restarts, supervisor
  `d3d5278f…`; the plan matched 18 of 18.
- **After:** one WARN at 19:16:37, a factory watch of repository `d4125ae2…`, which "is
  not registered". It did not repeat by 19:18:32. The repository is none of this session's
  probes; not investigated.

## Boundaries

- **On `49761d1`:** Hub and the six services. They refresh no provider environment, so
  their logs cannot show this failure.
- **Not yet on it:** the four Computers and the factory instances, which keep their
  supervisors until their next start, or an instance's next push. The day of logs that
  proves B22 needs them, A's and M's Computers first.
- **Not exercised live:** the failed-fetch path itself. A gateway blip during a refresh is
  rare, about 1 in 1,400 refreshes on `0e795fc`, and the unit test covers it.
- **Not logged before the fix:** the fetch's own error. `49761d1` logs it at WARN.
