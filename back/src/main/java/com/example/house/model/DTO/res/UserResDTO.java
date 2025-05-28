package com.example.house.model.DTO.res;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.Period;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class UserResDTO {
    private Integer idUser;

    private String nom;
    private String prenom;
    private String tel;
    private String email;
    private LocalDate dateNaissance;
    private Boolean statut;

    public UserResDTO(String nom, String prenom, String tel, String email, LocalDate dateNaissance) {
        this.nom=nom;
        this.prenom=prenom;
        this.tel=tel;
        this.email=email;
        this.dateNaissance=dateNaissance;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    @JsonIgnore
    public String getFullName() {

        return this.prenom + " " + this.nom;
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
        return "UserResDTO{" +
                "nom='" + nom + '\'' +
                ", prenom='" + prenom + '\'' +
                ", tel='" + tel + '\'' +
                ", email='" + email + '\'' +
                ", dateDeNaissance=" + dateNaissance +
                '}';
    }
}
