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
     * @param isoleucine List of Isoleucine
     * @param leucine List of Leucine
     * @param valine List of Valine
     * @param phenylalanine List of Phenylalanine
     * @param methionine List of Methionine
     * @param cysteine List of Cysteine
     * @param alanine List of Alanine
     * @param glycine List of Glycine
     * @param proline List of Proline
     * @param threonine List of Threonine
     * @param serine List of Serine
     * @param tyrosine List of Tyrosine
     * @param tryptophan List of Tryptophan
     * @param glutamine List of Glutamine
     * @param asparagine List of Asparagine
     * @param histidine List of Histidine
     * @param glutamicAcid List of GlutamicAcid
     * @param asparticAcid List of AsparticAcid
     * @param lysine List of Lysine
     * @param arginine List of Arginine
     * @param stop List of stop
     * @return List of proteins found in the DNA sequence. null otherwise
     */
    public ArrayList<String> getProtein(final String dna, final String aminoAcid, final ArrayList<String> isoleucine,
            final ArrayList<String> leucine,
            final ArrayList<String> valine, final ArrayList<String> phenylalanine, final ArrayList<String> methionine,
            final ArrayList<String> cysteine, final ArrayList<String> alanine, final ArrayList<String> glycine,
            final ArrayList<String> proline,
            final ArrayList<String> threonine, final ArrayList<String> serine, final ArrayList<String> tyrosine,
            final ArrayList<String> tryptophan, final ArrayList<String> glutamine, final ArrayList<String> asparagine,
            final ArrayList<String> histidine, final ArrayList<String> glutamicAcid,
            final ArrayList<String> asparticAcid,
            final ArrayList<String> lysine, final ArrayList<String> arginine, final ArrayList<String> stop) {

        // Maps the amino acid's 1 letter or 3 letter abbreviation of the amino acids
        // into the full name
        switch (aminoAcid) {
            case "isoleucine", "i", "ile" -> this.aminoAcidList.addAll(isoleucine);
            case "leucine", "l", "leu" -> this.aminoAcidList.addAll(leucine);
            case "valine", "v", "val" -> this.aminoAcidList.addAll(valine);
            case "phenylalanine", "f", "phe" -> this.aminoAcidList.addAll(phenylalanine);
            case "methionine", "m", "met" -> this.aminoAcidList.addAll(methionine);
            case "cysteine", "c", "cys" -> this.aminoAcidList.addAll(cysteine);
            case "alanine", "a", "ala" -> this.aminoAcidList.addAll(alanine);
            case "glycine", "g", "gly" -> this.aminoAcidList.addAll(glycine);
            case "proline", "p", "pro" -> this.aminoAcidList.addAll(proline);
            case "threonine", "t", "thr" -> this.aminoAcidList.addAll(threonine);
            case "serine", "s", "ser" -> this.aminoAcidList.addAll(serine);
            case "tyrosine", "y", "tyr" -> this.aminoAcidList.addAll(tyrosine);
            case "tryptophan", "w", "trp" -> this.aminoAcidList.addAll(tryptophan);
            case "glutamine", "q", "gln" -> this.aminoAcidList.addAll(glutamine);
            case "asparagine", "n", "asn" -> this.aminoAcidList.addAll(asparagine);
            case "histidine", "h", "his" -> this.aminoAcidList.addAll(histidine);
            case "glutamic acid", "e", "glu" -> this.aminoAcidList.addAll(glutamicAcid);
            case "aspartic acid", "d", "asp" -> this.aminoAcidList.addAll(asparticAcid);
            case "lysine", "k", "lys" -> this.aminoAcidList.addAll(lysine);
            case "arginine", "r", "arg" -> this.aminoAcidList.addAll(arginine);
            default -> throw new IllegalStateException("Invalid Amino Acid: " + aminoAcid);
        }

        // MAIN ALGORITHM: Finds proteins in the DNA sequence.

        int start_index;
        int stop_index;

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
            System.out.println("No proteins found");
            return null;
        }

        return this.proteinList;
    }
}
