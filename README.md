# veoveo-docs

Documents that span the repositories of the `VeoveoAI` organization. Each component
repository keeps the design of its own code; this repository keeps what no single
component owns.

| Document | Contents |
|---|---|
| [Platform Visual Guide](diagrams/veoveo-platform.html) | Three interactive views: historical qualified Mac platform, credential path, and current Linux reference plus the planned Computer → Lore → deterministic factory workflow, using the whitepaper palette. Open the HTML locally in a browser. |
| [Repository Split Plan](REPOSITORY_SPLIT_PLAN.md) | The repository catalog, the contracts between repositories, server registration and authorization, component environments, and the decisions and tasks with their status |
| [Infrastructure Candidate](INFRASTRUCTURE_CANDIDATE.md) | Lore-managed environment definitions without fixed stages, service overrides, native OpenShell execution, identity delegation, CUDA and provider custody |
| [Lore And OpenShell Integration](LORE_OPENSHELL_INTEGRATION.md) | Canonical full platform plan: user agents/Computers, Lore and Artifact publication, deterministic factories, configuration ownership and environments; native interfaces, trust boundaries and preserved qualification evidence |
| [OpenShell Hard-Cut Plan](OPENSHELL_HARDCUT_PLAN.md) | Measured Mac/Linux execution status and evidence, active Linux/webhook gates, and pending phased adoption/acceptance for the agent-operated platform |
| [Qualification Checklist](QUALIFICATION_CHECKLIST.md) | Every feature to test on the factory-sandbox installation, for people and agents: how to check it, what proves it and its current status |
| [Direct Lore Credentials For Users And Workloads](LORE_DIRECT_OIDC_PLAN.md) | Native user device login and scoped grants, qualified factory OpenShell renewal/termination, local configuration and separate acceptance evidence |

Update the visual guide in the same change as every major architecture change,
alongside the architecture document and execution checklist. Keep implemented and
planned paths distinct, and reflect acceptance status from the checklist. The
standalone HTML is the canonical diagram; export SVG or PNG from it when needed.
Contributor instructions are in [AGENTS.md](AGENTS.md).

## License

Apache-2.0. See [LICENSE](LICENSE).
