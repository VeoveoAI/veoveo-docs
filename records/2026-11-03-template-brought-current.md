# 2026-11-03: The installation template brought to the components Bioma runs

A review of whether a new customer could install from `veoveo-template-installation` found
its configuration current but its component lock stale: the lock's last component change was
Hub `2739757` on 2026-10-25, before skills and the removal of Work Context. Bioma's lock had
moved with each deploy; those changes were not brought back to the template, while the
configuration changes were. An installation built from the template would have run a Hub that
mentions Work Context in 96 source files and knows no skills, under an installer (core
`05b6c47`) and policies written for the new stack. That combination was never run; how it
would fail is not measured.

## Changed

| Repository | Commit | Change |
|---|---|---|
| veoveo-template-installation | `a3365e3` | Lock: Hub `349fffa`, SDK `a9abfd2`, console `4c8a185`, Artifact `1bebe8c`, Media `a7cba4e`, Embedding `488594e`, Time `565502c`, n8n server `ff4c37f` (runtime-embedding `9850c04` unchanged). Gateway and supervisor source OpenShell `8bd8335` (was `c80bda2`/`49761d1`), the installer's OpenShell crates `8bd8335` (was `ab37a69`), installer pulldown-cmark 0.13.6 |
| veoveo-template-installation | `7ab6b66` | The design no longer names a Work Context among the seed's names |
| veoveo-template-mcp-rust | `131f16b` | SDK `a9abfd2` (was `aff0022`; the SDK changes since are additive: optional collection filters, `get_task`/`cancel_task`) |
| Bioma installation | `19471b5`, `946f252` | The same design sentence; installer pulldown-cmark 0.13.6 |

The template's lock now names the same revisions as Bioma's (`f31422d`), which are each
repository's main. The template lock still names no images, by design: each installation builds
and records its own. The OpenShell Helm chart is identical at `ebd6a1c`, `c80bda2` and
`8bd8335`.

## Checks (macOS Docker, 2026-11-03)

- Installer, `docker build -f installer/Dockerfile --target check .`: the first run failed at
  `cargo deny` on RUSTSEC-2026-0433 (pulldown-cmark 0.13.5, the advisory Hub took 0.13.6 for in
  the sweep); after the bump, fmt, clippy and deny pass and 101 tests pass (93 + 8), 40 s. Bioma's
  installer has the same manifest and lock and was not checked separately.
- Rust server template, `docker build --target check .`: sqlx metadata check, fmt, clippy, deny,
  `cargo hack` per feature and nextest 18 of 18, 96 s.
- Run on the Mac because the tunnel to the K3s box did not answer.

## Not proven

No installation has been made from the template from empty (checklist F6). These checks show
the template's installer and server template build and test on the new revisions, not that a
new customer reaches a working platform.
