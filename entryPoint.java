public class entryPoint {
   
    public static void main(String[] args) {
        dnaSequencer ds = new dnaSequencer();
        ds.getSequenceAndAminoAcid(codonData.Isoleucine, codonData.Leucine, codonData.Valine, codonData.Phenylalanine, codonData.Methionine, codonData.Cysteine, codonData.Alanine, codonData.Glycine, codonData.Proline, codonData.Threonine, codonData.Serine, codonData.Tyrosine, codonData.Tryptophan, codonData.Glutamine, codonData.Asparagine, codonData.Histidine, codonData.GlutamicAcid, codonData.AsparticAcid, codonData.Lysine, codonData.Arginine, codonData.Stop);
    }
    
}

/*
 * Data sources:
 * https://pubmed.ncbi.nlm.nih.gov/12804578/
 * https://en.wikipedia.org/wiki/DNA_and_RNA_codon_tables
 * http://algoart.com/aatable.htm
 */