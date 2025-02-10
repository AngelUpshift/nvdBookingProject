import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IAttendance } from "../../../types/attendance/attendance";
import { bookingStatus } from "../../../types/booking/booking";
import { deskDirection, deskStatus } from "../../../types/desk/desk";
import { userRole } from "../../../types/user/user";
import axios from "axios";
import axiosInstance from "../../../utils/axiosInstance";
import toast from "react-hot-toast";
import dayjs from "dayjs";

export const initialState: IAttendance = {
  userId: {
    _id: "",
    first_name: "",
    last_name: "",
    team: "",
    squad: "",
    email: "",
    password: "",
    role: "" as userRole,
    avatar_url: "",
  },
  bookingId: {
    _id: "",
    status: "" as bookingStatus,
    date: "",
    user: {
      _id: "",
      first_name: "",
      last_name: "",
      team: "",
      squad: "",
      email: "",
      password: "",
      role: "" as userRole,
      avatar_url: "",
    },
    desk: {
      _id: "",
      name: "",
      shortName: "",
      description: "",
      status: "" as deskStatus,
      direction: "" as deskDirection,
    },
    duration: 1,
    notes: "",
    cancellationReason: "",
    referenceNumber: "",
  },
  clockIn: new Date(),
  clockOut: new Date(),
  isClockIn: false,
  isClockOut: false,
};

export const clockInThunk = createAsyncThunk(
  "attendance/clock-in",
  async (bookingId: string | undefined, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/attendance/clock-in", {
        bookingId,
      });
      toast.success("Successfull clock-in");

      const today = dayjs().format("YYYY-MM-DD");
      localStorage.setItem(
        "clockInStatus",
        JSON.stringify({ status: "clockedIn", date: today })
      );

      setTimeout(() => {
        window.location.href = "/clock-out";
      }, 1000);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error("Failed to clock in");
        return rejectWithValue(error.response.data);
      } else {
        toast.error("An unexpected error occurred");
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export const clockOutThunk = createAsyncThunk(
  "attendance/clock-out",
  async (bookingId: string | undefined, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/attendance/clock-out", {
        bookingId,
      });
      toast.success("Successfull clock-out");

      localStorage.removeItem("clockInStatus");

      setTimeout(() => {
        window.location.href = "/room";
      }, 1000);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error("Failed to clock out");
        return rejectWithValue(error.response.data);
      } else {
        toast.error("An unexpected error occurred");
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(clockInThunk.fulfilled, (state, action) => {
      state.bookingId = action.payload.bookingId;
      state.userId = action.payload.userId;
      state.clockIn = action.payload.clockIn;
      state.isClockIn = action.payload.isClockIn;
    });
    builder.addCase(clockOutThunk.fulfilled, (state, action) => {
      state.bookingId = action.payload.bookingId;
      state.userId = action.payload.userId;
      state.clockIn = action.payload.clockIn;
      state.clockOut = action.payload.clockOut;
    });
  },
});

export default attendanceSlice.reducer;
