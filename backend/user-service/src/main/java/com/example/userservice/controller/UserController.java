package com.example.userservice.controller;

import com.example.userservice.exception.UserException;
import com.example.userservice.model.DTO.response.AuthResDTO;
import com.example.userservice.model.DTO.request.ProfileReqDTO;
import com.example.userservice.model.DTO.response.ProfileResDTO;
import com.example.userservice.model.enumeration.Role;
import com.example.userservice.service.interf.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor

public class UserController {
    private final UserService service;


    @PatchMapping("/{id}")
    public ResponseEntity<AuthResDTO> update(@PathVariable Integer id, @Valid @RequestBody ProfileReqDTO user) {
        return ResponseEntity.ok(service.updateProfile(id,user));
    }

    @GetMapping
    public ResponseEntity<List<ProfileResDTO>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfileResDTO> findById(@PathVariable Integer id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new UserException("User not found with id: " + id));
    }

//    @GetMapping("/home/{id}")
//    public ResponseEntity<List<ProfileResDTO>> findByIdHome(@PathVariable Integer id) {
//        return ResponseEntity.ok(service.findByIdHome(id));
//    }

    @GetMapping("/email")
    public ResponseEntity<ProfileResDTO> findByEmail(@RequestParam String email) {
        return service.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new UserException("User not found with email: " + email));
    }

    @GetMapping("/tel")
    public ResponseEntity<ProfileResDTO> findByTel(@RequestParam String tel) {
        return service.findByTel(tel)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new UserException("User not found with tel: " + tel));
    }


    @PatchMapping("/update-profile")
    public ResponseEntity<ProfileResDTO> updateProfile(
            Authentication auth,
            @RequestBody ProfileReqDTO request
    ) {
        if (auth == null || auth.getName() == null) {
            return ResponseEntity.status(401).build();
        }

        String email = auth.getName(); // récupère l'email depuis le token JWT
        ProfileResDTO updatedProfile = service.updateProfile(email, request);
        return ResponseEntity.ok(updatedProfile);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Integer id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/role")
    public ResponseEntity<ProfileResDTO> updateRole(
            @PathVariable Integer id,
            @RequestBody Map<String, String> body) {

        String newRole = body.get("role");
        ProfileResDTO updated = service.updateUserRole(id, Role.valueOf(newRole));
        return ResponseEntity.ok(updated);
    }

}
