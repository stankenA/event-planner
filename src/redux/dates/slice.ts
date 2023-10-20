import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { currentMonth, currentYear } from "../../utils/contstants";
import { TDatesSlice } from "../../utils/types";

export const initialState: TDatesSlice = {
  month: currentMonth,
  year: currentYear,
  monthOverlap: 0,
};

export const datesSlice = createSlice({
  name: "dates",
  initialState,
  reducers: {
    setMonth(state, action: PayloadAction<number>) {
      state.month = action.payload;
    },
    setYear(state, action: PayloadAction<number>) {
      state.year = action.payload;
    },
    increaseMonthOverlap(state) {
      if (state.monthOverlap === 6) {
        return;
      }

      state.monthOverlap = state.monthOverlap + 1;
    },
    decreaseMonthOverlap(state) {
      if (state.monthOverlap === -6) {
        return;
      }

      state.monthOverlap = state.monthOverlap - 1;
    },
  },
});

export const { setMonth, setYear, increaseMonthOverlap, decreaseMonthOverlap } =
  datesSlice.actions;

export default datesSlice.reducer;
