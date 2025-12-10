package backend.repository;

import backend.model.JournalEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface JournalRepository extends JpaRepository<JournalEntry, Long> {

    List<JournalEntry> findByMood(String mood);

    List<JournalEntry> findByTagsContaining(String tag);

    List<JournalEntry> findByDateBetween(LocalDateTime startDate, LocalDateTime endDate);
}
