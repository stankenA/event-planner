import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TNotificationMessage, TNotificationSlice } from "../../utils/types";

export const initialState: TNotificationSlice = {
  isSuccessful: false,
  message: {
    heading: "",
    case: "",
    title: "",
    dayOfWeek: "",
    day: 0,
    month: "",
    time: "",
    location: "",
    isUnicorn: false,
  },
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setIsNotificationSuccessful(state, action: PayloadAction<boolean>) {
      state.isSuccessful = action.payload;
    },
    setNotificationMessage(state, action: PayloadAction<TNotificationMessage>) {
      state.message = action.payload;
    },
  },
});

export const { setIsNotificationSuccessful, setNotificationMessage } =
  notificationSlice.actions;

export default notificationSlice.reducer;
