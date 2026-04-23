# Architecture

This document explains the moving parts of DNAnalyzer, how they interact, and
where to make changes. Diagrams render as Mermaid on GitHub.

## System overview

DNAnalyzer exposes a shared analysis core through two interfaces. The web
dashboard talks to the REST API over HTTP; the CLI embeds the core directly
in the JVM.

```mermaid
flowchart LR
    user[User / CLI / Browser]
    subgraph frontend[Frontends]
        cli[CLI<br/>DNAnalyzer.Main]
        web[Web Dashboard<br/>web/ served by Nginx]
    end
    subgraph api[REST Layer]
        rest[Spring Boot API<br/>DNAnalyzer.api.ApiApplication]
    end
    subgraph core[Analysis Core]
        services[Services<br/>api/service]
        analysis[analysis]
        align[align]
        ancestry[ancestry]
        prs[prs]
        io[io]
        reporting[reporting]
        output[output]
    end
    python[Python Smith-Waterman<br/>src/python/gpu_smith_waterman.py]

    user --> cli
    user --> web
    web -->|/api/*| rest
    cli --> services
    rest --> services
    services --> analysis
    services --> align
    services --> ancestry
    services --> prs
    analysis --> io
    align -->|subprocess| python
    services --> reporting
    reporting --> output
```

## Component responsibilities

| Component | Source | Responsibility |
|---|---|---|
| CLI | `DNAnalyzer/Main.java`, `DNAnalyzer/cli/` | picocli entry point for batch analysis |
| REST API | `DNAnalyzer/api/` | Spring Boot controllers, DTOs, services |
| Analysis core | `DNAnalyzer/analysis/` | Base-pair counting, reading frames, protein finding |
| Alignment | `DNAnalyzer/align/` | Smith-Waterman wrapper; invokes Python for GPU path |
| Ancestry | `DNAnalyzer/ancestry/` | Continental-origin estimation from 23andMe/AncestryDNA exports |
| PRS | `DNAnalyzer/prs/` | Polygenic-risk-score calculation and per-SNP contribution |
| I/O | `DNAnalyzer/io/` | FASTA, FASTQ, and plain-text parsing |
| Reporting | `DNAnalyzer/reporting/` | Text reports and AI-narrated summaries |
| Output | `DNAnalyzer/output/` | Disk layout for timestamped run directories |
| Core utilities | `DNAnalyzer/core/`, `DNAnalyzer/util/` | Common helpers |
| Python bridge | `src/python/gpu_smith_waterman.py` | PyOpenCL GPU path with pure-Python CPU fallback |

## Request flow: `POST /api/v1/analyze`

```mermaid
sequenceDiagram
    participant C as Client
    participant Ctl as AnalyzeController
    participant Svc as SequenceAnalysisService
    participant IO as io (FASTA parser)
    participant An as analysis
    participant Rep as reporting

    C->>Ctl: POST /api/v1/analyze (multipart)
    Ctl->>IO: parse(sequence file)
    IO-->>Ctl: Sequence record
    Ctl->>Svc: analyze(sequence, options)
    Svc->>An: analyzeBasePairs()
    Svc->>An: analyzeReadingFrames()
    Svc->>An: findProteins()
    An-->>Svc: metrics
    Svc->>Rep: compose AI narratives (optional)
    Rep-->>Svc: summaries
    Svc-->>Ctl: AnalysisResponse DTO
    Ctl-->>C: 200 OK (JSON)
```

## Build and deployment pipeline

```mermaid
flowchart LR
    src[src/main/java]
    gradle[Gradle build]
    boot[DNAnalyzer-VER-boot.jar<br/>Spring Boot API]
    plain[DNAnalyzer-VER-plain.jar<br/>CLI fat jar]

    subgraph docker[Docker Compose]
        api[api container<br/>Temurin JRE + boot jar]
        web[web container<br/>Nginx + web/]
    end

    src --> gradle
    gradle --> boot
    gradle --> plain
    boot --> api
    api -->|/api| web
```

## Auto-generated module graph

The block below is produced by `scripts/generate-module-graph.py` from live
package imports in `src/main/java/DNAnalyzer/`. It is refreshed by the
`architecture-sync.yml` GitHub Actions workflow on every push to `main` and
on pull requests that touch `src/main/java/**`. Do not edit the block
manually.

<!-- MODULE-GRAPH:START -->
```mermaid
flowchart LR
    align[align]
    analysis[analysis]
    ancestry[ancestry]
    api[api]
    cli[cli]
    core[core]
    io[io]
    output[output]
    prs[prs]
    reporting[reporting]
    root[root]
    util[util]
    api --> analysis
    api --> ancestry
    api --> prs
    api --> util
    cli --> analysis
    cli --> core
    cli --> io
    cli --> output
    cli --> prs
    cli --> reporting
    cli --> util
    io --> core
    root --> cli
```
<!-- MODULE-GRAPH:END -->

## Static frontend

The static web assets live under `web/`. In local development, `open_web_ui`
launches a Python `http.server` for them and points the browser at the
Spring Boot API on `localhost:8080`. In the Docker stack, Nginx
(`nginx.conf`) serves the static files and proxies `/api/*` to the API
container.

```mermaid
flowchart LR
    browser[Browser]
    nginx[Nginx<br/>:80 / :3000]
    api[Spring Boot API<br/>:8080]
    browser -->|/| nginx
    nginx -->|static files| browser
    browser -->|/api/*| nginx
    nginx -->|proxy_pass| api
```

## Cross-cutting concerns

- **Security.** OpenSSF Scorecard runs weekly; CodeQL runs on every push
  and PR; DeepSource runs on PRs; GitGuardian scans commits for secrets.
  See [SECURITY.md](../SECURITY.md).
- **Dependency hygiene.** Dependabot opens weekly PRs for Gradle, pip,
  Docker, and GitHub Actions. Third-party actions in security-sensitive
  workflows are pinned to commit SHAs.
- **Observability.** The REST API surfaces `/api/v1/status` for health
  checks. There is no central logging sink; logs are per-process.
- **Privacy guarantee.** No analysis data leaves the host. The optional
  AI report generator calls the configured LLM provider only when an API
  key is present and `--no-ai` is not passed.
