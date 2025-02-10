import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { MainRoomForm } from "../../components/Rooms/MainRoomForm";
import { NavigationBar } from "../../components/NavigationBar/NavigationBar";
import { ButtonBack } from "../../components/ButtonBack/ButtonBack";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect, useState } from "react";
import { getRoomThunk } from "../../redux/slices/roomSlice";
import dayjs from "dayjs";
import { normalizeDateToUTC } from "../../components/ClockIn/DateToUTC";
import { getBookingThunk } from "../../redux/slices/bookingSlice";
import { MainRoomAvailability } from "../../components/Fuction";
import MediaQuery from "react-responsive";
import { NavigationBarDesktopNoLogout } from "../../components/NavigationBar/NavigationBarDesktopNoLogout";
import { Link } from "react-router-dom";

export const MainRoomPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const dispatch = useAppDispatch();

  const room = useAppSelector((state) => state.room);
  const booking = useAppSelector((state) => state.booking);

  let day = dayjs().startOf("day").add(1, "day").toISOString();
  day = normalizeDateToUTC(day);
  day = day.split("T")[0] + "T00:00:00.000Z";

  useEffect(() => {
    const defaultQueryParams = {
      search: "",
      sortBy: "createdAt",
      page: 1,
      order: "asc",
    };

    dispatch(getRoomThunk(room.queryParameters || defaultQueryParams));
  }, [dispatch, room.queryParameters]);
  useEffect(() => {
    const defaultQueryParams = {
      search: "",
      sortBy: "createdAt",
      page: 1,
      order: "asc",
    };

    dispatch(getBookingThunk(booking.queryParameters || defaultQueryParams));
  }, [dispatch, booking.queryParameters]);

  const [mainCounter, setMainCounter] = useState(8);
  useEffect(() => {
    setMainCounter(
      MainRoomAvailability(booking.bookingList, room.roomList, day)
    );
  }, [booking.bookingList, room.roomList, day]);

  return (
    <Container
      maxWidth={isMobile ? "xs" : isTablet ? "sm" : "md"} // Adjust maxWidth based on screen size
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing(2),
        width: isMobile ? "100%" : "100%",
        height: isMobile ? "90vh" : isTablet ? "100vh" : "80vh", // Adjust height based on screen size
        maxHeight: "100%",
        TOP: 20,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          height: "100%",
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        <MediaQuery maxWidth={1023}>
          <ButtonBack />
        </MediaQuery>
        {room.roomList.length > 0 && (
          <>
            <Box
              sx={{
                width: "100%",
                maxWidth: 400,
                display: isMobile ? "none" : "flex",
                flexDirection: "row",
                position: "absolute",
                left: "100px",
                top: "130px",
                gap: "5px",
              }}
            >
              <Link to="/room" style={{ textDecoration: "none" }}>
                <Typography color="#686868">Home / </Typography>
              </Link>
              <Typography color=" #039ADE">
                {" "}
                {room.roomList[0]?.name} 🏣
              </Typography>
            </Box>
            <Typography
              sx={{
                width: "100%",
                maxWidth: 361,
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                left: isMobile ? 16 : "",
                top: isMobile ? 112 : 185,
              }}
              textAlign={isMobile || isTablet ? "left" : "center"}
              fontStyle="Roboto"
              fontSize="24px"
              fontWeight="700"
              lineHeight="33.6px"
            >
              {room.roomList[0]?.name} 🏣
              <Typography
                sx={{
                  width: "100%",
                  maxWidth: 361,

                  display: "flex",
                  flexDirection: "column",
                  position: "absolute",
                  left: isMobile ? 0 : "",
                  top: isMobile ? 25 : 30,
                }}
                textAlign={isMobile || isTablet ? "left" : "center"}
                fontStyle="Roboto"
                fontSize="18px"
                fontWeight="400"
                lineHeight="25.5px"
                color="#686868"
              >
                {" "}
                {room.roomList[0]?.desks.length} seats / {mainCounter} seats
                available
              </Typography>
            </Typography>
            <MainRoomForm />
          </>
        )}
        <MediaQuery maxWidth={1023}>
          {" "}
          <NavigationBar />
        </MediaQuery>
        <MediaQuery minWidth={1024}>
          {" "}
          <NavigationBarDesktopNoLogout />
        </MediaQuery>
      </Box>
    </Container>
  );
};
