# Mixed registration and update histories

Hub commit `e93260b` proves that every finite execution of the modeled fixed
registration/replacement/update steps has the independently specified effects in
its actual server-commit order. It also proves that confirmed aborted attempts
contribute no commit event, including a no-op update that subsequently acknowledges
success. This composes the earlier [shared-lock/current-state guarantees](2026-10-30-registration-update-stability.md).

## What was composed

`RegistrationUpdateHistory.lean` records tagged register/update events emitted only
by actual modeled server commits. Its independent `SerialHistory` consumes the
original request for each event, applying the earlier ordinary/instance registration
specification or the new current-row update specification. The event's staged write
list does not define those operations; it is evidence of what actually committed.

Request invariance connects each transaction to its original request. Existing
registration prefix/effect lemmas combine with reached mixed alignment, branch
choice and stable observations to derive each register/replace effect. The proved
current-row update effect supplies the other operation. Induction over the actual
mixed execution composes those effects, normalizing only disjoint application-frame
changes. The old registration theorem sources and wrappers remain unchanged.

Commit events imply terminal committed phases. Therefore a confirmed aborted
registration or update has no event of its own. A no-op update remains aborted even
after its success acknowledgement, so it adds no committed effect. This neither
removes another writer's contribution nor asserts that equivalent row values never
existed before. No conclusion is drawn from a transport error alone.

This theorem concerns actual commit order, not reply order or indefinite survival
of a successful registration. It does not prove PostgreSQL, SQL refinement, HTTP
authentication, service postcommit audit/reload or recovery liveness.

## Checks and evidence

GPT-6.1 Sol implemented the leaf, GPT-6 Luna ran logged checks on the existing Linux
x86_64 package/cache, and GPT-6 Astra reviewed the independent specification,
composition and source identities. Lean remains 4.35.0 with the same dependency pin.

- Final direct history check: exit 0 in 3.65 seconds.
- One composed `LAKE_NO_UPDATE=1 lake build`: exit 0 in 4.771 seconds, fifteen
  default modules and 3166 reported jobs including dependencies.
- `committing_sequential_register` and `execution_serial` use `propext`,
  `Classical.choice` and `Quot.sound`; `aborted_events_excluded` uses `propext`.
  The successful audits contain no `sorryAx`. Section-variable warnings remain.
- The eighteen source/config hashes matched before/after the build and the
  committed files. Prior fourteen modules, tool/dependency pins and qualified
  native source remain unchanged.

The [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/evidence/update-serial-history.json)
contains exact claims, commands, timings, source/log hashes and boundaries. The
first direct check needed a proof-local index-equality split for request projection
through a conditional map update; the corrected leaf preserved the model and final
statements. That failure was not a semantic negative control.

No native test, full Docker gate, deployment, extraction or paid model call was
repeated. Constructive complete update/no-op executions and the paired old-update
counterexample remain next before closing this mixed-operation slice. Removal,
housekeeping, broader authority/identity composition, physical refinement and
deployed recovery remain open under the previously recorded assumptions. This is
a checked source-mapped design model, not whole-Hub verification. The commit is
local, not pushed or deployed.
