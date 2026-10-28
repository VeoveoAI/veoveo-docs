# Hub's stalled forwards, and a second sign-in

2026-10-28 (UTC). Coordinator: Opus. No model calls.

This follows the open items of the [early adopters' failures](2026-10-27-early-adopter-failures.md).
Its "Hub could not reach console after its restart" was wrong on both counts: every
server was affected, and Hub's restart was not the cause.

## Second sign-in (checklist B16)

Method:
- **Person and Computer:** the owner, `rozgo@bioma.ai`; Computer `01a16a8c…`, workspace
  `c4itoit73lpkaheav7u`, ready since 2026-10-27 18:28:28.
- **First browser:** Chrome's `Default` profile, holding Hub's session cookie.
- **Second browser:** Chrome's `bioma.ai` profile, with an Entra session and no Hub cookie,
  opened with `open -na "Google Chrome" --args --profile-directory=…`.
- **A running process with the placeholders it started with:** a loop started in the
  Computer at 16:19:00, before the sign-in, that ran `veoveo-hub-sdk-cli tools` and
  `lore repository list` every 16 s.

| Check | Result |
|---|---|
| Sign-in | `/computer` at 16:19:13.64, then `/oauth/authorize`, Entra, `/oauth/callback`, `/oauth/token`, `/computer/callback` at 16:19:15.69, then the Computer's page, 200 at 16:19:15.99 |
| Custody | Family unchanged, `handoff_id` null; a second browser session row in the same family at 16:19:15.69, beside the 2026-10-23 one |
| Gateway | No `ConfigureProviderRefresh`, `Rotate`, `DeleteSandbox` or `CreateSandbox` from 16:19:05 to 16:20:30 |
| Sandbox | Same pod uid, started 2026-10-27 18:28:28, 0 restarts |
| Running process | Calls at 16:19:16, :32, :48, 16:20:04 and :20: Hub and Lore exit 0, no stderr. Its supervisor: no `credential_unavailable`, 9 Hub calls allowed |
| First browser | Still admitted: the status page says running, and `/computer` opened the Computer |

The loop was stopped and its files in `/tmp` removed.

## Hub's stalled forwards

Measured, 2026-10-27:
- **Hub started cleanly:** at 23:14:38 it set up its sessions to every server.
- **The sessions ended together:** at 23:15:37.74 the slug probe called
  `console__create_repository`. At 23:15:38.25–.36 Hub ended its sessions to every server
  and opened new ones.
- **No new connection reached a server for two minutes:**
  - From 23:15:38.4 to 23:17:38, no server's supervisor saw a new connection from Hub.
  - Hub's forwards to Computers kept opening.
  - Discovery timed out at 10 s for embedding, artifact, media, template and console
    alike: 23 times, the last at 23:16:46. This is the only time it appears in 3 days of
    logs.
  - At 23:17:38.47, 27 connections at the servers closed at once.
- **Open connections at the servers:** about 29 at 23:15:38.385, counted from their
  supervisors' OCSF open and close events, plus 3 that hung.

Cause:
- **One gateway connection per path:** Hub carries each forwarded TCP connection as one
  ForwardTcp stream for the connection's whole life, idle keep-alive included. All of a
  path's streams shared one HTTP/2 connection to the gateway: one for servers, and one for
  Computers, which also carried custody RPCs.
- **The supervisor's cap:** Hub reaches the gateway through its sandbox supervisor's L7
  HTTP/2 relay. That relay admits 32 concurrent streams per connection
  (`openshell-supervisor-network/src/l7/http2.rs`, `MAX_STREAMS`, since 2026-10-16).
- **The effect:** a forward beyond 32 waits in the client for a free stream, without
  error and without reaching the gateway, until another stream ends. Hub's own limits, 64
  for servers and 512 for Computers (`forwardingConnectionLimit`), were never reached.
- **Inferred:** idle pooled connections held the 32 streams until they closed together
  at 23:17:38.

Fix, Hub `651390d`:
- **Design:** in Hub's `DESIGN.md`, in the same commit (`072ff96`).
- **Connections of their own:** forwards ride gateway connections of their own, apart from
  native RPCs, at most 32 on each, each opened at its first forward. Servers' 64 forwards
  use 2 connections, Computers' 512 use 16. Only the limit refuses a forward; a
  connection's streams never do.
- **Unit test:** 70 forwards fill connections of 32, 32 and 6; the 71st is refused, and a
  freed stream is reused.

## Deployed probes

Computer path (the same code): from the owner's Computer page in Chrome (HTTP/3 to the
edge), N concurrent `GET …/api/event` requests, OpenCode's event stream, which stays open.
Headers were awaited for 15 s, then every request was aborted.

| Hub | Started | N | Opened | Waiting at 15 s | Other | Slowest opened |
|---|---|---|---|---|---|---|
| `5a1b926` | 16:58:06 | 40 | 28 | 12 | 0 | 5785 ms |
| `651390d` | 17:07:16 | 40 | 40 | 0 | 0 | 341 ms |
| `651390d` | 17:08:07 | 64 | 61 | 0 | 3 × 502 after 10.2 s | 281 ms |

- **The old Hub's waiting 12 never left Hub:** the Computer's supervisor saw 30 inbound
  connections during the first run, the 28 streams and the page's own two.
- **The 502s are a different bound, in OpenShell:** the gateway logged `relay claim timed
  out` (`sandbox_service_relay`) for its public relay into Hub's sandbox. It answers 502
  after 10 s once about 60 long-lived requests into Hub are open. Not investigated.
- **The server path, after the deploy:** 3 rounds of 4 concurrent `tools` calls from the
  Computer: 12 × exit 0, 54 tools each, 427–704 ms. Hub logged no error from 16:58:40 on,
  across 459 requests.
- **Not reproduced live on the server path:** the same probe on the old Hub (16:56:06,
  12 × exit 0) opened only 3 new forwards, below the cap. The server path is covered by
  the unit test and the shared code.

## Checks and deploy

| Step | Result |
|---|---|
| Gate at `072ff96` | Failed on advisory RUSTSEC-2026-0414, published since the previous gate: `pulldown-cmark` 0.13.4, a build dependency of `prost-build`. Hub `651390d` takes 0.13.5 |
| Gate at `651390d` | 356 passed, 2 skipped, in 174 s |
| Hub image | First attempt stopped at disk 80%. `docker builder prune --max-used-space 200gb` reclaimed 0 B on Docker 29.2.1; `--filter until=72h` reclaimed 151 GB, leaving 72%. Then `hub@sha256:5a5068f0…`, built in 66 s, smoke ok |
| Deploy | Installation `62b288e`; `apply hub` in 20.4 s; Hub ready at 16:58:47 |

## Other open items

- **Helm 4 on the box:** `~/.local/bin/helm`, Helm 4.3.0 from 2026-09-23, was deleted. A
  login shell now runs `/usr/local/bin/helm` 3.22.1. Plan: 18 of 18 steps match, with
  empty stderr.
- **A deleted repository's watch:** not a defect. Lore answers a subscription to a deleted
  repository with `PermissionDenied`, which Hub takes as a refusal: at its next start the
  follower records the failure once and stops. Until then it holds one idle stream.

## Boundaries

- **B16:** proven for a second browser of the same person with a live family. A sign-in
  after the family expired or was revoked hands custody off and restarts the sandbox; the
  gate proves that path only.
- **Server-path saturation:** not reproduced live, as above.
- **Inbound relays:** the bound of about 60 concurrent long-lived requests into Hub is
  measured, and its cause is not known.
