package com.example.house.model.DTO.res;

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
public class HistoriqueEvenementResDTO {




    private Commande action;

    private TypePiece type;


    @UpdateTimestamp
    private LocalDateTime dateAction;
    private Element element;

    private Integer idUser;

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
