# Direct Lore Credentials Through OpenShell

Status: implemented and locally qualified on 2026-10-17. Direct IdP issuance,
native OpenShell renewal/injection and native Lore authorization are deployed.
The Desktop adapter, signer/manual-token helpers and Desktop-only ingress are
retired. Historical signer results remain distinct from direct-issuer evidence.
The execution record is [OPENSHELL_HARDCUT_PLAN.md](OPENSHELL_HARDCUT_PLAN.md).

## Decision And Ownership

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

## Local IdP Configuration

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

## Native Lore Configuration

Keep the current pinned hook-only server source. Change installation configuration
and CA packaging, not Lore authorization or transport code. The target local auth
configuration is:

```toml
[server.auth]
jwt_issuer = "https://auth.localhost:8443/realms/veoveo"
jwt_audience = ["lores://vv-lore.internal:41337"]
jwt_typ = "at+jwt"
identity_claim = "sub"
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
This is deliberately a factory-only path. The pinned Lore CLI's native interactive
OIDC/refresh path is not qualified; keep the already-qualified explicit-token CLI
patches. A future human-login requirement needs its own native-client qualification.

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
and [JWT validation](../lore/lore-server/src/auth/jwt.rs), inspected at `cb2c191f`
(v0.10.1 plus the existing CLI/hook changes).

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

The execution checklist and installation component lock record the local gates
below. Use disposable, owned test resources and the existing small fixture seeder.
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
   existing ungranted repository fails, old adapter-signed credentials fail, and
   OpenShell-management tokens cannot access Lore. This does not qualify human
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
   Record source SHAs, image IDs, policy/grant scope,
   sanitized timestamps, expiry/leeway, readiness receipts and measured outcomes.
   Retire the old adapter only after the direct path passes these checks.

Reuse the fixture's 20-second ordinary CLI command deadlines and 180-second setup
bound. Declare at most 16 small fixture files/64 KiB total, at most 32 tiny test
pushes, a 900-second bound for each lifecycle probe/notification process and a
30-minute overall focused run deadline. Long lifecycle probes are explicit
exceptions to the old 120-second smoke workflow timeout. A timed-out/incomplete
probe leaves its gate open; it is not silently skipped or converted to a pass.

## Retirement And Boundaries

After direct-path acceptance, remove the `vv-srv-lore` runtime, Desktop-only
`vv-desktop-edge` routes/profile, adapter bootstrap and active component-lock
dependencies. Disable the old Desktop IdP registration only after checking that
it is not the OpenShell CLI/controller registration. Remove adapter signing/manual
token-minting dependencies from `factory_hook` and the old smoke `sync-factory`
path; ordinary operations should require no manual token file. Remove obsolete
Desktop recovery commands from the active operator path. Retain historical test
records with their original issuer clearly identified.

Keep private recovery copies of retired signing/session state and source history;
they are not active trust or runtime dependencies. Do not delete Lore repositories,
identity PostgreSQL, installation CA, native OpenShell state or unrelated data.
Rollback, if needed, restores one coherent previous configuration explicitly;
there is no permanent dual-issuer mode. Stop old sandboxes when their established
sessions must end during cutover.

The coding scope is installation provisioning/configuration/CA packaging,
`veoveo-qualify-openshell` scenarios, component records and operator documentation.
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

## Local Acceptance Record

The native server and supervisor source were unchanged for this cutover. Installation
changes configure native OIDC, public CA trust, ordinary IdP grants and trusted hook
assignments. No new Lore authorization/transport layer or OpenShell core patch was added.

The focused corpus combines completed renewal evidence with an independent remaining-
gates run. It does not call an interrupted run complete or imply every gate ran on
one fixture image. Both test images inherit the same accepted factory/Lore CLI;
exact images, timestamps and scope are in the component lock.

- Verified IdP signatures, at+jwt, subject/audience, 300-second signed lifetime,
  single-repository grants and omitted/unlinked-scope denial for six local identities.
- Direct clone/edit/push and independent content verification passed; every wrong-branch
  attempt cloned the current branch and committed first. Native protection and an
  unassigned identity's ordinary permissions passed. Existing hook tests cover both RPC
  call sites. Credential custody and raw-egress/operator-file boundaries passed.
- At least two automatic renewals and post-original-expiry/leeway operations were
  requalified using the original reference and unchanged per-launch IDs in fresh
  replies. No manual provider rotation, replacement credential file or factory
  restart supplied those renewals. This corrects the earlier PID-only evidence.
- Source withdrawal produced oauth_invalid_client/fix_configuration. The first observed
  fresh-request denial was 299 seconds after disable, 55 seconds before the recorded expiry/leeway bound.
  The stream received an event after client disable, then no new event was observed
  after expiry. Native stop reached Stopped and execution was rejected; the actual
  workload containers were observed exited. B continued reading, pushing and renewing.
- Native policy binding removal followed by applied REVOKED detach passed in 10 seconds
  from detach request to applied receipt. The retained reference was rejected. No event
  was observed after the combined transition; no detach-only stream claim is made.
- A fresh healthy native OnFailure fixture recovered after a gateway restart with
  the same sandbox identity and subsequently renewed from stored native configuration, without
  provider reconfiguration or manual rotation. The corrected probe's unique launch IDs
  confirm the workload process restarted. Starting recovery with A disabled left it
  disabled; the outer test restored only its own change afterward. Partial-setup
  cleanup and the pre-existing workspace sentinel passed. All temporary
  qualification resources were removed.
- A valid, unexpired former-signer token with verified signature and an OpenShell
  management bearer were rejected by Lore. The old Desktop IdP client was disabled;
  the separate native registrations remained enabled. Durable data and private recovery
  state were preserved. No inference or coding-agent session was run.

Entra/customer issuers, interactive human Lore login and Linux/CUDA remain unqualified
by these local tests. They are separate adoption gates, not reasons to restore a signer.

The original PID-only process markers could repeat after restart, and recovery could
read a stale readiness file. Those records do not establish uninterrupted process
lifetime; their process-only fields are explicitly unqualified, including the older
detach probe. Corrected renewal and recovery probes use random per-launch IDs in
fresh command replies and qualify only their own runs.
Original private records are preserved alongside corrected interpretations. The
299-second first observed denial and 10-second detach-request-to-applied-receipt
measurements remain valid; the latter starts after policy binding removal.
