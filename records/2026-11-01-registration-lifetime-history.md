# Instance registration and removal follow actual commit order

The manual lifetime model now proves exact registration effects, independent
commit-order histories, preservation of the initial no-orphan invariant and
confirmed-abort exclusion. This extends the
[checked removal foundation](2026-11-01-registration-lifetime-foundation.md).
Native correspondence remains Hub `12a132dcbdddcd7fad1defcd007432385d237a76`;
adoption starts from `e246aa58a97329666d1d982e6447401c6c014a90`.

GPT-6.1 Sol authored the extension, GPT-6 Luna ran bounded Linux x86_64 checks, and
GPT-6 Astra reviewed the independent contracts, source correspondence, diagnostic
and axiom output, and final source/artifact maps. No runtime code, deployment or
model-driven acceptance changed in this checkpoint.

## Established contracts

- Registration has the complete independently specified effect for both a missing
  first deployment and an existing deployment. Existing immutable deployment
  fields and unrelated state are retained; current registrations and their logins
  are replaced by the original request's candidate.
- Every attempt retains its original request. Every finite fixed execution's
  full current database matches independent operations in actual server commit
  order. Source staging and desired-output assumptions do not define those operations.
- Unrelated application-frame changes are explicit environment steps in the
  independent history. They contribute no registration commit event and cannot
  alter instance, deployment, registration or login fields. This accounts for the
  model's existing frame step rather than assuming unrelated data stays frozen.
- From the explicit initial no-orphan invariant, a reached database with no
  instance contains no registrations in this modeled lifetime. Native SQL
  constraints alone are not used to assume that stronger initial condition.
- Every recorded commit belongs to a terminal committed attempt. Confirmed
  aborted attempts therefore contribute no commit event, under either modeled
  protocol. An error response alone does not establish rollback.

The primitive model and foundation theorem source are unchanged. The independent
`SerialHistory` definition gains one frame-only constructor. Constructive valid
and original-bug executions remain the next checkpoint; no execution-existence
or semantic-mutant claim is made here.

## Manual qualification

Lean 4.35.0, Mathlib `56a005855ea17e0b0958f73ec801ae140b0a1679` and the package's
existing Aeneas support pin remain unchanged. This is handwritten modeling;
Aeneas did not extract these modules.

The changed Specification compiled in 3.922 seconds; its dependent foundation
Proof was freshly checked in 9.832 seconds. The first new History check failed
in 3.621 seconds at one reflexive conditional-login equality. Adding a proof-body
`rfl` closure resolved it without changing the model, specification or theorem
statements. That compiler failure is not a semantic negative control.

The repaired History-only check passed in **4.822 seconds**, reusing only exact
checked source/import/artifact pairs. Its OLean is 1,071,680 bytes, SHA-256
`714ea393b995156a97d7ebcc99c3e642c876ae228481a966c4bc4ae78da29214`.

The fresh canonical package command was:

```sh
LAKE_NO_UPDATE=1 lake build RegistrationLifetimeHistoryProof
```

It passed in **22.66 seconds**, with a 180-second bound. Seven package modules
built: History and its six imports. The 3,144 Lake jobs include cached dependency
work; they are not a count of freshly compiled proofs. The 23-file source map
and tool/import map matched before and after. No unrelated default targets ran.
The canonical History OLean is 1,071,896 bytes, SHA-256
`a637941c3223f53f8bd1373296343448a64b77d3db8e4094b838e918e73d17b7`.

All **20 new axiom guards** and nine printed closures pass, together with the
foundation's 30 guards and nine closures. The imported Effects module retains
its two existing audits. Only `propext`, `Classical.choice` and `Quot.sound`
occur. Unused-variable and deprecated-lemma warnings remain; no proof errors or
`sorryAx` dependencies are accepted.

The [committed receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/evidence/instance-lifetime-history.json)
records source/tool/output identities, exact commands, timings, both direct
attempts and the canonical check. Logs and OLeans remain temporary under
`/tmp/hub-registration-instance-removal-20261101/`.

## Boundaries and next work

The scope remains one instance-authorized registration/removal lifetime. Native
SQL/async refinement, PostgreSQL/SQLx assumptions, normal Factory and other
excluded writers, shared bootstrap/group state, external-database atomicity,
listener convergence and liveness are unchanged boundaries. Complete API return
payloads and postcommit service behavior remain unproved; response tags are not
their substitute. SQLValid preservation is not established by this extension.

Next are complete constructive first-registration/replacement, removal-first,
abort/retry and original-orphan executions, followed by semantic mutants and
restored checks. The comprehensive Hub verification goal remains active.
