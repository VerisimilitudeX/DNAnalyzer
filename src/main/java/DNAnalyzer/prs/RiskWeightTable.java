package DNAnalyzer.prs;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Locale;

/** Represents a set of SNP weights for computing polygenic risk scores. */
public final class RiskWeightTable {

  private final String name;
  private final List<RiskWeightEntry> entries;

  private RiskWeightTable(String name, List<RiskWeightEntry> entries) {
    this.name = name;
    this.entries = entries;
  }

  public static RiskWeightTable fromCsv(Path path) throws IOException {
    if (!Files.exists(path)) {
      throw new IOException("Risk weight file not found: " + path);
    }

    List<RiskWeightEntry> items = new ArrayList<>();

    int lineNumber = 0;
    for (String rawLine : Files.readAllLines(path, StandardCharsets.UTF_8)) {
      lineNumber++;
      String line = rawLine.trim();
      if (line.isEmpty() || line.startsWith("#")) {
        continue;
      }

      String[] tokens = line.split(",");
      if (tokens.length < 3) {
        throw new IOException("Malformed weight line " + lineNumber + " in " + path);
      }

      String rsid = strip(tokens[0]);
      String allele = strip(tokens[1]).toUpperCase(Locale.US);
      String weightToken = strip(tokens[2]);

      if (isHeader(rsid, allele, weightToken)) {
        continue;
      }

      double weight;
      try {
        weight = Double.parseDouble(weightToken);
      } catch (NumberFormatException ex) {
        throw new IOException("Invalid numeric weight on line " + lineNumber + " in " + path, ex);
      }

      if (rsid.isEmpty() || allele.isEmpty()) {
        throw new IOException("Missing rsID or allele on line " + lineNumber + " in " + path);
      }

      items.add(new RiskWeightEntry(rsid, allele, weight));
    }

    if (items.isEmpty()) {
      throw new IOException("Risk weight file contained no variants: " + path);
    }

    String fileName = path.getFileName() != null ? path.getFileName().toString() : path.toString();
    String name = fileName.replaceFirst("\\.csv$", "");

    return new RiskWeightTable(name, Collections.unmodifiableList(items));
  }

  private static String strip(String token) {
    return token == null ? "" : token.trim().replace("\"", "");
  }

  private static boolean isHeader(String rsid, String allele, String weight) {
    String upperRsid = rsid.toUpperCase(Locale.US);
    String upperAllele = allele.toUpperCase(Locale.US);
    return upperRsid.contains("SNP") && upperAllele.contains("ALLELE")
        || upperRsid.contains("RSID") && upperAllele.contains("ALLELE");
  }

  public String name() {
    return name;
  }

  public List<RiskWeightEntry> entries() {
    return entries;
  }

  /** A single SNP weight. */
  public record RiskWeightEntry(String rsid, String riskAllele, double weight) {}
}
