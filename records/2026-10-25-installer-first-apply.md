# The installer's first full apply

2026-10-25 (UTC). Coordinator: Opus; coder: Opus. No model calls.

## Source

| Repository | Commit |
|---|---|
| veoveo-template-installation | `b907f82` on `main` (fast-forward from `51f2c7b`) |
| BiomaAI/veoveo-installation | `11a1695` on `main` (fast-forward from `cd04d4c`) |

`veoveo-installer` is Rust in each installation's `installer/`, and the template's Python
identity tools are gone. Its check (`docker build -f installer/Dockerfile --target check .`,
which runs fmt, clippy `-D warnings`, `cargo deny` and the tests) passes on both trees with
91 unit and 8 integration tests. On the box it was built from a mirror of Bioma's tree
(`~/k3s-builds/installer-20261025/bioma`, compared with rsync checksums), and its private
directory is `~/.config/veoveo/k3s/private/bioma`.

## Fixed before the apply

- At `21bfbe6`, `with_action` dropped the publish action of a control plane that
  waited on new claim files. `apply` would have written the files, skipped the
  publication, and then removed `computer-policy-v3.yaml` while the active revision still
  named it. Found in review and fixed (`0eb9842`); never run.
- Errors reading or filling a declaration were reported as "not compared", which does
  not block `apply`, and the deliberate skips (seed Jobs) made `plan` unable to report a
  match. An error now blocks `apply` and fails `plan`; a deliberate skip with no work
  left counts as matching.

## Run

1. `login --no-browser` through `ssh -L 3211:127.0.0.1:3211` from the Mac: the person
   signed in in the browser; the grant is stored on the box.
2. `plan` (all 18 steps): 16 match. Step 15 has two content-named policy files to write.
   Step 18 could not yet be compared, because Hub reads the files the document names to
   validate it.
3. `apply --step hub-claim`: wrote `computer-policy-c6501575795e.yaml` and
   `factory-base-86a97f9bec31.yaml` with the claim's seed Job, in 4.0 s. Nothing named
   them yet.
4. `plan`: 17 match. Hub's validated form of the declared document (SHA-256
   `90fd47b1…`) against active revision `gcp-01a171a1…` differs in:
   - `computers.handbook`: the Hub CLI paragraph (4,019 → 4,462 bytes);
   - `computers.policyFile` and `factory.policyFile`: from `-v3` and `-v2` to the
     content-named files. Their content is the same: the Computer policy's text is equal,
     and the factory base differs only in comments;
   - `oauthClients[computer-browser]` and `oauthClients[veoveo-hub-sdk-cli]` gain a
     `displayName`.

   People's grants, memberships, repositories and assignments carry over. The cleanup lists
   `computer-policy-v1/v2/v3.yaml` and `factory-base-v1/v2.yaml`, and keeps
   `hub.env`, `hub.json` and `authorization-server.jwks.json`.
5. `apply` (all steps): 22.1 s, 2 changes. Revision `gcp-01a1751a…` is active. Hub was
   restarted because `factory` changed (13.1 s, including the wait for Hub to serve),
   then the five old files were removed (4.0 s).
6. `apply` again: 4.6 s, "18 of 18 steps match", "Nothing to change".

## After

The Hub sandbox is Ready with 0 restarts. `/computer/version` answers 200. Registrations
are `artifact`, `console`, `embedding`, `media`, `template` and `time`. Hub's log since the
apply has 0 ERROR and 0 WARN lines. 11 sandboxes are running, 0 of them not Ready.

## Not proven here

- A first installation: it needs its steps in a set order (PLAN.md Open).
- Seed Jobs other than Hub's claim: still run by hand.
- Writing a new template release note: the installer keeps the existing note.
- A Computer's behaviour after the new handbook: not opened in this run.
