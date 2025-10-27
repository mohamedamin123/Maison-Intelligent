package com.example.homeservice.repository;

import com.example.homeservice.model.entity.HomeMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HomeMemberRepository extends JpaRepository<HomeMember, Integer> {
    List<HomeMember> findByUserId(Integer userId);
    List<HomeMember> findAllByHome_IdHome(Integer homeId);

    Optional<HomeMember> findOneByHome_IdHome(Integer homeId);


}