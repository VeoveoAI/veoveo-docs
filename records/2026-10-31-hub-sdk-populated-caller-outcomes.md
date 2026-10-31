# Populated Hub caller acceptance and expiry refusal

Hub commit `0e3bb23` supplies independently constructed delegated inputs and
proves two actual extracted-caller results: acceptance with complete signer
claims, and `InternalToken ExpiredDelegation` when the caller's cap equals the
observed clock. The generic caller theorem from `24c2795` remains unchanged.
The [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/0e3bb23/proofs/current_roles/evidence/sdk-issuer-caller-examples.json)
records exact inputs, commands, source identities and compiled outputs.

## Inputs and results

The fixture contains acting server gamma, an inherited alpha actor with its
matching originating Task, populated delegated authority/context/audit,
`operator.inspect` and `operator.operate` permissions, and `operator:read` and
`operator:use` scopes. The original source token expires before the sampled clock;
the inherited delegation deadline is future. This preserves the existing acting
server path's source-expiry exemption. Canonical re-encoding, permission ownership,
context admission, actor-chain/Task consistency and effective deadlines are
proved independently, without importing the caller-correctness theorem.

The clock input is `(1788220800, 0)`, in seconds and nanoseconds. The positive
call requests `(1788220820, 987654321)` and has the shorter caller cap
`(1788220810, 123456789)`. Under precisely typed provider, clock, UUID/text/parser
and signer observations, the actual caller returns exactly the supplied bearer
string. The signer observation names the complete independently computed claims.
Those retain the full identity expiry, project its NumericDate seconds, join both
scopes in order, preserve both permission actions and retain gamma-to-alpha
prior-actor nesting. Full identity and claims field correspondence are established,
not merely the final bearer equality.

The boundary call uses the same independently admitted context and chain shape,
but its caller cap equals `(1788220800, 0)` and its requested deadline is
`(1788220800, 1)`. The actual caller refuses with `ExpiredDelegation`. This result
needs only provider and clock observations; ID creation and signing success are
not assumed. The proof's transitive declaration closure still names the SDK's
six primitive boundaries, which is distinct from a native call-count trace.

These are prepared-stack model outcomes for supplied typed clients, with the
source-version/refinement limits from the
[generic caller record](2026-10-31-hub-sdk-actual-caller-proof.md). The transport
field is synthetic and unused. No real JWT or network request was produced;
the fixture asserts neither authentication/current-policy provenance nor native
Task liveness. Equal NumericDate seconds at the nanosecond boundary do not prove
a positive whole-second JWT lifetime or verifier usability.

## Qualification trace

GPT-6.1 Sol implemented the fixture and outcome proofs, GPT-6 Luna ran the frozen
Linux x86_64 checks, and GPT-6 Astra reviewed the contracts, logs and exact evidence
before committing. The existing Lean 4.35.0 and qualified shared tool context were
reused; no extraction or tool change occurred.

The independent fixture passed directly in 2.952 seconds and the outcome module
in 2.612 seconds. The final named command passed in 6.092 seconds:

```sh
LAKE_NO_UPDATE=1 lake build SdkInternalAuthCallerExamples SdkInternalAuthCallerWitnesses SdkInternalAuthCallerProof
```

The two new leaves rebuilt; the unchanged generic theorem replayed its existing
artifact. The 77-path Hub map, 52-file SDK map and eleven immutable imports stayed
unchanged. All nine new axiom guards pass: six fixture declarations and the
complete-fields theorem are standard-only, while the two actual outcomes retain
the six approved SDK primitive boundaries. No `sorryAx` appears in passing checks.

The final witness OLean is 455,016 bytes, SHA-256
`5b85894d43a5d32563ec22ca2cce32b5bcfe5e8356a6e7eefe6dbc4a91e1bda5`.
The receipt SHA-256 is
`0e856cab8f86ef3b61c4c2ea08ff4056fc0a7447d0c063ca0db949cd6b17bf03`.
Review verified four recorded source/configuration hashes and 22 referenced
evidence files. Earlier compilation attempts needed namespace qualification,
indexed-domain reconstruction and proof normalization. These were authoring
failures, not semantic controls or native defects; nonblocking simplifier warnings
remain.

Actual-source deadline mutation and exact restoration are next. Read-only
preparation identified the latest 17-root extraction plan matching the current
model; the older HTTP-permission control's selector set would be stale here.
No mutation or extraction has run for this control yet. The checkpoint changes
no runtime source, dependency pin, generated model or CI behavior and runs no
native suite, Docker gate, deployment or paid model call. Commits remain local;
the full caller slice and broader Hub verification goal remain incomplete.
