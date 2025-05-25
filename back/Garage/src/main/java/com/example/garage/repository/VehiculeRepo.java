package com.example.garage.repository;

import com.example.garage.model.entity.Garage;
import com.example.garage.model.entity.Vehicule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehiculeRepo extends JpaRepository<Vehicule,Integer> {


}
