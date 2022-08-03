public class entryPoint {
        public static void main(String[] args) {
        dnaSequencer ds = new dnaSequencer();
        codonData cd = new codonData();
        ds.getSequenceAndAminoAcid(cd.Isoleucine, cd.Leucine, cd.Valine, cd.Phenylalanine, cd.Methionine, cd.Cysteine, cd.Alanine, cd.Glycine, cd.Proline, cd.Threonine, cd.Serine, cd.Tyrosine, cd.Tryptophan, cd.Glutamine, cd.Asparagine, cd.Histidine, cd.GlutamicAcid, cd.AsparticAcid, cd.Lysine, cd.Arginine, cd.Stop);
    }   
}

/*
 * Data sources:
 * https://pubmed.ncbi.nlm.nih.gov/12804578/
 * https://en.wikipedia.org/wiki/DNA_and_RNA_codon_tables
 * http://algoart.com/aatable.htm
 */