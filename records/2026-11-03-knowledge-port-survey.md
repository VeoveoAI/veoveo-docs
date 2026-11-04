# 2026-11-03: Survey of the monorepo's Knowledge before porting

Read-only survey of `/Users/rozgo/BiomaAI/veoveo` (`5e3f55198`) and the VeoveoAI workspace,
by reading documents and code. Nothing was built, run or deployed. The outcome is
[PLAN.md section 17](../PLAN.md#17-knowledge-one-contract-every-server-expresses-and-each-searches-its-own-records).

## What exists in VeoveoAI

Nothing: no `ai.veoveo/knowledge-source` declaration, no Knowledge server, no collection
declarations. The split deleted `veoveo-knowledge-contract`, `veoveo-embedding-contract`,
`veoveo-mcp-ext-knowledge`, the Knowledge audit details and `audit.indexing_*` from core
(C3, core `7a6c210`), and Time and the Hub dropped their source declarations
([split plan](REPOSITORY_SPLIT_PLAN.md), Core Contents). Extraction (E4) and the repository
name (D29) stayed open. Embedding was ported as generation only, with Knowledge, vector
storage and pgvector excluded by the user ([integration record](LORE_OPENSHELL_INTEGRATION.md),
Embedding Generation).

## What the monorepo has

Line counts are `wc -l` over the `.rs`, `.surql` and `.md` files of each path.

| Path | Lines | Contents |
|---|---|---|
| `mcp/knowledge-extension` | 1,942 | `ai.veoveo/knowledge-source`: collection descriptors on resource templates (`collection`, `entityKind`, `enumerate`, `freshness`, `changeSignal`, `access`, `requiredScopes`, `indexing`), observations on reads (`revision`, `contentSha256`, `observedAt`, `modifiedAt`, `modifiedBy`, access descriptor, external record), conditional reads, search declarations, the `{slug}.docs` collection, rules K01 to K10, the `ai.veoveo/indexing-read` intent |
| `servers/knowledge-mcp` | 17,243 | Catalog resources in DCAT shape, tenant indexing workers with machine JWT clients, Store leases, source listeners, revalidation, index generations and activation, the `structure-v1` chunker, hybrid search (SurrealDB BM25 and HNSW fused by `search::rrf`, k = 60), an `embed` tool, retrieval evaluation and installed-qualification harnesses, Helm packaging |
| `platform/knowledge/contract` | 1,675 | Generation identities and specifications, approvals |
| `platform/store/src/{knowledge,schema/knowledge,queries/knowledge}` | 4,578 | SurrealDB catalog, chunk and per-generation vector records, fencing |
| `platform/gateway/src/mcp/knowledge_indexing.rs` | 318 | Approved-collection admission of the indexing client |
| `mcp/conformance/src/{knowledge_source,knowledge_probes,runner/knowledge}` | 1,481 | K01 to K08 probes |
| `platform/audit/contract/src/knowledge` | 96 | Knowledge audit details, five-minute indexing windows |
| Sources | | Time (`time.events`, `time.calendars`, `time.epochs`, `time.docs`), Artifact (`artifact.metadata`), Map, Reason, Chart (Node), Datasheet (Python); the agent kernel kept observations as provenance lines |

By its own status (`docs/KNOWLEDGE.md`), machine-client provisioning, image publication and
installed qualification were never completed. This was read, not verified.

## What changed under it

Each item was checked in the current documents or code.

- Work Context is removed (PLAN section 16). Four of the six `readPolicy` kinds, the
  `work_context` access model and search's caller policy depend on it.
- Calls between servers carry the caller, narrowed by token exchange. A consumer depends on
  the provider's `contract` feature and declares `.uses(...)` with the provider's typed
  permission when it registers (SDK `DESIGN.md`, Calls To Other Servers). The Hub holds no
  grants of its own. A server cannot call servers it learns of at run time.
- Storage is PostgreSQL 18.6 with one schema per server. pgvector 0.8.7 and PostGIS live in
  the bootstrap-owned `_extensions` schema of the installation template, checked with an
  HNSW query in `postgres/verify.sql`. The SDK's `assert_sql_confined` fails on SQL that
  names any schema but the server's own, `_extensions` included.
- Embedding is an MCP server, multimodal (ordered text, image, audio and video parts, media
  by artifact ID), `google/embeddinggemma-2`, 768 dimensions by default with 512, 256 and
  128 by Matryoshka truncation, prompt names including `SearchQuery` and `Document`. Its
  `contract` feature depends on Artifact's (`ArtifactId`, `MediaType`, `ObjectSize`,
  `SignedTransfer`) because it reads media through Artifact as the caller. Artifact calling
  Embedding would therefore close a dependency cycle.
- The Hub keeps upstream `_meta` and contents, routes `subscriptions/listen`, and commits an
  `mcp.read` audit record before a read is delivered.
- Skills (PLAN section 15) carry agent guidance; the SDK serves `{scheme}://docs` with
  build-time digests, which is the old docs collection's revision rule.
- The agent is OpenCode, not the monorepo's agent kernel.

## Choice

Three shapes were weighed with the user: one central index under a service identity (the
monorepo's), each server searching its own records with a thin fan-out server, and each
server searching its own records with clients fanning out. The user chose the second family
with shared code, no indexing of server documents, minimal machinery, multimodal embeddings,
and one common contract that every server expresses. The typed calls above rule out a fan-out
server for now, so clients fan out, and a fused search is in Later.

Inferences, not verified: Cargo leaves an optional dependency out of the lock when no
feature in the graph enables it, so two repositories pinning each other's `contract`
feature resolve without a cycle; this needs a build to confirm.
