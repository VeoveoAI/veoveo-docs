# AI security controls against the NIST AI RMF

2026-10-30. Coordinator: Claude Code (Opus 5.5). No model calls and no probes. Plan
[section 11](../PLAN.md#11-ai-security-controls-nist-ai-rmf), approved 2026-10-30;
checklist [section H](../QUALIFICATION_CHECKLIST.md#h-security-controls).

What a Veoveo installation can be configured to enforce for the security of AI agents,
mapped to the NIST AI Risk Management Framework. It judges capabilities, not the
reference installation's development configuration.

Method:
- **Framework:** NIST AI RMF 1.0 (NIST AI 100-1, January 2023): the functions Govern,
  Map, Measure and Manage, and the seven characteristics of trustworthy AI. The
  Generative AI Profile (NIST AI 600-1) is left to the crosswalk in section 11.
- **Sources read:** OpenShell's documentation in the VeoveoAI fork at `main`, Veoveo's
  `DESIGN.md` files, the qualification checklist and the records, listed at the end.
- **Shared:** a Spanish translation as a PDF for the team, kept outside the repository.

## Summary

Veoveo is strongest where AI risk is a cybersecurity problem: agents that hold
credentials, call tools and ship code. Configured for it, an installation covers the
characteristics "secure and resilient", "accountable and transparent" and
"privacy-enhanced" with policies that are enforced and, in part, provable. The
validity, fairness and explainability of the model itself are not built in; a company
can build those services on the platform.

## What an installation can configure

| Function | Capability | Source |
|---|---|---|
| Govern | Egress is denied by default. Each rule names exact hosts, ports and the programs that may use them; each program is pinned by its SHA-256 on first use, and a mismatch is denied. The company's allowlist decides what agents reach | OpenShell network policy |
| Govern | A policy prover (an SMT solver) checks that a sandbox's policy grants nothing beyond a boundary policy the company defines | `openshell-prover` |
| Govern | Gateway interceptors apply an approved policy to every new sandbox, reject provider or policy changes that break company rules, and feed an inventory or audit service | OpenShell gateway interceptors |
| Govern | Permissions carry risks. A server declares each permission with an access kind (`read`, `write`) and risks (`sensitive`, `destructive`, `billed`, `physical`, `administer`). Roles grant by access and risk, overrides add risks to a permission or deny it, and grants go to identity-provider or Lore groups | Hub and SDK authorization |
| Govern | Only approved models: a model credential works only at the endpoint its provider profile binds | OpenShell provider profiles |
| Map | Servers describe themselves: each publishes its contract, its documents and the permission every tool requires. The registrations are an inventory of the company's AI services and tools with their declared risks | SDK registration |
| Measure | Sandbox activity exports as OCSF events (network, HTTP, process, findings, configuration changes) to a SIEM. Hub's and the servers' audit records are OCSF as well, sealed into signed, hash-chained blocks after NIST SP 800-53 AU-3, AU-9(3) and AU-10. The usage ledger follows FOCUS | OpenShell; core audit and usage |
| Measure | `enforcement: audit` logs what an agent would be refused before a rule moves to `enforce` | OpenShell L7 rules |
| Manage | Request rules: REST method and path, GraphQL operations, WebSocket messages, MCP method and tool allow and deny lists | OpenShell L7 rules |
| Manage | Content inspection: middleware redacts, blocks or rewrites what an agent sends and receives, model prompts included. It runs before credentials are injected, so it never sees them, and traffic is blocked when it fails | OpenShell supervisor middleware |
| Manage | Credentials never enter a workload, and a placeholder sent anywhere but its bound endpoint is refused. Private addresses are closed to wildcard rules; loopback, link-local and cloud metadata addresses are always blocked | OpenShell |
| Manage | Network policy changes on a running sandbox; filesystem (Landlock) and process (seccomp) policy are fixed at creation. A network rule an agent proposes goes to operator approval, with an automatic risk check | OpenShell |
| Manage | A branch cannot raise its own authority. Deleting a branch removes its instance. Tokens are revoked and sessions end at logout | Hub; installation |

## What Veoveo adds on top of OpenShell

- Authorization bound to identity on every call, with a fresh token per request
  addressed to one server.
- Delegation that only narrows: a call between servers carries only the permissions
  the server declared and the caller holds.
- One private Computer per person.
- Served branches traced to an immutable Lore revision and its pusher.
- Signed audit and the usage ledger.
- A company builds its own AI-security services, such as evaluation or red-teaming
  servers, by pushing source; they get the same identity, audit and usage.

## Limits configuration cannot remove

1. MCP rules match the method and the tool name, not the tool's arguments.
2. Middleware does not inspect WebSocket binary messages or messages a server sends to
   the agent, compressed, partial or `no-transform` response bodies, or `tls: skip`
   endpoints, and its API is still changing. Whether a model's streamed response
   counts as partial was not checked.
3. Interceptors cover only allowlisted write operations, and registering one restarts
   the gateway.
4. The prover covers only the policy features its model includes.
5. A role removed in Entra reaches a live Hub session only at its next sign-in, because
   Hub holds no Entra refresh token. Logout and revocation end a session at once.
6. Audit records written in a branch's data environment are never sealed and are absent
   from Hub's audit.
7. Hub has no per-action human approval, by design. OpenShell's approval covers
   proposed network rules only.

## Qualification status

| Capability | Status | Evidence |
|---|---|---|
| Credential binding; a placeholder refused away from its endpoint | proven | Checklist B19; [record](2026-10-29-computer-internet-and-search.md) |
| Exact-host binding and REST method and path rules | proven: a POST outside a REST rule's methods and paths answered 403 | [record](2026-10-29-computer-internet-and-search.md) |
| MCP rules | in use for every Computer's Hub endpoint; a refusal by an MCP rule not measured | [installation policy](https://github.com/VeoveoAI/veoveo-template-installation/blob/main/kubernetes/policies/computer-v1.yaml) |
| Audit sealing and export | implemented in core and Hub; not qualified on the deployment | none before checklist H5 and H6 |
| Supervisor middleware, gateway interceptors, policy prover, policy advisor | documented in OpenShell; not used or qualified in a Veoveo installation | none before checklist H1 to H3 |

## Boundaries

- This record reads documentation and design. Every capability above that is not
  marked proven is a documented capability, not a measured one.
- No NIST subcategory is cited; the crosswalk in section 11 maps them with evidence.

## Sources

OpenShell, in the VeoveoAI fork:
- [Security best practices](https://github.com/VeoveoAI/OpenShell/blob/main/docs/security/best-practices.mdx)
- [Network rules](https://github.com/VeoveoAI/OpenShell/blob/main/docs/how-it-works/policies/network-rules.mdx),
  [policy prover](https://github.com/VeoveoAI/OpenShell/blob/main/docs/how-it-works/policies/prover.mdx),
  [policy advisor](https://github.com/VeoveoAI/OpenShell/blob/main/docs/how-it-works/policies/advisor.mdx)
- [Supervisor middleware](https://github.com/VeoveoAI/OpenShell/blob/main/docs/extensibility/supervisor-middleware/index.mdx),
  [gateway interceptors](https://github.com/VeoveoAI/OpenShell/blob/main/docs/extensibility/gateway-interceptors.mdx)
- [OCSF JSON export](https://github.com/VeoveoAI/OpenShell/blob/main/docs/observability/ocsf-json-export.mdx)

Veoveo:
- [Architecture](../ARCHITECTURE.md): identities and trust boundaries
- Hub: [authorization](https://github.com/VeoveoAI/veoveo-hub/blob/main/crates/veoveo-hub/DESIGN.md#authorization),
  [forwarded identity](https://github.com/VeoveoAI/veoveo-hub/blob/main/crates/veoveo-hub/DESIGN.md#forwarded-identity),
  [audit records](https://github.com/VeoveoAI/veoveo-hub/blob/main/crates/veoveo-hub/DESIGN.md#audit-records),
  [data environments](https://github.com/VeoveoAI/veoveo-hub/blob/main/crates/veoveo-hub/DESIGN.md#data-environments)
- SDK: [roles, grants and risks](https://github.com/VeoveoAI/veoveo-hub-sdk/blob/main/crates/veoveo-hub-sdk/DESIGN.md#packaging-and-registration)
- Core: [audit](https://github.com/VeoveoAI/veoveo-core/blob/main/platform/audit/DESIGN.md),
  [audit export](https://github.com/VeoveoAI/veoveo-core/blob/main/platform/audit/src/export/DESIGN.md),
  [usage](https://github.com/VeoveoAI/veoveo-core/blob/main/platform/usage/DESIGN.md)
- Installation: [policies and providers](https://github.com/VeoveoAI/veoveo-template-installation/blob/main/DESIGN.md#policies-and-providers),
  [Computers](https://github.com/VeoveoAI/veoveo-template-installation/blob/main/DESIGN.md#computers)
