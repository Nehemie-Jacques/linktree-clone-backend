import bcrypyt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

//  Connexion de l’administrateur
// Objectif : Permettre à un administrateur d'accéder au système avec email + mot de passe.
// POST http://localhost:3000/api/admin/login
export async function loginAdmin(req, res) {
    const { email, password } = req.body;

    try {
        const admin = await User.findOne({ email, role: 'admin' });
        if (!admin) return res.status(401).json({ message: "Admin non trouvé" });
    
        const isMatch = await bcrypyt.compare(password, admin.password); // Compare le mot de passe fourni avec le mot de passe haché stocké
        if (!isMatch) return res.status(401).json({ message: "Mot de passe incorrect" });
    
        const token = jwt.sign({ id: admin._id, role: admin.role }, 'votre_clé_secete', { expiresIn: '1h' }); // Clé secrète pour signer le token (à remplacer par une clé sécurisée)
        res.status(200).json({ message: "Connexion réussie", token });
    } catch (error) {
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
}

// Voir tous les utilisateurs
// Objectif : Permettre à l’administrateur de voir tous les utilisateurs du système.
// GET http://localhost:3000/api/admin/users
export async function getAllUsers(req, res) {
    try {
        const users = await User.find({ role: 'user' });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
}

// Modifier un utilisateur
// Objectif : Permettre à l’administrateur de modifier les informations d’un utilisateur spécifique.
// GET http://localhost:3000/api/admin/users/:id

export async function updateUserByAdmin(req, res) {
    try { 
        const user = await User.findByIdAndUpdate(req.params.id);
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
        res.status(200).json({ message: "Utilisateur mis à jour avec succès", user });
    } catch(error) {
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
}

// Supprimer un utilisateur
// Objectif : Permettre à l’administrateur de supprimer un utilisateur du système.
// DELETE http://localhost:3000/api/admin/users/:id

export async function deleteUserByAdmin(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
        res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
}

// Ajouter un utilisateur manuellement
// Objectif : Permettre à l’administrateur de créer un nouvel utilisateur dans le système.
// POST http://localhost:3000/api/admin/users

export async function createUserByAdmin(req, res) {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypyt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: "user", 
            description: "",
            links: [],
        });

        await newUser.save();

        res.status(201).json({ message: "Utilisateur créé avec succès", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
}

// Voir le profil complet d’un utilisateur
// Objectif : Permettre à l’administrateur de voir le profil complet d’un utilisateur spécifique.
// POST http://localhost:3000/api/admin/users/:id

export async function getUserByIdAdmin(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
}

