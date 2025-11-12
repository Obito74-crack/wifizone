# Guide de Déploiement et de Configuration du Portail Hotspot

Ce guide explique comment configurer, connecter à MikroTik, et déployer votre application de portail captif.

## 1. Introduction à l'Architecture

Ce projet est une application web "frontend" construite avec React. Elle est conçue pour être servie comme un site statique. La logique de communication avec le serveur MikroTik est actuellement simulée dans le fichier `services/mikrotikService.ts`.

Pour une utilisation en production, vous devrez créer un petit service "backend" qui agira comme un pont sécurisé entre votre portail et votre routeur MikroTik.

**Pourquoi un backend est-il nécessaire ?**
-   **Sécurité :** Exposer l'API de votre MikroTik directement sur Internet est extrêmement dangereux. Le backend agit comme un intermédiaire qui n'expose que les fonctionnalités nécessaires (créer un utilisateur, authentifier) de manière contrôlée.
-   **CORS et Accès Réseau :** Les navigateurs web ont des politiques de sécurité (CORS) qui peuvent empêcher votre site de contacter directement l'adresse IP de votre routeur. Le backend résout ce problème.

---

## 2. Configuration de la Connexion à MikroTik

Toute la logique de communication avec le serveur se trouve dans : `services/mikrotikService.ts`.

Ce fichier contient deux fonctions principales à modifier :
-   `generateCredentials(plan)`: Doit créer un nouvel utilisateur dans le Hotspot MikroTik.
-   `validateLogin(credentials)`: Doit vérifier les identifiants d'un utilisateur.

### Étapes de configuration :

#### a. Créer un service Backend
Vous pouvez utiliser la technologie de votre choix (Node.js, PHP, Python, etc.) pour créer ce service. Ce backend doit avoir deux points de terminaison (endpoints) principaux :

1.  **`POST /api/generate-user`**
    -   **Action :** Reçoit les détails d'un forfait (ex: `{ "planId": 1 }`).
    -   **Logique :** Se connecte à l'API MikroTik, crée un nouvel utilisateur dans `IP -> Hotspot -> Users` avec un profil correspondant au forfait acheté.
    -   **Réponse :** Retourne le nom d'utilisateur et le mot de passe générés au format JSON : `{ "username": "user123", "password": "xyz" }`.

2.  **`POST /api/validate-login`**
    -   **Action :** Reçoit un nom d'utilisateur et un mot de passe.
    -   **Logique :** Cette fonction est conceptuelle. L'authentification réelle se fait lorsque le portail captif soumet le formulaire de connexion directement au routeur MikroTik. Ce point de terminaison n'est donc généralement pas nécessaire si vous utilisez le mécanisme de login standard du hotspot.

#### b. Mettre à jour `mikrotikService.ts`
Une fois votre backend en place, modifiez le fichier `services/mikrotikService.ts` pour appeler vos nouvelles API.

**Exemple pour `generateCredentials` :**

```typescript
// services/mikrotikService.ts

import { TariffPlan, Credentials } from '../types';

// Remplacez l'URL par celle de votre backend
const API_BASE_URL = 'https://votre-backend.com/api';

export const generateCredentials = async (plan: TariffPlan): Promise<Credentials> => {
  console.log(`Demande d'identifiants pour le forfait : ${plan.name}`);
  
  // Remplacer la simulation par un véritable appel API
  try {
    const response = await fetch(`${API_BASE_URL}/generate-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ planId: plan.id }),
    });

    if (!response.ok) {
      throw new Error('La réponse du serveur n\'est pas OK');
    }

    const credentials = await response.json();
    console.log('Identifiants reçus du serveur :', credentials);
    return credentials;

  } catch (error) {
    console.error("Erreur lors de la génération des identifiants:", error);
    // Gérer l'erreur de manière appropriée
    throw new Error("Impossible de générer les identifiants.");
  }
};

// ... la fonction validateLogin reste principalement pour la simulation ...
```

---

## 3. Déploiement en Ligne

Comme il s'agit d'une application statique, le déploiement est très simple.

### Option A : Déploiement sur un Hébergeur Web (Netlify, Vercel, GitHub Pages)

C'est l'approche recommandée si votre backend est également hébergé en ligne.

1.  **Build de l'application :** Dans un environnement de développement standard, vous exécuteriez une commande comme `npm run build` pour générer un dossier `dist` ou `build` contenant les fichiers `index.html`, CSS et JS optimisés.
2.  **Déploiement :**
    -   **Netlify/Vercel :** Connectez votre dépôt Git pour un déploiement automatique, ou glissez-déposez simplement le dossier `build` sur leur interface.
    -   **GitHub Pages :** Configurez votre dépôt pour servir les fichiers à partir d'une branche spécifique (ex: `gh-pages`).

### Option B : Hébergement Directement sur le MikroTik

Cette méthode est possible mais peut être plus complexe à gérer.

1.  **Build de l'application :** Comme ci-dessus, générez les fichiers statiques.
2.  **Transfert des fichiers :**
    -   Connectez-vous à votre routeur MikroTik via WinBox ou FTP.
    -   Allez dans le menu `Files`.
    -   Créez un dossier pour votre portail (ex: `hotspot-mbahe`).
    -   Uploadez tous les fichiers de votre dossier `build` dans ce nouveau dossier.
3.  **Configuration du Hotspot MikroTik :**
    -   Allez dans `IP -> Hotspot`.
    -   Ouvrez l'onglet `Server Profiles` et sélectionnez le profil de votre serveur hotspot.
    -   Dans le champ `HTML Directory`, choisissez le dossier que vous venez de créer (`hotspot-mbahe`).
    -   Votre `index.html` sera maintenant la page de connexion par défaut.
