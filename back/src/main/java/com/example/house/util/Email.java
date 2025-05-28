package com.example.house.util;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Random;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Email {

    private Integer id;
    private String to;
    private String subject = "Confirm your email";
    private String body;
    private String code;

    // Constructeur utilisé pour le code de confirmation
    public Email(String to) {
        this.to = to;
        this.code = generateCode();  // Génère le code
        this.body = creationCompteHtml(this.code);  // Génère le corps HTML
    }

    public String creationCompteHtml(String code) {
        return String.format("""
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
                .container { background-color: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); max-width: 600px; margin: auto; }
                h1 { color: #4CAF50; }
                .code { font-size: 24px; font-weight: bold; background-color: #f0f0f0; padding: 10px 20px; border-radius: 8px; display: inline-block; margin: 20px 0; }
                .footer { margin-top: 30px; font-size: 12px; color: #999; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Bienvenue sur Maison+</h1>
                <p>Merci de vous être inscrit sur notre plateforme 🚗</p>
                <p>Pour confirmer votre adresse email et activer votre compte, veuillez utiliser le code de confirmation suivant :</p>
                <div class="code">%s</div>
                <p>⏳ Ce code est valide pendant <strong>10 minutes</strong>.</p>
                <p>Si vous n’êtes pas à l’origine de cette demande, ignorez simplement ce message.</p>
                <p>À très bientôt !<br><strong>L’équipe Garage+</strong></p>
                <div class="footer">Ceci est un message automatique, merci de ne pas y répondre.</div>
            </div>
        </body>
        </html>
        """, code);
    }

    private String generateCode() {
        return String.valueOf(new Random().nextInt(900000) + 100000);
    }
}
