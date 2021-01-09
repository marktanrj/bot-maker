import { commandSettings, textSettings } from "../../types";

export type allInvokerFunctionType = generateCommandInvokerType | generateTextInvokerType;

export type generateCommandInvokerType = (nameOfFunction: string, settingsObj: commandSettings) => string;
export type generateTextInvokerType = (nameOfFunction: string, settingsObj: textSettings) => string;

export const generateCommandInvoker: generateCommandInvokerType = (nameOfFunction, settingsObj): string => {
  const { command } = settingsObj;
  const output = `
bot.command(\`/${command}\`, ${nameOfFunction});
  `;
  return output;
};

export const generateTextInvoker: generateTextInvokerType = (nameOfFunction, settingsObj): string => {
  const { text } = settingsObj;
  const output = `
bot.hears(\`${text}\`, ${nameOfFunction});
  `;
  return output;
};
