# Caller deadline control: rejection and restored baseline

Hub commit `f8faea5` records a partial control checkpoint. A deliberate source
fault compiles, and the unchanged caller proof rejects it at the intended deadline
equation. Exact source and generated-output restoration pass, followed by a fresh
build of the three original caller targets. The independent wrong-output witness
has not compiled successfully, so this is not a completed semantic-control slice
or a newly discovered production defect. The comprehensive verification goal
remains active.

## Source and scenario

GPT-6.1 Sol prepared the isolated source fault and witness, GPT-6 Luna ran the
logged Linux extraction, proof and restoration commands, and GPT-6 Astra reviewed
the raw differences, failures, restoration and checkpoint. No runtime deployment,
native integration suite or model-driven acceptance ran.

The archived extraction source is Hub `3bc2923`, with its actual SDK `239622d`
and Core `120306e` pins. The proof package is Hub `0e3bb23` composed with SDK
proof revision `6afa18a` and its separately prepared issuer implementation. This
retains the earlier prepared-stack boundary; it does not establish native
equivalence to Hub's pinned SDK. Lean is 4.35.0, with the existing qualified
Aeneas dependency and instance-naming patch.

The one-line test fault replaces the optional caller-cap minimum with the minimum
of the requested expiry and itself. This keeps the native comparison reachable
while deliberately ignoring the retained cap. It exists only in a disposable
source tree. The canonical Rust and all three committed caller proof/fixture
files are unchanged.

The intended independent scenario reuses the populated acting-server context,
inherited actor chain and originating Task. Its cap and sampled SDK clock are
`(1788220800, 0)`; its request is one nanosecond later, with a later inherited
deadline. The existing baseline proof establishes exact `ExpiredDelegation`
refusal. The unfinished draft is intended to establish the mutant's different
result under the same typed external observations. No mutant acceptance, live
signed bytes, usable JWT or positive whole-second token lifetime is claimed here.

## Observed checks

1. The first source variant extracted, but removing comparison entirely also
   pruned generated comparison interfaces. It was not used for a Lean rejection
   claim. Its post-Charon inventory reader initially mishandled a filename variant
   and flattened metadata; a separate continuation corrected the reader and reused
   the exact saved LLBC, without repeating successful compilation.
2. The revised fault used the existing 17-start, 52-include, 15-opaque extraction
   plan. Charon passed in **25.816 s**, with 18 transparent functions and no LLBC
   errors; Aeneas passed in **2.273 s**. The generated body differs only at the
   caller comparison arguments, with matching source-span edits. Both external
   templates are byte-identical. No generated declaration was patched by hand.
3. The fresh mutant model and unaffected fixture targets passed in **23.998 s**.
   The frozen caller contract failed in **2.740 s**, at line 129:
   `Result.ok (earlier requested requested) = Result.ok (earlier cap requested)`.
   Its assembly/outcome audits then rejected `sorryAx`. This failure contains no
   missing-definition error. No failed caller-proof artifact was imported by the
   independent witness.
4. The independent witness failed elaboration in **2.683 s** on a DateTime
   ordering namespace reference and an allocator Clone type mismatch. These are
   authoring errors, not semantic counterexample evidence. Subsequent partial
   qualification edits were not checked. The coding worker was then stopped twice
   by automatic content review reporting “possible cybersecurity risk”; editing
   that witness stopped. Its committed file is explicitly labeled unqualified
   and is outside the ordinary proof targets.
5. The caller fault was reversed in the same source tree. The original caller
   hash and the entire 962-file map, apart from the existing catalog naming
   annotation, matched. Charon (**26.280 s**) and Aeneas (**2.235 s**) reproduced
   all four canonical raw files byte for byte. Reversing the annotation restored
   the complete original 962-file archive map.
6. A fresh restored package ran
   `lake build SdkInternalAuthCallerProof SdkInternalAuthCallerExamples SdkInternalAuthCallerWitnesses`
   with `LAKE_NO_UPDATE=1`. It passed in **25.982 s**. All nineteen guarded
   declarations pass with their existing standard axioms and, where applicable,
   six SDK provider/time/identifier/signing boundaries; there is no `sorryAx`.
   The package used a fresh own build tree and reused qualified dependencies.

The restored build records 83 package source files, 52 SDK source files and nine
SDK artifact paths. Its retained summary confirms the package source map was
unchanged; Luna also reported unchanged read-only SDK/import postchecks. The three
new compiled artifact sizes are 305,752 bytes for CallerProof, 364,456 for Examples
and 455,040 for Witnesses. Exact hashes, commands, raw outputs and log identities
are in the [checkpoint receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/current_roles/evidence/sdk-issuer-caller-deadline-control.json).

## Remaining boundary

The unchanged contract's sensitivity and exact restoration are established. The
independent actual wrong-output witness remains unfinished; it must pass before
this control is called qualified. No authorization rule, runtime adapter, dependency
pin, CI gate or deployment changed. The local checkpoint has not been pushed.

After this control is completed, the next composition edge connects the computed
selected route and same-generation policy/narrowing result to the already proved
caller/issuer outcome, replacing the currently supplied client's provenance with
computed inputs. Native SDK-version correspondence, the 60/900-second clock/TTL
wrappers, HTTP attachment and transport, cryptography, native representation and
deployment remain explicit separate obligations.
