import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IUser, userRole } from "../../../types/user/user";
import { IUserPutUser } from "../../../types/user/putUser";
import {
  IUserGetUserQuery,
  IUserPaginationMetadata,
} from "../../../types/user/getUser";
import axios from "axios";
import axiosInstance from "../../../utils/axiosInstance";
import toast from "react-hot-toast";

interface IUserState {
  currentUser: IUser;
  userList: IUser[];
  queryParameters: IUserGetUserQuery;
  paginationMetadata: IUserPaginationMetadata;
}

const initialState: IUserState = {
  currentUser: {
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
  userList: [],
  queryParameters: {},
  paginationMetadata: {
    totalUsers: 0,
    totalPages: 0,
    currentPage: 1,
  },
};

export const getUserThunk = createAsyncThunk(
  "user/getAll",
  async (queryParams: IUserGetUserQuery, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/", {
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

export const putUserThunk = createAsyncThunk(
  "user/update",
  async (
    { id, ...userData }: { id: string | undefined } & IUserPutUser,
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(`/user/${id}`, userData);
      toast.success("Successfully edited profile");
      setTimeout(() => {
        window.location.href = "/me";
      }, 1000);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error("Error while editing profile");
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("An unexpedted error occurred");
      }
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserThunk.fulfilled, (state, action) => {
      state.userList = action.payload.users;
      state.paginationMetadata = {
        totalUsers: action.payload.totalUsers,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };
    });
    builder.addCase(putUserThunk.fulfilled, (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
      state.userList = state.userList.map((user) =>
        user._id === action.payload._id ? { ...user, ...action.payload } : user
      );
    });
  },
});

export default userSlice.reducer;
