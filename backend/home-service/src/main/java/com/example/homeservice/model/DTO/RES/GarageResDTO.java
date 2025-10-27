package com.example.homeservice.model.DTO.RES;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class GarageResDTO {

    Integer idRoom;
    String nom;
    Float surface;
    Integer homeId;
    String type; // toujours "GARAGE"
}
