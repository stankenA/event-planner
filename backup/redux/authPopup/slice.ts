import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAuthPopupSlice } from "../../utils/types";

export const initialState: TAuthPopupSlice = {
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
