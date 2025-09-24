package DNAnalyzer.api.dto.response;

public record ManipulationResponse(
    String original, String reversed, String complement, String reverseComplement) {}
