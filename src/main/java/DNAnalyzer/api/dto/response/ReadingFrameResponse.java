package DNAnalyzer.api.dto.response;

import java.util.List;

public record ReadingFrameResponse(List<ReadingFrame> frames,
        int totalGenes) {

    public record ReadingFrame(int frame,
            String direction,
            List<Gene> genes) {
    }

    public record Gene(int start,
            int end,
            int length) {
    }
}
