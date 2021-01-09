import { ButtonType } from "../../types";
import { generatePageButton, generateWebsiteButton } from "../codesnippets/buttonFunctions";

interface buildButtonProp {
  buttonData: ButtonType[];
  nameOfFunction: string;
}

export const buildButton = ({ buttonData, nameOfFunction }: buildButtonProp) => {
  const buttonsArr = buttonData.map((button) => {
    const buttonType = button.type;
    const generateButton = getButtonFunction(buttonType);
    const buttonText = generateButton({ nameOfFunction, button });
    return buttonText;
  });

  let fullButtonText = `
reply_markup: {
  inline_keyboard: [
  `;

  buttonsArr.forEach((buttonText) => {
    fullButtonText += `\n[ \n${buttonText} \n],`;
  });

  fullButtonText += `
  ]
}
  `;

  return fullButtonText;
};

function getButtonFunction(buttonType: string): any {
  switch (buttonType) {
    case "website":
      return generateWebsiteButton;
    case "page":
      return generatePageButton;
  }
  return generateWebsiteButton;
}

export const buildButtonCallbacks = ({ buttonData, pageIdMapper, nameOfFunction }: any) => {
  const buttonCallbacksArr = buttonData.map((button: any) => {
    if (button.type === "page") {
      const pageId = button.settings.pageId;
      const funcName = pageIdMapper[pageId];
      const returnVal = `bot.action(\`${nameOfFunction}\`, deleteCtx, ${funcName})`;
      return returnVal;
    }
  });

  const output = buttonCallbacksArr.join("\n");
  return output;
};
