package com.example.house.service.interf;

import com.example.house.model.DTO.req.NotificationReqDTO;
import com.example.house.model.DTO.res.NotificationResDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface NotificationService {

    NotificationResDTO save(NotificationReqDTO req);

    NotificationResDTO update(Integer id,NotificationReqDTO req);

    List<NotificationResDTO> findAll();


    Optional<NotificationResDTO> findById(Integer id) ;

    boolean delete(NotificationReqDTO req);
    boolean deleteById(Integer id);


}
