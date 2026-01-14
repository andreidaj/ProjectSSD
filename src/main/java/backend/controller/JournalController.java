package backend.controller;

import backend.model.JournalEntry;
import backend.service.FirebaseJournalService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/journal")
@CrossOrigin(origins = "*")
public class JournalController {

    private final FirebaseJournalService service;

    public JournalController(FirebaseJournalService service) {
        this.service = service;
    }

    @GetMapping
    public List<JournalEntry> getAll() throws Exception {
        return service.findAll();
    }

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

    @GetMapping("/search")
    public List<JournalEntry> searchEntries(@RequestParam(required = false) String mood) throws Exception {
        if (mood != null) {
            return service.findByMood(mood);
        }
        return service.findAll();
    }
}