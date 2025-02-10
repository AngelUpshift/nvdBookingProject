import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Calendar } from "./Calendar";
import CloseIcon from "@mui/icons-material/Close";
import {
  cancelBookingThunk,
  getBookingThunk,
  postBookingThunk,
} from "../../redux/slices/bookingSlice";
import { normalizeDateToUTC } from "../ClockIn/DateToUTC";
import { getUserIdFromToken } from "../../../getUserIdFromToken/getUserIdFromToken";

interface SeatProps {
  deskId: string;
  roomId: string;
}

export const ButtonBookSeat = ({ deskId, roomId }: SeatProps) => {
  const dispatch = useAppDispatch();

  const book = useAppSelector((state) => state.booking);
  const [open, setOpen] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpenCancel = () => {
    setOpenCancel(true);
  };

  const [selectedValue, setSelectedValue] = useState<string>("");
  const [customDate, setCustomDate] = useState<Dayjs | null>(dayjs());
  const [duration, setDuration] = useState<number>(1);
  const [customDates, setCustomDates] = useState<Date[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    if (value === "Next day") {
      setDuration(1);
      setCustomDate(dayjs().add(1, "day"));
    } else if (value === "Three days in a row") {
      setDuration(3);
      setCustomDate(dayjs().add(1, "day"));
    } else if (value === "Five days in a row") {
      setDuration(5);
      setCustomDate(dayjs().add(1, "day"));
    } else if (value === "Ten days in a row") {
      setDuration(10);
      setCustomDate(dayjs().add(1, "day"));
    }
  };

  const handleCalendarOpen = () => {
    setCalendarOpen(true);
  };
  const handleCalendarClose = () => {
    setCalendarOpen(false);
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  const handleClickCloseCancel = () => {
    setOpenCancel(false);
  };

  const MultipleBookingLogic = () => {
    customDates.forEach((date) => {
      const booking = {
        room_id: roomId,
        desk_id: deskId,
        date: date ? date.toISOString() : new Date().toISOString(),
        duration: 1, // Each date has a duration of 1 day
      };
      dispatch(postBookingThunk(booking));
    });
    handleClickClose();
  };

  const booking = {
    room_id: roomId,
    desk_id: deskId,
    date: customDate ? customDate.toISOString() : new Date().toISOString(),
    duration: duration,
  };

  const BookingLogic = () => {
    dispatch(postBookingThunk(booking));
    handleClickClose();
  };

  useEffect(() => {
    const defaultQueryParams = {
      search: "",
      sortBy: "createdAt",
      order: "asc",
      page: 1,
    };

    dispatch(getBookingThunk(book.queryParameters || defaultQueryParams));
  }, [dispatch, book.queryParameters]);

  const newList = book.bookingList.map((value) => ({
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

  const tokenUserId = getUserIdFromToken();

  const id =
    bookingId?._id !== undefined &&
    bookingId.status === "booked" &&
    bookingId.user._id === tokenUserId
      ? bookingId._id
      : "undefined";

  const cancelBookingLogic = () => {
    dispatch(cancelBookingThunk(id));
    handleClickCloseCancel();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          width: { xs: 105, sm: 105, md: 113, lg: 120 },
          height: 38,
          left: 236,
          position: "absolute",
        }}
      >
        {bookingId?._id === undefined ? (
          <Button
            sx={{
              width: "100%",
              height: 38,
              gap: "8px",
              borderRadius: "100px",
              padding: "1.5px 0px 1.5px 0px",
            }}
            variant="contained"
            onClick={handleClickOpen}
          >
            <Typography
              fontSize="14px"
              fontWeight="700"
              lineHeight="16.8px"
              textAlign="center"
              textTransform="none"
            >
              Book a Seat
            </Typography>
          </Button>
        ) : bookingId?.user._id === tokenUserId && bookingId.date === day ? (
          <Button
            sx={{
              width: "100%",
              height: 38,
              gap: "8px",
              borderRadius: "100px",
              padding: "1.5px 0px 1.5px 0px",
              backgroundColor: "#B71C1C",
              "&.MuiButton-contained": {
                backgroundColor: "#B71C1C", // Force the contained variant to use your background color
                color: "white",
              },
            }}
            variant="contained"
            onClick={handleClickOpenCancel}
          >
            <Typography
              sx={{ width: "100%" }}
              fontSize="14px"
              fontWeight="700"
              lineHeight="16.8px"
              textAlign="center"
              textTransform="none"
            >
              Cancel a Seat
            </Typography>
          </Button>
        ) : (
          <Button
            sx={{
              width: "100%",
              height: 38,
              gap: "8px",
              borderRadius: "100px",
              padding: "1.5px 0px 1.5px 0px",
              backgroundColor: "#8BD1F0",
              "&.MuiButton-contained": {
                backgroundColor: "#8BD1F0", // Force the contained variant to use your background color
                color: "white",
              },
            }}
            variant="contained"
            onClick={handleClickOpen}
            disabled
          >
            <Typography
              sx={{ width: "100%" }}
              fontSize="14px"
              fontWeight="700"
              lineHeight="16.8px"
              textAlign="center"
              textTransform="none"
            >
              Book a Seat
            </Typography>
          </Button>
        )}
        <Dialog
          open={openCancel}
          onClose={handleClickCloseCancel}
          aria-labelledby="logout-dialog-title"
          aria-describedby="logout-dialog-description"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: "20px",
              width: "369px",
              position: "absolute",
              height: "164px",
            },
          }}
        >
          <CloseIcon
            sx={{
              width: 20,
              height: 20,
              display: "flex",
              position: "absolute",
              flexDirection: "column",
              top: 10,
              right: 10,
            }}
            onClick={handleClickCloseCancel}
          />
          <DialogTitle id="logout-dialog-title">
            <Typography fontSize="18px" fontStyle="Roboto" fontWeight="700">
              Cancel a seat
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="logout-dialog-description">
              <Typography fontWeight="400" fontSize="14px" fontStyle="Roboto">
                Are you sure you want to <b>Cancel this seat ?</b>
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              size="medium"
              sx={{
                width: "78px",
                borderRadius: "100px",
                backgroundColor: "#DBDBDD",
                textTransform: "none",
                color: "gray",
                top: "-40%",
                fontWeight: 700,
                fontSize: "14px",
                fontStyle: "Roboto",
                right: "1%",
              }}
              onClick={handleClickCloseCancel}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="medium"
              sx={{
                width: "78px",
                height: "38px",
                padding: "9px 16px 9px 16px",
                borderRadius: "100px",
                textTransform: "none",
                top: "-40%",
                fontWeight: 700,
                fontSize: "14px",
                fontStyle: "Roboto",
                right: "1%",
              }}
              onClick={cancelBookingLogic}
              autoFocus
            >
              Okay
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={open}
          onClose={handleClickClose}
          aria-labelledby="logout-dialog-title"
          aria-describedby="logout-dialog-description"
          sx={{
            "& .MuiDialog-paper": {
              borderRadius: "20px", // Custom border radius
              height: "340px",
              width: "369px",
            },
          }}
        >
          <DialogTitle id="logout-dialog-title">
            <Typography fontSize="18px" fontStyle="Roboto" fontWeight="700">
              Book a seat
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="logout-dialog-description">
              <Typography
                fontWeight="400"
                fontSize="14px"
                fontStyle="Roboto"
                lineHeight="19.6px"
              >
                Select the frequency you would like to be at this seat:
              </Typography>
            </DialogContentText>

            <FormControl component="fieldset">
              <RadioGroup
                value={selectedValue}
                onChange={handleChange}
                sx={{
                  "&.Mui-checked": {
                    color: "#8BD1F0", // Change color when checked
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: 16, // Change the size of the radio button
                  },
                }}
              >
                <FormControlLabel
                  value="Next day"
                  control={<Radio />}
                  label={
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 400,
                        fontStyle: "Roboto",
                        lineHeight: "16.8px",
                        color: "#686868",
                      }}
                    >
                      Next day
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="Three days in a row"
                  control={<Radio />}
                  label={
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 400,
                        fontStyle: "Roboto",
                        lineHeight: "16.8px",
                        color: "#686868",
                      }}
                    >
                      Three days in a row
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="Five days in a row"
                  control={<Radio />}
                  label={
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 400,
                        fontStyle: "Roboto",
                        lineHeight: "16.8px",
                        color: "#686868",
                      }}
                    >
                      Five days in a row
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="Ten days in a row"
                  control={<Radio />}
                  label={
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 400,
                        fontStyle: "Roboto",
                        lineHeight: "16.8px",
                        color: "#686868",
                      }}
                    >
                      Ten days in a row
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="Custom day"
                  control={<Radio />}
                  label={
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 400,
                        fontStyle: "Roboto",
                        lineHeight: "16.8px",
                        color: "#686868",
                      }}
                    >
                      Custom day
                    </Typography>
                  }
                  onClick={handleCalendarOpen}
                />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions
            sx={{
              width: 200,
              display: "flex",
              flexDirection: "row",
              position: "absolute",
              right: 16,
              top: 261,
            }}
          >
            <Button
              size="medium"
              sx={{
                borderRadius: "100px",
                padding: "9px 16px 9px 16px",
                width: " 78px",
                fontWeight: 700,
                fontSize: "14px",
                fontStyle: "Roboto",
                backgroundColor: "#DBDBDD",
                textTransform: "none",
                color: "gray",
              }}
              onClick={handleClickClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="medium"
              sx={{
                width: " 78px",
                fontWeight: 700,
                fontSize: "14px",
                fontStyle: "Roboto",
                padding: "9px 16px 9px 16px",
                borderRadius: "100px",
                textTransform: "none",
              }}
              autoFocus
              onClick={BookingLogic}
            >
              Okay
            </Button>
          </DialogActions>
        </Dialog>
        <Calendar
          open={calendarOpen}
          onClose={handleCalendarClose}
          setCustomDates={setCustomDates}
          setDuration={setDuration}
          MultipleBookingLogic={MultipleBookingLogic}
        />
      </Box>
    </LocalizationProvider>
  );
};
