// Program starts here.
public class EntryPoint {
    public static void main(String[] args) {

        // Create a new instance of the dnaSequence and codonData classes and send the information to the dnaSequencer's ds constructor.
        GenomeSequencer ds = new GenomeSequencer();
        CodonData cd = new CodonData();
        ds.getSequenceAndAminoAcid(cd.getIsoleucine(), cd.getLeucine(), cd.getValine(), cd.getPhenylalanine(), cd.getMethionine(), cd.getCysteine(), cd.getAlanine(), cd.getGlycine(), cd.getProline(), cd.getThreonine(), cd.getSerine(), cd.getTyrosine(), cd.getTryptophan(), cd.getGlutamine(), cd.getAsparagine(), cd.getHistidine(), cd.getGlutamicAcid(), cd.getAsparticAcid(), cd.getLysine(), cd.getArginine(), cd.getStop());
    }
}

/*
 * Data sources:
 * https://pubmed.ncbi.nlm.nih.gov/12804578/
 * https://en.wikipedia.org/wiki/DNA_and_RNA_codon_tables
 * http://algoart.com/aatable.htm
 * https://www.bioinformatics.org/sms2/shuffle_dna.html
 */