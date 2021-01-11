import { NodeType } from "../types";

export const emptyPage: NodeType = {
  id: "",
  name: `Untitled`,
  content: {
    type: "text",
    settings: {
      text: "",
    },
  },
  invokers: [],
  buttons: [],
};

export const defaultBotTemplate: NodeType[] = [
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
        id: "start",
        type: "command",
        settings: {
          command: "start",
        },
      },
    ],
    buttons: [],
  },
];

export const simpleBotTemplate: NodeType[] = [
  {
    id: "main",
    name: "Main",
    content: {
      type: "text",
      settings: {
        text: "Welcome to bot!\n\n/help - list of commands\n/hello - Hello World",
      },
    },
    invokers: [
      {
        id: "start",
        type: "command",
        settings: {
          command: "start",
        },
      },
      {
        id: "help",
        type: "command",
        settings: {
          command: "help",
        },
      },
    ],
    buttons: [],
  },
  {
    id: "hello",
    name: `Hello World`,
    content: {
      type: "text",
      settings: {
        text: "Hello World!",
      },
    },
    invokers: [
      {
        id: "hello",
        type: "command",
        settings: {
          command: "hello",
        },
      },
    ],
    buttons: [
      {
        id: "back",
        displayName: "Back",
        type: "page",
        settings: {
          pageId: "main",
        },
      },
    ],
  },
];
