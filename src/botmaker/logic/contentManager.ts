import { ContentType } from "../../types";
import { allContentFunctionsType, generateSendMessage, generateSendPhoto } from "../codesnippets/contentFunctions";

interface buildContentProp {
  contentData: ContentType;
  nameOfFunction: string;
}

export const buildContent = ({ contentData, nameOfFunction }: buildContentProp): string => {
  const contentType = contentData.type;
  const settingsObj = contentData.settings as any;

  const contentFunction = getContentFunction(contentType);
  const contentFunctionText = contentFunction(nameOfFunction, settingsObj);
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
