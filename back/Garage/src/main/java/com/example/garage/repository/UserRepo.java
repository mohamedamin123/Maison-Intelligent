package com.example.garage.repository;

import com.example.garage.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
@Repository
public interface UserRepo extends JpaRepository<User,Integer> {

    Optional<User> findUserByEmail(String email);
    Optional<User> findUserByTel(String tel);



    @Modifying
    @Query("update User e set e.password = :password where e.email = :email")
    int updatePasswordByEmail(@Param("email") String email, @Param("password") String password);


}
