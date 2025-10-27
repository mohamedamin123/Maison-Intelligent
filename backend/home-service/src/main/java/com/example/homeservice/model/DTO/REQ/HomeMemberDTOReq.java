package com.example.homeservice.model.DTO.REQ;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HomeMemberDTOReq {

    @NotNull(message = "L'id de l'utilisateur est obligatoire")
    @Positive(message = "L'id de l'utilisateur doit être positif")
    private Integer userId;

    @NotNull(message = "L'id de la maison est obligatoire")
    @Positive(message = "L'id de la maison doit être positif")
    private Integer homeId;


}
