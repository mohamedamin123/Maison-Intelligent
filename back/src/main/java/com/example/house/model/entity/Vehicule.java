package com.example.house.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table()
public class Vehicule {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column()
    private Integer idVehicule;

    @NotBlank(message = "Le matricule est obligatoire")
    @Column(name = "matricule", nullable = false)
    private String matricule;

    @Column(name = "marque", nullable = true)
    private String marque;

    @Column(name = "modele", nullable = true)
    private String modele;


    @Column(name = "est_dans_garage", nullable = true)
    private boolean estDansGarage;



    @CreationTimestamp
    @Column(name = "created_at")
    @JsonIgnore
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    @JsonIgnore
    private LocalDateTime updatedAt;

    @Column(name = "id_user")
    @NotNull
    private Integer idUser;

    @Column(name = "id_garage")
    private Integer idGarage;

    @JsonBackReference("vehicule_garage")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_garage", insertable = false, updatable = false)
    private Garage garage;



    @JsonBackReference("vehicule_user")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_user", insertable = false, updatable = false)
    private User user;


    public Vehicule(String matricule) {
        this.matricule = matricule;
    }

    public Integer getIdUser() {
        return idUser;
    }

    public void setIdUser(Integer idUser) {
        this.idUser = idUser;
    }

    public boolean isEstDansGarage() {
        return estDansGarage;
    }

    public void setEstDansGarage(boolean estDansGarage) {
        this.estDansGarage = estDansGarage;
    }

    public Integer getIdVehicule() {
        return idVehicule;
    }

    public void setIdVehicule(Integer idVehicule) {
        this.idVehicule = idVehicule;
    }

    public String getMatricule() {
        return matricule;
    }

    public void setMatricule(String matricule) {
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

    @Override
    public String toString() {
        return "Vehicule{" +
                "idVehicule=" + idVehicule +
                ", matricule=" + matricule +
                ", marque='" + marque + '\'' +
                ", modele='" + modele + '\'' +
                '}';
    }
}
