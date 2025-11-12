
import { TariffPlan, Credentials } from '../types';

/**
 * Génère une chaîne de caractères aléatoire de la longueur spécifiée.
 * @param length - La longueur de la chaîne à générer.
 * @returns Une chaîne aléatoire.
 */
const generateRandomString = (length: number): string => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

/**
 * Simule la génération de nouvelles informations d'identification utilisateur pour un forfait donné.
 * Dans une application réelle, cette fonction appellerait l'API MikroTik pour créer un nouvel utilisateur
 * dans le Hotspot et retournerait les informations d'identification générées.
 * @param plan - Le forfait tarifaire sélectionné par l'utilisateur.
 * @returns Une promesse qui se résout avec les nouvelles informations d'identification.
 */
export const generateCredentials = (plan: TariffPlan): Promise<Credentials> => {
  console.log(`Génération d'identifiants pour le forfait : ${plan.name}`);
  
  return new Promise((resolve) => {
    // Simule une latence réseau de 1.5 secondes
    setTimeout(() => {
      const credentials = {
        username: `user-${generateRandomString(4)}`,
        password: generateRandomString(6),
      };
      console.log('Identifiants générés :', credentials);
      resolve(credentials);
    }, 1500);
  });
};

/**
 * Simule la validation des informations d'identification d'un utilisateur.
 * Dans une application réelle, cela se connecterait au MikroTik (par exemple, via une API ou RADIUS)
 * pour authentifier l'utilisateur.
 * @param credentials - Les identifiants saisis par l'utilisateur.
 * @returns Une promesse qui se résout avec un booléen indiquant si la connexion a réussi.
 */
export const validateLogin = (credentials: Credentials): Promise<boolean> => {
    console.log(`Validation des identifiants :`, credentials);
    return new Promise((resolve) => {
        // Simule une latence réseau de 1 seconde
        setTimeout(() => {
            // Pour la démo, nous acceptons un utilisateur/mot de passe spécifique
            if (credentials.username === 'testuser' && credentials.password === 'testpass') {
                resolve(true);
            } else {
                resolve(false);
            }
        }, 1000);
    });
};
