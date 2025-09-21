package DNAnalyzer.api.dto.response;

import java.util.List;

public record ProteinResponse(List<Protein> proteins) {

  public record Protein(int start, int end, int length, String sequence) {}
}
