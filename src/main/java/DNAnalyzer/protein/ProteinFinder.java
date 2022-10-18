/*
 * Copyright © 2022 DNAnalyzer. Some rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * You are entirely responsible for the use of this application, including any and all activities that occur.
 * While DNAnalyzer strives to fix all major bugs that may be either reported by a user or discovered while debugging,
 * they will not be held liable for any loss that the user may incur as a result of using this application, under any circumstances.
 *
 * For further inquiries, please contact DNAnalyzer@piyushacharya.com
 */

package DNAnalyzer.protein;

import java.util.ArrayList;
import java.util.List;
import DNAnalyzer.codon.*;
import DNAnalyzer.aminoAcid.*;

/**
 * Find proteins in a DNA sequence (contains the main algorithm).
 *
 * @author Piyush Acharya (@Verisimilitude11)
 * @version 1.2.1
 */

public class ProteinFinder {
    /**
     * Amino acid list
     */

    private final List<String> aminoAcidList;
    /**
     * protein list
     */
    private final List<String> proteinList;

    /**
     * ProteinFinder default constructor to initialize aminoAcidList and proteinList
     */
    public ProteinFinder() {
        aminoAcidList = new ArrayList<>();
        proteinList = new ArrayList<>();
    }

    /**
     * Gets proteins from dna and amino acid
     *
     * @param dna       dna
     * @param aminoAcid amino acid
     * @return list of proteins
     */
    public List<String> getProtein(final String dna, final String aminoAcid) {
        this.aminoAcidList.addAll(CodonDataUtils.getAminoAcid(AminoAcidMapping.getAminoAcidMapping(aminoAcid)));

        int start_index;
        int stop_index;
        final List<String> stop = CodonDataUtils.getAminoAcid(AminoAcidNames.STOP);

        // Outer loop loops through the start codons for the amino acids that the user
        // entered.
        // store the start index
        // Inner loop loops through the stop that the user entered.
        // store the stop_index
        // if index is not -1 then store the substring of dna with start and stop index
        // in the protein list
        for (final String start_codon : this.aminoAcidList) {
            start_index = dna.indexOf(start_codon.toLowerCase());
            for (final String stop_codon : stop) {
                stop_index = dna.indexOf(stop_codon.toLowerCase(), start_index + 3);
                if ((start_index != -1) && (stop_index != -1)) {
                    this.proteinList.add(dna.substring(start_index, stop_index + 3).toUpperCase());
                    break;
                }
            }
        }

        // if no proteins are found, return null
        if (this.proteinList.isEmpty()) {
            // Return null if no protein found in DNA sequence
            System.out.println("No proteins found");
            return null;
        }

        // Return list of proteins found in the DNA sequence
        return this.proteinList;
    }

}
