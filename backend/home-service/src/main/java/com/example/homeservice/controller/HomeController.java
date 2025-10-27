package com.example.homeservice.controller;

import com.example.homeservice.model.DTO.REQ.HomeDTOReq;
import com.example.homeservice.model.DTO.RES.HomeDTORes;
import com.example.homeservice.service.interf.HomeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/homes")
@RequiredArgsConstructor
public class HomeController {

    private final HomeService homeService;

    @PostMapping
    public ResponseEntity<HomeDTORes> createHome(@Valid @RequestBody HomeDTOReq homeDTOReq) {
        return ResponseEntity.ok(homeService.createHome(homeDTOReq));
    }

    @GetMapping
    public ResponseEntity<List<HomeDTORes>> getAllHomes() {
        return ResponseEntity.ok(homeService.getAllHomes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HomeDTORes> getHomeById(@PathVariable Integer id) {
        return ResponseEntity.ok(homeService.getHomeById(id));
    }

//    @GetMapping("/user/{idUser}")
//    public ResponseEntity<List<HomeDTORes>> getHomesByUserId(@PathVariable Integer idUser) {
//        return ResponseEntity.ok(homeService.getHomesByUserId(idUser));
//    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHome(@PathVariable Integer id) {
        homeService.deleteHome(id);
        return ResponseEntity.noContent().build();
    }
}
