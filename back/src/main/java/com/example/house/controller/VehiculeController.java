package com.example.house.controller;

import com.example.house.exception.ResourceNotFoundException;
import com.example.house.model.DTO.req.VehiculeReqDTO;
import com.example.house.model.DTO.res.VehiculeResDTO;
import com.example.house.service.interf.VehiculeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vehicules")
@RequiredArgsConstructor
@Slf4j
public class VehiculeController {

    private final VehiculeService service;

    @GetMapping
    public ResponseEntity<List<VehiculeResDTO>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("garage/{id}")
    public ResponseEntity<List<VehiculeResDTO>> findAllByIdGarage( @PathVariable Integer id) {
        return ResponseEntity.ok(service.findAllByIdGarage(id));
    }

    @GetMapping("user/{id}")
    public ResponseEntity<List<VehiculeResDTO>> findAllByIdUser( @PathVariable Integer id) {
        return ResponseEntity.ok(service.findAllByIdUser(id));
    }
    @GetMapping("/{id}")
    public ResponseEntity<VehiculeResDTO> findById(@PathVariable Integer id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }



    @PostMapping
    public ResponseEntity<Void> save(@Valid @RequestBody VehiculeReqDTO user) {
        service.save(user);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id,@Valid @RequestBody VehiculeReqDTO user) {
        VehiculeResDTO updatedUser = service.update(id, user);
        return ResponseEntity.ok(updatedUser);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Integer id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> delete(@RequestBody VehiculeReqDTO user) {
        service.delete(user);
        return ResponseEntity.noContent().build();
    }
}
