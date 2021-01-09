import JSZip from "jszip";
import fs from "fs";

import { NodeType } from "../../types";

import { startCode } from "../codesnippets/startCode";
import { packageJsonText } from "../codesnippets/packageJson";
import { endCode } from "../codesnippets/endCode";
import { dotenvText } from "../codesnippets/dotenv";

import { buildContent } from "./contentManager";
import { buildInvoker } from "./invokerManager";
import { buildButton, buildButtonCallbacks } from "./buttonManager";

export default (botData: NodeType[]): any => {
  const pageIdMapper: any = {};
  const usedFunctionNames: any = [];
  botData.forEach((page: NodeType) => {
    let nameOfFunction = page.name.split(" ").join("_");
    if (usedFunctionNames.includes(nameOfFunction)) {
      let num = 1;
      do {
        nameOfFunction += `${num}`;
        num += 1;
      } while (usedFunctionNames.includes(nameOfFunction));
    }
    pageIdMapper[page.id] = nameOfFunction;
    usedFunctionNames.push(nameOfFunction);
  });

  const zip = new JSZip();
  console.dir(botData);

  zip.file(`.env`, dotenvText);
  zip.file(`package.json`, packageJsonText);

  let mainCode = ``;
  mainCode += startCode;

  let importsCode = ``;
  let bodyCode = ``;

  const delMiddleware = `
function deleteCtx (ctx, next) {
  ctx.deleteMessage()
  next()
}
    `;
  bodyCode += delMiddleware;

  botData.forEach((page: NodeType) => {
    const nameOfFunction = pageIdMapper[page.id];

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

    //add imports
    importsCode += `const {${nameOfFunction}} = require("./src/${nameOfFunction}");\n`;

    //build invokers
    const invokersData = page.invokers;
    const compiledInvokersText = buildInvoker({ invokersData, nameOfFunction });
    bodyCode += compiledInvokersText;

    //build button Callbacks
    if (buttonData.length > 0) {
      const compiledButtonCallbacks = buildButtonCallbacks({ buttonData, pageIdMapper, nameOfFunction });
      bodyCode += compiledButtonCallbacks;
    }
  });

  mainCode += importsCode;
  mainCode += bodyCode;
  mainCode += endCode;

  zip.file(`index.js`, mainCode);

  zip
    .generateNodeStream({ type: "nodebuffer", streamFiles: true })
    .pipe(fs.createWriteStream("out.zip"))
    .on("finish", function () {
      console.log("out.zip written.");
    });
};
