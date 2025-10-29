package com.example.homeservice.model.DTO.RES;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomResDTO {

    private Integer idRoom;
    private String nom;
    private Float surface;
    private Integer homeId;
    private String TypeRoom;
}
