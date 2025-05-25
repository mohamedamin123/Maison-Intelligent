package com.example.garage.model.mapper;



import com.example.garage.model.DTO.req.HistoriqueEvenementReqDTO;
import com.example.garage.model.DTO.req.UserReqDTO;
import com.example.garage.model.DTO.res.HistoriqueEvenementResDTO;
import com.example.garage.model.DTO.res.UserResDTO;
import com.example.garage.model.entity.HistoriqueEvenement;
import com.example.garage.model.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface HistoriqueEvenementMapper {

    HistoriqueEvenement toEntity(HistoriqueEvenementReqDTO dto);

    HistoriqueEvenementResDTO toResDTO(HistoriqueEvenement user);

    List<HistoriqueEvenement> toAllEntity(List<HistoriqueEvenementReqDTO> dtoList);

    List<HistoriqueEvenementResDTO> toAllResDTO(List<HistoriqueEvenement> userList);

}

