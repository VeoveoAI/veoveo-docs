# A complete successful per-client update

Hub commit `a336620` constructs a legitimate successful execution of the modeled
update protocol, complementing the [generic mixed-history proof](2026-10-30-registration-update-serial-history.md).
It establishes the complete output and successful acknowledgement, with no runtime
change or additional native test run.

The initial model has two replicas: client representatives 0/1, login representatives
10/11, and an unrelated login 99. Full metadata, payloads, roles, binding and disjoint
state remain opaque parameters. The seed theorem derives correct row keys, existence
of referenced logins and unique registration login keys from that concrete domain.
This is modeled `WellFormed`, not validation of all native SQL or crypto constraints.

The request changes client 0 from `old` to distinct `next` full metadata, presents
its stored digest and supplies a statement and timestamp. Acceptance of the native
metadata-constraint relation is an explicit premise. Seven actual fixed model steps
run: preflight, begin, deployment lock/write, current-row match/write, commit request,
server commit, then successful acknowledgement.

The result equals the independent `expectedMatched` whole-database transformation.
It has a free lock, committed phase, successful response and the exact sole tagged
update event containing both staged writes. That complete equality preserves the
second replica, every login role, the deployment binding and the updated row's
identity, login, digest, issue time and stable remaining fields. This demonstrates
a successful path rather than relying solely on universal theorems over executions.

GPT-6.1 Sol implemented the witness, GPT-6 Luna checked it on the existing Linux
x86_64 Lean 4.35.0 package/cache, and GPT-6 Astra reviewed the model inputs, sequence,
output and evidence. The final direct leaf passed in 2.95 seconds. One composed
`LAKE_NO_UPDATE=1 lake build` passed in 4.371 seconds, with sixteen default modules
and 3168 reported jobs including dependencies. Both new theorem closures use only
`propext` and `Quot.sound`; the successful checks contain no `sorryAx`.

All nineteen source/config hashes matched before/after the build and the committed
files. The prior fifteen modules, tool/dependency pins and qualified native source
are unchanged. The [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/evidence/update-valid-success.json)
records exact inputs, steps, source/log identities, commands, timings and limits.

The first seed proof needed explicit substitution of stored-row equalities to reduce
the concrete login maps; no model premise or final statement was weakened. A launcher
redirection failed before starting because its output directory did not yet exist;
one corrected runner performed the successful package build. These were proof/setup
feedback, not semantic negative controls. An unused section-variable warning remains.

The replacement-overlap/no-op execution and paired old-update counterexample remain
next. The existing native regression uses one seed registration; this mathematical
fixture uses two replicas, so they are distinct evidence. SQL/Core/crypto refinement,
removal/housekeeping, wider authority and lifecycle behavior remain outside the
checkpoint. No full Docker gate, deployment, extraction or paid model call ran.
The commit is local, not pushed or deployed; the comprehensive goal remains active.
