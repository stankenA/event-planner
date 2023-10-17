import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { currentMonth, currentYear } from "../../utils/contstants";

type TDatesSlice = {
  // calendarDates: string[];
  year: number;
  month: number;
  monthOverlap: number;
};

export const initialState: TDatesSlice = {
  // calendarDates: [...Array(42).fill("")],
  year: currentYear,
  month: currentMonth,
  monthOverlap: 0,
};

export const datesSlice = createSlice({
  name: "dates",
  initialState,
  reducers: {
    // setCalendarDates(state, action: PayloadAction<string[]>) {
    //   state.calendarDates = action.payload;
    // },
    setYear(state, action: PayloadAction<number>) {
      state.year = action.payload;
    },
    setMonth(state, action: PayloadAction<number>) {
      state.month = action.payload;
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

export const {
  // setCalendarDates,
  setYear,
  setMonth,
  increaseMonthOverlap,
  decreaseMonthOverlap,
} = datesSlice.actions;

export default datesSlice.reducer;
