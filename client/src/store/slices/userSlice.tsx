import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";

import { serverURL } from "../../config/config";

export const registerUser = createAsyncThunk(
  "userReducer/registerUser",
  async (payload: { username: string; email: string; password: string }, { rejectWithValue }) => {
    const endpoint = new URL("/user/register", serverURL);
    try {
      const response = await axios.post(endpoint.href, payload);
      return response.data;
    } catch (error) {
      let errorMessage = _.get(error, "response.data.errors[0]", "");
      if (!errorMessage) {
        errorMessage = _.get(error, "message", "Please try again!");
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const userSlice = createSlice({
  name: "userReducer",
  initialState: {
    user: undefined,
    loadingRegister: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      state.loadingRegister = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loadingRegister = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loadingRegister = false;
    });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
