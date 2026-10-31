# Integrating current runtime changes with the proof work

Hub merge `81c933f` combines local `305aeb2` and upstream `000f74e`. Merge `3104ee9`
then incorporates upstream `f8c97ad`'s Computer Apps and owner keep-on lifecycle.
Both merges are local. **This is a source integration checkpoint; integrated
runtime checks, push and deployment have not occurred.**

The linked-runner merge is textually clean. It retains the current-principal and
delegation-ceiling cache fingerprint, synchronous lazy-input state operations,
ticket/generation fences, and live-catalog watch checks and publication receiver.
Upstream's link-aware server lookup and routed upstream connection remain intact.
Two ordinary fixture keys add `link: None` to compile against the expanded key.
The upstream Core `422dcf2`, SDK `7360c0f` and Lore `c33e017` pins are preserved.

GPT-6.1 Sol reviewed the integration and supplied the two fixture field updates.
GPT-6 Luna captured a source map without running checks; GPT-6 Astra independently
matched all 836 non-proof inputs to that capture before committing `81c933f`.
That map predates the additional Computer merge and does not qualify `3104ee9`.
Other agents' Mac/Linux checks were observed running against their own snapshots;
they are not results for these integrated commits.

## Formal applicability

The generated and handwritten Lean files are unchanged. Their recorded theorems
remain scoped to their original models and assumptions. In particular:

- Cache keys now contain optional link identity. Native Clone/Eq/Ord and complete
  key correspondence need fresh extraction; existing history proofs do not
  automatically cover the extended native key.
- Registrations and selections now contain runners. Request construction carries
  a repository grant and uses `issue_with_repository`, beyond the existing exact
  caller/issuer composition boundary.
- The generic selection and Task-decision kernels are unchanged. Runner candidate
  assembly and deployment lookup surrounding them are new integration obligations.
- Registration has a new runner persistence path. The prior transaction models
  do not establish this path's correctness.
- Computer Apps and owner keep-on behavior remain part of the open Computer
  lifecycle work, not a newly proved feature.

The unmodified pagination attempt has its own
[translation record](2026-10-31-catalog-pagination-translation-boundary.md). It
produced no Lean modules and used the older dependency stack.

Review also identified a possible discovery-watch memoization defect: effective
unchanging capabilities are remembered per server name, although different
deployments can advertise different capabilities. That is a source-supported
hypothesis at this checkpoint. A native reproduction and any correction are
separate work; no failing or passing test is claimed here.

The [proof map](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/README.md)
records the limits. No authorization rule, CI proof job or new runtime machinery
was introduced by these merges.
