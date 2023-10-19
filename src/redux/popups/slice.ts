import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TPopupsSlice = {
  isAuthPopupOpened: boolean;
  isEventPopupOpened: boolean;
  isNotificationPopupOpened: boolean;
};

export const initialState: TPopupsSlice = {
  isAuthPopupOpened: false,
  isEventPopupOpened: false,
  isNotificationPopupOpened: false,
};

export const popupsSlice = createSlice({
  name: "popups",
  initialState,
  reducers: {
    setIsAuthPopupOpened(state, action: PayloadAction<boolean>) {
      state.isAuthPopupOpened = action.payload;
    },
    setIsEventPopupOpened(state, action: PayloadAction<boolean>) {
      state.isEventPopupOpened = action.payload;
    },
    setIsNotificationPopupOpened(state, action: PayloadAction<boolean>) {
      state.isNotificationPopupOpened = action.payload;
    },
    closeAllPopups(state) {
      state.isAuthPopupOpened = false;
      state.isEventPopupOpened = false;
      state.isNotificationPopupOpened = false;
    },
  },
});

export const {
  setIsAuthPopupOpened,
  setIsEventPopupOpened,
  setIsNotificationPopupOpened,
  closeAllPopups,
} = popupsSlice.actions;

export default popupsSlice.reducer;
