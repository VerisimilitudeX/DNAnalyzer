import java.util.ArrayList;

// This class is used to find genes in a DNA sequence.
public class GeneFromProtein {
    private static final ArrayList<String> aminoAcidList = new ArrayList<>();
    private static final ArrayList<String> geneList = new ArrayList<>();

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
            case "isoleucine", "i", "ile" -> aminoAcidList.addAll(isoleucine);
            case "leucine", "l", "leu" -> aminoAcidList.addAll(leucine);
            case "valine", "v", "val" -> aminoAcidList.addAll(valine);
            case "phenylalanine", "f", "phe" -> aminoAcidList.addAll(phenylalanine);
            case "methionine", "m", "met" -> aminoAcidList.addAll(methionine);
            case "cysteine", "c", "cys" -> aminoAcidList.addAll(cysteine);
            case "alanine", "a", "ala" -> aminoAcidList.addAll(alanine);
            case "glycine", "g", "gly" -> aminoAcidList.addAll(glycine);
            case "proline", "p", "pro" -> aminoAcidList.addAll(proline);
            case "threonine", "t", "thr" -> aminoAcidList.addAll(threonine);
            case "serine", "s", "ser" -> aminoAcidList.addAll(serine);
            case "tyrosine", "y", "tyr" -> aminoAcidList.addAll(tyrosine);
            case "tryptophan", "w", "trp" -> aminoAcidList.addAll(tryptophan);
            case "glutamine", "q", "gln" -> aminoAcidList.addAll(glutamine);
            case "asparagine", "n", "asn" -> aminoAcidList.addAll(asparagine);
            case "histidine", "h", "his" -> aminoAcidList.addAll(histidine);
            case "glutamic acid", "e", "glu" -> aminoAcidList.addAll(glutamicAcid);
            case "aspartic acid", "d", "asp" -> aminoAcidList.addAll(asparticAcid);
            case "lysine", "k", "lys" -> aminoAcidList.addAll(lysine);
            case "arginine", "r", "arg" -> aminoAcidList.addAll(arginine);
            default -> System.out.println("Invalid amino acid");
        }
        for (String start_codon : aminoAcidList) {
            int start_index = dna.indexOf(start_codon.toLowerCase());
            for (String stop_codon : stop) {
                int stop_index = dna.indexOf(stop_codon.toLowerCase(), start_index + 3);
                if (start_index != -1 && stop_index != -1) {
                    geneList.add(dna.substring(start_index, stop_index + 3).toUpperCase());
                    break;
                }
            }
        }
        if (geneList.size() == 0) {
            for (int i = 0; i < 100; i++) {
                System.out.println();
            }
            geneList.add("No gene found");
        }
        return geneList;
    }
}
