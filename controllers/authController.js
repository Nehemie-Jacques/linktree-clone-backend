import User from "../models/user.js";
import bcrypt from 'bcrypt'; // Bibliothèque pour le hachage de mot de passe
import jwt from 'jsonwebtoken'; // Pour la gestion des tokens JWT
import dotenv from 'dotenv';

dotenv.config();

// Routes d’authentification (création de compte).
// Objectif : Permettre à un utilisateur de s’inscrire et enregistrer son compte dans un fichier users.json.

export async function register(req, res) { // Fonction pour gérer l'inscription d'un nouvel utilisateur
    const { name, email, password } = req.body;

    try {
        const emailExists = await User.findOne({ email });
        if (emailExists) return res.status(400).json({ message: "Email déjà utilisé" });
        
        const hashedPassword = await bcrypt.hash(password, 10); // Hache le mot de passe. Le chiffre 10 est le "salt rounds", c’est-à-dire le nombre de fois que l’algorithme applique le hachage pour le rendre plus sécurisé.
        const newuser = new User({
            name,
            email, 
            password: hashedPassword,
            role: "user",
            description: "",
            links: [],
        });

        await newuser.save(); // Sauvegarde l'utilisateur dans la base de données
        
        res.status(201).json({ message: "Utilisateur créé avec succès", id: newuser._id });
    } catch (error) {
        console.error('Erreur lors de l\'inscription : ', error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
}

/* Méthode : POST 
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
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Email ou mot de passe incorrect" });

        const isMatch = await bcrypt.compare(password, user.password); // Compare le mot de passe fourni avec le mot de passe haché stocké
        if (!isMatch) return res.status(400).json({ message: "Email ou mot de passe incorrect" });
        
        const token = jwt.sign(
            { id: newuser._id }, // Payload du token
            'process.env.JWT_SECRET', // Clé secrète pour signer le token (à remplacer par une clé sécurisée)
            { expiresIn: '1h' } // Le token expirera dans 1 heure
        );

        res.status(201).json({ message: "Connexion réussie", token });
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