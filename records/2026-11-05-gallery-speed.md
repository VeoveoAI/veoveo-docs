# Gallery speed: fewer requests, and where the time goes

Date 2026-11-05 (UTC 11-06 02:30). Measured in the owner's Chrome and from the box. No model calls.

## Deployed

hub-ui `faecdf9`, thumb `a0e83b4`, lore-api `5aabdac`, usd `b9dc1e5`, artifact `9561c04` (image `sha256:84c49f923be7…`),
hub `2e01394` (image `sha256:f9e6da4002f8…`), Bioma `329f5e2`, template `34c95d4`. Plan: 18 of 18.

- The bridge reads no catalog to admit a request. The Hub's call path checks the App's link from discovery's list of that one server.
- `covers` in lore-api decides what shows a folder and remembers it by revision. The page no longer searches.
- `ready_thumbnails` in Thumb, with `thumbnails` in lore-api and Artifact, answers what is kept by one request and never draws.
- The closer look shows a record as it is, under its own field names, and a card shows its size.

## Checks

At the owner's direction the deploy did not wait for every check.

| Repository | Ran | Did not run |
|---|---|---|
| hub-ui, thumb | Mac and Linux, full | |
| hub | Mac, full, 526 tests | Linux |
| lore-api | Mac `cargo check`; an earlier full Mac run stopped at formatting | Tests at the final commit |
| artifact | Local type-check before its final pin of the gallery | Tests |
| usd | | Tests; only its adapter and the gallery's pin changed |
| Bioma, template | | Installer checks; the deployed plan matches |

## Deployed probes

From the page, by the bridge, as the owner. The nil UUID means a failed check could delete nothing.

| Request | Answer |
|---|---|
| Lore's App calls `list_files` | Answered |
| Lore's App calls `no_such_tool` | `-32602`, not linked to the App |
| Artifact's App calls `delete_artifact` on the nil UUID | `-32602`, not linked to the App |
| Artifact's App calls `grant_artifact` on the nil UUID | `-32602`, not linked to the App |
| Lore's App calls `thumb__thumbnail` | `-32600`, not available |
| Lore's App reads `artifact://artifacts` | `-32602`, another server's |

Artifact's closer look showed the record's fields, and its cards their sizes.

## Timings

Browser to Hub, each a median over 10 to 15 sequential requests:

| Request | Before | After |
|---|---|---|
| `GET /livez` | 158 ms | not repeated |
| `ping` | 174 ms | 157 ms |
| A refused tool | 211 ms | 173 ms |

So the catalog check cost about 15 to 50 ms. An earlier statement of about 180 ms counted the trip to the Hub, and is wrong.

One page load, from navigation to the last answer:

| App | Before | After |
|---|---|---|
| Lore, repositories | 110 requests, about 25 s | 8 to 10 requests, about 14 s |
| Artifact, kept pictures | one request per card | 3 requests, 5.5 s |
| USD, scenes | not measured | 37 requests, about 29 s |

"Before" for Lore is from a clean foreground load earlier the same day. An earlier figure of 230 requests included other activity, and is wrong.

One Lore load after the change, in ms from navigation as start and duration: the App 553 and 251, `list_files` 828 and 1,164, `covers` 2,038 and 3,233, `thumbnails` 5,306 and 8,027.

One server request to the Hub from the box, 12 of each, for `/jwks.json`:

| Path | Min | Median | Max |
|---|---|---|---|
| The public name, through Cloudflare | 177 ms | 499 ms | 1,199 ms |
| The gateway's service route, in the cluster | 9 ms | 13 ms | 16 ms |

## What this proves, and does not

Measured: the request counts, the timings above, and the refusals.

Inference: the remaining seconds are mostly server-to-Hub requests by the public name. The in-cluster figure was taken from the box, not through a sandbox's proxy, and the page has not been timed on that path.

Not done: USD has no batch and still lists one repository at a time. A browser cannot keep a picture between loads, since each arrives as text in a JSON answer.

## Corrections

`2026-11-05-galleries-deployed.md` says the SDK's CLI costs about 600 ms of every time there. That was never measured. Its timings stand as measured totals, without that split.

Two pairs of artifacts have identical bytes: `IMG_4821.png` (`dbec2fe4…`) and `chameleon.png` (`27b08f76…`). `~/k3s-builds/thumbs-20261105/remove-dupes.sh` on the box deletes one of each for the owner to run. The two `hummingbird-t120.png` differ.
