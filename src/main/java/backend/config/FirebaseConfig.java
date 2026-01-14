package backend.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource; // Import necesar

import java.io.IOException;
import java.io.InputStream;

/**
 * Configuration class to initialize the Firebase Admin SDK.
 */
@Configuration
public class FirebaseConfig {

    @PostConstruct
    public void initialize() {
        try {
            // SOLUȚIA: Folosim ClassPathResource în loc de FileInputStream.
            // Acesta caută fișierul direct în folderul 'resources' compilat.
            ClassPathResource resource = new ClassPathResource("serviceAccountKey.json");

            // Verificăm dacă fișierul există pentru a da o eroare clară
            if (!resource.exists()) {
                throw new IOException("Fisierul serviceAccountKey.json nu a fost gasit in resources!");
            }

            // Deschidem un stream direct din resursă
            InputStream serviceAccount = resource.getInputStream();

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            // Check if an app is already initialized to avoid "Duplicate App" errors
            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
                System.out.println("Firebase connectat cu succes: " + options.getProjectId());
            }

        } catch (IOException e) {
            System.err.println("Firebase initialization error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}