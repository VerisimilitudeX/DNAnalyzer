import resources.StorageResource;

public class findProperties {
    public void printGeneList(StorageResource geneList, String dna, String aminoAcid) {
        int count = 1;
        for (String gene : geneList.data()) {
            for (int i = 0; i < 100; i++) {
                System.out.println();
            }
            System.out.println("List of genes coded for " + aminoAcid + " in the DNA strand: ");
            System.out.println("----------------------------------------------------");
            if (geneList.contains("No gene found")) {
                System.out.println("No gene found");
                break;
            }
            System.out.println(count + ". " + gene);
            count++;
        }
    }
    public String getGCContent(String dna) {
        dna = dna.toLowerCase();
        float gclen = 0;
        for (String letter : dna.split("")) {
            if (letter.equals("c") || letter.equals("g")) {
                gclen++;
            }
        }
        return ("GC-content: " + gclen / dna.length());
    }
}