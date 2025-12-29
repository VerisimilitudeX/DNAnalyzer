package DNAnalyzer.analysis;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

/**
 * Minimal polygenic risk score calculator. Supports 23andMe-style text files and CSV weight tables
 * formatted as rsid[,allele],weight.
 */
public final class PolygenicRiskCalculator {
  public Result calculate(Path genotypeFile, Path weightFile) throws IOException {
    Map<String, String> genotypes = loadGenotypes(genotypeFile);
    List<Weight> weights = loadWeights(weightFile);
    double score = 0.0;
    int used = 0;
    List<String> missing = new ArrayList<>();
    for (Weight weight : weights) {
      String genotype = genotypes.get(weight.rsid);
      if (genotype == null) {
        missing.add(weight.rsid);
        continue;
      }
      int alleleCount = countAllele(genotype, weight.allele);
      if (alleleCount > 0) {
        score += alleleCount * weight.weight;
        used++;
      }
    }
    return new Result(score, used, missing);
  }

  private Map<String, String> loadGenotypes(Path file) throws IOException {
    Map<String, String> map = new HashMap<>();
    try (BufferedReader reader = Files.newBufferedReader(file, StandardCharsets.UTF_8)) {
      String line;
      while ((line = reader.readLine()) != null) {
        if (line.startsWith("#")) {
          continue;
        }
        String[] parts = line.split("\t");
        if (parts.length < 4) {
          continue;
        }
        map.put(parts[0], parts[3].toUpperCase(Locale.ROOT));
      }
    }
    return map;
  }

  private List<Weight> loadWeights(Path file) throws IOException {
    List<Weight> weights = new ArrayList<>();
    try (BufferedReader reader = Files.newBufferedReader(file, StandardCharsets.UTF_8)) {
      String header = reader.readLine();
      if (header == null) {
        return weights;
      }
      Weight first = parseWeightLine(header, true);
      if (first != null) {
        weights.add(first);
      }
      String line;
      while ((line = reader.readLine()) != null) {
        Weight weight = parseWeightLine(line, false);
        if (weight != null) {
          weights.add(weight);
        }
      }
    }
    return weights;
  }

  private Weight parseWeightLine(String line, boolean allowHeader) {
    String[] parts = line.split(",");
    if (allowHeader && parts[0].equalsIgnoreCase("rsid")) {
      return null;
    }
    String rsid = parts[0].trim();
    String allele =
        parts.length == 3
            ? parts[1].trim().toUpperCase(Locale.ROOT)
            : "A"; // default risk allele when unspecified
    double weight = Double.parseDouble(parts[parts.length - 1]);
    return new Weight(rsid, allele, weight);
  }

  private int countAllele(String genotype, String allele) {
    if (genotype == null || genotype.isBlank()) {
      return 0;
    }
    if (allele.length() != 1) {
      return genotype.split("").length; // fallback
    }
    char target = allele.charAt(0);
    int count = 0;
    for (char c : genotype.toCharArray()) {
      if (c == target) {
        count++;
      }
    }
    return count;
  }

  public record Result(double score, int lociUsed, List<String> missingLoci) {}

  private record Weight(String rsid, String allele, double weight) {}
}
