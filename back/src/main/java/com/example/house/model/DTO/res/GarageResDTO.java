package com.example.house.model.DTO.res;

import com.example.house.model.enumm.Etat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class GarageResDTO {
    private Integer idGarage;

    private String name;
    private Etat etat;
    private int nbrVehicule;
    private Etat lumiere;

    private Integer idUser;


    public Etat getLumiere() {
        return lumiere;
    }

    public void setLumiere(Etat lumiere) {
        this.lumiere = lumiere;
    }

    public Integer getIdGarage() {
        return idGarage;
    }

    public void setIdGarage(Integer idGarage) {
        this.idGarage = idGarage;
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

    public int getNbrVehicule() {
        return nbrVehicule;
    }

    public void setNbrVehicule(int nbrVehicule) {
        this.nbrVehicule = nbrVehicule;
    }

    public Integer getIdUser() {
        return idUser;
    }

    public void setIdUser(Integer idUser) {
        this.idUser = idUser;
    }
}
