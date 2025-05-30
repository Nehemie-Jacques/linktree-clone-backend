
# 📎 LinkTree Clone - Backend API

Ce projet est un clone simplifié de LinkTree, permettant à des utilisateurs de créer un profil public contenant leurs liens sociaux. Il est entièrement développé avec **Node.js** et **Express.js** et utilise la base de données MONGODB pour le stockage des données.

---

## ✅ Fonctionnalités principales

### 👤 Utilisateur
- 🔐 Inscription et connexion
- 📝 Création et mise à jour du profil
- 🔗 Ajout, modification et suppression de liens affiliés
- 👁️ Affichage du profil public
- ❌ Suppression de son compte
- 🔄 Authentification via JSON Web Tokens (JWT)

### 🛠️ Administrateur
- 🔐 Connexion admin
- 👁️ Voir la liste de tous les utilisateurs
- 🧑‍💻 Modifier ou supprimer un utilisateur
- ➕ Ajouter un utilisateur manuellement
- 👁️ Voir le profil complet d’un utilisateur

---

## 🧱 Structure du projet

```
.
├── app.js
├── controllers
│   ├── adminController.js
│   ├── authController.js
│   └── userController.js
├── data
│   └── users.json
├── events
│   └── userEvents.js
├── explication.txt
├── middlewares
│   ├── auth.js
│   ├── isAdmin.js
│   └── upload.js
├── models
│   └── userModel.js
├── node_modules
├── package.json
├── package-lock.json
├── README.md
├── routes
│   ├── adminRoutes.js
│   ├── authRoutes.js
│   └── userRoutes.js
├── uploads
│   └── avatars
└── utils
    └── helpers.js

````

---

## 🚀 Lancement du projet

### 📦 Installation
```bash
git clone https://github.com/Nehemie-Jacques/linktree-clone-backend.git
cd linktree-backend
npm install
````

### ▶️ Démarrer le serveur

```bash
npm start
```

## 📡 Routes principales

### 🔐 Authentification Utilisateur

* `POST /api/users/register`
* `POST /api/users/login`
* `GET /api/users/me` *(profil personnel via token)*
* `PUT /api/users/me` *(mise à jour profil)*
* `DELETE /api/users/me`
* `GET /api/users/:id` *(profil public)*

### 🔐 Administration

* `POST /api/admin/login`
* `GET /api/admin/users`
* `GET /api/admin/users/:id`
* `PUT /api/admin/users/:id`
* `DELETE /api/admin/users/:id`
* `POST /api/admin/users`

---

## 🔧 Technologies utilisées

* **Node.js**
* **MongoDB**
* **Express.js**
* **TailwindCSS** (prévu pour le frontend)
* **JavaScript**
* **JWT** pour l'authentification
* **bcrypt** pour le hachage des mots de passe
* **uuid** pour générer des IDs uniques

---

## 🔒 Sécurité

* Les mots de passe sont hachés avec `bcrypt`.
* Authentification basée sur JWT.
* Accès protégé pour les routes sensibles avec un middleware d’authentification.

---

## ✍️ Auteur

> Ce projet est réalisé par \[Néhémie] dans le cadre de mon apprentissage du développement web fullstack.

---

## 📄 Licence

Ce projet est sous licence libre à usage éducatif.

```