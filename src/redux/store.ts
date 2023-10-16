import { configureStore } from "@reduxjs/toolkit";
import authPopupSlice from "./authPopup/slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    authPopup: authPopupSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
