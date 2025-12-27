import { prisma } from "../lib/prisma.js";

export const createCategory = async (req, res) => {
  try {
    const { name, responsible, company } = req.body;

    const category = await prisma.equipmentCategory.create({
      data: { name, responsible, company },
    });

    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.equipmentCategory.findMany({
      include: {
        _count: { select: { equipments: true } },
      },
    });

    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const category = await prisma.equipmentCategory.update({
      where: { id },
      data: req.body,
    });

    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.equipmentCategory.delete({
      where: { id },
    });

    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
