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

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import picocli.CommandLine.Command;
import picocli.CommandLine.Option;
import picocli.CommandLine.Parameters;

/**
 * Class for handling command-line arguments.
 *
 * @version 1.2.1
 */
@Command(name = "DNAnalyzer", mixinStandardHelpOptions = true, description = "A program to analyze DNA sequences.")
public class CmdArgs implements Runnable {
    private static final short READING_FRAME = 1;

    @Option(required = true, names = { "--amino" }, description = "The amino acid representing the start of a gene.")
    String aminoAcid;

    @Option(names = { "--min" }, description = "The minimum count of the reading frame.")
    int minCount = 0;

    @Option(names = { "--max" }, description = "The maximum count of the reading frame.")
    int maxCount = 0;

    @Parameters(paramLabel = "DNA", description = "The FASTA file to be analyzed.")
    File dnaFile;

    @Option(names = { "--find" }, description = "The DNA sequence to be found within the FASTA file.")
    File proteinFile;

    @Option(names = { "--reverse", "-r" }, description = "Reverse the DNA sequence before processing.")
    boolean reverse;

    /**
     * Output a list of proteins, GC content, Nucleotide content, and other
     * information found in a DNA
     * sequence.
     *
     * @throws IllegalArgumentException when the DNA FASTA file contains an invalid
     *                                  DNA sequence
     */
    @Override
    public void run() {
        try {
            Main.clearTerminal();

            final String dna = readDNA();
            final List<String> proteins = new ProteinFinder().getProtein(dna, aminoAcid);
            // Output the proteins, GC content, and nucleotide cnt found in the DNA
            Properties.printProteinList(proteins, aminoAcid);
            System.out.println("\nGC-content (genome): " + Properties.getGCContent(dna) + "\n");
            Properties.printNucleotideCount(dna);

            // Output the number of codons based on the reading frame the user wants to look
            // at, and minimum and maximum filters
            final CodonFrame codonFrame = new CodonFrame(dna, READING_FRAME, minCount, maxCount);
            final ReadingFrames aap = new ReadingFrames(codonFrame);
            System.out.println();
            aap.printCodonCounts();

            // Find protein sequence in DNA if necessary
            readProtein().ifPresent(pr -> findProtein(dna, pr));

            // Find the longest protein in DNA
            ProteinAnalysis.printLongestProtein(proteins);

            // Print if DNA is random
            if (Properties.isRandomDNA(dna)) {
                System.out.println("\n" + dnaFile.getName() + " has been detected to be random.");
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }

    /**
     * Reads the contents of a file, stripping out newlines and converting
     * everything to lowercase.
     *
     * @param file the file to read
     * @throws IOException if there is an error reading the file
     * @return String with the contents of the file (newlines removed and converted
     *         to lowercase)
     */
    private static String readFile(File file) throws IOException {
        return Files.readString(file.toPath()).replace("\n", "").toLowerCase();
    }

    /**
     * Find protein sequence in DNA and print to stdout its position.
     *
     * @param dna     The DNA string
     * @param protein The protein string
     */
    private void findProtein(String dna, String protein) {
        Matcher m = Pattern.compile(protein).matcher(dna);
        if (m.find()) {
            System.out.println(
                    "\nProtein sequence found at index " + m.start() + " in the DNA sequence.");
        } else {
            System.out.println("\nProtein sequence not found in the DNA sequence.");
        }
    }

    /** Read protein form the proteinFile */
    private Optional<String> readProtein() throws IOException {
        if (proteinFile == null) {
            return Optional.empty();
        }
        return Optional.of(readFile(proteinFile));
    }

    /** Load and preprocess DNA data */
    private String readDNA() throws IOException { // Valid DNA?
        String dna = readFile(dnaFile);
        if (!dna.matches("[atgc]+")) {
            throw new IllegalArgumentException("Invalid characters present in DNA sequence.");
        }
        // Replace Uracil with Thymine (in case user entered RNA and not DNA)
        dna = dna.replace("u", "t");

        if (reverse) {
            dna = new StringBuilder(dna).reverse().toString();
        }
        return dna;

    }
}
