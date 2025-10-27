// src/utils/authValidation.js

/**
 * Vérifie le format de l'email.
 */
export function isEmailFormatValid(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Valide les champs email et mot de passe
 * Retourne un objet contenant les erreurs éventuelles
 */
export function validateCredentials(email, password) {
  const errors = {};

  if (!email.trim()) {
    errors.email = "L'email est obligatoire.";
  } else if (!isEmailFormatValid(email)) {
    errors.email = "Format d'email invalide.";
  }

  if (!password.trim()) {
    errors.password = "Le mot de passe est obligatoire.";
  } else if (password.length < 6) {
    errors.password = "Le mot de passe doit contenir au moins 6 caractères.";
  }

  return errors;
}

/**
 * Simule une vérification sur le serveur
 * (ici tu pourrais remplacer par un appel API ou Firebase)
 */
export function checkUserExists(email, password) {
  // Exemple de comptes simulés
  const users = [
    { email: 'admin@smartfarm.com', password: '123456' },
    { email: 'user@smartfarm.com', password: 'abcdef' },
  ];

  return users.some(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password === password
  );
}
