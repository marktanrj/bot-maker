import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface contentType {
  type: "text" | "command";
  settings: any;
}

interface builderDataType {
  id: string;
  name: string;
  content: Array<contentType>;
}

const builderDataInitState: builderDataType[] = [
  {
    id: "main",
    name: "Main",
    content: [
      {
        type: "text",
        settings: {
          text: "Welcome to bot!",
        },
      },
    ],
  },
  {
    id: "2",
    name: "Test",
    content: [],
  },
  {
    id: "3",
    name: "Test2",
    content: [],
  },
];

export const builderSlice = createSlice({
  name: "builderReducer",
  initialState: {
    builderData: builderDataInitState,
    selectedPageId: "main",
  },
  reducers: {
    addPage: (state, action: { payload: { name: string; content: Array<any> }; [x: string]: any }) => {
      const item = action.payload;
      state.builderData.push({ id: uuidv4(), ...item });
    },
    updateAllPage: (state, action) => {
      state.builderData = action.payload;
    },
    updateSelectedPageId: (state, action) => {
      state.selectedPageId = action.payload;
    },
  },
});

export const { addPage, updateAllPage, updateSelectedPageId } = builderSlice.actions;

export default builderSlice.reducer;
