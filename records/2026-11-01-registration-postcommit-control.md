# Registration proof detects an ignored serving-marker error

The registration continuation proof rejects a deliberately swallowed marker error.
An independent Lean diagnostic first proves the faulty model's complete wrong
result; the unchanged acceptance proof then fails. Reversing the fault restores
all source inputs, and fresh positive checks pass. This is sensitivity evidence
for the handwritten model, not another production bug or formal Rust/SQL refinement.

GPT-6.1 Sol authored the private fault and diagnostic; GPT-6 Luna ran the bounded
Linux commands; GPT-6 Astra reviewed the source, full failure, logs and output bytes.
The baseline is Hub `e8e7081af04426fc42645bfc78610018baa3e8cd`.
Hub commit `ba812e6625a1c0706bd1b8815f5b752254693aa9`, pushed to `origin/main`,
records the qualified control and coverage update.
The native implementation remains byte-identical to the qualified
`3d1b0b969ca8f35a757b74ebc9b959d62bf5ae33`. No runtime, dependency, native-test,
deployment, CI, paid-model or persistent proof-runner changes were made.

## Fault and independently established behavior

One private model line changes: a confirmed-no-write marker refusal continues into
`afterMarker` instead of returning Internal with the retained snapshot. The
definition's observations and original acceptance proof are unchanged. Six input
and helper declarations are copied byte-for-byte into the diagnostic's own namespace;
it imports only the definition and the unaffected audited-store proof.

The synthetic fixture is the already-qualified two-row replacement: old clients
30 and 31, with logins 40 and 41, replaced by client 10/login 20. The independent
diagnostic preserves the actual store execution and whole expected database/audit,
including two Replace records, one Register record and unrelated prior state.
Both old reloads succeed and the marker for deployment 7 refuses its write. Every
later observation succeeds, so a later error cannot hide the deliberately lost one.

The faulty continuation makes ten calls: the two ended/reload pairs and marker,
then new-client reload, registration telemetry, grant construction, information
construction and successful return. The exact supplied opaque output is returned.
`knownSnapshot = none` means loss of preservation knowledge, never data deletion.
Six declaration guards and four printed closures pass for this independent wrong
outcome, unchanged refusal, rejected expected Internal, extra trace, and store
composition. The closures use only `propext` and `Quot.sound`.

## Measured checks and restoration

Each command was manual `LAKE_NO_UPDATE=1 lake build <target>`, bounded to 180
seconds with the existing pinned Lean 4.35.0 toolchain and packages. In order:

1. Faulted `RegistrationPostcommitContinuation`: **PASS**, 13.036 s.
2. Independent `RegistrationPostcommitSwallowedMarkerFault`: **PASS**, 13.840 s.
3. Unchanged `RegistrationPostcommitContinuationProof`: **expected FAIL**, 5.925 s.
4. Restored `RegistrationPostcommitContinuation`: **PASS**, 12.939 s.
5. Restored original `RegistrationPostcommitContinuationProof`: **PASS**, 16.446 s.

Total command time was **62.186 s**, excluding staging, authoring and review.
The primary failure at proof line 62 is the false complete outcome equality:
`afterMarker` versus the required Internal result, known snapshot and five-call
prefix. The axiom guard then rejects `sorryAx`; downstream theorems inherit that
failure and are not additional independent counterexamples. No failed acceptance
OLean was produced. This was not a parser, import, setup or timeout failure.

The exact reverse patch restored the complete 72-file private input map. Fresh
affected outputs were built in a separate restored graph. The original proof
passed all 19 declaration guards and eight printed closures. The successful
artifacts were 1,301,120 bytes (faulted definition), 225,200 bytes (diagnostic),
1,302,736 bytes (restored definition), and 630,480 bytes (restored proof).
The restored definition matches its previous accepted bytes; the proof differs
from its previous 630,472-byte artifact, so compiled-byte reproducibility is not
claimed. Lean/Lake/Mathlib identities remained unchanged.

The first attempt stopped before any compiler command because macOS archive
metadata added 74 AppleDouble files. Removing those transfer-only files restored
the expected 72 inputs. Review also corrected an old prerequisite-hash literal and
a wrapper closure check to permit empty axiom lists. No proof source needed repair
during this control. The one-line observed setup output is labeled as captured
output, not a complete process transcript, in the private supplement.

## Evidence and remaining boundary

The [compact receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/evidence/postcommit-swallowed-marker-control.json)
retains exact fault and diagnostic text, input correspondence, commands, tool/input
identities, all failure headings, log hashes and artifact sizes/hashes. The
[source note](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/AUDITED_STORE_SOURCE.md#checked-ignored-marker-control)
describes the contract. Full private evidence is under
`/tmp/hub-registration-audit-20261101/postcommit-swallowed-marker-control1-mirror/`;
its summary SHA-256 is
`40fda545bc9996d9894cedb20da591e3458f3e7761cec1e711d83e93ffa92326`.
The reviewer independently checked all five log identities, all four successful
artifact identities, the three recorded restoration maps, copied fixture text,
canonical held sources and unchanged nonproof source.

Native callback correctness, complete response construction, concurrent durable
interference and cache convergence remain separate obligations. Next is the
registration Update audit adapter; other registrations' audit programs must remain
an explicit boundary until their own adapters establish them.
