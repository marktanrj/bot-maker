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

export const informationalBotTemplate: NodeType[] = [
  {
    id: "main",
    name: "Main",
    content: {
      type: "text",
      settings: {
        text: "Welcome to bot!\n\n/help - list of commands\n/about - more info about this bot\n/cat - get an image of a cat",
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
    buttons: [
      {
        id: "website",
        displayName: "Website",
        type: "website",
        settings: {
          url: "https://github.com/marktanrj/bot-maker",
        },
      },
    ],
  },
  {
    id: "cat",
    name: `Cat`,
    content: {
      type: "photo",
      settings: {
        url: "https://static.toiimg.com/photo/msid-67586673/67586673.jpg?3918697",
        caption: "This is a cat!",
      },
    },
    invokers: [
      {
        id: "cat",
        type: "command",
        settings: {
          command: "cat",
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
  {
    id: "details",
    name: `About`,
    content: {
      type: "text",
      settings: {
        text: "This bot demonstrates the use and navigation of multiple pages",
      },
    },
    invokers: [
      {
        id: "about",
        type: "command",
        settings: {
          command: "about",
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
