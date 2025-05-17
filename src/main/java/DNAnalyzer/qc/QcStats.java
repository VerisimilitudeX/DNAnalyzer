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

package DNAnalyzer.qc;

import DNAnalyzer.core.DNAAnalysis;
import DNAnalyzer.core.Properties;
import DNAnalyzer.utils.core.BasePairCounter;
import DNAnalyzer.utils.core.FastQ;
import java.io.File;
import java.io.IOException;
import java.io.PrintStream;
import org.jfree.chart.ChartFactory;
import org.jfree.chart.ChartUtils;
import org.jfree.chart.JFreeChart;
import org.jfree.data.category.DefaultCategoryDataset;

/**
 * Generates quality control statistics for a DNA/FASTQ file. Prints GC content, N base count and
 * mean Phred score then renders a small bar chart showing base distribution.
 */
public class QcStats {

  private final String dna;
  private final long[] baseCounts;
  private final double gcContent;
  private final long nBases;
  private final Double meanPhred;

  /** Optional textual representation of the summary. Lazy created. */
  private String cachedSummary;

  /**
   * Construct QC statistics from parsed DNA.
   *
   * @param file source file used for determining Phred scores
   * @param dnaSequence dna sequence parsed from the file
   * @throws IOException when FASTQ parsing fails
   */
  public QcStats(File file, String dnaSequence) throws IOException {
    this.dna = dnaSequence;
    this.baseCounts = calculateBaseCounts(dna);
    this.gcContent = Properties.getGCContent(dna);
    this.nBases = baseCounts[DNAAnalysis.BasePairIndex.UNKNOWN];
    this.meanPhred = calculateMeanPhred(file);
  }

  private long[] calculateBaseCounts(String sequence) {
    return new BasePairCounter(sequence)
        .countAdenine()
        .countThymine()
        .countGuanine()
        .countCytosine()
        .countUnknown()
        .getCounts();
  }

  private Double calculateMeanPhred(File file) throws IOException {
    if (!file.getName().endsWith(".fastq")) {
      return null;
    }
    FastQ fq = new FastQ(file.getPath());
    fq.readFastQ();
    return (double) fq.phred33ToQ(fq.averageQuality());
  }

  /** Print QC summary to provided print stream. */
  public void printSummary(PrintStream out) {
    out.println(summaryAsString());
  }

  /** Returns QC summary as a formatted String. Useful for logging or UI display. */
  public String summaryAsString() {
    if (cachedSummary != null) {
      return cachedSummary;
    }
    StringBuilder sb = new StringBuilder();
    sb.append("=== QC Summary ===\n");
    sb.append(String.format("GC Content: %.2f%%\n", gcContent * 100));
    sb.append("N bases: ").append(nBases).append('\n');
    if (meanPhred != null) {
      sb.append(String.format("Mean Phred: %.2f", meanPhred));
    } else {
      sb.append("Mean Phred: N/A");
    }
    cachedSummary = sb.toString();
    return cachedSummary;
  }

  /**
   * Generate a bar chart of base counts and save to path.
   *
   * @param outputPath destination PNG path
   * @throws IOException when saving fails
   */
  public void writeChart(String outputPath) throws IOException {
    DefaultCategoryDataset dataset = createDataset();

    JFreeChart chart = ChartFactory.createBarChart("Base Distribution", "Base", "Count", dataset);
    ChartUtils.saveChartAsPNG(new File(outputPath), chart, 400, 300);
  }

  private DefaultCategoryDataset createDataset() {
    DefaultCategoryDataset dataset = new DefaultCategoryDataset();
    dataset.addValue(baseCounts[DNAAnalysis.BasePairIndex.ADENINE], "Bases", "A");
    dataset.addValue(baseCounts[DNAAnalysis.BasePairIndex.THYMINE], "Bases", "T");
    dataset.addValue(baseCounts[DNAAnalysis.BasePairIndex.GUANINE], "Bases", "G");
    dataset.addValue(baseCounts[DNAAnalysis.BasePairIndex.CYTOSINE], "Bases", "C");
    dataset.addValue(baseCounts[DNAAnalysis.BasePairIndex.UNKNOWN], "Bases", "N");
    return dataset;
  }

  // getters for use elsewhere if needed
  public double getGcContent() {
    return gcContent;
  }

  public long getnBases() {
    return nBases;
  }

  public Double getMeanPhred() {
    return meanPhred;
  }
}
