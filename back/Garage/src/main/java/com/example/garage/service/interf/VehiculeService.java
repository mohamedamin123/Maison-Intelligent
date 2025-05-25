package com.example.garage.service.interf;

import com.example.garage.model.DTO.req.GarageReqDTO;
import com.example.garage.model.DTO.req.VehiculeReqDTO;
import com.example.garage.model.DTO.res.GarageResDTO;
import com.example.garage.model.DTO.res.VehiculeResDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface VehiculeService {

    VehiculeResDTO save(VehiculeReqDTO req);

    VehiculeResDTO update(Integer id, VehiculeReqDTO req);

    List<VehiculeResDTO> findAll();


    Optional<VehiculeResDTO> findById(Integer id) ;

    boolean delete(VehiculeReqDTO req);
    boolean deleteById(Integer id);


}
