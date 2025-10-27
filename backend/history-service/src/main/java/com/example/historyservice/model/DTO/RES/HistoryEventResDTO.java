package com.example.historyservice.model.DTO.RES;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class HistoryEventResDTO {

    private Integer idHistory;
    private LocalDateTime createdAt;
    private String roomName;
    private String action;
    private Integer roomId;
    private Integer homeId;

}
