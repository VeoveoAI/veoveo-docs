# Current permissions: native witnesses, semantic controls and restoration

On 2026-10-29 the actual `CurrentPermissions::held` connection passed manual
qualification: its exact-result and authority-composition proofs, focused native
tests, two deliberate incorrect Rust variants, and a fresh restored run. This
completes the qualification pending in the
[composition checkpoint](2026-10-29-current-permissions-composition.md).
HUB-AUTH-01 remains partial; the complete authorization endpoint is not proved.

The [proof package](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/current_roles/README.md)
and its new [current-permissions receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/current_roles/evidence/current-permissions-receipt.json)
record this extension separately from the earlier current-role qualification.
The old receipt and earlier dated records remain historical.

## Qualified behavior

The actual extracted method returns exactly the requested permissions granted to
the original caller by at least one raw registration's declaration under the
established role/risk predicate. Its traversal includes duplicate server slugs;
it does not replace the raw snapshot with unique-slug or latest-deployment lookup.
Finite cursor/FlatMap/filter/collection proofs establish the result, including
empty requests and empty registration snapshots.

The concrete `HeldModel` uses this actual method, and `LawfulHeld` is derived from
its exact-result theorem. Instantiating the existing issuance theorem therefore
replaces its coarse current-permission premise with the established raw-registration
grant predicate. Issued permissions have the requested, declared-use and current-
grant membership conditions, and the supplied issuance context is preserved.

The Rust witnesses call the actual private method. Their owned `held-fixture`
namespace includes two same-slug deployments: one grants a common permission and
the other requires an uncovered risk. Both insertion orders and both timestamp
orders preserve the valid grant. Requested but ungranted/missing permissions are
absent, as is a granted but unrequested permission. Other witnesses cover empty
inputs and distinguish the original principal from a service actor and another
principal. The caller fixture passes existing context validation; it performs no
real authentication, network call or signature verification.

## Source and execution

The Astra coordinator reviewed scope, source correspondence and evidence.
`/root/coder` (GPT-6.1 Sol) authored proofs, fixtures and final runner corrections;
`/root/builder` (GPT-6 Luna) ran logged checks on Ubuntu Linux x86_64. No OpenCode
or other model-driven acceptance call, deployment or full Mac/Linux Docker gate
was part of this slice.

The frozen basis is Hub `33849317d6e80c78ba7fd8ed57067a62a2eb677c` with SDK
`05273d1f90b9a08e90e377187f4eddd084605fe5`, plus the 33-file overlay below.
The source assembly verified 818 base paths and 823 merged paths. The only
production edit is the equivalent snapshot iterator spelling
`map(|server| server.as_ref())` in place of `map(Arc::as_ref)`, required by the
extractor's borrow handling. New delegation tests are entirely under `cfg(test)`;
the preceding production bytes are unchanged. No permission rule, token format,
database schema, dependency pin or runtime proof check was added.

Native Rust uses toolchain 1.99.0 with `SQLX_OFFLINE=true` and two Cargo jobs.
Charon `de8736f7c995ac54dc490345cef9ea5143c06c62`, Aeneas
`fdebf20d78e8007bb92fc17068f17fc2e6cfbbbf`, extraction Rust
`nightly-2026-09-17` and Lean 4.35.0 remain pinned. Native source copies retain
the original catalog. Only separate extraction copies receive the supported
`charon::rename` field annotation and tool-registration arguments. Removing that
one annotation recovers the original catalog bytes. Generated Lean is untouched.

The initial native baseline passed formatting, five authority-adapter tests, two
registration-snapshot tests and strict library Clippy. Their elapsed times were
0.665 s, 191.848 s, 0.314 s and 87.518 s respectively; the first test stage included
fresh dependency compilation. The ordinary empty-set constructor model needed
by one control was then checked against its freshly extracted signature, and all
baseline proofs and both model audits passed again.

## Deliberate incorrect variants

Each patch was applied only to isolated copies and retained evaluation of the
original traversal before changing its returned value. Each variant compiled a
native Rust 1.99 test executable, passed Charon/Aeneas and generated-model/helper
builds, then failed the unchanged primary proof and its separate native witness.

| Returned value instead of computed grants | Primary proof result | Native whole-set counterexample | Lean / native time |
| --- | --- | --- | ---: |
| `requested.clone()` | `held_exact` fails at normalization of the changed return | `{missing, read, write}` instead of `{read}` | 2.768 s / 1.000 s |
| `BTreeSet::new()` | `held_exact` fails at normalization of the changed return | `{}` instead of `{read}` | 2.718 s / 1.120 s |

The displayed names abbreviate `held-fixture.records.*`. Lean exited 1; the exact
Rust assertion exited 101 in each case. The proofs reached the same well-typed
method with its changed final expression after all prerequisites passed. This is
not a claim that Lean generated a counterexample: the concrete sets come from the
native assertions. `sorryAx` reported during failed-proof error recovery is not
accepted proof evidence. Each native binary was hashed before and after its
witness, with no rebuild or byte change during that execution.

One control's generated Types file contained a different build-directory path in
source-location comments. The complete diff contained only that metadata path;
comparison after substituting the path matched baseline exactly. Raw output hashes
remain recorded separately, and no generated file was edited to hide the difference.

## Fresh restoration

Unmutated source copies were reconstructed from the frozen inputs. Native checks
explicitly cleaned the Hub package and recompiled it, reusing dependency caches.
Extraction used its separate original target. Fresh generated Types and Funs
matched the baseline raw hashes exactly before use in a fresh Lake build directory.

| Restored stage | Result | Elapsed |
| --- | --- | ---: |
| Native formatting | passed | 0.665 s |
| Authority adapter tests | 5 passed, including recompilation | 34.022 s |
| Registration snapshot tests | 2 passed | 0.264 s |
| Strict library Clippy | passed | 10.231 s |
| Charon | passed | 24.354 s |
| Aeneas split translation | passed | 1.219 s |
| Default Lake build | passed | 30.713 s |
| Direct current-permission proof | passed | 2.718 s |
| Original model audit | passed | 2.618 s |
| Current-permission model audit | passed | 2.668 s |

All restored stages exited zero. Expanded accepted axiom closures contain only
`propext`, `Classical.choice` and `Quot.sound`, with no `sorryAx`. The empty-set
constructor model uses a subset of those standard axioms. These are cached-host
command timings, not application performance measurements.

```text
Final overlay archive  6c55804af5d2e8e1076b48f0b8df678adfbd775a200dc7305f31f4acc690f66b
Final overlay manifest 3279ec2f77c11c9c39e372c4dbaca5685162158ed0e850337da704a7be7e90a1
Native delegation      d05e28c937f3a0bcb50524d4bbf94e7d16ab581dafa190b12da3575a5138599e
Native catalog         240f410e22959bbf40983b95b532511f310b237d972e592d6f8ce7ad9dfc37ef
Extraction catalog     5d7f03636a81b49549ca9645df7c55f44b2b685fc9964c33e382a5df7942bc57
Generated Types        18f6df3d66cfe361d2b04d51e418823180ce3565d29a459c18fa0fb8e3a9c106
Generated Funs         77dbfe91b40fa74266ec162de9a128816529a067570384809b6534840832285e
External function model 4df36fef3c47e0607d6cf0de1c7b0c71bfbbcb969e30add01f06b483a9faff2e
Held proof             733eb2bf0d152ec5f369d6e1cd26afd3535ef71ac254eee5238654510f475302
Restored native binary c4083b22ad9798d53cbd4776ac9dba253f908683c773bdddb75900af7c53e632
Restoration summary    9b9ac743716a6b0a7f6604ff997235c6637305a91ffb32b65cc47ba94f98f009
```

Raw logs, frozen copies and temporary execution scripts remain under
`/home/rozgo/.cache/lean-pilot/hub-current-permissions-20261029/`. The compact
receipt identifies each retained log and control. Reporting prose and qualified
patch copies were added after the frozen run without changing proof inputs.

## Excluded failures and remaining boundary

Setup failures were caught and corrected: duplicate Charon tool-registration
arguments, an extraction annotation staged in a native copy, an archive unpacked
one directory too deep, an inherited extraction toolchain in a native stage, and
a missing prebuilt authority-proof dependency. The wrong-toolchain stage was
stopped after diagnosis; a disconnected SSH output stream during a later run did
not cause a duplicate job. These attempts are retained but excluded from semantic
control evidence. Sol reviewed and corrected the existing temporary runner; no
new repository runner or framework was added. Earlier proof-authoring errors
are described in the preceding checkpoints. No production authorization defect
was established by this slice.

The new proof discharges the coarse current-permission result premise, not every
assumption in the authority composition. Uses/resource laws, native map/set/Arc
models and the extraction toolchain remain explicit boundaries. It preserves a
supplied context; it does not prove the async endpoint constructs that context
from the same caller or that principal/catalog data are current. Source review
observes the shared caller at that call site, which is weaker than formal endpoint
refinement. SQL, cryptography, signing, clocks and transport are not verified here.

Next connect actual `decide_server` admission and output to these results, and
address the SDK source revision explicitly before composing its separate resource-
resolution proof. Session/refresh and the broader coverage roadmap remain open.
