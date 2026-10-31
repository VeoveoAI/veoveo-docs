# Request-composition proof imports: qualified Aeneas instances

Hub commit `ed1c42d` records a qualified proof-tool repair. It adds no Hub contract
coverage: the selected-registration theorem is still unfinished. The previous
[request-assembly proof](2026-10-30-request-assembly-proof.md) remains the latest
checked assembly contract.

## Failure and change

Importing the request-composition and current-role collection proofs together
failed before checking any new theorem. The pinned Aeneas Lean support library
emitted an unnamed discriminant instance for each enum. Two separately compiled
generated enums named `LocalResult`, despite their different namespaces, both
exported `instDiscriminantLocalResultIsize`.

The [two-line patch](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/request_composition/tooling/qualified-discriminant-instance.patch)
gives each instance its enum's qualified name. It preserves the target type,
generic binders, helper function and discriminant values. This is a dependency
source patch applied explicitly in private proof-tool checkouts. No generated
Hub output, Rust implementation, runtime authorization rule or committed dependency
manifest changes.

## Inputs and execution

GPT-6.1 Sol prepared the patch and regression fixtures; GPT-6 Astra reviewed the
scope and evidence; GPT-6 Luna ran the unattended Linux checks. Inputs were Hub
`4960dd1e8ffb71b3ca2bd4c37b16980cfe6c8589`, the SDK authorization proof package at
`239622d12c08b771cc5e813fe3e846385d8d04ad`, Aeneas
`fdebf20d78e8007bb92fc17068f17fc2e6cfbbbf`, and Lean 4.35.0.

The exact patch SHA-256 is
`1d21c956e3bbbcbff57f9185e8f784b772cd34302c4bda765a8a463fb1bdcb80`.
The original macro file is
`8143d882076f297f21ac20049ae9b37cd512e6260e71ff3d22ec85cc198a15cb`;
the patched file is
`467f244cc2103c050f38e732c153712c5c9fbbccc0ca0827d5c32990b174f411`.

In execution order:

1. Stock tool, `lake build CollisionLeft CollisionRight`: passed in **136.371 s**.
   The two generic enum modules compiled separately.
2. Stock tool, `lake build CollisionTogether`: failed in **2.218 s** at the exact
   duplicate instance declaration. This is the intended regression control.
3. Patched tool, separate enum build: passed in **137.478 s**.
4. Patched tool, joint import: passed in **2.768 s**. Both distinct instances
   resolved, six default/explicit discriminant equations checked, and the
   executable standard-axiom audit passed.
5. Patched tool, unchanged current-role package, `LAKE_NO_UPDATE=1 lake build`:
   passed in **37.028 s**.
6. Patched tool, unchanged request-composition package, same command: passed in
   **13.687 s**.
7. `lake env lean tooling/ActualImports.lean`: passed in **2.418 s**. The actual
   proof modules imported together and exposed both qualified generated instances.

The source package copies excluded all existing `.lake` directories. The tool
checkouts and package build directories were private. Eight temporary configuration
files used explicit relative-path dependencies on that private tool and the exact
SDK proof copy. The receipt retains their before/after identities and effective
changes; all other source hashes remained unchanged. Sixty source/config inputs
were tracked. External pinned dependency caches were reused through symlinks;
OS-level read-only enforcement was not established.

The [compact receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/request_composition/evidence/discriminant-tooling-checkpoint.json)
contains commands, source and output identities, timings, log hashes and private
configuration changes. Fixture summary SHA-256:
`ed3fc5f8b58897d41893e853db5104aa2a10e14302f42e1510626e17f7731ad9`.
Actual-package summary SHA-256:
`75124f79170945669691b8c9115d4eaa8273fe0f6b6d41485ddd20ed67f8928d`.
Full temporary evidence is under
`/tmp/hub-request-composition-20261030/evidence-discriminant-private1/` and
`evidence-discriminant-baselines-private1/`.

## Scope

This failure was a proof import-name collision, not a semantic counterexample to
Hub. Existing proofs and their audits pass with unchanged statements and models.
No selected-route theorem, permission-provenance guarantee or actual SDK
issuer/recipient composition is established by this checkpoint.

The [manual reproduction instructions](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/request_composition/tooling/README.md)
identify the patch and private path overrides explicitly; the committed baseline
manifest alone still selects stock Aeneas. No shared Aeneas checkout was patched.
Generated build outputs, caches and temporary command scripts are not committed.
The patch preserves its exact checked bytes, including the blank context line of
the unified diff. No native component tests, full Docker gate, deployment,
upstream publication, paid model call or model-driven acceptance occurred here.
