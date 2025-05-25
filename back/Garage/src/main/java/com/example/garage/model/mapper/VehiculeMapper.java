package com.example.garage.model.mapper;



import com.example.garage.model.DTO.req.GarageReqDTO;
import com.example.garage.model.DTO.req.VehiculeReqDTO;
import com.example.garage.model.DTO.res.GarageResDTO;
import com.example.garage.model.DTO.res.VehiculeResDTO;
import com.example.garage.model.entity.Garage;
import com.example.garage.model.entity.Vehicule;
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

