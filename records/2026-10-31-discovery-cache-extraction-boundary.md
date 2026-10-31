# Cache extraction reaches a mutable callback boundary

The six synchronous cache operations introduced in Hub `688b91a` translate
successfully through the pinned Charon/Aeneas toolchain. The generated Lean does
not elaborate: server-wide invalidation's mutable callback results do not fit the
pinned callback trait interfaces. This is a confirmed tool/interface limitation,
not a runtime failure, new Hub bug, successful proof or qualified full cache model.

GPT-6.1 Sol adapted the existing extraction runner and inspected generated
interfaces; GPT-6 Luna executed the bounded Linux translation and elaboration
checks; GPT-6 Astra reviewed source scope, raw outputs, diagnostics and hashes.
No production source changed after the separately recorded native qualification.

## Exact translation scope

The input is Hub `f81159f` plus the frozen two-file overlay later committed as
`688b91a`, SDK `154a473`, Core `120306e`. The 1,083-file source map is unchanged.
Six explicit starts and 19 includes select `cached`, `start`, `complete`,
`remove_cached`, `discard_key` and `discard_server`. No asynchronous cache wrapper
is selected. No explicit opaque override is used; native primitive dependencies
still have external interfaces.

Source/pin metadata verification took 0.415 s and the package-only warm-target
clean took 0.164 s. Charon completed in 29.368 s, with `has_errors=false`.
Each root resolved once with a transparent body; both start/complete predicates,
all three server-retention predicates and the four key clone/comparison methods
were transparent. Additional actual compiler helpers were inventoried rather than
constrained to a guessed count. Aeneas completed in 1.167 s, emitting separate
`HubDiscoveryCacheState` modules under `HubDiscoveryCacheModel`.

The LLBC is 1,372,462 bytes, SHA-256
`a038867b7e7f0bec2c4e0883aa2027fe1bcd5556ae330cdae7448115c1f59a42`.
Generated `Funs.lean` is 48,751 bytes, SHA-256
`eb09aa88c25bff71403ce77e897c1e149657765091eaa964a748ab064435bba0`;
`Types.lean` is 4,667 bytes, SHA-256
`a23be66ba2abf1d8386b3b2211d7e3dabbb0a10e190a74cbe1316de7f87f14a8`.

## Compiler confirmation

A temporary diagnostic package kept generated Types/Funs byte-identical. Its
external files were generated uninterpreted templates, with namespace wrapping
only. These are signature placeholders, not implemented primitive semantics.
The diagnostic used Lean 4.35.0 and the already qualified pinned Aeneas dependency;
`Ops.lean` SHA-256 is
`c2f45dde6c27c1dec53c067a4f6fdcd2981ae8e3a6c4e3a40e6e4f102df368c5`.

The first command failed in 2.851 s because the temporary Lake target did not own
its sibling modules. This setup error did not test the signatures. Registering
all four modules corrected the package graph without changing generated or
external bytes. The ordered build then reached `Funs` and failed in 13.650 s:

- `FnOnce` callbacks return `Result (Bool × V)` where the dictionary expects
  `Result Bool`.
- `FnMut` callbacks return `Result (Bool × closure × V)` where the dictionary
  expects `Result (Bool × closure)`.

Both failures occur for each of Instant, UUID and cached payloads: six concrete
type errors at generated dictionary assignments. Three import modules compiled;
no `Funs.olean` was emitted. Input/library hashes matched before and after.
The actual failure log SHA-256 is
`f71fcb938800cbbff589ab2bbad5b87f5a3047327303762310183fd8eb3d1b91`.
Read-only review found no supported signature-adaptation option in these pinned
tools; filtering trait methods does not change their result shapes.

## Next work and boundaries

Keep the efficient native `BTreeMap::retain` implementation. Do not patch the
callback backend, edit generated bodies, or replace our transition with an opaque
success assumption. Proceed with actual-code proofs for the five supported
operations as an intermediate checkpoint. Server-wide invalidation remains part
of the full objective and explicitly unproved; the five-operation work must not
be reported as the full cache contract. Native observation, collection/payload
semantics and mutex correspondence also remain explicit boundaries.

The [combined receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/discovery_cache/evidence/retain-interface-boundary-20261031.json)
records exact commands, source/tool pins, complete root/helper inventory, output
identities, both elaboration attempts and emitted artifacts. Its SHA-256 is
`1c0216ab3df9078d6ae6fda89b7fb2422abff398326bc3e28b539d54ff96fb80`.
The coordinator verified five output hashes, four extraction logs, two diagnostic
logs, the inventory hash, unchanged raw bodies and matching diagnostic input lists.
No new Lean theorem, broad Docker qualification, deployment, paid call or push is
claimed.
