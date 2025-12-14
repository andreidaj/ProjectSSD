package backend.controller;

import backend.model.User;
import backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository repository;

    public AuthController(UserRepository repository) {
        this.repository = repository;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        // Return null if email already exists
        if (repository.findByEmail(user.getEmail()) != null) {
            return null;
        }
        return repository.save(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        User foundUser = repository.findByEmail(user.getEmail());
        // Simple password check (In a real app, use BCrypt encryption!)
        if (foundUser != null && foundUser.getPassword().equals(user.getPassword())) {
            return foundUser;
        }
        return null; // Login failed
    }
}