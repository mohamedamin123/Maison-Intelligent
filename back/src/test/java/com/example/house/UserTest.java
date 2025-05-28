package com.example.house;

import com.example.house.model.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

@SpringBootTest

public class UserTest {

    @Test
    void creationUser() {
        User user = new User("Ali", "Karoui", LocalDate.of(2000, 3, 15),"95147455", "ali@gmail.com", "pass123");
        System.out.println(user.getFullName()); // Ali Karoui
        System.out.println(user.getAge());      // ex: 25
        System.out.println(user.toString());
    }

}
