package com.example.garage.model.DTO.req;

import com.example.garage.model.enumm.EtatGarage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class GarageReqDTO {


    private Integer idGarage;
    private EtatGarage etat=EtatGarage.FERMER;
    private int nbrVehicule;
    private String name;
    private boolean lumiere = false;

    private Integer idUser;


    public boolean isLumiere() {
        return lumiere;
    }

    public void setLumiere(boolean lumiere) {
        this.lumiere = lumiere;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getIdGarage() {
        return idGarage;
    }

    public void setIdGarage(Integer idGarage) {
        this.idGarage = idGarage;
    }

    public EtatGarage getEtat() {
        return etat;
    }

    public void setEtat(EtatGarage etat) {
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
