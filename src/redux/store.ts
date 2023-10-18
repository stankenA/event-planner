import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import popupsSlice from "./popups/slice";
import datesSlice from "./dates/slice";
import userSlice from "./user/slice";

export const store = configureStore({
  reducer: {
    popups: popupsSlice,
    dates: datesSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
