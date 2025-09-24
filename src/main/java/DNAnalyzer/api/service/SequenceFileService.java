package DNAnalyzer.api.service;

import DNAnalyzer.util.FastaParser;
import DNAnalyzer.util.FastaParser.FastaRecord;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class SequenceFileService {

  public ParsedSequence parse(MultipartFile file) throws IOException {
    if (file == null || file.isEmpty()) {
      throw new IllegalArgumentException("Uploaded file is empty");
    }

    String originalName = Optional.ofNullable(file.getOriginalFilename()).orElse("sequence");

    List<String> lines = readAllLines(file);
    int firstContentIndex = findFirstContentLineIndex(lines);
    if (firstContentIndex == -1) {
      throw new IllegalArgumentException("Uploaded file does not contain sequence data");
    }

    String firstLine = lines.get(firstContentIndex);
    if (firstLine.startsWith(">")) {
      return parseFasta(lines, originalName);
    }
    if (firstLine.startsWith("@")) {
      return parseFastq(lines, firstContentIndex, originalName);
    }
    return parsePlain(lines, originalName);
  }

  private ParsedSequence parseFasta(List<String> lines, String originalName) throws IOException {
    Path tempFile = Files.createTempFile("dnanalyzer", ".fasta");
    try {
      Files.write(tempFile, String.join("\n", lines).getBytes(StandardCharsets.UTF_8));
      FastaRecord record = FastaParser.parseSingle(tempFile);
      String header =
          record.header() == null || record.header().isBlank() ? originalName : record.header();
      return new ParsedSequence(originalName, header, record.sequence(), "FASTA");
    } finally {
      Files.deleteIfExists(tempFile);
    }
  }

  private ParsedSequence parseFastq(List<String> lines, int headerIndex, String originalName) {
    if (headerIndex + 1 >= lines.size()) {
      throw new IllegalArgumentException("FASTQ sequence line missing");
    }
    String header = lines.get(headerIndex).substring(1).trim();
    String sequence = lines.get(headerIndex + 1).replaceAll("\\s+", "").toUpperCase(Locale.ROOT);
    if (sequence.isEmpty()) {
      throw new IllegalArgumentException("FASTQ sequence is empty");
    }
    return new ParsedSequence(
        originalName, header.isBlank() ? originalName : header, sequence, "FASTQ");
  }

  private ParsedSequence parsePlain(List<String> lines, String originalName) {
    String sequence =
        lines.stream()
            .filter(line -> !line.isBlank())
            .map(line -> line.replaceAll("\\s+", ""))
            .collect(Collectors.joining())
            .toUpperCase(Locale.ROOT);
    if (sequence.isEmpty()) {
      throw new IllegalArgumentException("Sequence content is empty");
    }
    return new ParsedSequence(originalName, originalName, sequence, "PLAIN");
  }

  private List<String> readAllLines(MultipartFile file) throws IOException {
    List<String> lines = new ArrayList<>();
    try (BufferedReader reader =
        new BufferedReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {
      String line;
      while ((line = reader.readLine()) != null) {
        lines.add(line.trim());
      }
    }
    return lines;
  }

  private int findFirstContentLineIndex(List<String> lines) {
    for (int i = 0; i < lines.size(); i++) {
      if (!lines.get(i).isBlank()) {
        return i;
      }
    }
    return -1;
  }

  public record ParsedSequence(String name, String header, String sequence, String format) {}
}
