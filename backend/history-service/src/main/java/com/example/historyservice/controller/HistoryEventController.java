package com.example.historyservice.controller;


import com.example.historyservice.model.DTO.REQ.HistoryEventReqDTO;
import com.example.historyservice.model.DTO.RES.HistoryEventResDTO;
import com.example.historyservice.service.interf.HistoryEventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/history")
@RequiredArgsConstructor
public class HistoryEventController {

    private final HistoryEventService service;

    // Créer un nouvel événement
    @PostMapping
    public ResponseEntity<HistoryEventResDTO> createHistoryEvent(@Valid @RequestBody HistoryEventReqDTO dto) {
        HistoryEventResDTO created = service.createHistoryEvent(dto);
        return ResponseEntity.ok(created);
    }

    // Récupérer tous les événements
    @GetMapping
    public ResponseEntity<List<HistoryEventResDTO>> getAllHistoryEvents() {
        List<HistoryEventResDTO> events = service.getAllHistoryEvents();
        return ResponseEntity.ok(events);
    }

    // Récupérer les événements d’une room spécifique
    @GetMapping("/room/{roomId}")
    public ResponseEntity<List<HistoryEventResDTO>> getHistoryEventsByRoom(@PathVariable Integer roomId) {
        List<HistoryEventResDTO> events = service.getHistoryEventsByRoomId(roomId);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/home/{homeId}")
    public ResponseEntity<List<HistoryEventResDTO>> findByHomeId(@PathVariable Integer homeId) {
        List<HistoryEventResDTO> events = service.findByHomeId(homeId);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/home/{homeId}/date")
    public ResponseEntity<List<HistoryEventResDTO>> findByHomeIdAndDate(
            @PathVariable Integer homeId,
            @RequestParam("date")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime localDateTime) {

        List<HistoryEventResDTO> events = service.findByHomeIdAndCreatedAt(homeId, localDateTime);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/home/{homeId}/room/{roomId}/date")
    public ResponseEntity<List<HistoryEventResDTO>> findByHomeIdAndRoomIdAndCreatedAtBetween(
            @PathVariable Integer homeId,
            @PathVariable Integer roomId,
            @RequestParam("date")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime localDateTime) {

        List<HistoryEventResDTO> events = service.findByHomeIdAndRoomIdAndCreatedAtBetween(roomId,homeId, localDateTime);
        return ResponseEntity.ok(events);
    }

}
