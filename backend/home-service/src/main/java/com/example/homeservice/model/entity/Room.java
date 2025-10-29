// Room.java
package com.example.homeservice.model.entity;

import com.example.homeservice.model.enumeration.TypeRoom;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idRoom;

    private String nom;
    private float surface;

    @Enumerated(EnumType.STRING)
    private TypeRoom type; // Exemple : GARAGE, CHAMBRE, SALON, etc.

    @JsonBackReference("home_rooms")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "home_id", nullable = false)
    private Home home;




}
