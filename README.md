# veoveo-docs

Documents that span the repositories of the `VeoveoAI` organization. Each component
repository keeps the design of its own code; this repository keeps what no single
component owns.

| Document | Contents |
|---|---|
| [Repository Split Plan](REPOSITORY_SPLIT_PLAN.md) | The repository catalog, the contracts between repositories, server registration and authorization, component environments, and the decisions and tasks with their status |
| [Infrastructure Candidate](INFRASTRUCTURE_CANDIDATE.md) | Lore-managed environment definitions without fixed stages, service overrides, native OpenShell execution, identity delegation, CUDA and provider custody |
| [Lore And OpenShell Integration](LORE_OPENSHELL_INTEGRATION.md) | Native Rust interfaces and component flow, OpenShell Docker-driver factory/service execution and MCP enforcement, Lore hooks, identity and credential boundaries, HTTP/2 and optional QUIC integration, extension/fork policy and qualification order |

## License

Apache-2.0. See [LICENSE](LICENSE).
