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

    // Returns the start codon data for the amino acid called. This uses
    // encapsulation to ensure that the codon data is available to the rest of the
    // program (i.e. the dnaSequencer class).
    public ArrayList<String> getIsoleucine() {
        return Isoleucine;
    }

    public ArrayList<String> getLeucine() {
        return Leucine;
    }

    public ArrayList<String> getValine() {
        return Valine;
    }

    public ArrayList<String> getPhenylalanine() {
        return Phenylalanine;
    }

    public ArrayList<String> getMethionine() {
        return Methionine;
    }

    public ArrayList<String> getCysteine() {
        return Cysteine;
    }

    public ArrayList<String> getAlanine() {
        return Alanine;
    }

    public ArrayList<String> getGlycine() {
        return Glycine;
    }

    public ArrayList<String> getProline() {
        return Proline;
    }

    public ArrayList<String> getThreonine() {
        return Threonine;
    }

    public ArrayList<String> getSerine() {
        return Serine;
    }

    public ArrayList<String> getTyrosine() {
        return Tyrosine;
    }

    public ArrayList<String> getTryptophan() {
        return Tryptophan;
    }

    public ArrayList<String> getGlutamine() {
        return Glutamine;
    }

    public ArrayList<String> getAsparagine() {
        return Asparagine;
    }

    public ArrayList<String> getHistidine() {
        return Histidine;
    }

    public ArrayList<String> getGlutamicAcid() {
        return GlutamicAcid;
    }

    public ArrayList<String> getAsparticAcid() {
        return AsparticAcid;
    }

    public ArrayList<String> getLysine() {
        return Lysine;
    }

    public ArrayList<String> getArginine() {
        return Arginine;
    }

    public ArrayList<String> getStop() {
        return Stop;
    }
}