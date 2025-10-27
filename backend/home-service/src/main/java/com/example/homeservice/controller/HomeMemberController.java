package com.example.homeservice.controller;

import com.example.homeservice.model.DTO.REQ.HomeMemberDTOReq;
import com.example.homeservice.model.DTO.RES.HomeMemberDTORes;
import com.example.homeservice.service.interf.HomeMemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/homes_members")
@RequiredArgsConstructor
public class HomeMemberController {

    private final HomeMemberService homeService;

    @PostMapping
    public ResponseEntity<HomeMemberDTORes> createHomeMember(@Valid @RequestBody HomeMemberDTOReq homeDTOReq) {
        return ResponseEntity.ok(homeService.createHomeMember(homeDTOReq));
    }

    @GetMapping
    public ResponseEntity<List<HomeMemberDTORes>> getAllHomeMember() {
        return ResponseEntity.ok(homeService.getAllHomeMember());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HomeMemberDTORes> getHomeMemberById(@PathVariable Integer id) {
        return ResponseEntity.ok(homeService.getHomeMemberById(id));
    }

    @GetMapping("/user/{idUser}")
    public ResponseEntity<List<HomeMemberDTORes>> findByUserId(@PathVariable("idUser") Integer idUser) {
        return ResponseEntity.ok(homeService.findByUserId(idUser));
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHomeMember(@PathVariable Integer id) {
        homeService.deleteHomeMember(id);
        return ResponseEntity.noContent().build();
    }
}
