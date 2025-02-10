import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import isoWeek from "dayjs/plugin/isoWeek";
import { DateObject } from "react-multi-date-picker";
import { Calendar as MyCalendar } from "react-multi-date-picker";
import "../../../css/calendar.css";

dayjs.extend(isoWeek);

interface CalendarProps {
  open: boolean;
  onClose: () => void;
  setCustomDates: (dates: Date[]) => void;
  setDuration: (duration: number) => void;
  MultipleBookingLogic: () => void;
}

export const Calendar = ({
  open,
  onClose,
  setCustomDates,
  setDuration,
  MultipleBookingLogic,
}: CalendarProps) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDateChange = (newValues: DateObject[] | null) => {
    if (newValues) {
      const dates = newValues.map((value) => value.toDate());
      setSelectedDates(dates);
    }
  };

  const handleOkayClick = () => {
    if (selectedDates.length > 0) {
      setConfirmOpen(true); // Show confirmation dialog
      setCustomDates(selectedDates);
      setDuration(1);
    }
  };
  const handleConfirmClose = () => {
    setConfirmOpen(false); // Close confirmation dialog
  };

  const handleConfirmYes = () => {
    MultipleBookingLogic(); // Proceed with booking
    setConfirmOpen(false); // Close confirmation dialog
    onClose(); // Close calendar dialog
  };

  const formattedDate = selectedDates.map((value) => value.toDateString());

  const tommorow = new Date();
  tommorow.setDate(tommorow.getDate() + 1);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="logout-dialog-title"
          aria-describedby="logout-dialog-description"
          maxWidth="xs" // Adjust maxWidth as needed
          fullWidth // Ensures the dialog takes full width up to maxWidth
          sx={{
            "& .MuiDialog-paper": {
              maxWidth: "369px",
              width: "100%", // Set the width to 100% of its container
              height: "398px", // Set the desired height
              borderRadius: "20px", // Custom border radius
            },
          }}
        >
          <DialogTitle id="logout-dialog-title">
            <Typography
              sx={{ display: "flex", width: "100%" }}
              fontSize="18px"
              fontStyle="Roboto"
              fontWeight="700"
              lineHeight="25.2px"
            >
              Pick a date
            </Typography>
          </DialogTitle>
          <DialogContent>
            <MyCalendar
              multiple
              value={selectedDates.map((value) => value)}
              onChange={handleDateChange}
              format="DD/MM/YYYY"
              numberOfMonths={1}
              minDate={tommorow}
            />
          </DialogContent>
          <DialogActions
            sx={{
              width: 200,
              display: "flex",
              flexDirection: "row",
              position: "absolute",
              right: 16,
              top: 330,
            }}
          >
            <Button
              size="medium"
              sx={{
                width: " 78px",
                borderRadius: "100px",
                backgroundColor: "#DBDBDD",
                padding: "9px 16px 9px 16px",
                textTransform: "none",
                color: "gray",
              }}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="medium"
              sx={{
                width: " 78px",
                padding: "9px 16px 9px 16px",
                borderRadius: "100px",
                textTransform: "none",
              }}
              autoFocus
              onClick={handleOkayClick}
            >
              Okay
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={confirmOpen}
          onClose={handleConfirmClose}
          aria-labelledby="confirm-dialog-title"
          aria-describedby="confirm-dialog-description"
          maxWidth="xs" // Adjust maxWidth as needed
          fullWidth // Ensures the dialog takes full width up to maxWidth
          sx={{
            "& .MuiDialog-paper": {
              width: "369px", // Set the width to 100% of its container
              height: "184px", // Set the desired height
              borderRadius: "20px", // Custom border radius
              top: "44px", // Adjust top positioning
            },
          }}
        >
          <DialogTitle id="confirm-dialog-title">
            <Typography fontSize="18px" fontStyle="Roboto" fontWeight="700">
              Booked a seat
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="confirm-dialog-description">
              <Typography
                fontWeight="400"
                fontSize="14px"
                fontStyle="Roboto"
                lineHeight="19.6px"
              >
                Are you sure you want to book your seat for{" "}
                <Typography
                  fontStyle="Roboto"
                  fontWeight="400"
                  lineHeight="19.6px"
                  fontSize="14px"
                  color="primary"
                >
                  {" "}
                  {formattedDate.map((value) => value).join(", ")}
                </Typography>
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              size="medium"
              sx={{
                width: "78px",
                height: "38px",
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
              onClick={handleConfirmClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
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
              autoFocus
              onClick={handleConfirmYes}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};
