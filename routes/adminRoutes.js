import express from "express";
import { loginAdmin, getAllUsers } from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/users", getAllUsers);

export default router;