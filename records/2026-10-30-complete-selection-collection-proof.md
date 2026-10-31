# Complete collection and selected-result preservation

Hub commit `dac4cf7` connects the qualified selection-entry predicate, finite scan
and ordered insertion into complete collection. From an empty accumulator, the
collector terminates successfully with exactly the eligible whole registration rows,
strictly ordered deployment keys and no duplicate keys. The actual extracted
`selected` method is connected to that result: whenever it succeeds, its server map
has those same complete contents. No production defect or runtime change is claimed.

## Contract and boundary

`collect_map_correct` proves this package's actual `collectMap` recurrence using
the finite cursor and insertion contracts. Its invariant tracks the prior
accumulator and remaining rows within one independently characterized emission
list. Equal-key compatibility is derived from that list, not assumed for the
desired final map. `collect_complete` starts from empty and establishes membership
if and only if the independent `Eligible` relation holds, preserving every field.
Neither theorem assumes unique composition entries or namespace-helper success.

`selected_factorization` normalizes the unchanged extracted iterator, filter-map,
collection and conversion wrappers, and derives the map passed to the actual `of`
call. `selected_success_complete` uses the previously checked assembly contract to
transfer that map to every successful `selected` result. It does not assume the
desired map as an input or claim unconditional `selected` success.

The collector declarations use only standard Lean axioms. The two caller
declarations additionally name the existing uninterpreted `build_namespaces`
function. No completion or namespace-ordering property is granted by that symbol.
The collection primitives remain handwritten operational models; native
BTreeMap/Arc/iterator representation, equality, ordering and compiler/translator
correspondence remain explicit boundaries.

## Execution and evidence

GPT-6.1 Sol implemented the proof, GPT-6 Luna ran unattended Linux checks, and
GPT-6 Astra reviewed the source connection, invariants and evidence. Runtime inputs
remain Hub `3bc2923`, SDK `239622d`, Core `120306e`; validation uses Lean 4.35.0 and
the documented private patched-tool setup. Existing generated and proved modules
are unchanged.

The first direct check failed in **7.882 s** on a redundant suffix rewrite and
unreduced monadic wrappers/bind. Explicit normalization repaired only the new proof;
the contract and model stayed unchanged. This was not a production counterexample.

The final checks passed:

- `LAKE_NO_UPDATE=1 lake env lean SelectedMapCollectionProof.lean`: **10.185 s**.
- `LAKE_NO_UPDATE=1 lake build SelectedMapCollectionProof`: **10.837 s**.

All four executable audits passed their per-declaration allowlists, with no
`sorryAx`. Each check verified its exact 64-path source map before and after.
The direct run's external parser initially flagged Lean's shortened display of the
namespace-helper name. The source audit uses the fully qualified name and passed;
a read-only supplement records that distinction without altering the original log
or rerunning Lean. The target runner also stopped once before invoking Lean because
it read a nested receipt field at the wrong level; that temporary script correction
preceded the one actual target execution.

Proof SHA-256:
`b43ef104bcbc99bc998f458bfb104cd60a3c8ccfbe46e29ea6be65ddbb0162bf`.
Compiled proof SHA-256:
`b1432e2ed8d9f16cee41e3e2888c9625d5dacfe246c6c8f5af63e7d542b3210e`.
The [committed receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/request_composition/evidence/complete-selection-collection-checkpoint.json)
is SHA-256 `6e7a7a2434b7e0b7cc2e843111baceb27f07e03149498da15b60f3445678b6c4`.
It retains source/configuration reconstruction, raw and normalized audits,
commands, measured results, failure causes and log identities. Temporary logs are
under `/tmp/hub-request-composition-20261030/evidence-selected-map-collection-*/`.

Namespace-helper completion, constructor coherence, per-slug route uniqueness,
combined semantic mutation qualification and broader current-policy/SDK issuer
composition remain open. Earlier entry/getter controls retain their narrower scope.
No native component test, full Docker gate, deployment or model call ran for this
proof-only milestone. It is committed locally before the next slice.
