package com.example.house.model.DTO.req;

import com.example.house.model.enumm.Commande;
import com.example.house.model.enumm.Element;
import com.example.house.model.enumm.TypePiece;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class HistoriqueEvenementReqDTO {


    private Integer idHistorique;

    private TypePiece type;

    private Commande action;
    private Element element;

    @UpdateTimestamp
    private LocalDateTime dateAction;

    private Integer idUser;

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
}
