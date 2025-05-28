package com.example.house.model.mapper;



import com.example.house.model.DTO.req.CaveReqDTO;
import com.example.house.model.DTO.res.CaveResDTO;
import com.example.house.model.entity.Cave;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface CaveMapper {

    Cave toEntity(CaveReqDTO dto);

    CaveResDTO toResDTO(Cave user);

    List<Cave> toAllEntity(List<CaveReqDTO> dtoList);

    List<CaveResDTO> toAllResDTO(List<Cave> userList);

}

