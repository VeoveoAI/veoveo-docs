# Factory: independent lifecycle decision contracts

The manual Factory proof now characterizes exactly when the modeled existing
runner is kept, restarted, replaced or created. This closes the shared-selector
specification gap identified in the
[output checkpoint](2026-10-31-factory-native-output-proof.md): the new contract
predicates do not call `choice`, `changed`, `runs`, `besideImage`, `configuration`
or `command`. They state the compared fields directly.

The implementation correspondence remains Hub
`48d7e25a564f24c9d0418fbbebeda1d5c7d4c68c`. Current main before this checkpoint
was `ebe57218c928c2b8077558cf4cd78a5a7ac77d51`, with unchanged runtime sources and
dependency pins. There is no runtime/model change or Aeneas extraction here.

## Established contracts

- Create if and only if the native sandbox read is absent.
- Keep if and only if the target repository/tracked ID and program/content
  revisions agree, and the present spec/template has the compared command,
  providers, resources, driver configuration and canonical policy. A rebuilt
  image digest may differ: matching content takes precedence over image equality.
- Restart if and only if the present spec/template has the same target, compatible
  compared fields and image, but the program/content revisions differ.
- Replace a present sandbox exactly when no spec/template satisfies the target
  and non-image fields plus either matching content or matching image. This
  includes changed targets and missing specs/templates.

Corollaries establish replacement on target identity differences, image-independent
keeping, provider-order invariance, multiplicity preservation and replacement
when provider-list lengths differ. Native comparison sorts lists; it does not
collapse duplicate provider names. Environment, restart policy and unspecified
payload remainders are not compared by this source path, and changing only them
does not change the model's lifecycle choice. No full desired-configuration
equality is asserted for retained workers.

These are universal contracts over the model's types. Their interpretation for the
actual linked-runner path retains the existing schema, formatter, script, payload
equality and native sorted-list correspondence boundaries. They do not prove the
native provider/configuration preparation or the correctness of external RPCs.

## Execution

GPT-6 Astra reviewed the actual Rust comparisons and independent predicates;
GPT-6.1 Sol authored the proof; GPT-6 Luna ran the bounded Linux checks. The
toolchain remained Lean 4.35.0 with Mathlib
`56a005855ea17e0b0958f73ec801ae140b0a1679`.

The new leaf imports only the model and the axiom-audit utility. The previously
accepted model source and OLean were hash-checked before reuse; no earlier row,
output or recovery proof artifact was needed. Each attempt used a fresh private
source packet and an absent new leaf artifact. The direct command had a 180-second
bound, explicit pinned toolchain PATH and no dependency update:

```sh
LAKE_NO_UPDATE=1 lake env lean FactoryChoiceProof.lean -o .lake/build/lib/lean/FactoryChoiceProof.olean
```

Check 1 exited 1 after 4.878 s because a nested record-update expression's layout
failed to parse. Its downstream unknown-declaration errors were not semantic
findings. A whitespace-only correction made the expression unambiguous; no
statement, predicate, model or proof logic changed. Check 2 exited 0 after
5.066 s. All 15 executable axiom guards passed, with eight printed closures
using only `propext`, `Classical.choice` and `Quot.sound`. The accepted log has
unused-tactic/argument warnings and no errors. Three finite local
600,000-heartbeat limits apply to the choice equivalence proofs, not globally.

## Identities and remaining work

Temporary evidence root: `/tmp/hub-factory-retarget-20261031/`.

- Final `choice-check2/inputs.json`: SHA-256
  `dd027db7f9120296725363d524a3e5a071970a5c34702ac12af6a8dd85c8186a`.
- Final ten-file source archive: SHA-256
  `f8b121d72a34d78d0b75af2b86f12a60968b9c9989e9f2015cdc723011995d31`.
- Checked leaf: 12,112 bytes, SHA-256
  `81198160608ac4d811d679e3ee4e94facd4ffd5c9be3a4e1ce70f4077bb3181a`.
- Fresh OLean: 967,736 bytes, SHA-256
  `682c649e911d0e42225397aa882ace22d7905ff5c82686c3496b276d8e0b663f`.
- Final log `choice-check2-mirror/run1/lean.log`: 1,766 bytes, SHA-256
  `682838f5c94fedd9e129cdadd0f8b4ef7ed314d6417384b96569096b56f3bf13`.
- Failed check 1 log: 1,960 bytes, SHA-256
  `72bb1c68681cc1a8f941415f5f00686e553cc974bda93ff9ce489f8ecc205f70`.
- Reused model OLean: SHA-256
  `86d35cb19aea6b19727b3bb0fc2cfcb3c3c45674a05f063c3acbd053d1f402ee`.

Source maps matched before and after both runs. The checked leaf and nondefault
Lake target are committed; full logs and compiled artifacts remain temporary.
Package qualification prose is written afterward. No native test, deployment,
OpenCode call or package-wide recheck occurred.

The axiom guards audit dependency closure; they are not semantic mutation tests.
Wrong-output and wrong-refusal controls have been designed but have not run in
this checkpoint. They will mutate isolated manual-model copies, check populated
acceptance assertions and independent counterexample witnesses, then verify exact
restoration. They will not be represented as actual Rust extraction. Finite
serialized histories, concurrent follower freshness, removal interleavings,
publication order and eventual recovery remain separate obligations.
