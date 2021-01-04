import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface ContentType {
  type: "text" | "photo";
  settings: any;
}

interface Invoker {
  type: "command" | "text";
  input?: string;
}

interface Button {
  id: string;
  name: string;
  type: "website" | "page";
  pageId?: string;
  url?: string;
}

interface NodeType {
  id: string;
  name: string;
  content: ContentType;
  invokers: Invoker[];
  buttons: Button[];
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
    invokers: [
      {
        type: "command",
        input: "start",
      },
    ],
    buttons: [
      {
        id: "1",
        name: "site",
        type: "website",
        url: "www.google.com",
      },
    ],
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
    invokers: [],
    buttons: [],
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
    invokers: [],
    buttons: [],
  },
];

export const builderSlice = createSlice({
  name: "builderReducer",
  initialState: {
    builderData: builderDataInitState,
    selectedPageId: "main",
  },
  reducers: {
    addPage: (state) => {
      state.builderData.push({
        id: uuidv4(),
        name: `Untitled`,
        content: {
          type: "text",
          settings: {
            text: "",
          },
        },
        invokers: [],
        buttons: [],
      });
    },
    updateAllPage: (state, action) => {
      state.builderData = action.payload;
    },
    updateSelectedPageId: (state, action) => {
      state.selectedPageId = action.payload;
    },
    saveBlockContent: (state, action) => {
      const itemToChange = state.builderData.filter((item) => item.id === state.selectedPageId)[0];
      itemToChange.content = action.payload;
    },
    saveBlockInvoker: (state, action) => {
      const itemToChange = state.builderData.filter((item) => item.id === state.selectedPageId)[0];
      itemToChange.invokers = action.payload;
    },
    saveBlockButton: (state, action) => {
      const itemToChange = state.builderData.filter((item) => item.id === state.selectedPageId)[0];
      itemToChange.buttons = action.payload;
    },
    addButton: (state) => {
      const itemToChange = state.builderData.filter((item) => item.id === state.selectedPageId)[0];
      itemToChange.buttons.push({ id: uuidv4(), name: "", type: "website", url: "" });
    },
  },
});

export const {
  addPage,
  updateAllPage,
  updateSelectedPageId,
  saveBlockContent,
  saveBlockInvoker,
  saveBlockButton,
  addButton,
} = builderSlice.actions;

export default builderSlice.reducer;
