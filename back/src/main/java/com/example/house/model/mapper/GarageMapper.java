package com.example.house.model.mapper;



import com.example.house.model.DTO.req.GarageReqDTO;
import com.example.house.model.DTO.res.GarageResDTO;
import com.example.house.model.entity.Garage;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface GarageMapper {

    Garage toEntity(GarageReqDTO dto);

    GarageResDTO toResDTO(Garage user);

    List<Garage> toAllEntity(List<GarageReqDTO> dtoList);

    List<GarageResDTO> toAllResDTO(List<Garage> userList);

}

