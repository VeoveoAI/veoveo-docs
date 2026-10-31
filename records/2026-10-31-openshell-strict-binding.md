# OpenShell strict credential binding, and a model call from a factory instance

2026-10-31 (UTC). Coordinator: Claude Code (Opus 5.5); implementation by a coding agent
(Claude Code, Opus 5.5) on the VeoveoAI OpenShell fork, reviewed by the coordinator.
Plan section 13, step 3 of the night's list; checklist I9 and I11.

## What changed in OpenShell

Six signed-off commits on the fork's `main`, `c80bda201..8bd83351d`:

| Commit | Change |
|---|---|
| `f8e3d7395`, `14e760c28` | A credential binding can be strict: a profile endpoint's `credential_binding: {strict: true}`, or a sandbox policy binding for an endpointless profile. At a strict endpoint the proxy admits a request only when every credential position it carries (`Authorization` and each position the strictly binding provider's credentials declare: bearer or header name, Basic with each non-empty part, query parameter, path template) holds a placeholder of a credential bound there, and it carries one. Anything else answers 403 `credential_placeholder_required` before any upstream write, with a denied HTTP event and a finding that name the reason, never the value |
| `e9b3c0506`, `ed1ff67d1` | Strictness fails closed while a credential is withheld: the gateway delivers strict endpoints in their own snapshot field (`strict_credential_endpoints`) whether or not values are sent, and the supervisor keeps them apart from credential values |
| `d9ef02196` | gRPC profile import, which the CLI uses, accepts a strict profile binding and refuses a named provider as YAML import does; the first commit refused every binding there |
| `8bd83351d` | HTTP/2 upstream only when the upstream selects it (below) |

Each crate's tests passed on the final tree: core 611, policy-schema 26, policy 301,
providers 150, supervisor-network 1591 (7 ignored), supervisor 201, server 2448 (21
ignored); workspace clippy clean. The Go SDK's one failing test fails on `main` as well.

## The model call that failed, and why

A factory instance's call to DeepInfra through the granted `vv-factory-model` provider
failed with a TLS EOF ([previous record](2026-10-31-server-surfaces-and-providers.md)).
The coding agent found the cause in the proxy (`c80bda201`): for an inspected `rest`
endpoint with enforcement, the proxy completed the client's TLS handshake choosing
HTTP/2, then offered the upstream only `h2`; DeepInfra speaks only HTTP/1.1 and answers an
h2-only offer with alert 120 (`no_application_protocol`), measured with `openssl
s_client`. The bug came with `f3bdf2e27`. `8bd83351d` reads the client's hello first,
offers the upstream `h2, http/1.1` only when the client offered h2 and the route allows
it, and finishes the client handshake with the protocol the upstream chose, so both legs
always agree; a reproduction test failed before the fix and passes after.

Before the deploy, the diagnosis was confirmed on the live system: the same call from the
probe instance with `curl --http1.1` answered 200 in 926 ms, ALPN `http/1.1` both ways.

## Deploy

| Step | Result |
|---|---|
| Images, built on the box from `8bd8335` with OpenShell's own image workflow | gateway `sha256:5aefb663…` in 424 s, supervisor `sha256:450b7280…` in 109 s; each reports `0.1.5-dev.208+g8bd83351d`; pushed and registry digests equal |
| `veoveo-installer apply openshell` (Helm), under a probe of Hub every 2 s with rollback to the deployed revision on failure | revision 26 deployed in 9.7 s at 07:15:29; 11 probes, all 200; Time's App read through Hub afterwards |
| Bioma's installation | the image pins, the installer's OpenShell crates bumped from `ab37a698` to `8bd8335`, the probe profile and its grant, the provenance in the READMEs |

## Probes, from inside the provider probe instance

The probe repository `provider-probe` (`b2fd9e7fb1eb508979d7bdd70fa8e4c8`) revision 2
requests `vv-factory-model`, `vv-factory-strict-probe` and `vv-factory-mail`; the first two
are granted. Its sandbox `b68a-ee2aa0751e8a` was recreated by that push, so it runs the
new supervisor. `vv-factory-strict-probe` is a probe profile: a random dummy token, never a
real credential, bound strictly to `httpbin.org/anything/**`, whose echo shows what the
endpoint received. In the sandbox, `STRICT_PROBE_TOKEN` and `DEEPINFRA_API_KEY` hold
OpenShell placeholders.

| Check | Result |
|---|---|
| I9 a model call | `curl` with its defaults (offers `h2,http/1.1`) to DeepInfra's chat completions with `Bearer $DEEPINFRA_API_KEY`: 200 in 2150 ms, `XiaomiMiMo/MiMo-V2.6-Pro` answered; ALPN `http/1.1` agreed. The key never entered the sandbox |
| I11 placeholder | `Bearer $STRICT_PROBE_TOKEN`: 200; httpbin echoed `Authorization: Bearer strict-probe-bfaa…`, the dummy value: substituted |
| I11 typed literal, HTTP/1.1 | `Bearer strict-probe-typed-by-a-person` with `--http1.1`: 403 `{"error":"credential_placeholder_required",…}`; the supervisor logged `HTTP:GET [HIGH] DENIED … [engine:credential-binding] [reason:credential_placeholder_required]` and `FINDING:BLOCKED … openshell.provider_credential.placeholder_required` |
| I11 typed literal, no credential, a placeholder beside a typed header, HTTP/2 | each refused: curl reports the HTTP/2 stream reset (`CANCEL`) and no response; no denial event is logged for them |

Three model calls were made for I9 tonight in all (each `max_tokens` 8): the failing one
before the fix, the HTTP/1.1 confirmation and the final one; plus one from the owner's
Computer for comparison. Three answered.

## Unplanned fixes and findings

- **The installer dropped the strict flag.** Bioma's installer imported profiles with
  OpenShell crates at `ab37a698`, whose profile schema has no strict binding, so the first
  import of the probe profile stored it without `credential_binding`, and every request
  passed. Bumped to `8bd8335`, the installer's plan named the missing field and its apply
  restored it; the running sandbox enforced it within seconds, without a restart.
- **The gateway port-forward** the installer uses (`localhost:18443`) broke when the
  gateway pod was replaced; `pf.sh` restarted it.
- **HTTP/2 refusals are silent.** At a strict endpoint the HTTP/2 path refuses by resetting
  the stream, not with the 403 and the events the HTTP/1.1 path gives. The refusal holds;
  the answer and the evidence are missing. Follow-up for the fork: answer HTTP/2 refusals
  with the same 403 and events, with a test that nothing reaches the upstream.

## Boundaries

- Sandboxes created before 07:15 keep the previous supervisor until they are recreated.
- The strict probe sends a dummy token to a public echo service; no real credential was
  bound strictly in this test.
- Only `bearer` placement was exercised on the deployed system; the other placements are
  covered by the fork's tests.
