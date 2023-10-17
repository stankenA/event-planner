import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TEventsSlice } from "../../utils/types";

export const initialState: TEventsSlice = {
  events: [],
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents(state, action: PayloadAction<TEventsSlice>) {
      state.events = action.payload.events;
    },
  },
});

export const { setEvents } = eventsSlice.actions;

export default eventsSlice.reducer;
