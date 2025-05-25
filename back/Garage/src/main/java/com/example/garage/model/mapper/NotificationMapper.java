package com.example.garage.model.mapper;



import com.example.garage.model.DTO.req.NotificationReqDTO;
import com.example.garage.model.DTO.req.UserReqDTO;
import com.example.garage.model.DTO.res.NotificationResDTO;
import com.example.garage.model.DTO.res.UserResDTO;
import com.example.garage.model.entity.Notification;
import com.example.garage.model.entity.User;
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

