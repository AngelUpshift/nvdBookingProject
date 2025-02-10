import { IDesk } from "../desk/desk";
import { IImage, roomType } from "./room";

export interface IRoomPutRoom {
  _id: string; /// params
  name?: string;
  description?: string;
  images?: IImage[];
  desks?: IDesk[];
  type?: roomType;
}
