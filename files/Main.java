// Program starts here.
public class Main {
    public static void main(String[] args) {

        // Create a new instance of the dnaSequence and codonData classes and send the information to the dnaSequencer's ds constructor.
        GenomeSequencer ds = new GenomeSequencer();
        StructCodonData scd = new StructCodonData();
        ds.getSequenceAndAminoAcid(scd.getIsoleucine(), scd.getLeucine(), scd.getValine(), scd.getPhenylalanine(), scd.getMethionine(), scd.getCysteine(), scd.getAlanine(), scd.getGlycine(), scd.getProline(), scd.getThreonine(), scd.getSerine(), scd.getTyrosine(), scd.getTryptophan(), scd.getGlutamine(), scd.getAsparagine(), scd.getHistidine(), scd.getGlutamicAcid(), scd.getAsparticAcid(), scd.getLysine(), scd.getArginine(), scd.getStop());
    }
}

/*
 * Data sources:
 * https://pubmed.ncbi.nlm.nih.gov/12804578/
 * https://en.wikipedia.org/wiki/DNA_and_RNA_codon_tables
 * http://algoart.com/aatable.htm
 * https://www.bioinformatics.org/sms2/shuffle_dna.html
 */