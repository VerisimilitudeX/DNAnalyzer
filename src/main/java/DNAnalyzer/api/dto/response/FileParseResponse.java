package DNAnalyzer.api.dto.response;

public record FileParseResponse(String name,
        String header,
        String sequence,
        String format,
        int length) {
}
