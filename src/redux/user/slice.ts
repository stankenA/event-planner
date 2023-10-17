import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TUserSlice = {
  id?: number;
  username: string;
  email: string;
  isAuth: boolean;
};

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
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
