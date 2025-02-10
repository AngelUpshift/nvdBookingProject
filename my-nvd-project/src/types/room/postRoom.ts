import { IDesk } from "../desk/desk";
import { IImage, roomType } from "./room";

export interface IRoomPostRoom {
  name: string;
  description: string;
  images: IImage[];
  desks: IDesk[];
  type: roomType;
}
