// Routes d’authentification (création de compte).
// Objectif : Permettre à un utilisateur de s’inscrire et enregistrer son compte dans un fichier users.json.

import fs from 'fs/promises'; 
import bcrypt from 'bcrypt'; // Bibliothèque pour le hachage de mot de passe
import { v4 as uuidv4 } from 'uuid'; // Génère un identifiant unique pour chaque utilisateur
import path from 'path';
import { fileURLToPath } from 'url'; // Pour obtenir le chemin absolu du fichier

const __filename = fileURLToPath(import.meta.url); // Convertit l’URL du fichier actuel (import.meta.url) en chemin de fichier local
const __dirname = path.dirname(__filename); // Obtient le répertoire du fichier actuel
const dataPath = path.join(__dirname, '../data/users.json'); // Chemin vers le fichier users.json

export async function register(req, res) {
    const { name, email, password } = req.body;
    try {
        const users = JSON.parse(await fs.readFile(dataPath, "utf-8")); // Lit le fichier users.json
        const emailExists = users.find(u => u.email === email); // Vérifie si l'email existe déjà
        if (emailExists) {
            return res.status(400).json({ message: "Email déjà utilisé" });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hache le mot de passe. Le chiffre 10 est le "salt rounds", c’est-à-dire le nombre de fois que l’algorithme applique le hachage pour le rendre plus sécurisé.
        const newuser = {
            id: uuidv4(),
            name,
            email, 
            password: hashedPassword,
            role: "user",
            description: "",
            links: []
        };

        users.push(newuser);
        await fs.writeFile(dataPath, JSON.stringify(users, null, 2)); // null, 2 permet de formater le JSON avec une indentation de 2 espaces
        
        res.status(201).json({ message: "Utilisateur créé avec succès", id: newuser.id });
    } catch (error) {
        console.error('Erreur lors de l\'inscription : ', error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
}