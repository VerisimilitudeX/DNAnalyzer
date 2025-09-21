package DNAnalyzer.api.dto.response;

import java.util.List;

public record AnalysisResponse(String fileName,
        String format,
        SequenceSummary sequence,
        BasePairResponse basePairs,
        CodonResponse codons,
        ReadingFrameResponse readingFrames,
        ProteinResponse proteins,
        List<String> options) {
}
