package com.example.homeservice.service.impl;

import com.example.homeservice.model.DTO.REQ.RoomReqDTO;
import com.example.homeservice.model.DTO.RES.RoomResDTO;
import com.example.homeservice.model.entity.Home;
import com.example.homeservice.model.entity.Room;
import com.example.homeservice.model.enumeration.TypeRoom;
import com.example.homeservice.repository.RoomRepository;
import com.example.homeservice.repository.HomeRepository;
import com.example.homeservice.model.mapper.RoomMapper;
import com.example.homeservice.service.interf.RoomService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final HomeRepository homeRepository;
    private final RoomMapper roomMapper;

    @Override
    public RoomResDTO createRoom(RoomReqDTO dto) {
        // Récupération de la maison
        Home home = homeRepository.findById(dto.getHomeId())
                .orElseThrow(() -> new EntityNotFoundException("Maison non trouvée"));

        // Mapping DTO → Entité
        Room room = roomMapper.toEntity(dto);
        room.setHome(home); // ✅ Liaison essentielle

        // Sauvegarde
        Room saved = roomRepository.save(room);

        // Mapping Entité → DTO Réponse
        return roomMapper.toResDTO(saved);
    }

    @Override
    public RoomResDTO updateRoom(Integer id, RoomReqDTO dto) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("room non trouvé"));

        Home home = homeRepository.findById(dto.getHomeId())
                .orElseThrow(() -> new EntityNotFoundException("Maison non trouvée"));

        // Mise à jour des champs statiques
        room.setNom(dto.getNom());
        room.setSurface(dto.getSurface());
        room.setHome(home);

        Room updated = roomRepository.save(room);
        return roomMapper.toResDTO(updated);
    }

    @Override
    public RoomResDTO getRoomById(Integer id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("room non trouvé"));
        return roomMapper.toResDTO(room);
    }

    @Override
    public List<RoomResDTO> getRoomsByHome(Integer homeId) {
        List<Room> garages = roomRepository.findAllByHome_IdHome(homeId);
        return garages.stream()
                .map(roomMapper::toResDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<RoomResDTO> findAllByIdRoomAndHome_IdHome(Integer idRoom, Integer homeId) {
        List<Room> garages = roomRepository.findAllByIdRoomAndHome_IdHome(idRoom,homeId);
        return garages.stream()
                .map(roomMapper::toResDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<RoomResDTO> findAllByTypeAndHome_IdHome(TypeRoom typeRoom, Integer homeId) {
        List<Room> garages = roomRepository.findAllByTypeAndHome_IdHome(typeRoom,homeId);
        return garages.stream()
                .map(roomMapper::toResDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteRoom(Integer id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("room non trouvé"));
        roomRepository.delete(room);
    }
}
