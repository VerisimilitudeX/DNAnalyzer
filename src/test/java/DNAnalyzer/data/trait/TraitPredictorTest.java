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
            "AA",
            "rs4988235",
            "AA",
            "rs762551",
            "AA",
            "rs1815739",
            "TT",
            "rs671",
            "AG");

    List<TraitPrediction> results = TraitPredictor.predictTraits(snpData);

    assertEquals(7, results.size());
    assertEquals("Likely perceives cilantro as soapy", results.get(0).prediction());
    assertEquals("Predisposed to be a morning person", results.get(1).prediction());
    assertEquals("Dry earwax type", results.get(2).prediction());
    assertEquals("Likely lactose tolerant", results.get(3).prediction());
    assertEquals("High caffeine sensitivity", results.get(4).prediction());
    assertEquals("Enhanced sprint/power potential", results.get(5).prediction());
    assertEquals("Likely to experience facial flushing when drinking", results.get(6).prediction());
  }
}
