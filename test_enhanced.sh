#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/scripts/launcher-common.sh"

echo "🧬 Testing Enhanced DNAnalyzer with Better Output Organization 🧬"
echo "=================================================================="
echo ""

echo "📋 Building the enhanced version..."
if "$SCRIPT_DIR/gradlew" build -x test >/dev/null 2>&1; then
  echo "✅ Build successful!"
else
  echo "❌ Build failed, continuing with existing runtime..."
fi

dnanalyzer_init "$SCRIPT_DIR"
dnanalyzer_require_advanced

FASTA_FILE="$SCRIPT_DIR/assets/dna/example/test.fa"

echo ""
echo "🔬 Running enhanced analysis..."
dnanalyzer_run "$FASTA_FILE"

echo ""
echo "🧪 Running with mutations to test file organization..."
dnanalyzer_run --mutate 3 "$FASTA_FILE"

echo ""
echo "📁 Checking output directory structure..."
if [[ -d "$SCRIPT_DIR/output" ]]; then
  echo "Output directory structure:"
  find "$SCRIPT_DIR/output" -type f | head -10
else
  echo "No output directory found (expected if using fallback runtime)"
fi
