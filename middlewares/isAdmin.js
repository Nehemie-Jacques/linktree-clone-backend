import jwt from 'jsonwebtoken';

export const isAdmin = (req, res, next) => {
    const auth = req.headers.authorization; // Récupérer le token depuis les en-têtes de la requête
    if (!token) return res.status(401).json({ message: "Accès non autorisé, token manquant" });

    const token = auth.slipt(" ")[1]; // Extraire le token du format "Bearer token"
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