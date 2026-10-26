# Lore lists each person's repositories through Hub

2026-10-26 (UTC). Coordinator: Opus; coder: Opus; builder: Sonnet. No model calls: the
Computer commands ran through OpenCode's shell endpoint, from a Chrome driven over the
DevTools protocol with a copy of the person's cookies, deleted afterwards.

## Design

Lore offers four authorization modes chosen by configuration. Epic added the token modes
upstream (`de2c674f`, "offline checks from the token only"). Lore keeps authorizing every
request from the token's `resources`, so `auth_url` stays unset and Hub stays off clones and
pushes. Lore's catalog is selected separately: `repository_catalog = "auth_service"` makes
`lore repository list` ask `UrcAuthApi.LookupUserPermissions`, forwarding the caller's token,
only when something lists. Hub answers it from the person's assignments in the active
control plane. Lore reaches Hub at Hub's `http` service route through the gateway. A host
alias names the gateway Service's cluster IP, which the OpenShell chart now declares
(`service.clusterIP`), so the address is part of the installation and not assigned at
random.

A Computer's Lore token no longer repeats each repository as a `lore-repo-{id}` scope.
Nothing read those scopes: not Lore, not the gateway's provider refresh, not the supervisor,
not Hub. Each owner assignment drops from 162 to 104 base64url characters, so about 130 to
135 fit Lore's 16 KiB HTTP/2 header list instead of 85 to 88 (computed, not run).

## Source (all on `main`)

| Repository | Commit |
|---|---|
| veoveo-hub | `2739757`: `LookupUserPermissions` on Hub's listener; the Computer token without scopes |
| VeoveoAI/OpenShell | `534250aa0`: the chart's optional `service.clusterIP` (chart only; images unchanged) |
| veoveo-template-installation | `ce9e4bc`, lock `ef34da2` |
| BiomaAI/veoveo-installation | `3bcc74b`, lock `ec0ebee` |

Gates:
- Hub: 346 passed on macOS and on the box.
- Chart: lint, template and 346 + 7 unit tests.
- Installer: 95 + 8 on both installations.

## Deploy

- **Hub image:** `veoveo/hub@sha256:9759bc39…`.
- **`plan`:** found exactly three things:
  - the OpenShell release's `service.clusterIP`;
  - Lore's settings, Deployment and network policy;
  - Hub's image.
- **`apply --step hub`:** 15.8 s.
- **Full `apply`:** 21.0 s.
  - The Helm upgrade took 4.3 s. The gateway kept `10.43.227.28` and its pod (same UID, 0
    restarts), and every sandbox outside `vv-control` kept its pod.
  - The Lore rollout took 12.0 s.
- **`apply` again:** 18 of 18 steps match.
- **From the Lore pod:** the route name resolves to `10.43.227.28`, and TLS 1.3 to `:8080`
  verifies against the mounted gateway CA.
- **Hub's log since:** 0 ERROR, 0 WARN.

## Proof

In the person's Computer:
- `lore repository list "$VEOVEO_LORE_REMOTE"` printed `qual-b9`, `g1-server` and `time` in
  0.19 s. Before the change it printed nothing.
- A clone of `time` with the new token took 0.21 s.

## Notes

- **Helm on the box:** a login shell puts `~/.local/bin/helm` v4.3.0 ahead of
  `/usr/local/bin/helm` v3.22.1. Under it the installer's `helm list --all` fails, so `plan`
  and `apply` run in a plain shell.
- **The lock:** core's format names only `veoveo-*` components, so the chart's OpenShell
  revision is recorded in `openshell.values.yaml`'s header and the K3s README.
