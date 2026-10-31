# Current linked cache contracts checked in Lean

The cache proof package now uses the actual five synchronous operations from Hub
`c23d9ae`, SDK `7360c0f` and Core `422dcf2`. Its four model modules and all nine
proof modules pass, with **103 executable axiom guards**. The exact generated
`Types.lean` and `Funs.lean` bytes from the
[fresh extraction](2026-10-31-current-cache-key-extraction.md) were adopted unchanged.
No Rust behavior changed in this milestone.

The [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/discovery_cache/evidence/current-linked-cache-proofs-20261031.json)
contains commands, input identities, raw generated hashes, logs, all 13 primary
OLean identities, the earlier authoring failure and the precise reuse of already
passed prerequisites. GPT-6.1 Sol wrote the handwritten adaptation, GPT-6 Luna ran
the bounded Linux checks, and GPT-6 Astra reviewed and adopted the checked bytes.

## What the proof now establishes

The full key clone and comparison include all five fields: generation, principal,
all 32 authorization-fingerprint bytes, server and optional link. The ordering code
is lossless and preserves absent versus present links. Core's principal/server
wrapper operations and SDK's link wrapper operations now come from actual extracted
Rust bodies, replacing the old nominal identifier primitive definitions.

`discard_key_link_isolation` executes the actual full-key invalidation method and
proves normal return, unchanged generation, and preservation of another link's whole
cached value, in-flight ticket and retry record. Key inequality follows from unequal
links. The companion `discard_key_none_some_isolation` covers an absent link against
every present value, including an empty represented string; neither claim assumes
parse validity or its desired operation outcome.

The existing complete read/start/completion/invalidation contracts, ordered-map and
capacity invariants, and finite supported histories also pass on this new key domain.
The history result still concerns normal returns. Its same-key ticket fence retains
the stated nonreuse condition on accepted starts; it does not assume globally fresh
UUIDs or unconditional progress of asynchronous work.

## Execution and authoring correction

The first run built the fresh model in **16.712 s**, checked `CacheKeyFrameProof`
including both new isolation results in **6.742 s**, and checked
`CacheStartSpecification` in **2.530 s**. It then failed at the optional-link clone
lemma: `rfl` did not reduce the generated clone through the Result bind. Its failed
OLean was absent, and the existing audit rejected downstream `sorryAx` dependencies.
This was a proof-authoring failure, not a production defect or semantic counterexample.

The correction explicitly unfolds the Option, LinkName and String clone operations
and simplifies their bind. It changes no theorem statement, generated file, primitive
contract or audit guard. The second run verified and reused the first run's model,
key-frame and start-specification artifacts against their exact source and output
hashes. It then freshly checked:

- Start proof: **3.991 s**.
- Completion specification and proof: **2.381 s**, **2.939 s**.
- Key order and map invariants: **2.484 s**, **2.640 s**.
- State invariants and finite histories: **2.640 s**, **2.839 s**.

All stages exited zero without timeouts. Successful stages total **45.898 s**,
excluding the failed authoring attempt and extraction. The full-key frame OLean is
**857,984 bytes**, SHA-256
`1406dd854cbbeec3eb16eecc2ce21acda59818101190bba5710a704b9532d596`;
the history OLean is **589,072 bytes**, SHA-256
`174e90daf949c70e1794899ea3d3f5dce882e0c1149acc5ae4e0ac947556b45e`.

The key/read/invalidation and start claims permit only `propext`, `Classical.choice`
and `Quot.sound`. The specified completion/state/history claims additionally retain
the existing Result-valued `Instant.add` boundary. No `sorryAx` is accepted. Ordinary
unused-tactic/simp warnings remain; they are not disabled to obtain a pass.

## Scope

This is implementation-linked, model-relative verification. Standard-library
String/Option/map/borrow/allocation/destructor correspondence, time and native
observations remain explicit assumptions. Cross-link invalidation does not imply
that arbitrary writes preserve other keys: capacity eviction may remove one.

Server-wide invalidation, pagination, native key construction/fingerprinting,
asynchronous locks/listeners and SQL refinement remain outside this graph. The older
source fault controls retain their recorded source boundary; a new current-source
control that ignores link comparison is pending separately. No native tests,
deployment or paid model calls were performed for this proof-only checkpoint.
