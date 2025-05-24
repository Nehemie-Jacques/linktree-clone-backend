// Afin de voir son profil

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '../data/users.json');

export async function getMyProfile(req, res) {
    try {
        const users = JSON.parse(await fs.readFile(dataPath, "utf-8"));
        const user = users.find(u => u.id === req.user.id);

        if (!user) { 
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        const { password, ...safeUser } =user; // Exclut le mot de passe du profil renvoyé
        res.json(safeUser); // Renvoie le profil de l'utilisateur sans mot de passe
    } catch (error) {
        console.error('Erreur lors de la récupération du profil : ', error);
        return res.status(500).json({ message: "Erreur interne du serveur" });
    }
}

/* Méthode : GET
URL : http://localhost:3000/api/users/me 
En-tête : Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhlYWRkZDc2LWQ2MmQtNDBjMi05YjZjLTljYjQ5NTJmZGY0YSIsImVtYWlsIjoiamVhbkBlbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTc0ODEzMDEzNiwiZXhwIjoxNzQ4MTMzNzM2fQ.SPumNvjFi1v_USB7HUuaCAvb58XUjcbGSn5KpfzYgFg
*/