package backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

/**
 * Main entry point for the MyJournal backend application.
 * * We exclude DataSourceAutoConfiguration because the project now uses Firebase
 * as the primary database to satisfy the requirement for real-time data
 * synchronization and cloud storage.
 */
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class MyJournalApplication {

    public static void main(String[] args) {
        // Launches the Spring Boot application
        SpringApplication.run(MyJournalApplication.class, args);
    }
}