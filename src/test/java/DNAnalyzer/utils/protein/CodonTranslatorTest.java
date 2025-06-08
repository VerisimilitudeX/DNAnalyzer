package DNAnalyzer.utils.protein;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class CodonTranslatorTest {
  @Test
  void translateSimpleSequence() {
    String dna = "ATGGAA"; // Met-Glu
    String aa = CodonTranslator.translate(dna);
    assertEquals("ME", aa);
  }
}
