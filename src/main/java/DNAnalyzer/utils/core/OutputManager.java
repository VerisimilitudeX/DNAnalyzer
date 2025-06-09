package DNAnalyzer.utils.core;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Manages organized output directory structure and file notifications for DNAnalyzer
 */
public class OutputManager {
    private final String sessionId;
    private final Path outputDirectory;
    private final List<GeneratedFile> generatedFiles;
    
    public OutputManager(String inputFileName) {
        this.sessionId = generateSessionId();
        this.outputDirectory = createOutputDirectory(inputFileName);
        this.generatedFiles = new ArrayList<>();
    }
    
    private String generateSessionId() {
        return new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
    }
    
    private Path createOutputDirectory(String inputFileName) {
        // Remove file extension for cleaner directory name
        String baseName = inputFileName.replaceAll("\\.[^.]*$", "");
        String dirName = String.format("dnanalyzer_output_%s_%s", baseName, sessionId);
        
        Path outputDir = Paths.get("output", dirName);
        try {
            Files.createDirectories(outputDir);
            Files.createDirectories(outputDir.resolve("charts"));
            Files.createDirectories(outputDir.resolve("sequences"));
            Files.createDirectories(outputDir.resolve("reports"));
        } catch (IOException e) {
            System.err.println("Warning: Could not create output directory structure: " + e.getMessage());
            return Paths.get(".");
        }
        
        return outputDir;
    }
    
    /**
     * Get the path for a QC chart file
     */
    public Path getQcChartPath(String fileName) {
        return outputDirectory.resolve("charts").resolve(fileName + "_qc_chart.png");
    }
    
    /**
     * Get the path for mutation files
     */
    public Path getMutationFilePath() {
        return outputDirectory.resolve("sequences").resolve("mutations_" + sessionId + ".fa");
    }
    
    /**
     * Get the path for HTML reports
     */
    public Path getReportPath(String fileName) {
        return outputDirectory.resolve("reports").resolve(fileName + "_report.html");
    }
    
    /**
     * Register a generated file for final summary
     */
    public void registerFile(String category, Path filePath, String description) {
        generatedFiles.add(new GeneratedFile(category, filePath, description));
    }
    
    /**
     * Print a summary of all generated files
     */
    public void printFileSummary() {
        if (generatedFiles.isEmpty()) {
            return;
        }
        
        System.out.println("\n📁 Generated Files Summary");
        System.out.println("==========================");
        System.out.println("Output directory: " + outputDirectory.toAbsolutePath());
        System.out.println();
        
        String currentCategory = "";
        for (GeneratedFile file : generatedFiles) {
            if (!file.category.equals(currentCategory)) {
                currentCategory = file.category;
                System.out.println("📂 " + currentCategory + ":");
            }
            
            System.out.printf("   ✓ %s\n", file.description);
            System.out.printf("     📄 %s\n", file.path.toAbsolutePath());
            
            // Check file size
            try {
                if (Files.exists(file.path)) {
                    long size = Files.size(file.path);
                    System.out.printf("     📊 Size: %s\n", formatFileSize(size));
                }
            } catch (IOException e) {
                System.out.printf("     ⚠️  Could not read file size\n");
            }
            System.out.println();
        }
        
        System.out.println("💡 Tip: You can find all output files in the directory above.");
        System.out.println("   Open PNG files to view charts, and FA files contain DNA sequences.");
    }
    
    private String formatFileSize(long bytes) {
        if (bytes < 1024) return bytes + " B";
        int exp = (int) (Math.log(bytes) / Math.log(1024));
        String pre = "KMGTPE".charAt(exp - 1) + "";
        return String.format("%.1f %sB", bytes / Math.pow(1024, exp), pre);
    }
    
    public Path getOutputDirectory() {
        return outputDirectory;
    }
    
    public String getSessionId() {
        return sessionId;
    }
    
    /**
     * Data class for tracking generated files
     */
    private static class GeneratedFile {
        final String category;
        final Path path;
        final String description;
        
        GeneratedFile(String category, Path path, String description) {
            this.category = category;
            this.path = path;
            this.description = description;
        }
    }
} 