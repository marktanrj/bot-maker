import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
  },
  reducers: {
    user: (state, action) => {
      state.email = action.payload.email;
    },
  },
});

export const { user } = userSlice.actions;

export default userSlice.reducer;
