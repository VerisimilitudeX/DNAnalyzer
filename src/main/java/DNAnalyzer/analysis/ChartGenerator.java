package DNAnalyzer.analysis;

import DNAnalyzer.analysis.NucleotideStats.Base;
import org.jfree.chart.ChartFactory;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.plot.PiePlot;
import org.jfree.chart.ui.RectangleInsets;
import org.jfree.data.general.DefaultPieDataset;
import org.jfree.data.general.PieDataset;
import org.jfree.chart.ChartUtils;

import java.awt.Color;
import java.io.IOException;
import java.nio.file.Path;
import java.util.Locale;
import java.util.Map;

/** Builds simple PNG charts for nucleotide composition. */
public final class ChartGenerator {
    public Path createBaseCompositionChart(NucleotideStats stats, Path file) throws IOException {
        PieDataset<String> dataset = createDataset(stats.counts());
        JFreeChart chart = ChartFactory.createPieChart(
                "Base Composition",
                dataset,
                true,
                false,
                false);
        PiePlot plot = (PiePlot) chart.getPlot();
        plot.setSectionPaint("A", new Color(0x4CAF50));
        plot.setSectionPaint("T", new Color(0xFF9800));
        plot.setSectionPaint("G", new Color(0x2196F3));
        plot.setSectionPaint("C", new Color(0x9C27B0));
        plot.setSectionPaint("N", new Color(0xBDBDBD));
        plot.setLabelBackgroundPaint(Color.WHITE);
        plot.setOutlineVisible(false);
        chart.setPadding(new RectangleInsets(10, 10, 10, 10));
        ChartUtils.saveChartAsPNG(file.toFile(), chart, 640, 480);
        return file;
    }

    private PieDataset<String> createDataset(Map<Base, Integer> counts) {
        DefaultPieDataset<String> dataset = new DefaultPieDataset<>();
        for (Map.Entry<Base, Integer> entry : counts.entrySet()) {
            dataset.setValue(entry.getKey().name(), entry.getValue());
        }
        return dataset;
    }
}
