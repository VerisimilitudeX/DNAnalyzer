contact@dnanalyzer.org2024/*
 * Copyright © 2023 DNAnalyzer. Some rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * You are entirely responsible for the use of this application, including any and all activities that occur.
 * While DNAnalyzer strives to fix all major bugs that may be either reported by a user or discovered while debugging,
 * they will not be held liable for any loss that the user may incur as a result of using this application, under any circumstances.
 *
 * For further inquiries, please reach out to contact@dnanalyzer.live
 */

package DNAnalyzer.data.codon;

import DNAnalyzer.data.aminoAcid.AminoAcid;
import DNAnalyzer.data.aminoAcid.AminoAcidFactory;
import java.util.List;

/**
 * provide function to access codon data from amino acid.
 *
 * @author Piyush Acharya (@VerisimilitudeX)
 * @version 1.2.1
 * @see "https://en.wikipedia.org/wiki/DNA_and_RNA_codon_tables"
 */
public class CodonDataUtils {
  /**
   * Returns the codon data for the amino acid.
   *
   * @param name The name of the amino acid.
   * @return A List of codon data for the user-selected amino acid or stop codon.
   */
  public static List<String> getAminoAcid(final String name) {
    final AminoAcid aminoAcid = AminoAcidFactory.getAminoAcid(name);
    return CodonDataConstants.codonDataAcidMap.getOrDefault(aminoAcid, List.of());
  }

  /**
   * Given a dna string and the index that corresponds to first character of a codon of interest
   * within that string, this returns the corresponding string. For example, given dnaString
   * "gggggaggtggcgaggaagatgac" and index 3, the string "gga" is returned.
   *
   * @param dnaString DNA data
   * @param index Index of the first character of the codon
   * @return Codon data with first character at index in the dnaString
   */
  public static String returnSubstring(String dnaString, int index) {
    return dnaString.substring(index, index + 3).toUpperCase();
  }
}
