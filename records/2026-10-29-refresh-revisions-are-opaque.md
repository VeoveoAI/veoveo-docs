# The supervisor ordered revisions that are opaque

2026-10-29 (UTC). Coordinator: Opus. No model calls. This corrects the refresh fix in
[OpenShell's streams and refresh](2026-10-29-openshell-streams-and-refresh.md), which
accepted a fetched environment only "at the polled revision or later".

## What the logs showed

Supervisor logs from 07:32:39 to 13:31:22, after the rollout of OpenShell `1ab0e2386`:

| Sandbox | Supervisor | `FAIL_CLOSED` | Connections closed as stale |
|---|---|---|---|
| g1-rerun's instance, `8e3b-04549240c5c3` | `b5aa93da…` (`1ab0e2386`) | 1, at 09:32:14 | 1, to Postgres |
| `cdjdlsct62djm3cnhv5` | `16b3f168…` (earlier) | 1, at 09:56:13 | 2, to Hub |
| Two other factory instances | `16b3f168…` | 2, at 10:25:14 and 10:28:14 | 6, to Postgres |

Elsewhere: 825 refreshes installed in place, no "refreshed again during preparation", no
ERROR lines and no `relay claim timed out`.

The race at 09:32, from the gateway's and the supervisor's logs:

| Time | Event |
|---|---|
| 09:32:14.161 | The gateway starts refreshing the instance's Lore credential |
| 09:32:14.337 | The supervisor's poll: the provider environment changed, the policy did not |
| 09:32:14.351 | The gateway completes the refresh |
| 09:32:14.392 | The fetch is rejected: `FAIL_CLOSED` |
| 09:32:24.415 | The next poll installs it under generation 2; a tunnel to Postgres closes as stale |

## Cause

- **The revision:** the gateway's provider environment revision is the first 8 bytes of a
  SHA-256 digest over the attached providers, their refresh states and their bindings
  (`compute_provider_env_revision_from_records_and_policy_bindings` in
  `openshell-server/src/grpc/policy.rs`). The proto says: "Revisions are opaque identities,
  never ordered."
- **The check:** `1893c32a4` accepted a fetched environment of the same attachment and
  policy only when `revision >= requested`. When this race occurs, the refreshed digest is
  smaller about half the time, and the supervisor failed closed as before.
- **The test:** it polled revision 2, fetched 3, and asserted that a smaller revision fails,
  so it encoded the mistake.
- **Inferred:** that this check rejected the fetch at 09:32. The log did not name the reason;
  the timing, the unchanged policy and the missing "refreshed again" line point to it.

## Fix, OpenShell `0e795fc`

- **The check:** a fetched environment of the same attachment epoch and policy hash serves
  the request, whatever its revision. The supervisor records the revision it installed, so the
  next poll compares against that one. Only the fetch after a poll uses this check.
- **Unchanged:** an environment of another attachment or policy fails closed; a binding change
  or a revocation still closes open relays.
- **The log:** the fail-closed event names its reason, `[reason:PROVIDER_READINESS_REASON_…]`.
- **The test:** `a_refresh_between_the_poll_and_the_fetch_installs_in_place` now polls 3 and
  fetches 2. The earlier-revision rejection is removed; another policy and another attachment
  are still rejected.
- **Docs:** the supervisor's README.

## Checks, image and deploy

| Step | Result |
|---|---|
| Format check | Passed in 27 s |
| Clippy of the supervisor (`-D warnings`) | Passed in 50 s |
| `cargo test -p openshell-supervisor` | 197 of 197 in 59 s, including the refresh, value-refresh and binding-change tests |
| Supervisor image | `sha256:ca61ac07…`, `0.1.5-dev.200+g0e795fc40`, built in 120 s. The sandbox runtime stays `1ab0e2386` (`6308651a…`); the gateway stays `ebd6a1c` |
| Installation | Bioma `b6217da` (lock and guide), template `7b63c72` (guide) |
| `apply openshell` | Helm upgrade in 8.6 s at 13:58; the plan then matched 1 of 1 |
| First stop and start, 13:59:00 | Failed before stopping anything: the port-forward had attached to the gateway pod being replaced |
| Stop and start | Pods started: Hub 13:59:58; console 14:00:18, Artifact 14:00:31, Media 14:00:50, Media's provider 14:01:03, Embedding's runtime 14:01:25, Embedding 14:01:39 (Ready 14:02:01). Each on `ca61ac07…`, with 0 restarts. The restart script read each sandbox's phase before its stop took effect, so its own timings are not given |
| The owner's Computer | Stopped 14:02:20, pod gone 14:02:25, Ready 14:02:29, on `ca61ac07…`; OpenCode's API answered 200 |
| After, 13:59 to 14:03 | No ERROR, `FAIL_CLOSED`, stale closure or claim timeout; 9 refreshes in place; Hub's metadata 200 |

## Boundaries

- **On `0e795fc`:** Hub, the six services and the owner's Computer.
- **Not yet on it:**
  - g1-rerun's instance stays on `b5aa93da…`;
  - the other five factory instances and `cdjdlsct62djm3cnhv5` stay on `16b3f168…`.
  - Each moves at its next push or start. The factory, where the race came most often, is
    therefore not yet evidence.
- **B22:** its day of logs starts again at 14:02 on `0e795fc`. A race now logs "refreshed again
  during preparation", and a fail-closed event names its reason.
