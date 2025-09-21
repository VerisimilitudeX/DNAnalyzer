package DNAnalyzer.reporting;

import java.time.Duration;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatCompletionResult;
import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.service.OpenAiService;

/**
 * Interacts with OpenAI to produce audience-specific narratives.
 */
public final class AiReportService {

    private final AiConfiguration configuration;

    public AiReportService() {
        this(AiConfiguration.resolve());
    }

    AiReportService(AiConfiguration configuration) {
        this.configuration = Objects.requireNonNull(configuration);
    }

    public Optional<AiReport> generateReports(AiReportContext context) {
        if (!configuration.enabled()) {
            if (configuration.disableReason() != null && !configuration.disableReason().isBlank()) {
                System.out.println(configuration.disableReason());
            }
            return Optional.empty();
        }

        List<ChatMessage> messages = AiPromptBuilder.buildMessages(context);
        ChatCompletionRequest request = ChatCompletionRequest.builder()
                .model(configuration.model())
                .messages(messages)
                .temperature(configuration.temperature())
                .maxTokens(configuration.maxTokens())
                .user("DNAnalyzer")
                .build();

        OpenAiService service = createService(configuration.apiKey(), configuration.timeout());
        try {
            ChatCompletionResult result = service.createChatCompletion(request);
            String content = result.getChoices().stream()
                    .map(choice -> choice.getMessage().getContent())
                    .filter(Objects::nonNull)
                    .findFirst()
                    .orElse("");
            AiReport report = AiResponseParser.parse(content);
            if (report.isEmpty()) {
                System.out.println("OpenAI returned an empty response for the requested summaries.");
                return Optional.empty();
            }
            return Optional.of(report);
        } catch (Exception ex) {
            System.out.println("Unable to generate AI summaries: " + ex.getMessage());
            return Optional.empty();
        }
    }

    private OpenAiService createService(String apiKey, Duration timeout) {
        if (timeout == null || timeout.isZero()) {
            return new OpenAiService(apiKey);
        }
        return new OpenAiService(apiKey, timeout);
    }
}
