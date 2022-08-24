import java.io.IOException;

// Main Class
public class Main {
    public static void main(String[] args) throws IOException, InterruptedException {

        // Create a new instance of the dnaSequence and codonData classes and send the
        // information to the dnaSequencer's ds constructor.
        GenomeSequencer ds = new GenomeSequencer();
        StructCodonData scd = new StructCodonData();
        ds.getSequenceAndAminoAcid(scd.getIsoleucine(), scd.getLeucine(), scd.getValine(), scd.getPhenylalanine(),
                scd.getMethionine(), scd.getCysteine(), scd.getAlanine(), scd.getGlycine(), scd.getProline(),
                scd.getThreonine(), scd.getSerine(), scd.getTyrosine(), scd.getTryptophan(), scd.getGlutamine(),
                scd.getAsparagine(), scd.getHistidine(), scd.getGlutamicAcid(), scd.getAsparticAcid(), scd.getLysine(),
                scd.getArginine(), scd.getStop());
    }
}
