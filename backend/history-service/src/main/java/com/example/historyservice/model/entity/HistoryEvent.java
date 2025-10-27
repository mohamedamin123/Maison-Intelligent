package com.example.historyservice.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "history_event",
        indexes = {
                @Index(name = "idx_room_id", columnList = "roomId"),
                @Index(name = "idx_home_id", columnList = "homeId"),
                @Index(name = "idx_created_at", columnList = "createdAt")
        }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistoryEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idHistory;

    // 🔹 Date et heure de création automatiques
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private String roomName;

    private String action;

    private Integer roomId;

    // 🔹 Ajout du homeId pour relier à la maison
    private Integer homeId;
}
