package com.example.homeservice.service.interf;



import com.example.homeservice.model.DTO.REQ.RoomReqDTO;
import com.example.homeservice.model.DTO.RES.RoomResDTO;
import com.example.homeservice.model.entity.Room;
import com.example.homeservice.model.enumeration.TypeRoom;

import java.util.List;

public interface RoomService {

    RoomResDTO createRoom(RoomReqDTO dto);

    RoomResDTO updateRoom(Integer id, RoomReqDTO dto);

    RoomResDTO getRoomById(Integer id);

    List<RoomResDTO> getRoomsByHome(Integer homeId);

    List<RoomResDTO> findAllByIdRoomAndHome_IdHome(Integer idRoom, Integer homeId);

    List<RoomResDTO> findAllByTypeAndHome_IdHome(TypeRoom typeRoom, Integer homeId);


    void deleteRoom(Integer id);
}
