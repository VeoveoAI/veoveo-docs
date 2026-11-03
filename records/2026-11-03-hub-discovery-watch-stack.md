# 2026-11-03: A discovery watch opens off the request's stack (Hub `349fffa`)

## Cause

`calls::servers_call_each_other_for_their_caller_through_the_hub` failed in the Hub's Linux
check build on every run, on mains `b5c0832`, `ddb901c` and `4126591`, and passed on macOS. In
the Linux check environment the Hub process aborted with "`tokio-rt-worker` has overflowed its
stack", so the caller saw the connection close (`IncompleteMessage`). Under gdb the failing
stack was 108 frames deep (not recursion) and used 2,092,240 bytes of the 2 MiB worker stack:
the first `resources/read` that needed a server's discovery watch opened it inline (upstream
connection, discovery, catalog subscription) on top of the inbound request's handling. The
largest frame was rmcp's streamable HTTP request handler, 673,824 bytes in the debug build.

Production runs a release build with much smaller frames; that it had headroom is an
inference, not measured.

## Fix

The request that first needs a watch now opens it on a task of its own, aborted if the request
is dropped first, inside the request's timing and audit scope. The deadline, errors, watch map
and generation checks are unchanged. Design in the Hub `DESIGN.md`, catalog watches.

Component evidence: 0 of 5 stress iterations passed before, 5 of 5 after, in the Linux check
environment; the box's Docker check passed 3 runs in a row, 482 of 482 each.

## Deployed (08:14Z)

Hub image `hub@sha256:7107c52f…`, Bioma `f31422d`; apply recreated the Hub in 20.7 s. `/readyz`
answered 17 servers on the first poll, the Hub pod had 0 restarts throughout, and its log
(last 200 lines) had no ERROR, WARN, overflow or panic. Reads as the owner right after the
restart: `template://items` 297 ms (the first, cold), `artifact://artifacts` 217 ms,
`time://authorities/bootstrap` 209 ms. From the owner's Computer, `skills` and a fresh Task's
`tasks get` (412 ms, working) both worked.

## Correction

The earlier records counted skill files as skills. From a Computer on 2026-11-02 the list held
20 skills (artifact 3, console 4, embedding 1, media 2, n8n 2, time 4, veoveo 4) with 23 files;
since the template server serves again it holds 21 skills with 24 files, each file matching
its listed sha256 and size.
