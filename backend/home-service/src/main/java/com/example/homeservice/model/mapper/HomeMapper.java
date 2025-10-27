package com.example.homeservice.model.mapper;

import com.example.homeservice.model.DTO.REQ.HomeDTOReq;
import com.example.homeservice.model.DTO.RES.HomeDTORes;
import com.example.homeservice.model.entity.Home;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface HomeMapper {

    // 🔄 Conversion DTO -> Entity
    @Mapping(target = "idHome", ignore = true)
    @Mapping(target = "members", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Home toEntity(HomeDTOReq dto);

    // 🔄 Conversion Entity -> DTO
    @Mapping(target = "homeMember", ignore = true)
    HomeDTORes toDTO(Home entity);
}
