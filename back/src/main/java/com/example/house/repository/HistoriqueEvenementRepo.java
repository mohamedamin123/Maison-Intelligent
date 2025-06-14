package com.example.house.repository;

import com.example.house.model.entity.HistoriqueEvenement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoriqueEvenementRepo extends JpaRepository<HistoriqueEvenement,Integer> {
    List<HistoriqueEvenement> findAllByIdUserOrderByDateActionDesc(Integer id);
}
