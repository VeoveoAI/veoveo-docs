# Unchanging capabilities belong to a deployment

A production watch defect is reproduced and corrected on integrated Hub `3104ee9`.
Hub commit `c23d9ae` contains the correction, unchanged regressions and evidence.
One static deployment could suppress a different dynamic deployment's discovery
and subscription because the capability memo used only catalog generation and
server name. The fix uses generation and actual deployment ID in the same existing
set, including both subscription callers. It adds no authorization rule or component.

The [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/discovery_cache/evidence/native-unchanging-deployment-20261031.json)
contains exact commands, complete execution summaries, source maps, hashes and
named observations. GPT-6.1 Sol implemented the scenarios and correction,
GPT-6 Luna executed the native checks, and GPT-6 Astra reviewed source, logs,
scope and the correction. The owning DESIGN was updated before runtime code.

## What the scenarios establish

Both scenarios use actual admitted Hub views, declared fixture repository grants,
routed loopback RMCP sources and the production watch/cache methods. The sources
have identical tool declarations; one advertises no tool-list changes, the other
does. One scenario selects two different links in the same composition. The other
selects the same link in two compositions pointing to different deployments.

The original runtime discovers the static source and reuses that observation.
It then reports the dynamic source's watch active before opening it, skips its
discovery and listen, and retains its complete cached Tool descriptor with denied
count 17. The fixture's change broadcast has no receiver, so no MCP notification
can be sent from that source. Both tests reach and fail the final aggregate
behavior assertion; grant, routing and cache setup have already succeeded.

With the correction, the dynamic source is initially inactive, discovery and its
actual subscription open, repeated use retains the same watch without another
discovery/listen, and a notification through the source's real MCP sink is followed
by an empty cache. Static-source reuse still works. The tests are byte-identical
between the measured failing and passing runs, SHA-256
`505ae9a4f45e522dae46929859175bc8ab47866f5d3abae48bd49457bd04dbb8`.

## Measured checks and corrections

The source pins are Core `422dcf2`, SDK `7360c0f` and Lore `c33e017`. Checks use
Rust `1.99.0-aarch64-apple-darwin`, PostgreSQL 18 fixtures, `SQLX_OFFLINE=true`, the
existing warm Cargo target and bounded owned processes. Each scenario has a
30-second bound; observations have three-second bounds. Sleeps do not establish
ordering. Native commands include compilation time, not just behavior latency.

- Original runtime: **3 passed, 2 failed**, **39.531 s** command / **7.14 s** harness.
- Corrected watches: **5/5 passed**, **32.488 s** command / **1.18 s** harness.
- Existing subscription reconnect regression: **1/1 passed**, **0.689 s** command.
- Final formatting: passed in **0.669 s** after joining one call onto one line.

The corrected test binary is **177,787,528 bytes**, SHA-256
`c0ab90595a28f13a7c43c362fbd5ba6f59e1ee923a1e326c75cdd0f394d836c7`.
The original-runtime binary is **177,792,088 bytes**, SHA-256
`cbcae56378cc0789ae6ef3587795c01f0db989fa9b721e43fb7746167316626f`.
All measured source/build maps remain unchanged during their runs. The final
whitespace-only change follows the six native passes; full Mac/Linux checks on
the final committed bytes remain pending at this checkpoint.

An initial fixture reused an `enterprise` test user against a `tenant-a` catalog.
Its two setup failures are not defect reproductions. The fixture now derives
tenant and authority context from the catalog. The first correction then failed
compilation because two subscription callers still supplied server names; both
now use their captured deployment. These failures and the formatting difference
are retained separately. Three path/evidence-directory invocation mistakes ran
no compiler or formatter and contribute no validation result.

## Boundary

This is a native defect reproduction and correction discovered during proof-driven
review, not an automatically discovered Lean counterexample or a new theorem.
Generated and handwritten Lean files are unchanged. The fixtures do not qualify
HTTP bearer admission, registration endpoints, arbitrary schedules, reconnect
delivery or replica adoption. They use synthetic Tool descriptors, not model
output; no independent network packet capture was taken. No full Docker checks,
push, deployment or model-driven acceptance completed in this checkpoint.
