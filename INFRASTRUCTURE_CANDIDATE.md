# Infrastructure Candidate

Status: leading infrastructure candidate, recorded on 2026-10-16. The direction is
accepted for further design and qualification; it is not a completed migration or a
replacement for the recorded runtime status in the
[Repository Split Plan](REPOSITORY_SPLIT_PLAN.md).

Veoveo should let users and coding agents create, change, test and promote service
environments through ordinary Lore branches and configuration files. Several users
can run different versions of the same MCP service concurrently, while each user
continues to use the other services from a selected shared environment.

## Infrastructure Responsibilities

| Component | Proposed responsibility |
|---|---|
| Upstream Lore | Service source, environment configuration, branches, reviews and immutable revisions; no changes to Lore's regular operations |
| Veoveo environment controller | Authorize environment changes, connect Lore revisions to CI results, create and remove deployment declarations, and associate deployments with gateway contexts |
| CI | Validate configuration, build and test code in isolated workers, and publish images and deployment bundles tied to exact source revisions |
| Helm | Package each component and expose its supported configuration values |
| Flux | Reconcile approved deployment declarations and configured resource cleanup |
| Kubernetes | Schedule workloads, maintain replica counts, replace failed instances and manage rollout readiness |
| k3d | Run the development Kubernetes cluster on the Mac |
| K3s | Run the Linux reference installation, including NVIDIA GPU workloads; customer installations can use their own compatible Kubernetes cluster |
| OpenShell | Candidate runtime for factory sandboxes where untrusted agents edit, build and test; Kubernetes, Envoy and CUDA integration still require qualification |
| Envoy | Enforce permitted network routes and supply protected credentials to authorized upstream requests |
| Veoveo gateway | Authenticate and authorize callers, resolve their selected service composition, expose its MCP catalog and route calls to healthy instances |
| OpenBao | Persistent shared secret storage and authorized developer retrieval of development configuration |

Use the existing Kubernetes, Helm, Flux and service diagnostics. This candidate does
not introduce a log aggregator, a replacement scheduler or a general infrastructure
programming language. The Veoveo controller owns the product-specific decisions;
existing controllers own workload reconciliation.

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
The factory control plane is a separate trusted service from these worker sandboxes.

Use OpenShell to contain factory work after qualification. Dev, staging and stable
are service compositions, not three OpenShell sandboxes. A factory sandbox can
start temporary test processes and fixtures, but it does not host an entire shared
environment or carry that environment's credentials. Request GPU resources for a
factory sandbox when its work needs CUDA, independently of service runtime GPU needs.

Deploy each service as its own workload using its runtime image. Each environment
that owns an instance has a distinct deployment; personal previews add only their
overrides. Replicas and tightly coupled supporting containers follow that workload's
requirements. Keeping services separate allows a Media change to deploy or restart
without restarting Time and Artifact. Agent-authored preview services still receive
restricted network access, resource limits and appropriately scoped credentials.

OpenShell's documented
[sandbox lifecycle](https://docs.nvidia.com/openshell/v0.1.4/how-it-works/sandboxes/runtimes)
is managed by its own gateway. Keep that responsibility for factory sandboxes
separate from the Veoveo gateway's MCP routing and Kubernetes service deployments.

## Environments And Instances

An installation has shared environments such as `dev`, `staging` and `stable`.
These names are installation choices. Each shared environment defines a complete
service composition and explicit data, storage and identity bindings.

A personal preview selects one shared environment as its base and overrides only
the services or bindings involved in the experiment. It does not copy every
inherited service. A factory sandbox is a separate workspace for editing and testing
code; it is not another name for the deployed `dev` environment.

For a single service enabled in all three shared environments, with one replica in
each, there are three baseline application instances. Two personal versions of that
service add two preview instances. With ten services enabled in all three
environments, the same assumptions produce thirty baseline application instances,
plus previews. Databases, storage, infrastructure, factory sandboxes and additional
replicas are separate from this count. A Pod can also contain more than one
container, so environment names do not imply an exact container count.

Use a namespace for each shared environment and each personal preview's owned
workloads. Reuse inherited services through authorized gateway routing. A namespace
does not provide hostile-code isolation on its own; sandboxing and network and
identity policy remain necessary. See
[Kubernetes multi-tenancy](https://kubernetes.io/docs/concepts/security/multi-tenancy/).

## Personal Overrides And Gateway Routing

The proposed resolution rule for a service is:

1. Use the deployment explicitly selected in the workspace's personal overrides.
2. If there is no override, use that service from the selected base environment.
3. If neither defines the service, it is unavailable in that context.

An existing override that is unhealthy is unavailable. It must not silently fall
back to the shared service, another person's preview, staging or stable. Removing
the override explicitly restores the base selection.

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

The candidate default is to follow successful updates to the base environment for
new operations, retaining personal overrides. Each resolved composition is recorded
with immutable revisions. A reproducibility run can pin its base revision instead
of following updates.

Merging a service branch does not itself redirect other users. Its built revision
becomes shared dev only when the dev environment selects it, its checks pass and the
deployment becomes ready. Users inheriting that service then receive the new shared
dev version for new operations. Users with an explicit override keep their selected
version. Promotion from dev to staging and stable selects tested immutable artifacts
through each environment's deployment policy.

## Workload Lifecycle

For the first implementation, keep enabled shared services running with their
declared minimum replicas, normally at least one. Keep an admitted preview running
while its environment branch remains active, until an explicit stop or deletion.
Do not introduce automatic sleeping, gateway-triggered starts or idle timers in the
first slice. Resource quotas can reject or leave work pending; a GPU request cannot
be satisfied by routing to an unrelated deployment.

The Veoveo controller records whether an environment should exist. Flux maintains
its declared resources. Kubernetes maintains the running workloads. The gateway
uses deployment identity, registration and readiness to select available replicas;
it does not become a second process supervisor.

On branch deletion, stop accepting new work for the preview, drain or explicitly
cancel its Tasks according to the configured policy, revoke its access and remove
its owned resources. Retained data survives according to its declaration. Preserve
clear unavailable results for contexts still selecting a deleted preview until they
explicitly remove that selection. A temporary Lore outage or a missed event is not
evidence of branch deletion. Reconciliation reads current source state and uses
stable branch/environment identities so reusing a branch name does not adopt an
earlier environment's resources.

## Configuration And Lore Integration

Service repositories own source, tests, images, charts and component configuration
schemas. Environment repositories compose services and dependencies. Normal agent
work edits service source and a small schema-validated environment file describing
the base, overrides, source selections, resource requests, bindings and lifecycle.
The exact schema remains to be designed; examples discussed so far are illustrative.

Keep service settings close to their existing Helm values and schemas. Helm supports
[JSON Schema validation of values](https://helm.sh/docs/topics/charts/#schema-files).
Agents can propose chart changes when deployment behavior needs to change, subject
to the permissions and checks for that component. They do not receive cluster
credentials, arbitrary privileged deployment authority or unrestricted secret
references by editing a file.

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

## Agent Isolation And CUDA

Any coding task may need CUDA, not just model inference. The candidate uses Linux
GPU workers with the NVIDIA runtime, while the Mac hosts local development work.
[K3s documents NVIDIA runtime integration](https://docs.k3s.io/advanced#nvidia-container-runtime).
Keep GPU scheduling separate from deciding which service version a caller sees.

OpenShell is the leading sandbox candidate, not a qualified replacement yet. Prove
the chosen runtime's integration with Kubernetes, Envoy credential injection, Lore
gRPC and actual CUDA execution before migration. GPU device visibility alone is not
a CUDA test. Shared kernels and GPU drivers remain part of the isolation model;
this candidate makes no VM-grade isolation claim.

Factory sandboxes and untrusted build workers receive source, toolchains and permitted
network access, but no Docker socket, host credentials, cluster administration or
production secret files. Provider credentials remain with trusted consumers such
as Envoy. Any credential delivered to an agent-authored service can be read by that
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

The first acceptance slice is one shared dev composition and two personal previews
of one MCP service. Verify that each preview replaces only that service; inherited
services remain dev; another person's preview is invisible unless shared; discovery
and downstream calls preserve selection; failed previews never silently fall back;
and deleting one preview leaves the base and the other preview intact. Include a
long-lived Task and a replica restart to check version ownership and recovery.

Then qualify the GPU sandbox with an actual CUDA kernel and denied secret/host
access, and qualify developer secret login and retrieval using native OpenBao tools.
Before broader migration, settle the environment schema, baseline update policy,
state isolation boundaries, active-Task deletion policy, OCI registry, and backup
and unlock arrangements for persistent infrastructure. Lore, the controller,
identity bootstrap and the secret store must survive preview deletion.
