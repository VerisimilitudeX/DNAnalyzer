#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/scripts/launcher-common.sh"

dnanalyzer_init "$SCRIPT_DIR"

echo "=== DNAnalyzer Version ==="
dnanalyzer_run --version

echo ""
echo "=== DNAnalyzer Help ==="
dnanalyzer_run --help
