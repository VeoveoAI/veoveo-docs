# Time's App: Tasks and live wakes through Hub's Apps host

2026-10-31 (UTC; Friday night Pacific). Coordinator: Claude Code (Opus 5.5). No model
calls. Plan section 13; checklist I4. Follows
[Hub's Apps host and Time's App](2026-10-31-apps-host-and-time-app.md), which proved I1
to I3 and I7.

## What was deployed

| Component | Revision | Image or path | When (UTC) |
|---|---|---|---|
| Hub | `350df8f` (live listens), then `4f92d3d` | `hub@sha256:625840a2…`, then `hub@sha256:0dd53fd8…` | `4f92d3d` built in 59 s on the box, applied 05:28:51, sandbox swap 21.1 s |
| Time | `12bfbba` (the view listens again after a listen ends), then `bb4fb1a` | Lore `time` revisions 10 and 11, pushed from the owner's Computer | revision 10 served at 05:20:52, revision 11 at 05:37:21 |
| Bioma's installation | `548571e` | the Hub digest in `component-lock.json` | |

`plan` showed only the Hub image change before the apply.

## Unplanned fixes

- **Cloudflare kept Hub's old host script.** After Hub `350df8f` was applied, the App
  reported "Live updates are off: this host does not forward them" although the bridge
  answered a `subscriptions/listen` sent from the page by hand with
  `text/event-stream`, the acknowledgement and a wake. The page had run `/apps/host.js`
  from the browser cache: 6,962 bytes with no transfer, while Hub served 10,764 bytes.
  Hub sent `Cache-Control: no-cache`; Cloudflare cached the script at the edge
  (`cf-cache-status: EXPIRED`) and answered `cache-control: max-age=14400`, its four-hour
  browser lifetime. A script at a fixed path therefore outlives the Hub that served it.
  Hub `4f92d3d` serves the script at `/apps/host-{digest}.js`, the first 16 bytes of its
  SHA-256 in hex, as `public, max-age=31536000, immutable`, and the host page, which is
  `private, no-store`, names the current one; `/apps/host.js` answers 404. Hub's design
  states it. 25 of 25 Apps tests pass, including the digest, the lifetime and the 404.
  After the deploy the page loaded `/apps/host-8c6d015c1cec41ab1489f906d82b8054.js`,
  10,764 bytes over the network.
- **Time refused a retried calendar.** Repeating `create_calendar` with the same calendar
  and the same `idempotencyKey` answered "conflicts with the current durable record":
  the request required a key that the server never read, and an existing version was
  always a conflict. Time `bb4fb1a` removes the key from `create_calendar` and
  `create_epoch` and answers the stored version when the same version arrives again
  with the same content; other content still conflicts. This is a breaking contract
  change: a request with `idempotencyKey` is refused as an unknown field. Time's design
  states the rule; 186 tests pass and 10 are ignored. Replaying both calendars after the
  deploy answered `isError: false` in 309 ms and 314 ms.

## Probes, in the owner's Chrome, signed in

Measurement: a capturing `message` listener on the host page logged each message from the
proxy with its time, the host page's `fetch` was wrapped to log each bridge request and
its result, and Resource Timing gave each bridge request's start and duration. Times are
the browser's clock unless marked as the server's. Calendars and the event were created
as the owner from the owner's Computer with `veoveo-hub-sdk-cli`, through Hub, by
scripts on the box (`~/k3s-builds/apps-20261030/time-calendars.sh`, `time-event.sh`,
`time-calendar-b64.sh`).

| Check | Result |
|---|---|
| Live state | After the reload the App shows "Live": every listened resource was acknowledged |
| Ticking clock | 22:29:05, then 22:29:13 eight seconds later, with no new read (last read 05:29:01 UTC): the view animates from its monotonic anchor and reads only on wakes |
| Event wake | `create_event` "Shift handover" started 05:29:41.996 (call 505 ms). At 05:29:42.441 the view sent `resources/read time://events` and `time://clock/current`, 445 ms after the call started and before the command line returned; "Shift handover, in 29 min" appeared with no refresh |
| Calendar wake | A third calendar, "Long history" (150 daily windows from 1026, 15,941 bytes), created 05:31:49 in 414 ms; the view read `time://calendars` at 05:31:49.214 and listed it |
| Task, completed | "Expand the next 7 days" on "Weekday shift" (Europe/Berlin): `tools/call expand_schedule` answered `resultType: "task"`, `status: "working"`, `statusMessage: "Queued"`, `pollIntervalMs: 1000`; the view polled `tasks/get` at 05:30:04.996 and received the completed result; it then projected five occurrences with `convert_time`: Monday to Friday from 2026-11-02 09:00 at UTC+01:00, the standard-time side of Berlin's October change |
| Task, timing | "Millennium scan" (daily from 1026): created 05:30:23.021 and completed 05:30:23.349 by the server's `lastUpdatedAt`, 328 ms; "Long history" ran 2.6 s. The first cancel attempts came after completion and sent no `tasks/cancel` |
| Task, cancelled | "Long history" again: the Task was created at 05:32:30.994 (server); the view's Cancel sent `tasks/cancel` at 05:32:31.903, answered 200; the next `tasks/get` at 05:32:32.008 answered `status: "cancelled"`, `statusMessage: "Cancelled"`, `lastUpdatedAt` 05:32:32.119 (server), and the view shows "is cancelled" |

## Boundaries

- One browser (Chrome on macOS), one person (the installation's owner). The listen's
  ceiling per session, its end when the session ends and the teardown on page exit are
  covered by Hub's component tests, not probed here.
- The wire shapes come from the host page's side of the bridge. Messages from the host
  into the proxy frame were not logged; that the view rendered each result is seen on
  screen.
- Hub's full Docker check and the Linux `docker build --target check .` of Time were not
  run; Hub's Apps tests and Time's full local suite were. The clippy run over Hub's crate
  stops on an existing `type_complexity` error in `policy/session.rs`, which this change
  did not touch.
- Time's stored state was not reset for its contract change; stored calendars read back
  unchanged.
