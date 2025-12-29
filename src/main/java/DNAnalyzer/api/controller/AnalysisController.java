package DNAnalyzer.api.controller;

import DNAnalyzer.api.dto.request.ManipulationRequest;
import DNAnalyzer.api.dto.request.ProteinRequest;
import DNAnalyzer.api.dto.request.ReadingFrameRequest;
import DNAnalyzer.api.dto.request.SequenceRequest;
import DNAnalyzer.api.dto.response.AnalysisResponse;
import DNAnalyzer.api.dto.response.BasePairResponse;
import DNAnalyzer.api.dto.response.FileParseResponse;
import DNAnalyzer.api.dto.response.GeneticAnalysisResponse;
import DNAnalyzer.api.dto.response.ManipulationResponse;
import DNAnalyzer.api.dto.response.ProteinResponse;
import DNAnalyzer.api.dto.response.ReadingFrameResponse;
import DNAnalyzer.api.service.GeneticAnalysisService;
import DNAnalyzer.api.service.SequenceAnalysisService;
import DNAnalyzer.api.service.SequenceFileService;
import DNAnalyzer.api.service.SequenceFileService.ParsedSequence;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.List;
import javax.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1")
public class AnalysisController {

  private final SequenceAnalysisService analysisService;
  private final SequenceFileService fileService;
  private final ObjectMapper objectMapper;
  private final GeneticAnalysisService geneticService;

  public AnalysisController(
      SequenceAnalysisService analysisService,
      SequenceFileService fileService,
      ObjectMapper objectMapper,
      GeneticAnalysisService geneticService) {
    this.analysisService = analysisService;
    this.fileService = fileService;
    this.objectMapper = objectMapper;
    this.geneticService = geneticService;
  }

  @PostMapping(path = "/base-pairs", consumes = MediaType.APPLICATION_JSON_VALUE)
  public BasePairResponse basePairs(@Valid @RequestBody SequenceRequest request) {
    return analysisService.analyzeBasePairs(request);
  }

  @PostMapping(path = "/reading-frames", consumes = MediaType.APPLICATION_JSON_VALUE)
  public ReadingFrameResponse readingFrames(@Valid @RequestBody ReadingFrameRequest request) {
    return analysisService.analyzeReadingFrames(request);
  }

  @PostMapping(path = "/find-proteins", consumes = MediaType.APPLICATION_JSON_VALUE)
  public ProteinResponse findProteins(@Valid @RequestBody ProteinRequest request) {
    return analysisService.findProteins(request);
  }

  @PostMapping(path = "/manipulate", consumes = MediaType.APPLICATION_JSON_VALUE)
  public ManipulationResponse manipulate(@Valid @RequestBody ManipulationRequest request) {
    return analysisService.manipulate(request);
  }

  @PostMapping(path = "/parse", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public FileParseResponse parse(@RequestParam("file") MultipartFile file) throws IOException {
    ParsedSequence parsed = fileService.parse(file);
    return analysisService.buildFileParseResponse(
        parsed.name(), parsed.header(), parsed.sequence(), parsed.format());
  }

  @PostMapping(path = "/analyze", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public AnalysisResponse analyze(
      @RequestParam("dnaFile") MultipartFile dnaFile,
      @RequestParam(value = "options", required = false) String optionsJson)
      throws IOException {
    ParsedSequence parsed = fileService.parse(dnaFile);
    List<String> options = parseOptions(optionsJson);
    return analysisService.analyzeSequence(
        parsed.name(), parsed.format(), parsed.sequence(), options);
  }

  @PostMapping(path = "/analyze-genetic", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public GeneticAnalysisResponse analyzeGenetic(
      @RequestParam("geneticFile") MultipartFile geneticFile,
      @RequestParam(value = "snpAnalysis", defaultValue = "false") boolean snpAnalysis)
      throws IOException {
    return geneticService.analyze(geneticFile, snpAnalysis);
  }

  private List<String> parseOptions(String optionsJson) {
    if (optionsJson == null || optionsJson.isBlank()) {
      return List.of();
    }
    try {
      return objectMapper.readValue(optionsJson, new TypeReference<List<String>>() {});
    } catch (JsonProcessingException exception) {
      throw new IllegalArgumentException("Invalid options payload", exception);
    }
  }
}
