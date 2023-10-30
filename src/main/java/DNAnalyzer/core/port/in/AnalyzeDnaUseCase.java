package DNAnalyzer.core.port.in;

/**
 * Use case interface to analyze DNA.
 */
public interface AnalyzeDnaUseCase {

    /**
     * Analyze the DNA.
     * @param request
     * @return
     */
    AnalyzeResult analyzeDna(AnalyzeDnaRequest request);
}
