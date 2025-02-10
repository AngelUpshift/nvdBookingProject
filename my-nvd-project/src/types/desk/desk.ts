export enum deskStatus {
  POSTED = "posted",
  DELETED = "deleted",
  DRAFT = "draft",
}

export type deskDirection = "h" | "v";

export interface IDesk {
  _id: string;
  name: string;
  shortName: string;
  description: string;
  status: deskStatus;
  direction: deskDirection;
}
