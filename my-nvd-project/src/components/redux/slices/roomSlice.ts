import { IDesk } from "../../../types/desk/desk";
import {
  IRoomGetRoomQuery,
  IRoomPaginationMetadata,
} from "../../../types/room/getRoom";
import { IRoomGetRoomByIdParams } from "../../../types/room/getRoomById";
import { IRoomPostRoom } from "../../../types/room/postRoom";
import { IRoomPutRoom } from "../../../types/room/putRoom";
import { IImage, IRoom, roomStatus, roomType } from "../../../types/room/room";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../../utils/axiosInstance";

export interface roomState {
  currentRoom: IRoom;
  roomList: IRoom[];
  queryParameters: IRoomGetRoomQuery;
  paginationMetadata: IRoomPaginationMetadata;
}

export const initialState: roomState = {
  currentRoom: {
    _id: "",
    name: "",
    description: "",
    images: [] as IImage[],
    desks: [] as IDesk[],
    type: "" as roomType,
    status: "" as roomStatus,
  },
  roomList: [],
  queryParameters: {},
  paginationMetadata: {
    totalRooms: 0,
    totalPages: 0,
    currentPage: 1,
  },
};

export const putRoomThunk = createAsyncThunk(
  "room/update",
  async (roomData: IRoomPutRoom, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/room/${roomData._id}`,
        roomData
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

export const postRoomThunk = createAsyncThunk(
  "room/create",
  async (roomData: IRoomPostRoom, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/room/", roomData);
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

export const getRoomThunk = createAsyncThunk(
  "room/getAll",
  async (queryParams: IRoomGetRoomQuery, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/room/", {
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

export const getRoomByIdThunk = createAsyncThunk(
  "room/getById",
  async (roomData: IRoomGetRoomByIdParams, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/room/${roomData._id}`);
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

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRoomThunk.fulfilled, (state, action) => {
      state.roomList = action.payload.rooms;
      state.paginationMetadata = {
        totalRooms: action.payload.totalRooms,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };
    });
    builder.addCase(getRoomByIdThunk.fulfilled, (state, action) => {
      state.currentRoom = action.payload;
    });
    builder.addCase(postRoomThunk.fulfilled, (state, action) => {
      state.currentRoom = action.payload;
      state.roomList = [...state.roomList, action.payload];
    });
    builder.addCase(putRoomThunk.fulfilled, (state, action) => {
      state.currentRoom = { ...state.currentRoom, ...action.payload };
      state.roomList = state.roomList.map((room) =>
        room._id === action.payload._id ? { ...room, ...action.payload } : room
      );
    });
  },
});

export default roomSlice.reducer;
