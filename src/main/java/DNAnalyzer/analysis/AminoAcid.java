package DNAnalyzer.analysis;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Locale;
import java.util.Optional;
import java.util.Set;

/** Amino acid definitions tied to codon sets. */
public enum AminoAcid {
    ISOLEUCINE("isoleucine", new String[]{"ATT", "ATC", "ATA"}, "i", "ile"),
    LEUCINE("leucine", new String[]{"CTT", "CTC", "CTA", "CTG", "TTA", "TTG"}, "l", "leu"),
    VALINE("valine", new String[]{"GTT", "GTC", "GTA", "GTG"}, "v", "val"),
    PHENYLALANINE("phenylalanine", new String[]{"TTT", "TTC"}, "f", "phe"),
    METHIONINE("methionine", new String[]{"ATG"}, "m", "met"),
    CYSTEINE("cysteine", new String[]{"TGT", "TGC"}, "c", "cys"),
    ALANINE("alanine", new String[]{"GCT", "GCC", "GCA", "GCG"}, "a", "ala"),
    GLYCINE("glycine", new String[]{"GGT", "GGC", "GGA", "GGG"}, "g", "gly"),
    PROLINE("proline", new String[]{"CCT", "CCC", "CCA", "CCG"}, "p", "pro"),
    THREONINE("threonine", new String[]{"ACT", "ACC", "ACA", "ACG"}, "t", "thr"),
    SERINE("serine", new String[]{"TCT", "TCC", "TCA", "TCG", "AGT", "AGC"}, "s", "ser"),
    TYROSINE("tyrosine", new String[]{"TAT", "TAC"}, "y", "tyr"),
    TRYPTOPHAN("tryptophan", new String[]{"TGG"}, "w", "trp"),
    GLUTAMINE("glutamine", new String[]{"CAA", "CAG"}, "q", "gln"),
    ASPARAGINE("asparagine", new String[]{"AAT", "AAC"}, "n", "asn"),
    HISTIDINE("histidine", new String[]{"CAT", "CAC"}, "h", "his"),
    GLUTAMIC_ACID("glutamic acid", new String[]{"GAA", "GAG"}, "e", "glu"),
    ASPARTIC_ACID("aspartic acid", new String[]{"GAT", "GAC"}, "d", "asp"),
    LYSINE("lysine", new String[]{"AAA", "AAG"}, "k", "lys"),
    ARGININE("arginine", new String[]{"CGT", "CGC", "CGA", "CGG", "AGA", "AGG"}, "r", "arg"),
    STOP("stop", new String[]{"TAA", "TAG", "TGA"}, "*", "stop");

    private final String display;
    private final Set<String> codons = new HashSet<>();
    private final Set<String> aliases = new HashSet<>();

    AminoAcid(String display, String[] codons, String... aliases) {
        this.display = display;
        this.codons.addAll(Arrays.asList(codons));
        this.aliases.add(display);
        this.aliases.addAll(Arrays.asList(aliases));
    }

    public Set<String> codons() {
        return codons;
    }

    public String display() {
        return display;
    }

    public String displayName() {
        return display;
    }

    public static Optional<AminoAcid> fromToken(String token) {
        if (token == null || token.isBlank()) {
            return Optional.empty();
        }
        String normalized = token.trim().toLowerCase(Locale.ROOT);
        for (AminoAcid value : values()) {
            if (value.aliases.stream().anyMatch(alias -> alias.equals(normalized))) {
                return Optional.of(value);
            }
        }
        return Optional.empty();
    }

    public static Optional<AminoAcid> fromInput(String token) {
        return fromToken(token);
    }

    public static String listSupported() {
        StringBuilder builder = new StringBuilder();
        for (AminoAcid value : values()) {
            if (builder.length() > 0) {
                builder.append(", ");
            }
            builder.append(value.display());
        }
        return builder.toString();
    }
}
