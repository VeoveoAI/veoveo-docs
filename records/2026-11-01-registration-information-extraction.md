# Native registration response extraction reaches a translator boundary

One bounded attempt extracted the unchanged `RegistrationService::information`
graph to Charon LLBC, including its real construction and validation helpers.
The pinned Aeneas backend then failed on unsupported Rust constructs and emitted
no Lean model. This is a measured translation limitation, not a response theorem,
source bug or native qualification result.

GPT-6.1 Sol audited and selected the graph. GPT-6 Luna ran the existing bounded
extraction workflow on Linux x86_64. GPT-6 Astra reviewed the full backend log,
required helper/field inventory, source integrity and output identities. No
production source, translator, dependency pin or generated code was edited.

## Exact input and scope

The complete source snapshot is Hub
`af953f6207a1fcfe592ad7328a6a74b6375c7905` (1,224 files); native registration code
remains `12a132dcbdddcd7fad1defcd007432385d237a76`. The later control commit changes
only proofs and evidence. SDK is `7360c0f96cb616c519d27256df214ff4f2e6e831`
(178 files) and Core is `422dcf268d690fcbc3fee435cf9b81e7f36ffeac`.

The sole root is `veoveo_hub::registration::service::_::information`. The three
includes, `veoveo_hub`, `veoveo_hub_sdk` and `veoveo_types`, request transparent
reachable own dependencies; they do not add roots. There are no explicit opaque
selectors or exceptions hiding own behavior. Required dependencies include the
actual `registration_client_uri`, `surfaces`, SDK `ClientInformation::check` and
`From<&ServerEndpoint> for ResourceIndicator` implementations. Their source spans
and owners match the pinned sources. Complete service, receiver, metadata,
registration, trust, grant and endpoint fields remain represented.

The shared Charon target had no active user before its Hub-package-only clean.
Cargo ran locked/offline with pinned `nightly-2026-09-17`, two jobs and SQLx offline
metadata. No online dependency hydration or second attempt ran.

## Measured result

- Source/dependency metadata verification: exit 0, **0.916 s**, 180-second bound.
- Hub-package clean: exit 0, **0.164 s**, 120-second bound.
- Charon: exit 0, **31.672 s**, 600-second bound.
- Aeneas: exit 2, **0.916 s**, 600-second bound.

LLBC contains 507 total function declarations and 502 types. Among the included
own Hub/SDK/types code are 203 functions and 300 types. Strict root, own-body/type,
required-helper and full-field checks pass with zero inventory failures. Both
Hub and SDK source maps match before and after execution.

The retained LLBC is 10,400,686 bytes, SHA-256
`a1e0e7b5a4d13b724d3aa45c05f8ebf33b1c364b4ee1ba1fa0faafe41b5a58f6`.
The complete Aeneas log is 15,318 bytes, SHA-256
`304e18a22ecabb6d405b4d9a5a96a24558af75380c6f589fb3ca461e82aa89f9`.
It contains 24 error entries, including cascading ignored-body notices; that is
not 24 independent defects. The failures include:

- Returns inside nested loops in SDK authorization checking/template parsing
  and Core resource-URI parsing.
- Dynamic-trait and function types reached through the complete service receiver,
  Hub/Core declarations, OpenShell configuration and ID-profile types.
- The Hub error-mapping function adapter, string/pattern signatures, slice
  iterator lifetime relations and Core `IdProfileSpec::text` locally quantified
  regions, ending in `Aeneas.Errors.CFailure`.

No `Funs.lean`, `Types.lean` or external-template files were emitted. Backend
notices that it ignored bodies are failures, not accepted assumptions. The source
was not narrowed, its validators were not made opaque, and no backend patch or
handwritten replacement for generated output was attempted.

The receipt and coverage update are published in Hub `78d8132`.

The [committed receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/evidence/information-extraction-boundary.json)
holds exact roots, dependencies, commands, source/tool/log identities, inventory
counts and parsed diagnostics. LLBC, full inventory, logs and runner remain
temporary under `/tmp/hub-registration-instance-removal-20261101/information-probe1-mirror/`.
No deployment or model-driven application acceptance ran.

## Consequence for the next work

The existing store-model proofs and semantic controls remain valid within their
recorded scope. This attempt establishes no new native response guarantee.

Source review distinguishes committed registration effects from later service
work: audits, catalog reloads, `served_at`, grant construction and response
validation run after the store commit. An ensuing error is not rollback, and
concurrent legal removal may invalidate a registration before a successful reply
is delivered. Typed timestamp preservation also differs from its NumericDate
wire representation in whole seconds.

Next is source review of the expected response/postcommit and audit guarantees,
followed by meaningful native probes and a continuation of the existing store
model where appropriate. Audit intent must be resolved before treating current
postcommit audit behavior as adequate or proposing a fix. Complete response
payloads, native SQL/async refinement and broader lifecycle coverage remain open.
The comprehensive Hub verification goal remains active.
