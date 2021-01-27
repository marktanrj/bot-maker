import JSZip from "jszip";
import { NodeType } from "../../types";
import { dotenvText } from "../codesnippets/dotenv";
import { endCode } from "../codesnippets/endCode";
import { delMiddleware } from "../codesnippets/middlewares";
import { packageJsonText } from "../codesnippets/packageJson";
import { startCode } from "../codesnippets/startCode";
import { buildButton, buildButtonCallbacks } from "./buttonManager";
import { buildContent } from "./contentManager";
import { buildInvoker } from "./invokerManager";
import { mapPageIdToFunction } from "./mapPageIdToFunction";

interface mainProps {
  botData: NodeType[];
  botToken: string;
}

export default async ({ botData, botToken }: mainProps): Promise<any> => {
  const pageIdToFunctionMap: { [id: string]: string } = mapPageIdToFunction(botData);

  const zip = new JSZip();
  console.dir(botData);

  let mainCode = ``;
  mainCode += startCode;

  let importsCode = ``;
  let bodyCode = ``;

  importsCode += `const { deleteCtxMessage } = require("./middlewares/deleteCtxMessage")\n`;

  zip.file(`middlewares/deleteCtxMessage.js`, delMiddleware);

  botData.forEach((page: NodeType) => {
    const nameOfFunction = pageIdToFunctionMap[page.id];

    //add imports
    importsCode += `const { ${nameOfFunction} } = require("./src/${nameOfFunction}");\n`;

    //build button
    const buttonData = page.buttons;
    let compiledButtonText = "";
    if (buttonData.length > 0) {
      compiledButtonText = buildButton({ buttonData, nameOfFunction });
    }

    //build content
    const contentData = page.content;
    const compiledContentText = buildContent({ contentData, compiledButtonText, nameOfFunction });
    zip.file(`src/${nameOfFunction}.js`, compiledContentText);

    //build invokers
    const invokersData = page.invokers;
    const compiledInvokersText = buildInvoker({ invokersData, nameOfFunction });
    bodyCode += compiledInvokersText;

    //build button Callbacks
    if (buttonData.length > 0) {
      const compiledButtonCallbacks = buildButtonCallbacks({ buttonData, pageIdToFunctionMap, nameOfFunction });
      bodyCode += compiledButtonCallbacks;
    }
  });

  mainCode += importsCode;
  mainCode += bodyCode;
  mainCode += endCode;
  zip.file(`index.js`, mainCode);

  //add other files
  const dotenvWithTokenText = dotenvText + botToken;
  zip.file(`.env`, dotenvWithTokenText);
  zip.file(`package.json`, packageJsonText);

  const fileBuffer = await zip.generateAsync({ type: "base64" });

  return fileBuffer;
};
