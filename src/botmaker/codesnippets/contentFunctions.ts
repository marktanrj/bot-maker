import { sendMessageSettings, sendPhotoSettings } from "../../types";
import { generateSendMessageType, generateSendPhotoType } from "../../types/";

export const generateSendMessage: generateSendMessageType = (
  name: string,
  settingsObj: sendMessageSettings,
): string => {
  const { text } = settingsObj;
  const output = `
exports.${name} = (ctx, next) => {
  ctx.reply(\`${text}\`)
}
`;
  return output;
};

export const generateSendPhoto: generateSendPhotoType = (name: string, settingsObj: sendPhotoSettings): string => {
  const { url, caption } = settingsObj;
  const output = `
exports.${name} = (ctx, next) => {
  ctx.replyWithPhoto(\`${url}\`, {
    caption: \`${caption}\`
  })
}
`;
  return output;
};
