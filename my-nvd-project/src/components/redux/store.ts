import { configureStore } from "@reduxjs/toolkit";
import attendanceReducer from "./slices/attendanceSlice";
import authReducer from "./slices/authSlice";
import bookingReducer from "./slices/bookingSlice";
import deskReducer from "./slices/deskSlice";
import roomReducer from "./slices/roomSlice";
import userReducer from "./slices/userSlice";
import { useDispatch as useReduxDispatch } from "react-redux";
import { useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    attendance: attendanceReducer,
    auth: authReducer,
    booking: bookingReducer,
    desk: deskReducer,
    room: roomReducer,
    user: userReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useReduxDispatch;
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
