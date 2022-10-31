/*
 * Copyright © 2022 DNAnalyzer. Some rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * You are entirely responsible for the use of this application, including any and all activities that occur.
 * While DNAnalyzer strives to fix all major bugs that may be either reported by a user or discovered while debugging,
 * they will not be held liable for any loss that the user may incur as a result of using this application, under any circumstances.
 *
 * For further inquiries, please reach out to contact@dnanalyzer.live
 */
package DNAnalyzer.codon;

import static java.util.Map.entry;

import DNAnalyzer.aminoAcid.*;

import java.util.*;

/**
 * Declares the codon data for the 20 amino acids
 *
 * @author Piyush Acharya (@Verisimilitude11)
 * @version 1.2.1
 * @see "https://en.wikipedia.org/wiki/DNA_and_RNA_codon_tables"
 */
public class CodonDataConstants {

<<<<<<< HEAD
  /** Private CodonDataConstants class constructor to avoid initialization */
  private CodonDataConstants() {}
  // Declares the stop codon data for the 20 amino acids. Note that the stop
  // codons are the same for all amino acids.
  public static final List<String> STOP = List.of("TAA", "TAG", "TGA");

  // Block to put all AminoAcidNames and their respective codon data into an enum
  // map for faster
  // retrieval
  protected static EnumMap<AminoAcid, List<String>> codonDataAcidMap = new EnumMap<>(AminoAcid.class);

  static {
    for(AminoAcid aminoAcid : AminoAcid.values()){
      codonDataAcidMap.put(aminoAcid, aminoAcid.getCodonData());
    }
  }
=======
    /** Private CodonDataConstants class constructor to avoid initialization */
    private CodonDataConstants() {
    }

    // Declares the start codon data for the 20 amino acids. Start and stop codons
    // indicate the start and stop of an amino acid. There are 20 different amino
    // acids. A protein consists of one or more chains of amino acids (called
    // polypeptides) whose sequence is encoded in a gene.
    protected static final List<String> Isoleucine = Arrays.asList("ATT", "ATC", "ATA");
    protected static final List<String> Leucine = Arrays.asList("CTT", "CTC", "CTA", "CTG", "TTA", "TTG");
    protected static final List<String> Valine = Arrays.asList("GTT", "GTC", "GTA", "GTG");
    protected static final List<String> Phenylalanine = Arrays.asList("TTT", "TTC");
    protected static final List<String> Methionine = List.of("ATG");
    protected static final List<String> Cysteine = Arrays.asList("TGT", "TGC");
    protected static final List<String> Alanine = Arrays.asList("GCT", "GCC", "GCA", "GCG");
    protected static final List<String> Glycine = Arrays.asList("GGT", "GGC", "GGA", "GGG");
    protected static final List<String> Proline = Arrays.asList("CCT", "CCC", "CCA", "CCG");
    protected static final List<String> Threonine = Arrays.asList("ACT", "ACC", "ACA", "ACG");
    protected static final List<String> Serine = Arrays.asList("TCT", "TCC", "TCA", "TCG", "AGT", "AGC");
    protected static final List<String> Tyrosine = Arrays.asList("TAT", "TAC");
    protected static final List<String> Tryptophan = List.of("TGG");
    protected static final List<String> Glutamine = Arrays.asList("CAA", "CAG");
    protected static final List<String> Asparagine = Arrays.asList("AAT", "AAC");
    protected static final List<String> Histidine = Arrays.asList("CAT", "CAC");
    protected static final List<String> GlutamicAcid = Arrays.asList("GAA", "GAG");
    protected static final List<String> AsparticAcid = Arrays.asList("GAT", "GAC");
    protected static final List<String> Lysine = Arrays.asList("AAA", "AAG");
    protected static final List<String> Arginine = Arrays.asList("CGT", "CGC", "CGA", "CGG", "AGA", "AGG");

    // Declares the stop codon data for the 20 amino acids. Note that the stop
    // codons are the same for all amino acids.
    public static final List<String> STOP = Arrays.asList("TAA", "TAG", "TGA");

    // Block to put all AminoAcidNames and their respective codon data into an enum
    // map for faster
    // retrieval
    protected static EnumMap<AminoAcid, List<String>> CodonDataAcidMap = new EnumMap<>(AminoAcid.class);

    static {
        CodonDataAcidMap.putAll(
                Map.ofEntries(
                        entry(AminoAcid.ISOLEUCINE, Isoleucine),
                        entry(AminoAcid.LEUCINE, Leucine),
                        entry(AminoAcid.VALINE, Valine),
                        entry(AminoAcid.PHENYLALANINE, Phenylalanine),
                        entry(AminoAcid.METHIONINE, Methionine),
                        entry(AminoAcid.CYSTEINE, Cysteine),
                        entry(AminoAcid.ALANINE, Alanine),
                        entry(AminoAcid.GLYCINE, Glycine),
                        entry(AminoAcid.PROLINE, Proline),
                        entry(AminoAcid.THREONINE, Threonine),
                        entry(AminoAcid.SERINE, Serine),
                        entry(AminoAcid.TYROSINE, Tyrosine),
                        entry(AminoAcid.TRYPTOPHAN, Tryptophan),
                        entry(AminoAcid.GLUTAMINE, Glutamine),
                        entry(AminoAcid.ASPARAGINE, Asparagine),
                        entry(AminoAcid.HISTIDINE, Histidine),
                        entry(AminoAcid.GLUTAMIC_ACID, GlutamicAcid),
                        entry(AminoAcid.ASPARTIC_ACID, AsparticAcid),
                        entry(AminoAcid.LYSINE, Lysine),
                        entry(AminoAcid.ARGININE, Arginine)));
    }
>>>>>>> main
}
