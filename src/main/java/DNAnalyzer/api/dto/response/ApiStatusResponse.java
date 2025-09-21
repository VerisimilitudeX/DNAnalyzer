package DNAnalyzer.api.dto.response;

import java.time.Instant;
import java.util.List;

public record ApiStatusResponse(String status,
        String version,
        Instant timestamp,
        List<String> availableEndpoints) {
}
