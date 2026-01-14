package backend.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;
import java.io.IOException;

/**
 * Configuration class to initialize the Firebase Admin SDK.
 * This satisfies the requirement to connect to a cloud database for storage.
 */
@Configuration
public class FirebaseConfig {

    @PostConstruct
    public void initialize() {
        try {
            // Path to your serviceAccountKey.json file downloaded from Firebase Console.
            // Ensure this file is placed in src/main/resources/
            FileInputStream serviceAccount =
                    new FileInputStream("src/main/resources/serviceAccountKey.json");

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            // Check if an app is already initialized to avoid "Duplicate App" errors
            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
            }

        } catch (IOException e) {
            System.err.println("Firebase initialization error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}