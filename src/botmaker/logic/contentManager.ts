import { ContentType } from "../../types";
import { allContentFunctionsType, generateSendMessage, generateSendPhoto } from "../codesnippets/contentFunctions";

interface buildContentProp {
  contentData: ContentType;
  compiledButtonText: string;
  nameOfFunction: string;
}

export const buildContent = ({ contentData, compiledButtonText, nameOfFunction }: buildContentProp): string => {
  const contentType = contentData.type;
  const settingsObj = contentData.settings as any;

  const generateContent = getContentFunction(contentType);
  const contentFunctionText = generateContent({ nameOfFunction, settingsObj, compiledButtonText });
  return contentFunctionText;
};

function getContentFunction(contentType: string): allContentFunctionsType {
  switch (contentType) {
    case "text":
      return generateSendMessage;
    case "photo":
      return generateSendPhoto;
  }
  return generateSendMessage;
}
