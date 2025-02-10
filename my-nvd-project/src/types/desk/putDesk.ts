import { deskDirection } from "./desk";

export interface IDeskPutDesk {
  _id: string; /// params
  name?: string;
  shortName?: string;
  description?: string;
  direction?: deskDirection;
}
