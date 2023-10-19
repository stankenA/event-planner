import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TNotification = {
  isSuccessful: boolean;
};

export const initialState: TNotification = {
  isSuccessful: false,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setIsNotificationSuccessful(state, action: PayloadAction<boolean>) {
      state.isSuccessful = action.payload;
    },
  },
});

export const { setIsNotificationSuccessful } = notificationSlice.actions;

export default notificationSlice.reducer;
