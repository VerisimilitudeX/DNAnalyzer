package DNAnalyzer.core;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class DNADataUploader {

    public static Map<String, String> uploadFrom23andMe(String filePath) throws IOException {
        Map<String, String> snpData = new HashMap<>();
        
        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = reader.readLine()) != null) {
                if (line.startsWith("#")) {
                    continue; // skip comment lines
                }
                String[] parts = line.split("\t");
                if (parts.length == 4) {
                    String rsid = parts[0];
                    String genotype = parts[3];
                    snpData.put(rsid, genotype);
                }
            }
        }
        
        return snpData;
    }

    public static Map<String, String> uploadFromAncestryDNA(String filePath) throws IOException {
        Map<String, String> snpData = new HashMap<>();
        
        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;
            boolean dataStarted = false;
            while ((line = reader.readLine()) != null) {
                if (!dataStarted) {
                    if (line.startsWith("rsid")) {
                        dataStarted = true;
                    }
                    continue;
                }
                String[] parts = line.split("\t");
                if (parts.length == 5) {
                    String rsid = parts[0];
                    String genotype = parts[3];
                    snpData.put(rsid, genotype);
                }
            }
        }
        
        return snpData;
    }

    public static void main(String[] args) {
        try {
            Map<String, String> data23andMe = uploadFrom23andMe("path/to/23andMe_data.txt");
            System.out.println("23andMe data loaded. Total SNPs: " + data23andMe.size());

            Map<String, String> dataAncestryDNA = uploadFromAncestryDNA("path/to/AncestryDNA_data.txt");
            System.out.println("AncestryDNA data loaded. Total SNPs: " + dataAncestryDNA.size());

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}