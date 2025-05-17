package DNAnalyzer.core;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import org.json.JSONObject;

/** Provides a simple on-device ancestry inference using reference panels. */
public class AncestrySnapshot {

  private static final Path REFERENCE_PATH = Path.of("assets/ancestry/continental_reference.json");

  private final Map<String, Map<String, String>> referencePanels = new HashMap<>();

  /** Load reference panels from the bundled JSON file. */
  public AncestrySnapshot() throws IOException {
    String json = Files.readString(REFERENCE_PATH);
    JSONObject obj = new JSONObject(json);
    Iterator<String> keys = obj.keys();
    while (keys.hasNext()) {
      String continent = keys.next();
      JSONObject snps = obj.getJSONObject(continent);
      Map<String, String> panel = new HashMap<>();
      Iterator<String> snpKeys = snps.keys();
      while (snpKeys.hasNext()) {
        String rsid = snpKeys.next();
        panel.put(rsid, snps.getString(rsid));
      }
      referencePanels.put(continent, panel);
    }
  }

  /**
   * Infer continental ancestry from a map of SNP genotypes.
   *
   * @param snpData map of rsid to genotype
   * @return mapping of continent to match percentage
   */
  public Map<String, Double> inferAncestry(Map<String, String> snpData) {
    Map<String, Double> results = new HashMap<>();
    for (Map.Entry<String, Map<String, String>> entry : referencePanels.entrySet()) {
      String continent = entry.getKey();
      Map<String, String> panel = entry.getValue();
      int matches = 0;
      for (Map.Entry<String, String> snp : panel.entrySet()) {
        String userGenotype = snpData.get(snp.getKey());
        if (userGenotype != null && userGenotype.contains(snp.getValue())) {
          matches++;
        }
      }
      double percentage = 100.0 * matches / panel.size();
      results.put(continent, percentage);
    }
    return results;
  }
}
