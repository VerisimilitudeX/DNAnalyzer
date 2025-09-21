package DNAnalyzer.io;

import DNAnalyzer.core.SequenceRecord;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Locale;

/** Utility for loading FASTA or FASTQ files. */
public final class SequenceLoader {
    public SequenceRecord load(Path file) throws IOException {
        if (!Files.exists(file)) {
            throw new IOException("Input file does not exist: " + file);
        }
        try (BufferedReader reader = Files.newBufferedReader(file, StandardCharsets.UTF_8)) {
            String firstLine = reader.readLine();
            if (firstLine == null) {
                throw new IOException("Empty sequence file: " + file);
            }
            if (firstLine.startsWith(">")) {
                return parseFasta(firstLine, reader);
            }
            if (firstLine.startsWith("@")) {
                return parseFastq(firstLine, reader);
            }
            throw new IOException("Unsupported sequence format. Expected FASTA or FASTQ header: " + firstLine);
        }
    }

    private SequenceRecord parseFasta(String header, BufferedReader reader) throws IOException {
        String id = header.substring(1).trim();
        String line;
        StringBuilder sequence = new StringBuilder();
        while ((line = reader.readLine()) != null) {
            if (line.startsWith(">")) {
                break; // Only first record is needed for CLI convenience.
            }
            sequence.append(line.trim());
        }
        return new SequenceRecord(id.isEmpty() ? "fasta_record" : id, sequence.toString(), null);
    }

    private SequenceRecord parseFastq(String header, BufferedReader reader) throws IOException {
        String id = header.substring(1).trim();
        String seq = readNonNull(reader);
        String plus = readNonNull(reader);
        if (!plus.startsWith("+")) {
            throw new IOException("Malformed FASTQ entry: missing + line");
        }
        String quality = readNonNull(reader);
        return new SequenceRecord(id.isEmpty() ? "fastq_record" : id, seq, quality);
    }

    private String readNonNull(BufferedReader reader) throws IOException {
        String line = reader.readLine();
        if (line == null) {
            throw new IOException("Unexpected end of file while parsing FASTQ");
        }
        return line.trim();
    }

    public static String detectFormat(Path file) throws IOException {
        try (BufferedReader reader = Files.newBufferedReader(file, StandardCharsets.UTF_8)) {
            String firstLine = reader.readLine();
            if (firstLine == null) {
                return "unknown";
            }
            if (firstLine.startsWith(">")) {
                return "FASTA";
            }
            if (firstLine.startsWith("@")) {
                return "FASTQ";
            }
            return firstLine.toUpperCase(Locale.ROOT);
        }
    }
}
