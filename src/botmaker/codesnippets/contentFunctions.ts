import { sendMessageSettings, sendPhotoSettings } from "../../types";

export type allContentFunctionsType = generateSendMessageType | generateSendPhotoType;

export type generateSendMessageType = (nameOfFunction: string, settingsObj: sendMessageSettings) => string;
export type generateSendPhotoType = (nameOfFunction: string, settingsObj: sendPhotoSettings) => string;

export const generateSendMessage: generateSendMessageType = (
  nameOfFunction: string,
  settingsObj: sendMessageSettings,
): string => {
  const { text } = settingsObj;
  const output = `
exports.${nameOfFunction} = (ctx, next) => {
  ctx.reply(\`${text}\`)
}
`;
  return output;
};

export const generateSendPhoto: generateSendPhotoType = (
  nameOfFunction: string,
  settingsObj: sendPhotoSettings,
): string => {
  const { url, caption } = settingsObj;
  const output = `
exports.${nameOfFunction} = (ctx, next) => {
  ctx.replyWithPhoto(\`${url}\`, {
    caption: \`${caption}\`
  })
}
`;
  return output;
};
