package DNAnalyzer.utils.protein;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.util.List;
import org.junit.jupiter.api.Test;

class ProteinAnalysisTest {

  @Test
  void printLongestProteinShouldOutputExpectedGene() {
    String dnaSequence = "cccatgaaatga";
    List<String> proteins = ProteinFinder.getProtein(dnaSequence, "met");

    ByteArrayOutputStream outContent = new ByteArrayOutputStream();
    ProteinAnalysis.printLongestProtein(proteins, new PrintStream(outContent));

    String output = outContent.toString();
    assertTrue(output.contains("Longest gene (9 nucleotides): ATGAAATGA"));
  }
}
