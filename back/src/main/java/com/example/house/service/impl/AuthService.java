package com.example.house.service.impl;

import com.example.house.model.DTO.req.UserReqDTO;
import com.example.house.model.DTO.res.UserResDTO;
import com.example.house.repository.UserRepo;
import com.example.house.service.interf.UserService;
import com.example.house.util.Email;
import io.github.cdimascio.dotenv.Dotenv;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private Dotenv dotenv;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepo userRepo;
    private PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();

    public String sendEmail(Email email) {
        if (email.getTo() == null || email.getTo().isBlank()) {
            throw new IllegalArgumentException("Adresse email (to) est vide ou null.");
        }

        // Vérification si l'utilisateur existe par email
        if (userService.findByEmail(email.getTo()).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Aucun utilisateur trouvé avec cet email.");
        }
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom(dotenv.get("EMAIL_SENDER"));
            helper.setTo(email.getTo());
            helper.setSubject(email.getSubject());
            helper.setText(email.getBody(), true);

            mailSender.send(message);
            System.out.println("Email sent successfully");
            return email.getCode();
        } catch (MessagingException e) {
            System.out.println("Failed to send email: " + e.getMessage());
            throw new RuntimeException("Erreur lors de l'envoi de l'email", e);
        }
    }

    @Transactional
    public int updatePasswordByEmail(String email, String password) {
        password = this.passwordEncoder.encode(password);
        return this.userRepo.updatePasswordByEmail(email, password);
    }

    public UserResDTO register(UserReqDTO req) {
        return userService.save(req);
    }

}
