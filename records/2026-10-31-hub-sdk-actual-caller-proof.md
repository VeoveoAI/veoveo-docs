# Actual Hub caller request and issuer outcome

Hub commit `24c2795` proves an equation for the extracted
`HubAuthorizedHttpClient.issue_bearer_token_until`: its complete independently
described request reaches the checked SDK issuer, and its result is the exact
returned bearer or wrapped token error. The optional caller delegation deadline
is applied before the SDK's existing context and expiry rules. Timestamp
comparison and minimum retain seconds and nanoseconds.

This is the generic theorem checkpoint. Populated valid acceptance and the
actual-source deadline fault control remain pending; the complete caller slice
is not yet qualified. The [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/24c2795/proofs/current_roles/evidence/sdk-issuer-caller.json)
records source/tool/dependency identities, exact checks and artifact hashes.

## Contract and limits

The independent request retains profile, server, deployment, audience, OAuth
client, complete principal and invocation authority, permissions, original
request context/audit/execution, acting server/Task and inherited delegation
context. The actual clone, optional-value and minimum operations establish that
assembly; successful cloning or a desired request are not assumed as premises.

Physical bounds on the supplied client/deadline derive the bridge's input domain.
Independent original-field text bounds then connect the complete SDK outcome:
first-foreign-permission refusal, ordered delegation/context/deadline/identifier
results, full signer claims and signing success or failure. Modeled failures,
divergence and effects retain their existing mapping. The generic theorem does
not assume any external observation succeeds.

This uses the same explicitly composed prepared stack as the
[operational connection](2026-10-31-hub-sdk-operational-issuer-connection.md):
the unchanged Hub caller extraction and SDK `6afa18a`'s checked issuer. Native
equivalence to Hub's older SDK `239622d` dependency remains unproved. Native
Chrono validity/order and leap representations are separate from the mathematical
timestamp-pair/scalar correspondence proved here. Namespace-helper, native
collection/string/allocation, cryptographic and translator boundaries remain.

The theorem takes a client and a deadline as inputs. It does not establish the
client's authentication/current-policy provenance, ordinary 60-second or
subscription 900-second TTL selection, outer clock/addition behavior, HTTP bearer
attachment, transport, signature verification or deployed behavior. These are
value/dependency equations, not an instrumented execution trace or call-count
proof. No positive whole-second JWT lifetime follows from subsecond comparisons.

## Execution

GPT-6.1 Sol wrote the proof, GPT-6 Luna ran frozen-source checks on Linux x86_64,
and GPT-6 Astra reviewed the definitions, actual logs and evidence before
committing. The existing Lean 4.35.0/shared Aeneas tool context was reused.

The direct check passed in 2.735 seconds. The named manual command
`LAKE_NO_UPDATE=1 lake build SdkInternalAuthCallerProof` then passed in 3.903
seconds, compiling the caller leaf against its existing qualified dependencies.
The 75-path Hub source map, 52-file SDK source map and ten imported artifact
identities were unchanged during each passing check. All ten executable axiom
guards pass; the five printed closures contain only standard Lean axioms, with
the connected caller equations additionally retaining the six approved SDK
observations. No `sorryAx` appears in the passing checks.

The named target produced a 305,736-byte OLean, SHA-256
`158421fa3f98b397ea890feb8b1baa8e6fea4f7785de2471d08d37c9e7cf805e`.
The receipt SHA-256 is
`6674572a26c7bac896d656469e68a3e6a31e1209e633e2769f763cb77b983693`.
Review verified three source/configuration hashes and seventeen referenced
evidence files. Direct and named artifacts have distinct recorded hashes; no
byte-equality claim between those compilation modes is made.

The first direct attempt failed during proof elaboration: timestamp normalization,
record projections, membership orientation and clone/bind reduction. Corrections
retained the independent request, domain and outcome statements. That failure is
authoring feedback, not a semantic control or native defect. Nonblocking unused
simplification-argument warnings remain.

Only proof source, its manual target, coverage documentation and evidence changed.
No generated model body, native source, dependency pin, translator, CI hook or
runtime check changed. No fresh extraction, native regression suite, full Docker
gate, deployment or paid model call ran. The commit remains local. The next work
is a populated delegated caller and an actual-source deadline control with an
independent counterexample and exact restored baseline.
