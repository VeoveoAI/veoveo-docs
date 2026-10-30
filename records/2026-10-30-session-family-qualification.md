# Session-family admission qualification

The actual extracted `SessionFamilyAuthority::allows` is now qualified within its
stated boundary: the independent exact-result proof passes, four deliberate faults
are caught by unchanged proofs and concrete Rust assertions, and fresh extraction
and validation of the original implementation pass again. The broader OAuth/refresh
lifecycle remains partial.

The [proof](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/current_roles/SessionFamilyProof.lean)
and [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/current_roles/evidence/session-family-receipt.json)
identify the source, models, assumptions and commands. The earlier
[admission baseline](2026-10-30-session-family-admission.md) records the independent
16-condition specification, native scenarios and separate PostgreSQL evidence;
the [model checkpoint](2026-10-30-session-family-extraction-model.md) records the
extraction and ordinary primitive interpretations.

## What was checked

The theorem characterizes both successful and refused admission for arbitrary
modeled inputs. It covers existing family presence, revocation, strict expiry,
identity/resource/client/context bindings and scope containment. Additional results
preserve legitimate access across refresh generations and differing retained IdP
issuers, and distinguish equal expiry from one nanosecond later in the same second.
No new authorization rule was added.

Sol `/root/coder` implemented the proof and tests and reviewed semantic failures;
Luna `/root/builder` ran the logged checks; Astra `/root` reviewed the specification,
source correspondence and actual proof/native failures, and independently verified
all four control log sets and the restored stage logs against their recorded hashes.
Native Linux used Rust 1.99, extraction the pinned Charon/Aeneas tools, and proofs
Lean/Lake 4.35.0. No OpenCode, paid model or deployed acceptance call was made.

## Deliberate faults

Each control starts from the same frozen source, changes only one predicate in a
private copy, compiles the native test binary, extracts successfully with
`has_errors=false`, and builds the unchanged primitive models and helper proofs.
The unchanged `allows_exact` check then exits 1 without a timeout; its mapped native
test exits 101 with zero passed and one failed. Compile/pre-test/post-test binary
identities agree for each case.

| Fault | Observed proof discrepancy | Concrete native assertion |
| --- | --- | --- |
| Admit equal expiry | Actual equality-return path conflicts with strict `Before` | `equal expiry refuses` |
| Bypass resource equality | Mismatched-resource path continues through remaining conditions | `must bind protected resource` |
| Reverse scope subset | Actual family-scopes subset of token-scopes differs from required reverse relation | `must bind token scope outside family` |
| Require generation zero | Actual zero-only guard is absent from the admission specification | `refresh generation 1 does not bind access` |

These are reviewed symbolic program/predicate discrepancies, not normalized `False`
goals. Concrete Rust counterexamples establish the intended behavioral failures;
the Boolean result is inferred from the failed assertion rather than printed. The
reversed-subset witness uses a token containing all permitted scopes plus an extra
scope. No additional mutant positive-scope test is claimed. The generation witness
passes generation zero and fails the valid generation-one case.

The first expiry summary records `complete:false` because its generic log parser
expected the words `assertion failed`; Rust printed the custom assertion message
instead. The original summary is retained. Independent review accepted its actual
named panic and paired proof discrepancy. Later runs recognize the exact expected
markers. Failed proof runs' elaboration-recovery diagnostics are not accepted
theorems or successful axiom audits.

## Fresh restoration

The original combined source was recreated separately for native compilation and
extraction; only the extraction copy received the existing catalog naming annotation.
All native and formal stages passed:

- formatting: 0.665 seconds; four session tests: 34.225 seconds including fresh Hub
  compilation; strict library Clippy: 9.130 seconds;
- Charon: 24.907 seconds, no extraction errors; Aeneas: 1.924 seconds;
- full default Lean package: 39.832 seconds; direct session proof: 2.718 seconds;
- ModelAudit, CurrentPermissionsModelAudit, NativePolicyModelAudit and
  SessionModelAudit: 2.568, 2.618, 2.618 and 2.568 seconds.

The nine session theorem dependency closures contain only `propext`,
`Classical.choice` and `Quot.sound`; neither their successful output nor the session
model audit contains `sorryAx`.

Fresh raw generated Types/Funs have different hashes because the earlier extraction
recorded its copied SDK source path. Mapping only those exact `Source:` comment roots
to the pinned SDK checkout makes all generated text byte-identical: 23 Types comments
and 25 Funs comments differ. Raw outputs are retained. No generated function, type,
primitive model or proof was edited to make restoration pass.

Restoration setup corrections concerned stale paths and metadata comparisons only.
The first launched attempt stopped before creating its run directory or executing
Cargo/Charon/Lake because the annotation patch path was wrong. It is excluded as a
setup-only failure; the successful fresh run is `session-final-restore-run2`.

The accepted macOS PostgreSQL 18.6 baseline remains separate: one existing session
integration test passed in a test-reported 1.68 seconds, using two independent pools
in a private cluster. It was not repeated after controls. This is component evidence
for the exercised rotation/revocation/replay/expiry cases, not formal SQL refinement,
actual multi-host recovery or live identity-provider qualification.

## Identity and remaining boundary

Hub base is `bb2e97f5c984a53eaa218109e4c01a70e952e365`; SDK runtime is
`239622d12c08b771cc5e813fe3e846385d8d04ad`. The frozen combined2 overlay contains 56
paths. Session source with tests is
`2e1591c1630170180a974a2a4220b0be7c9cff754634e79148dc28083f5459b4`;
the original 3,297 production bytes remain an exact prefix, SHA-256
`3aff520943d1458c6bb37ae9db5ee5ca1a5fc9eb06c41a1083e381ede696e46f`.
The session proof is
`ba721cd25a0be08297fcb8f81e93688c26f6c00ec4e1d8ac4370b2358571e71e`.

The restored native binary is 748,227,584 bytes, SHA-256
`712c04b35aa81b9263dcff277b1115aa3fc0cfc514b7762128e428afac092f02`.
Restoration summary:
`23e7fe87ab72e10a7f44a4dfeabbcae97bebd82019b4e482cb89dcc549a78c08`.
The four control summaries, in table order, are:

```text
f040b0a260aef7d2f39a3e287a48e6cafa6819207660a7efd3696de5e70d3d7f
9a78898289df37253dc023d27aa838e77078c004c79b79b4229780ff83141ad7
9378ab90574eeff55f2b23237e5c733e722ed5567802d6b1dfb3ea54467bd82c
652885cc40dfc138513dc7f20ddb4ed1550e70738a7c216799978191aa174a90
```

Logs and raw artifacts are under `/tmp/hub-session-family-20261030/` in
`evidence-session-*`, `evidence-final-restoration` and `mac-integration-run1`.
Source-model identity is evidence of applicability, not a compiler correctness proof.
Native Chrono/collection/identity representations, exact family lookup, verified
JWT claims, caller construction, authoritative freshness and asynchronous execution
remain explicit boundaries. The pure predicate observes family-ID presence; it does
not select the record or verify a signature. Concurrent refresh consumption and
registration/configuration transactions still require their own work.

The next slice is configuration publication under concurrent transactions, with
PostgreSQL assumptions separated from application sequencing and real database
tests. This qualification adds no runtime gate, CI hook or infrastructure. Source
and reports remain uncommitted at this checkpoint.
