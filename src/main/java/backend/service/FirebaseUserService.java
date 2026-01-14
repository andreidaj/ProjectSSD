package backend.service;

import backend.model.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class FirebaseUserService {

    private static final String COLLECTION_NAME = "app_users";

    public User saveUser(User user) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference docRef;
        if (user.getId() != null && !user.getId().isEmpty()) {
            docRef = db.collection(COLLECTION_NAME).document(user.getId());
        } else {
            docRef = db.collection(COLLECTION_NAME).document();
            user.setId(docRef.getId());
        }
        docRef.set(user).get();
        return user;
    }

    public User getUserById(String id) throws ExecutionException, InterruptedException {
        if (id == null || id.isEmpty() || id.equals("undefined")) {
            return null;
        }
        Firestore db = FirestoreClient.getFirestore();
        DocumentSnapshot document = db.collection(COLLECTION_NAME).document(id).get().get();
        if (document.exists()) {
            return document.toObject(User.class);
        }
        return null;
    }

    public User findByEmail(String email) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        CollectionReference users = db.collection(COLLECTION_NAME);
        Query query = users.whereEqualTo("email", email);
        ApiFuture<QuerySnapshot> querySnapshot = query.get();

        List<QueryDocumentSnapshot> documents = querySnapshot.get().getDocuments();
        if (!documents.isEmpty()) {
            User found = documents.get(0).toObject(User.class);
            found.setId(documents.get(0).getId());
            return found;
        }
        return null;
    }

    public User updateUserProfile(User user) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        String documentId = user.getId();

        // 1. Siguranță: Dacă ID-ul lipsește, îl căutăm după email
        if (documentId == null || documentId.isEmpty()) {
            User existing = findByEmail(user.getEmail());
            if (existing != null) {
                documentId = existing.getId();
                user.setId(documentId);
            }
        }

        if (documentId != null) {
            DocumentReference docRef = db.collection(COLLECTION_NAME).document(documentId);

            // 2. RECUPERARE PAROLĂ: Luăm documentul actual din Firebase
            DocumentSnapshot currentDoc = docRef.get().get();

            if (currentDoc.exists()) {
                // Dacă în obiectul primit de la Frontend parola e goală/null
                if (user.getPassword() == null || user.getPassword().isEmpty()) {
                    // Păstrăm parola care este deja în baza de date
                    user.setPassword(currentDoc.getString("password"));
                }
            }

            // 3. SALVARE: Acum salvăm obiectul întreg, sigur că are parola inclusă
            docRef.set(user, SetOptions.merge()).get();

            System.out.println("Update reușit pentru: " + user.getDisplayName() + " (Parolă păstrată)");
            return user;
        }
        return null;
    }
}