/*
 * Copyright © 2022 DNAnalyzer. All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * You are entirely responsible for the use of this application, including any and all activities that occur.
 * While DNAnalyzer strives to fix all major bugs that may be either reported by a user or discovered while debugging,
 * they will not be held liable for any loss that the user may incur as a result of using this application, under any circumstances.
 *
 * For further inquiries, please contact DNAnalyzer@piyushacharya.com
 */

package DNAnalyzer;

import java.util.HashMap;
import java.util.Map.Entry;

/**
 * Reading frame data for the highest occurring codons.
 *
 * @author Piyush Acharya (@Verisimilitude11)
 * @author Nishant Vikramaditya (@Nv7-GitHub)
 * @version 1.2.1
 */
public class ReadingFrames {
  private final HashMap<String, Integer> codonCounts;
  private final String dna;

  // Variables for reading frame properties
  private final int readingFrame;
  private final int min;
  private final int max;

  /**
   * Constructor for the ReadingFrames class.
   *
   * @param dna DNA sequence
   * @param readingFrame The reading frame to look at
   * @param min Minimum codon count
   * @param max Maximum codon count
   * @category Codon
   */
  public ReadingFrames(final String dna, final int readingFrame, final int min, final int max) {
    codonCounts = new HashMap<>();
    this.readingFrame = readingFrame;
    this.min = min;
    this.max = max;
    this.dna = dna;
  }

  /**
   * Get codon counts in the specified reading frame
   *
   * @param dna The DNA sequence
   * @category Codon
   * @return The HashMap of codon counts in the specified reading frame
   */
  private void buildCodonMap(final String dna) {
    codonCounts.clear();
    for (int i = (int) readingFrame; i < dna.length(); i += 3) {
      try {
        if (codonCounts.containsKey(dna.substring(i, i + 3))) {
          codonCounts.put(dna.substring(i, i + 3), codonCounts.get(dna.substring(i, i + 3)) + 1);
        } else {
          codonCounts.put(dna.substring(i, i + 3), 1);
        }
      } catch (final Exception e) {
        System.out.println(e);
      }
    }
  }

  /**
   * Method to filter through the codon counts found in the specified reading frame based on the min
   * and max values
   *
   * @category Codon
   */
  public void printCodonCounts() {
    buildCodonMap(dna);
    System.out.println(
        "Codons in reading frame " + readingFrame + " (" + min + "-" + max + " occurrences)" + ":");
    System.out.println("----------------------------------------------------");
    for (final Entry<String, Integer> entry : codonCounts.entrySet()) {
      if (codonCounts.get(entry.getKey()) >= min && codonCounts.get(entry.getKey()) <= max) {
        System.out.println(entry.getKey().toUpperCase() + ": " + codonCounts.get(entry.getKey()));
      }
    }
  }
}
