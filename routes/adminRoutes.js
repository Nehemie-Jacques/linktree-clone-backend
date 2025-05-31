import express from "express";
import {
  loginAdmin,
  getAllUsers,
  updateUserByAdmin,
  deleteUserByAdmin,
  createUserByAdmin,
  getUserByIdAdmin
} from "../controllers/adminController.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.use(isAdmin); // permet de protéger toutes les routes suivantes avec le middleware isAdmin
router.post("/login", loginAdmin);
router.get("/users", getAllUsers);
router.put("/users/:id", updateUserByAdmin);
router.delete("/users/:id", deleteUserByAdmin);
router.post("/users", createUserByAdmin);
router.get("/users/:id", getUserByIdAdmin);
router.get("/users", isAdmin, getAllUsers);

export default router;
