# Delegated authority: extracted decisions and semantic controls

On 2026-10-29 the delegated-authority assembly slice passed manual formal
qualification and focused native component checks. Four legal Rust mutations
compiled and extracted, then failed their intended semantic theorem and independent
Rust witness. A fresh restored baseline recovered the same source/model/proof
identities and passed again.

[HUB-AUTH-01](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/README.md#hub-auth-01--current-policy-and-delegated-authority)
is **partial**, not complete authorization verification. The
[package](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/authority/README.md)
contains the actual shared Rust import, generated Lean model, handwritten
specifications/proofs, concrete witnesses, mutation patches and
[structured receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/authority/evidence/authority-receipt.json).

## Execution and source

The Astra coordinator reviewed the production correspondence, theorem statements,
boundaries and receipt. `/root/coder`, using the configured GPT-6.1 Sol coder role,
implemented the source extraction seam and proofs. `/root/builder`, using the
configured GPT-6 Luna builder role, ran unattended logged extraction, proofs and
component checks on the actual Linux x86_64 host. No OpenCode or other
qualification-model call, deployment or push was performed in this slice.

The basis is Hub `ee0bdf3b4f800ee31ed0e3017407a646244fd023` plus the exact recorded
overlay, not the unchanged base commit. The frozen proof/source archive has
SHA-256 `bd86ed9ce1cbf40ffcb7711805108a4e47433290fe138be54a5b25c71b1d347a`, and
its manifest is `e594d7eefae95d0e5f2e0b6d43c77ac46f5a1dba9852eeafa0949db890b8fb22`.
Each formal variant verified all 20 frozen paths. Final reporting prose and the
copied receipt were added afterward, without changing runtime or proof inputs.
Other agents' main-design and documentation changes were excluded from the freeze.

Important SHA-256 identities:

```text
authority.rs             c0c502a95d8ca195f72979eaace8f640590d1da1a88348a2906b4b4bf8903b52
HubAuthorityProof.lean   78ad4482f468d4a6c668ef5e957c597a272e6f4e53a9eda814c7e7868589cf19
AuthorityProof.lean      ddab3000a0ed5ab652011dc77d3c92c979c3ea7bbd8479d59d0f829b1829d041
AuthorityComposition     cb42bf31ab0dd4308ca78f43916f20004f01d0f7195e1892c0a3834d65a45a70
AuthorityInterpretation  270933d81865624d4982bf89d2e0991a3048f332e55bd92967c9d78d7b1227e8
Rust witnesses           dc1685dd68a3d54eb80da986b218e8c123fc4a244b78226a54bf0d76a412d5f3
Receipt                  f7a56d655d7c69f9cbc37321e00ce75fb46050452ac173631b02dc861275b29b
```

The coordinator independently matched the six current kernel/model/harness/proof
files to the receipt. The coder checked all 50 referenced stage-log hashes against
the retained Linux files. Raw logs and isolated snapshots remain under
`/home/rozgo/.cache/lean-pilot/authority-proof/`; they are temporary execution
artifacts, not additional committed source.

## Change and proved boundary

The existing exchange decisions and grant assembly now share private Rust functions
with the proof crate. Production still checks declared uses, profile/resource and
provider presence in that order, then obtains the caller's current permissions and
assembles the same grant. Native BTreeSet operations and the original streaming
requested-permission filter remain; no list projection or quadratic replacement
was added. Downstream assembly keeps the original lazy route lookup and preserves
all policy-decision metadata. There is no new authorization rule, rejection,
protocol field, SQL/schema change, dependency pin or proof runtime.

The checked statements cover:

- Exact exchange-stage successes and refusals, with requested uses preserved,
  exact resource matching and provider presence. Successful output retains the
  original profile, caller, immediate actor, Task and deadline.
- Exact downstream decisions, including admitted empty `Authenticated` routes,
  permission requirements, nonempty server/Task grants, undeclared routes, managed
  denial and prior denial. Successful narrowing retains the exact intersection and
  opaque decision metadata.
- Composition of the extracted stages: an accepted downstream permission is in
  current policy output, the requested set, the service's declared uses and the
  original caller's current grants, under the stated operational laws.
- A concrete finite interpretation satisfying those laws, with both a nonempty
  accepted exchange that filters a permission away and accepted empty
  `Authenticated` output. It witnesses nonvacuity, not BTreeSet internals.

## Formal execution

The pinned tools were Charon `de8736f7c995ac54dc490345cef9ea5143c06c62`
(0.1.293), Aeneas `fdebf20d78e8007bb92fc17068f17fc2e6cfbbbf`, Rust
`nightly-2026-09-17` and Lean 4.35.0. Each positive run executed six Rust witnesses,
Charon, Aeneas, default Lake build and direct Lean checks of the three authored
files. Each variant had separate source, Cargo target and Lake build directories;
the pinned dependency cache was shared. These timings are warm-cache measurements.

| Stage | Baseline | Restored |
|---|---:|---:|
| Six Rust witnesses | 180 ms | 169 ms |
| Charon | 190 ms | 179 ms |
| Aeneas | 798 ms | 704 ms |
| Default Lake build | 10,522 ms | 10,490 ms |
| AuthorityProof direct check | 3,459 ms | 3,543 ms |
| AuthorityComposition direct check | 2,977 ms | 2,807 ms |
| AuthorityInterpretation direct check | 2,973 ms | 2,778 ms |

All stages exited zero. Target axiom closures contained only Lean's standard
`propext`, `Classical.choice` and `Quot.sound`, with no `sorryAx`. Explicit
collection/current-role premises remain theorem parameters; this audit does not
remove those assumptions.

Every mutant separately passed Cargo check, fresh Charon/Aeneas extraction and the
generated-model build before failing the unchanged semantic proof (exit 1) and
named witness (exit 101):

| Mutation | Intended theorem failure | Concrete observation |
|---|---|---|
| Return the unfiltered requested grant | `grant_exact` | Set(7) returned instead of Set(6) |
| Skip downstream intersection | `narrow_exact` / `narrow_success_iff` | Set(7) returned instead of Set(2) |
| Reject empty Authenticated access | `narrow_exact` | Valid output was denied |
| Bypass a mismatched resource | `address_exact` | Wrong resource was accepted |

The grant/resource mutants still call the operational interface before changing
the result, avoiding a vacuous failure caused by an extraction-signature change.
The fresh restored run then passed with the original identities.

## Native component checks and observed failures

Production checks used the frozen source read-only in the Rust 1.99 check image
`sha256:e23a1c31e4743f627725e1d0964e17b1be578b843d8e99bec4dbbe8589250db7` on
Linux amd64. Production2 passed formatting, 12 unit tests (2 native set/resource
adapters, 5 authorization tests, 5 existing grant-policy tests) and 1 `calls`
integration test. Their measured times were 710 ms, 66,140 ms, 1,223 ms, 324 ms
and 55,302 ms respectively. Its strict Clippy run found a collapsible conditional.

Production3 used an equivalent early return, then passed formatting (703 ms),
the 2 adapter tests (64,769 ms), 5 authorization tests (315 ms), and strict Hub
library Clippy (24,167 ms). The grant/calls passes belong to production2; they are
not reported as reruns of production3. The final formal extraction uses production3.

Earlier diagnostics were addressed and excluded from accepted evidence:

- A new test helper borrowed temporary RouteAccess values past their inferred
  lifetime (E0716); the fixture now owns those inputs. The failed target ran no tests.
- Draft Lean proofs needed section-law scoping, composition normalization and
  concrete Finset reasoning corrections. Failed elaborations were not accepted.
- The first mutation runner wrote a kernel-hash sidecar using a wrong relative
  path. Its actual source hash was recomputed independently; the check/extraction/
  proof/witness stages completed, and later runners used the corrected path.
- A builder message incorrectly called production2's total 13 unit tests plus
  integration. The retained receipt correctly records 12 unit tests and 1
  integration test, as reported here; no rerun was needed.

No production authorization bug was established by this slice. The production
change exposes existing decisions for proof; discovered problems were in the new
fixture, lint shape, proof authoring and execution reporting. Full Mac/Linux
publication gates and deployed acceptance were not run for this slice.

## Remaining obligations and next work

Native set operations have explicit finite-set laws. The current-role adapter's
requested/current intersection is a coarse premise, not proof of principal/group,
role or override evaluation. Deadline equality is not proof of SDK time clamping,
chain validation or signing. New downstream permissions can be in another
namespace; no theorem incorrectly constrains them to the earlier namespace.

The concrete async caller sequence and native adapters were reviewed and tested.
The Lean composed trace is not a formal refinement of the entire endpoint,
catalog/provider discovery, session/Task reads, token transport or SQL. No general
zero-overhead claim or benchmark follows from retaining the native algorithms.

Next is the SDK-owned MCP extension foundation, particularly
`ai.veoveo/authorization` resource/template resolution and
`ai.veoveo/registration` identity correspondence. A source trace found no Hub
consumer of the SDK advertisement-readback helper despite documentation claiming
registered-versus-advertised comparison. Typed route dispatch also needs explicit
correspondence: it picks the first domain parser match, whereas authorization uses
exact-resource precedence and all-template agreement. These are recorded trace
gaps, not established vulnerabilities or authority to add new runtime checks.
