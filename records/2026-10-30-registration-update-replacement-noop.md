# A stale update preserves the completed replacement

Hub commit `c214d49` checks the complete fixed-protocol execution: an update reads
an old registration, an ordinary replacement succeeds, then the stale update rolls
back and returns success without changing the replacement. This constructive model
witness complements the generic [mixed-history theorem](2026-10-30-registration-update-serial-history.md).

The initial model has clients 0/1 with logins 10/11 and unrelated login 99. The
replacement introduces client 2/login 12. Metadata, complete row payloads, roles,
binding and disjoint state remain opaque parameters. Both replacement and update
metadata differ from the original metadata; acceptance of the update's native
metadata-constraint relation is an explicit premise. The initial row-key/login
constraints, exact DELETE listing and create/insert validity are derived internally.

Twenty actual model steps are constructed. First, the old row is read and its
stored digest compared. Fourteen ordinary replacement steps then begin/acquire/read,
compare/upsert, capture DELETE rows, drop both logins, finish dropping, create the
new login, insert the new row, request commit, commit and acknowledge. Five update
steps follow: begin, deployment metadata lock/write, observe the missing client,
roll back, and acknowledge success.

The final whole database equals the independent replacement specification. The
complete winner row/role, retained binding, unrelated login and frame survive; both
old registrations and their logins are gone. The lock is released, the update's
transaction is rolled back, both store acknowledgements are successful, and the
sole tagged commit event is the replacement. No update commit event exists. This
is an exact claim for the chosen isolated suffix, not a freeze on later writers.

The replacement prefix constructs one reached state with actual execution evidence
under both update-source orders. No atomic replacement operation is assumed. That
shared state will support the paired old-update counterexample, which remains next.

GPT-6.1 Sol implemented the proof, GPT-6 Luna checked it on the existing Linux
x86_64 Lean 4.35.0 package/cache, and GPT-6 Astra reviewed the source schedule,
output, assumptions and evidence. The final sixteen-module package passed
`LAKE_NO_UPDATE=1 lake build` in **20.345 seconds**, reporting 3168 jobs including
dependencies. All nineteen source/config identities matched before/after and the
committed files. The new theorem closes under `propext`, `Classical.choice` and
`Quot.sound`, with no unreviewed axiom.

Proof development exposed costly expansion of nested transaction states. One
attempt reached its 300.039-second wall limit without a result; its exact remaining
child process was terminated, and disposable runners now terminate their own
process group at the bound. Typed projection lemmas and an existential reached
endpoint preserved the application guarantee while reducing expansion. Subsequent
checks identified the default kernel heartbeat limit. A bounded diagnostic passed
in 20.193 seconds with a local 800,000-heartbeat allowance on the one large helper;
the final source retains that finite allowance and removes diagnostic output.
No global limit, logical assumption or runtime behavior changed. Earlier name and
layout errors, normalization limits and a pre-launch filename mistake are not
semantic counterexamples.

The [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/evidence/update-replacement-noop.json)
records exact source/log identities, inputs, steps, checks and limits. The other
fifteen modules, dependency pins and qualified native source are unchanged. Native
tests were not repeated; their [separate regression](2026-10-30-registration-stale-update.md)
uses one old registration, whereas this mathematical fixture uses two.

Formal Rust/SQL/Core/crypto refinement, service HTTP/audit/reload, removal,
housekeeping, broader authority composition and deployed recovery remain outside
this checkpoint. No extraction, full Docker gate, deployment or paid model call
ran. The Hub commit is local; the comprehensive verification goal remains active.
