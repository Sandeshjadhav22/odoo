import express from "express";
import {
  createTeam,
  getAllTeams,
  assignUserToTeam,
  updateTeam,
  deleteTeam,
} from "../controllers/team.controller.js";
import { requireAuth, restrictTo } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(requireAuth);
router.post("/", restrictTo("ADMIN", "MANAGER"), createTeam);
router.get("/", getAllTeams);
router.patch(
  "/:teamId/users/:userId",
  restrictTo("ADMIN", "MANAGER"),
  assignUserToTeam
);
router.patch("/:id", restrictTo("ADMIN", "MANAGER"), updateTeam);
router.delete("/:id", restrictTo("ADMIN", "MANAGER"), deleteTeam);


export default router;
