package DNAnalyzer.api.service;

import DNAnalyzer.analysis.ReverseComplementer;
import DNAnalyzer.analysis.SequenceAnalyzer;
import DNAnalyzer.api.dto.request.ManipulationRequest;
import DNAnalyzer.api.dto.request.ProteinRequest;
import DNAnalyzer.api.dto.request.ReadingFrameRequest;
import DNAnalyzer.api.dto.request.SequenceRequest;
import DNAnalyzer.api.dto.response.AnalysisResponse;
import DNAnalyzer.api.dto.response.BasePairResponse;
import DNAnalyzer.api.dto.response.CodonResponse;
import DNAnalyzer.api.dto.response.FileParseResponse;
import DNAnalyzer.api.dto.response.ManipulationResponse;
import DNAnalyzer.api.dto.response.ProteinResponse;
import DNAnalyzer.api.dto.response.ProteinResponse.Protein;
import DNAnalyzer.api.dto.response.ReadingFrameResponse;
import DNAnalyzer.api.dto.response.ReadingFrameResponse.Gene;
import DNAnalyzer.api.dto.response.ReadingFrameResponse.ReadingFrame;
import DNAnalyzer.api.dto.response.SequenceSummary;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class SequenceAnalysisService {

    private static final Set<String> STOP_CODONS = Set.of("TAA", "TAG", "TGA");
    private static final Map<String, String> GENETIC_CODE = Map.ofEntries(
            Map.entry("TTT", "F"), Map.entry("TTC", "F"), Map.entry("TTA", "L"), Map.entry("TTG", "L"),
            Map.entry("CTT", "L"), Map.entry("CTC", "L"), Map.entry("CTA", "L"), Map.entry("CTG", "L"),
            Map.entry("ATT", "I"), Map.entry("ATC", "I"), Map.entry("ATA", "I"), Map.entry("ATG", "M"),
            Map.entry("GTT", "V"), Map.entry("GTC", "V"), Map.entry("GTA", "V"), Map.entry("GTG", "V"),
            Map.entry("TCT", "S"), Map.entry("TCC", "S"), Map.entry("TCA", "S"), Map.entry("TCG", "S"),
            Map.entry("CCT", "P"), Map.entry("CCC", "P"), Map.entry("CCA", "P"), Map.entry("CCG", "P"),
            Map.entry("ACT", "T"), Map.entry("ACC", "T"), Map.entry("ACA", "T"), Map.entry("ACG", "T"),
            Map.entry("GCT", "A"), Map.entry("GCC", "A"), Map.entry("GCA", "A"), Map.entry("GCG", "A"),
            Map.entry("TAT", "Y"), Map.entry("TAC", "Y"), Map.entry("TAA", "*"), Map.entry("TAG", "*"),
            Map.entry("CAT", "H"), Map.entry("CAC", "H"), Map.entry("CAA", "Q"), Map.entry("CAG", "Q"),
            Map.entry("AAT", "N"), Map.entry("AAC", "N"), Map.entry("AAA", "K"), Map.entry("AAG", "K"),
            Map.entry("GAT", "D"), Map.entry("GAC", "D"), Map.entry("GAA", "E"), Map.entry("GAG", "E"),
            Map.entry("TGT", "C"), Map.entry("TGC", "C"), Map.entry("TGA", "*"), Map.entry("TGG", "W"),
            Map.entry("CGT", "R"), Map.entry("CGC", "R"), Map.entry("CGA", "R"), Map.entry("CGG", "R"),
            Map.entry("AGT", "S"), Map.entry("AGC", "S"), Map.entry("AGA", "R"), Map.entry("AGG", "R"),
            Map.entry("GGT", "G"), Map.entry("GGC", "G"), Map.entry("GGA", "G"), Map.entry("GGG", "G"));
    private static final List<String> DEFAULT_ANALYSIS_OPTIONS = List.of("sequence-length", "gc-content",
            "start-codons", "stop-codons", "reading-frames", "protein-prediction");

    public BasePairResponse analyzeBasePairs(SequenceRequest request) {
        String normalized = normalizeSequence(request.sequence());
        SequenceAnalyzer analyzer = new SequenceAnalyzer(normalized);
        Map<Character, Long> counts = analyzer.nucleotideCounts();
        Map<String, Long> responseCounts = new LinkedHashMap<>();
        responseCounts.put("A", counts.getOrDefault('A', 0L));
        responseCounts.put("T", counts.getOrDefault('T', 0L));
        responseCounts.put("G", counts.getOrDefault('G', 0L));
        responseCounts.put("C", counts.getOrDefault('C', 0L));
        responseCounts.put("other", counts.getOrDefault('N', 0L));

        int length = analyzer.length();
        Map<String, Double> percentages = responseCounts.entrySet().stream()
                .collect(Collectors.toMap(Map.Entry::getKey,
                        entry -> toPercentage(entry.getValue(), length),
                        (a, b) -> a,
                        LinkedHashMap::new));

        double gcContent = toPercentage(counts.getOrDefault('G', 0L) + counts.getOrDefault('C', 0L), length);
        return new BasePairResponse(responseCounts, percentages, gcContent, length);
    }

    public CodonResponse analyzeCodons(String sequence) {
        String normalized = normalizeSequence(sequence);
        int start = 0;
        int stop = 0;
        for (int i = 0; i <= normalized.length() - 3; i++) {
            String codon = normalized.substring(i, i + 3);
            if ("ATG".equals(codon)) {
                start++;
            }
            if (STOP_CODONS.contains(codon)) {
                stop++;
            }
        }
        return new CodonResponse(start, stop);
    }

    public ReadingFrameResponse analyzeReadingFrames(ReadingFrameRequest request) {
        String normalized = normalizeSequence(request.sequence());
        int minLength = request.minLength() == null ? 300 : Math.max(request.minLength(), 0);
        List<ReadingFrame> frames = new ArrayList<>();
        for (int offset = 0; offset < 3; offset++) {
            frames.add(analyzeFrame(normalized, offset, offset + 1, "forward", minLength));
        }
        String reverseComplement = ReverseComplementer.reverseComplement(normalized);
        for (int offset = 0; offset < 3; offset++) {
            frames.add(analyzeFrame(reverseComplement, offset, offset + 4, "reverse", minLength));
        }
        int totalGenes = frames.stream().mapToInt(frame -> frame.genes().size()).sum();
        return new ReadingFrameResponse(frames, totalGenes);
    }

    public ProteinResponse findProteins(ProteinRequest request) {
        String normalized = normalizeSequence(request.sequence());
        int minLength = request.minLength() == null ? 10 : Math.max(request.minLength(), 1);
        String startAminoAcid = request.aminoAcid();
        String startCodon = "ATG";
        if (startAminoAcid != null && !startAminoAcid.isBlank()) {
            // Currently only methionine is supported as canonical start codon.
            char aa = Character.toUpperCase(startAminoAcid.charAt(0));
            if (aa != 'M') {
                throw new IllegalArgumentException("Only methionine (M) start codon is supported at this time");
            }
        }

        List<Protein> proteins = new ArrayList<>();
        for (int offset = 0; offset < 3; offset++) {
            int i = offset;
            while (i <= normalized.length() - 3) {
                String codon = normalized.substring(i, i + 3);
                if (startCodon.equals(codon)) {
                    int proteinStart = i;
                    StringBuilder proteinSequence = new StringBuilder("M");
                    int j = i + 3;
                    while (j <= normalized.length() - 3) {
                        String nextCodon = normalized.substring(j, j + 3);
                        if (STOP_CODONS.contains(nextCodon)) {
                            if (proteinSequence.length() >= minLength) {
                                proteins.add(new Protein(proteinStart, j + 2, proteinSequence.length(),
                                        proteinSequence.toString()));
                            }
                            i = j + 3;
                            break;
                        }
                        proteinSequence.append(GENETIC_CODE.getOrDefault(nextCodon, "X"));
                        j += 3;
                    }
                    if (j > normalized.length() - 3) {
                        i = j;
                    }
                } else {
                    i += 3;
                }
            }
        }
        proteins.sort(Comparator.comparingInt(Protein::length).reversed());
        return new ProteinResponse(proteins.stream().limit(10).collect(Collectors.toList()));
    }

    public ManipulationResponse manipulate(ManipulationRequest request) {
        String normalized = normalizeSequence(request.sequence());
        boolean reverse = Boolean.TRUE.equals(request.reverse());
        boolean complement = Boolean.TRUE.equals(request.complement());

        String reversed = reverse ? new StringBuilder(normalized).reverse().toString() : null;
        String complemented = complement ? complement(normalized) : null;
        String reverseComplement = (reverse && complement) ? ReverseComplementer.reverseComplement(normalized) : null;

        return new ManipulationResponse(normalized, reversed, complemented, reverseComplement);
    }

    public AnalysisResponse analyzeSequence(String fileName, String format, String sequence, List<String> requestedOptions) {
        String normalized = normalizeSequence(sequence);
        SequenceAnalyzer analyzer = new SequenceAnalyzer(normalized);
        SequenceSummary summary = new SequenceSummary(analyzer.length(), sample(normalized));
        BasePairResponse basePairs = analyzeBasePairs(new SequenceRequest(normalized));
        CodonResponse codons = analyzeCodons(normalized);
        ReadingFrameResponse readingFrames = analyzeReadingFrames(new ReadingFrameRequest(normalized, 300));
        ProteinResponse proteins = findProteins(new ProteinRequest(normalized, "M", 10));
        List<String> options = requestedOptions == null || requestedOptions.isEmpty() ? DEFAULT_ANALYSIS_OPTIONS
                : requestedOptions;
        return new AnalysisResponse(fileName, format, summary, basePairs, codons, readingFrames, proteins, options);
    }

    public FileParseResponse buildFileParseResponse(String originalName, String header, String sequence, String format) {
        String normalized = normalizeSequence(sequence);
        return new FileParseResponse(originalName, header, normalized, format, normalized.length());
    }

    public String normalizeSequence(String sequence) {
        if (sequence == null) {
            return "";
        }
        return sequence.replaceAll("\\s+", "").toUpperCase(Locale.ROOT);
    }

    private ReadingFrame analyzeFrame(String sequence, int offset, int frameNumber, String direction, int minLength) {
        List<Gene> genes = new ArrayList<>();
        boolean inGene = false;
        int geneStart = -1;
        for (int i = offset; i <= sequence.length() - 3; i += 3) {
            String codon = sequence.substring(i, i + 3);
            if (!inGene && "ATG".equals(codon)) {
                inGene = true;
                geneStart = i;
            } else if (inGene && STOP_CODONS.contains(codon)) {
                int length = i + 3 - geneStart;
                if (length >= minLength) {
                    if ("forward".equals(direction)) {
                        genes.add(new Gene(geneStart, i + 2, length));
                    } else {
                        genes.add(new Gene(i + 2, geneStart, length));
                    }
                }
                inGene = false;
            }
        }
        return new ReadingFrame(frameNumber, direction, genes);
    }

    private double toPercentage(long count, int length) {
        if (length == 0) {
            return 0.0;
        }
        BigDecimal percentage = BigDecimal.valueOf(count * 100.0d / length);
        return percentage.setScale(1, RoundingMode.HALF_UP).doubleValue();
    }

    private String complement(String sequence) {
        StringBuilder builder = new StringBuilder(sequence.length());
        for (int i = 0; i < sequence.length(); i++) {
            char base = sequence.charAt(i);
            builder.append(switch (base) {
                case 'A' -> 'T';
                case 'T', 'U' -> 'A';
                case 'C' -> 'G';
                case 'G' -> 'C';
                default -> 'N';
            });
        }
        return builder.toString();
    }

    private String sample(String sequence) {
        if (sequence.length() <= 100) {
            return sequence;
        }
        return sequence.substring(0, 100) + "...";
    }
}
