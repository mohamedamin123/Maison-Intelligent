package com.example.historyservice.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Exception personnalisée levée lorsqu'un utilisateur essaie de s'inscrire
 * avec un email ou un numéro de téléphone déjà existant.
 *
 * 🔹 Utilisée dans AuthServiceImpl.save()
 * 🔹 Renvoie automatiquement une réponse HTTP 409 (Conflict)
 */
@Getter
@ResponseStatus(HttpStatus.CONFLICT)
public class HomeException extends RuntimeException {

    private final String field; // ex: "email" ou "tel"

    /**
     * Constructeur simple avec message.
     * @param message Message d'erreur détaillé.
     */
    public HomeException(String message) {
        super(message);
        this.field = null;
    }

    /**
     * Constructeur détaillé indiquant le champ en conflit.
     * @param field Champ concerné (email, téléphone, etc.)
     * @param value Valeur du champ (pour logs ou traçabilité)
     */
    public HomeException(String field, String value) {
        super(String.format("L'utilisateur avec %s '%s' existe déjà.", field, value));
        this.field = field;
    }

}
