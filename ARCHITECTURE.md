# Veoveo Architecture

Veoveo is a platform on which people use services, data and artifacts through their own
agents, and build new services by pushing source. This document holds what no single
repository owns: the components and their responsibilities, the identities and trust
boundaries between them, the path from a person's Computer to a served branch, who owns
which configuration, and where each topic is designed. Component behavior is in each
component's `DESIGN.md`, which this document links to and does not restate.

## Purpose

Every person gets a private **Computer**: a persistent OpenShell sandbox running the
OpenCode agent, the Lore command line and a connection to the Hub. The agent works
there with its ordinary file and shell tools. Two acts publish work to the platform: a
Lore push publishes source, and an Artifact upload publishes content. Nothing else on a
Computer, such as local commits, scratch files or agent history, is platform state.

A pushed branch of a server repository is built and served from its own **factory
sandbox**, beside the other servers. Each person chooses which branch of each server
they use, and the agent sees why a branch is not serving. Lore's repository permissions
decide who may push, read and serve; OpenShell's sandbox model decides what a workload
may reach. There is no approval layer beside these two.

Users call every service through the **Hub**, the one entry point of an installation,
which authenticates them, authorizes each request against the permissions the server
declared, and forwards it with a fresh token that names the caller. The Hub is not a
model proxy: the agent calls its model provider directly through OpenShell's proxy.

## Components

| Component | Responsibility | Repository | Design |
|---|---|---|---|
| Hub | Entry point: browser and MCP authentication, its authorization server (application and Lore tokens), server registration, routing and selection, the factory reconciler, Computers | [veoveo-hub](https://github.com/VeoveoAI/veoveo-hub) | [Hub](https://github.com/VeoveoAI/veoveo-hub/blob/main/crates/veoveo-hub/DESIGN.md), [token and session authority](https://github.com/VeoveoAI/veoveo-hub/blob/main/crates/veoveo-hub/src/auth/DESIGN.md) |
| Hub SDK | MCP hosting, the registration protocol and client, forwarded-identity checks, calls between servers, the Task adapter, the command-line client | [veoveo-hub-sdk](https://github.com/VeoveoAI/veoveo-hub-sdk) | [server contract](https://github.com/VeoveoAI/veoveo-hub-sdk/blob/main/crates/veoveo-hub-sdk/DESIGN.md), [registration protocol](https://github.com/VeoveoAI/veoveo-hub-sdk/blob/main/crates/veoveo-hub-sdk/src/registration/DESIGN.md), [CLI](https://github.com/VeoveoAI/veoveo-hub-sdk/blob/main/crates/veoveo-hub-sdk-cli/DESIGN.md) |
| Core | Protocol-independent libraries: types, the database kernel, durable Tasks, audit and usage | [veoveo-core](https://github.com/VeoveoAI/veoveo-core) | [database](https://github.com/VeoveoAI/veoveo-core/blob/main/docs/DATABASE.md), [conventions](https://github.com/VeoveoAI/veoveo-core/blob/main/docs/CONVENTIONS.md), `platform/*/DESIGN.md` |
| Console | The Hub MCP server: the Hub's activities as agent tools (status, logs, selection, watching, repository creation, sharing and groups, the Computer) | [veoveo-mcp-console](https://github.com/VeoveoAI/veoveo-mcp-console) | [console](https://github.com/VeoveoAI/veoveo-mcp-console/blob/main/crates/veoveo-mcp-console/DESIGN.md) |
| Artifact | Managed content: metadata, access, sharing and signed byte transfers | [veoveo-mcp-artifact](https://github.com/VeoveoAI/veoveo-mcp-artifact) | [Artifact](https://github.com/VeoveoAI/veoveo-mcp-artifact/blob/main/crates/veoveo-mcp-artifact/DESIGN.md) |
| Media | Generation runs as durable Tasks against an outside provider, with outputs stored through Artifact | [veoveo-mcp-media](https://github.com/VeoveoAI/veoveo-mcp-media) | [Media](https://github.com/VeoveoAI/veoveo-mcp-media/blob/main/crates/veoveo-mcp-media/DESIGN.md) |
| Embedding | The embedding contract, its permissions and usage; media resolved through Artifact | [veoveo-mcp-embedding](https://github.com/VeoveoAI/veoveo-mcp-embedding) | [Embedding](https://github.com/VeoveoAI/veoveo-mcp-embedding/blob/main/crates/veoveo-mcp-embedding/DESIGN.md) |
| Embedding runtime | Private GPU inference behind the Embedding server | [veoveo-runtime-embedding](https://github.com/VeoveoAI/veoveo-runtime-embedding) | [runtime](https://github.com/VeoveoAI/veoveo-runtime-embedding/blob/main/DESIGN.md) |
| Time | Time resolution, schedules and events; the reference server of the factory | [veoveo-mcp-time](https://github.com/VeoveoAI/veoveo-mcp-time) | [Time](https://github.com/VeoveoAI/veoveo-mcp-time/blob/main/crates/veoveo-mcp-time/DESIGN.md) |
| MCP template | The starting point of a Rust server repository, including its factory layout | [veoveo-template-mcp-rust](https://github.com/VeoveoAI/veoveo-template-mcp-rust) | [template](https://github.com/VeoveoAI/veoveo-template-mcp-rust/blob/main/crates/veoveo-template-mcp-rust/DESIGN.md) |
| Installation template | How an installation is assembled and deployed: placement, images, versions, configuration ownership, identity wiring, policies and providers | [veoveo-template-installation](https://github.com/VeoveoAI/veoveo-template-installation) | [installation](https://github.com/VeoveoAI/veoveo-template-installation/blob/main/DESIGN.md) |
| Bioma's installation | The reference installation, laid out as the template would produce it, with Bioma's values | [BiomaAI/veoveo-installation](https://github.com/BiomaAI/veoveo-installation) | [Bioma](https://github.com/BiomaAI/veoveo-installation/blob/main/DESIGN.md) |
| Lore | Source and immutable revisions, repository permissions, branch notifications | [VeoveoAI/lore](https://github.com/VeoveoAI/lore), a fork of [EpicGames/lore](https://github.com/EpicGames/lore) | Lore's own documentation |
| OpenShell | Sandboxes, templates, workspaces, policies, providers and credential custody, forwarding, lifecycle and diagnostics | [VeoveoAI/OpenShell](https://github.com/VeoveoAI/OpenShell), a fork of [NVIDIA/OpenShell](https://github.com/NVIDIA/OpenShell) | OpenShell's own documentation |
| OpenCode | The agent in every Computer; it does no version control | [VeoveoAI/opencode](https://github.com/VeoveoAI/opencode), a fork | its `VEOVEO_FORK.md` |
| OpenShell qualification | Scenarios that qualify an OpenShell release for Veoveo | [veoveo-qualify-openshell](https://github.com/VeoveoAI/veoveo-qualify-openshell) | its [README](https://github.com/VeoveoAI/veoveo-qualify-openshell/blob/main/README.md) |
| Lore Desktop adapter | Retired; kept as source history | [veoveo-service-lore](https://github.com/VeoveoAI/veoveo-service-lore) | none |

The repositories form layers. Each depends only on the layers below it, through Git
dependencies pinned to one revision, and never in a cycle:

```text
installation     composes components
mcp              depends on veoveo-hub-sdk and on other servers' contract features
hub              depends on veoveo-hub-sdk and veoveo-core
runtime          serves one server privately; it implements no MCP and holds no Hub identity
veoveo-hub-sdk   depends on veoveo-core and rmcp
veoveo-core      depends on third-party crates only
```

Core names no MCP method, server or domain; the SDK names no server; the Hub names no
server either, and learns of servers only through registration. A server publishes its
contract through its crate's `contract` feature, and a server that calls another
depends on that feature. Each component owns its image, toolchain, checks and
acceptance suite, and keeps one name for its repository, crate, binary and image;
names and formats follow core's [conventions](https://github.com/VeoveoAI/veoveo-core/blob/main/docs/CONVENTIONS.md).

Component repositories live in Git on GitHub, and Cargo resolves Veoveo dependencies
from their pinned Git revisions. A server that a factory serves is pushed to Lore as
well; nothing synchronizes Git and Lore automatically, so each handoff copies an exact
tree in one direction.

## Identities And Trust Boundaries

| Identity | Who holds it | What it is for |
|---|---|---|
| A person's sign-in | The installation's identity provider (Microsoft Entra in the reference) | Proves who the person is to Hub; it grants nothing in Veoveo by itself |
| Hub application tokens | Issued by Hub's authorization server to a person's client | MCP and Hub routes, decided by installation roles over each server's declared permissions |
| Forwarded tokens | Signed by Hub per request, addressed to one server | The caller, client, tenant and the permissions granted in that server's namespace; a call between servers carries the calling server as actor and only the permissions it declared and the caller holds |
| Lore tokens | Issued by Hub's authorization server from explicit repository assignments, to people and to groups, in Hub's control plane; each names one repository, or none | Native Lore access, which Lore verifies with its unchanged authorization |
| A Computer's credentials | OpenShell's credential custody, refreshed from Hub with the Computer's own client, a Lore token per repository a request names | The owner's Hub token and Lore token, which the Computer sees only as placeholders |
| A factory instance's credentials | OpenShell's credential custody, refreshed from Hub with the instance's own client | Lore read access as the branch's latest pusher, and the instance's registration token |
| A server's registration | Its key pair and its registration access token | The server's identity at Hub: one PostgreSQL login per registration, confined to its schema |
| Hub's OpenShell control identity | An identity-provider client whose secret stays in OpenShell's custody; only Hub's sandbox holds its placeholder | Creating, starting, stopping and deleting sandboxes and providers, and forwarding to them |
| OpenShell management sign-in | Operators, against the installation's issuer | The gateway's own administration, with an audience separate from Hub's and Lore's |

The boundaries that follow from these:

- **Separate audiences.** Hub application tokens, Lore tokens and OpenShell management
  tokens name different audiences, and each service accepts only tokens for its own,
  even where one issuer signs two kinds. The one exception is Lore's repository listing:
  Lore forwards its caller's Lore token to Hub, the token's issuer, which answers only
  that person's repository assignments. A valid Lore token gives no other Hub access, and
  Hub administration or Work Context membership gives no repository access.
- **Credentials stay in custody.** Workloads hold placeholders that OpenShell replaces on
  the request; the real Lore, Hub and model credentials never enter a Computer or a
  factory sandbox. Only a credential that must sign stays with its service, such as
  Artifact's bucket key, which SigV4 needs in the signer.
- **One owner per Computer.** Each Computer has its own OpenShell workspace and only its
  owner's browser session or Hub credential reaches it. Computers share no
  administrative identity, and never receive Hub's OpenShell control identity.
- **Hub acts in Lore only as a person.** It reads a pushed revision as its pusher,
  watches a repository as the person who turned watching on, and a factory sandbox
  fetches as the branch's latest pusher. Hub holds no repository grant of its own.
- **Branches cannot raise their own authority.** A repository supplies its environment
  image, its program and extra network rules; it cannot add providers, mounts,
  credentials or policy beyond network rules, and the installation's base policy
  withholds what a branch must not reach, such as the log store.
- **The platform never writes into a Computer's home.** `/sandbox` belongs to its
  owner; everything else in a Computer comes with its version and is read-only.
- **Agent output is not a verdict.** A test an agent wrote and ran is not independent
  verification, and agent-editable metadata is never a grant.

Identity wiring for an installation (which provider, which clients and roles) is in the
[installation design](https://github.com/VeoveoAI/veoveo-template-installation/blob/main/DESIGN.md#identity).

## From A Computer To A Served Branch

1. **Enter.** A person opens `/computer` on the installation's one public origin. Hub
   signs them in through the identity provider and creates their Computer from the
   current Computer version on first entry, keeping its home across every later
   replacement.
2. **Work.** The agent clones and edits repositories with the Lore CLI, which reaches the
   private Lore server with the owner's Lore token; Lore decides what the person may read
   and push. Whoever creates a repository through Hub owns it, and an owner shares it with
   people and with groups through console.
3. **Publish.** `lore push` publishes an immutable revision. A repository is built and
   served once someone with access turns watching on with `console__watch`.
4. **Build and serve.** Hub receives Lore's branch notification, reads the revision's
   `openshell/` as its pusher, builds `openshell/image/` with the installation's BuildKit
   into the local registry, and creates or restarts the branch's factory sandbox. The
   sandbox fetches the branch, runs `openshell/run`, which builds and then becomes the
   server, and the server registers with Hub as that branch's instance, in that branch
   name's data environment.
5. **Select and call.** Each person's selection names a branch per server; servers it
   does not name use the base branch. Every chat of that person follows the selection.
   Hub routes each call to the selected instance and nothing else: a missing or failed
   instance answers with its cause.
6. **Diagnose and fix.** `console__status` and `console__logs` show the serving
   revision, the last failure and the sandbox's complete output; the agent fixes the
   source and pushes again. Deleting the branch, or removing `openshell/run`, removes the
   instance.

Hub and the platform servers (console, Artifact, Media, Embedding and its runtime) run
as long-lived sandboxes the installation creates; any server repository can also be
served from a branch this way. The mechanism is in Hub's
[factory sandboxes](https://github.com/VeoveoAI/veoveo-hub/blob/main/crates/veoveo-hub/DESIGN.md#factory-sandboxes),
the repository side in the [template's factory layout](https://github.com/VeoveoAI/veoveo-template-mcp-rust/blob/main/crates/veoveo-template-mcp-rust/DESIGN.md#factory),
and the installation's part in its [factory section](https://github.com/VeoveoAI/veoveo-template-installation/blob/main/DESIGN.md#factory).

Bulk bytes never travel through MCP, the Hub or a model's context: clients move them
directly to and from object storage through URLs Artifact signs. Lore and Artifact
reference each other by identity; neither copies the other's content.

## Configuration Ownership

A value that would differ in a second installation belongs to the installation; a value
that changes together with code belongs to the repository that holds the code.

| Owner | What it holds |
|---|---|
| Component repository | Source, contract, checks, image stages and, per branch, `openshell/image/`, `openshell/run` and an optional `openshell/policy.yaml` |
| Installation repository | Kubernetes foundation inputs, OpenShell base policies, provider profiles, the Computer and factory templates (with each workload's size and mounts), the Computer image, the identity provider's clients and roles, public origins, the lock that names each image once, and the seed of Hub's control plane |
| Hub's control plane | The live installation catalog: identity providers, clients, tenants, roles and grants, repository registrations, groups and assignments, MCP request destinations, Computer settings and handbook, which factory template to use, soft caps and base branch. PostgreSQL holds the active revision; the installation's file seeds only an empty installation, and changes go through the live administrative route |
| Hub's tables | Registrations, instances, selections, watches and Computers |
| OpenShell | Runtime inventory: workspaces, sandboxes, templates, providers and their credentials, policies as admitted |
| Lore | Repositories, revisions and the server's own settings, which the installation supplies |

Secrets never enter Git or images; private installation state stays with the operator.
Bioma's installation records its selections and its differences from the template in
its own repository, and reusable fixes go to the template first.

## Principles

- **Native first.** OpenShell, Lore and Kubernetes keep every job they already do:
  lifecycle, restarts, credential custody, policy, scheduling and source semantics.
  Veoveo adds only the source-to-workload mapping and its application semantics, in the
  existing Hub process; there is no separate factory service, broker, scheduler, CI
  system, watchdog or startup orchestrator.
- **Forks are small and recorded.** Where a verified gap needs a change in Lore,
  OpenShell, OpenCode or rmcp, the VeoveoAI fork carries the smallest coherent patch,
  pursued upstream, with the upstream revision and patches recorded beside the pin.
  Unsupported enforcement fails closed.
- **No gate the function does not require.** Every check that can stop a person must be
  required by the function; Lore's grants and OpenShell's sandbox model are the only
  authorities over source and execution.
- **Nothing falls back silently.** A selected instance that is missing or failing is
  reported, never replaced by another branch.
- **Development data is disposable.** Breaking changes reset application state instead
  of migrating it; source and trusted installation configuration are what an
  installation is rebuilt from.
- **No Python in the build or the infrastructure.** Builds, checks, installation
  tooling and the configuration an installation is rebuilt from are Rust, or plain
  shell where a few lines suffice. Python is used only where Python is the point: a
  server written in Python, a service whose upstream is Python (the Embedding
  runtime's model stack), and throwaway scripts for testing.

## Where Each Topic Is Designed

| Topic | Design |
|---|---|
| Placement: K3s, OpenShell's Kubernetes driver, workspaces | [installation](https://github.com/VeoveoAI/veoveo-template-installation/blob/main/DESIGN.md#placement) |
| Images, their pins, and how Lore and the SDK CLI reach workloads | [installation](https://github.com/VeoveoAI/veoveo-template-installation/blob/main/DESIGN.md#images) |
| Identity providers, clients, roles and Lore server settings | [installation](https://github.com/VeoveoAI/veoveo-template-installation/blob/main/DESIGN.md#identity) |
| PostgreSQL, object storage and Lore storage as deployed | [installation](https://github.com/VeoveoAI/veoveo-template-installation/blob/main/DESIGN.md#storage) |
| Network policies, provider profiles and trust roots | [installation](https://github.com/VeoveoAI/veoveo-template-installation/blob/main/DESIGN.md#policies-and-providers) |
| Public host and tunnel routes | [installation](https://github.com/VeoveoAI/veoveo-template-installation/blob/main/DESIGN.md#public-ingress) |
| Factory infrastructure: base policy, log store, builder, registry | [installation](https://github.com/VeoveoAI/veoveo-template-installation/blob/main/DESIGN.md#factory) |
| Computer image, template, policy and OpenCode configuration | [installation](https://github.com/VeoveoAI/veoveo-template-installation/blob/main/DESIGN.md#computers) |
| Database kernel, schemas and roles, data-environment databases | [core database](https://github.com/VeoveoAI/veoveo-core/blob/main/docs/DATABASE.md) |
| Names, identifiers and formats | [core conventions](https://github.com/VeoveoAI/veoveo-core/blob/main/docs/CONVENTIONS.md), [MCP conventions](https://github.com/VeoveoAI/veoveo-hub-sdk/blob/main/docs/CONVENTIONS.md) |
| Durable Tasks, audit and usage | [Tasks](https://github.com/VeoveoAI/veoveo-core/blob/main/platform/task/DESIGN.md), [audit](https://github.com/VeoveoAI/veoveo-core/blob/main/platform/audit/DESIGN.md), [usage](https://github.com/VeoveoAI/veoveo-core/blob/main/platform/usage/DESIGN.md) |
| Hosting a server, Task work, calls to other servers | [SDK](https://github.com/VeoveoAI/veoveo-hub-sdk/blob/main/crates/veoveo-hub-sdk/DESIGN.md) |
| Server registration protocol | [SDK registration](https://github.com/VeoveoAI/veoveo-hub-sdk/blob/main/crates/veoveo-hub-sdk/src/registration/DESIGN.md), [Hub](https://github.com/VeoveoAI/veoveo-hub/blob/main/crates/veoveo-hub/DESIGN.md#server-registration) |
| Authorization, forwarded identity, calls between servers | [Hub](https://github.com/VeoveoAI/veoveo-hub/blob/main/crates/veoveo-hub/DESIGN.md#authorization) |
| Browser sign-in, sessions and Hub tokens | [Hub token and session authority](https://github.com/VeoveoAI/veoveo-hub/blob/main/crates/veoveo-hub/src/auth/DESIGN.md) |
| Lore credentials and repository creation | [Hub](https://github.com/VeoveoAI/veoveo-hub/blob/main/crates/veoveo-hub/DESIGN.md#native-contributed-credential-lifecycle) |
| Selection and routing | [Hub](https://github.com/VeoveoAI/veoveo-hub/blob/main/crates/veoveo-hub/DESIGN.md#execution-composition-and-deployment-identity) |
| Factory sandboxes and data environments | [Hub](https://github.com/VeoveoAI/veoveo-hub/blob/main/crates/veoveo-hub/DESIGN.md#factory-sandboxes) |
| A server repository's factory layout | [MCP template](https://github.com/VeoveoAI/veoveo-template-mcp-rust/blob/main/crates/veoveo-template-mcp-rust/DESIGN.md#factory) |
| Agent tools for status, logs, selection and watching | [console](https://github.com/VeoveoAI/veoveo-mcp-console/blob/main/crates/veoveo-mcp-console/DESIGN.md) |
| Computers: entry, versions, collection, browser access | [Hub](https://github.com/VeoveoAI/veoveo-hub/blob/main/crates/veoveo-hub/DESIGN.md#computer-versions) |
| Live control-plane changes | [Hub](https://github.com/VeoveoAI/veoveo-hub/blob/main/crates/veoveo-hub/DESIGN.md#live-native-destinations-and-computer-defaults) |
| Artifact storage, sharing and transfers | [Artifact](https://github.com/VeoveoAI/veoveo-mcp-artifact/blob/main/crates/veoveo-mcp-artifact/DESIGN.md) |
| Media runs and providers | [Media](https://github.com/VeoveoAI/veoveo-mcp-media/blob/main/crates/veoveo-mcp-media/DESIGN.md) |
| Embedding contract and runtime | [Embedding](https://github.com/VeoveoAI/veoveo-mcp-embedding/blob/main/crates/veoveo-mcp-embedding/DESIGN.md), [runtime](https://github.com/VeoveoAI/veoveo-runtime-embedding/blob/main/DESIGN.md) |
| Time | [Time](https://github.com/VeoveoAI/veoveo-mcp-time/blob/main/crates/veoveo-mcp-time/DESIGN.md) |

What is next is in the [plan](PLAN.md), what is proven in the
[qualification checklist](QUALIFICATION_CHECKLIST.md), and dated evidence in the
[records](records/README.md).
