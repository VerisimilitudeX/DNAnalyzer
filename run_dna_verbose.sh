#!/bin/bash
cd /Volumes/T9/DNAnalyzer

echo "Running DNAnalyzer with verbose output..."
java -jar build/libs/DNAnalyzer-1.2.1.jar --verbose assets/dna/example/test.fa 2>&1 