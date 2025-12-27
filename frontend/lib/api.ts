import { Category } from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

// ---------------- GET TEAMS ----------------
export async function fetchTeams() {
  const res = await fetch(`${API_BASE_URL}/teams`, {
    method: "GET",
    credentials: "include", // 🔑 REQUIRED
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Unauthorized");
  }

  return data;
}

// ---------------- CREATE TEAM ----------------
export async function createTeam(payload: {
  name: string;
  company: string;
}) {
  const res = await fetch(`${API_BASE_URL}/teams`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // 🔑 REQUIRED
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create team");
  }

  return data.team;
}

// ---------------- GET EQUIPMENTS ----------------
export async function fetchEquipments() {
  const res = await fetch(`${API_BASE_URL}/api/equipments`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch equipments");
  }

  return {
    equipments: data, // because API returns array directly
  };
}


export async function createEquipment(payload: any) {
  const res = await fetch(
    `${API_BASE_URL}/api/equipments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create equipment");
  }

  return data;
}

export async function fetchCategories() {
  const res = await fetch(`${API_BASE_URL}/api/categories`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch categories");
  }

  // Your API returns an ARRAY directly
  return data as Category[];
}
