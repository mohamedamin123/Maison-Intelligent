package com.example.house.service.impl;

import com.example.house.model.DTO.req.NotificationReqDTO;
import com.example.house.model.DTO.res.NotificationResDTO;
import com.example.house.model.entity.Notification;
import com.example.house.model.mapper.NotificationMapper;
import com.example.house.repository.NotificationRepo;
import com.example.house.service.interf.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Primary
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepo repository;
    private final NotificationMapper mapper;

    @Override
    public NotificationResDTO save(NotificationReqDTO req) {
        Notification emp = mapper.toEntity(req);
        repository.save(emp);
        return mapper.toResDTO(emp);
    }

    @Override
    public NotificationResDTO update(Integer id, NotificationReqDTO req) {
        Notification existingUser = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id " + id));

        if (req.getDateEnvoi() != null) existingUser.setDateEnvoi(req.getDateEnvoi());
        if (req.getMessage() != null) existingUser.setMessage(req.getMessage());
        if (req.getType() != null) existingUser.setType(req.getType());
        Notification updatedUser = repository.save(existingUser);

        return mapper.toResDTO(updatedUser);
    }



    @Override
    public List<NotificationResDTO> findAll() {
        List<Notification> users = this.repository.findAll();
        return mapper.toAllResDTO(users);
    }

    @Override
    public Optional<NotificationResDTO> findById(Integer id) {
        Optional<Notification> optional = this.repository.findById(id);
        if (optional.isPresent()) {
            NotificationResDTO MedecinResDTO = mapper.toResDTO(optional.get());
            return Optional.of(MedecinResDTO);
        } else {
            return Optional.empty();
        }
    }



    @Override
    public boolean delete(NotificationReqDTO req) {
        Integer id = req.getIdNotification(); // Si disponible
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
