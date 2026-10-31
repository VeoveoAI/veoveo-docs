# Proof source applicability before issuer composition

The issuer proof must be connected to an explicitly identified Hub source tree.
This read-only audit by GPT-6 Astra compares local Git references; it does not
identify the deployed binary or assert that the remote-tracking references are
the latest GitHub state.

## Observed references

- Local Hub: `c6feadb19c6f9ce28fa2260fb1a3085828793226`, whose library and fixture
  dependencies both pin SDK `239622d12c08b771cc5e813fe3e846385d8d04ad`.
- Hub `origin/main`: `cd363a2dce6fcfe120a40ee67a9eec6008a9d607`, whose library and
  fixture dependencies both pin SDK `154a473f2c2c2d0fbc974bc04b6c7159bd397829`.
- Local SDK: `5d371052fdb904ec2498996d937155f19a12e64b`, containing the two
  qualified issuer extraction preparations and checked operational model.
- SDK `origin/main`: `24bd67b86c58549aba6a262ec92dbddbcb5d10e7`. Its changes after
  `154a473` are confined to Apps and registration design prose, with no Rust delta.

`git rev-parse`, `git show <ref>:Cargo.toml`, and scoped source diffs establish
these observations. No merge, dependency-pin change, deployment or model call was
performed for this audit.

## Consequence for the proof

The observed newer Hub source adds App-origin policy/requirement cases,
registration surfaces and a forwarded-bearer construction path for non-MCP App
origins. The older extracted request/policy graph does not establish those new
cases. Integrating the SDK issuer result requires reviewing and qualifying the
relevant source differences, rather than transferring coverage by repository name.

The earlier [issuer-model record](2026-10-30-sdk-internal-auth-model.md) used the
phrase "running dependency" for SDK `239622d`. That wording referred to the local
Hub source pin and was not supported by a deployment inspection. This record
corrects that interpretation without rewriting the historical record. No deployed
source applicability is claimed.

The [SDK proof package](https://github.com/VeoveoAI/veoveo-hub-sdk/blob/main/proofs/internal_auth/README.md)
continues to identify its prepared extraction slice separately from both Hub pins.
The full issuer theorem and its composition with current Hub callers remain open.
