# Hub `d40d067`: What's new lists only a changed note

2026-10-26 (UTC). Coder: Opus; builder: Sonnet. No model calls.

## Source

veoveo-hub `d40d067` on `main`. Since the deployed `2c7075b` it brings two changes:
- What's new lists a release note only when it differs from the note of the version the
  Computer runs. A version that changes only through the policy or Hub's Computer
  settings no longer repeats the previous note. The mechanical differences are unchanged.
- The Hub binary listens on a socket passed by `LISTEN_FDS`, as the test fixture now does.
  Otherwise it binds as before.

Gate: `docker build --target check .` passed on macOS and on the box, 342 run, 342 passed and
2 skipped.

## Deploy

- **Image:** `veoveo/hub@sha256:b2d617d7…`, built in 54 s.
- **Locks:** BiomaAI/veoveo-installation `e9aecf7`, and the template's revision `54a05af`.
- **`plan`:** only Hub's sandbox image differed.
- **`apply`:** 18.2 s. The Hub sandbox was recreated, keeping its workspace and claims, in
  14.8 s.
- **`apply` again:** "18 of 18 steps match", "Nothing to change".

Probes:
- The sandbox is Ready, and `/computer/version` answers 200.
- `listening` was logged on `127.0.0.1:8080`.
- Hub's log since then has 0 ERROR and 0 WARN.
- Registrations: artifact, console, embedding, media, template, and `time` twice. The two
  `time` registrations are two factory instances with their own deployments
  (`01a1714c…`, `01a1719e…`).

## Not done

`console__computer` stays offered to every profile, answering 401 outside a Computer, as
console's design says. Hub has no way to offer a tool to only some profiles: every
registered server's tools go to every profile, decided by roles. Adding one is not worth a
mechanism.
