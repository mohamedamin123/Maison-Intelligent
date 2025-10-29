package com.example.homeservice.repository;

import com.example.homeservice.model.entity.Garage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GarageRepository extends JpaRepository<Garage, Integer> {

    // Liste des garages par maison
    List<Garage> findAllByHome_IdHome(Integer homeId);
    List<Garage> findAllByIdRoomAndHome_IdHome(Integer idRoom, Integer homeId);
}
