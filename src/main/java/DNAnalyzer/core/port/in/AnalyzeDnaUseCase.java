package DNAnalyzer.core.port.in;

/**
 * Use case interface to analyze DNA.
 */
public interface AnalyzeDnaUseCase {

    /**
     * Analyze the DNA.
     * @param request the request to analyze the DNA
     * @return the result of the analysis
     */
    AnalyzeResult analyzeDna(AnalyzeDnaRequest request);
}
