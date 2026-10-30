# Current-role evaluator: exact grants from production Rust

On 2026-10-29 (America/Los_Angeles), the unchanged Hub current-role evaluator
passed manual Lean/Aeneas qualification: total exact-result and membership
proofs, seven semantic mutation controls with native assertion witnesses, and a
fresh final restoration. HUB-AUTH-01 remains **partial**: this establishes the
evaluator under explicit primitive models, not the complete authorization endpoint.

The [manual package](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/current_roles/README.md)
contains the generated model, handwritten primitive models, specifications, proofs,
qualified control patches and
[receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/current_roles/evidence/current-roles-receipt.json).
This advances the immutable [extraction checkpoint](2026-10-29-current-role-extraction.md).

## Source and execution ownership

The Astra coordinator reviewed specifications, correspondence, control semantics
and evidence. `/root/coder` (GPT-6.1 Sol) implemented the proofs and seven native
regression tests and independently inspected control and restoration logs.
`/root/builder` (GPT-6 Luna) ran unattended logged checks on Ubuntu 24.04.5 Linux
x86_64 and consolidated the receipt. No OpenCode or paid model acceptance,
deployment, push or full Mac/Linux Docker gate was performed in this slice.

The measured source is Hub `b9b6cec1b9c36a2e84afb980e208d2d116a84185`
with SDK dependency `05273d1f90b9a08e90e377187f4eddd084605fe5`, plus the
frozen proof/test overlay. The 792-path base and 26-path overlay form 817 paths;
their only overlap is `policy/grants.rs`. Its production prefix before
`#[cfg(test)]` is byte-identical to the base. No production authorization,
dependency, schema or protocol behavior changed. The final reporting README,
receipt and reviewed replacement control patches are distinguished from the
original overlay; qualified proof/model/test bytes stay unchanged.

SHA-256 identities:

```text
Base archive         80cc151c34417e71ea058f795bfb231abb888156e8726c1098b1f523f343768b
Overlay archive      357a95a0830b780167a0649e55bb8870a07b2ab8c78715c9a94ee9ed1f16d1cf
Overlay manifest     45035c1d986baec88d46e330a00925bc2fe82a242a91420e03b156d320a5e01c
Grants Rust source   97f4816f5b6cf4a3236f704c9c12ef376bb0af7264db2b56caea93f34827e454
Generated Types      f96d5d6e700d44f04d13b78d1e78bcc056a3752083302fa15f81ef1646dfd6ca
Generated Funs       390d5b405fe454ea4a776d4fd3fec1d6896ace1b53fe2737c88b5a5495ff9f52
Grant proof          b5df13643b0ed92b212c5e3e38d5710ac8b880d7f31f80ec996c0994cdeb0e22
Final run summary    81726e54bb11b129c45cf025a3680daf9526e0931ee8315da2a62411fe78db81
Receipt              d6a5e1322c054d62f98b05d51e39bd2f86c137c6969a1844ba3f442e4cba1579
```

The receipt records commands, timings, source/model/proof/patch hashes and 86
log/summary references, all checked against retained files. Raw snapshots, LLBC,
logs and execution scripts remain temporary artifacts under
`/home/rozgo/.cache/lean-pilot/hub-current-role-proof-20261029/`.

## Established contracts

The extraction includes actual `held_roles`, `effective_risks`,
`granted_permissions` and `InstallationRole::allows`, with their closures and
iteration. The specifications independently describe:

- A held role requires a matching raw grant, the existing tenant rule, and either
  direct principal identity or group membership. Unscoped grants and missing
  tenants retain their existing distinct behavior.
- Effective risks contain declared risks and every matching addition; any matching
  deny wins, wherever it occurs.
- A permission name is granted exactly when a matching raw permission occurrence
  has no deny and one configured held role covers its access kind and every
  effective risk. Combining partial coverage from different roles cannot satisfy
  this condition.
- The functions terminate with the exact successful output under the primitive
  models. Arbitrary finite duplicate names, roles, grants and overrides and empty
  inputs are included; there is no assumed validator result or arbitrary fuel bound.

Iterator proofs follow actual FnMut captures, filter/map/any short-circuiting,
collection and original-vector bounds. These support the full grant theorem rather
than replacing the evaluator with an assumed authorized set. Valid grants as well
as refusals are established. Accepted theorem audits use only Lean's standard
`propext`, `Classical.choice` and `Quot.sound`, with no `sorryAx` or custom axiom.

## Formal and native execution

Tools were Charon `de8736f7c995ac54dc490345cef9ea5143c06c62`, Aeneas
`fdebf20d78e8007bb92fc17068f17fc2e6cfbbbf`, extraction Rust
`nightly-2026-09-17` and Lean 4.35.0. Charon uses supported `--sysroot default`;
Aeneas uses `-filter-trait-methods -split-files`. Generated policy files are not
hand-edited. Native checks used Rust 1.99.0, `SQLX_OFFLINE=true` and two build jobs.

Final post-control restoration used fresh source and dedicated native, Charon and
Lake outputs, with pinned dependency caches reused. Measured times include
compilation; they are neither cold bootstrap nor end-to-end latency measurements.

| Stage | Result | Time |
| --- | --- | ---: |
| Formatting | exit 0 | 0.665 s |
| Grant tests | 12 passed | 192.311 s |
| Configuration test | 1 passed | 0.314 s |
| Charon extraction | exit 0 | 194.261 s |
| Aeneas translation | exit 0 | 1.068 s |
| Generated-model Lake build | exit 0 | 11.883 s |
| All-proof Lake build | exit 0 | 13.687 s |
| Direct full-grant proof | exit 0 | 2.919 s |
| Definition audit | exit 0 | 2.670 s |

The restored generated Types/Funs bytes exactly match baseline. Native tests are
component evidence; these runs establish no deployed, browser or SQL behavior.

## Seven accepted fault controls

Each isolated control first passed Rust compilation, Charon, Aeneas and generated
model/prerequisite builds. Its unchanged semantic proof then failed on the intended
meaning, and its named native test failed an assertion (exit 101, no timeout).

| Deliberate defect | Formal failure | Native observation |
| --- | --- | --- |
| Invert tenant equality | Tenant membership equivalence | Valid matching-tenant role lost |
| Invert group membership | Subject membership equivalence | Valid member role lost |
| Invert held-role selection | Configured-role selection equivalence | Unauthorized permission granted |
| Preserve risks on deny | Effective-risk loop equivalence | Some risks returned instead of None |
| Skip risk additions | Effective-risk accumulator equivalence | Only Sensitive returned; Billed and Physical missing |
| Access OR risks instead of AND | Role allowance equivalence | Inadequately covered permission granted |
| Invert role acceptance | Permission closure equivalence | Valid permission lost |

The accepted deny/addition patches retain the original translated loop interfaces
using a reflexively false name comparison. This exists only in fault artifacts,
not production. Residual proof goals expose the wrong Some/None result or missing
risk union; arbitrary compilation or elaboration failure is not counted.

Every accepted native log explicitly compiles Hub from that control's source root
before running its exact test. Controls reused a Cargo target; per-control executable
content hashes were not captured. That is an instrumentation limit, not a claimed
binary identity. Source manifests, compiler paths and native logs were reviewed.

## Excluded attempts and boundaries

The initial Miri sysroot failed linking crc-fast's cdylib; supported sysroot
selection fixed extraction without source edits. Filtered trait methods addressed
unsupported unused Iterator fields without changing the 43 policy/helper blocks.
Draft proof failures were elaboration/normalization work, not production defects.
One runner checked the wrong proof file; it was excluded and the correct target
was subsequently checked.

Three original controls were excluded: direct `!=` left a defined pinned Aeneas
default method unnormalized; immediate deny-to-Some changed the generated loop's return type;
replacement additions introduced a clone prefix the unchanged proof did not
normalize. Their reviewed replacements above establish semantic failures instead.

An intermediate restore passed on dedicated targets. A later shared-target restore
failed in 0.264 s with no Hub compilation and earlier-mutant assertion behavior.
It is excluded as stale build-artifact reuse. Preserved mtimes/fingerprints are a
plausible cause, not conclusively instrumented. The final restore used dedicated
targets and passed. All seven control logs independently show their own source
compilation; no additional negative-control reruns were needed.

The 57 handwritten external placeholders have ordinary definitions, but native
BTreeSet memory/order/allocator refinement, Rust library correctness, ID parsing,
cryptography, translators and compiler remain boundaries. Signed principal/group
freshness and current catalog coherence are supplied inputs. There is no new
authorization policy, rejection layer, runtime machinery or automatic proof gate.

Next, connect actual `CurrentPermissions` registration union/requested filtering
and `decide_server` admission/output to these established contracts. The earlier
delegation proof's coarse current-permission premise is not yet discharged. SDK
resource proof commit `239622d` is separate from Hub's actual `05273d1` dependency;
adoption and correspondence remain explicit. Profile/principal/scope admission,
session/issuer continuity, SQL/concurrency and full endpoint refinement remain
open. No original production authorization bug was established in this slice.
