package backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import java.util.Map;
import java.util.List;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    // Folosim modelul gemini-1.5-flash
    private final String URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=";

    public String getSuggestion(String category) {
        RestTemplate restTemplate = new RestTemplate();

        String prompt = "Dă-mi o idee scurtă de jurnal pentru categoria: " + category + ". Răspunde în română, maxim 2 fraze.";

        Map<String, Object> requestBody = Map.of(
                "contents", List.of(Map.of(
                        "parts", List.of(Map.of("text", prompt))
                ))
        );

        try {
            Map response = restTemplate.postForObject(URL + apiKey, requestBody, Map.class);

            // Verificăm structura răspunsului pas cu pas pentru a evita erori
            if (response == null || !response.containsKey("candidates")) {
                return "AI-ul nu a returnat niciun candidat.";
            }

            List candidates = (List) response.get("candidates");
            if (candidates.isEmpty()) return "AI-ul nu a găsit idei.";

            Map candidate = (Map) candidates.get(0);
            Map content = (Map) candidate.get("content");
            List parts = (List) content.get("parts");
            Map textPart = (Map) parts.get(0);

            return (String) textPart.get("text");

        } catch (HttpClientErrorException e) {
            // Aici prindem erorile de la Google (ex: 400 Bad Request, 401 Unauthorized)
            e.printStackTrace();
            return "Eroare API Google: " + e.getResponseBodyAsString();
        } catch (Exception e) {
            e.printStackTrace();
            return "Eroare internă AI: " + e.getMessage();
        }
    }
}