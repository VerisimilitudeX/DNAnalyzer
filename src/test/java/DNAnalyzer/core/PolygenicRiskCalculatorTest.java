package DNAnalyzer.core;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.IOException;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;
import org.junit.jupiter.api.Test;

class PolygenicRiskCalculatorTest {

  @Test
  void testLoadWeights() throws IOException {
    Path projectPath = Path.of("");
    Path weightPath = projectPath.resolve("assets/risk/sample_weights.csv");
    Map<String, PolygenicRiskCalculator.RiskWeight> weights =
        PolygenicRiskCalculator.loadWeights(weightPath.toString());
    assertEquals(3, weights.size());
    assertEquals(1.2, weights.get("rs123").weight(), 0.001);
  }

  @Test
  void testComputeScore() {
    Map<String, String> genotype = new HashMap<>();
    genotype.put("rs123", "AA");
    genotype.put("rs456", "AG");
    genotype.put("rs789", "CT");

    Map<String, PolygenicRiskCalculator.RiskWeight> weights = new HashMap<>();
    weights.put("rs123", new PolygenicRiskCalculator.RiskWeight('A', 1.0));
    weights.put("rs456", new PolygenicRiskCalculator.RiskWeight('G', 0.5));
    weights.put("rs789", new PolygenicRiskCalculator.RiskWeight('T', 2.0));

    double score = PolygenicRiskCalculator.computeScore(genotype, weights);
    // AA contributes 2 * 1.0 = 2.0
    // AG contributes 1 * 0.5 = 0.5
    // CT contributes 1 * 2.0 = 2.0
    assertEquals(4.5, score, 0.001);
  }
}
