package com.example.garage.model.entity;

import com.example.garage.model.enumm.EtatGarage;
import com.example.garage.model.enumm.Role;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table()
public class Garage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column()
    private Integer idGarage;

    @NotBlank(message = "Le name est obligatoire")
    @Column(name = "name", nullable = false)
    private String name;


    @Column(name = "etat", nullable = false)
    private EtatGarage etat=EtatGarage.FERMER;

    @Column(name = "lumiere", nullable = false)
    private boolean lumiere = false;

    @Min(value = 0, message = "Le nombre de véhicules doit être supérieur ou égal à 0")
    @Column(name = "nbrVehicule", nullable = false)
    private int nbrVehicule;


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

    @JsonBackReference("garage_user")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_user", insertable = false, updatable = false)
    private User user;

    public void changerEtatGarage(boolean estOuvert) {
        if (estOuvert) {
            System.out.println("Le garage est ouvert");
            this.etat = EtatGarage.OUVERT;
        } else {
            System.out.println("Le garage est fermé");
            this.etat = EtatGarage.FERMER;
        }
    }

    public void changerLumiere(boolean allumee) {
        this.lumiere = allumee;
        System.out.println("Lumière " + (allumee ? "allumée" : "éteinte"));
    }


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

    @Override
    public String toString() {
        return "Garage{" +
                "idGarage=" + idGarage +
                ", etat=" + etat +
                ", nbrVehicule=" + nbrVehicule +
                '}';
    }
}
