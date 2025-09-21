package DNAnalyzer.reporting;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Structured data describing the outcome of an analysis run.
 */
public final class AiReportContext {

    private final String analysisMode;
    private final String sequenceLabel;
    private final String sequenceSnippet;
    private final int sequenceLength;
    private final double gcContent;
    private final Map<Character, Long> nucleotideCounts;
    private final int gcWindow;
    private final double gcThreshold;
    private final List<String> highGcRegions;
    private final List<String> openReadingFrames;
    private final List<String> topCodons;
    private final int mutationSequences;
    private final int mutationEdits;
    private final boolean reverseComplementGenerated;
    private final List<String> additionalInsights;
    private final List<String> warnings;

    private AiReportContext(Builder builder) {
        this.analysisMode = builder.analysisMode;
        this.sequenceLabel = builder.sequenceLabel;
        this.sequenceSnippet = builder.sequenceSnippet;
        this.sequenceLength = builder.sequenceLength;
        this.gcContent = builder.gcContent;
        this.nucleotideCounts = Map.copyOf(builder.nucleotideCounts);
        this.gcWindow = builder.gcWindow;
        this.gcThreshold = builder.gcThreshold;
        this.highGcRegions = List.copyOf(builder.highGcRegions);
        this.openReadingFrames = List.copyOf(builder.openReadingFrames);
        this.topCodons = List.copyOf(builder.topCodons);
        this.mutationSequences = builder.mutationSequences;
        this.mutationEdits = builder.mutationEdits;
        this.reverseComplementGenerated = builder.reverseComplementGenerated;
        this.additionalInsights = List.copyOf(builder.additionalInsights);
        this.warnings = List.copyOf(builder.warnings);
    }

    public String analysisMode() {
        return analysisMode;
    }

    public String sequenceLabel() {
        return sequenceLabel;
    }

    public String sequenceSnippet() {
        return sequenceSnippet;
    }

    public int sequenceLength() {
        return sequenceLength;
    }

    public double gcContent() {
        return gcContent;
    }

    public Map<Character, Long> nucleotideCounts() {
        return nucleotideCounts;
    }

    public int gcWindow() {
        return gcWindow;
    }

    public double gcThreshold() {
        return gcThreshold;
    }

    public List<String> highGcRegions() {
        return highGcRegions;
    }

    public List<String> openReadingFrames() {
        return openReadingFrames;
    }

    public List<String> topCodons() {
        return topCodons;
    }

    public int mutationSequences() {
        return mutationSequences;
    }

    public int mutationEdits() {
        return mutationEdits;
    }

    public boolean reverseComplementGenerated() {
        return reverseComplementGenerated;
    }

    public List<String> additionalInsights() {
        return additionalInsights;
    }

    public List<String> warnings() {
        return warnings;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static final class Builder {
        private String analysisMode = "basic";
        private String sequenceLabel = "unknown";
        private String sequenceSnippet = "";
        private int sequenceLength;
        private double gcContent;
        private Map<Character, Long> nucleotideCounts = Map.of();
        private int gcWindow = 100;
        private double gcThreshold = 0.6;
        private final List<String> highGcRegions = new ArrayList<>();
        private final List<String> openReadingFrames = new ArrayList<>();
        private final List<String> topCodons = new ArrayList<>();
        private int mutationSequences;
        private int mutationEdits = 1;
        private boolean reverseComplementGenerated;
        private final List<String> additionalInsights = new ArrayList<>();
        private final List<String> warnings = new ArrayList<>();

        private Builder() {
        }

        public Builder analysisMode(String value) {
            if (value != null && !value.isBlank()) {
                this.analysisMode = value.trim().toLowerCase(Locale.ROOT);
            }
            return this;
        }

        public Builder sequenceLabel(String value) {
            if (value != null && !value.isBlank()) {
                this.sequenceLabel = value.trim();
            }
            return this;
        }

        public Builder sequenceSnippet(String value) {
            if (value != null) {
                this.sequenceSnippet = value.trim();
            }
            return this;
        }

        public Builder sequenceLength(int value) {
            this.sequenceLength = Math.max(value, 0);
            return this;
        }

        public Builder gcContent(double value) {
            this.gcContent = value;
            return this;
        }

        public Builder nucleotideCounts(Map<Character, Long> value) {
            if (value != null) {
                this.nucleotideCounts = value.entrySet().stream()
                        .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
            }
            return this;
        }

        public Builder gcWindow(int value) {
            this.gcWindow = value;
            return this;
        }

        public Builder gcThreshold(double value) {
            this.gcThreshold = value;
            return this;
        }

        public Builder highGcRegions(List<String> value) {
            if (value != null) {
                this.highGcRegions.clear();
                this.highGcRegions.addAll(value.stream()
                        .filter(Objects::nonNull)
                        .map(String::trim)
                        .filter(entry -> !entry.isEmpty())
                        .toList());
            }
            return this;
        }

        public Builder openReadingFrames(List<String> value) {
            if (value != null) {
                this.openReadingFrames.clear();
                this.openReadingFrames.addAll(value.stream()
                        .filter(Objects::nonNull)
                        .map(String::trim)
                        .filter(entry -> !entry.isEmpty())
                        .toList());
            }
            return this;
        }

        public Builder topCodons(List<String> value) {
            if (value != null) {
                this.topCodons.clear();
                this.topCodons.addAll(value.stream()
                        .filter(Objects::nonNull)
                        .map(String::trim)
                        .filter(entry -> !entry.isEmpty())
                        .toList());
            }
            return this;
        }

        public Builder mutationSequences(int value) {
            this.mutationSequences = Math.max(value, 0);
            return this;
        }

        public Builder mutationEdits(int value) {
            this.mutationEdits = Math.max(value, 1);
            return this;
        }

        public Builder reverseComplementGenerated(boolean value) {
            this.reverseComplementGenerated = value;
            return this;
        }

        public Builder additionalInsights(List<String> value) {
            if (value != null) {
                this.additionalInsights.clear();
                this.additionalInsights.addAll(value.stream()
                        .filter(Objects::nonNull)
                        .map(String::trim)
                        .filter(entry -> !entry.isEmpty())
                        .toList());
            }
            return this;
        }

        public Builder warnings(List<String> value) {
            if (value != null) {
                this.warnings.clear();
                this.warnings.addAll(value.stream()
                        .filter(Objects::nonNull)
                        .map(String::trim)
                        .filter(entry -> !entry.isEmpty())
                        .toList());
            }
            return this;
        }

        public AiReportContext build() {
            return new AiReportContext(this);
        }
    }
}
