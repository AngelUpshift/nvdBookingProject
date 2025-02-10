import { IDesk } from "../desk/desk";

export type roomType = "main" | "small" | "cool";

export enum roomStatus {
  POSTED = "posted",
  DELETED = "deleted",
  DRAFT = "draft",
}

export interface IImage {
  url: string;
  slug: string;
}

export interface IRoom {
  _id: string;
  name: string;
  description: string;
  images: IImage[];
  desks: IDesk[];
  type: roomType;
  status: roomStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
