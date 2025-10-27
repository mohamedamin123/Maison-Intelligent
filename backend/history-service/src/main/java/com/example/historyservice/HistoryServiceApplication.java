package com.example.historyservice;

import com.example.historyservice.config.DotenvInitializer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HistoryServiceApplication {

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(HistoryServiceApplication.class);
        app.addInitializers(new DotenvInitializer()); // <-- important
        app.run(args);
    }

}
