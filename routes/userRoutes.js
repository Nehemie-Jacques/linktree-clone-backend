// route pour voir son profil

import express from "express";
import { getMyProfile, updateMyProfile, deleteMyAccount } from "../controllers/userController.js";
import { authenticate  } from "../middlewares/auth.js";

const router = express.Router();

router.get("/me", authenticate, getMyProfile); // Route protégée pour obtenir le profil de l'utilisateur connecté
router.put("/me", authenticate, updateMyProfile); // Route protégée pour mettre à jour le profil de l'utilisateur connecté
router.delete("/me", authenticate, deleteMyAccount); // Route protégée pour supprimer le compte de l'utilisateur connecté

export default router;