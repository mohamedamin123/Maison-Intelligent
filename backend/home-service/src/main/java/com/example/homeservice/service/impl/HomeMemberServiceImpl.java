package com.example.homeservice.service.impl;

import com.example.homeservice.model.DTO.REQ.HomeMemberDTOReq;
import com.example.homeservice.model.DTO.RES.HomeMemberDTORes;
import com.example.homeservice.model.entity.Home;
import com.example.homeservice.model.entity.HomeMember;
import com.example.homeservice.model.mapper.HomeMemberMapper;
import com.example.homeservice.repository.HomeMemberRepository;
import com.example.homeservice.repository.HomeRepository;
import com.example.homeservice.service.interf.HomeMemberService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class HomeMemberServiceImpl implements HomeMemberService {

    private final HomeMemberRepository homeMemberRepository;
    private final HomeRepository homeRepository; // ✅ on l’ajoute ici
    private final HomeMemberMapper homeMapper;



    @Override
    public HomeMemberDTORes createHomeMember(HomeMemberDTOReq dtoReq) {

        // 🔍 1️⃣ Récupération de la maison associée
        Home home = homeRepository.findById(dtoReq.getHomeId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Maison introuvable avec ID " + dtoReq.getHomeId()
                ));

        // 🏗️ 2️⃣ Création de l’entité HomeMember
        HomeMember homeMember = HomeMember.builder()
                .userId(dtoReq.getUserId())
                .home(home) // ✅ on assigne l’objet Home ici
                .build();

        // 💾 3️⃣ Sauvegarde
        HomeMember saved = homeMemberRepository.save(homeMember);

        // 🔁 4️⃣ Conversion en DTO
        return homeMapper.toDTO(saved);
    }

    @Override
    public List<HomeMemberDTORes> getAllHomeMember() {
        return homeMemberRepository.findAll()
                .stream()
                .map(homeMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public HomeMemberDTORes getHomeMemberById(Integer idHome) {
        HomeMember home = homeMemberRepository.findById(idHome)
                .orElseThrow(() -> new EntityNotFoundException("Maison avec ID " + idHome + " introuvable."));
        return homeMapper.toDTO(home);
    }

    @Override
    public List<HomeMemberDTORes> findByUserId(Integer userId) {
        return homeMemberRepository.findByUserId(userId)
                .stream()
                .map(homeMapper::toDTO)
                .collect(Collectors.toList());
    }


    @Override
    public void deleteHomeMember(Integer idHome) {
        if (!homeMemberRepository.existsById(idHome)) {
            throw new EntityNotFoundException("Maison avec ID " + idHome + " introuvable.");
        }
        homeMemberRepository.deleteById(idHome);
    }
}
