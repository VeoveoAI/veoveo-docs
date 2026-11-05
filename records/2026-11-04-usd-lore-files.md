# USD viewer: reading files directly from Lore

2026-11-04. Coordinator: Claude Code (Opus 5.5). The owner rejected a runner with a Lore checkout
on its disk as the way scenes reach the viewer, and asked for files from Lore as a first-class
capability. Evidence for
[plan section 18](../PLAN.md#18-usd-a-viewer-and-agent-tools-from-bevy_openusd). No product code
changed and nothing was deployed.

## What Lore already has

Read from `VeoveoAI/lore` at `c33e017a`.

- `lore-server/src/http/repositories/repository/contents/content/get_repository_content.rs`:
  `GET /v1/repository/{repository}/content/{address}`, behind Lore's JWT check. It streams through a
  channel of at most 16 chunks and sets `Content-Length`. It has no `Range` handling.
- Presigned URLs also exist (`POST .../presign`, `GET /v1/presigned/...`). They need an HMAC key, the
  `presign` permission and a mint per file, and the plan does not use them.
- `[server.http]` defaults to enabled on port 41339, and `max_file_size` limits uploads only.
- `lore-proto/proto/lore/thin_client/v1/thin_client.proto`: `RevisionTree` takes a revision, with
  number 0 meaning a branch's tip, and a path prefix and depth. It lists entries without a checkout.
- `veoveo-hub/crates/veoveo-hub/src/bin/hub/contributions/lore/factory/read.rs` already calls
  `RevisionTree`, and `person.rs` already issues a person's Lore token, admitted against their
  current grant on every issue.

## Measured on the deployed Lore

Through a temporary `kubectl port-forward` of `deploy/lore` to 41339, on the box:

| Request | Answer |
|---|---|
| `GET /health_check`, HTTP | 200 |
| `GET /v1/repository/00/content/00`, no token, HTTP | 401 |
| The same over HTTPS | no answer: the port is plain HTTP |

`Service lore` exposes only 41337, so nothing outside the pod reaches 41339 today.

## Not measured

No real file was read through this route with a real token. The route's streaming comes from reading
its code. A Hub route does not exist yet.

## What the demo scenes need

Nothing in `bevy_openusd`'s tree on `develop` is named for MaterialX or Gaussian splats: no `.mtlx`
file and no file naming a splat or `ParticleField`. Those were not requirements of this plan.
