package DNAnalyzer.adapter;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import DNAnalyzer.utils.ai.PathRouter;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/analyze")
public class AnalyzeController {

    @PostMapping
    public ResponseEntity<?> analyzeFile(@RequestBody AnalyzeRequest request) {
        try {
            // Convert features to command line arguments
            String[] args = buildCommandLineArgs(request);
            
            // Run analysis
            String apiKey = System.getenv("OPENAI_API_KEY");
            if (apiKey == null) {
                PathRouter.regular(args);
            } else {
                PathRouter.runGptAnalysis(args, apiKey);
            }
            
            return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "Analysis completed successfully"
            ));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "status", "error",
                "message", e.getMessage()
            ));
        }
    }

    private String[] buildCommandLineArgs(AnalyzeRequest request) {
        List<String> args = new java.util.ArrayList<>();
        
        // Add file path as a parameter
        args.add(request.getFilePath());
        
        // Add selected features
        for (String feature : request.getFeatures()) {
            switch (feature) {
                case "verbose":
                    args.add("--verbose");
                    break;
                case "detailed":
                    args.add("--detailed");
                    break;
                case "quick":
                    args.add("--quick");
                    break;
            }
        }
        
        return args.toArray(new String[0]);
    }
}

class AnalyzeRequest {
    private String filePath;
    private List<String> features;

    // Getters and setters
    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public List<String> getFeatures() {
        return features;
    }

    public void setFeatures(List<String> features) {
        this.features = features;
    }
}