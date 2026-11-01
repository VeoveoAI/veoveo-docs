# Registration after commit: first errors, output and retained state

A source-shaped Lean continuation now covers the caller path after instance
registration commits. It preserves the first error and exact call prefix, typed
response-construction errors, and a successful opaque response value. A closed
example composes it with the previously checked replacement transaction, then
reaches a confirmed no-write serving-marker refusal with a complete admitted
database and audit still known. The inner store succeeded; the caller gets Internal.

This is handwritten-model coverage with reviewed native correspondence, not
extracted Rust or formal SQL refinement. GPT-6.1 Sol authored it, GPT-6 Luna ran
the Linux checks, and GPT-6 Astra reviewed definitions, source, complete logs,
input hashes and output bytes. Hub started at
`1e0a44d67417d224a8366d2f84434a42cf76c71c`. The seven relevant native Rust/SQL files
are byte-identical to the already qualified implementation
`3d1b0b969ca8f35a757b74ebc9b959d62bf5ae33`. No runtime, dependency, native test,
deployment, CI or paid-model changes occurred.
Hub commit `e8e7081`, pushed to `origin/main`, records this checkpoint.

## Contract and closed execution

`RegistrationPostcommitContinuation` follows the source order: log and reload
each returned old registration, attempt the serving marker, reload the new client,
log registration, construct the grant, and call information construction. The
registered log occurs before fallible response work and is not proof of success.
Reload, marker and grant errors become Internal; information already returns a
typed registration error, so Rejected remains Rejected. Internal cause preservation
is a service-Result property: the HTTP Problem response intentionally hides it.

Observations supply native results, not implementations of callbacks. A successful
Output is opaque and passed through unchanged; its native field construction and
validation remain unproved. Metadata projections and issued/configuration inputs
are explicit correspondence inputs.

The optional snapshot records knowledge: `none` means no preservation claim, never
deleted data. Old reloads are read/cache operations. A confirmed-no-write marker
refusal corresponds to the separately tested BEFORE UPDATE exception; it is not a
new runtime check or a rule for all errors. General marker success and error both
discard snapshot knowledge because the operation may have changed `served_at`.
Interpreting retained knowledge requires faithful observations and no external
durable or audit writer during the suffix. Cache/catalog changes are separate.

The closed example starts with the checked actual model execution for two old
registrations/logins 30/40 and 31/41 at server A, replaced by client/login 10/20 at
B. It retains the independent whole expected database and full expected audit,
including the two Replace-A records, Register-B record and unrelated prior state.
Both old reloads succeed; the marker for synthetic deployment 7 refuses its write.
The exact five-call suffix is:

1. Ended telemetry for client 30, old server A, login 40, Replace.
2. Reload old client 30 at position 0.
3. Ended telemetry for client 31, old server A, login 41, Replace.
4. Reload old client 31 at position 1.
5. Attempt the serving marker for deployment 7.

There is no new-client reload, registered log, grant/information call or success
return. All those latent observations are successful, so swallowing the marker
error could not accidentally produce the expected Internal through a later error.
The generic composition and the closed witness both distinguish inner `registered`
from outer Internal. Separate constructive cases cover a second-old-reload failure
and an all-successful ten-event trace with the exact supplied output.

## Manual checks and corrections

Lean 4.35.0 and the existing pinned Mathlib/Aeneas support were used. Every command
was `LAKE_NO_UPDATE=1 lake build <target>`, bounded to 180 seconds. Default 200000
heartbeats were sufficient; there were no local increases.

The first draft was not compiled: review required the closed store-plus-refusal
example in addition to its conditional theorem. The next packet ran:

- `RegistrationPostcommitContinuation`: passed in 12.938 seconds.
- `RegistrationPostcommitContinuationProof`: failed in 16.347 seconds. List
  append normalization left unsolved goals, two dotted constructors lacked an
  inferable type, and the closed trace needed empty-list/index normalization.
  The axiom guard rejected the cascading unfinished proofs; no Proof OLean resulted.

A three-line proof repair qualified the constructor names and added list/zero-add
rewrites. It changed no intended assertion, expected outcome, definition or limit.
The single Proof retry passed in **23.605 seconds**, including nineteen declaration
guards covering fifteen public theorems and four definitions. Eight printed
closures use only `propext` and `Quot.sound`. The three command durations total
52.890 seconds, excluding editing, review and staging. One unused-simp warning
and preexisting imported-module/style warnings are non-failing and remain in logs.

Two launcher failures preceded compiler execution and are recorded separately.
The first retained the previous packet's source-revision literal. The second
selected a rebuilt prerequisite artifact rather than its reviewed accepted seed.
Correcting those inputs preserved the gates; neither failure ran Lean.

The Definition OLean is 1,302,736 bytes, SHA-256
`dc5be598620a8edad3904ea5b9533991c9c48d94e4e91c7e44f5c36c4428a17a`.
The final Proof OLean is 630,472 bytes, SHA-256
`47a338226e5e1b3a4744b9de1eb86989cb832790f8ae692ff536cb1f38d224ee`.
Its log is 4,026 bytes, SHA-256
`3abeb94d045d2f4943b4d374993ca61eefc432a9ea24341f47fa8575c4041964`.

The accepted prior WitnessProof seed was 234,624 bytes, SHA-256 `5faebe4c…`.
Lake rebuilt its identical source to a 234,616-byte artifact, SHA-256 `baeb01a3…`,
in the final run; the prior run's rebuilt artifact had SHA-256 `e1b2e8e1…`.
These are distinct identities, not a byte-reproducibility claim. Root independently
hashed the accepted seed and final rebuilt file, both new outputs, and all three
command logs; the rejected prior file's hash is the builder's recorded observation.
Full hashes, fourteen mapped inputs, tool identities, native source hashes and
the failed diagnostics are in the
[receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/evidence/postcommit-continuation.json).
Raw logs, compiled artifacts and the reused manual launcher remain temporary.

## Remaining boundary

The [native served-refusal probe](2026-11-01-registration-audit-fix.md) used a first
registration, not this synthetic populated replacement. Its assertion permits
rollback or atomic audit; its measured persisted admission is evidence for that
run. No new native execution is claimed. Successful serving-marker effects,
arbitrary concurrent writers, listener convergence, full native ClientInformation,
wire serialization and SQL/callback refinement remain open.

Next is a semantic control that ignores the marker refusal, with independently
checked wrong output and restored acceptance, followed by the remaining
registration operation adapters. The comprehensive Hub goal remains active.
