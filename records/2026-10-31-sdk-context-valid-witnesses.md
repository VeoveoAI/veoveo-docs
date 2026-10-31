# Constructed valid request contexts

SDK `b645f07` qualifies non-vacuous acceptance for the previously proved
`HubRequestContext::validate_for` contract. The source-linked theorem remains
unchanged. New independent input constructions satisfy its admission predicate,
and implementation witnesses prove that the extracted validator accepts them.
No production code, authorization rule or native-library model changed.

## Inputs and checked results

The Direct input is a user with a browser session family and nonempty groups,
group roles, roles, scopes, labels and assurances. Automated uses a service
principal with matching client and subject and no family. Delegated uses a
distinct service actor, inherits the user's nonempty scopes, labels and
assurances, and has empty user groups and roles. Its source and actor can have
different authentication times. The two scope values are unique and lexically
ordered, as native set traversal requires.

Generic witnesses retain arbitrary supplied audit, execution, token dates,
audience, token ID and authority policy fields. Separate constructor equations
show that retention; they do not authenticate those fields. All five text-size
bounds are proved for the fixture strings. The closed `all_modes_admitted`
theorem constructs its entire context and authority and proves all three actual
successes with no arguments or premises. This makes inhabited acceptance
explicit without assuming that the validator succeeds.

The examples import the independent specification and raw model only. Subsequent
mutation witnesses can therefore reuse them without importing a correctness
theorem that is false for the mutated implementation.

## Execution and evidence

GPT-6.1 Sol implemented the two proof modules. GPT-6 Luna ran the bounded logged
checks on the existing Linux x86_64 graph with Lean 4.35.0 and the unchanged
pinned Aeneas dependency. GPT-6 Astra reviewed the constructions against the
native validator and fixture shapes, the complete theorem statements, source
identities and actual compiler/audit logs.

- The first passing direct sequence compiled Examples in **2.53 seconds** and
  checked Witnesses in **2.66 seconds**.
- The final `LAKE_NO_UPDATE=1 lake build InternalAuthContextExamples
  InternalAuthContextWitnesses` passed in **7.32 seconds**, with peak RSS
  **2,686,996 KiB**. Its 1,806 reported jobs include cached dependency replay.
  All 15 recorded source/configuration inputs matched before and after.
- Four example declarations depend only on `propext`; four implementation
  witnesses depend only on `propext`, `Classical.choice` and `Quot.sound`.
  Every executable axiom audit passed, with no `sorryAx`.

The final Examples OLean is 248,280 bytes, SHA-256
`9c5bbb6e3df81fadbcc244df4796e26f5bc326aa51efcf99eb52d5ac7c589978`.
The final Witnesses OLean is 67,808 bytes, SHA-256
`0bb8640f88df643ad2aadf3d862f80a2f8cb8414bc111067bc9f4e5c62068b3c`.
The [committed receipt](https://github.com/VeoveoAI/veoveo-hub-sdk/blob/main/proofs/internal_auth/evidence/context-examples.json)
records commands, input versions, log hashes and artifact captures. The final
target includes a fixture audit-ID correction after the passing direct sequence;
the receipt distinguishes those source versions.

Two earlier proof checks failed: a reserved Lean variable name prevented parsing,
then unreduced constructor projections prevented literal-size decisions. Neither
failure established a runtime defect. The final target's artifact-capture command
misspelled the Witnesses filename; the original record remains intact and a
separate read-only capture records the correct path, size and hash. The successful
build was not repeated for that reporting typo.

## Boundaries and next work

This proves admission of constructed inputs within the recorded operational
model. It does not prove input authenticity, native parsing, current-policy
provenance, complete issuance, signing or verifier behavior. Wrong-acceptance and
wrong-refusal source mutations, restoration checks, complete claims/deadlines and
Hub composition remain open. No new native suite, broad Docker gate, deployment
or model/provider call ran. This checkpoint is committed locally, not pushed.

A read-only GitHub head check observed Hub `c39d4b6` and SDK `24bd67b`.
Hub's two commits after the previously reviewed `cd363a2` change App-origin and
public-route transport/entry behavior. They do not change `Cargo.toml`,
`mcp/upstream_authorized_http.rs` or `policy/evaluation.rs` relative to `cd363a2`;
its SDK pin remains `154a473`. Those newer application paths are not thereby
qualified by the older Hub proof graph. The
[composition boundaries](2026-10-31-issuer-composition-boundaries.md) still apply;
no merge, repin or deployed revision was inferred from these references.
