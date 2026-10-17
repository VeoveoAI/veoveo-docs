# OpenShell Hard-Cut Plan

Status: proposed execution order, recorded on 2026-10-16. The user requests removing
the old execution path first, then implementing and testing the replacement. This
document does not claim that runtime cleanup or migration has occurred.

The target is [Lore and OpenShell integration](LORE_OPENSHELL_INTEGRATION.md): one
OpenShell Docker-driver path on Mac and Linux, native Linux CUDA, existing Rust client
interfaces and Lore-managed environment definitions. No Kubernetes, Helm, Flux,
alternate runtime or compatibility mode. Planned downtime is preferable to maintaining
two runnable stacks. Preserve source and durable data, not the old launch machinery.

## Observed Starting Point

The Mac inventory contains 22 running `vv-*` containers. It includes four `vv-dev-*`
author containers, `vv-review`, `vv-autonomy-edge`, `vv-autonomy-tokens`, the Veoveo
gateway and three MCP service containers. Lore, PostgreSQL, SeaweedFS, permanent
Keycloak and Desktop identity/TLS infrastructure are also running.

No Kubernetes contexts or cluster containers were visible in the local inventory.
OpenShell CLI 0.1.3 is installed, with a registered local mTLS endpoint; registration
does not establish that its gateway is running. The design review used 0.1.4 and its
HTTPS/OIDC Rust SDK. Rebuild the selected bootstrap and align versions/authentication;
do not assume the old gateway registration satisfies the new SDK contract.

All twelve local Git checkouts were clean, but eleven had unpublished commits.
Author-volume contents, anonymous volumes and the Linux host still need inventory
before deletion. Unattached volumes are not automatically disposable.

## Execution Order

### 1. Preserve Work And Identify Deletion Targets

Record repository HEADs and preserve unpublished commits. Capture unpushed Lore
changes and files from the four author volumes before deleting those volumes.
Create consistent, access-restricted backups of Lore repositories, PostgreSQL,
SeaweedFS, identity/session state, signing material and required local configuration.
Record exact container, network, volume and image ownership on Mac and Linux.

This is a recovery checkpoint, not a test campaign or a second supported runtime.
Delete only positively identified Veoveo resources. Do not use global Docker prune,
delete unrelated host tools/clusters, or infer ownership from an unused-volume list.

### 2. Cut The Old Execution Path

Apply this inventory-scoped cut on both hosts before qualifying the replacement.

Stop and remove `vv-dev-gateway`, `vv-dev-time`, `vv-dev-artifact`, `vv-dev-media`,
`vv-review`, `vv-autonomy-edge` and `vv-autonomy-tokens`. Remove their old launch
profiles, provisioning/renewal commands and isolated Docker-network topology from
the installation template. Remove captured disposable author caches/volumes and
obsolete images by the recorded inventory.

Stop and remove the Compose-launched application gateway and MCP runtime containers.
Remove the `runtime` launcher and `sleep infinity` tooling-container delivery model.
Preserve any state they own until its contents and replacement storage mapping are
accounted for. Retire obsolete test clusters and gateway registrations if found.

Lore, the configured identity provider, PostgreSQL and SeaweedFS remain required
bootstrap/data services. Keep their data and the Desktop auth/TLS functions that
OpenShell does not replace. Strip agent/inference proxy responsibilities from old
Envoy configuration; retain only demonstrated bootstrap or Desktop ingress needs.
Move Lore's server out of the removed `autonomy` profile. Bootstrap may use a small
Compose file; it must not remain an alternate author or MCP workload launcher.

Update repository instructions and documentation in this same cut. Current rules
requiring `vv-dev-*`, Envoy agent mediation and unconditionally unmodified upstream
builds are superseded by the accepted OpenShell/extension design. Remove dead files
and tasks rather than keeping disabled legacy profiles. Keep useful component code,
OpenCode configuration, Lore data and focused probe implementations.

### 3. Implement The Smallest New Path

Install one pinned OpenShell release/build with its matching CLI and Rust SDK,
Docker driver, HTTPS/OIDC, native credential store and protected persistent state.
Disable telemetry as in the existing qualification setup. Configure one factory
template with OpenCode and the normal Lore CLI. No model call is needed to validate it.

Implement the known Lore gRPC credential-mediation gap through the native OpenShell
extension/patch path. Keep ordinary Lore operations unchanged. Hold author workloads
closed until mediated access works; do not resurrect the old autonomy stack as a
fallback. Reuse upstream facilities for credential refresh and policy enforcement.

Put the source-to-runtime integration in an existing trusted Veoveo process. Use
native Rust clients for Lore notifications/authoritative reads and OpenShell job and
service requests. Start with one prebuilt deterministic MCP fixture, one environment
definition and one immutable revision/image mapping. Use authenticated `ForwardTcp`
and application permissions for access. The trusted management credential never
enters author or agent-controlled service workloads.

### 4. Run Focused Acceptance On The New Path

Run these checks after the cut, as each new boundary becomes runnable. A failed check
blocks that boundary; fix it in the selected path and rerun the affected checks.

1. **Sandbox and Lore:** a deterministic process runs a normal Lore read and bounded
   push. An allowed repository works; a forbidden repository/branch is denied. Prove
   that the workload cannot read real credentials, reach control-plane administration
   or bypass mediated egress. Verify renewal without exposing tokens.
2. **Service and lifecycle:** the tiny MCP fixture answers through authenticated native
   forwarding. An unauthorized workspace is denied. Verify one stream/cancellation,
   process restart, gateway interruption/recovery and retained state where applicable.
3. **Source to service:** one push selects an exact revision, runs a small fresh check
   job and creates a service version. A base plus two private overrides demonstrates
   inherited service routing, isolation and no silent fallback. Deleting an owned
   branch removes only its resources and respects a pinned active Task/retention rule.
4. **Linux and CUDA:** bring up the same execution definition on the Linux host.
   Run the applicable boundary checks and one tiny CUDA kernel with a checked result;
   `nvidia-smi` alone does not satisfy CUDA acceptance.

No inference session, agent coding exercise, endurance run, broad unrelated component
suite or requalification of the deleted stack belongs in this first pass. Keep
format/build checks and focused auth/policy regression tests for changed code. Broaden
testing only for changed behavior, failures or a concrete unresolved requirement.

### 5. Complete Adoption And Remove Debris

Move the actual MCP components onto the proved native workload definition; verify
registration and one relevant operation for each. Finish the generic composition
bindings and immutable build/publication path using the same runtime interfaces.
Keep build/publish credentials outside author-controlled jobs and never mount a host
Docker socket into them. Use an isolated builder; do not equate a prebuilt-fixture
pass with qualification of arbitrary agent-authored builds.

Recheck Lore Desktop login/catalog and existing data access after any changed ingress
or identity boundary. Keep remote graph/diff and automatic reauthentication recorded
as unresolved until separately demonstrated. Do not claim those passed from this cut.

Delete remaining obsolete images, networks, captured disposable volumes, scripts and
legacy-only branches after accounting for their work. Commit coherent changes in each
affected repository and update installation pins. Report local commits and publication
status separately. Finish with an inventory showing the old execution path cannot be
launched and every managed author/MCP workload uses OpenShell.

## Repository Work

| Repository | Cutover work |
|---|---|
| `veoveo-template-installation` | Remove old execution profiles/provisioning; keep small bootstrap; add pinned native OpenShell setup and non-secret workload/provider references |
| `veoveo-service-gateway` | Remove autonomy token-worker duties; add thin Rust source/runtime integration, composition selection and native authenticated forwarding |
| `veoveo-core`, `veoveo-sdk-rust` | Change only contracts needed for context propagation, authority and Task version ownership; retain existing application semantics |
| MCP repositories and `veoveo-template-mcp-rust` | Canonical runtime image/command and factory tooling consumed by OpenShell, without a second launcher |
| `veoveo-qualify-openshell` | Reuse deterministic probes for focused new-path acceptance; distinguish upstream and patched-build evidence; replace obsolete instructions |
| Lore/OpenShell source | Make only demonstrated extension/security/transport changes; pin and record any maintained patch |
| `veoveo-service-lore` | Retain required Desktop protocol adaptation; change only affected integration boundaries |
| `veoveo-docs` | Record the actual cutover inventory, completed checks, remaining gaps and new operating instructions |

The first milestone is deliberately small: the old author/runtime launchers are gone,
one OpenShell factory can safely use Lore, and one private MCP service works through
the new path. Full arbitrary builds, composition behavior and Linux CUDA have explicit
follow-on acceptance; none is claimed complete by that first milestone.
