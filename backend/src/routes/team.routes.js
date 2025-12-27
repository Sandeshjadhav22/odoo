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

// All team routes require auth
router.use(requireAuth);

// Create team (ADMIN / MANAGER)
router.post("/", restrictTo("ADMIN", "MANAGER"), createTeam);

// Get all teams
router.get("/", getAllTeams);

// Assign user to team (ADMIN / MANAGER)
router.patch(
  "/:teamId/users/:userId",
  restrictTo("ADMIN", "MANAGER"),
  assignUserToTeam
);

// Update team (ADMIN / MANAGER)
router.patch("/:id", restrictTo("ADMIN", "MANAGER"), updateTeam);

// Delete team (ADMIN / MANAGER)
router.delete("/:id", restrictTo("ADMIN", "MANAGER"), deleteTeam);


export default router;
