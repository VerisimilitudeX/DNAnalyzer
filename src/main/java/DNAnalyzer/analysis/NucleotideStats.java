package DNAnalyzer.analysis;

import java.util.EnumMap;
import java.util.Locale;
import java.util.Map;

/** Basic GC content and nucleotide counts. */
public final class NucleotideStats {
  public enum Base {
    A,
    T,
    G,
    C,
    N
  }

  private final Map<Base, Integer> counts = new EnumMap<>(Base.class);
  private final double gcContent;

  private NucleotideStats(String sequence) {
    for (Base base : Base.values()) {
      counts.put(base, 0);
    }
    int gc = 0;
    char[] chars = sequence.toUpperCase(Locale.ROOT).toCharArray();
    for (char c : chars) {
      switch (c) {
        case 'A' -> counts.compute(Base.A, (k, v) -> v + 1);
        case 'T' -> counts.compute(Base.T, (k, v) -> v + 1);
        case 'G' -> {
          counts.compute(Base.G, (k, v) -> v + 1);
          gc++;
        }
        case 'C' -> {
          counts.compute(Base.C, (k, v) -> v + 1);
          gc++;
        }
        default -> counts.compute(Base.N, (k, v) -> v + 1);
      }
    }
    this.gcContent = chars.length == 0 ? 0.0 : (double) gc / chars.length;
  }

  public static NucleotideStats compute(String sequence) {
    return new NucleotideStats(sequence);
  }

  public Map<Base, Integer> counts() {
    return counts;
  }

  public double gcContent() {
    return gcContent;
  }
}
