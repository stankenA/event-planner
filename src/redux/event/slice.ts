import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TEvent } from "../../utils/types";

// type TEvent = {
//   id?: number;
//   dateStart: string;
//   title: string;
//   description: string;
//   location: string;
//   dateEnd?: string;
// };

export const initialState: TEvent = {
  id: 0,
  dateStart: "",
  title: "",
  description: "",
  location: "",
  dateEnd: undefined,
  createdAt: "",
  updatedAt: "",
  participants: [],
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEvent(state, action: PayloadAction<TEvent>) {
      state.id = action.payload.id;
      state.dateStart = action.payload.dateStart;
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.location = action.payload.location;
      state.dateEnd = action.payload.dateEnd;
      state.participants = action.payload.participants;
    },
  },
});

export const { setEvent } = eventSlice.actions;

export default eventSlice.reducer;
