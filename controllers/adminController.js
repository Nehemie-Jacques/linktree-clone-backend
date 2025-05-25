import bcrypyt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import path from 'path';

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