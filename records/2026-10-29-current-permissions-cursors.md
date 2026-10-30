# Current permissions: registration cursor and closure proofs

On 2026-10-29, `RegistrationIteratorProof.lean` passed direct Lean checking and
its Lake target build on Linux. This is a checked prerequisite for the complete
`CurrentPermissions::held` theorem, not completed qualification of that method.
It builds on the [extended model checkpoint](2026-10-29-current-permissions-model.md).

## Statements checked

The new file reuses the existing enumeration, mapper, predicate and role proofs:

- The actual extracted snapshot iterator starts from the raw registration map's
  values. Its map cursor traverses that list, preserves the projection closure's
  state and returns the same terminal cursor when exhausted. This last concrete
  result is needed for the FlatMap/Fuse value-model correspondence.
- The actual grant closure calls the existing role evaluator with the original
  caller's principal and each registration's declaration, returning precisely
  the established permission set and preserving its captured installation/caller.
  Membership is equivalent to the existing `Grants` predicate.
- The actual requested-permission closure returns exactly requested membership
  and preserves its captured set. Owned permission-set iteration starts from the
  finite-set model's list and satisfies the existing cursor law.

These are statements about the generated functions under the documented ordinary
native-operation models. The Arc projection closure remains an explicit external
adapter; its value/state equation does not prove Rust aliasing or reference-count
semantics. Native map/set representation and traversal refinement remain separate.
No precomputed union or assumed complete held result supplies these proofs.

## Execution and source identity

The Astra coordinator reviewed the statements and model boundary. `/root/coder`
(GPT-6.1 Sol) wrote the proof; `/root/builder` (GPT-6 Luna) checked immutable
snapshots on the Ubuntu Linux x86_64 host. Hub base remains
`33849317d6e80c78ba7fd8ed57067a62a2eb677c`, with the model checkpoint's unchanged
runtime/source overlay, generated models, external definitions, previous proofs
and dependency pins. The additional proof-only naming patch and manual extraction
recipe make the earlier supported metadata annotation reproducible; they add no
runner or runtime build change.

Two first drafts failed proof elaboration: explicit trait-dictionary reduction,
cursor type normalization and a remaining monadic bind reduction were needed.
The repairs changed proof tactics, not statements, models or production behavior.
Failed elaborations reported `sorryAx` and are excluded from accepted evidence;
their dependent stages were skipped. They are not semantic mutation experiments.

Fresh `registration-proof-run3` verified all 821 merged source paths. All commands
below exited zero, using the same pinned Lean 4.35.0 package cache:

| Command | Elapsed |
| --- | --- |
| `lake build GrantedPermissionsProof CurrentPermissionsModelAudit` | 23.653 s |
| `lake env lean RegistrationIteratorProof.lean` | 2.668 s |
| `lake build RegistrationIteratorProof` | 3.069 s |
| `lake env lean CurrentPermissionsModelAudit.lean` | 2.618 s |

The direct proof and final audit contain no `sorryAx`; reported proof dependencies
are only `propext`, `Classical.choice` and `Quot.sound`. Timings describe cached
proof-tool stages, not native application latency. No new Rust component tests,
semantic mutants, full Docker gates, deployed probes or model-driven acceptance
were run in this increment.

```text
Frozen archive       5710859c4a257eae4a6d9531ad526b767087393f4e860c79b62794383bbe2287
Frozen manifest      dc3be32b20602403ce6c7e91bddc96ceb063c1c29799454489daaab5345f8aad
Prerequisite log     7791563821b8eb59239eb17069e738b6830c88fdd540bced40408e54900a7cd3
Direct proof log     5e609750c21b756a16dd65c7c042efcac3819fb9d478bd55beec0f5daf846db1
Proof target log     3552bc88e6e022b908889f87a0533877e945b20f041f17def7e1000e9d155021
Model audit log      b4e28394cd8b70e7d1db654be33d35da36092905769c42c6b6e9503ce86d6303
Run summary          ba8d69a81bea73f1fee59612c38fc6dd38047d4836694f0d33961fef9824f40b
```

Full logs and snapshots remain under
`/home/rozgo/.cache/lean-pilot/hub-current-permissions-20261029/registration-proof-run3/`.
The next obligations are finite FlatMap traversal, the actual held method's exact
result and membership equivalence, and construction of its concrete authority
`HeldModel`/`LawfulHeld`. Native witnesses, semantic controls and restored success
must then qualify the connected scope. The broader Hub coverage goal remains open.
