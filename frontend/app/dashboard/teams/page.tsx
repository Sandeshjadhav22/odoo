"use client";

import { useEffect, useState } from "react";
import Table from "@/components/table";
import CreateTeamModal from "@/components/createTeamModel";
import { Team } from "@/lib/types";
import { fetchTeams } from "@/lib/api";

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  // ✅ Fetch teams (reusable)
  const loadTeams = async () => {
    try {
      setLoading(true);
      const data = await fetchTeams();
      setTeams(data.teams);
    } catch (err) {
      console.error("Failed to load teams", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load only once on mount
  useEffect(() => {
    loadTeams();
  }, []);

  const columns = [
    {
      key: "name",
      header: "Team Name",
    },
    {
      key: "members",
      header: "Team Members",
      render: (team: Team) =>
        team.users.length > 0
          ? team.users.map((u) => u.name).join(", ")
          : "—",
    },
    {
      key: "company",
      header: "Company",
    },
  ];

  if (loading) {
    return <p>Loading teams...</p>;
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Teams</h1>

        <button
          onClick={() => setOpen(true)}
          className="px-3 py-1.5 border rounded-md text-sm hover:bg-gray-100"
        >
          New
        </button>
      </div>

      {/* Table */}
      <Table columns={columns} data={teams} />

      {/* Create Team Modal */}
      <CreateTeamModal
        open={open}
        onClose={() => setOpen(false)}
        onCreated={loadTeams}
      />
    </div>
  );
}
