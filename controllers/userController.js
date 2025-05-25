import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import users from "../models/userModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "../data/users.json");

// Afin de voir son profil
export async function getMyProfile(req, res) {
  try {
    const users = JSON.parse(await fs.readFile(dataPath, "utf-8"));
    const user = users.find((u) => u.id === req.user.id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const { password, ...safeUser } = user; // Exclut le mot de passe du profil renvoyé
    res.json(safeUser); // Renvoie le profil de l'utilisateur sans mot de passe
  } catch (error) {
    console.error("Erreur lors de la récupération du profil : ", error);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
}

/* Méthode : GET
URL : http://localhost:3000/api/users/me 
En-tête : Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhlYWRkZDc2LWQ2MmQtNDBjMi05YjZjLTljYjQ5NTJmZGY0YSIsImVtYWlsIjoiamVhbkBlbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTc0ODEzMDEzNiwiZXhwIjoxNzQ4MTMzNzM2fQ.SPumNvjFi1v_USB7HUuaCAvb58XUjcbGSn5KpfzYgFg
*/

// Afin de mettre à jour son profil
export async function updateMyProfile(req, res) {
  try {
    const userId = req.user.id;
    const { description, links } = req.body;
    const user = users.find((u) => u.id === userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    if (description !== undefined) user.description = description;
    if (links !== undefined) user.links = links;

    await fs.writeFile(dataPath, JSON.stringify(users, null, 2), "utf-8");
    res.status(200).json({ message: "Profil mis à jour avec succès", user });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil : ", error);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
}

/* Méthode : PUT
URL : http://localhost:3000/api/users/me
Headers : Authorization: Bearer [TON_JWT]
Content-Type: application/json
Body (JSON) : {
  "description": "Développeur Fullstack en herbe",
  "links": [
    {
      "label": "Portfolio",
      "url": "https://portfolio.dev"
    },
    {
      "label": "GitHub",
      "url": "https://github.com/moi"
    }
  ]
}
 */

export async function deleteMyAccount(req, res) {
    try {
        const userId = req.user.id;
        const user = users.find(u => u.id === userId);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        // Supprimer l'utilisateur du tableau
        const updatedUsers = users.filter((u) => u.id !== userId);
        // Écrire les utilisateurs mis à jour dans le fichier
        await fs.writeFile(dataPath, JSON.stringify(updatedUsers, null, 2), "utf-8");
        res.status(200).json({ message: "Compte supprimé avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression du compte :", error);
        return res.status(500).json({ message: "Erreur interne du serveur" });
    }
}

/* Méthode : DELETE
URL : http://localhost:3000/api/users/me */

export async function getPublicProfile(req, res) {
    const id = req.params.id;
    const user = users.find((u) => u.id === id);
    if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const publicUser = {
        id: user.id,
        name: user.name,    
        description: user.description,
        links: user.links,
        avatar: user.avatar || null // Assurez-vous que l'avatar est optionnel
    };

    res.status(200).json(publicUser);
}

/* Méthode : GET
URL : http://localhost:3000/api/users/:id */


export async function uploadAvatar(req, res) {
    const userId = req.user.id;
    const user = users.find((u) => u.id === userId);
    if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    user.avatar = `uploads/avatars/${req.file.filename}`; // Chemin vers l'avatar uploadé

    await fs.writeFile(dataPath, JSON.stringify(users, null, 2), "utf-8");
    res.status(200).json({ message: "Avatar mis à jour avec succès", avatar: user.avatar });
}