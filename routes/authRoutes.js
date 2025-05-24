import { Router } from "express";
import express from "express";
import { register } from "../controllers/authController.js"; // Assuming you have a register function in your authController

const router = Router();

router.post('/register', register); 

export default router;