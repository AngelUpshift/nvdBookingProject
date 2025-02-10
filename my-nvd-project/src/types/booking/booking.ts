import { IDesk } from "../desk/desk";
import { IUser } from "../user/user";

export enum bookingStatus {
  BOOKED = "booked",
  PROBLEM = "problem",
  CANCELLED = "cancelled",
}

export const durationType = [1, 3, 5, 10];

export interface IBooking {
  _id: string;
  status: bookingStatus;
  date: string;
  user: IUser;
  desk: IDesk;
  duration: number;
  notes: string;
  cancellationReason: string;
  referenceNumber: string;
  createdAt?: Date;
  updatedAt?: Date;
}
