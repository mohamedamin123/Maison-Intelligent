package com.example.homeservice.model.DTO.REQ;

import com.example.homeservice.model.enumeration.TypeRoom;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomReqDTO {

    @NotNull(message = "Le type du room est obligatoire.")
    private TypeRoom type;

    @NotBlank(message = "Le nom du room est obligatoire.")
    private String nom;

    @NotNull(message = "La surface du room est obligatoire.")
    @Positive(message = "La surface doit être positive.")
    private Float surface;

    @NotNull(message = "L'identifiant de la maison est obligatoire.")
    private Integer homeId;
    
}
