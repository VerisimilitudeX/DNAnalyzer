/*
 * Copyright © 2023 DNAnalyzer. Some rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * You are entirely responsible for the use of this application, including any and all activities that occur.
 * While DNAnalyzer strives to fix all major bugs that may be either reported by a user or discovered while debugging,
 * they will not be held liable for any loss that the user may incur as a result of using this application, under any circumstances.
 *
 * For further inquiries, please contact reach out to contact@dnanalyzer.live
 */

package DNAnalyzer.utils.core;

/**
 * Functionality for dna sequence manipulation.
 *
 * @param dna the dna sequence
 */
public record DNATools(String dna) {

  public void isValid() {
    if (!dna.matches("[atgcn]+")) {
      throw new IllegalArgumentException("Invalid characters present in DNA sequence.");
    }
  }

  /**
   * Replaces the input string with the provided replacement string.
   *
   * @param input is the original string to be replaced
   * @param replacement is the string that will replace the input string
   */
  public DNATools replace(final String input, final String replacement) {
    return new DNATools(this.dna.replace(input, replacement));
  }

  /** Reverse the DNA sequence. */
  public DNATools reverse() {
    return new DNATools(new StringBuilder(dna).reverse().toString());
  }

  /** Get the DNA sequence. */
  public String getDna() {
    return dna;
  }

  /** Get the reverse compliment of a DNA sequence. */
  public String getReverseComplement() {
    return new StringBuilder(dna)
        .reverse()
        .toString()
        .replace("a", "T")
        .replace("t", "A")
        .replace("g", "C")
        .replace("c", "G")
        .toLowerCase();
  }
}
