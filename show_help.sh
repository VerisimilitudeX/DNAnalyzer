#!/bin/bash
cd /Volumes/T9/DNAnalyzer

echo "=== DNAnalyzer Version ==="
java -jar build/libs/DNAnalyzer-1.2.1.jar --version 2>&1

echo -e "\n=== DNAnalyzer Help ==="
java -jar build/libs/DNAnalyzer-1.2.1.jar --help 2>&1 