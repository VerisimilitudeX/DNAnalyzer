package DNAnalyzer.report;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.nio.file.Files;
import java.nio.file.Path;
import org.junit.jupiter.api.Test;

class ReportGeneratorTest {

  @Test
  void generatesHtmlReport() throws Exception {
    AnalysisResult result = new AnalysisResult(1, 2, 3, 4, 0);
    Path temp = Files.createTempFile("report", ".html");
    ReportGenerator.generateReport(result, temp);
    assertTrue(Files.size(temp) > 0);
    Files.deleteIfExists(temp);
  }
}
