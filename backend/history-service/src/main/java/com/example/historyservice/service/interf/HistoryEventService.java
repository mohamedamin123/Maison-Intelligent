package com.example.historyservice.service.interf;

import com.example.historyservice.model.DTO.REQ.HistoryEventReqDTO;
import com.example.historyservice.model.DTO.RES.HistoryEventResDTO;
import com.example.historyservice.model.entity.HistoryEvent;

import java.time.LocalDateTime;
import java.util.List;

public interface HistoryEventService {

    HistoryEventResDTO createHistoryEvent(HistoryEventReqDTO dto);

    List<HistoryEventResDTO> getAllHistoryEvents();

    List<HistoryEventResDTO> getHistoryEventsByRoomId(Integer roomId);

    List<HistoryEventResDTO> findByHomeId(Integer homeId);

    List<HistoryEventResDTO> findByHomeIdAndCreatedAt(Integer homeId, LocalDateTime localDateTime);

    List<HistoryEventResDTO> findByHomeIdAndRoomIdAndCreatedAtBetween(Integer roomId,Integer homeId, LocalDateTime localDateTime);

}
