package com.example.userservice.service.impl;

import com.example.userservice.exception.UserException;
import com.example.userservice.model.DTO.request.AuthReqDTO;
import com.example.userservice.model.DTO.request.ProfileReqDTO;
import com.example.userservice.model.DTO.request.RegisterReqDTO;
import com.example.userservice.model.DTO.response.AuthResDTO;
import com.example.userservice.model.DTO.response.ProfileResDTO;
import com.example.userservice.model.entity.User;
import com.example.userservice.model.mapper.UserMapper;
import com.example.userservice.repository.UserRepository;
import com.example.userservice.security.UtilisateurDetail;
import com.example.userservice.service.interf.AuthService;
import com.example.userservice.util.Email;
import com.example.userservice.security.JwtUtil;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
@Service
@Primary
@RequiredArgsConstructor
public class AuthServiceImpl implements UserDetailsService, AuthService {

    private final UserRepository userRepo;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final JavaMailSender mailSender;

    // --- Chargement utilisateur pour Spring Security ---
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepo.findUserByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur introuvable : " + email));
        return new UtilisateurDetail(user);
    }

    // --- Inscription ---
    @Override
    public AuthResDTO save(RegisterReqDTO request) {
        if (userRepo.existsByEmail(request.getEmail())) {
            throw new UserException("email", request.getEmail());
        }
        if (userRepo.existsByTel(request.getTel())) {
            throw new UserException("téléphone", request.getTel());
        }


        // Mapper le DTO vers l'entité correcte selon le rôle
        User user = userMapper.registerDtoToUser(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepo.save(user);

        String token = jwtUtil.generateToken(user.getEmail());

        AuthResDTO response = userMapper.userToAuthResponse(user);
        response.setToken(token);
        return response;
    }

    // --- Login ---
    @Override
    public AuthResDTO login(AuthReqDTO request) {
        User user = userRepo.findUserByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("Email invalide"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Mot de passe invalide");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        AuthResDTO response = userMapper.userToAuthResponse(user);
        response.setToken(token);
        response.setIdUser(user.getIdUser());
        return response;
    }

    // --- Envoi email ---
    private String sendEmailInternal(Email email) {
        if (email.getTo() == null || email.getTo().isBlank()) {
            throw new IllegalArgumentException("Adresse email (to) est vide ou null.");
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom("mohamedaming146@gmail.com");
            helper.setTo(email.getTo());
            helper.setSubject(email.getSubject());
            helper.setText(email.getBody(), true);

            mailSender.send(message);
            return email.getCode();
        } catch (MessagingException e) {
            throw new RuntimeException("Erreur lors de l'envoi de l'email", e);
        }
    }

    @Override
    public String sendEmail(Email email, String type) {
        if ("register".equals(type)) {
            email.setSubject("Bienvenue");
            return sendEmailInternal(email);
        } else if ("forgot".equals(type)) {
            if (userRepo.findUserByEmail(email.getTo()).isEmpty()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Aucun utilisateur trouvé avec cet email.");
            }
            return sendEmailInternal(email);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Type d'email non supporté");
        }
    }

    // --- Modifier mot de passe ---
    @Override
    public AuthResDTO updatePassword(String email, String newPassword) {
        User user = userRepo.findUserByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur introuvable"));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepo.save(user);

        String token = jwtUtil.generateToken(user.getEmail());
        AuthResDTO response = userMapper.userToAuthResponse(user);
        response.setToken(token);
        return response;
    }


}
