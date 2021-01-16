import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

import { serverURL } from "../../config/config";
import { defaultBotTemplate, emptyPage } from "../../defaultvalues/botTemplates";
import { defaultButtonBlocks, defaultInvokerBlocks } from "../../defaultvalues/defaultvalues";
import { NodeType } from "../../types";
import { RootState } from "../store";

export const createBot = createAsyncThunk(
  "builderReducer/createBot",
  async (payload: { builderData: NodeType[] }, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const endpoint = new URL("/bot/create", serverURL);
    const token: string = _.get(state, "userReducer.user.token", "");
    try {
      const response = await axios.post(
        endpoint.href,
        { botData: payload.builderData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
  const botData = state.builderReducer.builderData;
  const botName = state.builderReducer.botName;
  const botToken = state.builderReducer.botToken;
  try {
    const response = await axios.post(endpoint.href, {
      botData,
      botName,
      botToken,
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

interface initialStateInterface {
  selectedPageId: string;
  builderData: NodeType[];
  botId: number;
  botName: string;
  botToken: string;
  loadingCreateBot: boolean;
}

const initialState: initialStateInterface = {
  selectedPageId: "main",
  builderData: [],
  botId: 0,
  botName: "",
  botToken: "",
  loadingCreateBot: false,
};

export const builderSlice = createSlice({
  name: "builderReducer",
  initialState: initialState,
  reducers: {
    updateBotName: (state, action) => {
      state.botName = action.payload;
    },
    updateToken: (state, action) => {
      state.botToken = action.payload;
    },
    addPage: (state) => {
      state.builderData.push({ ...emptyPage, id: uuidv4() });
    },
    updateAllPage: (state, action) => {
      state.builderData = action.payload;
    },
    updateSelectedPageId: (state, action) => {
      state.selectedPageId = action.payload;
    },
    saveContent: (state, action) => {
      const itemToChange = state.builderData.filter((item) => item.id === state.selectedPageId)[0];
      itemToChange.content = action.payload;
    },
    saveAllInvoker: (state, action) => {
      const itemToChange = state.builderData.filter((item) => item.id === state.selectedPageId)[0];
      itemToChange.invokers = action.payload;
    },
    addInvoker: (state) => {
      const itemToChange = state.builderData.filter((item) => item.id === state.selectedPageId)[0];
      itemToChange.invokers.push({ ...defaultInvokerBlocks.command, id: uuidv4() });
    },
    saveAllButton: (state, action) => {
      const itemToChange = state.builderData.filter((item) => item.id === state.selectedPageId)[0];
      itemToChange.buttons = action.payload;
    },
    addButton: (state) => {
      const itemToChange = state.builderData.filter((item) => item.id === state.selectedPageId)[0];
      itemToChange.buttons.push({ ...defaultButtonBlocks.page, id: uuidv4() });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createBot.pending, (state, action) => {
      state.loadingCreateBot = true;
    });
    builder.addCase(createBot.fulfilled, (state, action) => {
      state.loadingCreateBot = false;
      state.builderData = action.payload.botData;
      state.botId = action.payload.id;
    });
    builder.addCase(createBot.rejected, (state, action) => {
      state.loadingCreateBot = false;
    });
  },
});

export const {
  updateBotName,
  updateToken,
  addPage,
  updateAllPage,
  updateSelectedPageId,
  saveContent,
  saveAllInvoker,
  addInvoker,
  saveAllButton,
  addButton,
} = builderSlice.actions;

export default builderSlice.reducer;
