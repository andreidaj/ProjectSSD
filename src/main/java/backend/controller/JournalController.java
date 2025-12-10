package backend.controller;

import backend.model.JournalEntry;
import backend.repository.JournalRepository;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/journal")
@CrossOrigin(origins = "*")
public class JournalController {

    private final JournalRepository repository;

    public JournalController(JournalRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<JournalEntry> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public JournalEntry addEntry(@RequestBody JournalEntry entry) {
        return repository.save(entry);
    }

    @GetMapping("/{id}")
    public JournalEntry getById(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        repository.deleteById(id);
    }

    @GetMapping("/search")
    public List<JournalEntry> searchEntries(
            @RequestParam(required = false) String mood,
            @RequestParam(required = false) String tag,
            @RequestParam(required = false) LocalDateTime startDate,
            @RequestParam(required = false) LocalDateTime endDate
    ) {

        if (mood != null) {
            return repository.findByMood(mood);
        }

        if (tag != null) {
            return repository.findByTagsContaining(tag);
        }

        if (startDate != null && endDate != null) {
            return repository.findByDateBetween(startDate, endDate);
        }

        return repository.findAll();
    }
}
