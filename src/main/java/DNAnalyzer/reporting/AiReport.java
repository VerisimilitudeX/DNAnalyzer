package DNAnalyzer.reporting;

/**
 * Holds AI generated narratives for different audiences.
 */
public record AiReport(String researcherNarrative, String laypersonNarrative) {

    public static AiReport empty() {
        return new AiReport("", "");
    }

    public boolean isEmpty() {
        return (researcherNarrative == null || researcherNarrative.isBlank())
                && (laypersonNarrative == null || laypersonNarrative.isBlank());
    }
}
