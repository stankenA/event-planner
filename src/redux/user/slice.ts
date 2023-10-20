import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUserSlice } from "../../utils/types";

export const initialState: TUserSlice = {
  username: "",
  email: "",
  id: undefined,
  isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<TUserSlice>) {
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.id = action.payload.id;
      state.isAuth = true;
    },
    logoutUser(state) {
      state.username = "";
      state.email = "";
      state.id = undefined;
      state.isAuth = false;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
