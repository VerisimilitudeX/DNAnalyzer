package DNAnalyzer

// Creates a new instance of the getAminoAcid class after getting the DNA and amino acid from the user.
class GenomeSequencer {
    // Receives the codons of the amino acid.
    @kotlin.Throws(IOException::class, InterruptedException::class)
    fun getSequenceAndAminoAcid(Isoleucine: java.util.ArrayList<String?>?, Leucine: java.util.ArrayList<String?>?,
                                Valine: java.util.ArrayList<String?>?, Phenylalanine: java.util.ArrayList<String?>?, Methionine: java.util.ArrayList<String?>?,
                                Cysteine: java.util.ArrayList<String?>?, Alanine: java.util.ArrayList<String?>?, Glycine: java.util.ArrayList<String?>?,
                                Proline: java.util.ArrayList<String?>?,
                                Threonine: java.util.ArrayList<String?>?, Serine: java.util.ArrayList<String?>?, Tyrosine: java.util.ArrayList<String?>?,
                                Tryptophan: java.util.ArrayList<String?>?, Glutamine: java.util.ArrayList<String?>?, Asparagine: java.util.ArrayList<String?>?,
                                Histidine: java.util.ArrayList<String?>?, GlutamicAcid: java.util.ArrayList<String?>?,
                                AsparticAcid: java.util.ArrayList<String?>?,
                                Lysine: java.util.ArrayList<String?>?, Arginine: java.util.ArrayList<String?>?, Stop: java.util.ArrayList<String?>?) {

        // Load DNA file and concatenate lines
        var dna: String = Files.readString(Path.of("assets/dna/real/Axl2p.fa")).replace("\n", "").lowercase(Locale.getDefault())

        // Checks if the DNA sequence is valid (contains only A, T, G, and C
        // nucleotides).
        if (dna.length == 0) {
            println("Error: Invalid characters are present in DNA sequence.")
            return
        }
        for (i in 0 until dna.length) {
            when (dna[i]) {
                'a', 't', 'g', 'c' -> continue
                else -> println("Error: Invalid characters are present in DNA sequence.")
            }
        }

        // Gets the amino acid from the user.
        val userInput: java.util.Scanner = java.util.Scanner(java.lang.System.`in`)
        println("Enter the amino acid: ")
        val aminoAcid: String = userInput.nextLine().lowercase(Locale.getDefault())
        userInput.close()

        // Prevents the user from entering an RNA sequence. In the last decade, using
        // DNA sequences instead of RNA sequences has been a more common practice.
        dna = dna.replace("u", "t")

        // Creates a new instance of the getAminoAcid class and sends the DNA, amino
        // acid, and start codons to the class.
        // Gets a StorageResource containing the genes of the amino acid.
        val gfp = GeneFromProtein() // Can be replaced with printGeneWithAminoAcid.
        val geneList: java.util.ArrayList<String> = gfp.getAminoAcid(dna, aminoAcid, Isoleucine, Leucine, Valine,
                Phenylalanine,
                Methionine, Cysteine, Alanine, Glycine, Proline, Threonine, Serine, Tyrosine, Tryptophan, Glutamine,
                Asparagine, Histidine, GlutamicAcid, AsparticAcid, Lysine, Arginine, Stop)

        // The findProperties class finds properties of the amino acid/gene strand.
        val p = Properties()

        // Prints the list of amino acid genes found in the StorageResource object.
        p.printGeneList(geneList, aminoAcid)

        // Prints the GC-con tent of the genomic sequence.
        val gcContent: Double = p.getGCContent(dna)
        println("\nGC-content (genome): $gcContent\n")

        // Returns a HashMap containing the number of each nucleotide in the DNA
        // sequence.
        p.printNucleotideCount(dna)

        // Finds and prints GC-content higher than 0.35
        val gi = GeneInfo()
        gi.highGCContent(geneList)

        // Finds and prints the longest gene in the DNA sequence and its length.
        gi.longestGene(geneList)
        println()
        val READING_FRAME = 1
        val MIN_COUNT = 5
        val MAX_COUNT = 10
        val aap = AminoAcidProperties(dna, READING_FRAME, MIN_COUNT, MAX_COUNT)
        aap.printCodonCounts()
        val randomtf: Boolean = p.isRandomDNA(dna)
        if (randomtf) {
            println("\nWARNING: DNA sequence has been detected to be random.\n")
        }
    }
}