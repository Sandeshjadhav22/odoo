"use client";

import { useEffect, useState } from "react";
import Table from "@/components/table";
import CreateEquipmentModal from "@/components/createEquipmentModel";
import { Equipment } from "@/lib/types";
import { fetchEquipments } from "@/lib/api";
import EquipmentDetailsModal from "@/components/equipmentDetailModel";

export default function EquipmentsPage() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Equipment | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // ---------------- LOAD DATA ----------------
  const loadEquipments = async () => {
    try {
      setLoading(true);
      const data = await fetchEquipments();
      setEquipments(data.equipments);
    } catch (err) {
      console.error("Failed to load equipments", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEquipments();
  }, []);

  // ---------------- TABLE COLUMNS ----------------
  const columns = [
    {
      key: "name",
      header: "Equipment Name",
    },
    {
      key: "employee",
      header: "Employee",
    },
    {
      key: "department",
      header: "Department",
    },
    {
      key: "serialNumber",
      header: "Serial Number",
    },
    {
      key: "technician",
      header: "Technician",
    },
    {
      key: "category",
      header: "Equipment Category",
      render: (eq: Equipment) => eq.category?.name || "—",
    },
    {
      key: "company",
      header: "Company",
    },
  ];

  if (loading) {
    return <p>Loading equipments...</p>;
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Equipment</h1>

        <div className="flex items-center gap-3">
          {/* Search (UI only for now) */}
          <input
            placeholder="Search..."
            className="border rounded-md px-3 py-1.5 text-sm"
          />

          {/* New Button */}
          <button
            onClick={() => setOpen(true)}
            className="px-3 py-1.5 border rounded-md text-sm hover:bg-gray-100"
          >
            New
          </button>
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={equipments}
        onRowClick={(equipment) => {
          setSelected(equipment);
          setDetailsOpen(true);
          console.log("Selected Equipment:", equipment);
        }}
      />

      {/* Create Equipment Modal */}
      <CreateEquipmentModal
        open={open}
        onClose={() => setOpen(false)}
        onCreated={loadEquipments}
      />

      <EquipmentDetailsModal
  open={detailsOpen}
  equipment={selected}
  onClose={() => setDetailsOpen(false)}
/>
    </div>
  );
}
