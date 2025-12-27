import express from "express";
import {
  createEquipment,
  getEquipments,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
} from "../controllers/equipment.controller.js";
import { requireAuth, restrictTo } from "../middleware/auth.middleware.js";

const router = express.Router();


router.post("/", restrictTo("ADMIN", "MANAGER"),createEquipment);
router.get("/", getEquipments);
router.get("/:id", getEquipmentById);
router.put("/:id", restrictTo("ADMIN", "MANAGER"),updateEquipment);
router.delete("/:id", deleteEquipment);

export default router;
