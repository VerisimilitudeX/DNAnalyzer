package DNAnalyzer.utils.alignment;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

public class SequenceAlignerTest {

  @Test
  void simpleAlignment() {
    SequenceAligner.AlignmentResult res = SequenceAligner.align("ACGT", "ACCT");
    assertEquals(5, res.score());
    assertEquals("ACGT", res.alignedSeq1());
    assertEquals("ACCT", res.alignedSeq2());
  }
}
