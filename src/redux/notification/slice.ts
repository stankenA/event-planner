import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TNotificationMessage = {
  heading: string;
  case: string;
  title: string;
  dayOfWeek: string;
  day: number;
  month: string;
  time: string;
  location: string;
  isUnicorn: boolean;
};

type TNotification = {
  isSuccessful: boolean;
  message: TNotificationMessage;
};

export const initialState: TNotification = {
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
