import { IBooking } from "../booking/booking";
import { IUser } from "../user/user";

export interface IAttendance {
  userId: IUser;
  bookingId: IBooking;
  clockIn: Date;
  clockOut: Date;
  isClockIn: boolean;
  isClockOut: boolean;
}
