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
import java.util.Collections;
import java.util.List;

import DNAnalyzer.aminoAcid.AminoAcidMapping;
import DNAnalyzer.aminoAcid.AminoAcidNames;
import DNAnalyzer.codon.CodonDataUtils;

/**
 * Find proteins in a DNA sequence (contains the main algorithm).
 *
 * @author Piyush Acharya (@Verisimilitude11)
 * @author Fernando Boaglio (@boaglio)
 * @version 1.2.1
 */

public class ProteinFinder {

    /**
     * Utility classes should not have public constructors
     */
    private ProteinFinder() {
    }

    private static final int DNA_SIZE = 3;

    /**
     * Gets proteins from dna and amino acid
     *
     * @param dna
     *            dna
     * @param aminoAcid
     *            amino acid
     * @return list of proteins
     */
    public static List<String> getProtein(final String dna, final String aminoAcid) {

        List<String> aminoAcidList = new ArrayList<>();
        List<String> proteinList = new ArrayList<>();

        aminoAcidList.addAll(CodonDataUtils.getAminoAcid(AminoAcidMapping.getAminoAcidMapping(aminoAcid)));

        int startIndex;
        final List<String> stopCodonList = CodonDataUtils.getAminoAcid(AminoAcidNames.STOP);

        // Outer loop loops through the start codons for the amino acids that the user
        // entered.
        // store the start index
        for (final String startCodon : aminoAcidList) {
            startIndex = dna.indexOf(startCodon.toLowerCase());
            addProtein(dna, proteinList, startIndex, stopCodonList);
        }

        // if no proteins are found, return null
        if (proteinList.isEmpty()) {
            // Return null if no protein found in DNA sequence
            System.out.println("No proteins found");
            return Collections.emptyList();
        }

        // Return list of proteins found in the DNA sequence
        return proteinList;
    }

    /**
     * Add protein to protein list
     * 
     * @param dna
     * @param proteinList
     * @param startIndex
     * @param stopCodonList
     */
    private static void addProtein(final String dna, List<String> proteinList, int startIndex,
            final List<String> stopCodonList) {

        // Inner loop loops through the stop that the user entered.
        // store the stopIndex
        // if index is not -1 then store the substring of dna with start and stop index
        // in the protein list
        int stopIndex;
        for (final String stopCodon : stopCodonList) {

            stopIndex = dna.indexOf(stopCodon.toLowerCase(), startIndex + DNA_SIZE);

            if ((startIndex != -1) && (stopIndex != -1)) {
                proteinList.add(dna.substring(startIndex, stopIndex + DNA_SIZE).toUpperCase());
                break;
            }

        }
    }

}
