export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type Team = {
  id: string;
  name: string;
  company: string;
  users: TeamMember[];
};

export type Equipment = {
  id: number;
  name: string;
  serialNumber: string;
  company: string;

  employee: string;
  department: string;
  technician: string;
  maintenanceTeam: string;

  category: {
    id: number;
    name: string;
    responsible: string;
    company: string;
  };

  assignedDate: string;
  scrapDate: string;
  location: string;
  workCenter: string;
  description: string;
};

export type Category = {
  id: number;
  name: string;
  responsible: string;
  company: string;
  _count?: {
    equipments: number;
  };
};
