package DNAnalyzer

class GeneInfo {
    fun highGCContent(geneList: java.util.ArrayList<String?>) {
        var count = 1
        // print the list of genes with the highest GC content
        println("\nHigh coverage regions: ")
        println("----------------------------------------------------")
        val p = Properties()
        for (gene in geneList) {
            // High GC content range
            val MIN_GC_CONTENT = 0.40
            val MAX_GC_CONTENT = 0.60
            if (geneList.contains("No gene found")) {
                println("No gene found")
                break
            } else if (p.getGCContent(gene) > MIN_GC_CONTENT && p.getGCContent(gene) < MAX_GC_CONTENT) {
                println("$count. $gene")
                count++
            }
        }
    }

    fun longestGene(geneList: java.util.ArrayList<String?>) {
        var longestGene = ""
        for (gene in geneList) {
            if (gene.length > longestGene.length) {
                longestGene = gene
            }
        }
        println("""
Longest gene (${longestGene.length} nucleotides): $longestGene""")
    }
}