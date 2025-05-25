package com.example.garage.controller;

import com.example.garage.exception.ResourceNotFoundException;
import com.example.garage.model.DTO.req.GarageReqDTO;
import com.example.garage.model.DTO.req.UserReqDTO;
import com.example.garage.model.DTO.res.GarageResDTO;
import com.example.garage.model.DTO.res.UserResDTO;
import com.example.garage.service.interf.GarageService;
import com.example.garage.service.interf.UserService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/garages")
@RequiredArgsConstructor
@Slf4j
public class GarageController {

    private final GarageService service;

    @GetMapping
    public ResponseEntity<List<GarageResDTO>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GarageResDTO> findById(@PathVariable Integer id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<GarageResDTO> findGarageByIdUser(@PathVariable Integer id) {
        return service.findGarageByIdUser(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    @PostMapping
    public ResponseEntity<Void> save(@Valid @RequestBody GarageReqDTO user) {
        System.out.println("user ;: "+user.toString());
        service.save(user);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id,@Valid @RequestBody GarageReqDTO user) {
        GarageResDTO updatedUser = service.update(id, user);
        return ResponseEntity.ok(updatedUser);
    }

    @PatchMapping("/{id}/port")
    public ResponseEntity<Void> changerEtatGarage(@PathVariable Integer id, @RequestParam boolean estOuvert) {
        try {
            service.changerEtatGarage(id, estOuvert);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Garage not found with id: " + id);
        }
    }

    @PatchMapping("/{id}/lumiere")
    public ResponseEntity<Void> changerLumiereGarage(@PathVariable Integer id, @RequestParam boolean estOuvert) {
        try {
            service.changerLumiereGarage(id, estOuvert);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Garage not found with id: " + id);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Integer id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> delete(@RequestBody GarageReqDTO user) {
        service.delete(user);
        return ResponseEntity.noContent().build();
    }
}
