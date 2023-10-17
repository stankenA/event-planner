import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TPopupsSlice = {
  isAuthPopupOpened: boolean;
};

export const initialState: TPopupsSlice = {
  isAuthPopupOpened: false,
};

export const popupsSlice = createSlice({
  name: "authPopup",
  initialState,
  reducers: {
    setIsAuthPopupOpened(state, action: PayloadAction<boolean>) {
      state.isAuthPopupOpened = action.payload;
    },
  },
});

export const { setIsAuthPopupOpened } = popupsSlice.actions;

export default popupsSlice.reducer;
