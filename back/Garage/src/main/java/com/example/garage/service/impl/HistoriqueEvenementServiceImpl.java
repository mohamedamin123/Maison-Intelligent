package com.example.garage.service.impl;

import com.example.garage.model.DTO.req.HistoriqueEvenementReqDTO;
import com.example.garage.model.DTO.req.UserReqDTO;
import com.example.garage.model.DTO.res.HistoriqueEvenementResDTO;
import com.example.garage.model.DTO.res.UserResDTO;
import com.example.garage.model.entity.HistoriqueEvenement;
import com.example.garage.model.entity.User;
import com.example.garage.model.mapper.HistoriqueEvenementMapper;
import com.example.garage.model.mapper.UserMapper;
import com.example.garage.repository.HistoriqueEvenementRepo;
import com.example.garage.repository.UserRepo;
import com.example.garage.service.interf.HistoriqueEvenementService;
import com.example.garage.service.interf.UserService;
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
