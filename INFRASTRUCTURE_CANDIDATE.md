# Infrastructure Candidate

Status: leading infrastructure candidate, revised on 2026-10-16. The direction is
accepted for further design and qualification; it is not a completed migration or a
replacement for the recorded runtime status in the
[Repository Split Plan](REPOSITORY_SPLIT_PLAN.md).

Veoveo should let users and coding agents create, change, test and promote service
environments through ordinary Lore branches and configuration files. Several users
can run different versions of the same MCP service concurrently, while each user
continues to use the other services from a selected shared environment.

OpenShell is the factory foundation: reuse its lifecycle, templates, access
workspaces, resource requests, policies, providers and diagnostics. Lore is the
source and revision authority. The [Lore and OpenShell integration](LORE_OPENSHELL_INTEGRATION.md)
defines their shared boundaries, verified gaps and qualification order. Maintained
VeoveoAI forks and extension builds are permitted where needed, while preserving
both systems' security and design contracts.

## Infrastructure Responsibilities

| Component | Proposed responsibility |
|---|---|
| Lore | Service source, environment configuration, branches and immutable revisions; native hooks and notifications connect approved changes to factory work |
| Veoveo factory integration | Connect Lore revisions and permissions to native OpenShell resources, CI results, deployment declarations and gateway contexts; reconcile branch lifecycle |
| CI | Run component checks in fresh OpenShell workers and publish verified immutable artifacts through a trusted step |
| Helm | Package each component once for every configured environment, exposing its supported configuration values |
| Flux | Reconcile every service deployment through the same release path and configured resource cleanup |
| Kubernetes | Host every deployed service, maintain replica counts, replace failed instances and manage rollout readiness; provide OpenShell's factory compute backend |
| k3d | Run the development Kubernetes cluster on the Mac |
| K3s | Run the Linux reference installation, including NVIDIA GPU workloads; customer installations can use their own compatible Kubernetes cluster |
| OpenShell | Factory foundation for sandbox lifecycle/execution, templates, resource requests, access workspaces, policy enforcement, providers and diagnostics; integration requires qualification |
| Envoy | Service/Desktop ingress and trusted routes; retain an authenticated Lore bridge while necessary, retiring duplicated factory egress after OpenShell qualifies |
| Configured identity provider | User sign-in, MFA, OAuth grants, refresh and identity-session lifecycle; Keycloak locally, Entra for the reference installation, customer-selected providers elsewhere |
| Veoveo gateway | Validate caller access, enforce application permissions and delegation, resolve selected compositions, expose their MCP catalogs and route calls |
| OpenBao | Persistent shared secret storage and authorized developer retrieval of development configuration |

Use the existing Kubernetes, Helm, Flux and service diagnostics. This candidate does
not introduce a log aggregator, a replacement scheduler or a general infrastructure
programming language. The Veoveo controller owns the product-specific decisions;
existing controllers own workload reconciliation. OpenShell is authoritative for
factory sandboxes and workspace membership. The integration does not maintain a
second runtime API, scheduler, credential store or sandbox policy engine.

[Kubernetes Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
maintain desired replicas, and
[Flux Helm releases](https://fluxcd.io/flux/components/helm/helmreleases/) manage the
declared component releases. Gateway registration does not keep a process running.

## Factory Sandboxes And Service Deployments

Call the authoring containers **factory sandboxes**. A factory sandbox holds an
agent's working source, toolchain, tests and caches. Allocate one per active
workspace or independently isolated job, normally with one primary component
repository. A change may include additional authorized repositories in the same
workspace. Multiple users or unrelated experiments do not share a writable sandbox.
The factory integration is trusted and separate from these worker sandboxes. It
uses OpenShell's native SDK and extension APIs rather than managing containers itself.

Use OpenShell to contain factory work after qualification. Reference approved native
OpenShell templates, policies and provider profiles instead of duplicating their
settings in a Veoveo configuration language. Map private work to native OpenShell
access workspaces; those are distinct from the service-selection context.
An environment is a service composition, independent of factory sandboxes. A
factory sandbox can start temporary test processes and fixtures, but it does not
host an entire shared environment or carry that environment's credentials. Request GPU resources for a
factory sandbox when its work needs CUDA, independently of service runtime GPU needs.

Deploy each service as its own workload using its runtime image. Each environment
that owns an instance has a distinct deployment; personal previews add only their
overrides. Replicas and tightly coupled supporting containers follow that workload's
requirements. Keeping services separate allows a Media change to deploy or restart
without restarting Time and Artifact. Agent-authored preview services still receive
restricted network access, resource limits and appropriately scoped credentials.

Use [one service deployment path](LORE_OPENSHELL_INTEGRATION.md#one-service-deployment-path)
for every configured environment: the component's runtime image
and Helm chart, reconciled by Flux on Kubernetes. Ownership, revision, bindings and
gateway selection change; the hosting implementation does not. OpenShell owns
factory author/build/check work using its Kubernetes backend on both Mac and Linux.

OpenShell's documented
[sandbox lifecycle](https://docs.nvidia.com/openshell/v0.1.4/how-it-works/sandboxes/runtimes)
is managed by its own gateway. Keep that responsibility for factory sandboxes
separate from the Veoveo gateway's MCP routing and Kubernetes service deployments.

## Environments And Instances

An environment is an authorized, versioned service composition stored in Lore.
Its name is a display label. There is no built-in environment list, `kind: preview`
switch, ordering of stages, or policy inferred from a branch or environment name.
`dev`, `stage`, `release` and `alice-experiment` are ordinary possible labels.
Installations can define any number of environments with the same schema and
delivery path.

Each definition can stand alone or reference an authorized base composition and
override selected components or bindings. An environment without overrides can
reuse all base deployments; it does not need its own service containers. A private
experiment and a shared deployment differ in configured access, revisions,
bindings and lifecycle, not controller implementations. Inheritance is optional,
explicit and acyclic; resolve component entries by identity rather than applying
an unrestricted deep YAML merge.

Give each environment an immutable controller identity bound to its approved Lore
repository, branch incarnation and manifest path. Display names and branch names
are not authorization or ownership keys. If Lore does not expose a stable branch
incarnation, qualify authoritative creation/deletion history or add a narrow Lore
extension. A locally assigned ID alone cannot detect a missed delete/recreate.
Reusing a name must not adopt the previous environment's resources.

For example, three independent compositions each owning ten single-replica
services require thirty application instances. Two overrides add two instances.
Inherited services add none. Databases, storage, factory workers and additional
replicas are counted separately. Environment count is not container count.

Use a namespace for each environment's owned service workloads and dependencies;
a composition that owns no workloads need not allocate one. OpenShell manages
factory sandbox placement and namespaces through
its native backend; an OpenShell access workspace is not assumed to equal a
Kubernetes namespace. Reuse inherited services through authorized gateway routing.
A namespace does not provide hostile-code isolation on its own; sandboxing and
network and identity policy remain necessary. See
[Kubernetes multi-tenancy](https://kubernetes.io/docs/concepts/security/multi-tenancy/).

## Personal Overrides And Gateway Routing

The proposed resolution rule for a service is:

1. Use the deployment explicitly defined by the selected environment.
2. Otherwise resolve that service through its declared base composition, if any.
3. If neither defines the service, it is unavailable in that context.

An existing override that is unhealthy is unavailable. It must not silently fall
back to the base service or another environment. Removing the override explicitly
restores the base selection.

These labels are examples, with no special interpretation:

| Selected context | Media | Time | Artifact |
|---|---|---|---|
| Shared dev | Dev Media | Dev Time | Dev Artifact |
| Your preview based on dev | Your Media | Dev Time | Dev Artifact |
| Another person's preview based on dev | Their Media | Dev Time | Dev Artifact |
| Staging | Staging Media | Staging Time | Staging Artifact |
| Stable | Stable Media | Stable Time | Stable Artifact |

Here an override replaces the selected route; it does not duplicate requests or
perform traffic mirroring. Another person's preview becomes selectable only through
explicit sharing and authorization. It does not replace shared dev simply because
it registered later.

Selection belongs to an authenticated workspace or execution context, so one person
can work on two experiments at the same time. Context selection is validated by the
gateway and propagated through trusted delegation; a caller-supplied environment
name is not authority. Agents, subagents and service-to-service calls inherit the
same selection without acquiring additional permissions. A shared service handling
calls from several contexts must preserve each call's context rather than changing
its global downstream selection.

Discovery returns the tools and schemas of the selected versions. Catalog caches,
pagination, requests and Task routes must include the applicable context and
composition revision. Each operation captures a resolved composition; a long-lived
Task retains the deployment version that created it while a replacement replica of
that same deployment can recover the work. A context change must not send an
existing Task to a different service version.

Base selection explicitly pins a composition revision or follows admitted updates
for new operations. No environment name selects this behavior. Every operation
records an immutable resolved composition, including inherited selections; an
existing Task keeps its captured version when a tracked base advances.

Merging a service branch does not itself redirect callers. A destination environment
must select the built revision, pass its configured checks and become ready.
Promotion is an authorized configuration change selecting tested artifact digests
in any permitted destination; there is no built-in dev-to-stage-to-release chain.
Users with explicit overrides keep them when their base advances.

## Workload Lifecycle

Replica counts, resource limits, retention and deletion behavior are configuration,
independent of environment names. For the first implementation, keep each admitted
deployment running at its declared replicas until an explicit stop or deletion.
Do not introduce automatic sleeping, gateway-triggered starts or idle timers in the
first slice. Resource quotas can reject or leave work pending; a GPU request cannot
be satisfied by routing to an unrelated deployment.

The Veoveo factory integration records whether an environment should exist. Flux
maintains all service deployments and declared dependencies; Kubernetes maintains
those workloads. OpenShell owns sandbox lifecycle and restart policy for factory
workers, using its Kubernetes backend for compute. The Veoveo gateway uses
deployment identity, registration and readiness to select available instances;
it does not become a second process supervisor.

An environment explicitly bound to its branch lifetime is removed when that branch
is authoritatively deleted. Stop accepting new work, drain or explicitly cancel its
Tasks according to policy, revoke its access and remove owned resources. Retained
data survives according to its declaration. Durable environments use protected refs
and an explicit deletion policy. Preserve clear unavailable results for contexts
still selecting a deleted environment until they explicitly remove that selection.
A temporary Lore outage or a missed event is not
evidence of branch deletion. Reconciliation reads current source state and uses
stable branch/environment identities so reusing a branch name does not adopt an
earlier environment's resources.

## Configuration And Lore Integration

Service repositories own source, tests, images, charts and component configuration
schemas. Environment repositories compose services and dependencies. Normal agent
work edits service source and a small schema-validated environment file describing
the base, overrides, source selections, resource requests, bindings and lifecycle.
Use one small composition schema, with no per-stage variants. Its syntax remains to
be qualified. For example, this is proposed configuration, not a supported parser:

```yaml
schemaVersion: 1
displayName: alice-cuda-experiment
base:
  environment: env_f74
  revision: "<immutable composition revision>"
components:
  media:
    source:
      repository: repo_19
      revision: "<immutable Lore revision>"
    chartValues:
      replicaCount: 1
bindings:
  identity: oidc-personal-test
  storage: alice-artifacts
lifecycle:
  onBranchDeletion: deleteOwned
```

The identity and storage entries reference approved binding records, not credentials
or arbitrary issuers. The base selector can instead explicitly follow admitted
updates; the pin and follow forms are mutually exclusive. Component sources resolve
through checks to immutable image/chart digests before deployment. The resolved
composition records those digests, configuration revisions and binding identities.
Branch names can be used to find authoring work, but are never runtime version IDs.

Keep component settings in native chart values, factory settings in OpenShell
template/policy references, and secret values in OpenBao. The composition file adds
only cross-system selection, bindings and lifecycle. Admit definitions only from
registered environment sources; pushing an arbitrary repository does not deploy it.
Admission checks base access, dependencies, quotas, allowed destinations and binding
permissions against policy outside the author-controlled branch. Editing a manifest
cannot grant access, change the installation trust root or delete platform bootstrap.

Keep service settings close to their existing Helm values and schemas. Helm supports
[JSON Schema validation of values](https://helm.sh/docs/topics/charts/#schema-files).
Agents can propose chart changes when deployment behavior needs to change, subject
to the permissions and checks for that component. They do not receive cluster
credentials, arbitrary privileged deployment authority or unrestricted secret
references by editing a file.

Use Lore's native hooks and notifications to connect source changes to OpenShell
checks and environment reconciliation. A compiled Lore hook can enforce mutation
policy; notification delivery alone is not authoritative. Respect OpenShell's
interceptor phases and native authorization. The
[integration design](LORE_OPENSHELL_INTEGRATION.md#lore-hooks-and-branch-lifecycle)
defines the extension-build and recovery constraints.

The proposed source bridge publishes validated environment manifests as OCI
artifacts. It binds a Lore revision and CI results to image, chart and configuration
digests, then updates the approved Flux declarations. Flux can consume an
[OCI source by digest](https://fluxcd.io/flux/components/source/ocirepositories/).
Lore remains the source of truth; a Git mirror is not required. Protect against a
late CI result deploying after its branch was deleted or superseded.

Environment permissions, resource quotas and allowed secret bindings are enforced
outside the editable preview branch. Flux reconciles preview resources under
restricted identities; component chart edits cannot select cluster-admin or widen
their own authority. See
[Flux multi-tenancy](https://fluxcd.io/flux/installation/configuration/multitenancy/).

## Data And Infrastructure Bindings

Each dependency is either owned by the environment or an authorized reference to an
existing resource. Owned disposable databases, buckets and services are removed
with the environment; shared resources are never deleted by a consumer's teardown.
Durable environments declare retention explicitly.

Routing and data isolation are separate choices. A personal Media deployment can
use a private database and bucket, but a call from it to inherited Dev Artifact
still uses Dev Artifact's configured state. A shared service instance cannot switch
its database pool or bucket globally according to whichever user called last.
When an experiment needs an entirely isolated workflow, include the dependent
services and their compatible state in the preview.

Treat core identity, Tasks and audit state coherently where services share the
kernel database. Pair artifact metadata with the object storage it describes.
Changing a database binding requires qualification of that composition; this is
not implemented by adding an arbitrary connection string to the gateway. Reverting
an environment revision does not roll back database contents or reverse migrations.

Identity is configured through OIDC. Local development keeps permanent Keycloak;
the Linux reference at `veoveo.bioma.ai` is intended to use Entra, and customers may
retain Keycloak or provide another issuer. Selecting a test issuer does not confer
production permissions. An experiment using Keycloak and production MCP services
requires approved identity mappings and grants enforced by the trusted production
boundary.

## Identity Delegation And Veoveo Scope

Delegate ordinary identity operations to the configured OAuth/OIDC provider: sign-in,
MFA, authorization-code grants, client authentication, refresh rotation and identity
session management. Clients use that provider's supported flows and renewal. The
MCP gateway advertises the configured authorization server through protected-resource
metadata and validates tokens intended for its resource. Its browser login and
refresh-family implementation should not remain a parallel identity system after
the external flow is qualified.

OpenShell already authenticates its own API against a configured issuer and handles
login/renewal in supported clients. Use that directly for factory access. It is an
OIDC relying party/resource server, not an identity provider or a general MCP
authorization server. Veoveo depends on its sandbox and workspace authority; it
does not send MCP requests to OpenShell to obtain unrelated application permissions.
See [OpenShell authentication](https://docs.nvidia.com/openshell/v0.1.4/how-it-works/gateways/authentication)
and [MCP authorization](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization).

Configure separate audiences and client registrations for OpenShell, the MCP gateway
and Lore as their protocols require. Browser SSO can reuse the identity provider's
session; an OpenShell access token is not a universal Veoveo bearer. Identity is
keyed by trusted issuer and subject, with explicit cross-provider mappings. A test
issuer cannot grant access to production resources merely by copying a subject,
email, group or environment label.

Veoveo retains application-specific permissions, environment/context admission,
MCP discovery and routing, constrained server-to-server delegation and Task ownership.
Factory operations call OpenShell's API; ordinary MCP calls do not require an
OpenShell control-plane request.
Its existing short-lived upstream tokens encode evaluated permissions, actor and
context; these are distinct from human login/refresh tokens. Keep that narrow
application authority unless a maintained replacement proves the same contracts.
Lore's published client authentication protocol may still require its existing
adapter and repository-scoped grants; OpenShell login does not replace that protocol.

The current gateway hosts OAuth authorization, refresh and session storage itself.
Migration must qualify MCP client discovery/registration, issuer token formats and
claim mapping, rotation/revocation, and Task compromise semantics. In particular it
currently requires RFC 9068 `at+jwt` access tokens; accepting Entra is not just changing
an issuer URL. Preserve the distinction between ordinary logout, which leaves an
authorized running Task alive, and compromised credentials, which end delegation.
Use existing identity libraries and Envoy's supported validation where suitable,
with one authoritative verified identity and no caller-forgeable forwarded headers.
Do not add a second custom SSO broker or make OpenShell an identity-provider fork.
Retire replaced OAuth routes and storage after qualification rather than retaining
a permanent legacy mode. No authentication code has been removed by this design.

## Agent Isolation And CUDA

Any coding task may need CUDA, not just model inference. The candidate uses Linux
GPU workers with the NVIDIA runtime, while the Mac hosts local development work.
[K3s documents NVIDIA runtime integration](https://docs.k3s.io/advanced#nvidia-container-runtime).
Keep GPU scheduling separate from deciding which service version a caller sees.

OpenShell is the selected factory foundation, with migration gated on qualification.
The reviewed v0.1.4 inspected proxy is HTTP/1.1-only, so Lore gRPC needs a qualified
bridge or generic HTTP/2 support. General external UDP is also denied, and native
Lore QUIC requires a separate mediation and credential-custody design. QUIC is an
optional measured optimization; gRPC remains acceptable. See
[transport integration](LORE_OPENSHELL_INTEGRATION.md#grpc-integration-gap-and-envoy-transition)
and [QUIC](LORE_OPENSHELL_INTEGRATION.md#optional-quic-storage-transport).
Prove actual CUDA execution before migration. GPU device visibility alone is not a
CUDA test. Shared kernels and GPU drivers remain part of the isolation model;
this candidate makes no VM-grade isolation claim.

Factory sandboxes and untrusted build workers receive source, toolchains and permitted
network access, but no Docker socket, host credentials, cluster administration or
production secret files. Provider credentials remain with OpenShell's trusted
supervisor and credential driver, or a qualified trusted bridge during transition.
Any credential delivered to an agent-authored service can be read by that
code, so previews receive only explicitly allowed, appropriately scoped credentials.

## Shared Development Secrets

Use OpenBao as the candidate shared store for values currently passed around in
`.env` files. Developers authenticate individually using its existing UI or CLI and
the installation's configured OIDC provider, then fetch only authorized project and
environment values. OpenBao supports
[browser login from its CLI](https://openbao.org/docs/auth/jwt/).

The simplest starting representation is a multiline dotenv field per project and
environment, retrievable with the existing
[`bao kv get` command](https://openbao.org/docs/commands/kv/get/). Lore keeps
`.env.example`, non-secret defaults and secret references. Local installation
credentials are generated locally rather than copied from a teammate. Fetched
files are private and ignored, and must be fetched again after changes; revoking
store access does not erase downloaded credentials.

Human login state and downloaded `.env` files stay outside factory sandboxes.
`.gitignore` prevents accidental commits, not filesystem reads. Ordinary application
users do not need development secrets. Keep OpenBao persistent, with backups and
its unlock mechanism outside disposable environments; do not build a custom secrets
distribution service.

Qualify OpenShell's existing Vault-compatible credential driver against OpenBao for
factory provider custody before writing a connector. Native supported refresh
strategies take over renewal where compatible; the existing private-key JWT Lore
flow needs explicit qualification or a generic extension.

## Existing Foundation And Qualification

The recorded macOS foundation uses Docker Compose, upstream Lore with no core
patches, a Veoveo OIDC integration for Lore, Envoy-protected credentials, OpenCode
factory containers currently named `vv-dev-*`, PostgreSQL, SeaweedFS and permanent
Keycloak. The
[installation design](../veoveo-template-installation/DESIGN.md) describes it.
Live Entra qualification and Lore Desktop remote graph/diff and automatic session
recovery remain acceptance work in the existing plan.

The gateway currently selects the newest registration per service slug, and its
[registration snapshot](../veoveo-service-gateway/crates/veoveo-service-gateway/src/registration/snapshot.rs)
holds one routed entry per slug. Multiple isolated environment selections require
changes to registration identity, routing, catalogs, delegation and Task ownership.
They are not supplied by deploying additional containers alone.

Kubernetes deployment, the Lore-to-Flux bridge, environment overrides, OpenShell
migration and OpenBao provisioning remain unimplemented candidate work. Existing
installation contracts and Git-based component locks also need explicit changes to
represent Lore revisions and resolved environment compositions.

The first acceptance gate is now [Lore and OpenShell coexistence](LORE_OPENSHELL_INTEGRATION.md#qualification-sequence):
normal Lore commands in a factory sandbox with repository/branch confinement,
protected credentials, renewal and reconnect. Qualify native OpenShell provisioning,
the Kubernetes backend and CUDA next. Forks may close verified gaps while preserving
extension contracts; see [fork policy](LORE_OPENSHELL_INTEGRATION.md#extension-builds-and-fork-policy).

The service-selection acceptance slice is one base composition and two private overrides
of one MCP service, with arbitrary labels. Rename all three labels and repeat without
code changes; exercise both pinned and tracking bases, reject inheritance cycles,
and promote to an arbitrarily named authorized destination. Verify that each
override replaces only that service; inherited services remain from the base;
another person's environment is invisible unless shared; discovery
and downstream calls preserve selection; failed previews never silently fall back;
and deleting one preview leaves the base and the other preview intact. Include a
long-lived Task and a replica restart to check version ownership and recovery.

Qualify developer secret login and retrieval using native OpenBao tools.
Before broader migration, settle the environment schema, baseline update policy,
state isolation boundaries, active-Task deletion policy, OCI registry, and backup
and unlock arrangements for persistent infrastructure. Lore, the controller,
identity bootstrap and the secret store must survive preview deletion.
