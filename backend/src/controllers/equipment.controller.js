import { prisma } from "../lib/prisma.js";

export const createEquipment = async (req, res) => {
  try {
    const data = req.body;

    const equipment = await prisma.equipment.create({
      data: {
        name: data.name,
        serialNumber: data.serialNumber,
        company: data.company,
        usedBy: data.usedBy,
        employee: data.employee,
        department: data.department,
        technician: data.technician,
        maintenanceTeam: data.maintenanceTeam,
        assignedDate: data.assignedDate ? new Date(data.assignedDate) : null,
        scrapDate: data.scrapDate ? new Date(data.scrapDate) : null,
        location: data.location,
        workCenter: data.workCenter,
        description: data.description,
        categoryId: Number(data.categoryId),
      },
    });

    res.status(201).json(equipment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getEquipments = async (req, res) => {
  try {
    const equipments = await prisma.equipment.findMany({
      include: { category: true },
    });

    res.json(equipments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getEquipmentById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const equipment = await prisma.equipment.findUnique({
      where: { id },
      include: { category: true },
    });

    res.json(equipment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateEquipment = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const equipment = await prisma.equipment.update({
      where: { id },
      data: req.body,
    });

    res.json(equipment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteEquipment = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.equipment.delete({
      where: { id },
    });

    res.json({ message: "Equipment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
