import resources.StorageResource;

public class processGenes {
    public void highGCContent(String aminoAcid, String gcContent, StorageResource geneList) {
        System.out.println();
        System.out.println("Genes with a GC-content greater than 0.35: ");
        System.out.println("----------------------------------------------------");
        int count = 1;
        for (String gene : geneList.data()) {
            findProperties fp = new findProperties();
            String geneGCContent = fp.getGCContent(gene);
            if (Float.valueOf(geneGCContent) >= 0.35) {
                System.out.println(count + ". " + gene);
                count++;
            }
        }
    }
}
