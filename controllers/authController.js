import fs from 'fs/promises'; 
import bcrypt from 'bcrypt'; // Bibliothèque pour le hachage de mot de passe
import { v4 as uuidv4 } from 'uuid'; // Génère un identifiant unique pour chaque utilisateur
import path from 'path';
import { fileURLToPath } from 'url'; // Pour obtenir le chemin absolu du fichier
import jwt from 'jsonwebtoken'; // Pour la gestion des tokens JWT

const __filename = fileURLToPath(import.meta.url); // Convertit l’URL du fichier actuel (import.meta.url) en chemin de fichier local
const __dirname = path.dirname(__filename); // Obtient le répertoire du fichier actuel
const dataPath = path.join(__dirname, '../data/users.json'); // Chemin vers le fichier users.json

// Routes d’authentification (création de compte).
// Objectif : Permettre à un utilisateur de s’inscrire et enregistrer son compte dans un fichier users.json.

export async function register(req, res) { // Fonction pour gérer l'inscription d'un nouvel utilisateur
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

/* Méthode : GET
URL : http://localhost:3000/api/auth/register
Body : 
{
  "name": "Jean",
  "email": "jean@email.com",
  "password": "monMot2Passe"
}   */ 

// Connexion de l'utilisateur
// Objectif : Permettre à l'utilisateur de se connecter en vérifiant son email et mot de passe, puis lui renvoyer un jeton (token) pour qu’il puisse rester connecté et accéder à son profil.

export async function login(req, res) {
    const { email, password } =req.body;

    try {
        const users = JSON.parse(await fs.readFile(dataPath, "utf-8"));
        const user = users.find(u => u.email === email)

        if (!user) {
            return res.status(400).json({ message: "Email ou mot de passe incorrect" });
        }

        const isMatch = await bcrypt.compare(password, user.password); // Compare le mot de passe fourni avec le mot de passe haché stocké
        if (!isMatch) {
            return res.status(400).json({ message: "Email ou mot de passe incorrect" });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role }, // Payload du token
            'votre_clé_secrète', // Clé secrète pour signer le token (à remplacer par une clé sécurisée)
            { expiresIn: '1h' } // Le token expirera dans 1 heure
        );

        res.status(200).json({ message: "Connexion réussie", token });
    } catch (error) {
        console.error('Erreur lors de la connexion : ', error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
}

/* Méthode : POST
URL : http://localhost:3000/api/auth/login
Body : 
{
  "email": "jean@email.com",
  "password": "monMot2Passe"
}   */