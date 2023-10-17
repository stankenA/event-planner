import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TAuthPopupType = {
  isAuthPopupOpened: boolean;
};

export const initialState: TAuthPopupType = {
  isAuthPopupOpened: true,
};

export const authPopupSlice = createSlice({
  name: "authPopup",
  initialState,
  reducers: {
    setIsAuthPopupOpened(state, action: PayloadAction<boolean>) {
      state.isAuthPopupOpened = action.payload;
    },
  },
});

export const { setIsAuthPopupOpened } = authPopupSlice.actions;

export default authPopupSlice.reducer;
