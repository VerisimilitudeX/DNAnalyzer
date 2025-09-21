package DNAnalyzer.analysis;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

/**
 * Searches for curated neurological marker motifs. The motifs are simplified consensus sequences
 * sourced from public literature for demonstrative purposes only.
 */
public final class NeurologicalMarkerAnalyzer {
  private final List<Marker> markers =
      List.of(
          new Marker("BDNF", "Brain-derived neurotrophic factor promoter IV", "TGGGCGCGGAGTT"),
          new Marker("COMT", "Catechol-O-methyltransferase Val158Met site", "GATGACCTGGA"),
          new Marker("SLC6A4", "Serotonin transporter-linked polymorphic region", "GAGGCGGGGCG"),
          new Marker("DRD2", "Dopamine receptor D2 promoter", "CCCTGCCTCTGC"),
          new Marker("HTR2A", "Serotonin receptor 2A regulatory motif", "AGACCCCTGTCA"));

  public List<MarkerHit> scan(String sequence) {
    String upper = sequence.toUpperCase(Locale.ROOT);
    List<MarkerHit> hits = new ArrayList<>();
    for (Marker marker : markers) {
      String motif = marker.motif();
      int index = upper.indexOf(motif);
      while (index >= 0) {
        hits.add(new MarkerHit(marker, index));
        index = upper.indexOf(motif, index + 1);
      }
    }
    return hits;
  }

  public record Marker(String name, String description, String motif) {}

  public record MarkerHit(Marker marker, int position) {}
}
