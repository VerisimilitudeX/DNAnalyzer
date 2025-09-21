package DNAnalyzer.reporting;

import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Parses raw OpenAI responses into structured summaries.
 */
final class AiResponseParser {
    private static final Pattern SECTION_PATTERN = Pattern.compile(
            "(?is)(researcher\s*report\s*:)(.+?)(layperson\s*report\s*:)(.+)");

    private AiResponseParser() {
    }

    static AiReport parse(String content) {
        if (content == null || content.isBlank()) {
            return AiReport.empty();
        }
        String trimmed = content.trim();

        Optional<AiReport> json = parseJson(trimmed);
        if (json.isPresent()) {
            return json.get();
        }

        Optional<AiReport> sections = parseSections(trimmed);
        if (sections.isPresent()) {
            return sections.get();
        }

        return new AiReport(trimmed, "");
    }

    private static Optional<AiReport> parseJson(String content) {
        try {
            JSONObject object = new JSONObject(content);
            String researcher = firstNonBlank(
                    object.optString("researcher_report", null),
                    object.optString("researcherReport", null),
                    object.optString("scientist_report", null));
            String layperson = firstNonBlank(
                    object.optString("layperson_report", null),
                    object.optString("laypersonReport", null),
                    object.optString("public_report", null));
            if (researcher != null || layperson != null) {
                return Optional.of(new AiReport(
                        researcher != null ? researcher.trim() : "",
                        layperson != null ? layperson.trim() : ""));
            }
        } catch (JSONException ignored) {
            // Fall back to section parsing.
        }
        return Optional.empty();
    }

    private static Optional<AiReport> parseSections(String content) {
        Matcher matcher = SECTION_PATTERN.matcher(content);
        if (!matcher.find()) {
            return Optional.empty();
        }
        String researcher = matcher.group(2).trim();
        String layperson = matcher.group(4).trim();
        return Optional.of(new AiReport(researcher, layperson));
    }

    private static String firstNonBlank(String... values) {
        if (values == null) {
            return null;
        }
        for (String value : values) {
            if (value != null && !value.trim().isEmpty()) {
                return value.trim();
            }
        }
        return null;
    }
}
