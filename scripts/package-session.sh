#!/usr/bin/env bash
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: $0 <fasta_file> [DNAnalyzer options]" >&2
  exit 1
fi

RAW_INPUT="$1"
INPUT=
if [ -e "$RAW_INPUT" ]; then
  INPUT="$(cd "$(dirname "$RAW_INPUT")" && pwd -P)/$(basename "$RAW_INPUT")"
else
  echo "Input FASTA file not found: $RAW_INPUT" >&2
  exit 1
fi
shift || true

SESSION_DIR="session_$(date +%Y%m%d_%H%M%S)"
mkdir "$SESSION_DIR"
LOG_FILE="$SESSION_DIR/analysis.log"
REPORT_FILE="$SESSION_DIR/report.html"

# Run DNAnalyzer CLI and capture output
java -jar lib/DNAnalyzer.jar "$INPUT" "$@" --detailed > "$LOG_FILE" 2>&1

# Generate HTML report using existing utilities
cat > "$SESSION_DIR/GenerateReport.java" <<'JAVA'
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class GenerateReport {
  private static final class BasePairCounter {
    private final long[] counts = new long[5]; // A, T, G, C, Unknown

    BasePairCounter(String fastaContents) {
      for (String line : fastaContents.split("\n")) {
        if (line.isEmpty() || line.charAt(0) == '>') {
          continue;
        }
        for (int i = 0; i < line.length(); i++) {
          char c = Character.toUpperCase(line.charAt(i));
          switch (c) {
            case 'A':
              counts[0]++;
              break;
            case 'T':
              counts[1]++;
              break;
            case 'G':
              counts[2]++;
              break;
            case 'C':
              counts[3]++;
              break;
            default:
              if (!Character.isWhitespace(c)) {
                counts[4]++;
              }
          }
        }
      }
    }

    long[] getCounts() {
      return counts;
    }

    long getTotal() {
      return counts[0] + counts[1] + counts[2] + counts[3] + counts[4];
    }
  }

  private static final class AnalysisResult {
    final long adenine;
    final long thymine;
    final long guanine;
    final long cytosine;
    final long unknown;

    AnalysisResult(long a, long t, long g, long c, long u) {
      this.adenine = a;
      this.thymine = t;
      this.guanine = g;
      this.cytosine = c;
      this.unknown = u;
    }
  }

  private static final class ReportGenerator {
    static String generate(AnalysisResult result, long total) {
      StringBuilder html = new StringBuilder();
      html.append("<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\">");
      html.append("<title>DNAnalyzer Report</title>");
      html.append("<style>body{font-family:Arial,sans-serif;margin:2rem;}table{border-collapse:collapse;}th,td{border:1px solid #ccc;padding:0.5rem 1rem;text-align:left;}th{background:#f5f5f5;}</style>");
      html.append("</head><body><h1>DNAnalyzer Summary</h1>");
      html.append("<p>Total bases analyzed: ").append(total).append("</p>");
      html.append("<table><thead><tr><th>Base</th><th>Count</th><th>Percent</th></tr></thead><tbody>");
      addRow(html, "Adenine", result.adenine, total);
      addRow(html, "Thymine", result.thymine, total);
      addRow(html, "Guanine", result.guanine, total);
      addRow(html, "Cytosine", result.cytosine, total);
      addRow(html, "Unknown", result.unknown, total);
      html.append("</tbody></table>");
      html.append("<p>Session generated at ").append(java.time.ZonedDateTime.now()).append("</p>");
      html.append("</body></html>");
      return html.toString();
    }

    private static void addRow(StringBuilder html, String name, long count, long total) {
      double percent = total == 0 ? 0.0 : (count * 100.0) / total;
      html.append("<tr><td>").append(name).append("</td><td>").append(count).append("</td><td>");
      html.append(String.format(java.util.Locale.US, "%.2f%%", percent)).append("</td></tr>");
    }
  }

  public static void main(String[] args) throws IOException {
    if (args.length != 2) {
      throw new IllegalArgumentException("Usage: GenerateReport <input> <output>");
    }

    Path input = Paths.get(args[0]);
    Path output = Paths.get(args[1]);

    String dna = Files.readString(input, StandardCharsets.UTF_8);
    BasePairCounter counter = new BasePairCounter(dna);
    long[] counts = counter.getCounts();

    AnalysisResult result = new AnalysisResult(counts[0], counts[1], counts[2], counts[3], counts[4]);
    String report = ReportGenerator.generate(result, counter.getTotal());
    Files.writeString(output, report, StandardCharsets.UTF_8);
  }
}
JAVA

javac "$SESSION_DIR/GenerateReport.java"
java -cp "$SESSION_DIR" GenerateReport "$INPUT" "$REPORT_FILE"

# Copy input and any QC chart
cp "$INPUT" "$SESSION_DIR/"
if [ -f "assets/reports/$(basename "$INPUT")_qc.png" ]; then
  cp "assets/reports/$(basename "$INPUT")_qc.png" "$SESSION_DIR/"
fi

zip -r "${SESSION_DIR}.zip" "$SESSION_DIR" >/dev/null
printf '\nSession packaged at %s.zip\n' "$SESSION_DIR"
