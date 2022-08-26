import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

// This method returns the codon data for the given amino acid.
public class StructCodonData {

    // Declares the start codon data for the 20 amino acids. Adding 'final' after
    // 'private' makes the variable immutable.
    private static final ArrayList<String> Isoleucine = new ArrayList<>(Arrays.asList("ATT", "ATC", "ATA"));
    private static final ArrayList<String> Leucine = new ArrayList<>(
            Arrays.asList("CTT", "CTC", "CTA", "CTG", "TTA", "TTG"));
    private static final ArrayList<String> Valine = new ArrayList<>(Arrays.asList("GTT", "GTC", "GTA", "GTG"));
    private static final ArrayList<String> Phenylalanine = new ArrayList<>(Arrays.asList("TTT", "TTC"));
    private static final ArrayList<String> Methionine = new ArrayList<>(List.of("ATG"));
    private static final ArrayList<String> Cysteine = new ArrayList<>(Arrays.asList("TGT", "TGC"));
    private static final ArrayList<String> Alanine = new ArrayList<>(Arrays.asList("GCT", "GCC", "GCA", "GCG"));
    private static final ArrayList<String> Glycine = new ArrayList<>(Arrays.asList("GGT", "GGC", "GGA", "GGG"));
    private static final ArrayList<String> Proline = new ArrayList<>(Arrays.asList("CCT", "CCC", "CCA", "CCG"));
    private static final ArrayList<String> Threonine = new ArrayList<>(Arrays.asList("ACT", "ACC", "ACA", "ACG"));
    private static final ArrayList<String> Serine = new ArrayList<>(
            Arrays.asList("TCT", "TCC", "TCA", "TCG", "AGT", "AGC"));
    private static final ArrayList<String> Tyrosine = new ArrayList<>(Arrays.asList("TAT", "TAC"));
    private static final ArrayList<String> Tryptophan = new ArrayList<>(List.of("TGG"));
    private static final ArrayList<String> Glutamine = new ArrayList<>(Arrays.asList("CAA", "CAG"));
    private static final ArrayList<String> Asparagine = new ArrayList<>(Arrays.asList("AAT", "AAC"));
    private static final ArrayList<String> Histidine = new ArrayList<>(Arrays.asList("CAT", "CAC"));
    private static final ArrayList<String> GlutamicAcid = new ArrayList<>(Arrays.asList("GAA", "GAG"));
    private static final ArrayList<String> AsparticAcid = new ArrayList<>(Arrays.asList("GAT", "GAC"));
    private static final ArrayList<String> Lysine = new ArrayList<>(Arrays.asList("AAA", "AAG"));
    private static final ArrayList<String> Arginine = new ArrayList<>(
            Arrays.asList("CGT", "CGC", "CGA", "CGG", "AGA", "AGG"));

    // Declares the stop codon data for the 20 amino acids. Note: the stop codons
    // are the same for all amino acids.
    private static final ArrayList<String> Stop = new ArrayList<>(Arrays.asList("TAA", "TAG", "TGA"));

    public ArrayList<String> getCodonType(AminoAcid type) {
        switch (type) {
            case ISOLEUCINE:
                return Isoleucine;
            case LEUCINE:
                return Leucine;
            case VALINE:
                return Valine;
            case PHENYLALANINE:
                return Phenylalanine;
            case METHIONINE:
                return Methionine;
            case CYSTEINE:
                return Cysteine;
            case ALANINE:
                return Alanine;
            case GLYCINE:
                return Glycine;
            case PROLINE:
                return Proline;
            case THREONINE:
                return Threonine;
            case SERINE:
                return Serine;
            case TYROSINE:
                return Tyrosine;
            case TRYPTOPHAN:
                return Tryptophan;
            case GLUTAMINE:
                return Glutamine;
            case ASPARAGINE:
                return Asparagine;
            case HISTIDINE:
                return Histidine;
            case GLUTAMIC_ACID:
                return GlutamicAcid;
            case ASPARTIC_ACID:
                return AsparticAcid;
            case LYSINE:
                return Lysine;
            case ARGININE:
                return Arginine;
            case STOP:
                return Stop;
            default:
                return null;
        }
    }
}
