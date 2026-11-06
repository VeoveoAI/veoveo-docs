# Galleries at scale, with USDCraft-10K as the test case

Date 2026-11-05 (UTC 11-06 04:45). Measured in the owner's Chrome and from the box. No model calls. The aim is the platform's galleries, thumbnails and loading, with this dataset as the load. Nothing here is specific to it.

## The dataset

`nvidia/USDCraft-10K`, Apache-2.0, at Hugging Face revision `92f4e908415d`: 369 objects in 76 categories, 800 files, 1,056,536,763 bytes. It is uploaded progressively towards about 10,000 objects. It is in the Lore repository `usdcraft-10k` (`58f1fd243f1c`, revision `54ee0fd60012`), owned by `rozgo@bioma.ai`, and in no git repository. `~/k3s-builds/usdcraft/import.sh` on the box rebuilds it, with `computer.sh` beside it, and the working copy is at `~/usdcraft/w` in that person's Computer. The download took 102 s and the push under 1 s.

## Deployed

hub-ui `3000d65`, thumb `a0e83b4`, lore-api `dba33c6`, usd `2270c15`, artifact `831f8d7` (image `sha256:55df9dda9ac9`), hub `7c70e78` (image `sha256:737024748c74`), Bioma `3363c67`, template `55b9b96`. Plan: 18 of 18.

- The Hub's `GET /lore/{profile}/repositories/{id}/tree/{branch}` answers a whole tip by one read, and factory servers may call it.
- lore-api holds an index per revision, from which it answers covers, objects, pages and searches. `browse` answers a page with the pictures that are ready.
- lore-api keeps small pictures on disk and, while anyone browses a repository, draws what a gallery will ask for, as that person.
- USD finds scenes at any depth, and pages them with their pictures. Four draws run at once. A picture stands for a new tip while everything its stage read is unchanged.
- Artifact answers a kept picture from its own decision on the read, with no call to another server.
- The gallery appends a next page as the end comes near, shows each cover picture as it comes, and shows a record's fields as they are.

## Timings

From navigation to the last answer, in Chrome, with pictures already drawn. These are the owner's own profile unless noted.

| Page | Earlier today | Now |
|---|---|---|
| Lore, repositories | 110 requests, about 25 s, then 8 to 10 requests, about 14 s | 3 requests, 1.6 s |
| Lore, repositories, a second signed-in profile | | 2 requests, 1.5 s |
| Lore, `rigid/kitchen_dining`, 60 cards and all their pictures | | 1 request, 1.2 s, 4.48 MB |
| The same folder's next 16 cards, by scrolling | | 1 request, 632 ms, 1.13 MB |
| Lore, a search for `microwave` at any depth | | 1 request, about 2 s |
| Artifact, library | 3 requests, 5.5 s, then 7 on a first draw | 3 requests, 1.6 s, its 10 pictures in 475 ms |
| USD, scenes | 37 requests, about 29 s, without this dataset | 3 requests, first answer at 1.9 s; the last, one scene with no picture, at 4.4 s |

The first read of a repository's tree after a restart cost about 1.7 s more than a warm `browse`, measured once by the command line on 800 files, with about 2 s of the client's own overhead in both. A first `browse` of the dataset through the gallery took about 20 s, measured once. The cause of that was not found, and it did not recur.

## A first look

A draw took 5 to 14 s by the command line, with about 2 s of that the client's. Drawing ahead reached 21 more cover pictures in 62 s at four at once, so about 15 minutes for 369 objects, or about 7 hours for 10,000 if the rate holds. It finished here with nobody asking for a picture but the page keeping it company. Four at once barely beat two, with the GPU reading 0% when sampled, so the limit appears to be reading each object's files through the public path. That is an inference, not a profile.

## Bugs this found

All general. Each was fixed and deployed except as noted.

- **The renderer and the viewer panicked on anything under 20 cm.** Shadows kept Bevy's minimum distance of 0.1 with a first bound of half the span. It now scales with the span. Confirmed by drawing the two objects that failed.
- **A failed draw was remembered wrongly, twice.** A dropped connection marked a stage as not drawable for an hour, and lore-api would have remembered any empty answer for good. Reads that get no answer are now sent again, only a stage that cannot be composed or rendered is marked, and lore-api does not remember a stage's empty answer.
- **The time slider paused playback** from the first fractional frame, because its rounding read as a seek. Introduced by `9491e17`, from the same work. Playback was confirmed on the hummingbird, at about 10 fps while playing against 120 still.
- **The sandbox proxy drops a path that holds `%2F`**, the connection ending with an unexpected EOF, and Hugging Face now redirects nested files to one. The import uses the same address with plain slashes. The proxy is unchanged, and it may catch other downloads.

## Probes

- The other owner's Computer lists 17 repositories, not `usdcraft-10k`, and reading it directly answers 403 from the Hub. The third Chrome profile showed that person's list.
- Lore's App is refused `delete_artifact`, `grant_artifact` and another server's tool and resource, from `2026-11-05-gallery-speed.md`, on the same Hub revision's call path.

## Checks

Tests were run for what changed, by judgement and at the owner's direction, not the full check on both machines. Unit tests cover the index, kept pictures, the scene finder, picture reuse, and the Hub's tree route. Lore and Artifact passed clippy. Not run: the full suites at these revisions, and the installer checks since `2026-11-05-gallery-speed.md`. The picture reuse across tips has only its unit test: no second revision of the dataset has been pushed.

## What this does not prove

- 10,000 objects. This is 369, and the rest is arithmetic.
- A page's speed depends on the pictures being kept. A person's first look at an undrawn repository still fills in as drawing goes.
- The rule that a folder with one stage is one object holds across 31 repositories' top levels, with `veoveo-mcp-time` unread by the check. A code folder with one stage deep inside would show as an object, with **Files** the way in.
- Some objects draw dark against the card, such as `R044_manual_can_opener`. Lighting was not changed.
- The server-to-Hub path is unchanged: a median of 711 ms on a reused connection by the public name against 1 ms in the cluster, from the box. A first look and each `browse`'s check still pay for it.
- A page still needs its requests on each load, since a browser cannot keep a picture that arrives as text.
