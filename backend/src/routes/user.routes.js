import express from "express";
import {
  getAllUsers,
  getUserById,
} from "../controllers/user.controller.js";
import { requireAuth, restrictTo } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(requireAuth);
router.get("/", restrictTo("ADMIN", "MANAGER"), getAllUsers);
router.get("/:id", restrictTo("ADMIN", "MANAGER"), getUserById);

export default router;
