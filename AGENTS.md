# Agent Guide

This file is the entry point for agentic AI and automation tools. It tells an
agent what the repository is, where things live, and how to make changes
safely. Keep it short. Link out for detail.

## What this repository is

DNAnalyzer is a Java 17 + Spring Boot 2.7 application with a static-HTML web
dashboard and an optional Python Smith-Waterman module. It ships two
interfaces on the same analysis core:

1. **CLI**: `DNAnalyzer.Main` in `src/main/java/DNAnalyzer/`.
2. **REST API**: `DNAnalyzer.api.ApiApplication`, mounted under `/api/v1`.

The `org.openjfx.javafxplugin` is still declared in `build.gradle` from an
earlier GUI experiment, but no JavaFX source code is present.

The static frontend lives in `web/`. It is served by Nginx in the Docker
stack and proxies `/api/*` to the Spring Boot container.

## Canonical references for agents

Read these in order when you are new to the repo:

1. [`README.md`](README.md) for the user-facing overview.
2. [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the system diagram and
   component responsibilities.
3. [`docs/REPOSITORY_MAP.md`](docs/REPOSITORY_MAP.md) for a directory-by-
   directory index.
4. [`docs/API_REFERENCE.md`](docs/API_REFERENCE.md) for REST and CLI surface.
5. [`docs/development/testing.md`](docs/development/testing.md) for how to
   run and extend tests.

If an agent makes changes that would invalidate any of the above, update that
doc in the same change.

## Build and verify

Always run the verification pipeline after a code change:

```bash
./gradlew test                     # Unit + integration tests (22 as of 2026-04)
./gradlew build -x test            # Produces build/libs/DNAnalyzer-<ver>-boot.jar
                                   # and DNAnalyzer-<ver>-plain.jar
docker compose config --quiet      # Validates docker-compose.yml
```

The bootJar has `Start-Class: DNAnalyzer.api.ApiApplication`. The plain jar
has `Main-Class: DNAnalyzer.Main` (CLI). Do not confuse them.

## Conventions that agents frequently get wrong

1. **Jar filenames.** After the Spring Boot classifier change, the API jar is
   `DNAnalyzer-<ver>-boot.jar` and the CLI jar is `DNAnalyzer-<ver>-plain.jar`.
   Do not write `DNAnalyzer-<ver>.jar`; that file no longer exists.
2. **Python dependencies.** `src/python/gpu_smith_waterman.py` deliberately
   avoids `numpy` in the CPU fallback. If you add a numpy import, gate it
   behind `try/except ImportError` and keep the CPU path pure Python.
3. **Shell scripts.** The user-facing entry point `easy_dna.sh` lives at the
   repo root. All other shell scripts live in `scripts/`. Scripts moved into
   `scripts/` must declare both `SCRIPT_DIR` (their own directory) and
   `REPO_ROOT` (one level up) and use `REPO_ROOT` for repo-level paths.
4. **Workflows.** Security-sensitive workflows
   (`.github/workflows/scorecard.yml`) pin third-party actions by commit SHA,
   not by tag. Preserve this when editing them.
5. **No pre-built artifacts in git.** `lib/*.jar`, `*.zip`, `*.rar` are
   gitignored. Build outputs belong in `build/libs/` (also gitignored).

## Style rules

1. **No em-dashes (-) and no emojis in documentation or user-facing strings.**
   The strip pass uses `scripts/strip-emdash-emoji.py`. Run it before opening
   a PR that touches Markdown.
2. **No invented metrics.** The impact-metrics table in `README.md` is
   refreshed from the GitHub API by `.github/workflows/metrics-refresh.yml`.
   Do not edit it by hand.
3. **Commit messages follow Conventional Commits.** Prefixes in use:
   `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`, `ci:`.

## Where to find the data flow

For a specific endpoint, follow this trail:

| Layer | Location |
|---|---|
| HTTP routing | `src/main/java/DNAnalyzer/api/controller/` |
| Request/response DTOs | `src/main/java/DNAnalyzer/api/dto/` |
| Business logic | `src/main/java/DNAnalyzer/api/service/` |
| Analysis primitives | `DNAnalyzer/analysis/`, `DNAnalyzer/align/`, `DNAnalyzer/ancestry/`, `DNAnalyzer/prs/` |
| File parsing | `DNAnalyzer/io/` |
| Output writers | `DNAnalyzer/output/`, `DNAnalyzer/reporting/` |

The live module dependency graph is auto-generated and rendered inside
[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) between
`<!-- MODULE-GRAPH:START -->` and `<!-- MODULE-GRAPH:END -->` markers. Do
not edit that block manually; run `python3 scripts/generate-module-graph.py`
or let the `architecture-sync.yml` workflow regenerate it.

## Safety rails

- Do not commit secrets. GitGuardian runs on every push.
- Do not disable `--no-verify` or `--no-gpg-sign` in git hooks.
- Do not widen permissions in `.github/workflows/*.yml` without reason.
- If a task seems to require deleting test fixtures under `assets/dna/`,
  stop and ask: those are public-domain reference sequences.

## Support channels

- Issues and PRs: <https://github.com/VerisimilitudeX/DNAnalyzer>
- Security disclosures: <https://github.com/VerisimilitudeX/DNAnalyzer/security/advisories/new>
- General questions: <help@dnanalyzer.org>
