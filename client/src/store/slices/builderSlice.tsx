import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

import { serverURL } from "../../config/config";

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
    invokers: [],
    buttons: [],
  },
];

// export const saveBot = createAsyncThunk("builderReducer/saveBot", async (__, { rejectWithValue, getState }) => {
//   const state = getState() as any;
//   const endpoint = new URL("/bot/save", serverURL);
//   const data = state.builderReducer.builderData;
//   try {
//     const response = await axios.post(endpoint.href, data);
//     return response.data;
//   } catch (error) {
//     let errorMessage = _.get(error, "response.data.errors[0]", "");
//     if (!errorMessage) {
//       errorMessage = _.get(error, "message", "Please try again!");
//     }
//     return rejectWithValue(errorMessage);
//   }
// });

export const buildBot = createAsyncThunk("builderReducer/buildBot", async (__, { rejectWithValue, getState }) => {
  const state = getState() as any;
  const endpoint = new URL("/bot/build", serverURL);
  const data = state.builderReducer.builderData;
  try {
    const response = await axios.post(endpoint.href, {
      data,
    });
    return response.data;
  } catch (error) {
    let errorMessage = _.get(error, "response.data.errors[0]", "");
    if (!errorMessage) {
      errorMessage = _.get(error, "message", "Please try again!");
    }
    return rejectWithValue(errorMessage);
  }
});

export const builderSlice = createSlice({
  name: "builderReducer",
  initialState: {
    builderData: builderDataInitState,
    selectedPageId: "main",
    botName: "",
  },
  reducers: {
    createNewBotFromScratch: (state) => {
      state.builderData = builderDataInitState;
      state.botName = "Untitled";
    },
    updateBotName: (state, action) => {
      state.botName = action.payload;
    },
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
  createNewBotFromScratch,
  updateBotName,
  addPage,
  updateAllPage,
  updateSelectedPageId,
  saveBlockContent,
  saveBlockInvoker,
  saveBlockButton,
  addButton,
} = builderSlice.actions;

export default builderSlice.reducer;