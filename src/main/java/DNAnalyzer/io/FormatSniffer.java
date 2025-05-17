package DNAnalyzer.io;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;
import org.apache.commons.io.FilenameUtils;

/** Utility class to detect sequence file formats. */
public class FormatSniffer {
    public enum FileFormat { FASTA, FASTQ, VCF, UNKNOWN }

    /**
     * Detect the sequence file format by inspecting the first 2KB of the file.
     * Falls back to extension-based detection using Apache Commons IO utilities.
     *
     * @param file the file to inspect
     * @return detected FileFormat
     * @throws IOException on read errors
     */
    public static FileFormat detect(File file) throws IOException {
        try (BufferedInputStream bis = new BufferedInputStream(new FileInputStream(file))) {
            byte[] buffer = new byte[2048];
            int read = bis.read(buffer);
            if (read <= 0) {
                return detectByExtension(file);
            }
            String header = new String(buffer, 0, read, StandardCharsets.UTF_8);
            Scanner scanner = new Scanner(header);
            while (scanner.hasNextLine()) {
                String line = scanner.nextLine().trim();
                if (line.isEmpty()) {
                    continue;
                }
                if (line.startsWith(">")) {
                    scanner.close();
                    return FileFormat.FASTA;
                }
                if (line.startsWith("@")) {
                    scanner.close();
                    return FileFormat.FASTQ;
                }
                if (line.startsWith("##") || line.startsWith("#CHROM")) {
                    scanner.close();
                    return FileFormat.VCF;
                }
                break;
            }
            scanner.close();
        }
        return detectByExtension(file);
    }

    private static FileFormat detectByExtension(File file) {
        String ext = FilenameUtils.getExtension(file.getName()).toLowerCase();
        switch (ext) {
            case "fa":
            case "fasta":
                return FileFormat.FASTA;
            case "fastq":
            case "fq":
                return FileFormat.FASTQ;
            case "vcf":
                return FileFormat.VCF;
            default:
                return FileFormat.UNKNOWN;
        }
    }
}
