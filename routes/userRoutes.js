// route pour voir son profil

import express from "express";
import { getMyProfile } from "../controllers/userController.js";
import { authenticate  } from "../middlewares/auth.js";

const router = express.Router();

router.get("/me", authenticate, getMyProfile); // Route protégée pour obtenir le profil de l'utilisateur connecté

export default router;