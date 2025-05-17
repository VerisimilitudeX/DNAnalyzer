package DNAnalyzer.data.trait;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;

class TraitPredictorTest {

  @Test
  void shouldPredictTraitsFromSnpData() {
    Map<String, String> snpData =
        Map.of(
            "rs72921001",
            "AA",
            "rs11121022",
            "GG",
            "rs17822931",
            "AA");

    List<TraitPrediction> results = TraitPredictor.predictTraits(snpData);

    assertEquals(3, results.size());
    assertEquals("Likely perceives cilantro as soapy", results.get(0).prediction());
    assertEquals("Predisposed to be a morning person", results.get(1).prediction());
    assertEquals("Dry earwax type", results.get(2).prediction());
  }
}
