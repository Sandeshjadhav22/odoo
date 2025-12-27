import express from "express";
import {
  createRequest,
  getRequests,
  getRequestById,
  updateRequestStage,
} from "../controllers/maintenanceRequest.controller.js";
import { requireAuth, restrictTo } from "../middleware/auth.middleware.js";

const router = express.Router();

// All maintenance request routes require auth
router.use(requireAuth);

// Create request (ADMIN, MANAGER)
router.post("/", restrictTo("ADMIN", "MANAGER"), createRequest);

// List requests (Kanban)
router.get("/", getRequests);

// Get single request
router.get("/:id", getRequestById);

// Update stage / assignment
router.patch("/:id/stage", updateRequestStage);

export default router;
