package com.example.userservice.model.mapper;

import com.example.userservice.model.DTO.request.ProfileReqDTO;
import com.example.userservice.model.DTO.response.AuthResDTO;
import com.example.userservice.model.DTO.response.ProfileResDTO;
import com.example.userservice.model.DTO.request.RegisterReqDTO;
import com.example.userservice.model.entity.User;
import org.mapstruct.*;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface UserMapper {

    // 1️⃣ Convertir RegisterReqDTO -> User
    @Mapping(target = "idUser", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "statut", constant = "true")
    User registerDtoToUser(RegisterReqDTO dto);

    // 2️⃣ Convertir User -> ProfileResDTO
    ProfileResDTO userToProfileResponse(User user);

    // 3️⃣ Convertir liste de User -> liste de ProfileResDTO
    List<ProfileResDTO> usersToProfileResponses(List<User> users);

    // 4️⃣ Convertir User -> AuthResDTO
    @Mapping(target = "token", ignore = true)
    AuthResDTO userToAuthResponse(User user);

    // 5️⃣ Mettre à jour un User existant depuis ProfileReqDTO
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "idUser", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "statut", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateUserFromProfileRequest(ProfileReqDTO dto, @MappingTarget User user);
}
