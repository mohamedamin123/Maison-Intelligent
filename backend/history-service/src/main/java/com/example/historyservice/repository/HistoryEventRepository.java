package com.example.historyservice.repository;

import com.example.historyservice.model.entity.HistoryEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryEventRepository extends JpaRepository<HistoryEvent, Integer> {
    // Tu peux ajouter des méthodes personnalisées si besoin, par exemple :
     List<HistoryEvent> findByRoomId(Integer roomId);
    List<HistoryEvent> findByHomeId(Integer homeId);

}
