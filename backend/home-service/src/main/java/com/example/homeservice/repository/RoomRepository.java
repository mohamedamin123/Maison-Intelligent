package com.example.homeservice.repository;

import com.example.homeservice.model.entity.Room;
import com.example.homeservice.model.enumeration.TypeRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {

    // Liste des garages par maison
    List<Room> findAllByHome_IdHome(Integer homeId);

    List<Room> findAllByTypeAndHome_IdHome(TypeRoom typeRoom, Integer homeId);
    List<Room> findAllByIdRoomAndHome_IdHome(Integer idRoom, Integer homeId);
}
