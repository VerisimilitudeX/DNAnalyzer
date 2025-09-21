package DNAnalyzer.reporting;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

class AiResponseParserTest {

    @Test
    void parsesJsonPayload() {
        String payload = "{" +
                "\"researcher_report\": \"In-depth findings.\"," +
                "\"layperson_report\": \"Plain summary.\"}";

        AiReport report = AiResponseParser.parse(payload);
        assertEquals("In-depth findings.", report.researcherNarrative());
        assertEquals("Plain summary.", report.laypersonNarrative());
    }

    @Test
    void fallsBackToSectionParsing() {
        String payload = "Researcher Report: Technical details.\nLayperson Report: Simple explanation.";

        AiReport report = AiResponseParser.parse(payload);
        assertEquals("Technical details.", report.researcherNarrative());
        assertEquals("Simple explanation.", report.laypersonNarrative());
    }

    @Test
    void returnsEmptyReportForBlankContent() {
        AiReport report = AiResponseParser.parse("   ");
        assertTrue(report.isEmpty());
    }
}
