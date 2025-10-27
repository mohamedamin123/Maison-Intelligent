package com.example.userservice.service.interf;


import com.example.userservice.model.DTO.request.ProfileReqDTO;
import com.example.userservice.model.DTO.response.AuthResDTO;
import com.example.userservice.model.DTO.response.ProfileResDTO;
import com.example.userservice.model.enumeration.Role;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface UserService {

    AuthResDTO updateProfile(Integer id, ProfileReqDTO req);

    List<ProfileResDTO> findAll();

//    List<ProfileResDTO> findByIdHome(Integer id);



    Optional<ProfileResDTO> findById(Integer id) ;

    Optional<ProfileResDTO> findByEmail(String email);
    Optional<ProfileResDTO> findByTel(String tel);

    ProfileResDTO updateProfile(String email, ProfileReqDTO profileReqDTO);

    boolean deleteById(Integer id);


    ProfileResDTO updateUserRole(Integer id, Role role);
}
