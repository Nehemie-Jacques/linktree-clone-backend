// Objectif : Vérifier que la requête contient un token JWT valide. 
// Décoder le token pour obtenir l’utilisateur.
// Continuer vers la route protégée (next()) si tout est bon, ou bloquer avec une erreur sinon.

import jwt from 'jsonwebtoken'; // permet de vérifier, signer et décoder les tokens JWT.

export function authenticate(req, res, next) {
    const authHeader = req.headers.authorization; // Récupère le header Authorization envoyé par le client

    if (!authHeader || !authHeader.startsWith('Bearer ')) { // Vérifie si l'en-tête est présent et commence par 'Bearer '
        return res.status(401).json({ message: 'Token manquant ou invalide' });
    }
    const token = authHeader.split(' ')[1]; // Extrait le token de l'en-tête

    try {
        const decoded = jwt.verify(token, 'votre_clé_secrète'); // Vérifie et décode le token
        req.user = decoded; // Ajoute les informations de l'utilisateur décodées à la requête
        next(); // Passe au middleware suivant ou à la route
    } catch (error) {
        res.status(401).json({ message: 'Token invalide ou expiré' }); // Si le token n'est pas valide ou a expiré, renvoie une erreur
    }
}  
