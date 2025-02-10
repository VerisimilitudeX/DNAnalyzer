package DNAnalyzer.web;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import DNAnalyzer.core.DNAAnalysis;
import DNAnalyzer.core.DNADataUploader;
import DNAnalyzer.utils.core.Utils;
import DNAnalyzer.utils.core.DNATools;
import DNAnalyzer.data.Parser;

import java.io.*;
import java.net.URL;
import java.net.HttpURLConnection;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AnalyzerController {

    private static final Set<String> VALID_AMINO_ACIDS = new HashSet<>(Arrays.asList(
        "met", "ser", "thr", "val", "ala", "arg", "asn", "asp", 
        "cys", "gln", "glu", "gly", "his", "ile", "leu", "lys", 
        "phe", "pro", "trp", "tyr"
    ));

    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    private static final int CONNECT_TIMEOUT = 10000; // 10 seconds
    private static final int READ_TIMEOUT = 30000; // 30 seconds

    @PostMapping(value = "/analyze", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> analyzeDNA(
            @RequestParam(value = "dnaFile", required = false) MultipartFile dnaFile,
            @RequestParam(value = "dnaUrl", required = false) String dnaUrl,
            @RequestParam("amino") String amino,
            @RequestParam("minCount") int minCount,
            @RequestParam("maxCount") int maxCount,
            @RequestParam(value = "proteinFile", required = false) MultipartFile proteinFile,
            @RequestParam(value = "reverse", defaultValue = "false") boolean reverse,
            @RequestParam(value = "rcomplement", defaultValue = "false") boolean rcomplement,
            @RequestParam(value = "gc", defaultValue = "false") boolean gc,
            @RequestParam(value = "codons", defaultValue = "false") boolean codons,
            @RequestParam(value = "coverage", defaultValue = "false") boolean coverage,
            @RequestParam(value = "longest", defaultValue = "false") boolean longest,
            @RequestParam(value = "verbose", defaultValue = "false") boolean verbose,
            @RequestParam(value = "detailed", defaultValue = "false") boolean detailed,
            @RequestParam(value = "quick", defaultValue = "false") boolean quick,
            @RequestParam(value = "format", defaultValue = "false") boolean format,
            @RequestParam(value = "transcription", defaultValue = "false") boolean transcription,
            @RequestParam(value = "promoter", defaultValue = "false") boolean promoter) {

        try {
            // Validate amino acid
            String aminoLower = amino.toLowerCase();
            if (!VALID_AMINO_ACIDS.contains(aminoLower)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                    "Invalid amino acid specified");
            }

            // Validate count ranges
            if (minCount < 0 || maxCount < minCount) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                    "Invalid count range. Maximum count must be greater than or equal to minimum count");
            }

            // Create temporary path for DNA sequence
            Path dnaPath;
            if (dnaFile != null && !dnaFile.isEmpty()) {
                // Handle file upload
                if (dnaFile.getSize() > MAX_FILE_SIZE) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                        "DNA file size exceeds maximum limit of 10MB");
                }

                String extension = getFileExtension(dnaFile.getOriginalFilename());
                if (!extension.equalsIgnoreCase(".fa") && !extension.equalsIgnoreCase(".fastq")) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                        "Invalid file format. Only .fa and .fastq files are supported");
                }

                dnaPath = Files.createTempFile("dna", extension);
                dnaFile.transferTo(dnaPath.toFile());

            } else if (dnaUrl != null && !dnaUrl.trim().isEmpty()) {
                // Handle URL input
                dnaPath = downloadFile(dnaUrl, "dna");
                
            } else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                    "No DNA input provided. Please provide either a file or URL");
            }

            // Process protein file if provided
            Path proteinPath = null;
            if (proteinFile != null && !proteinFile.isEmpty()) {
                if (proteinFile.getSize() > MAX_FILE_SIZE) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                        "Protein file size exceeds maximum limit of 10MB");
                }
                proteinPath = Files.createTempFile("protein", getFileExtension(proteinFile.getOriginalFilename()));
                proteinFile.transferTo(proteinPath.toFile());
            }

            // Validate DNA sequence
            try {
                String dnaSequence = Parser.parseFile(dnaPath.toFile());
                new DNATools(dnaSequence).isValid();
            } catch (IllegalArgumentException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                    "Invalid DNA sequence: " + e.getMessage());
            }

            // Capture console output
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            PrintStream ps = new PrintStream(baos);
            PrintStream old = System.out;
            System.setOut(ps);

            try {
                // Build arguments array
                String[] args = buildArgs(dnaPath.toString(), amino, minCount, maxCount, 
                                       proteinPath != null ? proteinPath.toString() : null,
                                       reverse, rcomplement, gc, codons, coverage, longest,
                                       verbose, detailed, quick, format, transcription, promoter);

                // Run analysis
                DNAAnalysis analysis = new DNAAnalysis();
                analysis.analyze(args);

            } finally {
                // Restore console output
                System.out.flush();
                System.setOut(old);

                // Clean up temp files
                Files.deleteIfExists(dnaPath);
                if (proteinPath != null) {
                    Files.deleteIfExists(proteinPath);
                }
            }

            String output = baos.toString();
            if (format) {
                output = formatOutput(output);
            }

            return ResponseEntity.ok(output);

        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                               .body("Error processing DNA analysis: " + e.getMessage());
        }
    }

    @PostMapping(value = "/analyze-genetic", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> analyzeGenetic(
            @RequestParam("geneticFile") MultipartFile geneticFile,
            @RequestParam(value = "snpAnalysis", defaultValue = "false") boolean snpAnalysis) {

        // Validate file size
        if (geneticFile.getSize() > MAX_FILE_SIZE) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                "Genetic file size exceeds maximum limit of 10MB");
        }

        String fileName = geneticFile.getOriginalFilename().toLowerCase();
        if (!fileName.contains("23andme") && !fileName.contains("ancestry")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                "Invalid genetic data format. File name must contain '23andme' or 'ancestry'");
        }

        try {
            // Create temporary file
            Path geneticPath = Files.createTempFile("genetic", getFileExtension(geneticFile.getOriginalFilename()));
            geneticFile.transferTo(geneticPath.toFile());

            // Capture console output
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            PrintStream ps = new PrintStream(baos);
            PrintStream old = System.out;
            System.setOut(ps);

            // Determine file type and analyze
            Map<String, String> geneticData;
            
            if (fileName.contains("23andme")) {
                geneticData = DNADataUploader.uploadFrom23andMe(geneticPath.toString());
                System.out.println("23andMe data loaded. Total SNPs: " + geneticData.size());
            } else if (fileName.contains("ancestry")) {
                geneticData = DNADataUploader.uploadFromAncestryDNA(geneticPath.toString());
                System.out.println("AncestryDNA data loaded. Total SNPs: " + geneticData.size());
            } else {
                throw new IllegalArgumentException("Unsupported genetic data format. Please use 23andMe or AncestryDNA files.");
            }

            if (snpAnalysis && !geneticData.isEmpty()) {
                // Perform SNP analysis
                System.out.println("\nSNP Analysis Results:");
                System.out.println("--------------------");
                geneticData.forEach((rsid, genotype) -> {
                    System.out.printf("SNP %s: Genotype %s%n", rsid, genotype);
                });
            }

            // Restore console output
            System.out.flush();
            System.setOut(old);

            // Clean up temp file
            Files.deleteIfExists(geneticPath);

            String output = baos.toString();
            return ResponseEntity.ok(formatOutput(output));

        } catch (ResponseStatusException e) {
            throw e;  // Re-throw validation exceptions
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                               .body("Error processing genetic data: " + e.getMessage());
        }
    }

    private Path downloadFile(String urlString, String prefix) throws IOException {
        URL url = new URL(urlString);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setConnectTimeout(CONNECT_TIMEOUT);
        conn.setReadTimeout(READ_TIMEOUT);

        // Get file extension from URL
        String extension = getFileExtension(urlString);
        if (!extension.equalsIgnoreCase(".fa") && !extension.equalsIgnoreCase(".fastq")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                "Invalid file format. URL must point to a .fa or .fastq file");
        }

        // Check content length if available
        int contentLength = conn.getContentLength();
        if (contentLength > MAX_FILE_SIZE) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                "File size exceeds maximum limit of 10MB");
        }

        Path tempFile = Files.createTempFile(prefix, extension);
        
        try (InputStream in = conn.getInputStream();
             OutputStream out = Files.newOutputStream(tempFile)) {
            
            byte[] buffer = new byte[8192];
            int bytesRead;
            long totalBytes = 0;
            
            while ((bytesRead = in.read(buffer)) != -1) {
                totalBytes += bytesRead;
                if (totalBytes > MAX_FILE_SIZE) {
                    Files.delete(tempFile);
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                        "File size exceeds maximum limit of 10MB");
                }
                out.write(buffer, 0, bytesRead);
            }
        }

        return tempFile;
    }

    private String getFileExtension(String filename) {
        int lastDot = filename.lastIndexOf('.');
        return lastDot > 0 ? filename.substring(lastDot) : "";
    }

    private String[] buildArgs(String dnaPath, String amino, int minCount, int maxCount, 
                             String proteinPath, boolean reverse, boolean rcomplement,
                             boolean gc, boolean codons, boolean coverage, boolean longest,
                             boolean verbose, boolean detailed, boolean quick, boolean format,
                             boolean transcription, boolean promoter) {
        List<String> args = new ArrayList<>();
        
        // Add required arguments
        args.add(dnaPath);
        args.add("--amino=" + amino);
        args.add("--min=" + minCount);
        args.add("--max=" + maxCount);
        
        // Add optional arguments
        if (proteinPath != null) {
            args.add("--find=" + proteinPath);
        }
        if (reverse) {
            args.add("--reverse");
        }
        if (rcomplement) {
            args.add("--rcomplement");
        }
        if (gc) {
            args.add("--gc");
        }
        if (codons) {
            args.add("--codons");
        }
        if (coverage) {
            args.add("--coverage");
        }
        if (longest) {
            args.add("--longest");
        }
        if (verbose) {
            args.add("--verbose");
        }
        if (detailed) {
            args.add("--detailed");
        }
        if (quick) {
            args.add("--quick");
        }
        if (transcription) {
            args.add("--transcription");
        }
        if (promoter) {
            args.add("--promoter");
        }
        
        return args.toArray(new String[0]);
    }

    private String formatOutput(String output) {
        StringBuilder formatted = new StringBuilder();
        
        // Split output into sections
        String[] sections = output.split("\n\n+");
        
        for (String section : sections) {
            if (section.trim().isEmpty()) continue;
            
            // Add section headers
            if (section.toLowerCase().contains("gc content")) {
                formatted.append("\n=== GC Content Analysis ===\n");
            } else if (section.toLowerCase().contains("codon")) {
                formatted.append("\n=== Codon Distribution ===\n");
            } else if (section.toLowerCase().contains("coverage")) {
                formatted.append("\n=== High Coverage Regions ===\n");
            } else if (section.toLowerCase().contains("longest protein")) {
                formatted.append("\n=== Longest Protein Analysis ===\n");
            } else if (section.toLowerCase().contains("transcription factor")) {
                formatted.append("\n=== Transcription Factor Analysis ===\n");
            } else if (section.toLowerCase().contains("promoter")) {
                formatted.append("\n=== Promoter Sequence Analysis ===\n");
            } else if (section.toLowerCase().contains("snp")) {
                formatted.append("\n=== SNP Analysis Results ===\n");
            } else {
                formatted.append("\n=== Analysis Results ===\n");
            }
            
            // Add indented content
            formatted.append(section.replaceAll("(?m)^", "  ")).append("\n\n");
        }
        
        return formatted.toString().trim();
    }
}