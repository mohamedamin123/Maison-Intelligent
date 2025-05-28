package com.example.house.model.mapper;



import com.example.house.model.DTO.req.UserReqDTO;
import com.example.house.model.DTO.res.UserResDTO;
import com.example.house.model.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface UserMapper {

    User toEntity(UserReqDTO dto);

    UserResDTO toResDTO(User user);

    List<User> toAllEntity(List<UserReqDTO> dtoList);

    List<UserResDTO> toAllResDTO(List<User> userList);

}

