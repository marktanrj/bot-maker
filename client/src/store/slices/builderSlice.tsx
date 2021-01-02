import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const pageValuesInitState = [
  {
    id: "main",
    name: "Main",
    content: "Main",
  },
  {
    id: "2",
    name: "Test",
    content: "Test",
  },
  {
    id: "3",
    name: "Test2",
    content: "Test2",
  },
];

export const builderSlice = createSlice({
  name: "builderReducer",
  initialState: {
    pageValues: pageValuesInitState,
    selectedPageId: "main",
  },
  reducers: {
    addPage: (state, action: { payload: { name: string; content: string }; [x: string]: any }) => {
      const item = action.payload;
      state.pageValues.push({ id: uuidv4(), ...item });
    },
    updateAllPage: (state, action) => {
      state.pageValues = action.payload;
    },
    updateSelectedPageId: (state, action) => {
      state.selectedPageId = action.payload;
    },
  },
});

export const { addPage, updateAllPage, updateSelectedPageId } = builderSlice.actions;

export default builderSlice.reducer;
