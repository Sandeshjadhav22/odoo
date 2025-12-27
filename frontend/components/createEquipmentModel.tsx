"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/model";
import { createEquipment, fetchCategories } from "@/lib/api";
import { Category } from "@/lib/types";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
};

export default function CreateEquipmentModal({
  open,
  onClose,
  onCreated,
}: Props) {
  const [form, setForm] = useState({
    name: "",
    serialNumber: "",
    company: "",
    usedBy: "Employee",
    employee: "",
    department: "",
    technician: "",
    maintenanceTeam: "",
    assignedDate: "",
    scrapDate: "",
    location: "",
    workCenter: "",
    description: "",
    categoryId: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (!open) return;

    async function loadCategories() {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    }

    loadCategories();
  }, [open]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");

    if (!form.name || !form.serialNumber || !form.company || !form.categoryId) {
      setError("Name, Serial Number, Company, and Category are required");
      return;
    }

    try {
      setLoading(true);

      await createEquipment({
        ...form,
        categoryId: Number(form.categoryId), // 🔑 IMPORTANT
      });

      onClose();
      onCreated();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} title="New Equipment" onClose={onClose}>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Equipment Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <Input
          label="Serial Number"
          name="serialNumber"
          value={form.serialNumber}
          onChange={handleChange}
        />

        <Input
          label="Company"
          name="company"
          value={form.company}
          onChange={handleChange}
        />

        <Select
          label="Used By"
          name="usedBy"
          value={form.usedBy}
          onChange={handleChange}
          options={["Employee", "Department"]}
        />

        <Input
          label="Employee"
          name="employee"
          value={form.employee}
          onChange={handleChange}
        />

        <Input
          label="Department"
          name="department"
          value={form.department}
          onChange={handleChange}
        />

        <Input
          label="Technician"
          name="technician"
          value={form.technician}
          onChange={handleChange}
        />

        <Input
          label="Maintenance Team"
          name="maintenanceTeam"
          value={form.maintenanceTeam}
          onChange={handleChange}
        />

        <Input
          label="Assigned Date"
          name="assignedDate"
          type="date"
          value={form.assignedDate}
          onChange={handleChange}
        />

        <Input
          label="Scrap Date"
          name="scrapDate"
          type="date"
          value={form.scrapDate}
          onChange={handleChange}
        />

        <Input
          label="Location"
          name="location"
          value={form.location}
          onChange={handleChange}
        />

        <Input
          label="Work Center"
          name="workCenter"
          value={form.workCenter}
          onChange={handleChange}
        />
        <div>
          <label className="text-sm text-gray-600">Equipment Category</label>
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            className="w-full border rounded p-2 mt-1"
          >
            <option value="">Select category</option>

            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
                {cat._count?.equipments !== undefined
                  ? ` (${cat._count.equipments})`
                  : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-2">
          <label className="text-sm text-gray-600">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded p-2 mt-1"
            rows={3}
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

      <div className="flex justify-end gap-2 mt-4">
        <button onClick={onClose} className="px-3 py-1.5 border rounded">
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-3 py-1.5 bg-black text-white rounded disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </Modal>
  );
}

/* ---------- helpers ---------- */

function Input({
  label,
  ...props
}: {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input {...props} className="w-full border rounded p-2 mt-1" />
    </div>
  );
}

function Select({
  label,
  options,
  ...props
}: {
  label: string;
  options: string[];
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <select {...props} className="w-full border rounded p-2 mt-1">
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
