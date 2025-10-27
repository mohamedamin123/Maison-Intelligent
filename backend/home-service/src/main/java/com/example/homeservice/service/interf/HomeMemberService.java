package com.example.homeservice.service.interf;

import com.example.homeservice.model.DTO.REQ.HomeMemberDTOReq;
import com.example.homeservice.model.DTO.RES.HomeMemberDTORes;

import java.util.List;

public interface HomeMemberService {

    HomeMemberDTORes createHomeMember(HomeMemberDTOReq dtoReq);

    List<HomeMemberDTORes> getAllHomeMember();

    HomeMemberDTORes getHomeMemberById(Integer idHomeMember);

    List<HomeMemberDTORes> findByUserId(Integer userId);

    void deleteHomeMember(Integer idHomeMember);
}
