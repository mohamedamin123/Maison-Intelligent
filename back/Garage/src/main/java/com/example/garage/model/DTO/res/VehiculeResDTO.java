package com.example.garage.model.DTO.res;

import com.example.garage.model.enumm.EtatGarage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class VehiculeResDTO {



    private EtatGarage matricule;

    private String marque;

    private String modele;
    private Integer idGarage;


    public VehiculeResDTO(EtatGarage matricule) {
        this.matricule = matricule;
    }


    public EtatGarage getMatricule() {
        return matricule;
    }

    public void setMatricule(EtatGarage matricule) {
        this.matricule = matricule;
    }

    public String getMarque() {
        return marque;
    }

    public void setMarque(String marque) {
        this.marque = marque;
    }

    public String getModele() {
        return modele;
    }

    public void setModele(String modele) {
        this.modele = modele;
    }

    public Integer getIdGarage() {
        return idGarage;
    }

    public void setIdGarage(Integer idGarage) {
        this.idGarage = idGarage;
    }
}
