package DNAnalyzer.api.dto.request;

import javax.validation.constraints.NotBlank;

public record ProteinRequest(@NotBlank(message = "sequence must not be blank") String sequence,
        String aminoAcid,
        Integer minLength) {
}
