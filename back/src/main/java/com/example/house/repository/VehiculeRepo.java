package com.example.house.repository;

import com.example.house.model.entity.Vehicule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehiculeRepo extends JpaRepository<Vehicule,Integer> {

    List<Vehicule> findAllByIdGarage(Integer idGarage);
    List<Vehicule> findAllByIdUser(Integer idUser);


}
