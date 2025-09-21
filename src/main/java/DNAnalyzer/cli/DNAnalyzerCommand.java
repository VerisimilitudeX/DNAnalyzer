package DNAnalyzer.cli;

import DNAnalyzer.analysis.AminoAcid;
import DNAnalyzer.analysis.ChartGenerator;
import DNAnalyzer.analysis.CodonAnalyzer;
import DNAnalyzer.analysis.MutationGenerator;
import DNAnalyzer.analysis.NeurologicalMarkerAnalyzer;
import DNAnalyzer.analysis.NucleotideStats;
import DNAnalyzer.analysis.ORFScanner;
import DNAnalyzer.analysis.ORFScanner.ORF;
import DNAnalyzer.analysis.PolygenicRiskCalculator;
import DNAnalyzer.analysis.PromoterScanner;
import DNAnalyzer.analysis.PromoterScanner.PromoterMatch;
import DNAnalyzer.analysis.SequenceUtils;
import DNAnalyzer.analysis.SmithWaterman;
import DNAnalyzer.core.SequenceRecord;
import DNAnalyzer.io.SequenceLoader;
import DNAnalyzer.output.OutputManager;
import picocli.CommandLine.Command;
import picocli.CommandLine.Option;
import picocli.CommandLine.Parameters;

import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Duration;
import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.Callable;

@Command(name = "DNAnalyzer", mixinStandardHelpOptions = true, version = "DNAnalyzer 1.2.1",
        description = "Next-generation on-device DNA analysis")
public final class DNAnalyzerCommand implements Callable<Integer> {
    @Parameters(index = "0", paramLabel = "DNA", description = "FASTA or FASTQ file to analyze")
    private Path dnaFile;

    @Option(names = "--amino", description = "Amino acid representing the start of a gene (full name or abbreviation)")
    private String aminoAcid;

    @Option(names = "--profile", description = "Analysis profile: ${COMPLETION-CANDIDATES}")
    private Profile profile;

    @Option(names = "--mutate", description = "Generate the specified number of mutated sequences")
    private Integer mutationSequences;

    @Option(names = "--mutation-events", description = "Number of point mutations per generated sequence")
    private Integer mutationEvents;

    @Option(names = "--rcomplement", description = "Generate reverse complement output")
    private boolean reverseComplement;

    @Option(names = {"-r", "--reverse"}, description = "Reverse the sequence before analysis")
    private boolean reverse;

    @Option(names = "--find", description = "Search for a motif (string or path to FASTA)")
    private String motif;

    @Option(names = "--min", description = "Minimum codon count for reporting")
    private Integer minCount;

    @Option(names = "--max", description = "Maximum codon count for reporting")
    private Integer maxCount;

    @Option(names = "--orfs", description = "Display detected open reading frames")
    private boolean showOrfs;

    @Option(names = "--detailed", description = "Enable detailed analysis outputs")
    private boolean detailed;

    @Option(names = "--verbose", description = "Print verbose run information")
    private boolean verbose;

    @Option(names = "--quick", description = "Run quick analysis (skip heavy modules)")
    private boolean quick;

    @Option(names = "--sw-align", description = "Perform Smith-Waterman alignment against --align target")
    private boolean smithWaterman;

    @Option(names = "--align", description = "Sequence or path for alignment target")
    private String alignTarget;

    @Option(names = "--23andme", description = "23andMe genotype file for polygenic risk scoring")
    private Path genotypeFile;

    @Option(names = "--prs", description = "CSV of SNP weights for risk scoring")
    private Path prsFile;

    @Option(names = "--output-dir", description = "Working directory for outputs")
    private Path outputRoot;

    @Override
    public Integer call() {
        Instant start = Instant.now();
        try {
            if (profile == Profile.list) {
                printAvailableProfiles();
                return 0;
            }

            ProfileConfiguration configuration = ProfileConfiguration.from(profile);
            applyOverrides(configuration);

            SequenceLoader loader = new SequenceLoader();
            SequenceRecord record = loader.load(dnaFile);
            String sequence = preprocessSequence(record.sequence(), reverse);

            Path rootDir = outputRoot != null ? outputRoot : dnaFile.toAbsolutePath().getParent();
            if (rootDir == null) {
                rootDir = Path.of(".");
            }
            OutputManager outputManager = new OutputManager(rootDir, record.id());

            Map<String, String> metrics = new LinkedHashMap<>();
            metrics.put("Sequence ID", record.id());
            metrics.put("Length", String.valueOf(sequence.length()));
            metrics.put("Input Format", SequenceLoader.detectFormat(dnaFile));

            if (configuration.verbose) {
                System.out.printf(Locale.ROOT, "Loaded %s (%d bp)%n", record.id(), sequence.length());
            }

            NucleotideStats stats = NucleotideStats.compute(sequence);
            metrics.put("GC Content", String.format(Locale.ROOT, "%.2f%%", stats.gcContent() * 100));

            ChartGenerator chartGenerator = new ChartGenerator();
            Path chartPath = outputManager.chartsDir().resolve(record.id() + "_base_composition.png");
            chartGenerator.createBaseCompositionChart(stats, chartPath);
            outputManager.registerGeneratedFile("charts", chartPath, "Base composition pie chart");

            if (configuration.quick) {
                metrics.put("Mode", "Quick");
                outputManager.writeSummary(metrics);
                outputManager.printConsoleSummary(new PrintWriter(System.out, true, StandardCharsets.UTF_8));
                return 0;
            }

            metrics.put("Mode", configuration.summaryLabel());

            processCodonAnalytics(sequence, configuration, metrics, outputManager);
            processGeneDiscovery(sequence, configuration, metrics);
            processPromoters(sequence, configuration, metrics, outputManager);
            processNeurologicalMarkers(sequence, configuration, metrics, outputManager);
            processMutations(sequence, configuration, outputManager);
            processReverseComplement(sequence, configuration, outputManager);
            processMotifSearch(sequence, metrics);
            processOrfs(sequence, configuration, metrics, outputManager);
            processAlignment(sequence, outputManager, metrics);
            processRiskScores(configuration, metrics);

            outputManager.writeSummary(metrics);
            outputManager.printConsoleSummary(new PrintWriter(System.out, true, StandardCharsets.UTF_8));

            if (verbose) {
                Duration elapsed = Duration.between(start, Instant.now());
                System.out.printf(Locale.ROOT, "Analysis completed in %d ms%n", elapsed.toMillis());
            }
            return 0;
        } catch (Exception ex) {
            System.err.println("Error: " + ex.getMessage());
            if (verbose) {
                ex.printStackTrace(System.err);
            }
            return 1;
        }
    }

    private void applyOverrides(ProfileConfiguration configuration) {
        if (mutationSequences != null) {
            configuration.generateMutations = true;
            configuration.mutationSequences = mutationSequences;
        }
        if (mutationEvents != null) {
            configuration.mutationEvents = mutationEvents;
        }
        if (reverseComplement) {
            configuration.reverseComplement = true;
        }
        if (showOrfs) {
            configuration.showOrfs = true;
        }
        if (detailed) {
            configuration.detailed = true;
        }
        if (verbose) {
            configuration.verbose = true;
        }
        if (quick) {
            configuration.quick = true;
        }
        if (genotypeFile != null || prsFile != null) {
            configuration.polygenicRisk = true;
        }
    }

    private String preprocessSequence(String sequence, boolean reverseFlag) {
        String normalized = sequence.replace('U', 'T');
        if (reverseFlag) {
            return SequenceUtils.reverse(normalized);
        }
        return normalized;
    }

    private void processCodonAnalytics(String sequence, ProfileConfiguration configuration,
                                       Map<String, String> metrics, OutputManager outputManager) throws IOException {
        int frame = 0;
        int min = minCount != null ? minCount : 0;
        int max = maxCount != null ? maxCount : Integer.MAX_VALUE;

        Map<String, Integer> codonCounts = CodonAnalyzer.count(sequence, frame);
        Map<String, Integer> filtered = CodonAnalyzer.filterByRange(codonCounts, min, max);
        if (!filtered.isEmpty()) {
            Path codonReport = outputManager.reportsDir().resolve("codon_counts.tsv");
            try (var writer = Files.newBufferedWriter(codonReport, StandardCharsets.UTF_8)) {
                writer.write("codon\tcount\n");
                for (Map.Entry<String, Integer> entry : filtered.entrySet()) {
                    writer.write(entry.getKey() + "\t" + entry.getValue() + "\n");
                }
            }
            outputManager.registerGeneratedFile("reports", codonReport,
                    String.format(Locale.ROOT, "Codon counts (frame %d, range %d-%s)", frame, min,
                            max == Integer.MAX_VALUE ? "∞" : Integer.toString(max)));
        }

        AminoAcid start = AminoAcid.fromToken(aminoAcid).orElse(null);
        if (start != null) {
            List<String> genes = CodonAnalyzer.findGenes(sequence, start);
            metrics.put("Genes for " + start.display(), genes.isEmpty() ? "None found" : String.valueOf(genes.size()));
            if (!genes.isEmpty()) {
                Path geneFile = outputManager.sequencesDir().resolve(start.display().replace(' ', '_') + "_genes.fa");
                try (var writer = Files.newBufferedWriter(geneFile, StandardCharsets.UTF_8)) {
                    for (int i = 0; i < genes.size(); i++) {
                        writer.write(">" + start.display() + "_gene_" + (i + 1) + "\n");
                        writer.write(genes.get(i));
                        writer.write("\n");
                    }
                }
                outputManager.registerGeneratedFile("sequences", geneFile,
                        "Genes starting with " + start.display());
            }
        }
    }

    private void processGeneDiscovery(String sequence, ProfileConfiguration configuration,
                                      Map<String, String> metrics) {
        if (!configuration.detailed) {
            return;
        }
        int longest = 0;
        for (int frame = 0; frame < 3; frame++) {
            Map<String, Integer> counts = CodonAnalyzer.count(sequence, frame);
            for (Map.Entry<String, Integer> entry : counts.entrySet()) {
                longest = Math.max(longest, entry.getKey().length() * entry.getValue());
            }
        }
        metrics.put("Gene Discovery", "Analyzed reading frames; longest codon set length ≈ " + longest);
    }

    private void processPromoters(String sequence, ProfileConfiguration configuration,
                                  Map<String, String> metrics, OutputManager outputManager) throws IOException {
        if (!configuration.promoterScan) {
            return;
        }
        PromoterScanner scanner = new PromoterScanner();
        List<PromoterMatch> matches = scanner.scan(sequence);
        metrics.put("Promoter motifs", matches.isEmpty() ? "None detected" : String.valueOf(matches.size()));
        if (!matches.isEmpty()) {
            Path file = outputManager.reportsDir().resolve("promoter_matches.tsv");
            try (var writer = Files.newBufferedWriter(file, StandardCharsets.UTF_8)) {
                writer.write("element\tposition\tmatch\n");
                for (PromoterMatch match : matches) {
                    writer.write(match.element() + "\t" + match.position() + "\t" + match.match() + "\n");
                }
            }
            outputManager.registerGeneratedFile("reports", file, "Promoter motif occurrences");
        }
    }

    private void processNeurologicalMarkers(String sequence, ProfileConfiguration configuration,
                                             Map<String, String> metrics, OutputManager outputManager) throws IOException {
        if (!configuration.neurological) {
            return;
        }
        NeurologicalMarkerAnalyzer analyzer = new NeurologicalMarkerAnalyzer();
        List<NeurologicalMarkerAnalyzer.MarkerHit> hits = analyzer.scan(sequence);
        metrics.put("Neurological markers", hits.isEmpty() ? "None detected" : String.valueOf(hits.size()));
        if (!hits.isEmpty()) {
            Path file = outputManager.reportsDir().resolve("neurological_markers.tsv");
            try (var writer = Files.newBufferedWriter(file, StandardCharsets.UTF_8)) {
                writer.write("marker\tdescription\tposition\n");
                for (NeurologicalMarkerAnalyzer.MarkerHit hit : hits) {
                    writer.write(hit.marker().name() + "\t" + hit.marker().description() + "\t" + hit.position() + "\n");
                }
            }
            outputManager.registerGeneratedFile("reports", file, "Neurological marker hits");
        }
    }

    private void processMutations(String sequence, ProfileConfiguration configuration,
                                  OutputManager outputManager) throws IOException {
        if (!configuration.generateMutations) {
            return;
        }
        MutationGenerator generator = new MutationGenerator();
        List<MutationGenerator.Mutation> mutations = generator.generate(sequence,
                configuration.mutationEvents, configuration.mutationSequences);
        Path file = outputManager.sequencesDir().resolve("mutations.fa");
        try (var writer = Files.newBufferedWriter(file, StandardCharsets.UTF_8)) {
            for (MutationGenerator.Mutation mutation : mutations) {
                writer.write(">mutation_" + mutation.index() + "\n");
                writer.write(mutation.mutatedSequence());
                writer.write("\n");
            }
        }
        outputManager.registerGeneratedFile("sequences", file,
                String.format(Locale.ROOT, "Generated %d mutated sequences", mutations.size()));

        Path report = outputManager.reportsDir().resolve("mutations.tsv");
        try (var writer = Files.newBufferedWriter(report, StandardCharsets.UTF_8)) {
            writer.write("mutation\tposition\toriginal\tmutated\n");
            for (MutationGenerator.Mutation mutation : mutations) {
                for (MutationGenerator.Mutation.Event event : mutation.events()) {
                    writer.write(mutation.index() + "\t" + event.position() + "\t" + event.original() + "\t" + event.mutated() + "\n");
                }
            }
        }
        outputManager.registerGeneratedFile("reports", report, "Mutation event log");
    }

    private void processReverseComplement(String sequence, ProfileConfiguration configuration,
                                          OutputManager outputManager) throws IOException {
        if (!configuration.reverseComplement) {
            return;
        }
        String rc = SequenceUtils.reverseComplement(sequence);
        Path file = outputManager.sequencesDir().resolve("reverse_complement.fa");
        try (var writer = Files.newBufferedWriter(file, StandardCharsets.UTF_8)) {
            writer.write(">reverse_complement\n");
            writer.write(rc);
            writer.write("\n");
        }
        outputManager.registerGeneratedFile("sequences", file, "Reverse complement sequence");
    }

    private void processMotifSearch(String sequence, Map<String, String> metrics) throws IOException {
        if (motif == null || motif.isBlank()) {
            return;
        }
        String target = motif;
        Path motifPath = Path.of(motif);
        if (Files.exists(motifPath)) {
            SequenceLoader loader = new SequenceLoader();
            target = loader.load(motifPath).sequence();
        }
        String upper = sequence.toUpperCase(Locale.ROOT);
        String motifUpper = target.toUpperCase(Locale.ROOT).replace("U", "T");
        int count = 0;
        int index = upper.indexOf(motifUpper);
        while (index >= 0) {
            count++;
            index = upper.indexOf(motifUpper, index + 1);
        }
        metrics.put("Motif '" + motifUpper + "'", count == 0 ? "Not found" : count + " occurrence(s)");
    }

    private void processOrfs(String sequence, ProfileConfiguration configuration,
                              Map<String, String> metrics, OutputManager outputManager) throws IOException {
        if (!configuration.showOrfs) {
            return;
        }
        ORFScanner scanner = new ORFScanner();
        List<ORF> orfs = scanner.scan(sequence);
        metrics.put("Open reading frames", orfs.isEmpty() ? "None" : String.valueOf(orfs.size()));
        if (!orfs.isEmpty()) {
            Path file = outputManager.reportsDir().resolve("orfs.tsv");
            try (var writer = Files.newBufferedWriter(file, StandardCharsets.UTF_8)) {
                writer.write("strand\tframe\tstart\tend\tlength\tprotein\n");
                for (ORF orf : orfs) {
                    writer.write(String.format(Locale.ROOT, "%s\t%d\t%d\t%d\t%d\t%s%n", orf.strand(), orf.frame(),
                            orf.start(), orf.end(), orf.length(), orf.aminoAcidSequence()));
                }
            }
            outputManager.registerGeneratedFile("reports", file, "Open reading frame report");
        }
    }

    private void processAlignment(String sequence, OutputManager outputManager,
                                  Map<String, String> metrics) throws IOException {
        if (!smithWaterman) {
            return;
        }
        if (alignTarget == null || alignTarget.isBlank()) {
            throw new IllegalArgumentException("--sw-align requires --align target sequence or file");
        }
        String target = alignTarget;
        Path targetPath = Path.of(alignTarget);
        if (Files.exists(targetPath)) {
            SequenceLoader loader = new SequenceLoader();
            target = loader.load(targetPath).sequence();
        }
        SmithWaterman aligner = new SmithWaterman();
        SmithWaterman.AlignmentResult result = aligner.align(sequence, target);
        metrics.put("Smith-Waterman score", String.valueOf(result.score()));
        Path file = outputManager.reportsDir().resolve("alignment.txt");
        try (var writer = Files.newBufferedWriter(file, StandardCharsets.UTF_8)) {
            writer.write("Score: " + result.score() + "\n");
            writer.write(result.alignedSequence1() + "\n");
            writer.write(result.alignedSequence2() + "\n");
        }
        outputManager.registerGeneratedFile("reports", file, "Smith-Waterman alignment");
    }

    private void processRiskScores(ProfileConfiguration configuration, Map<String, String> metrics) throws IOException {
        if (!configuration.polygenicRisk) {
            return;
        }
        if (genotypeFile == null || prsFile == null) {
            metrics.put("Polygenic risk", "Missing --23andme or --prs input");
            return;
        }
        PolygenicRiskCalculator calculator = new PolygenicRiskCalculator();
        PolygenicRiskCalculator.Result result = calculator.calculate(genotypeFile, prsFile);
        metrics.put("Polygenic risk", String.format(Locale.ROOT, "Score %.3f (%d loci, %d missing)",
                result.score(), result.lociUsed(), result.missingLoci().size()));
    }

    private void printAvailableProfiles() {
        System.out.println("Available profiles:");
        for (Profile profile : Profile.values()) {
            if (profile != Profile.list) {
                System.out.printf(Locale.ROOT, " - %s%n", profile.name());
            }
        }
    }

    enum Profile {
        basic, detailed, quick, research, mutation, clinical, list
    }

    private static final class ProfileConfiguration {
        boolean promoterScan;
        boolean neurological;
        boolean showOrfs;
        boolean generateMutations;
        boolean reverseComplement;
        boolean detailed;
        boolean verbose;
        boolean quick;
        boolean polygenicRisk;
        int mutationSequences;
        int mutationEvents;

        static ProfileConfiguration from(Profile profile) {
            ProfileConfiguration cfg = new ProfileConfiguration();
            if (profile == null || profile == Profile.basic) {
                cfg.promoterScan = true;
                cfg.neurological = false;
                cfg.showOrfs = true;
                cfg.generateMutations = false;
                cfg.reverseComplement = false;
                cfg.detailed = false;
                cfg.verbose = false;
                cfg.quick = false;
                cfg.polygenicRisk = false;
                cfg.mutationSequences = 0;
                cfg.mutationEvents = 3;
            } else if (profile == Profile.detailed) {
                cfg.promoterScan = true;
                cfg.neurological = true;
                cfg.showOrfs = true;
                cfg.generateMutations = true;
                cfg.reverseComplement = true;
                cfg.detailed = true;
                cfg.verbose = true;
                cfg.quick = false;
                cfg.polygenicRisk = false;
                cfg.mutationSequences = 5;
                cfg.mutationEvents = 3;
            } else if (profile == Profile.quick) {
                cfg.promoterScan = false;
                cfg.neurological = false;
                cfg.showOrfs = false;
                cfg.generateMutations = false;
                cfg.reverseComplement = false;
                cfg.detailed = false;
                cfg.verbose = false;
                cfg.quick = true;
                cfg.polygenicRisk = false;
                cfg.mutationSequences = 0;
                cfg.mutationEvents = 3;
            } else if (profile == Profile.research) {
                cfg.promoterScan = true;
                cfg.neurological = true;
                cfg.showOrfs = true;
                cfg.generateMutations = true;
                cfg.reverseComplement = true;
                cfg.detailed = true;
                cfg.verbose = true;
                cfg.quick = false;
                cfg.polygenicRisk = true;
                cfg.mutationSequences = 5;
                cfg.mutationEvents = 5;
            } else if (profile == Profile.mutation) {
                cfg.promoterScan = false;
                cfg.neurological = false;
                cfg.showOrfs = false;
                cfg.generateMutations = true;
                cfg.reverseComplement = false;
                cfg.detailed = false;
                cfg.verbose = false;
                cfg.quick = false;
                cfg.polygenicRisk = false;
                cfg.mutationSequences = 5;
                cfg.mutationEvents = 5;
            } else if (profile == Profile.clinical) {
                cfg.promoterScan = true;
                cfg.neurological = true;
                cfg.showOrfs = true;
                cfg.generateMutations = false;
                cfg.reverseComplement = true;
                cfg.detailed = true;
                cfg.verbose = false;
                cfg.quick = false;
                cfg.polygenicRisk = true;
                cfg.mutationSequences = 0;
                cfg.mutationEvents = 3;
            }
            return cfg;
        }

        String summaryLabel() {
            if (quick) {
                return "Quick";
            }
            if (detailed && neurological) {
                return "Detailed";
            }
            if (generateMutations) {
                return "Mutation";
            }
            return "Standard";
        }
    }
}
