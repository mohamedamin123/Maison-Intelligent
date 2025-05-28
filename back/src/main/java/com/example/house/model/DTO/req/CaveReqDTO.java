package com.example.house.model.DTO.req;

import com.example.house.model.enumm.Etat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CaveReqDTO {

    private Integer idCave;

    private float tmp;
    private float hmd;
    private boolean mvt;

    private String name;
    private Etat etat;
    private Etat lumiere;

    private Integer idUser;

    public Integer getIdCave() {
        return idCave;
    }

    public void setIdCave(Integer idCave) {
        this.idCave = idCave;
    }

    public float getTmp() {
        return tmp;
    }

    public void setTmp(float tmp) {
        this.tmp = tmp;
    }

    public float getHmd() {
        return hmd;
    }

    public void setHmd(float hmd) {
        this.hmd = hmd;
    }

    public boolean isMvt() {
        return mvt;
    }

    public void setMvt(boolean mvt) {
        this.mvt = mvt;
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
