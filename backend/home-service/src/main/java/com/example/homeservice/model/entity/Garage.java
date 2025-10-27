package com.example.homeservice.model.entity;

import com.example.homeservice.model.enumeration.TypeRoom;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Garage extends Room {

    private String nom;
    private float surface;


}
