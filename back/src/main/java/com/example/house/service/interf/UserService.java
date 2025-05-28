package com.example.house.service.interf;

import com.example.house.model.DTO.req.UserReqDTO;
import com.example.house.model.DTO.res.UserResDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface UserService {

    UserResDTO save(UserReqDTO req);

    UserResDTO update(Integer id,UserReqDTO req);

    List<UserResDTO> findAll();


    Optional<UserResDTO> findById(Integer id) ;

    Optional<UserResDTO> findByEmail(String email);
    Optional<UserResDTO> findByTel(String tel);

    boolean delete(UserReqDTO req);
    boolean deleteById(Integer id);




}
