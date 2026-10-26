# A second person: C2, A3, listing and clone isolation

2026-10-26 (UTC). Coordinator: Opus, alone. No model calls.

## People

Both Entra accounts are the same human's, in tenant `e0ee3c6a…`, and Hub sees two
principals:

| | Account | Entra object | Hub roles |
|---|---|---|---|
| First person | `rozgo@bioma.ai` | `624e4793…` | administrator, operator |
| Second person | `alex.rozgo@vrx.group` | `c7a5b0f8…` | administrator, operator; none during A3 |

## Method

- **The second person's Hub grant:**
  - `veoveo-hub-sdk-cli login --no-browser` (client `veoveo-hub-sdk-cli`), its sign-in
    address opened in the person's own Chrome profile for that account
    (`open -na "Google Chrome" --args --profile-directory=…`).
  - Each token's `sub` was checked to be `c7a5b0f8…` before use.
- **Their Computer:** created by opening `https://veoveo.bioma.ai/computer` in the same
  profile.
- **Commands in a Computer:**
  - Run from the box with `openshell sandbox exec`, as the sandbox user, with the Computer's
    own Lore credential.
  - `exec` does not apply the image's `ENV PATH`, so Lore is called as
    `/opt/veoveo/lore/usr/local/bin/lore`.
  - Clones went to `/tmp`, and were deleted; nothing was written to the home.
- **Abandoned first attempt:** a DevTools-driven Chrome with a copy of that profile's cookies
  reached Entra's sign-in form without a session. It was closed, and the copy was deleted.

## Results

| Check | Call | Result |
|---|---|---|
| Baseline | Second person, administrator: `GET /admin/local/control-plane` | 200 in 0.30 s, revision `gcp-01a175e5…` |
| C2 | Second person: `console__create_repository {name: "qual-b9", id: "5eda8d90…"}`, the first person's repository | 409 in 577 ms: "Another person created this repository: Lore records another creator for a repository of this ID". Revision unchanged; `qual-b9` still assigned only to the first person |
| Own repository | Second person: `console__create_repository {name: "p2-isolation"}` | 736 ms, `b5b2d9e7…` |
| Computer | Second person opens `/computer` | Ready within 11 s of opening, sign-in redirect included; workspace `cdjdlsct62djm3cnhv5` |
| Listing | Second person's Computer: `lore repository list "$VEOVEO_LORE_REMOTE"` | 296 ms: only `p2-isolation` |
| Own clone | Second person's Computer: clone `b5b2d9e7…` | exit 0 in 53 ms, an empty repository |
| Cross-person clone | Second person's Computer: clone `5eda8d90…` (`qual-b9`) | exit 29 after 1573 ms; no directory |
| First person's listing | First person's Computer: `lore repository list` | 46 ms: `g1-server`, `time`, `qual-b9`; not `p2-isolation` |
| A3 | Operator and administrator removed in Entra at 05:40:57, basic access kept; a fresh sign-in; `GET /admin/local/control-plane` | Token without a `roles` claim; 403 in 0.26 s |

**The cross-person clone.** Lore logged six `response failed` lines with classification
`Code: 7` (`PERMISSION_DENIED`) and 0 ms latency, from 05:40:20.125 to 05:40:21.661. The
client retried, then reported an HTTP/2 cancel and "Repository not found". So the refusal
is Lore's own authorization from the token; only the client's wording is misleading.

**First person's listing.** Of the first person's four assignments, the one to
`1f6898b9…` carries no actions and is not listed.

## Roles survive a refresh

Removing a role in Entra reaches a Hub session only at its next sign-in.

- The second person's administrator access token, issued before the removal, still
  answered 200 until its 15 minute expiry.
- About a minute after the removal, a refresh of that session answered 200 in 0.36 s. The
  new access token still carried `administrator` and `operator`, and the admin route
  answered 200.
- The session's refresh lifetime was another 604,554 s, about seven days.
- Revoking the session at Hub's revocation endpoint ended it at once: its access token
  then answered 401.

Hub's sign-in asks Entra for `openid profile` only, without `offline_access`. So Hub
holds no Entra refresh token, and a refresh cannot ask Entra again (an inference from the
scope and the result). Before the seven days pass, logout or revocation is what ends an
administrator's session.

## Cleanup

- **Entra:** the second person's operator and administrator assignments were restored at
  05:42:05, and the listing confirmed all three assignments again.
- **Sessions:** both test sessions were revoked (CLI logout, and RFC 7009 for the
  refreshed one), and their grant files were deleted.
- **Left in place:** the second person's Computer, which idle collection stops, and the
  repository `p2-isolation`.
- **Azure CLI:** `az` installed its `account` extension when tenants were listed.

## Boundaries

- A3 was shown on the admin route only, the route A2 proves. A member's Computer was not
  exercised.
- The listing and clone isolation were shown with one repository per person.
- The Computers were driven with `openshell sandbox exec` from the box, not through
  OpenCode.
