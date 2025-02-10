import { bookingStatus } from "./booking";

export interface IBookingPutBooking {
  _id: string; /// params
  status?: bookingStatus;
  notes?: string;
  cancellationReason?: string;
}
