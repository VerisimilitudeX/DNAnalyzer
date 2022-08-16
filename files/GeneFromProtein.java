
// Imports the Java ArrayList Library for storing the start and stop codon data.
import java.util.ArrayList;
import resources.StorageResource;

public class GeneFromProtein {
    public StorageResource getAminoAcid(String dna, String aminoAcid, ArrayList<String> isoleucine,
            ArrayList<String> leucine,
            ArrayList<String> valine, ArrayList<String> phenylalanine, ArrayList<String> methionine,
            ArrayList<String> cysteine, ArrayList<String> alanine, ArrayList<String> glycine, ArrayList<String> proline,
            ArrayList<String> threonine, ArrayList<String> serine, ArrayList<String> tyrosine,
            ArrayList<String> tryptophan, ArrayList<String> glutamine, ArrayList<String> asparagine,
            ArrayList<String> histidine, ArrayList<String> glutamicAcid, ArrayList<String> asparticAcid,
            ArrayList<String> lysine, ArrayList<String> arginine, ArrayList<String> stop) {
        ArrayList<String> aminoAcidList = new ArrayList<>();
        switch (aminoAcid) {
            case "isoleucine", "i" -> aminoAcidList.addAll(isoleucine);
            case "leucine", "l" -> aminoAcidList.addAll(leucine);
            case "valine", "v" -> aminoAcidList.addAll(valine);
            case "phenylalanine", "f" -> aminoAcidList.addAll(phenylalanine);
            case "methionine", "m" -> aminoAcidList.addAll(methionine);
            case "cysteine", "c" -> aminoAcidList.addAll(cysteine);
            case "alanine", "a" -> aminoAcidList.addAll(alanine);
            case "glycine", "g" -> aminoAcidList.addAll(glycine);
            case "proline", "p" -> aminoAcidList.addAll(proline);
            case "threonine", "t" -> aminoAcidList.addAll(threonine);
            case "serine", "s" -> aminoAcidList.addAll(serine);
            case "tyrosine", "y" -> aminoAcidList.addAll(tyrosine);
            case "tryptophan", "w" -> aminoAcidList.addAll(tryptophan);
            case "glutamine", "q" -> aminoAcidList.addAll(glutamine);
            case "asparagine", "n" -> aminoAcidList.addAll(asparagine);
            case "histidine", "h" -> aminoAcidList.addAll(histidine);
            case "glutamic acid", "e" -> aminoAcidList.addAll(glutamicAcid);
            case "aspartic acid", "d" -> aminoAcidList.addAll(asparticAcid);
            case "lysine", "k" -> aminoAcidList.addAll(lysine);
            case "arginine", "r" -> aminoAcidList.addAll(arginine);
            default -> System.out.println("Invalid amino acid");
        }
        StorageResource geneList = new StorageResource();
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
            geneList.clear();
            geneList.add("No gene found");
        }
        return geneList;
    }
}
