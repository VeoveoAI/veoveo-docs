# Lore And OpenShell Integration

## Current direction — Kubernetes, 2026-10-19

The user-approved target is K3s on Ubuntu Linux x86_64 **only for this slice**.
Mac remains ordinary source development, compilation and component/integration
tests with local fixtures, including Docker where needed. **Implementation authorized
and started on 2026-10-19; scoped Linux deployment qualification passed 2026-10-20.**
Lima 2.2.1 is installed but unused; no Mac VM/K3s cluster is planned. The old Linux
runtime has been cleared and the replacement K3s node reports Ready. Cilium
ingress/egress enforcement, private service connectivity, two owner-isolated
Computers, native Lore publication/renewal, disposable factories and live Hub
configuration now have deployed evidence. Corrected synthetic Media acceptance
and scoped Hub/Media in-flight recovery pass. A full Linux host reboot recovered
all owned Always workloads without manual Starts; retained-state verifiers and
the final exact MiMo Computer scenario pass. Linux builds the Linux
runtime images. Exact foundation pins and immutable pullable amd64 images are
recorded with the execution evidence; installation alone does not qualify them.

Kubernetes directly owns the foundation: CloudNativePG PostgreSQL (to be replaced by
a plain StatefulSet, see Factory Sandboxes, Data Environments), the official
SeaweedFS chart with explicit PVCs, single-replica Lore, OpenShell gateway and the
tunnel. OpenShell's existing Kubernetes driver owns Hub, MCP, Computer and factory
sandbox resources. K3s uses its independent embedded datastore. Gateway PostgreSQL
is external to the OpenShell Helm release, inside the same cluster; gateway and
application databases/roles are distinct and may initially share a PostgreSQL
cluster. Cilium must enforce ingress and egress policies, and the Agent Sandbox
controller/CRDs are prerequisites. This is single-host recovery, **not HA**;
multi-host HA is future scope.

The running Linux placement is now Kubernetes. The old Linux runtime has been
cleared to reclaim space; the replacement passed the scoped execution checklist.
Earlier Docker/Compose receipts below are historical
component/deployment evidence, not Kubernetes acceptance. This direction supersedes
current instructions to use only native Docker or move infrastructure into Docker
sandboxes. The undeployed native-Docker infrastructure candidate `fea2793` is
superseded and must not be executed. See the
[Kubernetes management plan](#full-native-openshell-management-plan) for ownership,
live-change requirements and qualification gaps. Mac ARM testing and architecture portability remain relevant; multiarch image
publication and Mac VM provisioning are not requirements of this slice. Implementation is now authorized; the execution checklist tracks measured progress.

Historical and current application evidence, reviewed 2026-10-19: Lore is the source and revision authority. OpenShell owns execution
and runtime access for factory work and deployed services. Veoveo connects source
revisions to checks, service composition and promotion. The local hard cut and first
native Lore/private MCP path, Hub → Time integration, prepared Time factory
build/deployment, private Artifact integration and the private fake-provider Media
slice pass local acceptance, including the final bounded OpenCode MiMo client
scenario. A separately authorized real WaveSpeed polling one-shot also passes,
producing a decoded image through the same native path. Reference Linux
qualification now passes the bounded native-service, recovery, signed-callback
and final-client goal recorded in the dated execution checklist. Deterministic deployed-service and recovery gates now pass in the dated checklist.
Final Linux OpenCode MiMo client acceptance now passes the full retained-Artifact
and one-Time-Task scenario; earlier bounded failures remain historical.
One real Linux WaveSpeed signed Events callback now passes, with zero generation
status checks, independently decoded bytes and matching per-Task USD 0.003 usage. Other models, general composition and
GPU/CUDA remain separate. See
[execution status](OPENSHELL_HARDCUT_PLAN.md).

The [platform visual guide](diagrams/veoveo-platform.html#platform) shows the current
platform with Lore, OpenShell, Hub, Time, private Artifact and Media. Its other
views explain native credential custody and the hosted Computer publication workflow.
The existing diagram was updated only after the infrastructure was proven, as
requested, and all three views were manually reviewed in Mac Chrome. Qualified
Kubernetes workflows and planned general publication remain explicitly separate.

Desktop is no longer an acceptance requirement. The locally qualified path uses
[direct IdP-issued Lore credentials with native OpenShell renewal](LORE_DIRECT_OIDC_PLAN.md).
The Desktop authentication adapter, signer dependencies and Desktop ingress are
retired; durable data and private recovery state are preserved. External issuers
and interactive human Lore login require separate qualification.

On 2026-10-19 the user adds Hub-issued native Lore credentials to the active
hosted Computer goal. Entra authenticates people into Hub; Hub owns repository
assignments and issues the tokens Lore already understands. This supersedes the
direct-IdP issuance direction for the new Computer workflow, not its historical
qualification receipts. The [accepted issuer design](#hub-issued-native-lore-credentials)
is implemented and deployed; native user acceptance is still pending.

This direction refines the [Infrastructure Candidate](INFRASTRUCTURE_CANDIDATE.md).
Extension builds and maintained VeoveoAI forks of Lore or OpenShell are permitted
where a verified gap requires them. Preserve each project's extension contracts,
security boundaries, source formats and ordinary operations.

## Artifact content hashes — accepted removal, 2026-10-20

Artifact identity is its artifact ID and its create-only object. The user has
approved removing the mandatory content SHA-256 from upload requests, records and
completion. Artifact completes the native S3 upload and checks actual size against
the declared size and reserved limits. It then records availability, usage and audit
atomically in PostgreSQL. It no longer downloads the object to hash it or
runs a separate hash-verification Task/state. Multipart part numbers and ETags,
create-only writes, quotas, permissions, retention and upload idempotency remain.
This does not change the platform's general MCP Tasks capability or Media Tasks.

SeaweedFS retains its native ETags and explicitly requested checksum support.
Its [single-PUT implementation](https://github.com/seaweedfs/seaweedfs/blob/4.48/weed/s3api/s3api_object_handlers_put.go)
computes an MD5 ETag; its
[multipart implementation](https://github.com/seaweedfs/seaweedfs/blob/4.48/weed/s3api/filer_multipart.go)
combines part digests and includes the part count. A multipart ETag is not a
portable whole-file hash.
Artifact adds no replacement digest registry or checksum API. A consumer that
needs a content digest for its own source identity, provenance or validation owns
that computation and storage. Share-token hashes, request signing, model/prompt
processing hashes and immutable runtime-image digests serve separate purposes.

The coordinated source change removes Media's hash-verification wait and
Embedding's inherited mandatory Artifact digest. Embedding retains caller-bound
Artifact authorization, signed-transfer origin/expiry checks, exact size limits
and native media decoding. Its acceptance runner computes independent fixture
fingerprints in the test caller; production Embedding MCP never fetches bytes.
Component-check and publication evidence belongs in the execution checklist.
Deployment qualification of this contract change is still pending. Earlier
digest-based qualification receipts describe the previous implementation and
remain historical evidence.

## Embedding Generation

Implementation authorized on 2026-10-19. This is a standalone generation service;
Knowledge, vector storage, pgvector and retrieval remain separate work. The user
explicitly kept PostgreSQL changes out of this goal.

`veoveo-mcp-embedding` owns the typed embedding contract, Hub registration,
permissions, bounded requests and Core usage accounting. It runs as a native
OpenShell Docker workload. Callers, including other services, use its contract
through the Hub. It stores neither input text nor output vectors.

`veoveo-runtime-embedding` executes the exact pinned `google/embeddinggemma-2`
checkpoint using upstream Sentence Transformers and PyTorch. The private runtime
authenticates the service through native OpenShell provider credential mediation.
The Mac runtime is a native macOS launchd service using MPS; the Linux runtime is
an OpenShell Docker workload using CUDA through native CDI. The Mac host process
is not an OpenShell sandbox. Mac MPS and Linux CUDA deployed qualification now
pass separately, including maximum-capacity batches and component/runtime restart
recovery. Standalone embedding implementation and deployment are complete.
Per the user's scope correction, OpenCode qualification is excluded from this
embedding closeout. Its attempted readiness check stopped before any model call;
no OpenCode or Hub authentication code was changed.

The first contract accepts bounded text and code batches with explicit search-query,
code-query and document purposes. It returns ordered, finite, normalized
768-dimensional vectors, actual token counts, the model revision and processing
identity, and separate execution device/dtype information. The initial execution
profile is FP32 on the selected GPU, with no CPU fallback. The runtime counts
untruncated upstream tokenizer output and rejects oversized input before inference;
silently truncated input is invalid.
One API batch is admitted at a time with bounded admission and request deadlines.
Native Sentence Transformers executes microbatches of two items, bounding padded
input to 16,384 tokens even when item lengths differ; it restores input order.

The service uses ordinary Hub permissions and existing Core nonmonetary token
usage records. There is no separate identity system, invented provider price,
legacy model path or automatic retry of an ambiguous computation. A lost HTTP
request does not imply cancellation of an already submitted GPU kernel.

The Mac-qualified components were merged and pushed before Linux deployment.
Component checks, real GPU probes and deployed Hub acceptance are recorded
separately in the [execution checklist](OPENSHELL_HARDCUT_PLAN.md#embedding-generation--2026-10-19).

The Linux serving MCP retains production source `5d8da46`; qualification-only
source `f6100da` preflights evidence files before any live request. Runtime
`f55b855` changes Docker packaging to provide a UID-10001-owned `/sandbox`
working directory; its Python inference code is unchanged from Mac `2668a96`.
The reviewed Linux Hub call returned six ordered 768-dimensional FP32/CUDA
vectors and 132 actual tokens in 281.496 ms. Maximum component difference from
the same Mac corpus was `2.104789e-7`, within the declared parity thresholds.
Native Hub capacity calls also returned the exact `[8192,8192]` and
`[8192,15,15,15,15,15,15,15]` token counts, with matching actual usage records.
See the [local operator qualification report](../veoveo-template-installation/state/embedding-generation-evidence-20261019/REPORT.md)
for identities, complete sequence, byte evidence and remaining limits.

For this deployment, the Hub's published database control plane owns the full
native binding configuration; the mounted JSON is only the initial seed. Adding
the embedding binding required a fresh authoritative document and the existing
stopped-process `import-control-plane` command, followed by a same-image native
restart. Preserve concurrent Computer configuration and all other fields; a
mounted-file edit and restart alone do not publish a binding change.


### Multimodal embedding replacement — implementation authorized 2026-10-19

The user authorized a new implementation goal after the pinned-model investigation.
The text-only deployment evidence above remains historical evidence for that contract;
it does not qualify the replacement described here. The new `embed` request retains
ordered `items`, each containing ordered text/image/audio/video content. Each item
produces one normalized vector, including a joint vector when its content combines
modalities. A batch of N items returns N ordered vectors at one requested dimension
(768 by default, with 512/256/128 supported). Task prefixes are optional and do not
select a different model or embedding space.

The **Embedding MCP**, using the native SDK caller context, calls Artifact's typed
`create_download` through the Hub. Artifact owns access decisions and supplies the
available artifact's metadata and signed transfer. The private embedding runtime
does not call MCP tools or hold a Hub identity. It receives the resolved transfer
privately, reads bounded bytes directly from admitted object storage, verifies
size/digest, and uses upstream media decoding, preprocessing and full-model GPU
inference. Request-scoped temporary files are removed when the real worker finishes.
Bulk media, signed transfers and credentials are not exposed in public embedding
results or application logs. No second artifact store is introduced.

Direct caller → Embedding → Artifact delegation uses the native SDK path.
Composed service → Embedding → Artifact calls use the reviewed native SDK/Hub
extension to preserve original caller authority, prior actor history, inherited
expiration and originating Task/session constraints across request-bound exchanges.
Every hop retains native audience, registration, declared-use and caller-policy
checks. This is not implemented by stripping the existing redelegation guard or by
giving the runtime another service's credentials. Artifact's application API is
unchanged; affected consumers adopt one reviewed SDK revision.
Existing session semantics remain: request-origin chains inherit signed request
expiry; Task-origin chains retain native Task-delegation lifetime, Task liveness
and refresh-replay compromise checks. Ordinary logout does not terminate Tasks.
This change adds no new request-session revocation policy or Task lifecycle.

The SDK's internal `delegation_context` carries prior registered actors, an optional
originating Task with its owning server, and the inherited expiry ceiling. The
immediate calling server remains in `acting_server`; original user/client/authority
remain in their existing identity fields. The Hub signs and validates these claims;
they are not an embedding or Artifact request option. Direct identities have no
prior delegation context. The bounded chain permits at most eight registered
server actors, excluding the Hub, and later hops cannot extend its expiry.

The deployed Mac composed call passes with text plus two distinct sources of each
media modality, returning one 768-dimensional MPS/FP32 vector and 1,667 actual
tokens through the registered caller → Embedding → Artifact path. Native component
tests cover signed actor/Task constraints; the deployed receipt separately proves
the successful application path and original member's usage totals. It does not
capture every signed actor claim. Independent Mac MCP and runtime restarts each
pass one fresh joint-media call, with vectors identical to the retained baseline.
The same MCP volume is retained; its signing-key bytes were measured only after
restart, and the model cache check compares metadata rather than rehashing tensors.
Real Artifact ACL denial also passes against an owner-verified Available PNG in
an isolated Work Context with no grants: the original member cannot read it, and
Embedding rejects before reserving inference usage. Exact before/after usage is
unchanged. The absence of runtime dispatch follows from that closed rejection and
the deployed source order; no independent dispatch counter was captured.
The fixture's bytes, isolated identity/provider/runner and four temporary catalog
records are removed. Native storage returns `NoSuchKey`; full catalog readback
matches the reviewed cleanup. Hub discovery, four contracts and Time reads pass.
The fake Media catalog also passes after restoring its documented native provider
credential and restarting the same Media sandbox. Its earlier stored credential
was not readable, so the precise authentication defect is not independently proved.
One final joint-media call after Hub cleanup/restart resolves actual Artifact
sources and returns a vector identical to the retained baseline, with 835 tokens.
This closes Mac deployed qualification. Runtime `2a3c1d6` and MCP `7cc6333` are
published on their respective `origin/main` branches; complete Linux CUDA and
final embedding client qualification remain open in the
[execution checklist](OPENSHELL_HARDCUT_PLAN.md#multimodal-embedding-replacement--2026-10-19).

The current Kubernetes direction above supersedes the historical Linux Docker
placement. A fresh 2026-10-20 inventory confirms the old application containers
are absent from the Linux Docker daemon; the shared foundation plan records their
authorized removal. Do not recreate that retired deployment. The multimodal Linux
gate must use the replacement native OpenShell Kubernetes placement and CUDA,
with ordinary caller/Artifact authority. Isolated Docker GPU probes may establish
component inference evidence, but cannot qualify the Kubernetes deployment.

The first such component probe now exercises the full model on the RTX 4090
inside the runtime Docker image. One ordered text/image/audio/video item returns
a normalized 768-dimensional vector with 835 tokens; observed backbone, vision
and audio forwards use CUDA FP32 tensors. Its fixed cross-device parity gate
fails: maximum component difference from the retained MPS vector is
0.002152925357 against a 0.0001 limit, while cosine 0.999912292982 passes its
0.9999 minimum. The output is preserved, thresholds are unchanged and the cause
remained under investigation at that checkpoint. Runtime and MCP Linux images
were then built but not deployed; that probe was not Kubernetes or
caller-authorization acceptance.
The Kubernetes GPU prerequisite now passes separately: official NVIDIA chart
0.20.1 is installed, its pinned device-plugin Pod is Ready and the node reports
one allocatable GPU. At that prerequisite checkpoint, no embedding workload had
yet allocated that resource.
Separate no-forward captures now show eight of nine native preprocessing arrays
are byte-identical across platforms; only video pixel features differ. Tokens,
image pixels, audio features, masks, positions and media coverage agree. This
narrows the investigation to the video path before attributing the vector
discrepancy to GPU arithmetic. An instrumented native resize call now shows RGB
input already differs before resizing, by at most two uint8 levels in this case.
Both devices reproduce their earlier final video features exactly. The specific
decoder cause remains unidentified. A controlled CUDA call now replaces only
that final video tensor with the retained Mac features, checking every feature
before and after both normal preprocessing calls. It meets the unchanged
numerical comparison: maximum component difference 0.000000684987754, cosine
0.9999999999837053. This isolates a sufficient preprocessing contribution for
that one input; the original native end-to-end comparison remains failed.
No serving transform or numerical setting has been replaced.
Qualification now separates identical-feature numerical comparison from native
pipeline agreement: the former retains both original numerical thresholds; the
latter retains source/coverage/token/shape checks and the existing 0.9999 cosine
minimum, while recording the original maximum-component verdict. Deployed CUDA
calls must also meet both numerical thresholds against native Linux baselines.
This explicit correction to the initial test design preserves the original
failed observation; remaining batch, capacity and deployment checks are open.
The next native video-with-soundtrack case fails even the retained cosine
minimum: 0.999847141497 versus 0.9999, with 887 tokens and valid CUDA output.
The remaining four component cases were initially stopped; they are now
authorized as distinct, unrepeated runs to collect batch/capacity evidence while
preserving every original numerical verdict. Native preprocessing on each
platform is the coordinator's working deployment assumption, pending the user's
optional cross-platform-equivalence preference. Strict cross-platform numerical
equivalence remains unqualified; no failed comparison is claimed passed.
Deployed Linux checks must still match native Linux component baselines at both
original numerical thresholds.
The soundtrack case's complete CPU captures now show seven of nine arrays
byte-identical, with audio and video features differing before model inference.
Source identities, native options, tokens and media coverage still match.
This establishes differing model inputs, without identifying the underlying
decoder/kernel cause or each difference's contribution to the output.
The four remaining CUDA cases now also produce valid ordered full-model outputs,
including two 8,192-token items in one request. Each repeated batch item matches
its corresponding single-item Linux vector byte-for-byte. All original
cross-platform comparisons remain failed; component execution and capacity
evidence do not establish Kubernetes deployment or strict portability.

A subsequent real Linux Kubernetes media call now passes through native Hub,
Embedding and Artifact with unchanged MCP `7cc6333` / runtime `2a3c1d6` and the
same pinned model. Two identical items contain text `repeated multimodal parts`
plus PNG/WAV/MP4 twice: three unique Artifact IDs, twelve ordered media references.
Synthetic media fixtures produced real CUDA FP32 inference, two normalized
768-dimensional vectors and 1,655 tokens per item. The embed call took
6,961.736 ms; both vectors exactly match retained native Linux references
(maxAbs 0, cosine 0.9999999999999998). One actual usage record adds 3,310 tokens.
Builder GPT-6 Luna executed the single call; coordinator GPT-6 Astra independently
verified its output. Only the same existing operator forward was restored; no
source/deployment change or inference retry was made. This is one-case deployed
acceptance, not strict cross-Mac parity or complete Linux qualification. Full
media/options/capacity, real ACL denial, registered-caller composition, recovery
and final embedding client acceptance remain pending. The
[retained execution report](../veoveo-template-installation/state/embedding-multimodal-20261019/deployed-linux-preparation/quick-media-two-items-20261020T155127Z/REPORT.txt)
records exact request, source/output hashes, usage and proof limits.

Media processing controls are closed and explicit. Runtime preflight checks actual
processed lengths and media resource bounds before inference; unknown fields reject.
Aggregate audio admission checks both source-duration metadata and actual decoded
sample counts; underreported metadata cannot bypass the decoded-audio budget.
Audio is not silently cut at the upstream default 30 seconds. Video sampling and
audio inclusion are observable. Output records effective settings, actual token
counts, model/processing identity and media coverage. Full-model capacity must be
measured independently of the historical text-only capacity limits.

The implementation contract uses `items[].content[]`, with text parts carrying
`text` and media parts carrying the existing Artifact `artifactId`. Optional
request-level `promptName` or literal `prompt` applies once to each complete item;
the two fields are mutually exclusive and omission means no prefix. The closed
`preprocessing` groups expose audited upstream image, audio and video controls.
Their camelCase transport names are Veoveo's adapter, not Google's model format.
`dimensions` maps to upstream Matryoshka truncation followed by normalization.
For example, three independent items produce three rows, each with 768 floats:

```json
{
  "items": [
    {"content": [{"type": "text", "text": "hello again"}]},
    {"content": [{"type": "image", "artifactId": "<image-artifact-id>"}]},
    {"content": [
      {"type": "text", "text": "A product demonstration."},
      {"type": "video", "artifactId": "<video-artifact-id>"}
    ]}
  ],
  "dimensions": 768
}
```

The native adapter always constructs an outer batch of conversations, including
for one item. Native `batch_size=1` bounds simultaneous model work; it does not
change public batch cardinality. MPS probes have encoded two joint multimodal
items of exactly 8,192 tokens each into a `[2,768]` matrix in 13.940 seconds with
instrumentation. This is a local inference measurement, not deployed acceptance
or a general throughput guarantee. The separate sampled process RSS and MPS
driver allocation counters may overlap on unified memory; their arithmetic sum
is not a measurement of unique total memory consumption.

Initial service admission bounds are 8 items, 16 parts per item, 32 parts per
batch, 64 KiB total text/prompt, 64 MiB per source and 128 MiB aggregate transfer.
Decoded images/frames are bounded to 16 megapixels each and 64 megapixels in
aggregate. Source audio/video duration is at most 300 seconds, with at most 600
seconds of decoded audio per batch. Video controls admit at most 120 requested
frames per second and 256 selected frames. These are **Veoveo service bounds**,
subject to deployed validation, not claims about Google model limits or quality.
The actual shared token limits remain 8,192 per item and 16,384 per batch;
source admission alone does not guarantee that a request fits those token limits.

Audio truncation defaults to false; explicit truncation uses the native sample
limit. Video defaults remain 1 fps, 32 frames, uniform overflow, 140 soft tokens
per frame, no timestamps and no soundtrack inclusion. The initial contract
rejects native `loadAudioFromVideo=true` together with separate audio parts:
the pinned upstream processor otherwise ignores explicit audio on that branch.
This is a measured upstream interaction, distinct from Hub delegation policy.
Native sampling determines frame selection. Verified local paths remain inputs
to the upstream processor so its video/audio loader retains its own behavior.
Metadata inspection and repeated native decoding are bounded preprocessing costs.

Clipping, long-media chunking and vector aggregation are optional future application
pre/postprocessing proposals, excluded from this goal. Knowledge, vector persistence
and search remain separate. Implementation, component checks, real model probes,
deployed Mac MPS, deployed Linux CUDA and final model-driven acceptance are distinct
gates in the execution plan. The native investigation evidence is retained under
`veoveo-template-installation/state/embedding-api-investigation-20261019/`.

## Product Workflow And Full Platform Plan

Successor direction, agreed with the user on 2026-10-22 and not yet implemented:
[factory sandboxes and dynamic selection](#factory-sandboxes-and-dynamic-selection).
For the branch workflow it replaces the reusable override runtime, runtime
eligibility and shared logical-schema bindings. The accepted direction below
remains implemented and qualified.

Accepted next-slice direction, revised 2026-10-20: **environment selection,
owned component overrides and fast source activation**. Implementation authorized
and started on 2026-10-20, including Computer-local apply/watch and native Lore
subscriptions as inputs to one activation contract. Deployed evidence now covers
Computer-local apply/watch, automatic native Lore component-branch updates,
failed-build retention, and active Time Task recovery across runtime stop/start.
Root configuration-file following, retained Task completion during route removal,
base pin/follow/owned-override cases, nested configuration following, failed-start
retention and selected-worker unavailability without fallback also pass. The
explicit pin/local/follow transitions and native-follow activation completion while
the Computer is Stopped now also pass. The final exact-MiMo session now verifies
latest injected guidance, native Lore reads and selected Time results. Actual
Task correlation and completed-session UI also pass. E0–E5 are qualified at their
recorded scope. The updated existing three-view diagram passes manual browser
and all-view SVG/PNG export review. The Linux K3s foundation,
hosted Computers, native Lore access and isolated deterministic factory fixture
have their separate qualified receipts. The environment composition and
multi-instance routing source is published; the source-update implementation was
originally published as Hub `985108e`, with subsequent checked corrections now
deployed as Hub `0493f95`. Current Computer packaging uses installation `d089f94`,
OpenCode `c5fb626` and the matching `0493f95` environment CLI; README-only
`7f2b4ed` records the OpenCode pin. The earlier installed `985108e` CLI replayed an
old apply receipt instead of changing desired intent; that observation was not a
successful source transition. The corrected client has now served an exact R2 pin
as generation 8, Build `01a15d46-7b0e-7e92-aeab-403adf3691f8`, with check/build
times of 184/89,471 ms. Publishing R3 did not advance that pin; explicit local apply
then selected a local snapshot with local definition ownership, and later
Time/configuration publications did not overwrite it. Explicitly restoring following selected the
published definition again and completed the replacement's activation while the
Computer was Stopped. The execution plan records the exact generations and receipts.
Native runtime package and CA-mount probes pass, and the shared base has all four MCPs enrolled through
the live control API with selected discovery and a Time call verified. These are
prerequisites; the execution plan separately records the subsequent source-update
and recovery evidence, exact revisions, timings and remaining end-to-end cases.

The first actual owner environment now follows that base and passes selected
discovery and a Time call. Computer configuration and runtime eligibility were
published through the live control API. First-use Computer setup encountered a
measured OAuth refresh defect: the native client omits `resource`,
and Hub rejects that omission after its client registration gains both MCP and
Lore resources. The browser authorization-code exchange succeeded. The approved
Hub correction resolves an omitted refresh resource from the token family's
existing exact resource binding, retaining current admission and rotation checks.
It changes neither Lore authorization nor OpenShell's native refresh protocol.
The correction is published and deployed as Hub `60fc3f9`, with full Mac/Linux
component gates passing. Both native QA credentials rotated and subsequently
renewed automatically; a fresh administrator sign-in in Mac Chrome rendered
OpenCode. This qualifies the reported login/refresh recovery, not the remaining
personal Lore checkout or source activation. The separate `unavailable`
onboarding status was traced to Hub's invalid `grpcs` → HTTPS URL scheme mutation
before any Lore RPC. Shared authority-preserving conversion is published and
deployed as `8e62346`, with both platform checks passing. First-use provisioning
now creates the personal repository and publishes its actual native IDs through
the live control plane. Native device sign-in succeeds and stores the user's
grant. Checkout exposed a separate installation-helper error: explicitly asking
for `<branch-id>@latest` cannot clone a newly empty branch. Ordinary native clone
succeeded, but our subsequent human-readable metadata parser falsely rejected
the checkout when a native warning preceded the repository identity. That parser
was an integration addition, not a Lore authorization requirement. The user then
clarified that first checkout must be optional. The correction removes
the installation helper and its automatic invocation entirely. Hub prepares only
the optional repository association and delivers public coordinates; the user or
agent chooses when and where to perform native login and clone. A prepared status
does not assert login or checkout. The retained branch association is provisioning
metadata, not an ongoing checkout constraint. Hub source is published as `aff11f8`
after both full platform gates pass; installation removal/handbook is published as
`8466e56`, refined by handbook-only `4b44cc0`, and its Linux image package checks
pass. Subsequent Hub `0493f95` and corrected Computer v4 packaging are deployed.
Fresh Computer `01a15d38-2a1e-7920-9823-1ddf5014c5bb` renders Home, Settings and
New session in Mac Chrome. Its chosen personal and Time source native checkouts
succeed after ordinary user device approval. Managed guide delivery replaces the
configured file without changing OpenCode PID 58; the final bounded exact-MiMo
session subsequently returned the out-of-band guide marker without a tool read. Lore's native permissions and OpenShell policy are unchanged.

For this slice, ordinary source edits do **not** require a new OCI image, Pod or
sandbox. Reuse an admitted interpreter/toolchain runtime and its persistent source
and build cache. Template/toolchain changes and general trusted image publication
are separate workload changes. This supersedes earlier mandatory
push → fresh factory → image publication → new service sandbox instructions for
this source-backed loop; historical recipes and receipts retain their original
scope. The existing three-view diagram now depicts this measured source-backed workflow,
separately from general trusted image publication and historical receipts.

Users operate Veoveo through their own agents. The initial product gives each user
a hosted native OpenShell **Computer**:
private persistent OpenCode, Lore CLI, a configured Hub connection and the explicit
default `deepinfra/XiaomiMiMo/MiMo-V2.6-Pro`. The model/provider identity is selectable
in trusted installation configuration. All users are platform users; coding is one
permitted activity among using services, analyzing data and producing artifacts.

A Computer is the agent's working environment. Its native file and shell tools work
normally: working copies, experiments, scripts and scratch files may live there.
The platform consumes explicitly published content. A **Lore push**, rather than a
local commit, publishes repository changes. An **Artifact upload** publishes managed
content.

### User, Author, Build, Promote And Use

1. **Connect and select work.** The user signs in with the configured identity
   provider and connects OpenCode to the Hub. Hub discovery and actions expose the
   capabilities permitted for that user and execution context. Users can use
   services, artifacts and Lore according to each component's native permissions;
   coding is not a prerequisite for Lore access.
2. **Work on the Computer.** A permitted author uses the native Lore CLI to clone or
   sync an authorized repository/branch. The agent reads project instructions,
   edits with its normal tools, runs local checks and commits. Local commits and
   scratch files remain on that Computer until explicitly published.
3. **Publish source or content.** The author pushes to an authorized Lore branch.
   Users upload inputs/outputs to Artifact when they want platform access to them.
   Platform operations reference Lore revisions and Artifact identities; content
   is not automatically duplicated between stores.
4. **Resolve the selected environment.** Hub admits the authenticated execution
   context's environment selection and resolves its component map, including pinned
   or explicitly following base selections. The same logical MCP tool names select
   different deployment revisions/endpoints in different sessions; no global
   registration is edited to replace every user's service.
5. **Prepare source in the owned runtime.** An explicit Computer-local apply captures
   selected files as an identified snapshot; an override following a Lore branch
   instead resolves its exact immutable published revision. Both prepare a separate
   source directory in the existing override sandbox. Local edits need no commit
   or push before trying them. Run the service repository's declared checks/build
   through existing scoped native execution, reusing its toolchain and build cache.
   A separate agent-free factory remains available when isolated verification is
   needed; it is not an obligatory OCI publisher for every edit.
6. **Activate ready work.** The in-runtime launch contract starts a revision-specific
   child worker. After its application probe and distinct registration pass, Hub
   atomically selects the new route and catalog for new operations in the affected
   composition. Keep old worker/source state for captured operations and Tasks;
   never rewrite its imports or executable in place. Failed preparation keeps the
   explicitly recorded last serving revision and exposes desired-versus-serving
   failure. It does not silently switch an unhealthy selected override to its base.
   Promotion selects a tested exact source revision plus runtime/bindings; independent
   checks may still be required. Push, checks, readiness and activation are separate.

7. **Use and retrieve.** Agents call services through the Hub under the user's
   permissions and context, inspect Tasks/results and retrieve authorized Artifacts.
   Build status, diagnostics and result links reuse native status and Hub surfaces;
   the exact user-facing build-status contract remains to be designed and qualified.
8. **Change or retire.** Later pushes repeat verification. Reject late results from
   superseded or deleted generations. Existing Tasks retain their selected version
   until drain or explicit cancellation permits retirement. Authoritative deletion
   of a branch-bound environment removes owned resources according to policy;
   shared resources, retained data and bootstrap survive.

### Canonical State And Independent Lifetimes

| Place or resource | Purpose and lifetime |
|---|---|
| Hosted Computer | Private persistent agent/session and working storage, managed through native OpenShell; closing it does not delete a project or service |
| Lore | Canonical versioned project source, configuration, instructions and assets intentionally versioned; native revisions and authorization |
| Artifact | Explicitly uploaded inputs, generated outputs, datasets and deliverables, governed by content access/retention |
| Factory job | Bounded build/check execution from an immutable published revision; disposable working storage |
| Service deployment | Independently selected exact source revision, runtime/template and bindings; a reusable sandbox may retain several revision workers while operations drain |

Files must be pushed or uploaded before the platform can use them. Private agent
history on the Computer is not canonical project state. Reference identities
between Lore and Artifact; do not create an automatic second content store. Use
existing authorized Artifact upload/download byte paths for bulk data, keeping it
out of MCP/LLM payloads and Hub relays. Artifact is not an OCI image registry or
builder. Trusted runtime-image construction/distribution remains a separate optional
release path; it is not a prerequisite for every update in the source-backed loop.

The user's agent receives permitted content and may send it to its model
provider. Canonical remote storage does not establish zero client or model copies.

### Interfaces, Identity And Component Ownership

| Component | Target responsibility |
|---|---|
| User's OpenCode | Reason, edit, run normal local commands, call permitted platform tools and use the Lore CLI; OpenCode's Git providers, snapshots and undo are disabled or removed, so Lore owns source history and undo |
| Hosted Computer | Provide that same user workflow with persistent private storage, OpenCode, Lore CLI, Hub setup and the configured MiMo default |
| Lore | Native authenticated clone/sync/push, repository permissions, revision history and versioned desired configuration |
| Artifact | Managed content metadata, access and authorized direct byte transfers |
| Hub | Public installation/browser entry point, MCP discovery/actions, application permissions, execution context, delegation and Tasks; planned thin source/revision integration in the existing trusted process |
| OpenShell | Hosted Computer and factory/service sandbox execution, native templates/SDK, credentials, policy, forwarding, lifecycle and diagnostics |
| Trusted publisher | Separate optional image/release path with independently accepted checks and immutable image provenance; not the per-edit source activation owner |

Platform MCP operations go through the Hub. Inside the hosted Computer, the native
Lore CLI connects to the private Lore server over its admitted network. Lore owns
authentication and repository permissions, with separate grants/audiences from the
configured identity provider. This path requires no public native Lore forwarding.
Model inference follows the agent/provider path; the
Hub is not an LLM proxy.
Hosted model credentials use native provider custody.

Source read/write, compute, billed operations, environment selection/promotion and
administration are independently permissioned. Enforce permissions in the Hub and
native services, preserve the acting user/context, and narrow delegation. Hosted
Computers must not share an administrative identity. Browser/Computer session access and human Lore login/refresh have separate
qualified receipts; supervised factory credentials alone do not prove that human
path. The retired
Desktop authentication adapter is not part of this product.

Human Lore onboarding follows the [direct access decision](LORE_DIRECT_OIDC_PLAN.md#human-access-decision).
Hub supplies trusted nonsecret setup for the Computer's private Lore connection
and available repository IDs;
the agent configures Lore and starts native device authorization. The user approves
sign-in in the identity provider's browser flow. The target is for Lore to acquire
and refresh its own credentials in its native encrypted store, obtaining repository
authorization as operations require it. Issued claims must
reflect native Lore rights; asking for a scope cannot grant access. A denied branch
write must not block login, permitted inspection or branch selection. No separate
platform author/non-author policy is introduced.
The Hub session and Lore session have separate audiences and lifecycle. This design
uses the hosted Computer; native client and browser/session acceptance remain
distinct. The historical upstream baseline `ec6bdc219575` lacked refresh; current
maintained source and qualified native user refresh are recorded in the
[Hub-issued native Lore section](#hub-issued-native-lore-credentials) and execution
checklist. Preserve native explicit-token semantics while treating old
agent-in-factory qualification as historical.
The rejected local OIDC prototype is superseded by upstream adoption.

### One Installation Address

The selected initial product uses one public Hub/browser entry point. Bioma's
installation origin is `https://veoveo.bioma.ai`; another installation chooses its
own origin. Each user's agent and native Lore CLI run in a private hosted OpenShell
Computer with OpenCode, Lore and Hub already configured. Native Lore traffic stays
on the admitted private network. Lore validates its own bearer and permissions;
Hub provides platform access; the native Lore client owns repository operations
over the private connection.

Lore's PostgreSQL and SeaweedFS connections remain private server-side connections.
The client receives no database or bucket signing credentials. Client-facing
Artifact transfers must also use the installation origin with their signed
authority and bytes preserved; the currently deployed separate Bioma object origin
is historical configuration to replace after same-origin qualification.

The superseded public-Lore investigation found that Cloudflare Tunnel
public-hostname routing excludes native gRPC. Hosted Computers remove that public
transport dependency from the initial product. No Hub native gRPC forwarding,
public ingress replacement or DNS/tunnel change is prescribed. Source:
[Cloudflare gRPC requirements and limitations](https://developers.cloudflare.com/network/grpc-connections/).

Read-only Linux inspection at 2026-10-19 05:11 UTC confirmed the active tunnel's
latest logged Hub route to the native gateway at `127.0.0.1:17670`. The host has
private LAN IPv4, only link-local IPv6 and no listener on port 443. Public Hub
readiness and OAuth discovery returned HTTP 200 over edge HTTP/2 in 0.167 and
0.172 seconds; this does not prove native gRPC or origin HTTP/2. Router port
forwarding, WAN addressing and ISP restrictions remain unknown. These observations
are historical transport evidence, not an instruction to provision another public
ingress. No remote configuration changed. Sanitized inspection receipt:
`/tmp/lore-upgrade-evidence/bioma-ingress-inspection.json`.

### Configuration Ownership And Infrastructure As Code

Lore stores versioned desired configuration referencing native OpenShell templates
and workload definitions plus one narrow composition schema. The qualified Linux
backend is Kubernetes; Mac keeps normal development fixtures. Helm/operators own the
foundation and OpenShell owns sandbox resources; this adds no custom infrastructure
language or competing runtime inventory.

| Owner | Versioned or trusted configuration |
|---|---|
| Service repository | Source, instructions, checks, build inputs, component schema and native workload definitions |
| Environment repository | Stable environment identity/label, authorized acyclic base selection, owned overrides, exact source/artifact/native template digests, resources, approved policy/provider/data/identity references, access constraints and retention/deletion |
| Installation/operator | Registered deployment sources, trusted admission/check/publication policy, allowed targets/quotas/providers/volumes, Computer templates, model defaults and credential references |
| Native OpenShell | Validated execution schemas, admitted resources, runtime inventory, credential custody and lifecycle |

Secret values stay outside Lore. A branch cannot expand its own privileges or
replace trusted admission. Bases either pin a composition revision or explicitly
follow admitted updates; only overrides allocate additional workloads. Names such
as dev, stable or a personal experiment are labels. Hub context isolation, discovery,
delegation and Task version retention still require implementation. An unhealthy
override returns unavailable without silent fallback. Route inheritance does not
isolate data: inherited services keep their configured state, and configuration
rollback does not reverse database migrations.

The integration remains thin in the existing trusted Hub process. Notifications
are hints; authoritative revision reads and periodic reconciliation determine
current intent. OpenShell owns scheduling/execution and runtime inventory. Preserve
the exact Git source handoff while Cargo dependencies require Git revision pins;
there is no automatic bidirectional Git/Lore synchronization.

Persistent PostgreSQL/storage migration requires protocol, persistence and
backup/restore qualification. Keep the identity cold-start bootstrap independent
of its own OpenShell recovery. GPU/CDI execution is a later, separately qualified
resource capability. Phases and concrete acceptance gates are recorded in the
[execution checklist](OPENSHELL_HARDCUT_PLAN.md#agent-operated-platform-adoption-plan).

## Product Workflow

Users enter through the installation's Hub and open `/computer`. The initial
supported workflow is a private hosted Computer for each user, provisioned on
first use through native OpenShell. Each Computer runs the OpenCode web app,
native Lore CLI and a configured per-user Hub connection. Installation configuration
selects `deepinfra/XiaomiMiMo/MiMo-V2.6-Pro` by default. The source implementation
is merged into `main`; its Linux acceptance remains open.

OpenCode uses Hub for platform actions. Lore CLI connects directly to private Lore
through the OpenShell-controlled network and uses the user's native Lore login
and permissions. Everyone receives the CLI; repository and branch access remain
Lore decisions. No shared administrator identity or additional source-access gate
is introduced. The hosted path does not require public Lore gRPC ingress.

Hosted Computer integration uses Lore's existing authentication and security model
as-is. The user explicitly withdrew the custom direct-role mode and additional
repository-creation checks on 2026-10-19. Keep the requested native refresh fix;
install and connect the native CLI without adding source-access rules or changing
repository and branch permission semantics. See the
[native Lore boundary](LORE_DIRECT_OIDC_PLAN.md#hosted-computer-native-lore-boundary).

Hub's new responsibility is the issuer side of that native contract. Repository
assignments live in Hub, not Entra. The native CLI obtains a dedicated Lore login
token, exchanges it for a repository token, and refreshes through Hub's advertised
OAuth endpoints. Lore still receives native gRPC directly and enforces its existing
token grants. Its server configuration trusts Hub's issuer; its authorization and
client protocol code do not change for this design.

Working files, drafts and session state are private scratch. A Lore push publishes
an immutable revision; an explicit Artifact upload publishes managed content.
Factories run deterministic build/check commands against published revisions in
separate OpenShell sandboxes. They contain no OpenCode, model credentials or agent
instructions. The agent remains on the Computer and can fix source and push again.
Successful independent checks produce artifacts eligible for preview or promotion;
the next planned slice is environment-scoped source activation in a reusable
runtime, rather than mandatory image publication for each source edit.

Computer working storage, including its home and native client state, survives
routine runtime recreation. Computer, factory and deployed service lifetimes are
independent. Hub admits browser access using the current user's application session,
then forwards to that user's Computer through authenticated native `ForwardTcp`.
The SDK shares its gateway HTTP/2 channel; the current HTTP proxy opens a native
relay and local HTTP/1 connection for each browser request. Browser asset bursts
require TCP capacity for parallel requests, separately from the SSH connection budget. The selected
correction gives native TCP forwarding typed, configurable active and pending
limits, separately from SSH, and configures Hub's own total forwarding capacity.
Normal HTTP traffic does not use fixed retry sleeps. Cold-listener readiness has
its existing bounded wait. HTTP connection pooling can reduce setup work later;
it is not needed to remove the small native connection caps. Configuration and
rollout evidence are tracked in the execution plan.
Subsequent blank-page diagnosis reproduces a separate HTTP/2 mediator defect:
retired protocol streams still counted as exchange tasks cause valid replacement
streams to be refused. The candidate correction keeps bounded exchange tasks and
drives native HTTP/2 I/O while waiting for task retirement. Component regression
tests pass, and the exact supervisor image is now deployed on the actual Linux
host. Hub, Computer and MCP service workloads recover to Ready. Native Computer
shell, all 57 startup assets and `/api/info` return 200; authenticated public
rendering remains a separate acceptance boundary. The user also isolates a
client-router separator defect: mounted navigation produces `//settings` and
`//new-session`, while manually removing the extra slash works. OpenCode
`4bd4891` corrects only the router base, with the existing asset/PWA base retained;
its browser-routing regression and app typecheck pass. The actual Linux host has
built the source and image, and the installation Computer template selects it.
The user authorizes discarding this dev Computer workspace during replacement.
The native workspace reset also removes its provider instances; a normal browser
OAuth handoff must recreate the Computer before runtime acceptance. Subsequent
image deployments should retain owner providers and replace only the native
cloned template and sandbox, avoiding repeated sign-in.
The stale Hub Computer mapping is also reset for this development recreation.
The user-authorized removal of a stale local browser denial restores Chrome
automation, and normal Entra sign-in creates the new Computer on the fixed image.
The first callback reaches its native listener before OpenCode binds the port;
Hub `e564f60` admits the observed native Cancelled result in its existing bounded
cold-start wait. Its focused regression and compilation pass, and its Linux runtime
is deployed and Ready. A subsequent browser handoff completes. The user creates a
session and receives MiMo replies; Settings and session navigation render with the
single-slash router base. These are user-driven observations, separate from final
agent qualification. Native Hub tool discovery and Lore login remain open: the
Computer image copied an example Hub URL, and Chrome blocks the device approval
redirect under the page's same-origin-only form policy. Installation `0192bb0`
reads `COMPUTER_HUB_URL`; Hub `bfde2f2` derives it from the selected registered
profile and admits only the device request's configured broker authorization
origin in that page's form policy. The native Lore protocol and permissions do not
change. The Hub fix is deployed and Ready; Linux checks and fresh browser/native
CLI verification remain separate gates.
OpenShell owns runtime lifecycle, isolation, credential custody and diagnostics.
Computer-enabled installations give trusted Hub one dedicated native control
identity for both service forwarding and provisioning. Native workspace creation
and global-profile reads require the configured platform-admin role, with explicit
workspace, sandbox and provider read/write scopes and an exact RPC allowlist.
This is a new installation authority, not an implicit enlargement of the existing
forwarder. The same native credential reference serves both Hub connections;
endpoint binding cannot dispatch two providers on the same ForwardTcp endpoint.
Computers never receive this control identity. Their Hub and Lore actions retain
the acting user's application authority. Native issuance, mediation and renewal
of the new control identity still require deployed qualification.
See [implementation and Linux acceptance](OPENSHELL_HARDCUT_PLAN.md#hosted-computers--implementation-and-linux-acceptance)
for source-tested, deployed and still-pending boundaries.

## Hub-Issued Native Lore Credentials

Accepted on 2026-10-19 as required work within the existing hosted Computer goal.
The user explicitly approves Hub owning repository assignments and issuing Lore
tokens after Entra authenticates the person. This is an extension of Hub's existing
authorization-server responsibility. It does not restore the retired Desktop
adapter or standalone signer, and does not change Lore's native security model.

| Responsibility | Owner |
|---|---|
| Human sign-in and upstream identity proof | Existing Entra integration |
| Repository registrations, explicit access assignments and grant changes | Hub's revisioned control plane and existing PostgreSQL publication/audit |
| Device authorization, refresh families, repository token exchange, signing and JWKS | Hub's existing authorization server, generalized to protected resources |
| Native repository IDs, actions and Lore claim encoding | Typed in-process integration outside the generic Hub OAuth library |
| Signature/audience/expiry checks, repository operations and branch semantics | Unchanged native Lore server/client |
| Runtime networking and factory credential renewal/injection | Native OpenShell |

The generic issuer must operate on registered protected resources rather than
require an MCP profile for interactive grants and persisted refresh families.
Reuse `CatalogSection`, `ProtectedResourceDescriptor`, catalog admission, the
existing signer, session storage and transactional audit. Keep the composition
boundary explicit: one Hub executable links the native integration; there is no
new daemon or permission database. The common signer owns standard claims and
accepts an authorized typed issuance result. The integration supplies typed native
grants, not arbitrary claim templates or request-provided JSON.

Repository and grant management is live data, not executable registration. Typed
deployment records carry audiences, endpoints/recipients, client bindings,
repository scope templates and token lifetime policy; repository and assignment
records carry IDs, tenants, principals and native actions. Only the native wire
protocol, claim types and action vocabulary belong in code. The example
`lore-repo-{id}` template is installation data, not a compiled prefix.

Use the existing authenticated control-plane API to publish revisions and replace
the running catalog. Each issuance resolves the current admitted section; no
startup snapshot of repository rights survives in an issuer adapter or refresh
family. Managing repositories or grants requires no Hub restart. PostgreSQL's
active revision is authoritative across restarts; the configuration file seeds an
empty installation only. Deliberately importing a complete installation catalog is
an explicit trusted operator action. Do not preserve only Lore data through an
ad hoc merge with a startup file. Existing in-flight requests retain their admitted
snapshot. Replicas follow active-revision changes through the existing database
notification and reconciliation mechanism, admitting and adopting the current
revision under the same publication lock as local administrative updates. Reconnect
reconciliation recovers missed events. Propagation is asynchronous; local publication
does not establish simultaneous adoption or instantaneous token revocation.

Initial grant records identify the native repository, Lore deployment, tenant and
explicit principal assignment with native action permissions. Publish them through
the existing control-plane revision mechanism and administrative authority. Neither
Hub administration nor Work Context membership silently grants repository access.
Work Context membership is an MCP admission condition, not an additional prerequisite
for native Lore grants. Native issuance checks the registered resource/client and
the explicit tenant/principal repository assignment; retained platform attribution
does not confer or withhold repository authority.
No new read-only role is inferred from native `permission: []`: that grant allows
ordinary repository operations, including unprotected writes.

The unchanged native client requires RFC 8628 device authorization and RFC 8693
public-client token exchange, plus refresh. Its initial device request names only
the public client and scopes, so that registration must select the dedicated Lore
resource. Browser verification reuses Hub's Entra authentication broker. Discovery
advertises the actual device/token/JWKS endpoints. Public-client repository exchange
is a typed grant path separate from existing authenticated server delegation.

Login and repository access tokens have distinct issuance authority. Both must be
accepted by Lore's configured verifier and native recipient check. A login token
permits the native login-level operations and repository-token requests; repository
claims come from current Hub assignments at exchange. A repository token cannot
become unrestricted issuance authority. Use one stable native user identity through
login, refresh and exchange, a dedicated Lore audience, and the existing signed
`root_domains` claim when the private recipient is not represented by the audience
hostname. Hub's Ed25519 signing profile is source-compatible with Lore. Lore only
needs issuer/audience/claim/client/template configuration changes for this design.

Grant removal stops subsequent issuance. Already-issued native repository tokens
may remain accepted until expiry; cached tokens and in-flight operations retain
their native semantics. Token lifetime is an installation policy, not a new Lore
authorization rule. The retained `refresh_authentication` bug fix is independent
of this issuer change and remains the only requested client fix.

Native repository creation records creator metadata but does not add a Hub grant.
Initially, trusted Hub registration and explicit assignments provide known IDs/URLs.
Automatic creator assignments and self-service onboarding require an explicit
product workflow; they are not claimed native behavior. Native catalog listing
remains independently configured and does not acquire per-user filtering from this
issuer work. Do not add creation admission, branch ACLs, catalog filters or an
external native auth service to compensate for those semantics.

Computer OAuth traffic can use native OpenShell REST policies for Hub's OAuth
paths, disjoint from OpenCode's MCP path, with the ordinary proxy and CA mechanism.
Private Lore gRPC remains direct. Its installation endpoint must use a DNS name
covered by the native server certificate and resolvable by OpenShell's trusted
resolver. Native TCP policies reject literal-IP endpoint hosts. The selected
reference endpoint is `grpcs://host.openshell.internal:41337`: the existing Lore
container publishes that port on host loopback only, and OpenShell resolves its
native alias to the compute backend's exact host-gateway address. The Computer
admits the exact hostname, port and Lore executable with `protocol: tcp` and
`tls: skip`. The latter disables proxy TLS interception, not Lore's certificate
verification; immediate gRPC TLS requires this native passthrough setting. The
Computer also sets `SSL_CERT_DIR=/etc/ssl/certs` so its installed private-service
CA remains available alongside OpenShell's injected `SSL_CERT_FILE`. Factories
retain their existing inspected gRPC rules and provider credential binding. The
native backend pin replaces the earlier bridge-IP `allowed_ips` constraint; no host DNS edit or
loopback CIDR allowlist is needed. The server leaf certificate must include
`host.openshell.internal` under the existing trusted CA. The Computer template,
factory configuration and Hub deployment registry use the same endpoint; Hub
derives native recipient claims from that live deployment data. This is transport
configuration, not a change to Lore authorization. An actual Computer-image
native sandbox on Linux completes TLS/gRPC environment discovery with this route
and reaches Lore's expected unauthenticated response. User login, repository
operations and renewal remain to be qualified. Factories remain
deterministic and use their own service identities.
Their existing native renewal uses `client_secret_post`; add generic, explicitly
registered support for that method in Hub rather than a token helper. Human native
refresh state remains in each private Computer; factory secrets remain in native
OpenShell custody.

The implementation and acceptance sequence is
[HLI1–HLI7](OPENSHELL_HARDCUT_PLAN.md#hub-issued-native-lore--accepted-goal-extension).
Historical statements retiring Hub's former Lore issuer or requiring direct IdP
issuance describe the earlier factory slice; this accepted design supersedes them
for the active goal without reinstating their old implementation.

## Native Responsibilities

OpenShell owns every capability it already implements. Veoveo must not duplicate
it or require another service for the same job. Use native schemas/SDKs first,
extensions second, and narrow upstreamable changes for verified platform gaps.
The earlier factory-only Helm/Flux split is superseded. In the accepted Kubernetes
target, Helm/operators own the foundation and OpenShell owns sandbox execution.

| Need | Reuse | Remaining integration |
|---|---|---|
| Source and immutable revisions | Lore repositories, grants, hooks and notifications | Approved source-to-workload bindings |
| User Computers | Private OpenShell workspaces, persistent sandboxes, native forwarding and templates | Hub browser admission, first-use provisioning and OpenCode/Lore configuration |
| Builds, checks and deployed services | Separate OpenShell sandboxes, templates, commands, lifecycle and restarts | Exact source/artifact provenance and environment selection |
| Service reachability | Authenticated native TCP forwarding to loopback services | MCP application authentication, catalog/route selection and health acceptance |
| Runtime/GPU/storage attachment | Native driver resource fields and external-resource admission | Current Docker/CDI evidence; Kubernetes PVC/GPU and CNI boundaries still require qualification |
| Credentials and model/API access | Native profiles, attachments, refresh and credential driver | Lore lifecycle, Hub application credentials, management renewal and factory access qualified locally; wider issuer adoption remains separate |
| Policy changes and inspection | Native policies, advisor, prover, middleware/interceptors | Product-specific admission only; no duplicate approval engine |
| Sessions, terminals and diagnostics | Native SDK/CLI/TUI and observation APIs | Links to source/check results, no replacement relay or logger |
| Computer access | Hub application sessions and native workspace isolation | One owner per Computer; current permissions and session revocation |
| Human identity | Configured OAuth/OIDC provider | Application subject/permission mapping |
| Native source credentials | Hub signing, sessions, catalog publication and audit | Typed repository assignments and native Lore device/exchange/refresh issuance; accepted, not yet qualified |
| MCP application behavior | Existing Veoveo Hub and service contracts | Composition, discovery, narrowed delegation and Task authority |

Native [templates](https://docs.nvidia.com/openshell/v0.1.4/how-it-works/sandboxes/templates)
carry workload settings. The [SDK](https://docs.nvidia.com/openshell/v0.1.4/sdk/rust)
provides management and connections. Keep source links as coordination state;
OpenShell remains authoritative for runtime inventory, status and access.

The earlier instruction to remove Kubernetes/K3s/Helm was the historical Docker
candidate, not the current target. The accepted Kubernetes management plan below
supersedes it. No standalone factory service, broker, console or general CI
platform is required; keep source/revision integration in an existing trusted
process unless a concrete need justifies separation.

## Rust Interfaces And Component Flow

Lore's core library, server and CLI are Rust, as are OpenShell's core runtime and
gateway. Use their existing Rust client interfaces in the trusted Veoveo integration.
Rust is the implementation language; authenticated protocols still separate the
services. Linking a client library does not embed either server, bypass authorization
or require access to its database. Agents continue to use the ordinary Lore CLI.

| Boundary | Selected interface |
|---|---|
| Veoveo to OpenShell | Official async `openshell-sdk`, with explicit workspace and HTTPS/OIDC configuration; generated Tonic clients through `raw_grpc_fresh()` for RPCs such as `ForwardTcp` |
| Veoveo to Lore | Version-pinned Rust client surfaces: `lore` for high-level repository operations and `lore-proto` generated clients with native transport/authentication for remote RPCs |
| Lore to revision integration | Native branch notifications as wakeups, followed by authoritative reads; periodic reconciliation repairs missed events |
| Agent to Lore | Native Lore CLI with user login and refresh, over the private OpenShell-controlled network; separate factory credentials retain their native custody path |
| Veoveo Hub to deployed MCP service | Native authenticated OpenShell forwarding, carrying MCP requests with Veoveo's narrowed application token |

OpenShell documents consuming its [Rust SDK](https://docs.nvidia.com/openshell/v0.1.4/sdk/rust)
from source at the gateway's release tag. Reuse a client/channel per gateway. Configure
the credential path explicitly: native provider renewal of an opaque reference or
a supported SDK token source/refresher, as appropriate. A captured real bearer does
not renew itself. Prove the actual renewal owner across expiry, a fresh connection
and long-lived streams. The
[`lore` library](https://github.com/EpicGames/lore/blob/v0.10.1/lore/src/lib.rs)
exposes typed operations with event callbacks, including
[remote repository information](https://github.com/EpicGames/lore/blob/v0.10.1/lore/src/repository.rs)
and [notifications](https://github.com/EpicGames/lore/blob/v0.10.1/lore/src/notification.rs).
[`lore-proto`](https://github.com/EpicGames/lore/blob/v0.10.1/lore-proto/src/lib.rs)
contains generated RPC clients. These are source dependencies, not a claim of a
stable standalone Cargo SDK: Lore is pre-1.0 and its `lore` crate is `publish = false`.
Pin compatible versions and qualify the exact operations used. Prefer the high-level
client where it owns required version-control semantics; do not reconstruct those
semantics from raw storage RPCs or parse CLI output in the control plane.

The native [Lore CLI command reference](../lore/docs/reference/lore-cli-commands.md)
and [revision commands](../lore/lore-client/src/cli/commands/revision.rs) already
provide working-copy staging, commits and synchronization; repository clone and
branch push retain their native semantics. OpenShell
[`create_sandbox`/`exec`](../openshell/crates/openshell-sdk/src/client.rs) provide
the runtime operations. These primitives ground the proposed source loop; they do
not establish durable child-worker ownership or environment composition. Computer
onboarding has separate qualified receipts.

The end-to-end target is the [product workflow above](#user-author-build-promote-and-use).
Its user/agent entry point is a Computer, while factories run deterministic jobs.
The previously qualified supervised author/factory identity path remains evidence
for that specific configuration, not qualification of human device login or hosted
Computer sessions. Hub-to-service calls continue to use authenticated native
OpenShell forwarding and narrowed application tokens; users and agents do not
receive the Hub's OpenShell management token.

Target sequence (revision-triggered integration remains planned):

1. A user signs in through the installation's identity provider and opens `/computer`.
   Hub authorizes the application session and its owner-specific browser route;
   trusted provisioning uses native OpenShell management authority. The user's
   Hub application grant remains distinct from that management authority.
2. OpenShell starts or resumes the user's persistent Computer. The agent edits
   private working files and uses native Lore CLI to publish under the user's
   repository permissions. OpenShell controls network access. Native Lore owns
   the user's login/refresh state; native OpenShell owns the separately configured
   Hub provider refresh and model credentials. These are distinct credential paths.
3. A Lore notification hints that desired state changed. Hub's planned thin module
   rereads the registered environment and source references authoritatively; periodic
   reconciliation repairs missed notifications. Only explicit branch followers
   advance. Pinned environments and unrelated users/base/overrides are unchanged.
4. The module prepares the exact source revision and child worker in the override's
   existing native Kubernetes runtime, using its persistent cache. The in-runtime
   owner, application probe and multi-instance registration must be implemented and
   qualified before atomic route/catalog activation. No image push or Hub restart
   is required by this ordinary source-update design.

5. An MCP client calls the Veoveo Hub with its execution context. The Hub resolves
   the selected service version, checks application permission and opens authenticated
   OpenShell forwarding to that service. The service receives a narrowed application
   token. Neither the user nor agent receives the Hub's OpenShell management token.
6. Later pushes repeat that scoped path; promotion selects tested exact source, runtime and bindings. Branch deletion
   triggers an authoritative ownership check, Task drain/retention decisions and native
   OpenShell deletion of owned workloads. Inherited services and bootstrap remain.

Only the source/revision-to-workload mapping and Veoveo application semantics are
custom. Runtime state, credential custody, execution, forwarding, restarts, policy
and diagnostics retain their native OpenShell owners. No new Rust SDK, broker or
deployment service is required to connect these existing interfaces.

## Capability Evidence And Remaining Gaps

The reviewed v0.1.4 API has `SandboxSpec.command`, `restart_policy`, native service
exposures and workspace templates. Restart policies are `Never`, `OnFailure` and
`Always`; omission means `Never`. See
[`openshell.proto`](https://github.com/NVIDIA/OpenShell/blob/v0.1.4/proto/openshell.proto)
and [restart handling](https://github.com/NVIDIA/OpenShell/blob/v0.1.4/crates/openshell-server/src/compute/mod.rs).
A long-running service is therefore already a native workload, not a feature that
requires a separate deployment controller or a Veoveo process supervisor.

The public API inspected does not establish a deployment-group controller with
replica counts, autoscaling or coordinated rolling updates. For the planned source
loop, reuse one admitted sandbox per owned override and keep revision workers
separate within it. Template/toolchain changes remain explicit native workload
changes; do not claim template edits update existing sandboxes.
If fleet orchestration becomes required, first evaluate an OpenShell extension or
upstream contribution. Do not silently recreate it in Veoveo or restore Flux.

Native runtime `Ready` is distinct from application readiness. Use current service
registration and an application probe before selecting a version. The documented
lifecycle also has a recovery gap: a gateway crash while owning a driver operation
can leave the record pending with no resolution API. Qualify crash recovery and
close a proven gap in OpenShell before depending on it for durable service hosting.
Do not add a competing Veoveo restart/watchdog controller.

OpenShell attaches existing admitted volumes; that does not establish database
replication, backup orchestration or an arbitrary infrastructure provisioner.
PostgreSQL and SeaweedFS remain data services. Prefer running compatible instances
as native workloads with protected storage, and qualify their protocols/persistence
before replacing their existing bootstrap. Run compatible infrastructure through
OpenShell too, with operator-owned workspaces and retained volumes. Local Keycloak,
its dedicated database and HTTPS endpoint remain the minimal external bootstrap:
OpenShell initializes its OIDC issuer before workload recovery, so hosting the only
issuer inside that same gateway creates a cold-start loop. External Entra/customer
issuers need no local Keycloak stack. Root OpenShell/Lore/identity/storage recovery
remains independent of disposable environment branches.

## PostgreSQL Extensions

The installation supplies pgvector and PostGIS in the existing `veoveo` database.
The PostgreSQL image adds pinned extension packages to the existing pinned server;
trusted bootstrap enables them in `_extensions`. That schema permits shared use
of the extension types, functions and reference data, without application CREATE
permission. Existing service schemas, table owners, registration roles and search
paths remain unchanged. Services qualify extension names when adding their own
columns, queries and indexes. Availability does not imply that an MCP already
exposes vector search or spatial operations.

The template and Bioma reference use the same
[extension build, enablement and verification instructions](https://github.com/VeoveoAI/veoveo-template-installation/blob/844e89386f2831ed7d5d45556fdc6cf13f4b9047/postgres/README.md).
The execution checklist records deployed qualification; Keycloak's separate
PostgreSQL service is unchanged.

## Lore Storage Backend

Accepted on 2026-10-18; implementation is installed and local storage conformance
and restart/persistence checks pass. Published Lore
`7785408e70ed302296a24383ae302c3a606e78c3`, merged into `origin/main` at
`9152e7fcb6c0be1c62ec05490f787d271a6d8d3f` with an identical source tree, uses the existing
SeaweedFS service for immutable payloads and the **same
`veoveo` PostgreSQL database** used by the platform for its storage indexes and
mutable references. A dedicated `lore` schema and service login separate Lore's
tables from application tables. A dedicated Lore bucket and signing identity
separate its bytes from Artifact content. Separate Lore, PostgreSQL and SeaweedFS
restarts preserve the exact Time source revision, bytes and native storage references.
The old local volume is retained but inactive;
old history was not migrated. Time source was republished into the fresh backend.
This local proof does not establish power-loss recovery, backup/restore or Linux deployment.

This is a generic S3 + PostgreSQL backend implemented as a separate Rust crate,
`lore-s3-postgres`, inside the maintained Lore fork, with a small native server
plugin registration. The exact Lore source revision pins both sides of the
interface. The implementation is an upstream contribution candidate; independent
repository/releases are unnecessary for the initial integration. Lore retains its
native protocol, repository permissions, revisions and CLI. Hub has no new storage
or credential-broker responsibility.

Upstream's current AWS backend stores payloads in S3 but still requires DynamoDB
for partition/context associations and payload lifecycle state. Keeping its mutable
store local does not remove that dependency. The new backend therefore implements
the immutable index as well as mutable compare-and-swap references in PostgreSQL.
Native local resource locks remain scoped to one Lore process; this does not
qualify a multiple-server deployment or high availability.

PostgreSQL chooses the published representation and its associations atomically.
S3 uploads use distinct immutable object keys so a late upload or deletion cannot
overwrite a newer published representation. Upload completion alone does not
publish a Lore object. Storage failure and cancellation tests must cover these
two-resource boundaries, cross-partition access, shared references, copy,
obliteration, competing reference updates and restart recovery. Native storage
conformance and deployed clone/edit/push checks are separate gates. Unreachable
objects left by canceled uploads require an explicit, documented reclamation
policy; no background integration daemon or implicit transaction across S3 and
PostgreSQL is assumed.

The installation provisions the dedicated schema/login and bucket identity using
native PostgreSQL and SeaweedFS administration. Credentials remain in trusted
private installation state and never enter source, images or factories. During
development, initialize fresh Lore application state and reseed from retained
source and trusted identity/configuration inputs; do not add a legacy storage
migration to preserve disposable fixtures. See the
[execution record](OPENSHELL_HARDCUT_PLAN.md#upstream-lore-adoption--2026-10-18)
for actual source, tests and cutover status.

The Linux reference shares one SeaweedFS service between Artifact and Lore. Each
component has its own bucket and scoped storage identity. Lore also uses its own
schema and restricted database login in the existing PostgreSQL instance. Sharing
these services does not combine application credentials or repository and artifact
permissions. Backend access checks remain separate from native Lore user and
repository acceptance.

## Workspaces And Runtime Placement

A Computer is the user's persistent authoring and service-operation environment.
It can contain several repositories permitted by native Lore. Each Computer has
its own OpenShell workspace and stable sandbox identity. A factory is an independent
build/check job; verification starts from the published revision rather than the
Computer's mutable directory. Factories have no agent runtime or inference provider.

An OpenShell workspace is an access grouping containing sandboxes, providers and
templates. A Veoveo execution context selects service versions. Map them explicitly:
they are not interchangeable identifiers. Native OpenShell workspace users can
operate resources within their membership boundary, so private work must not rely
on sandbox names to hide it from unrelated members of the same OpenShell workspace.

Current Mac/Linux qualification used OpenShell's native Docker driver and Linux
NVIDIA CDI. The accepted Linux replacement is OpenShell's Kubernetes driver on K3s; its PVC,
network enforcement and GPU resource path require separate qualification. Mac
remains native source development and component/integration testing with local
fixtures. Native Mac MPS remains an explicit external development service.

The Docker driver uses a separate trusted supervisor and a fenced workload. It is
not equivalent to the current bare Compose agent containers. Qualify the driver's
host prerequisites and actual boundary, including persistence and CUDA. Container
and GPU-driver isolation do not imply a VM boundary. Qualify this selected boundary
against the threat model before migration; do not weaken it to make a probe pass.

## One Service Deployment Path

Every managed MCP deployment uses an OpenShell service sandbox. A source-backed
deployment may retain several exact revision workers in that sandbox. Use its
admitted runtime image/template, canonical launch contract, native resources, approved policy,
provider attachments and authenticated forwarding. Author/build/check sandboxes use the
same execution system with different workload definitions. Published services stay
independent of their author's workspace lifetime.

The planned source-backed path is exact Lore revision, declared checks/incremental
build, a ready revision worker in its existing admitted OpenShell runtime, then
composition-scoped Hub routing. It does not require an image publish or a new
sandbox per source edit. Promotion selects tested exact source plus runtime and
bindings; image-backed releases remain a separate option.
There is no OpenShell-only preview mode alongside a Helm/Flux release mode.

Use native authenticated `ForwardTcp` for private MCP connectivity from the
trusted Veoveo Hub to each sandbox's loopback listener. The v0.1.4 RPC requires
bearer authentication, `sandbox:write` scope and workspace membership, and resolves
the target sandbox under that principal before opening the supervisor relay. See
[`ForwardTcp`](https://github.com/NVIDIA/OpenShell/blob/v0.1.4/proto/openshell.proto)
and [its handler](https://github.com/NVIDIA/OpenShell/blob/v0.1.4/crates/openshell-server/src/grpc/sandbox.rs).
Use the native SDK/raw client transport; add a generic SDK stream adapter if needed,
not a new relay service. Keep its management credential in the trusted Hub,
outside factories, build/check jobs and MCP service workloads.
The current scope is broader than forward-only; qualify least-privilege workspace
placement and add a native capability if finer transport authority is required.

Do not publish an unauthenticated service exposure for these private MCP workloads.
OpenShell's HTTP service URLs bypass control-plane OIDC. Requiring agent-authored
application code alone to authenticate those URLs would not establish a trusted
private boundary. Native authenticated forwarding is the single selected MCP
transport. Application requests still carry Veoveo's short-lived, audience-bound,
permission-narrowed tokens, never the user's general identity or OpenShell token.

Qualify streaming, cancellation, limits, credential expiry, workspace revocation
and reconnection with the actual SDK. The native TCP relay can carry protocols
without parsing them; it does not inject or protect credentials inside Lore gRPC.
The separate browser-facing service implementation uses HTTP/1.1 upstream, so its
existence also does not close that gap. See
[service routing](https://github.com/NVIDIA/OpenShell/blob/v0.1.4/crates/openshell-server/src/service_routing.rs).
Use a native enhancement for an actual transport limit rather than another launcher.
Retire replaced paths after qualification.

Runtime restarts remain OpenShell-owned. Version promotion and Task drain are
application decisions: the integration changes the selected revision only after
checks and application readiness; pinned Tasks keep their version. Source changes
cannot grant providers, host mounts, administrative credentials or a weaker boundary.

## Planned Adoption Of Existing Veoveo Components

This describes the application integration sequence. Hub/Time, the prepared Time
factory pass, private Artifact and private fake-provider Media now have local
acceptance recorded in the execution checklist.
The [visual guide's Platform now view](diagrams/veoveo-platform.html#platform)
shows Mac and Linux evidence separately; its [next integration view](diagrams/veoveo-platform.html#next)
shows hosted Computers, publication and independent factories. Hub plus Time were
qualified first, followed by a build-only factory task from a known-good Time Lore
revision and then private Artifact. This is an unused local Mac installation: replace and restart local
services directly. Production continuity, parallel deployments and rollout
automation are not prerequisites. Select explicit runtime images; automatic
Lore-to-image deployment remains later work.

| Existing component | Use in this integration | Placement and status |
|---|---|---|
| `veoveo-hub` | MCP entry point, dynamic server registration/catalog, caller permissions, narrowed forwarded identity and server-to-server delegation | Qualified locally: trusted OpenShell service sandbox in an operator-owned control workspace; its OpenShell client can forward only into the approved service workspaces |
| `veoveo-mcp-time` | Resolve/convert time, expand a schedule as a durable Task, create an event and receive its resource updates | Qualified locally: first private MCP service sandbox, port 8800 and `/time/mcp`; persistent `/var/lib/veoveo/time` for registration identity and authority files |
| `veoveo-mcp-artifact` | Upload, verify, list and download tenant-owned files; enforce artifact access | Qualified locally: second private MCP service sandbox, port 8801 and `/artifact/mcp`; persistent registration key, PostgreSQL metadata and SeaweedFS/S3 bytes |
| `veoveo-mcp-media` | Discover models and run generation as a durable Task; store outputs through Artifact and record usage | Qualified locally: third private MCP service sandbox, port 8802 and `/media/mcp`; persistent registration key, PostgreSQL run state and a separate native fake-provider fixture; one real WaveSpeed polling run qualifies on Mac and one signed Events callback qualifies on Linux, while other models remain later work |
| `veoveo-core` | Database kernel, identity, durable Tasks, audit and usage | Libraries inside the Hub/services; their durable state remains in the installation PostgreSQL database |
| `veoveo-hub-sdk` | MCP hosting/client, registration, forwarded-token checks, Task adapter, subscriptions and delegated calls | Libraries inside the Hub/services; its existing CLI is an initial application client |
| `veoveo-template-installation` | Assemble images, native workload/policy/provider definitions, approved endpoints and volumes | Existing installation repository; no second deployment manifest or component lock |

Each MCP service runs independently of factories and build/check jobs. The Hub
is trusted control code, not agent-authored code. Only that trusted Hub receives
the native OpenShell management authority needed for `ForwardTcp`; MCP services and
author/build jobs do not. Select explicit workspace IDs and qualify the actual
native permission boundary, since current forwarding authority includes
`sandbox:write`. The Hub's own restart, volumes and readiness use OpenShell's
native workload lifecycle. Its application endpoint must remain available to
services for registration and delegation; no service needs to manage OpenShell.

PostgreSQL and SeaweedFS initially remain in their existing trusted installation
placement. Admit only the service connections they need. Move these durable services
under OpenShell only after volume access and backup/restore qualification. Local
Keycloak, its dedicated database and HTTPS bootstrap remain outside OpenShell.
Lore's current service and authoring path stay as already qualified during this slice.

The active Linux reference goal selects the existing Bioma Microsoft Entra tenant,
with operator authorization to configure the required applications and grants.
[BiomaAI/veoveo-installation](https://github.com/BiomaAI/veoveo-installation) owns
the concrete public reference configuration, derived from the shared
[installation template](https://github.com/VeoveoAI/veoveo-template-installation)
with common Git history. Reusable installation fixes go to the template first;
Bioma records its selected native policies, source revisions, public routes and
qualification status. Private runtime state and credentials stay outside Git.
OpenShell uses native OIDC validation for a separate management audience and a
restricted Hub forwarder. Hub uses its existing Entra authorization-code broker:
Entra authenticates the human, while Hub issues its application access/refresh
tokens and enforces explicit principal membership and permissions. This retains
Hub's application OAuth responsibility and does not restore its retired Lore
issuer. Two clients for the same human do not create different risk grants;
concurrent ordinary-member and billed/admin acceptance needs distinct principals.
The existing dedicated public tunnel routes Hub and only Media's signed
callback path to verified native service exposures. Artifact's signed byte
requests use a separate public S3 authority and SeaweedFS's native HTTPS listener.
These paths are deployed. After the merged typed-contract cutover and authorized
application reset, fresh administrator/member Entra-to-Hub admission and Time's
seven baseline cases pass. Earlier native renewal and large Artifact multipart
successes remain evidence for their recorded frozen revisions. The fresh stack's
Time baseline passes seven cases in 14.61 seconds libtest; Artifact passes all six
private cases in 406.48 seconds libtest / 406.534 seconds outer native Exec,
including its large-object proof. The six Media fake baseline cases also pass in
51.28 seconds libtest / 51.336316 seconds outer Exec. All three same-record
terminal restart verifies and Media's coordinated in-flight Media+Hub restart
pass. Fresh calls from both roles pass beyond the source-derived original-JWT
expiry bound in one runner with unchanged opaque handles; this does not prove
uninterrupted streams or exact token issuance timestamps. Time's reviewed
in-flight restart also passes in 24.91 seconds: the same Task is Working after
restart, then a reopened subscription receives pushed completion and the expected
64-window schedule. Earlier timing/harness attempts remain inconclusive history,
not established product failures. The [reference receipt](OPENSHELL_HARDCUT_PLAN.md#reference-linux-deployment-and-signed-wavespeed-webhook-goal)
retains initial native-Ready-only failures and the application-ready retries.
The public Media route previously rejected invalid signatures; a real
signed Events callback now passes on Linux as recorded in the
[dated receipt](OPENSHELL_HARDCUT_PLAN.md#linux-real-wavespeed-signed-events-receipt--2026-10-19).
Mac qualification does not
establish these Linux gates. See the
[reference gates](OPENSHELL_HARDCUT_PLAN.md#reference-linux-deployment-and-signed-wavespeed-webhook-goal).

### Hub And SDK Naming And Ownership

Use these names throughout the application integration. Local checkouts use the
new names. Core, SDK, Time, Artifact and the MCP template have committed preparation.
Hub, Time's acceptance changes, Media's rename and native installation preparation
are checked, committed and published. The documentation records qualification
separately from source publication. Exact Git/Lore correspondence, factory preflight,
the bounded model build and Time deployment from that revision now pass locally.
The execution checklist records source revisions, publication status and open gates.
Links below point to the renamed local checkouts.

The names describe component roles: the Hub connects services, and the Hub SDK
implements the shared contracts for participating services and clients. MCP remains
explicit in current protocol contracts and transport modules. Future protocol support
can follow concrete integration needs; this rename preserves the current behavior.

| Previous repository | Target repository and primary package | Responsibility |
|---|---|---|
| `veoveo-service-gateway` | `veoveo-hub` | Service registration/catalog, application authorization, MCP routing, narrowed forwarded identity and server-to-server delegation |
| `veoveo-sdk-rust` | `veoveo-hub-sdk` | Shared MCP service contracts, hosting/client implementations, registration, Tasks adapter and delegated calls |

The Hub connects services through their declared contracts. The SDK implements
the shared mechanics; each service owns its domain contract. Core supplies the
database kernel, durable Tasks, audit and usage. OpenShell owns workload lifecycle,
sandbox boundaries and credential custody. Lore owns source and repository access.

**Complete the naming change across source and documentation.** Rename the
repositories, owned packages/crates/binaries and SDK companion crates consistently;
use `veoveo-hub-sdk-cli`, `veoveo-hub-sdk-fixture` and
`veoveo-hub-sdk-conformance` for the existing companions. Update consumers, Rust
imports, Git dependency URLs/pins, Cargo locks, build/image references,
installation configuration, tests and documentation. Remove the Veoveo Gateway
name and its application-owned `Gateway`/`gateway` identifiers, including owned
configuration, schema, audit and telemetry names, in favor of Hub naming.
Change shared declarations in their owning repository before updating consumers.
Use the existing local setup/reset path for changed stored names; preserve Lore
repositories and unrelated durable data. Keep native OpenShell gateway references
and standard protocol terminology accurate. Keep standard MCP/OAuth routes and
fields intact. Use direct replacements, without old-name aliases, wrappers,
duplicate manifests or compatibility paths. Sweep all active repositories and
docs for stale references, including this plan's source links and visual guide.

**Remove the superseded Lore credential issuer.** Hub `00a7e7b` deletes the former
`src/bin/gateway/lore_tokens.rs`, its
Lore token dispatch and `src/control_plane/lore.rs`; no renamed `lore_tokens.rs`
exists in the inspected source. Resource resolution, grants, validation, tests,
fixtures and docs were reviewed with the combined diff. Obsolete Hub-issued Lore
client/key generation in `src/local.rs` and its binary CLI options are removed. Preserve installation
`identity/configure-lore`, which provisions direct-IdP Lore clients and providers.
The cleanup now rejects retired `lore` configuration and adds negative issuance
regressions; the fresh Hub component gate passed as recorded in the execution
checklist. Do not recreate deleted
modules to satisfy stale links or instructions. The installation's IdP issues Lore grants directly;
native OpenShell providers renew and inject them; Lore validates them through
native OIDC discovery/JWKS.

Retain the Hub's MCP application authentication, registration, per-request
forwarded-token signing and narrowed delegation/token exchange. Keep generic
OAuth/JWKS machinery required by those flows. The direct-IdP Lore configuration,
existing Lore push hook and OpenShell custody/renewal remain in their current owners.

Done when builds and focused checks pass under the new names, every active consumer
resolves the renamed dependencies, Veoveo-owned old names and Lore-issuer paths are
gone, and MCP registration, forwarded identity and delegation still work. Verify
that a Lore resource request cannot obtain a token from the Hub and that direct-IdP
Lore access remains configured. Use focused component regressions and the planned
Hub/Time integration checks; record the actual checks in the execution checklist.

<a id="first-factory-task-build-prepared-time-source"></a>

### Historical First Factory Task: Build Prepared Time Source

This completed acceptance recipe records the former agent-in-factory experiment.
Preserve its commands and measured evidence; it does not define the future product
workflow. New factories use deterministic commands, with the agent on a Computer.

The main development session owns Hub/Time integration, source fixes, component
checks and environment preparation. Complete those before invoking the factory's
model. The first factory task is to clone the supplied Lore revision, build Time
and report the result. It does not require a feature change or autonomous debugging.
Keeping edits out of this assignment is a cost/scope decision, not a new permission
restriction; preserve ordinary Lore grants and the existing push hook.

1. **Prepare and verify Hub + Time.** Qualify the connections and Time
   operations below using deterministic SDK/CLI calls. Fix source, configuration,
   registration, dependency and network errors in the main development session.
   Keep using the direct IdP Lore path; older component README examples of Compose
   routing or Hub-issued Lore credentials are not installation instructions
   for this integration.
2. **Put the prepared source in Lore and Git.** Commit and push the tested source
   to the existing Git remote, then seed Time's Lore repository from that exact
   tracked tree. Verify paths, bytes, executable bits and symlinks. Keep the VCS
   working directories separate and exclude their metadata, local secrets and
   build output. Record the Git commit and Lore revision in the execution
   checklist's concise acceptance entry. No source modification is needed merely
   to demonstrate the first build.
3. **Prepare the factory without spending model tokens.** Reuse Time's Dockerfile
   `dev` stage plus the shared installation's Lore/agent layer. It owns the Rust
   toolchain, PostgreSQL test tools and component checks. Configure dependency
   access/caches, inference, the approved Hub MCP endpoint and credentials
   through the existing OpenShell mechanisms. Keep the existing two-step smoke
   agent intact; installation now defines a separate four-step `prepared-time`
   agent with bounded output and MCP integrations denied. Validate the installed
   shell timeout before invoking the model. Manually preflight a
   fresh Lore clone and the exact build in the same image/policy/provider setup.
   Use the SDK client from the factory network path to verify Hub discovery
   and a Time call; the model need not explore or repair MCP integration.
4. **Run the bounded model task.** Supply the immutable Lore revision, clone
   instructions, working directory and
   `cargo build --locked --release --bin veoveo-mcp-time`. Ask for the source
   revision, command, exit status and `target/release/veoveo-mcp-time` output path.
   Build source in this run; dependency caches are fine, a supplied prebuilt Time
   binary is not proof. On failure, return the command output to the main
   development session. Do not ask the model to diagnose, edit, change dependency
   pins or retry speculative fixes. Check that the source tree remains unchanged.
5. **Use the result locally.** The operator builds Time's runtime image from the
   same Lore tree using its existing Dockerfile on the Mac, replaces the local
   OpenShell service and verifies readiness plus a Hub-routed Time call.
   Keep image construction and deployment outside the model's assignment; no
   Docker socket or new CI/deployment controller is needed in the factory.

Done when the factory builds the prepared Time revision from Lore, the corresponding
local service works through the Hub, and the matching source is pushed to Git.
The service runtime and the build factory remain separate workloads.

Git stays in parallel through ordinary source handoffs, not a permanent sync
adapter. For subsequent Lore-authored work, copy an exact revision into a separate
Git checkout, verify additions/deletions/content/modes/symlinks, commit with the
Lore revision in the message and push. Edit through one source path per task and
reconcile any intervening Git changes before continuing. A pushed Git tree protects
the source; it does not back up Lore's repository metadata or replace its data
backup. Cargo still resolves Core, SDK and other dependencies from pinned Git
revisions. Keep those pins for this first pass; publish a changed dependency to Git
before updating a consumer. Removing that dependency on Git is a separate decision.

### Implementation Decisions For The Prepared Time Pass

These decisions follow the current code, not just the desired topology. Read the
linked implementations and each repository's `AGENTS.md` before changing them.
Implementation decisions and measured acceptance are distinguished below. The
execution checklist records fresh component checks, deployed Hub/Time acceptance,
exact Git/Lore correspondence, and the successful bounded factory build. Do not turn
an unproven connection into a broader architecture change to make the checklist pass.

| Concern | Existing code to reuse | Decision for this pass |
|---|---|---|
| Factory image | [installation factory Dockerfile](../veoveo-template-installation/factory/Dockerfile), [Time Dockerfile](../veoveo-mcp-time/Dockerfile) | The shared factory already accepts `ARG BASE`. Build Time's `dev` target and use that image as `BASE`; retain the existing Lore/CA/agent additions. Do not duplicate Time's toolchain or create another universal factory image. |
| Factory filesystem | [native factory policy](../veoveo-template-installation/openshell/factory.yaml), [Time shell profile](../veoveo-mcp-time/env/profile.d/rust.sh), [offline SQL metadata](../veoveo-mcp-time/.cargo/config.toml) | `/usr` is read-only, but Time defaults `CARGO_HOME` to `/usr/local/cargo`. Use an explicit writable cache under `/sandbox`, set it after any login-shell profile, and use a fresh target directory for the proof. Keep the installed toolchain read-only. SQLX_OFFLINE already permits this release build without a running database. |
| Factory MCP client | [SDK CLI access](../veoveo-hub-sdk/crates/veoveo-hub-sdk-cli/src/main.rs), [CLI connection](../veoveo-hub-sdk/crates/veoveo-hub-sdk-cli/src/hub.rs), [SDK bearer sources](../veoveo-hub-sdk/crates/veoveo-hub-sdk/src/client.rs) | The committed CLI supports `--bearer-env` / `VEOVEO_CLI_BEARER_ENV` through `HubAuthentication::BearerFromEnvironment`, `StaticBearer` and `HubClient`; caller keys are conditional. Reuse this input and qualify it from the actual factory network path. In the factory, supply only the native OpenShell opaque reference. No private caller key, token fetcher or refresh worker belongs there. |
| Application admission | [JWT verification](../veoveo-hub/crates/veoveo-hub/src/auth/access_token.rs), [claim shape](../veoveo-hub/crates/veoveo-hub/src/auth/claims.rs), [current client authority](../veoveo-hub/crates/veoveo-hub/src/oauth_clients.rs), [context membership](../veoveo-hub/crates/veoveo-hub/src/catalog.rs) | Configure the local IdP and existing Hub catalog to satisfy this contract. Generic OIDC login or a valid Lore token does not establish application access. Preserve the verifier and authority checks. |
| Private MCP transport | [per-server HTTP pool](../veoveo-hub/crates/veoveo-hub/src/mcp/upstream_http.rs), [request authorization](../veoveo-hub/crates/veoveo-hub/src/mcp/upstream_authorized_http.rs), [discovery recovery](../veoveo-hub/crates/veoveo-hub/src/mcp/upstream_connection.rs), [native forwarding proof](../veoveo-qualify-openshell/src/bin/first-path.rs) | Hub `00a7e7b` adds [typed bindings](../veoveo-hub/crates/veoveo-hub/src/control_plane/native_upstreams.rs) and [in-process Unix/native transport](../veoveo-hub/crates/veoveo-hub/src/mcp/native_upstreams.rs), wired into the existing reqwest pool. Deployed forwarding, renewal, subscriptions, reconnect, Task cancellation and coordinated restart checks pass. The echo fixture alone does not qualify this client. |
| Service startup | [Time registration](../veoveo-mcp-time/crates/veoveo-mcp-time/src/server/registration.rs), [startup](../veoveo-mcp-time/crates/veoveo-mcp-time/src/server/mod.rs), [configuration](../veoveo-mcp-time/crates/veoveo-mcp-time/src/server/config.rs), [SDK registration](../veoveo-hub-sdk/crates/veoveo-hub-sdk/src/registration/client.rs) | Start PostgreSQL, then Hub, then Time. Time registers before serving, receives its database login and token trust from registration, migrates its own schema and holds a process-instance lock. Preserve this lifecycle instead of inventing a heartbeat, database credential distribution API or registration controller. |
| Acceptance | [Time live acceptance](../veoveo-mcp-time/crates/veoveo-mcp-time/tests/acceptance.rs), [Hub transport tests](../veoveo-hub/crates/veoveo-hub/src/mcp/upstream_connection/tests.rs) | Time `90eabf9` preserves behavior assertions, selects member/admin SDK static bearers through environment-variable names and adds coordinated restart probes. The trusted qualification runner can hold both references; the author factory gets only its member reference. No caller signing keys are copied. Component checks, deployed Hub/Time acceptance and the factory path preflight pass. Keep domain tests in Time and generic transport tests in Hub. |

**Application identity must be configured before diagnosing MCP transport.** The
Hub requires `typ=at+jwt`, the selected profile's audience and scopes, `client_id`
and the existing namespaced principal, Work Context and invocation-mode claims.
The catalog must contain the OAuth client, allowed resource/scopes, tenant/context
and membership. For a non-delegated machine caller use the existing `automated`
mode: service principal, subject equal to client ID, matching tenant, and no
initiator/delegation claims. These are current Hub requirements. Configure
Keycloak's supported token settings/mappers and the existing catalog; prove
admission with one deterministic request. OIDC identity-provider claim mapping
does not automatically supply this access-token contract. Keep Lore's issuer and
grants independent; the Hub's existing application and forwarded-token signing
responsibilities do not make it a Lore issuer.

The external authorization server has no Hub access-token signing fields. Its
client registrations describe the actual confidential authentication method used
by the native provider (`client_secret_post` locally); Hub does not need their
secrets or caller keys to admit an already verified token. The validation correction
retains hosted-client requirements and all resource, scope and context checks.
Local issuance additionally requires Hub's own issuer and token endpoint even if
stale signing configuration remains. These source changes require their component
checks and actual IdP admission before this integration is accepted.

**Review the drafted HTTP machinery over native forwarding.** The pinned reqwest 0.13.5
supports [`ClientBuilder::unix_socket`](https://docs.rs/reqwest/0.13.5/reqwest/struct.ClientBuilder.html#method.unix_socket),
which retains the request URI and uses TLS over the socket for an HTTPS URI.
The current draft uses a private, process-owned Unix listener per approved endpoint: each accepted
connection opens a fresh authenticated native `ForwardTcp` stream to the bound
workspace/sandbox/loopback port and pumps bytes in both directions with bounded
buffers and cancellation. Configure that server's existing reqwest client to use
the socket. This is a transport module in Hub, not a daemon, public port,
new MCP implementation or upstream patch. The existing `connector_layer` API wraps
reqwest's connector; it is not an arbitrary raw-stream injection API.

The draft binding is in Hub's typed configuration, to be populated by the
installation, keyed by the admitted logical endpoint rather than hardcoded Time
knowledge. Native transport configuration is fixed at startup. The reviewed
correction rejects changes before durable catalog publication and again at
replacement; restart Hub to change placement. Keep the registered URI, Host and token audience intact; the service
still arrives through registration. A missing binding fails explicitly. Preserve
per-server connection pooling, disposal on transport failure, request-specific
tokens, streaming response bodies and the existing one retry of read-only discovery.
Do not add a total timeout to long-lived subscriptions or replay a mutating tool
request after an ambiguous failure. Close the socket/stream tasks with their owner
and recreate connections after service replacement. Prove ordinary calls, streamed
updates and reconnect with this small module before wiring the rest of the stack.
If it cannot meet those requirements, report the concrete limitation before
replacing the HTTP stack or changing Lore/OpenShell internals.

**Qualify the management credential path explicitly.** The draft reads its bearer
environment variable once and constructs `AuthConfig::oidc(bearer)`, a static SDK
credential without configured expiry/refresher. Calling `raw_grpc_fresh()` alone
does not make that credential renew. The intended native opaque-reference/provider
path must be proved from the deployed Hub across real expiry and a fresh forwarding
connection. Keep custody and renewal native; do not add a token worker, assume an
environment reread, or transfer management credentials into Time or the factory.
Resolve any demonstrated native limitation with the coordinator before changing
component responsibilities.

The installation's [Hub/Time preparation](../veoveo-template-installation/openshell/HUB_TIME.md)
uses the native workload CA at `/run/openshell-supervisor-ca/material/ca.crt`
for Hub's pinned SDK connection. That connection sees the supervisor's TLS
interception certificate. The supervisor separately verifies the upstream gateway
with its driver-owned CA at the pinned destination. Copying the original gateway
CA into Hub would not establish trust in the intercepted connection. Workload CA
paths are provisioned read-only by OpenShell; no authored broad `/run` grant is needed.


**Distinguish application ingress from private service access.** For Hub's
application origin, qualify native `ServiceExposure` with `BearerPassthrough`,
TLS/host routing and Hub's own application authentication. Use that origin for
factory calls and Time's return traffic. Establish consistent DNS resolution, request
authority/Host, service route and certificate-name/CA verification from those actual
sandboxes. The cleanup removes the obsolete Compose/Envoy Hub application routes
and container reexec helper from source; bootstrap configuration validation passed.
The orphaned `vv-egress` proxy and its setup were also removed; verified Keycloak
discovery remains healthy through the retained identity HTTPS bootstrap. These
removals do not establish native application ingress. Hub uses native service
ingress; private Time traffic uses authenticated native forwarding.
The native exposure relay deliberately sends `Host: 127.0.0.1:8080` to Hub.
This loopback-bound deployment therefore selects Hub's existing
`--allow-loopback-hosts` option. It admits the three loopback names as well as the
configured public authority; the listener remains `127.0.0.1:8080`, and the public
issuer, metadata URLs and token audiences remain fixed to the native HTTPS origin.
External DNS, request authority and TLS checks still apply before that relay.
Time's byte-preserving private `ForwardTcp` path retains `time.internal:8800` and
keeps its loopback-host option disabled. Verified Hub metadata and unauthenticated
MCP admission now pass, and the initial Time sandbox has registered and connected
to PostgreSQL. Deployed client checks pass member calls, permission checks, event
notifications and reconnect. The demonstrated native Task-inspection gap is closed
by the narrow extension described below; Task completion/cancellation and
coordinated restart recovery now pass. Native management renewal passed through original token expiry with
a fresh forwarding connection and unchanged Hub process; see the checklist.
The 2026-10-17 investigation demonstrated that generated `.openshell.localhost`
service names lacked a sandbox DNS route, while a host-alias/Host override correctly
fails authority enforcement. The approved narrow native extension resolves one
label beneath that reserved suffix to the existing trusted HTTPS gateway socket,
only when the supervisor endpoint agrees with the backend IP and requested port.
Policy and executable admission, TLS verification and request authority remain
unchanged. Unsupported coordinates fail closed; custom domains and separate gRPC
and ingress ports are outside this extension. It needs no new DNS infrastructure
or protobuf metadata. The extension is implemented in OpenShell `fce7a790` and
passes the macOS and Linux ARM64 network library suites and macOS strict Clippy.
The gateway selects its supervisor image at startup and reconciles supervisor
containers for all existing running sandboxes. A native sandbox stop/start also
recreates its supervisor using that selection while preserving workload identity
and volumes. Verify actual container image IDs; a gateway restart can update more
than the two application sandboxes. The existing
`enable_loopback_service_http = false` gateway setting advertises HTTPS service
URLs. Verified gateway health, login, inventory and IdP discovery passed after
restart. Fresh disposable sandboxes now pass verified HTTPS MCP calls, authority
and policy denials, application credential rejection and exposure deletion/recreation
with new connections. See the execution checklist for image identities and exact
measurements. This establishes native service ingress, not deployed Hub/Time
application behavior, management credential renewal or active-application restart.
The native
[service HTTP route](../openshell/crates/openshell-server/src/http.rs) and
[bearer handling](../openshell/crates/openshell-server/src/service_routing.rs)
do not provide the workspace authorization of `ForwardTcp`; do not substitute
an exposed Time URL for the private MCP connection. Bind the registration bootstrap
secret only to its initial registration request through the native provider path.
Preserve the SDK's subsequent registration management credentials. Time's own
signing key and registration-issued database password remain with the trusted Time
service, never with the author factory. Permit its real PostgreSQL connection,
including session locks and LISTEN/NOTIFY; an HTTP credential proxy is not a
PostgreSQL transport. Mount Time's state for its runtime UID 10001; the author
factory uses UID 1000 and does not receive that state directory.

Local Keycloak remains the independent HTTPS bootstrap. Its canonical issuer
`https://auth.localhost:8443/realms/veoveo` has no supported sandbox DNS mapping.
The installation correction adds the native `host.openshell.internal` name to
the existing identity certificate and admits only GET on the realm's exact public
JWKS path through that alias. Hub explicitly configures this remote JWKS URL;
issuer and token endpoint stay canonical. URL, SNI and Host agree, and the existing
supervisor installation CA verifies the upstream. The certificate renewal and
isolated route tests passed; only the existing identity listener was recreated.
Live verified discovery and exact alias JWKS GET return 200, while other alias
methods and routes return 403. Real IdP application admission now passes through
the deployed Hub. These checks do not measure live IdP signing-key rotation.

**Inspect official Task extensions in the native policy layer.** Deployed tests
show that the selected core-only inspector rejects `tasks/get` and `tasks/cancel`
before Hub, although the
[versioned Tasks extension](https://github.com/modelcontextprotocol/ext-tasks/blob/main/specification/2026-07-28/tasks.md)
defines those requests and `tasks/update`. The approved correction recognizes only
these three client requests at `2026-07-28` through OpenShell's existing extension
classification and exact method allow rules. It preserves the core revision table,
typed Task parameters, common protocol/capability metadata validation, and matching
`Mcp-Method` / `Mcp-Name` headers, with the latter carrying `taskId`.
`allow_all_known_mcp_methods` remains core-only. Creation/subscription capability
negotiation remains the application's responsibility. The change is committed in
OpenShell `45f3b534`. Both macOS and the Mac's Linux ARM64 Docker-runtime component
gates passed, and a fresh-worktree supervisor image was built and selected. No
remote Linux/GPU testing is implied. The seven-case deployed suite now passes,
including Task completion and cancellation. Terminal event/Task persistence passes
across Hub and Time restarts. A running Task remained Working after a confirmed Time restart, then its fresh subscription received the exact completed result. Persisted service and Hub public keys also matched their baselines.

**Treat credential refresh as a connection boundary.** Native provider renewal
deliberately invalidates previous policy-generation guards before installing the
new credential snapshot, even when authored policy is unchanged. An in-flight
request can therefore fail before forwarding. Gateway-managed refresh preserves
the opaque reference; it does not promise an uninterrupted MCP connection. Keep
this native boundary, report the failed operation and explicitly establish a fresh
client/subscription. Do not replay mutating calls automatically. Qualify renewed
application access past the original token expiry with an unchanged captured
reference and unchanged workload identities. Hub applies a strict application
token expiry check; OpenShell management verifier leeway is a separate contract.
The same-reference, same-Exec-shell application renewal proof passed beyond the
original token expiry, followed by a complete ordinary suite. See the execution
checklist for the measured interruptions and recovery results.

For MCP 2026-07-28, distinguish the subscription's lifetime from the durable
Task it observes. When an established upstream listener ends, Hub must preserve
that distinction and complete its downstream listener normally; genuine upstream
protocol errors retain their error responses. The client can open a new listener
and read current state to reconcile changes during the gap, then continue receiving
pushed updates. The [subscription contract](https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/subscriptions)
defines normal completion and reconnection; the [HTTP binding](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http)
does not provide `Last-Event-ID` replay. Ending observation does not cancel or
resubmit a Task. Task cancellation uses `tasks/cancel`. Reconnect budgets are a
client policy, not a protocol-mandated count. The Linux deployment exposed a
separate SDK defect: its three-opening limit accumulated over the observation's
entire lifetime, so ordinary listener endings could exhaust it before the caller's
deadline. The reviewed client correction replaces that count with cancellable
backoff after typed ends, preserving the caller's timeout/drop and immediately
surfacing actual protocol, admission or read errors. Resource recovery still
acknowledges the new listener before reading current state; Task recovery observes
the existing Task ID. It never repeats the operation that created the Task.
Untimed observations remain caller-owned until dropped. The Linux execution
checklist tracks the Hub and SDK corrections' component and deployed proofs
separately. SDK correction `483914615a2e5846e58aac97daabb30b77835c6d` passes
both platform component gates. Artifact `ce0a766` and Media `774be1e` adopt it
after their own Mac and Linux component gates. Their Linux sandboxes are Ready
at these revisions. The Linux large-object test now passes multipart completion,
whole-content checksum comparison, a boundary range and deletion/usage release
in 419.65 seconds of test time. It does not establish uninterrupted transport or
that reconnection occurred in that successful run. At that frozen-source checkpoint, service restart recovery and the real signed
callback remained pending; the later Events pass is recorded below.

The merged typed-contract candidates require a coordinated development cutover.
Registration access declarations, Product envelopes and collection Pages change
together across Hub and services. The operator explicitly selected fresh
application state: old registration and completed Task formats are disposable.
Do not add migration adapters or compatibility paths for this development reset.
Qualify the coherent merged stack after reset; retain earlier receipts only as
evidence for their recorded revisions. The coherent local candidates now pass
Docker component gates on the Mac, including Time's numeric-decoding correction
and restored SDK security regressions. The same selected stack now passes
canonical Docker source gates on the actual Linux x86_64 host, and all seven
selected revisions are published. Initial matching runtime and acceptance binaries
were built; Hub `ed6778f`, Time `e607b2e`, Artifact `00c8e93`, Media `4e8504b` and the
synthetic fixture were deployed Ready against reset application state. Fresh
administrator/member admission and all seven Time baseline cases pass in 14.61
seconds libtest (14.662 seconds outer Exec). All six fresh private Artifact cases
pass in 406.48 seconds libtest (406.534 seconds outer Exec), including the large
unknown-size multipart proof. The six-case Media fake baseline also passes in 51.28
seconds libtest (51.336316 seconds outer Exec). Separate receipts now prove all
three terminal restart verifies, Media's in-flight restart across Media+Hub
(62.00 seconds), and both roles' fresh calls after the conservative original-JWT
expiry bound with unchanged handles in the same runner. Initial Artifact/Media
terminal failures occurred before routed application readiness; same-record
verifies then passed. Time's reviewed in-flight restart now passes in 24.91
seconds with the same Working Task, reopened subscription, pushed completion and
64-window result; earlier timing/harness failures remain historical. The free
restored Media catalog/member-refusal case also passes (0.38 seconds), without a
generation or an exact selected-model assertion. The real signed Events gate
passes independently;
final bounded MiMo qualification initially remained incomplete: its first attempt reached
the 240-second deadline without completed tool results or a saved
file. Its persisted empty part establishes engine reasoning-start activity;
provider response, subsequent latency and billing are unmeasured. The [attempt receipt](OPENSHELL_HARDCUT_PLAN.md#reference-linux-deployment-and-signed-wavespeed-webhook-goal)
records the exact model, session, bounds and diagnostic limits. At that first
checkpoint no replacement had run; the corrected later attempt also timed out. The killed
session retained a recoverable execution claim; after sanitized metadata retention,
native standalone session deletion removed that disposable session and its claim,
without a model call. A new private launcher prepares supported live-owner user
interruption, bounded terminal confirmation and explicit remaining-claim reporting
before process cleanup. Its local synthetic SSE check now passes: one request/frame,
acknowledged interruption, terminal Interrupted, released claim and closed provider
connection (10.465 ms cleanup; no inference). The corrected attempt started at
06:57:25.554651 UTC and also timed out after 240.003101 seconds of model phase
(242.127631 seconds total), with no completed tool results/accounting or output.
Native interruption took 39.06 ms and released its claim with zero resume attempts.
At that checkpoint final client qualification remained open. The revised private candidate uses native
live event-type/count/timing/length observation, without retained reasoning or
tool-input text, plus an explicit 240/600-second bound and the same eight steps.
Its local observer check passes: one synthetic request/frame, a positive-length
reasoning delta in the private metadata-only live log, no retained raw text,
terminal Interrupted and released claim (8.599 ms cleanup). The observed
600-second attempt, session `ses_ead025069ffeXuzFg4ZxxjEmf0`, also timed out:
07:08:38.339632–07:18:39.833546 UTC, 600.001049 seconds model phase and 601.463073
seconds total. It produced 1,624 engine reasoning deltas / 61,086 characters but
no tools, finalized accounting or output. Interruption took 37.617 ms and released
the claim with zero resumes. This was progressing reasoning, not a silent stream;
provider HTTP chunks, token usage and cost remain unmeasured. Source/config review
finds reasoning omitted for the default variant and an output allowance up to the
cached model limit of 131,072 tokens. Eight steps does not bound first-step
reasoning; CLI thinking controls display only. A new same-model private `#none`
candidate maps the native supported toggle to `reasoning.enabled=false`, preserving
scenario, permissions and Tasks. The local fixed-refusal capture passes: exact
`reasoning.enabled=false`, identical 12 local tool schemas, two refusals with released
claims and no inference. The first `#none` attempt ended unsuccessfully after
65.823 seconds at eight steps: two local tool-name/search-shape errors followed by
read-only resource discovery, without an intended MCP operation or saved file.
Its prompt confused direct MCP tools with Code Mode helpers. A separate actual-project
localhost refusal probe measured normal asynchronous inventory growth from 12 to
50 tools in 101 ms; required direct tools were present and generation was absent.
The corrected prompt uses advertised top-level MCP names and execute-only resource
helpers. The 16-step / 600-second `#none` run was partial, not a semantic pass:
2026-10-19 07:40:44.824397–07:43:29.677098 UTC, 164.850767 seconds total /
163.212114 seconds model phase, session `ses_eace4ea38ffeCdYeXWcDCUKj8w`.
Its retained Artifact download independently verifies as an 883,996-byte PNG,
1024 × 1024 RGB, SHA-256
`007af757d14221e544098adc5a1e37488f7e57818c85c9e3d91e97587d646b96`.
The single Time `expand_schedule` call was rejected: its calendar ID lacked
`calendar-`, and the advertised schema omitted that prefix and full local-date/time
metadata. No Time Task was created. Code Mode `.arrayBuffer()` / `crypto.subtle.digest`
assumptions also caused local errors before the successful download. CLI exit 0
does not satisfy the semantic gate. Durable session accounting totals USD 0.0850859424;
the CLI's 15-step subtotal is incomplete. Time's schema-metadata correction is published
at `d70ac8e` (tree `b4ac708`). Both canonical Docker checks pass 141 tests / 10 skipped:
Mac-hosted Linux ARM64 and actual reference Linux AMD64. The matching `d70ac8e`
runtime and QA are now deployed; the new seven-case Time baseline passes in 14.84
seconds. The live Hub catalog has 39 tools / 21 Time tools and advertises the
calendar prefix, minimum 10 / maximum 128 characters and full local-date/time
metadata. Effective policy/provider selectors, Time key and RW state are preserved;
the retained member-read Task still completes with the same 64 occurrences/timestamps.
The later same-model 16-step run also failed semantic acceptance: 2026-10-19
08:14:01.257596–08:21:07.218450 UTC, 424.697897 seconds model phase / 425.959552
total, session `ses_eacc6751cffe60j73RL4fVYA1X`. Default Python GETs received
HTTP 403 / body code 1010; a browser-like User-Agent case network-downloaded the
exact bytes, but no Time resolution or Task call occurred. CLI exit 0 was not a pass.
The native object-host-only Cloudflare `bic=false` rule is now applied/read back;
default Python/curl signed GETs pass without UA override, while unsigned/tampered
requests retain origin 403 refusals.

The final Time-first run now passes semantic acceptance: 2026-10-19
08:39:08.179348–08:40:43.145956 UTC, 94.966864 seconds total / 92.797675 seconds
model phase, using the same exact MiMo `#none` variant, 16-step / 600-second bounds
and its own OAuth grant. All eight tool envelopes completed without errors: two
native time resolutions, exactly one completed Time Task with one occurrence,
one filtered Flux catalog match, retained Artifact discovery/provenance, one signed
download request and one native shell network download. The fresh exclusive 0600
file is the exact 883,996-byte PNG, with unchanged signed URL/method/headers and
no UA override, TLS bypass or local copy. Durable session cost is USD 0.0223635068
(41,621 input / 4,080 output / 254,688 cache-read / zero reasoning tokens); its
claim is released with zero resumes. No generation or new Media Task ran. The
[dated final receipt](OPENSHELL_HARDCUT_PLAN.md#linux-final-time-first-opencode-mimo-receipt--2026-10-19)
records authoritative Task reconciliation and proof limits. This closes the final
client gate; the earlier failed attempts remain historical. No live push-versus-poll
or capability-body wire claim is made. The independent real signed callback gate remains qualified. Reasoning
deltas are live-only until their final full-value event, so an empty persisted
start cannot establish an absence of streamed reasoning before SIGKILL. The user prioritized this single real run before the remaining
deterministic/restart gates. `wavespeed-ai/flux-schnell` used one 1024 × 1024 PNG
input (seed 42, async URL output) with the orange-robot/green-seedling prompt
recorded exactly in the [receipt](OPENSHELL_HARDCUT_PLAN.md#linux-real-wavespeed-signed-events-receipt--2026-10-19).
The 26.034106-second acceptance interval includes provider work, callback, storage
and billing, not measured pure inference. A final signature-verified applied
callback settled generation in Events mode with zero generation status checks;
one billing check produced estimate/actual USD 0.003 for one request. Independent
verified-TLS download and PNG decode agree with the available private Artifact:
883,996 bytes, 1024 × 1024, SHA-256
`007af757d14221e544098adc5a1e37488f7e57818c85c9e3d91e97587d646b96`.
A prior catalog-admission failure created zero Tasks/operations; its underlying
HTTP 401 was resolved by correcting the existing native provider credential and
restarting Media, without a direct-key fallback. Independent download required one
exact tool-policy addition to the existing SDK runner. The native traffic receipt
is a bounded supervisor log response with one observed admitted generation POST,
not a lossless provider ledger or verified complete filesystem capture. The runner
process changed, so it proves no same-process post-expiry renewal. No OpenCode
model call accompanied this real generation.

**Keep changes in their owners.** Installation owns images, native definitions,
providers, endpoints and the local IdP/catalog choices. Hub owns endpoint
bindings and its native upstream transport; it remains server-agnostic. SDK CLI
owns the committed generic bearer input; the SDK already has the bearer implementation.
Time owns any demonstrated Time defect and its live acceptance input. Extend the
existing Rust qualification support only for deployment/credential assertions;
do not make it another launcher or move fixture code into Lore. Core, SDK hosting
and Lore need no planned behavior changes for this pass. OpenShell's narrowly
approved service-DNS and official Tasks-inspection changes above address demonstrated
native gaps; any additional change must identify the missing capability and smallest alternative
before expanding the agreed scope. Leave version upgrades,
general composition and automatic deployment out of these edits.

### Connections To Qualify

1. **Client to Hub:** the existing SDK CLI or another MCP client calls
   `/mcp/{profile}` at one approved TLS application origin. Qualify a local IdP-issued
   application token against the Hub's external-issuer admission,
   including `at+jwt`, audience, principal/tenant/Work Context mapping and permission
   denial. OpenShell management and Lore tokens are different audiences. This does
   not qualify interactive human login or customer issuers. Do not enable the
   Hub's old Lore-token issuance path to make this pass.
2. **Hub to service:** keep the existing MCP client and forwarded-token contract;
   connect its byte stream through native authenticated OpenShell `ForwardTcp` to
   the selected sandbox port. Bind the admitted registration endpoint to an
   operator-approved workspace, sandbox and port in the existing trusted process.
   Preserve the registered HTTP authority/path and JWT audience. A service cannot
   choose an arbitrary sandbox or grant management authority by registering a URL.
   Hub `00a7e7b` implements native forwarding beneath its existing `reqwest`
   HTTP pool; deployed Hub/Time qualification now passes. Keep the stream adapter
   generic and inside the existing client; add no relay daemon.
3. **Service back to Hub:** existing registration discovery, `/oauth/register`,
   JWKS refresh and (for Media) `/oauth/token` plus `/mcp/{profile}` use an approved
   Hub origin through native policy-controlled egress. Qualify this return route
   and Hub ingress separately from forward connections. Preserve registration's
   signed service identity and server-owned permission declarations. The Hub
   still learns service names through registration, not a compiled service list.
4. **Persistence:** the Hub owns installation/kernel migrations and grants each
   registration its own PostgreSQL login. Services run their own schema migrations
   and use the SDK/core APIs for shared Tasks, audit and usage. PostgreSQL connections
   must preserve session locks and LISTEN/NOTIFY. Native network admission, reconnect
   and mounted registration-key persistence are acceptance gates, not assumptions
   inferred from the echo fixture.
5. **Artifact bytes:** MCP carries metadata and authorization; clients and Media
   PUT/GET bytes at Artifact's signed S3 URLs. Qualify the address from every actual
   caller and preserve SigV4-bound host/headers. The bucket-scoped signing key stays
   in Artifact because signing requires the real key; it is never an agent credential.
   Share-link ingress is a later explicit qualification, not required for private
   upload/download acceptance.
6. **Media outputs:** Media uses its existing Task-bound SDK delegation to call
   Artifact through the Hub, then streams provider output to signed storage
   URLs. Use the existing fake provider on a policy-approved private endpoint and
   status-check completion (`VEOVEO_PUBLIC_ORIGIN` unset). A separate one-shot now
   qualified real WaveSpeed polling for one model on Mac. The Linux reference now
   separately qualifies one real signed Events completion; other models still
   require their own acceptance. Keep provider credentials
   with the trusted service/provider path, outside author/build jobs.

Time's first acceptance covers discovery, resolve/convert, schedule Task completion
and cancellation, event subscriptions/reconnect, permission denial, restart recovery
and persistent registration identity. Use packaged time authority data; remote
authority acquisition and clock-observation sockets are separate qualifications.
Artifact then adds byte-transfer integrity, range download, access denial, quotas and
restart persistence. Media then adds delegated Artifact access, Task recovery without
duplicate output publication, cancellation, output provenance and usage records.
The [Media native integration plan](OPENSHELL_HARDCUT_PLAN.md#media-native-integration-plan)
records the source, native-policy and client-Task gates. Native Media is deployed;
its earlier private fake-provider qualification remains separate from the current
real WaveSpeed status-check configuration, with the testing fixture still available. Six deterministic native cases passed: Task-bound
Artifact delegation, exact 64 KB and 20 MB output transfers, provenance and usage,
pushed completion, ordinary-member billed-run refusal, Task-only invocation and
cancellation before and after dispatch. Media adopted its existing signing key
and schema. Native credential renewal and in-flight recovery across actual Hub/Media
restarts also passed, retaining the Task and service identities without duplicate
provider submission. A separate completed Task retained its result, Artifact bytes
and fresh-subscription delivery after actual Hub/Media restarts. The Mac's unchanged
signed-byte download also passed with exact bytes and checksum. The reviewed local
OpenCode build supports Tasks and passed no-model client preflight. Its revision
`46b2429` was local-only with the upstream origin when those probes ran. The later
transport repair is now published as `7b12c6051d23d1afa7ef6659b835fe2345f2ccd5`
on the maintained [VeoveoAI/opencode](https://github.com/VeoveoAI/opencode) fork's
`mcp-tasks` default branch; the original receipts retain their actual revision. The initial
bounded MiMo attempt reached the step limit without calling Hub: its launcher
inherited a stale `PWD`, selecting the workspace root instead of the nested
client project and omitting Hub configuration. No generation was submitted.
Correcting the launcher required no Hub, MCP protocol or OpenCode product change.
No-model fixtures confirmed expected nonblocking asynchronous MCP connection and
catalog updates; each model step refreshes the tool snapshot, and the billed-test
identity additionally permits `media.run`.
The user explicitly authorized one replacement final run using the corrected
`PWD`, an owned native persistent server, the exact reviewed Tasks executable,
Build agent and `deepinfra/XiaomiMiMo/MiMo-V2.6-Pro`. It passed in 224.975 seconds
within eight agent steps and the 240-second deadline. Time, model/schema discovery,
exactly one fake-model generation, durable Task settlement, Artifact inspection
and signed download all succeeded. The Mac saved exactly 65,536 bytes with the
unchanged signed request and independently matching SHA-256; independent fixture
counts prove one submission. The output is synthetic fixture data, not a rendering
claim. The [execution receipt](OPENSHELL_HARDCUT_PLAN.md#media-native-integration-plan)
records identities, byte hash, exact driver, model usage/cost and the retained
initial failure. The private native slice is complete; no further model attempt
is authorized or needed.

A separately authorized [real WaveSpeed polling one-shot](OPENSHELL_HARDCUT_PLAN.md#real-wavespeed-polling-one-shot--2026-10-18)
then completed `wavespeed-ai/flux-schnell` through the same Hub → Media → Artifact
path, without a model agent: one Task and a real-provider output downloaded on the
Mac with matching Artifact checksum. The exact input requested one 1024 × 1024 PNG,
seed 42. Independent decoding verifies a valid 1024 × 1024 PNG, 802,505 bytes, with
the exact stored Artifact digest. Its USD 0.003 external quote matched both the
own-usage delta and independent per-Task estimate/actual usage records. Both result
and persisted prediction report status-check completion, with public origin unset.
The measured 37.509-second Task interval includes execution, status polling, output
ingestion and billing; it is not pure inference latency. Signing identity, database
and mounted state were retained. Native configuration changed without a Media
rebuild; the separate fake fixture counters were unchanged. Public signed webhook
ingress and remote Linux/GPU qualification remain separate; this one-shot does not extend the fake-provider
cancellation/recovery proof to a real provider.

The separate [MCP conformance and workspace follow-up](OPENSHELL_HARDCUT_PLAN.md#mcp-conformance-and-workspace-sanitation-follow-up--2026-10-18)
records the OpenCode repair, installation, branch publication and local cleanup.
A deterministic wire regression captured an unnecessary `notifications/cancelled`
POST during subscription teardown and reproduced the same HTTP 400 symptom. This
strongly supports attribution of the historical WaveSpeed error to the same SDK
path; the original trace did not capture its RPC method, so that attribution
remains an evidence-backed inference. The pinned SDK now follows the
[2026-07-28 cancellation contract](https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/subscriptions#cancellation):
close the request stream for modern HTTP; retain cancellation notifications on
transports without per-request streams. Eighty-eight MCP tests and the canonical
check pass. The source is published on the maintained fork; the locally built
ARM64 executable is installed, not uploaded as a binary release.

A live no-model check used source-imported Core `McpClient` at `7b12c60`, with a
fresh ordinary-member token and 18 tools. Time Task
`01a15012-0754-70b0-87c1-fcdbe474a599` completed one schedule occurrence;
discover/list/call/listen returned HTTP 200, with no HTTP 400 or cancellation
notification observed. Timing was not measured and server-side stream closure
was not independently instrumented; the component fixture proves that closure.
The installed executable's version/help smoke checks are separate from this
source-client proof. No new LLM or paid generation followed the repair.

**Hub requires Tasks; clients must implement the supported MCP specification.**
Use the [official Tasks extension](https://github.com/modelcontextprotocol/ext-tasks/blob/main/specification/2026-07-28/tasks.md#capability-negotiation)
and its per-request capability declaration/server-directed execution. Its optional
status in MCP as a whole does not add taskless support to this Hub contract. A
Task-only tool rejects a caller lacking that capability with standard
`MissingRequiredClientCapability` (`-32021`) and the Tasks extension in
`requiredCapabilities`, after the tool's permission check. It creates no Task or
provider work for that request. Ordinary tools retain their normal result shape.
Modern HTTP defines no core
client-sent cancellation notification, and
[notification-POST header requirements are undefined](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http#sending-messages);
the repair does not weaken mirrored request-header validation or assert a universal
`Mcp-Method` requirement for notifications.

The [reference Linux and signed-webhook execution gates](OPENSHELL_HARDCUT_PLAN.md#reference-linux-deployment-and-signed-wavespeed-webhook-goal)
now govern the active slice. The operator selected a fresh reference, explicitly
discarding the retired Linux application data and backups. That cleanup is complete;
the current installation has fresh service state and keys. Preserve this new state
through routine sandbox lifecycle and the remaining deployed service gates.
The cost-bounded signed WaveSpeed Events callback now passes with independent
operation/event, usage and decoded Artifact evidence; the Mac status-polling
receipt remains separate historical proof. Final OpenCode MiMo acceptance follows successful
deterministic gates. The existing native responsibilities and placement contracts
remain authoritative; no new proxy or launcher is assumed. Native Linux builds and
deployment are recorded separately from acceptance; GPU/CUDA remains unqualified.

Time's corresponding cases and Artifact's private follow-up now pass on this path.
Artifact runs in `vv-services/artifact`, with private port 8801, the recovered
persistent registration key and the existing PostgreSQL metadata. A dedicated
SeaweedFS identity holds only bucket-scoped permissions for `artifacts`; both
internal access and signed URLs use `http://host.openshell.internal:9000` over
native TCP admission. Six native cases cover signed transfers (including more than
1 GiB), checksum verification, ranges, Hub permission refusals, quotas, grants and
access requests. A retained object and its metadata/access survive actual
Artifact/Hub restarts; a newly opened subscription delivers its opening update.
Tenant and object isolation remain component
test evidence in this one-tenant installation. Public shares, in-flight Artifact
verification recovery, public Media webhooks, other real-provider models and Media
Lore/factory work stay separate. See the
[Artifact evidence](OPENSHELL_HARDCUT_PLAN.md#native-artifact-follow-up-2026-10-17).
This slice used the existing staged Hub placement configuration and a Git-built
Artifact image; it did not extend the Time-specific Lore/factory acceptance to
Artifact or implement general composition.

The next planned integration is the [environment override and source activation
contract](#environment-overrides-and-fast-source-activation), in the existing trusted
Hub process. It reuses admitted runtimes for source changes; general trusted image
publishing is separate. Baseline MCP rollout now uses the new deployment identity;
parallel environment routing and source-backed activation now have the scoped
Linux A/B/base evidence recorded below. Hub implements deployment selection,
composition-scoped discovery/delegation and retained Task routing; source/component
proofs and actual deployed/model observations remain separate.

Implementation evidence: [Hub transport](../veoveo-hub/crates/veoveo-hub/src/mcp/upstream_http.rs),
[forwarded identity](../veoveo-hub/crates/veoveo-hub/src/mcp/upstream_authorized_http.rs),
[Time startup](../veoveo-mcp-time/crates/veoveo-mcp-time/src/server/mod.rs),
[Artifact storage](../veoveo-mcp-artifact/crates/veoveo-mcp-artifact/DESIGN.md#object-storage),
[Media outputs](../veoveo-mcp-media/crates/veoveo-mcp-media/src/run.rs),
[Core libraries](../veoveo-core/README.md) and [SDK libraries/client](../veoveo-hub-sdk/README.md).

## Data-Driven Environment Definitions

### Factory Sandboxes And Dynamic Selection

Status: design agreed with the user on 2026-10-22. Implementation has not started; no source, deployment or diagram
change has been made for it. Execution order and evidence gates are in the
[agreed slice](OPENSHELL_HARDCUT_PLAN.md#agreed-slice--factory-sandboxes-and-dynamic-selection).
Review baseline: Hub `7c6240d`, SDK `52084ec`, Core `1dd9994`, OpenCode `c5fb626`,
Lore `ff40bb21`, OpenShell `53e366581`, installation `b39015e`, Time `f5d3fb1`,
Rust template `c249ef4`. On 2026-10-22 the user and coordinator reviewed every part
from first principles and removed what no requirement forced.

Function: when a person pushes a Lore branch of a repository that has
`openshell/run`, that branch's server is built and served beside the others. A chat
can use any combination of instances, and the agent can see why an instance is not
serving. Lore's permissions decide all of it.

This direction supersedes for the branch workflow:

- the 2026-10-20 reusable override runtime: `s6-svscan` as main process, several
  revision workers in one sandbox, the `veoveo-environment` helper, the development
  image (`veoveo-template-installation/development/Dockerfile`) and the
  `development-time-v1` template;
- `execution.runtimeTemplates` with its eligibility and storage-binding admission;
- Computer-local snapshots, environment definition documents and their apply/follow
  routes, and periodic Lore reads;
- Hub's registration-liveness housekeeping for workloads Hub provisions;
- the earlier meaning of "factory" as a disposable, agent-free build/check job.

#### Terms

| Term | Meaning |
|---|---|
| Instance | A repository's server running from one branch |
| Factory sandbox | The one OpenShell sandbox of an instance. Its main program fetches that branch, builds it and serves it. It is reused by every push to the branch and never shared with another server, branch or version |
| Data environment | The PostgreSQL database of a branch name, with the shared object store. It needs its own type name: `EnvironmentId` already identifies a routing composition |
| Selection | Which instance of each server a chat uses; session state, not pushed |
| Base branch | The installation's default branch for servers a selection does not name, for example `dev` |

#### Decisions Recorded With The User

- No approval layer and no access rules beyond Lore's own.
- Hub acts in Lore only as a person, under that person's current grant: it reads
  `openshell/` as the pusher of that revision, and it watches a repository as the
  person who turned it on. The sandbox fetches as the branch's latest pusher. No
  Hub-owned repository grants and no installation-wide secret (2026-10-22).
- A Lore push changes desired state. Hub re-checks every branch of a watched
  repository when it subscribes or resubscribes; OpenShell restores sandboxes after
  infrastructure restarts. Local edits and local commits trigger nothing.
- Each repository owns its environment image, its network policy and the program
  that builds and runs it; the installation owns one base.
- One factory sandbox per instance. Its main program fetches, builds and then
  replaces itself with the server. OpenShell starts and stops it; nothing supervises
  inside.
- Each push interrupts that instance for its restart, fetch, incremental build and
  startup. This is accepted in exchange for the simpler model.
- A failed build or a crash is retried by OpenShell with backoff (restart policy
  `always`, at most every 3 minutes). The agent reads the logs, then pushes a fix.
- Complete logs come from container output, collected by Vector into VictoriaLogs.
  Agents read them through the Hub MCP server.
- One BuildKit daemon and one plain local OCI registry serve the whole installation.
- Selection allows any combination of instances. A combination that fails is shown
  with its cause, never prevented; the user picks another or fixes the branch.
- Per-user caps are soft: exceeding one warns and does not refuse. The `caps`
  setting stays, so caps can become hard later.
- Hub and the Hub MCP server are separate components. Hub is the central point of
  authentication, routing, registrations, selection state and the factory
  reconciler. The Hub MCP server, in its own repository, is the MCP provider of
  Hub's activities for agents.
- Lore lists repositories per user through its own catalog contract, with Hub
  answering `LookupUserPermissions` from its grants. This is a separate track,
  independent of the factory loop.

#### Ownership

Test: a value that would differ in a second installation belongs to the
installation; a value that can change together with code belongs to the repository.

| Repository, versioned per branch | Installation |
|---|---|
| `openshell/image/`: the environment image (`Dockerfile` and the files it copies) | Base policy: Hub, Lore, object storage and PostgreSQL with their real hostnames |
| `openshell/policy.yaml`: build egress and serving rules in OpenShell's own format | Default factory sandbox size; soft caps |
| `openshell/run`: builds the branch and then `exec`s its server | Base branch |
| Root `Dockerfile` for release and CI builds, unchanged | Image builder, registry, log collector and the pinned `lore` build context |
| | Platform components: Hub, Hub MCP server, Lore, PostgreSQL, SeaweedFS, OpenShell gateway, Computers |

```sh
#!/bin/sh
# veoveo-mcp-time/openshell/run
set -e
cargo build --locked --release --bin veoveo-mcp-time
exec target/release/veoveo-mcp-time
```

A branch is served while it has an executable `openshell/run`. Removing the file,
or deleting or archiving the branch, stops its instance. Hub parses nothing in the
repository except `openshell/policy.yaml`, which it passes to OpenShell. The
environment image copies the Lore CLI from an installation-supplied named build
context (`COPY --from=lore /usr/local/bin/lore /usr/local/bin/lore`), the pattern
already used by `veoveo-template-installation/factory/Dockerfile`. Repositories do
not name a registry.

Every factory sandbox gets the installation's default size in Stage 1. OpenShell's
sandbox templates cannot carry a per-branch image
(`openshell/docs/how-it-works/sandboxes/templates.mdx:46`), so Hub passes CPU and
memory on each create. A repository-owned size returns when a workload needs one,
such as a GPU runtime in Stage 2.

#### Push To Serving

1. Lore emits `BranchPushed` with repository, branch ID, revision, revision number
   and pusher on Hub's subscription to a watched repository.
2. Prepare, without side effects: Hub obtains a Lore token for the pusher through
   its token exchange and reads `openshell/` at that revision. The
   [image builder](#image-builder) builds `openshell/image/` and returns the image
   digest; BuildKit's cache makes an unchanged image cost well under a second.
3. Commit: Hub ensures the branch's data environment and replaces the instance's
   Lore credential for the pusher. On the first push, or when the digest changed, it
   creates the factory sandbox with the default size, the installation base policy
   plus the repository policy, and restart policy `always`. Otherwise it sets the
   policy and restarts the sandbox.
4. The sandbox's fixed start command runs on every start: `lore sync <branch>@LATEST`,
   then `exec ./openshell/run` in the checkout on the persistent disk. The synced
   revision is passed to the server as its software version, which its SDK
   registration already reports to Hub. Output of every step is ordinary container
   output.
5. Native start mounts the same persistent volume under the same sandbox name, works
   from any phase and resets OpenShell's restart count. A push during a build
   restarts it again; the latest revision wins.
6. The server resumes the instance's saved registration (Time: "process stop does
   not retire it", `veoveo-mcp-time/README.md:46`), runs its migrations and reports
   `/readyz`. Core moves unfinished Tasks of the stopped process to the new one.
7. A failed fetch, build or startup exits the main program. OpenShell restarts it
   with backoff (1 s doubling to 3 min), so a start that failed while a dependency was
   returning recovers by itself, and a broken branch keeps retrying until the next
   push. Every attempt's output is in the log store; `status` shows the restart
   count and last exit code.

| Change | Result |
|---|---|
| Code, `openshell/run` or `openshell/policy.yaml` | Policy set and restart; the sandbox fetches, builds and serves the new revision |
| `openshell/image/` | New factory sandbox from the new digest; its disk cache starts empty |
| `openshell/run` removed, or branch deleted or archived | Sandbox deleted; the data environment goes with the last instance of that branch name |
| Crash or failed build | Retried by OpenShell with backoff up to every 3 min until the next push |
| Infrastructure restart (node reboot, eviction) | OpenShell restores the sandbox (restart policy `always`; measured about 64 s after a node restart) |

Native stop deletes the sandbox's pods; start creates new pods. Measured through the
gateway: create to Ready 6.7 s, start to Ready 2.5 s, and a Time push costs about
40 s with a release build (verification below).

Only one version of an instance runs at a time. A GPU instance never needs a second
GPU for its next version, and a new version's migrations cannot break an old version
that is still serving. Serving a previous revision after a breaking schema change
requires resetting that data environment, consistent with disposable development
data.

#### Failures

There are three boundaries and one error shape:

| Boundary | Detected by | Reported as | Recovery |
|---|---|---|---|
| Hub prepare and commit (Lore read, build, create, restart) | Hub | `failed{stage, message}` on the instance | The next push, or Hub's re-check when it resubscribes |
| The sandbox's main program (fetch, build, server) | OpenShell, from the exit | Phase, exit code and restart count | OpenShell's restart backoff; the agent pushes a fix |
| A Hub MCP tool call | The Hub MCP server | An MCP error naming the cause | The agent's next call |

Prepare has no side effects, so a failed read or build leaves the serving instance
untouched.

#### Lore Access In A Factory Sandbox

The sandbox uses the same Lore model as everyone else: it reads the repository as
the branch's latest pusher (decided 2026-10-22). On each push Hub mints one
long-lived, revocable credential for the instance, meaning "the latest pusher,
reading this repository, for this instance", and stores it in the sandbox's
OpenShell provider; it revokes it when the sandbox is deleted or the next push
replaces it. The credential is a refresh token for the pusher with Lore's audience
and the repository's scope. The gateway's own refresh (`oauth2-refresh-token`)
trades it at Hub's `/oauth/token` for short-lived Lore tokens, writes them into the
provider behind a stable placeholder, and stores rotated refresh tokens itself
(`openshell/crates/openshell-server/src/provider_refresh.rs:1175-1245,1664-1690`).
The installation already refreshes a provider against Hub this way
(`vv-hub-forwarder`, `veoveo-template-installation/openshell/HUB_TIME.md:86-94`).
OpenShell's profile `token_exchange` grant is not used: it authenticates to the
token service with the gateway's and the supervisor's SPIFFE identities
(`openshell/docs/how-it-works/providers/profiles.mdx:611-616`), which Hub does not
trust. Hub's refresh re-runs the person's current admission and copies no rights
(`veoveo-hub/crates/veoveo-hub/DESIGN.md:773-783`), so a pusher who loses access
stops the branch's next sync with a clear error until someone with access pushes.
The credential never enters the sandbox. The per-instance credential follows the
same pattern as the first registration credential.
The start command passes the placeholder to `lore --access-token`, with `--identity`
for an opaque placeholder; OpenShell substitutes the real token into Lore's gRPC
request headers on a `protocol: rest`, `enforcement: enforce` endpoint, the
mechanism `factory-time.yaml` already uses with `vv-lore-time`. The proxy must trust
Lore's server CA. Lore decides what the token permits. A probe on the node confirmed
it: the sandbox held only a placeholder and the clone succeeded.

Hub reads `openshell/` with the pusher's identity through the same exchange and an
exact-revision file read, as its existing Lore adapter does
(`veoveo-hub/crates/veoveo-hub/src/bin/hub/activation/lore.rs:62-84`,
`activation/lore_file.rs:14`).

Watching: Lore subscriptions are per repository, and each checks the subscriber's
access (`lore/lore-server/src/grpc/notification_service.rs:73-92`). There is no
installation-wide feed, and `local` is the only notification backend in this build
(`lore-server/src/server.rs:1678-1690`; no plugin is registered). A person therefore
turns a repository on once with the Hub MCP server's `watch`; Hub records them and
subscribes as them, as its existing follow code does (`activation/lore.rs:96-122`).
If they lose access, the subscription fails, `status` shows it, and anyone with
access calls `watch` again.

#### Logs

Everything the main program writes — Lore, the build tool and the server — is
ordinary standard output and error of the sandbox's workload container (container
`agent`). Kubernetes keeps that output only while the pod exists, and every native
restart replaces the pod, so the installation runs a cluster log collector that
ships all container output, including the supervisor pods' OpenShell events, to a
log store. OpenShell's documentation directs durable retention to exactly this
(`openshell/docs/observability/accessing-logs.mdx:38-57`).

Chosen: Vector as a DaemonSet reading container logs with pod metadata, sending to
single-node VictoriaLogs on a persistent volume. Both are single binaries; the
store is searchable by text and by labels and has an HTTP query API. A workload pod
is named after its sandbox and shares an `openshell.ai/boundary-pair` label with its
supervisor pod, so one query can return a sandbox's own output and OpenShell's
network denials for it. `openshell logs` remains the live view of OpenShell's own
events.

Collector settings found necessary on the node: file discovery every second
(`glob_minimum_cooldown_ms: 1000`), because with Vector's default interval pods
deleted within about 15 seconds were not captured; and a persistent Vector data
directory, because a Vector restart without its checkpoints re-reads every pod log
from the beginning and was killed at a 512 MiB limit.

Agents follow a push through the Hub MCP server on their existing connection:

1. After `lore push`, `status(repository, branch, wait)` returns the pushed and
   serving revision, phase, exit code, restart count, the last failure and the last
   output lines. With `wait` it returns as soon as that revision serves or fails, or
   after at most 60 s. Hub derives the state from OpenShell's sandbox status (Ready,
   or the main program's exit code) and from the server registering with that
   revision as its software version.
2. On failure, `logs(repository, branch, since)` returns the instance's complete
   output — Lore sync, build and server, with standard output and error marked —
   together with OpenShell's network denials from its supervisor pod.
3. The agent pushes a fix.

Agents receive no Kubernetes, OpenShell or log-store credentials.

#### Image Builder

- An installation-owned BuildKit daemon runs as a Kubernetes workload with a
  persistent cache volume and explicit garbage-collection limits. The node meets
  the requirements for BuildKit's user-namespace variant (Kubernetes 1.36, kernel
  6.8, containerd 2.3.4, runc 1.4.2). In-container rootless mode would instead need
  `kernel.apparmor_restrict_unprivileged_userns=0` on this Ubuntu 24.04 host.
- Hub checks out `openshell/image/` at the pushed revision as the pusher into a
  temporary directory and runs `buildctl build --local context=… --local dockerfile=…`,
  the standard client flow; BuildKit reads the files through its session. The Lore
  CLI comes from `--opt context:lore=docker-image://…@sha256:…`, and Hub reads the
  pushed digest from `--metadata-file`. `docker buildx` with BuildKit's remote driver
  is the equivalent client used in the probe.
- Hub builds on every push and compares digests; no separate image key. BuildKit
  returned Time's unchanged `dev` stage in 0.2 s, and the registry stored identical
  content under a second tag in under 0.1 s with the same digest.
- The builder has open outbound access, like any build machine: base images and
  package downloads come from the internet. No security layer is added beyond Lore's.
- Probe on the node: BuildKit `v0.34.1` in a pod with `hostUsers: false` and
  `privileged: true` started with the overlayfs snapshotter, ran `RUN` steps and
  resolved a `docker-image://` named context. Time's `dev` stage built cold in
  364.9 s and warm in 0.2 s, leaving a 4.57 GB cache.
- Images are pushed to the installation's own local OCI registry: a plain CNCF
  Distribution registry with a persistent volume and deletion enabled, as the former
  monorepo ran `registry:3` behind k3d. No signing, admission or retention rules
  beyond cleanup deleting unused tags. On plain K3s the node's container
  runtime is pointed at it once through `/etc/rancher/k3s/registries.yaml` followed
  by a K3s restart; k3d wrote that configuration itself. Images are named by the
  registry's in-cluster Service name, which BuildKit resolves and marks `http = true`.
  The node's entry maps that name to the Service's ClusterIP over HTTP, so the
  Service keeps a fixed ClusterIP. A K3s restart took the API away for about 6.5 s
  and restarted no container (`KillMode=process`).
- One BuildKit daemon and one registry serve every repository and branch in the
  installation.

#### Selection

- A chat's selection names a branch per server, for example
  `time: dev/jose/x, media: dev/maria/fix`; any combination is allowed. A server the
  selection does not name uses its base-branch instance.
- A named branch without an instance, or an instance that is down, is shown with
  its cause in `status` and in the tool's error. Nothing falls back silently.
- Instances of different branches use different data environments, so data one
  writes is not visible to the other. This is shown, not prevented.
- A Task keeps the instance it started on after the selection changes; Task routes
  keep their original deployment and database.
- Hub holds each chat's selection and answers each chat's tool list from it.
- OpenCode's MCP connection, tool list and tool registry are per Location
  (`opencode/packages/core/src/mcp/index.ts:95,166,427-460`,
  `packages/core/src/tool/AGENTS.md:44,48`). `tools/call` already carries the chat's
  session ID as `_meta["ai.opencode/sessionID"]`
  (`packages/core/src/mcp/client.ts:424-427`); `tools/list` carries nothing
  (`client.ts:391-394`). Per-chat selection therefore needs an OpenCode change: send
  the root chat's ID on `tools/list` as well, keep one tool list per chat over the
  one connection, and pass that chat's tool definitions on each call. Sub-agents use
  their root chat's selection. Selection changes never reconnect. The change departs
  from OpenCode's rule that MCP owns one stable tool transform per Location, so it
  needs the user's approval and an entry in `VEOVEO_FORK.md`. The ID is a key, not
  authority: Hub binds it to the authenticated principal.

#### Data Environments

Settled 2026-10-22 by a source review (Core `1dd9994`, Hub `7c6240d`, SDK `52084ec`,
Artifact `b53d15e`, Media `6a73e52`) and the empty-database probe below.

- One database per branch name. Same-named branches in different repositories
  deliberately share it. It is created with the first instance of that branch name
  and removed after the last: the sandboxes are deleted first, then
  `DROP DATABASE … WITH (FORCE)`. The base branch's instances use the installation
  database `veoveo`.
- Branches cannot share a database: Core runs each server's migrations with sqlx's
  default migrator (`veoveo-core/platform/store/src/servers.rs:61-76`), which
  refuses a database holding migrations it does not know.
- Hub's own state stays in `veoveo`. No separate control database: the `hub`
  schema's foreign keys and change triggers need only the database Hub already uses
  (`veoveo-hub/crates/veoveo-hub/migrations/0001_hub.sql:223,232-234`).
- Bringing up an environment: Hub creates the database as its own role, which must
  own it, and runs Core's kernel migrations (`PlatformStore::migrate`). When a server
  registers into it, Hub runs `ensure_server` there before its registration
  transaction (today both share one transaction,
  `src/registration/store.rs:146-278`), and the registration grant carries that
  database's URL instead of the one installation URL
  (`src/registration/service.rs:269-279`). The server runs its own migrations on
  start. No template database: create plus migrations took about 0.6 s.
- No copying of users: a server writes the identity rows a Task needs when it
  creates the Task (`veoveo-core/platform/task/src/create.rs:85-97`, granted to
  `veoveo_server` in `0200_identity.sql:137,209-211`).
- No permanent connections or `LISTEN` in environments: Hub forwards Task get,
  cancel and subscriptions to the instance (`src/mcp/tasks.rs:29-37,86-94`,
  `src/mcp/subscriptions.rs:359-363`) and listens only on `hub` and `audit` in its
  own database. Two Hub operations read Task state directly: the check that a Task
  still runs before it may act for its caller (`src/delegation.rs:583`), which
  queries the deployment's database when needed, and administrative Task cancel
  (`src/bin/hub/admin/tasks.rs:66-127`), which is forwarded to the instance as
  MCP `tasks/cancel`.
- Registration housekeeping must skip provisioned deployments: liveness only sees
  locks in the current database (`0100_kernel.sql:198-214`), so after its 60 s
  grace Hub would deregister every server in an environment.
- No `CONNECT` grants: a new database admits `PUBLIC` by default, each login
  receives only its own database's URL, and a grant would block `DROP ROLE` in
  `drop_server_login`. `pg_hba.conf` admits `all` databases so runtime databases
  work.
- Audit records written in an environment stay unsealed, do not appear in Hub's
  console and go with the database; usage rows land in the default partition
  (`0600_usage.sql:70`). Acceptable for disposable development data.
- One shared `artifacts` bucket. Object keys are `tenants/{tenant}/artifacts/{UUIDv7}`
  (`veoveo-mcp-artifact/crates/veoveo-mcp-artifact/src/storage/mod.rs:114-115`), and
  the sweep deletes only keys from its own rows, so environments cannot collide.
  Objects of a dropped environment stay behind until cleanup. Every Artifact
  instance rewrites the bucket's CORS rule from its own `--storage-cors-origin`
  (`src/storage/bucket.rs:34-58`), so all branches keep the installation's one
  origin.
- Text that assumes one database is updated with the code:
  `veoveo-core/docs/DATABASE.md:3,25`, `veoveo-core/platform/store/DESIGN.md:14`,
  `veoveo-hub-sdk/crates/veoveo-hub-sdk/src/registration/oauth.rs:368-379`.
- PostgreSQL runs as a plain Kubernetes StatefulSet with the same extension image,
  one volume, a Service, a ConfigMap for `postgresql.conf` and `pg_hba.conf`, and a
  server certificate from the installation CA. It replaces CloudNativePG (decided
  2026-10-22). Its first start creates only `veoveo_owner`
  (`LOGIN CREATEROLE CREATEDB`), the gateway's and Lore's logins and their
  databases. Everything after that stays dynamic and is plain SQL: Hub creates
  server roles, data-environment databases and `CONNECT` grants at runtime.
  Settings change with `ALTER SYSTEM` and a reload, and a restart only for the few
  settings PostgreSQL requires it for, such as `max_connections`, as before.
  CloudNativePG's declared roles worked against this. PostgreSQL gives Hub's role
  admin membership in every role it creates, and CloudNativePG's reconciler kept
  trying to revoke those memberships, failing with `dependent privileges exist` and
  blocking every other change to that role. Its replicas, failover and backups were
  unused with one instance and disposable data. An operator returns with a scalable
  design that leaves Hub-owned roles to Hub.

#### Identity And The Hub MCP Server

- Hub's Lore tokens carry the Hub principal ID as their `identity` claim, so
  `BranchPushed.user_id` maps directly to a Hub principal.
- Hub keeps authentication, routing, registrations, selection state and the
  factory reconciler: create, restart, delete and watch. It already creates
  OpenShell sandboxes for Computers through `openshell-sdk`
  (`veoveo-hub/crates/veoveo-hub/src/computers/provisioning.rs`). It runs no
  commands inside sandboxes.
- The Hub MCP server has its own repository and registers like any MCP server.
  Version 1 provides `status`, `logs`, `select` and `watch`; later versions add
  repository creation and sharing, and cleanup.
- It calls Hub as the user through Hub's existing calls between servers
  (`veoveo-hub/crates/veoveo-hub/DESIGN.md:254-292`): the user's forwarded token is
  exchanged for a delegated token carrying only the permissions the server declared
  and the user holds now, and Hub admits it narrowed to those
  (`src/http/authentication.rs:416-417`, `src/delegation.rs:58`). Hub's new APIs for
  these tools are user routes authorized by the caller's grant on the repository.
- For logs, Hub's status API returns the sandbox of an instance the caller can see,
  and the Hub MCP server queries the log store for that sandbox. Hub stays the one
  place that decides access.
- Hub's administrative routes do not narrow a delegated caller: their policy
  request carries only the principal (`src/policy/evaluation.rs:16-22`, called at
  `src/http/action_audit.rs:38`). This matters only once a Hub MCP tool calls an
  administrative route, such as sharing later; the fix belongs with that tool.
- Users connect to one MCP connection named `veoveo`, which carries the Hub MCP
  server and every application MCP.
- OpenCode keeps a selection per chat; a tool alone cannot change headers of its
  Location-scoped connections.

#### Lore Change Events

Lore's subscription stream silently drops events for a lagging subscriber
(`lore/lore-server/src/grpc/notification_service.rs:103`). It should close the
stream instead. On every subscription and resubscription Hub re-checks every branch
of that repository, including deletions, and applies any revision it has not
applied. No periodic reads, client hooks or new event types are needed.
Notifications are live signals; Lore revisions remain the durable history.

#### Capacity And Cleanup

- Soft caps: `caps.instances_per_user` counts the instances whose latest pusher is
  that user. Above it, Hub still creates the instance and `status` carries a
  warning naming the count and the cap. Setting `caps.enforce` to true later
  refuses instead, reported as `failed{stage: capacity}`.
- The cluster's own limit is Kubernetes scheduling. A sandbox that does not fit is
  accepted and waits in `Provisioning`; OpenShell reports the scheduler's reason in
  its conditions, for example `PodScheduled: False (Unschedulable) - 0/1 nodes are
  available: 1 Insufficient cpu`, and `status` passes it on. It starts when
  capacity frees up. OpenShell's `resource_admission` setting is label approval for
  attached Kubernetes resources, not capacity
  (`openshell/docs/how-it-works/gateways/configuration.mdx:746-790`).
- Cleanup in Stage 1 is deleting or archiving a branch or removing
  `openshell/run`, and the registry deleting unused tags. Cleanup tools come later
  with the Hub MCP server.
- Each server process holds about five PostgreSQL connections; 87 of 512 are in use.
  No pooler and no connection changes now: `max_connections` is raised when
  measurements with branch instances require it.

#### Stage 2 And Later

- Services called directly by other instances, such as the embedding GPU runtime,
  and `uses`: which service instances an instance calls, pushed in the caller's
  branch and resolved per instance. A caller reaches a service instance through
  OpenShell's named-service routing, which already crosses workspaces through the
  gateway's relay (Artifact in `vv-services` calls Hub in `vv-control`).
- GPU placement, mounts and repository-owned sizes.
- Provider callbacks, such as Media's
  `{public_origin}/media/operations/{operation_id}/{token}`, must name the instance
  so Hub routes each callback to the branch instance that owns the operation. Today
  the path names only the server.
- Sleep and wake through native stop and start, never sleeping an instance with
  unfinished Tasks except ones parked on provider webhooks.

#### Lore Catalog (Separate Track)

Lore lists repositories per user through its own catalog contract: Lore forwards
the caller's token to `UrcAuthApi.LookupUserPermissions`, which Hub answers from
`lore.assignments` with the caller's repository resource IDs and permissions. Lore
sets `repository_catalog = "auth_service"` and `repository_catalog_url` to Hub's
gRPC service route. Today's gateway cannot carry that call. Its multiplexer sends
every `application/grpc` request to its own gRPC API before the HTTP router that
holds service routing (`openshell/crates/openshell-server/src/multiplex.rs:1293-1297`),
service routes speak HTTP/1.1 to the sandbox
(`openshell/crates/openshell-server/src/service_routing.rs:579,655`), and pods
cannot connect to a sandbox directly. The installation's HTTP/2 support
(`f3bdf2e27`, mediated HTTP/2 REST streams and gRPC credentials) covers only the
sandbox's outbound proxy. An OpenShell change (branch `inbound-grpc-service-routes`,
commit `a6ed0ab41`) makes the multiplexer recognise a sandbox service host before
its gRPC split, and gives gRPC on a service route its own HTTP/2 connection to the
sandbox; all other traffic keeps the HTTP/1.1 path. With it, lore-server's own
catalog client listed repositories from a `UrcAuthApi` server in a sandbox, with the
caller's token forwarded (probe below). Lore's installation then needs:

- Hub's gRPC listener exposed as a service route with
  `--authorization-mode bearer-passthrough`. The default, `strip`, removes the
  caller's token;
- `repository_catalog_url = "https://vv-control--hub--grpc.openshell.localhost:8080"`.
  The gateway ignores the port when routing, and 8080 is its in-cluster listener;
- that name resolving to the gateway Service inside Lore's pod (the probe used a
  hostAlias);
- `openshell-ca` in Lore's trust roots. lore-server's client trusts the system
  roots, so `SSL_CERT_FILE` names the system bundle plus `openshell-ca`;
- an egress rule in Lore's NetworkPolicy to the gateway pods on 8080.

This reverses the earlier choice in
[LORE_DIRECT_OIDC_PLAN.md](LORE_DIRECT_OIDC_PLAN.md) not to run a catalog service,
because people need to see their own repositories.

#### Verification, 2026-10-21

Read-only source investigations covered OpenShell `53e366581`, Lore `ff40bb21`, Hub
`7c6240d`, the installation and upstream BuildKit documentation. The K3s node
`rozgo-sim-pc` was inspected over the RustDesk SSH endpoint, and disposable probes
ran there through `kubectl` in a `veoveo-probe` namespace that was then deleted.
They used ordinary Kubernetes workloads only; no OpenShell sandbox was created.

| Question | Finding | Effect |
|---|---|---|
| Where a sandbox program's output goes | Container stdout/stderr of the workload pod; confirmed on the node for `artifact` (container `agent`). `openshell logs` holds only OpenShell's events, 2000 lines in gateway memory | Cluster log collector |
| Running commands in a sandbox | Exec requires Ready; a crash-looping main program never is | Hub runs no commands inside; the main program fetches and builds |
| Stop and start | Stop deletes the pods; start creates new pods on the same volume and name | Builds and caches survive restarts |
| Program-identity pinning | Kept in supervisor memory, new on every start | A rebuilt binary runs normally after restart |
| Cross-workspace service calls | Supported through the gateway relay; already used | No new mechanism |
| Credentials in Lore's gRPC headers | Substituted on inspected `rest` endpoints; providers refresh with a stable placeholder | Lore access through a provider |
| Mapping a pusher to Hub | `BranchPushed.user_id` is the Hub principal ID | Direct |
| Image builds | `buildctl --local` is the standard flow; node has kernel 6.8, containerd 2.3.4, runc 1.4.2, K3s 1.36.5; AppArmor restricts unprivileged user namespaces; no `registries.yaml` | User-namespace BuildKit; local OCI registry with one node registry entry |
| Current external dependencies | All 31 Veoveo platform pods pull from `registry.cloudflare.com` with a pull-only secret, and `public-tunnel` runs Cloudflare's tunnel image | An on-premises-only installation would also move these images to the local registry; outside this slice |
| Existing log collection | None running | Collector is new installation work |
| Logs after a pod is gone (probe) | Vector `0.60.0` and VictoriaLogs `v1.53.0`: a pod's 40 stdout lines and 1 stderr line (exit 3), and a one-line crash (exit 1), stayed queryable after pod deletion, with pod, namespace and OpenShell labels | Collector design confirmed, with the settings above |
| Environment image build (probe) | User-namespace BuildKit worked; Time's `dev` stage 364.9 s cold, 0.2 s warm | Builder design confirmed |
| Local registry push and pull (probe) | `registry:3` on a 20 GiB volume. BuildKit pushed a 29.8 MB image under the Service name in 3.0 s; the same content under a second tag took under 0.1 s with the same digest. Without a node entry the pull failed to resolve the name. With a `registries.yaml` mirror to the ClusterIP and a K3s restart (API back in 6.6 s, no container restarted), a sandbox pulled the image in 549 ms and was Ready in 6.9 s, running the pushed digest. Tags survived a registry restart, with about 1 s unavailable. Removing the entry took a second restart (API back in 6.5 s, no container restarted) | Registry design confirmed; the registry Service keeps a fixed ClusterIP. Not measured: a multi-gigabyte environment image |
| Node restart (probe: `k3s-killall.sh`, then K3s start) | Killing every container took 11.5 s. API and node Ready at 7.3 s after start, PostgreSQL 35.7 s, gateway 41.2 s. Every sandbox with restart policy `always` (Hub, Time, Media and the others) was brought back by OpenShell itself, Ready by about 64 s with restart count 1. Sandboxes with `never` stayed down: one reported `Error` with no exit code, another `Completed` with exit 0, because its server exited cleanly on the kill signal, which is indistinguishable from a normal exit. Lore restarted four times waiting for SeaweedFS S3 and was Ready at 124 s. OpenShell's restart backoff is 1 s doubling to 3 min (`openshell-server/src/compute/mod.rs:414-416`) | Decided 2026-10-22: factory sandboxes use `always`; Hub drops reboot reconciliation |
| Factory sandbox lifecycle (probe through the gateway) | Create to Ready 6.7 s; stop to Stopped 2.4 s; start to Ready 2.5 s and server output 4.6 s after start; the disk survived (no recompilation); a failing server under restart policy `never` showed Error, exit code 3, restart count 0; every pod's output reached the log store | About 7 s of restart per push before fetch and build |
| Time build in a factory sandbox (probe, 8 CPU, 16 GiB) | Cold release build including dependency fetch 156.5 s; one-line change 32.3 s; no change 0.3 s; after a native stop/start (5.2 s) no change 0.3 s and one-line change 32.0 s; caches 1.3 GB target, 417 MB Cargo | A Time push costs about 40 s with a release build: restart plus 32 s compile plus startup. Commands run through `sandbox exec` lack the image's environment, so builds belong in the main program, as designed |
| Lore through a provider (probe) | The sandbox held only a 59-character placeholder; `lore --access-token <placeholder> --identity <principal> repository clone` succeeded in 0.21 s; OpenShell terminated TLS and allowed each Lore gRPC call | Lore access design confirmed |
| Lore repository listing | `lore repository list` returns nothing. The installation sets `repository_catalog = "baseline"` with `baseline_access = "denied"` (`veoveo-template-installation/kubernetes/lore.toml:15-16`). lore-server lists per caller only through the service holding the grants (`UrcAuthApi.LookupUserPermissions`, `lore/lore-server/src/authnz/repository_catalog.rs:38-41`); here the grants are Hub's `lore.assignments`, and Hub does not implement it | Decided: Hub serves Lore's `UrcAuthApi.LookupUserPermissions` from `lore.assignments`, and Lore uses `repository_catalog = "auth_service"`. Lore's own listing is then per user, while access stays enforced by Lore's token grants |
| Data-environment databases (probe) | A schema-only template of `veoveo` (12 schemas, 84 tables, 20 MB) built in 1.2 s; clones took 0.23–0.25 s with the default strategy and about 0.28 s with `FILE_COPY`; drops about 0.17 s each. Hub's role `veoveo_owner` has `createrole` but not `createdb`, and the CNPG cluster spec manages it. Second probe, as Hub's role (`SET ROLE veoveo_owner`): without `CREATEDB`, `permission denied to create database`. With it, the role cloned the 84-table template in 62–80 ms, restricted and granted `CONNECT`, and dropped its own clones in 33–300 ms. CNPG reports the role as `cannotReconcile`: every reconcile tries `REVOKE "veoveo_server" FROM "veoveo_owner"` and fails with `dependent privileges exist`, because PostgreSQL gave Hub's role admin membership in the 22 roles it created | Replace CloudNativePG with a plain StatefulSet whose first start creates `veoveo_owner` with `CREATEDB` (B1) |
| A server in a sandbox from a cluster pod (probe, current gateway) | Through the gateway's service route HTTP/2 arrives as HTTP/1.1. A gRPC request is answered by the gateway itself: reflection lists `openshell.v1.OpenShell` and `grpc.health.v1.Health` fails. Direct pod connections time out | Today's gateway cannot carry Lore's catalog call |
| Inbound gRPC with the OpenShell change (probe) | A test gateway built from `inbound-grpc-service-routes` rolled out in 2.8 s and back in 2.9 s. From a cluster pod, reflection listed the sandbox's own services, `Health/Check` returned `SERVING` and `Health/Watch` streamed. Plain HTTP to Hub stayed HTTP/2 200, and the gateway CLI worked. lore-server was then set to `repository_catalog = "auth_service"` at a sandbox serving `UrcAuthApi` (server code generated from Lore's `auth_api.proto`). `lore repository list` showed exactly the two repositories the sandbox returned, in about 75 ms per call including `sandbox exec`. With `bearer-passthrough` the sandbox received the caller's 1840-byte token; with the default `strip` it received none. The first attempt timed out at Lore's 50 s deadline because Lore's NetworkPolicy allowed no egress to the gateway | Catalog path confirmed; Lore's installation needs are listed under Identity |
| PostgreSQL connections | About five per server process and 12 for Hub; 87 of 512 in use; `idle_session_timeout` off | Connection plan under Capacity And Cleanup |
| An empty environment database (probe) | As Hub's role, owner of a new database: `CREATE DATABASE` 176–181 ms, Core's six kernel migrations 214–220 ms, `kernel.ensure_server('time')` plus Time's migration as its group role 168–179 ms, 33 tables; drop 167–177 ms. Three runs, each step including a `kubectl exec` round trip. The database must be owned by Hub's role: owned by `postgres`, the kernel migration failed with `permission denied for database` | No template database needed: a ready Time environment in about 0.6 s |
| A sandbox larger than the node (probe) | 64 CPU requested on the 32-CPU node: the gateway accepted it, its phase stayed `Provisioning` for over 110 s, and `sandbox get` showed `PodScheduled: False (Unschedulable) - 0/1 nodes are available: 1 Insufficient cpu`; the pod was Pending with `FailedScheduling` | Capacity needs no Hub logic; `status` shows the condition |
| Sandbox pod start times | Existing workload pods were Ready 2–18 s after creation (Time 5 s, Artifact 9 s, Hub 14 s, Media 18 s); the GPU embedding runtime 267 s; supervisor pods 3–18 s. Pod level only, not the gateway's Ready | Restart cost per push is seconds before fetch and build |

#### Open Decisions

None for Stage 1. Closed on 2026-10-22:

- A data environment is created with the first instance of a branch name and
  removed after the last.
- The builder has open outbound access.
- A new instance's first registration credential arrives through a provider, as
  Hub runs no commands inside sandboxes; still to validate.
- A push builds and serves; it runs no other repository checks.
- Sleep thresholds wait for sleep and wake (Stage 2 and later).
- The management MCP became the Hub MCP server, in its own repository.
- Installation-wide usage totals and `exec` into factory sandboxes are dropped.

### Environment Overrides And Fast Source Activation

**Implemented and published; full Mac/Linux component gates and the recorded Linux
routing/source probes, final exact-MiMo workflow and Task correlation pass at the
recorded scope — 2026-10-21.**
Use one narrow Lore-versioned definition, which may live in
an existing registered repository;
there is no requirement for one repository per environment. `components` is the
single map of logical component IDs to **owned overrides**, not a competing second
`overrides` field. Stable IDs carry identity; display labels and branch names have
no special stage, routing or permission semantics.

```yaml
schemaVersion: 1
id: "<environment-id>"
displayName: "My Media experiment"
base:
  environment: "<base-environment-id>"
  follow: admitted  # alternatively: revision: "<resolved-composition-revision>"
components:
  "<media-component-id>":
    source:
      repository: "<registered-lore-repository-id>"
      branch: "<stable-lore-branch-id>"  # alternatively: revision: "<exact-lore-revision>"
    runtimeTemplate: "<versioned-native-runtime-template-ref>"
```

This YAML example illustrates product selection, not the JSON wire format. The
published source-facing contract is the single
[`EnvironmentDefinition` DTO](../veoveo-hub/crates/veoveo-hub/src/bin/hub/activation/types.rs),
shared by the owner HTTP API, Computer CLI and native definition-file reader.
The [Hub usage example](../veoveo-hub/README.md#environment-source-activation)
shows its JSON fields and typed build/worker recipe. Base `follow` and exact
`revision` are exclusive, as are source branch
following and source revision pinning. The base is optional and must be authorized
and acyclic. A source push advances only definitions explicitly following that
registered branch. Base updates change inherited selections only; owned overrides
persist. Runtime settings, policy/provider schemas and resource admission stay in
native OpenShell definitions. Any data/identity bindings reference approved records;
there are no embedded secrets or branch-authored permission grants.

A pinned base is an immutable composition shared by its named environment.
Resolving it checks current access to that environment and the selected child,
without recomposing the base from its current ancestors. Revoking direct access
to the named base denies selection; changing an indirect ancestor's sharing does
not retroactively change that captured composition. Component and data permissions
still apply to each operation. Following a base instead resolves its current
authorized inheritance chain.

An operation that already captured a composition uses that exact retained record.
Task reads and downstream delegation check current access to the captured selected
environment, plus current component/data policy and current admitted deployment
bindings. They do not resolve that environment's newly edited base chain. Removing
access to the captured selected environment denies the operation; finding the same
deployment through a different environment does not restore that access. Repeated
projection of the same source Task for the same deployment, owner and profile keeps
its first captured composition rather than retargeting existing work. Fresh requests
continue to resolve and authorize the current configuration.

For a logical component, absence from `components` means inherit from the selected
base. An explicit override wins; if selected but unhealthy it is **unavailable**,
not a fallback to the base. Removing the entry explicitly resumes base selection;
without a base entry the component is unavailable. Routing isolation does not clone
data: inherited services use their existing data under current ACLs, and override
data bindings must be explicit. This plan adds no Lore authorization rules.

The first implementation supports an explicitly admitted binding to the logical
service's existing database schema. Permission to edit an environment does not
grant permission to use that storage binding. Published deployment admission now
requires that explicit storage binding instead of inferring it from environment
edit permission. Independently keyed override workers receive authority for their
particular deployment, not the namespace owner's signing key or the installation's
global registration secret. Isolated copies of application data are outside this
slice: current component SQL explicitly names its schema, so changing `search_path`
would not establish isolation.

### Final Workflow Evidence And Capacity Boundary — 2026-10-21

The execution plan records one fresh native OpenCode `c5fb626` session in selected
A Location `/sandbox/projects/e4-selected-a`, using exactly
`deepinfra/XiaomiMiMo/MiMo-V2.6-Pro`, build agent/eight-step bound. One prompt
completed successfully in 197.285 seconds and four assistant steps, cost USD
0.0241220924. Actual tools returned native Lore repository/local revision (exit
zero), two resolved UTC instants and one settled temporal schedule containing the
expected single 09:00–10:00 UTC occurrence, `truncated:false`. The latest injected
guide marker was returned without supplying its value or reading the guide through
a tool. Recorded wrapper times were shell 472 ms, search 22 ms, resolve 366 ms
and expansion 389 ms; individual nested-call latency is not claimed.

Native CLI serving defaults durable event payload retention off. The attempted
session log captured sequence watermarks, not execution payloads; authoritative
session/message projections provide the model/tool evidence. The fixed deadline
interrupt returned false after success, and the session was inactive. No second
prompt/model run or event-retention change was made. Raw capture and reviewed
receipt are under `/tmp/e4-final-opencode-20261021/`; the execution plan retains
full model/source/byte identities and the separate UI observations. Read-only
correlation identifies native Time Task `01a15d71-8deb-7813-98c5-5f7d8fbeed56`,
succeeded in 20.480 ms, with selected A
composition/deployment matching current generation 10 and the exact one-occurrence
result. The ID comes from stored Hub/Core routes, not model output. Restored
shared guide bytes and unchanged Computer/Hub identities were read back. The
coordinator accepts E0–E5 as complete at these boundaries. Manual review of all
three existing diagram views, component details and navigation passes; six actual
SVG/PNG exports pass XML/magic/dimension validation, and the full next-workflow
PNG was visually inspected. Evidence:
`/tmp/e4-final-opencode-20261021/diagram-review/exports.json`.

Post-restart browser asset failures exposed an installation connection budget,
not a new proxy/authentication requirement. Confirmed gateway pool timeout and
PostgreSQL `53300` rejections preceded native CNPG's live increase from 100 to
512 connections (installation `b39015e`). The estimated configured process-pool budget is
184 before operator/reserved/rollout headroom, including ten live Time processes
with retained revisions. Worker retention must be counted alongside base services;
512 is capacity, not a new workload admission rule or an automatic retirement
scheduler. A/B/base runtime identities remained unchanged through PostgreSQL's
operator restart; subsequent browser reload had no HTTP errors. Residual browser
resource waiting outside measured 16–18 ms Hub/gateway handling remains
unlocalized, so no latency/SLA or zero-downtime claim follows. Detailed receipts:
`/tmp/e4-postgres-capacity-20261021/`.

### Accepted Personal Lore Workspace Default

**Implemented, with actual personal repository preparation, chosen native access
and fresh Computer entry qualified on Linux; E0–E5 scope/evidence mapped below.**
A personal Lore workspace
repository is the default home for versioned user setup, not an automatic mirror of the Computer's home or a mandatory repository
per environment. The user may choose another authorized location. Illustrative paths are `environments/my-work.yaml`,
`environments/media-experiment.yaml`, root `AGENTS.md` and `projects/README.md`
containing ordinary project links. Root `AGENTS.md` supports existing instruction
discovery when the workspace checkout is the working directory; an optional
`instructions/` directory can hold referenced documents. These are illustrative
layout conventions, not a required schema or a new project registry protocol. Service source stays in its own repositories,
referenced by stable IDs and branch/revision selectors; shared definitions may
live in a team workspace repository. Hub associates a tenant/principal with a stable
native repository ID under existing Lore permissions. An optional live installation
default selects an explicitly registered native deployment; no first-by-name or
compiled repository choice is allowed. Reserve native repository/default-branch IDs
before creation, verify the actual returned identity, then publish the actual
repository and creator assignment through the existing control-revision CAS. Reuse
of an existing repository requires the caller's current native grant and adds no
Owner privilege. The association survives Computer recreation and is not replaced
when installation defaults change. A reserved publication revision lets retry
distinguish an unfinished publication from an already committed grant that was
subsequently revoked.

The integration remains inside the Hub executable's native contribution. A generic
Computer onboarding hook runs after credential custody completes, outside its row
lock. Optional workspace failure leaves Computer access usable with explicit
pending/auth-needed/failed status. The initiating OAuth client's current registration
must allow the selected native audience and scopes. A platform refresh family is
never substituted for a native Lore family. Native CLI login, token storage and
refresh remain unchanged. Computer entry never requires or starts native login or
checkout. The workspace contribution delivers a public typed repository descriptor
through owner-bound native Exec; ready means the optional default and descriptor are
prepared. The user or agent chooses the repository, branch and destination for
ordinary native operations. OpenShell's `ExecSandbox` RPC requires its existing
`sandbox:write` scope and workspace authorization. The Hub provider recipe already
requests that scope; the selected sandbox policy must also admit that exact RPC.
There is no separate `sandbox:exec` scope or new external Exec endpoint. The Hub
original onboarding source was published as `628e18d`; the checkout-removal
correction is now `aff11f8`, with combined Mac/Linux gates each reporting 276
passed and one skipped. Subsequent deployed receipts establish actual repository
preparation, descriptor delivery, association retention through explicit dev
Computer recreation and user-chosen native checkout/commit/push. The current fresh
Computer also passes chosen personal/Time source checkouts after native device
approval. These are separate deployed observations, not inferred from component
checks or a prepared onboarding status. Native Computer Stop/Start also retained
both chosen checkouts, their revisions, project configuration and the delivered
guide; native repository/branch reads succeeded after Start. The runtime main/Pods
were replaced, so a repeated numeric OpenCode PID is not process continuity.

A Computer without a checkout uses the Hub profile's configured default environment
unless its MCP connection explicitly selects another admitted environment. Checkout
never selects or applies an environment. Working checkouts, caches, scratch and
session history remain private unless the user explicitly publishes selected files.
No automatic home synchronization or additional Lore permission scheme is introduced.

The packaged Computer handbook covers only Computer-specific organization, native
Lore/Hub use, environment selection/apply/watch and publication. It references current
runtime configuration and the public descriptor rather than hardcoding an origin,
repository or active environment. Hub supplies connection/descriptor values through
existing native configuration and delivery; credentials never enter instruction
text. Different OpenCode projects/Locations may select different environments, so a
Computer-wide copied environment snapshot would be incorrect. The current handbook
is shared Markdown, not a Hub template engine. Pinned OpenCode watches loaded local
instruction files and refreshes subsequent model steps; it does not change an
already running model request or continuously refresh remote instruction URLs.
No skill-installation tutorial or duplicate OpenCode guidance is added.

Hub-managed replacement is published in Hub `0493f95` and installation `d089f94`.
The image seeds `/sandbox/home/.config/computer/instructions.md` before OpenCode
discovery, and the native config loads that writable public guidance file.
Optional plain `computers.handbook` Markdown is read from the current live catalog
on the next admitted Computer entry/callback and atomically delivered through the
existing best-effort per-owner job, independently of repository preparation.
An omitted/null handbook leaves managed text unchanged; an empty string clears it.
Handbook-only changes do not change native provisioning, require login/checkout
or block Computer entry. No template engine, fleet fanout or copied grant/environment
map is introduced; user-owned `AGENTS.md` files remain user-owned.

Live entry-triggered delivery now passes: the 4,783-byte guide has SHA-256
`a151dd8610dc6c734e01d175574c5ba919fbd351125f70de17ca6c0338ffa235`
with the same OpenCode PID 58, after A/B Locations had already loaded. Receipts
are under `/tmp/e4-managed-handbook-rollout-20261021/`. This establishes delivery,
not by itself injected model consumption. The later final exact-MiMo session
returned the out-of-band guide marker without that marker in the prompt or any
tool read, establishing consumption after delivery. Native instruction watching
reloads subsequent steps; its debug rescan is not a public instruction-content API.

### Computer-Local Apply And Lore Reconciliation

**Implemented and scoped-qualified on Linux, 2026-10-21.** Computer-local
apply/watch and native component-branch following pass on Linux. Failed builds
retain the previous serving version; native runtime stop/start recovered an active
Time Task with its 64 exact expected results. These are deterministic deployed
probes; later receipts separately establish source-selector transitions, activation
completion with the Computer Stopped and final exact-MiMo acceptance. A Computer-local environment
file and source directories drive an explicit apply through Hub that snapshots the selected inputs into the separate
private override runtime. An opt-in watch repeats that apply. The personal Lore
checkout can hold these ordinary working files; Lore commit/push publishes
versioned, shareable source/configuration and is not required for every edit.
Applying local files transfers only the explicitly selected source/configuration;
it does not publish the Computer's home, history or unrelated scratch.

Implementation decision, 2026-10-20: explicit local apply uses the existing private
Artifact upload/download contract for a selected source archive. Its client already
supports streaming bytes, declared size, idempotency and completion. Under the
accepted Artifact content-hash removal, the source producer owns the selected
snapshot's digest; Artifact does not compute or certify it.
The source adapter belongs at executable composition, beside native Lore integration;
generic environment activation consumes a resolved source identity and does not name
either server. Do not add an OpenShell upload protocol, an Exec chunking protocol or
an application credential path. This is source transfer, not OCI publication or a
mandatory Factory job. Archive/upload latency must be measured separately.

Reserve the desired generation and apply identity when authenticating the request,
before transferring bytes. Authorize the exact Artifact through the caller's existing
access, compare its size with the selected snapshot, and materialize the bytes in
the native workspace PVC. The source activation consumer independently verifies
the snapshot digest before marking that source ready. Signed
download URLs are temporary transfer inputs, not persisted source identity; pass
them through private native Exec input rather than logged command arguments. A late
completion cannot replace a newer desired generation. An interrupted incomplete
transfer remains visible and can retry that still-current apply with fresh caller
authority. Once materialized, build/restart recovery uses the retained source bytes,
independently of the Computer or the transfer credential's lifetime. None of these
source-activation behaviors is qualified by the separate runtime mechanism probe.

Local snapshots and resolved Lore revisions feed the same typed activation
contract and revision-worker lifecycle. An override has one active source selector:
applying a local snapshot replaces its branch-following selection explicitly, so
a later branch notification cannot overwrite that local experiment. Returning to
branch following is another explicit selection change. Track the accepted desired
generation so a superseded fetch/build cannot activate after a newer apply.

The composition, routing, independent runtime and retention rules remain:
a stopped Computer leaves its override on the last successfully applied snapshot,
not a live mount into a disappearing home directory. Snapshot transfer, explicit
watch, failed-build retention and independent worker lifetime after the watch
client disconnects have deployed evidence. Explicit pin/local/follow transitions
and serving/activation completion while the Computer is Stopped now also pass.
The observed replacement had finished compilation before the stop; no compilation
or new source fetch during that stop is claimed. The owner HTTP
apply endpoint and explicit CLI watch are deployed and exercised through the
existing Computer's own native Hub connection.

Definition following is distinct from each component's source selection. An
executable-owned typed record selects either local definition input or one registered
Lore deployment/repository/branch/path containing the same `EnvironmentDefinition`
DTO. It retains the exact resolved native revision and a positive selector generation.
Explicit local apply atomically replaces definition-follow mode, so an earlier file
read cannot overwrite newer local intent. Component branch followers remain
independent selectors. Authoritative reads happen outside database transactions;
publication compares current ownership, selector mode and generation under the
existing control transaction. This adds no second manifest format or Lore permission
model. The definition-follow adapter is deployed, but its first native root-file
probe found a Hub invocation defect: `lore --repository` does not change process
cwd, and native file extraction resolves its relative path against that cwd. A
one-line correction runs extraction from the selected temporary checkout. It is
published and deployed as Hub `0f988b6` after both full component gates passed.
The existing pending root-file follower recovered without resubmission, adopted
the label and retained the exact component Build/deployment/output. Nested-file
following also observed revision
`280787648923c7240d1725b59593057aa80f6239d9bd44b859c8881389796189`
at selector generation 12, changing only the definition label without a component
rebuild. The corrected operator command used the native deployment name `primary`,
not an execution deployment UUID. This changes no Lore behavior or authorization.
Subsequent explicit source-selector transitions also pass: R2 stayed pinned after
R3 publication; a local snapshot remained selected after both a Time source push
and a definition push; explicit follow restoration adopted the published definition
and activated its Time replacement independently of Computer lifetime.

Definition reads must work before any component runtime exists and while the
Computer is stopped. The approved executable adapter packages the existing native
Lore CLI with Hub and uses an exact-revision bare repository plus native single-file
extraction into private temporary storage. This avoids duplicating Lore's encoded
content reconstruction. Hub owns the foreground child's timeout, cancellation and
cleanup; current native scoped grants authorize the read. The adapter bounds the
returned definition bytes, while Lore's parallel-I/O limits are not described as
total repository download limits. This adds neither a materialization service nor
a Lore protocol or authorization change. Exact-revision native extraction and
root/nested-file following now have deployed evidence. The recorded Computer-stop
case establishes retained serving and activation completion, not a new definition
read or source fetch initiated during the stop. Exact observations and the
subsequent successful final-agent qualification are tracked in the execution plan.

For published inputs, use native Lore repository subscriptions rather than adding
per-environment compiled hooks. Branch create/push/delete notifications wake a
reread of authoritative branch/revision state; subscribe before the initial read,
and reread on reconnect and periodic reconciliation. Lore's current in-memory
stream has no replay cursor. Its receiver is registered before Subscribe returns,
and lagged events are silently dropped; periodic rereads are required even when the
stream remains connected. Watch registered repository/branch IDs and environment
paths dynamically; no repository name is compiled into Hub and no Lore behavior or
permission change is required. Native subscriptions do not observe local file saves.

Authoritative recovery has deployed evidence without resubmitting intent: the
already published root revision was still unobserved at 05:22:25 UTC, before the
new Hub process/subscription, and was observed at 05:47:42 after rollout. See
`/tmp/e4-lore-follow-20261021/root-definition-observation.json` and
`after-cwd-rollout-root-definition.json` in the same directory. Exact hint delivery
and wake reason were not instrumented; no native loss/duplication injection is
claimed. Repeated branch-read coalescing, rewind identity and stale publication
are covered by existing component/DB tests. This is authoritative reconciliation,
not notification replay.

### Environment Selection, Source Activation And Retention

**Selection and routing.** Selection belongs to an authenticated Hub execution/MCP
context, separate from business `WorkContext` and data authorization. Two OpenCode
projects/Locations of one user can select different maps while calling the same
logical tools, such as `media__run`; composition resolves the logical component to its deployment,
revision and endpoint. Multiple live registrations must coexist without the newest
registration stealing another environment's route. The published Hub implementation
now keys the
[RegistrationSnapshot](../veoveo-hub/crates/veoveo-hub/src/registration/snapshot.rs#L56)
by deployment, and
[registration selection](../veoveo-hub/crates/veoveo-hub/src/registration/watch.rs#L96)
retains the newest process registration of each deployment. Unscoped logical-slug
lookup refuses ambiguity; an admitted composition selects the exact deployment.
Live A/B/base probes now establish independently keyed deployments without route
takeover; A/B belong to the same human, not two separately qualified human owners.
The selected-A synthetic Media Task's retained composition and its private Artifact
provenance also correlate in stored rows, and the same human read its exact bytes
through B. A/B inherit the same Media/Artifact deployments; distinct downstream
target selection retains its separate deterministic fixture proof. The associated
audit query returned no rows, so no additional downstream audit claim is made.

The public MCP route remains `/mcp/{profile}`. Hub's selected-environment HTTP
binding passes component checks and Linux selected wire probes. Native OpenCode
project-local configuration now supplies distinct A/B headers through the same
configured Hub URL and opaque authentication. Discovery/tool schemas, caches,
pagination, downstream delegation and Task lookup must all use the resolved composition and
deployment revision. A shared service preserves each call's selection, rather than
changing global downstream configuration. Native SDK/Core/domain types should own
these contracts in their existing layers; do not add a parallel conformance system.

Source inspection confirms OpenCode already passes configured MCP connection
headers, but owns those connections per Location rather than per chat session.
The client surface uses a typed `veoveo-environment` HTTP selector on
separately configured connections/Locations, leaving the OAuth resource URL
unchanged. Hub must authenticate and admit that selection; the header itself is
not authority. OpenCode's current `ai.opencode/sessionID` tool-call metadata does
not cover discovery and cannot provide a separate environment per chat by itself.
The signed downstream context retains the admitted environment and immutable
composition revision, while each hop separately names its target deployment.
Separate chats in the same Location share its MCP connection and do not select
environments independently. The final exact-MiMo session exercised selected A;
native B connection and exact A/B schemas retain their separate deterministic proof.

The current OpenCode [MCP configuration plugin](../opencode/packages/core/src/config/plugin/mcp.ts)
already observes `config.updated` and calls `mcp.reload()`, and its
[configuration discovery](../opencode/packages/core/src/config/discovery.ts) includes
ordinary project `opencode.json`/`opencode.jsonc` files. The current Computer's
`e4-selected-a` and `e4-selected-b` Locations both report native Hub connections
connected, with distinct selectors verified through safe configuration readback.
Native connect includes tool discovery; its status response does not return tool
schemas, and there is no public tool-schema endpoint. Exact schema differences
remain the separate selected Hub wire receipts. Each project supplies the full
Hub server block referencing existing environment variables: server entries replace
earlier entries rather than merging a headers-only override. No picker or new
OpenCode protocol is added; the final selected-A agent scenario now passes within
the recorded eight-step/240-second bound.

**Source activation.** Hub's existing trusted process owns only thin desired-state
reconciliation: notifications are hints, authoritative Lore reads plus periodic
reconciliation determine current intent. OpenShell owns sandbox/PVC/execution and
native main-process recovery. The service repository declares build/check/launch
commands; a reusable versioned template supplies the interpreter/toolchain. Ordinary
source changes reuse the override's admitted sandbox, PVC and incremental cache.
Fetch each exact revision into its own directory, build/check it, then start a
separate revision worker with an admitted distinct listener/endpoint. Only after
application readiness and registration succeeds, atomically publish the selected
route **and catalog** for new operations. No ordinary edit requires OCI publication,
sandbox/Pod replacement or Hub restart; template/toolchain changes are a separate
workload lifecycle operation.

The implemented in-runtime process-ownership contract uses a stable `s6-svscan`
entrypoint with one service directory per Build. Real Time workers survive the
watch client's disconnect and recover after native runtime Stop/Start. Native
scoped Exec builds/probes; it is not the daemon-lifetime mechanism. OpenShell remains
the recovery owner for the canonical main process; do not change its supervisor/security or add
an external process controller. On recovery, reconcile desired/serving source and
worker state before routing; do not replay non-idempotent mutations.

Approved implementation contract, 2026-10-20: the single source-facing environment
definition owns `components`, each with a typed source selector, `runtimeTemplate`
reference and build/check/worker recipe. Commands are executable/argument arrays
with typed relative paths, not a new interpolation language. Compiled workers and
interpreted workers are distinct variants; both retain immutable worker inputs.
The activation service supplies deployment identity, listener, endpoint and key
directory consistently to offline registration description and serving. Repository
definitions carry no registration credentials or native policy grants. Live trusted
runtime admissions reference existing environment/component identities and approved
storage bindings; current owner/tenant checks apply without adding another group ACL.

Native provider attachments are also explicit operator-owned runtime admission.
OpenShell's named workload template supplies image/environment/resource/driver
settings; native Create receives policy, providers and the fixed main command as
governance inputs. The adapter retains the actual native template revision and
checks those inputs when reusing its owned runtime. Source recipes do not supply
provider credentials. Build/check commands run in the foreground under native
Exec's process group and deadline; they must not detach background jobs. Native
Exec owns cancellation of those commands, while s6 owns serving worker lifetime.

For native Lore materialization, the helper receives the short-lived scoped token
through private Exec input and invokes Lore's existing `--access-token` option.
Lore uses that supplied authorization without reading or writing its cached token
store (`lore-transport/src/auth/exchange.rs`). The token is briefly present in the
child Lore process arguments; it is absent from the gateway's logged top-level
helper command, source receipts and worker definitions. Do not print child command
arguments. This uses the native CLI contract without changing Lore authorization,
introducing a credential-store format or manufacturing a human refresh grant.

Candidate publication requires the SDK's existing listener-root `/readyz` to report
application readiness at the exact admitted placement, plus the matching live
registration. A missing readiness endpoint is a candidate failure; `/livez` is not
a substitute. This uses `HostedServer::readiness`, already used by Time, and adds
no candidate token, fake composition or preselection authorization bypass. Readiness
does not prove MCP behavior: the deployed scenario separately exercises discovery,
schemas and calls through ordinary authenticated selected-environment sessions.

Reserve desired generation and idempotency before source transfer or branch reads.
Publication compares the accepted generation and updates the serving selection and
control revision within the existing database transaction, using a typed activation
guard. A process-local mutex alone does not prevent stale publication across replicas.
Candidate failure retains the previous serving revision; withdrawal or supersession
prevents late selection. Native placement uses the existing endpoint-to-workspace,
sandbox and port binding plus ForwardTcp, with no per-worker browser exposure or
new proxy. These paths are implemented and exercised by the recorded real Time
activation/failure/recovery probes; generation and connection-loss races retain
their separate component/DB evidence.

To be removed by
[factory sandboxes](#factory-sandboxes-and-dynamic-selection), agreed 2026-10-22.
Implementation decision, 2026-10-20: use native
[`s6-svscan`](https://skarnet.org/software/s6/s6-svscan.html) as that fixed main
process in a separate reusable override runtime. Each build has a separate service
directory and worker; scoped Exec prepares files and invokes s6's control commands.
OpenShell still owns sandbox lifecycle and named service exposure. s6 owns only
child-process supervision inside the sandbox; its readiness does not establish MCP
readiness. The selected Debian trixie toolchain base offers `s6` `2.13.1.0-1` on both
architectures. Package inspection alone is not deployed qualification; the
mechanism and actual Time receipts below establish their recorded scope. Native
Exec cancellation terminates its registered child, so an orphaned Exec process is
not the service-lifetime mechanism.

The separate Linux mechanism probe on 2026-10-20 now establishes s6-owned worker
lifetime after Exec disconnect, offline Rust compilation, independent HTTP service
replacement without Pod replacement, and worker recovery after native Stop/Start
from the automatic workspace PVC. Native Create must explicitly select
`/usr/bin/s6-svscan /sandbox/services`; an omitted command selects the CLI's shell
default. The [execution receipt](OPENSHELL_HARDCUT_PLAN.md#next-slice--environment-overrides-and-fast-source-activation)
records its image and boundaries. The subsequent real Time source activation,
MCP readiness/calls and retained Task receipts in that execution record qualify
those distinct paths; the mechanism-only HTTP fixture does not establish them.

Rust builds use **unique build-specific actual executable paths**, for example
`/sandbox/builds/<build-id>/service`, under a narrowly admitted path pattern. Record
the exact source, runtime/toolchain and output identity for each build; rebuilding
the same source must not reuse a pinned path with different bytes. Native
[TOFU identity](../openshell/crates/openshell-supervisor-network/src/identity.rs#L138)
rejects different bytes at a pinned path; this plan neither disables nor resets it.
Interpreted code also uses separate source directories/child workers when retaining
operations: never mutate imported files beneath an old worker. A reusable sandbox
is not a single reusable process. The new activation path uses the published MCP
describe/resume/deployment contract; it does not claim arbitrary in-process reload.

**Activation and retention.** In-flight operations and long Tasks capture their exact
deployment and resolved composition. Keep the old worker/source/runtime bindings
while canonical Task routes and results remain readable, including terminal results
until expiry or explicit retirement; new work selects the ready replacement.
An old Task must not be sent to the newest registration. A failed build/start before
activation retains the explicitly recorded last serving revision, with desired and
serving revision/failure visible. If the selected serving override itself becomes
unhealthy, return unavailable; retaining a known serving revision during candidate
preparation is not permission to silently route to the base.

Private Computer scratch is never automatically published. Explicit local apply
or an enabled watch captures selected files for the private override; a Lore push
updates only selectors following that branch. The selected service remains independent of the Computer's
lifetime. Isolated agent-free factories remain available for bounded jobs and
independent checks, not mandatory image publishers. Promotion selects a tested exact
source revision plus runtime and bindings; independent verification may be required
by destination policy. General trusted image publishing remains optional/separate.

## Identity And MCP Enforcement

Use the configured external OAuth/OIDC provider as the identity authority. OpenShell
validates that issuer's access tokens for its own API and applies native workspace
authorization. Its supported clients handle login and renewal. It does not issue
general user access tokens for the Veoveo Hub. See its
[authentication contract](https://docs.nvidia.com/openshell/v0.1.4/how-it-works/gateways/authentication)
and [OIDC implementation](https://github.com/NVIDIA/OpenShell/blob/v0.1.4/crates/openshell-server/src/auth/oidc.rs).

Move standard browser OAuth/refresh operations out of Veoveo after external-client
qualification. Share browser SSO through the configured issuer, with separate
resource audiences. Do not forward an OpenShell bearer as a Hub bearer or let
an environment manifest add an unapproved issuer. Keep the product's permissions,
context admission, narrowed actor/delegation tokens and Task authority in Veoveo;
OpenShell roles describe hosted Computer/compute access rather than permission to use arbitrary
MCP services or production data. Lore will validate the IdP's access tokens through
its native OIDC/resource-grants authorizer. Desktop compatibility is withdrawn;
its authentication adapter is retired. Do not
extend that adapter with a machine-token endpoint or preserve its signer as a
second trust authority. See [the cutover design](LORE_DIRECT_OIDC_PLAN.md).

The Hub already supports configured authorization servers but also implements
its own authorization codes, refresh families, rotation and revocation. Its
[auth design](../veoveo-hub/crates/veoveo-hub/src/auth/DESIGN.md)
requires `at+jwt` tokens and custom invocation/session claims. An external issuer
must be qualified for token format, resource binding, client registration, identity
mapping and revocation semantics before hosted login routes or storage are removed.
Normal logout leaves running Tasks authorized; detected credential compromise ends
their delegation. Preserve that contract with a qualified provider signal and
Veoveo Task grant, rather than duplicating the provider's refresh database. Do not
claim current Keycloak or intended Entra integration already satisfies this change.

OpenShell also supplies native
[MCP egress policy](https://docs.nvidia.com/openshell/v0.1.4/how-it-works/policies/schema#understand-mcp-rejections):
method/tool selectors, deny precedence and revision-aware checks. Reuse these
instead of adding equivalent Veoveo proxy rules. The reviewed source implements them in
[`l7/mcp.rs`](https://github.com/NVIDIA/OpenShell/blob/v0.1.4/crates/openshell-supervisor-network/src/l7/mcp.rs)
and `l7/relay.rs`. Explicitly enable `2026-07-28`; the default is `2025-11-25`.
Qualify SDK headers/metadata and use narrow enforced tool rules.

Arguments and responses are not inspected. `Mcp-Param-*` headers are not compared
with arguments and cannot establish authority. Veoveo retains user-specific
catalogs, environment routing and application/data permissions. Both layers must
allow a call. Direct clients still need authenticated ingress.

Native diagnostics distinguish protocol errors from policy denials. Malformed
requests fail even in audit mode. Qualify streams, cancellation and extensions;
do not bypass inspection to fix incompatibility.

## Lore Hooks And Branch Lifecycle

Lore v0.10.1 already defines hooks for branch push, creation and deletion, repository
creation and obliteration. Pre-handlers can reject an operation, response handlers
can add client-facing information, and post-handlers run asynchronously. The stock
server registers no custom hooks: using this extension point requires compiling
the selected hooks into a server build. See the
[hook configuration](https://github.com/EpicGames/lore/blob/v0.10.1/docs/reference/lore-server-config.md)
and [hook traits](https://github.com/EpicGames/lore/blob/v0.10.1/lore-server/src/hooks/traits.rs).

Use the existing `BranchPush` pre-hook for a small workflow guard on designated
factory identities. Compare the authenticated identity in `HookContext` with its
trusted repository/branch assignment and reject pushes elsewhere with a message
naming the assigned and attempted branches. Both supported push APIs already
invoke this hook. Keep assignments in installation/integration-owned server hook
configuration, outside agent control; CLI identities, headers and source files do
not establish authority. Human identities without an assignment retain normal
permissions. The current hook API supplies the required verified identity and IDs;
no handler or authorization/transport change is needed. Use the existing
`FailedPrecondition` business-rule rejection so ordinary clients display the
assignment message; their generic `PermissionDenied` conversion hides detail.

This is a guard on normal pushes, not complete isolation between branches or a
new authorization system. Native repository grants, branch protection, storage,
push and merge behavior retain their ordinary meaning. Do not execute scripts
from the pushed repository in the trusted Lore server. Keep pre-handlers bounded
and local; builds, remote provisioning and CI never run inside a pre-push handler.
Inspect any future missing hook capability as a specific hook API change,
rather than blocking the server thread with network calls.

Use Lore's
[notifications](https://github.com/EpicGames/lore/blob/v0.10.1/lore-proto/proto/notification.proto)
and post-hooks to wake reconciliation. They are hints, not proof of exactly-once
delivery or a transaction spanning Lore and OpenShell. The controller reads current
branch state before acting and periodically reconciles to recover missed events.
Key work by repository ID, branch identity, exact revision and job purpose. Recheck
the desired generation before publishing a preview; an old build result cannot
resurrect a deleted branch or overwrite a newer deployment.

The integration can expose check/deployment status through non-secret native
revision or branch metadata and existing status tools. A push response may link to
the job once that native response hook is qualified. Agent-editable metadata is
never a verification verdict or an authorization grant. Do not infer deployment
success from successful source publication.

## OpenShell Admission And Governance

Use OpenShell's existing OIDC validation and workspace membership for factory access.
Configure the installation's issuer and explicit roles; the local no-OIDC platform
admin default is not suitable for a shared factory. Reuse the same identity provider
as appropriate, with audience separation for OpenShell, Lore and Veoveo.
Application authorization retains its own protocol contract. Human Lore Desktop
login is outside the accepted factory scope.

Use a
[gateway interceptor](https://docs.nvidia.com/openshell/v0.1.4/extensibility/gateway-interceptors)
where native admission needs Veoveo context: apply an approved policy or reject an
unauthorized template, source binding, provider attachment or resource request.
Enforce security decisions in pre-dispatch validation with explicit RPC allowlists
and fail-closed behavior. Respect built-in authorization and validation after a
patch. Post-commit callbacks are observational and cannot reject committed work.

The interceptor API does not currently populate method-specific `current_state`,
does not intercept arbitrary reads or streams, and requires a gateway restart for
registration changes. Query authoritative state when needed; do not assume those
missing capabilities. Reconcile side effects independently. Keep provider profile
and policy administration outside untrusted source branches.

Authenticated middleware calls carry sandbox identity, while workload-controlled
labels, names, headers and repository files do not establish authority. Use
[supervisor middleware](https://docs.nvidia.com/openshell/v0.1.4/extensibility/supervisor-middleware/operations)
only for its documented phases and operations. Credential/routing headers are
protected and secrets are omitted from governance payloads; do not turn middleware
into a route for returning raw credentials or bypassing those restrictions.

Use the native [policy advisor](https://docs.nvidia.com/openshell/v0.1.4/how-it-works/policies/advisor)
for network-access proposals, review and reload. Veoveo does not keep another
approval queue. Lore can version approved policy inputs; runtime approval still
follows OpenShell's authorized operations. Do not auto-apply agent-edited policy.

Use the native [prover](https://docs.nvidia.com/openshell/v0.1.4/how-it-works/policies/prover)
within its documented model. Proposal risk checks do not prove compliance with an
installation maximum. The current boundary checker reports MCP/GraphQL and other
unmodeled shapes as unsupported. Keep those cases denied or under trusted explicit
review; never discard unsupported rules to manufacture a passing proof. No claim
of universal policy verification or automatic startup proving is made.

## Credentials And Repository Authority

The service-credential path below records historical agent-in-factory evidence.
It does not qualify human Computer login or prescribe resuming that old workflow.

The intended path is: an authorized sandbox makes a Lore request, its trusted
OpenShell supervisor resolves a repository-scoped credential, and Lore enforces
that credential at the repository and operation boundary. The author process never
receives the real token or a private signing key. Network rules and credential
endpoint bindings must both authorize the request. Renewal must cover long-running
sessions and re-established connections, not merely initial login.

Use native `oauth2_client_credentials` against the installation IdP, with client ID
and secret held as OpenShell refresh material. Local Keycloak supplies ordinary
Lore repository grants using built-in claim mappers and optional client scopes;
Lore validates that issuer directly. The old token worker is gone, and the Desktop
adapter is not a required factory issuer. No private-key JWT refresh patch, Veoveo
machine-token endpoint or SPIFFE/SPIRE deployment is needed for this slice.
Automatic renewal, reconnect, source withdrawal, applied binding-removal/detach,
native termination and recovery passed local direct-IdP acceptance on 2026-10-17.
See the measured results in the [execution checklist](OPENSHELL_HARDCUT_PLAN.md#separate-credential-lifecycle-qualification)
and the [direct-credential steps](LORE_DIRECT_OIDC_PLAN.md#implementation-order-and-acceptance).
Those Lore results do not qualify Hub application ingress or management renewal,
customer issuers, or cancellation of already-forwarded Lore requests.

Use native OpenShell provider APIs and its encrypted database credential driver.
Qualify protected persistent state, encryption-key custody, refresh, rotation and
recovery. There is no separate secrets service or human `.env` distribution project
in this candidate.

Lore's existing
[resource grants](https://github.com/EpicGames/lore/blob/v0.10.1/lore-server/src/authnz/resource_grants_authorizer.rs)
are repository-scoped. Factories use ordinary granted repository access and normal
Lore commands. An empty action array still permits ordinary unprotected pushes;
the smoke sandbox stays read-only through its OpenShell RPC policy. The selected
work branch is a workflow assignment, not a new
security boundary inside that repository. The pre-push hook above guards normal
pushes only; it does not establish complete isolation against low-level storage
APIs or every form of branch administration. The earlier comprehensive branch
confinement requirement is replaced by this scope, not satisfied by narrower tests.
Do not introduce custom `lore_authoring` claims, duplicated server RPC allowlists,
authorization middleware or stream-expiry machinery for the assignment guard.

In both inspected branch-push implementations, Lore v0.10.1 permits
`is_service_account` to bypass branch protection. An author worker must not receive
that flag merely because it is an automated client. Promotion authority belongs to
an independently authorized principal. Preserve the server's ordinary push and
merge semantics. Hook admission cannot bypass native protection. See the
[legacy push handler](https://github.com/EpicGames/lore/blob/v0.10.1/lore-server/src/grpc/handlers/branch_push.rs)
and [v1 handler](https://github.com/EpicGames/lore/blob/v0.10.1/lore-server/src/grpc/revision/v1/branch_push.rs).

Agent workers cannot read the secret store, resolve provider secrets through the
management API, access signing keys or the SPIFFE Workload API, or administer
OpenShell. Qualify native provider attachment, removal and renewal separately from
the branch hook. Removal must invalidate future credential references; measure
cached credentials and already-established sessions without promising cancellation
of requests already sent upstream. Use native sandbox stop when factory execution
must end. Do not add a Lore stream-expiry contract to manufacture revocation
acceptance. Never claim that hiding a token prevents abuse of its permissions.

## Qualified Native gRPC Mediation

This section retains historical Mac transport evidence. The uncommitted
early-response relay experiment was cancelled and removed; it is not an initial
product acceptance task. User agents now belong in hosted Computers with private
native Lore access, while deterministic factory jobs remain planned.

The original OpenShell v0.1.4 source review found HTTP/1.1-only TLS mediation,
which could not carry Lore's gRPC credential path. The maintained supervisor now
has a narrow generic HTTP/2 patch in its existing proxy/provider architecture.
The local path passes focused streaming/trailer, method/path/authority, credential
custody, message framing, policy fencing and cancellation checks. Unsupported
inspection combinations fail closed. Lore keeps its ordinary authorization and
transport semantics; it has no HTTP/1 facade or stream-expiry patch.

Native OpenShell owns qualified Lore mediation, workload egress, application
service ingress and private authenticated forwarding. Native application DNS,
request authority and TLS verification have passed the fresh ingress fixture;
the actual Hub and Time clients also pass deployed qualification. The factory client path has also passed its separate preflight. Desktop
adapter ingress and signer dependencies are retired. The retained identity
listener serves Keycloak bootstrap and its restricted public-key alias only.
Bring any concrete native limitation and proposed design change to the coordinator
before changing this placement.

## Optional QUIC Storage Transport

Lore provides a binary QUIC storage transport and gRPC storage with equivalent
logical operations. QUIC's `lore-storage/0.4` transport is designed for low-overhead
fragment transfer; actual improvement depends on workload and network conditions.
Revision/control APIs and storage transport are separate choices; accelerating
storage with QUIC does not remove the gRPC control-path qualification. See
[Lore's storage design](https://github.com/EpicGames/lore/blob/v0.10.1/docs/explanation/system-design.md).

OpenShell v0.1.4 mediates TCP and DNS, and its inspected socket broker denies
general external UDP. Thus Lore QUIC is not enabled by an existing network allowlist
or by selecting a compute driver. See the
[socket broker](https://github.com/NVIDIA/OpenShell/blob/v0.1.4/crates/openshell-sandbox/src/network_broker.rs).
Lore's QUIC authorization embeds the JWT in the storage protocol; UDP forwarding
alone would not keep that credential outside the author process. See
[Authorize framing](https://github.com/EpicGames/lore/blob/v0.10.1/lore-server/src/protocol/storage/authorize.rs).

Evaluate two options after the functional integration is established:

1. Generic policy-enforced datagram support in OpenShell, plus an explicit credential
   custody design for Lore QUIC. Mediation must retain sandbox attribution,
   destination restrictions, limits and safe reconnect behavior. Opening host UDP
   access is not an equivalent solution.
2. A trusted supervisor-side adapter using Lore's transport interfaces to originate
   authenticated QUIC storage sessions. The agent uses an existing mediated channel;
   the adapter holds credentials and delegates only permitted storage operations.
   This is a proposed integration, not an existing OpenShell driver or a separate
   implementation of Lore's wire format.

Prefer existing interfaces and protocol libraries. Benchmark binary and multi-file
transfers against the qualified gRPC baseline with matching authorization, hashes,
limits, network conditions and credential custody. Enable QUIC only for a measured
benefit worth its integration cost. gRPC remains acceptable and QUIC does not block
the factory or preview work. Transport optimization preserves this same delivery
workflow; it does not create a second service hosting path.

## Checks Artifacts And Deployment

OpenShell executes author, build and verification commands; it does not decide
which changes may enter an authorized destination environment. Use component-owned test
commands and trusted gate configuration rather than creating another CI language.
An agent's edited test command returning zero is not an independent verdict.

Bind a verified result to the exact Lore revision, OpenShell sandbox/generation,
template image digest, approved policy and produced artifact digests. Treat all
author outputs as untrusted. Fresh verification and a trusted publication step hold
release/signing/registry credentials outside workers. Workers receive no Docker
socket, deployment credentials or production secret mounts. Qualify an isolated
image builder before choosing it; OpenShell process isolation does not itself
provide a safe privileged container builder.

Use the existing Veoveo Task facilities where appropriate for durable coordination,
without building another sandbox scheduler or assuming OpenShell is a complete CI
workflow engine. The planned source loop activates exact revisions within admitted
native runtimes; image publication is a separate release/toolchain path. Submit
workload changes through OpenShell's SDK; no Flux deployment bundle or separate CI service is required. A
human-friendly Lore branch follows revisions; the deployed record always names the
resolved revision and digests. Recheck active branch generation and permissions at
publication and deployment. Long-lived MCP Tasks keep their version binding.

Lore, OpenShell, their policy/credential bootstrap, credential storage and identity services
remain outside preview-owned teardown. Branch deletion drains or cancels work,
revokes access and cleans up owned resources while respecting declared retention.
Periodic reconciliation recovers missed callbacks; no additional event bus is
required for the first implementation.

## Extension Builds And Fork Policy

Prefer configuration, SDKs and existing extension interfaces. A compile-time Lore
hook is an extension build even though it needs a customized server binary. Keep
the hook small and test ordinary upstream clients and storage behavior against it.
Prefer external OpenShell interceptors and native drivers to edits inside its core.

When a generic gap requires core work, maintain the smallest coherent patch in a
VeoveoAI fork and pursue an upstreamable interface. HTTP/2 credential mediation,
generic JWT authentication support or missing verified hook context are candidates;
they are not promises that each requires a fork. No patch may disable sandboxing,
bypass endpoint ownership, broaden repository grants or rely on setuid/setgid token
loaders. QUIC follows the same rules.

Every integration build records upstream version/SHA, patch revisions and image
digests. The OpenCode fork records its carried and removed changes, and how to
reapply them on an upstream update, in its `VEOVEO_FORK.md`. Run the same relevant upstream and Veoveo contract tests against the
upstream baseline and the modified build; keep results distinct and never weaken
probes to accept a patch. Track upstream security updates and retire local patches
when equivalent upstream support is qualified. Never deploy an unreviewed source
branch of Lore or OpenShell as the trusted control plane of its own test environment.
New extension operations or transport capabilities use explicit compatible
negotiation and opt-in configuration; unsupported enforcement fails closed. Keep
existing clients and configurations working within their documented contracts.

## Qualification Sequence

The historical [hard-cut plan](OPENSHELL_HARDCUT_PLAN.md) used an earlier removal-first
sequence; it is not the current Kubernetes cutover order. The current plan requires
qualification of replacements before removal of the Linux platform Compose path.
The sequence below retains the historical Docker acceptance boundaries; it is not
the current infrastructure cutover order. The Kubernetes checklist below and in the
execution plan governs new work: qualify a Kubernetes Computer and replacement
foundation before removing Compose. Implementation remains paused. Use focused
checks when resumed; previous Linux signed-webhook and Mac/Linux client receipts
remain separate from Kubernetes and GPU qualification.

1. **Native execution and service hosting.** On OpenShell's native Docker driver,
   run a tiny prebuilt MCP service as the canonical process, with a native template,
   scoped provider, restart policy and authenticated `ForwardTcp` access. Verify
   allowed/denied requests, streaming/cancellation, cross-workspace denial, exit/restart and
   supervisor/gateway interruption. Check credential unreadability and current
   generation identity. This needs no model session, Helm, Flux or Kubernetes.
2. **Lore authoring and push guard.** In a disposable repository, clone, edit and
   push a bounded fixture with normal Lore commands and mediated credentials. Verify
   an assigned factory push succeeds, another branch gets the clear hook rejection,
   both supported push APIs invoke the existing hook, and native protected-branch
   behavior remains effective. Human permissions remain unchanged. These tests
   qualify a normal-push workflow guard; complete low-level branch isolation is not
   a requirement or a passing claim.
3. **Native access, policies and persistence.** Verify workspace confinement, provider
   binding/rotation, automatic ordinary Lore credential renewal across expiry and
   reconnect, and renewal-failure behavior. CLI OIDC refresh and manual rotation do
   not establish Lore renewal. Qualify attachment removal and measure effects on
   new requests and established sessions separately; use native sandbox stop for
   execution termination. Keep Lore's transport/session behavior unchanged. Verify
   policy advisor review/reload and prover limits. Validate admitted
   volume persistence and cleanup. Exercise missed events, delayed operations and
   gateway crashes; generic recovery fixes belong in OpenShell. Use its native
   diagnostics and credential driver. Implement the credential portion in the
   exact order in [the direct IdP plan](LORE_DIRECT_OIDC_PLAN.md); Desktop is not a
   prerequisite and no new Veoveo authentication adapter is required.
4. **Linux CUDA.** Repeat the runtime boundary with native GPU requests and execute
   a small CUDA kernel with a checked result. No CPU substitution or `nvidia-smi`-only
   acceptance. Use the same selected Docker driver and security boundary.
5. **Composition and one hosting path.** Run a base and two private overrides through
   OpenShell, with arbitrary labels and an inherited second service. Verify discovery,
   downstream context, no silent fallback, Task version ownership and same-version
   restart recovery. Rename labels; test pinned/tracking bases and reject cycles.
   Promote the same image digest to any authorized destination using native workloads.
6. **Source lifecycle and identity.** Push a definition, run fresh checks, apply native
   OpenShell resources, then delete its branch and verify only owned resources are
   removed. Preserve other compositions, retained state and bootstrap. Qualify external
   issuer login/refresh, separate audiences, MCP client compatibility and compromise
   revocation of Task delegation before retiring hosted OAuth. Test native MCP policy
   with the actual `2026-07-28` SDK and extension methods using deterministic requests.
7. **Optional transport and scale.** Measure QUIC only after secure mediation works.
   Qualify replica/rollout or other generic platform extensions only when a concrete
   requirement needs them; they do not justify a parallel service execution stack.

The [execution plan](OPENSHELL_HARDCUT_PLAN.md#required-lore-acceptance) tracks
the revised Lore gates explicitly. The stronger custom-isolation requirement is
superseded, not marked passed by hook tests. Completed read-only smoke checks,
push-hook tests and manual rotation alone do not establish automatic credential
renewal or access removal. The separate local direct-IdP measurements are complete;
Hub/Time application and management-credential qualification, exact prepared source, the bounded factory build and Time deployment from that Lore revision also passed locally.
The architecture is OpenShell-owned execution; qualification chooses supported configuration or closes a specific native
gap, not whether to keep a duplicate Veoveo implementation by default.

## Full Native OpenShell Management Plan

### Accepted Kubernetes target — qualified 2026-10-20

Revised 2026-10-19. This section supersedes the earlier native-Docker infrastructure
placement plan, while retaining OpenShell ownership of sandbox execution. The
user activated the implementation goal on 2026-10-19. Source fixes, Linux builds,
cluster installation and qualified cutover are authorized. Mac VM/K3s remains out
of scope. The foundation and application stack are deployed. Live Hub configuration,
isolated Computers, native Lore, factory execution and scoped service recovery
have passed deployed probes, followed by full-host recovery and the bounded exact
MiMo scenario (seven model turns, 81.283 seconds). The execution record retains
the failed reboot attempts, model wrong-tool lookup, operator Lore-store setup
error and the subsequent measured corrections.
The native-Docker candidate `fea2793` is saved, undeployed and superseded; its
Compose-removal/bootstrap commands are not the execution plan.

Deploy K3s on Ubuntu Linux x86_64 only. Mac is the normal source-development,
compilation and component/integration-test host; local fixtures may use Docker.
Lima 2.2.1 is installed but unused: do not create a Mac VM or Kubernetes cluster.
Linux builds immutable pullable amd64 runtime images. Preserve portability and
Mac ARM tests, without requiring multiarch publishing or common VM provisioning
in this slice. K3s's embedded datastore is independent of application and gateway
PostgreSQL.

| Owner | Resources and boundary |
| --- | --- |
| Foundation Helm/operator releases | Cilium ingress/egress enforcement, Agent Sandbox controller/CRDs, CloudNativePG PostgreSQL, official SeaweedFS chart/PVCs, single-replica Lore, OpenShell gateway and tunnel. |
| OpenShell Kubernetes driver | Native workspace/sandbox/template lifecycle for Hub, MCPs, persistent user Computers and independently disposable factories. Select matching maintained-fork gateway/runtime/supervisor images. |
| Hub live APIs and revisioned control plane | MCP registration, admitted catalog/provider/grant changes, MCP request destinations and Computer selection settings. Installation files seed initial data only. |
| External development dependencies | Local Keycloak and its bootstrap may remain external; native Mac MPS remains an explicit development service. Mac test fixtures/tooling remain. Entra stays external. |

PostgreSQL is outside the OpenShell Helm release, within the same Kubernetes
cluster. Use separate databases/roles for gateway state and applications, even if
one PostgreSQL cluster initially serves both. Keep gateway credential custody and
its encryption-key requirements explicit. Lore retains its existing S3/PostgreSQL
plugin and native Hub-issued-token authorization; this is no Lore security-model
change. Use Kubernetes Services/DNS for dynamic private destinations, including
Lore gRPC and storage. Preserve TLS recipient/host verification and S3 signed
method/host/path/query/headers; HTTP rewriting is not a storage transport substitute.
Public Hub/object origins stay unchanged.

Native controllers, readiness and restarters own recovery. Services retain their
own retry/reconnect behavior; a process exit can trigger native restart. Do not add
a startup dependency DAG, custom orchestrator, proxy or health framework. A live
process need not recover every dependency failure: qualify late/interrupted
PostgreSQL, S3, registration and issuer dependencies without claiming universal
self-healing. Local Keycloak must satisfy the configured gateway's existing OIDC
bootstrap boundary; this plan does not add offline authentication. A single Linux host can recover processes/data but is not a highly available
deployment.

The maintained OpenShell fork's recovery correction keeps generation-owned
workload/supervisor Pods on `restartPolicy: Never`. It extends the existing
gateway replacement path to a positively observed terminal supervisor whose
admitted identities and enforcement fences remain intact. Native `Always` or
`OnFailure` policy can then replace the generation with fresh credentials.
Explicit stops, recorded canonical terminal results, `Never`, generic missing
compute and broken identity/fence checks do not acquire automatic revival.
This is a deliberate, bounded lifecycle extension, not a Veoveo-specific
controller or a claim that any unavailable workload should restart. Source
checks, a scoped unexpected-supervisor termination, explicit-Stop control and
the Linux full-host reboot now pass. The latter recovered all owned Always
workloads automatically, kept the Never QA runner stopped and retained all
25 PVC identities/bindings. Fresh browser session/terminal and retained
Time/Artifact/Media verification pass; the execution plan records exact
identities, byte evidence and the two earlier failed reboots. This is single-host
recovery, not multi-host availability.

### Implemented Hub runtime reconfiguration

Normal MCP, factory and Computer lifecycles are live operations. Do not edit Helm
values, maintain static server inventories or restart Hub to add/remove/register
sandboxes, run factories, or manage grants/catalog/providers where existing APIs
already support them. Helm must not also own OpenShell-created sandbox objects.
Do not couple a runtime inventory checksum to a Hub rollout. Bootstrap files must
never overwrite authoritative database catalog state on restart.

Hub's DB-authoritative revisions, registration and grant publication
([DESIGN](../veoveo-hub/crates/veoveo-hub/DESIGN.md), especially the control-plane
and startup sections) now include dynamic destination and Computer configuration
adoption in `9b83c26`. Both full platform gates pass; Linux deployed probes verify
the affected paths while the same Hub process remains running:

- The [catalog](../veoveo-hub/crates/veoveo-hub/src/catalog.rs) admits revisions
  changing `native_upstreams` and `computers`. Stable gateway authentication
  bootstrap remains distinct from live **MCP destinations (OpenShell workspace,
  sandbox, port)** and Computer template/default selection.
- Prepared transport/provisioner state is adopted with the authoritative revision.
  Invalid changes retain the active working state. A destination change replaces
  only affected pools; in-flight requests retain their selected state. The Linux
  probe changed Time's destination during a held event stream, then independently
  proved the replacement, binding removal and restoration.
- Reconnect reconciliation passed with deliberately interrupted PostgreSQL
  notification delivery to a second Hub process. Both processes retained their
  identities while the missed revision became visible. This does not promise
  hot reload of arbitrary launch-only configuration or qualify public HA.

Creating or opening a Computer already uses native APIs and does **not** require a
Hub restart. Changing its configured template/default selection now also adopts
live revisions. Linux probes changed the future Computer CPU/template and policy
defaults without restarting Hub or existing Computers. A template revision applies
to future or explicitly replaced workloads, never an implicit restart of existing
Computers or the MCP fleet. A new MCP image replaces that MCP workload only.
Factories finish or fail independently and are disposable. Active work must have
explicit drain/reconnect/Task ownership semantics; do not replay non-idempotent
mutations or promise zero downtime.

Implementation decision: each Computer records its admitted native template,
policy and provisioning defaults with its durable owner mapping. Pending browser
logins also retain their initiating client/configuration through the callback.
These records contain secret locators, never credential values; current catalog
and session authority still govern access. Select a new immutable native template
or policy reference to change future defaults. Editing a template under an
unchanged reference is not a live-update contract.

### Existing backend and qualification gaps

OpenShell already has a Kubernetes driver, namespace/PVC lifecycle, GPU resource
requests and native ForwardTcp. These are source capabilities, not qualification
of this installation. The CNI must actually enforce NetworkPolicy, the Agent
Sandbox controller/CRDs must be installed, and the maintained fork images must be
immutable and pullable by cluster nodes. Qualify PVC ownership/retention, RBAC,
secrets, TLS/DNS, streaming/cancellation and provider renewal with those exact images.
GPU resource requests do not prove parity with Docker CDI selection or Mac MPS.

The former Docker-only guard in
[Computer provisioning](../veoveo-hub/crates/veoveo-hub/src/computers/provisioning.rs)
now recognizes the native backend's persistent workspace contract. Kubernetes
PVC-backed Computers preserve durable private ownership. For
reusable Computer defaults, use OpenShell's automatic per-sandbox workspace PVC.
A fixed explicit mount replacing `/sandbox` or its children would share a claim
across cloned Computers and is not admitted; unrelated configuration mounts outside
the workspace remain supported. No fake Docker setting is supplied and the
persistence requirement remains enforced. Two owner-isolated Kubernetes Computers
have passed creation, native Lore access, credential renewal, scoped Stop/Start,
workspace retention and public Chrome session/terminal access. Full-host recovery
and final model acceptance are recorded separately in the execution checklist.

The [execution checklist](OPENSHELL_HARDCUT_PLAN.md#kubernetes-foundation-and-dynamic-runtime--2026-10-19)
records the pending gates. Development data may be reset/reseeded; no migration or
backup project is required. The user authorized clearing the old Linux runtime
before replacement to reclaim space. Retire platform Compose definitions/launch
commands from the Linux deployment path and qualify the fresh Kubernetes stack. Do not purge Mac Docker test tooling or external local
identity bootstrap. Keep deterministic/component, deployed and final model-driven
acceptance distinct. Final OpenCode acceptance uses only
`deepinfra/XiaomiMiMo/MiMo-V2.6-Pro`, after the preceding gates pass.

## Reviewed Source Baselines

The design review used Lore v0.10.1 (`95a9a834`) and OpenShell v0.1.4
(`5a7728c304b5528e954e9ae900cf21f84e1a12b1`). Lore source was read from its tag,
not the local checkout's later commits. OpenShell source was inspected in a clean
temporary checkout. Those were design-review baselines. The current local Lore and
OpenShell patches and focused acceptance are recorded in the execution checklist;
they do not qualify the unfinished Hub/Time placement, inference build or CUDA.
