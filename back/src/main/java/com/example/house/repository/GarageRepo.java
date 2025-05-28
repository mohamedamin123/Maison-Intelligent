package com.example.house.repository;

import com.example.house.model.entity.Garage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GarageRepo extends JpaRepository<Garage,Integer> {

    Optional<Garage> findGarageByIdUser(Integer id);

}
