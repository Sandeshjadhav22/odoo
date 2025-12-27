import prisma from "../models/prisma.js";

/**
 * CREATE Maintenance Request
 * POST /maintenance-requests
 */
export const createRequest = async (req, res) => {
  try {
    const {
      subject,
      description,
      type,
      equipmentId,
      priority,
      scheduledDate,
    } = req.body;

    if (!subject || !type || !equipmentId) {
      return res.status(400).json({
        message: "Subject, type and equipment are required",
      });
    }

    // 1. Fetch equipment (AUTO-FILL LOGIC)
    const equipment = await prisma.equipment.findUnique({
      where: { id: Number(equipmentId) },
      include: { category: true },
    });

    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    // 2. Create request
    const request = await prisma.maintenanceRequest.create({
      data: {
        subject,
        description,
        type,
        priority,
        equipmentId: equipment.id,
        categoryId: equipment.categoryId,
        company: equipment.company,
        scheduledDate:
          type === "PREVENTIVE" && scheduledDate
            ? new Date(scheduledDate)
            : null,
        createdById: req.user.id,
      },
    });

    res.status(201).json({
      success: true,
      request,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create request" });
  }
};


/**
 * GET Maintenance Requests
 * GET /maintenance-requests
 */
export const getRequests = async (req, res) => {
  try {
    const requests = await prisma.maintenanceRequest.findMany({
      include: {
        equipment: true,
        category: true,
        team: true,
        technician: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json({
      success: true,
      requests,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch requests" });
  }
};


/**
 * GET /maintenance-requests/:id
 */
export const getRequestById = async (req, res) => {
  try {
    const request = await prisma.maintenanceRequest.findUnique({
      where: { id: req.params.id },
      include: {
        equipment: true,
        category: true,
        team: true,
        technician: true,
        createdBy: { select: { id: true, name: true } },
      },
    });

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json({
      success: true,
      request,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch request" });
  }
};


/**
 * PATCH /maintenance-requests/:id/stage
 */
export const updateRequestStage = async (req, res) => {
  try {
    const { stage, technicianId, durationHours } = req.body;
    const { id } = req.params;

    const request = await prisma.maintenanceRequest.findUnique({
      where: { id },
    });

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // RULES
    if (stage === "IN_PROGRESS" && !technicianId) {
      return res.status(400).json({
        message: "Technician must be assigned to start work",
      });
    }

    if (stage === "REPAIRED" && !durationHours) {
      return res.status(400).json({
        message: "Duration is required to complete request",
      });
    }

    const updated = await prisma.maintenanceRequest.update({
      where: { id },
      data: {
        stage,
        technicianId: technicianId || request.technicianId,
        durationHours:
          stage === "REPAIRED" ? Number(durationHours) : request.durationHours,
      },
    });

    res.json({
      success: true,
      request: updated,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update request" });
  }
};
