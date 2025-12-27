import prisma from "../models/prisma.js";

/**
 * Create a new team
 * POST /teams
 */
export const createTeam = async (req, res) => {
  try {
    const { name, company } = req.body;

    if (!name || !company) {
      return res.status(400).json({
        message: "Team name and company are required",
      });
    }

    const team = await prisma.team.create({
      data: {
        name,
        company,
      },
    });

    res.status(201).json({ success: true, team });
  } catch (err) {
    if (err.code === "P2002") {
      return res.status(409).json({ message: "Team already exists" });
    }
    res.status(500).json({ message: "Failed to create team" });
  }
};


/**
 * Get all teams
 * GET /teams
 */
export const getAllTeams = async (req, res) => {
  try {
    const teams = await prisma.team.findMany({
      include: {
        users: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
    });

    res.json({
      success: true,
      teams,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch teams" });
  }
};

/**
 * Assign user to a team
 * PATCH /teams/:teamId/users/:userId
 */
export const assignUserToTeam = async (req, res) => {
  try {
    const { teamId, userId } = req.params;

    const team = await prisma.team.findUnique({ where: { id: teamId } });
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { teamId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        teamId: true,
      },
    });

    res.json({
      success: true,
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to assign user to team" });
  }
};


/**
 * Update team details
 * PATCH /teams/:id
 */
export const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, company } = req.body;

    if (!name && !company) {
      return res.status(400).json({
        message: "At least one field (name or company) is required",
      });
    }

    const team = await prisma.team.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(company && { company }),
      },
    });

    res.json({
      success: true,
      team,
    });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ message: "Team not found" });
    }
    if (err.code === "P2002") {
      return res.status(409).json({ message: "Team name already exists" });
    }
    console.error(err);
    res.status(500).json({ message: "Failed to update team" });
  }
};



/**
 * Delete team
 * DELETE /teams/:id
 */
export const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Unassign users from this team
    await prisma.user.updateMany({
      where: { teamId: id },
      data: { teamId: null },
    });

    // 2. Delete team
    await prisma.team.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: "Team deleted successfully",
    });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ message: "Team not found" });
    }
    console.error(err);
    res.status(500).json({ message: "Failed to delete team" });
  }
};
