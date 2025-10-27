package com.example.homeservice.model.DTO.RES;

import com.example.homeservice.model.entity.Home;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HomeMemberDTORes {

    private Integer idHomeMember;

    private Integer userId; // référence à l'utilisateur dans User Service

    private Integer homeId;


}
