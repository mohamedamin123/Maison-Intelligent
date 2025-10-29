package com.example.homeservice.model.mapper;


import com.example.homeservice.model.DTO.REQ.RoomReqDTO;
import com.example.homeservice.model.DTO.RES.RoomResDTO;
import com.example.homeservice.model.entity.Room;
import org.mapstruct.*;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface RoomMapper {

    // 🔹 Convertit DTO → Entité (pour POST/PUT)
    @Mapping(target = "type", constant = "GARAGE") // ✅ MapStruct convertira la chaîne vers l'enum

    Room toEntity(RoomReqDTO dto);

    // 🔹 Convertit Entité → DTO de réponse
    @Mapping(target = "homeId", source = "home.idHome")
    RoomResDTO toResDTO(Room garage);
}
