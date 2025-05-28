package com.example.house.service.interf;

import com.example.house.model.DTO.req.VehiculeReqDTO;
import com.example.house.model.DTO.res.VehiculeResDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface VehiculeService {

    VehiculeResDTO save(VehiculeReqDTO req);

    VehiculeResDTO update(Integer id, VehiculeReqDTO req);

    List<VehiculeResDTO> findAll();


    List<VehiculeResDTO> findAllByIdGarage(Integer idGarage);

    List<VehiculeResDTO> findAllByIdUser(Integer idUser);

    Optional<VehiculeResDTO> findById(Integer id) ;

    boolean delete(VehiculeReqDTO req);
    boolean deleteById(Integer id);


}
