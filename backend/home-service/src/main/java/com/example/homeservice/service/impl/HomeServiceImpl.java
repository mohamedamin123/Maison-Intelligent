package com.example.homeservice.service.impl;

import com.example.homeservice.model.DTO.REQ.HomeDTOReq;
import com.example.homeservice.model.DTO.RES.HomeDTORes;
import com.example.homeservice.model.DTO.RES.HomeMemberDTORes;
import com.example.homeservice.model.entity.Home;
import com.example.homeservice.model.entity.HomeMember;
import com.example.homeservice.model.mapper.HomeMapper;
import com.example.homeservice.model.mapper.HomeMemberMapper;
import com.example.homeservice.repository.HomeMemberRepository;
import com.example.homeservice.repository.HomeRepository;
import com.example.homeservice.service.interf.HomeService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HomeServiceImpl implements HomeService {

    private final HomeRepository homeRepository;
    private final HomeMapper homeMapper;
    private final HomeMemberRepository homeMemberRepository;
    private final HomeMemberMapper homeMemberMapper;

    @Override
    public HomeDTORes createHome(HomeDTOReq dtoReq) {
        Home home = homeMapper.toEntity(dtoReq);
        Home saved = homeRepository.save(home);
        return homeMapper.toDTO(saved);
    }

    @Override
    public List<HomeDTORes> getAllHomes() {
        return homeRepository.findAll().stream()
                .map(home -> {
                    HomeDTORes dto = homeMapper.toDTO(home);

                    // Récupère la liste des HomeMember pour cette maison (peut être vide)
                    List<HomeMember> members = homeMemberRepository.findAllByHome_IdHome(home.getIdHome());

                    // Convertit la liste d'entités en DTOs (si la liste est vide, on aura une liste vide)
                    List<HomeMemberDTORes> memberDTOs =
                            members.stream()
                                    .map(homeMemberMapper::toDTO)
                                    .collect(Collectors.toList());

                    dto.setHomeMember(memberDTOs);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public HomeDTORes getHomeById(Integer idHome) {
        Home home = homeRepository.findById(idHome)
                .orElseThrow(() -> new EntityNotFoundException("Maison avec ID " + idHome + " introuvable."));
        return homeMapper.toDTO(home);
    }

    @Override
    public void deleteHome(Integer idHome) {
        if (!homeRepository.existsById(idHome)) {
            throw new EntityNotFoundException("Maison avec ID " + idHome + " introuvable.");
        }
        homeRepository.deleteById(idHome);
    }
}
