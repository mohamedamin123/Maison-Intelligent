package com.example.homeservice.controller;

import com.example.homeservice.model.DTO.REQ.RoomReqDTO;
import com.example.homeservice.model.DTO.RES.RoomResDTO;
import com.example.homeservice.model.enumeration.TypeRoom;
import com.example.homeservice.service.interf.RoomService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    // ✅ 1. Créer une room
    @PostMapping
    public ResponseEntity<RoomResDTO> createRoom(@Valid @RequestBody RoomReqDTO dto) {
        RoomResDTO created = roomService.createRoom(dto);
        return ResponseEntity.ok(created);
    }

    // ✅ 2. Mettre à jour une room
    @PutMapping("/{id}")
    public ResponseEntity<RoomResDTO> updateRoom(@PathVariable Integer id,
                                                 @Valid @RequestBody RoomReqDTO dto) {
        RoomResDTO updated = roomService.updateRoom(id, dto);
        return ResponseEntity.ok(updated);
    }

    // ✅ 3. Récupérer une room par ID
    @GetMapping("/{id}")
    public ResponseEntity<RoomResDTO> getRoomById(@PathVariable Integer id) {
        RoomResDTO room = roomService.getRoomById(id);
        return ResponseEntity.ok(room);
    }

    // ✅ 4. Récupérer toutes les rooms d’une maison
    @GetMapping("/home/{homeId}")
    public ResponseEntity<List<RoomResDTO>> getRoomsByHome(@PathVariable Integer homeId) {
        List<RoomResDTO> rooms = roomService.getRoomsByHome(homeId);
        return ResponseEntity.ok(rooms);
    }

    // ✅ 5. Récupérer une room spécifique d'une maison (idRoom + homeId)
    @GetMapping("/home/{homeId}/room/{roomId}")
    public ResponseEntity<List<RoomResDTO>> findAllByIdRoomAndHome_IdHome(
            @PathVariable Integer roomId,
            @PathVariable Integer homeId) {
        List<RoomResDTO> rooms = roomService.findAllByIdRoomAndHome_IdHome(roomId, homeId);
        return ResponseEntity.ok(rooms);
    }

    // ✅ 6. Récupérer toutes les rooms d’un type donné dans une maison
    @GetMapping("/home/{homeId}/type/{typeRoom}")
    public ResponseEntity<List<RoomResDTO>> findAllByTypeAndHome_IdHome(
            @PathVariable Integer homeId,
            @PathVariable("typeRoom") TypeRoom typeRoom) {
        List<RoomResDTO> rooms = roomService.findAllByTypeAndHome_IdHome(typeRoom, homeId);
        return ResponseEntity.ok(rooms);
    }


    // ✅ 7. Supprimer une room
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Integer id) {
        roomService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }
}
