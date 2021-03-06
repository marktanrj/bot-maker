import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import userReducer from "./slices/userSlice";
import toastReducer from "./slices/toastSlice";
import builderReducer from "./slices/builderSlice";

const store = configureStore({
  reducer: {
    userReducer,
    toastReducer,
    builderReducer,
  },
  devTools: process.env.NODE_ENV === "production" ? false : true,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
