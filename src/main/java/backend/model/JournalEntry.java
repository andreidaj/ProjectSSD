package backend.model;

import java.time.LocalDateTime;

public class JournalEntry {

    private String id; // Firestore IDs are Alphanumeric Strings
    private String title;
    private String content;
    private String date = LocalDateTime.now().toString();
    private String mood;
    private String tags;
    private String mediaUrl;

    // Required empty constructor for Firebase
    public JournalEntry() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getMood() { return mood; }
    public void setMood(String mood) { this.mood = mood; }

    public String getTags() { return tags; }
    public void setTags(String tags) { this.tags = tags; }

    public String getMediaUrl() { return mediaUrl; }
    public void setMediaUrl(String mediaUrl) { this.mediaUrl = mediaUrl; }
}