package DNAnalyzer.api.dto.request;

import javax.validation.constraints.NotBlank;

public record ReadingFrameRequest(@NotBlank(message = "sequence must not be blank") String sequence,
        Integer minLength) {
}
