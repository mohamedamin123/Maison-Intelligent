package com.example.garage.repository;

import com.example.garage.model.entity.Garage;
import com.example.garage.model.entity.Vehicule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VehiculeRepo extends JpaRepository<Vehicule,Integer> {

    List<Vehicule> findAllByIdGarage(Integer idGarage);
    List<Vehicule> findAllByIdUser(Integer idUser);


}
