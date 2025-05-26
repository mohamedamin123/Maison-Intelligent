package com.example.garage.controller;

import com.example.garage.exception.ResourceNotFoundException;
import com.example.garage.model.DTO.req.GarageReqDTO;
import com.example.garage.model.DTO.req.HistoriqueEvenementReqDTO;
import com.example.garage.model.DTO.res.GarageResDTO;
import com.example.garage.model.DTO.res.HistoriqueEvenementResDTO;
import com.example.garage.service.interf.GarageService;
import com.example.garage.service.interf.HistoriqueEvenementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/historiqueEvenements")
@RequiredArgsConstructor
@Slf4j
public class HistoriqueEvenementController {

    private final HistoriqueEvenementService service;

    @GetMapping
    public ResponseEntity<List<HistoriqueEvenementResDTO>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<HistoriqueEvenementResDTO>> findAllByIdUser(@PathVariable Integer id) {
        return ResponseEntity.ok(service.findAllByIdUser(id));
    }
    @GetMapping("/{id}")
    public ResponseEntity<HistoriqueEvenementResDTO> findById(@PathVariable Integer id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }



    @PostMapping
    public ResponseEntity<Void> save(@Valid @RequestBody HistoriqueEvenementReqDTO user) {
        service.save(user);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id,@Valid @RequestBody HistoriqueEvenementReqDTO user) {
        HistoriqueEvenementResDTO updatedUser = service.update(id, user);
        return ResponseEntity.ok(updatedUser);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Integer id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> delete(@RequestBody HistoriqueEvenementReqDTO user) {
        service.delete(user);
        return ResponseEntity.noContent().build();
    }
}
