package com.example.house.service.impl;

import com.example.house.model.DTO.req.GarageReqDTO;
import com.example.house.model.DTO.res.GarageResDTO;
import com.example.house.model.entity.Garage;
import com.example.house.model.mapper.GarageMapper;
import com.example.house.repository.GarageRepo;
import com.example.house.service.interf.GarageService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Primary
@RequiredArgsConstructor
public class GarageServiceImpl implements GarageService {

    private final GarageRepo repository;
    private final GarageMapper mapper;

    @Override
    public GarageResDTO save(GarageReqDTO req) {
        Garage emp = mapper.toEntity(req);
        System.out.println("user ;: "+req.toString());

        repository.save(emp);
        return mapper.toResDTO(emp);
    }

    @Override
    public GarageResDTO update(Integer id, GarageReqDTO req) {
        Garage existingUser = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id " + id));

        if (req.getEtat() != null) existingUser.setEtat(req.getEtat());
        if (req.getNbrVehicule() != 0) existingUser.setNbrVehicule(req.getNbrVehicule());
        Garage updatedUser = repository.save(existingUser);

        return mapper.toResDTO(updatedUser);
    }



    @Override
    public List<GarageResDTO> findAll() {
        List<Garage> users = this.repository.findAll();
        return mapper.toAllResDTO(users);
    }

    @Override
    public Optional<GarageResDTO> findById(Integer id) {
        Optional<Garage> optional = this.repository.findById(id);
        if (optional.isPresent()) {
            GarageResDTO MedecinResDTO = mapper.toResDTO(optional.get());
            return Optional.of(MedecinResDTO);
        } else {
            return Optional.empty();
        }
    }

    @Override
    public Optional<GarageResDTO> findGarageByIdUser(Integer id) {
        Optional<Garage> optional = this.repository.findGarageByIdUser(id);
        if (optional.isPresent()) {
            GarageResDTO MedecinResDTO = mapper.toResDTO(optional.get());
            return Optional.of(MedecinResDTO);
        } else {
            return Optional.empty();
        }
    }


    @Override
    public boolean delete(GarageReqDTO req) {
        Integer id = req.getIdGarage(); // Si disponible
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

    @Override
    public void changerEtatGarage(Integer id, boolean estOuvert) {
        Optional<Garage> optionalGarage = repository.findById(id);
        if (optionalGarage.isPresent()) {
            Garage garage = optionalGarage.get();
            garage.changerEtat(estOuvert); // appel à la nouvelle méthode unifiée
            repository.save(garage); // sauvegarde les changements
        } else {
            throw new EntityNotFoundException("Garage avec l'ID " + id + " non trouvé");
        }
    }

    @Override
    public void changerLumiereGarage(Integer id, boolean estOuvert) {
        Optional<Garage> optionalGarage = repository.findById(id);
        if (optionalGarage.isPresent()) {
            Garage garage = optionalGarage.get();
            garage.changerLumiere(estOuvert); // appel à la nouvelle méthode unifiée
            repository.save(garage); // sauvegarde les changements
        } else {
            throw new EntityNotFoundException("Garage avec l'ID " + id + " non trouvé");
        }
    }




}
