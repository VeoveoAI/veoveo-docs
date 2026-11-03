# 2026-11-03: The Task group guard completed, a Task answers only its person, and the watches handed back

Follow-up to the sweep ([record](2026-11-02-skills-and-work-context-sweep.md)) and the people's
factory servers ([record](2026-11-03-people-factory-servers-repinned.md)). Probes ran on the K3s
box `rozgo-sim-pc` with the owner's two accounts: A = `rozgo@bioma.ai`, M =
`alex.rozgo@vrx.group`. Scripts and logs: `~/k3s-builds/sweep-20261102/`.

## Deployed

| Component | Revision | Image |
|---|---|---|
| Hub | `ddb901c` | `hub@sha256:5c1563f0…` |
| Hub CLI | SDK `a9abfd2` | `hub-sdk-cli@sha256:b17a1c9c…` |
| Bioma installation | `3ea5cff` (on `6f8e0ac`, `7c78580`), control plane `gcp-01a1a048…` | |
| Template installation | `68210d4` | |
| Computer version | `0e9996d5296e` | |

## The Task group guard, completed (Hub `ddb901c`)

Review of Hub `92ad0be` found two gaps: a group counted as configured only while someone still
held it, so deleting a group (or removing its last member) passed; and roles were not compared,
so an owner downgraded to member kept the saved role. Now, at each Task exchange, the Hub reads
the caller's session family once, takes the principal stored at sign-in (the identity
provider's groups), adds the current revision's memberships as a request does, and refuses with
"the caller's groups changed since the Task started" when a saved group is missing or its role
is lower (roles ordered read < write < admin). Gains do not refuse. A deleted family refuses with
"the caller's session has ended"; a token bound to no family is treated as having no identity
provider groups (fail-closed for a family-less person).

Deployed probe: M's Task runs `qual-wait-then-call` (Wait 60 s, then `time__resolve_time`) in
team-a's runner; the change is made at +10 s on a temporary group of M.

| Case | Result | Task |
|---|---|---|
| Removal | refused, 66.9 s | `gtr_J6R8MC7s…` |
| Group deleted | refused, 74.8 s | `gtr_CjKAWxgL…` |
| Owner downgraded to member | refused, 65.3 s | `gtr_6EUouiW1…` |
| No change (control) | succeeded, 61.0 s | execution 10 |
| Member upgraded to owner | succeeded, 61.0 s | execution 11 |

Each refusal reached the workflow as "the Hub refused the call: InvalidGrant: the caller's
groups changed since the Task started". A first removal attempt died at 0.6 s because the runner
dropped its MCP connection right after the workflow push; it was re-run. The workflow and the
temporary groups were removed afterwards; the four pre-existing groups are unchanged.

Component tests: Hub 482 on the box. The Linux Docker check fails one test,
`calls::servers_call_each_other_for_their_caller_through_the_hub` (a transport error during a
resource subscription), the same way on the previous main `b5c0832`; it is not this change and
is open.

## A Task answers only its person (checklist K6)

Inside a Computer only OpenCode, the Hub CLI and `veoveo-n8n-computer` reach the Hub, and none
could read a Task by its identifier. So:

- SDK `5802383` adds `HubClient::get_task` and `cancel_task` and the CLI's `tasks get <id>` and
  `tasks cancel <id>`, on the caller's own connection.
- The Computer policy's `hub` rule names `tasks/get` and `tasks/cancel` (template `68210d4`, Bioma
  `3ea5cff`): `allow_all_known_mcp_methods` does not admit extension methods, so before this every
  call was refused by the proxy (`policy_denied`) before the Hub could decide. The policy takes
  effect when the Computer's sandbox is recreated.

Probe at 07:26:57Z on Computer version `0e9996d5296e`: each person starts `n8n__team-a__run` of
`slow-run` (90 s) from their own Computer, then calls the CLI.

| Call | A's Computer | M's Computer |
|---|---|---|
| `tasks get` of their own Task | `working`, 406 ms | `working`, 384 ms |
| `tasks get` of the other's Task | refused -32602 "unknown task id", 378 ms | refused -32602 "unknown task id", 366 ms |
| `tasks cancel` of the other's Task | refused -32602 "unknown task id", 382 ms | refused -32602 "unknown task id", 378 ms |
| Their own Task afterwards | completed (execution 17), 91 s | completed (execution 18), 91 s |

The Hub answers another person's Task as unknown; it does not say whether the Task exists.
Tasks A: `gtr_K0NxYu34…`, M: `gtr_DhgeiPhx…`.

## The flaky CLI sign-in tests (SDK `a9abfd2`)

The box check of SDK `5802383` failed one `sign_in` test per run with `RecvError`. Cause: each
test reserved its redirect port by binding port 0 and closing it, and the sign-in bound it again
after discovery; under the box's 32 parallel test processes Linux gave the freed port to another
socket ("Address already in use"). It predates the change: 14 of 300 stress iterations failed on
`a85b72d`, 8 of 300 on `5802383`, 0 of 300 after the fix. The sign-in now binds before discovery,
and the tests keep their listener for the whole test. Production's redirect port 3211 is outside
the ephemeral range, so it never had the race.

## People's repository watches handed to their owners

The owner did not want to remain the watcher of people's repositories. A watch is one principal
per repository in `hub.lore_watch`, and the Hub mints each person's Lore token itself, so the
five rows were set to each repository's owner (exactly the row the owner's own watch writes),
the Hub restarted to subscribe as them, and A's write assignments on four repositories were
removed (`gcp-01a19fed…`, 53 → 49 assignments). Two more Hub restarts (17 s and 13 s to ready)
showed the owners still recorded with no failure, and all eight branches serving their previous
revisions. Not observed directly: the subscription itself as each owner, until their next push.

## Notes

- Computers are collected after two idle hours (`computers.collectAfterSeconds` 7200): the
  sandbox is deleted, the home kept, `collected_at` set, and the next entry starts it. Both of
  the owner's Computers were collected overnight because the home repair had reset keep-on;
  keep-on is set on both again.
- Not explained: in one run before a Computer restart, M's `n8n__team-a__run` call did not return
  within 4.5 min and was killed; it did not recur. In one `skills/list` digest pass, 8 of 24 reads
  from A's Computer failed to parse and passed on a re-run; that pass overlapped a second restart
  of A's Computer (07:28:44Z) left running by the probe script, which is the likely cause (not
  confirmed against the failing answers, which were not kept).
- The Lean proof session retired the Work Context proof packages (Hub `4126591`, SDK `e62f927`).
- Still pending: K8 (a pushed server's skill asks for approval in OpenCode and n8n's Assistant)
  and the model-driven acceptance for this rollout.
