import { createSlice } from "@reduxjs/toolkit";
import { ToastOptions } from "react-toastify";

export interface toastObjectInterface {
  type: ToastOptions;
  message: string;
}

const initToastObject: toastObjectInterface | null = null;

export const toastSlice = createSlice({
  name: "toastReducer",
  initialState: {
    toastObject: initToastObject,
  },
  reducers: {
    setToast: (state, action) => {
      state.toastObject = action.payload;
    },
    removeToast: (state) => {
      state.toastObject = null;
    },
  },
});

export const { setToast, removeToast } = toastSlice.actions;

export default toastSlice.reducer;
