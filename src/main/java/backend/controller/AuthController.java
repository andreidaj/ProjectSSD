package backend.controller;

import backend.model.User;
import backend.service.FirebaseUserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; // IMPORT NOU
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    private final FirebaseUserService service;
    private final BCryptPasswordEncoder encoder; // VARIABILĂ NOUĂ

    // Constructorul modificat pentru a primi și encoder-ul
    public AuthController(FirebaseUserService service, BCryptPasswordEncoder encoder) {
        this.service = service;
        this.encoder = encoder;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) throws Exception {
        if (service.findByEmail(user.getEmail()) != null) return null;

        // CRIPTARE: Transformăm parola în hash înainte de salvare
        user.setPassword(encoder.encode(user.getPassword()));

        return service.saveUser(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) throws Exception {
        User found = service.findByEmail(user.getEmail());

        // VERIFICARE: matches(parola_introdusa, parola_criptata_din_db)
        if (found != null && encoder.matches(user.getPassword(), found.getPassword())) {
            return found;
        }
        return null;
    }
    @PostMapping("/update")
    public User updateProfile(@RequestBody User user) throws Exception {
        return service.updateUserProfile(user);
    }
}