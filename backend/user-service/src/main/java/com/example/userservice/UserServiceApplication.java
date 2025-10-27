package com.example.userservice;

import com.example.userservice.config.DotenvInitializer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class UserServiceApplication {

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(UserServiceApplication.class);
		app.addInitializers(new DotenvInitializer()); // <-- important
		app.run(args);
	}

}
