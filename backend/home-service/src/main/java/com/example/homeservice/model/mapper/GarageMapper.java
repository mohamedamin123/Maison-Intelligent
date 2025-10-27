package com.example.homeservice.model.mapper;


import com.example.homeservice.model.DTO.REQ.GarageReqDTO;
import com.example.homeservice.model.DTO.RES.GarageResDTO;
import com.example.homeservice.model.entity.Garage;
import com.example.homeservice.model.entity.Home;
import com.example.homeservice.model.enumeration.TypeRoom;
import org.mapstruct.*;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface GarageMapper {

    // 🔹 Convertit DTO → Entité (pour POST/PUT)
    @Mapping(target = "type", constant = "GARAGE") // ✅ MapStruct convertira la chaîne vers l'enum

    Garage toEntity(GarageReqDTO dto);

    // 🔹 Convertit Entité → DTO de réponse
    @Mapping(target = "homeId", source = "home.idHome")
    @Mapping(target = "type", source = "type")
    GarageResDTO toResDTO(Garage garage);
}
