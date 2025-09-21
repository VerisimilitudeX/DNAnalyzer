package DNAnalyzer.reporting;

import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

import com.theokanning.openai.completion.chat.ChatMessage;

/**
 * Builds prompts for the OpenAI chat completion API.
 */
final class AiPromptBuilder {

    private AiPromptBuilder() {
    }

    static List<ChatMessage> buildMessages(AiReportContext context) {
        ChatMessage system = new ChatMessage("system",
                "You are DNAnalyzer's genomics reporting assistant. Respond only with valid JSON. "
                        + "Return a JSON object containing two string fields: "
                        + "researcher_report and layperson_report. Each value must contain "
                        + "multi-paragraph Markdown describing the findings for the specified audience.");

        String userContent = buildUserMessage(context);
        ChatMessage user = new ChatMessage("user", userContent);
        return List.of(system, user);
    }

    private static String buildUserMessage(AiReportContext context) {
        StringBuilder builder = new StringBuilder();
        builder.append("Create two narratives about the DNA analysis below.\n")
                .append("- researcher_report: technical tone for genomics researchers, reference statistics, note risks.\n")
                .append("- layperson_report: plain language, short paragraphs, include actionable guidance.\n")
                .append("Use neutral, factual language. Do not invent data beyond what is provided.\n\n");

        builder.append("Analysis metadata:\n");
        builder.append("  mode: ").append(context.analysisMode()).append('\n');
        builder.append("  sequence_label: ").append(context.sequenceLabel()).append('\n');
        builder.append(String.format(Locale.ROOT, "  length_bases: %d%n", context.sequenceLength()));
        builder.append(String.format(Locale.ROOT, "  gc_content_percent: %.2f%n", context.gcContent() * 100));
        builder.append("  nucleotide_counts: ").append(formatCounts(context.nucleotideCounts())).append('\n');
        builder.append(String.format(Locale.ROOT, "  gc_window: %d%n", context.gcWindow()));
        builder.append(String.format(Locale.ROOT, "  gc_threshold: %.2f%n", context.gcThreshold()));
        builder.append(String.format(Locale.ROOT, "  mutations_generated: %d%n", context.mutationSequences()));
        builder.append(String.format(Locale.ROOT, "  mutation_edits_per_sequence: %d%n", context.mutationEdits()));
        builder.append(String.format(Locale.ROOT, "  reverse_complement_generated: %s%n",
                context.reverseComplementGenerated()));
        builder.append("  sequence_snippet: ").append(context.sequenceSnippet()).append('\n');

        builder.append("High GC regions (limited to top entries):\n");
        if (context.highGcRegions().isEmpty()) {
            builder.append("  none detected\n");
        } else {
            context.highGcRegions().forEach(entry -> builder.append("  - ").append(entry).append('\n'));
        }

        builder.append("Open reading frames (limited to top entries):\n");
        if (context.openReadingFrames().isEmpty()) {
            builder.append("  none detected\n");
        } else {
            context.openReadingFrames().forEach(entry -> builder.append("  - ").append(entry).append('\n'));
        }

        builder.append("Top codon usage counts:\n");
        if (context.topCodons().isEmpty()) {
            builder.append("  not calculated\n");
        } else {
            context.topCodons().forEach(entry -> builder.append("  - ").append(entry).append('\n'));
        }

        if (!context.additionalInsights().isEmpty()) {
            builder.append("Additional insights:\n");
            context.additionalInsights().forEach(entry -> builder.append("  - ").append(entry).append('\n'));
        }
        if (!context.warnings().isEmpty()) {
            builder.append("Warnings:\n");
            context.warnings().forEach(entry -> builder.append("  - ").append(entry).append('\n'));
        }

        builder.append("\nReturn strictly valid JSON with the fields researcher_report and layperson_report.");
        return builder.toString();
    }

    private static String formatCounts(Map<Character, Long> counts) {
        return counts.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .map(entry -> entry.getKey() + ": " + entry.getValue())
                .collect(Collectors.joining(", "));
    }
}
