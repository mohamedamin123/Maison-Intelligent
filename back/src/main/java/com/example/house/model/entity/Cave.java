package com.example.house.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "cave")
public class Cave extends Espace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cave")
    private Integer idCave;

    @Column(name = "temperature")
    private float tmp;

    @Column(name = "humidite")
    private float hmd;

    @Column(name = "mouvement")
    private boolean mvt;

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

    @Override
    public String toString() {
        return "Cave{" +
                "idCave=" + idCave +
                ", tmp=" + tmp +
                ", hmd=" + hmd +
                ", mvt=" + mvt +
                '}';
    }
}
