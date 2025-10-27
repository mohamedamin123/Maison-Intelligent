package com.example.homeservice.model.DTO.REQ;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class GarageReqDTO {

    @NotBlank(message = "Le nom du garage est obligatoire.")
    private String nom;

    @NotNull(message = "La surface du garage est obligatoire.")
    @Positive(message = "La surface doit être positive.")
    private Float surface;

    @NotNull(message = "L'identifiant de la maison est obligatoire.")
    private Integer homeId;
}
