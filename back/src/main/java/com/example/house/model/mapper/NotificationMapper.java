package com.example.house.model.mapper;



import com.example.house.model.DTO.req.NotificationReqDTO;
import com.example.house.model.DTO.res.NotificationResDTO;
import com.example.house.model.entity.Notification;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface NotificationMapper {

    Notification toEntity(NotificationReqDTO dto);

    NotificationResDTO toResDTO(Notification user);

    List<Notification> toAllEntity(List<NotificationReqDTO> dtoList);

    List<NotificationResDTO> toAllResDTO(List<Notification> userList);

}

