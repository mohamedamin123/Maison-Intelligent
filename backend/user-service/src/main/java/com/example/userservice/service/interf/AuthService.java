package com.example.userservice.service.interf;


import com.example.userservice.model.DTO.request.AuthReqDTO;
import com.example.userservice.model.DTO.request.ProfileReqDTO;
import com.example.userservice.model.DTO.request.RegisterReqDTO;
import com.example.userservice.model.DTO.response.AuthResDTO;
import com.example.userservice.model.DTO.response.ProfileResDTO;
import com.example.userservice.util.Email;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {

    AuthResDTO save(RegisterReqDTO req);

     AuthResDTO login(AuthReqDTO request);

    public String sendEmail(Email email,String type);
    AuthResDTO updatePassword(String email, String newPassword);


}
