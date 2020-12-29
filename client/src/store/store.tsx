import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import toastReducer from "./slices/toastSlice";

const store = configureStore({
  reducer: {
    userReducer,
    toastReducer,
  },
  devTools: process.env.NODE_ENV === "production" ? false : true,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
