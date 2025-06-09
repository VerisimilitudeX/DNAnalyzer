#!/bin/bash
cd /Volumes/T9/DNAnalyzer

echo "=== Running DNAnalyzer with DETAILED analysis ==="
java -jar build/libs/DNAnalyzer-1.2.1.jar --detailed --verbose assets/dna/example/test.fa 2>&1

echo -e "\n=== Running with REVERSE COMPLEMENT ==="
java -jar build/libs/DNAnalyzer-1.2.1.jar --rcomplement assets/dna/example/test.fa 2>&1

echo -e "\n=== Running with MUTATION GENERATION (5 mutations) ==="
java -jar build/libs/DNAnalyzer-1.2.1.jar --mutate=5 assets/dna/example/test.fa 2>&1 