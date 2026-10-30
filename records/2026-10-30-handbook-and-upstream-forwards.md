# The handbook names delete_group, and why Hub lost its servers

2026-10-30 (UTC). K3s box `rozgo-sim-pc`, public host `https://veoveo.bioma.ai`.

Two things from the owners-delete-groups follow-ups:
- the Computer handbook did not name `console__delete_group`;
- the upstream discovery failures of 2026-10-29 (plan section 8) had no known cause,
  because Hub logged reqwest's outer error without its source.

The failure is now found, measured, fixed and proven: Hub's native forwards to servers
ran out, and the next connection was dropped without a log line.

## Changes

| Repository | Commit | Change |
|---|---|---|
| veoveo-template-installation | `4fec1eb` | The handbook names `console__delete_group` |
| Bioma installation | `21285b2` | The same handbook. The README's "not yet deployed" note on the handbook was stale: the plan showed the live handbook equal to the file |
| veoveo-hub | `9e920f2` | `HubAuthorizedHttpError::Http` names each source after reqwest's message, so every log line and refusal built from it carries the cause. Design: Logging, registered servers |
| veoveo-hub | `549b0bb` | A native connection to a server keeps no idle forward (`pool_max_idle_per_host(0)` on the native client only). A connection beyond the 64 waits up to ten seconds for a forward to end, in turn, then is refused with a WARN. A ForwardTcp the gateway refuses logs WARN with its status. Design: the forwarding paragraph |
| Bioma installation | `1f84d21`, `32b44e4` | Locks Hub `9e920f2` (`hub@sha256:ec2d50b1…`), then `549b0bb` (`hub@sha256:a1d1ea49…`) |

## Handbook

- **Plan, 17:32:33 UTC:** `hub-control-plane` was the only step that differed.
  - The diff was the `computers.handbook` text alone: 5024 bytes declared against 4999
    active.
  - People's grants, memberships and assignments stayed as they were.
- **Apply, 17:33:56:** published revision `gcp-01a18de0-2113-73b0-ba8d-403b02491dc3` in
  0.9 s. Hub did not restart (pod started 03:06:12, 0 restarts), and the plan then
  matched 18 of 18.
- **Computer version:** `computers/version.rs` leaves the handbook out of the version.
  - A's Computer reported `80fd73c9f7fd` as both running and current, with
    `updateAvailable: false`.
  - M's Computer started at `31282b4461fe`, an earlier version unrelated to this change.
- **Boundary:** the plan proves Hub's active document holds the file's text. No MCP
  client's `initialize` instructions were read; clients get the handbook on their next
  connection.

## Checks

| Commit | Linux | Mac |
|---|---|---|
| `9e920f2` | exit 0, 161 s, 361 passed | exit 0, 218 s, 361 passed |
| `549b0bb` | exit 0, 140 s, 362 passed | exit 0, 210 s, 362 passed |

- **New in `9e920f2`:** `discovery_recovers_one_disconnect_without_repeating_domain_mutations`
  asserts that a failed discovery's refusal contains `client error (SendRequest): `,
  the cause after the request.
- **New in `549b0bb`:** `a_waiting_forward_takes_the_next_one_that_ends`.
- **Images:**
  - `hub@sha256:ec2d50b1…` was built in 56 s and `hub@sha256:a1d1ea49…` in 53 s.
  - Both smokes passed: buildkit v0.34.1, uid 10001, no Lore binary, `validate` ok.

## Reproduction, on Hub `9e920f2`

- **Deploy:** `apply hub` at 17:37:43 took 18.7 s. Hub was Ready at 17:37:57 with 0
  restarts, and the plan matched 18 of 18.
- **Probe:** `probe/burst.sh` ran 17:38:06 to 17:38:22, through `veoveo-hub-sdk-cli` in each
  person's Computer:
  - A is `rozgo@bioma.ai` (role `admin`) and M is `alex.rozgo@vrx.group` (role `member`);
  - both people's `tools`, in parallel;
  - A created `probe-burst-1738` and added M;
  - five changes of M's role, each followed at once by both people's `tools`;
  - the group's deletion.

At 17:38:16, right after the fifth change, Hub logged 26 WARN lines, every one for
Console, with the causes now named:

| Count | Line | Cause |
|---|---|---|
| 8 | retry | `error writing a body to connection: Broken pipe (os error 32)` |
| 4 | retry | `connection error: Connection reset by peer (os error 104)` |
| 1 | retry | `connection closed before message completed` |
| 5 | isolated failure | `connection closed before message completed` |
| 4 | isolated failure | `Broken pipe` |
| 2 | isolated failure | `client error (Canceled): operation was canceled: connection closed before message completed` |
| 1 | isolated failure | `client error (Canceled): operation was canceled: connection was not ready` |
| 1 | response error | `Broken pipe`, the refused `console__delete_group` |

The response error at 17:38:17 was the probe's own `console__delete_group`.
Console was still unreachable at 17:39:09 (`console__groups` refused, same causes) and
answered again by 17:42:35. So the outage lasted between 53 s and about 4 min.

## Cause

Each observation narrows where the connection died:

1. **Console was idle and healthy.** At 17:39:24 its process had 18 open files and 18
   established connections, and its pod was Ready with 0 restarts.
2. **Nothing reached Console after 17:38:16.**
   - Its supervisor logged its last inbound `NET:OPEN 127.0.0.1:8805` at 17:38:16 and
     nothing more until two closes at 17:41:03.
   - The gateway opened no relay to Console's sandbox (`52839a28…`) after 17:38:1x,
     though Hub kept failing on Console. So those connections never left Hub's sandbox.
3. **Hub drops a connection when its forwards are full.**
   - Hub reaches each native server through its own `ForwardTcp` per connection: 311
     calls in two minutes, 14 of them within 31 ms at 17:38:16.
   - Every server connection shares 64 forwards (`CONNECTIONS` in
     `mcp/native_upstreams.rs`).
   - The accept loop did `let Some(stream) = forwards.reserve() else { drop(socket); continue };`,
     so a connection beyond the 64 was closed with no log line.
4. **The 64 were all in use.** `probe/forwards.sh` counted each server sandbox's open
   inbound connections from its supervisor's `NET:OPEN` and `NET:CLOSE` since Hub's start:

| At 17:38:16 | Forwards |
|---|---|
| Eight factory instances in `vv-factory` | 40 (3 to 6 each) |
| Console, Artifact, Media, Embedding | 24 (6 each) |
| Total | **64** |

They were idle keep-alive connections:
- **Measured:** the counts stayed unchanged at 17:39:30, with no traffic to the factory
  instances, and were 0 by 17:44.
- **Inferred:** they lasted as long as reqwest's 90-second default idle timeout, since
  Hub's native client set none.

Each discovery opens about six connections to a server in parallel. So 12 servers fill
the 64 by themselves: at a Hub restart (72 > 64), or whenever a call needs one more
connection while the pool sits full. That accounts for:
- the restart bursts of 2026-10-29;
- the burst at 22:37 without a membership change;
- the three minutes after a membership change.

**Correction to the 2026-10-29 record:** "the gateway answered every ForwardTcp with 200"
says nothing about these failures. A gRPC status travels in trailers under HTTP 200, and
the dropped connections opened no ForwardTcp at all.

## Fix, on Hub `549b0bb`

- **No idle forward.** Hub keeps no idle connection to a server: a forward lives as long as
  its request or stream.
- **Waiting instead of dropping.** A connection beyond the 64 takes a place in turn,
  waiting up to ten seconds, then is refused with WARN "every native upstream forward
  stayed in use for ten seconds".
- **Refusals are logged.** A ForwardTcp the gateway refuses, or doesn't open within ten
  seconds, logs WARN with the gateway's code and message.
- **Unchanged:** Computers keep their own limit, refused at once.

**Deploy:** `apply hub` at 17:53:48 took 17.4 s. Hub was Ready at 17:53:58 on
`hub@sha256:a1d1ea49…` with 0 restarts, and the plan matched 18 of 18.

**Probe:** the same `burst.sh`, twice, at 17:54:09 and 17:54:28.

| | Before (`9e920f2`) | After (`549b0bb`), run 1 | After, run 2 |
|---|---|---|---|
| Steps failed | 1 of 24 | 0 of 24 | 0 of 24 |
| Hub WARN or ERROR | 26 | 0 | 0 |
| Forwards held into servers after the run | 64, at the failure | 8 | 8 |
| `tools`, mean and max | 578, 722 ms | 627, 746 ms | 604, 650 ms |
| Other calls, mean and max | 782, 853 ms | 768, 989 ms | 720, 755 ms |

- **Hub's log:** no WARN or ERROR from its start at 17:53:58 to 17:55:32, the restart's
  discovery of every server included.
- **The 8 forwards:** all into Console, unchanged at 17:54:26, 17:54:54 and 17:55:10, so
  they are long-lived streams, not idle connections.
- **Timings:** end to end through `kubectl exec` and the CLI's start. No idle reuse cost
  nothing measurable at this resolution.

## Boundaries

- **Not exercised live:** the wait beyond 64 and the WARN for a gateway refusal. The
  wait is covered by the unit test only.
- **The 8 Console streams:** not identified by subject or route.
- **Capacity:** 64 is still the cap for long-lived streams into all servers together. A
  deployment with more long-lived streams than that would wait, then be refused with a
  WARN, rather than fail silently.
- **Artifact's grant to a deleted group:** unchanged. Artifact stores group IDs as opaque
  subjects and has no way to learn of a deletion; the grant is inert because no group is
  given an ID again.

## Cleanup

- `probe-burst-1738` was deleted at 17:55 (its own deletion had failed in the
  reproduction). Neither person holds any `probe-*` group.
- The two runs after the fix deleted their own groups.
- Probe JSON was removed. The logs in `~/k3s-builds/errchain-20261030/probe/` hold step
  timings and Hub's warnings, with no tokens or signed URLs.
