package example;

import DNAnalyzer.plugin.DNAnalyzerPlugin;
import DNAnalyzer.utils.core.DNATools;
import java.io.PrintStream;
import java.util.HashMap;
import java.util.Map;

/** Example plugin that counts dinucleotide frequencies in a DNA sequence. */
public class DinucleotidePlugin implements DNAnalyzerPlugin {

  @Override
  public void analyze(DNATools dna, PrintStream out) {
    String seq = dna.getDna().toUpperCase();
    Map<String, Integer> counts = new HashMap<>();
    for (int i = 0; i < seq.length() - 1; i++) {
      String pair = seq.substring(i, i + 2);
      counts.merge(pair, 1, Integer::sum);
    }
    out.println("Dinucleotide counts:");
    counts.forEach((k, v) -> out.println(k + ": " + v));
  }
}
