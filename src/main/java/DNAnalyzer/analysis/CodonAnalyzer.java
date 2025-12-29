package DNAnalyzer.analysis;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

/** Performs codon counting and start/stop based gene discovery. */
public final class CodonAnalyzer {
  private CodonAnalyzer() {}

  public static Map<String, Integer> count(String sequence, int frame) {
    if (frame < 0 || frame > 2) {
      throw new IllegalArgumentException("Reading frame must be 0, 1, or 2");
    }
    Map<String, Integer> counts = new TreeMap<>();
    String upper = sequence.toUpperCase(Locale.ROOT);
    for (int i = frame; i + 2 < upper.length(); i += 3) {
      String codon = upper.substring(i, i + 3);
      counts.merge(codon, 1, Integer::sum);
    }
    return counts;
  }

  public static Map<String, Integer> filterByRange(Map<String, Integer> counts, int min, int max) {
    if (min < 0 || max < min) {
      return Collections.emptyMap();
    }
    Map<String, Integer> filtered = new LinkedHashMap<>();
    for (Map.Entry<String, Integer> entry : counts.entrySet()) {
      int value = entry.getValue();
      if (value >= min && value <= max) {
        filtered.put(entry.getKey(), value);
      }
    }
    return filtered;
  }

  public static List<String> findGenes(String sequence, AminoAcid start) {
    if (start == null) {
      return List.of();
    }
    Set<String> startCodons = start.codons();
    Set<String> stopCodons = AminoAcid.STOP.codons();
    String upper = sequence.toUpperCase(Locale.ROOT);
    int length = upper.length();
    List<String> genes = new ArrayList<>();
    for (int i = 0; i + 2 < length; i++) {
      String startCodon = upper.substring(i, Math.min(i + 3, length));
      if (!startCodons.contains(startCodon)) {
        continue;
      }
      for (int j = i + 3; j + 2 < length; j += 3) {
        String stopCodon = upper.substring(j, j + 3);
        if (stopCodons.contains(stopCodon)) {
          genes.add(upper.substring(i, j + 3));
          break;
        }
      }
    }
    return genes;
  }
}
