package com.example.homeservice.service.impl;

import com.example.homeservice.model.DTO.REQ.GarageReqDTO;
import com.example.homeservice.model.DTO.RES.GarageResDTO;
import com.example.homeservice.model.entity.Garage;
import com.example.homeservice.model.entity.Home;
import com.example.homeservice.repository.GarageRepository;
import com.example.homeservice.repository.HomeRepository;
import com.example.homeservice.model.mapper.GarageMapper;
import com.example.homeservice.service.interf.GarageService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GarageServiceImpl implements GarageService {

    private final GarageRepository garageRepository;
    private final HomeRepository homeRepository;
    private final GarageMapper garageMapper;

    @Override
    public GarageResDTO createGarage(GarageReqDTO dto) {
        // Récupération de la maison
        Home home = homeRepository.findById(dto.getHomeId())
                .orElseThrow(() -> new EntityNotFoundException("Maison non trouvée"));

        // Mapping DTO → Entité
        Garage garage = garageMapper.toEntity(dto);
        garage.setHome(home); // ✅ Liaison essentielle

        // Sauvegarde
        Garage saved = garageRepository.save(garage);

        // Mapping Entité → DTO Réponse
        return garageMapper.toResDTO(saved);
    }

    @Override
    public GarageResDTO updateGarage(Integer id, GarageReqDTO dto) {
        Garage garage = garageRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Garage non trouvé"));

        Home home = homeRepository.findById(dto.getHomeId())
                .orElseThrow(() -> new EntityNotFoundException("Maison non trouvée"));

        // Mise à jour des champs statiques
        garage.setNom(dto.getNom());
        garage.setSurface(dto.getSurface());
        garage.setHome(home);

        Garage updated = garageRepository.save(garage);
        return garageMapper.toResDTO(updated);
    }

    @Override
    public GarageResDTO getGarageById(Integer id) {
        Garage garage = garageRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Garage non trouvé"));
        return garageMapper.toResDTO(garage);
    }

    @Override
    public List<GarageResDTO> getGaragesByHome(Integer homeId) {
        List<Garage> garages = garageRepository.findAllByHome_IdHome(homeId);
        return garages.stream()
                .map(garageMapper::toResDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteGarage(Integer id) {
        Garage garage = garageRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Garage non trouvé"));
        garageRepository.delete(garage);
    }
}
