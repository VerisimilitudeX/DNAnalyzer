package DNAnalyzer.utils.alignment;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

public class SmithWatermanAlignerTest {
  @Test
  void cpuFallbackAlignment() throws Exception {
    SequenceAligner.AlignmentResult res =
        SmithWatermanAligner.align("ACACACTA", "AGCACACA");
    assertEquals(17, res.score());
  }
}
