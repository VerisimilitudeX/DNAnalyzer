import java.util.ArrayList;

// This class is used to find genes in a DNA sequence.
public class GeneFromProtein {
    private final ArrayList<String> aminoAcidList = new ArrayList<>();
    private final ArrayList<String> geneList = new ArrayList<>();

    public ArrayList<String> getAminoAcid(String dna, String aminoAcid, ArrayList<String> isoleucine,
            ArrayList<String> leucine,
            ArrayList<String> valine, ArrayList<String> phenylalanine, ArrayList<String> methionine,
            ArrayList<String> cysteine, ArrayList<String> alanine, ArrayList<String> glycine, ArrayList<String> proline,
            ArrayList<String> threonine, ArrayList<String> serine, ArrayList<String> tyrosine,
            ArrayList<String> tryptophan, ArrayList<String> glutamine, ArrayList<String> asparagine,
            ArrayList<String> histidine, ArrayList<String> glutamicAcid, ArrayList<String> asparticAcid,
            ArrayList<String> lysine, ArrayList<String> arginine, ArrayList<String> stop) {

        // Maps the amino acid that the user entered to the start codon list.
        switch (aminoAcid) {
            case "isoleucine", "i", "ile" -> this.aminoAcidList.addAll(isoleucine);
            case "leucine", "l", "leu" -> this.aminoAcidList.addAll(leucine);
            case "valine", "v", "val" -> this.aminoAcidList.addAll(valine);
            case "phenylalanine", "f", "phe" -> this.aminoAcidList.addAll(phenylalanine);
            case "methionine", "m", "met" -> this.aminoAcidList.addAll(methionine);
            case "cysteine", "c", "cys" -> this.aminoAcidList.addAll(cysteine);
            case "alanine", "a", "ala" -> this.aminoAcidList.addAll(alanine);
            case "glycine", "g", "gly" -> this.aminoAcidList.addAll(glycine);
            case "proline", "p", "pro" -> this.aminoAcidList.addAll(proline);
            case "threonine", "t", "thr" -> this.aminoAcidList.addAll(threonine);
            case "serine", "s", "ser" -> this.aminoAcidList.addAll(serine);
            case "tyrosine", "y", "tyr" -> this.aminoAcidList.addAll(tyrosine);
            case "tryptophan", "w", "trp" -> this.aminoAcidList.addAll(tryptophan);
            case "glutamine", "q", "gln" -> this.aminoAcidList.addAll(glutamine);
            case "asparagine", "n", "asn" -> this.aminoAcidList.addAll(asparagine);
            case "histidine", "h", "his" -> this.aminoAcidList.addAll(histidine);
            case "glutamic acid", "e", "glu" -> this.aminoAcidList.addAll(glutamicAcid);
            case "aspartic acid", "d", "asp" -> this.aminoAcidList.addAll(asparticAcid);
            case "lysine", "k", "lys" -> this.aminoAcidList.addAll(lysine);
            case "arginine", "r", "arg" -> this.aminoAcidList.addAll(arginine);
            default -> System.out.println("Invalid amino acid");
        }
        for (String start_codon : this.aminoAcidList) {
            int start_index = dna.indexOf(start_codon.toLowerCase());
            for (String stop_codon : stop) {
                int stop_index = dna.indexOf(stop_codon.toLowerCase(), start_index + 3);
                if (start_index != -1 && stop_index != -1) {
                    this.geneList.add(dna.substring(start_index, stop_index + 3).toUpperCase());
                    break;
                }
            }
        }
        if (this.geneList.size() == 0) {
            for (int i = 0; i < 100; i++) {
                System.out.println();
            }
            this.geneList.add("No gene found");
        }
        return this.geneList;
    }
}
