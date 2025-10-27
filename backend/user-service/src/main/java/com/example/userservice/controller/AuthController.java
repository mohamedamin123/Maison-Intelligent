package com.example.userservice.controller;

import com.example.userservice.model.DTO.request.AuthReqDTO;
import com.example.userservice.model.DTO.request.ProfileReqDTO;
import com.example.userservice.model.DTO.request.RegisterReqDTO;
import com.example.userservice.model.DTO.response.AuthResDTO;
import com.example.userservice.model.DTO.response.ProfileResDTO;
import com.example.userservice.service.interf.AuthService;
import com.example.userservice.util.Email;
import com.example.userservice.util.EmailText;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor

public class AuthController {

    private final AuthService service;

    @GetMapping("/me")
    public ResponseEntity<String> currentUser(Authentication auth) {
        return ResponseEntity.ok(auth.getName());
    }


    @PostMapping("/register")
    public ResponseEntity<AuthResDTO> register(@Valid  @RequestBody RegisterReqDTO request) {
        Email init = new Email(request.getEmail(), EmailText.welcomeUser());
        this.service.sendEmail(init,"register");
        return ResponseEntity.ok(service.save(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResDTO> login(@Valid @RequestBody AuthReqDTO request) {

        return ResponseEntity.ok(service.login(request));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        request.getSession().invalidate(); // si session
        return ResponseEntity.ok("Déconnecté avec succès.");
    }

    @PostMapping("/forgot")
    public ResponseEntity<?> send(@RequestBody Map<String, String> request) {
        String emailAddress = request.get("email");
        if (emailAddress == null || emailAddress.isBlank()) {
            return ResponseEntity.badRequest().body("L'adresse email est requise.");
        }

        Email init=new Email();
        init = new Email(emailAddress, EmailText.forgotPassword(init.getCode()),init.getCode());
        String code = this.service.sendEmail(init,"forgot");
        return ResponseEntity.ok(Map.of("message", "Email envoyé avec succès", "code", code));
    }
    @PatchMapping("/update-password")
    public ResponseEntity<AuthResDTO> updatePassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String newPassword = request.get("newPassword");

        if (email == null || email.isBlank() || newPassword == null || newPassword.isBlank()) {
            return ResponseEntity.badRequest().body(null);
        }

        AuthResDTO response = service.updatePassword(email, newPassword);
        return ResponseEntity.ok(response);
    }



}
