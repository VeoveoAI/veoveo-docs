# SDK-to-Hub wrapper extraction

The sixth adoption probe successfully extracted Hub with SDK `239622d` and
generated the surrounding SDK access wrapper and matcher wiring. This is a
translator checkpoint, not a checked composed proof or native qualification.
It follows the [boundary investigation](2026-10-30-sdk-hub-extraction-boundaries.md),
which records the source freeze, dependency resolution, earlier failed probes
and successful edition-2024 diagnostic.

## Scope and execution

The source and resolved locks are identical to that investigation. The only
new extraction change makes the foreign generic `authorization_decision::resolve`
an external function, removing its conflicting include. The approved implementation
of that model will call the pinned SDK-owned generated resolver through typed
dictionary adapters. No production function was changed to accommodate extraction.

Public `AuthorizationDeclaration::access`, NativeMatcher's type and method, and
its `Option::is_some_and` closure remain transparent. Template parsing and the
native template matcher retain their explicit adapter boundaries. The old Hub
roots remain selected. This run uses four roots, twenty includes and eleven
opacities; the full argument vector is retained in the summary.

GPT-6.1 Sol `/root/coder` prepared the plan and audited the minimal runner delta;
GPT-6 Luna `/root/builder` executed it on Linux; the Astra coordinator reviewed
the generated access body, resolver interface, hashes and remaining scope.
The initial launch used the wrong runner location and failed before creating the
probe root. Copying the same audited runner to its expected location corrected
that setup error; the actual extraction then ran once.

- Charon: exit 0, 23.906 s, LLBC `has_errors=false`.
- Aeneas: exit 0, 1.821 s, four generated scratch Lean files.
- No Lake package build, new theorem check, native test, deployment or model call
  was performed in this probe. The generated files have not been accepted into
  the checked proof package.

## Generated interface

The external resolver has this shape, with the complete access value and cursor
state preserved in its type:

```text
resolve {T A C M}
  (PartialEq A A) (Copy A) (Cursor C (T × A)) (Matcher M T)
  : Option A → C → M → Result (Option A × C)
```

The actual generated resource-access branch calls it with `RouteAccess`, the
native resource-template map iterator and NativeMatcher. NativeMatcher translates
to a wrapper alias for `ResourceUri`. Tool, prompt and resource-template access
retain their actual direct map lookups in the extracted function.

The raw external template still declares the resolver as an axiom. That template
is **not** an accepted model or a proved resolver. The next implementation must
replace that placeholder with delegation to the existing SDK-generated algorithm,
prove dictionary/argument preservation and connect the resulting access contract
to the current-policy and downstream theorems. Defining the delegation is not
itself a proof of compiler/module linkage; that boundary remains explicit.

Native parsing, template projections/borrowing, maps and the clock retain their
stated boundaries. Prior semantic controls and native tests do not automatically
qualify this newly generated model.

## Evidence identities

Plan SHA-256:
`bbdabe474b178a48bbf86e39182345c6e2303a0b9db8c36400d92f3ddb41f8cf`.
Runner SHA-256:
`28db293121f6506c18e2705af4389e06244d5e09346e0d6a20bce4bf7ab85bc5`.
Summary SHA-256:
`10671dec255655b22300f9d34fcefa7b8eb1e1907600ab08d0690ff619b181c5`.

```text
LLBC (3,953,082 bytes)
7838c11f73fecdf53103406007cc2a21d3d81e3d75cc6086999bdefc0e27f1aa
Funs.lean (141,344 bytes)
11750d3835163a118675756af699b8f8687254d3132f82952c785ee39ecb4a73
Types.lean (91,349 bytes)
f795b7c7186845c22a1f9f0318687974cc74043549fafa2bf82961995a8383a4
FunsExternal_Template.lean (68,236 bytes)
cf6d2221fa0e4de480135fa8022a2c23ac4dc9b9bafd881db0e1b1b0810eb72f
TypesExternal_Template.lean (25,997 bytes)
1b829eaa18498ceb72c16ba8189139184338faa3ba7ec834e83ff3ca93c84213
```

Local evidence is `/tmp/hub-sdk-adoption-20261030/evidence-probe6/`;
remote execution is under
`/home/rozgo/.cache/lean-pilot/hub-sdk-adoption-20261030/probe-6/`.
The summary records tool hashes, source/lock verification, full commands, logs
and body inventory. Partial output from the earlier failed probes remains separate.
