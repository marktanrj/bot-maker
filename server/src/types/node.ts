import { allContentSettingsType } from "./contentSettings";

export interface ContentType {
  type: "text" | "photo";
  settings: allContentSettingsType;
}

export interface InvokerType {
  type: "command" | "text";
  input?: string;
}

export interface ButtonType {
  id: string;
  name: string;
  type: "website" | "page";
  pageId?: string;
  url?: string;
}

export interface NodeType {
  id: string;
  name: string;
  content: ContentType;
  invokers: InvokerType[];
  buttons: ButtonType[];
}
