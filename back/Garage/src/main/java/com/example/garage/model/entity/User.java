package com.example.garage.model.entity;

import com.example.garage.model.enumm.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column()
    private Integer idUser;

    @NotBlank(message = "Le nom est obligatoire")
    @Column(name = "nom", nullable = false)
    private String nom;

    @NotBlank(message = "Le prenom est obligatoire")
    @Column(name = "prenom", nullable = false)
    private String prenom;

    @NotBlank(message = "Le numéro de téléphone est obligatoire")
    @Size(min = 8, max = 8,message = "Le numéro de téléphone est invalide")
    @Column(name = "telephone", nullable = false)
    private String tel;

    @Past(message = "La date de naissance doit être dans le passé")
    @NotNull(message = "La date de naissance est obligatoire")
    private LocalDate dateNaissance;

    @Column(nullable = false)
    @NotNull(message = "Le statut est obligatoire")
    private Boolean statut = true;


    @Enumerated(EnumType.STRING)
    @NotNull(message = "Le rôle est obligatoire")
    private Role role = Role.UTILISATEUR;


    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "L'email est invalide")
    @Column(nullable=false)
    private String email;


    @Column(name = "password", nullable = false)
    @NotBlank(message = "Le mot de passe est obligatoire")
    @Size(min = 8, message = "Le mot de passe doit contenir au moins 8 caractères")
    private String password;

    @JsonIgnore
    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @JsonIgnore
    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;



    public User(String nom, String prenom, LocalDate dateNaissance,String tel, String email, String password) {
        this.nom = nom;
        this.prenom = prenom;
        this.dateNaissance = dateNaissance;
        this.tel=tel;
        this.statut=true;
        this.role=Role.UTILISATEUR;
        this.email = email;
        this.password = password;
    }


    public Integer getIdUser() {
        return idUser;
    }

    public void setIdUser(Integer idUser) {
        this.idUser = idUser;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public LocalDate getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(LocalDate dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public Boolean getStatut() {
        return statut;
    }

    public void setStatut(Boolean statut) {
        this.statut = statut;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @JsonIgnore
    public String getFullName() {
        return this.prenom +" "+this.nom;
    }
    @JsonIgnore
    public int getAge() {
        if (this.dateNaissance == null) {
            return 0; // ou -1 pour signaler une date invalide
        }
        return Period.between(this.dateNaissance, LocalDate.now()).getYears();
    }


    @Override
    public String toString() {
        return "User{" +
                "idUser='" + idUser + '\'' +
                ", nom='" + nom + '\'' +
                ", prenom='" + prenom + '\'' +
                ", tel='" + tel + '\'' +
                ", dateNaissance=" + dateNaissance +
                ", role=" + role +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +

                '}';
    }
}
