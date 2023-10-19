import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TPopupsSlice = {
  isAuthPopupOpened: boolean;
  isEventPopupOpened: boolean;
  isNotificationPopupOpened: boolean;
  isConfirmPopupOpened: boolean;
};

export const initialState: TPopupsSlice = {
  isAuthPopupOpened: false,
  isEventPopupOpened: false,
  isNotificationPopupOpened: false,
  isConfirmPopupOpened: false,
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
    setIsConfirmPopupOpened(state, action: PayloadAction<boolean>) {
      state.isConfirmPopupOpened = action.payload;
    },
    closeAllPopups(state) {
      state.isAuthPopupOpened = false;
      state.isEventPopupOpened = false;
      state.isNotificationPopupOpened = false;
      state.isConfirmPopupOpened = false;
    },
  },
});

export const {
  setIsAuthPopupOpened,
  setIsEventPopupOpened,
  setIsNotificationPopupOpened,
  setIsConfirmPopupOpened,
  closeAllPopups,
} = popupsSlice.actions;

export default popupsSlice.reducer;
