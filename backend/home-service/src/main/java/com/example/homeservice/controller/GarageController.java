package com.example.homeservice.controller;


import com.example.homeservice.model.DTO.REQ.GarageReqDTO;
import com.example.homeservice.model.DTO.RES.GarageResDTO;
import com.example.homeservice.service.interf.GarageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/garages")
@RequiredArgsConstructor
public class GarageController {

    private final GarageService garageService;

    @PostMapping
    public ResponseEntity<GarageResDTO> createGarage(@Valid @RequestBody GarageReqDTO dto) {
        GarageResDTO created = garageService.createGarage(dto);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GarageResDTO> updateGarage(@PathVariable Integer id,
                                                     @Valid @RequestBody GarageReqDTO dto) {
        GarageResDTO updated = garageService.updateGarage(id, dto);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GarageResDTO> getGarage(@PathVariable Integer id) {
        GarageResDTO garage = garageService.getGarageById(id);
        return ResponseEntity.ok(garage);
    }

    @GetMapping("/home/{homeId}")
    public ResponseEntity<List<GarageResDTO>> getGaragesByHome(@PathVariable Integer homeId) {
        List<GarageResDTO> garages = garageService.getGaragesByHome(homeId);
        return ResponseEntity.ok(garages);
    }

    @GetMapping("/home/{homeId}/room/{roomId}")
    public ResponseEntity<List<GarageResDTO>> getGaragesByHome(@PathVariable Integer roomId,@PathVariable Integer homeId) {
        List<GarageResDTO> garages = garageService.findAllByIdRoomAndHome_IdHome(roomId,homeId);
        return ResponseEntity.ok(garages);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGarage(@PathVariable Integer id) {
        garageService.deleteGarage(id);
        return ResponseEntity.noContent().build();
    }
}
