# Populated audited registration replacement

The audited lifetime layer now has a checked concrete replacement execution with
independent complete output assertions. This extends the
[foundation](2026-11-01-registration-audited-store-foundation.md): the result is
reachable through actual modeled steps, rather than only conditional on a
transaction reaching commit. It remains a synthetic store-model witness, not a
native execution or formal SQL refinement.

GPT-6.1 Sol authored the witness, GPT-6 Luna compiled it on Linux, and GPT-6 Astra
reviewed the source, compiler logs and artifact hashes. The native source remains
Hub `3d1b0b969ca8f35a757b74ebc9b959d62bf5ae33`; the checked foundation is
`96da670cb491ab73a5cdbbb813c3fdf4eb809c2a`. No production code, dependency pins,
default proof targets, native tests or deployed workloads changed in this slice.

## Inputs and constructed path

The explicit seed contains a complete instance, an existing deployment, two old
registrations (clients 30/31, logins 40/41) at `server-a-fixture`, unrelated login
99, an unrelated application frame, and prior audit record 900. The candidate is
client 10/login 20 at `server-b-fixture`, with new complete modeled metadata and
row payload. The seed satisfies the modeled SQL constraints and no-orphan
invariant. Native creation of this two-row seed is not asserted. Current native
instance re-registration permits a changed slug when its other admission checks
pass; those admission/format/cryptographic checks are outside this witness.

The proof constructs eighteen modeled transitions:

1. Cache authority, begin, acquire the instance row, prepare and upsert the
   deployment; capture/delete the two old rows, drop each login, finish drops,
   create the new login and insert its registration.
2. Capture the actual source audit program; append Replace-A records 100 and 101,
   then Register-B record 102.
3. Request commit, take the combined data/audit decision and acknowledge the store
   operation. Both locks are released.

The expected database, ledger and cursor are specified independently of the
execution folds. The checked result includes the sole new registration/login,
both old logins removed, the complete instance and immutable deployment remainder
retained, unrelated role/frame preserved, and prior record 900 unchanged. The
exact audit multiplicities are two Replace-A, one Register-B and zero Replace-B.
Draft envelopes retain original nanoseconds and a separate stored microsecond
timestamp. These are model fixture values, not actual credentials or parser
qualification.

The fixture and proof import models/specifications only, plus Lean's axiom
inspection utility. They do not import the generic correctness leaves. A bounded
fixture helper follows the actual pending audit cursor; an empty cursor makes no
append. This prepares a later missing-instruction test to execute the genuinely
faulty path instead of silently replaying a hardcoded third append. No such
mutation has yet been qualified.

## Manual qualification

The pinned Lean 4.35.0 toolchain and Mathlib/Aeneas support from the foundation
were reused. Each command had a 180-second process-group limit.

- `LAKE_NO_UPDATE=1 lake build RegistrationAuditedLifetimeWitnesses` passed in
  5.173 seconds. Fresh OLean: 568,352 bytes, SHA-256
  `4e4f7edc71f15054468fc7bde3aebd2356f5ebd80d217cc713f71516db1514eb`.
- The first WitnessProof compile failed in 3.620 seconds with no OLean. Errors
  concerned an already-closed branch, explicit stored-row substitutions in the
  seed's login-uniqueness proof, decidability of the concrete login-creation
  predicate, and list membership's final nil case. The axiom guard rejected the
  unfinished proof. Corrections changed proof bodies only.
- `LAKE_NO_UPDATE=1 lake build RegistrationAuditedLifetimeWitnessProof` then passed
  in 7.528 seconds. Fresh OLean: 624,016 bytes, SHA-256
  `0d140095f02cfbc66938a106e8fcc6ab8650ba61da77c96623abff5505f8c3f8`.
  Fourteen declaration guards ran; seven printed closures use only `propext`
  and `Quot.sound`. The accepted log has no `sorryAx` or compiler error.

All ten mapped source/configuration inputs and tool identities stayed unchanged
during the successful check. The proof log is 1,705 bytes, SHA-256
`379598e6db4031f7883b4af9d0b57876458ede9209ab6c811816f4410f5f1bcd`.
Its raw driver summary incorrectly reported `complete: false`: the reused
aggregate expected two stages although the reviewed retry prescribed only the
single Proof command. The raw result is retained. Independent review verified
the prescribed command, exit 0, fresh artifact, source/tool maps and all closures;
a supplement records the reporting correction without rerunning the proof.
Earlier launcher/staging errors also ended before compiler execution and are
recorded separately from Lean results.

The [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/evidence/audited-store-replacement.json)
contains exact inputs, source/artifact hashes, commands and failures. The fixture
source SHA-256 is `eba3e835b2e21c061b8572752da7e1943f8d8d2c07254b5182146b5cd1364ce0`;
the proof source is `628cc919ef8e60b9d2ac714e64853bf992d83d7b9107c6e2531dc33fd94230f4`.

## Limits and next work

The eighteen transitions describe the formal witness, not measured SQL round
trips or native runtime latency. PostgreSQL atomicity/locking, Core append and
identity semantics, native encoding and admitted inputs remain interpretation
boundaries. This is one concrete replacement, not universal service acceptance,
full `ClientInformation`, listener convergence or a deployed qualification.

Next is the deliberate missing-final-Register fault: establish its legal actual
execution and independently specified wrong ledger, require the unchanged
acceptance assertion to fail, then restore exact source and freshly qualify the
positive result. Removal, partial-append rollback/retry, postcommit service paths
and the remaining operation adapters are still pending. No paid provider or
OpenCode model call occurred.
