# Direct Lore Credentials For Users And Workloads

Historical factory status: implemented and locally qualified on 2026-10-17. Direct IdP issuance,
native OpenShell renewal/injection and native Lore authorization are deployed.
The Desktop adapter, signer/manual-token helpers and Desktop-only ingress are
retired. Historical signer results remain distinct from direct-issuer evidence.
The execution record is [OPENSHELL_HARDCUT_PLAN.md](OPENSHELL_HARDCUT_PLAN.md).

Current direction, accepted 2026-10-19: the hosted Computer goal now uses Hub as
the issuer and repository-assignment authority, with Entra supplying human sign-in
only. The [Hub-issued native Lore design](LORE_OPENSHELL_INTEGRATION.md#hub-issued-native-lore-credentials)
and [HLI execution sequence](OPENSHELL_HARDCUT_PLAN.md#hub-issued-native-lore--accepted-goal-extension)
supersede direct IdP issuance for that new workflow. The local factory receipts
and recipes below remain historical evidence until their deliberate cutover.

The maintained native client now includes the scoped refresh fix; statements below
about missing upstream refresh describe the inspected upstream baseline. Real human
login and renewal remain deployed acceptance work.

### Historical Human Authentication Direction
Human authentication was separately authorized on 2026-10-18. Updating Veoveo to
current upstream Lore and removing superseded local work is now authorized. Human
CLI access remains unqualified. The user clarified that this work must preserve
ordinary Lore access and its existing permissions; it does not authorize a new
platform permission policy. The factory evidence does not qualify this path.

## Human Access Decision

The initial product gives each user a hosted native OpenShell Computer with
OpenCode, Lore CLI and Hub configured. The public entry is the installation's
Hub/browser origin. Hub supplies trusted, nonsecret onboarding information for the
Computer's private Lore endpoint, available repository IDs/URLs and branches, and
supported CLI setup instructions. The agent runs the native Lore CLI over the
Computer's admitted private network; Hub does not forward the Lore protocol.
Lore obtains its own credentials directly from the configured identity provider;
the Hub bearer is never a Lore credential. The existing Hub onboarding/discovery
surface still needs implementation and permission acceptance in adoption phase A.
Here, direct credentials means IdP issuance and Lore validation. Public native
gRPC ingress, Hub Lore forwarding and local Lore host-port publication are outside
the selected initial product, as recorded in the
[single-origin decision](LORE_OPENSHELL_INTEGRATION.md#one-installation-address).

Use the standard OAuth device authorization grant for the first native human
client. The CLI displays the identity provider's verification URI and user code;
the user approves that request in their browser, including any required MFA. The
flow works inside the hosted Computer without routing a browser callback to the
agent's host. The agent never needs the user's password or a public-client
secret. This follows Lore's approved OIDC proposal's interactive/headless grant
choice; it replaces the earlier placeholder browser-code registration for this
new human scope. Device codes, access tokens and refresh tokens are not diagnostics.

Adopt upstream Lore `ec6bdc2195753b50f70696d367788b4bc8d08964`, whose native client
implements OIDC discovery, device authorization, authentication-path selection and
repository token exchange. Our previous `cb2c191f` baseline predates that client
support. Remove the unqualified local OIDC prototype, including its per-repository
login coupling and custom metadata field. Use upstream's native authentication
interfaces and encrypted credential store. At the selected upstream revision,
`OidcAuthentication::refresh_authentication` still returns `NotSupported`; native
automatic refresh and a complete human credential lifecycle are open gates.
The upstream interactive flow is device authorization. Browser authorization code
with PKCE is a separate possible client improvement, not an implemented feature
or a requirement added to this upgrade.

Native identity login must be independent of repository selection. Obtain the
authorization needed for a repository through Lore's native authorization model
when an operation needs it. Do not require separate sign-in for each repository or
restrict normal name lookup, inspection or branch selection to simplify credential
integration. Keep factory `lore-repo-*` scopes and their native OpenShell providers
intact. Native repository verification and branch protection remain authoritative.

For hosted acceptance, configure the native Lore TLS endpoint privately and admit
only the required network path from the user's Computer. No host-port publication
or public native Lore endpoint is required.
Preserve Lore's issuer-backed token-recipient checks for the actual service
destination, including advertised endpoints and port overrides. Browser/Computer
session access and native Lore authentication remain separate qualification gates.

Authentication and authorization are distinct. Every user should be able to sign
in to Lore and use the repositories, branches and operations that native Lore
permits. A denied branch write must not remove permitted inspection, branch
selection or other access. Do not infer Lore exclusion from a user's platform role,
whether they code, or whether they can push to a particular branch.

The configured native authorizer consumes repository claims issued by the IdP.
Issuance must reflect the installation's intended native Lore rights, without a
second Hub permission matrix or invented author/non-author categories. Human claim
issuance and provider support for native repository exchange remain unqualified.
The proposed author-only grant provisioner was withdrawn without being applied.
On the qualified factory baseline, ordinary repository access includes unprotected writes; the empty
`permission` array is not a read-only role. Preserve native branch protection and
do not claim per-human branch isolation from the existing factory push hook.

For complete human acceptance, keep identity credentials and repository authorization distinct in the native
store, with the appropriate issuer, client, subject and resource bindings. Normal
clone/sync/push must use and refresh those credentials as needed. Save access and
replacement refresh material together under the native store lock;
parallel CLI processes must not independently consume the same rotating token.
Logout clears the scoped local session and requests provider revocation where
supported. Failed or revoked refresh requires sign-in again. Role removal,
refresh-session revocation and logout do not retroactively invalidate an already
issued self-contained access token; report its measured expiry/leeway window.

Hosted Computers use the same per-user grant contract and keep native credential
state private and persistent. Their session access, storage isolation and credential
lifecycle still need hosted qualification. A local Keycloak proof does not qualify
Entra or another customer issuer; each must support and pass the same direct-grant
and claim contract. Factory credentials remain independently owned and revocable.

Acceptance requires normal users with native Lore rights: real browser-approved
login; permitted inspection and branch selection despite a denied protected-branch
push; denial only for repositories/operations native Lore denies; native
clone/sync/commit/push with exact published revision and bytes; refresh
after expiry; concurrent renewal; logout and revoked refresh; separate Hub/Lore
audiences; and unchanged explicit-token factory behavior. Component fixtures,
deployed issuer/server probes and any final agent acceptance are separate evidence.

References: [Lore's approved OIDC proposal](../lore/docs/proposals/2026-08-20-oidc-oauth2-authentication.md),
[pinned native OIDC implementation](https://github.com/EpicGames/lore/blob/ec6bdc2195753b50f70696d367788b4bc8d08964/lore-transport/src/auth/oidc/mod.rs),
and [OAuth device authorization](https://www.rfc-editor.org/rfc/rfc8628).

## Qualified Factory Decision And Ownership

Historical component evidence only. The sections below retain the prior
agent-in-factory procedure for interpreting its receipts; they are not the initial
product rollout or instructions to resume that qualification. Hosted Computers
own user-agent sessions. Future factories are planned deterministic build/check
jobs with no OpenCode or model required.

The user withdrew official Lore Desktop as an acceptance requirement. This
supersedes D45/L8 and the former Desktop completion requirements in component
instructions. Retire the Desktop authentication adapter after qualifying this
replacement; do not extend it with a machine-token endpoint. Desktop graph/diff,
catalog browsing and automatic sign-in recovery are withdrawn gates, not passed
tests. Interactive host Lore login is not part of this factory credential slice.

| Responsibility | Owner |
|---|---|
| Factory identity, client credential, bounded repository claims, token issuance | Installation's IdP; permanent Keycloak locally |
| Client-secret custody, token acquisition/renewal, opaque references, header injection | Native OpenShell providers, refresh worker and supervisor |
| Signature, issuer, audience, expiry and repository authorization | Native Lore OIDC/resource-grants authorizer |
| Normal-push assignment guidance | Existing Lore `BranchPush` pre-hook and trusted assignment configuration |
| Immediate workload termination | Native OpenShell sandbox stop |
| Approved repo/branch to subject/provider/sandbox binding | Trusted installation configuration; later source-to-runtime integration |

The factory uses ordinary Lore commands with its existing opaque access-token
reference and explicit identity. OpenShell calls the IdP token endpoint using
`client_credentials`, stores the real access token, and injects it only into
admitted Lore requests. Lore validates the IdP signature directly. Lore does not
trust an OpenShell management bearer or need a Veoveo-issued replacement token.

The minimum bridge is provisioning/configuration: an approved repository and
branch map to an IdP subject, native provider attachment and hook assignment.
There is no running Veoveo token broker, refresh daemon, signing service or new
secrets store in this path. Application MCP authorization and Task delegation are
separate; this change does not remove those responsibilities from the MCP gateway.

## Hosted Computer Native Lore Boundary

The user withdrew the custom Lore authorization work on 2026-10-19. Hosted
Computers consume Lore's existing authentication, repository permissions and branch
behavior. Do not add a direct-role mapping mode, repository-creation admission
rules, a parallel permission service or another source-access gate for this work.
Do not replace the withdrawn changes with global grants or a standalone custom
token issuer. The subsequently accepted Hub issuer integration uses Hub's existing
authorization server and emits Lore's unchanged native grant format.

The explicitly requested native refresh bug fix remains in scope, alongside the
existing upstream and storage implementation. Computer integration owns installing
the native CLI, private connectivity and persistent client state. Lore's security
model remains Lore's responsibility. The prior direct-role proposal and its
component-test receipts are withdrawn implementation history, not an active plan
or accepted deployment requirement.

The approved Hub extension changes issuance ownership, not Lore's authorization
semantics. Hub stores explicit repository assignments and implements the device,
refresh and public-client repository exchange already used by native Lore. No
additional Lore source change is required. Record implementation and acceptance
under HLI1–HLI7, separately from the withdrawn direct-role/creation-check work.

## Local IdP Configuration

The following factory configuration remains the qualified Keycloak path. The
separate hosted Computer decision above does not establish Entra acceptance.

Implement trusted local provisioning in `veoveo-template-installation/identity/`,
using the existing provisioning conventions. Keep Keycloak administration out of
runtime code and generic customer installation. Do not alter the existing
`openshell-cli`, `veoveo-controller` or workspace-management grants.

1. Create one confidential OIDC client per independently revocable factory identity.
   Use `serviceAccountsEnabled=true`, `publicClient=false`, standard/browser,
   implicit and password flows disabled, and `fullScopeAllowed=false`. Keep the
   normal `basic` scope needed for the stable subject. Give it no identity-admin,
   OpenShell-management or Lore-administrator roles. A factory identity can live
   across its sandbox restarts; do not create a new client on each token refresh.
2. Set client attributes `access.token.lifespan="300"`,
   `access.token.header.type.rfc9068="true"`, and
   `client_credentials.use_refresh_token="false"`. OpenShell obtains successive
   access tokens with client credentials; no human refresh session is involved.
   Keycloak 26.8.1 supports the explicit `at+jwt` header setting natively.
3. For the assigned repository's canonical compact ID, create an ordinary optional
   client scope `lore-repo-<id>`. Link it only to clients authorized for that
   repository, never as a realm-default scope. This first slice grants one repo
   per factory client and provider profile; no multi-repo claim-merging mechanism
   is needed. An unlinked requested scope must never produce that repo grant.
4. Put two built-in protocol mappers on that scope. An `oidc-audience-mapper` adds
   `lores://vv-lore.internal:41337` as `included.custom.audience`. An
   `oidc-hardcoded-claim-mapper` emits the following existing Lore claim, with
   `claim.name="resources"`, `jsonType.label="JSON"`, and the JSON below serialized
   as `claim.value`. For both mappers enable access-token inclusion, disable
   ID-token/userinfo inclusion, and do not add the claim to the token-response body.

   ```json
   [{"resource_id":"urc-<id>","permission":[]}]
   ```

5. Read the service-account user's native ID and verify it equals the issued `sub`.
   Use this subject in the trusted hook assignment and the CLI's explicit identity.
   Keycloak's service-account OAuth flow does **not** require or justify Lore's
   `is_service_account` claim. Leave that claim absent/false: it bypasses Lore's
   protected-branch check. Never issue `urc-*` or privileged actions to factories.
6. Keep provisioning secrets in ignored mode-0600 operator state (directory 0700)
   and native OpenShell refresh material. No secret enters source, image layers,
   workload environment, logs or command-line arguments. Setup is idempotent;
   preserve existing client secrets/subjects unless rotation is explicit.

An empty Lore `permission` array means ordinary repository access without named
privileged actions. Native Lore allows unprotected pushes with that grant. It is
**not a read-only credential**. Keep the original smoke sandbox's RPC policy
read-only, including after switching its issuer; authoring gets a separately
approved policy. Branch assignment remains the existing normal-push guard, not
complete storage/API isolation.

For an actual immediate factory shutdown, issue native sandbox stop promptly and
await stopped state; also disable its IdP client and detach its provider, awaiting
the applied revocation receipt. Do not wait for token expiry or an unavailable IdP
before stopping work. Preserve the workspace unless its separate retention policy
authorizes deletion. Disabling the client alone does not invalidate already-issued
JWTs, and detaching alone does not promise cancellation of in-flight streams.

Keycloak's built-in [hardcoded mapper](https://github.com/keycloak/keycloak/blob/26.8.1/services/src/main/java/org/keycloak/protocol/oidc/mappers/HardcodedClaim.java)
and [JSON conversion](https://github.com/keycloak/keycloak/blob/26.8.1/services/src/main/java/org/keycloak/protocol/oidc/mappers/OIDCAttributeMapperHelper.java)
support this claim without a plugin. Its [client attributes](https://github.com/keycloak/keycloak/blob/26.8.1/server-spi-private/src/main/java/org/keycloak/protocol/oidc/OIDCConfigAttributes.java)
and [token manager](https://github.com/keycloak/keycloak/blob/26.8.1/services/src/main/java/org/keycloak/jose/jws/DefaultTokenManager.java)
define the header setting. Use ordinary [optional client scopes](https://www.keycloak.org/docs/latest/server_admin/index.html#_client_scopes),
not UMA, a custom mapper, token exchange or a new authorization service.

## Qualified Factory Configuration

The 2026-10-17 factory slice established direct issuer grants and native custody.
The upstream upgrade retains those settings, removing only the obsolete
`identity_claim = "sub"` line because native identity resolution now includes the
`sub` fallback. The reviewed installation configuration is:

```toml
[server.auth]
jwt_issuer = "https://auth.localhost:8443/realms/veoveo"
jwt_audience = ["lores://vv-lore.internal:41337"]
jwt_typ = "at+jwt"
resource_claim = "resources"
resource_id_claim = "resource_id"
permission_claim = "permission"
resource_id_template = "urc-{id}"
baseline_access = "denied"
repository_catalog = "baseline"

[server.auth.oidc]
client_id = "lore-cli"
scopes = ["openid"]
scope_template = "lore-repo-{id}"
```

Native Tier 2 configuration requires an OIDC client ID and exactly one scope or
resource template. Register the advertised `lore-cli` as a real public OIDC client:
standard authorization-code flow, S256 PKCE, exact `http://127.0.0.1/callback`
loopback redirect, no secret, password/implicit/service-account flows disabled,
and no repository scopes/grants. The scope template names the real repository
scopes configured above. Do not advertise another issuer
for token exchange or build an interactive-login implementation to fill this
metadata requirement. Factories use their own confidential client through the
OpenShell provider; they never authenticate as `lore-cli` or request an exchange.
This is deliberately a factory-only configuration. The source upgrade preserves
that registration, the advertised native scope template and the existing factory
grants. Configuring and qualifying the public client for human device login and
native repository exchange remains separate. Do not infer working human access
from the factory's successful use of supplied access tokens.

Remove adapter `auth_url`/`user_url`, `repository_catalog_url`, and the adapter
`[server.auth.jwk]` override. Let Lore discover the IdP JWKS using the pinned issuer.
Do not combine adapter and IdP keys, trust unrelated issuers in parallel, or relax
type/audience checks. The configured Keycloak header is `at+jwt`; the payload's
`typ` field is a different field. Verify the actual header and grant array in a
trusted probe without printing token bytes.

With native `baseline_access="denied"`, `lore repository list` lists no repositories.
Known granted repository URLs still work. Supply the assigned URL through trusted
factory configuration; do not reintroduce a catalog service or expose every held
repository ID merely to reproduce Desktop discovery. Optional display names can
use Lore's native token-based fallback.

The Lore server now needs HTTPS discovery/JWKS access. Add only the installation's
public CA to the server image's normal CA store, through the existing image build
and public CA build context. Verify DNS and HTTPS from its trusted network. Use
existing trusted egress/proxy configuration for external issuers as needed. Keep
TLS verification, the current Lore gRPC TLS endpoint and sandbox mediation intact.
No IdP/admin network access is granted to the workload. This is separate from the
already-completed one-time macOS CLI CA trust setup; no per-shell export is added.

The native contracts are in [Lore configuration](../lore/docs/reference/lore-server-config.md#authentication),
[settings validation](../lore/lore-server/src/settings.rs),
[resource grants](../lore/lore-server/src/authnz/resource_grants_authorizer.rs)
and [JWT validation](../lore/lore-server/src/auth/jwt.rs). The original factory
qualification used `cb2c191f`; upgrade evidence for candidate `8be7e6e6` is kept
separately in the [execution record](OPENSHELL_HARDCUT_PLAN.md#upstream-lore-adoption--2026-10-18).

## Native OpenShell Provider

Use the native profile/refresh APIs in the existing Rust qualification harness.
One repo-specific profile can serve multiple separately credentialed factory
providers. Render `<id>` from trusted provisioning; it is not agent-selected.

```yaml
id: veoveo-lore-repo
display_name: Lore assigned repository
credentials:
  - name: access_token
    env_vars: [LORE_AUTH_TOKEN]
    required: true
    auth_style: bearer
    header_name: authorization
    refresh:
      strategy: oauth2_client_credentials
      token_url: https://auth.localhost:8443/realms/veoveo/protocol/openid-connect/token
      scopes: [lore-repo-<id>]
      refresh_before_seconds: 180
      max_lifetime_seconds: 300
      material:
        - name: client_id
          required: true
        - name: client_secret
          required: true
          secret: true
```

Use the existing endpointless profile plus explicit policy credential binding for
the pinned Lore host/port, approved CLI binary and exact admitted RPC paths. The
IdP token URL belongs to the trusted gateway refresh path, not sandbox egress.
Create the provider, configure `Oauth2ClientCredentials` for credential key
`LORE_AUTH_TOKEN`, and set `secret_material_keys=["client_secret"]`. Client ID and
secret are refresh material, not injectable workload credentials. Wait for native
provider/attachment readiness before using it.

Use a distinct short profile ID per approved repository. Qualification resource
names follow the harness's `vv-qual-<run>-<role>` convention and native length
limits; never take over a pre-existing workspace/profile/provider.

One explicit `RotateProviderCredential` may mint the initial token during setup.
After recording the starting expiry, renewal acceptance allows no rotate, provider
update, refresh reconfiguration, sandbox restart or replacement credential file.
Refresh-backed native placeholders already stay stable during renewal. Do not add
`stable_placeholder=true`, which is a separate external-refresh/static mechanism.

The inspected gateway refresh worker sweeps every 60 seconds; its token HTTP
deadline is 30 seconds. The 300-second token and 180-second lead leave headroom
for sweep, request and supervisor synchronization. A trusted preflight token request
validates the IdP's actual `expires_in`, signed lifetime and claim shape; discard
that token afterward. The running test uses only native provider expiry/status,
not credential-store extraction or a new token-observation endpoint. With the
verified IdP lifetime no greater than the 300-second provider cap, the initial
provider expiry is a conservative old-token expiry bound. Cross that bound plus
verifier leeway. The cap cannot rewrite the JWT lifetime; a longer IdP lifetime
must fail preflight. Keep these values configurable, with a safe margin, rather
than changing the worker or introducing a timer daemon.

Use `GetProviderRefreshStatus` for sanitized `last_refresh_time`, expiration,
next refresh, status/failure code and recovery action. Existing implementations:
[profile schema](../openshell/crates/openshell-providers/src/profiles.rs),
[native refresh](../openshell/crates/openshell-server/src/provider_refresh.rs),
[provider RPCs](../openshell/crates/openshell-server/src/grpc/provider_credentials.rs).
The stock 0.1.4 gateway supplies refresh; retain the currently pinned supervisor
HTTP/2 mediation patch. No new OpenShell core change is planned.

## Implementation Order And Acceptance

This is the historical factory acceptance procedure, not the current work queue.
Use the execution checklist for the hosted Computer work and storage restart gate.

The execution checklist records the current status of the local gates below.
Use disposable, owned test resources and the existing small fixture seeder.
Do not add a public seed API, new Lore fixture service or
production auth test endpoint. Keep behavioral test logic in the Rust qualification
repository; the existing offline seeder may remain colocated in Lore test support.

1. **Prepare configuration and recovery.** Record current revisions/images and back
   up Lore data consistently plus ignored auth/installation state. Generate the
   IdP clients/scopes and provider definitions, validate the emitted access-token
   type, issuer, audience, subject, resource-array shape and expiry in trusted code.
   Prove omitted/unlinked repo scopes cannot issue unauthorized grants. Do not
   copy signed tokens into evidence files. Update hook assignments to IdP subjects;
   the existing hook reads assignments at startup, so use its normal restart.
2. **Cut over one issuer and rerun the workflow.** Deploy the configuration/CA
   packaging, migrate the read-only smoke provider, and run bounded normal
   clone/edit/push against the disposable repository. Verify assigned push,
   explicit wrong-branch rejection, both existing hook call paths, native protected
   branch rejection, and an ordinary identity without a hook assignment. Verify an
   existing ungranted repository fails and OpenShell-management tokens cannot
   access Lore. This does not qualify human
   browser login. Recheck credential custody and denial of bootstrap/management
   access. Any issuer change invalidates the earlier fixture's acceptance for the
   new configuration; record fresh results without erasing the old record.
3. **Prove automatic renewal.** Factory A keeps the original opaque reference in a
   running workload process. Record its original expiry and observe at least two
   automatic refreshes from native status. Repeated real reads and tiny pushes
   must succeed with unchanged repository/subject authority, including after the
   original token's expiry bound plus Lore's native 60-second verifier leeway. Establish a
   fresh Lore CLI connection after that point using the same saved reference.
   Prove process continuity with a random per-launch marker included in fresh
   command replies. A PID or persisted readiness file is insufficient.
   Repeat ungranted-repository denial and wrong-branch hook rejection after renewal.
   Success before old-token expiry, a new `exec` environment alone, explicit
   rotation or OpenShell human CLI refresh is insufficient evidence.
4. **Prove source withdrawal and renewal failure.** Disable only A's IdP client,
   leaving independent factory B enabled. Observe the native refresh failure and
   its recorded recovery action without reconfiguring A's provider. Verify new
   requests/reconnects fail no later than the last issued token's expiry plus
   verifier leeway (native provider expiration may deny earlier). Measure any
   grace interval explicitly. No cached-token fallback, manually renewed token or
   global IdP shutdown. This tests unavailable issuance without a new failure proxy.
   Record the client's prior enabled value only when this run changes it; restore
   that value on cleanup, including failed probes. Other phases must not enable A.
5. **Prove native detach separately.** Use a newly provisioned test A with its IdP
   client still enabled. The native gateway rejects detach while a policy endpoint
   explicitly references that provider. Remove only the credential binding through
   native `UpdateConfig`, await the active policy version, then detach through native
   APIs and wait for the attachment's applied `REVOKED` receipt. Record the initial
   `FAILED_PRECONDITION` and both applied steps. This qualifies the supported policy
   transition plus detach; it does not isolate a detach-only effect on streams. Reuse A's saved reference from the
   already-running process and prove fresh requests/connections fail. Do not call
   receipt of the detach request proof that supervisors have applied it. B remains
   able to read/push and automatically renew.
6. **Measure established work and prove termination.** In each withdrawal probe,
   establish a real `lore notification subscribe <seconds>` stream before the
   action and confirm receipt of a branch-push event. B produces another bounded
   event after withdrawal/expiry to measure actual stream behavior. Admit only
   the additional `POST /lore.notification.NotificationService/Subscribe` path
   in this qualification policy. An idle socket is not evidence. Native expiry
   and detach need not cancel already-forwarded requests: report observed events,
   then use `StopSandbox`, await stopped state and verify A's workload ends and
   receives no event generated afterward. B must continue working. Do not add
   Lore stream timers, blacklists or transport revocation to change native behavior.
7. **Recovery, cleanup and retirement.** Recreate a healthy authorized test path
   through normal provisioning and verify stored provider refresh survives a native
   gateway restart. Obtain the recovered process marker from a fresh answered
   command, allowing native workload restart. Do not infer uninterrupted lifetime
   from sandbox identity.
   Reuse the harness's ownership-aware partial-setup cleanup and pre-existing-workspace
   sentinel. Preserve durable Lore data and unrelated providers/workspaces.
   Keep generated probe output with image, policy/grant scope, sanitized timestamps,
   expiry/leeway, readiness receipts and measured outcomes.
   Retire the old adapter only after the direct path passes these checks.

Reuse the fixture's 20-second ordinary CLI command deadlines and 180-second setup
bound. Declare at most 16 small fixture files/64 KiB total, at most 32 tiny test
pushes, a 900-second bound for each lifecycle probe/notification process and a
30-minute overall focused run deadline. Long lifecycle probes are explicit
exceptions to the old 120-second smoke workflow timeout. A timed-out/incomplete
probe leaves its gate open; it is not silently skipped or converted to a pass.

## Retirement And Boundaries

The Desktop adapter runtime, ingress, signer and manual-token helpers are retired.
The old Desktop IdP registration is disabled; the native OpenShell CLI/controller
registrations remain separate. Ordinary provisioning uses the existing
`factory --image IMAGE --replace` command and requires no manual token file.

Keep private recovery copies of retired signing/session state and source history;
they are not active trust or runtime dependencies. Do not delete Lore repositories,
identity PostgreSQL, installation CA, native OpenShell state or unrelated data.
Rollback, if needed, restores one coherent previous configuration explicitly;
there is no permanent dual-issuer mode. Stop old sandboxes when their established
sessions must end during cutover.

The coding scope is installation provisioning/configuration/CA packaging,
`veoveo-qualify-openshell` scenarios and operator documentation.
Preserve the small hook and existing CLI/supervisor patches. No new
`veoveo-service-lore` feature, generic token endpoint, custom Lore permission,
server authorization/transport patch, SPIRE deployment, QUIC project or second
launcher is authorized by this plan. If native qualification finds a concrete gap,
record the exact failing contract before proposing additional implementation.

Local Keycloak acceptance does not qualify Entra/customer issuers. Each external
provider must supply a supported native refresh method, suitable access-token
claims/type/audience and explicit repository grants. Keep that separate gate open
when it cannot; do not weaken Lore or restore a Veoveo signer solely to claim
provider independence. Linux/CUDA, actual MCP adoption, composition and
source-to-runtime reconciliation follow separately after this slice.

Current acceptance and remaining work are in the
[execution checklist](OPENSHELL_HARDCUT_PLAN.md). Qualification commands produce
their normal reports under installation `state/openshell/lore-direct/`; use those
reports to inspect measurements and failures. Build commands select the patched
sources directly in the [native setup](../veoveo-template-installation/openshell/README.md#build-and-provision).
