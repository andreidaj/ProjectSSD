package backend.service;

import backend.model.JournalEntry;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Service
public class FirebaseJournalService {

    private static final String COL_NAME = "journal_entries";

    /**
     * Salvează sau actualizează o intrare.
     * IMPORTANT: Asigură-te că obiectul entry are userId setat din Frontend!
     */
    public String saveEntry(JournalEntry entry) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference docRef;

        if (entry.getId() == null || entry.getId().isEmpty()) {
            docRef = db.collection(COL_NAME).document();
            entry.setId(docRef.getId());
        } else {
            docRef = db.collection(COL_NAME).document(entry.getId());
        }

        ApiFuture<WriteResult> result = docRef.set(entry);
        return result.get().getUpdateTime().toString();
    }

    /**
     * Returnează DOAR intrările care aparțin utilizatorului logat.
     */
    public List<JournalEntry> findAllByUserId(String userId) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        // Filtrare critică după userId
        ApiFuture<QuerySnapshot> query = db.collection(COL_NAME)
                .whereEqualTo("userId", userId)
                .get();

        return query.get().getDocuments().stream()
                .map(doc -> doc.toObject(JournalEntry.class))
                .collect(Collectors.toList());
    }

    /**
     * Caută o intrare specifică după ID.
     */
    public JournalEntry findById(String id) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference docRef = db.collection(COL_NAME).document(id);
        DocumentSnapshot document = docRef.get().get();
        return document.exists() ? document.toObject(JournalEntry.class) : null;
    }

    /**
     * Șterge o intrare.
     */
    public void deleteEntry(String id) {
        Firestore db = FirestoreClient.getFirestore();
        db.collection(COL_NAME).document(id).delete();
    }

    /**
     * Filtrează după stare de spirit, dar DOAR în cadrul postărilor utilizatorului respectiv.
     */
    public List<JournalEntry> findByMoodAndUser(String userId, String mood) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        Query query = db.collection(COL_NAME)
                .whereEqualTo("userId", userId)
                .whereEqualTo("mood", mood);

        return query.get().get().getDocuments().stream()
                .map(doc -> doc.toObject(JournalEntry.class))
                .collect(Collectors.toList());
    }
}