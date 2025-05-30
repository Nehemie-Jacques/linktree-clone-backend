import connectDB from "../config/db.js";
import User from "../models/user.js";

connectDB();

// Afin de voir son profil
export async function getMyProfile(req, res) {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Récupérer l'utilisateur par son ID et exclure le mot de passe
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json(user);
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
    if (!req.body.description && !req.body.links) {
      return res.status(400).json({ message: "Aucune mise à mettre à jour" });
    }
    const updates = {
      description: req.body.description,
      links: req.body.links,
    };

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true, // Retourner le nouvel utilisateur mis à jour
      runValidators: true, // Activer la validation des données de mise à jour
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json({ message: "Profil mis à jour avec succès", user });
  } catch (error) {
    console.error("Erreur update: ", error);
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
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json({ message: "Compte supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du compte :", error);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
}

/* Méthode : DELETE
URL : http://localhost:3000/api/users/me */

export async function getPublicProfile(req, res) {
  try {
    const user = await User.findById(req.params.id).select("id name description links avatar"); // Récupérer l'utilisateur par son ID
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Erreur lors de la récupération du profil public : ", error);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
}

/* Méthode : GET
URL : http://localhost:3000/api/users/:id */


export async function uploadAvatar(req, res) {
  try {
    const avatarPath = req.file.path;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: avatarPath }, // Mettre à jour l'avatar de l'utilisateur
      { new: true } // Retourner le nouvel utilisateur mis à jour
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json({ message: "Avatar mis à jour avec succès", avatar: user.avatar });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'avatar : ", error);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
}