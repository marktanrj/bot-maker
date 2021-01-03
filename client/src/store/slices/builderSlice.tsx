import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface ContentType {
  type: "text" | "photo";
  settings: any;
}

interface NodeType {
  id: string;
  name: string;
  content: ContentType;
}

const builderDataInitState: NodeType[] = [
  {
    id: "main",
    name: "Main",
    content: {
      type: "text",
      settings: {
        text: "Welcome to bot!",
      },
    },
  },
  {
    id: "2",
    name: "Test",
    content: {
      type: "text",
      settings: {
        text: "Test 2",
      },
    },
  },
  {
    id: "3",
    name: "Test2",
    content: {
      type: "text",
      settings: {
        text: "Test 3",
      },
    },
  },
];

export const builderSlice = createSlice({
  name: "builderReducer",
  initialState: {
    builderData: builderDataInitState,
    selectedPageId: "main",
  },
  reducers: {
    addPage: (state, action: { payload: { name: string; content: ContentType }; [x: string]: any }) => {
      const item = action.payload;
      state.builderData.push({ id: uuidv4(), ...item });
    },
    updateAllPage: (state, action) => {
      state.builderData = action.payload;
    },
    updateSelectedPageId: (state, action) => {
      state.selectedPageId = action.payload;
    },
    saveTextBlock: (state, action) => {
      const itemToChange = state.builderData.filter((item) => item.id === state.selectedPageId)[0];
      itemToChange.content = action.payload;
    },
  },
});

export const { addPage, updateAllPage, updateSelectedPageId, saveTextBlock } = builderSlice.actions;

export default builderSlice.reducer;
