import { createSlice } from "@reduxjs/toolkit";

type Tflag = {
  flag: boolean;
};

export const initialState: Tflag = {
  flag: false,
};

// Этот слайс нужен для триггера запроса ивентов с обновлёнными данными
export const flagSlice = createSlice({
  name: "flag",
  initialState,
  reducers: {
    changeFlag(state) {
      state.flag = !state.flag;
    },
  },
});

export const { changeFlag } = flagSlice.actions;

export default flagSlice.reducer;
