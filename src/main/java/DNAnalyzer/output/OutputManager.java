package DNAnalyzer.output;

import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

/** Creates structured output directories and summaries for analysis runs. */
public final class OutputManager {
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss")
            .withLocale(Locale.ROOT).withZone(ZoneOffset.UTC);

    private final Path root;
    private final Path chartsDir;
    private final Path sequencesDir;
    private final Path reportsDir;
    private final List<Entry> entries = new ArrayList<>();

    public OutputManager(Path workspaceRoot, String inputName) throws IOException {
        if (workspaceRoot == null) {
            throw new IllegalArgumentException("workspaceRoot must not be null");
        }
        if (inputName == null) {
            throw new IllegalArgumentException("inputName must not be null");
        }
        String sanitized = inputName.replaceAll("[^A-Za-z0-9_-]", "_");
        if (sanitized.isEmpty()) {
            sanitized = "sequence";
        }
        String dirName = String.format(Locale.ROOT, "dnanalyzer_output_%s_%s", sanitized, FORMATTER.format(Instant.now()));
        root = workspaceRoot.resolve("output").resolve(dirName);
        chartsDir = root.resolve("charts");
        sequencesDir = root.resolve("sequences");
        reportsDir = root.resolve("reports");
        Files.createDirectories(chartsDir);
        Files.createDirectories(sequencesDir);
        Files.createDirectories(reportsDir);
    }

    public Path root() {
        return root;
    }

    public Path chartsDir() {
        return chartsDir;
    }

    public Path sequencesDir() {
        return sequencesDir;
    }

    public Path reportsDir() {
        return reportsDir;
    }

    public Path sessionDir() {
        return root;
    }

    public static OutputManager create(Path baseDir, String inputName, Clock clock) throws IOException {
        Path workspace = baseDir != null ? baseDir : Path.of(".");
        String fileName = workspace.getFileName() != null ? workspace.getFileName().toString() : "";
        if ("output".equalsIgnoreCase(fileName)) {
            Path parent = workspace.getParent();
            if (parent != null) {
                workspace = parent;
            } else {
                workspace = Path.of(".");
            }
        }
        return new OutputManager(workspace, inputName != null ? inputName : "sequence");
    }

    public void registerGeneratedFile(String category, Path path, String description) throws IOException {
        if (category == null || path == null || description == null) {
            throw new IllegalArgumentException("category, path and description must be provided");
        }
        long size = Files.exists(path) ? Files.size(path) : 0;
        entries.add(new Entry(category, description, path, size));
    }

    public void registerFile(String category, Path path, String description) throws IOException {
        registerGeneratedFile(category, path, description);
    }

    public void writeSummary(Map<String, String> metrics) throws IOException {
        Path summaryFile = reportsDir.resolve("analysis_summary.txt");
        try (PrintWriter writer = new PrintWriter(Files.newBufferedWriter(summaryFile, StandardOpenOption.CREATE,
                StandardOpenOption.TRUNCATE_EXISTING))) {
            writer.println("DNAnalyzer Analysis Summary");
            writer.println("===========================");
            for (Map.Entry<String, String> metric : metrics.entrySet()) {
                writer.printf(Locale.ROOT, "%s: %s%n", metric.getKey(), metric.getValue());
            }
            writer.println();
            writer.println("Generated Files");
            writer.println("---------------");
            for (Entry entry : entries) {
                writer.printf(Locale.ROOT, "[%s] %s%n    %s (%s)%n", entry.category, entry.description,
                        entry.path, humanSize(entry.size));
            }
        }
        registerGeneratedFile("reports", summaryFile, "Textual analysis summary");
    }

    public void writeReport(String filename, String content) throws IOException {
        Path reportFile = reportsDir.resolve(filename);
        Files.writeString(reportFile, content, StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
        registerGeneratedFile("reports", reportFile, "Report: " + filename);
    }

    public void printConsoleSummary(PrintWriter writer) {
        writer.println("\n\uD83D\uDCC1 Generated Files Summary");
        writer.println("==========================");
        writer.printf(Locale.ROOT, "Output directory: %s%n%n", root);

        Map<String, List<Entry>> byCategory = new LinkedHashMap<>();
        for (Entry entry : entries) {
            byCategory.computeIfAbsent(entry.category, k -> new ArrayList<>()).add(entry);
        }

        for (Map.Entry<String, List<Entry>> group : byCategory.entrySet()) {
            writer.printf(Locale.ROOT, "%s:%n", group.getKey());
            for (Entry entry : group.getValue()) {
                writer.printf(Locale.ROOT, "   • %s%n     %s (%s)%n", entry.description, entry.path,
                        humanSize(entry.size));
            }
            writer.println();
        }
        writer.flush();
    }

    public void printSummary() {
        printConsoleSummary(new PrintWriter(System.out, true));
    }

    private String humanSize(long size) {
        if (size <= 0) {
            return "0 B";
        }
        final String[] units = {"B", "KB", "MB", "GB"};
        int idx = 0;
        double value = size;
        while (value >= 1024 && idx < units.length - 1) {
            value /= 1024;
            idx++;
        }
        return String.format(Locale.ROOT, "%.1f %s", value, units[idx]);
    }

    private record Entry(String category, String description, Path path, long size) {
    }
}
