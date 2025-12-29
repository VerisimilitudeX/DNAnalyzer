package DNAnalyzer.api.dto.response;

import java.util.Map;

public record BasePairResponse(
    Map<String, Long> counts, Map<String, Double> percentages, double gcContent, int length) {}
