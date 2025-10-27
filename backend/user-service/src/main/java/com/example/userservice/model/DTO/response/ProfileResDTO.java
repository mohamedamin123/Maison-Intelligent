/*
* Cette class Pour Profile
* */


package com.example.userservice.model.DTO.response;

import com.example.userservice.model.enumeration.Role;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProfileResDTO {

    Integer idUser;

    private String nom;

    private String prenom;

    private String tel;

    private LocalDate dateNaissance;


    private String email;

    private Role role;



}
