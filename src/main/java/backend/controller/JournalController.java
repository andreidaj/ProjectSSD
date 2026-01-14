package backend.controller;

import backend.model.JournalEntry;
import backend.service.FirebaseJournalService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/journal")
@CrossOrigin(origins = "*") // Permite comunicarea cu React
public class JournalController {

    private final FirebaseJournalService service;

    public JournalController(FirebaseJournalService service) {
        this.service = service;
    }

    // 1. Obținem toate jurnalele DOAR pentru un anumit utilizator
    @GetMapping("/user/{userId}")
    public List<JournalEntry> getAllByUser(@PathVariable String userId) throws Exception {
        return service.findAllByUserId(userId);
    }

    // 2. Salvarea - primim obiectul cu userId deja setat din React
    @PostMapping
    public String addEntry(@RequestBody JournalEntry entry) throws Exception {
        return service.saveEntry(entry);
    }

    @GetMapping("/{id}")
    public JournalEntry getById(@PathVariable String id) throws Exception {
        return service.findById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable String id) {
        service.deleteEntry(id);
    }

    // 3. Căutare după mood, dar filtrată și după utilizator
    @GetMapping("/search")
    public List<JournalEntry> searchEntries(
            @RequestParam String userId,
            @RequestParam(required = false) String mood) throws Exception {
        if (mood != null) {
            return service.findByMoodAndUser(userId, mood);
        }
        return service.findAllByUserId(userId);
    }
}