import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
// import logo from "../../../img/watch.jpg";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect } from "react";
import { clockInThunk } from "../../redux/slices/attendanceSlice";
import {
  getBookingThunk,
  getLastBookingThunk,
} from "../../redux/slices/bookingSlice";
import dayjs from "dayjs";
import { normalizeDateToUTC } from "./DateToUTC";

export const ClockInForm = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

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

  useEffect(() => {
    dispatch(getLastBookingThunk());
  }, [dispatch]);

  const list = booking.currentBooking?.user
    ? booking.bookingList.filter(
        (value) => value.user._id === booking.currentBooking.user._id
      )
    : [];
  const newList = list.map((value) => ({
    ...value,
    date: normalizeDateToUTC(value.date),
  }));

  let day = dayjs().startOf("day").toISOString();
  day = normalizeDateToUTC(day);

  const bookingId = newList.find((value) => value.date === day);

  const Clockin = () => {
    dispatch(clockInThunk(bookingId?._id));
  };

  const formattedDay = day.split("-");
  const newDay =
    formattedDay[2] + "/" + formattedDay[1] + "/" + formattedDay[0];

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "350px", // Fixed width
        width: "100%",
        padding: theme.spacing(2),
        backgroundColor: "white",
        gap: theme.spacing(2),
        left: "32px",
        boxSizing: "border-box", // Ensure padding doesn't cause overflow
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Typography
          sx={{
            width: "100%",
          }}
          textAlign={isDesktop ? "center" : isTablet ? "center" : "left"}
          fontSize="24px"
          fontStyle="Roboto"
          fontWeight="700"
        >
          Clock in ! ⏰
        </Typography>
        <Typography
          sx={{
            width: "100%",
          }}
          textAlign={isDesktop ? "center" : isTablet ? "center" : "left"}
          fontSize="18px"
          fontStyle="Roboto"
          fontWeight="500"
          color="#686868"
        >
          Today is <span>{newDay}</span>
        </Typography>
      </Box>
      <Box
        component="img"
        // src={logo}
        sx={{
          width: "100%",
          maxWidth: "152px",
          height: "200px",
          display: "flex",
          marginTop: "122px",
        }}
      />
      {bookingId ? (
        <Box
          sx={{
            display: "flex",
            width: "100%", // Fixed width
            maxWidth: "324px", // Responsive width
            left: 35,
            marginTop: "100px",
          }}
        >
          <Button
            type="button"
            variant="contained"
            size="large"
            fullWidth
            sx={{
              height: "50px",
              borderRadius: "100px",
              fontSize: "14px",
              fontStyle: "Roboto",
              lineHeight: "16.8px",
              fontWeight: "700",
              textTransform: "none", // Ensure text is not capitalized
            }}
            onClick={Clockin}
          >
            Clock in
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            width: "100%", // Fixed width
            maxWidth: "324px", // Responsive width
            left: 35,
            marginTop: "100px",
          }}
        >
          <Button
            type="button"
            variant="contained"
            size="large"
            fullWidth
            disabled
            sx={{
              height: "50px",
              borderRadius: "100px",
              fontSize: "14px",
              fontStyle: "Roboto",
              lineHeight: "16.8px",
              fontWeight: "700",
              textTransform: "none", // Ensure text is not capitalized
            }}
          >
            Clock in
          </Button>
        </Box>
      )}
    </Box>
  );
};
