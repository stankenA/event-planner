import { createSlice } from "@reduxjs/toolkit";
import { TFlagSlice } from "../../utils/types";

export const initialState: TFlagSlice = {
  flag: false,
};

// Этот слайс нужен для триггера запроса ивентов с обновлёнными данными
export const flagSlice = createSlice({
  name: "flag",
  initialState,
  reducers: {
    triggerFlag(state) {
      state.flag = !state.flag;
    },
  },
});

export const { triggerFlag } = flagSlice.actions;

export default flagSlice.reducer;
