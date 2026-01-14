package backend.controller;

import backend.service.GeminiService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AiController {

    private final GeminiService geminiService;

    public AiController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @GetMapping("/suggest")
    public String getAiSuggestion(@RequestParam String category) {
        return geminiService.getSuggestion(category);
    }
}