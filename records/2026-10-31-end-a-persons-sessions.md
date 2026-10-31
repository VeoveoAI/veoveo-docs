# An administrator ends a person's sessions

2026-10-31 (UTC). K3s box `rozgo-sim-pc`, public host `https://veoveo.bioma.ai`.

When a person's access changes in Entra, Hub learns of it only at their next sign-in, up
to seven days later: a session keeps the sign-in's roles, groups and data labels. Two
findings shaped the fix:
- **Logout ends only your own session,** and the admin `jwt-revocations` route revokes
  one token, not a session.
- **A Computer's Lore access doesn't depend on any session.** Its own OAuth client mints
  Lore tokens, and Hub admits it by its secret's digest alone
  (`store/computers/lore_client.sql`), checking only repository shares. Ending a
  person's sessions would have left their running Computer reaching Lore.

## Change

| Repository | Commit | Change |
|---|---|---|
| veoveo-hub | `ce3cada` | `DELETE /admin/{profile}/people/{email}/sessions` for `admin_write`, audited as `sessions_end` on `veoveo://people/{tenant}/{principal}`. One transaction locks the person's Computer, clears its Lore client and revokes their live families in batches of 1,000 as `administrator_revocation`, with their pending deliveries. Hub then stops the Computer the way idle collection does, keeping its home. Answers the person, the sessions ended and the Computer (`stopped`, `notRunning`, `busy`, `none`); 404 `person-not-found`; 502 `computer-not-stopped`. Migration `0030` adds the reason. Design: Hub's `DESIGN.md`, beside logout |
| veoveo-mcp-console | `80753f3`, reverted in `acc4ba2` | An `end_sessions` tool, removed: see below |
| Installations | template `8b22694`, `06459ef`, `721dbfb`; Bioma `4e9c05c`, `29b86ac`, `9ff2794` | Lock Hub `ce3cada` (`hub@sha256:fadbe42f…`). Console's policy rule was added, moved to an endpoint of its own, then removed with the tool. The lock now holds console `acc4ba2` (`console@sha256:3277d355…`) |

## Checks

| Check | Result |
|---|---|
| SQL metadata (`hub-sqlx-prepare`, from a source tarball) | Two compile errors on the first run, fixed. Three query files, then two replaced after the database rules required bounded statements |
| Hub, first run | 363 of 364: `hub_queries_follow_the_database_rules` flagged the test query (no tenant) and the family update (no bound). Fixed: the test names the tenant, and the update works through a `LIMIT 1000` subquery the transaction repeats |
| Hub `ce3cada` | Linux 112 s and Mac 163 s: `cargo deny` ok; 364 of 364, with `ending_a_persons_sessions_revokes_their_live_families_and_their_lore_client` |
| Console `80753f3` | Linux and Mac, 29 of 29. The revert `acc4ba2` has the same tree as `8384a5b`, which passed earlier, so it was not rechecked |

## Deploy

| Step | Result |
|---|---|
| `hub`, 02:55:44 UTC | 9.4 s, Ready, 0 restarts, `hub@sha256:fadbe42f…` |
| `platform-servers`, 02:55:54 | Console `924f7a15…` in 8.8 s |
| Policy fix, 02:58 | The rule sat under Console's `/lore/**` endpoint, so `/admin/...` matched the `hub_metadata` entry and was denied in Console's sandbox ("no L7 endpoint path matched request"). Given an endpoint of its own; `platform-servers` in 19.6 s |
| Plan | 18 of 18 after each step |

## Probe

The administrator is `rozgo@bioma.ai`, signed in on profile `local` through the Hub
CLI's browser sign-in in Chrome Profile 10. The token's claims are `roles:
["administrator", "operator"]` and tenant `reference`; Hub's admin rule
`installation-administration` admits role `administrator` on profile `local`. The
person is `alex.rozgo@vrx.group` (installation role `member`), whose Computer was started
from Chrome Profile 11.

| Time | Who, how | Result |
|---|---|---|
| 02:57:14 | The person enters their Computer | Ready in 4 s; Hub tools 52, Lore list exit 0, OpenCode 200 |
| 02:59:08 | The person, through Console in their Computer, ends the administrator's sessions | 403 from Hub |
| 02:59:21 | The administrator, through Console on `local` | 403 from Hub |
| 03:01:07 | The administrator, the route directly, unknown email | 404 `person-not-found`, 0.41 s |
| 03:01:07 | The administrator, the route directly, the person | 200 `{"sessionsEnded": 2, "computer": "stopped"}`, 1.38 s |
| 03:01:08 | Hub's log | INFO "a person's sessions ended", 2 sessions, Computer `Stopped` |
| 03:01:10 | The database, read only | The person's two live families are `administrator_revocation`; the Computer's Lore client is cleared; the constraint names the new reason |
| 03:01:10 | OpenShell | The person's workspace has no sandbox |
| 03:01:41 | The person signs in again | A new Computer, Ready in 6 s; Hub tools 52, Lore list exit 0 with a new Lore client, OpenCode 200 |

### Why the Console tool came out

Hub refuses every admin route to a registered server acting for its caller
(`http/action_audit.rs`): "A registered server acting for its caller never reaches an
administrative route". Both 403s above are that rule. A tool that can never succeed only
misleads, so `acc4ba2` reverts it and the policy entries go with it. The administrator
calls the route directly, with their own sign-in on `local`.

## Boundaries

- **Still a manual step.** A change in Entra alone still waits for the next sign-in;
  plan section 11 keeps that item (H8) open.
- **Tokens issued outside a Computer** keep their rights until they expire: a Lore token
  up to the deployment's 300 s lifetime, a forwarded token up to 60 s. A Task keeps its
  call's authority.
- **No user-facing command.** The probe called the route with `curl`, sending the CLI's
  stored access token in a header file. There is no command or tool for it yet.
- **Not exercised live:** `busy` (a Computer mid-replacement) and the `502` path are
  covered by design only. The store's database test covers revocation, an expired family,
  another person's family and the cleared Lore client.
