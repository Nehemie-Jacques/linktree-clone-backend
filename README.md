```markdown
# 📎 LinkTree Clone - Backend (Partie Administrateur)

Un backend Node.js/Express.js simple et structuré pour gérer les utilisateurs d’un clone de LinkTree.  
Les données sont stockées dans **MongoDB** à l'aide de **Mongoose**.  
Les administrateurs peuvent ajouter, consulter, modifier ou supprimer des utilisateurs via une API RESTful.

---

## 🚀 Fonctionnalités principales

- 🔐 Connexion sécurisée à MongoDB
- 👥 Création, lecture, mise à jour et suppression d'utilisateurs
- 🔁 Gestion des mots de passe (hachage avec `bcrypt`)
- 📦 Architecture modulaire (routes, contrôleurs, modèles)
- 🧪 Test des routes avec Insomnia/Postman
- 🛠 API REST complète pour l'administration des utilisateurs

---

## 📂 Structure du projet

```
.
├── app.js
├── config
│   └── db.js
├── controllers
│   ├── adminController.js
│   ├── authController.js
│   └── userController.js
├── events
│   └── userEvents.js
├── explication.txt
├── middlewares
│   ├── auth.js
│   ├── isAdmin.js
│   └── upload.js
├── models
│   └── user.js
├── node_modules
├── package.json
├── package-lock.json
├── README.md
├── routes
│   ├── adminRoutes.js
│   ├── authRoutes.js
│   └── userRoutes.js
└── uploads
    └── avatars
````

---

## ⚙️ Installation

1. **Cloner le projet**

```bash
git clone https://github.com/Nehemie-Jacques/linktree-clone-backend.git
cd linktree-clone-backend
````

2. **Installer les dépendances**

```bash
npm install
```

3. **Configurer les variables d’environnement**

Créer un fichier `.env` :

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/linktree
```

4. **Démarrer le serveur**

```bash
npm start
```

---

## 📡 API REST – Routes disponibles

### 🔍 Lire tous les utilisateurs

```http
GET /api/admin/users
```

### 🔍 Lire un utilisateur par ID

```http
GET /api/admin/users/:id
```

### ➕ Créer un utilisateur

```http
POST /api/admin/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "motdepasse",
  "bio": "Bio courte ici",
  "profilePicture": "https://lien-image.com/avatar.jpg",
  "links": [
    { "title": "YouTube", "url": "https://youtube.com/@john" },
    { "title": "Site", "url": "https://john.com" }
  ]
}
```

### ✏️ Modifier un utilisateur

```http
PUT /api/admin/users/:id
Content-Type: application/json

{
  "name": "Jane Doe",
  "bio": "Nouvelle bio",
  "password": "nouveaumdp"
}
```

### ❌ Supprimer un utilisateur

```http
DELETE /api/admin/users/:id
```

---

## 🔒 Sécurité

* Les mots de passe sont **hachés avec `bcrypt`** avant stockage.
* Le champ `email` est **unique**.

---

## 🛠 Technologies utilisées

* [Node.js](https://nodejs.org)
* [Express.js](https://expressjs.com)
* [MongoDB](https://www.mongodb.com)
* [Mongoose](https://mongoosejs.com)
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [dotenv](https://www.npmjs.com/package/dotenv)

---

## 🧑‍💻 Auteur

Projet réalisé par \[Néhémie].

---

## 📜 Licence

Ce projet est libre d’utilisation à des fins pédagogiques.

```