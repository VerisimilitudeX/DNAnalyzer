public class FindGeneSimpleAndTest {
    public String findGeneSimple(String dna) {
        String result = "";
        int startIndex = dna.indexOf("ATG");
        int stopIndex = dna.indexOf("TAA", startIndex + 3);
        result = dna.substring(startIndex, stopIndex+ 3);
        return result;
    }

    public void findGeneTestElem() {
        String dna = "AATGCGTAATTAATGCTGATAA";
        System.out.println(dna);
        String result = findGeneSimple("DNA strand is: " + dna);
        System.out.println("Gene is: " + result);

        dna = "AATGCTAGGGTAATATAGGGTATAA";
        System.out.println(dna);
        result = findGeneSimple("DNA strand is: " + dna);
        System.out.println("Gene is: " + result);

        dna = "ATCCTATGCTTCGGCTGCTCTAATATGGT";
        System.out.println(dna);
        result = findGeneSimple("DNA strand is: " + dna);
        System.out.println("Gene is: " + result);
    }
}