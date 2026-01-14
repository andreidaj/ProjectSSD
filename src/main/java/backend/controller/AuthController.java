package backend.controller;

import backend.model.User;
import backend.service.FirebaseUserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final FirebaseUserService service;
    private final BCryptPasswordEncoder encoder;

    public AuthController(FirebaseUserService service, BCryptPasswordEncoder encoder) {
        this.service = service;
        this.encoder = encoder;
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) throws Exception {
        User found = service.findByEmail(user.getEmail());
        if (found != null && encoder.matches(user.getPassword(), found.getPassword())) {
            return found;
        }
        return null;
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateProfile(@RequestBody User user) {
        try {
            // IMPORTANT: Când facem update la nume/poză, NU trimitem parola din Frontend.
            // Dacă parola vine null, serviciul o va păstra pe cea veche.
            User updated = service.updateUserProfile(user);
            if (updated != null) {
                return ResponseEntity.ok(updated);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User negăsit.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody PasswordChangeRequest request) {
        try {
            User found = service.getUserById(request.getUserId());
            if (found == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User negăsit");

            if (encoder.matches(request.getOldPassword(), found.getPassword())) {
                found.setPassword(encoder.encode(request.getNewPassword()));
                service.updateUserProfile(found);
                return ResponseEntity.ok("Succes");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Parola veche incorectă");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    // --- METODA DE RESETARE (O FOLOSEȘTI DOAR ACUM SĂ TE DEBLOCHEZI) ---
    @GetMapping("/reset-my-password")
    public String resetPassword(@RequestParam String email) {
        try {
            User found = service.findByEmail(email);
            if (found != null) {
                // Setează parola "123456" și o criptează
                found.setPassword(encoder.encode("123456"));
                service.updateUserProfile(found);
                return "SUCCES! Parola pentru " + email + " este acum: 123456";
            }
            return "EROARE: Email-ul nu a fost găsit.";
        } catch (Exception e) {
            return "EROARE: " + e.getMessage();
        }
    }

    public static class PasswordChangeRequest {
        private String userId;
        private String oldPassword;
        private String newPassword;

        public String getUserId() { return userId; }
        public void setUserId(String userId) { this.userId = userId; }
        public String getOldPassword() { return oldPassword; }
        public void setOldPassword(String oldPassword) { this.oldPassword = oldPassword; }
        public String getNewPassword() { return newPassword; }
        public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
    }
}