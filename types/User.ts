export type User = {
  id: string;
  name: string;
  lastName: string;
  group: string;
  notes?: string;
  water?: number;
  enrollmentDate?: Date;
};

export const users: User[] = [
  {
    id: "1",
    name: "Mario",
    lastName: "Castellano",
    group: "Grupo A",
    water: 5,
    notes: "Necesita atención especial por alergias.",
    enrollmentDate: new Date("2024-12-31"),
  },
  {
    id: "2",
    name: "María",
    lastName: "López",
    group: "Grupo B",
    water: 3,
    enrollmentDate: new Date("2024-11-15"),
  },
  {
    id: "3",
    name: "Carlos",
    lastName: "Rodríguez",
    group: "Grupo A",
    water: 8,
    enrollmentDate: new Date("2025-01-20"),
  },
];