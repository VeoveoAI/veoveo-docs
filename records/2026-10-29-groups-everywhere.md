# A Lore group is a person's group everywhere, and members share their artifacts

2026-10-29 (UTC). Coordinator: Opus. No model calls. Plan section 8.

## Why

- **Two group systems, one empty:** only repository access read Lore's groups. Artifact's
  group grants, role grants, policy rules and Work Context memberships read the identity
  provider's `groups`, and Entra sends none: all 15 sign-in families held `groups: []`.
  A grant to `early-adopters` reached no one.
- **Members could not share:** `artifact.grants.write` declared `sensitive`, which the
  member role does not select, and an override can add a risk but never remove one.
- **Already shared:** all five people are contributors of `reference-work`, so each reads
  and writes every artifact there. A grant adds admin, or reaches people outside the Work
  Context.

## Change

| Repository | Commit | What |
|---|---|---|
| Hub | `3de9654` (parent `ee0bdf3`) | Each request's subject adds the principal's Lore groups of its tenant, by ID, `member` as `write` and `owner` as `admin`, beside the identity provider's, before the Work Context membership is resolved. Sections list memberships through `CatalogSection::group_memberships`, kept by tenant and principal once per revision. Group answers show the `id`. Design in `crates/veoveo-hub/DESIGN.md`, groups and sharing |
| Console | `51dff0d` | `groups`, `create_group` and `set_group_member` return the group's `id` |
| Artifact | `91e62be` | `artifact.grants.write` declares no risk; share links keep `sensitive`. The deploy also carries `ae29dc3`, `8a4d2cb`, `6d78e4f` and `5fb8e1f` (core `120306e`, the revision Hub runs, and SDK `6b965ca`), committed earlier and not deployed until now |
| Installation | Bioma `a5c7731` | Lock and README rows for the three |

The existing contracts carry the groups unchanged: role grants and policy rules in
`policy::decide`, Work Context memberships, the forwarded token's `groups` (which the SDK
requires to equal the embedded actor's), and the invocation claim's `group_roles`, by
which Artifact caps a group grant. A server's call for a caller carries none. No token
the Hub issues to a client carries them.

## Checks

`docker build --target check .` from `git archive` snapshots, on the Mac (ARM64) and the
box (x86_64):

| Source | Mac | Linux |
|---|---|---|
| Hub `3de9654` | exit 0, 218 s, 360 passed, 2 skipped | exit 0, 147 s, 360 passed, 2 skipped |
| Console `51dff0d` | exit 0, 77 s, 28 passed | exit 0, 23 s, 28 passed |
| Artifact `91e62be` | exit 0, 1113 s, 112 passed, 9 skipped | exit 0, 187 s, 112 passed, 9 skipped |

Hub's 360 are the 357 before and three new: a subject's groups with their roles, as
principal and actor alike, none of another tenant or person, a Work Context membership
held through a group and gone with it, none on a server's call; a role granted to a
group's ID; and the Lore section's member as `write` and owner as `admin`. Two Hub
attempts failed before: `cargo fmt` on the new tests, then Clippy's
`unnecessary_to_owned` in the Lore section; both fixed in the same commit before it was
pushed. One Linux run reported exit 0 for a failed build: the runner read `$?` after a
`$(date)` in the same line. It was corrected, and the table holds the rerun.

## Images and deploy

| Image | Digest | Build | Smoke |
|---|---|---|---|
| `hub` | `sha256:485c9fec…` | 58 s | buildkit v0.34.1, uid 10001, no Lore binary, `validate` ok (2 profiles) |
| `console` | `sha256:03ed99ed…` | 16 s | help, uid 10001, revision label `51dff0d…` |
| `artifact` | `sha256:0ca5240a…` | 77 s | help, uid 10001, revision label `91e62be…` |

The plan showed exactly the three sandboxes. `apply hub`: 20.1 s, 22:30:12 to 22:30:33.
`apply platform-servers`: console 21.2 s and Artifact 21.0 s, done at 22:31:16. The plan
then matched 2 of 2. Artifact registered again at 22:31:15, declaring
`artifact.grants.write` with no risk and `artifact.share-links.write` with `sensitive`;
Console resumed its saved registration. Hub's discovery warnings fell within the two
restarts; 9 errors at 22:31:08 were the old Artifact process dropping its open streams.
None from Hub, Console or Artifact from 22:31:20 until the probe.

## Deployed probe

Two people, both the owner's own accounts, through `veoveo-hub-sdk-cli` in each one's
Computer: A, `rozgo@bioma.ai`, installation role `admin`; M, `alex.rozgo@vrx.group`, role
`member`. Both are contributors of `reference-work`. Their Computers had been collected
and started again at 22:34:02 from the owner's browser profiles.

| Time | Who | Call | Result |
|---|---|---|---|
| 22:36 | M | `tools` | `grant_artifact`, `revoke_artifact_grant` and `decide_access_request` listed; no share-link, delete or upload-limit tool |
| 22:44:28 | A | `console__create_group` `probe-share-2244`, add M as member; `probe-onward-2244` | 722, 809, 880 ms; each group answers its `id` |
| 22:44:39 | M | `create_upload`, the signed PUT, `complete_upload` | 18 bytes, PUT 200, `available`, owned by M |
| 22:45:23 | M | `grant_artifact` group `probe-share` `admin` | Served, 403 ms: a member shares |
| 22:45:23 | A | Read the artifact's grants, then `grant_artifact` group `probe-onward` `read` | Served, 458 and 381 ms: admin only through owning the group |
| 22:45:40 | A, M | M made owner, then A made member of `probe-share` | Served |
| 22:45:41 | A | `grant_artifact` `write`; read the grants | Hub admits (role `admin`); Artifact refuses both: "the caller needs admin access to the artifact" |
| 22:45:42 | M | `create_share_link` | Hub refuses: "Your roles don't grant the permission this requires" |
| 22:45:55 | M | A made owner again | Served |
| 22:48:54 | A | `delete_artifact` | Served; M's read then answers "no such artifact" |

## Upstream discovery failed for about three minutes

From 22:45:55, the second the last membership change was published, Hub's new
connections to upstream servers failed: "error sending request for url
(http://….internal:…/mcp), when send discover request". 43 warnings in that minute, for
console, Artifact, Time and people's servers. Console answered again at 22:47:13 and
Artifact by 22:48:54; A's delete failed three times in between.

- **Measured:** the gateway answered every `ForwardTcp` in the window with 200. Artifact's
  supervisor logged no connection from Hub after 22:45:30. Hub's supervisor logged no
  error. The same burst came at 22:37, with no membership change, during the probe's
  first calls, and at the restarts of 07:32, 14:00 and 22:30.
- **Not the publication alone:** 15 revisions published within 5 s at 14:33 caused none.
- **Missing instrumentation:** Hub logs reqwest's outer error without its source, so
  whether the connection was refused, reset or timed out is not known.
- **Inferred, not proven:** a burst of new upstream sessions fails on Hub's side of the
  forward. A membership change now changes its members' subjects, so their next calls
  discover again, which adds to such a burst. Not investigated further here.

## Boundaries

- **Role grants to a group:** proven by the component test only. The installation has no
  route to grant a role but publishing the whole control plane as the operator, which
  the probe did not do, so `billed` through a group was not tried live.
- **Groups left in place:** `probe-share-2244` and `probe-onward-2244`; no route deletes a
  group.
- **Core's `GroupId` description** still says "Identity-provider group identifier", and
  Artifact's published schema repeats it. That text is Core's.
