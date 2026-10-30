# Registered-server policy and downstream delegation qualification

The registered-server authorization slice is qualified at Hub `bb2e97f5` plus the
recorded proof/test overlay, with compiled SDK `05273d1`. The actual extracted
server evaluator is connected to current role/risk grants and the extracted
delegation kernel. Native witnesses, five deliberate semantic faults and a fresh
restored baseline now supplement the earlier
[downstream proof checkpoint](2026-10-30-registered-server-policy-downstream.md).
HUB-AUTH-01 and the comprehensive coverage goal remain partial and active.

The new production-tree edits are inside test modules only. Production policy,
dependency pins and authorization rules are unchanged. No deployment, database
qualification, full-platform gate or OpenCode/model-driven acceptance ran here.

## What was checked

The exact evaluator theorem covers ordered acceptance/refusal and the complete
returned decision. Coherent route corollaries connect target projection to the
required permission. The composed permission-route result derives current grants
from the proved role/risk evaluator, rather than assuming an allowed decision
already contains its permission. On acceptance, downstream grants are exactly the
current grants intersected with the carried grants. Required permission and
correlation metadata survive. Valid `Authenticated` routes still accept empty
grants; existing managed-client and prior-denial behavior is preserved.

Six native tests passed in both baseline and restoration:

- Three `catalog::tests::registered_` tests cover authenticated routes, Server/Task
  boundaries, complete allow/deny records and distinct missing-target reasons.
- `actual_registered_policy_narrows_current_grants` runs twelve scenarios through
  public `policy::decide`, actual declared-route lookup and the native narrowing
  wrapper. Its validated local fixture grants two Read permissions (`read` and
  `inspect`) and leaves Write ungranted. Cases include empty authenticated grants,
  exact/full/partial intersections, missing permission, Server/Task targets,
  unknown tool and managed-client refusal. Expected records are independent of
  returned records, except the sampled timestamp, which is checked between native
  clock samples. Fixture URLs are never fetched.
- Two existing `mcp::authorization::tests::delegated_` tests retain the established
  wrapper semantics, including its intentionally inconsistent-input fixture.

Each fault was applied only to isolated copies. Native compilation, Charon,
Aeneas and the primary theorem's prerequisites passed before the unchanged theorem
failed (exit 1) and its named native assertion failed (exit 101).

| Deliberate fault | Observed native mismatch | Lean failure reviewed |
| --- | --- | --- |
| Require grants for `Authenticated` | Deny instead of Allow with empty grants | Added emptiness-dependent decision versus unconditional acceptance |
| Drop a denied route's required permission | `None` instead of `Some(write)`; other fields equal | Nonmember branch reduces to `False` |
| Bypass permission membership | Write allowed with only `{inspect, read}` | Allow/PolicyAllow record versus Deny/MissingPermission |
| Use the wrong missing-resource reason | UnknownTool instead of UndeclaredTarget | Different reason fields for Resource and ResourceTemplate |
| Drop a tool's requirement during projection | Missing tool allowed with `{inspect, read}` | Tool projection returns no requirement; subsequent lookup is skipped |

Only the second failure normalized to `False`; the others are reviewed symbolic
equation/program-shape failures paired with native counterexamples. They are not
Lean-generated counterexamples. The fourth native test stops at Resource; its
ResourceTemplate case is covered by the formal failure, not a separately observed
mutant native assertion. Failed-declaration `sorryAx` diagnostics are excluded from
accepted proof evidence. Each native witness used the same binary hash before and
after execution, with a fresh Hub package compilation for each fault.

## Execution and evidence

GPT-6.1 Sol implemented the proofs/tests and reviewed semantic failures; GPT-6 Luna
ran unattended scripts on the Ubuntu x86_64 target; GPT-6 Astra reviewed source,
statements, all five failures and the restored outputs. Tools were native Rust
1.99.0, extraction Rust `nightly-2026-09-17`, Charon `de8736f7`, Aeneas `fdebf20d`
and Lean/Lake 4.35.0. Native sources remained unannotated; the separate extraction
copy received only the existing Charon field-name annotation. SQLx remained offline.

The formal baseline reused the already passing exact 39 proof inputs and unchanged
runtime functions. Baseline2 verified 826 base files, 46 overlay files and 836 merged
paths. Restoration assembled fresh copies, re-extracted and rebuilt the full proof
package. Its Types and Funs were byte-identical to the approved baseline. All four
direct registered-policy modules and three model audits passed; no accepted output
contained `sorryAx`. Old proofs retain their standard-axiom boundaries.

| Measured stage | Native baseline | Fresh restoration |
| --- | --- | --- |
| Formatting | 0.665 s | 0.665 s |
| Three catalog tests, including fresh Hub compilation | 34.075 s | 34.020 s |
| Twelve-scenario narrowing test | 0.264 s | 0.264 s |
| Two existing delegation tests | 0.264 s | 0.264 s |
| Strict library Clippy | 9.433 s | 9.430 s |
| Charon / Aeneas | Prior exact-source checkpoint | 24.006 / 1.870 s |
| Full Lake build | Prior exact-input checkpoint | 34.575 s |
| Four direct proof files | Prior exact-input checkpoints | 4.320 / 3.169 / 2.818 / 2.968 s |
| Three model audits | Prior exact-input checkpoints | 2.618 s each |

Each fault's fresh native compilation took 34.075–34.423 s; extraction took
23.957–24.259 s plus 1.622–2.420 s for Aeneas. Prerequisites took 32.569–34.024 s,
the intended proof failures 3.119–4.221 s, and native witnesses 0.264–0.314 s.
These are command timings, not request-latency measurements.

Baseline1 did not compile: two new fixture URI constructors incorrectly used
`parse` instead of the pinned Core API's `new`. Only those test calls changed before
baseline2. Two first-control launch attempts stopped before source assembly because
the remote plan was missing and a launch directory already existed. A stale metadata
manifest hash in the proposed restore script was corrected during review. These
setup/test-authoring failures are preserved and excluded; no production bug was
identified or repaired in this increment.

The compact [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/current_roles/evidence/registered-server-policy-receipt.json)
contains source, tool, model, binary and per-stage log identities. Raw artifacts stay
under `/home/rozgo/.cache/lean-pilot/hub-decide-server-20261030/`, with summaries/logs
mirrored at `/tmp/hub-decide-server-20261030/`. The restored LLBC is 3,784,056 bytes;
the native test executable is 747,382,024 bytes. Root independently verified all
mirrored baseline, control and restoration stage-log digests.

```text
Baseline overlay fd25b66fbe07ad8ea6b6d2ca9729b4af6beecdc2018e1c7ad8e4ff0d34a0c9ce
Baseline summary c2f9b302f203d4d626e37d0ae636618ae11226df0c6184b56073bd7792937da7
Restore summary  b955cb6816f586ddc138b40b830cfca1948ad94aaee0e94b5f6613546c4e2c53
Types.lean       e0ac6edab7d722149b959315a0c88b13516606e6ef419a13104856b94cf72583
Funs.lean        ab9d524b169b9b33a8b62c743d882eff4af294f4e54055b948197e7e69574f45
Restored LLBC    b1a8c94cbde2593dad1b3dacf78049b669c9d8e215fbb846df8190ace64a2fc5
Restored binary  7edaa04c6b7de04e069f589884436fe97e3b0ef91f48fb29cd572c73230d8fb1
```

## Remaining boundary

The actual policy trace is conditional on successful catalog/SDK/clock operations.
SDK `AuthorizationDeclaration.access` and `Utc.now` are the two explicitly allowed
native symbols; their implementations are not proved by these theorems. Native
collections retain the established extensional models. Native wrapper tests support
source correspondence, not extraction of the asynchronous endpoint. Managed-client
admission, outer profile/principal/scope checks, catalog freshness, SQL, signing and
transport remain outside this slice.

The SDK resource resolver proved separately at `239622d` is not yet Hub's compiled
`05273d1` implementation. Address that revision and adapter correspondence before
claiming a connected SDK-to-Hub route proof; then continue session binding and the
approved transaction/recovery roadmap. Verification stays manual, with no new runtime
rules or CI hooks. This increment is not committed or deployed at this record.
