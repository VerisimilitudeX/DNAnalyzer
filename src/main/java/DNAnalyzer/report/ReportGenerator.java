package DNAnalyzer.report;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/** Utility for generating interactive HTML reports using FreeMarker. */
public class ReportGenerator {

  /** Generate an HTML report for the provided analysis result. */
  public static void generateReport(AnalysisResult result, Path outputFile) throws IOException {
    Configuration cfg = new Configuration(Configuration.VERSION_2_3_32);
    cfg.setClassLoaderForTemplateLoading(ReportGenerator.class.getClassLoader(), "/templates");

    Template template = cfg.getTemplate("report.ftl");

    Map<String, Object> data = new HashMap<>();
    data.put("sequenceLength", result.getSequenceLength());
    data.put("gcContent", String.format("%.2f", result.getGcContent()));

    List<String> bases = List.of("A", "T", "G", "C", "Unknown");
    List<Long> counts =
        List.of(
            result.getAdenine(),
            result.getThymine(),
            result.getGuanine(),
            result.getCytosine(),
            result.getUnknown());
    data.put("bases", bases);
    data.put("counts", counts);

    List<Map<String, Object>> baseData = new ArrayList<>();
    for (int i = 0; i < bases.size(); i++) {
      Map<String, Object> item = new HashMap<>();
      item.put("base", bases.get(i));
      item.put("count", counts.get(i));
      baseData.add(item);
    }
    data.put("baseData", baseData);

    try (Writer writer = new FileWriter(outputFile.toFile())) {
      try {
        template.process(data, writer);
      } catch (TemplateException e) {
        throw new IOException("Failed to process template", e);
      }
    }
  }
}
