package com.example.garage.controller;

import com.example.garage.exception.ResourceNotFoundException;
import com.example.garage.model.DTO.req.UserReqDTO;
import com.example.garage.model.DTO.res.UserResDTO;
import com.example.garage.service.interf.UserService;
import com.example.garage.util.LoginViewModel;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService service;

    @GetMapping
    public ResponseEntity<List<UserResDTO>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResDTO> findById(@PathVariable Integer id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    @GetMapping("/email")
    public ResponseEntity<UserResDTO> findByEmail(@RequestParam String email) {
        return service.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }

    @GetMapping("/tel")
    public ResponseEntity<UserResDTO> findByTel(@RequestParam String tel) {
        return service.findByTel(tel)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with tel: " + tel));
    }

    @PostMapping
    public ResponseEntity<Void> save(@Valid @RequestBody UserReqDTO user) {
        service.save(user);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id,@Valid @RequestBody UserReqDTO user) {
        UserResDTO updatedUser = service.update(id, user);
        return ResponseEntity.ok(updatedUser);
    }




    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Integer id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> delete(@RequestBody UserReqDTO user) {
        service.delete(user);
        return ResponseEntity.noContent().build();
    }
}
