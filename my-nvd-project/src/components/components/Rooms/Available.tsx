import { Box, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect } from "react";
import { getBookingThunk } from "../../redux/slices/bookingSlice";
import { normalizeDateToUTC } from "../ClockIn/DateToUTC";
import dayjs from "dayjs";

interface SeatProps {
  deskId: string;
  roomId: string;
}

export const Available = ({ deskId, roomId }: SeatProps) => {
  const dispatch = useAppDispatch();
  const booking = useAppSelector((state) => state.booking);

  useEffect(() => {
    const defaultQueryParams = {
      search: "",
      sortBy: "createdAt",
      page: 1,
      order: "asc",
    };

    dispatch(getBookingThunk(booking.queryParameters || defaultQueryParams));
  }, [dispatch, booking.queryParameters]);

  const newList = booking.bookingList.map((value) => ({
    ...value,
    date: normalizeDateToUTC(value.date),
  }));

  let day = dayjs().startOf("day").add(1, "day").toISOString();
  day = normalizeDateToUTC(day);

  const bookingId = newList.find(
    (value) =>
      value.date === day &&
      value.status === "booked" &&
      value.desk._id === deskId
  );
  let object;
  let flag = 0;
  let formattedDate;
  if (newList.length > 0) {
    for (let i = 0; i < newList.length; i++) {
      if (
        newList[i].user._id === bookingId?.user._id &&
        newList[i].status === "booked" &&
        newList[i].date === bookingId.date &&
        newList[i].desk._id === deskId
      ) {
        if (newList[i].duration > 1) {
          object = newList[i + newList[i].duration - 1];
          flag = 1;
          const splitDate = object.date.split("-");
          formattedDate =
            splitDate[2] + "/" + splitDate[1] + "/" + splitDate[0];
          break;
        } else {
          object = newList[i];
          flag = 1;
          const splitDate = object.date.split("-");
          formattedDate =
            splitDate[2] + "/" + splitDate[1] + "/" + splitDate[0];
          break;
        }
      }
      if (flag === 1) {
        break;
      }
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        width: 224,
        height: 18,
        gap: "10px",
        padding: "4px, 6px, 4px, 6px",
      }}
    >
      {bookingId?._id === undefined ? (
        <Typography
          sx={{
            width: "64px",
            paddingTop: "2px",
            background: "#C8E6C9",
            borderRadius: "4px",
            letterSpacing: "0.5px",
          }}
          fontStyle="Roboto"
          fontSize="10px"
          fontWeight="600"
          lineHeight="14px"
          color="#2A602C "
          textAlign="center"
        >
          AVAILABLE
        </Typography>
      ) : (
        <Typography
          color="#B71C1C"
          fontStyle="Roboto"
          fontSize="14px"
          fontWeight="500"
          lineHeight="19.6px"
        >
          Booked by{" "}
          <b>
            {bookingId?.user.first_name} {bookingId?.user.last_name}
          </b>{" "}
          till <b>{formattedDate}</b>
        </Typography>
      )}
    </Box>
  );
};
