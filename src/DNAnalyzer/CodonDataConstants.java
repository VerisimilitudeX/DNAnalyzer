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

import java.util.*;

/**
 * Declares the codon data for the 20 amino acids
 *
 * @author Shubham Jain (@shubhwip)
 * @version 1.2.1
 * @see "https://en.wikipedia.org/wiki/DNA_and_RNA_codon_tables"
 */

public class CodonDataConstants {

    /**
     * Private CodonDataConstants class constructor to avoid initialization
     */
    private CodonDataConstants() {
    }

    // Declares the start codon data for the 20 amino acids. Start and stop codons
    // indicate the start and stop of an amino acid. There are 20 different amino
    // acids. A protein consists of one or more chains of amino acids (called
    // polypeptides) whose sequence is encoded in a gene.
    protected static final List<String> Isoleucine = Arrays.asList("ATT", "ATC", "ATA");
    protected static final List<String> Leucine =
            Arrays.asList("CTT", "CTC", "CTA", "CTG", "TTA", "TTG");
    protected static final List<String> Valine = Arrays.asList("GTT", "GTC", "GTA", "GTG");
    protected static final List<String> Phenylalanine = Arrays.asList("TTT", "TTC");
    protected static final List<String> Methionine = Arrays.asList("ATG");
    protected static final List<String> Cysteine = Arrays.asList("TGT", "TGC");
    protected static final List<String> Alanine = Arrays.asList("GCT", "GCC", "GCA", "GCG");
    protected static final List<String> Glycine = Arrays.asList("GGT", "GGC", "GGA", "GGG");
    protected static final List<String> Proline = Arrays.asList("CCT", "CCC", "CCA", "CCG");
    protected static final List<String> Threonine = Arrays.asList("ACT", "ACC", "ACA", "ACG");
    protected static final List<String> Serine =
            Arrays.asList("TCT", "TCC", "TCA", "TCG", "AGT", "AGC");
    protected static final List<String> Tyrosine = Arrays.asList("TAT", "TAC");
    protected static final List<String> Tryptophan = Arrays.asList("TGG");
    protected static final List<String> Glutamine = Arrays.asList("CAA", "CAG");
    protected static final List<String> Asparagine = Arrays.asList("AAT", "AAC");
    protected static final List<String> Histidine = Arrays.asList("CAT", "CAC");
    protected static final List<String> GlutamicAcid = Arrays.asList("GAA", "GAG");
    protected static final List<String> AsparticAcid = Arrays.asList("GAT", "GAC");
    protected static final List<String> Lysine = Arrays.asList("AAA", "AAG");
    protected static final List<String> Arginine =
            Arrays.asList("CGT", "CGC", "CGA", "CGG", "AGA", "AGG");

    // Declares the stop codon data for the 20 amino acids. Note that the stop
    // codons are the same for all amino acids.
    protected static final List<String> Stop = Arrays.asList("TAA", "TAG", "TGA");

    // Block to put all AminoAcidNames and their respective codon data into an enum map for faster retrieval
    protected static EnumMap<AminoAcidNames, List<String>> CodonDataAcidMap = new EnumMap<>(AminoAcidNames.class);
    static {
        //Putting in 10 acids at a time because the Map.of() method can take in 20 params at a time
        CodonDataAcidMap.putAll(
                Map.of(AminoAcidNames.ISOLEUCINE, Isoleucine,
                        AminoAcidNames.LEUCINE, Leucine,
                        AminoAcidNames.VALINE, Valine,
                        AminoAcidNames.PHENYLALANINE, Phenylalanine,
                        AminoAcidNames.METHIONINE, Methionine,
                        AminoAcidNames.CYSTEINE, Cysteine,
                        AminoAcidNames.ALANINE, Alanine,
                        AminoAcidNames.GLYCINE, Glycine,
                        AminoAcidNames.PROLINE, Proline,
                        AminoAcidNames.THREONINE, Threonine));

        CodonDataAcidMap.putAll(
                Map.of(AminoAcidNames.SERINE, Serine,
                        AminoAcidNames.TYROSINE, Tyrosine,
                        AminoAcidNames.TRYPTOPHAN, Tryptophan,
                        AminoAcidNames.GLUTAMINE, Glutamine,
                        AminoAcidNames.ASPARAGINE, Asparagine,
                        AminoAcidNames.HISTIDINE, Histidine,
                        AminoAcidNames.GLUTAMIC_ACID, GlutamicAcid,
                        AminoAcidNames.ASPARTIC_ACID, AsparticAcid,
                        AminoAcidNames.LYSINE, Lysine,
                        AminoAcidNames.ARGININE, Arginine));

        CodonDataAcidMap.put(AminoAcidNames.STOP, Stop);
    }
}