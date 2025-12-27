import express from "express";
import {
  createRequest,
  getRequests,
  getRequestById,
  updateRequestStage,
} from "../controllers/maintenanceRequest.controller.js";
import { requireAuth, restrictTo } from "../middleware/auth.middleware.js";

const router = express.Router();



router.post("/", restrictTo("ADMIN", "MANAGER"), createRequest);
router.get("/", getRequests);
router.get("/:id", getRequestById);
router.patch("/:id/stage", updateRequestStage);

export default router;
