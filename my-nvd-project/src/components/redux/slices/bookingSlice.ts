import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bookingStatus, IBooking } from "../../../types/booking/booking";
import {
  IBookingGetBookingQuery,
  IBookingPaginationMetadata,
} from "../../../types/booking/getBooking";
import { deskDirection, deskStatus } from "../../../types/desk/desk";
import { userRole } from "../../../types/user/user";
import { IBookingPostBooking } from "../../../types/booking/postBooking";
import { IBookingPutBooking } from "../../../types/booking/putBooking";
import axios from "axios";
import { IBookingGetBookingByIdParams } from "../../../types/booking/getBookingById";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-hot-toast";

export interface bookingState {
  currentBooking: IBooking;
  bookingList: IBooking[];
  queryParameters: IBookingGetBookingQuery;
  paginationMetadata: IBookingPaginationMetadata;
}

export const initialState: bookingState = {
  currentBooking: {
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
  bookingList: [],
  queryParameters: {},
  paginationMetadata: {
    totalBookings: 0,
    totalPages: 0,
    currentPage: 1,
  },
};

export const getLastBookingThunk = createAsyncThunk(
  "booking/last",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/booking/last-booking");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export const postBookingThunk = createAsyncThunk(
  "booking/create",
  async (bookingData: IBookingPostBooking, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/booking/", bookingData);
      toast.success("Successfull booking");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error("Cannot book on this date");
        return rejectWithValue(error.response.data);
      } else {
        toast.error("An unexpected error occured");
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export const putBookingThunk = createAsyncThunk(
  "booking/update",
  async (bookingData: IBookingPutBooking, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/booking/${bookingData._id}`,
        bookingData
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("An unexpedted error occurred");
      }
    }
  }
);

export const cancelBookingThunk = createAsyncThunk(
  "booking/cancel",
  async (id: string | undefined, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/booking/cancel", { id });
      toast.success("Successfully canceled your booking");

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error("Error while canceling booking");
        return rejectWithValue(error.response.data);
      } else {
        toast.error("An unexpected error occurred");
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export const getBookingThunk = createAsyncThunk(
  "booking/getAll",
  async (queryParams: IBookingGetBookingQuery, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/booking/", {
        params: queryParams,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("An unexpedted error occurred");
      }
    }
  }
);

export const getBookingByIdThunk = createAsyncThunk(
  "booking/getById",
  async (bookingData: IBookingGetBookingByIdParams, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/booking/${bookingData._id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("An unexpedted error occurred");
      }
    }
  }
);

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    updatePagination: (state, action) => {
      state.paginationMetadata.currentPage = action.payload.currentPage;
    },
    resetBookingState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getLastBookingThunk.fulfilled, (state, action) => {
      state.currentBooking = action.payload;
    });
    builder.addCase(postBookingThunk.fulfilled, (state, action) => {
      state.currentBooking = action.payload[action.payload.length - 1];
      state.bookingList = [...state.bookingList, ...action.payload];
    });
    builder.addCase(putBookingThunk.fulfilled, (state, action) => {
      state.currentBooking = {
        ...state.currentBooking,
        ...action.payload,
      };
    });
    builder.addCase(cancelBookingThunk.fulfilled, (state, action) => {
      state.bookingList = state.bookingList.map((booking) => {
        const canceledBooking = action.payload.find(
          (canceled: IBooking) => canceled._id === booking._id
        );
        return canceledBooking
          ? { ...booking, status: bookingStatus.CANCELLED }
          : booking;
      });

      if (
        action.payload.some(
          (canceled: IBooking) => canceled._id === state.currentBooking._id
        )
      ) {
        state.currentBooking.status = bookingStatus.CANCELLED;
      }
    });
    builder.addCase(getBookingThunk.fulfilled, (state, action) => {
      state.bookingList = action.payload.bookings;
      state.paginationMetadata = {
        totalBookings: action.payload.totalBookings,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };
    });
    builder.addCase(getBookingByIdThunk.fulfilled, (state, action) => {
      state.currentBooking = action.payload;
    });
  },
});
export const { updatePagination, resetBookingState } = bookingSlice.actions;

export default bookingSlice.reducer;
