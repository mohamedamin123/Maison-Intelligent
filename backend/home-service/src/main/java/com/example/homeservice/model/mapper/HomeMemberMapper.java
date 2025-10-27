package com.example.homeservice.model.mapper;

import com.example.homeservice.model.DTO.REQ.HomeMemberDTOReq;
import com.example.homeservice.model.DTO.RES.HomeMemberDTORes;
import com.example.homeservice.model.entity.HomeMember;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface HomeMemberMapper {


    // --------------------------
    // 🔄 Conversion DTO -> Entity
    // --------------------------

    @Mapping(target = "home", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "idHomeMember", ignore = true)
    @Mapping(target = "createdAt", ignore = true)

    HomeMember toEntity(HomeMemberDTOReq dto);

    // --------------------------
    // 🔄 Conversion Entity -> DTO
    // --------------------------
    @Mapping(target = "homeId", source = "home.idHome")
    HomeMemberDTORes toDTO(HomeMember entity);
}
