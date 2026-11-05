# USD viewer: Lore's access rules on the file path

2026-11-04. Coordinator: Claude Code (Opus 5.5). The owner required that Lore's access rules decide
every read. This records what enforces them on the path in
[plan section 18](../PLAN.md#18-usd-a-viewer-and-agent-tools-from-bevy_openusd). No product code
changed and nothing was deployed.

Read from `VeoveoAI/lore` at `c33e017a`, `lore-server/src`.

## The HTTP content route enforces repository access

`http/repositories/repository/contents/content/get_repository_content.rs` has no permission check of
its own, unlike the put and presign handlers, which call `http_permits`. It first looked unenforced,
and was reported that way in the session while being checked. It is enforced one layer up:

- `auth/jwt_axum_middleware.rs:51` calls `granted_access` for the path's repository, and answers 403
  unless it succeeds. No token answers 401.
- `authnz/repository_authorizer.rs:218`: `granted_access` succeeds only for reachable grants, or when
  `check_repository_access` passes for `Action::Read`. Every partition-scoped entry point makes this
  call: gRPC, QUIC and HTTP.
- The handler reads with `RepositoryContext::new_server_context` for that same repository.

The handler's test file has a good-token case and no case of a valid token for another repository.

## What else was found

- Lore's `http/security_headers.rs` says stored bytes are attacker-controlled and that serving them
  with a caller-chosen `Content-Type` is a stored-XSS vector. The presigned route applies those
  headers. The authenticated content route takes `content_type` from its query and does not. The plan's
  Hub route therefore fixes the type itself.
- `http/server.rs` has no TLS. `kubernetes/lore.toml` gives only `[server.grpc.certificate]`. A token
  sent to port 41339 would cross the cluster in the clear, so the plan adds TLS in the Lore fork.
- `kubernetes/lore.yaml`'s NetworkPolicy admits only port 41337, from sandbox supervisors.
- The SDK's `hub_bearer` is exchanged for the caller and "the Hub admits it as the caller and decides
  each route for the caller". `ServerCalls::for_task` gives a `HubClient` bound to a Task. Console
  uses `.calls_hub()` today; no Task has used it for this route.
- `veoveo-hub-sdk/crates/veoveo-hub-sdk/src/apps/DESIGN.md`: "A view reads its own server's resources
  … and no other server's". A Hub route on an App's origin that read Lore directly would have added
  to what a view may reach, so the plan sends the viewer through its own server.

## Not measured

Nothing here ran with a real token. Live, only the no-token case is measured: 401, in the
[Lore files record](2026-11-04-usd-lore-files.md).
