export const team = ["FND", "BND", "QA", "DESIGN", "HR", "PR"];

export enum userRole {
  ADMIN = "admin",
  USER = "user",
}

export interface IUser {
  _id: string;
  first_name: string;
  last_name: string;
  team: string;
  squad: string;
  email: string;
  password: string;
  role: userRole;
  avatar_url: string;
  createdAt?: Date;
  updatedAt?: Date;
}
