/*
 * Copyright © 2025 Piyush Acharya. Some rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * You are entirely responsible for the use of this application, including any and all activities that occur.
 * While DNAnalyzer strives to fix all major bugs that may be either reported by a user or discovered while debugging,
 * they will not be held liable for any loss that the user may incur as a result of using this application, under any circumstances.
 *
 * For further inquiries, please reach out to contact@dnanalyzer.live
 */

package DNAnalyzer.ui.cli;

import static DNAnalyzer.data.Parser.parseFile;

import DNAnalyzer.core.DNAAnalysis;
import DNAnalyzer.core.DNADataUploader;
import DNAnalyzer.core.DNAMutation;
import DNAnalyzer.core.PolygenicRiskCalculator;
import DNAnalyzer.core.Properties;
import DNAnalyzer.data.trait.TraitPrediction;
import DNAnalyzer.data.trait.TraitPredictor;
import DNAnalyzer.qc.QcStats;
import DNAnalyzer.ui.gui.DNAnalyzerGUI;
import DNAnalyzer.utils.core.DNATools;
import DNAnalyzer.utils.core.Utils;
import DNAnalyzer.utils.core.OutputManager;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import picocli.CommandLine.Command;
import picocli.CommandLine.Option;
import picocli.CommandLine.Parameters;

/**
 * Class for handling command-line arguments.
 *
 * @author Nishant Vikramaditya (@Nv7-GitHub)
 * @version 1.2.1
 */
@Command(
    name = "DNAnalyzer",
    mixinStandardHelpOptions = true,
    description =
        "DNAnalyzer is your gateway to deciphering the secrets of DNA. Our innovative AI-powered"
            + " analysis and interpretive tools empower geneticists, physicians, and researchers to"
            + " gain deep insights into DNA sequences, revolutionizing how we understand human"
            + " health and disease.")
public class CmdArgs implements Runnable {
  @Option(
      names = {"--gui"},
      description = "Start in GUI mode")
  Boolean startGUI = false;

  @Option(
      names = {"--amino"},
      description = "The amino acid representing the start of a gene.")
  String aminoAcid = "met"; // Default to methionine, the most common start amino acid

  @Option(
      names = {"--min"},
      description = "The minimum count of the reading frame.")
  int minCount = 0;

  @Option(
      names = {"--max"},
      description = "The maximum count of the reading frame.")
  int maxCount = 0;

  @Parameters(paramLabel = "DNA", description = "The FASTA file to be analyzed.")
  File dnaFile;

  @Option(
      names = {"--find"},
      description = "The DNA sequence to be found within the FASTA file.")
  File proteinFile;

  @Option(
      names = {"--align"},
      description = "Reference FASTA file to align against the main DNA file.")
  File alignFile;

  @Option(
      names = {"--sw-align"},
      description = "Use GPU-accelerated Smith-Waterman local alignment")
  boolean swAlign;

  @Option(
      names = {"--reverse", "-r"},
      description = "Reverse the DNA sequence before processing.")
  boolean reverse;

  @Option(
      names = {"--help", "-h"},
      description = "Prints this help message and exits.",
      help = true)
  boolean help;

  @Option(
      names = {"--version", "-v"},
      description = "Prints version information and exits.")
  boolean version;

  @Option(
      names = {"--rcomplement"},
      description = "Prints the complement of the DNA sequence.")
  boolean rcomplement;

  @Option(
      names = {"--mutate"},
      description =
          "Generates 10 mutations of the DNA sequence, each with the specified number of mutations,"
              + " and saves them to a file.")
  int mutationCount = 0;

  @Option(
      names = {"--verbose", "-V"},
      description = "Enable verbose mode (detailed output)")
  boolean verbose;

  @Option(
      names = {"--detailed", "-D"},
      description = "Generate detailed report with statistical analysis")
  boolean detailed;

  @Option(
      names = {"--quick", "-Q"},
      description = "Quick analysis with basic features only")
  boolean quick;

  @Option(
      names = {"--enable-plugins"},
      description = "Load plugins from the plugins directory")
  boolean enablePlugins;

  @Option(
      names = {"--gc-window"},
      description = "Window size for GC content calculation")
  Integer gcWindow;

  @Option(
      names = {"--23andme"},
      description = "Path to a 23andMe genotype file for trait analysis")
  File genotypeFile;

  @Option(
      names = {"--prs"},
      description = "CSV of SNP weights for polygenic risk scoring")
  File prsWeights;

  @Option(
      names = {"--orfs"},
      description = "Display open reading frames with amino acid translation")
  boolean showOrfs;

  @Option(
      names = {"--profile", "-p"},
      description = "Use predefined analysis profile: basic, detailed, quick, research, mutation, clinical")
  String profile;

  private OutputManager outputManager;

  /**
   * Output a list of proteins, GC content, Nucleotide content, and other information found in a DNA
   * sequence.
   *
   * @throws IllegalArgumentException when the DNA FASTA file contains an invalid DNA sequence
   */
  @Override
  public void run() {
    if (help) {
      if (profile != null && profile.equals("list")) {
        System.out.println(AnalysisProfile.getProfileList());
      }
      return;
    }

    if (version) {
      System.out.println("===========================");
      System.out.println("| DNAnalyzer " + Properties.getVersion() + " |");
      System.out.println("===========================\n");
    }

    // Apply profile if specified
    if (profile != null && !profile.equals("list")) {
      try {
        AnalysisProfile selectedProfile = AnalysisProfile.valueOf(profile.toUpperCase());
        selectedProfile.applyTo(this);
        System.out.println("🔬 Using " + selectedProfile.name().toLowerCase() + " analysis profile: " + selectedProfile.getDescription());
      } catch (IllegalArgumentException e) {
        System.err.println("❌ Unknown profile: " + profile);
        System.err.println(AnalysisProfile.getProfileList());
        return;
      }
    }
    if (Objects.equals(Boolean.TRUE, startGUI)) {
      String[] args = new String[0];
      DNAnalyzerGUI.launchIt(args);
    } else {
      DNAAnalysis dnaAnalyzer = dnaAnalyzer(aminoAcid).isValidDna().replaceDNA("u", "t");

      if (alignFile != null) {
        try {
          String reference = parseFile(alignFile);
          String query = dnaAnalyzer.dna().getDna();
          DNAnalyzer.utils.alignment.SequenceAligner.AlignmentResult result;
          if (swAlign) {
            result = DNAnalyzer.utils.alignment.SmithWatermanAligner.align(query, reference);
          } else {
            result = DNAnalyzer.utils.alignment.SequenceAligner.align(query, reference);
          }
          System.out.println("Alignment score: " + result.score());
          System.out.println(result.alignedSeq1());
          System.out.println(result.alignedSeq2());
        } catch (Exception e) {
          System.err.println("Alignment failed: " + e.getMessage());
        }
        return;
      }

      if (mutationCount > 0) {
        String mutationFilePath = outputManager.getMutationFilePath().toString();
        DNAMutation.generateAndWriteMutatedSequences(
            dnaAnalyzer.dna().getDna(), mutationCount, System.out, mutationFilePath);
        outputManager.registerFile("Sequence Analysis", outputManager.getMutationFilePath(), 
            String.format("Generated %d mutations of the input sequence", mutationCount));
      }

      if (reverse) {
        dnaAnalyzer = dnaAnalyzer.reverseDna();
      }

      if (rcomplement) {
        dnaAnalyzer = dnaAnalyzer.reverseComplement();
      }

      if (gcWindow != null) {
        double[] gcs = dnaAnalyzer.dna().gcContentWindow(gcWindow);
        for (int i = 0; i < gcs.length; i++) {
          int start = i + 1;
          int end = i + gcWindow;
          System.out.printf("%d-%d: %.2f%%%n", start, end, gcs[i] * 100);
        }
      }

      if (quick) {
        dnaAnalyzer.printProteins(System.out);
      } else if (detailed) {
        dnaAnalyzer
            .printProteins(System.out)
            .printHighCoverageRegions(System.out)
            .outPutCodons(minCount, maxCount, System.out)
            .printLongestProtein(System.out);
      } else {
        dnaAnalyzer
            .printProteins(System.out)
            .printHighCoverageRegions(System.out)
            .printLongestProtein(System.out);
      }

      if (genotypeFile != null) {
        try {
          Map<String, String> snps = DNADataUploader.uploadFrom23andMe(genotypeFile.getPath());
          List<TraitPrediction> traits = TraitPredictor.predictTraits(snps);
          System.out.println("\nTrait Predictions:");
          for (TraitPrediction t : traits) {
            System.out.println(t.trait() + ": " + t.prediction() + " (" + t.genotype() + ")");
          }
          System.out.println();
          System.out.println(TraitPredictor.DISCLAIMER);
          if (prsWeights != null) {
            Map<String, PolygenicRiskCalculator.RiskWeight> weights =
                PolygenicRiskCalculator.loadWeights(prsWeights.getPath());
            double score = PolygenicRiskCalculator.computeScore(snps, weights);
            System.out.printf("Polygenic Risk Score: %.3f%n", score);
          }
        } catch (IOException e) {
          System.err.println("Error processing genotype data: " + e.getMessage());
        }
      }

      if (Properties.isRandomDNA(dnaAnalyzer.dna().getDna())) {
        System.out.println("\n" + dnaFile.getName() + " has been detected to be random.");
      }

      if (enablePlugins) {
        new DNAnalyzer.plugin.PluginManager().runPlugins(dnaAnalyzer.dna(), System.out);
      }

      if (showOrfs) {
        DNAnalyzer.core.readingframe.ReadingFrameAnalyzer rfAnalyzer =
            new DNAnalyzer.core.readingframe.ReadingFrameAnalyzer(
                new DNAnalyzer.core.readingframe.PoissonCalculator());
        var orfs = rfAnalyzer.findOpenReadingFrames(dnaAnalyzer.dna().getDna().toUpperCase(), 300);
        System.out.println("\nOpen Reading Frames:");
        for (var orf : orfs) {
          System.out.printf(
              "Frame %d (%s) %d-%d: %s -> %s%n",
              orf.frame(),
              orf.forward() ? "forward" : "reverse",
              orf.start(),
              orf.end(),
              orf.sequence(),
              orf.aminoAcids());
        }
      }

      // Print file summary at the end
      if (outputManager != null) {
        outputManager.printFileSummary();
      }
    }
  }

  /**
   * @param aminoAcid representing the start of the gene
   * @return DnaAnalyzer which provides functions to analyze the dnaFile, protein file and supplied
   *     aminoAcid
   */
  private DNAAnalysis dnaAnalyzer(final String aminoAcid) {
    try {
      String protein = null;
      Utils.clearTerminal();
      final String dna = parseFile(dnaFile);
      
      // Initialize OutputManager
      this.outputManager = new OutputManager(dnaFile.getName());
      
      QcStats qc = new QcStats(dnaFile, dna);
      qc.printSummary(System.out);
      
      // Generate QC chart with organized output
      String qcChartPath = outputManager.getQcChartPath(dnaFile.getName()).toString();
      qc.writeChart(qcChartPath);
      outputManager.registerFile("Quality Control", outputManager.getQcChartPath(dnaFile.getName()), 
          "Base composition and quality metrics chart");
      
      System.out.println("📊 Quality control chart generated: " + qcChartPath);
      
      if (proteinFile != null) {
        protein = parseFile(proteinFile);
      }
      return new DNAAnalysis(new DNATools(dna), protein, aminoAcid);
    } catch (IOException | InterruptedException e) {
      System.err.println(e);
      return new DNAAnalysis(null, null, aminoAcid);
    }
  }
}
