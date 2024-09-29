import express from "express";
import {
  register,
  login,
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect, admin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/create", createUser);
router.get("/users", protect, admin, getAllUsers);
router.get("/user/:id", protect, admin, getUser);
router.put("/user/:id", protect, admin, updateUser);
router.delete("/user/:id", protect, admin, deleteUser);
router
  .route("/profile")
  .get(protect, getUserProfile) // Get logged-in user's profile
  .put(protect, updateUserProfile);

export default router;
