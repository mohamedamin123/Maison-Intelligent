package com.example.garage.repository;

import com.example.garage.model.entity.Garage;
import com.example.garage.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GarageRepo extends JpaRepository<Garage,Integer> {

    Optional<Garage> findGarageByIdUser(Integer id);

}
