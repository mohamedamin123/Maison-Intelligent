/*
 * Ce DTO est utilisé pour renvoyer un token JWT après une connexion ou inscription réussie.
 * */
package com.example.userservice.model.DTO.response;

import com.example.userservice.model.enumeration.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AuthResDTO {
    private String token;
    private Integer idUser;
//    private Integer idHome;
    private Role role;
}
