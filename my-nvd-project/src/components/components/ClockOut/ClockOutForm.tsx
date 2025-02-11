import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
// import logo from "../../../img/alarm-clocks.jpg";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { clockOutThunk } from "../../redux/slices/attendanceSlice";
import { useEffect } from "react";
import {
  getBookingThunk,
  getLastBookingThunk,
} from "../../redux/slices/bookingSlice";
import { normalizeDateToUTC } from "../ClockIn/DateToUTC";
import dayjs from "dayjs";

export const ClockOutForm = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
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

  const list = booking.bookingList.filter(
    (value) => value.user._id === booking.currentBooking.user._id
  );
  const newList = list.map((value) => ({
    ...value,
    date: normalizeDateToUTC(value.date),
  }));

  let day = dayjs().startOf("day").toISOString();
  day = normalizeDateToUTC(day);

  const bookingId = newList.find((value) => value.date === day);

  const Clockout = () => {
    dispatch(clockOutThunk(bookingId?._id));
  };

  const formattedDay = day.split("-");
  const newDay =
    formattedDay[2] + "/" + formattedDay[1] + "/" + formattedDay[0];

  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

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
          Clock out ! ⏰
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
          maxWidth: "232px",
          height: "200px",
          display: "flex",
          left: 121,
          marginTop: "122px",
        }}
      />
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
            backgroundColor: "#B71C1C",
            height: "50px",
            borderRadius: "100px",
            fontSize: "14px",
            fontStyle: "Roboto",
            lineHeight: "16.8px",
            fontWeight: "700",
            textTransform: "none", // Ensure text is not capitalized
          }}
          onClick={Clockout}
        >
          Clock out
        </Button>
      </Box>
    </Box>
  );
};
