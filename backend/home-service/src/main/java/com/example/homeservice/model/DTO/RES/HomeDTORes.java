package com.example.homeservice.model.DTO.RES;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HomeDTORes {

    private Integer idHome;
    private String adresse;
    private String ville;
    private String codePostal;
    // Nouvelle propriété pour lier à HomeMember / User
    private List<HomeMemberDTORes> homeMember; // null si pas d'utilisateur
}
