package backend.model;

/**
 * Model representing a User in the Firebase system.
 */
public class User {

    private String id; // Changed from Long to String for Firebase compatibility
    private String email;
    private String password;

    // Required empty constructor for Firebase serialization
    public User() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}