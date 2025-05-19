package DNAnalyzer.plugin;

import DNAnalyzer.utils.core.DNATools;
import java.io.PrintStream;

/**
 * Interface for DNAnalyzer plugins. Implementations can extend DNAnalyzer by
 * performing additional analysis on a DNA sequence.
 */
public interface DNAnalyzerPlugin {

    /** Called once when the plugin is loaded. */
    default void init() {}

    /**
     * Execute the plugin using the provided DNA.
     *
     * @param dna DNA sequence utilities
     * @param out Stream to write plugin output to
     */
    void analyze(DNATools dna, PrintStream out);
}
