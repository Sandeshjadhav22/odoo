import { prisma } from "../lib/prisma.js";

// CREATE
export const createWorkCenter = async (req, res) => {
  try {
    const workCenter = await prisma.workCenter.create({
      data: req.body,
    });
    res.status(201).json(workCenter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ (LIST)
export const getWorkCenters = async (req, res) => {
  try {
    const list = await prisma.workCenter.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ (SINGLE)
export const getWorkCenterById = async (req, res) => {
  try {
    const workCenter = await prisma.workCenter.findUnique({
      where: { id: Number(req.params.id) },
    });
    res.json(workCenter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const updateWorkCenter = async (req, res) => {
  try {
    const updated = await prisma.workCenter.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const deleteWorkCenter = async (req, res) => {
  try {
    await prisma.workCenter.delete({
      where: { id: Number(req.params.id) },
    });
    res.json({ message: "Work Center deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};