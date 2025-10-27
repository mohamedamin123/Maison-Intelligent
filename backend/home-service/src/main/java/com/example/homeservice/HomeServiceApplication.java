package com.example.homeservice;

import com.example.homeservice.config.DotenvInitializer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HomeServiceApplication {

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(HomeServiceApplication.class);
		app.addInitializers(new DotenvInitializer()); // <-- important
		app.run(args);
	}

}
