# Registered-server policy connected to downstream delegation

The extracted server-policy evaluator is now connected to the previously proved
delegation narrowing kernel. The new
[downstream proof](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/current_roles/RegisteredServerDownstreamProof.lean)
passed direct Lean checking, a frozen package build and its assumption audits.
It builds on the [admission checkpoint](2026-10-30-registered-server-policy-admission.md).
Native witnesses and semantic controls for this increment remain pending.

## Connected guarantee

For a coherent permission route, the composed trace calls the actual extracted
`decide_server`, then actual extracted `authority::narrow`. Admission holds exactly
when the supplied managed-client decision admits, the independently proved current
role/risk predicate grants the required permission, and the carried grant contains
it. On acceptance the complete returned grant is the calculated current grant set
intersected with the carried set, and the required permission belongs to that result.
The required permission and all correlation fields are preserved.

The proof also reuses the earlier `accepted_permission_survives` theorem after
deriving its consistency premise from the actual evaluator. It no longer asks the
caller to assume that an arbitrary allowed base decision contains its permission.
Explicit `Authenticated` access retains legitimate empty grants/intersections.
Server/Task-style admission requires a nonempty intersection of calculated and
carried grants. Managed-client denial keeps its existing precedence and populated
grant metadata; a prior denied base remains unchanged when managed admission passes.
No new rejection or normalization rule is introduced.

The wrapper projection follows `narrow_policy_decision`: `mem::take` empties the
metadata record's grant field before passing the original grants to the kernel;
reconstruction replaces only effect, reason and grants. This projection is
mathematical source correspondence, not extraction of that Rust wrapper. Its native
test, actual `delegated_route` wiring and the whole asynchronous endpoint are separate
obligations. The composed trace is not a new runtime pipeline.

The source remains Hub `bb2e97f5`, SDK `05273d1`; runtime code and dependency pins are
unchanged. The proof retains the explicit successful catalog/SDK/clock premises
from the earlier table and the established `LawfulPermissions` native collection
boundary. It proves neither the native SDK operation's totality/semantics nor
Rust collection internals, clock correctness, managed-client admission, current
catalog freshness, outer principal/profile checks or token/HTTP delivery. No
constructive interpretation of the two opaque native constants is claimed.

## Execution and corrections

GPT-6.1 Sol authored the module; GPT-6 Luna ran frozen checks on the existing Linux
host; GPT-6 Astra reviewed statements/projection against Rust and independently
verified summary and stage-log hashes. The same Lean/Lake 4.35.0 and package/tool
pins were used. Direct-first iterations used separate immutable theorem files
against the already compiled admission prerequisites.

Draft packet 1 was never run. Packets 2–4 failed on record-update syntax and proof
normalization, including finite-set versus set-comprehension membership/emptiness.
The correction preserved the reviewed statements and wrapper semantics, added a
proved extensional bridge and used the existing membership normalization lemma.
No model, native symbol, runtime source, recursion limit or acceptance rule changed.
These were proof-authoring failures, not production defects or semantic controls.

Packet 5 passed its direct-first check in approximately 2.97 seconds, then passed
all exact-snapshot stages:

| Stage | Exit | Elapsed |
| --- | --- | --- |
| Prior proof targets and model-audit prerequisites | 0 | 32.268 s |
| `lake env lean RegisteredServerDownstreamProof.lean` | 0 | 2.969 s |
| `lake build RegisteredServerDownstreamProof` | 0 | 3.369 s |
| `lake env lean NativePolicyModelAudit.lean` | 0 | 2.618 s |

The run verified 826 base files, 39 overlay files and 831 merged paths. Derived
downstream facts use standard Lean axioms only; the actual policy trace and survival
theorems additionally depend on the approved clock and SDK-access symbols. All
allowlists passed without `sorryAx`. Old proof/model bytes stayed fixed. No new
Rust test, extraction, mutation, deployment or paid qualification ran in this packet.
The increment is uncommitted and HUB-AUTH-01 remains partial.

Evidence is retained at
`/home/rozgo/.cache/lean-pilot/hub-decide-server-20261030/registered-downstream-proof-5-run1/`
and mirrored at `/tmp/hub-decide-server-20261030/registered-downstream-proof-5-run1/`.

```text
Overlay archive  45661f72f90bbb26150e42dcd3d2f5838fcd121ef3a9edbe93f09e1dee3e5d86
Manifest         0176a096fdcae65268d79041d4b02b08a8476f242aec44ecc828b9d672d90e6e
Run summary      8c81896bfa43224463d16e59e45f24add65ca721e930d45b3fadaeabb5c4a639
Proof module     9b78e8e8ec37e61de7416c1081548a45e82437bf9e86e283eac2e13e5134db4e
Direct proof log 24859a8ba0b830fa67ee1cfa87f7b2825cbe7cc5c94db2181ff01af7b67f766f
```
