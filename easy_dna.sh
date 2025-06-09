#!/bin/bash
cd /Volumes/T9/DNAnalyzer

echo "🧬 DNAnalyzer Easy Mode 🧬"
echo "=========================="
echo ""

# Check if DNA file is provided
if [ "$1" = "" ]; then
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
    echo ""
    echo "Examples:"
    echo "  $0 assets/dna/example/test.fa"
    echo "  $0 assets/dna/example/test.fa detailed"
    echo "  $0 assets/dna/example/test.fa mutations"
    exit 0
fi

DNA_FILE="$1"
MODE="${2:-basic}"

if [ ! -f "$DNA_FILE" ]; then
    echo "❌ Error: DNA file '$DNA_FILE' not found!"
    exit 1
fi

echo "📁 Analyzing: $DNA_FILE"
echo "🔬 Mode: $MODE"
echo ""

case $MODE in
    "basic")
        echo "🔍 Running basic analysis..."
        java -jar build/libs/DNAnalyzer-1.2.1.jar "$DNA_FILE"
        ;;
    "detailed")
        echo "🔍 Running detailed analysis with verbose output..."
        java -jar build/libs/DNAnalyzer-1.2.1.jar --detailed --verbose "$DNA_FILE"
        ;;
    "quick")
        echo "⚡ Running quick analysis..."
        java -jar build/libs/DNAnalyzer-1.2.1.jar --quick "$DNA_FILE"
        ;;
    "mutations")
        echo "🧪 Generating mutations..."
        java -jar build/libs/DNAnalyzer-1.2.1.jar --mutate=5 "$DNA_FILE"
        ;;
    "reverse")
        echo "↔️ Running reverse complement analysis..."
        java -jar build/libs/DNAnalyzer-1.2.1.jar --rcomplement "$DNA_FILE"
        ;;
    "all")
        echo "🎯 Running ALL analysis types..."
        echo ""
        echo "1️⃣ BASIC ANALYSIS:"
        java -jar build/libs/DNAnalyzer-1.2.1.jar "$DNA_FILE"
        echo ""
        echo "2️⃣ DETAILED ANALYSIS:"
        java -jar build/libs/DNAnalyzer-1.2.1.jar --detailed --verbose "$DNA_FILE"
        echo ""
        echo "3️⃣ MUTATIONS:"
        java -jar build/libs/DNAnalyzer-1.2.1.jar --mutate=3 "$DNA_FILE"
        echo ""
        echo "4️⃣ REVERSE COMPLEMENT:"
        java -jar build/libs/DNAnalyzer-1.2.1.jar --rcomplement "$DNA_FILE"
        ;;
    "custom")
        echo "🎛️ Custom analysis mode:"
        echo ""
        echo "Select analysis options (y/n):"
        read -p "Detailed analysis? (y/n): " detailed
        read -p "Verbose output? (y/n): " verbose
        read -p "Generate mutations? (y/n): " mutations
        read -p "Reverse complement? (y/n): " reverse
        
        ARGS=""
        [ "$detailed" = "y" ] && ARGS="$ARGS --detailed"
        [ "$verbose" = "y" ] && ARGS="$ARGS --verbose"
        [ "$mutations" = "y" ] && ARGS="$ARGS --mutate=5"
        [ "$reverse" = "y" ] && ARGS="$ARGS --rcomplement"
        
        echo ""
        echo "🔍 Running custom analysis with: $ARGS"
        java -jar build/libs/DNAnalyzer-1.2.1.jar $ARGS "$DNA_FILE"
        ;;
    *)
        echo "❌ Unknown mode: $MODE"
        echo "Available modes: basic, detailed, quick, mutations, reverse, all, custom"
        exit 1
        ;;
esac

echo ""
echo "✅ Analysis complete!" 