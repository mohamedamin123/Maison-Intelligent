package com.example.userservice.util;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Random;

@Data
@AllArgsConstructor
@Builder
public class Email {

    private Integer id;
    private String to;
    private String subject = "Confirm your email";
    private String body;
    private String code;

    // Constructeur utilisé pour le code de confirmation
    public Email(String to,String body,String code) {
        this.to = to;
        this.code = code;  // Génère le code
        this.body = body;  // Génère le corps HTML

    }

    public Email(String to,String body) {
        this.to = to;
        this.body = body;  // Génère le corps HTML

    }

    public Email() {
        this.code = generateCode();  // Génère le code
    }

    private String generateCode() {
        return String.valueOf(new Random().nextInt(900000) + 100000);
    }


}
