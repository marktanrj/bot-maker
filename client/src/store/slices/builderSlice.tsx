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

export const saveBot = createAsyncThunk("builderReducer/saveBot", async (__, { rejectWithValue, getState }) => {
  const state = getState() as RootState;
  const endpoint = new URL("/bot/save", serverURL);
  const token: string = _.get(state, "userReducer.user.token", "");
  const botData = state.builderReducer.builderData;
  const botName = state.builderReducer.botName;
  const botId = state.builderReducer.botId;
  const botToken = state.builderReducer.botToken;
  try {
    const response = await axios.post(
      endpoint.href,
      { botData, botId, botName, botToken },
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
});

export const loadBot = createAsyncThunk("builderReducer/loadBot", async (payload: { botId: number }, { rejectWithValue, getState }) => {
  const state = getState() as RootState;
  const endpoint = new URL("/bot/load", serverURL);
  const token: string = _.get(state, "userReducer.user.token", "");
  const { botId } = payload;
  try {
    const response = await axios.get(endpoint.href, {
      params: {
        botId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export const buildBot = createAsyncThunk("builderReducer/buildBot", async (__, { rejectWithValue, getState }) => {
  const state = getState() as any;
  const endpoint = new URL("/bot/build", serverURL);
  const token: string = _.get(state, "userReducer.user.token", "");
  const botData = state.builderReducer.builderData;
  const botName = state.builderReducer.botName;
  const botToken = state.builderReducer.botToken;
  const botId = state.builderReducer.botId;
  try {
    const response = await axios.post(
      endpoint.href,
      {
        botData,
        botName,
        botToken,
        botId,
      },
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
});

export const getBotsList = createAsyncThunk("builderReducer/getBotsList", async (__, { rejectWithValue, getState }) => {
  const state = getState() as any;
  const endpoint = new URL("/bot/getBotsList", serverURL);
  const token: string = _.get(state, "userReducer.user.token", "");
  try {
    const response = await axios.get(endpoint.href, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
  botsList: any[];
  loadingCreateBot: boolean;
  loadingSaveBot: boolean;
  loadingLoadBot: boolean;
  loadingBuildBot: boolean;
  loadingGetBotsList: boolean;
}

const initialState: initialStateInterface = {
  selectedPageId: "main",
  builderData: [],
  botId: 0,
  botName: "",
  botToken: "",
  botsList: [],
  loadingCreateBot: false,
  loadingSaveBot: false,
  loadingLoadBot: false,
  loadingBuildBot: false,
  loadingGetBotsList: false,
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
    builder.addCase(saveBot.pending, (state, action) => {
      state.loadingSaveBot = true;
    });
    builder.addCase(saveBot.fulfilled, (state, action) => {
      state.loadingSaveBot = false;
    });
    builder.addCase(saveBot.rejected, (state, action) => {
      state.loadingSaveBot = false;
    });
    builder.addCase(loadBot.pending, (state, action) => {
      state.loadingLoadBot = true;
    });
    builder.addCase(loadBot.fulfilled, (state, action) => {
      state.loadingLoadBot = false;
      state.builderData = action.payload.botData;
      state.botName = action.payload.botName;
      state.botId = action.payload.botId;
      state.botToken = action.payload.botToken;
    });
    builder.addCase(loadBot.rejected, (state, action) => {
      state.loadingLoadBot = false;
    });
    builder.addCase(buildBot.pending, (state, action) => {
      state.loadingBuildBot = true;
    });
    builder.addCase(buildBot.fulfilled, (state, action) => {
      state.loadingBuildBot = false;
    });
    builder.addCase(buildBot.rejected, (state, action) => {
      state.loadingBuildBot = false;
    });
    builder.addCase(getBotsList.pending, (state, action) => {
      state.loadingGetBotsList = true;
    });
    builder.addCase(getBotsList.fulfilled, (state, action) => {
      state.loadingGetBotsList = false;
      state.botsList = action.payload;
    });
    builder.addCase(getBotsList.rejected, (state, action) => {
      state.loadingGetBotsList = false;
      console.log(action);
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
