package DNAnalyzer;

import java.util.Map;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.DefaultErrorAttributes;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.context.annotation.Bean;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Spring Boot Application configuration for DNAnalyzer web server.
 * Handles web-specific configuration like CORS settings.
 */
@SpringBootApplication
public class DNAnalyzerApplication {
    
    /**
     * Main application entry point
     */
    public static void main(String[] args) {
        SpringApplication.run(DNAnalyzerApplication.class, args);
    }
    
    /**
     * Configure CORS for the web server.
     * Allows web interface to communicate with the local analyzer.
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("*")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .maxAge(3600);
            }
        };
    }
    
    @Bean
    public ErrorAttributes errorAttributes() {
        return new DefaultErrorAttributes() {
            @Override
            public Map<String, Object> getErrorAttributes(WebRequest webRequest, ErrorAttributeOptions options) {
                Map<String, Object> errorAttributes = super.getErrorAttributes(webRequest, options);
                errorAttributes.put("status", errorAttributes.get("status"));
                errorAttributes.put("error", errorAttributes.get("error"));
                errorAttributes.put("message", errorAttributes.get("message"));
                return errorAttributes;
            }
        };
    }
}
