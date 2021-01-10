import { ButtonType, NodeType } from "../../types";
import { allButtonFunctionsType, generatePageButton, generateWebsiteButton } from "../codesnippets/buttonFunctions";

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

function getButtonFunction(buttonType: string): allButtonFunctionsType {
  switch (buttonType) {
    case "website":
      return generateWebsiteButton;
    case "page":
      return generatePageButton;
  }
  return generateWebsiteButton;
}

interface buildButtonCallbacksProp {
  buttonData: ButtonType[];
  pageIdToFunctionMap: { [id: string]: string };
  nameOfFunction: string;
}
export const buildButtonCallbacks = ({
  buttonData,
  pageIdToFunctionMap,
  nameOfFunction,
}: buildButtonCallbacksProp): string => {
  const buttonCallbacksArr = buttonData.map((button: any) => {
    if (button.type === "page") {
      const pageId = button.settings.pageId;
      const funcName = pageIdToFunctionMap[pageId];
      const returnVal = `bot.action(\`${nameOfFunction}\`, deleteCtxMessage, ${funcName})`;
      return returnVal;
    }
  });

  const output = buttonCallbacksArr.join("\n");
  return output;
};
