import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authPopupSlice from "./authPopup/slice";
import datesSlice from "./dates/slice";

export const store = configureStore({
  reducer: {
    authPopup: authPopupSlice,
    dates: datesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
