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
package DNAnalyzer;

import DNAnalyzer.fastaBinary.FastaBinary;
import picocli.CommandLine;
import picocli.CommandLine.Command;
import picocli.CommandLine.Option;
import picocli.CommandLine.Parameters;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

/**
 * Class for handling command-line arguments.
 *
 * @author Nishant Vikramaditya (@Nv7-GitHub)
 * @version 1.2.1
 */

@Command(name = "DNAnalyzer", description = "A program to analyze DNA sequences.", subcommands = { Analyze.class }, mixinStandardHelpOptions = true)
public class CmdArgs {
    @Command(name = "compress", description = "Compress a DNA sequence.", mixinStandardHelpOptions = true)
    public void compress(@Parameters(paramLabel = "DNA", description = "The file to compress.") File input, @Parameters(paramLabel = "Output", description = "The file to output to.") File output) throws IOException {
        DnaData fd = DnaData.fromFile(input);
        Files.write(output.toPath(), fd.toBinaryData());
    }

    @Command(name = "decompress", description = "Decompress a DNA sequence.", mixinStandardHelpOptions = true)
    public void decompress(@Parameters(paramLabel = "DNA", description = "The file to decompress.") File input, @Parameters(paramLabel = "Output", description = "The file to output to.") File output) throws IOException {
        DnaData fd = DnaData.fromFile(input);
        Files.writeString(output.toPath(), fd.toFastaData());
    }
}
@Command(name = "analyze", description = "Analyze a sequence.", mixinStandardHelpOptions = true)
class Analyze implements Runnable {
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
     * Reads the contents of a file, stripping out newlines and converting
     * everything to lowercase.
     *
     * @param file the file to read
     * @return String with the contents of the file (newlines removed and converted
     *         to lowercase)
     * @throws IOException if there is an error reading the file
     */
    String readDnaFile(final File file) throws IOException {
        return DnaData.fromFile(file).toFastaData();
    }

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
        DNAAnalysis dnaAnalyzer = dnaAnalyzer(aminoAcid)
                .isValidDna()
                .replaceDNA("u", "t");

        if (reverse) {
            dnaAnalyzer = dnaAnalyzer.reverseDna();
        }

        dnaAnalyzer
                .printProteins()
                .outPutCodons(minCount, maxCount)
                .printLongestProtein();

        if (Properties.isRandomDNA(dnaAnalyzer.dna().getDna())) {
            System.out.println("\n" + dnaFile.getName() + " has been detected to be random.");
        }
    }

    /**
     * @param aminoAcid representing the start of the gene
     * @return DnaAnalyzer which provides functions to analyze the dnaFile, protein
     *         file and supplied aminoAcid
     */
    private DNAAnalysis dnaAnalyzer(final String aminoAcid) {
        try {
            String protein = null;
            Main.clearTerminal();
            final String dna = readDnaFile(dnaFile);
            if (proteinFile != null) {
                protein = readDnaFile(proteinFile);
            }
            return new DNAAnalysis(new DNATools(dna), protein, aminoAcid);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return new DNAAnalysis(null, null, aminoAcid);
        }
    }
}
