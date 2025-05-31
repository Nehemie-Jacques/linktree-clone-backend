// This middleware checks if the user is an admin by verifying the JWT token.

import jwt from 'jsonwebtoken';

export const isAdmin = (req, res, next) => {
    const auth = req.headers.authorization; // Récupérer le token depuis les en-têtes de la requête
    if (!auth) {
        return res.status(401).json({ message: "Accès non autorisé, token manquant" });
    }

    const token = auth.split(" ")[1]; // Corrigé : slipt -> split

    try {
        const decoded = jwt.verify(token, 'votre_clé_secrète'); // Vérifier le token avec la clé secrète
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: "Accès interdit, rôle non autorisé" });
        }
        req.user = decoded; // Ajouter les informations de l'utilisateur décodées à la requête
        next(); // Passer au middleware suivant ou à la route
    } catch (error) {
        res.status(401).json({ message: "Token invalide ou expiré" });
    }
};
