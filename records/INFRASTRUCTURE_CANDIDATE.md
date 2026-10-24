# Infrastructure Candidate

Status: Linux K3s foundation and scoped Computer workflow are qualified as of
2026-10-20; Mac remains ordinary source development/testing with local fixtures,
not a Mac cluster. Kubernetes owns foundation controllers/services; OpenShell's
Kubernetes driver owns application sandboxes. **Environment selection/overrides,
personal Lore workspace onboarding and reusable-runtime source activation are the
accepted next slice; implementation authorized and started on 2026-10-20, not yet
deployed-qualified.** Computer-local apply/watch and native Lore subscriptions feed
the same source activation contract. The
[execution plan](OPENSHELL_HARDCUT_PLAN.md#agent-operated-platform-adoption-plan)
separates those pending contracts from measured foundation receipts. The existing
diagram remains unchanged until this workflow is proved, per the user's direction.

Veoveo should let users and coding agents create, change, test and promote service
environments through ordinary Lore branches and configuration files. Several users
can run different versions of the same MCP service concurrently, while each user
continues to use the other services from a selected shared environment.

Users operate their own agent sessions on a hosted native OpenShell Computer.
The initial product offers each user private persistent OpenCode,
Lore CLI, Hub setup and a configurable trusted default
`deepinfra/XiaomiMiMo/MiMo-V2.6-Pro`. Native agent file/shell tools remain ordinary
local tools. Local commits stay local; Lore push and explicit Artifact upload are
the publication boundaries.

OpenShell is the execution platform for hosted Computers, checks and deployed services.
Reuse its lifecycle, templates, workspaces, resources, policies, providers, service
forwarding, sessions and diagnostics. Lore is the
source and revision authority. The [Lore and OpenShell integration](LORE_OPENSHELL_INTEGRATION.md)
defines their shared boundaries, verified gaps and qualification order. Maintained
VeoveoAI forks and extension builds are permitted where needed, while preserving
both systems' security and design contracts.

## Infrastructure Responsibilities

An existing OpenShell capability must not be reimplemented in Veoveo or delegated
to another mandatory service. Prefer native configuration and SDK calls, then
supported extensions, then a narrow upstreamable OpenShell change. A remaining
external dependency needs a concrete requirement OpenShell does not satisfy.

| Component | Proposed responsibility |
|---|---|
| User Computer | Per-user hosted agent/session, working copies and scratch; native Lore CLI and normal file/shell tools |
| Lore | Canonical versioned source/config/instructions/assets, branches, immutable revisions and native authorization/hooks |
| Artifact | Explicitly published inputs/outputs/datasets/deliverables and authorized direct byte transfers; not the runtime-image registry |
| Lore/OpenShell integration | Bind approved revisions and check results to native OpenShell resources and Veoveo contexts; reconcile source intent through the SDK |
| Component checks | Component-owned checks, isolated agent-free factory jobs when needed, and separate trusted image publication; no obligatory image build per source edit |
| OpenShell | Hosted Computer/build/check and service execution, lifecycle/restarts, templates, workspace access, resources/GPU requests, policy/advisor/prover, providers, service endpoints, sessions and diagnostics |
| Kubernetes foundation | Linux K3s/Cilium/Agent Sandbox, CloudNativePG, SeaweedFS, Lore, gateway and tunnel; independent of disposable environment ownership |
| OpenShell compute driver | Native Kubernetes driver for Linux application sandboxes; ordinary Mac source development/fixtures and external MPS remain separate |
| OpenShell credential driver | Store and resolve runtime credentials through its native encrypted database store |
| Configured identity provider | User login, MFA and OAuth grants/refresh; Keycloak locally, Entra for the reference, customer-selected providers elsewhere |
| Veoveo Hub | Application permissions, context selection, MCP catalogs/routing, narrowed delegation and Tasks |
| Remaining trusted bootstrap TLS | The retained `vv-identity-edge` terminates HTTPS only for local Keycloak, including its restricted public JWKS alias. Hub ingress and private service forwarding use native OpenShell |

Use OpenShell's CLI, SDK, TUI, logs and policy workflow. Do not add a separate
factory console, terminal relay, runtime inventory, supervisor, approval queue or
credential broker. Coordination records hold source/deployment relationships, not
a second copy of OpenShell's runtime state.

Helm/operators own the qualified Linux foundation; native OpenShell APIs own its
application sandboxes, without competing Helm inventories of runtime workloads.
Mac needs no Kubernetes cluster and retains local development fixtures. The next
source-backed workflow changes neither placement nor supervision ownership. Reuse
the existing Rust client interfaces for the small
[source-to-runtime integration](LORE_OPENSHELL_INTEGRATION.md#rust-interfaces-and-component-flow).

<a id="factory-sandboxes-and-service-deployments"></a>

## Computers, Factory Jobs And Service Deployments

The [consolidated platform plan](LORE_OPENSHELL_INTEGRATION.md#product-workflow-and-full-platform-plan)
is authoritative for the accepted product workflow and pending phase boundaries.
A hosted native OpenShell Computer holds the user's agent, working copies and
scratch. Hub/browser access uses the single public installation origin. Platform
MCP calls enter through Hub; the Computer's native Lore CLI connects to the private
Lore server over its admitted network. No public native Lore forwarding, extra
Lore/storage subdomain or local Lore host-port publication is required. Each service
enforces independent user grants; hosted Computers do not share an admin identity.
Human Lore login/renewal uses the [native device authorization decision](LORE_DIRECT_OIDC_PLAN.md#human-access-decision):
Hub supplies nonsecret setup, the user approves browser sign-in with the IdP, and
Lore owns credential storage and repository authorization. The earlier upstream `ec6bdc219575` baseline is historical; current maintained
source, native refresh and scoped Computer/browser qualification are recorded in
the canonical execution checklist. Those receipts do not qualify the new
environment workflow.

A factory sandbox is a bounded deterministic build/check job, normally for one
primary repository plus authorized dependencies. Fresh verification starts from an
immutable pushed Lore revision. The factory needs no OpenCode or model: the agent
fixes failures on its Computer and pushes again. Trusted checks and publication
establish verification independently when required; image provenance/publication is
a separate optional release path. Author jobs get neither deployment/registry
credentials nor Docker socket. A successful push does not itself establish a
successful build or deployment. The exact build-status contract and general trusted
image construction/distribution path remain pending qualification.

The historical author-in-factory path and small pre-push hook remain measured
component evidence. The hook checks designated factory identities against trusted
branch assignments; native permissions/protection remain authoritative. It is a
push-workflow guard, not complete branch isolation or human device-login acceptance.

A source-backed service sandbox reuses an admitted interpreter/toolchain image and
persistent workspace, with separately owned revision workers. An image-backed release
can still run a fixed binary and canonical command.
Both use native OpenShell resources, templates, policies and providers. They differ
in workload configuration, not execution APIs or security architecture. Closing a
Computer or completing a factory job does not stop the independently deployed service. Inherited
services are reused; overrides allocate only their changed workloads.

Use [one service deployment path](LORE_OPENSHELL_INTEGRATION.md#one-service-deployment-path)
for every configured environment: approved exact Lore revision, declared checks/build,
ready registered worker in an admitted OpenShell runtime, authenticated native
forwarding and composition-scoped application routing. Source changes reuse that
runtime; only template/toolchain changes require a workload change. OCI publication
is separate, not obligatory per edit. No deployment leaves the supervisor boundary because its name changed or
its branch was merged.

OpenShell owns main-process restarts and compute cleanup. Veoveo selects service
versions and enforces application permissions. The private MCP path uses native
authenticated `ForwardTcp` to sandbox loopback services. Do not expose those
services through unauthenticated browser URLs or rely on untrusted application code
to establish the boundary. Application tokens remain narrowed to the selected
service. The integration design records native scope limits and qualification.

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

Use native OpenShell access workspaces for runtime access. They are distinct from
environment composition and Veoveo execution contexts. OpenShell's Kubernetes driver
owns qualified Linux sandbox placement; Mac keeps normal development fixtures.
Environment definitions contain no competing backend inventory.
Reuse inherited services through authorized Hub routing.

## Personal Overrides And Hub Routing

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

Selection belongs to an authenticated Hub execution/MCP context, distinct from
business WorkContext and data authorization, so one person
can work on two experiments at the same time. Context selection is validated by the
Hub and propagated through trusted delegation; a caller-supplied environment
name is not authority. Agents, subagents and service-to-service calls inherit the
same selection without acquiring additional permissions. A shared service handling
calls from several contexts must preserve each call's context rather than changing
its global downstream selection.

The logical service identity and tool namespace stay unchanged. Composition maps
that identity to a distinct deployment/revision/endpoint; publishing another
instance must not globally replace every caller's route. Current registration
holds one current instance per slug, so multi-instance selection still needs
implementation. The current MCP route is `/mcp/{profile}`; a selected-environment
connection/session binding and its native client configuration must be qualified.
Do not assume OpenCode already has an environment picker or an implemented selector
endpoint. Start with explicit client connection configuration; ergonomics follow
transport qualification.

Discovery returns the tools and schemas of the selected versions. Catalog caches,
pagination, requests and Task routes must include the applicable context and
composition revision. Each operation captures a resolved composition; a long-lived
Task retains the deployment version that created it while a replacement runtime of
that same deployment can recover the work. A context change must not send an
existing Task to a different service version.

Base selection explicitly pins a composition revision or follows admitted updates
for new operations. No environment name selects this behavior. Every operation
records an immutable resolved composition, including inherited selections; an
existing Task keeps its captured version when a tracked base advances.

Merging a service branch does not itself redirect callers. A destination environment
must select the built revision, pass its configured checks and become ready.
Promotion is an authorized configuration change selecting tested exact source,
runtime and bindings in any permitted destination; there is no built-in dev-to-stage-to-release chain.
Users with explicit overrides keep them when their base advances.

## Workload Lifecycle

Resources, restart policy, retention and deletion behavior are configuration,
independent of environment names. For ordinary source updates, reuse the existing
OpenShell sandbox/PVC per owned override, not a fresh sandbox for every revision. Replica groups, autoscaling and coordinated fleet rollouts
are not established native capabilities in the reviewed API. Qualify a native
extension if required rather than adding a Veoveo supervisor or Flux.

Lore records desired composition; the integration submits native resource operations
and reconciles their IDs with the current revision. OpenShell owns process lifecycle,
restart policy and compute cleanup. Its `Ready` state confirms runtime/supervisor
readiness, not application health. Admit an MCP route only after service registration
and the application probe pass. A new source revision gets its own source directory
and child worker in that sandbox. Keep old workers and source untouched for captured
requests/Tasks until completion or explicit cancellation; interpreted imports must
not be rewritten beneath a serving worker either. Atomically publish the ready new
route and catalog for new operations. Failed candidate preparation keeps the
explicit last serving revision and visible desired/serving failure, not a silent
fallback to the base. The in-runtime build/launch contract and durable child-process
ownership still require implementation/qualification; native Exec alone does not
promise a background daemon survives caller disconnect. Prefer an existing language
runner/stable template entrypoint, with native OpenShell main-process recovery.
Desired-environment reconciliation creates/starts its owned runtimes; this does not
add autosleep or start-on-tool-call behavior.

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

Lore stores versioned desired state; secret values remain in native credential
custody. Artifacts hold explicitly published managed content, referenced by identity
without automatic duplication. Computer private session history is not canonical
project source, and permitted content can reach the user's agent/model provider.

The authoritative proposed definition is the
[`components` override sketch](LORE_OPENSHELL_INTEGRATION.md#environment-overrides-and-fast-source-activation).
The [Computer-local apply contract](LORE_OPENSHELL_INTEGRATION.md#computer-local-apply-and-lore-reconciliation)
is accepted for implementation: selected files can be applied without a Lore push
for each edit. The transfer/watch interface is not yet implemented or qualified.
The accepted definition is not an executable parser/current API. Use that one schema: stable environment
ID, display label, optional authorized base pin-or-explicit-follow, and a map of
logical component IDs to owned overrides. Omit = inherit; explicit unhealthy
override = unavailable; remove = return to base, or unavailable without one.
The environment file can live in an existing registered Lore workspace repository.
The accepted personal Lore workspace default holds versioned instructions and
environment definitions, with shared team repositories using the same contract.
First-use native provisioning/reuse, stable user/repository binding and Computer
checkout remain implementation work. Users can choose other authorized locations;
there is no automatic scratch/cache/history sync or new Lore permission scheme.

Service repositories declare source, tests, build/check/launch contracts and component
schemas. A reusable versioned runtime template supplies the interpreter/toolchain
and native policy/provider/data references. Component source either follows one
registered native Lore branch or pins an exact revision; selectors resolve to an
immutable source and composition for each operation. Base following advances only
inherited entries, and source pushes update only explicit branch followers. Names
carry no authorization; a merge/push does not redirect pinned or unrelated users.

Keep runtime settings in native OpenShell templates/specs and policy/provider
references. Credentials use its selected driver. The composition adds cross-system
selection, bindings and lifecycle. Only registered environment sources can deploy;
admission checks base access, quotas, targets and bindings against policy outside
the editing branch. A manifest cannot grant authority or replace the trust root.

Validate workload definitions with OpenShell's schemas and admission rules. Capture
template contents/provenance, policies, bindings and image digests in the resolved
lock; a mutable template name alone is not a deployment identity. Agents can propose
changes but cannot attach arbitrary providers/volumes or edit trusted supervisor
images. Prefer a small integration in an existing trusted process to a dedicated
factory microservice.

Use Lore's native hooks and notifications to connect source changes to OpenShell
checks and environment reconciliation. A compiled Lore hook can enforce mutation
policy; notification delivery alone is not authoritative. Respect OpenShell's
interceptor phases and native authorization. The
[integration design](LORE_OPENSHELL_INTEGRATION.md#lore-hooks-and-branch-lifecycle)
defines the extension-build and recovery constraints.

The proposed thin module in Hub's existing trusted process treats Lore notifications
as hints, rereads authoritative revisions and periodically reconciles. It fetches
exact source into separate revision directories and uses scoped native execution
for incremental builds/probes. Rust workers execute unique build-specific actual paths, such as
`/sandbox/builds/<build-id>/service`, under narrow admitted binary patterns, preserving
native TOFU identity pins even when the same revision is rebuilt with different output.
No OpenShell security change, image publication, Pod/sandbox replacement or Hub
restart is required for ordinary source changes. Template/toolchain changes remain
separate workload operations. Existing native lifecycle owns recovery; retaining
old/new workers across active operations is part of the small launch-contract work,
not an assumed detached Exec capability. Preserve the explicit verified Git source
handoff while Cargo dependencies require Git pins. No bidirectional Git/Lore sync,
registry proxy, parallel scheduler or new release system is introduced. Reject late
activation after supersession/deletion, and do not replay non-idempotent mutations.

## Data And Infrastructure Bindings

Each dependency is either owned by the environment or an authorized reference to an
existing resource. Owned disposable databases, buckets and services are removed
with the environment; shared resources are never deleted by a consumer's teardown.
Durable environments declare retention explicitly.

OpenShell can run long-lived processes and attach admitted persistent storage.
Prefer that same path for compatible PostgreSQL, SeaweedFS and other service
instances; qualify persistence, protocol access, backup and recovery first. It is
not itself a database, object store or database operator. Shared host storage and
identity/Lore/OpenShell bootstrap remain protected resources. Bootstrap cannot
require a disposable sandbox whose deletion would prevent recovery. Do not assume
the credential proxy mediates every database authentication protocol.

Routing and data isolation are separate choices. A personal Media deployment can
use a private database and bucket, but a call from it to inherited Dev Artifact
still uses Dev Artifact's configured state. A shared service instance cannot switch
its database pool or bucket globally according to whichever user called last.
When an experiment needs an entirely isolated workflow, include the dependent
services and their compatible state in the preview.

Treat core identity, Tasks and audit state coherently where services share the
kernel database. Pair artifact metadata with the object storage it describes.
Changing a database binding requires qualification of that composition; this is
not implemented by adding an arbitrary connection string to the Hub. Reverting
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
Hub advertises the configured authorization server through protected-resource
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

Configure separate audiences and client registrations for OpenShell, the Hub
and Lore as their protocols require. Browser SSO can reuse the identity provider's
session; an OpenShell access token is not a universal Veoveo bearer. Identity is
keyed by trusted issuer and subject, with explicit cross-provider mappings. A test
issuer cannot grant access to production resources merely by copying a subject,
email, group or environment label.

Veoveo retains application-specific permissions, environment/context admission,
MCP discovery and routing, constrained server-to-server delegation and Task ownership.
Factory management and private service connectivity use OpenShell's native APIs.
Veoveo makes application decisions and sends traffic through its authenticated relay.
Its existing short-lived upstream tokens encode evaluated permissions, actor and
context; these are distinct from human login/refresh tokens. Keep that narrow
application authority unless a maintained replacement proves the same contracts.
Lore's factory path uses native OIDC repository grants issued by the installation
IdP and renewed/injected by OpenShell. Desktop acceptance is withdrawn; its
authentication adapter is retired after local [direct credential acceptance](LORE_DIRECT_OIDC_PLAN.md). No new Veoveo machine-token service or signer is required. OpenShell
management credentials remain separate from Lore resource credentials.

The current Hub hosts OAuth authorization, refresh and session storage itself.
Migration must qualify MCP client discovery/registration, issuer token formats and
claim mapping, rotation/revocation, and Task compromise semantics. In particular it
currently requires RFC 9068 `at+jwt` access tokens; accepting Entra is not just changing
an issuer URL. Preserve the distinction between ordinary logout, which leaves an
authorized running Task alive, and compromised credentials, which end delegation.
Use the configured IdP and existing identity libraries through supported interfaces,
with one authoritative verified identity and no caller-forgeable forwarded headers.
Do not add a second custom SSO broker or make OpenShell an identity-provider fork.
Retire replaced OAuth routes and storage after qualification rather than retaining
a permanent legacy mode. The Hub's hosted MCP authentication remains until that
separate qualification passes; the direct-IdP Lore cutover and retirement of the
Desktop adapter/signer are already complete locally.

## Agent Isolation And CUDA

Any coding or service task may need CUDA. Request it through OpenShell resource
fields and the Docker driver's NVIDIA CDI support on Linux. The selected runtime
is OpenShell's Docker driver on Mac and Linux, with CUDA on Linux. This uses a
separate trusted supervisor and fenced workload. The former bare Compose author
containers are retired; the native Mac factory path is locally qualified. Linux
isolation and CUDA remain separate acceptance work. See
[native runtimes](https://docs.nvidia.com/openshell/v0.1.4/how-it-works/sandboxes/runtimes).

OpenShell is the execution platform; migration remains gated on qualification.

The original v0.1.4 review found HTTP/1.1-only proxying. The maintained native
HTTP/2 supervisor path now qualifies local Lore gRPC mediation and credential
custody. General external UDP is still denied, and native
Lore QUIC requires a separate mediation and credential-custody design. QUIC is an
optional measured optimization; gRPC remains acceptable. See
[transport integration](LORE_OPENSHELL_INTEGRATION.md#qualified-native-grpc-mediation)
and [QUIC](LORE_OPENSHELL_INTEGRATION.md#optional-quic-storage-transport).
Prove actual CUDA execution before migration. GPU device visibility alone is not a
CUDA test. Shared kernels and GPU drivers remain part of the isolation model;
this candidate makes no VM-grade isolation claim.

Factory sandboxes and untrusted build workers receive source, toolchains and permitted
network access, but no Docker socket, host credentials, cluster administration or
production secret files. Provider credentials remain with OpenShell's trusted
supervisor and credential driver. A new bridge requires a demonstrated native
limitation and coordinator decision; it is not an approved fallback for unfinished
Hub application ingress.
Service sandboxes use the same provider-custody rules. A real secret deliberately
delivered in process environment remains readable by that code; OpenShell launching
the process does not hide it.

## Runtime Secrets

Use native OpenShell provider profiles, attachments, refresh and credential drivers.
The runtime receives only the material its approved profile permits. Ordinary API
credentials remain with the trusted supervisor and selected store. No second secret
service is required. Use and qualify the native encrypted database credential driver;
protect and back up its operator-controlled state using upstream mechanisms.

Lore stores non-secret configuration and provider references. Human login state
belongs in the appropriate client/native credential custody, outside repositories
and build/check or service workloads. Qualify that custody for hosted Computers.
Private local `.env` files are not published configuration; `.gitignore` prevents
commits, not reads. Shared human `.env` distribution is outside this focused plan.
Protect the selected native store and its encryption key through operator-controlled
bootstrap and recovery; do not build a Veoveo vault or mandate a new secrets service.

## Existing Foundation And Qualification

The macOS hard cut has removed the old Compose factory/application launchers.
OpenShell 0.1.4 now supplies native execution, credential mediation and private MCP
forwarding; the maintained supervisor and factory Lore CLI contain narrow transport
and auth patches. The Lore server adds a small native pre-push hook for trusted
factory assignments; ordinary authorization and transport remain unchanged. Trusted infrastructure still
awaits migration to native workloads. Keep only the necessary identity bootstrap
outside OpenShell. See [execution status](OPENSHELL_HARDCUT_PLAN.md) and the
[installation design](../veoveo-template-installation/DESIGN.md).
The former Desktop catalog result is historical; graph/diff and automatic
expired-session recovery are withdrawn requirements. Direct IdP Lore credentials,
native renewal, source withdrawal, applied binding-removal/detach and termination
are locally qualified, and the adapter/signer/ingress are retired. Entra and
Linux/CUDA are not qualified by the local checks. The local Hub → Time integration,
exact Git/Lore Time source handoff, bounded factory build and Time deployment from
that Lore revision now pass. Private native Artifact also passes signed transfers,
permissions, quotas and retained-object restart checks through Hub, using the
existing PostgreSQL and SeaweedFS with a bucket-scoped service credential. The
Artifact slice builds from pinned Git source; the Lore/factory proof is still
Time-specific. The private synthetic-provider Media slice and separate real
WaveSpeed polling run also passed locally, within their recorded scope. Linux
reference qualification is in progress; the dated execution checklist is authoritative
for its deployed gates. Automatic source-to-deployment remains pending.

The Hub currently selects the newest registration per service slug, and its
[registration snapshot](../veoveo-hub/crates/veoveo-hub/src/registration/snapshot.rs)
holds one routed entry per slug. Multiple isolated environment selections require
changes to registration identity, routing, catalogs, delegation and Task ownership.
They are not supplied by deploying additional containers alone.

The general Lore-to-OpenShell source adapter and environment overrides remain
unimplemented candidate work. The scoped Linux K3s foundation/Computer acceptance
has separate qualified receipts; it does not qualify this source-backed loop. Existing
installation contracts also need explicit changes to
represent Lore revisions and resolved environment compositions.

The [qualification gates](LORE_OPENSHELL_INTEGRATION.md#qualification-sequence)
retain the native runtime, custody and recovery boundaries. The active reference
Linux/webhook goal and its remaining gates are tracked in the
[execution checklist](OPENSHELL_HARDCUT_PLAN.md#reference-linux-deployment-and-signed-wavespeed-webhook-goal).
The accepted future product follows the pending
[agent-operated adoption phases](OPENSHELL_HARDCUT_PLAN.md#agent-operated-platform-adoption-plan):
environment selection/overrides and the reusable-runtime source loop first.
Factories remain independent deterministic check capabilities, and general trusted
image publication remains optional/separate.
Local prepared-Time factory-model evidence remains historical, not the future job
architecture. The existing hook is not complete isolation against low-level storage
APIs. Forks may close verified gaps while preserving native contracts; see
[fork policy](LORE_OPENSHELL_INTEGRATION.md#extension-builds-and-fork-policy).

The service-selection acceptance slice is one base composition and two private overrides
of one MCP service, with arbitrary labels. Rename all three labels and repeat without
code changes; exercise both pinned and tracking bases, reject inheritance cycles,
and promote to an arbitrarily named authorized destination. Verify that each
override replaces only that service; inherited services remain from the base;
another person's environment is invisible unless shared; discovery
and downstream calls preserve selection; failed previews never silently fall back;
and deleting one preview leaves the base and the other preview intact. Include a
long-lived Task and a native runtime restart to check version ownership and recovery.

Before claiming this workflow, settle typed environment selection, multi-instance
registration, child-worker ownership, active-Task retention and restart reconciliation.
Route selection alone does not establish data isolation or image distribution.
Lore, OpenShell and their trust/storage bootstrap survive environment deletion.
Remove replaced Compose/Envoy/factory paths after qualification; there is one
supported OpenShell execution path, with no permanent legacy mode.
