package DNAnalyzer.api.dto.request;

import javax.validation.constraints.NotBlank;

public record ManipulationRequest(@NotBlank(message = "sequence must not be blank") String sequence,
        Boolean reverse,
        Boolean complement) {
}
