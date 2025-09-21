package DNAnalyzer.util;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Utility for parsing FASTA-formatted files.
 */
public final class FastaParser {

    private FastaParser() {
        // Utility class.
    }

    public static List<FastaRecord> parse(Path path) throws IOException {
        if (!Files.exists(path)) {
            throw new IOException("FASTA file not found: " + path);
        }

        List<String> lines = Files.readAllLines(path).stream()
                .map(String::trim)
                .filter(line -> !line.isEmpty())
                .collect(Collectors.toList());

        List<FastaRecord> records = new ArrayList<>();
        StringBuilder sequenceBuilder = new StringBuilder();
        String header = null;

        for (String line : lines) {
            if (line.startsWith(">")) {
                if (header != null) {
                    records.add(new FastaRecord(header, sequenceBuilder.toString()));
                }
                header = line.substring(1).trim();
                sequenceBuilder = new StringBuilder();
            } else {
                sequenceBuilder.append(line.replaceAll("\\s+", ""));
            }
        }

        if (header != null) {
            records.add(new FastaRecord(header, sequenceBuilder.toString()));
        } else if (!sequenceBuilder.isEmpty()) {
            records.add(new FastaRecord(path.getFileName().toString(), sequenceBuilder.toString()));
        }

        if (records.isEmpty()) {
            throw new IOException("FASTA file contains no sequences: " + path);
        }

        return records;
    }

    public static FastaRecord parseSingle(Path path) throws IOException {
        List<FastaRecord> records = parse(path);
        if (records.size() == 1) {
            return records.get(0);
        }
        StringBuilder merged = new StringBuilder();
        records.forEach(record -> merged.append(record.sequence()));
        String header = records.get(0).header() + " (+" + (records.size() - 1) + " more sequences)";
        return new FastaRecord(header, merged.toString());
    }

    public record FastaRecord(String header, String sequence) {
    }
}
