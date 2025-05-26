package com.example.garage.model.entity;

import com.example.garage.model.enumm.Commande;
import com.example.garage.model.enumm.Element;
import com.example.garage.model.enumm.TypePiece;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
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

    @JsonBackReference("garage_user")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_user", insertable = false, updatable = false)
    private User user;

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
