"use client";

import Modal from "@/components/model";
import { Equipment } from "@/lib/types";

type Props = {
  open: boolean;
  onClose: () => void;
  equipment: Equipment | null;
};

export default function EquipmentDetailsModal({
  open,
  onClose,
  equipment,
}: Props) {
  if (!equipment) return null;

  return (
    <Modal open={open} title="Equipment Details" onClose={onClose}>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <Detail label="Name" value={equipment.name} />
        <Detail label="Serial Number" value={equipment.serialNumber} />
        <Detail label="Company" value={equipment.company} />
        <Detail label="Employee" value={equipment.employee} />
        <Detail label="Department" value={equipment.department} />
        <Detail label="Technician" value={equipment.technician} />
        <Detail label="Maintenance Team" value={equipment.maintenanceTeam} />
        <Detail label="Assigned Date" value={formatDate(equipment.assignedDate)} />
        <Detail label="Scrap Date" value={formatDate(equipment.scrapDate)} />
        <Detail label="Location" value={equipment.location} />
        <Detail label="Work Center" value={equipment.workCenter} />
        <Detail
          label="Category"
          value={equipment.category?.name ?? "—"}
        />

        <div className="col-span-2">
          <label className="text-gray-500">Description</label>
          <p className="mt-1">{equipment.description || "—"}</p>
        </div>
      </div>
    </Modal>
  );
}

function Detail({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <label className="text-gray-500">{label}</label>
      <p className="mt-1">{value || "—"}</p>
    </div>
  );
}

function formatDate(date?: string) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString();
}
