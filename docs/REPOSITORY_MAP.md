# Repository Map

Directory-by-directory reference. Read this to find where to make changes.

## Top level

| Path | Purpose |
|---|---|
| `AGENTS.md` | Orientation for AI agents and automation tools |
| `README.md` | User-facing project overview |
| `LICENSE`, `LICENSE_zh.md` | MIT license, English and Simplified Chinese |
| `SECURITY.md` | Security policy and private reporting channels |
| `CODE_OF_CONDUCT.md` | Community standards |
| `CHANGELOG.md` | Release notes |
| `CITATION.cff` | Machine-readable citation metadata |
| `build.gradle`, `settings.gradle.kts` | Gradle build configuration |
| `gradlew`, `gradlew.bat` | Gradle wrapper (invoke Gradle without installing it) |
| `Dockerfile` | Multi-stage image (builder + JRE runtime) for the API |
| `docker-compose.yml` | Two-service stack: api + web (Nginx) |
| `nginx.conf` | Proxy config; `/api/*` to the api container |
| `.dockerignore`, `.gitignore`, `.gitattributes` | VCS and build-context filters |
| `.deepsource.toml` | DeepSource analyzer config (Java + Python) |
| `easy_dna.sh` | Primary user-facing CLI launcher |

## Source code: `src/`

```
src/
  main/
    java/DNAnalyzer/     # Java 17 source
    resources/           # Spring Boot resources (if any)
  python/                # Auxiliary Python modules (Smith-Waterman)
  test/
    java/                # JUnit 5 tests
```

### Java packages: `src/main/java/DNAnalyzer/`

| Package | Purpose | Typical entry point |
|---|---|---|
| root (`Main.java`) | CLI entry point for the application plugin | `DNAnalyzer.Main` |
| `cli/` | picocli command definitions and option parsing | `DNAnalyzer.cli.*Command` |
| `api/` | Spring Boot app, controllers, services, DTOs, exception handlers | `DNAnalyzer.api.ApiApplication` |
| `api/controller/` | HTTP routing; one controller per logical area | `AnalyzeController`, etc. |
| `api/service/` | Business logic; controllers call into these | `SequenceAnalysisService`, `GeneticAnalysisService`, `SequenceFileService` |
| `api/dto/request/` | Request DTOs and `javax.validation` annotations | |
| `api/dto/response/` | Response DTOs returned as JSON | |
| `api/exception/` | `@ControllerAdvice` handlers and typed exceptions | |
| `analysis/` | Base-pair counting, reading frames, protein finding | `SequenceAnalysis` |
| `align/` | Smith-Waterman CLI wrapper; invokes Python | `SmithWatermanAligner` |
| `ancestry/` | Continental-origin estimation from 23andMe/AncestryDNA exports | `AncestryCalculator` |
| `prs/` | Polygenic risk score calculation | `PolygenicRiskCalculator` |
| `io/` | FASTA, FASTQ, plain-text parsing | `FastaParser`, `FastqParser` |
| `reporting/` | Text reports and optional AI-narrated summaries | `AiResponseParser` |
| `output/` | On-disk layout for timestamped run directories | `OutputManager` |
| `core/` | Cross-package primitives | |
| `util/` | Small helpers (validation, formatting) | |

### Python modules: `src/python/`

| File | Purpose |
|---|---|
| `gpu_smith_waterman.py` | Smith-Waterman alignment. PyOpenCL when available; pure-Python CPU fallback otherwise. Invoked by `DNAnalyzer.align.SmithWatermanAligner` |
| `__init__.py` | Package marker |

### Tests: `src/test/java/`

Mirrors the `src/main/java/DNAnalyzer/` layout. Primary suites:

- `DNAnalyzer.api.service.*Test` for REST services
- `DNAnalyzer.analysis.*Test` for analysis primitives
- `DNAnalyzer.prs.PolygenicRiskCalculatorTest`
- `DNAnalyzer.ancestry.AncestrySnapshotTest`
- `DNAnalyzer.align.SmithWatermanAlignerTest` (auto-skips if Python is unavailable)

## Frontend: `web/`

| Path | Purpose |
|---|---|
| `index.html`, `index.js`, `style.css` | Main landing page |
| `dashboard/` | Interactive analysis dashboard that hits the REST API |
| `analyzer/`, `features/`, `about/`, `hiring/` | Static marketing pages |
| `docs/` | Static docs served by the site (generated from `docs/`) |
| `assets/` | Images, icons, static media |
| `server/` | Helpers for local serving |

## Docs: `docs/`

See [`docs/README.md`](README.md) for the full index.

| Path | Purpose |
|---|---|
| `ARCHITECTURE.md` | System diagrams and component responsibilities (this repo-map's sibling) |
| `REPOSITORY_MAP.md` | This file |
| `API_REFERENCE.md` | REST and CLI reference |
| `getting-started.md` | First-time setup |
| `Development_Environment.md` | IDE and toolchain setup |
| `migration-guide.md` | Moving from the pre-REST-API CLI |
| `usage/` | Feature-specific guides (ancestry, PRS, enhanced features) |
| `developer/` | Developer notes (GPU Smith-Waterman, plugin development) |
| `contributing/` | Contribution guidelines and code conventions |
| `research/` | Algorithm references |
| `samples/` | Worked CLI examples |
| `i18n/` | Translations (Simplified Chinese) |
| `history/` | Archived design docs |

## Assets: `assets/`

Test fixtures and reference panels. Do not delete without checking callers.

| Path | Purpose |
|---|---|
| `dna/example/` | Small example FASTA sequences used by scripts and tests |
| `dna/random/` | Synthetic random sequences for CI smoke tests |
| `ancestry/` | Continental ancestry reference panel |
| `risk/` | Polygenic-risk-score weight tables (e.g. `heart_disease_prs.csv`) |
| `demo/` | Demo data for the web dashboard |

## Scripts: `scripts/`

| Script | Purpose |
|---|---|
| `launcher-common.sh` | Sourced helpers used by all launchers; detects the right jar or falls back to `gradle run` |
| `package-session.sh` | Archive a run's inputs, logs, and HTML report into a timestamped ZIP |
| `run-tests.sh` | CI test helper |
| `start-dev-container.sh` | Launch the devcontainer |
| `generate-module-graph.py` | Regenerate the Mermaid module graph in `docs/ARCHITECTURE.md` |
| `strip-emdash-emoji.py` | Normalize Markdown (remove em-dashes and emojis) |
| `demo_all_features.sh`, `show_help.sh`, `run_dna*.sh`, `run_detailed.sh`, `test_enhanced.sh`, `open_web_ui.sh` | Dev conveniences |

The primary user-facing launcher is `easy_dna.sh` at the repo root.

## Containers: `.devcontainer/`, `Dockerfile`, `docker-compose.yml`

| File | Purpose |
|---|---|
| `.devcontainer/devcontainer.json`, `.devcontainer/Dockerfile` | VS Code dev container config |
| `Dockerfile` | Multi-stage production image for the API |
| `docker-compose.yml` | `api` (JRE + boot jar) and `web` (Nginx + `web/`) services |
| `nginx.conf` | Proxy config for the `web` service |

## CI/CD: `.github/`

| File | Purpose |
|---|---|
| `dependabot.yml` | Weekly dep updates for Gradle, pip, Docker, Actions |
| `workflows/gradle.yml` | Build, tests, and GUI-compile smoke check |
| `workflows/codeql.yml` | Weekly + on-push CodeQL analysis |
| `workflows/scorecard.yml` | OpenSSF Scorecard (pinned action SHAs) |
| `workflows/static.yml` | Deploy `web/` to GitHub Pages |
| `workflows/architecture-sync.yml` | Regenerate the module graph in `docs/ARCHITECTURE.md` |
| `workflows/metrics-refresh.yml` | Refresh the impact-metrics table in `README.md` |
| `workflows/auto-stale.yml` | Mark stale issues and PRs |
| `workflows/gradle-publish.yml` | Publish to GitHub Packages on tagged release |
| `workflows/star-reminder.yml`, `workflows/tweet-release.yml` | Community automation |
| `ISSUE_TEMPLATE/` | Bug report and feature request templates |
| `FUNDING.yml` | Sponsor links |

## Plugins: `sample-plugins/`

Standalone Gradle subproject demonstrating the plugin SPI. Start here when
writing a new plugin. Not built as part of the main Gradle build.

## Installer: `installer/`

PowerShell helpers that install a JDK on Windows for users who do not already
have Java 17.

## Paper: `paper/`

Academic manuscript sources (JATS XML).
