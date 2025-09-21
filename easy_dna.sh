#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/scripts/launcher-common.sh"

echo "🧬 DNAnalyzer Easy Mode 🧬"
echo "=========================="
echo ""

if [[ $# -lt 1 ]]; then
  echo "Available sample files:"
  echo "- assets/dna/example/test.fa (test DNA sequence)"
  echo ""
  echo "Usage: $0 <dna_file> [mode]"
  echo ""
  echo "Available modes:"
  echo "  1. basic     - Standard analysis (default)"
  echo "  2. detailed  - Detailed analysis with verbose output"
  echo "  3. quick     - Quick analysis only"
  echo "  4. mutations - Generate mutations (5 random mutations)"
  echo "  5. reverse   - Reverse complement analysis"
  echo "  6. all       - Run all analysis types"
  echo "  7. custom    - Interactive mode to select options"
  exit 0
fi

DNA_FILE="$1"
MODE="${2:-basic}"

if [[ "$DNA_FILE" != /* ]]; then
  DNA_FILE="$PWD/$DNA_FILE"
fi

if [[ ! -f "$DNA_FILE" ]]; then
  echo "❌ Error: DNA file '$DNA_FILE' not found!"
  exit 1
fi

dnanalyzer_init "$SCRIPT_DIR"

if [[ "$DNANALYZER_USE_GRADLE_RUN" == "true" ]]; then
  echo "ℹ️  Using Gradle runtime (feature-complete CLI)."
elif [[ "$DNANALYZER_SUPPORTS_ADVANCED" == "true" ]]; then
  echo "📦 Using DNAnalyzer JAR: $DNANALYZER_JAR_PATH"
else
  echo "⚠️  Using basic DNAnalyzer JAR: $DNANALYZER_JAR_PATH"
  echo "⚠️  Advanced modes require rebuilding with Gradle or providing an updated CLI JAR."
fi

echo "📁 Analyzing: $DNA_FILE"
echo "🔬 Mode: $MODE"
echo ""

run_mode() {
  local message="$1"
  shift
  echo "$message"
  dnanalyzer_run "$@"
  echo ""
}
case "$MODE" in
  basic)
    run_mode "🔍 Running basic analysis..." "$DNA_FILE"
    ;;
  detailed)
    dnanalyzer_require_advanced
    run_mode "🔍 Running detailed analysis with verbose output..." --detailed --verbose "$DNA_FILE"
    ;;
  quick)
    dnanalyzer_require_advanced
    run_mode "⚡ Running quick analysis..." --quick "$DNA_FILE"
    ;;
  mutations)
    dnanalyzer_require_advanced
    run_mode "🧪 Generating mutations..." --mutate 5 "$DNA_FILE"
    ;;
  reverse)
    dnanalyzer_require_advanced
    run_mode "↔️ Running reverse complement analysis..." --rcomplement "$DNA_FILE"
    ;;
  all)
    dnanalyzer_require_advanced
    run_mode "1️⃣ BASIC ANALYSIS:" "$DNA_FILE"
    run_mode "2️⃣ DETAILED ANALYSIS:" --detailed --verbose "$DNA_FILE"
    run_mode "3️⃣ MUTATIONS:" --mutate 3 "$DNA_FILE"
    run_mode "4️⃣ REVERSE COMPLEMENT:" --rcomplement "$DNA_FILE"
    ;;
  custom)
    dnanalyzer_require_advanced
    echo "🎛️ Custom analysis mode:"
    echo ""
    read -r -p "Detailed analysis? (y/n): " detailed
    read -r -p "Verbose output? (y/n): " verbose
    read -r -p "Generate mutations? (y/n): " mutations
    read -r -p "Reverse complement? (y/n): " reverse
    read -r -p "Quick mode? (y/n): " quick

    declare -a args

    [[ "$quick" == "y" ]] && args+=("--quick")
    [[ "$detailed" == "y" ]] && args+=("--detailed")
    [[ "$verbose" == "y" ]] && args+=("--verbose")
    [[ "$mutations" == "y" ]] && args+=("--mutate" "5")
    [[ "$reverse" == "y" ]] && args+=("--rcomplement")

    args+=("$DNA_FILE")

    echo ""
    echo "🔍 Running custom analysis with: ${args[*]}"
    dnanalyzer_run "${args[@]}"
    ;;
  *)
    echo "❌ Unknown mode: $MODE"
    echo "Available modes: basic, detailed, quick, mutations, reverse, all, custom"
    exit 1
    ;;
esac

echo "✅ Analysis complete!"
