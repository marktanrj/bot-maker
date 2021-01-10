import { allButtonsSettingsType } from "./buttonsSettings";
import { allContentSettingsType } from "./contentSettings";
import { allInvokersSettingsType } from "./invokersSettings";

export interface ContentType {
  type: "text" | "photo";
  settings: allContentSettingsType;
}

export interface InvokerType {
  id: string;
  type: "command" | "text";
  settings: allInvokersSettingsType;
}

export interface ButtonType {
  id: string;
  displayName: string;
  type: "website" | "page";
  settings: allButtonsSettingsType;
}

export interface NodeType {
  id: string;
  name: string;
  content: ContentType;
  invokers: InvokerType[];
  buttons: ButtonType[];
}
