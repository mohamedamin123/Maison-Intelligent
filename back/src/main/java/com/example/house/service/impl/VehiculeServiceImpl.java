package com.example.house.service.impl;

import com.example.house.model.DTO.req.VehiculeReqDTO;
import com.example.house.model.DTO.res.VehiculeResDTO;
import com.example.house.model.entity.Vehicule;
import com.example.house.model.mapper.VehiculeMapper;
import com.example.house.repository.VehiculeRepo;
import com.example.house.service.interf.VehiculeService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Primary
@RequiredArgsConstructor
public class VehiculeServiceImpl implements VehiculeService {

    private final VehiculeRepo repository;
    private final VehiculeMapper mapper;

    @Override
    public VehiculeResDTO save(VehiculeReqDTO req) {
        Vehicule emp = mapper.toEntity(req);
        repository.save(emp);
        return mapper.toResDTO(emp);
    }

    @Override
    public VehiculeResDTO update(Integer id, VehiculeReqDTO req) {
        Vehicule existingUser = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id " + id));

        if (req.getMarque() != null) existingUser.setMarque(req.getMarque());
        if (req.getMatricule() != null) existingUser.setMatricule(req.getMatricule());
        if (req.getModele() != null) existingUser.setModele(req.getModele());

        Vehicule updatedUser = repository.save(existingUser);

        return mapper.toResDTO(updatedUser);
    }



    @Override
    public List<VehiculeResDTO> findAll() {
        List<Vehicule> users = this.repository.findAll();
        return mapper.toAllResDTO(users);
    }

    @Override
    public List<VehiculeResDTO> findAllByIdGarage(Integer idGarage) {
        List<Vehicule> users = this.repository.findAllByIdGarage(idGarage);
        return mapper.toAllResDTO(users);    }

    @Override
    public List<VehiculeResDTO> findAllByIdUser(Integer idUser) {
        List<Vehicule> users = this.repository.findAllByIdUser(idUser);
        return mapper.toAllResDTO(users);    }

    @Override
    public Optional<VehiculeResDTO> findById(Integer id) {
        Optional<Vehicule> optional = this.repository.findById(id);
        if (optional.isPresent()) {
            VehiculeResDTO MedecinResDTO = mapper.toResDTO(optional.get());
            return Optional.of(MedecinResDTO);
        } else {
            return Optional.empty();
        }
    }



    @Override
    public boolean delete(VehiculeReqDTO req) {
        Integer id = req.getIdVehicule(); // Si disponible
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
