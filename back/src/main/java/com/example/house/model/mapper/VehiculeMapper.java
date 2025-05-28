package com.example.house.model.mapper;



import com.example.house.model.DTO.req.VehiculeReqDTO;
import com.example.house.model.DTO.res.VehiculeResDTO;
import com.example.house.model.entity.Vehicule;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface VehiculeMapper {

    Vehicule toEntity(VehiculeReqDTO dto);

    VehiculeResDTO toResDTO(Vehicule user);

    List<Vehicule> toAllEntity(List<VehiculeReqDTO> dtoList);

    List<VehiculeResDTO> toAllResDTO(List<Vehicule> userList);

}

