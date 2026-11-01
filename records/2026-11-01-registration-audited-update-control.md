# An omitted Update audit record is detected

A deliberate one-line fault in the handwritten registration UPDATE model still
allows the complete data update and successful store response. An independent
diagnostic proves that wrong execution and its missing audit record. The original,
unchanged acceptance proof rejects the missing record; exact source restoration
makes the positive proof pass again. This is model sensitivity evidence, not a new
production defect or a proof of the native Rust/SQL implementation.

GPT-6.1 Sol authored the private diagnostic; GPT-6 Luna ran the Linux commands;
GPT-6 Astra reviewed the model change, independent outputs, original rejection,
source maps and copied artifact bytes. The baseline is Hub
`d24d6ae7a6842da54f40e2b35e945c482c5849cd`. Hub commit
`ef3c25dc79efa8fab080a62c804a6ad410edb6fc`, pushed to `origin/main`, records
the receipt and coverage update. Native source remains byte-identical to qualified
`3d1b0b969ca8f35a757b74ebc9b959d62bf5ae33`.

## Inputs and assertion

The only behavioral mutation changes `sourceProgram` from its singleton Update
instruction to an empty list. All actual transition constructors, commit guards,
fixtures and acceptance statements are unchanged. A temporary nondefault Lake
target adds the diagnostic, importing the executable witness without importing
the affected acceptance proof or generic audited UPDATE correctness proof.

The seed is the previously qualified two-replica fixture: clients 30/31, logins
40/41, unrelated login 99 and complete prior audit record 900. Actor 0 changes the
first registration's metadata, statement and update time. The independently
specified complete data result preserves identity, credentials, issuance, the
other registration, logins, binding and unrelated state.

The mutant's unchanged optional-append helper stutters on its empty cursor. Eight
actual transitions still reach a committed update and successful store reply,
with the lock released and the update event recorded. The diagnostic establishes
the whole wrong ledger, containing only prior record 900, and the complete
transaction/cursor maps. Record 100, the expected Update, is absent. It explicitly
proves `¬UpdateAccepted`; it does not merely produce a compiler failure.

The original acceptance then rejects this exact assertion at
`RegistrationAuditedUpdateWitnessProof.lean:19:4`:

```text
Tactic `decide` proved that the proposition
  acknowledged.audit 100 = some updateRecord
is false
```

Later full-ledger and cursor equality errors, followed by dependent `sorryAx`
guard errors, are secondary diagnostics. There is no mutant acceptance OLean.

## Measured execution and restoration

Three commands ran with `LAKE_NO_UPDATE=1`, default Lean heartbeat limits and
an external 180-second bound per command:

1. `lake build RegistrationAuditedUpdateOmissionDiagnostic`: **PASS**, exit 0,
   **37.927 s**. Seven declaration guards and four printed closures pass.
2. `lake build RegistrationAuditedUpdateWitnessProof` against that same mutant:
   **expected FAIL**, exit 1, **3.670 s**, for the false proposition above.
3. After restoring all 88 original source files and removing the diagnostic,
   `lake build RegistrationAuditedUpdateWitnessProof`: **PASS**, exit 0,
   **12.485 s**. The original fifteen witness guards and nine closures pass.

Total measured command time is **54.082 s**. These guard counts describe
declarations, not distinct scenarios. The new closures use only `propext` and
`Quot.sound`, or no axioms. The original package's imported closures are separate.

Ordinary Lake invalidation rebuilt Model, Specification, Witnesses and Execution
for each affected source, then the relevant diagnostic or positive Proof. No OLeans
were manually seeded, changed or deleted to influence compilation. The logs'
3,155 graph jobs are not all fresh compilations. The original Lake configuration
and complete source map match before and after the restored positive command.

Independently checked output identities:

- Fault diagnostic OLean: **106,144 bytes**, SHA-256
  `016ab4cb695adb3e7f09e5eaa83a918aa1c41fdafc80eae651ca4a7b47e7a16e`.
- Restored positive Proof OLean: **162,752 bytes**, SHA-256
  `72d8ce2f79d2f9f6d53d05eaeffe557d8aaf1bb1df0ea34469ef14b9fd8179fc`.
- Diagnostic log: **14,892 bytes**, SHA-256
  `72abaa4507f5bcfa3c8bfb6acebd81b139231dde512ffd1658bed33b963d7c99`.
- Negative acceptance log: **18,981 bytes**, SHA-256
  `cde53a5724f2378ab5314c18a6c3c2a5c3ef1e9409732a39786c06503b8f8159`.
- Restored positive log: **13,859 bytes**, SHA-256
  `8f8b7994094bdff71e24d08a29132b409da6023a547dac57a4a510b5feff90bd`.

The summary SHA-256 is
`c2dc8341e378f7cf5f1a55896223a0b5f6564560ed458256f1d7c6f85ca73867`.
All three logs and fifteen copied artifact files were checked against their actual
bytes, along with the 88 canonical source files, fault/restoration maps and pinned
tool identities. The
[receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/evidence/audited-update-omission-control.json)
retains the mutation, diagnostic source, commands, identities and manual reproduction
steps. Full evidence remains at
`/tmp/hub-registration-audit-20261101/audited-update-omission-control1-mirror/`.

Two temporary orchestration defects were preserved: a phase-count mismatch stopped
the first setup before compilation; after the successful diagnostic, a Python
path-concatenation error stopped reporting. The latter resumed from the intact
successful diagnostic, without rerunning it. Neither changed proof inputs or
counts as a Lean failure.

## Boundary and next work

PostgreSQL atomicity and locking, Core append/encoding and correspondence with
native source remain explicit contracts. Generic external registration audit
vocabulary and the remaining namespace/deregistration/expiry adapters remain
open. Computer lifecycle and native Lore coverage are also still incomplete.
No runtime or authorization behavior changed, and no native suite, deployment, CI
job or model call ran. Full Hub verification remains partial.
