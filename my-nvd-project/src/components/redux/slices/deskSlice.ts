import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deskDirection, deskStatus, IDesk } from "../../../types/desk/desk";
import {
  IDeskGetDeskQuery,
  IDeskPaginationMetadata,
} from "../../../types/desk/getDesk";
import { IDeskPostDesk } from "../../../types/desk/postDesk";
import { IDeskPutDesk } from "../../../types/desk/putDesk";
import axios from "axios";
import axiosInstance from "../../../utils/axiosInstance";

export interface deskState {
  currentDesk: IDesk;
  deskList: IDesk[];
  queryParameters: IDeskGetDeskQuery;
  paginationMetadata: IDeskPaginationMetadata;
}

export const initialState: deskState = {
  currentDesk: {
    _id: "",
    name: "",
    shortName: "",
    description: "",
    status: "" as deskStatus,
    direction: "" as deskDirection,
  },
  deskList: [],
  queryParameters: {},
  paginationMetadata: {
    totalDesks: 0,
    totalPages: 0,
    currentPage: 1,
  },
};

export const getDeskByIdThunk = createAsyncThunk(
  "desk/getById",
  async (id: string | undefined, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/desk/${id}`);
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

export const getDeskThunk = createAsyncThunk(
  "desk/getAll",
  async (queryParams: IDeskGetDeskQuery, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/desk/", {
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

export const postDeskThunk = createAsyncThunk(
  "desk/create",
  async (deskData: IDeskPostDesk, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/desk/", deskData);
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

export const putDeskThunk = createAsyncThunk(
  "desk/update",
  async (deskData: IDeskPutDesk, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/desk/${deskData._id}`,
        deskData
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

export const deskSlice = createSlice({
  name: "desk",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDeskByIdThunk.fulfilled, (state, action) => {
      state.currentDesk = action.payload;
    });
    builder.addCase(getDeskThunk.fulfilled, (state, action) => {
      state.deskList = action.payload.desks;
      state.paginationMetadata = {
        totalDesks: action.payload.totalDesks,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };
    });
    builder.addCase(postDeskThunk.fulfilled, (state, action) => {
      state.currentDesk = action.payload;
      state.deskList = [...state.deskList, action.payload];
    });
    builder.addCase(putDeskThunk.fulfilled, (state, action) => {
      state.currentDesk = { ...state.currentDesk, ...action.payload };
      state.deskList = state.deskList.map((desk) =>
        desk._id === action.payload._id ? { ...desk, ...action.payload } : desk
      );
    });
  },
});

export default deskSlice.reducer;
