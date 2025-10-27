package com.example.historyservice.model.DTO.REQ;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class HistoryEventReqDTO {

    @NotNull(message = "roomId est obligatoire")
    private Integer roomId;

    @NotNull(message = "homeId est obligatoire")
    private Integer homeId;

    @NotBlank(message = "roomName est obligatoire")
    @Size(max = 50, message = "roomName doit contenir au maximum 50 caractères")
    private String roomName;

    @NotBlank(message = "action est obligatoire")
    @Size(max = 50, message = "action doit contenir au maximum 50 caractères")
    private String action;
}
