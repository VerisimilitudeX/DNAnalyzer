package DNAnalyzer.data;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.File;
import org.junit.jupiter.api.Test;

class ParserTest {
  @Test
  void shouldParseGzipFasta() throws Exception {
    String seq = Parser.parseFile(new File("assets/dna/example/test.fa.gz"));
    assertTrue(seq.startsWith("atg"));
  }
}
