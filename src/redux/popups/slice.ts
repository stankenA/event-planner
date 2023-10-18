import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TPopupsSlice = {
  isAuthPopupOpened: boolean;
  isEventPopupOpened: boolean;
};

export const initialState: TPopupsSlice = {
  isAuthPopupOpened: false,
  isEventPopupOpened: false,
};

export const popupsSlice = createSlice({
  name: "authPopup",
  initialState,
  reducers: {
    setIsAuthPopupOpened(state, action: PayloadAction<boolean>) {
      state.isAuthPopupOpened = action.payload;
    },
    setIsEventPopupOpened(state, action: PayloadAction<boolean>) {
      state.isEventPopupOpened = action.payload;
    },
    closeAllPopups(state) {
      state.isAuthPopupOpened = false;
      state.isEventPopupOpened = false;
    },
  },
});

export const { setIsAuthPopupOpened, setIsEventPopupOpened, closeAllPopups } =
  popupsSlice.actions;

export default popupsSlice.reducer;
