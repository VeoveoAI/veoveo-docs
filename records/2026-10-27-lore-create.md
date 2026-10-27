# `lore repository create` makes its creator the owner

2026-10-27 (UTC). Coordinator: Opus, which wrote the code; builder: Sonnet, which ran
the Linux checks and built the images. No model calls.

## Why

`lore repository create` in a Computer succeeded, but left a repository nobody could
reach. In the owner's Computer on 2026-10-27 at about 04:00, `ux-native-create`
(`01a17b66…`) was created. It was absent from the creator's own listing, and the
creator's clone answered "Repository not found". The Computer handbook told agents not
to use the command.

Lore had the call that fixes this. When `[environment.endpoint] auth_url` is set, Lore's
repository create calls `ucs.auth.RebacApi.CreateResource(urc-<id>, name)` on that auth
service with the caller's token, before storing anything, and fails if the call is
refused. Delete calls `DeleteResource`, and the service's answer decides the deletion.

This installation authorizes from token claims (`resource_claim`), and Lore refuses
`auth_url` with that, so these calls never ran. Its listing already asked Hub, through
the `auth_service` catalog at `repository_catalog_url`.

## What changed

| Repository | Commit | Change |
|---|---|---|
| VeoveoAI/lore | `4ee9f338` | Without `auth_url`, create and delete call `RebacApi` at the `auth_service` catalog's endpoint, the issuer the listing already asks. `RepositoryCatalog::auth_service_url` and `resource_service_url` give the public, v1 and forwarded repository services that endpoint, so their create and delete handlers are unchanged. 9 files, +91/−18, with a unit test. |
| veoveo-hub | `078f210`, `623427d` | Hub answers `CreateResource` and `DeleteResource` on its own listener, beside `LookupUserPermissions`, with the same token check. Creation publishes the revision the creation route publishes: the repository is registered and the creator is its owner. Deletion by an owner, own or through a group, removes the registration and every assignment on it; anyone else gets `PERMISSION_DENIED`. The creation route answers 201 when it found the repository unregistered. A Lore refusal now maps to 409 `repository-registered`. |
| veoveo-template-installation | `bb6a114` | The handbook offers `lore repository create` beside `console__create_repository`. The design, Lore's settings comment and the Computer README name where creation and deletion go. Lore's settings are otherwise unchanged. |
| BiomaAI/veoveo-installation | `bed576e` | The same changes. The lock pins Lore `sha256:2d522822…` and Hub `sha256:8f524262…`. `computer-v1` carries a release note, because the Lore image is part of the Computer version. |

## Checks

| Check | Result |
|---|---|
| Lore, Mac | `cargo test -p lore-server --test unit -- authnz::repository_catalog`: 18 passed |
| Lore, box | `cargo clippy --locked -p lore-server --all-targets -- -D warnings` clean, 120 s. `cargo test --locked -p lore-server`: 1428 passed, 167 s |
| Hub, box, `078f210` | `docker build --target check`: 353 of 354 passed. The failure was in this change's own test: the fake Lore sent `urc-<id>` while that test's deployment used the template `{id}`. |
| Hub, box, `623427d` | The test now configures the installation's `urc-{id}`: 354 passed, 2 skipped, 114 s |

New Hub tests:
- a hosted `RebacApi` test: creation registers and lists the repository, and repeating it changes nothing; refusals are `PERMISSION_DENIED`, `UNAUTHENTICATED` and `INVALID_ARGUMENT`; deletion is refused to a non-owner and to an `admin` holder, an owner's deletion removes everything, and repeating it changes nothing;
- a unit test of the section's deletion;
- the creation-route test, whose fake Lore now tells Hub of each creation as Lore does.

## Deploy

- `plan`, run from the box's installation clone at the branch, showed exactly these
  changes:
  - Lore's settings comment and image;
  - the `computer-v1` and `factory-v1` templates (Lore image and release note);
  - Hub's image and Lore mount;
  - the handbook in Hub's control plane.
- People's grants, memberships, repositories and assignments carried over.
- `apply`:
  - 6 changes;
  - Lore rolled out in 9.0 s;
  - Hub's sandbox was recreated and ready in 22.2 s;
  - control-plane revision `gcp-01a17b9a…` became active.
- The next `plan`: 18 of 18 steps match.
- The early adopters kept their access: 6 grants, 5 Work Context contributors and 4
  `early-adopters` members.

## Qualification

Both of the user's accounts, as in the [sharing record](2026-10-26-sharing.md):
`rozgo@bioma.ai` (the owner) and `alex.rozgo@vrx.group` (the other person). Lore ran
inside each person's Computer through `openshell sandbox exec`; console tools ran
through the Hub CLI.

| Check | Result |
|---|---|
| Create with Lore | The owner's `lore repository create "$R/lc-native"` answered in 523 ms (`01a17b9a…`). It was listed at once (122 ms), the first push took 116 ms, and a fresh clone (80 ms) held the line. Hub logged the `CreateResource` call. |
| Hub's record | `console__repository_access`: the owner, `owner`, by email |
| The route | `console__create_repository {name: "lc-route"}` answered in 926 ms; Hub logged its `CreateResource` call |
| A member deletes | Shared with the other person as `member`; their `lore repository delete` was refused (rc 17, 248 ms). Hub logged "refused a Lore repository deletion: Only an owner deletes the repository" (`PERMISSION_DENIED`, 21 ms). Still listed. |
| The owner deletes | `lore repository delete` succeeded in 206 ms; absent from the listing; `console__repository_access` answered 404 "No Lore repository of this ID is registered in your tenant" |
| The other person creates | `lc-native-p2` (`01a17b9b…`): created in 328 ms, listed, pushed in 114 ms, cloned in 70 ms; Hub records them as `owner` |
| The orphan | `console__create_repository {name: "ux-native-create", id}` registered the repository the creator had made before the change; `lore repository delete` then removed it |
| New Computer version | `console__computer` offers `5b397a7e0ab0` with the release note. The other person's Computer restarted onto it and was ready within about 17 s. There, Lore created, pushed and deleted `lc-newversion`. |

## Boundaries

- Two accounts of one tenant. The owner's Computer was left on `e4c07f404dc8` and
  offered the update; only the other person's Computer was restarted.
- A factory instance of a repository deleted while it is served was not exercised.
  Deletion removes the registration and assignments; what a running instance does then
  is not recorded.
- The forwarded (server-to-server) create path gets the same endpoint but is not
  deployed here and was not exercised.
- Creation through Lore and through the route make the same record. The route's own
  publication still registers a repository Lore created before this change, as the
  orphan showed.

## Left in place

- The other person's `lc-native-p2`, and the owner's `lc-route`.
- `lc-native`, `lc-newversion` and `ux-native-create` were deleted.
