package DNAnalyzer.cli;

import DNAnalyzer.analysis.AminoAcid;
import DNAnalyzer.analysis.MutationGenerator;
import DNAnalyzer.analysis.ReverseComplementer;
import DNAnalyzer.analysis.SequenceAnalyzer;
import DNAnalyzer.analysis.SequenceAnalyzer.GCWindow;
import DNAnalyzer.analysis.SequenceAnalyzer.OpenReadingFrame;
import DNAnalyzer.cli.AnalysisProfile.ProfileDefaults;
import DNAnalyzer.output.ChartGenerator;
import DNAnalyzer.output.OutputManager;
import DNAnalyzer.prs.GenotypeData;
import DNAnalyzer.prs.PolygenicRiskCalculator;
import DNAnalyzer.prs.PolygenicRiskCalculator.VariantContribution;
import DNAnalyzer.prs.PolygenicRiskResult;
import DNAnalyzer.prs.RiskWeightTable;
import DNAnalyzer.reporting.AiReport;
import DNAnalyzer.reporting.AiReportContext;
import DNAnalyzer.reporting.AiReportService;
import DNAnalyzer.util.FastaParser;
import DNAnalyzer.util.FastaParser.FastaRecord;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.time.Clock;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.Callable;
import java.util.stream.Collectors;
import picocli.CommandLine;
import picocli.CommandLine.Command;
import picocli.CommandLine.Option;
import picocli.CommandLine.Parameters;

@Command(
    name = "DNAnalyzer",
    description = "AI-assisted DNA analysis toolkit",
    mixinStandardHelpOptions = true,
    versionProvider = AnalysisCommand.VersionProvider.class)
public class AnalysisCommand implements Callable<Integer> {

  private static final DateTimeFormatter MUTATION_TIMESTAMP =
      DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss");

  @Parameters(index = "0", description = "The FASTA file to analyze.")
  private Path fastaPath;

  @Option(
      names = "--profile",
      description =
          "Preset profile to use (basic, detailed, quick, research, mutation, clinical, list).")
  private String profileName;

  @Option(
      names = "--mutate",
      description = "Number of mutated sequences to generate (default depends on profile).")
  private Integer mutateCount;

  @Option(
      names = "--mutate-edits",
      description = "Number of edits per mutated sequence (default: 3).")
  private Integer mutateEdits;

  @Option(names = "--rcomplement", description = "Write the reverse complement sequence to output.")
  private Boolean reverseComplement;

  @Option(names = "--detailed", description = "Enable detailed analysis output.")
  private Boolean detailed;

  @Option(names = "--verbose", description = "Enable verbose console output.")
  private Boolean verbose;

  @Option(names = "--quick", description = "Run a lightweight analysis (minimal outputs).")
  private Boolean quick;

  @Option(
      names = "--gc-window",
      description = "Window size for GC-rich region detection (default: profile-specific).")
  private Integer gcWindow;

  @Option(
      names = "--gc-threshold",
      description = "GC-content threshold for reporting high GC regions (default: 0.55).")
  private Double gcThreshold;

  @Option(
      names = "--amino",
      description = "Highlight codons for the specified amino acid (e.g. ser, lysine).")
  private String aminoAcid;

  @Option(names = "--find", description = "Search for an explicit DNA motif within the sequence.")
  private String motif;

  @Option(names = "--orfs", description = "Report open reading frames.")
  private Boolean orfs;

  @Option(names = "--orf-min", description = "Minimum ORF length (in bases). Default: 150.")
  private Integer orfMin;

  @Option(names = "--output", description = "Directory to place results (default: ./output)")
  private Path outputDirectory;

  @Option(
      names = "--23andme",
      description = "23andMe genotype raw data file for polygenic risk scoring.")
  private Path genotypeFile;

  @Option(
      names = "--no-ai",
      description =
          "Disable AI-generated Researcher/Layperson summaries even when an API key is configured.")
  private boolean disableAi;

  @Option(
      names = "--prs",
      split = ",",
      paramLabel = "FILE",
      description = "Polygenic risk score weight CSV file(s).")
  private List<Path> prsFiles = new ArrayList<>();

  @Option(names = "--edna", hidden = true)
  private boolean deprecatedEdna;

  private final Clock clock;

  public AnalysisCommand() {
    this(Clock.systemDefaultZone());
  }

  public AnalysisCommand(Clock clock) {
    this.clock = clock;
  }

  @Override
  public Integer call() throws Exception {
    if (profileName != null && profileName.equalsIgnoreCase("list")) {
      System.out.println("Available profiles: " + AnalysisProfile.listProfiles());
      return 0;
    }

    AnalysisProfile profile = AnalysisProfile.fromName(profileName).orElse(null);
    ProfileDefaults defaults = profile != null ? profile.defaults() : null;

    boolean effectiveDetailed =
        resolveBoolean(detailed, defaults != null ? defaults.detailed() : null, false);
    boolean effectiveVerbose =
        resolveBoolean(verbose, defaults != null ? defaults.verbose() : null, false);
    boolean effectiveQuick =
        resolveBoolean(quick, defaults != null ? defaults.quick() : null, false);
    boolean effectiveReverseComplement =
        resolveBoolean(
            reverseComplement, defaults != null ? defaults.reverseComplement() : null, false);
    boolean effectiveOrfs = resolveBoolean(orfs, defaults != null ? defaults.orfs() : null, false);

    int effectiveMutations =
        resolveInteger(mutateCount, defaults != null ? defaults.mutationCount() : null, 0);
    int effectiveMutateEdits = mutateEdits != null ? mutateEdits : 3;
    int effectiveGcWindow =
        resolveInteger(gcWindow, defaults != null ? defaults.gcWindow() : null, 150);
    double effectiveGcThreshold = gcThreshold != null ? gcThreshold : 0.55;
    int effectiveOrfMin = orfMin != null ? orfMin : 150;

    Path resolvedOutput = outputDirectory != null ? outputDirectory : Path.of("output");

    FastaRecord record = FastaParser.parseSingle(fastaPath);
    SequenceAnalyzer analyzer = new SequenceAnalyzer(record.sequence());

    if (analyzer.length() == 0) {
      System.err.println("Input sequence is empty after parsing.");
      return CommandLine.ExitCode.USAGE;
    }

    OutputManager outputManager =
        OutputManager.create(resolvedOutput, fastaPath.getFileName().toString(), clock);

    System.out.println("Reading DNA: " + record.header());
    double gcContent = analyzer.gcContent();
    System.out.printf(Locale.ROOT, "GC Content: %.2f%%%n", gcContent * 100);

    Map<Character, Long> counts = analyzer.nucleotideCounts();
    Map<String, Integer> codonUsage = effectiveQuick ? Map.of() : analyzer.codonUsage();

    List<String> insights = new ArrayList<>();
    List<String> warnings = new ArrayList<>();

    long totalBases = counts.values().stream().mapToLong(Long::longValue).sum();
    if (totalBases != analyzer.length()) {
      warnings.add(
          String.format(
              Locale.ROOT,
              "Nucleotide counts (%d) do not match sequence length (%d).",
              totalBases,
              analyzer.length()));
    }
    long ambiguousBases = counts.getOrDefault('N', 0L);
    if (ambiguousBases > 0) {
      warnings.add(
          String.format(Locale.ROOT, "Sequence contains %d ambiguous bases (N).", ambiguousBases));
    }

    if (gcContent >= 0.6) {
      insights.add("Sequence is GC-rich relative to typical mammalian averages (~40%).");
    } else if (gcContent <= 0.4) {
      insights.add(
          "Sequence is GC-poor, which can reduce melting temperature and transcription"
              + " efficiency.");
    }

    if (!effectiveQuick) {
      counts.entrySet().stream()
          .sorted(Map.Entry.comparingByKey())
          .forEach(
              entry ->
                  System.out.printf(Locale.ROOT, " %s: %d%n", entry.getKey(), entry.getValue()));
    }

    ChartGenerator chartGenerator = new ChartGenerator();
    if (!effectiveQuick) {
      Path chartPath =
          chartGenerator.generateBaseCompositionChart(
              counts, outputManager.chartsDir(), fastaPath.getFileName().toString());
      outputManager.registerFile(
          "charts", chartPath, "Base composition and GC quality metrics chart");
      System.out.println("📊 Quality control chart generated: " + chartPath.toAbsolutePath());
    }

    String motifUpper = motif != null ? motif.toUpperCase(Locale.ROOT) : null;
    if (motifUpper != null && !motifUpper.isBlank()) {
      int motifCount = analyzer.countMotifOccurrences(motifUpper);
      System.out.printf(Locale.ROOT, "Motif '%s' occurrences: %d%n", motifUpper, motifCount);
      if (motifCount > 0) {
        insights.add(
            String.format(
                Locale.ROOT,
                "Motif '%s' detected %d time(s) across the sequence.",
                motifUpper,
                motifCount));
      }
    }

    if (aminoAcid != null) {
      Optional<AminoAcid> acid = AminoAcid.fromInput(aminoAcid);
      if (acid.isPresent()) {
        int occ = 0;
        for (String codon : acid.get().codons()) {
          occ += analyzer.countMotifOccurrences(codon);
        }
        System.out.printf(Locale.ROOT, "%s codon occurrences: %d%n", acid.get().displayName(), occ);
        if (occ > 0) {
          insights.add(
              String.format(
                  Locale.ROOT,
                  "%s codons appear %d time(s), indicating potential enrichment.",
                  acid.get().displayName(),
                  occ));
        }
      } else {
        System.out.println(
            "⚠️  Unknown amino acid '" + aminoAcid + "'. Supported: " + AminoAcid.listSupported());
      }
    }

    List<GCWindow> gcRegions = analyzer.highGcRegions(effectiveGcWindow, effectiveGcThreshold);
    if (!gcRegions.isEmpty()) {
      System.out.printf(
          Locale.ROOT,
          "High GC regions (window=%d, threshold=%.2f): %d%n",
          effectiveGcWindow,
          effectiveGcThreshold,
          gcRegions.size());
      if (effectiveVerbose || effectiveDetailed) {
        gcRegions.stream()
            .sorted(Comparator.comparingInt(GCWindow::startInclusive))
            .limit(5)
            .forEach(
                window ->
                    System.out.printf(
                        Locale.ROOT,
                        "  - [%d-%d) GC=%.2f%%%n",
                        window.startInclusive(),
                        window.endExclusive(),
                        window.gcContent() * 100));
      }
      gcRegions.stream()
          .max(Comparator.comparingDouble(GCWindow::gcContent))
          .ifPresent(
              window ->
                  insights.add(
                      String.format(
                          Locale.ROOT,
                          "Peak GC window spans %d-%d with %.1f%% GC content.",
                          window.startInclusive(),
                          window.endExclusive(),
                          window.gcContent() * 100)));
    }

    List<OpenReadingFrame> orfList =
        effectiveOrfs ? analyzer.findOpenReadingFrames(effectiveOrfMin) : List.of();
    if (!orfList.isEmpty()) {
      System.out.printf(
          Locale.ROOT, "Detected %d ORFs (min length %d).%n", orfList.size(), effectiveOrfMin);
      if (effectiveDetailed || effectiveVerbose) {
        orfList.stream()
            .sorted(Comparator.comparingInt(OpenReadingFrame::length).reversed())
            .limit(5)
            .forEach(
                orf ->
                    System.out.printf(
                        Locale.ROOT,
                        "  - Frame %d: [%d-%d) length=%d%n",
                        orf.frame(),
                        orf.start(),
                        orf.end(),
                        orf.length()));
      }
      orfList.stream()
          .max(Comparator.comparingInt(OpenReadingFrame::length))
          .ifPresent(
              orf ->
                  insights.add(
                      String.format(
                          Locale.ROOT,
                          "Longest ORF spans frame %d from %d-%d (%d bp).",
                          orf.frame(),
                          orf.start(),
                          orf.end(),
                          orf.length())));
    }

    List<RiskResult> riskResults = new ArrayList<>();
    if ((genotypeFile != null) || (prsFiles != null && !prsFiles.isEmpty())) {
      if (genotypeFile == null) {
        System.err.println("Polygenic risk scoring requires a --23andme genotype file.");
      } else if (prsFiles == null || prsFiles.isEmpty()) {
        System.err.println("Polygenic risk scoring requires at least one --prs weight table.");
      } else {
        try {
          GenotypeData genotypeData = GenotypeData.from23AndMe(genotypeFile);
          PolygenicRiskCalculator calculator = new PolygenicRiskCalculator();
          for (Path weightFile : prsFiles) {
            RiskWeightTable table = RiskWeightTable.fromCsv(weightFile);
            PolygenicRiskResult result = calculator.calculate(genotypeData, table);
            Path riskReport = writeRiskReport(outputManager, result, weightFile);
            outputManager.registerFile(
                "reports", riskReport, "Polygenic risk score summary: " + result.name());
            System.out.printf(
                Locale.ROOT,
                "PRS %s: raw=%.3f normalised=%.3f coverage=%.1f%%%n",
                result.name(),
                result.rawScore(),
                result.normalisedScore(),
                result.coverage() * 100);
            riskResults.add(new RiskResult(result, weightFile, riskReport));
            insights.add(
                String.format(
                    Locale.ROOT,
                    "PRS %s normalised score %.3f with %.1f%% variant coverage.",
                    result.name(),
                    result.normalisedScore(),
                    result.coverage() * 100));
          }
        } catch (IOException ex) {
          System.err.println("Polygenic risk scoring failed: " + ex.getMessage());
        }
      }
    }

    Path mutationsFile = null;
    if (effectiveMutations > 0) {
      MutationGenerator generator = new MutationGenerator();
      List<MutationGenerator.Mutation> mutations =
          generator.generate(analyzer.sequence(), effectiveMutateEdits, effectiveMutations);
      if (!mutations.isEmpty()) {
        String timestamp = LocalDateTime.now(clock).format(MUTATION_TIMESTAMP);
        mutationsFile = outputManager.sequencesDir().resolve("mutations_" + timestamp + ".fa");
        writeMutationsFile(mutationsFile, mutations);
        outputManager.registerFile(
            "sequences",
            mutationsFile,
            String.format(
                Locale.ROOT, "Generated %d mutations of the input sequence", mutations.size()));
        System.out.println("🧪 Mutations written to: " + mutationsFile.toAbsolutePath());
        insights.add(
            String.format(
                Locale.ROOT,
                "Generated %d in-silico mutation sequences (%d edits each).",
                mutations.size(),
                effectiveMutateEdits));
      }
    }

    Path reverseComplementFile = null;
    if (effectiveReverseComplement) {
      String reverseComplement = ReverseComplementer.reverseComplement(analyzer.sequence());
      reverseComplementFile = outputManager.sequencesDir().resolve("reverse_complement.fa");
      Files.writeString(
          reverseComplementFile, ">reverse_complement\n" + wrapSequence(reverseComplement));
      outputManager.registerFile(
          "sequences", reverseComplementFile, "Reverse complement of input sequence");
      System.out.println(
          "↔️ Reverse complement written to: " + reverseComplementFile.toAbsolutePath());
      insights.add("Reverse complement sequence exported for strand comparison.");
    }

    if (!effectiveQuick) {
      String report =
          buildReport(
              record,
              analyzer,
              gcContent,
              counts,
              codonUsage,
              gcRegions,
              orfList,
              mutationsFile != null ? mutationsFile : null,
              reverseComplementFile != null ? reverseComplementFile : null,
              effectiveMutations,
              effectiveMutateEdits,
              riskResults);
      outputManager.writeReport("analysis_summary.txt", report);
    }

    if (!disableAi) {
      AiReportContext aiContext =
          AiReportContext.builder()
              .analysisMode(effectiveQuick ? "quick" : effectiveDetailed ? "detailed" : "basic")
              .sequenceLabel(record.header())
              .sequenceSnippet(
                  record.sequence().substring(0, Math.min(record.sequence().length(), 120)))
              .sequenceLength(analyzer.length())
              .gcContent(gcContent)
              .nucleotideCounts(counts)
              .gcWindow(effectiveGcWindow)
              .gcThreshold(effectiveGcThreshold)
              .highGcRegions(summariseGcRegions(gcRegions))
              .openReadingFrames(effectiveOrfs ? summariseOrfs(orfList) : List.of())
              .topCodons(summariseTopCodons(codonUsage))
              .mutationSequences(mutationsFile != null ? effectiveMutations : 0)
              .mutationEdits(effectiveMutateEdits)
              .reverseComplementGenerated(reverseComplementFile != null)
              .additionalInsights(insights)
              .warnings(warnings)
              .build();

      AiReportService aiService = new AiReportService();
      aiService
          .generateReports(aiContext)
          .ifPresent(
              report -> {
                printAiReports(report);
                try {
                  outputManager.writeReport("researcher_report.txt", report.researcherNarrative());
                  outputManager.writeReport("layperson_report.txt", report.laypersonNarrative());
                } catch (IOException ex) {
                  System.err.println(
                      "Unable to persist AI-generated summaries: " + ex.getMessage());
                }
              });
    } else {
      System.out.println("AI summaries disabled (--no-ai).");
    }

    outputManager.printSummary();
    return CommandLine.ExitCode.OK;
  }

  private boolean resolveBoolean(Boolean explicit, Boolean profileDefault, boolean fallback) {
    if (explicit != null) {
      return explicit;
    }
    if (profileDefault != null) {
      return profileDefault;
    }
    return fallback;
  }

  private int resolveInteger(Integer explicit, Integer profileDefault, int fallback) {
    if (explicit != null) {
      return explicit;
    }
    if (profileDefault != null) {
      return profileDefault;
    }
    return fallback;
  }

  private List<String> summariseGcRegions(List<GCWindow> regions) {
    return regions.stream()
        .sorted(Comparator.comparingDouble(GCWindow::gcContent).reversed())
        .limit(10)
        .map(
            window ->
                String.format(
                    Locale.ROOT,
                    "%d-%d (%.1f%%)",
                    window.startInclusive(),
                    window.endExclusive(),
                    window.gcContent() * 100))
        .collect(Collectors.toList());
  }

  private List<String> summariseOrfs(List<OpenReadingFrame> orfs) {
    return orfs.stream()
        .sorted(Comparator.comparingInt(OpenReadingFrame::length).reversed())
        .limit(10)
        .map(
            orf ->
                String.format(
                    Locale.ROOT,
                    "frame %d: %d-%d (%d bp)",
                    orf.frame(),
                    orf.start(),
                    orf.end(),
                    orf.length()))
        .collect(Collectors.toList());
  }

  private List<String> summariseTopCodons(Map<String, Integer> codonUsage) {
    return codonUsage.entrySet().stream()
        .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
        .limit(10)
        .map(entry -> entry.getKey() + ": " + entry.getValue())
        .collect(Collectors.toList());
  }

  private void printAiReports(AiReport report) {
    System.out.println();
    System.out.println("Researcher Report");
    System.out.println("-----------------");
    System.out.println(report.researcherNarrative().trim());
    System.out.println();
    System.out.println("Layperson Report");
    System.out.println("----------------");
    System.out.println(report.laypersonNarrative().trim());
    System.out.println();
  }

  private void writeMutationsFile(Path file, List<MutationGenerator.Mutation> mutations)
      throws IOException {
    StringBuilder builder = new StringBuilder();
    for (MutationGenerator.Mutation mutation : mutations) {
      builder.append(">mutation_").append(mutation.index()).append('\n');
      builder.append(wrapSequence(mutation.mutatedSequence()));
    }
    Files.writeString(file, builder.toString());
  }

  private String wrapSequence(String sequence) {
    StringBuilder builder = new StringBuilder();
    final int lineLength = 70;
    for (int i = 0; i < sequence.length(); i += lineLength) {
      int end = Math.min(sequence.length(), i + lineLength);
      builder.append(sequence, i, end).append('\n');
    }
    return builder.toString();
  }

  private String buildReport(
      FastaRecord record,
      SequenceAnalyzer analyzer,
      double gcContent,
      Map<Character, Long> counts,
      Map<String, Integer> codonUsage,
      List<GCWindow> gcRegions,
      List<OpenReadingFrame> orfs,
      Path mutationsFile,
      Path reverseComplementFile,
      int mutationCount,
      int editsPerMutation,
      List<RiskResult> riskResults) {
    StringBuilder report = new StringBuilder();
    report.append("DNAnalyzer Analysis Report\n");
    report.append("==========================\n\n");
    report.append("Input file: ").append(fastaPath.toAbsolutePath()).append('\n');
    report.append("Sequence header: ").append(record.header()).append('\n');
    report.append(String.format(Locale.ROOT, "Length: %,d bases%n", analyzer.length()));
    report.append(String.format(Locale.ROOT, "GC content: %.2f%%%n", gcContent * 100));
    report.append('\n');

    report.append("Nucleotide counts:\n");
    counts.entrySet().stream()
        .sorted(Map.Entry.comparingByKey())
        .forEach(
            entry ->
                report
                    .append("  ")
                    .append(entry.getKey())
                    .append(':')
                    .append(' ')
                    .append(entry.getValue())
                    .append('\n'));
    report.append('\n');

    if (!gcRegions.isEmpty()) {
      report.append("High GC regions:\n");
      gcRegions.stream()
          .sorted(Comparator.comparingInt(GCWindow::startInclusive))
          .limit(20)
          .forEach(
              window ->
                  report.append(
                      String.format(
                          Locale.ROOT,
                          "  [%d-%d) GC=%.2f%%%n",
                          window.startInclusive(),
                          window.endExclusive(),
                          window.gcContent() * 100)));
      report.append('\n');
    }

    if (!codonUsage.isEmpty()) {
      report.append("Most common codons:\n");
      codonUsage.entrySet().stream()
          .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
          .limit(10)
          .forEach(
              entry ->
                  report.append(
                      String.format(Locale.ROOT, "  %s: %d%n", entry.getKey(), entry.getValue())));
      report.append('\n');
    }

    if (!orfs.isEmpty()) {
      report.append("Open reading frames:\n");
      orfs.stream()
          .sorted(Comparator.comparingInt(OpenReadingFrame::length).reversed())
          .limit(20)
          .forEach(
              orf ->
                  report.append(
                      String.format(
                          Locale.ROOT,
                          "  Frame %d [%d-%d) length=%d%n",
                          orf.frame(),
                          orf.start(),
                          orf.end(),
                          orf.length())));
      report.append('\n');
    }

    if (mutationsFile != null) {
      report.append(
          String.format(
              Locale.ROOT,
              "Generated %d mutations (%d edits each): %s%n",
              mutationCount,
              editsPerMutation,
              mutationsFile.toAbsolutePath()));
    }
    if (reverseComplementFile != null) {
      report
          .append("Reverse complement file: ")
          .append(reverseComplementFile.toAbsolutePath())
          .append('\n');
    }

    if (!riskResults.isEmpty()) {
      report.append('\n').append("Polygenic risk scores:\n");
      for (RiskResult risk : riskResults) {
        PolygenicRiskResult result = risk.result();
        report.append(
            String.format(
                Locale.ROOT,
                "  %s -> raw %.3f, normalised %.3f, coverage %.1f%% (weights: %s)%n",
                result.name(),
                result.rawScore(),
                result.normalisedScore(),
                result.coverage() * 100,
                risk.weightFile().toAbsolutePath()));
      }
    }
    return report.toString();
  }

  private Path writeRiskReport(
      OutputManager outputManager, PolygenicRiskResult result, Path weightFile) throws IOException {
    String sanitized = result.name().replaceAll("[^A-Za-z0-9._-]", "_");
    if (sanitized.isBlank()) {
      sanitized = "risk";
    }
    Path reportFile = outputManager.reportsDir().resolve("prs_" + sanitized + ".txt");

    StringBuilder builder = new StringBuilder();
    builder.append("Polygenic Risk Score Report\n");
    builder.append("===========================\n\n");
    builder.append("Score name: ").append(result.name()).append('\n');
    builder.append("Weights file: ").append(weightFile.toAbsolutePath()).append('\n');
    builder.append(String.format(Locale.ROOT, "Total variants: %d%n", result.totalVariants()));
    builder.append(String.format(Locale.ROOT, "Matched variants: %d%n", result.matchedVariants()));
    builder.append(String.format(Locale.ROOT, "Missing variants: %d%n", result.missingVariants()));
    builder.append(String.format(Locale.ROOT, "Raw score: %.6f%n", result.rawScore()));
    builder.append(
        String.format(Locale.ROOT, "Normalised score: %.6f%n", result.normalisedScore()));
    builder.append(String.format(Locale.ROOT, "Coverage: %.2f%%%n", result.coverage() * 100));
    builder.append('\n');

    List<VariantContribution> contributions = result.contributions();
    if (!contributions.isEmpty()) {
      builder.append("Variant contributions (top 20 by |weight|):\n");
      contributions.stream()
          .sorted((a, b) -> Double.compare(Math.abs(b.weight()), Math.abs(a.weight())))
          .limit(20)
          .forEach(
              contribution ->
                  builder.append(
                      String.format(
                          Locale.ROOT,
                          "%s\tgenotype=%s\trisk=%s\tdosage=%d\tweight=%.5f\tcontribution=%.5f"
                              + "\t%s%n",
                          contribution.rsid(),
                          contribution.genotype(),
                          contribution.riskAllele(),
                          contribution.dosage(),
                          contribution.weight(),
                          contribution.contribution(),
                          contribution.note())));
    }

    Files.writeString(
        reportFile,
        builder.toString(),
        StandardOpenOption.CREATE,
        StandardOpenOption.TRUNCATE_EXISTING);
    return reportFile;
  }

  private record RiskResult(PolygenicRiskResult result, Path weightFile, Path reportFile) {}

  public static class VersionProvider implements CommandLine.IVersionProvider {
    @Override
    public String[] getVersion() {
      return new String[] {"DNAnalyzer CLI 1.2.1"};
    }
  }
}
