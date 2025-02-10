import { IBooking } from "../../types/booking/booking";
import { IRoom } from "../../types/room/room";

export const MainRoomAvailability = (
  bookingList: IBooking[],
  roomList: IRoom[],
  d: string
) => {
  let count = 8;

  if (roomList.length > 0 && bookingList.length > 0) {
    for (let i = 0; i < bookingList.length; i++) {
      for (let y = 0; y < roomList[0].desks.length; y++) {
        const deskIdString = roomList[0].desks[y].toString();
        if (
          bookingList[i].desk._id === deskIdString &&
          bookingList[i].date === d &&
          bookingList[i].status === "booked"
        ) {
          count -= 1;
        }
      }
    }
  }
  return count;
};

export const CoolRoomAvailability = (
  bookingList: IBooking[],
  roomList: IRoom[],
  d: string
) => {
  let count = 3;

  if (roomList.length > 0 && bookingList.length > 0) {
    for (let i = 0; i < bookingList.length; i++) {
      for (let y = 0; y < roomList[2].desks.length; y++) {
        const deskIdString = roomList[2].desks[y].toString();
        if (
          bookingList[i].desk._id === deskIdString &&
          bookingList[i].date === d &&
          bookingList[i].status === "booked"
        ) {
          count -= 1;
        }
      }
    }
  }
  return count;
};
