import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUserSlice } from "../../utils/types";

export const initialState: TUserSlice = {
  username: "",
  email: "",
  id: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<TUserSlice>) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.username = action.payload.username;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
