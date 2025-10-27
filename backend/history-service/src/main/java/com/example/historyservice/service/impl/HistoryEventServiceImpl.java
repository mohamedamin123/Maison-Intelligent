package com.example.historyservice.service.impl;


import com.example.historyservice.model.DTO.REQ.HistoryEventReqDTO;
import com.example.historyservice.model.DTO.RES.HistoryEventResDTO;
import com.example.historyservice.model.entity.HistoryEvent;
import com.example.historyservice.model.mapper.HistoryEventMapper;
import com.example.historyservice.repository.HistoryEventRepository;
import com.example.historyservice.service.interf.HistoryEventService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HistoryEventServiceImpl implements HistoryEventService {

    private final HistoryEventRepository repository;
    private final HistoryEventMapper mapper;

    @Override
    public HistoryEventResDTO createHistoryEvent(HistoryEventReqDTO dto) {
        HistoryEvent entity = mapper.toEntity(dto);
        HistoryEvent saved = repository.save(entity);
        return mapper.toDto(saved);
    }

    @Override
    public List<HistoryEventResDTO> getAllHistoryEvents() {
        return repository.findAll()
                .stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<HistoryEventResDTO> getHistoryEventsByRoomId(Integer roomId) {
        return repository.findByRoomId(roomId)
                .stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<HistoryEventResDTO> findByHomeId(Integer homeId) {
        return repository.findByHomeId(homeId)
                .stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());    }
}
