import { ButtonType, ContentType, InvokerType } from "../types";

export const defaultMessageBlocks: { [x: string]: ContentType } = {
  text: {
    type: "text",
    settings: {
      text: "Text",
    },
  },
  photo: {
    type: "photo",
    settings: {
      url: "",
      caption: "",
    },
  },
};

export const defaultButtonBlocks: { [x: string]: ButtonType } = {
  website: {
    id: "",
    displayName: "",
    type: "website",
    settings: {
      url: "",
    },
  },
  page: {
    id: "",
    displayName: "",
    type: "page",
    settings: {
      pageId: "main",
    },
  },
};

export const defaultInvokerBlocks: { [x: string]: InvokerType } = {
  command: {
    id: "",
    type: "command",
    settings: {
      command: "",
    },
  },
  text: {
    id: "",
    type: "text",
    settings: {
      text: "main",
    },
  },
};
