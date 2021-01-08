import { sendMessageSettings, sendPhotoSettings } from ".";

export type generateSendMessageType = (name: string, settingsObj: sendMessageSettings) => string;
export type generateSendPhotoType = (name: string, settingsObj: sendPhotoSettings) => string;

export type allContentFunctions = generateSendMessageType | generateSendPhotoType;
