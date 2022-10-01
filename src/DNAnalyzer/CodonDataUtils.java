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

import java.util.List;

/**
 * provide function to access codon data from amino acid.
 * 
 * @see "https://en.wikipedia.org/wiki/DNA_and_RNA_codon_tables"
 * @author Piyush Acharya (@Verisimilitude11)
 * @version 1.2.1
 */
public class CodonDataUtils {

    /**
     * Returns the codon data for the amino acid.
     * 
     * @param name The name of the amino acid.
     * @return A List of codon data for the user-selected amino acid or stop
     *          codon.
     */
    public static List<String> getAminoAcid(final AminoAcidNames name) {
        return switch (name) {
            case ISOLEUCINE -> CodonDataConstants.Isoleucine;
            case LEUCINE -> CodonDataConstants.Leucine;
            case VALINE -> CodonDataConstants.Valine;
            case PHENYLALANINE -> CodonDataConstants.Phenylalanine;
            case METHIONINE -> CodonDataConstants.Methionine;
            case CYSTEINE -> CodonDataConstants.Cysteine;
            case ALANINE -> CodonDataConstants.Alanine;
            case GLYCINE -> CodonDataConstants.Glycine;
            case PROLINE -> CodonDataConstants.Proline;
            case THREONINE -> CodonDataConstants.Threonine;
            case SERINE -> CodonDataConstants.Serine;
            case TYROSINE -> CodonDataConstants.Tyrosine;
            case TRYPTOPHAN -> CodonDataConstants.Tryptophan;
            case GLUTAMINE -> CodonDataConstants.Glutamine;
            case ASPARAGINE -> CodonDataConstants.Asparagine;
            case HISTIDINE -> CodonDataConstants.Histidine;
            case GLUTAMIC_ACID -> CodonDataConstants.GlutamicAcid;
            case ASPARTIC_ACID -> CodonDataConstants.AsparticAcid;
            case LYSINE -> CodonDataConstants.Lysine;
            case ARGININE -> CodonDataConstants.Arginine;
            case STOP -> CodonDataConstants.Stop;
        };
    }
}
