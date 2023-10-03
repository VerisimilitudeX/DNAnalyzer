package DNAnalyzer.utils.core;

import static DNAnalyzer.utils.core.Utils.readFile;
import static java.util.Map.entry;
import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

import DNAnalyzer.data.codon.CodonFrame;
import java.nio.file.Path;
import java.util.Map;
import org.junit.jupiter.api.Test;

class ReadingFramesTest {

  public static final String TEST_SEQUENCE = "gggggaggtggcgaggaagatgac";
  public static final String DNA_SEQUENCE_WITH_LENGTH_TWENTY_THREE = "gggggaggtggcgaggaagatga";
  public static final String DNA_SEQUENCE_WITH_LENGTH_TWENTY_TWO = "gggggaggtggcgaggaagatg";

  /** These are the expected codon counts from .\assets\dna\real\brca1.fa using ReadingFrame 1 */
  private static final Map<String, Integer> BRCA_1_EXPECTED_FRAME_1_CODON_COUNTS =
      Map.<String, Integer>ofEntries(
          entry("GCG", 3),
          entry("GCA", 76),
          entry("GCT", 68),
          entry("GCC", 30),
          entry("TGT", 61),
          entry("TGC", 15),
          entry("GAT", 123),
          entry("GAC", 48),
          entry("GAG", 68),
          entry("GAA", 226),
          entry("TTT", 110),
          entry("TTC", 27),
          entry("GGG", 14),
          entry("GGA", 54),
          entry("GGT", 36),
          entry("GGC", 21),
          entry("CAT", 67),
          entry("CAC", 16),
          entry("ATA", 71),
          entry("ATT", 94),
          entry("ATC", 22),
          entry("AAG", 94),
          entry("AAA", 231),
          entry("TTG", 53),
          entry("TTA", 84),
          entry("CTG", 40),
          entry("CTA", 28),
          entry("CTT", 62),
          entry("CTC", 17),
          entry("ATG", 46),
          entry("AAT", 167),
          entry("AAC", 63),
          entry("CCG", 8),
          entry("CCA", 72),
          entry("CCT", 49),
          entry("CCC", 23),
          entry("CAG", 71),
          entry("CAA", 83),
          entry("AGG", 21),
          entry("AGA", 65),
          entry("CGG", 3),
          entry("CGA", 5),
          entry("CGT", 11),
          entry("CGC", 6),
          entry("AGT", 90),
          entry("AGC", 33),
          entry("TCG", 4),
          entry("TCA", 103),
          entry("TCT", 121),
          entry("TCC", 32),
          entry("ACG", 8),
          entry("ACA", 81),
          entry("ACT", 103),
          entry("ACC", 30),
          entry("GTG", 41),
          entry("GTA", 53),
          entry("GTT", 70),
          entry("GTC", 21),
          entry("TGG", 20),
          entry("TAT", 53),
          entry("TAC", 28),
          entry("TAG", 1));

  /** These are the expected codon counts from .\assets\dna\real\brca1.fa using ReadingFrame 2 */
  Map<String, Integer> brca1ExpectedFrame2CodonCounts =
      Map.<String, Integer>ofEntries(
          entry("GCG", 5),
          entry("GCA", 38),
          entry("GCT", 17),
          entry("GCC", 15),
          entry("TGT", 41),
          entry("TGC", 27),
          entry("GAT", 16),
          entry("GAC", 23),
          entry("GAG", 31),
          entry("GAA", 54),
          entry("TTT", 92),
          entry("TTC", 59),
          entry("GGG", 10),
          entry("GGA", 26),
          entry("GGT", 8),
          entry("GGC", 14),
          entry("CAT", 54),
          entry("CAC", 48),
          entry("ATA", 129),
          entry("ATT", 89),
          entry("ATC", 57),
          entry("AAG", 163),
          entry("AAA", 228),
          entry("TTG", 100),
          entry("TTA", 85),
          entry("CTG", 125),
          entry("CTA", 77),
          entry("CTT", 79),
          entry("CTC", 60),
          entry("ATG", 135),
          entry("AAT", 77),
          entry("AAC", 72),
          entry("CCG", 5),
          entry("CCA", 54),
          entry("CCT", 30),
          entry("CCC", 26),
          entry("CAG", 118),
          entry("CAA", 112),
          entry("AGG", 65),
          entry("AGA", 88),
          entry("CGG", 8),
          entry("CGA", 6),
          entry("CGT", 6),
          entry("CGC", 3),
          entry("AGT", 38),
          entry("AGC", 43),
          entry("TCG", 5),
          entry("TCA", 41),
          entry("TCT", 32),
          entry("TCC", 9),
          entry("ACG", 12),
          entry("ACA", 81),
          entry("ACT", 33),
          entry("ACC", 29),
          entry("GTG", 58),
          entry("GTA", 60),
          entry("GTT", 42),
          entry("GTC", 38),
          entry("TGG", 55),
          entry("TAT", 58),
          entry("TAC", 38),
          entry("TGA", 57),
          entry("TAG", 58),
          entry("TAA", 82));

  /** These are the expected codon counts from .\assets\dna\real\brca1.fa using ReadingFrame 3 */
  Map<String, Integer> brca1ExpectedFrame3CodonCounts =
      Map.<String, Integer>ofEntries(
          entry("GCG", 4),
          entry("GCA", 33),
          entry("GCT", 20),
          entry("GCC", 30),
          entry("TGT", 90),
          entry("TGC", 71),
          entry("GAT", 33),
          entry("GAC", 31),
          entry("GAG", 23),
          entry("GAA", 90),
          entry("TTT", 106),
          entry("TTC", 133),
          entry("GGG", 15),
          entry("GGA", 72),
          entry("GGT", 23),
          entry("GGC", 28),
          entry("CAT", 42),
          entry("CAC", 43),
          entry("ATA", 25),
          entry("ATT", 80),
          entry("ATC", 64),
          entry("AAG", 82),
          entry("AAA", 233),
          entry("TTG", 30),
          entry("TTA", 33),
          entry("CTG", 19),
          entry("CTA", 11),
          entry("CTT", 51),
          entry("CTC", 31),
          entry("ATG", 36),
          entry("AAT", 90),
          entry("AAC", 71),
          entry("CCA", 38),
          entry("CCT", 24),
          entry("CCC", 17),
          entry("CAG", 42),
          entry("CAA", 87),
          entry("AGG", 50),
          entry("AGA", 184),
          entry("CGG", 1),
          entry("CGA", 11),
          entry("CGT", 9),
          entry("CGC", 6),
          entry("AGT", 64),
          entry("AGC", 72),
          entry("TCG", 10),
          entry("TCA", 92),
          entry("TCT", 59),
          entry("TCC", 53),
          entry("ACG", 11),
          entry("ACA", 74),
          entry("ACT", 44),
          entry("ACC", 52),
          entry("GTG", 11),
          entry("GTA", 13),
          entry("GTT", 37),
          entry("GTC", 32),
          entry("TGG", 59),
          entry("TAT", 68),
          entry("TAC", 76),
          entry("TGA", 198),
          entry("TAG", 62),
          entry("TAA", 145));

  @Test
  public void calculateCodonStartIndicesFrame1Test() {
    int[] expectedResult = {0, 3, 6, 9, 12, 15, 18, 21};
    CodonFrame temp = new CodonFrame(TEST_SEQUENCE, (short) 1, 1, 100);
    ReadingFrames readingFrameTest = new ReadingFrames(temp);

    int[] result = readingFrameTest.calculateCodonStartIndices(TEST_SEQUENCE);

    assertArrayEquals(expectedResult, result);
  }

  @Test
  public void calculateCodonStartIndicesFrame2Test() {
    int[] expectedResult = {1, 4, 7, 10, 13, 16, 19};
    CodonFrame temp = new CodonFrame(TEST_SEQUENCE, (short) 2, 1, 100);
    ReadingFrames readingFrameTest = new ReadingFrames(temp);

    int[] result = readingFrameTest.calculateCodonStartIndices(TEST_SEQUENCE);

    assertArrayEquals(expectedResult, result);
  }

  @Test
  public void calculateCodonStartIndicesFrame3Test() {
    int[] expectedResult = {2, 5, 8, 11, 14, 17, 20};
    CodonFrame temp = new CodonFrame(TEST_SEQUENCE, (short) 3, 1, 100);
    ReadingFrames readingFrameTest = new ReadingFrames(temp);
    int[] result = readingFrameTest.calculateCodonStartIndices(TEST_SEQUENCE);
    assertArrayEquals(expectedResult, result);
  }

  @Test
  public void calculateCodonStartIndicesUsingDnaSequenceWithLengthTwentyThreeFrame1Test() {
    int[] expectedResult = {0, 3, 6, 9, 12, 15, 18};
    String testSequence = DNA_SEQUENCE_WITH_LENGTH_TWENTY_THREE;
    CodonFrame temp = new CodonFrame(testSequence, (short) 1, 1, 100);
    ReadingFrames readingFrameTest = new ReadingFrames(temp);
    int[] result = readingFrameTest.calculateCodonStartIndices(testSequence);
    assertArrayEquals(expectedResult, result);
  }

  @Test
  public void calculateCodonStartIndicesUsingDnaSequenceWithLengthTwentyThreeFrame2Test() {
    int[] expectedResult = {1, 4, 7, 10, 13, 16, 19};
    String testSequence = DNA_SEQUENCE_WITH_LENGTH_TWENTY_THREE;
    CodonFrame temp = new CodonFrame(testSequence, (short) 2, 1, 100);
    ReadingFrames readingFrameTest = new ReadingFrames(temp);
    int[] result = readingFrameTest.calculateCodonStartIndices(testSequence);
    assertArrayEquals(expectedResult, result);
  }

  @Test
  public void calculateCodonStartIndicesUsingDnaSequenceWithLengthTwentyThreeFrame3Test() {
    int[] expectedResult = {2, 5, 8, 11, 14, 17, 20};
    String testSequence = DNA_SEQUENCE_WITH_LENGTH_TWENTY_THREE;
    CodonFrame temp = new CodonFrame(testSequence, (short) 3, 1, 100);
    ReadingFrames readingFrameTest = new ReadingFrames(temp);
    int[] result = readingFrameTest.calculateCodonStartIndices(testSequence);
    assertArrayEquals(expectedResult, result);
  }

  // dnaSequenceWithLengthTwentyTwo
  @Test
  public void calculateCodonStartIndicesUsingDnaSequenceWithLengthTwentyTwoFrame1Test() {
    int[] expectedResult = {0, 3, 6, 9, 12, 15, 18};
    String testSequence = DNA_SEQUENCE_WITH_LENGTH_TWENTY_TWO;
    CodonFrame temp = new CodonFrame(testSequence, (short) 1, 1, 100);
    ReadingFrames readingFrameTest = new ReadingFrames(temp);
    int[] result = readingFrameTest.calculateCodonStartIndices(testSequence);
    assertArrayEquals(expectedResult, result);
  }

  @Test
  public void calculateCodonStartIndicesUsingDnaSequenceWithLengthTwentyTwoFrame2Test() {
    int[] expectedResult = {1, 4, 7, 10, 13, 16, 19};
    String testSequence = DNA_SEQUENCE_WITH_LENGTH_TWENTY_TWO;
    CodonFrame temp = new CodonFrame(testSequence, (short) 2, 1, 100);
    ReadingFrames readingFrameTest = new ReadingFrames(temp);
    int[] result = readingFrameTest.calculateCodonStartIndices(testSequence);
    assertArrayEquals(expectedResult, result);
  }

  @Test
  public void calculateCodonStartIndicesUsingDnaSequenceWithLengthTwentyTwoFrame3Test() {
    int[] expectedResult = {2, 5, 8, 11, 14, 17};
    String testSequence = DNA_SEQUENCE_WITH_LENGTH_TWENTY_TWO;
    CodonFrame temp = new CodonFrame(testSequence, (short) 3, 1, 100);
    ReadingFrames readingFrameTest = new ReadingFrames(temp);
    int[] result = readingFrameTest.calculateCodonStartIndices(testSequence);
    assertArrayEquals(expectedResult, result);
  }

  @Test
  public void buildCodonMapBrcaMethodsFrame1Tests() {
    Path projectPath = Path.of("");
    Path brcaPath = projectPath.resolve("assets/dna/real/brca1.fa");

    String brcaDnaString = readFile(brcaPath.toFile());
    CodonFrame testCodonFrame = new CodonFrame(brcaDnaString, (short) 1, 1, 20000);
    ReadingFrames testReadingFrame = new ReadingFrames(testCodonFrame);
    Map<String, Integer> actualResults = testReadingFrame.getCodonCounts();

    assertEquals(BRCA_1_EXPECTED_FRAME_1_CODON_COUNTS, actualResults);
  }

  @Test
  public void buildCodonMapBrcaMethodsFrame2Tests() {
    Path projectPath = Path.of("");
    Path brcaPath = projectPath.resolve("assets/dna/real/brca1.fa");

    String brcaDnaString = readFile(brcaPath.toFile());
    Map<String, Integer> expectedResults = brca1ExpectedFrame2CodonCounts;
    CodonFrame testCodonFrame = new CodonFrame(brcaDnaString, (short) 2, 1, 20000);
    ReadingFrames testReadingFrame = new ReadingFrames(testCodonFrame);
    Map<String, Integer> actualResults = testReadingFrame.getCodonCounts();

    assertEquals(expectedResults, actualResults);
  }

  @Test
  public void buildCodonMapBrcaMethodsFrame3Tests() {
    Path projectPath = Path.of("");
    Path brcaPath = projectPath.resolve("assets/dna/real/brca1.fa");

    String brcaDnaString = readFile(brcaPath.toFile());
    Map<String, Integer> expectedResults = brca1ExpectedFrame3CodonCounts;
    CodonFrame testCodonFrame = new CodonFrame(brcaDnaString, (short) 3, 1, 20000);
    ReadingFrames testReadingFrame = new ReadingFrames(testCodonFrame);
    Map<String, Integer> actualResults = testReadingFrame.getCodonCounts();

    assertEquals(expectedResults, actualResults);
  }
}
