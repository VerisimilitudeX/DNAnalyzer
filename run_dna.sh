#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/scripts/launcher-common.sh"

dnanalyzer_init "$SCRIPT_DIR"

echo "Running DNAnalyzer..."
dnanalyzer_run "$SCRIPT_DIR/assets/dna/example/test.fa"
