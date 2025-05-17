package DNAnalyzer.core;

import static DNAnalyzer.utils.core.Utils.readFile;
import static org.junit.jupiter.api.Assertions.assertArrayEquals;

import java.nio.file.Path;
import org.junit.jupiter.api.Test;

class DNAAnalysisTest {

  @Test
  void testCountBasePairs() {
    Path projectPath = Path.of("");
    Path brcaPath = projectPath.resolve("assets/dna/real/brca1.fa");

    String brcaDnaString = readFile(brcaPath.toFile());
    // a = 3790, t = 2837, g = 1903, c = 1804, unknown = 0
    long[] expected = {3790, 2837, 1903, 1804, 0};
    long[] actual = DNAAnalysis.countBasePairs(brcaDnaString);
    assertArrayEquals(expected, actual);
  }

  @Test
  void testCountBasePairsWithEmptyString() {
    String testEmptyString = "";
    long[] expected = {0, 0, 0, 0, 0};
    long[] actual = DNAAnalysis.countBasePairs(testEmptyString);
    assertArrayEquals(expected, actual);
  }

  @Test
  void testCountBasePairsWithNullString() {
    long[] expected = {0, 0, 0, 0, 0};
    long[] actual = DNAAnalysis.countBasePairs(null);
    assertArrayEquals(expected, actual);
  }

  @Test
  void testCountBasePairsWithUnknownBases() {
    String dnaString = "AaTtGgCcNn";
    long[] expected = {2, 2, 2, 2, 2};
    long[] actual = DNAAnalysis.countBasePairs(dnaString);
    assertArrayEquals(expected, actual);
  }
}
