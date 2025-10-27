package com.example.historyservice.model.mapper;


import com.example.historyservice.model.DTO.REQ.HistoryEventReqDTO;
import com.example.historyservice.model.DTO.RES.HistoryEventResDTO;
import com.example.historyservice.model.entity.HistoryEvent;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface HistoryEventMapper {


    // Request DTO -> Entity

    HistoryEvent toEntity(HistoryEventReqDTO dto);

    // Entity -> Response DTO
    HistoryEventResDTO toDto(HistoryEvent entity);
}
