package com.example.garage.model.DTO.res;

import com.example.garage.model.enumm.CommandeGarage;
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




    private CommandeGarage action;

    @UpdateTimestamp
    private LocalDateTime dateAction;

    private Integer idUser;


    public CommandeGarage getAction() {
        return action;
    }

    public void setAction(CommandeGarage action) {
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
