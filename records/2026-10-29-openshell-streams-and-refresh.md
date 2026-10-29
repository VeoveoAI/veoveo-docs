# OpenShell: connections into a sandbox, and a refresh between a poll and its fetch

2026-10-29 (UTC). Coordinator: Opus. No model calls. Plan section 5, approved 2026-10-29.

## About 60 long-lived requests into Hub

Measured 2026-10-28: with about 60 long-lived requests into Hub open, the gateway answered
the next with 502 after 10 s and logged `relay claim timed out`
([record](2026-10-28-forwarding-and-second-sign-in.md)).

### Cause

The path of a request into a sandbox:
- **The gateway:** it asks the sandbox's supervisor for a relay and waits 10 s for the
  supervisor to claim it.
- **The supervisor:** it first opens the sandbox's port through the boundary
  (`LoopbackConnect`), and only then claims the relay.

The boundary is one HTTP/2 connection between the supervisor and the sandbox runtime:
- **Its limit:** it admitted 128 concurrent streams. Every exchange, relay and mediation
  session uses one.
- **Outbound:** the sandbox's outbound TCP connections and their pending accepts had a
  budget of 96 (`MAX_NETWORK_STREAMS`). The proxy always keeps 32 accepts pending.
- **Inbound:** connections into the sandbox had no budget. Each took a stream for its whole
  life, and one beyond the connection's limit waited in h2 without a log line. That is
  why the budget's own "exhausted" warning never appeared.

Hub's sandbox as it ran, from `/proc/net/tcp` at 07:00, against the boundary's 128 streams:

| Holder | Streams |
|---|---|
| Mediated outbound connections | 26, seen as 52 loopback sockets |
| Pending accepts | 32 |
| The gateway's pooled inbound relays to `:8080` | 8 |
| Mediation and control | About 2 |
| Free for new inbound connections | About 60, the bound measured |

### Fix, OpenShell `f21170c5e`

- **Connection limit:** the boundary connection admits 1024 streams.
- **Budgets:** outbound connections keep 96. Connections into the sandbox get 896 of their
  own, held by the stream until it closes. Exec and control exchanges keep the rest.
- **Waiting:** each kind waits for a stream of its own, and logs once when it waits more than
  5 s, as outbound already did.
- **Connection window:** 1024 × 256 KiB + 16 MiB, so stalled streams of every budget still
  leave control traffic credit.
- **Test:** `every_budgeted_stream_opens_and_exchanges_still_answer` opens 992 streams at
  once on a connection with the boundary's settings, then a control exchange. With 128
  streams it waits at the 129th.
- **Docs:** the crate's README.

## A refresh between a settings poll and its fetch

Measured 2026-10-28, from the supervisors' logs:
- **Fail-closed events:** in 30 h, 8 in 3 Computers and 12 in the factory, each logged as
  `FAIL_CLOSED` "Provider environment refresh failed; static credentials were revoked".
- **Hub and the services:** none.
- **What followed:** static credentials were revoked for a poll interval of about 10 s.
  When they returned, a new policy generation closed every open connection: "L7 tunnel
  closed before inspection because policy changed: policy generation is stale". That cut 14
  connections to Hub and 1 DeepInfra model call.

### Cause

Example: Josue's Computer at 2026-10-29 05:04:54.

| Time | Event |
|---|---|
| 05:04:53.804 | The gateway's refresh sweep starts; 6 credentials are due, refreshed one after another |
| 05:04:54.655 | The supervisor's poll sees a new provider environment revision |
| 05:04:54.662 | The gateway completes another refresh |
| 05:04:54.709 | The supervisor's fetch returns that later revision. It is not the one polled, so it fails closed |
| 05:05:04.784 | The next poll installs it under a new generation; a tunnel to Hub closes as stale |

- **Two calls:** the poll and the fetch are separate calls.
- **The identity check:** the supervisor compares the polled environment's identity (its
  attachment epoch, revision and policy hash) with the fetched one's, and took any
  difference for a failure.
- **What it actually was:** a later revision of the same attachment and policy is the
  gateway's current state, not a failure.

### Fix, OpenShell `1893c32a4`, `1ab0e2386`

- **The check:** a fetched environment of the same attachment and policy, at the polled
  revision or later, serves the request and installs in place. Any other fails closed as
  before.
- **State:** the supervisor records the revision it installed, so the next poll does not
  fetch it again.
- **Logs:** it logs when a later revision served the request. The in-place line names the
  revision installed.
- **Test:** `a_refresh_between_the_poll_and_the_fetch_installs_in_place`:
  - polled 2 and fetched 3: applied under the same generation, the open relay kept, and the
    new value resolves;
  - the next poll, of 3, is unchanged;
  - an earlier revision, another policy and another attachment each still fail closed.
- **Docs:** the supervisor's README.

## Checks, images and deploy

| Step | Result |
|---|---|
| Format and clippy (`-D warnings`) of sandbox-backend, supervisor and sandbox | Passed; clippy in 51 s |
| `cargo test` of those three crates | 563 of 564 passed in 111 s, including the four refresh and stream tests |
| The one failure | `confined_listener_peers_are_limited_to_this_network_namespace` ("same-namespace client: TimedOut"). It fails 5 of 5 alone, and has failed the same way on this box since 2026-10-23, before this change. It is one of the box's accepted known failures |
| Images, OpenShell `1ab0e2386` | Sandbox runtime `sha256:6308651a…` and supervisor `sha256:b5aa93da…`, both `0.1.5-dev.199+g1ab0e2386`. The gateway stays `ebd6a1c` (`sha256:1c2b99cd…`); the chart is the same |
| Installation | Bioma `f864084` (lock and guide), template `f8d71ce` (guide) |
| `apply openshell` | Helm upgrade in 8.4 s at 07:31:07; the gateway pod was replaced; the plan then matched 1 of 1 |
| Stop and start onto the new runtime | Hub 12 s; console 19 s, Artifact 5 s, Media 5 s, Media's provider 5 s, Embedding 13 s, Embedding's runtime 20 s, 07:32:39–07:34:02. Every supervisor is `b5aa93da…` |
| After | Hub's metadata answered 200 in 0.35 s. Hub's warnings were discovery retries while each service restarted, from 07:33:07 to 07:33:37, and none after |

The owner's Computer was restarted at 07:34:30 and back at 07:34:41, on the new runtime and
supervisor. Its version stayed `7e27dc4bf18d`: the final policy file differs from the
probed one only in comments. Factory instances and other people's Computers take the
runtime at their next push or start.

## Deployed probes

**Many long-lived requests into Hub.**
- **Method:** from the owner's Computer page in Chrome, as on 2026-10-28: N concurrent
  `GET …/api/event` requests, headers awaited for 15 s, then every request aborted.
- **Why 120:** each stream is also a forward into the Computer's sandbox, where the
  gateway admits 128 active forwards, so 120 is the most this path can show.

| OpenShell runtime | N | Opened | Other | Slowest opened |
|---|---|---|---|---|
| `ab37a698c`, 2026-10-28 | 64 | 61 | 3 × 502 after 10.2 s | 281 ms |
| `1ab0e2386`, 2026-10-29 07:35:17 | 120 | 120 | 0 | 427 ms |

During the 120:
- **Hub's supervisor:** 113 new inbound connections (the rest rode pooled relays) and 120
  forwards to the Computer.
- **The Computer's supervisor:** 120 connections to OpenCode.
- **The gateway:** no `relay claim timed out` from 07:30 on, and no budget's exhaustion
  warning.

**A refresh keeps connections.**
- **On the new supervisor:** the owner's Computer logged "Provider credential values
  refreshed in place; the policy generation is retained" at 07:36:19.
- **From 07:32:39 to 08:14:35:** no `FAIL_CLOSED` and no "policy generation is stale"
  anywhere. 104 refreshes were installed in place: 13 in the owner's Computer on the new
  supervisor, and the rest on the old one, in the other Computers and the factory.
- **Still to collect:** the race itself came about once in 11 h per Computer and once in
  2.5 h across the factory. On the new supervisor it logs "refreshed again during
  preparation" when it comes. A day of logs from sandboxes on it is the deployed evidence.
- **On the new supervisor:** Hub, the services, the owner's Computer and, since its push at
  08:12:58, g1-rerun's instance. The other five factory instances and other people's
  Computers move to it at their next push or start.
