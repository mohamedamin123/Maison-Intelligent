package com.example.house.model.mapper;



import com.example.house.model.DTO.req.HistoriqueEvenementReqDTO;
import com.example.house.model.DTO.res.HistoriqueEvenementResDTO;
import com.example.house.model.entity.HistoriqueEvenement;
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

