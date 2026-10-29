# Daily use qualified with MiMo, and the toolchain a Computer lacked

2026-10-29 (UTC). Model: `deepinfra/XiaomiMiMo/MiMo-V2.6-Pro`, selected explicitly in the
session, and no other. Plan section 5, approved 2026-10-29. It follows the deployed probes
of [search and internet](2026-10-29-computer-internet-and-search.md) and
[OpenShell's streams and refresh](2026-10-29-openshell-streams-and-refresh.md).

## Method

- **Computer:** the owner's, `01a16a8c…`.
- **How it ran:** OpenCode's own API inside the Computer (`g3/run.sh`, from `g1-run.sh`):
  create a session with the model, send one prompt, wait for idle, then read every message
  with URLs redacted.
- **The prompt:** work in g1-rerun (`af254079…`), branch `main`:
  1. clone it with lore;
  2. find the file that defines the server's MCP tools, and its `Cargo.toml`, with OpenCode's
     `grep` and `glob` tools, not the shell;
  3. add a crate from crates.io and use it in one new unit test;
  4. run `cargo check --all-targets` until it passes, then `cargo test` for that test;
  5. push with plain lore;
  6. call `console__status` with `wait` until `main` serves the new revision.

## First run: Computer version `7e27dc4bf18d`, the `semver` crate

Session `ses_e7968f8f…`:
- **Duration:** 07:36:47 to 07:55:23, 1,116.6 s.
- **Tool calls:** 51.
- **Cost:** $0.091. Tokens: 162,374 input, 5,743 output, 15,107 reasoning and 971,664 read
  from cache.

| Time | Step | Evidence |
|---|---|---|
| 07:37:41 | `lore clone` | Revision 5 `ee80cc2c…` |
| 07:37:47–07:39:37 | 4 `glob` and 3 `grep` calls, all completed with results | `contract/items.rs` (`#[veoveo_hub_sdk::tool]`) and `mcp/mod.rs`; both `Cargo.toml` files |
| 07:40:16 | `cargo --version` | Failed: rustup tried to install the `clippy` and `rustfmt` that `rust-toolchain.toml` names: "could not create temp file /usr/local/rustup/tmp/…: Permission denied" |
| 07:40:45 | Workaround | `RUSTUP_TOOLCHAIN=1.99.0`, which skips the toolchain file |
| 07:42:06 | `cargo check --all-targets` | Failed: `pg_query`'s bindgen "Unable to find libclang" |
| 07:45–07:48 | Workaround | The agent downloaded Debian's libclang and LLVM packages with `apt-get` into `~/scratch`, unpacked them with `dpkg-deb`, and set `LIBCLANG_PATH` |
| 07:48:35 | `cargo check --all-targets` | Passed in 18.3 s |
| 07:49:16 | `cargo test --lib a_semver_version_parses_to_its_major` | 1 passed, after 3 min 31 s of compiling |
| 07:54:07 | `lore commit`, `lore push` | Revision 6 `f9d04f8a…` |
| 07:54:34 | `console__status` with `wait: 60` | Applied = serving = `f9d04f8a…`, `ready`, 0 restarts |

Other calls:
- **crates.io:** `curl` to the crates.io API answered 403 without a user agent and 200
  with one. That is crates.io's own rule.
- **pypi.org:** `curl` to pypi.org was refused. It is a two-label host, not listed.

### The toolchain a Computer lacked

The factory base, which Computers build on, was meant to be "the component toolchain".
It was not:

| Missing | Why it matters |
|---|---|
| rustup's `clippy` and `rustfmt` | The template's `rust-toolchain.toml` names them. A Computer's toolchain is read-only, so rustup cannot add them, and plain `cargo` fails in any repository made from the template |
| clang | `pg_query`, a dependency of the template, generates its bindings with bindgen |
| cmake and pkg-config | The component's own factory image (`openshell/image/Dockerfile`) installs them with clang |

The fix:

| Item | Result |
|---|---|
| Template commit | `430b7ab`: the factory base installs clang, cmake, git, pkg-config and tzdata, and adds `clippy` and `rustfmt`. Design first, in the same commit |
| Bioma commit | `1f3061e`, with a new release note |
| Factory image | `sha256:a7fcc730…`: ripgrep 14.1.1, Debian clang 19.1.7, cmake 3.31.6, pkg-config 1.8.1, clippy and rustfmt installed |
| Computer image | `sha256:d5611dc0…`: OpenCode byte-identical to the deployed image's |
| Computer version | `31282b4461fe`; `apply templates`, and the plan matched 3 of 3 |
| Deterministic probe, 08:01 | In the restarted Computer, in a `/tmp` clone of g1-rerun, with the image's rustup environment, no `RUSTUP_TOOLCHAIN` and no `LIBCLANG_PATH`. The active toolchain was the one `rust-toolchain.toml` names. `cargo check --all-targets` exited 0 in 3 min 8 s from cold, compiling 168 crates |

## Second run: Computer version `31282b4461fe`, the `hex` crate

Session `ses_e794f92d…`:
- **Duration:** 08:04:31 to 08:13:56, 564.6 s.
- **Tool calls:** 30.
- **Cost:** $0.049. Tokens: 95,646 input, 2,696 output, 4,343 reasoning and 412,768 read
  from cache.

| Time | Step | Evidence |
|---|---|---|
| 08:04:36 | `lore clone` | 110 files, 443.28 KiB, revision 6 `f9d04f8a…`, in 0.09 s |
| 08:04:36 | `console__computer` | Version `31282b4461fe` and its release note |
| 08:04:39–08:05:34 | 2 `glob` and 4 `grep` calls, all completed with results | `mcp/mod.rs` (the route table, `.tool::<CreateItemRequest, …>`), `contract/items.rs`, both `Cargo.toml` files |
| 08:05:09 | `webfetch` of the crates.io API | Completed; the agent pinned `hex = "=0.4.3"` |
| 08:05:47–49 | 3 `edit` calls | Workspace and crate manifests; the test `two_bytes_encode_to_their_hex_text` |
| 08:05:54 | `cargo check --all-targets`, plain | Passed in 2 min 44 s; `Cargo.lock` names hex 0.4.3 |
| 08:08:50 | `cargo test --lib two_bytes_encode_to_their_hex_text` | 1 passed |
| 08:12:40 | `lore commit`, `lore push` | Revision 7 `e664e80e…` |
| 08:13:00 | `console__status` with `wait: true` | Error: "Expected number". It was the agent's argument |
| 08:13:25 | `console__status` with `wait: 60` | Applied = serving = `e664e80e…`, `ready`, 0 restarts, no warning |

The instance's sandbox restarted onto the new OpenShell supervisor (`b5aa93da…`) with this
push, at 08:12:58.

## Proved

- **Search:** OpenCode's `grep` and `glob` tools run in a Computer: 13 calls in two runs,
  all completed with results.
- **Building:** on Computer version `31282b4461fe`, an agent adds a crate from crates.io to a
  server repository made from the template, checks and tests it with plain `cargo`, pushes,
  and the change serves. No workaround was needed.
- **Fetching:** OpenCode fetches from the internet (`webfetch`).

## Boundaries

- **Not exercised:** file search with an `@` mention in the browser. `/api/fs/find` was
  proven by the deployed probe.
- **Left in the owner's home:** the first run's `~/scratch` (Debian package lists and the
  unpacked libclang) and the clones in `~/projects/g3` and `~/projects/g3b`. They are the
  agent's work in the person's home, which the platform does not write.
- **Not run:** the template's `docker build --target check .`, which its `AGENTS.md` asks
  for before a push. The prompt named only `cargo check` and `cargo test`, and the agent
  said so.
- **Other Computers:** they take version `31282b4461fe` at their next start.
