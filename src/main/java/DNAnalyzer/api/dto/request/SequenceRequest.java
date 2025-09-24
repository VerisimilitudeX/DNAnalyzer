package DNAnalyzer.api.dto.request;

import javax.validation.constraints.NotBlank;

public record SequenceRequest(@NotBlank(message = "sequence must not be blank") String sequence) {}
