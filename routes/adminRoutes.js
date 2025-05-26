import express from "express";
import { loginAdmin, getAllUsers, updateUserByAdmin, deleteUserByAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/users", getAllUsers);
router.put("/users/:id", updateUserByAdmin);
router.delete("/users/:id", deleteUserByAdmin);

export default router;