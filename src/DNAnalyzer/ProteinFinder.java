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

    /**
     * This method inculdes the main algorithm to return the proteins present in 
     * a DNA sequence.
     * 
     * @param dna The DNA to be searched
     * @param aminoAcid The amino acid to be searched for
     * @return List of proteins found in the DNA sequence. null if no proteins found.
     */
    public ArrayList<String> getProtein(final String dna, final String aminoAcid) {

        // Maps the amino acid that the user entered to the start codon list.
        switch (aminoAcid) {
            case "isoleucine", "i", "ile" -> this.aminoAcidList.addAll(CodonData.getAminoAcid(AminoAcidNames.ISOLEUCINE));
            case "leucine", "l", "leu" -> this.aminoAcidList.addAll(CodonData.getAminoAcid(AminoAcidNames.LEUCINE));
            case "valine", "v", "val" -> this.aminoAcidList.addAll(CodonData.getAminoAcid(AminoAcidNames.VALINE));
            case "phenylalanine", "f", "phe" -> this.aminoAcidList.addAll(CodonData.getAminoAcid(AminoAcidNames.PHENYLALANINE));
            case "methionine", "m", "met" -> this.aminoAcidList.addAll(CodonData.getAminoAcid(AminoAcidNames.METHIONINE));
            case "cysteine", "c", "cys" -> this.aminoAcidList.addAll(CodonData.getAminoAcid(AminoAcidNames.CYSTEINE));
            case "alanine", "a", "ala" -> this.aminoAcidList.addAll(CodonData.getAminoAcid(AminoAcidNames.ALANINE));
            case "glycine", "g", "gly" -> this.aminoAcidList.addAll(CodonData.getAminoAcid(AminoAcidNames.GLYCINE));
            case "proline", "p", "pro" -> this.aminoAcidList.addAll(CodonData.getAminoAcid(AminoAcidNames.PROLINE));
            case "threonine", "t", "thr" -> this.aminoAcidList.addAll(CodonData.getAminoAcid(AminoAcidNames.THREONINE));
            case "serine", "s", "ser" -> this.aminoAcidList.addAll(CodonData.getAminoAcid(AminoAcidNames.SERINE));
            case "tyrosine", "y", "tyr" -> this.aminoAcidList.addAll(CodonData.getAminoAcid(AminoAcidNames.TYROSINE));
            case "tryptophan", "w", "trp" -> this.aminoAcidList.addAll(CodonData.getAminoAcid(AminoAcidNames.TRYPTOPHAN));
            case "glutamine", "q", "gln" -> this.aminoAcidList.addAll(CodonData.getAminoAcid(AminoAcidNames.GLUTAMINE));
            case "asparagine", "n", "asn" -> this.aminoAcidList.addAll(CodonData.getAminoAcid(AminoAcidNames.ASPARAGINE));
            case "histidine", "h", "his" -> this.aminoAcidList.addAll(CodonData.getAminoAcid(AminoAcidNames.HISTIDINE));
            case "glutamic acid", "e", "glu" -> this.aminoAcidList.addAll( CodonData.getAminoAcid(AminoAcidNames.GLUTAMIC_ACID));
            case "aspartic acid", "d", "asp" -> this.aminoAcidList.addAll(CodonData.getAminoAcid(AminoAcidNames.ASPARTIC_ACID));
            case "lysine", "k", "lys" -> this.aminoAcidList.addAll(CodonData.getAminoAcid(AminoAcidNames.LYSINE));
            case "arginine", "r", "arg" -> this.aminoAcidList.addAll(CodonData.getAminoAcid(AminoAcidNames.ARGININE));
            default -> throw new IllegalStateException("Invalid Amino Acid: " + aminoAcid);
        }

        // MAIN ALGORITHM: Finds proteins in the DNA sequence.

        int start_index;
        int stop_index;
        List<String> stop = CodonData.getAminoAcid(AminoAcidNames.STOP);
        // Loops through the start codons for the amino acid that the user entered.
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

        if (this.proteinList.isEmpty()) {
            System.out.println("No proteins found");
            return null;
        }

        return this.proteinList;
    }
}
