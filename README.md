# veoveo-docs

Documents that span the repositories of the `VeoveoAI` organization. Each component
repository keeps the design of its own code; this repository keeps what no single
component owns.

| Document | Contents |
|---|---|
| [Platform Visual Guide](diagrams/veoveo-platform.html) | Interactive diagrams of the current platform, credential path and next integration, using the whitepaper palette. Open the HTML locally in a browser. |
| [Repository Split Plan](REPOSITORY_SPLIT_PLAN.md) | The repository catalog, the contracts between repositories, server registration and authorization, component environments, and the decisions and tasks with their status |
| [Infrastructure Candidate](INFRASTRUCTURE_CANDIDATE.md) | Lore-managed environment definitions without fixed stages, service overrides, native OpenShell execution, identity delegation, CUDA and provider custody |
| [Lore And OpenShell Integration](LORE_OPENSHELL_INTEGRATION.md) | Native Rust interfaces and component flow, OpenShell Docker-driver factory/service execution and MCP enforcement, Lore hooks, identity and credential boundaries, HTTP/2 and optional QUIC integration, extension/fork policy and qualification order |
| [OpenShell Hard-Cut Plan](OPENSHELL_HARDCUT_PLAN.md) | Inventory, state preservation, removal of the old execution path, minimal replacement and focused acceptance after the cut |
| [Direct Lore Credentials Through OpenShell](LORE_DIRECT_OIDC_PLAN.md) | IdP-issued native Lore grants, OpenShell renewal and termination, exact local configuration, acceptance steps and Desktop adapter retirement |

Update the visual guide in the same change as every major architecture change,
alongside the architecture document and execution checklist. Keep implemented and
planned paths distinct, and reflect acceptance status from the checklist. The
standalone HTML is the canonical diagram; export SVG or PNG from it when needed.
Contributor instructions are in [AGENTS.md](AGENTS.md).

## License

Apache-2.0. See [LICENSE](LICENSE).
