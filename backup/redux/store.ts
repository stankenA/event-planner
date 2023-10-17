import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authPopupSlice from "./authPopup/slice";
import userSlice from "./user/slice";
import datesSlice from "./dates/slice";
import eventsSlice from "./events/slice";

export const store = configureStore({
  reducer: {
    authPopup: authPopupSlice,
    user: userSlice,
    dates: datesSlice,
    events: eventsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
