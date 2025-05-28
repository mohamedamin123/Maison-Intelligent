package com.example.house.service.interf;

import com.example.house.model.DTO.req.GarageReqDTO;
import com.example.house.model.DTO.res.GarageResDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface GarageService {

    GarageResDTO save(GarageReqDTO req);

    GarageResDTO update(Integer id, GarageReqDTO req);

    List<GarageResDTO> findAll();


    Optional<GarageResDTO> findById(Integer id);

    Optional<GarageResDTO> findGarageByIdUser(Integer id);

    boolean delete(GarageReqDTO req);

    boolean deleteById(Integer id);

    public void changerEtatGarage(Integer id, boolean estOuvert);

    public void changerLumiereGarage(Integer id, boolean estOuvert);

}

