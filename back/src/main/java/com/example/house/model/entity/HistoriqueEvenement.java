package com.example.house.model.entity;

import com.example.house.model.enumm.Commande;
import com.example.house.model.enumm.Element;
import com.example.house.model.enumm.TypePiece;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table()
public class HistoriqueEvenement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column()
    private Integer idHistorique;

    @Column(name = "action", nullable = false)
    private Commande action;

    @Column(name = "type", nullable = false)
    private TypePiece type;

    @Column(name = "element", nullable = false)
    private Element element;

    @Column(name = "date_action")
    @UpdateTimestamp
    private LocalDateTime dateAction;


    @Column(name = "id_user")
    private Integer idUser;

    @Column(name = "id_garage")
    private Integer idGarage;

    @Column(name = "id_cave")
    private Integer idCave;

    @JsonBackReference("historique_user")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_user", insertable = false, updatable = false)
    private User user;

    @JsonBackReference("historique_garage")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_garage", insertable = false, updatable = false)
    private Garage garage;

    @JsonBackReference("historique_cave")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cave", insertable = false, updatable = false)
    private Cave cave;
    public Integer getIdHistorique() {
        return idHistorique;
    }

    public void setIdHistorique(Integer idHistorique) {
        this.idHistorique = idHistorique;
    }

    public Element getElement() {
        return element;
    }

    public void setElement(Element element) {
        this.element = element;
    }

    public TypePiece getType() {
        return type;
    }

    public void setType(TypePiece type) {
        this.type = type;
    }

    public Commande getAction() {
        return action;
    }

    public void setAction(Commande action) {
        this.action = action;
    }

    public LocalDateTime getDateAction() {
        return dateAction;
    }

    public void setDateAction(LocalDateTime dateAction) {
        this.dateAction = dateAction;
    }

    public Integer getIdUser() {
        return idUser;
    }

    public void setIdUser(Integer idUser) {
        this.idUser = idUser;
    }

    @Override
    public String toString() {
        return "HistoriqueEvenement{" +
                "idHistorique=" + idHistorique +
                ", action=" + action +
                ", dateAction=" + dateAction +
                '}';
    }
}
