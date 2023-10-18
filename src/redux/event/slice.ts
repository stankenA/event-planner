import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TEventSlice = {
  id?: number;
  dateStart: string;
  title: string;
  description: string;
  location: string;
  dateEnd?: string;
};

export const initialState: TEventSlice = {
  id: undefined,
  dateStart: "",
  title: "",
  description: "",
  location: "",
  dateEnd: undefined,
};

export const popupsSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEvent(state, action: PayloadAction<TEventSlice>) {
      state.id = action.payload.id;
      state.dateStart = action.payload.dateStart;
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.location = action.payload.location;
      state.dateEnd = action.payload.dateEnd;
    },
  },
});

export const {} = popupsSlice.actions;

export default popupsSlice.reducer;
