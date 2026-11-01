# Registration audit omission: semantic control and restoration

The populated replacement proof now detects a deliberately missing Register
record while independently proving that the faulty execution still succeeds.
Exact source restoration and a fresh affected compilation graph pass. This is a
handwritten-model control, not a new production defect or formal Rust/SQL refinement.

GPT-6.1 Sol authored the split and private diagnostic, GPT-6 Luna compiled them
on Linux, and GPT-6 Astra reviewed the source, full errors, maps and artifact
identities. Hub starts at `803912a7d40c6f6aa3c471bc4c6e9c2213e2d320`; the native
transactional audit implementation remains
`3d1b0b969ca8f35a757b74ebc9b959d62bf5ae33`. No runtime, dependency, deployment,
CI or paid-model changes occurred. Hub commit `04dc3bd` records this proof checkpoint.

## Construction and independent expectation

The [previous replacement](2026-11-01-registration-audited-replacement.md) remains
the input: two old registrations/logins at server A, a candidate at B, a retained
instance/deployment, unrelated login 99, application frame and full prior audit
record 900. The expected whole database and ledger remain unchanged.

The execution and whole-database proofs moved into
`RegistrationAuditedLifetimeWitnessExecution`; independent ledger and combined
acceptance remain in `RegistrationAuditedLifetimeWitnessProof`. All fourteen
public theorem statements remain. The ledger proof explicitly checks slot 102
using full draft and stored-time equality. This permits the legal faulty path to
compile separately from its failing acceptance assertion.

The only private fault removes the final singleton Register instruction from
`sourceProgram`. It preserves the two Replace instructions, data protocol,
Core append semantics, cursor completion, fixture and independent specification.
The execution performs two appends; the exhausted third fixture append stutters.
It still commits the complete replacement, releases both locks and acknowledges
registration with the exact original commit event.

The independent diagnostic proves the **whole** wrong ledger: full records
100/101 are Replace-A, prior record 900 is retained, and every other slot is
empty, including 102. There are two Replace-A and zero Register-B records. It
also proves the complete data result and explicitly refutes `ReplacementAccepted`
through its ledger clause. The diagnostic imports execution, not the acceptance
proof or generic correctness leaves.

## Manual execution and observed failures

Lean 4.35.0 and the existing pinned Mathlib/Aeneas support were used, with a
180-second owned-process-group limit per command. Every command below was
`LAKE_NO_UPDATE=1 lake build <target>`.

The initial positive split compiled Execution in 7.627 seconds and WitnessProof
in 4.121 seconds. Twelve plus two declaration guards and five plus two printed
closures passed, using only `propext` and `Quot.sound`.

In the private fault graph, the sequential targets and elapsed times were:

1. `RegistrationAuditedLifetimeModel`: pass, 10.635 seconds.
2. `RegistrationAuditedLifetimeSpecification`: pass, 5.676 seconds.
3. `RegistrationAuditedLifetimeWitnesses`: pass, 3.872 seconds.
4. `RegistrationAuditedLifetimeWitnessExecution`: pass, 3.871 seconds.
5. `RegistrationAuditedLifetimeRegisterFault`: pass, 3.620 seconds. Its five
   guards and three printed closures passed with standard logical axioms only.
6. Unchanged `RegistrationAuditedLifetimeWitnessProof`: expected failure,
   3.621 seconds. At line 16, `decide` proves
   `acknowledged.audit 102 = some registerRecord` is false. At line 39 the actual
   two-record cursor also fails equality with the expected three-record cursor.
   The axiom guard rejects the resulting unfinished declarations. No positive
   Proof OLean was emitted.

This is semantic detection: the actual execution and full wrong output passed
before the unchanged acceptance failed. Parser, import or diagnostic failures
would not have counted. The first five stages took 27.674 seconds; all six took
31.295 seconds.

The exact patch was reversed and all 65 baseline source entries matched. A new
affected graph, seeded only with the three previously qualified unchanged
Registration/Lifetime model/specification imports and external packages, then
compiled Model, Specification, Witnesses, Execution and WitnessProof in
10.483, 5.425, 3.721, 3.971 and 4.021 seconds respectively: 27.621 seconds total.
The restored fourteen guards and seven printed closures passed. The false private
diagnostic was not compiled against the restored baseline.

An earlier launcher attempt stopped with `FileExistsError` before any Lake
command: source had already been copied when the graph setup tried to create its
directory. The corrected launcher verified that untouched baseline before
continuing. The failure is retained separately and is not a compiler result.

## Evidence and remaining boundary

Root independently matched all eleven stage logs and ten output artifacts to
their recorded SHA-256 hashes and byte counts, read the complete negative errors
and positive closures, and checked the full maps after reversal and restoration.
The raw completed control summary SHA-256 is
`a5d34bbda5bb1987edb4466d61dbbded0eac2d47e164fcc0890e9d82da17208d`.

The diagnostic OLean is 84,496 bytes, SHA-256
`f006913f765548b006ae39080137cb94b6743a8907626b938cb424f1b39b8124`.
The restored acceptance OLean is 234,624 bytes, SHA-256
`5faebe4ca5f553c075740961a10037fb8b7793daffc31b7c61c87474249356f2`.
Its bytes differ from the earlier positive split artifact; source restoration
and successful fresh checking are established, without claiming byte-for-byte
reproducible compiled outputs.

The [committed receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/evidence/audited-store-register-control.json)
contains the exact patch and diagnostic, source/tool identities, commands,
timings and output hashes. The manual launcher, raw logs and compiled outputs
remain temporary; no permanent proof runner was added.

The admitted-input, synthetic-seed, PostgreSQL atomicity/locking, Core append and
native serialization boundaries remain. There is no full `ClientInformation`,
listener, deployment or universal service-acceptance claim. Next is one coherent
removal-recovery execution: partial audit append, refusal, confirmed abort, and
a fresh attempt that successfully removes data with complete Deregister records.
Postcommit service paths and other registration operation adapters remain open.
