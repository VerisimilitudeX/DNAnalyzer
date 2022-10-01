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

package DNAnalyzer;

import java.util.ArrayList;
import java.util.List;

/**
 * Find proteins in a DNA sequence (contains the main algorithm).
 * 
 * @author Piyush Acharya (@Verisimilitude11)
 * @version 1.2.1
 */
public class ProteinFinder {
    private final ArrayList<String> aminoAcidList = new ArrayList<>();
    private final ArrayList<String> proteinList = new ArrayList<>();

    public ArrayList<String> getProtein(final String dna, final String aminoAcid, final List<String> list,
            final List<String> list2,
            final List<String> list3, final List<String> list4, final List<String> list5,
            final List<String> list6, final List<String> list7, final List<String> list8,
            final List<String> list9,
            final List<String> list10, final List<String> list11, final List<String> list12,
            final List<String> list13, final List<String> list14, final List<String> list15,
            final List<String> list16, final List<String> list17,
            final List<String> list18,
            final List<String> list19, final List<String> list20, final List<String> list21) {

        // Maps the amino acid that the user entered to the start codon list.
        switch (aminoAcid) {
            case "isoleucine", "i", "ile" -> this.aminoAcidList.addAll(list);
            case "leucine", "l", "leu" -> this.aminoAcidList.addAll(list2);
            case "valine", "v", "val" -> this.aminoAcidList.addAll(list3);
            case "phenylalanine", "f", "phe" -> this.aminoAcidList.addAll(list4);
            case "methionine", "m", "met" -> this.aminoAcidList.addAll(list5);
            case "cysteine", "c", "cys" -> this.aminoAcidList.addAll(list6);
            case "alanine", "a", "ala" -> this.aminoAcidList.addAll(list7);
            case "glycine", "g", "gly" -> this.aminoAcidList.addAll(list8);
            case "proline", "p", "pro" -> this.aminoAcidList.addAll(list9);
            case "threonine", "t", "thr" -> this.aminoAcidList.addAll(list10);
            case "serine", "s", "ser" -> this.aminoAcidList.addAll(list11);
            case "tyrosine", "y", "tyr" -> this.aminoAcidList.addAll(list12);
            case "tryptophan", "w", "trp" -> this.aminoAcidList.addAll(list13);
            case "glutamine", "q", "gln" -> this.aminoAcidList.addAll(list14);
            case "asparagine", "n", "asn" -> this.aminoAcidList.addAll(list15);
            case "histidine", "h", "his" -> this.aminoAcidList.addAll(list16);
            case "glutamic acid", "e", "glu" -> this.aminoAcidList.addAll(list17);
            case "aspartic acid", "d", "asp" -> this.aminoAcidList.addAll(list18);
            case "lysine", "k", "lys" -> this.aminoAcidList.addAll(list19);
            case "arginine", "r", "arg" -> this.aminoAcidList.addAll(list20);
            default -> throw new IllegalStateException("Invalid Amino Acid: " + aminoAcid);
        }

        // MAIN ALGORITHM: Finds proteins in the DNA sequence.

        int start_index;
        int stop_index;
        // Loops through the start codons for the amino acid that the user entered.
        for (final String start_codon : this.aminoAcidList) {
            start_index = dna.indexOf(start_codon.toLowerCase());
            for (final String stop_codon : list21) {
                stop_index = dna.indexOf(stop_codon.toLowerCase(), start_index + 3);
                if ((start_index != -1) && (stop_index != -1)) {
                    this.proteinList.add(dna.substring(start_index, stop_index + 3).toUpperCase());
                    break;
                }
            }
        }

        if (this.proteinList.isEmpty()) {
            System.out.println("No proteins found");
            return null;
        }

        return this.proteinList;
    }
}
