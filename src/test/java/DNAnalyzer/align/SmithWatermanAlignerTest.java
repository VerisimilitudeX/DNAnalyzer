package DNAnalyzer.align;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.IOException;
import org.junit.jupiter.api.Assumptions;
import org.junit.jupiter.api.Test;

class SmithWatermanAlignerTest {

  @Test
  void alignsShortSequencesViaPython() throws Exception {
    SmithWatermanAligner aligner;
    try {
      aligner = SmithWatermanAligner.create(null);
    } catch (IOException ex) {
      Assumptions.assumeTrue(false, "Python interpreter unavailable: " + ex.getMessage());
      return;
    }

    SmithWatermanAligner.AlignmentResult result =
        aligner.align("query", "ACACACTA", "reference", "AGCACACA");

    assertTrue(result.score() > 0, "Expected positive Smith-Waterman score");
    assertFalse(result.alignedQuery().isEmpty());
    assertFalse(result.alignedReference().isEmpty());
  }
}
