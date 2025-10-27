package com.example.userservice.model.entity;

import com.example.userservice.model.enumeration.Role;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "users",
        indexes = {
                @Index(name = "idx_email", columnList = "email"),
                @Index(name = "idx_tel", columnList = "telephone"),
        })
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idUser;

    @Column(name = "nom", nullable = false)
    private String nom;

    @Column(name = "prenom", nullable = false)
    private String prenom;

    @Column(name = "telephone", nullable = false,unique = true)
    private String tel;

    @Column(name = "date_de_naissance", nullable = false)
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dateNaissance;


    @Column(name="email" ,nullable = false,unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(nullable = false)
    private Boolean statut = true;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;

//    @Column(name = "id_home", nullable = false)
//    private Integer idHome;



    @JsonIgnore
    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @JsonIgnore
    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public String getFullName() {
        return this.prenom + " "+this.nom;
    }

}

