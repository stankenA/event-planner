import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authPopupSlice from "./authPopup/slice";
import datesSlice from "./dates/slice";
import userSlice from "./user/slice";

export const store = configureStore({
  reducer: {
    authPopup: authPopupSlice,
    dates: datesSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
