package DNAnalyzer.output;

import java.io.IOException;
import java.nio.file.Path;
import java.util.Map;
import org.jfree.chart.ChartFactory;
import org.jfree.chart.ChartUtils;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.plot.CategoryPlot;
import org.jfree.chart.plot.PlotOrientation;
import org.jfree.chart.renderer.category.BarRenderer;
import org.jfree.data.category.DefaultCategoryDataset;

public final class ChartGenerator {

  public Path generateBaseCompositionChart(
      Map<Character, Long> counts, Path outputDir, String baseName) throws IOException {
    DefaultCategoryDataset dataset = new DefaultCategoryDataset();
    counts.entrySet().stream()
        .sorted(Map.Entry.comparingByKey())
        .forEach(entry -> dataset.addValue(entry.getValue(), "Count", entry.getKey().toString()));

    JFreeChart chart =
        ChartFactory.createBarChart(
            "Base Composition",
            "Base",
            "Count",
            dataset,
            PlotOrientation.VERTICAL,
            false,
            true,
            false);

    CategoryPlot plot = chart.getCategoryPlot();
    BarRenderer renderer = (BarRenderer) plot.getRenderer();
    renderer.setItemMargin(0.1);

    Path file = outputDir.resolve(baseName + "_qc_chart.png");
    ChartUtils.saveChartAsPNG(file.toFile(), chart, 800, 600);
    return file;
  }
}
