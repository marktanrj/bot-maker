import { allContentFunctions, NodeType } from "../../types";
import { generateSendMessage, generateSendPhoto } from "../codesnippets/contentFunctions";

export default (contentType: string): allContentFunctions => {
  switch (contentType) {
    case "text":
      return generateSendMessage;
    case "photo":
      return generateSendPhoto;
  }

  return generateSendMessage;
};
