/*
 * Copyright © 2024 Piyush Acharya. Some rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * You are entirely responsible for the use of this application, including any and all activities that occur.
 * While DNAnalyzer strives to fix all major bugs that may be either reported by a user or discovered while debugging,
 * they will not be held liable for any loss that the user may incur as a result of using this application, under any circumstances.
 *
 * For further inquiries, please reach out to contact@dnanalyzer.live
 */

package DNAnalyzer.utils.core;

import DNAnalyzer.data.codon.CodonDataUtils;
import DNAnalyzer.data.codon.CodonFrame;
import java.io.PrintStream;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

/**
 * Reading frame data for the highest occurring codons.
 *
 * @author Piyush Acharya (@VerisimilitudeX)
 * @version 1.2.1
 */
public class ReadingFrames {

  private final Map<String, Integer> codonCounts;
  private final CodonFrame codonFrame;

  /**
   * Constructor for the ReadingFrames class.
   *
   * @param codonFrame frame for codon data {@code @category} Codon
   */
  public ReadingFrames(final CodonFrame codonFrame) {
    this.codonCounts = new HashMap<>();
    this.codonFrame = codonFrame;
  }

  /**
   * Get codon counts in the specified reading frame
   *
   * @param dna The DNA sequence {@code @category} Codon
   */
  private void buildCodonMap(final String dna) {
    // reset the hashmap
    this.codonCounts.clear();
    Map<String, Integer> tempMap = calculateCodonCounts(dna);

    if (tempMap != null) {
      this.codonCounts.putAll(tempMap);
    }
  }

  /**
   * Calculate indices for the start position of each codon within a dna string.
   *
   * @param dna dna string
   * @return int array with the start index of all codons with the specified reading frame of the
   *     dna string.
   */
  public int[] calculateCodonStartIndices(final String dna) {
    int[] codonStartIndices;
    // calculate max total codons possible
    final int maxTotalCodons = dna.length() / 3;
    // reading frame is 1-index based. Calculate offset for 0-index array.
    final int offset = this.codonFrame.getReadingFrame() - 1;
    int[] indexArray =
        IntStream.range(0, maxTotalCodons).map(index -> (index * 3 + offset)).toArray();

    // if the last codon index is not 3 positions away from end, remove last index.
    if (dna.length() - indexArray[indexArray.length - 1] < 3) {
      codonStartIndices = Arrays.stream(indexArray).limit(indexArray.length - 1).toArray();
    } else {
      codonStartIndices = indexArray;
    }

    return codonStartIndices;
  }

  /**
   * This method determines whether the codon counting should be performed via the non-parallel
   * stream method or the parallel stream method.
   *
   * <p>Note: Performance gains only seen on larger strings. Exact threshold for String length to
   * see performance gains from parallelization unknown; however, it is known at 10,000 length,
   * non-parallel still performs slightly better. 20,000 was chosen somewhat arbitrarily but should
   * serve well until further benchmarking is deemed necessary.
   *
   * @param dna DNA String to perform codon counts
   * @return a Map with keys for each codon string present in dna, mapped to the count of
   *     occurrences of that codon string within the DNA String.
   */
  private Map<String, Integer> calculateCodonCounts(final String dna) {
    Map<String, Long> codonCounts;

    if (dna.length() < 20000) {
      codonCounts = calculateCodonCountsNonParallel(dna);
    } else {
      codonCounts = calculateCodonCountsParallel(dna);
    }

    Map<String, Integer> codonCountsMappedToInt =
        codonCounts.entrySet().stream()
            .collect(
                Collectors.toMap(entry -> entry.getKey(), entry -> entry.getValue().intValue()));

    return codonCountsMappedToInt;
  }

  /**
   * Counts number of occurrences of codon strings within provided dna. This is called by
   * calculateCodonCounts for shorter length DNA Strings.
   *
   * @param dna DNA String to perform codon counts
   * @return a Map with keys for each codon string present in dna, mapped to the count of
   *     occurrences of that codon string within the DNA String.
   */
  private Map<String, Long> calculateCodonCountsNonParallel(final String dna) {
    int[] codonStartIndices = calculateCodonStartIndices(dna);

    return Arrays.stream(codonStartIndices)
        .mapToObj(index -> CodonDataUtils.returnSubstring(dna, index))
        .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
  }

  /**
   * Counts number of occurrences of codon strings within provided dna. This is called by
   * calculateCodonCounts for lengthier DNA Strings.
   *
   * @param dna DNA String to perform codon counts
   * @return a Map with keys for each codon string present in dna, mapped to the count of
   *     occurrences of that codon string within the DNA String.
   */
  private Map<String, Long> calculateCodonCountsParallel(final String dna) {
    int[] codonStartIndices = calculateCodonStartIndices(dna);
    return Arrays.stream(codonStartIndices)
        .parallel()
        .mapToObj(index -> CodonDataUtils.returnSubstring(dna, index))
        .collect(Collectors.groupingByConcurrent(Function.identity(), Collectors.counting()));
  }

  /**
   * Getter method for codonCounts map
   *
   * @return the codonCounts map
   */
  public Map<String, Integer> getCodonCounts() {
    if (this.codonCounts == null || this.codonCounts.isEmpty()) {
      this.buildCodonMap(codonFrame.getDna());
    }
    return codonCounts;
  }

  /**
   * Method to filter through the codon counts found in the specified reading frame based on the min
   * and max values
   *
   * @throws StringIndexOutOfBoundsException when string index is out of bounds of the map
   *     {@code @category} Codon
   */
  public void printCodonCounts(PrintStream out) throws StringIndexOutOfBoundsException {

    Map<String, Integer> codonCounts = getCodonCounts();

    // pretty print all the codon counts
    out.println(
        "Codons in reading frame "
            + codonFrame.getReadingFrame()
            + " ("
            + codonFrame.getMin()
            + "-"
            + codonFrame.getMax()
            + " occurrences)"
            + ":");
    out.println("----------------------------------------------------");
    for (final Entry<String, Integer> entry : codonCounts.entrySet()) {
      if (codonCounts.get(entry.getKey()) >= codonFrame.getMin()
          && codonCounts.get(entry.getKey()) <= codonFrame.getMax()) {
        out.println(entry.getKey().toUpperCase() + ": " + codonCounts.get(entry.getKey()));
      }
    }
  }
}
