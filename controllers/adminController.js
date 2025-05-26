import bcrypyt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import path from 'path';
import { writeFile } from 'fs';

const dataPath = path.resolve('data/users.json');

//  Connexion de l’administrateur
// Objectif : Permettre à un administrateur d'accéder au système avec email + mot de passe.
// POST http://localhost:3000/api/admin/login
export async function loginAdmin(req, res) {
    const { email, password } = req.body;

    const users = JSON.parse(await fs.readFile(dataPath, "utf-8"));
    const user = users.find(u => u.email === email && u.role === 'admin');

    if (!admin) return res.status(401).json({ message: "Admin non trouvé" });

    const isMatch = await bcrypyt.compare(password, admin.password); // Compare le mot de passe fourni avec le mot de passe haché stocké
    if (!isMatch) return res.status(401).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign({ id: admin.id, role: admin.role }, 'votre_clé_secete', { expiresIn: '1h' }); // Clé secrète pour signer le token (à remplacer par une clé sécurisée)
    
    res.status(200).json({ message: "Connexion réussie", token });
}

// Voir tous les utilisateurs
// Objectif : Permettre à l’administrateur de voir tous les utilisateurs du système.
// GET http://localhost:3000/api/admin/users
export async function getAllUsers(req, res) {
    try {
        const users = JSON.parse(await fs.readFile(dataPath, "utf-8"));
        const userList = users.filter(u => u.role === 'user'); // Filtrer pour ne garder que les utilisateurs
        res.status(200).json(userList);
    } catch (error) {
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
}

// Modifier un utilisateur
// Objectif : Permettre à l’administrateur de modifier les informations d’un utilisateur spécifique.
// GET http://localhost:3000/api/admin/users/:id

export async function updateUserByAdmin(req, res) {
    const { id } = req.params; // Récupérer l'ID de l'utilisateur à partir des paramètres de la requête
    const updates = req.body; // Récupérer les données de mise à jour à partir du corps de la requête

    const users = JSON.parse(await fs.readFile(dataPath, "utf-8"));
    const user = users.find(u => u.id === id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    // Mettre à jour les informations de l'utilisateur
    Object.assign(user, updates);

    await writeFile('datapath', JSON.stringify(users, null, 2));
    res.status(200).json({ message: "Utilisateur mis à jour avec succès", user });
}