package com.example.homeservice.model.DTO.REQ;

import com.example.homeservice.model.enumeration.TypeRoom;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HomeDTOReq {

    @NotBlank(message = "L'adresse ne doit pas être vide.")
    @Size(min = 5, max = 255, message = "L'adresse doit contenir entre 5 et 255 caractères.")
    private String adresse;

    @NotBlank(message = "La ville ne doit pas être vide.")
    @Size(min = 2, max = 100, message = "Le nom de la ville doit contenir entre 2 et 100 caractères.")
    private String ville;

    @NotBlank(message = "Le code postal ne doit pas être vide.")
    @Pattern(regexp = "\\d{4,6}", message = "Le code postal doit contenir entre 4 et 6 chiffres.")
    private String codePostal;

    private TypeRoom type;

}
