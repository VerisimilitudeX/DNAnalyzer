#!/usr/bin/env bash
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: $0 <fasta_file> [DNAnalyzer options]" >&2
  exit 1
fi

INPUT="$1"
shift || true

SESSION_DIR="session_$(date +%Y%m%d_%H%M%S)"
mkdir "$SESSION_DIR"
LOG_FILE="$SESSION_DIR/analysis.log"
REPORT_FILE="$SESSION_DIR/report.html"

# Run DNAnalyzer CLI and capture output
java -jar lib/DNAnalyzer.jar "$INPUT" "$@" --detailed > "$LOG_FILE" 2>&1

# Generate HTML report using existing utilities
cat > "$SESSION_DIR/GenerateReport.java" <<'JAVA'
import DNAnalyzer.report.AnalysisResult;
import DNAnalyzer.report.ReportGenerator;
import DNAnalyzer.utils.core.BasePairCounter;
import java.nio.file.Files;
import java.nio.file.Paths;

public class GenerateReport {
  public static void main(String[] args) throws Exception {
    String dna = new String(Files.readAllBytes(Paths.get(args[0])));
    BasePairCounter counter = new BasePairCounter(dna);
    counter.countAdenine().countThymine().countGuanine().countCytosine().countUnknown();
    long[] counts = counter.getCounts();
    ReportGenerator.generateReport(
        new AnalysisResult(counts[0], counts[1], counts[2], counts[3], counts[4]),
        Paths.get(args[1]));
  }
}
JAVA

javac -cp lib/DNAnalyzer.jar "$SESSION_DIR/GenerateReport.java"
java -cp lib/DNAnalyzer.jar:"$SESSION_DIR" GenerateReport "$INPUT" "$REPORT_FILE"

# Copy input and any QC chart
cp "$INPUT" "$SESSION_DIR/"
if [ -f "assets/reports/$(basename "$INPUT")_qc.png" ]; then
  cp "assets/reports/$(basename "$INPUT")_qc.png" "$SESSION_DIR/"
fi

zip -r "${SESSION_DIR}.zip" "$SESSION_DIR" >/dev/null
printf '\nSession packaged at %s.zip\n' "$SESSION_DIR"
