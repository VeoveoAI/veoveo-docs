# Owners delete groups

2026-10-30 (UTC). Coordinator: Opus, which wrote the change, ran the checks, deployed and
probed. No model calls.

## Why

Nothing could delete a group: an owner never lowers or removes themselves, so every group
kept an owner, and the probe groups of 10-29 stayed. And a role, rule or Work Context
membership could reach a Lore group only by naming in the installation an ID that exists
once someone creates the group. PLAN section 9.

## Change

| Repository | Commit | What |
|---|---|---|
| Hub | `6902627` | `DELETE /lore/{profile}/groups/{name}`: an owner of the group deletes it with every assignment naming it and is answered the caller's groups; 409 `group-owns-repository` while the group is a repository's one owner. The design: the installation names only people and its identity provider's groups; a person's role, never a Lore group, decides billed and other risky tools |
| Console | `8f94e5a` | `delete_group(group)` over that route, answering `Groups` |
| Template installation | `0a34b1c` | Console's sandbox policy allows `DELETE /lore/*/groups/*` |
| Installation | Bioma `7f36ac2`, `6845224` | Hub and console images; console's policy as the template's |

A grant outside Lore naming a deleted group's ID holds nothing from the next request, since
no group is given that ID again. Nothing removes such a grant: Artifact keeps listing it
until someone revokes it.

## Checks

| Source | Mac | Linux |
|---|---|---|
| Hub `6902627` | exit 0, 248 s, 361 passed, 2 skipped | exit 0, 112 s, 361 passed, 2 skipped |
| Console `8f94e5a` | exit 0, 127 s, 28 passed | exit 0, 28 s, 28 passed |

New: Hub's unit test that an owner deletes a group with its assignments, refused to a member,
to another tenant, for an unknown name and while the group is a repository's one owner; Hub's
hosted test of the route's answers and refusals; console's test of the tool's method, path,
answer and refusal.

## Images and deploy

| Image | Digest | Build | Smoke |
|---|---|---|---|
| `hub` | `sha256:f11fc728…` | 59 s | buildkit v0.34.1, uid 10001, no Lore binary, `validate` ok |
| `console` | `sha256:b2462c97…` | 16 s | `--help`, uid 10001, revision label `8f94e5a` |

`apply hub platform-servers` at 03:06: Hub's sandbox in 26.0 s, console's in 24.1 s. Before
the build, old images, unused build cache and stale OpenShell trees were cleared from the box,
from 80% to 51% of its disk.

**Unplanned fix.** The first probe, at 03:07, had every `delete_group` answered 403 "DELETE
/lore/computer/groups/probe-del-0307 not permitted by policy": console's sandbox policy
allows each Hub route by method and path, and lacked this one. The plan had named Hub and
console only. With the rule in both installations, `apply platform-servers` replaced
console's sandbox in 12.1 s at 03:08, and the plan then matched 18 of 18. The Hub's
warnings after each apply were console's discovery while its sandbox was replaced, 03:06:17
to 03:06:37 and again at 03:08:55; none from 03:09:00 to the end of the cleanup.

## Deployed probe

A is rozgo@bioma.ai and M is alex.rozgo@vrx.group, each through `veoveo-hub-sdk-cli` in
their own Computer, at 03:09 UTC.

| Step | Who | Result | ms |
|---|---|---|---|
| Create `probe-del-0309`; add A as `member` | M | ID `57aae115…`; M owner, A member | 709, 675 |
| Create a repository; share it with the group as `owner`; remove M's own assignment | M | `0a574511…`; the group its one owner | 797, 661, 684 |
| Delete the group | A, a member | 403 "Only an owner changes the group" | 629 |
| Delete the group | M | 409 "The group is a repository's one owner" | 589 |
| Upload a 26-byte artifact; grant the group `admin`; make A an owner of the group | M | `01a18ac8…` available; granted | 394–672 |
| Read the artifact's grants | A | served, through the group | 420 |
| Make M an owner of the repository again | M | M and the group own it | 772 |
| Delete the group | A, an owner | 200, A's remaining groups, without it | 722 |
| Read the artifact's grants | A | refused: "the caller needs admin access to the artifact" | 487 |
| Read the artifact's grants | M | the grant to the deleted ID still listed | 451 |
| The repository's access | M | M alone | 560 |
| Delete the group again | A | 404 "Unknown group" | 563 |

Cleanup: M revoked the dangling grant and granted the artifact `admin` to `g2-team`, which A
owns, and A deleted it; the first run's artifact went the same way, since M's role selects
no `destructive` tool. A deleted the first run's `probe-del-0307` and the probe groups of
10-29, `probe-share-2244` and `probe-onward-2244`. M deleted both probe repositories with
Lore, and the Hub then answered 404 for them.

## Boundaries

- **Lore tokens:** the repository's assignment went at once; a Lore token issued before the
  deletion keeps its rights until it expires. Not measured.
- **The Computer handbook** names `console__create_group` and `console__set_group_member`, not
  `delete_group`; changing it changes the Computer version. Agents find the tool in their tool
  list.
- **Grants elsewhere** were proven for Artifact only, the one server that grants to groups.
- **The discovery failures** of PLAN section 8 did not recur: from 03:09:00, a group
  creation, two membership changes, three repository access changes and four group
  deletions, with no Hub warning.
