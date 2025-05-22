# Reproducible Development Environment

This repository provides a container-based setup so you can develop and test DNAnalyzer consistently across local and cloud machines.

## Requirements
- Docker 20+
- Git

## Building the Container

From the repository root run:
```bash
docker build -f .devcontainer/Dockerfile -t dnanalyzer-dev .
```

Start an interactive shell with:
```bash
docker run --rm -it -p 8080:8080 -v $(pwd):/workspace dnanalyzer-dev
```

The container executes `./scripts/run-tests.sh` after creation to verify the toolchain.

## Codespaces

GitHub Codespaces automatically uses the `.devcontainer` folder. After opening a codespace, tests run and you can start coding immediately.

## Deployment Hooks

- `gradle-publish.yml` publishes artifacts on release.
- `static.yml` deploys the `web/` directory to GitHub Pages when changes are pushed to `main`.

Modify these workflows if you add new deployment targets.
