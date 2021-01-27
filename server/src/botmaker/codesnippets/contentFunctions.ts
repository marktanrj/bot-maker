import { sendMessageSettings, sendPhotoSettings } from "../../types";

export type allContentFunctionsType = generateSendMessageType | generateSendPhotoType;

type generateSendMessageType = ({
  nameOfFunction,
  settingsObj,
  compiledButtonText,
}: {
  nameOfFunction: string;
  settingsObj: sendMessageSettings;
  compiledButtonText: string;
}) => string;
type generateSendPhotoType = ({
  nameOfFunction,
  settingsObj,
  compiledButtonText,
}: {
  nameOfFunction: string;
  settingsObj: sendPhotoSettings;
  compiledButtonText: string;
}) => string;

export const generateSendMessage: generateSendMessageType = ({ nameOfFunction, settingsObj, compiledButtonText }) => {
  const { text } = settingsObj;
  if (text === "") return "";

  let output = "";
  if (compiledButtonText.length > 0) {
    output = `
exports.${nameOfFunction} = (ctx, next) => {
  ctx.reply(\`${text}\`, {
    ${compiledButtonText}
  })
}
  `;
  } else {
    output = `
exports.${nameOfFunction} = (ctx, next) => {
  ctx.reply(\`${text}\`)
}
  `;
  }
  return output;
};

export const generateSendPhoto: generateSendPhotoType = ({ nameOfFunction, settingsObj, compiledButtonText }) => {
  const { url, caption } = settingsObj;
  if (url === "") return "";

  let output = "";
  if (compiledButtonText.length > 0) {
    output = `
exports.${nameOfFunction} = (ctx, next) => {
  ctx.replyWithPhoto(\`${url}\`, {
    caption: \`${caption}\`,
    ${compiledButtonText}
  })
}
    `;
  } else {
    output = `
exports.${nameOfFunction} = (ctx, next) => {
  ctx.replyWithPhoto(\`${url}\`, {
    caption: \`${caption}\`
  })
}
    `;
  }

  return output;
};
