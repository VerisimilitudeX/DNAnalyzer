import resources.StorageResource;

public class processGenes {
    public void highGCContent(String aminoAcid, Double gcContent, StorageResource geneList) {
        System.out.println();
        System.out.println("Gene(s) with the highest coverage: ");
        System.out.println("----------------------------------------------------");
        int count = 1;
        for (String gene : geneList.data()) {
            findProperties fp = new findProperties();
            double geneGCContent = fp.getGCContent(gene);
            if (geneGCContent >= 0.45 && geneGCContent <= 0.60) {
                System.out.println(count + ". " + gene);
                count++;
            }
        }
    }
    public void longestGene(StorageResource geneList) {
        int maxlen = 0;
        String longestGene = "";
        for (String gene : geneList.data()) {
            if (gene.length() > maxlen) {
                maxlen = gene.length();
                longestGene = gene;
            }
        }
        System.out.println();
        System.out.println("Longest gene (" + maxlen + " nucleotides): " + longestGene);
    }
}
