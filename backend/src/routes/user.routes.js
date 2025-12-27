import express from "express";
import {
  getAllUsers,
  getUserById,
} from "../controllers/user.controller.js";
import { requireAuth, restrictTo } from "../middleware/auth.middleware.js";

const router = express.Router();

// All user routes require auth
router.use(requireAuth);

// List users (ADMIN / MANAGER)
router.get("/", restrictTo("ADMIN", "MANAGER"), getAllUsers);

// Get single user (ADMIN / MANAGER)
router.get("/:id", restrictTo("ADMIN", "MANAGER"), getUserById);

export default router;
