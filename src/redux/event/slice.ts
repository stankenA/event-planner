import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TEvent } from "../../utils/types";

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
  photos: [],
  owner: undefined,
  isInactive: false,
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
      state.owner = action.payload.owner;
      state.photos = action.payload.photos;
      state.isInactive = action.payload.isInactive;
    },
  },
});

export const { setEvent } = eventSlice.actions;

export default eventSlice.reducer;
