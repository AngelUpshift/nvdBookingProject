import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IUserRegister } from "../../../types/auth/register";
import { IUser, userRole } from "../../../types/user/user";
import { IUserLogin } from "../../../types/auth/login";
import { IUserChangePassword } from "../../../types/auth/changePassword";
import { IUserForgotPassword } from "../../../types/auth/forgotPassword";
import { IUserResetPassword } from "../../../types/auth/resetPassword";
import axiosInstance from "../../../utils/axiosInstance";
import axios from "axios";
import { toast } from "react-hot-toast";

const initialState: IUser = {
  _id: "",
  first_name: "",
  last_name: "",
  team: "",
  squad: "",
  email: "",
  password: "",
  role: "" as userRole,
  avatar_url: "",
};

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (userData: IUserRegister, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/register", userData);

      toast.success("Successfully registered");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);

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

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (userData: IUserLogin, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", userData, {
        withCredentials: true,
      });
      const { accessToken } = response.data;

      localStorage.setItem("token", accessToken);

      toast.success("Successfully logged in");

      setTimeout(() => {
        window.location.href = "/room";
      }, 1000);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error("Wrong email or password");
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      localStorage.removeItem("token");

      toast.success("Successfully logged out");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error("Failed to log out");
        return rejectWithValue(error.response.data);
      } else {
        toast.error("An unexpected error occurred");
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export const meThunk = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/auth/me");
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

export const changePasswordThunk = createAsyncThunk(
  "auth/change-password",
  async (passwordData: IUserChangePassword, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/auth/change-password",
        passwordData
      );
      toast.success("Successfully changed password");
      setTimeout(() => {
        window.location.href = "/me";
      }, 1000);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 400) {
          toast.error("Error while changing password");
        } else if (error.response.status === 409) {
          toast.error("Passwords don't match");
        } else return rejectWithValue(error.response.data);
      } else {
        toast.error("An unexpected error occurred");
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export const forgotPasswordThunk = createAsyncThunk(
  "auth/forgot-password",
  async (passwordData: IUserForgotPassword, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/auth/forgot-password",
        passwordData
      );

      toast.success("Email successfully sent");

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error("Email address doesn't exist");
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export const resetPasswordThunk = createAsyncThunk(
  "auth/reset-password",
  async (
    {
      token,
      ...passwordData
    }: { token: string | undefined } & IUserResetPassword,
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.patch(
        `/auth/reset-password/${token}`,
        passwordData
      );

      toast.success("Successfully reseted password");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error("Passwords must match");
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      state = action.payload;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    });
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.first_name = "";
      state.last_name = "";
      state.team = "";
      state.squad = "";
      state.email = "";
      state.password = "";
      state.role = "" as userRole;
      state.avatar_url = "";
    });
    builder.addCase(meThunk.fulfilled, (state, action) => {
      state._id = action.payload._id;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.team = action.payload.team;
      state.squad = action.payload.squad;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.role = action.payload.role;
      state.avatar_url = action.payload.avatar_url;
    });
    builder.addCase(changePasswordThunk.fulfilled, (state, action) => {
      state._id = action.payload._id;
      state.password = action.payload.password;
    });
    builder.addCase(forgotPasswordThunk.fulfilled, (state, action) => {
      state.email = action.payload.email;
    });
    builder.addCase(resetPasswordThunk.fulfilled, (state, action) => {
      state.password = action.payload.password;
    });
  },
});

export default authSlice.reducer;
