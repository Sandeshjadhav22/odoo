import express from "express";
import {
  createEquipment,
  getEquipments,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
} from "../controllers/equipment.controller.js";

const router = express.Router();

router.post("/", createEquipment);
router.get("/", getEquipments);
router.get("/:id", getEquipmentById);
router.put("/:id", updateEquipment);
router.delete("/:id", deleteEquipment);

export default router;
