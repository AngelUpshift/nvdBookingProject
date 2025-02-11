import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect, useState } from "react";
import { getRoomThunk } from "../../redux/slices/roomSlice";
import {
  getBookingThunk,
  getLastBookingThunk,
} from "../../redux/slices/bookingSlice";
import { normalizeDateToUTC } from "../ClockIn/DateToUTC";
import dayjs from "dayjs";
import WeatherWidget from "../weather Widget/WeatherWidget";
import { CoolRoomAvailability, MainRoomAvailability } from "../Fuction";

export const RoomsForm = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const room = useAppSelector((state) => state.room);
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

  useEffect(() => {
    dispatch(getLastBookingThunk());
  }, [dispatch]);

  useEffect(() => {
    const defaultQueryParams = {
      search: "",
      sortBy: "createdAt",
      page: 1,
      order: "asc",
    };

    dispatch(getRoomThunk(room.queryParameters || defaultQueryParams));
  }, [dispatch, room.queryParameters]);

  let roomName;
  if (booking.currentBooking._id !== undefined) {
    for (let i = 0; i < room.roomList.length; i++) {
      for (let j = 0; j < room.roomList[i].desks.length; j++) {
        if (
          booking.currentBooking.desk._id ===
          room.roomList[i].desks[j].toString()
        ) {
          roomName = room.roomList[i];
          break;
        }
      }
    }
  }

  let formattedDate;
  let notBookingsYetString;
  if (booking.currentBooking._id !== undefined && roomName?._id !== undefined) {
    const date = booking.currentBooking.date.substring(0, 10);
    const date1 = date.split("-");
    formattedDate = date1[2] + "/" + date1[1] + "/" + date1[0];
  } else {
    notBookingsYetString = "Don't have bookings yet";
  }

  let d = dayjs().startOf("day").add(1, "day").toISOString();
  d = normalizeDateToUTC(d);
  d = d.split("T")[0] + "T00:00:00.000Z";

  const [mainCounter, setMainCounter] = useState(8);
  useEffect(() => {
    setMainCounter(MainRoomAvailability(booking.bookingList, room.roomList, d));
  }, [booking.bookingList, room.roomList, d]);

  const [coolCounter, setCoolCounter] = useState(3);
  useEffect(() => {
    setCoolCounter(CoolRoomAvailability(booking.bookingList, room.roomList, d));
  }, [booking.bookingList, room.roomList, d]);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: theme.spacing(2),
        gap: theme.spacing(1.5),
      }}
    >
      <Typography
        sx={{
          width: "100%",
          textAlign: isMobile ? "left" : "center",
          fontStyle: "Roboto",
          fontWeight: "700",
          fontSize: "24px",
          lineHeight: "33.6px",
        }}
      >
        Welcome to Book Chair 🏤
      </Typography>
      <Typography
        sx={{
          width: "100%",
          fontStyle: "Roboto",
          fontWeight: "500",
          lineHeight: "25.2px",
          fontSize: "18px",
          color: "#3E3E3E",
          textAlign: isMobile ? "left" : "center",
        }}
      >
        {booking.currentBooking._id !== undefined &&
        roomName?._id !== undefined ? (
          <>
            Your last book was in{" "}
            <b style={{ color: "#039ADE" }}>{roomName?.name}</b> at{" "}
            <b style={{ color: "#039ADE" }}>
              {booking.currentBooking.desk.name.split(" ").pop()}{" "}
              {booking.currentBooking.desk.shortName}
            </b>{" "}
            on <b style={{ color: "#039ADE" }}>{formattedDate}</b>
          </>
        ) : (
          notBookingsYetString
        )}
      </Typography>
      <WeatherWidget />
      <Box
        sx={{
          width: isMobile ? "100%" : "800px",
          left: "16px",
          gap: "12px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {room.roomList.length > 0 && (
          <>
            <Link
              to="/room/main-reserve-desk"
              style={{
                textDecoration: "none",
                width: "100%",
              }}
            >
              <Card
                sx={{
                  width: "100%",
                  height: "86px",
                  borderRadius: "20px", // Added borderRadius here
                }}
              >
                <CardContent>
                  <Typography
                    sx={{
                      width: "100%",
                      height: "25px",
                      paddingTop: "3px",
                    }}
                    fontStyle="Roboto"
                    fontWeight="700"
                    fontSize="18px"
                    component="div"
                    color="#000000"
                  >
                    {room.roomList[0]?.name}
                  </Typography>
                  <Typography
                    sx={{
                      width: "100%",
                      height: "25px",
                      paddingTop: "16px",
                    }}
                    component="div"
                  >
                    {room.roomList[0]?.desks.length} seats total / {mainCounter}{" "}
                    seats available
                  </Typography>
                </CardContent>
              </Card>
            </Link>
            <Link
              to="/room/small-reserve-desk"
              style={{
                textDecoration: "none",
                width: "100%",
              }}
            >
              <Card
                sx={{
                  width: "100%",
                  height: "86px",
                  borderRadius: "20px", // Added borderRadius here
                }}
              >
                <CardContent>
                  <Typography
                    sx={{
                      width: "100%",
                      height: "25px",
                      paddingTop: "3px",
                    }}
                    fontStyle="Roboto"
                    fontWeight="700"
                    fontSize="18px"
                    component="div"
                  >
                    {room.roomList[1]?.name}
                  </Typography>
                  <Typography
                    sx={{
                      width: "100%",
                      height: "25px",
                      paddingTop: "16px",
                    }}
                    component="div"
                  >
                    {room.roomList[1]?.desks.length} seats total / 0 seats
                    available
                  </Typography>
                </CardContent>
              </Card>
            </Link>
            <Link
              to="/room/cool-reserve-desk"
              style={{
                textDecoration: "none",
                width: "100%",
              }}
            >
              <Card
                sx={{
                  width: "100%",
                  height: "86px",
                  borderRadius: "20px", // Added borderRadius here
                }}
              >
                <CardContent>
                  <Typography
                    sx={{
                      width: "100%",
                      height: "25px",
                      paddingTop: "3px",
                    }}
                    fontStyle="Roboto"
                    fontWeight="700"
                    fontSize="18px"
                    component="div"
                  >
                    {room.roomList[2]?.name}
                  </Typography>
                  <Typography
                    sx={{
                      width: "100%",
                      height: "25px",
                      paddingTop: "16px",
                    }}
                    component="div"
                  >
                    {room.roomList[2]?.desks.length} seats total / {coolCounter}{" "}
                    seats available
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </>
        )}
      </Box>
    </Box>
  );
};
