package com.example.house.model.entity;

import com.example.house.model.enumm.Etat;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@MappedSuperclass
public abstract class Espace {

    @NotBlank(message = "Le nom est obligatoire")
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "etat", nullable = false)
    private Etat etat = Etat.FERMER;

    @Column(name = "lumiere", nullable = false)
    private Etat lumiere =  Etat.FERMER;

    @Column(name = "id_user", nullable = false)
    @NotNull
    private Integer idUser;

    @JsonBackReference("espace_user")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_user", insertable = false, updatable = false)
    private User user;

    public void changerEtat(boolean estOuvert) {
        this.etat = estOuvert ? Etat.OUVERT : Etat.FERMER;
    }

    public void changerLumiere(boolean allumee) {
        this.etat = allumee ? Etat.OUVERT : Etat.FERMER;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Etat getEtat() {
        return etat;
    }

    public void setEtat(Etat etat) {
        this.etat = etat;
    }

    public Etat getLumiere() {
        return lumiere;
    }

    public void setLumiere(Etat lumiere) {
        this.lumiere = lumiere;
    }

    public Integer getIdUser() {
        return idUser;
    }

    public void setIdUser(Integer idUser) {
        this.idUser = idUser;
    }


}
