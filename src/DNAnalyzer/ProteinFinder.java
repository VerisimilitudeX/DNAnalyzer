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
   * The method first maps the amino acid that the user entered to the start 
   * codon list. The main algorithm then finds proteins in the DNA sequence by 
   * looping through the start codons for the amino acid that the user entered.
   * Returns the list of proteins found in the enetred DNA sequence
   *
   * @param dna           String to store DNA sequence
   * @param aminoAcid     String to store amino acid that user has passed
   * @param isoleucine    List for isoleucine amino acid
   * @param leucine       List for leucine amino acid
   * @param valine        List for valine amino acid
   * @param phenylalanine List for phenylalanine amino acid
   * @param methionine    List for methionine amino acid
   * @param cysteine      List for cysteine amino acid
   * @param alanine       List for alanine amino acid
   * @param glycine       List for glycine amino acid
   * @param proline       List for proline amino acid
   * @param threonine     List for threonine amino acid
   * @param serine        List for serine amino acid
   * @param tyrosine      List for tyrosine amino acid
   * @param tryptophan    List for tryptophan amino acid
   * @param glutamine     List for glutamine amino acid
   * @param asparagine    List for asparagine amino acid
   * @param histidine     List for histidine amino acid
   * @param glutamicAcid  List for glutamicAcid amino acid
   * @param asparticAcid  List for asparticAcid amino acid
   * @param lysine        List for lysine amino acid
   * @param arginine      List for arginine amino acid
   * @param stop          List for stop to be used in main algorithm
   *
   * @return proteinList  List of proteins found in the DNA sequence. null if no proteins found.  
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

        // Maps the amino acid that the user entered to the start codon list.
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
            // Return null if no protein found in DNA sequence
            System.out.println("No proteins found");
            return null;
        }

        // Return list of proteins found in the DNA sequence 
        return this.proteinList;
    }
}
