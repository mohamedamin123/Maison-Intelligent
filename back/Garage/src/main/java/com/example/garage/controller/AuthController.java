package com.example.garage.controller;

import com.example.garage.model.DTO.req.UserReqDTO;
import com.example.garage.model.DTO.res.UserResDTO;
import com.example.garage.service.impl.AuthService;
import com.example.garage.service.interf.UserService;
import com.example.garage.util.Email;
import com.example.garage.util.JwtUtil;
import com.example.garage.util.LoginViewModel;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;
    private final AuthService service;
    private final UserService userService;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginViewModel login) {
        var auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(login.getEmail(), login.getPassword())
        );

        if (auth.isAuthenticated()) {
            String token = jwtUtil.generateToken(login.getEmail());
            Optional<UserResDTO> userResDTO = userService.findByEmail(login.getEmail());

            if (userResDTO.isPresent()) {
                return ResponseEntity.ok().body(Map.of(
                        "token", token,
                        "user", userResDTO.get()
                ));
            } else {
                // Utilisateur introuvable malgré authentification
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utilisateur non trouvé.");
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }


    @PostMapping("/register")
    public ResponseEntity<Void> save(@Valid @RequestBody UserReqDTO user) {
        service.register(user);
        return ResponseEntity.ok().build();
    }


    @PostMapping("/forgot")
    public ResponseEntity<?> send(@RequestBody Map<String, String> request) {
        String emailAddress = request.get("email");
        if (emailAddress == null || emailAddress.isBlank()) {
            return ResponseEntity.badRequest().body("L'adresse email est requise.");
        }

        Email email = new Email(emailAddress);
        String code = this.service.sendEmail(email);
        return ResponseEntity.ok(Map.of("message", "Email envoyé avec succès", "code", code));
    }

    @PatchMapping("/password")
    public ResponseEntity<?> updatePasswordByEmail(@RequestBody @Valid LoginViewModel login) {
        if (login.getEmail() == null || login.getEmail().isBlank()) {
            return ResponseEntity.badRequest().body("Email requis.");
        }
        if (login.getPassword() == null || login.getPassword().isBlank()) {
            return ResponseEntity.badRequest().body("Mot de passe requis.");
        }

        int updated = service.updatePasswordByEmail(login.getEmail(), login.getPassword());
        if (updated > 0) {
            return ResponseEntity.ok("Mot de passe mis à jour avec succès.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utilisateur non trouvé.");
        }
    }


}
