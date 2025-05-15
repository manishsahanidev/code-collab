import { Router } from "express";
import { auth } from "../middleware/auth";
import {
  getUserProfile,
  updateUserProfile,
  getUserById,
} from "../controllers/user.controller";

const router = Router();

// Private routes (require authentication)
router.get("/me", auth, getUserProfile);
router.put("/me", auth, updateUserProfile);

// Public route
router.get("/:id", getUserById);

export default router;
