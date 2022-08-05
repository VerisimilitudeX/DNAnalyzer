// Imports the Java ArrayList Library for storing the start and stop codon data.
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.Map.Entry;

public class findGeneWithAminoAcid {
    public findGeneWithAminoAcid(String dna, String aminoAcid, ArrayList<String> isoleucine, ArrayList<String> leucine,
            ArrayList<String> valine, ArrayList<String> phenylalanine, ArrayList<String> methionine,
            ArrayList<String> cysteine, ArrayList<String> alanine, ArrayList<String> glycine, ArrayList<String> proline,
            ArrayList<String> threonine, ArrayList<String> serine, ArrayList<String> tyrosine,
            ArrayList<String> tryptophan, ArrayList<String> glutamine, ArrayList<String> asparagine,
            ArrayList<String> histidine, ArrayList<String> glutamicAcid, ArrayList<String> asparticAcid,
            ArrayList<String> lysine, ArrayList<String> arginine, Hashtable<String, Integer> stop) {
                ArrayList<String> aminoAcidList = new ArrayList<String>();
        if (aminoAcid.equals("isoleucine") || aminoAcid.equals("i")) {
            aminoAcidList.addAll(isoleucine);
        } else if (aminoAcid.equals("leucine") || aminoAcid.equals("l")) {
            aminoAcidList.addAll(leucine);
        } else if (aminoAcid.equals("valine") || aminoAcid.equals("v")) {
            aminoAcidList.addAll(valine);
        } else if (aminoAcid.equals("phenylalanine") || aminoAcid.equals("f")) {
            aminoAcidList.addAll(phenylalanine);
        } else if (aminoAcid.equals("methionine") || aminoAcid.equals("m")) {
            aminoAcidList.addAll(methionine);
        } else if (aminoAcid.equals("cysteine") || aminoAcid.equals("c")) {
            aminoAcidList.addAll(cysteine);
        } else if (aminoAcid.equals("alanine") || aminoAcid.equals("a")) {
            aminoAcidList.addAll(alanine);
        } else if (aminoAcid.equals("glycine") || aminoAcid.equals("g")) {
            aminoAcidList.addAll(glycine);
        } else if (aminoAcid.equals("proline") || aminoAcid.equals("p")) {
            aminoAcidList.addAll(proline);
        } else if (aminoAcid.equals("threonine") || aminoAcid.equals("t")) {
            aminoAcidList.addAll(threonine);
        } else if (aminoAcid.equals("serine") || aminoAcid.equals("s")) {
            aminoAcidList.addAll(serine);
        } else if (aminoAcid.equals("tyrosine") || aminoAcid.equals("y")) {
            aminoAcidList.addAll(tyrosine);
        } else if (aminoAcid.equals("tryptophan") || aminoAcid.equals("w")) {
            aminoAcidList.addAll(tryptophan);
        } else if (aminoAcid.equals("glutamine") || aminoAcid.equals("q")) {
            aminoAcidList.addAll(glutamine);
        } else if (aminoAcid.equals("asparagine") || aminoAcid.equals("n")) {
            aminoAcidList.addAll(asparagine);
        } else if (aminoAcid.equals("histidine") || aminoAcid.equals("h")) {
            aminoAcidList.addAll(histidine);
        } else if (aminoAcid.equals("glutamicacid") || aminoAcid.equals("e")) {
            aminoAcidList.addAll(glutamicAcid);
        } else if (aminoAcid.equals("asparticacid") || aminoAcid.equals("d")) {
            aminoAcidList.addAll(asparticAcid);
        } else if (aminoAcid.equals("lysine") || aminoAcid.equals("k")) {
            aminoAcidList.addAll(lysine);
        } else if (aminoAcid.equals("arginine") || aminoAcid.equals("r")) {
            aminoAcidList.addAll(arginine);
        } else {
            System.out.println("Invalid amino acid");
        }
        String gene = "";
        int count = 1;
        for (int i = 0; i < 100; i++) {
            System.out.println();
        }
        System.out.println("List of genes coded for " + aminoAcid + " in the DNA strand: ");
        System.out.println("----------------------------------------------------");
        for (String startcodon : aminoAcidList) {
            int startcodonindex = dna.indexOf(startcodon.toLowerCase());
            for (String stopcodon : stop.keySet()) {
                int stopcodonindex = dna.indexOf(stopcodon.toLowerCase(), startcodonindex + 3);
                stop.put(stopcodon, stopcodonindex);
                if ((stopcodonindex - startcodonindex) % 3 != 0) {
                    continue;
                }
                // sort stop hashtable by smallest to largest values
                if (startcodonindex >= 0 && stopcodonindex != -1) {
                    int leastvaluestopcodonindex = 0;
                    for (Entry<String, Integer> entry : stop.entrySet()) {
                        if (entry.getValue() < stop.get(stopcodon)) {
                            leastvaluestopcodonindex = entry.getValue();
                        }
                    }
                    if (leastvaluestopcodonindex >= 0) {
                        gene += ("Gene " + count + ": " + dna.substring(startcodonindex, leastvaluestopcodonindex + 3).toUpperCase() + "\n");
                        count++;
                    }
                }
            }
        }
        if (gene.length() == 0) {
            System.out.println("No gene found");
        } 
        else {
            System.out.println(gene);
        }
    }

    public static void main(String[] args) {
    }

}