import java.time.Duration;
import java.time.Instant;

public class entryPoint {
    public static void main(String[] args) {
        // Start measuring time
        Instant start = Instant.now();
        
        // Original code
        dnaSequencer ds = new dnaSequencer();
        codonData cd = new codonData();
        ds.getSequenceAndAminoAcid(cd.getIsoleucine(), cd.getLeucine(), cd.getValine(), cd.getPhenylalanine(), cd.getMethionine(), cd.getCysteine(), cd.getAlanine(), cd.getGlycine(), cd.getProline(), cd.getThreonine(), cd.getSerine(), cd.getTyrosine(), cd.getTryptophan(), cd.getGlutamine(), cd.getAsparagine(), cd.getHistidine(), cd.getGlutamicAcid(), cd.getAsparticAcid(), cd.getLysine(), cd.getArginine(), cd.getStop());
        
        // Stop measuring time
        findGeneWithAminoAcid.main(args);
        Instant end = Instant.now();
        Duration timeTaken = Duration.between(start, end);
        System.out.println("Time taken: " + timeTaken.toMillis() + " milliseconds");
    }
}

/*
 * Data sources:
 * https://pubmed.ncbi.nlm.nih.gov/12804578/
 * https://en.wikipedia.org/wiki/DNA_and_RNA_codon_tables
 * http://algoart.com/aatable.htm
 */