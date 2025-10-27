package com.example.homeservice.service.interf;



import com.example.homeservice.model.DTO.REQ.GarageReqDTO;
import com.example.homeservice.model.DTO.RES.GarageResDTO;

import java.util.List;

public interface GarageService {

    GarageResDTO createGarage(GarageReqDTO dto);

    GarageResDTO updateGarage(Integer id, GarageReqDTO dto);

    GarageResDTO getGarageById(Integer id);

    List<GarageResDTO> getGaragesByHome(Integer homeId);

    void deleteGarage(Integer id);
}
