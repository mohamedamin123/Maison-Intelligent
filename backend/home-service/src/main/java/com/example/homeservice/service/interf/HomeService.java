package com.example.homeservice.service.interf;

import com.example.homeservice.model.DTO.REQ.HomeDTOReq;
import com.example.homeservice.model.DTO.RES.HomeDTORes;

import java.util.List;

public interface HomeService {

    HomeDTORes createHome(HomeDTOReq dtoReq);

    List<HomeDTORes> getAllHomes();

    HomeDTORes getHomeById(Integer idHome);

//    List<HomeDTORes> getHomesByUserId(Integer idUser);

    void deleteHome(Integer idHome);
}
