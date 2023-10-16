import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TAuthPopupType = {
  isPopupOpened: boolean;
};

export const initialState: TAuthPopupType = {
  isPopupOpened: true,
};

export const authPopupSlice = createSlice({
  name: "authPopup",
  initialState,
  reducers: {
    setIsPopupOpened(state, action: PayloadAction<boolean>) {
      state.isPopupOpened = action.payload;
    },
  },
});

export const { setIsPopupOpened } = authPopupSlice.actions;

export default authPopupSlice.reducer;
