package com.example.house.service.impl;

import com.example.house.model.DTO.req.HistoriqueEvenementReqDTO;
import com.example.house.model.DTO.res.HistoriqueEvenementResDTO;
import com.example.house.model.entity.HistoriqueEvenement;
import com.example.house.model.mapper.HistoriqueEvenementMapper;
import com.example.house.repository.HistoriqueEvenementRepo;
import com.example.house.service.interf.HistoriqueEvenementService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Primary
@RequiredArgsConstructor
public class HistoriqueEvenementServiceImpl implements HistoriqueEvenementService {

    private final HistoriqueEvenementRepo repository;
    private final HistoriqueEvenementMapper mapper;

    @Override
    public HistoriqueEvenementResDTO save(HistoriqueEvenementReqDTO req) {
        HistoriqueEvenement emp = mapper.toEntity(req);
        repository.save(emp);
        return mapper.toResDTO(emp);
    }

    @Override
    public HistoriqueEvenementResDTO update(Integer id, HistoriqueEvenementReqDTO req) {
        HistoriqueEvenement existingUser = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id " + id));

        if (req.getAction() != null) existingUser.setAction(req.getAction());
        if (req.getDateAction() != null) existingUser.setDateAction(req.getDateAction());
        HistoriqueEvenement updatedUser = repository.save(existingUser);

        return mapper.toResDTO(updatedUser);
    }



    @Override
    public List<HistoriqueEvenementResDTO> findAll() {
        List<HistoriqueEvenement> users = this.repository.findAll();
        return mapper.toAllResDTO(users);
    }

    @Override
    public List<HistoriqueEvenementResDTO> findAllByIdUser(Integer id) {
        List<HistoriqueEvenement> users = this.repository.findAllByIdUserOrderByDateActionDesc(id);
        return mapper.toAllResDTO(users);
    }


    @Override
    public Optional<HistoriqueEvenementResDTO> findById(Integer id) {
        Optional<HistoriqueEvenement> optional = this.repository.findById(id);
        if (optional.isPresent()) {
            HistoriqueEvenementResDTO MedecinResDTO = mapper.toResDTO(optional.get());
            return Optional.of(MedecinResDTO);
        } else {
            return Optional.empty();
        }
    }



    @Override
    public boolean delete(HistoriqueEvenementReqDTO req) {
        Integer id = req.getIdHistorique(); // Si disponible
        if (this.repository.existsById(id)) {
            this.repository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteById(Integer id) {
        if (this.repository.existsById(id)) {
            this.repository.deleteById(id);
            return true;
        }
        return false;
    }

}
