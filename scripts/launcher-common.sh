#!/usr/bin/env bash

# Common helpers for DNAnalyzer launcher scripts. These utilities resolve the
# project root, locate a runnable JAR if one exists, and provide a wrapper for
# invoking the CLI via either the JAR or Gradle.

set -euo pipefail

DNANALYZER_ROOT=""
DNANALYZER_JAR_PATH=""
DNANALYZER_GRADLE=""
DNANALYZER_USE_GRADLE_RUN="false"
DNANALYZER_SUPPORTS_ADVANCED="false"

_dnanalyzer_find_local_jar() {
  local candidate

  shopt -s nullglob
  for candidate in "$DNANALYZER_ROOT"/build/libs/*-all.jar; do
    if [[ -f "$candidate" ]]; then
      echo "$candidate"
      shopt -u nullglob
      return 0
    fi
  done

  for candidate in "$DNANALYZER_ROOT"/build/libs/*.jar; do
    if [[ -f "$candidate" ]]; then
      echo "$candidate"
      shopt -u nullglob
      return 0
    fi
  done
  shopt -u nullglob

  return 1
}

_dnanalyzer_escape_args() {
  local escaped=""
  local value
  for value in "$@"; do
    local part
    printf -v part '%q' "$value"
    escaped+=" $part"
  done
  echo "${escaped# }"
}

dnanalyzer_init() {
  if [[ $# -ne 1 ]]; then
    echo "dnanalyzer_init expects the project root path" >&2
    exit 1
  fi

  DNANALYZER_ROOT="$1"
  DNANALYZER_GRADLE="$DNANALYZER_ROOT/gradlew"

  if [[ ! -d "$DNANALYZER_ROOT" ]]; then
    echo "DNAnalyzer root '$DNANALYZER_ROOT' is not a directory" >&2
    exit 1
  fi

  if [[ -n "${DNANALYZER_JAR:-}" ]]; then
    DNANALYZER_JAR_PATH="$DNANALYZER_JAR"
    if [[ ! -f "$DNANALYZER_JAR_PATH" ]]; then
      echo "DNANALYZER_JAR '$DNANALYZER_JAR_PATH' does not exist" >&2
      exit 1
    fi
  else
    DNANALYZER_JAR_PATH="$(_dnanalyzer_find_local_jar || true)"

    if [[ -z "$DNANALYZER_JAR_PATH" && -x "$DNANALYZER_GRADLE" ]]; then
      if "$DNANALYZER_GRADLE" --quiet -x test jar >/dev/null 2>&1; then
        DNANALYZER_JAR_PATH="$(_dnanalyzer_find_local_jar || true)"
      fi
    fi
  fi

  if [[ -n "$DNANALYZER_JAR_PATH" ]]; then
    local help_output
    if help_output=$(java -jar "$DNANALYZER_JAR_PATH" --help 2>&1); then
      if [[ "$help_output" == *"--detailed"* ]] || [[ "$help_output" == *"--mutate"* ]]; then
        DNANALYZER_SUPPORTS_ADVANCED="true"
        DNANALYZER_USE_GRADLE_RUN="false"
        return 0
      fi
      if [[ -x "$DNANALYZER_GRADLE" ]]; then
        DNANALYZER_USE_GRADLE_RUN="true"
        DNANALYZER_SUPPORTS_ADVANCED="true"
        return 0
      fi
      DNANALYZER_SUPPORTS_ADVANCED="false"
      DNANALYZER_USE_GRADLE_RUN="false"
      return 0
    fi

    if [[ -x "$DNANALYZER_GRADLE" ]]; then
      DNANALYZER_USE_GRADLE_RUN="true"
      DNANALYZER_SUPPORTS_ADVANCED="true"
      return 0
    fi
    echo "Unable to execute DNAnalyzer JAR at '$DNANALYZER_JAR_PATH'" >&2
    exit 1
  fi

  if [[ -x "$DNANALYZER_GRADLE" ]]; then
    DNANALYZER_USE_GRADLE_RUN="true"
    DNANALYZER_SUPPORTS_ADVANCED="true"
    return 0
  fi

  echo "Unable to locate a DNAnalyzer JAR and Gradle wrapper is missing" >&2
  exit 1
}

dnanalyzer_run() {
  if [[ "$DNANALYZER_USE_GRADLE_RUN" == "false" ]]; then
    java -jar "$DNANALYZER_JAR_PATH" "$@"
    return
  fi

  local args
  args="$(_dnanalyzer_escape_args "$@")"
  "$DNANALYZER_GRADLE" --quiet run --args="$args"
}

dnanalyzer_require_advanced() {
  if [[ "$DNANALYZER_SUPPORTS_ADVANCED" == "false" ]]; then
    echo "Advanced DNAnalyzer features are not available in this runtime." >&2
    echo "Rebuild with './gradlew jar' or configure DNANALYZER_JAR to a feature-complete CLI." >&2
    exit 1
  fi
}
