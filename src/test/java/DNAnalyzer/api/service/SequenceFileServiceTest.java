package DNAnalyzer.api.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

import DNAnalyzer.api.service.SequenceFileService.ParsedSequence;
import java.io.IOException;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;

class SequenceFileServiceTest {

  private final SequenceFileService service = new SequenceFileService();

  @Test
  void parsePlainSequence() throws IOException {
    MockMultipartFile file =
        new MockMultipartFile("file", "plain.txt", "text/plain", "ATGC\nAAGT".getBytes());
    ParsedSequence parsed = service.parse(file);
    assertThat(parsed.format()).isEqualTo("PLAIN");
    assertThat(parsed.sequence()).isEqualTo("ATGCAAGT");
  }

  @Test
  void parseFastaSequence() throws IOException {
    MockMultipartFile file =
        new MockMultipartFile("file", "sample.fasta", "text/plain", ">seq1\nATGCATGC".getBytes());
    ParsedSequence parsed = service.parse(file);
    assertThat(parsed.format()).isEqualTo("FASTA");
    assertThat(parsed.header()).isEqualTo("seq1");
    assertThat(parsed.sequence()).isEqualTo("ATGCATGC");
  }

  @Test
  void parseFastqSequence() throws IOException {
    MockMultipartFile file =
        new MockMultipartFile(
            "file", "sample.fastq", "text/plain", "@seq1\nATGC\n+\n!!!!!".getBytes());
    ParsedSequence parsed = service.parse(file);
    assertThat(parsed.format()).isEqualTo("FASTQ");
    assertThat(parsed.header()).isEqualTo("seq1");
    assertThat(parsed.sequence()).isEqualTo("ATGC");
  }

  @Test
  void parseRejectsEmptyFile() {
    MockMultipartFile file = new MockMultipartFile("file", "empty.txt", "text/plain", new byte[0]);
    assertThrows(IllegalArgumentException.class, () -> service.parse(file));
  }
}
