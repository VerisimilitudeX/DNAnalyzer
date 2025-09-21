package DNAnalyzer.api.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

import DNAnalyzer.api.dto.request.ManipulationRequest;
import DNAnalyzer.api.dto.request.ProteinRequest;
import DNAnalyzer.api.dto.request.ReadingFrameRequest;
import DNAnalyzer.api.dto.request.SequenceRequest;
import DNAnalyzer.api.dto.response.AnalysisResponse;
import DNAnalyzer.api.dto.response.BasePairResponse;
import DNAnalyzer.api.dto.response.ManipulationResponse;
import DNAnalyzer.api.dto.response.ProteinResponse;
import DNAnalyzer.api.dto.response.ReadingFrameResponse;
import java.util.List;
import org.junit.jupiter.api.Test;

class SequenceAnalysisServiceTest {

    private final SequenceAnalysisService service = new SequenceAnalysisService();

    @Test
    void analyzeBasePairsCountsNucleotides() {
        BasePairResponse response = service.analyzeBasePairs(new SequenceRequest("ATGCN"));
        assertThat(response.length()).isEqualTo(5);
        assertThat(response.counts().get("A")).isEqualTo(1L);
        assertThat(response.counts().get("T")).isEqualTo(1L);
        assertThat(response.counts().get("G")).isEqualTo(1L);
        assertThat(response.counts().get("C")).isEqualTo(1L);
        assertThat(response.counts().get("other")).isEqualTo(1L);
        assertThat(response.percentages().get("A")).isEqualTo(20.0);
        assertThat(response.gcContent()).isEqualTo(40.0);
    }

    @Test
    void analyzeReadingFramesDetectsGenes() {
        ReadingFrameResponse response = service.analyzeReadingFrames(new ReadingFrameRequest("ATGAAATAG", 0));
        assertThat(response.totalGenes()).isEqualTo(1);
        assertThat(response.frames()).anySatisfy(frame -> assertThat(frame.genes()).isNotEmpty());
    }

    @Test
    void findProteinsReturnsLongestUpToLimit() {
        ProteinResponse response = service
                .findProteins(new ProteinRequest("ATGAAATAGATGCCCCCTAA", "M", 2));
        assertThat(response.proteins()).isNotEmpty();
        assertThat(response.proteins().get(0).sequence()).startsWith("M");
    }

    @Test
    void findProteinsRejectsUnsupportedStartAminoAcid() {
        assertThrows(IllegalArgumentException.class,
                () -> service.findProteins(new ProteinRequest("ATGAAATAG", "L", 2)));
    }

    @Test
    void manipulateSequenceSupportsReverseAndComplement() {
        ManipulationResponse response = service
                .manipulate(new ManipulationRequest("ATGC", true, true));
        assertThat(response.original()).isEqualTo("ATGC");
        assertThat(response.reversed()).isEqualTo("CGTA");
        assertThat(response.complement()).isEqualTo("TACG");
        assertThat(response.reverseComplement()).isEqualTo("GCAT");
    }

    @Test
    void analyzeSequenceProducesSummaryAndRespectsOptions() {
        AnalysisResponse response = service.analyzeSequence("sample.fasta", "FASTA", "ATGAAATAG",
                List.of("sequence-length", "gc-content"));
        assertThat(response.fileName()).isEqualTo("sample.fasta");
        assertThat(response.sequence().length()).isEqualTo(9);
        assertThat(response.sequence().sample()).isEqualTo("ATGAAATAG");
        assertThat(response.options()).containsExactly("sequence-length", "gc-content");
    }
}
