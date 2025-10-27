package com.example.homeservice.repository;

import com.example.homeservice.model.entity.Home;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HomeRepository extends JpaRepository<Home,Integer> {

    //List<Home> findHomeByIdUser(Integer id);

}
