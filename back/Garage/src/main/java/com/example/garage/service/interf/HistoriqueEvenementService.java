package com.example.garage.service.interf;

import com.example.garage.model.DTO.req.GarageReqDTO;
import com.example.garage.model.DTO.req.HistoriqueEvenementReqDTO;
import com.example.garage.model.DTO.res.GarageResDTO;
import com.example.garage.model.DTO.res.HistoriqueEvenementResDTO;
import com.example.garage.model.entity.HistoriqueEvenement;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public interface HistoriqueEvenementService {
    HistoriqueEvenementResDTO save(HistoriqueEvenementReqDTO req);

    HistoriqueEvenementResDTO update(Integer id,HistoriqueEvenementReqDTO req);

    List<HistoriqueEvenementResDTO> findAll();

    List<HistoriqueEvenementResDTO> findAllByIdUser(Integer id);

    Optional<HistoriqueEvenementResDTO> findById(Integer id) ;

    boolean delete(HistoriqueEvenementReqDTO req);
    boolean deleteById(Integer id);
}
